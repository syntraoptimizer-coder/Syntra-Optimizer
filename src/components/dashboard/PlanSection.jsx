import React, { useState } from 'react';
import { Zap, ShieldCheck, UserCheck, CircleCheckBig, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PlanSection = () => {
  const { userPlan, purchasePlan } = useAuth();
  const [bookingDate, setBookingDate] = useState('');
  const [anydeskId, setAnydeskId] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    setBooked(true);
  };

  const isDfy = userPlan?.planId === 'done-for-you';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white">My Active License & Plan</h2>
        <p className="text-xs text-slate-400 mt-1">Review your purchased Syntra plan, license key, or schedule a remote session.</p>
      </div>

      {/* Main Active Plan Card */}
      <div className="glass-panel-glow rounded-2xl p-7 border border-blue-500/30 relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30 inline-flex items-center gap-1.5">
              <CircleCheckBig className="w-3.5 h-3.5" />
              {userPlan?.status === 'active' ? 'Active License' : 'Active Plan'}
            </span>
            <h3 className="text-2xl font-heading font-bold text-white mt-2">
              {userPlan?.planName || 'Self-Service Pro License'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Purchased on {userPlan?.purchasedAt ? new Date(userPlan.purchasedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-heading font-black text-white">${userPlan?.price || 15}</span>
            <span className="text-xs text-slate-400 block font-medium">One-Time Paid</span>
          </div>
        </div>

        {/* License Key Box */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Official License Key</span>
            <span className="text-lg font-mono font-bold text-blue-400 tracking-wider">
              {userPlan?.licenseKey || 'SYN-9948-X821-P902'}
            </span>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(userPlan?.licenseKey || 'SYN-9948-X821-P902');
              alert('License key copied to clipboard!');
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white hover:border-blue-500 transition-all"
          >
            Copy Key
          </button>
        </div>

        {/* Feature status badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Updates: Lifetime Free</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Download Access: Granted</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Support: Priority Discord</span>
          </div>
        </div>
      </div>

      {/* Done-For-You Remote Appointment Booking Module */}
      {isDfy && (
        <div className="glass-panel rounded-2xl p-7 border border-emerald-500/30 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Done-For-You Remote Session Scheduler</h3>
              <p className="text-xs text-slate-400">Schedule your 1-on-1 expert optimization remote appointment.</p>
            </div>
          </div>

          {booked ? (
            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
              <div className="font-bold text-sm flex items-center gap-2">
                <CircleCheckBig className="w-4 h-4 text-emerald-400" /> Appointment Confirmed!
              </div>
              <p>An expert optimization technician will connect with AnyDesk ID <strong>{anydeskId || '123-456-789'}</strong> on <strong>{bookingDate || 'Selected Slot'}</strong>.</p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Preferred Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">AnyDesk / TeamViewer ID</label>
                <input
                  type="text"
                  required
                  value={anydeskId}
                  onChange={(e) => setAnydeskId(e.target.value)}
                  placeholder="e.g. 984-210-449"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  Confirm Remote Booking Slot
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Plan upgrade or add second plan */}
      {!isDfy && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-heading font-bold text-white">Want An Expert To Optimize Your PC Remotely?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Add a $6 Done-For-You remote session for custom hardware BIOS & sub-timing tuning.</p>
          </div>
          <button
            onClick={() => purchasePlan('done-for-you')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs hover:bg-emerald-600 hover:text-white transition-all shrink-0"
          >
            Add DFY Remote Session ($6)
          </button>
        </div>
      )}

    </div>
  );
};
