import Link from 'next/link'
import { ArrowLeft, Truck, PackageCheck, Clock, MapPin, ShieldAlert } from 'lucide-react'
import { DELIVERY_ZONES, NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const metadata = {
  title: 'ডেলিভারি ও শিপিং পলিসি | Green Dreams Bangladesh',
  description: 'গ্রিন ড্রিমস ইনডোর প্ল্যান্ট ডেলিভারি পলিসি, প্যাকেজিং প্রোটোকল এবং ঢাকা ও সারা দেশের ডেলিভারি চার্জ।',
}

export default function ShippingAndDeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-botanical-700 hover:text-botanical-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোমপেজে ফিরে যান</span>
      </Link>

      <div className="space-y-3">
        <span className="text-xs font-bold tracking-wider text-botanical-600 uppercase bg-botanical-50 px-3 py-1 rounded-full border border-botanical-200">
          Green Dreams Delivery Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          ডেলিভারি চার্জ ও শিপিং পলিসি
        </h1>
        <p className="text-sm text-botanical-700">
          জীবন্ত উদ্ভিদ যাতে আপনার কাছে সম্পূর্ণ সতেজ ও অক্ষত অবস্থায় পৌঁছায়, সে জন্য আমাদের রয়েছে বিশেষায়িত প্যাকেজিং ও দ্রুততম ডেলিভারি ব্যবস্থা।
        </p>
      </div>

      {/* Delivery Zones Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-warm-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-warm-100 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-botanical-700" />
              <h2 className="font-bold text-base text-botanical-900">ঢাকা শহরের ভেতরে</h2>
            </div>
            <span className="text-base font-extrabold text-emerald-700">৳{DELIVERY_ZONES.INSIDE_DHAKA.fee} BDT</span>
          </div>
          <ul className="text-xs text-botanical-700 space-y-2.5">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>সময়সীমা:</strong> ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব ডেলিভারি ম্যানে ডেলিভারি।</span>
            </li>
            <li className="flex items-start gap-2">
              <PackageCheck className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>প্যাকেজিং:</strong> শ্বাসপ্রশ্বাসযোগ্য নার্সারি স্লীভ এবং শিকড়ে পর্যাপ্ত আর্দ্রতা সিল।</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>কভারেজ:</strong> মিরপুর, উত্তরা, ধানমন্ডি, গুলশান, বনানী, পুরান ঢাকাসহ মেট্রোপলিটন ঢাকা।</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-warm-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-warm-100 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-botanical-700" />
              <h2 className="font-bold text-base text-botanical-900">ঢাকার বাইরে (সারা দেশ)</h2>
            </div>
            <span className="text-base font-extrabold text-emerald-700">৳{DELIVERY_ZONES.OUTSIDE_DHAKA.fee} BDT</span>
          </div>
          <ul className="text-xs text-botanical-700 space-y-2.5">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>সময়সীমা:</strong> ২ থেকে ৪ কার্যদিবস।</span>
            </li>
            <li className="flex items-start gap-2">
              <PackageCheck className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>প্যাকেজিং:</strong> ৫-প্লাই রিইনফোর্সড ঢেউখেলানো উদ্ভিদের স্পেশাল শকপ্রুফ শক্ত বক্স।</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-botanical-600 flex-shrink-0 mt-0.5" />
              <span><strong>কভারেজ:</strong> বাংলাদেশের ৬৪টি জেলা শহর ও থানা সদর।</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Botanical Packaging Protocol */}
      <div className="p-6 sm:p-8 rounded-3xl bg-botanical-50/70 border border-botanical-200 space-y-4">
        <h3 className="text-lg font-bold text-botanical-950 flex items-center gap-2">
          <span>🌿</span>
          <span>জীবন্ত উদ্ভিদের প্যাকেজিং প্রোটোকল</span>
        </h3>
        <p className="text-xs sm:text-sm text-botanical-800 leading-relaxed">
          সাধারণ পণ্যের মতো গাছ কুরিয়ারে পরিবহন করা সম্ভব নয়। গ্রিন ড্রিমস নার্সারিতে প্রতিটি গাছ ডিসপ্যাচ করার পূর্বে আমাদের উদ্যানবিদরা উদ্ভিদের আর্দ্রতা পরীক্ষা করেন। শিকড়ের অংশের মাটি বিশেষ ময়েশ্চার লক ফিল্ম দিয়ে সিল করা হয় যাতে পরিবহনের সময় মাটি ঝরে না পড়ে এবং শিকড় শুকিয়ে না যায়।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-botanical-700">
          <div className="bg-white p-3 rounded-xl border border-botanical-100">
            <strong>১. রুট হাইড্রেশন:</strong> পরিবহনের পূর্বে পর্যাপ্ত পানি ও ছত্রাকনাশক স্প্রে।
          </div>
          <div className="bg-white p-3 rounded-xl border border-botanical-100">
            <strong>২. পট স্ট্যাবিলাইজার:</strong> টবকে বক্সের মাঝে শক্তভাবে লক করে রাখা।
          </div>
          <div className="bg-white p-3 rounded-xl border border-botanical-100">
            <strong>৩. বায়ু চলাচলের ছিদ্র:</strong> বক্সে বিশেষ ভেন্টিলেশন উইন্ডো।
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="space-y-4 text-xs sm:text-sm text-botanical-800">
        <h3 className="text-base font-bold text-botanical-900">ডেলিভারি বিষয়ক গুরুত্বপূর্ণ নির্দেশনাবলী:</h3>
        <ul className="list-disc list-inside space-y-2 text-botanical-700">
          <li>গাছ ডেলিভারি দেওয়ার পূর্বে আমাদের কাস্টমার সার্ভিস থেকে আপনাকে ফোন করে প্রাপ্যতা ও ঠিকানা কনফার্ম করা হবে। ফোনে কনফার্মেশনের পরই পার্সেল পাঠানো হবে।</li>
          <li>ক্যাশ অন ডেলিভারিতে পণ্য বুঝে পেয়ে ডেলিভারি ম্যানকে নির্ধারিত মূল্য পরিশোধ করুন।</li>
          <li>পার্সেল পৌঁছানোর পর অনুগ্রহ করে প্যাকেজ খুলে গাছকে সরাসরি তীব্র রোদে না দিয়ে ১-২ দিন ছায়াযুক্ত ও আলো-বাতাসপূর্ণ স্থানে রাখুন।</li>
        </ul>
      </div>

      {/* Nursery Origin */}
      <div className="p-4 rounded-2xl bg-warm-100 border border-warm-200 text-xs text-warm-700 flex items-start gap-3">
        <MapPin className="w-4 h-4 text-botanical-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong>ডিসপ্যাচ হাব:</strong> {NURSERY_CONTACT.nurseryName}, {NURSERY_CONTACT.addressBn} | হেল্পলাইন: {NURSERY_CONTACT.phoneDisplay}
        </div>
      </div>
    </div>
  )
}
