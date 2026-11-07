import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Green Dreams — Online Plant Shop Bangladesh',
  description: 'Premium indoor and outdoor plants with verified plant-care guidance. Reliable delivery across Bangladesh.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-warm-50 text-botanical-900">
        {children}
      </body>
    </html>
  )
}
