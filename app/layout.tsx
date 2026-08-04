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

const BASE_URL = 'https://www.syntraoptimizer.site'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Syntra Optimizer — Optimize your PC. Instantly.',
    template: '%s | Syntra Optimizer',
  },
  description:
    'Syntra Optimizer boosts your Windows 10/11 PC with automatic fixes, debloating, network tuning, and a dedicated game optimizer. Higher FPS, faster boots, cleaner systems.',
  keywords: [
    'PC optimizer',
    'Windows optimizer',
    'FPS boost',
    'PC debloat',
    'Windows 10 optimizer',
    'Windows 11 optimizer',
    'game optimizer',
    'boost PC performance',
    'reduce ping',
    'Syntra Optimizer',
  ],
  authors: [{ name: 'Syntra Optimizer', url: BASE_URL }],
  creator: 'Syntra Optimizer',
  publisher: 'Syntra Optimizer',
  category: 'Software',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Syntra Optimizer',
    title: 'Syntra Optimizer — Optimize your PC. Instantly.',
    description:
      'Boost FPS, cut boot times, and clean your Windows PC in one click. Trusted by 100+ gamers and creators.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Syntra Optimizer — Optimize Your PC With Syntra Optimizer.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syntra Optimizer — Optimize your PC. Instantly.',
    description:
      'Boost FPS, cut boot times, and clean your Windows PC in one click.',
    images: ['/og-image.png'],
    creator: '@syntraoptimizer',
  },
  icons: {
    icon: [{ url: '/syntra-logo.png', type: 'image/png' }],
    apple: '/syntra-logo.png',
    shortcut: '/syntra-logo.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
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
