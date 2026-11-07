'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { BACKEND_URL, PUBLISHABLE_KEY } from '@/lib/medusa'

interface CartItem {
  id: string
  title: string
  quantity: number
  unit_price: number
  thumbnail?: string
  variant?: {
    id: string
    title: string
    product?: {
      title: string
      handle: string
    }
  }
}

interface Cart {
  id: string
  region_id?: string
  currency_code?: string
  items?: CartItem[]
  subtotal?: number
  shipping_total?: number
  total?: number
  shipping_methods?: {
    id: string
    name: string
    amount: number
  }[]
}

interface CartContextType {
  cart: Cart | null
  itemCount: number
  isLoading: boolean
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  addToCart: (variantId: string, quantity?: number) => Promise<boolean>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  clearCart: () => void
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'green_dreams_cart_id'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-publishable-api-key': PUBLISHABLE_KEY,
  }

  // Fetch or create cart for Bangladesh region
  const getOrCreateCart = useCallback(async (): Promise<string | null> => {
    try {
      const storedCartId = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null

      if (storedCartId) {
        const res = await fetch(`${BACKEND_URL}/store/carts/${storedCartId}?fields=+items.variant.product`, {
          headers,
        })
        if (res.ok) {
          const data = await res.json()
          if (data.cart) {
            setCart(data.cart)
            return data.cart.id
          }
        }
      }

      // Fetch Bangladesh region
      const regRes = await fetch(`${BACKEND_URL}/store/regions`, { headers })
      const regData = await regRes.json()
      const bdRegion = regData.regions?.find((r: any) => r.currency_code === 'bdt') || regData.regions?.[0]

      if (!bdRegion) return null

      // Create new cart
      const createRes = await fetch(`${BACKEND_URL}/store/carts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          region_id: bdRegion.id,
          currency_code: 'bdt',
        }),
      })

      if (!createRes.ok) return null
      const createData = await createRes.json()
      if (createData.cart) {
        setCart(createData.cart)
        if (typeof window !== 'undefined') {
          localStorage.setItem(CART_STORAGE_KEY, createData.cart.id)
        }
        return createData.cart.id
      }
      return null
    } catch (err) {
      console.error('Failed to get or create cart:', err)
      return null
    }
  }, [])

  // Initialize cart on mount
  useEffect(() => {
    getOrCreateCart()
  }, [getOrCreateCart])

  const refreshCart = useCallback(async () => {
    const cartId = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null
    if (!cartId) return
    try {
      const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}?fields=+items.variant.product`, {
        headers,
      })
      if (res.ok) {
        const data = await res.json()
        setCart(data.cart)
      }
    } catch (err) {
      console.error('Failed to refresh cart:', err)
    }
  }, [])

  const addToCart = async (variantId: string, quantity: number = 1): Promise<boolean> => {
    try {
      setIsLoading(true)
      let cartId = cart?.id || (await getOrCreateCart())
      if (!cartId) throw new Error('Could not initialize cart')

      const res = await fetch(`${BACKEND_URL}/store/carts/${cartId}/line-items`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          variant_id: variantId,
          quantity,
        }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Failed to add item to cart')
      }

      await refreshCart()
      setIsDrawerOpen(true)
      return true
    } catch (err: any) {
      console.error('Add to cart error:', err)
      alert(err.message || 'কার্টে যোগ করা সম্ভব হয়নি')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart?.id) return
    try {
      setIsLoading(true)
      if (quantity <= 0) {
        await removeItem(lineItemId)
        return
      }

      const res = await fetch(`${BACKEND_URL}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ quantity }),
      })

      if (res.ok) {
        await refreshCart()
      }
    } catch (err) {
      console.error('Failed to update line item quantity:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (lineItemId: string) => {
    if (!cart?.id) return
    try {
      setIsLoading(true)
      const res = await fetch(`${BACKEND_URL}/store/carts/${cart.id}/line-items/${lineItemId}`, {
        method: 'DELETE',
        headers,
      })
      if (res.ok) {
        await refreshCart()
      }
    } catch (err) {
      console.error('Failed to delete line item:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = () => {
    setCart(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        isLoading,
        isDrawerOpen,
        setIsDrawerOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
