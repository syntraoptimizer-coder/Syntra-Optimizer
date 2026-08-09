import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Disc, Share2, Play, Code, CircleCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#060609] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background glow ambient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1 & 2: Brand overview */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-widest text-white">SYNTRA</span>
                <span className="text-[10px] tracking-wider text-blue-400 uppercase font-semibold -mt-1">OPTIMIZER</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Syntra Optimizer is the industry-leading Windows performance utility engineered for competitive gamers, streamers, and power users. Eliminate system bloat and unlock maximum hardware throughput.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
                <CircleCheck className="w-3.5 h-3.5" />
                Windows 10/11 Compatible
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                VAC & Vanguard Safe
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-blue-400 transition-colors">System Tweaks</a></li>
              <li><a href="#benchmarks" className="hover:text-blue-400 transition-colors">Game FPS Boosts</a></li>
              <li><a href="#live-preview" className="hover:text-blue-400 transition-colors">Live HUD Scanner</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Safety & FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Account / Support */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Client Portal</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/login" className="hover:text-blue-400 transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition-colors">Create Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">My License & Download</Link></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Done-For-You Remote Session</a></li>
            </ul>
          </div>

          {/* Col 5: Community & Socials */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Join Community</h4>
            <p className="text-xs text-slate-400 mb-4">
              Get live support, benchmark tips, and real-time optimization logs from 50,000+ members.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                <Disc className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                <Play className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-all">
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SYNTRA OPTIMIZER LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Anti-Cheat Disclosure</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
