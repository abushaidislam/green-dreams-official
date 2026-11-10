import Link from 'next/link'
import Image from 'next/image'
import {
  Sprout,
  Truck,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  Sun,
  Droplets,
  HeartHandshake,
  CheckCircle,
  Package,
  Clock,
  Sparkles,
  Star,
  Award,
  Leaf,
  RefreshCw,
  Compass,
  Check,
  Building,
  Wind,
  ShieldAlert,
} from 'lucide-react'
import { getStoreProducts, getStoreCategories } from '@/lib/medusa'
import { ProductCard } from '@/components/ProductCard'
import { LandingFaq } from '@/components/LandingFaq'
import { getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export const revalidate = 60

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getStoreProducts({ limit: 8 }),
    getStoreCategories(),
  ])

  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    'Hello Green Dreams, I would like guidance on choosing the right plants for my apartment.'
  )

  return (
    <div className="flex-1 flex flex-col space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center border-b border-warm-200/50">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Green Dreams Nursery - Plants for Home & Balcony"
            fill
            priority
            quality={95}
            className="object-cover object-[72%_center] sm:object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-14 lg:py-16">
          <div className="max-w-md lg:max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900/5 text-botanical-900 text-[11px] font-semibold border border-botanical-900/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>ঢাকা নার্সারি থেকে সরাসরি আপনার ঘরে</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-botanical-950 tracking-tight leading-[1.2]">
              সবুজে সাজুক <br className="hidden sm:inline" />
              আপনার ঘর ও মন
            </h1>

            <p className="text-xs sm:text-sm text-botanical-900/85 font-medium leading-relaxed max-w-sm sm:max-w-md">
              বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি। বাতাস পরিশোধনকারী ইনডোর প্ল্যান্টস, ব্যালকনি গাছ এবং প্রতিটি গাছের সাথে শতভাগ সঠিক যত্ন নির্দেশিকা।
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-botanical-800 hover:bg-botanical-900 text-white font-semibold text-xs transition active:scale-98 shadow-xs"
              >
                <span>গাছ দেখুন (Shop Plants)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/90 hover:bg-white text-botanical-900 font-semibold text-xs border border-botanical-900/10 transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>হোয়াটসঅ্যাপে পরামর্শ</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 border-t border-botanical-900/10 text-[11px] sm:text-xs text-botanical-900 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>ক্যাশ অন ডেলিভারি (COD)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>ঢাকা ৬০৳ ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>১০০% সতেজ গাছ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Assurance & Trust Badges Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-warm-200/90 shadow-sm">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-botanical-950">ঢাকা ৬০৳ ও সারা দেশে ১৩০৳</h4>
              <p className="text-[11px] text-botanical-600">নিরাপদ কুরিয়ার ও নিজস্ব ডেলিভারি</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-botanical-950">১০০% ক্যাশ অন ডেলিভারি</h4>
              <p className="text-[11px] text-botanical-600">গাছ দেখে বুঝে মূল্য পরিশোধ করুন</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-botanical-50 text-botanical-800 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-botanical-950">সতেজ নার্সারি সিলেকশন</h4>
              <p className="text-[11px] text-botanical-600">সুস্থ মূল ও পোক্ত শাখা নিশ্চয়তা</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-botanical-950">ফ্রি কেয়ার কনসাল্টেশন</h4>
              <p className="text-[11px] text-botanical-600">আজীবন হোয়াটসঅ্যাপ সহায়তা</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-2">
            ক্যাটাগরি সমূহ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-900 tracking-tight">
            আপনার ঘরের জন্য সঠিক গাছ বেছে নিন
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.handle}`}
              className="group p-5 rounded-2xl bg-white border border-warm-200 hover:border-botanical-400 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-botanical-50 text-botanical-700 flex items-center justify-center group-hover:bg-botanical-100 group-hover:scale-105 transition-all">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base text-botanical-900 group-hover:text-botanical-700 transition">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-botanical-600 line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Lifestyle Plant Finder Cards (নতুন সেকশন) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-warm-100 to-warm-50 border border-warm-200/80 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-1">
              উদ্দেশ্য ও লাইফস্টাইল
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-950 tracking-tight">
              আপনার ঘরের চাহিদামাফিক গাছ খুঁজুন
            </h2>
            <p className="text-xs sm:text-sm text-botanical-700 mt-1">
              আলোর স্বল্পতা কিংবা ব্যস্ত জীবন—প্রতিটি পরিবেশের জন্যই আমাদের কাছে রয়েছে উপযোগী উদ্ভিদ।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/shop"
              className="group p-5 rounded-2xl bg-white border border-warm-200/80 hover:border-botanical-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-botanical-950 group-hover:text-botanical-800 transition">
                    কম আলোতে মানানসই
                  </h3>
                  <p className="text-xs text-botanical-600 mt-1 leading-relaxed">
                    জানালা থেকে দূরে বা কম রোদের ফ্ল্যাটের জন্য যেমন স্নেক প্ল্যান্ট ও জি জি প্ল্যান্ট।
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4 group-hover:translate-x-1 transition">
                <span>গাছগুলো দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/shop"
              className="group p-5 rounded-2xl bg-white border border-warm-200/80 hover:border-botanical-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-botanical-950 group-hover:text-botanical-800 transition">
                    বাতাস পরিশোধনকারী
                  </h3>
                  <p className="text-xs text-botanical-600 mt-1 leading-relaxed">
                    ঘরের ভেতর ফরমালডিহাইড ও টক্সিন দূর করে ফ্রেশ অক্সিজেন বৃদ্ধি করে (যেমন পিস লিলি)।
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4 group-hover:translate-x-1 transition">
                <span>গাছগুলো দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/shop"
              className="group p-5 rounded-2xl bg-white border border-warm-200/80 hover:border-botanical-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-botanical-950 group-hover:text-botanical-800 transition">
                    অফিস ও স্টাডি ডেস্ক
                  </h3>
                  <p className="text-xs text-botanical-600 mt-1 leading-relaxed">
                    কম্প্যাক্ট সাইজ যা কাজের টেবিলে চোখের ক্লান্তি দূর করে ও কাজের মনোযোগ বাড়ায়।
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4 group-hover:translate-x-1 transition">
                <span>গাছগুলো দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              href="/shop"
              className="group p-5 rounded-2xl bg-white border border-warm-200/80 hover:border-botanical-400 hover:shadow-sm transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-botanical-950 group-hover:text-botanical-800 transition">
                    সহজ যত্ন (বিগিনার ফ্রেন্ডলি)
                  </h3>
                  <p className="text-xs text-botanical-600 mt-1 leading-relaxed">
                    পানি কম দিলেও বেঁচে থাকে, যারা প্রথমবার গাছপালন শুরু করছেন তাদের জন্য উপযুক্ত।
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-4 group-hover:translate-x-1 transition">
                <span>গাছগুলো দেখুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Featured Plants (Live Medusa Data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-1">
              সরাসরি নার্সারি থেকে
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-900 tracking-tight">
              জনপ্রিয় ইনডোর ও ব্যালকনি গাছ
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-botanical-700 hover:text-botanical-900 transition"
          >
            <span>সব গাছ দেখুন ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-warm-200 p-8">
            <Sprout className="w-12 h-12 text-warm-400 mx-auto mb-3" />
            <p className="text-sm text-botanical-700">বর্তমানে কোনো পণ্য পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Why Green Dreams (কেন গ্রিন ড্রিমস সেরা — ৪টি প্রতিশ্রুতি) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-2">
            আমাদের বৈশিষ্ট্য
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-950 tracking-tight">
            গাছপ্রেমীদের বিশ্বস্ত ঠিকানা — গ্রিন ড্রিমস
          </h2>
          <p className="text-xs sm:text-sm text-botanical-700 mt-2">
            আমরা শুধু গাছ বিক্রি করি না, সুস্থ সবল উদ্ভিদের মাধ্যমে প্রতিটি ঘরে এক টুকরো সজীব প্রকৃতি গড়ে তুলি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-warm-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-botanical-950">সুস্থ শিকড়ের নিশ্চয়তা</h3>
            <p className="text-xs text-botanical-700 leading-relaxed">
              অভিজ্ঞ মালিদের তত্ত্বাবধানে শিকড় মজবুত হওয়া গাছই কেবল ডেলিভারির জন্য নির্বাচন করা হয়। কোনো দুর্বল চারা দেওয়া হয় না।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-warm-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-botanical-950">ম্যাস-ফ্রি নিরাপদ প্যাকেজিং</h3>
            <p className="text-xs text-botanical-700 leading-relaxed">
              স্পেশাল প্ল্যান্ট বক্সে টব এবং পাতা দৃঢ়ভাবে লক করা থাকে। পথিমধ্যে ঝাঁকুনিতেও টবের মাটি বা পাতা অক্ষত থাকে।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-warm-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-botanical-950">৪৮ ঘণ্টার রিপ্লেসমেন্ট</h3>
            <p className="text-xs text-botanical-700 leading-relaxed">
              ডেলিভারির পর কোনো কারণে ক্ষতিগ্রস্ত হলে ৪৮ ঘণ্টার মধ্যে ছবি পাঠিয়ে বিনা খরচে নতুন রিপ্লেসমেন্ট পেয়ে যাবেন।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-warm-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-botanical-50 text-botanical-800 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-botanical-950">বাংলায় কেয়ার নির্দেশিকা</h3>
            <p className="text-xs text-botanical-700 leading-relaxed">
              প্রতিটি গাছের সঙ্গে সহজ বাংলায় আলো, পানি ও সারের টিপস সংযুক্ত থাকে, যাতে যে কেউ অনায়াসে গাছ বড় করতে পারেন।
            </p>
          </div>
        </div>
      </section>

      {/* 7. How It Works (সহজ ৪টি ধাপে ডেলিভারি) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-botanical-950 text-white p-6 sm:p-12 overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 block mb-2">
              সহজ প্রক্রিয়া
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              গাছ পৌঁছে যাবে মাত্র ৪টি সহজ ধাপে
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="space-y-3 p-4 rounded-2xl bg-botanical-900/60 border border-botanical-800">
              <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-black">
                ০১
              </span>
              <h3 className="font-bold text-base text-white">গাছ ও সাইজ পছন্দ করুন</h3>
              <p className="text-xs text-botanical-300 leading-relaxed">
                আমাদের ক্যাটালগ থেকে ঘরের উপযোগী ইনডোর বা ব্যালকনি গাছ ও পছন্দের টবের সাইজ সিলেক্ট করুন।
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-botanical-900/60 border border-botanical-800">
              <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-black">
                ০২
              </span>
              <h3 className="font-bold text-base text-white">অগ্রিম ছাড়া অর্ডার দিন</h3>
              <p className="text-xs text-botanical-300 leading-relaxed">
                কোনো কার্ড বা অগ্রিম বিকাশের ঝামেলা নেই। শুধু নাম, ফোন নম্বর ও ঠিকানা দিয়ে অর্ডার কনফার্ম করুন।
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-botanical-900/60 border border-botanical-800">
              <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-black">
                ০৩
              </span>
              <h3 className="font-bold text-base text-white">নার্সারি প্যাকিং ও ডেলিভারি</h3>
              <p className="text-xs text-botanical-300 leading-relaxed">
                আমাদের অভিজ্ঞ টিম সতেজ গাছটি নিরাপদ বক্সে প্যাক করে ঢাকা (৬০৳) বা দেশের যেকোনো প্রান্তে পৌঁছে দেয়।
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-botanical-900/60 border border-botanical-800">
              <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-black">
                ০৪
              </span>
              <h3 className="font-bold text-base text-white">দেখে মূল্য পরিশোধ করুন</h3>
              <p className="text-xs text-botanical-300 leading-relaxed">
                ডেলিভারি ম্যানের সামনে গাছ সুস্থ অবস্থায় চেক করে ক্যাশ অন ডেলিভারিতে নিশ্চিন্তে মূল্য পরিশোধ করুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews & Social Proof (বাস্তব গ্রাহকদের রিভিউ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>৪.৯ / ৫.০ রেটিং (১,২০০+ সফল ডেলিভারি)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-950 tracking-tight">
            গ্রাহকরা কেন আমাদের ভালোবাসেন?
          </h2>
          <p className="text-xs sm:text-sm text-botanical-700 mt-1">
            ঢাকা ও সারা বাংলাদেশের ফ্ল্যাট ও বাসা সাজাতে গ্রিন ড্রিমসের গ্রাহকদের বাস্তব অভিজ্ঞতা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-warm-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-botanical-800 leading-relaxed">
                “আমার অ্যাপার্টমেন্টের জন্য মনস্টেরা আর পিস লিলি নিয়েছিলাম। মাত্র ৬০ টাকায় ২ দিনের মাথায় এত নিখুঁত প্যাকেজিংয়ে পেয়েছি যে টবের মাটি একটুও নড়েনি! পাতাগুলো একদম তাজা ও চকচকে ছিল।”
              </p>
            </div>
            <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-botanical-950">নাফিসা করিম</h4>
                <p className="text-[11px] text-botanical-600">ধানমন্ডি, ঢাকা</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ ভেরিফাইড বায়ার
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-warm-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-botanical-800 leading-relaxed">
                “অফিস ডেস্কে রাখার জন্য স্নেক প্ল্যান্ট আর জি জি প্ল্যান্ট অর্ডার করেছিলাম। কোনো অগ্রিম টাকা দিতে হয়নি। সাথে দেওয়া কেয়ার কার্ডটা দেখে পানি দেওয়ার নিয়ম বোঝা খুব সহজ হয়েছে।”
              </p>
            </div>
            <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-botanical-950">তানভীর আহমেদ</h4>
                <p className="text-[11px] text-botanical-600">উত্তরা, ঢাকা</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ ভেরিফাইড বায়ার
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-warm-200/90 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-botanical-800 leading-relaxed">
                “ঢাকার বাইরে কুরিয়ারে গাছ বেঁচে থাকবে কি না তা নিয়ে দ্বিধায় ছিলাম। ৪ দিনের মধ্যে চট্টগ্রামে অক্ষত অবস্থায় পৌঁছেছে। পরে হোয়াটসঅ্যাপে পরিচর্যা নিয়ে প্রশ্ন করলে সঙ্গে সঙ্গে উত্তর পেয়েছি।”
              </p>
            </div>
            <div className="pt-3 border-t border-warm-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-botanical-950">ফারহানা হক</h4>
                <p className="text-[11px] text-botanical-600">জিইসি মোড়, চট্টগ্রাম</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ✓ ভেরিফাইড বায়ার
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Interactive FAQ Accordion (সাধারণ জিজ্ঞাসা) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-1">
            সচরাচর জিজ্ঞাসা
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-botanical-950 tracking-tight">
            আপনার মনের প্রশ্নগুলোর উত্তর
          </h2>
        </div>

        <LandingFaq />
      </section>

      {/* 10. Plant Care Value Proposition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-botanical-900 text-white p-8 sm:p-14 overflow-hidden relative shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-botanical-300">
                গ্রিন ড্রিমস স্পেশাল
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                গাছ কেনা শেষ নয়, পরিচর্যাতেও আমরা আপনার পাশে
              </h2>
              <p className="text-sm sm:text-base text-botanical-200 leading-relaxed font-normal">
                আমাদের প্রতিটি গাছের সাথে থাকছে আলো, পানি, এবং আর্দ্রতা সম্পর্কিত সম্পূর্ণ নির্দেশিকা। কোনো গাছ নিয়ে দ্বিধায় থাকলে আমাদের নার্সারি এক্সপার্টদের সাথে কথা বলতে পারেন যেকোনো সময়।
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">সঠিক আলোর গাইড</h4>
                    <p className="text-xs text-botanical-300 mt-0.5">রুমের আলোর মাত্রা অনুযায়ী গাছের উপযোগী অবস্থান।</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">পানি দেওয়ার রুটিন</h4>
                    <p className="text-xs text-botanical-300 mt-0.5">মৌসুম অনুযায়ী অতিরিক্ত পানি দেওয়া রোধের টিপস।</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-botanical-800/80 rounded-2xl p-6 sm:p-8 border border-botanical-700/80 space-y-4">
              <h3 className="font-extrabold text-lg text-white">ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা</h3>
              <ul className="space-y-3 text-sm text-botanical-200">
                <li className="flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>ঢাকা সিটি:</strong> মাত্র ৬০ টাকায় ২-৩ কার্যদিবসে দ্রুত ডেলিভারি।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>ঢাকার বাইরে:</strong> সারা দেশে মাত্র ১৩০ টাকায় নিরাপদ কুরিয়ার ডেলিভারি।</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>ক্যাশ অন ডেলিভারি:</strong> গাছ হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-botanical-900 font-bold text-sm hover:bg-warm-100 transition"
                >
                  এখনই গাছ অর্ডার করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
