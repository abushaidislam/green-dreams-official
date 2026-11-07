import React from 'react'
import Link from 'next/link'
import { Sprout, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Truck, RefreshCw } from 'lucide-react'
import { getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT, DELIVERY_ZONES } from '@/lib/bangladesh-data'

export function Footer() {
  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    'Hello Green Dreams, I need help with plant care advice or my delivery status.'
  )

  return (
    <footer className="bg-botanical-950 text-warm-200 mt-20 border-t border-botanical-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Value */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-botanical-800 text-botanical-300 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">Green Dreams</span>
            </div>
            <p className="text-sm text-botanical-300 leading-relaxed">
              বাংলাদেশের প্রিমিয়াম অনলাইন প্ল্যান্ট শপ। সরাসরি নার্সারি থেকে সতেজ গাছ, প্রতিটি গাছের জন্য বিশ্বস্ত যত্ন গাইড এবং ক্যাশ অন ডেলিভারি সুবিধা।
            </p>
            <div className="pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে সরাসরি কথা বলুন</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">গাছের ক্যাটাগরি</h4>
            <ul className="space-y-2.5 text-sm text-botanical-300">
              <li>
                <Link href="/categories/indoor-plants" className="hover:text-white transition">
                  ইনডোর প্ল্যান্টস (Indoor)
                </Link>
              </li>
              <li>
                <Link href="/categories/balcony-outdoor" className="hover:text-white transition">
                  ব্যালকনি ও আউটডোর
                </Link>
              </li>
              <li>
                <Link href="/categories/low-light-succulents" className="hover:text-white transition">
                  লো-লাইট ও সাকুলেন্ট
                </Link>
              </li>
              <li>
                <Link href="/categories/pots-plant-care" className="hover:text-white transition">
                  টব ও জৈব ভার্মিকম্পোস্ট
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Assurance */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">পলিসি ও নিশ্চয়তা</h4>
            <ul className="space-y-2.5 text-sm text-botanical-300">
              <li>
                <Link href="/policies/shipping-and-delivery" className="hover:text-white transition flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-botanical-400" />
                  <span>শিপিং ও ডেলিভারি পলিসি (৳৬০ / ৳১৩০)</span>
                </Link>
              </li>
              <li>
                <Link href="/policies/live-plant-replacement" className="hover:text-white transition flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>২৪ ঘণ্টা লাইভ প্ল্যান্ট রিপ্লেসমেন্ট</span>
                </Link>
              </li>
              <li>
                <Link href="/policies/cod-terms" className="hover:text-white transition flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>ক্যাশ অন ডেলিভারি (COD) নির্দেশিকা</span>
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-and-care-disclaimer" className="hover:text-white transition flex items-center gap-1.5">
                  <span>বোটানিক্যাল কেয়ার ডিসক্লেইমার</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Nursery */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">যোগাযোগ ও নার্সারি</h4>
            <div className="space-y-3 text-sm text-botanical-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-botanical-400 mt-0.5 flex-shrink-0" />
                <span>{NURSERY_CONTACT.addressBn}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-botanical-400 flex-shrink-0" />
                <span>{NURSERY_CONTACT.phoneDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-botanical-400 flex-shrink-0" />
                <span>{NURSERY_CONTACT.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-botanical-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-botanical-400 gap-4">
          <p>© {new Date().getFullYear()} Green Dreams. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/policies/shipping-and-delivery" className="hover:text-white transition">ডেলিভারি পলিসি</Link>
            <span>•</span>
            <Link href="/policies/live-plant-replacement" className="hover:text-white transition">রিপ্লেসমেন্ট গ্যারান্টি</Link>
            <span>•</span>
            <Link href="/policies/cod-terms" className="hover:text-white transition">COD শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

