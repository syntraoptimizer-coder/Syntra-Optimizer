import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { StatsBar } from '@/components/site/stats-bar'
import { Features } from '@/components/site/features'
import { ScoreComparison } from '@/components/site/score-comparison'
import { Benchmarks } from '@/components/site/benchmarks'
import { Testimonials } from '@/components/site/testimonials'
import { Pricing } from '@/components/site/pricing'
import { Faq } from '@/components/site/faq'
import { Cta } from '@/components/site/cta'
import { Footer } from '@/components/site/footer'
import { DevBanner } from '@/components/site/dev-banner'

export default function HomePage() {
  return (
    <div className="min-h-dvh">
      <DevBanner />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Features />
        <ScoreComparison />
        <Benchmarks />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
