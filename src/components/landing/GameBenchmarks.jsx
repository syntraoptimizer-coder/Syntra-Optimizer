import React, { useState } from 'react';
import { Gamepad2, Cpu, HardDrive, Monitor, Zap } from 'lucide-react';

export const GameBenchmarks = () => {
  const [filter, setFilter] = useState('all');

  const benchmarks = [
    {
      id: 'fortnite',
      game: 'Fortnite',
      category: 'br',
      resolution: '1080p Competitive Settings',
      specs: {
        cpu: 'AMD Ryzen 5 5600',
        gpu: 'NVIDIA RTX 3060 Ti',
        ram: '16GB DDR4 3600MHz',
      },
      beforeFps: 142,
      afterFps: 168,
      increase: '+18%',
      low1PercentBefore: 88,
      low1PercentAfter: 124,
      imageBg: 'from-blue-600/30 to-indigo-900/40',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      id: 'valorant',
      game: 'Valorant',
      category: 'fps',
      resolution: '1080p High Performance',
      specs: {
        cpu: 'Intel Core i7-12700K',
        gpu: 'NVIDIA RTX 4070',
        ram: '32GB DDR5 6000MHz',
      },
      beforeFps: 310,
      afterFps: 420,
      increase: '+35%',
      low1PercentBefore: 210,
      low1PercentAfter: 340,
      imageBg: 'from-red-600/30 to-rose-900/40',
      badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
    },
    {
      id: 'cs2',
      game: 'Counter-Strike 2',
      category: 'fps',
      resolution: '1080p Low Competitive',
      specs: {
        cpu: 'AMD Ryzen 7 7800X3D',
        gpu: 'NVIDIA RTX 4080',
        ram: '32GB DDR5 6000MHz',
      },
      beforeFps: 380,
      afterFps: 495,
      increase: '+30%',
      low1PercentBefore: 240,
      low1PercentAfter: 385,
      imageBg: 'from-amber-600/30 to-orange-900/40',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    },
    {
      id: 'warzone',
      game: 'Call of Duty: Warzone',
      category: 'br',
      resolution: '1440p Balanced Quality',
      specs: {
        cpu: 'Intel Core i5-13600K',
        gpu: 'AMD Radeon RX 7800 XT',
        ram: '32GB DDR5 5600MHz',
      },
      beforeFps: 115,
      afterFps: 148,
      increase: '+28%',
      low1PercentBefore: 74,
      low1PercentAfter: 112,
      imageBg: 'from-emerald-600/30 to-teal-900/40',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
  ];

  const filteredData = filter === 'all' 
    ? benchmarks 
    : benchmarks.filter((b) => b.category === filter);

  return (
    <section id="benchmarks" className="py-24 bg-[#08080d] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5" />
            Verified Game Benchmarks
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Real Hardware. <span className="text-gradient-cyan">Measurable FPS Gains.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Tested across popular graphics cards and processors with frame-time analysis logging.
          </p>

          {/* Filter Buttons */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              All Tested Titles
            </button>
            <button
              onClick={() => setFilter('fps')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'fps'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Tactical FPS (CS2 / Val)
            </button>
            <button
              onClick={() => setFilter('br')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'br'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Battle Royale (Fortnite / WZ)
            </button>
          </div>
        </div>

        {/* Benchmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 relative overflow-hidden group space-y-6"
            >
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-heading font-black text-white">{item.game}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${item.badgeColor}`}>
                      {item.increase} FPS
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.resolution}</p>
                </div>
              </div>

              {/* Hardware Spec Card */}
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.specs.cpu}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.specs.gpu}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.specs.ram}</span>
                </div>
              </div>

              {/* Side by Side FPS Bars */}
              <div className="space-y-4 pt-1">
                
                {/* Before Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Stock Windows FPS</span>
                    <span className="text-slate-400 font-mono">{item.beforeFps} FPS</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-slate-700 rounded-full"
                      style={{ width: `${(item.beforeFps / 500) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* After Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Syntra Optimized FPS
                    </span>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{item.afterFps} FPS</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-emerald-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      style={{ width: `${(item.afterFps / 500) * 100}%` }}
                    ></div>
                  </div>
                </div>

              </div>

              {/* 1% Low frame time metric */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">1% Low Frame-Time Stutters:</span>
                <span className="text-slate-200 font-mono">
                  <span className="line-through text-slate-500 mr-2">{item.low1PercentBefore} FPS</span>
                  <strong className="text-emerald-400">{item.low1PercentAfter} FPS (+{Math.round(((item.low1PercentAfter - item.low1PercentBefore) / item.low1PercentBefore) * 100)}%)</strong>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
