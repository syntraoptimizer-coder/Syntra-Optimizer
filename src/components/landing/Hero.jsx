import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, Play, Shield, Gauge, Cpu, Activity, CircleCheckBig, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Hero = () => {
  const { user } = useAuth();
  const [toggles, setToggles] = useState({
    ultraLatency: true,
    ramPurge: true,
    telemetryKill: true,
    gpuAffinity: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-mesh">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-glow-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-semibold tracking-wide text-slate-200 uppercase">
              NEW: SYNTRA OPTIMIZER v2.4.1 RELEASED
            </span>
            <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
              WIN 10 & 11
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white leading-[1.1]">
            Optimize your PC. <br />
            <span className="text-gradient-blue relative">
              Instantly.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
            Eliminate system bloat, reduce input lag to near-zero, and boost gaming FPS with 1-click kernel and service optimization engineered for power users.
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_45px_rgba(59,130,246,0.8)] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 text-white fill-white/30 group-hover:scale-110 transition-transform" />
              <span>{user ? "Go to Dashboard" : "Get Started Now"}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#benchmarks"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-base text-slate-300 bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 hover:text-white transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
            >
              <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
              View Game Benchmarks
            </a>
          </div>

          {/* Micro trust stats */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CircleCheckBig className="w-4 h-4 text-emerald-400" />
              <span>No System Reinstall Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheckBig className="w-4 h-4 text-emerald-400" />
              <span>Anti-Cheat Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CircleCheckBig className="w-4 h-4 text-emerald-400" />
              <span>100% Safe Restore Points</span>
            </div>
          </div>

        </div>

        {/* Floating App Dashboard Mockup (3D tilt preview) */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Outer glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/40 via-cyan-500/30 to-purple-600/40 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative rounded-2xl bg-[#0f0f1a] border border-blue-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl transition-transform duration-500 hover:rotate-[0.2deg]">
            
            {/* Windows Window Header */}
            <div className="bg-[#141424] px-4 py-3 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Syntra Optimizer Pro v2.4.1 (Admin Mode)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  System Status: Optimal
                </span>
              </div>
            </div>

            {/* App UI Grid */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Realtime Score HUD */}
              <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Optimization Index</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">96 / 100</span>
                  </div>

                  {/* Meter Circle */}
                  <div className="relative w-36 h-36 mx-auto my-2 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-slate-800" fill="transparent" />
                      <circle cx="50" cy="50" r="40" stroke="url(#blue-grad)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="25" strokeLinecap="round" fill="transparent" />
                      <defs>
                        <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white font-heading">96%</span>
                      <span className="text-[10px] text-emerald-400 font-medium uppercase">Peak Ready</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Services Suspended</span>
                    <span className="text-blue-400 font-mono">42 active</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">RAM Purged</span>
                    <span className="text-emerald-400 font-mono">4.2 GB freed</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Timer Resolution</span>
                    <span className="text-cyan-400 font-mono">0.500 ms</span>
                  </div>
                </div>
              </div>

              {/* Middle & Right: Interactive Tweak Modules */}
              <div className="lg:col-span-2 space-y-4">
                
                {/* HUD Top Bar */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">CPU Usage</div>
                      <div className="text-sm font-bold text-white font-mono">12%</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Input Latency</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono">0.8 ms</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase">Game FPS Boost</div>
                      <div className="text-sm font-bold text-blue-400 font-mono">+28%</div>
                    </div>
                  </div>
                </div>

                {/* Interactive Toggles Container */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Active Optimization Tweaks
                  </div>

                  {/* Toggle items */}
                  {[
                    { key: 'ultraLatency', label: 'Ultra Low Input Latency Driver Mode', desc: 'Sets HPET & MMCSS priority to ultra-responsive' },
                    { key: 'ramPurge', label: 'Standby Cache Auto Purge', desc: 'Clears cached memory every 10 min without stuttering' },
                    { key: 'telemetryKill', label: 'Windows Telemetry & Bloat Remover', desc: 'Disables background tracking & Xbox game DVR spikes' },
                    { key: 'gpuAffinity', label: 'GPU Interrupt Affinity Optimization', desc: 'Binds GPU IRQ directly to dedicated CPU physical cores' },
                  ].map((tweak) => (
                    <div
                      key={tweak.key}
                      onClick={() => handleToggle(tweak.key)}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {tweak.label}
                        </div>
                        <div className="text-[11px] text-slate-400">{tweak.desc}</div>
                      </div>

                      <div className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${toggles[tweak.key] ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'}`}>
                        <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
