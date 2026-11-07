import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'

export const metadata: Metadata = {
  title: 'Green Dreams — বাংলাদেশের প্রিমিয়াম অনলাইন প্ল্যান্ট শপ',
  description:
    'সরাসরি ঢাকা নার্সারি থেকে সতেজ ইনডোর ও ব্যালকনি গাছ। ক্যাশ অন ডেলিভারি এবং সঠিক প্ল্যান্ট কেয়ার গাইড।',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-warm-50 text-botanical-900 selection:bg-botanical-200 selection:text-botanical-900">
        <CartProvider>
          <Header />
          <CartDrawer />
          <FloatingWhatsApp />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
