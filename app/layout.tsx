import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/site/lenis-provider'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'Syntra Optimizer — Optimize your PC. Instantly.',
  description:
    'Syntra Optimizer boosts your Windows 10/11 PC with automatic fixes, debloating, network tuning, and a dedicated game optimizer. Higher FPS, faster boots, cleaner systems.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/syntra-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/syntra-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101418',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <LenisProvider />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
