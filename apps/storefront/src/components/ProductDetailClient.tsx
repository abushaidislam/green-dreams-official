'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingBag,
  Check,
  Truck,
  ShieldCheck,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react'
import { StoreProduct } from '@/lib/medusa'
import {
  formatBDT,
  getWhatsAppSupportLink,
  cleanProductTitle,
  cleanProductDescription,
  getProductPriceDetails,
  getVariantPrice,
} from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'
import { useCart } from '@/context/CartContext'
import { PlantCareAccordion } from '@/components/PlantCareAccordion'

export function ProductDetailClient({ product }: { product: StoreProduct }) {
  const { addToCart, isLoading, setIsDrawerOpen } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id || ''
  )
  const [quantity, setQuantity] = useState<number>(1)
  const [added, setAdded] = useState<boolean>(false)

  const selectedVariant =
    product.variants?.find((v) => v.id === selectedVariantId) ||
    product.variants?.[0]

  const priceDetails = getProductPriceDetails(product, selectedVariant?.id)
  const price = priceDetails.amount

  const fallbackPlantImage =
    'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
  const [imageUrl, setImageUrl] = useState<string>(
    product.images?.[0]?.url || product.thumbnail || fallbackPlantImage
  )

  const cleanTitle = cleanProductTitle(product.title)

  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    `Hello Green Dreams, I am interested in ${cleanTitle} (${selectedVariant?.title || ''}). Can you provide care guidance?`
  )

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return
    const success = await addToCart(selectedVariant.id, quantity)
    if (success) {
      setAdded(true)
      setIsDrawerOpen(true)
      setTimeout(() => setAdded(false), 2500)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
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
        <span className="text-botanical-900 truncate max-w-xs">{cleanTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left: Product Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl bg-warm-100 overflow-hidden border border-warm-200/80 shadow-xs ring-1 ring-black/5">
            <Image
              src={imageUrl}
              alt={cleanTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              onError={() => setImageUrl(fallbackPlantImage)}
            />
          </div>

          {/* Additional thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setImageUrl(img.url)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border flex-shrink-0 bg-warm-100 ring-1 transition ${
                    imageUrl === img.url
                      ? 'border-botanical-600 ring-botanical-600/30'
                      : 'border-warm-200/80 ring-black/5 hover:border-warm-300'
                  }`}
                >
                  <Image src={img.url} alt={product.title} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Purchase Controls & Plant Care */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            {product.metadata?.plant_care?.scientificName && (
              <span className="text-xs uppercase font-mono tracking-wider text-botanical-600 block">
                {product.metadata.plant_care.scientificName}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight leading-snug">
              {cleanTitle}
            </h1>
            {product.subtitle && (
              <p className="text-sm sm:text-base text-botanical-700 font-medium">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price & Stock Badge */}
          <div className="flex items-center gap-4 py-3 border-y border-warm-200/80">
            <span className="text-2xl sm:text-3xl font-black text-botanical-950 tabular-nums">
              {formatBDT(price)}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              ✓ নার্সারিতে স্টকে আছে
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="text-xs sm:text-sm text-botanical-800 leading-relaxed space-y-2">
              <p>{cleanProductDescription(product.description)}</p>
            </div>
          )}

          {/* Variant Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-botanical-700">
                টবের আকার বা ভ্যারিয়েন্ট বেছে নিন:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {product.variants.map((v) => {
                  const vPrice = getVariantPrice(v)
                  const isSelected = v.id === selectedVariantId

                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-botanical-800 bg-botanical-50/90 ring-2 ring-botanical-600/30 shadow-2xs'
                          : 'border-warm-200/90 bg-white hover:bg-warm-50'
                      }`}
                    >
                      <span className="block font-bold text-sm text-botanical-950">
                        {v.title}
                      </span>
                      <span className="block text-xs text-botanical-700 font-semibold mt-0.5 tabular-nums">
                        {formatBDT(vPrice)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="inline-flex items-center rounded-xl border border-warm-300 bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-warm-100 rounded-lg text-botanical-800 transition active:scale-90"
                  aria-label="কমান"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-botanical-950 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-warm-100 rounded-lg text-botanical-800 transition active:scale-90"
                  aria-label="বাড়ান"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant?.id}
                className={`flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition active:scale-96 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-botanical-900 hover:bg-botanical-950 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    <span>ব্যাগে যোগ করা হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>কার্টে যোগ করুন — {formatBDT(price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Guidance */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-900 hover:bg-emerald-100/90 font-bold text-xs transition shadow-2xs active:scale-98"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>এই গাছের পরিচর্যা নিয়ে হোয়াটসঅ্যাপে পরামর্শ নিন</span>
            </a>
          </div>

          {/* Delivery & Payment Guarantee Box */}
          <div className="p-4 rounded-2xl bg-white border border-warm-200/90 space-y-2.5 text-xs text-botanical-800 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-botanical-950">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>ডেলিভারি তথ্য ও চার্জ:</span>
            </div>
            <ul className="space-y-1.5 pl-6 list-disc text-botanical-700">
              <li>ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র ৬০ টাকা (২-৩ দিন)।</li>
              <li>ঢাকার বাইরে সারা দেশে ডেলিভারি চার্জ ১৩০ টাকা (৩-৫ দিন)।</li>
              <li>ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন)।</li>
            </ul>
          </div>

          {/* Plant Care Accordion */}
          <div className="pt-2">
            <PlantCareAccordion plantCare={product.metadata?.plant_care} />
          </div>
        </div>
      </div>
    </div>
  )
}
