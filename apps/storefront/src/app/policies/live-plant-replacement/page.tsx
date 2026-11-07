import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Camera, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const metadata = {
  title: 'লাইভ প্ল্যান্ট রিপ্লেসমেন্ট গ্যারান্টি | Green Dreams Bangladesh',
  description: 'ট্রানজিট চলাকালীন কোনো গাছ ক্ষতিগ্রস্ত হলে ২৪ ঘণ্টার মধ্যে সম্পূর্ণ বিনামূল্যে রিপ্লেসমেন্ট পলিসি।',
}

export default function LivePlantReplacementPage() {
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
        <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          ১০০% লাইভ প্ল্যান্ট ট্রানজিট গ্যারান্টি
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          লাইভ প্ল্যান্ট রিপ্লেসমেন্ট পলিসি
        </h1>
        <p className="text-sm text-botanical-700">
          গ্রিন ড্রিমসের প্রতিটি উদ্ভিদ আমাদের সন্তানের মতো যত্ন নিয়ে নার্সারিতে বড় করা হয়। পরিবহনের সময় কোনো অনাকাঙ্ক্ষিত ক্ষতি হলে আমরা সম্পূর্ণ দায়িত্ব গ্রহণ করি।
        </p>
      </div>

      {/* The 24-Hour Guarantee Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-950">২৪ ঘণ্টার আনবক্সিং গ্যারান্টি</h2>
            <p className="text-xs text-emerald-800">
              পার্সেল ডেলিভারি হওয়ার পর ২৪ ঘণ্টার মধ্যে উদ্ভিদের কোনো গুরুতর ক্ষতি দৃষ্টিগোচর হলে আমাদের জানান।
            </p>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-warm-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>যেসব ক্ষেত্রে রিপ্লেসমেন্ট প্রযোজ্য:</span>
          </div>
          <ul className="text-xs text-botanical-700 space-y-2 list-disc list-inside">
            <li>ট্রানজিটে প্রধান কাণ্ড বা গোড়া ভেঙে যাওয়া।</li>
            <li>টব সম্পূর্ণ চূর্ণ-বিচূর্ণ হওয়া এবং শিকড় উন্মুক্ত হয়ে মারাত্মক ক্ষতিগ্রস্ত হওয়া।</li>
            <li>উদ্ভিদের অধিকাংশ পাতা পচে নষ্ট বা হলুদ হয়ে যাওয়া।</li>
            <li>ভুল উদ্ভিদ বা ভুল ভ্যারিয়েন্ট ডেলিভারি হওয়া।</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-warm-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-5 h-5" />
            <span>স্বাভাবিক ট্রানজিট লক্ষণ (রিপ্লেসমেন্ট প্রয়োজন নেই):</span>
          </div>
          <ul className="text-xs text-botanical-700 space-y-2 list-disc list-inside">
            <li>বক্সের মধ্যে সামান্য মাটি ঝরে পড়া (পানি স্প্রে করলেই স্বাভাবিক হয়)।</li>
            <li>১-২টি নিচের দিকের পুরোনো পাতা ঝরে যাওয়া (এটি ট্রানজিট স্ট্রেসের স্বাভাবিক লক্ষণ)।</li>
            <li>গাছের সাময়িক ক্লান্তি (আলো ও পানির সংস্পর্শে ২ দিনে গাছ প্রাণবন্ত হয়ে ওঠে)।</li>
          </ul>
        </div>
      </div>

      {/* 3 Step Claim Procedure */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-warm-200 space-y-5">
        <h3 className="text-lg font-bold text-botanical-900">
          রিপ্লেসমেন্ট ক্লেইম করার ৩টি সহজ ধাপ:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-botanical-700 text-white font-bold flex items-center justify-center">
              ১
            </div>
            <strong className="block text-botanical-900 font-semibold">ছবি বা ভিডিও তুলুন</strong>
            <p className="text-warm-700">
              আনবক্সিংয়ের সময় বক্সের ভেতরের ক্ষতিগ্রস্ত অংশ এবং পুরো গাছের স্পষ্ট ছবি তুলুন।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-botanical-700 text-white font-bold flex items-center justify-center">
              ২
            </div>
            <strong className="block text-botanical-900 font-semibold">WhatsApp-এ পাঠান</strong>
            <p className="text-warm-700">
              আমাদের অফিসিয়াল WhatsApp নম্বরে ({NURSERY_CONTACT.phoneDisplay}) অর্ডার আইডি এবং ছবি পাঠিয়ে দিন।
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-botanical-700 text-white font-bold flex items-center justify-center">
              ৩
            </div>
            <strong className="block text-botanical-900 font-semibold">বিনামূল্যে রিপ্লেসমেন্ট</strong>
            <p className="text-warm-700">
              আমাদের টিম ভেরিফাই করার পর পরবর্তী লটে সম্পূর্ণ বিনামূল্যে আপনার কাছে নতুন গাছ পাঠিয়ে দিবে।
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <a
          href={`https://wa.me/${NURSERY_CONTACT.phoneRaw}?text=${encodeURIComponent('Hello Green Dreams! I would like to inquire about a plant replacement for my order.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-white font-bold text-sm shadow-sm hover:bg-emerald-800 transition"
        >
          <span>💬 WhatsApp-এ ক্লেইম সাবমিট করুন</span>
        </a>
      </div>
    </div>
  )
}
