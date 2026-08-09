import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, House } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-blue-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <Zap className="w-8 h-8 text-blue-400" />
      </div>
      <h1 className="text-6xl font-heading font-black text-white font-mono">404</h1>
      <h2 className="text-2xl font-bold text-slate-300">Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm">
        The requested page does not exist or has been moved to another route in Syntra Optimizer.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors flex items-center gap-2"
      >
        <House className="w-4 h-4" /> Return to Housepage
      </Link>
    </div>
  );
};
