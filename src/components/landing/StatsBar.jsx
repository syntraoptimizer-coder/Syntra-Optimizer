import React, { useState, useEffect } from 'react';
import { Download, Star, Gauge, TrendingUp } from 'lucide-react';

export const StatsBar = () => {
  const [downloads, setDownloads] = useState(485000);
  const [score, setScore] = useState(70);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDownloads(524890);
      setScore(92);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: <Download className="w-6 h-6 text-blue-400" />,
      value: `${downloads.toLocaleString()}+`,
      label: "Active Downloads",
      subtext: "Across Windows 10 & 11 PCs",
    },
    {
      icon: <Star className="w-6 h-6 text-amber-400 fill-amber-400" />,
      value: "4.8 / 5.0",
      label: "User Rating",
      subtext: "Based on 14,200+ Gamer Reviews",
    },
    {
      icon: <Gauge className="w-6 h-6 text-emerald-400" />,
      value: `${score} / 100`,
      label: "Avg System Score",
      subtext: "Up from 64/100 default Windows",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      value: "+24.5%",
      label: "Avg FPS Improvement",
      subtext: "Tested on 1% low frame rates",
    },
  ];

  return (
    <section className="py-10 bg-[#08080d] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-300 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
