import React, { useState, useMemo } from 'react';
import type { InteractiveSandboxModel, InterestDomain, SandboxParameter, SandboxTelemetry } from '../../../types/personalization';
import { Sliders, RotateCcw, Activity, ShieldCheck, AlertCircle } from 'lucide-react';

interface Props {
  model: InteractiveSandboxModel;
  interest: InterestDomain;
  isPureAcademic?: boolean;
}

export const PersonalizedConceptSandbox: React.FC<Props> = ({
  model,
  interest,
  isPureAcademic = false
}) => {
  // Initialize slider states from model parameters default values
  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const p of model.parameters) {
      initial[p.id] = p.defaultValue;
    }
    return initial;
  });

  const handleSliderChange = (id: string, val: number) => {
    setParamValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleReset = () => {
    const reset: Record<string, number> = {};
    for (const p of model.parameters) {
      reset[p.id] = p.defaultValue;
    }
    setParamValues(reset);
  };

  // Compute live telemetry from current values
  const telemetry = useMemo(() => {
    return model.calculateTelemetry(paramValues);
  }, [model, paramValues]);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-[#080A0E]/90 border ${interest.theme.border} shadow-2xl space-y-6 transition-all duration-300`}>
      
      {/* Header & Formula Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner shrink-0">
            {isPureAcademic ? '🔬' : interest.icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-2">
              <span>{model.title}</span>
              <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border font-bold ${interest.theme.badge}`}>
                Live Simulation
              </span>
            </h3>
            <p className="text-xs text-[#8DA391] font-mono line-clamp-1">
              {model.scenarioDescription}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
          <div className="px-3 py-1 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-[#B8FF00] font-bold">
            {model.formulaDisplay}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8DA391] hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Reset variables to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left) and Live Telemetry Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sliders (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span>Interactive Variables</span>
          </div>

          <div className="space-y-4 p-4 rounded-2xl bg-[#0D121A] border border-white/10">
            {model.parameters.map((p: SandboxParameter) => {
              const val = paramValues[p.id] ?? p.defaultValue;
              return (
                <div key={p.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#D0D4C7]">{p.label}</span>
                    <span className="text-white font-bold bg-black/60 px-2.5 py-0.5 rounded-md border border-white/10 text-xs">
                      {val} {p.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={val}
                    onChange={(e) => handleSliderChange(p.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1C2533] rounded-lg appearance-none cursor-pointer accent-[#B8FF00]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
                    <span>{p.min} {p.unit}</span>
                    <span>{p.max} {p.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Gauges & Feedback (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Real-Time Invariant Telemetry</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {telemetry.metrics.map((m: SandboxTelemetry, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0D121A] border border-white/10 flex items-center justify-between"
              >
                <span className="text-xs text-[#8DA391] font-mono">{m.label}</span>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {m.value}
                  </span>
                  <span className="text-xs text-[#B8FF00] font-semibold">{m.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Outcome Narrative Banner */}
          <div className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
            telemetry.isSafeOrOptimal 
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#D1FAE5]' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          }`}>
            {telemetry.isSafeOrOptimal ? (
              <ShieldCheck className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <p className="text-xs leading-relaxed font-sans">
              {telemetry.outcomeMessage}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
