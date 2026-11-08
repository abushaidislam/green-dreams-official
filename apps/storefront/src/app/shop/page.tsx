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
  searchParams: Promise<{ category?: string }>
}) {
  const resolvedParams = await searchParams
  const categoryHandle = resolvedParams.category

  const [categories, allProducts] = await Promise.all([
    getStoreCategories(),
    getStoreProducts({ limit: 50 }),
  ])

  // Filter products by selected category if provided
  const filteredProducts = categoryHandle
    ? allProducts.filter((p) =>
        p.categories?.some((c) => c.handle === categoryHandle)
      )
    : allProducts

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-botanical-600">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>/</span>
          <span>সব গাছ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          গাছের কালেকশন (All Plants)
        </h1>
        <p className="text-sm text-botanical-700 max-w-2xl">
          আমাদের নার্সারির প্রতিটি গাছ বিশেষভাবে লালন-পালন করা এবং ঘরের ভেতর বা ব্যালকনিতে বেঁচে থাকার উপযোগী।
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
            !categoryHandle
              ? 'bg-botanical-800 text-white shadow-xs'
              : 'bg-white border border-warm-200 text-botanical-800 hover:bg-warm-100'
          }`}
        >
          সব গাছ ({allProducts.length})
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.handle}`}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
              categoryHandle === cat.handle
                ? 'bg-botanical-800 text-white shadow-xs'
                : 'bg-white border border-warm-200 text-botanical-800 hover:bg-warm-100'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-warm-200 p-8 space-y-3">
          <Sprout className="w-12 h-12 text-warm-400 mx-auto" />
          <h3 className="font-bold text-lg text-botanical-900">এই ক্যাটাগরিতে কোনো গাছ পাওয়া যায়নি</h3>
          <p className="text-sm text-botanical-600">অন্য কোনো ক্যাটাগরি ব্রাউজ করুন।</p>
          <Link
            href="/shop"
            className="inline-block mt-3 px-5 py-2 rounded-xl bg-botanical-700 text-white text-xs font-semibold"
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
