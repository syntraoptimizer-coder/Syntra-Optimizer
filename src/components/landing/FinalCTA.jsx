import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const FinalCTA = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 bg-[#08080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel-glow rounded-3xl p-10 sm:p-16 border border-blue-500/40 relative overflow-hidden text-center space-y-6 shadow-[0_0_80px_rgba(59,130,246,0.25)]">
          {/* Background mesh glow inside banner */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20 pointer-events-none"></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs font-semibold text-blue-300 uppercase tracking-wider relative z-10">
            <Sparkles className="w-3.5 h-3.5" />
            Unleash Your Hardware
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight relative z-10 max-w-2xl mx-auto">
            Ready to Experience <br />
            <span className="text-gradient-cyan">Maximum FPS & Zero Lag?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto relative z-10">
            Join over 500,000 gamers enjoying lower latency, smoother frame times, and debloated Windows performance.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to={user ? "/dashboard" : "/register"}
              className="w-full sm:w-auto px-9 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] flex items-center justify-center gap-2 active:scale-95"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>{user ? "Open Client Dashboard" : "Get Syntra Optimizer Now"}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 relative z-10">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 14-Day Guarantee</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Key Delivery</span>
          </div>

        </div>

      </div>
    </section>
  );
};
