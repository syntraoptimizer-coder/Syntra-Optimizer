import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { StatsBar } from '../components/landing/StatsBar';
import { FeaturesGrid } from '../components/landing/FeaturesGrid';
import { LivePerformancePreview } from '../components/landing/LivePerformancePreview';
import { ScoreComparison } from '../components/landing/ScoreComparison';
import { GameBenchmarks } from '../components/landing/GameBenchmarks';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FAQ } from '../components/landing/FAQ';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/layout/Footer';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <FeaturesGrid />
        <LivePerformancePreview />
        <ScoreComparison />
        <GameBenchmarks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};
