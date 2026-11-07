import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Sprout } from 'lucide-react'
import { getStoreProducts, getStoreCategories } from '@/lib/medusa'
import { ProductCard } from '@/components/ProductCard'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const categories = await getStoreCategories()
  const category = categories.find((c) => c.handle === handle)

  if (!category) {
    return { title: 'Category Not Found — Green Dreams' }
  }

  return {
    title: `${category.name} — Green Dreams`,
    description: category.description || `Browse ${category.name} at Green Dreams Bangladesh`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [categories, allProducts] = await Promise.all([
    getStoreCategories(),
    getStoreProducts({ limit: 50 }),
  ])

  const category = categories.find((c) => c.handle === handle)
  if (!category) {
    notFound()
  }

  const categoryProducts = allProducts.filter((p) =>
    p.categories?.some((c) => c.handle === handle)
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-botanical-600">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:underline">
          সব গাছ
        </Link>
        <span>/</span>
        <span className="text-botanical-900">{category.name}</span>
      </div>

      {/* Category Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-botanical-100/60 border border-botanical-200/80 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-sm sm:text-base text-botanical-800 max-w-2xl">
            {category.description}
          </p>
        )}
      </div>

      {/* Products Grid */}
      {categoryProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-warm-200 p-8 space-y-3">
          <Sprout className="w-12 h-12 text-warm-400 mx-auto" />
          <h3 className="font-bold text-lg text-botanical-900">
            এই মুহূর্তে এই ক্যাটাগরিতে কোনো পণ্য নেই
          </h3>
          <Link
            href="/shop"
            className="inline-block mt-3 px-5 py-2 rounded-xl bg-botanical-700 text-white text-xs font-semibold"
          >
            সব গাছ দেখুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
