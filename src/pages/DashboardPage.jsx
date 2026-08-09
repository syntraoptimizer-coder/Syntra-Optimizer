import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, ShieldCheck, Download, LogOut, LayoutDashboard, CreditCard, 
  Settings, ExternalLink, CircleCheckBig, Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProfileSection } from '../components/dashboard/ProfileSection';
import { PlanSection } from '../components/dashboard/PlanSection';
import { DownloadSection } from '../components/dashboard/DownloadSection';

export const DashboardPage = () => {
  const { user, userPlan, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const displayName = user?.user_metadata?.full_name || user?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url || user?.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.email}`;
  const planName = userPlan?.planName || 'Self-Service License';
  const isDfy = userPlan?.planId === 'done-for-you';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#08080d] border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0">
        
        <div className="space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400 fill-blue-400/20" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-widest text-white">SYNTRA</span>
              <span className="text-[9px] tracking-wider text-blue-400 uppercase font-semibold -mt-1">PORTAL</span>
            </div>
          </Link>

          {/* User Mini Profile Header */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-10 h-10 rounded-xl object-cover border border-blue-500/30 shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{displayName}</h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {isDfy ? 'Done-For-You Plan' : 'Self-Service $15'}
              </span>
            </div>
          </div>

          {/* Tab Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('download')}
              className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                activeTab === 'download'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-cyan-400" />
                Download App
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>

            <button
              onClick={() => setActiveTab('plan')}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === 'plan'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              My Plan & License
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                activeTab === 'profile'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Settings className="w-4 h-4 text-purple-400" />
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            className="w-full py-2.5 px-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-medium hover:text-white flex items-center justify-between"
          >
            <span>Back to Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-semibold hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

      </aside>

      {/* Main Dashboard Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        
        {/* Top Header bar */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-800/80">
          <div>
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Client Portal</span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Welcome back, {displayName}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              License Status: <strong className="text-emerald-400">Verified</strong>
            </div>

            <button
              onClick={() => setActiveTab('download')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download App
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Download CTA Hero Banner */}
            <div className="glass-panel-glow rounded-3xl p-8 border border-blue-500/40 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase border border-blue-500/30">
                  <Sparkles className="w-3.5 h-3.5" /> Ready for Installation
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Syntra Optimizer Pro v2.4.1
                </h3>
                <p className="text-xs text-slate-300">
                  Your license key is activated! Download the software below to purge Standby Memory, lock 0.5ms HPET system timer, and eliminate input delay.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('download')}
                className="px-7 py-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4 fill-white" />
                Go to Downloads
              </button>
            </div>

            {/* Quick Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: License */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Current License</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl font-heading font-bold text-white">{planName}</div>
                <div className="text-xs font-mono text-blue-400 bg-slate-900 p-2 rounded-lg border border-slate-800">
                  Key: {userPlan?.licenseKey || 'SYN-9948-X821-P902'}
                </div>
              </div>

              {/* Card 2: Status */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Plan Type</span>
                  <CreditCard className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-xl font-heading font-bold text-white">
                  ${userPlan?.price || 15} One-Time
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CircleCheckBig className="w-3.5 h-3.5" /> Lifetime Updates Included
                </div>
              </div>

              {/* Card 3: Support */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Community & Support</span>
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-xl font-heading font-bold text-white">VIP Discord Access</div>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1 block"
                >
                  Join Syntra Discord Server →
                </a>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Download */}
        {activeTab === 'download' && <DownloadSection />}

        {/* Tab 3: Plan */}
        {activeTab === 'plan' && <PlanSection />}

        {/* Tab 4: Profile */}
        {activeTab === 'profile' && <ProfileSection />}

      </main>

    </div>
  );
};
