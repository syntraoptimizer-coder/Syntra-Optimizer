import React, { useState } from 'react';
import { Wrench, Trash2, Wifi, Gamepad2, Cpu, Settings2, Sparkles, CircleCheckBig, ChevronRight } from 'lucide-react';

export const FeaturesGrid = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'fixes',
      icon: <Wrench className="w-6 h-6 text-blue-400" />,
      title: "System Fixes & Registry Repair",
      tag: "Stability",
      description: "Repair hidden Windows corruption, fix broken DLL references, and optimize system registry queues for flawless uptime.",
      details: [
        "Automated SFC & DISM integrity check and repair",
        "Clears corrupted Windows Update staging cache",
        "Fixes DirectX & MSVCRT runtime execution errors",
        "Creates instant system restore point prior to tweaks"
      ],
      badge: "1-Click Fix"
    },
    {
      id: 'debloat',
      icon: <Trash2 className="w-6 h-6 text-cyan-400" />,
      title: "Windows Debloat & Telemetry Kill",
      tag: "Privacy & Speed",
      description: "Safely strip away 40+ unnecessary background bloatware services, telemetry trackers, and forced background updates.",
      details: [
        "Removes Cortana, OneDrive background syncing, & Edge bloat",
        "Stops diagnostic data harvesting & telemetry pings",
        "Disables Xbox Game Bar background DVR recording spikes",
        "Frees up to 3.5 GB of system RAM instantly"
      ],
      badge: "Max Privacy"
    },
    {
      id: 'network',
      icon: <Wifi className="w-6 h-6 text-emerald-400" />,
      title: "Network & Low Ping Optimizer",
      tag: "Latency",
      description: "Tweak TCP/IP stack configuration, disable Nagle's algorithm (TCP NoDelay), and eliminate packet loss jitter.",
      details: [
        "Enables TCP NoDelay for instant packet transmission",
        "Custom DNS routing setup (Cloudflare & Google Ultra Low-Ping)",
        "Disables Network Throttling Index (NTI)",
        "Reduces gaming ping by up to 15-30ms in competitive titles"
      ],
      badge: "Zero Jitter"
    },
    {
      id: 'game-optimizer',
      icon: <Gamepad2 className="w-6 h-6 text-purple-400" />,
      title: "Ultra Game Booster & Core Affinity",
      tag: "FPS Gain",
      description: "Automatically lock CPU physical cores to active games, adjust thread priority, and force GPU into Maximum Performance state.",
      details: [
        "Bypasses Windows core-parking throttling",
        "Assigns real-time High Priority to active game process",
        "Enables GPU Hardware-Accelerated Scheduling (HAGS)",
        "Locks 0.5ms high-precision system timer"
      ],
      badge: "Maximum FPS"
    },
    {
      id: 'ram-disk',
      icon: <Cpu className="w-6 h-6 text-amber-400" />,
      title: "RAM Purge & NVMe Disk Cleaner",
      tag: "Storage & Memory",
      description: "Intelligently purge Windows Standby Memory Cache without micro-stutters, and clean gigabytes of leftover temporary files.",
      details: [
        "Clears standby memory without causing game freezes",
        "Wipes shaders cache (NVIDIA & AMD DirectX cache)",
        "TRIM optimization for NVMe SSD read/write speeds",
        "Reclaims 10GB-30GB of wasted disk space"
      ],
      badge: "Clean Sweep"
    },
    {
      id: 'bios-kernel',
      icon: <Settings2 className="w-6 h-6 text-indigo-400" />,
      title: "BIOS & Kernel Level Tweaks",
      tag: "Power User",
      description: "Advanced IRQ affinity routing, MMCSS scheduling tuning, and HPET timer configuration for zero input delay.",
      details: [
        "Configures GPU Interrupt Affinity directly to physical CPU core",
        "Tunes MMCSS thread scheduling for unthrottled audio/graphics",
        "Disables Spectre/Meltdown CPU software mitigations for gaming",
        "Optimizes PCIe bus payload size for minimum latency"
      ],
      badge: "Pro Kernel"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Cutting-Edge Suite
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Engineered for <span className="text-gradient-blue">Raw PC Throughput</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Every feature in Syntra Optimizer is tested against competitive game engines to deliver maximum frame rates and zero input lag.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFeature(item)}
              className="glass-panel rounded-2xl p-7 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 glass-card-hover cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/40 group-hover:bg-blue-600/10 transition-all">
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>View All {item.details.length} Mod Capabilities</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Feature Details Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f0f1a] border border-blue-500/30 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(59,130,246,0.3)] relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/30">
                  {selectedFeature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">{selectedFeature.title}</h3>
                  <span className="text-xs text-blue-400 font-semibold">{selectedFeature.badge}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 mb-6">{selectedFeature.description}</p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What this mod changes:</h4>
              {selectedFeature.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <CircleCheckBig className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedFeature(null)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
