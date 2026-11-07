import { Sprout, ShoppingBag, ShieldCheck, Truck } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-warm-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-botanical-600" />
            <span className="font-bold text-xl tracking-tight text-botanical-900">Green Dreams</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-botanical-700">
            <span className="hover:text-botanical-900 cursor-pointer">ইনডোর প্ল্যান্টস</span>
            <span className="hover:text-botanical-900 cursor-pointer">আউটডোর প্ল্যান্টস</span>
            <span className="hover:text-botanical-900 cursor-pointer">প্ল্যান্ট কেয়ার</span>
            <span className="hover:text-botanical-900 cursor-pointer">যোগাযোগ</span>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full hover:bg-warm-100 cursor-pointer text-botanical-800">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-botanical-100 text-botanical-800 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-botanical-600 animate-pulse"></span>
          <span>Phase 1: Foundation Ready</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-botanical-900 tracking-tight max-w-3xl leading-tight">
          সবুজে সাজুক আপনার ঘর ও মন
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-botanical-700 max-w-2xl font-normal">
          বাংলাদেশের প্রিমিয়াম অনলাইন প্ল্যান্ট শপ। সহজ ক্যাশ অন ডেলিভারি এবং প্রতিটি গাছের জন্য নির্ভরযোগ্য পরিচর্যা গাইড।
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-lg bg-botanical-700 hover:bg-botanical-800 text-white font-medium shadow-sm transition">
            গাছ দেখুন (Shop Plants)
          </button>
          <button className="px-8 py-3 rounded-lg bg-white border border-warm-300 hover:bg-warm-100 text-botanical-900 font-medium transition">
            প্ল্যান্ট কেয়ার গাইড
          </button>
        </div>

        {/* Feature Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-warm-200 pt-12 text-left">
          <div className="flex items-start space-x-3">
            <Truck className="w-6 h-6 text-botanical-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-botanical-900">ক্যাশ অন ডেলিভারি (COD)</h3>
              <p className="text-sm text-botanical-700 mt-1">সারা বাংলাদেশে বিশ্বস্ত ডেলিভারি এবং যাচাইকৃত ডেলিভারি ফি।</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Sprout className="w-6 h-6 text-botanical-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-botanical-900">যাচাইকৃত পরিচর্যা গাইড</h3>
              <p className="text-sm text-botanical-700 mt-1">প্রতিটি গাছের আলো, পানি ও আর্দ্রতার সঠিক নির্দেশনা।</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-6 h-6 text-botanical-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-botanical-900">সতেজতার নিশ্চয়তা</h3>
              <p className="text-sm text-botanical-700 mt-1">সুস্থ ও সতেজ চারা নিরাপদে আপনার ঠিকানায় পৌঁছানোর প্রতিশ্রুতি।</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-white py-8 text-center text-xs text-botanical-700">
        <p>© 2026 Green Dreams. All rights reserved. Bangladesh Sales Region (BDT).</p>
      </footer>
    </div>
  )
}
