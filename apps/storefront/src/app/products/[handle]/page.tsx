import { notFound } from 'next/navigation'
import { getStoreProductByHandle } from '@/lib/medusa'
import { ProductDetailClient } from '@/components/ProductDetailClient'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getStoreProductByHandle(handle)

  if (!product) {
    return { title: 'Product Not Found — Green Dreams' }
  }

  return {
    title: `${product.title} — Green Dreams`,
    description:
      product.description ||
      `Buy ${product.title} with cash on delivery and verified plant care guidance across Bangladesh.`,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getStoreProductByHandle(handle)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
