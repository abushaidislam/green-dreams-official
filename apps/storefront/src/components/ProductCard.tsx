'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Check } from 'lucide-react'
import { StoreProduct } from '@/lib/medusa'
import { cleanProductTitle, getProductPriceDetails } from '@/lib/utils'
import { useCart } from '@/context/CartContext'

const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'

export function ProductCard({ product }: { product: StoreProduct }) {
  const { addToCart, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const plantCare = product.metadata?.plant_care
  const defaultVariant = product.variants?.[0]
  const cleanTitle = cleanProductTitle(product.title)
  const priceDetails = getProductPriceDetails(product, defaultVariant?.id)

  const rawImage =
    product.thumbnail ||
    product.images?.[0]?.url ||
    DEFAULT_FALLBACK_IMAGE

  const [imageSrc, setImageSrc] = useState(rawImage)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!defaultVariant?.id) return
    const success = await addToCart(defaultVariant.id, 1)
    if (success) {
      setAdded(true)
      setTimeout(() => setAdded(false), 1800)
    }
  }

  // Difficulty badge styling
  const difficultyLabel =
    plantCare?.difficulty === 'easy'
      ? 'সহজ যত্ন'
      : plantCare?.difficulty === 'medium'
      ? 'মাঝারি যত্ন'
      : plantCare?.difficulty === 'advanced'
      ? 'স্পেশাল কেয়ার'
      : null

  const isPetSafe = plantCare?.petSafety === 'safe'
  const variantCount = product.variants?.length || 1

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-warm-200/80 p-2 sm:p-2.5 transition-all duration-300 ease-out hover:border-botanical-300 hover:shadow-lg hover:shadow-botanical-950/6 hover:-translate-y-0.5">
      {/* 1. Square Photo Container with subtle inset outline */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-b from-warm-100/60 to-warm-100 block ring-1 ring-black/5"
      >
        <Image
          src={imageSrc}
          alt={cleanTitle}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImageSrc(DEFAULT_FALLBACK_IMAGE)}
        />

        {/* Floating Minimal Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          {difficultyLabel ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 backdrop-blur-xs text-botanical-900 border border-white/80 shadow-2xs">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  plantCare?.difficulty === 'easy'
                    ? 'bg-emerald-500'
                    : plantCare?.difficulty === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-violet-500'
                }`}
              />
              <span>{difficultyLabel}</span>
            </span>
          ) : (
            <span />
          )}

          {isPetSafe && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-emerald-50/95 backdrop-blur-xs text-emerald-800 border border-emerald-200/80 shadow-2xs">
              <span>🐾</span>
              <span>সেফ</span>
            </span>
          )}
        </div>

        {/* Small Variant Count Indicator */}
        {variantCount > 1 && (
          <div className="absolute bottom-2 left-2 pointer-events-none">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-medium bg-botanical-950/80 backdrop-blur-xs text-white shadow-2xs">
              {variantCount} সাইজ
            </span>
          </div>
        )}
      </Link>

      {/* 2. Content Body - Compact & Clean */}
      <div className="pt-2.5 px-1 pb-0.5 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-0.5">
          {plantCare?.scientificName && (
            <span className="text-[9px] uppercase font-mono tracking-wider text-botanical-500 block truncate">
              {plantCare.scientificName}
            </span>
          )}

          <Link href={`/products/${product.handle}`} className="block group/link">
            <h3 className="font-bold text-botanical-950 group-hover/link:text-botanical-700 text-xs sm:text-sm leading-snug line-clamp-1 transition-colors">
              {cleanTitle}
            </h3>
          </Link>

          {product.subtitle && (
            <p className="text-[11px] text-botanical-600 line-clamp-1 leading-normal font-normal">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* 3. Bottom Price & Action Button */}
        <div className="pt-2 border-t border-warm-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col">
            <span className="text-[9px] font-medium text-botanical-500 uppercase tracking-wider leading-none mb-0.5">
              {priceDetails.hasMultiplePrices ? 'শুরু' : 'মূল্য'}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-botanical-950 tracking-tight leading-none tabular-nums">
              {priceDetails.hasMultiplePrices ? priceDetails.formattedRange : priceDetails.formatted}
            </span>
          </div>

          {/* Minimal Tactile Action Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isLoading || !defaultVariant?.id}
            aria-label="কার্টে যোগ করুন"
            title="কার্টে যোগ করুন"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-2xs flex-shrink-0 ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-105'
                : 'bg-botanical-900 hover:bg-botanical-950 text-white'
            }`}
          >
            {added ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
