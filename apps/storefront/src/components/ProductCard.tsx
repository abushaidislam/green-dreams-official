'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Check, Sparkles } from 'lucide-react'
import { StoreProduct } from '@/lib/medusa'
import { formatBDT } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

export function ProductCard({ product }: { product: StoreProduct }) {
  const { addToCart, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const plantCare = product.metadata?.plant_care
  const defaultVariant = product.variants?.[0]
  const price = defaultVariant?.prices?.find((p) => p.currency_code === 'bdt')?.amount || 0
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=600&q=80'

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!defaultVariant?.id) return
    const success = await addToCart(defaultVariant.id, 1)
    if (success) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <div className="group rounded-2xl bg-white border border-warm-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <Link href={`/products/${product.handle}`} className="relative aspect-square w-full bg-warm-100 overflow-hidden block">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Difficulty or Type Badge */}
        {plantCare?.difficulty && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                plantCare.difficulty === 'easy'
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-amber-500/90 text-white'
              }`}
            >
              {plantCare.difficulty === 'easy' ? 'সহজ যত্ন (Easy Care)' : 'মাঝারি যত্ন (Moderate)'}
            </span>
          </div>
        )}

        {/* Pet Safety Badge */}
        {plantCare?.petSafety === 'safe' && (
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
              🐾 পেট-ফ্রেন্ডলি
            </span>
          </div>
        )}
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {plantCare?.scientificName && (
            <span className="text-xs italic text-botanical-600 block mb-1">
              {plantCare.scientificName}
            </span>
          )}
          <Link href={`/products/${product.handle}`}>
            <h3 className="font-bold text-botanical-900 group-hover:text-botanical-700 text-base leading-snug line-clamp-1 transition">
              {product.title}
            </h3>
          </Link>
          {product.subtitle && (
            <p className="text-xs text-botanical-600 mt-1 line-clamp-1">
              {product.subtitle}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-warm-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-warm-500 block leading-none mb-1">মূল্য</span>
            <span className="text-lg font-extrabold text-botanical-900">
              {formatBDT(price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isLoading || !defaultVariant?.id}
            aria-label="কার্টে যোগ করুন"
            className={`inline-flex items-center justify-center p-2.5 rounded-xl font-medium text-xs transition shadow-xs ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-botanical-700 hover:bg-botanical-800 text-white active:scale-95'
            }`}
          >
            {added ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
