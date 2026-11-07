'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Truck,
  CreditCard,
  AlertCircle,
  Check,
  ShoppingBag,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatBDT, validateAndNormalizeBDPhone } from '@/lib/utils'
import { BACKEND_URL, PUBLISHABLE_KEY } from '@/lib/medusa'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, refreshCart, clearCart } = useCart()

  // Form State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [city, setCity] = useState('Dhaka')
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka')
  const [deliveryNotes, setDeliveryNotes] = useState('')

  // UI & Loading States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [shippingFee, setShippingFee] = useState<number>(60)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-publishable-api-key': PUBLISHABLE_KEY,
  }

  const items = cart?.items || []
  const subtotal = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)
  const total = subtotal + shippingFee

  // Update shipping fee when delivery zone changes
  useEffect(() => {
    if (deliveryZone === 'inside_dhaka') {
      setShippingFee(60)
      if (city !== 'Dhaka') setCity('Dhaka')
    } else {
      setShippingFee(130)
      if (city === 'Dhaka') setCity('')
    }
  }, [deliveryZone])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPhone(val)
    if (phoneError) setPhoneError(null)
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Validation
    if (!firstName.trim()) {
      setFormError('দয়া করে আপনার নাম প্রদান করুন')
      return
    }

    const phoneValidation = validateAndNormalizeBDPhone(phone)
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || 'সঠিক ফোন নম্বর দিন')
      return
    }

    if (!address1.trim()) {
      setFormError('ডেলিভারির সম্পূর্ণ ঠিকানা প্রদান করুন (রোড, বাড়ি, এলাকা)')
      return
    }

    if (!city.trim()) {
      setFormError('জেলা বা শহরের নাম প্রদান করুন')
      return
    }

    if (!cart?.id || items.length === 0) {
      setFormError('আপনার কার্ট খালি। প্রথমে গাছ ব্যাগে যোগ করুন।')
      return
    }

    try {
      setIsSubmitting(true)

      // Step 1: Update customer and delivery address on cart
      const addressPayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim() || 'Customer',
        address_1: address1.trim() + (deliveryNotes ? ` (নোট: ${deliveryNotes.trim()})` : ''),
        city: city.trim(),
        country_code: 'bd',
        postal_code: deliveryZone === 'inside_dhaka' ? '1200' : '1000',
        phone: phoneValidation.normalized,
      }

      const updateCartRes = await fetch(`${BACKEND_URL}/store/carts/${cart.id}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: email.trim() || `customer.${Date.now()}@greendreams.com`,
          shipping_address: addressPayload,
          billing_address: addressPayload,
        }),
      })

      if (!updateCartRes.ok) {
        throw new Error('ঠিকানা সংরক্ষণ করতে ব্যর্থ হয়েছে')
      }

      // Step 2: Fetch authoritative shipping options for cart
      const shippingOptionsRes = await fetch(
        `${BACKEND_URL}/store/shipping-options?cart_id=${cart.id}`,
        { headers }
      )
      const shippingOptionsData = await shippingOptionsRes.json()
      const availableOptions: any[] = shippingOptionsData.shipping_options || []

      // Match selected zone option (Inside Dhaka ৳60 or Outside Dhaka ৳130)
      const targetOption =
        availableOptions.find((opt) =>
          deliveryZone === 'inside_dhaka'
            ? opt.name.includes('Inside Dhaka') || opt.amount === 60
            : opt.name.includes('Outside Dhaka') || opt.amount === 130
        ) || availableOptions[0]

      if (!targetOption) {
        throw new Error('শিপিং অপশন লোড করা সম্ভব হয়নি')
      }

      // Step 3: Select authoritative shipping method on cart
      const setShippingRes = await fetch(
        `${BACKEND_URL}/store/carts/${cart.id}/shipping-methods`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            option_id: targetOption.id,
          }),
        }
      )

      if (!setShippingRes.ok) {
        throw new Error('ডেলিভারি মেথড নির্বাচন ব্যর্থ হয়েছে')
      }

      // Step 4: Create Payment Collection & Initialize COD Session
      const payColRes = await fetch(`${BACKEND_URL}/store/payment-collections`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          cart_id: cart.id,
        }),
      })

      if (!payColRes.ok) {
        throw new Error('পেমেন্ট কালেকশন শুরু করা সম্ভব হয়নি')
      }

      const payColData = await payColRes.json()
      const paymentCollectionId = payColData.payment_collection?.id

      const sessionRes = await fetch(
        `${BACKEND_URL}/store/payment-collections/${paymentCollectionId}/payment-sessions`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            provider_id: 'pp_system_default',
          }),
        }
      )

      if (!sessionRes.ok) {
        throw new Error('ক্যাশ অন ডেলিভারি সেশন শুরু করা সম্ভব হয়নি')
      }

      // Step 5: Complete cart and place order
      const completeRes = await fetch(`${BACKEND_URL}/store/carts/${cart.id}/complete`, {
        method: 'POST',
        headers,
      })

      if (!completeRes.ok) {
        const errJson = await completeRes.json()
        throw new Error(errJson.message || 'অর্ডার সম্পন্ন করা সম্ভব হয়নি')
      }

      const completeData = await completeRes.json()
      const order = completeData.order || completeData.cart

      if (!order?.id) {
        throw new Error('অর্ডার আইডি তৈরি হয়নি')
      }

      // Clear local cart and navigate to confirmation
      clearCart()
      router.push(`/order/confirmed/${order.id}`)
    } catch (err: any) {
      console.error('Checkout error:', err)
      setFormError(err.message || 'অর্ডারে একটি ত্রুটি ঘটেছে, পুনরায় চেষ্টা করুন')
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-botanical-100 text-botanical-700 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-botanical-900">আপনার কার্ট খালি</h2>
        <p className="text-sm text-botanical-600">চেকআউট করতে প্রথমে পছন্দের গাছ কার্টে যোগ করুন।</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-botanical-700 text-white font-bold text-sm shadow-sm"
        >
          <span>গাছ ব্রাউজ করুন</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-bold text-botanical-700 hover:text-botanical-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>কার্টে ফিরে যান</span>
        </Link>
        <span className="text-xs font-semibold text-botanical-600">
          নিরাপদ ক্যাশ অন ডেলিভারি চেকআউট
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
        চেকআউট ও ডেলিভারি বিবরণ
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          {/* Error Banner */}
          {formError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3">
              ১. আপনার যোগাযোগের তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                  নাম (First Name) *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="উদাঃ তানভীর"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                  পদবি (Last Name)
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="উদাঃ আহমেদ"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                বাংলাদেশি মোবাইল নম্বর *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                placeholder="017XXXXXXXX"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  phoneError
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/50'
                    : 'border-warm-300 focus:ring-botanical-600'
                }`}
              />
              {phoneError ? (
                <p className="text-xs text-rose-600 mt-1">{phoneError}</p>
              ) : (
                <p className="text-[11px] text-warm-500 mt-1">
                  ডেলিভারির সময় এই নম্বরে কল করে নিশ্চিত করা হবে।
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                ইমেইল ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
            </div>
          </div>

          {/* Section 2: Delivery Zone & Address */}
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3">
              ২. ডেলিভারি এলাকা ও ঠিকানা
            </h2>

            {/* Delivery Zone Selection */}
            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-2">
                ডেলিভারি এলাকা নির্বাচন করুন *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-botanical-700 bg-botanical-50/80 ring-2 ring-botanical-600/30'
                      : 'border-warm-200 hover:bg-warm-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-botanical-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-botanical-900 block">
                      ঢাকা শহরের ভেতরে
                    </span>
                    <span className="text-xs text-botanical-700 block mt-0.5">
                      ডেলিভারি চার্জ: <strong>৳৬০</strong> (২-৩ দিন)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-botanical-700 bg-botanical-50/80 ring-2 ring-botanical-600/30'
                      : 'border-warm-200 hover:bg-warm-50'
                  }`}
                >
                  <Truck className="w-5 h-5 text-botanical-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-botanical-900 block">
                      ঢাকার বাইরে (সারা দেশ)
                    </span>
                    <span className="text-xs text-botanical-700 block mt-0.5">
                      ডেলিভারি চার্জ: <strong>৳১৩০</strong> (৩-৫ দিন)
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                সম্পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট নং, রোড নং, এলাকা/থানা) *
              </label>
              <textarea
                required
                rows={2}
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                placeholder="উদাঃ বাড়ি ১২, রোড ৪, ব্লক সি, বনশ্রী, ঢাকা"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                জেলা / শহর *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={deliveryZone === 'inside_dhaka' ? 'Dhaka' : 'উদাঃ চট্টগ্রাম, সিলেট, রাজশাহী'}
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-1.5">
                ডেলিভারি নোট বা বিশেষ নির্দেশিকা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="উদাঃ বিকালে ডেলিভারি দিলে ভালো হয়"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3">
              ৩. মূল্য পরিশোধের পদ্ধতি
            </h2>

            <div className="p-4 rounded-2xl bg-botanical-50 border-2 border-botanical-700 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm text-botanical-950">
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </h3>
                <p className="text-xs text-botanical-700 mt-1 leading-relaxed">
                  গাছ হাতে পেয়ে যাচাই করে মূল্য পরিশোধ করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-6 shadow-xs sticky top-24">
          <h2 className="text-xl font-extrabold text-botanical-950">আপনার অর্ডার</h2>

          {/* Cart Items Preview */}
          <div className="divide-y divide-warm-100 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-warm-100 overflow-hidden flex-shrink-0 border border-warm-200">
                    <Image
                      src={
                        item.thumbnail ||
                        'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-botanical-900 block line-clamp-1">
                      {item.variant?.product?.title || item.title}
                    </span>
                    <span className="text-warm-500">
                      পরিমাণ: {item.quantity} {item.variant?.title ? `(${item.variant.title})` : ''}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-botanical-950">
                  {formatBDT(item.unit_price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Bill Calculation */}
          <div className="space-y-3 pt-4 border-t border-warm-200 text-sm">
            <div className="flex justify-between text-botanical-700">
              <span>সাবটোটাল</span>
              <span className="font-bold text-botanical-900">{formatBDT(subtotal)}</span>
            </div>
            <div className="flex justify-between text-botanical-700">
              <span>
                ডেলিভারি চার্জ ({deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'})
              </span>
              <span className="font-bold text-botanical-900">{formatBDT(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-black text-botanical-950 pt-2 border-t border-warm-100">
              <span>সর্বমোট প্রদেয়</span>
              <span className="text-botanical-700">{formatBDT(total)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-botanical-700 hover:bg-botanical-800 disabled:bg-warm-400 text-white font-bold text-base shadow-sm transition active:scale-98"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>অর্ডার তৈরি হচ্ছে...</span>
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করুন</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-warm-500 leading-normal">
            অর্ডার কনফার্ম করার পর আমাদের কাস্টমার প্রতিনিধি ডেলিভারির সময় জানিয়ে দেবেন।
          </p>
        </div>
      </form>
    </div>
  )
}
