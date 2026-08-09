import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      name: "Marcus Vance",
      handle: "@marcus_fps",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Valorant Radiant Competitor",
      badge: "Self-Service License",
      quote: "My Valorant FPS went from hovering around 260 to solid 390+ with zero micro-stutters when spraying. The input lag reduction is night and day.",
    },
    {
      name: "Tyler 'Apex' Rossi",
      handle: "@apex_tyler",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Twitch Streamer & Video Editor",
      badge: "Done-For-You Client",
      quote: "I bought the $6 Done-For-You service. The technician remoted in, applied full kernel & GPU interrupt tweaks in 20 mins. My PC feels lighter and dual-pc streaming has 0 dropped frames.",
    },
    {
      name: "Elena Rostova",
      handle: "@elena_builds",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      role: "Custom PC Builder",
      badge: "Self-Service License",
      quote: "I pre-install Syntra Optimizer on all my customer rig builds. It fixes default Windows 11 bloat without breaking Windows updates or Vanguard.",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-blue-400 text-blue-400" />
            Verified User Reviews
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Trusted by <span className="text-gradient-blue">500,000+ Gamers & Pros</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            See how Syntra Optimizer transforms real-world gaming rigs and streaming setups.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-7 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 glass-card-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    {rev.badge}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-blue-500/20" />

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-blue-500/30"
                />
                <div>
                  <h4 className="text-sm font-heading font-bold text-white">{rev.name}</h4>
                  <p className="text-xs text-slate-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
