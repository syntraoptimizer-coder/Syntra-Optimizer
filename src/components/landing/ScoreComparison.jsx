import React from 'react';
import { Gauge, ShieldCheck } from 'lucide-react';

export const ScoreComparison = () => {
  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            System Optimization Score
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Before vs. After <span className="text-gradient-blue">System Benchmark</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how standard out-of-the-box Windows compares to a fully Syntra-optimized installation.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Default Windows */}
          <div className="glass-panel rounded-2xl p-7 border border-slate-800 relative overflow-hidden space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 uppercase">
                  UNOPTIMIZED
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-2">Standard Windows</h3>
                <p className="text-xs text-slate-400 mt-1">Default Windows 10/11 factory background services</p>
              </div>

              <div className="text-right">
                <span className="text-4xl font-heading font-black text-red-400 font-mono">68</span>
                <span className="text-xs text-slate-500 block">/ 100 Score</span>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-red-500 to-amber-500 w-[68%]"></div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Micro-Stutters / Hour</span>
                <span className="text-red-400 font-bold font-mono">14 Stutters</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Background Bloat Services</span>
                <span className="text-red-400 font-bold font-mono">98 Services</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">System Timer Resolution</span>
                <span className="text-amber-400 font-bold font-mono">15.6 ms (High Lag)</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">Wasted Standby Cache</span>
                <span className="text-red-400 font-bold font-mono">5.4 GB Occupied</span>
              </div>
            </div>
          </div>

          {/* Card 2: Syntra Optimized */}
          <div className="glass-panel-glow rounded-2xl p-7 border border-blue-500/40 relative overflow-hidden space-y-6 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 uppercase flex items-center gap-1 w-fit">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  SYNTRA OPTIMIZED
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-2">Syntra Powered PC</h3>
                <p className="text-xs text-blue-300/80 mt-1">Kernel debloated, timer locked, zero bloat</p>
              </div>

              <div className="text-right">
                <span className="text-4xl font-heading font-black text-emerald-400 font-mono">92</span>
                <span className="text-xs text-emerald-400/80 block">+24 Pts Boost</span>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-blue-500/30">
              <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-[92%] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>

            {/* Metrics List */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/80 border border-blue-500/20">
                <span className="text-slate-300">Micro-Stutters / Hour</span>
                <span className="text-emerald-400 font-bold font-mono">0 Stutters (Zero Frame Drops)</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/80 border border-blue-500/20">
                <span className="text-slate-300">Background Bloat Services</span>
                <span className="text-emerald-400 font-bold font-mono">34 Essential Services</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/80 border border-blue-500/20">
                <span className="text-slate-300">System Timer Resolution</span>
                <span className="text-cyan-400 font-bold font-mono">0.500 ms (Locked Ultra)</span>
              </div>
              <div className="flex justify-between items-center text-xs p-3 rounded-lg bg-slate-900/80 border border-blue-500/20">
                <span className="text-slate-300">Wasted Standby Cache</span>
                <span className="text-emerald-400 font-bold font-mono">0.1 GB (Auto Purged)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
