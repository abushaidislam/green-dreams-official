import Medusa from '@medusajs/js-sdk'

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
export const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  'pk_f99102c7f3f02d9814198899e7f43186c556d291e9283329a440e6db1fe6d480'

export const sdk = new Medusa({
  baseUrl: BACKEND_URL,
  publishableKey: PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === 'development',
})

export interface PlantCareProfile {
  plantType?: 'indoor' | 'outdoor' | 'succulent' | 'flowering' | 'tree' | 'other'
  scientificName?: string
  light?: string
  watering?: string
  humidity?: string
  difficulty?: 'easy' | 'medium' | 'advanced'
  petSafety?: 'unknown' | 'safe' | 'unsafe'
  careInstructions?: string
  sourceVerified?: boolean
}

export interface StoreProduct {
  id: string
  title: string
  subtitle?: string
  description?: string
  handle: string
  thumbnail?: string
  images?: { id: string; url: string }[]
  options?: { id: string; title: string; values: { id: string; value: string }[] }[]
  variants?: {
    id: string
    title: string
    sku?: string
    prices?: { id: string; amount: number; currency_code: string }[]
    calculated_price?: { calculated_amount: number; currency_code: string }
    inventory_quantity?: number
    manage_inventory?: boolean
  }[]
  categories?: { id: string; name: string; handle: string }[]
  metadata?: {
    plant_care?: PlantCareProfile
  }
}

export interface StoreCategory {
  id: string
  name: string
  handle: string
  description?: string
}

/**
 * Fetch products from Medusa Store API with plant care metadata and prices
 */
export async function getStoreProducts(params?: {
  category_id?: string[]
  handle?: string
  limit?: number
}): Promise<StoreProduct[]> {
  try {
    const queryParams: Record<string, any> = {
      fields: '+metadata,+variants.prices,+categories',
      limit: params?.limit || 20,
    }
    if (params?.category_id?.length) {
      queryParams['category_id'] = params.category_id
    }
    if (params?.handle) {
      queryParams['handle'] = params.handle
    }

    const res = await fetch(`${BACKEND_URL}/store/products?${new URLSearchParams(queryParams).toString()}`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 15 },
    })

    if (!res.ok) {
      console.error(`Failed to fetch store products: ${res.status} ${res.statusText}`)
      return []
    }

    const data = await res.json()
    return data.products || []
  } catch (err) {
    console.error('Error fetching store products:', err)
    return []
  }
}

/**
 * Fetch a single product by handle
 */
export async function getStoreProductByHandle(handle: string): Promise<StoreProduct | null> {
  const products = await getStoreProducts({ handle, limit: 1 })
  return products[0] || null
}

/**
 * Fetch product categories from Medusa Store API
 */
export async function getStoreCategories(): Promise<StoreCategory[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/product-categories`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      next: { revalidate: 120 },
    })

    if (!res.ok) {
      return []
    }

    const data = await res.json()
    return data.product_categories || []
  } catch (err) {
    console.error('Error fetching categories:', err)
    return []
  }
}

/**
 * Fetch Bangladesh Region
 */
export async function getBangladeshRegion(): Promise<{ id: string; currency_code: string; name: string } | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        'x-publishable-api-key': PUBLISHABLE_KEY,
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) return null
    const data = await res.json()
    const bd = data.regions?.find((r: any) => r.currency_code === 'bdt') || data.regions?.[0]
    return bd || null
  } catch (err) {
    console.error('Error fetching region:', err)
    return null
  }
}
