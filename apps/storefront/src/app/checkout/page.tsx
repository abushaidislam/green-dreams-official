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
  Clock,
  PackageCheck,
  PhoneCall,
  Info,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatBDT } from '@/lib/utils'
import {
  validateBDPhoneDetailed,
  validateBDAddress,
  DHAKA_CITY_AREAS,
  ALL_BANGLADESH_DISTRICTS,
  BANGLADESH_DISTRICTS_BY_DIVISION,
  DELIVERY_ZONES,
  NURSERY_CONTACT,
} from '@/lib/bangladesh-data'
import { BACKEND_URL, PUBLISHABLE_KEY } from '@/lib/medusa'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()

  // Form State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [detectedOperator, setDetectedOperator] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [address1, setAddress1] = useState('')
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka')
  const [dhakaArea, setDhakaArea] = useState<string>('Mirpur (মিরপুর)')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Gazipur')
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [phoneConsent, setPhoneConsent] = useState(true)

  // UI & Loading States
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [addressWarning, setAddressWarning] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [shippingFee, setShippingFee] = useState<number>(DELIVERY_ZONES.INSIDE_DHAKA.fee)

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
      setShippingFee(DELIVERY_ZONES.INSIDE_DHAKA.fee)
    } else {
      setShippingFee(DELIVERY_ZONES.OUTSIDE_DHAKA.fee)
    }
  }, [deliveryZone])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setPhone(val)
    if (phoneError) setPhoneError(null)

    // Detect operator in real-time
    const validation = validateBDPhoneDetailed(val)
    if (validation.operator) {
      setDetectedOperator(validation.operator)
    } else {
      setDetectedOperator(null)
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setAddress1(val)

    const check = validateBDAddress(val, deliveryZone === 'inside_dhaka' ? 'Dhaka' : selectedDistrict)
    if (check.warning) {
      setAddressWarning(check.warning)
    } else {
      setAddressWarning(null)
    }
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const scrollToTop = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 120, behavior: 'smooth' })
      }
    }

    // Name Validation
    if (!firstName.trim()) {
      setFormError('দয়া করে আপনার নাম প্রদান করুন')
      scrollToTop()
      return
    }

    // Phone Validation (Hardened Bangladesh rules)
    const phoneValidation = validateBDPhoneDetailed(phone)
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || 'সঠিক বাংলাদেশি ফোন নম্বর দিন')
      scrollToTop()
      return
    }

    // Address Validation
    const effectiveCity = deliveryZone === 'inside_dhaka' ? 'Dhaka' : selectedDistrict
    const addrValidation = validateBDAddress(address1, effectiveCity)
    if (!addrValidation.isValid) {
      setFormError(addrValidation.error || 'সঠিক সম্পূর্ণ ঠিকানা দিন')
      scrollToTop()
      return
    }

    if (!phoneConsent) {
      setFormError('ডেলিভারির পূর্বে ফোন ভেরিফিকেশনের শর্তটিতে সম্মত হতে হবে।')
      scrollToTop()
      return
    }

    if (!cart?.id || items.length === 0) {
      setFormError('আপনার কার্ট খালি। প্রথমে গাছ ব্যাগে যোগ করুন।')
      scrollToTop()
      return
    }

    try {
      setIsSubmitting(true)

      const fullArea = deliveryZone === 'inside_dhaka' ? dhakaArea : selectedDistrict
      const formattedAddress = `${address1.trim()} [এলাকা/জেলা: ${fullArea}]` + (deliveryNotes ? ` (নোট: ${deliveryNotes.trim()})` : '')

      // Step 1: Update customer and delivery address on cart
      const addressPayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim() || 'Customer',
        address_1: formattedAddress,
        city: effectiveCity,
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
            ? opt.name.includes('Inside Dhaka') || opt.amount === DELIVERY_ZONES.INSIDE_DHAKA.fee
            : opt.name.includes('Outside Dhaka') || opt.amount === DELIVERY_ZONES.OUTSIDE_DHAKA.fee
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
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ✓ ক্যাশ অন ডেলিভারি নিশ্চিত
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
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600" />
              <span className="font-medium">{formError}</span>
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-5 shadow-xs">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3 flex items-center justify-between">
              <span>১. আপনার যোগাযোগের তথ্য</span>
              <span className="text-xs font-normal text-warm-700">* চিহ্নিত ঘরগুলো আবশ্যক</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkout-first-name" className="block text-xs font-bold text-botanical-800 mb-1.5">
                  নাম (First Name) *
                </label>
                <input
                  id="checkout-first-name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="উদাঃ তানভীর"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
                />
              </div>

              <div>
                <label htmlFor="checkout-last-name" className="block text-xs font-bold text-botanical-800 mb-1.5">
                  পদবি (Last Name)
                </label>
                <input
                  id="checkout-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="উদাঃ আহমেদ"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="checkout-phone" className="text-xs font-bold text-botanical-800">
                  বাংলাদেশি মোবাইল নম্বর *
                </label>
                {detectedOperator && (
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {detectedOperator} Network
                  </span>
                )}
              </div>
              <input
                id="checkout-phone"
                type="tel"
                required
                value={phone}
                onChange={handlePhoneChange}
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? 'phone-error' : 'phone-desc'}
                placeholder="017XXXXXXXX বা 018XXXXXXXX"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                  phoneError
                    ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/50'
                    : 'border-warm-300 focus:ring-botanical-600'
                }`}
              />
              {phoneError ? (
                <p id="phone-error" className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{phoneError}</span>
                </p>
              ) : (
                <p id="phone-desc" className="text-xs text-warm-700 mt-1">
                  ডেলিভারির পূর্বে এই নম্বরে কল করে নিশ্চিত করা হবে। (GP, Banglalink, Robi, Airtel, Teletalk)
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-email" className="block text-xs font-bold text-botanical-800 mb-1.5">
                ইমেইল ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                id="checkout-email"
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
              ২. ডেলিভারি এলাকা ও সঠিক ঠিকানা
            </h2>

            {/* Delivery Zone Selection Cards */}
            <div>
              <label className="block text-xs font-bold text-botanical-800 mb-2">
                ডেলিভারি জোন নির্বাচন করুন *
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
                      চার্জ: <strong>৳{DELIVERY_ZONES.INSIDE_DHAKA.fee}</strong> | সময়: {DELIVERY_ZONES.INSIDE_DHAKA.etaDays}
                    </span>
                    <span className="text-xs text-warm-700 block mt-1">
                      {DELIVERY_ZONES.INSIDE_DHAKA.packagingBn}
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
                      চার্জ: <strong>৳{DELIVERY_ZONES.OUTSIDE_DHAKA.fee}</strong> | সময়: {DELIVERY_ZONES.OUTSIDE_DHAKA.etaDays}
                    </span>
                    <span className="text-xs text-warm-700 block mt-1">
                      {DELIVERY_ZONES.OUTSIDE_DHAKA.packagingBn}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Area or District Selector */}
            {deliveryZone === 'inside_dhaka' ? (
              <div>
                <label htmlFor="checkout-dhaka-area" className="block text-xs font-bold text-botanical-800 mb-1.5">
                  ঢাকা শহরের নির্দিষ্ট এলাকা নির্বাচন করুন *
                </label>
                <select
                  id="checkout-dhaka-area"
                  value={dhakaArea}
                  onChange={(e) => setDhakaArea(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm bg-white"
                >
                  {DHAKA_CITY_AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label htmlFor="checkout-district" className="block text-xs font-bold text-botanical-800 mb-1.5">
                  বিভাগ অনুযায়ী জেলা নির্বাচন করুন (৬৪ জেলা) *
                </label>
                <select
                  id="checkout-district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm bg-white"
                >
                  {Object.entries(BANGLADESH_DISTRICTS_BY_DIVISION).map(([division, districts]) => (
                    <optgroup key={division} label={`${division} বিভাগ`}>
                      {districts.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist} জেলা
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            )}

            {/* Detailed Street Address */}
            <div>
              <label htmlFor="checkout-address" className="block text-xs font-bold text-botanical-800 mb-1.5">
                সম্পূর্ণ ঠিকানা (বাসা/ফ্ল্যাট নং, রোড নং, ল্যান্ডমার্ক) *
              </label>
              <textarea
                id="checkout-address"
                required
                rows={2}
                value={address1}
                onChange={handleAddressChange}
                placeholder={
                  deliveryZone === 'inside_dhaka'
                    ? 'উদাঃ বাড়ি ১২, রোড ৪, ব্লক সি, বনশ্রী, রামপুরা জামে মসজিদের পাশে'
                    : 'উদাঃ হোল্ডিং ৪৫, কলেজ রোড, সদর থানা, কুরিয়ার পয়েন্টের পাশে'
                }
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
              {addressWarning && (
                <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1.5 flex items-start gap-1.5 font-medium">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                  <span>{addressWarning}</span>
                </p>
              )}
            </div>

            {/* Special Plant Delivery Notes */}
            <div>
              <label htmlFor="checkout-notes" className="block text-xs font-bold text-botanical-800 mb-1.5">
                বিশেষ ডেলিভারি নোট (ঐচ্ছিক)
              </label>
              <input
                id="checkout-notes"
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="উদাঃ লিফটের সুবিধা নেই/৩য় তলা, বিকেলে ডেলিভারি দিন"
                className="w-full px-4 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:ring-2 focus:ring-botanical-600 text-sm"
              />
            </div>
          </div>

          {/* Section 3: COD Payment & Protocol Consent */}
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <span>৩. মূল্য পরিশোধ পদ্ধতি</span>
            </h2>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </div>
              <div className="space-y-1">
                <span className="font-bold text-sm text-emerald-950 block">
                  ক্যাশ অন ডেলিভারি (Cash on Delivery)
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  পণ্য হাতে পেয়ে পুরোপুরি সন্তুষ্ট হয়ে ডেলিভারি ম্যানকে ক্যাশ পরিশোধ করবেন। কোনো অগ্রিম পেমেন্টের ঝুঁকি নেই।
                </p>
              </div>
            </div>

            {/* Phone Confirmation Consent Checkbox */}
            <label htmlFor="phone-consent" className="flex items-start gap-3 p-3.5 rounded-xl bg-warm-50 border border-warm-200 cursor-pointer text-xs text-botanical-900">
              <input
                id="phone-consent"
                type="checkbox"
                checked={phoneConsent}
                onChange={(e) => setPhoneConsent(e.target.checked)}
                className="mt-0.5 rounded border-warm-300 text-botanical-700 focus:ring-botanical-600 w-4 h-4"
              />
              <span className="leading-relaxed">
                আমি অবগত আছি যে লাইভ প্ল্যান্টের সুরক্ষার্থে ডেলিভারির পূর্বে নার্সারি থেকে আমাকে ফোনে কল করে ঠিকানা নিশ্চিত করা হবে এবং আমি ফোন রিসিভ করে অর্ডার কনফার্ম করব।
              </span>
            </label>
          </div>
        </div>

        {/* Right Column: Order Summary & Placement */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl border border-warm-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-lg font-bold text-botanical-900 border-b border-warm-100 pb-3">
              অর্ডারের সংক্ষিপ্ত বিবরণ
            </h2>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-warm-100 flex-shrink-0 border border-warm-200">
                    <Image
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=200'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs text-botanical-950 truncate">{item.title}</h3>
                    <p className="text-xs text-warm-700 truncate">
                      {item.variant?.title || 'Standard'} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-botanical-900">
                    {formatBDT(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 border-t border-warm-100 pt-4 text-xs">
              <div className="flex justify-between text-warm-700">
                <span>উপমোট (Subtotal):</span>
                <span className="font-semibold text-botanical-900 tabular-nums">{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-warm-700">
                <span>
                  ডেলিভারি ফি ({deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'}):
                </span>
                <span className="font-semibold text-emerald-700 tabular-nums">{formatBDT(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-botanical-950 border-t border-warm-200 pt-3">
                <span>সর্বমোট (Total COD):</span>
                <span className="text-emerald-800 tabular-nums">{formatBDT(total)}</span>
              </div>
            </div>

            {/* Direct Mobile/Bottom Error Alert */}
            {(formError || phoneError) && (
              <div
                role="alert"
                aria-live="assertive"
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in duration-200"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{formError || phoneError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !phoneConsent}
              className={`w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                isSubmitting || !phoneConsent
                  ? 'bg-warm-400 cursor-not-allowed'
                  : 'bg-botanical-900 hover:bg-botanical-950 active:scale-96 shadow-sm hover:shadow'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>অর্ডার প্রসেস হচ্ছে...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>অর্ডার নিশ্চিত করুন ({formatBDT(total)})</span>
                </>
              )}
            </button>

            {/* Trust Assurances */}
            <div className="pt-2 border-t border-warm-100 space-y-2 text-xs text-warm-700">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-botanical-600 flex-shrink-0" />
                <span>
                  {deliveryZone === 'inside_dhaka'
                    ? '২৪-৪৮ ঘণ্টার মধ্যে ঢাকা নার্সারি থেকে ডেলিভারি।'
                    : '২-৪ কার্যদিবসে ৬৪ জেলায় সুরক্ষিত উদ্ভিদের কার্টনে ডেলিভারি।'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PackageCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>ট্রানজিটে কোনো ক্ষতি হলে ২৪ ঘণ্টার মধ্যে ফ্রি রিপ্লেসমেন্ট।</span>
              </div>
            </div>

            {/* Policy Links */}
            <div className="text-xs text-warm-700 text-center space-x-3 pt-1">
              <Link href="/policies/shipping-and-delivery" className="text-botanical-700 hover:underline">
                শিপিং পলিসি
              </Link>
              <span>•</span>
              <Link href="/policies/live-plant-replacement" className="text-botanical-700 hover:underline">
                রিপ্লেসমেন্ট গ্যারান্টি
              </Link>
              <span>•</span>
              <Link href="/policies/cod-terms" className="text-botanical-700 hover:underline">
                COD শর্তাবলী
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
