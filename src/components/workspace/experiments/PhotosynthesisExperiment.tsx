import React, { useState } from 'react';
import {
  Sun,
  Thermometer,
  Wind,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Sliders,
  Target,
} from 'lucide-react';
import {
  calculatePhotosynthesis,
  PHOTOSYNTHESIS_MODEL,
} from '../../../utils/scientificEngines';
import type {
  PhotosynthesisState,
} from '../../../types/scientificModel';

export const PhotosynthesisExperiment: React.FC = () => {
  const [modelState, setModelState] = useState<PhotosynthesisState>(
    PHOTOSYNTHESIS_MODEL.initialState
  );
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string>('optimal_summer');

  const { lightIntensity, wavelength, co2Concentration, temperature } = modelState;

  // Calculate deterministic scientific outputs
  const outputs = calculatePhotosynthesis(modelState);
  const telemetry = PHOTOSYNTHESIS_MODEL.getTelemetry(modelState, outputs);
  const explanation = PHOTOSYNTHESIS_MODEL.getExplanation(
    modelState,
    outputs,
    selectedComponentId
  );

  const handleUpdate = <K extends keyof PhotosynthesisState>(
    field: K,
    value: PhotosynthesisState[K]
  ) => {
    setModelState((prev) => {
      const updated = { ...prev, [field]: value };
      setActivePresetId('');
      return updated;
    });
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = PHOTOSYNTHESIS_MODEL.presets.find((p) => p.id === presetId);
    if (preset) {
      setModelState(preset.state);
      setActivePresetId(preset.id);
    }
  };

  const handleReset = () => {
    setModelState(PHOTOSYNTHESIS_MODEL.initialState);
    setActivePresetId('optimal_summer');
    setSelectedComponentId(null);
  };

  // Color mapping for illumination
  const lightColorOverlay = {
    red: 'bg-red-500/25',
    blue: 'bg-blue-500/25',
    green: 'bg-emerald-500/30',
    white: 'bg-amber-100/20',
  }[wavelength];

  return (
    <div className="bg-[#080A0E] text-[#F3F4EC] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative corner-reticle">
      {/* Top Telemetry Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0D1117] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30">
              PHOTOCHEMICAL REACTION CHAMBER
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] uppercase">
              MODEL: {PHOTOSYNTHESIS_MODEL.name.toUpperCase()}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
            Photolysis of Water &amp; Blackman's Law of Limiting Factors
          </h3>
          <p className="text-xs text-[#8DA391] mt-0.5 max-w-2xl">
            {PHOTOSYNTHESIS_MODEL.overview}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors self-start md:self-auto"
          aria-label="Reset parameters to standard baseline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET BASELINE</span>
        </button>
      </div>

      {/* Preset Scenario Selector Pill Bar */}
      <div className="px-5 py-3 bg-[#0A0D12] border-b border-white/5 flex flex-wrap sm:flex-nowrap items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-[#8DA391] uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
          <Target className="w-3 h-3 text-[#B8FF00]" />
          BENCHMARKS:
        </span>
        {PHOTOSYNTHESIS_MODEL.presets.map((p) => (
          <button
            key={p.id}
            onClick={() => handleLoadPreset(p.id)}
            className={`px-3 py-1 rounded-lg border whitespace-nowrap transition-all ${
              activePresetId === p.id
                ? 'bg-[#B8FF00]/15 text-[#B8FF00] border-[#B8FF00]/40'
                : 'bg-white/5 text-[#8DA391] hover:text-white border-white/5'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: The Photochemical Glassware Chamber Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#05070A] rounded-2xl p-6 border border-white/10 relative shadow-inner overflow-hidden min-h-[380px] flex flex-col items-center justify-center">
            
            {/* Background Reticle Grid */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Active Limiting Factor Badge */}
            <div
              className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border backdrop-blur-md ${
                outputs.limitingFactor === 'NONE'
                  ? 'bg-[#B8FF00]/10 border-[#B8FF00]/30 text-[#B8FF00]'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
              }`}
            >
              {outputs.limitingFactor === 'NONE' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>BALANCED REGIME (NO BOTTLENECK)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>LIMITING FACTOR: {outputs.limitingFactor}</span>
                </>
              )}
            </div>

            {/* Quantum Efficiency Badge */}
            <div className="absolute top-4 right-4 z-10 bg-[#0D1117]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-[#38BDF8]">
              η = {(outputs.quantumEfficiency * 100).toFixed(0)}% absorption
            </div>

            {/* Chamber Glassware Rig */}
            <div
              className="relative w-56 h-72 border-4 border-[#374151] border-t-0 rounded-b-3xl bg-blue-950/20 p-4 flex flex-col items-center justify-end overflow-hidden cursor-pointer"
              onClick={() => setSelectedComponentId('bubble_collector')}
            >
              {/* Aqueous Buffer Solution */}
              <div className="absolute inset-x-0 bottom-0 h-[88%] bg-gradient-to-t from-emerald-950/40 via-cyan-950/20 to-transparent border-t border-cyan-400/20" />

              {/* Light beam illumination overlay */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${lightColorOverlay}`}
                style={{ opacity: lightIntensity / 100 }}
              />

              {/* Rising Oxygen (O2) Bubbles Stream */}
              {outputs.bubbleRate > 0 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(Math.min(16, Math.max(2, Math.round(outputs.bubbleRate / 4))))].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-white/80 border border-cyan-200 shadow-xs animate-pulse"
                      style={{
                        left: `${25 + (i * 13) % 50}%`,
                        bottom: `${15 + (i * 18) % 75}%`,
                        animationDuration: `${1.2 + (i % 4) * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Submerged Elodea Sprig & Chloroplast Matrix */}
              <div
                className="relative z-10 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponentId('thylakoid_membrane');
                }}
              >
                <div className="w-2 h-32 bg-[#059669] rounded-full relative shadow-md">
                  {/* Leaf pairs */}
                  <div className="absolute top-2 -left-3.5 w-4.5 h-2.5 bg-[#10B981] rounded-full rotate-[-30deg]" />
                  <div className="absolute top-2 -right-3.5 w-4.5 h-2.5 bg-[#10B981] rounded-full rotate-[30deg]" />
                  <div className="absolute top-9 -left-4 w-5 h-3 bg-[#10B981] rounded-full rotate-[-25deg]" />
                  <div className="absolute top-9 -right-4 w-5 h-3 bg-[#10B981] rounded-full rotate-[25deg]" />
                  <div className="absolute top-18 -left-4 w-5 h-3 bg-[#10B981] rounded-full rotate-[-20deg]" />
                  <div className="absolute top-18 -right-4 w-5 h-3 bg-[#10B981] rounded-full rotate-[20deg]" />
                </div>
                <div className="w-12 h-3 bg-[#78350F] rounded-full -mt-1 border border-white/10" />
              </div>

              {/* Dissolved Gas Oxygen Sensor Probe */}
              <div
                className="absolute top-6 right-2 w-2.5 h-28 bg-[#9CA3AF] rounded-b-md border border-white/20 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedComponentId('stroma');
                }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] -top-1 -left-0.5 absolute animate-ping opacity-75" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-[#8DA391] mt-3 text-center">
              Click on the <button onClick={() => setSelectedComponentId('thylakoid_membrane')} className="text-[#B8FF00] underline">Elodea Plant</button>, <button onClick={() => setSelectedComponentId('bubble_collector')} className="text-[#B8FF00] underline">Eudiometer</button>, or <button onClick={() => setSelectedComponentId('stroma')} className="text-[#B8FF00] underline">Sensor Probe</button> to inspect their functional biology.
            </div>
          </div>

          {/* Real-Time Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {telemetry.map((t) => (
              <div
                key={t.id}
                className="p-3 rounded-xl bg-[#0D1117] border border-white/10 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-[#8DA391] tracking-wider">
                    {t.label}
                  </span>
                  {t.symbol && (
                    <span className="font-mono text-[10px] text-[#B8FF00]">
                      {t.symbol}
                    </span>
                  )}
                </div>
                <div className="font-mono text-base font-bold text-white flex items-baseline gap-1">
                  <span>{t.value}</span>
                  {t.unit && <span className="text-xs text-[#8DA391]">{t.unit}</span>}
                </div>
                {t.description && (
                  <p className="text-[10px] text-[#8DA391]/80 truncate">
                    {t.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contextual Scientific Explanation Card */}
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B8FF00]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  CONTEXTUAL SCIENTIFIC EXPLANATION
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#8DA391]">
                {explanation.educationalLevel}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-mono text-[10px] text-[#8DA391] uppercase block">OBSERVATION:</span>
                <p className="text-[#F3F4EC] font-medium leading-relaxed">{explanation.observation}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#8DA391] uppercase block">GOVERNING PRINCIPLE:</span>
                <p className="text-[#38BDF8] font-bold">{explanation.governingPrinciple}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#8DA391] uppercase block">KEY TAKEAWAY:</span>
                <p className="text-[#8DA391] leading-relaxed">{explanation.keyTakeaway}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Parametric Controls & Environmental Deck */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#B8FF00]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  ENVIRONMENTAL PARAMETER DECK
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8DA391]">
                4 KINETIC VARIABLES
              </span>
            </div>

            {/* Variable 1: Wavelength Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <span>Wavelength Spectrum (λ):</span>
                </label>
                <span className="text-[#B8FF00] uppercase text-[10px] font-bold">
                  {wavelength} ({(outputs.quantumEfficiency * 100).toFixed(0)}% eff)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(['red', 'blue', 'green', 'white'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => handleUpdate('wavelength', w)}
                    className={`py-2 px-2 rounded-xl text-xs font-mono font-bold capitalize border transition-all ${
                      wavelength === w
                        ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-[#8DA391] hover:text-white'
                    }`}
                  >
                    {w === 'red'
                      ? '660nm'
                      : w === 'blue'
                      ? '430nm'
                      : w === 'green'
                      ? '520nm'
                      : 'White'}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>Red: Peak Chlorophyll A</span>
                <span>Green: 85% Reflected</span>
              </div>
            </div>

            {/* Variable 2: Light Intensity (I) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Intensity (I):</span>
                  <span className="text-[10px] text-[#8DA391]">%</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="5"
                  value={lightIntensity}
                  onChange={(e) => handleUpdate('lightIntensity', parseInt(e.target.value, 10) || 0)}
                  className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-amber-400 font-bold focus:border-amber-400 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={lightIntensity}
                onChange={(e) => handleUpdate('lightIntensity', parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>0% (Darkness)</span>
                <span>50% (Ambient)</span>
                <span>100% (Direct Sun)</span>
              </div>
            </div>

            {/* Variable 3: CO2 Concentration */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>CO₂ Concentration:</span>
                  <span className="text-[10px] text-[#8DA391]">ppm</span>
                </label>
                <input
                  type="number"
                  min="200"
                  max="1200"
                  step="50"
                  value={co2Concentration}
                  onChange={(e) => handleUpdate('co2Concentration', parseInt(e.target.value, 10) || 200)}
                  className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-[#38BDF8] font-bold focus:border-[#38BDF8] focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="200"
                max="1200"
                step="50"
                value={co2Concentration}
                onChange={(e) => handleUpdate('co2Concentration', parseInt(e.target.value, 10))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>200 (Deficient)</span>
                <span>450 (Ambient Earth)</span>
                <span>1200 (Saturated)</span>
              </div>
            </div>

            {/* Variable 4: Temperature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                  <span>Temperature (T):</span>
                  <span className="text-[10px] text-[#8DA391]">°C</span>
                </label>
                <input
                  type="number"
                  min="10"
                  max="45"
                  step="1"
                  value={temperature}
                  onChange={(e) => handleUpdate('temperature', parseInt(e.target.value, 10) || 10)}
                  className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-rose-400 font-bold focus:border-rose-400 focus:outline-none"
                />
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={temperature}
                onChange={(e) => handleUpdate('temperature', parseInt(e.target.value, 10))}
                className="w-full accent-rose-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>10°C (Sluggish)</span>
                <span>28°C (Optimum)</span>
                <span>45°C (Denaturation)</span>
              </div>
            </div>

          </div>

          {/* Guided Discovery Invariant Callout */}
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>INQUIRY EXPERIMENT TO TEST</span>
              </span>
            </div>

            <p className="text-xs text-[#8DA391] leading-relaxed">
              Switch the wavelength to <strong>520nm (Green)</strong> while keeping light intensity at 100%. Notice why oxygen bubbling drops to near-zero: chlorophyll pigments reflect green wavelengths instead of capturing them!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
