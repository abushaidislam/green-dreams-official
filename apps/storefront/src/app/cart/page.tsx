'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  Sprout,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatBDT } from '@/lib/utils'

export default function CartPage() {
  const { cart, updateQuantity, removeItem, isLoading } = useCart()

  const items = cart?.items || []
  const subtotal = items.reduce(
    (acc, item) => acc + item.unit_price * item.quantity,
    0
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-botanical-600">
          <Link href="/" className="hover:underline">
            হোম
          </Link>
          <span>/</span>
          <span>শপিং কার্ট</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-botanical-950 tracking-tight">
          আপনার শপিং ব্যাগ ({items.length}টি আইটেম)
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-warm-200/90 p-8 space-y-4 max-w-xl mx-auto shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-botanical-50 text-botanical-800 flex items-center justify-center mx-auto border border-botanical-100">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-botanical-950">
            আপনার কার্ট বর্তমানে খালি
          </h2>
          <p className="text-xs sm:text-sm text-botanical-600">
            আপনার পছন্দের ইনডোর বা ব্যালকনি গাছগুলো খুঁজে নিতে আমাদের ক্যাটালগ ঘুরে দেখুন।
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-botanical-900 hover:bg-botanical-950 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-96"
          >
            <Sprout className="w-4 h-4" />
            <span>গাছ ব্রাউজ করুন (Shop All)</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-warm-200/90 overflow-hidden divide-y divide-warm-100 shadow-2xs">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl bg-warm-100 overflow-hidden border border-warm-200/80 ring-1 ring-black/5 flex-shrink-0">
                    <Image
                      src={
                        item.thumbnail ||
                        'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-botanical-950">
                      {item.variant?.product?.title || item.title}
                    </h3>
                    {item.variant?.title && (
                      <span className="text-xs text-botanical-600 block">
                        ভ্যারিয়েন্ট: {item.variant.title}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-botanical-950 block tabular-nums">
                      {formatBDT(item.unit_price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Quantity Buttons */}
                  <div className="inline-flex items-center rounded-xl border border-warm-200 bg-warm-50 p-1 shadow-2xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={isLoading}
                      className="p-1.5 hover:bg-white rounded-lg text-botanical-800 transition active:scale-90"
                      aria-label="কমান"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs sm:text-sm text-botanical-950 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={isLoading}
                      className="p-1.5 hover:bg-white rounded-lg text-botanical-800 transition active:scale-90"
                      aria-label="বাড়ান"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal for Item */}
                  <span className="text-sm sm:text-base font-black text-botanical-950 min-w-16 text-right tabular-nums">
                    {formatBDT(item.unit_price * item.quantity)}
                  </span>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={isLoading}
                    className="p-2 text-warm-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition active:scale-90"
                    aria-label="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-warm-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
            <h2 className="text-lg sm:text-xl font-extrabold text-botanical-950">অর্ডার সামারি</h2>

            <div className="space-y-3 text-sm divide-y divide-warm-100">
              <div className="flex justify-between text-botanical-700 pt-1">
                <span>পণ্যের মোট মূল্য ({items.length}টি)</span>
                <span className="font-bold text-botanical-950 tabular-nums">{formatBDT(subtotal)}</span>
              </div>
              <div className="flex justify-between text-botanical-700 pt-3">
                <span>ডেলিভারি ফি</span>
                <span className="text-xs font-semibold text-emerald-700">
                  চেকআউট পেজে যুক্ত হবে
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-botanical-950 pt-3">
                <span>মোট প্রদেয় (আনুমানিক)</span>
                <span className="tabular-nums">{formatBDT(subtotal)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-botanical-50/80 border border-botanical-100 text-xs text-botanical-800 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-botanical-950">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>ডেলিভারি চার্জ:</span>
              </div>
              <p>• ঢাকা সিটির ভেতরে: ৳৬০</p>
              <p>• ঢাকার বাইরে (সারা দেশ): ৳১৩০</p>
            </div>

            <Link
              href="/checkout"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-xl bg-botanical-900 hover:bg-botanical-950 text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-96"
            >
              <span>ক্যাশ অন ডেলিভারিতে চেকআউট</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-botanical-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>১০০% নিরাপদ চেকআউট • কোনো অগ্রিম পেমেন্ট নেই</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
