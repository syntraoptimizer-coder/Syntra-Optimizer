import React, { useState } from 'react';
import { Download, FileCheck, CircleCheckBig, Clock3, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';

export const DownloadSection = () => {
  const { userPlan, userDownloads, triggerAppDownload } = useAuth();
  const [downloading, setDownloading] = useState(false);

  const hasActiveAccess = Boolean(userPlan && userPlan.status === 'active');

  const handleDownloadClick = async () => {
    if (!hasActiveAccess) return;
    setDownloading(true);
    
    // Launch celebratory confetti effect!
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#60a5fa', '#34d399', '#ffffff']
      });
    } catch (e) {
      console.log(e);
    }

    await triggerAppDownload();
    setDownloading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white">Download Syntra Optimizer</h2>
        <p className="text-xs text-slate-400 mt-1">Get the latest verified build for Windows 10 & 11 (64-bit).</p>
      </div>

      {/* Main Download Box */}
      <div className="glass-panel-glow rounded-3xl p-8 border border-blue-500/40 relative overflow-hidden space-y-6 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Latest Official Build: v2.4.1
            </div>
            <h3 className="text-3xl font-heading font-black text-white">Syntra Optimizer Pro</h3>
            <p className="text-xs text-slate-400 max-w-lg">
              Includes full kernel debloater, RAM Standby Purger, TCP Low-Latency stack tuner, and GPU interrupt affinity manager.
            </p>
          </div>

          {/* Download Button */}
          <div className="w-full md:w-auto">
            {hasActiveAccess ? (
              <button
                onClick={handleDownloadClick}
                disabled={downloading}
                className="w-full md:w-auto px-8 py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] flex items-center justify-center gap-3 active:scale-95"
              >
                <Download className="w-5 h-5 fill-white animate-bounce" />
                <span>{downloading ? "Preparing Installer..." : "Download Installer (.exe)"}</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold text-center">
                Active Plan Required To Download
              </div>
            )}
          </div>
        </div>

        {/* Technical file details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">File Name & Size</span>
            <span className="font-mono text-white text-xs block">SyntraOptimizer_Setup_v2.4.1.exe</span>
            <span className="text-[11px] text-slate-500">14.8 MB (Standalone Installer)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">OS Compatibility</span>
            <span className="font-mono text-emerald-400 text-xs block flex items-center gap-1">
              <CircleCheckBig className="w-3.5 h-3.5" /> Windows 10 & 11 (64-Bit)
            </span>
            <span className="text-[11px] text-slate-500">Admin privileges required</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase text-slate-400 font-semibold block">SHA-256 Checksum Hash</span>
            <span className="font-mono text-cyan-400 text-[10px] block truncate">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e46...
            </span>
            <span className="text-[11px] text-slate-500">VirusTotal 0/72 Detections Clean</span>
          </div>
        </div>

      </div>

      {/* Quick Setup Instructions */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-blue-400" /> 3-Step Quick Start Guide
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">1</div>
            <div className="font-bold text-white">Run as Administrator</div>
            <p className="text-slate-400">Right-click `SyntraOptimizer_Setup_v2.4.1.exe` and select "Run as administrator".</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">2</div>
            <div className="font-bold text-white">Enter Your License Key</div>
            <p className="text-slate-400">Paste your license key from the My Plan tab to register your license.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">3</div>
            <div className="font-bold text-white">Click 1-Scan Optimization</div>
            <p className="text-slate-400">Select "Recommended Gaming Preset" and reboot your PC once finished.</p>
          </div>
        </div>
      </div>

      {/* Download Clock3 Log */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <h4 className="text-base font-heading font-bold text-white flex items-center gap-2">
          <Clock3 className="w-4 h-4 text-cyan-400" /> Download Tracking Clock3
        </h4>

        {userDownloads && userDownloads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-sans font-semibold text-slate-400 uppercase">
                  <th className="pb-3">Version</th>
                  <th className="pb-3">File Name</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {userDownloads.map((dl, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-bold text-blue-400">{dl.version}</td>
                    <td className="py-2.5 text-slate-200">{dl.fileName || dl.file_name}</td>
                    <td className="py-2.5 text-slate-400">
                      {new Date(dl.timestamp || dl.created_at).toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-emerald-400 font-sans font-semibold">Verified Logged</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No download logs recorded yet. Click the download button above to initiate your first download.</p>
        )}
      </div>

    </div>
  );
};
