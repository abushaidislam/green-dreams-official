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
} from 'lucide-react'
import { getStoreProducts, getStoreCategories } from '@/lib/medusa'
import { ProductCard } from '@/components/ProductCard'
import { getWhatsAppSupportLink } from '@/lib/utils'

export const revalidate = 60

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getStoreProducts({ limit: 6 }),
    getStoreCategories(),
  ])

  const whatsAppLink = getWhatsAppSupportLink(
    '8801700000000',
    'Hello Green Dreams, I would like guidance on choosing the right plants for my apartment.'
  )

  return (
    <div className="flex-1 flex flex-col space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center border-b border-warm-200/50">
        {/* Full Image Background - completely clear and visible */}
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

        {/* Content container aligned smoothly onto the open sunny wall area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-14 lg:py-16">
          <div className="max-w-md lg:max-w-lg space-y-4">
            {/* Smooth compact badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-botanical-900/5 text-botanical-900 text-[11px] font-semibold border border-botanical-900/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>ঢাকা নার্সারি থেকে সরাসরি আপনার ঘরে</span>
            </div>

            {/* Clean, refined headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-botanical-950 tracking-tight leading-[1.2]">
              সবুজে সাজুক <br className="hidden sm:inline" />
              আপনার ঘর ও মন
            </h1>

            {/* Smooth, compact description */}
            <p className="text-xs sm:text-sm text-botanical-900/85 font-medium leading-relaxed max-w-sm sm:max-w-md">
              বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি। বাতাস পরিশোধনকারী ইনডোর প্ল্যান্টস, ব্যালকনি গাছ এবং প্রতিটি গাছের সাথে শতভাগ সঠিক যত্ন নির্দেশিকা।
            </p>

            {/* Clean CTA buttons */}
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

            {/* Subtle, minimalist trust indicators without boxes or heavy shadows */}
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

      {/* 2. Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-2">
            ক্যাটাগরি সমূহ
          </span>
          <h2 className="text-3xl font-extrabold text-botanical-900 tracking-tight">
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

      {/* 3. Featured Plants (Live Medusa Data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-botanical-600 block mb-1">
              সরাসরি নার্সারি থেকে
            </span>
            <h2 className="text-3xl font-extrabold text-botanical-900 tracking-tight">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Plant Care Value Proposition */}
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
