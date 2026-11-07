'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sprout, ShoppingBag, Menu, X, Phone, MessageCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { getWhatsAppSupportLink } from '@/lib/utils'

export function Header() {
  const { itemCount, setIsDrawerOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const whatsAppLink = getWhatsAppSupportLink(
    '8801700000000',
    'Hello Green Dreams, I would like to inquire about plants and plant care guidance.'
  )

  return (
    <header className="border-b border-warm-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Top Banner */}
      <div className="bg-botanical-900 text-botanical-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-3">
        <span>🌱 ঢাকা শহরের ভেতরে ৬০ টাকা ডেলিভারি ও সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD)</span>
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-botanical-200 hover:text-white underline underline-offset-2 ml-2"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>হোয়াটসঅ্যাপে পরামর্শ</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-botanical-100 text-botanical-700 flex items-center justify-center group-hover:bg-botanical-200 transition">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-botanical-900 block leading-tight">
              Green Dreams
            </span>
            <span className="text-[10px] text-botanical-600 font-semibold tracking-wider uppercase block">
              ঢাকা নার্সারি ও প্ল্যান্ট শপ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-botanical-800">
          <Link href="/shop" className="hover:text-botanical-600 transition">
            সব গাছ (All Plants)
          </Link>
          <Link href="/categories/indoor-plants" className="hover:text-botanical-600 transition">
            ইনডোর প্ল্যান্টস
          </Link>
          <Link href="/categories/balcony-outdoor" className="hover:text-botanical-600 transition">
            ব্যালকনি ও আউটডোর
          </Link>
          <Link href="/categories/pots-plant-care" className="hover:text-botanical-600 transition">
            টব ও জৈব সার
          </Link>
          <Link href="/contact" className="hover:text-botanical-600 transition">
            যোগাযোগ
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* WhatsApp Support Callout */}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-botanical-50 text-botanical-800 hover:bg-botanical-100 text-xs font-semibold border border-botanical-200 transition"
          >
            <Phone className="w-3.5 h-3.5 text-botanical-600" />
            <span>হেল্পলাইন</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="কার্ট খুলুন"
            className="relative p-2.5 rounded-xl hover:bg-warm-100 text-botanical-900 border border-warm-200 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-botanical-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-botanical-800 hover:bg-warm-100"
            aria-label="মেনু"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-warm-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-botanical-900 hover:bg-warm-100"
          >
            সব গাছ (Shop All)
          </Link>
          <Link
            href="/categories/indoor-plants"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-botanical-900 hover:bg-warm-100"
          >
            ইনডোর প্ল্যান্টস
          </Link>
          <Link
            href="/categories/balcony-outdoor"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-botanical-900 hover:bg-warm-100"
          >
            ব্যালকনি ও আউটডোর
          </Link>
          <Link
            href="/categories/pots-plant-care"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-botanical-900 hover:bg-warm-100"
          >
            টব ও জৈব সার
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-botanical-900 hover:bg-warm-100"
          >
            যোগাযোগ ও নার্সারি
          </Link>
        </div>
      )}
    </header>
  )
}
