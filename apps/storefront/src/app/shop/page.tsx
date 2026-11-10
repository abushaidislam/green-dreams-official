import Link from 'next/link'
import { Sprout } from 'lucide-react'
import { getStoreProducts, getStoreCategories } from '@/lib/medusa'
import { ProductCard } from '@/components/ProductCard'

export const metadata = {
  title: 'সকল গাছ ও নার্সারি আইটেম — Green Dreams',
  description: 'ইনডোর ও ব্যালকনি প্ল্যান্টস, সাকুলেন্ট এবং প্রিমিয়াম টব ও মাটির মিশ্রণ।',
}

export const revalidate = 60

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string }>
}) {
  const resolvedParams = await searchParams
  const categoryHandle = resolvedParams.category
  const lifestyleFilter = resolvedParams.filter

  const [categories, allProducts] = await Promise.all([
    getStoreCategories(),
    getStoreProducts({ limit: 50 }),
  ])

  // Filter products by selected category or lifestyle filter if provided
  let filteredProducts = allProducts

  if (categoryHandle) {
    filteredProducts = filteredProducts.filter((p) =>
      p.categories?.some((c) => c.handle === categoryHandle)
    )
  }

  if (lifestyleFilter) {
    if (lifestyleFilter === 'easy-care') {
      filteredProducts = filteredProducts.filter(
        (p) => p.metadata?.plant_care?.difficulty === 'easy'
      )
    } else if (lifestyleFilter === 'pet-safe') {
      filteredProducts = filteredProducts.filter(
        (p) => p.metadata?.plant_care?.petSafety === 'safe'
      )
    } else if (lifestyleFilter === 'low-light') {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.metadata?.plant_care?.light?.toLowerCase().includes('low') ||
          p.categories?.some((c) => c.handle === 'low-light-succulents')
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Page Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-botanical-600">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>/</span>
          <span>সব গাছ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          গাছের কালেকশন (All Plants)
        </h1>
        <p className="text-xs sm:text-sm text-botanical-700 max-w-2xl">
          আমাদের নার্সারির প্রতিটি গাছ বিশেষভাবে লালন-পালন করা এবং ঘরের ভেতর বা ব্যালকনিতে বেঁচে থাকার উপযোগী।
        </p>
      </div>

      {/* Filter Navigation */}
      <div className="space-y-3">
        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Link
            href="/shop"
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-96 ${
              !categoryHandle && !lifestyleFilter
                ? 'bg-botanical-900 text-white shadow-xs'
                : 'bg-white border border-warm-200/90 text-botanical-800 hover:bg-warm-100 shadow-2xs'
            }`}
          >
            সব গাছ ({allProducts.length})
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.handle}`}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-96 ${
                categoryHandle === cat.handle
                  ? 'bg-botanical-900 text-white shadow-xs'
                  : 'bg-white border border-warm-200/90 text-botanical-800 hover:bg-warm-100 shadow-2xs'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Lifestyle Quick-Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-xs font-bold text-botanical-700 whitespace-nowrap py-1">
            লাইফস্টাইল ফিল্টার:
          </span>
          <Link
            href="/shop?filter=easy-care"
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-96 flex items-center gap-1.5 ${
              lifestyleFilter === 'easy-care'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span>🌱</span>
            <span>সহজ যত্ন (বিগিনার ফ্রেন্ডলি)</span>
          </Link>
          <Link
            href="/shop?filter=low-light"
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-96 flex items-center gap-1.5 ${
              lifestyleFilter === 'low-light'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>☀️</span>
            <span>কম আলোতে মানানসই</span>
          </Link>
          <Link
            href="/shop?filter=pet-safe"
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition active:scale-96 flex items-center gap-1.5 ${
              lifestyleFilter === 'pet-safe'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <span>🐾</span>
            <span>পেট-সেফ (Pet Safe)</span>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-warm-200/90 p-8 space-y-3 shadow-2xs">
          <Sprout className="w-12 h-12 text-warm-400 mx-auto" />
          <h3 className="font-bold text-base text-botanical-900">এই ক্যাটাগরিতে কোনো গাছ পাওয়া যায়নি</h3>
          <p className="text-xs sm:text-sm text-botanical-600">অন্য কোনো ক্যাটাগরি ব্রাউজ করুন।</p>
          <Link
            href="/shop"
            className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-botanical-800 text-white text-xs font-bold active:scale-96"
          >
            সব গাছ দেখুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
