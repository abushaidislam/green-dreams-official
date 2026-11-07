'use client'

import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

export function FloatingWhatsApp() {
  const [isDismissed, setIsDismissed] = useState(false)

  const defaultMessage = 'Hello Green Dreams! I would like to consult with your horticulturist about plant care and delivery advice.'
  const whatsAppUrl = getWhatsAppSupportLink(NURSERY_CONTACT.phoneRaw, defaultMessage)

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Friendly Chat Pill */}
      {!isDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-botanical-900 px-3.5 py-2 rounded-2xl shadow-lg border border-warm-200 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="text-emerald-600">🌿</span>
          <span>গাছ চয়ন ও পরিচর্যায় সাহায্য চাই?</span>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-warm-400 hover:text-warm-600 ml-1 p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full shadow-xl hover:shadow-2xl transition duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat with Green Dreams Botanist on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-bold text-xs tracking-wide">WhatsApp পরামর্শ</span>
      </a>
    </div>
  )
}
