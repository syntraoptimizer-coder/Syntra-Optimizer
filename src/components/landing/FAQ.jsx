import React, { useState } from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is Syntra Optimizer safe? Will it trigger anti-cheat bans (VAC, Riot Vanguard, EAC)?",
      a: "100% safe. Syntra Optimizer only modifies legitimate Windows registry settings, OS timer resolutions, and background service priorities. It NEVER injects code into game binaries or modifies game files, making it completely compliant with Riot Vanguard, Valve Anti-Cheat (VAC), Easy Anti-Cheat (EAC), and BattlEye."
    },
    {
      q: "Which Windows versions are supported?",
      a: "Syntra Optimizer is custom-built for Windows 10 (Build 19041+) and Windows 11 (all builds, 64-bit). It includes dedicated tweaks for Windows 11's updated thread director and memory scheduling algorithms."
    },
    {
      q: "How does the $6 Done-For-You remote optimization service work? Is remote access safe?",
      a: "After purchasing the Done-For-You plan, you select an available time slot in your dashboard. An expert technician connects with you via secure, encrypted AnyDesk / TeamViewer software. You remain on your screen the entire time, watching every command. Our technicians do not inspect personal files and focus strictly on GPU driver interrupt affinity, BIOS sub-timings, and OS kernel latency."
    },
    {
      q: "Can I revert changes if I want to restore default Windows settings?",
      a: "Yes! Prior to applying any optimization, Syntra Optimizer automatically creates a native Windows System Restore Point and generates a 1-Click Restore File. You can revert to stock factory Windows settings at any time with a single click."
    },
    {
      q: "How do I receive my license key & download access after purchasing?",
      a: "Instant delivery! Once logged into your Syntra account, your active plan and Syntra Optimizer v2.4.1 installer download button appear immediately inside your Client Dashboard under the Download tab."
    },
    {
      q: "What is your refund policy?",
      a: "We offer a 14-day hassle-free money-back guarantee. If Syntra Optimizer does not measurably reduce your system input latency or improve your frame-time stability, simply request a full refund via your dashboard."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <CircleHelp className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Got Questions? <span className="text-gradient-blue">We Have Answers.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about safety, anti-cheat compliance, and remote optimization.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-panel rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-blue-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-slate-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-lg bg-slate-900 border border-slate-800 transition-transform ${isOpen ? 'rotate-180 text-blue-400 border-blue-500/30' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
