import Link from 'next/link'
import { ArrowLeft, Banknote, PhoneCall, ShieldCheck, AlertCircle } from 'lucide-react'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const metadata = {
  title: 'ক্যাশ অন ডেলিভারি (COD) শর্তাবলী | Green Dreams Bangladesh',
  description: 'গ্রিন ড্রিমস ক্যাশ অন ডেলিভারি পেমেন্ট নির্দেশিকা এবং ফোন ভেরিফিকেশন প্রোটোকল।',
}

export default function CodTermsPage() {
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
          Payment Guidelines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          ক্যাশ অন ডেলিভারি (COD) শর্তাবলী
        </h1>
        <p className="text-sm text-botanical-700">
          গ্রাহকদের সর্বোচ্চ নিরাপত্তা ও সুবিধার জন্য গ্রিন ড্রিমস বর্তমানে সম্পূর্ণ ১০০% ক্যাশ অন ডেলিভারিতে পণ্য সরবরাহ করে।
        </p>
      </div>

      {/* Verification Protocol Banner */}
      <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-6 h-6 text-amber-700 flex-shrink-0" />
          <h2 className="text-base font-bold">ফোন ভেরিফিকেশন বাধ্যতামূলক</h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
          যেহেতু জীবন্ত উদ্ভিদ একটি সংবেদনশীল পণ্য এবং কুরিয়ারে দীর্ঘ সময় ফেলে রাখা যায় না, তাই অর্ডার প্লেস করার পর আমাদের নার্সারি থেকে আপনার নম্বরে ফোন করে নিশ্চিত করা হবে। ফোনে কনফার্ম না পাওয়া পর্যন্ত গাছ প্যাকেজিং বা পাঠানো সম্ভব হয় না।
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-botanical-800">
        <div className="p-6 rounded-3xl bg-white border border-warm-200 space-y-3">
          <h3 className="text-base font-bold text-botanical-900 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-700" />
            <span>মূল্য পরিশোধের নিয়ম:</span>
          </h3>
          <ul className="list-disc list-inside space-y-2 text-botanical-700">
            <li>পণ্য ডেলিভারি পাওয়ার সময় ডেলিভারি ম্যানকে সরাসরি ক্যাশ টাকা প্রদান করবেন।</li>
            <li>অনুগ্রহ করে সঠিক মূল্যের কাছাকাছি খুচরা টাকা প্রস্তুত রাখুন যাতে ডেলিভারি কর্মীর লেনদেনে সুবিধা হয়।</li>
            <li>ডেলিভারির পূর্বে কোনো অগ্রিম বুকিং ফি বা হিডেন চার্জ নেই।</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-warm-200 space-y-3">
          <h3 className="text-base font-bold text-botanical-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>অর্ডার ক্যানসেলেশন ও পরিবর্তন:</span>
          </h3>
          <ul className="list-disc list-inside space-y-2 text-botanical-700">
            <li>অর্ডার কনফার্মেশনের সময় আপনি চাইলে বিনামূল্যে অর্ডার পরিবর্তন বা বাতিল করতে পারেন।</li>
            <li>একবার মিরপুর নার্সারি থেকে উদ্ভিদ কুরিয়ারে হস্তান্তর হয়ে গেলে তা আর বাতিল করা যায় না।</li>
            <li>অনাকাঙ্ক্ষিত পরিস্থিতিতে ডেলিভারি রিসিভ করতে অপারগ হলে অনুগ্রহ করে দ্রুত হেল্পলাইনে অবগত করুন।</li>
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-warm-100 border border-warm-200 text-xs text-warm-700">
        প্রশ্ন বা সহায়তার জন্য আমাদের হেল্পলাইনে যোগাযোগ করুন: <strong>{NURSERY_CONTACT.phoneDisplay}</strong>
      </div>
    </div>
  )
}
