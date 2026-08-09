import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Pricing = () => {
  const { user, purchasePlan } = useAuth();
  const navigate = useNavigate();
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  const handleSelectPlan = (planId) => {
    if (!user) {
      navigate('/register');
      return;
    }
    setSelectedPlanModal(planId);
  };

  const confirmPurchase = async () => {
    if (!selectedPlanModal) return;
    setPurchasing(true);
    await purchasePlan(selectedPlanModal);
    setPurchasing(false);
    setSelectedPlanModal(null);
    navigate('/dashboard');
  };

  return (
    <section id="pricing" className="py-24 bg-[#08080d] border-t border-slate-800/80 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            Simple One-Time Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Choose Your <span className="text-gradient-blue">Optimization Path</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No recurring monthly subscriptions. One-time payment, lifetime results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          
          {/* Plan 1: Self-Service $15 */}
          <div className="glass-panel-glow rounded-3xl p-8 border border-blue-500/40 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[11px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl shadow-md">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase border border-blue-500/30">
                  Full Control, Your Own License
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-3">Self-Service App License</h3>
                <p className="text-xs text-slate-400 mt-1">Download the Syntra Optimizer app and run all 1-click tweaks yourself.</p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-heading font-black text-white">$15</span>
                <span className="text-slate-400 text-sm font-medium">one-time / lifetime license</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-4 border-t border-slate-800 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>Full Syntra Optimizer desktop app license</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>All 6 optimization suites unlocked</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>1-Click System Restore points & safety undo</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>Unlimited lifetime app updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>Discord VIP Support Role & community access</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('self-service')}
              className="mt-8 w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Get Self-Service License ($15)</span>
            </button>

          </div>

          {/* Plan 2: Done-For-You $6 */}
          <div className="glass-panel rounded-3xl p-8 border border-slate-800 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300">
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase border border-emerald-500/30">
                  Personally Optimized By An Expert
                </span>
                <h3 className="text-2xl font-heading font-bold text-white mt-3">Done-For-You Remote Session</h3>
                <p className="text-xs text-slate-400 mt-1">An expert personally remotes into your PC and tunes your exact hardware. Zero install needed.</p>
              </div>

              {/* Price Tag */}
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-heading font-black text-white">$6</span>
                <span className="text-slate-400 text-sm font-medium">one-time / 1-on-1 remote session</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-4 border-t border-slate-800 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>1-on-1 Expert remote optimization session</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>No software installation required on your end</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>Custom BIOS, GPU interrupt & RAM timing tuning</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>Tailored for your exact CPU/GPU combination</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400"><Check className="w-3.5 h-3.5" /></div>
                  <span>30-Day performance guarantee & direct follow-up</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleSelectPlan('done-for-you')}
              className="mt-8 w-full py-4 rounded-xl font-bold text-base text-slate-200 bg-slate-900 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Book Expert Remote Session ($6)</span>
            </button>

          </div>

        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
          <h3 className="text-xl font-heading font-bold text-white mb-6 text-center">
            Detailed Feature Comparison Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold uppercase text-slate-400">
                  <th className="pb-4">Feature</th>
                  <th className="pb-4 text-center text-blue-400">Self-Service ($15)</th>
                  <th className="pb-4 text-center text-emerald-400">Done-For-You ($6)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr>
                  <td className="py-3 text-white">Syntra App License</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">✓ Included</td>
                  <td className="py-3 text-center text-slate-500">Not Needed</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Execution Method</td>
                  <td className="py-3 text-center text-slate-300">User Runs App</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">Expert Remote Session</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Full Registry & Debloat Modding</td>
                  <td className="py-3 text-center text-emerald-400">✓</td>
                  <td className="py-3 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Custom BIOS & Sub-Timings Tuning</td>
                  <td className="py-3 text-center text-slate-500">Manual Guide Only</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">✓ Done By Expert</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">GPU Interrupt Core Pinning</td>
                  <td className="py-3 text-center text-emerald-400">✓ Automated</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">✓ Custom Hardware Tuned</td>
                </tr>
                <tr>
                  <td className="py-3 text-white">Support & Guarantee</td>
                  <td className="py-3 text-center text-slate-300">Community Discord</td>
                  <td className="py-3 text-center text-emerald-400 font-bold">1-on-1 Dedicated Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Payment / Plan Confirmation Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0f0f1a] border border-blue-500/30 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <h3 className="text-xl font-heading font-bold text-white mb-2">Confirm License Order</h3>
            <p className="text-xs text-slate-400 mb-6">
              You are selecting the <strong className="text-blue-400">
                {selectedPlanModal === 'self-service' ? 'Self-Service $15 License' : 'Done-For-You $6 Remote Session'}
              </strong>. Instant license activation will be tied to <span className="text-white font-mono">{user?.email}</span>.
            </p>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Plan</span>
                <span className="text-white font-semibold">
                  {selectedPlanModal === 'self-service' ? 'Syntra Pro App ($15)' : 'Remote Optimization ($6)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account</span>
                <span className="text-slate-300 font-mono">{user?.email}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-200 font-bold">Total Due Now</span>
                <span className="text-emerald-400 font-black text-sm">
                  {selectedPlanModal === 'self-service' ? '$15.00 USD' : '$6.00 USD'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="w-1/2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-sm hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmPurchase}
                disabled={purchasing}
                className="w-1/2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2"
              >
                {purchasing ? "Processing..." : "Complete Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
