'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react'
import { getWhatsAppSupportLink } from '@/lib/utils'
import { NURSERY_CONTACT } from '@/lib/bangladesh-data'

interface FaqItem {
  question: string
  answer: string
}

const FAQS: FaqItem[] = [
  {
    question: 'ক্যাশ অন ডেলিভারিতে কি অগ্রিম কোনো টাকা দিতে হবে?',
    answer:
      'না, গ্রিন ড্রিমস-এ কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। ঢাকার ভেতরে কিংবা বাইরে—পুরো বাংলাদেশেই সম্পূর্ণ ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে। ডেলিভারি ম্যানের কাছ থেকে গাছ দেখে তারপর মূল্য পরিশোধ করবেন।',
  },
  {
    question: 'ডেলিভারির সময় গাছের কোনো ক্ষতি হলে কী করব?',
    answer:
      'আমাদের বিশেষ শকপ্রুফ প্যাকেজিংয়ের কারণে ক্ষতি হওয়ার ঝুঁকি নেই বললেই চলে। তবুও যদি পরিবহনে গাছ ক্ষতিগ্রস্ত হয়, ডেলিভারি পাওয়ার ৪৮ ঘণ্টার মধ্যে আমাদের হোয়াটসঅ্যাপে একটি ছবি পাঠিয়ে দিলেই আমরা সম্পূর্ণ বিনামূল্যে নতুন গাছ পাঠিয়ে দেব।',
  },
  {
    question: 'ঢাকার বাইরে কুরিয়ারে গাছ বেঁচে থাকবে তো?',
    answer:
      'হ্যাঁ, একদম সতেজ থাকবে। ঢাকার বাইরে পাঠানোর জন্য আমরা গাছগুলোকে স্পেশাল ময়েশ্চার-লক পদ্ধতিতে প্যাক করি, যা ৫-৭ দিন পর্যন্ত মাটির আর্দ্রতা ও শিকড়ের সতেজতা বজায় রাখে। সারা দেশের প্রতিটি জেলা শহরে আমাদের নিয়মিত নিরাপদ ডেলিভারি হচ্ছে।',
  },
  {
    question: 'গাছ কেনার পর যত্ন বা পরিচর্যা নিয়ে কোনো সাহায্য পাব?',
    answer:
      'অবশ্যই! প্রতিটি গাছের সাথেই আমরা একটি বিস্তারিত প্ল্যান্ট কেয়ার নির্দেশিকা পাঠাই। এছাড়া যেকোনো সময় পাতা হলুদ হওয়া, পানি দেওয়া বা পোকামাকড় সংক্রান্ত সমস্যায় আমাদের অফিসিয়াল হোয়াটসঅ্যাপে ছবি পাঠালে নার্সারি এক্সপার্টরা ফ্রি পরামর্শ দিয়ে থাকেন।',
  },
  {
    question: 'গাছের সাথে কি টব ও সার অন্তর্ভুক্ত থাকে?',
    answer:
      'আমাদের প্রতিটি ইনডোর ও ব্যালকনি গাছ প্রস্তুত অবস্থায় প্রিমিয়াম কোয়ালিটি টব এবং নিউট্রিশাস পটিং মিক্সে রোপণ করা থাকে। আপনি চাইলে অতিরিক্ত অর্গানিক ভার্মিকম্পোস্ট বা ডেকোরেটিভ প্ল্যান্টারও আমাদের শপ থেকে নিতে পারেন।',
  },
]

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const whatsAppLink = getWhatsAppSupportLink(
    NURSERY_CONTACT.phoneRaw,
    'Hello Green Dreams, I have a question about plant orders and delivery.'
  )

  return (
    <div className="space-y-4">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-botanical-400 shadow-sm'
                : 'bg-white/80 border-warm-200/90 hover:border-warm-300 hover:bg-white'
            }`}
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-botanical-950 transition"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-4 h-4 flex-shrink-0 transition ${isOpen ? 'text-emerald-700' : 'text-botanical-400'}`} />
                <span>{faq.question}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-botanical-500 flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-700' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-botanical-700 leading-relaxed border-t border-warm-100">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}

      <div className="pt-2 text-center">
        <p className="text-xs sm:text-sm text-botanical-700 font-medium">
          আরও কোনো প্রশ্ন আছে? সরাসরি আমাদের নার্সারি টিমের সাথে কথা বলুন:{' '}
          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 ml-1"
          >
            <MessageCircle className="w-3.5 h-3.5 inline" />
            হোয়াটসঅ্যাপ হেল্পলাইন
          </a>
        </p>
      </div>
    </div>
  )
}
