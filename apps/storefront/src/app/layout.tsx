import type { Metadata } from 'next'
import { Hind_Siliguri } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind-siliguri',
})

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
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col bg-warm-50 text-botanical-900 selection:bg-botanical-200 selection:text-botanical-900 font-sans">
        <CartProvider>
          <Header />
          <CartDrawer />
          <FloatingWhatsApp />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
