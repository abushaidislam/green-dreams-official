import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Truck,
  ShieldCheck,
  Sprout,
  Clock,
  HelpCircle,
} from 'lucide-react'
import { getWhatsAppSupportLink } from '@/lib/utils'

export const metadata = {
  title: 'যোগাযোগ ও নার্সারি — Green Dreams',
  description: 'গ্রিন ড্রিমস নার্সারির ঠিকানা, কাস্টমার কেয়ার ফোন এবং হোয়াটসঅ্যাপ সাপোর্ট।',
}

export default function ContactPage() {
  const whatsAppLink = getWhatsAppSupportLink(
    '8801700000000',
    'Hello Green Dreams, I would like to visit the nursery / ask about a plant inquiry.'
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Title */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block">
          গ্রিন ড্রিমস কাস্টমার কেয়ার
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          যোগাযোগ ও নার্সারি তথ্য
        </h1>
        <p className="text-sm sm:text-base text-botanical-700">
          গাছ নির্বাচন, পরিচর্যা সংক্রান্ত পরামর্শ অথবা অর্ডার ডেলিভারি সম্পর্কিত যেকোনো প্রয়োজনে আমরা আপনার পাশে আছি।
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nursery Address */}
        <div className="p-8 rounded-3xl bg-white border border-warm-200 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-botanical-100 text-botanical-700 flex items-center justify-center mx-auto">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-lg text-botanical-950">নার্সারির ঠিকানা</h3>
          <p className="text-sm text-botanical-700 leading-relaxed">
            মিরপুর বোটানিক্যাল নার্সারি হাব
            <br />
            মিরপুর, ঢাকা ১২১৬, বাংলাদেশ
          </p>
          <div className="pt-2 text-xs font-semibold text-botanical-600 flex items-center justify-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>সকাল ৯:০০ - সন্ধ্যা ৭:০০ (প্রতিদিন)</span>
          </div>
        </div>

        {/* Helpline Phone */}
        <div className="p-8 rounded-3xl bg-white border border-warm-200 text-center space-y-3 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-botanical-100 text-botanical-700 flex items-center justify-center mx-auto">
            <Phone className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-lg text-botanical-950">ফোন ও ইমেইল</h3>
          <p className="text-sm text-botanical-700 leading-relaxed">
            হটলাইন: <strong>+৮৮০ ১৭০০০০০০০০</strong>
            <br />
            ইমেইল: <strong>support@greendreams.com</strong>
          </p>
          <div className="pt-2 text-xs font-semibold text-botanical-600">
            <span>সপ্তাহে ৭ দিন সরাসরি সহায়তা</span>
          </div>
        </div>

        {/* WhatsApp Chat */}
        <div className="p-8 rounded-3xl bg-white border border-warm-200 text-center space-y-3 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-lg text-botanical-950">হোয়াটসঅ্যাপ চ্যাট</h3>
            <p className="text-sm text-botanical-700 leading-relaxed">
              ছবি পাঠিয়ে গাছের সমস্যা ও পরিচর্যা সম্পর্কে বোটানিস্টদের সাথে কথা বলুন।
            </p>
          </div>
          <div className="pt-3">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-3xl bg-white border border-warm-200 p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-botanical-950">
            সাধারণ জিজ্ঞাসা (Frequently Asked Questions)
          </h2>
          <p className="text-sm text-botanical-600">
            গাছ ডেলিভারি ও পেমেন্ট সম্পর্কিত জরুরি প্রশ্নোত্তর
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200 space-y-1.5">
            <h4 className="font-bold text-botanical-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-botanical-700" />
              <span>ডেলিভারি চার্জ কত এবং কতদিন সময় লাগে?</span>
            </h4>
            <p className="text-xs text-botanical-700 leading-relaxed pl-6">
              ঢাকা শহরের ভেতরে ডেলিভারি চার্জ মাত্র ৬০ টাকা এবং সময় লাগে ২-৩ দিন। ঢাকার বাইরে সারা বাংলাদেশে কুরিয়ার চার্জ ১৩০ টাকা (৩-৫ দিন)।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200 space-y-1.5">
            <h4 className="font-bold text-botanical-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-botanical-700" />
              <span>অগ্রিম টাকা দিতে হবে কি?</span>
            </h4>
            <p className="text-xs text-botanical-700 leading-relaxed pl-6">
              না। গ্রিন ড্রিমস সম্পূর্ণ ক্যাশ অন ডেলিভারি (COD) পদ্ধতিতে কাজ করে। গাছ হাতে পেয়ে দেখে বুঝে মূল্য পরিশোধ করতে পারবেন।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200 space-y-1.5">
            <h4 className="font-bold text-botanical-900 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-botanical-700" />
              <span>ডেলিভারির সময় গাছের কোনো ক্ষতি হলে কী করব?</span>
            </h4>
            <p className="text-xs text-botanical-700 leading-relaxed pl-6">
              আমাদের রয়েছে সুরক্ষিত কাস্টম প্ল্যান্ট প্যাকেজিং। তবুও কোনো গাছ ক্ষতিগ্রস্ত হলে তৎক্ষণাৎ ডেলিভারি রাইডারের সামনে আমাদের হোয়াটসঅ্যাপে ছবি পাঠালে রিপ্লেসমেন্ট দেওয়া হবে।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-warm-50/60 border border-warm-200 space-y-1.5">
            <h4 className="font-bold text-botanical-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-botanical-700" />
              <span>গাছের যত্ন কীভাবে নেব?</span>
            </h4>
            <p className="text-xs text-botanical-700 leading-relaxed pl-6">
              আমাদের ওয়েবসাইটের প্রতিটি প্রোডাক্ট পেজে বিস্তারিত প্ল্যান্ট কেয়ার গাইড রয়েছে। এছাড়া যেকোনো সময় হোয়াটসঅ্যাপে গাছের ছবি পাঠিয়ে পরামর্শ নিতে পারেন।
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
