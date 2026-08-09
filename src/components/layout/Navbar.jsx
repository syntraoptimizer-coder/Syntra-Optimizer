import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, LogOut, ChevronRight, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-blue-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-all">
            <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform fill-blue-400/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-2xl tracking-widest text-white flex items-center gap-1">
              SYNTRA
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-wider text-blue-400/80 uppercase font-semibold -mt-1">
              OPTIMIZER
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        {!isDashboard && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#benchmarks" className="hover:text-blue-400 transition-colors">Game Benchmarks</a>
            <a href="#live-preview" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Demo
            </a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          </nav>
        )}

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-blue-500/30 text-blue-300 hover:bg-blue-900/30 hover:border-blue-500/60 transition-all font-medium text-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-400" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="relative group overflow-hidden px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.7)] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Get Started
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-blue-500/20 px-4 pt-4 pb-6 mt-2 space-y-3">
          {!isDashboard && (
            <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300 mb-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/60">Features</a>
              <a href="#benchmarks" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/60">Game Benchmarks</a>
              <a href="#live-preview" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/60 flex items-center gap-2">Live Demo</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/60">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-800/60">FAQ</a>
            </div>
          )}
          {user ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-blue-600 text-center text-white font-semibold flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-center font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-medium text-slate-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-blue-600 text-center font-semibold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Get Started Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
