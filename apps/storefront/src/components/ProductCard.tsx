'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Check, Sparkles, Heart } from 'lucide-react'
import { StoreProduct } from '@/lib/medusa'
import { formatBDT, cleanProductTitle, getProductPriceDetails } from '@/lib/utils'
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
      setTimeout(() => setAdded(false), 2000)
    }
  }

  // Difficulty badge styling
  const difficultyLabel =
    plantCare?.difficulty === 'easy'
      ? 'সহজ যত্ন'
      : plantCare?.difficulty === 'medium'
      ? 'মাঝারি যত্ন'
      : plantCare?.difficulty === 'advanced'
      ? 'অভিজ্ঞদের জন্য'
      : null

  const isPetSafe = plantCare?.petSafety === 'safe'
  const variantCount = product.variants?.length || 1

  return (
    <div className="group relative flex flex-col rounded-3xl bg-white border border-warm-200/80 p-3 sm:p-3.5 transition-all duration-400 ease-out hover:border-botanical-300 hover:shadow-xl hover:shadow-botanical-950/6 hover:-translate-y-1">
      {/* 1. Image Container with Ambient Background */}
      <Link
        href={`/products/${product.handle}`}
        className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-warm-100/70 to-warm-100 block"
      >
        <Image
          src={imageSrc}
          alt={cleanTitle}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          onError={() => setImageSrc(DEFAULT_FALLBACK_IMAGE)}
        />

        {/* Ambient Top Shadow Overlay for Badge Contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Minimalist Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {difficultyLabel ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-botanical-900 border border-white/70 shadow-xs">
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
          ) : <span />}

          {isPetSafe && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50/95 backdrop-blur-md text-emerald-800 border border-emerald-200/80 shadow-xs">
              <span>🐾</span>
              <span>পেট-সেফ</span>
            </span>
          )}
        </div>

        {/* Variant Count Pill if multiple pot sizes exist */}
        {variantCount > 1 && (
          <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-botanical-950/70 backdrop-blur-md text-white shadow-xs">
              {variantCount}টি সাইজ উপলব্ধ
            </span>
          </div>
        )}
      </Link>

      {/* 2. Content Body */}
      <div className="pt-3.5 px-1 pb-1 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          {plantCare?.scientificName && (
            <span className="text-[10px] uppercase font-mono tracking-wider text-botanical-500 block truncate">
              {plantCare.scientificName}
            </span>
          )}

          <Link href={`/products/${product.handle}`} className="block group/link">
            <h3 className="font-bold text-botanical-950 group-hover/link:text-botanical-700 text-sm sm:text-base leading-snug line-clamp-1 transition-colors">
              {cleanTitle}
            </h3>
          </Link>

          {product.subtitle && (
            <p className="text-xs text-warm-500 line-clamp-1 leading-normal font-normal">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* 3. Bottom Price & Modern Quick Add */}
        <div className="pt-2 border-t border-warm-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-warm-400 uppercase tracking-wider">
              {priceDetails.hasMultiplePrices ? 'মূল্য শুরু' : 'মূল্য'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-botanical-950 tracking-tight">
                {priceDetails.hasMultiplePrices ? priceDetails.formattedRange : priceDetails.formatted}
              </span>
            </div>
          </div>

          {/* Minimalist Tactile Action Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isLoading || !defaultVariant?.id}
            aria-label="কার্টে যোগ করুন"
            title="কার্টে যোগ করুন"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-xs flex-shrink-0 ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-md scale-105'
                : 'bg-botanical-900 hover:bg-botanical-800 text-white hover:shadow-md hover:shadow-botanical-950/20'
            }`}
          >
            {added ? (
              <Check className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
