'use client'

import React, { useState } from 'react'
import { Sun, Droplets, Wind, ShieldAlert, Sparkles, BookOpen, ChevronDown, CheckCircle2 } from 'lucide-react'
import { PlantCareProfile } from '@/lib/medusa'

export function PlantCareAccordion({ plantCare }: { plantCare?: PlantCareProfile }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    light: true,
    water: true,
    pet: true,
  })

  if (!plantCare) {
    return null
  }

  const toggle = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="rounded-2xl bg-botanical-50/60 border border-botanical-200/70 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-botanical-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-botanical-700" />
          <h3 className="font-bold text-base text-botanical-900">
            প্ল্যান্ট কেয়ার গাইড (Plant Care Guide)
          </h3>
        </div>
        {plantCare.scientificName && (
          <span className="text-xs italic text-botanical-700 font-mono">
            {plantCare.scientificName}
          </span>
        )}
      </div>

      {/* Editorial Status Badge */}
      <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-white/70 border border-botanical-200/50">
        <span className="text-botanical-800 font-medium">যত্নের মাত্রা:</span>
        <span className="font-bold capitalize text-botanical-900">
          {plantCare.difficulty === 'easy'
            ? '🌿 সহজ (Beginner Friendly)'
            : plantCare.difficulty === 'medium'
            ? '🌱 মাঝারি (Intermediate)'
            : '🌳 অভিজ্ঞদের জন্য'}
        </span>
      </div>

      {/* Accordion Item 1: Sunlight */}
      {plantCare.light && (
        <div className="rounded-xl bg-white border border-warm-200 overflow-hidden">
          <button
            onClick={() => toggle('light')}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm text-botanical-900 hover:bg-warm-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>আলোর প্রয়োজনীয়তা (Light)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-warm-400 transition-transform ${
                openSections.light ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.light && (
            <div className="px-4 pb-3.5 pt-1 text-sm text-botanical-700 border-t border-warm-100 bg-white">
              {plantCare.light}
            </div>
          )}
        </div>
      )}

      {/* Accordion Item 2: Watering */}
      {plantCare.watering && (
        <div className="rounded-xl bg-white border border-warm-200 overflow-hidden">
          <button
            onClick={() => toggle('water')}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm text-botanical-900 hover:bg-warm-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Droplets className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>পানি দেওয়ার নিয়ম (Watering)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-warm-400 transition-transform ${
                openSections.water ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.water && (
            <div className="px-4 pb-3.5 pt-1 text-sm text-botanical-700 border-t border-warm-100 bg-white">
              {plantCare.watering}
            </div>
          )}
        </div>
      )}

      {/* Accordion Item 3: Humidity */}
      {plantCare.humidity && (
        <div className="rounded-xl bg-white border border-warm-200 overflow-hidden">
          <button
            onClick={() => toggle('humidity')}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm text-botanical-900 hover:bg-warm-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <Wind className="w-4 h-4 text-teal-600 flex-shrink-0" />
              <span>আর্দ্রতা ও আবহাওয়া (Humidity)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-warm-400 transition-transform ${
                openSections.humidity ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.humidity && (
            <div className="px-4 pb-3.5 pt-1 text-sm text-botanical-700 border-t border-warm-100 bg-white">
              {plantCare.humidity}
            </div>
          )}
        </div>
      )}

      {/* Accordion Item 4: Pet Safety */}
      {plantCare.petSafety && (
        <div className="rounded-xl bg-white border border-warm-200 overflow-hidden">
          <button
            onClick={() => toggle('pet')}
            className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm text-botanical-900 hover:bg-warm-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert
                className={`w-4 h-4 flex-shrink-0 ${
                  plantCare.petSafety === 'safe' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              />
              <span>গৃহপালিত পশুর নিরাপত্তা (Pet Safety)</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-warm-400 transition-transform ${
                openSections.pet ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.pet && (
            <div className="px-4 pb-3.5 pt-1 text-sm text-botanical-700 border-t border-warm-100 bg-white">
              {plantCare.petSafety === 'safe' ? (
                <span className="text-emerald-700 font-medium">
                  🐾 বিড়াল ও কুকুরের জন্য নিরাপদ (Non-toxic to cats and dogs)
                </span>
              ) : plantCare.petSafety === 'unsafe' ? (
                <span className="text-rose-700 font-medium">
                  ⚠️ চিবিয়ে খেলে বিষাক্ত হতে পারে। পোষা প্রাণী ও ছোট শিশুদের নাগালের বাইরে রাখুন।
                </span>
              ) : (
                <span className="text-warm-700">
                  নিরাপত্তা তথ্য এখনও নিশ্চিত নয়। পোষা প্রাণীর নাগালের বাইরে রাখার পরামর্শ দেওয়া হলো।
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Care Instructions Note */}
      {plantCare.careInstructions && (
        <div className="p-3 rounded-xl bg-botanical-100/60 border border-botanical-200/60 text-xs text-botanical-800 leading-relaxed">
          <span className="font-bold block mb-1">💡 বিশেষ পরিচর্যা টিপস:</span>
          {plantCare.careInstructions}
        </div>
      )}

      {/* Sample Data Disclaimer (Rule from AGENTS.md) */}
      <div className="text-[11px] text-warm-500 flex items-center gap-1.5 pt-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-botanical-600 flex-shrink-0" />
        <span>
          {plantCare.sourceVerified
            ? 'গ্রিন ড্রিমস নার্সারি বোটানিস্ট দ্বারা পরীক্ষিত তথ্য।'
            : 'স্যাম্পল পরিচর্যা গাইড — নার্সারির ভেরিফিকেশন সাপেক্ষে কার্যকর।'}
        </span>
      </div>
    </div>
  )
}
