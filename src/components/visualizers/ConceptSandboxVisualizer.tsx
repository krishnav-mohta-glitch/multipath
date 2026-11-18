import React, { useState } from 'react';
import { Sliders, Activity, Sparkles, RotateCcw } from 'lucide-react';
import type { BaseVisualizerProps } from './types';

export const ConceptSandboxVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [paramA, setParamA] = useState<number>(50);
  const [paramB, setParamB] = useState<number>(30);
  const [paramC, setParamC] = useState<number>(75);

  const calculatedOutput = Number(((paramA * paramB) / Math.max(1, paramC)).toFixed(2));
  const rateOfChange = Number((paramA / Math.max(1, paramC)).toFixed(3));
  const isOptimal = calculatedOutput >= 15 && calculatedOutput <= 35;

  const handleReset = () => {
    setParamA(50);
    setParamB(30);
    setParamC(75);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#080A0E] text-[#F3F4EC] shadow-2xl p-4 sm:p-6 lg:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
              Interactive Concept Parameter Workbench
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {topic.id}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight break-words">
            {topic.title} &bull; Dynamic Variable Simulation
          </h3>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors cursor-pointer self-start sm:self-auto"
          title="Reset Parameters"
          aria-label="Reset Parameters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Output Display & Telemetry */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0D121B] border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>Simulation Field &amp; Output Response</span>
              </span>
              <span className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                isOptimal ? 'bg-[#B8FF00]/20 text-[#B8FF00] border border-[#B8FF00]/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isOptimal ? 'Balanced Regime' : 'Limiting Boundary'}
              </span>
            </div>

            {/* Simulated Live Output Gauge */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/08 text-center space-y-2">
              <span className="font-mono text-xs uppercase text-[#8DA391] block">
                Calculated System Response (Y):
              </span>
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#B8FF00] tracking-tight">
                {calculatedOutput} <span className="text-sm font-mono text-white/50">units</span>
              </div>
              <p className="font-mono text-xs text-[#8DA391]">
                Governing relation: <code className="text-white">Y = (A &times; B) / C</code>
              </p>
            </div>

            {/* Telemetry Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/08 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#8DA391] block">Sensitivity Slope</span>
                <span className="font-mono text-base font-bold text-white block">{rateOfChange}</span>
                <span className="text-[10px] text-[#8DA391]">ΔY / ΔB</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/08 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#8DA391] block">Stability Index</span>
                <span className="font-mono text-base font-bold text-white block">{Math.min(100, Math.round(paramC * 1.2))}%</span>
                <span className="text-[10px] text-[#8DA391]">Damping ratio</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/08 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#8DA391] block">Curriculum Domain</span>
                <span className="font-mono text-base font-bold text-[#B8FF00] block uppercase">{topic.subjectId}</span>
                <span className="text-[10px] text-[#8DA391]">{topic.estimatedMinutes} mins est.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls & Pedagogical Insights */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-4">
            <div className="pb-2 border-b border-white/08">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>Variable Parameters</span>
              </span>
            </div>

            {/* Slider 1 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08 font-mono text-xs">
              <div className="flex justify-between text-white">
                <span>Variable A</span>
                <span className="text-[#B8FF00] font-bold">{paramA}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={paramA}
                onChange={(e) => setParamA(Number(e.target.value))}
                className="w-full accent-[#B8FF00] cursor-pointer"
              />
            </div>

            {/* Slider 2 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08 font-mono text-xs">
              <div className="flex justify-between text-white">
                <span>Variable B</span>
                <span className="text-[#38BDF8] font-bold">{paramB}</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={paramB}
                onChange={(e) => setParamB(Number(e.target.value))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08 font-mono text-xs">
              <div className="flex justify-between text-white">
                <span>Variable C</span>
                <span className="text-amber-400 font-bold">{paramC}</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                step="5"
                value={paramC}
                onChange={(e) => setParamC(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Learning Invariant Insight */}
            <div className="p-3.5 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/25 space-y-1 text-xs text-[#E0FF88]">
              <span className="font-mono text-[10px] uppercase font-bold flex items-center gap-1 text-[#B8FF00]">
                <Sparkles className="w-3 h-3" />
                <span>Key Invariant Principle:</span>
              </span>
              <p className="leading-relaxed">
                As input magnitude increases, system response scales proportionally unless constrained by damping resistance.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
