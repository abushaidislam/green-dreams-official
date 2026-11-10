'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sprout, ShoppingBag, Menu, X, Phone, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export function Header() {
  const { itemCount, setIsDrawerOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    'Hello Green Dreams, I would like to inquire about plants and plant care guidance.'
  )

  return (
    <header className="sticky top-0 z-40 bg-warm-50/90 backdrop-blur-md border-b border-warm-200/70 transition-colors shadow-2xs">
      {/* Top Banner */}
      <div className="bg-botanical-950 text-warm-100 text-[11px] sm:text-xs py-1.5 px-4 font-medium flex items-center justify-between sm:justify-center gap-2 sm:gap-6 border-b border-botanical-900">
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="truncate">
            ঢাকা সিটিতে ৬০৳ ডেলিভারি • সারা দেশে ক্যাশ অন ডেলিভারি (COD)
          </span>
        </div>
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition font-semibold text-[11px] flex-shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">হোয়াটসঅ্যাপ হেল্পলাইন</span>
          <span className="sm:hidden">পরামর্শ</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-botanical-100/90 text-botanical-800 flex items-center justify-center group-hover:bg-botanical-200/90 group-hover:scale-102 transition-all duration-200 border border-botanical-200/60 shadow-2xs">
            <Sprout className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-botanical-950 block leading-tight">
              Green Dreams
            </span>
            <span className="text-[10px] text-botanical-600 font-semibold tracking-wider uppercase block">
              ঢাকা নার্সারি ও প্ল্যান্ট শপ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-botanical-800">
          <Link
            href="/shop"
            className="hover:text-botanical-950 transition-colors py-1 hover:border-b-2 hover:border-botanical-600"
          >
            সব গাছ (All Plants)
          </Link>
          <Link
            href="/categories/indoor-plants"
            className="hover:text-botanical-950 transition-colors py-1 hover:border-b-2 hover:border-botanical-600"
          >
            ইনডোর প্ল্যান্টস
          </Link>
          <Link
            href="/categories/balcony-outdoor"
            className="hover:text-botanical-950 transition-colors py-1 hover:border-b-2 hover:border-botanical-600"
          >
            ব্যালকনি ও আউটডোর
          </Link>
          <Link
            href="/categories/pots-plant-care"
            className="hover:text-botanical-950 transition-colors py-1 hover:border-b-2 hover:border-botanical-600"
          >
            টব ও জৈব সার
          </Link>
          <Link
            href="/contact"
            className="hover:text-botanical-950 transition-colors py-1 hover:border-b-2 hover:border-botanical-600"
          >
            যোগাযোগ
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Helpline pill */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-warm-100 text-botanical-900 text-xs font-semibold border border-warm-200 transition shadow-2xs active:scale-96"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>হেল্পলাইন</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="কার্ট খুলুন"
            className="relative p-2.5 rounded-xl hover:bg-warm-100/90 text-botanical-900 border border-warm-200/90 transition active:scale-96 bg-white/60 shadow-2xs"
          >
            <ShoppingBag className="w-5 h-5 text-botanical-900" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50 duration-200">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl text-botanical-900 hover:bg-warm-100 border border-warm-200/60 active:scale-96 flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-warm-200/80 bg-warm-50/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-botanical-950 hover:bg-warm-200/60 transition"
          >
            সব গাছ (Shop All)
          </Link>
          <Link
            href="/categories/indoor-plants"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-botanical-950 hover:bg-warm-200/60 transition"
          >
            ইনডোর প্ল্যান্টস
          </Link>
          <Link
            href="/categories/balcony-outdoor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-botanical-950 hover:bg-warm-200/60 transition"
          >
            ব্যালকনি ও আউটডোর
          </Link>
          <Link
            href="/categories/pots-plant-care"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-botanical-950 hover:bg-warm-200/60 transition"
          >
            টব ও জৈব সার
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3.5 py-2.5 rounded-xl text-sm font-bold text-botanical-950 hover:bg-warm-200/60 transition"
          >
            যোগাযোগ ও নার্সারি
          </Link>

          <div className="pt-2 border-t border-warm-200/60">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে গাছ কেনার পরামর্শ</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
