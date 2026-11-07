'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatBDT } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeItem, itemCount } = useCart()

  if (!isDrawerOpen) return null

  const items = cart?.items || []
  const subtotal = items.reduce((acc, item) => acc + item.unit_price * item.quantity, 0)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-botanical-950/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-warm-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-warm-200 flex items-center justify-between bg-warm-50/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-botanical-700" />
              <h2 className="font-extrabold text-lg text-botanical-900">
                আপনার শপিং ব্যাগ ({itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-xl text-warm-500 hover:text-botanical-900 hover:bg-warm-100 transition"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-warm-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-botanical-100 text-botanical-600 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-botanical-900">আপনার কার্ট খালি</h3>
                <p className="text-sm text-botanical-600 mt-1 max-w-xs">
                  আপনার পছন্দের ইনডোর বা আউটডোর গাছগুলো ব্যাগে যোগ করুন।
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-6 inline-flex items-center px-6 py-2.5 rounded-xl bg-botanical-700 text-white text-sm font-semibold hover:bg-botanical-800 transition shadow-sm"
                >
                  <Link href="/shop">গাছ ব্রাউজ করুন</Link>
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-warm-100 overflow-hidden relative flex-shrink-0 border border-warm-200">
                    <Image
                      src={item.thumbnail || 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=200&q=80'}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-botanical-900 truncate">
                      {item.variant?.product?.title || item.title}
                    </h4>
                    {item.variant?.title && (
                      <span className="text-xs text-botanical-600 block mt-0.5">
                        ভ্যারিয়েন্ট: {item.variant.title}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-botanical-900 block mt-1">
                      {formatBDT(item.unit_price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="inline-flex items-center rounded-lg border border-warm-200 bg-warm-50 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded-md text-botanical-800 transition"
                          aria-label="কমান"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-botanical-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded-md text-botanical-800 transition"
                          aria-label="বাড়ান"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-warm-400 hover:text-rose-600 transition ml-auto"
                        aria-label="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-warm-200 bg-warm-50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-botanical-700 font-medium">সাবটোটাল</span>
                <span className="text-lg font-extrabold text-botanical-900">
                  {formatBDT(subtotal)}
                </span>
              </div>
              <p className="text-xs text-botanical-600">
                ডেলিভারি ফি (ঢাকা ৬০৳ / ঢাকার বাইরে ১৩০৳) চেকআউটে যুক্ত হবে।
              </p>
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-botanical-700 hover:bg-botanical-800 text-white font-bold text-sm shadow-sm transition active:scale-98"
                >
                  <span>ক্যাশ অন ডেলিভারিতে চেকআউট</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl bg-white border border-warm-300 hover:bg-warm-100 text-botanical-900 font-semibold text-xs transition"
                >
                  সম্পূর্ণ কার্ট পেজ দেখুন
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
