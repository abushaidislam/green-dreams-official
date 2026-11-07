import Link from 'next/link'
import { ArrowLeft, BookOpen, AlertOctagon, HeartHandshake } from 'lucide-react'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const metadata = {
  title: 'ব্যবহারের শর্তাবলী ও প্ল্যান্ট কেয়ার ডিসক্লেইমার | Green Dreams Bangladesh',
  description: 'গ্রিন ড্রিমস ওয়েবসাইটের শর্তাবলী এবং বাংলাদেশের আবহাওয়া অনুযায়ী বোটানিক্যাল পরিচর্যার গাইডলাইন ডিসক্লেইমার।',
}

export default function TermsAndCareDisclaimerPage() {
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
          Terms & Disclaimers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          শর্তাবলী ও বোটানিক্যাল ডিসক্লেইমার
        </h1>
        <p className="text-sm text-botanical-700">
          গ্রিন ড্রিমস প্ল্যাটফর্ম ব্যবহারের নিয়ম ও আমাদের বোটানিক্যাল পরিচর্যা গাইডের পরিধি সম্পর্কে বিস্তারিত।
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-botanical-800 leading-relaxed">
        {/* Plant Care Disclaimer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-warm-200 space-y-3">
          <h2 className="text-base font-bold text-botanical-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-botanical-700" />
            <span>১. প্ল্যান্ট কেয়ার গাইড ও আবহাওয়াভিত্তিক নির্দেশনা</span>
          </h2>
          <p className="text-botanical-700">
            আমাদের ওয়েবসাইটে প্রদত্ত প্রতিটি উদ্ভিদের আলোর পরিমাণ, পানি দেওয়ার নিয়ম ও আর্দ্রতার নির্দেশনা বাংলাদেশের গ্রীষ্ম ও শীতকালীন আবহাওয়া এবং সাধারণ ফ্ল্যাট/বাসার অভ্যন্তরীণ পরিবেশের ওপর ভিত্তি করে তৈরি। তবে ঘরের অবস্থান, ফ্যানের বাতাস, এসি ব্যবহার বা জানালার দূরত্বের কারণে প্রতিটি গাছের ক্ষেত্রে প্রয়োজনীয়তা কিছুটা পরিবর্তিত হতে পারে।
          </p>
          <div className="p-3.5 rounded-xl bg-botanical-50 border border-botanical-100 text-xs text-botanical-800">
            <strong>পরামর্শ:</strong> মাটি না শুকানো পর্যন্ত অতিরিক্ত পানি দেওয়া থেকে বিরত থাকুন। ইনডোর গাছের ৯০% ক্ষতির কারণ অতিরিক্ত পানি দেওয়া (Over-watering)।
          </div>
        </div>

        {/* Pet Safety Disclaimer */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-warm-200 space-y-3">
          <h2 className="text-base font-bold text-botanical-900 flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-600" />
            <span>২. পোষা প্রাণীর নিরাপত্তা (Pet Safety Disclaimer)</span>
          </h2>
          <p className="text-botanical-700">
            কিছু কিছু গাছ (যেমন স্নেক প্ল্যান্ট, পিস লিলি) বিড়াল ও কুকুরের জন্য মৃদু থেকে মাঝারি মাত্রায় বিষাক্ত হতে পারে যদি তারা পাতা চিবিয়ে ফেলে। আমাদের ওয়েবসাইটে Pet Safety ব্যাজ নির্দেশ করা থাকে। পোষা প্রাণী থাকলে গাছগুলো তাদের নাগালের বাইরে উঁচুতে রাখার পরামর্শ দেওয়া হয়।
          </p>
        </div>

        {/* Customer Privacy */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-warm-200 space-y-3">
          <h2 className="text-base font-bold text-botanical-900 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-botanical-700" />
            <span>৩. গ্রাহকের তথ্য ও গোপনীয়তা (Privacy)</span>
          </h2>
          <p className="text-botanical-700">
            অর্ডারের সময় সংগৃহীত গ্রাহকের নাম, মোবাইল নম্বর ও ঠিকানা শুধুমাত্র পার্সেল ডেলিভারি ও যোগাযোগ রক্ষার কাজে ব্যবহার করা হয়। গ্রিন ড্রিমস কোনো তৃতীয় পক্ষের কাছে গ্রাহকের তথ্য বিক্রি বা হস্তান্তর করে না।
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-warm-100 border border-warm-200 text-xs text-warm-700">
        যে কোনো তথ্যের জন্য আমাদের নার্সারি হেল্পলাইনে যোগাযোগ করতে পারেন: <strong>{NURSERY_CONTACT.phoneDisplay}</strong> | <strong>{NURSERY_CONTACT.email}</strong>
      </div>
    </div>
  )
}
