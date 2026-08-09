import React, { useState } from 'react';
import { Play, RotateCcw, Cpu, Activity, HardDrive, Zap } from 'lucide-react';

export const LivePerformancePreview = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [optimized, setOptimized] = useState(false);

  // System stats state
  const [cpuUsage, setCpuUsage] = useState(48);
  const [ramUsage, setRamUsage] = useState(13.4);
  const [latency, setLatency] = useState(4.8);
  const [logMessages, setLogMessages] = useState([
    "Ready for 1-Click System Optimization Scan..."
  ]);

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setOptimized(false);
    setLogMessages(["Initializing Syntra System Kernel Diagnostic..."]);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setOptimized(true);
          setCpuUsage(11);
          setRamUsage(6.2);
          setLatency(0.6);
          setLogMessages((logs) => [
            "Optimization Complete! Freed 7.2 GB RAM, reduced input lag to 0.6ms.",
            "Deactivated 38 Windows background telemetry services.",
            "Tuned GPU Interrupt Affinity to Core #2 & #4.",
            ...logs,
          ]);
          return 100;
        }
        
        // Progress updates
        const next = prev + 10;
        if (next === 30) {
          setLogMessages((logs) => ["Purging Standby Memory Cache & DirectX Shader Cache...", ...logs]);
          setRamUsage(9.8);
        } else if (next === 60) {
          setLogMessages((logs) => ["Disabling Network Throttling & Applying TCP NoDelay...", ...logs]);
          setLatency(2.1);
        } else if (next === 90) {
          setLogMessages((logs) => ["Setting Ultra Low HPET High Resolution System Timer...", ...logs]);
          setCpuUsage(18);
        }
        return next;
      });
    }, 200);
  };

  const handleReset = () => {
    setIsScanning(false);
    setScanProgress(0);
    setOptimized(false);
    setCpuUsage(48);
    setRamUsage(13.4);
    setLatency(4.8);
    setLogMessages(["Reset system simulation state."]);
  };

  return (
    <section id="live-preview" className="py-24 bg-[#08080d] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            Interactive Live HUD
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            See the <span className="text-gradient-cyan">Optimization in Real Time</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Test the Syntra 1-Click Engine below. Watch live memory purge and latency reduction as tweaks execute.
          </p>
        </div>

        {/* Live HUD Simulator Card */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto border border-blue-500/30">
          
          {/* Top Bar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></div>
              <span className="text-sm font-mono text-slate-300">
                System Mode: <strong className={optimized ? "text-emerald-400" : "text-amber-400"}>
                  {optimized ? "SYNTRA OPTIMIZED" : "DEFAULT WINDOWS (UNOPTIMIZED)"}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleRunScan}
                disabled={isScanning}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all ${
                  isScanning
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_25px_rgba(59,130,246,0.5)]'
                }`}
              >
                {isScanning ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-blue-400" />
                    <span>Optimizing... {scanProgress}%</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{optimized ? "Run Scan Again" : "Run 1-Click Optimization"}</span>
                  </>
                )}
              </button>

              {optimized && (
                <button
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mb-8 space-y-2">
              <div className="flex justify-between text-xs text-slate-300 font-mono">
                <span>Executing Kernel Tweaks...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Realtime Metrics Gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* CPU Load Card */}
            <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-blue-400" /> CPU Idle Load</span>
                <span className={cpuUsage < 20 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {cpuUsage}%
                </span>
              </div>
              <div className="text-3xl font-heading font-black text-white font-mono">{cpuUsage}%</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${cpuUsage}%` }}></div>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Before: 48%</span>
                <span className="text-emerald-400 font-semibold">Saved: -37% CPU</span>
              </div>
            </div>

            {/* RAM Consumption */}
            <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-cyan-400" /> RAM Consumption</span>
                <span className={ramUsage < 8 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {ramUsage} GB
                </span>
              </div>
              <div className="text-3xl font-heading font-black text-white font-mono">{ramUsage} GB</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${(ramUsage / 16) * 100}%` }}></div>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Total: 16 GB</span>
                <span className="text-emerald-400 font-semibold">Freed: 7.2 GB</span>
              </div>
            </div>

            {/* System Latency */}
            <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-400" /> System Input Delay</span>
                <span className={latency < 1.0 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {latency} ms
                </span>
              </div>
              <div className="text-3xl font-heading font-black text-white font-mono">{latency} ms</div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 transition-all duration-500" style={{ width: `${(latency / 5) * 100}%` }}></div>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Before: 4.8 ms</span>
                <span className="text-emerald-400 font-semibold">Drop: -87.5% Lag</span>
              </div>
            </div>

          </div>

          {/* Interactive Console Log Output */}
          <div className="bg-[#06060a] rounded-xl p-4 border border-slate-800/80 font-mono text-xs text-slate-300 h-28 overflow-y-auto space-y-1.5">
            <div className="text-slate-500 text-[10px] uppercase font-sans font-semibold mb-1">Syntra Kernel Telemetry Terminal</div>
            {logMessages.map((msg, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-blue-500">›</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
