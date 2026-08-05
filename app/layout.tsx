import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LenisProvider } from '@/components/site/lenis-provider'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
})

const BASE_URL = 'https://www.syntraoptimizer.site'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Syntra Optimizer — Optimize your PC. Instantly.',
    template: '%s | Syntra Optimizer',
  },
  description:
    'Boost your Windows 10/11 PC with one click. Auto fixes, debloating, network tuning & game optimizer. Higher FPS, faster boots, cleaner system.',
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
      'Boost FPS, cut boot times & clean your Windows PC in one click. Trusted by 100+ gamers.',
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
      <head>
        <meta name="source-hint" content="👀 Hey curious dev! Nothing to steal here... Buy Premium instead 😄 → https://www.syntraoptimizer.site/checkout?plan=premium" />
      </head>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: `
          console.log('%c🔍 Looking for secrets?', 'font-size:20px;font-weight:bold;color:#ffffff;background:#080808;padding:8px 16px;border-radius:8px;');
          console.log('%cNothing to see here... unless you buy Premium 😏', 'font-size:13px;color:rgba(255,255,255,0.6);');
          console.log('%c👉 https://www.syntraoptimizer.site/checkout?plan=premium', 'font-size:12px;color:rgba(255,255,255,0.4);text-decoration:underline;');
        ` }} />
        <LenisProvider />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
