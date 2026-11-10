import Link from 'next/link'
import {
  CheckCircle,
  Truck,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  Phone,
} from 'lucide-react'
import { BACKEND_URL, PUBLISHABLE_KEY } from '@/lib/medusa'
import { formatBDT, getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const revalidate = 0

async function getOrderDetails(orderId: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/store/orders/${orderId}?fields=+items.*,+shipping_address.*,+shipping_methods.*,+payment_collections.*`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.order || null
  } catch (err) {
    console.error('Failed to fetch order details:', err)
    return null
  }
}

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrderDetails(id)

  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    `Hello Green Dreams, I placed an order with Order ID: ${id}. Could you confirm my delivery schedule?`
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      {/* Success Badge */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm animate-scale-in">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            অর্ডার নিশ্চিত হয়েছে (Order Placed)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-botanical-950 tracking-tight">
            ধন্যবাদ! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে
          </h1>
          <p className="text-sm sm:text-base text-botanical-700">
            অর্ডার ট্র্যাকিং আইডি:{' '}
            <strong className="font-mono text-botanical-900 bg-botanical-100/70 px-2.5 py-0.5 rounded-lg border border-botanical-200">
              {id}
            </strong>
          </p>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-warm-200 overflow-hidden shadow-xs divide-y divide-warm-100">
        {/* Payment & Delivery Notice */}
        <div className="p-6 sm:p-8 bg-botanical-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-botanical-700 uppercase tracking-wider block">
              পেমেন্ট পদ্ধতি:
            </span>
            <span className="text-base font-extrabold text-botanical-900 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>ক্যাশ অন ডেলিভারি (মূল্য অপরিশোধিত)</span>
            </span>
            <p className="text-xs text-botanical-700">
              গাছ হাতে পেয়ে যাচাই করে মূল্য পরিশোধ করুন। কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই।
            </p>
          </div>

          <div className="text-left sm:text-right space-y-0.5">
            <span className="text-xs text-warm-700 font-medium block">সর্বমোট প্রদেয় মূল্য</span>
            <span className="text-2xl font-black text-botanical-950 block">
              {formatBDT(order?.total || 0)}
            </span>
          </div>
        </div>

        {/* Order Details Info */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Shipping Address */}
          <div className="space-y-2">
            <h3 className="font-bold text-botanical-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-botanical-600" />
              <span>ডেলিভারি ঠিকানা:</span>
            </h3>
            <p className="text-botanical-700 leading-relaxed pl-6">
              {order?.shipping_address?.first_name} {order?.shipping_address?.last_name}
              <br />
              {order?.shipping_address?.address_1}
              <br />
              {order?.shipping_address?.city}, বাংলাদেশ
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h3 className="font-bold text-botanical-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-botanical-600" />
              <span>যোগাযোগের নম্বর:</span>
            </h3>
            <p className="text-botanical-700 pl-6">
              {order?.shipping_address?.phone || 'রেকর্ড করা হয়নি'}
            </p>
            <p className="text-xs text-warm-700 font-medium pl-6 pt-1">
              ডেলিভারি রাইডার কল করে আপনার উপস্থিতিতে গাছ ডেলিভারি করবেন।
            </p>
          </div>
        </div>

        {/* Purchased Items List */}
        {order?.items && order.items.length > 0 && (
          <div className="p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-botanical-900 flex items-center gap-2 text-sm">
              <ShoppingBag className="w-4 h-4 text-botanical-600" />
              <span>অর্ডারের পণ্যসমূহ:</span>
            </h3>
            <div className="divide-y divide-warm-100">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold text-botanical-900 block">
                      {item.title}
                    </span>
                    <span className="text-xs text-botanical-600">
                      পরিমাণ: {item.quantity} x {formatBDT(item.unit_price)}
                    </span>
                  </div>
                  <span className="font-bold text-botanical-950">
                    {formatBDT(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Helpline Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="font-extrabold text-base text-emerald-950">
            অর্ডারের ডেলিভারি বা গাছের যত্ন নিয়ে কোনো প্রশ্ন?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-800">
            আমাদের কাস্টমার কেয়ার প্রতিনিধির সাথে হোয়াটসঅ্যাপে সরাসরি কথা বলুন।
          </p>
        </div>

        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition flex-shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
          <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
        </a>
      </div>

      {/* Return to Home CTA */}
      <div className="text-center pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-botanical-700 hover:text-botanical-900 transition"
        >
          <span>আরও গাছ ব্রাউজ করুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
