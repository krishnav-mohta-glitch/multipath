import React, { useState } from 'react';
import { Sun, Thermometer, Wind, RotateCcw, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';

export const PhotosynthesisExperiment: React.FC = () => {
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [wavelength, setWavelength] = useState<'red' | 'blue' | 'green' | 'white'>('white');
  const [co2, setCo2] = useState<number>(450);
  const [temperature, setTemperature] = useState<number>(25);

  // Biological model calculation
  // 1. Wavelength absorption efficiency of chlorophyll
  const absorptionFactors = {
    red: 0.95,
    blue: 0.90,
    green: 0.05, // Green is reflected!
    white: 0.80,
  };
  const wavelengthFactor = absorptionFactors[wavelength];

  // 2. Light factor (intensity * absorption)
  const effectiveLight = (lightIntensity / 100) * wavelengthFactor;

  // 3. CO2 factor (Michaelis-Menten saturation)
  const co2Factor = co2 / (co2 + 250);

  // 4. Temperature enzyme kinetics (bell curve peaking at 25-30°C, crashing above 38°C due to denaturation)
  let tempFactor = 1.0;
  if (temperature < 15) {
    tempFactor = 0.2 + (temperature / 15) * 0.4;
  } else if (temperature <= 32) {
    tempFactor = 0.6 + ((temperature - 15) / 17) * 0.4;
  } else if (temperature <= 40) {
    tempFactor = 1.0 - ((temperature - 32) / 8) * 0.7;
  } else {
    // Thermal denaturation of Rubisco enzyme
    tempFactor = 0.05;
  }

  // Rate governed by Liebig's Law of the Minimum
  const baseRate = Math.min(effectiveLight * 1.2, co2Factor * 1.1, tempFactor) * 100;
  const bubbleRate = Math.round(Math.max(0, baseRate * 0.8));
  const glucoseRate = Math.round(Math.max(0, baseRate * 1.4));

  // Determine active limiting factor
  let limitingFactor = 'Balanced Optimal Conditions';
  let limitingExplanation = 'All environmental variables are in favorable kinetic equilibrium.';

  if (wavelength === 'green') {
    limitingFactor = 'Pigment Reflection (Spectral Mismatch)';
    limitingExplanation = 'Chlorophyll a and b reflect green light (~530nm) rather than absorbing it. Photosystem excitation drops to near-zero.';
  } else if (temperature > 38) {
    limitingFactor = 'Enzyme Thermal Denaturation';
    limitingExplanation = 'Excess heat disrupts the tertiary hydrogen bonds of Rubisco and ATP synthase, permanently destroying catalytic activity.';
  } else if (temperature < 14) {
    limitingFactor = 'Low Kinetic Thermal Energy';
    limitingExplanation = 'Cold water slows molecular diffusion. Substrates collide with enzyme active sites too infrequently.';
  } else if (effectiveLight < co2Factor * 0.8) {
    limitingFactor = 'Light Intensity & Photons';
    limitingExplanation = 'Not enough photons are reaching Photosystem II to excite electrons and split water molecules.';
  } else if (co2 < 250) {
    limitingFactor = 'Carbon Dioxide Availability';
    limitingExplanation = 'Light-dependent reactions have produced excess ATP/NADPH, but the Calvin Cycle lacks inorganic carbon to fix into sugar.';
  }

  const handleReset = () => {
    setLightIntensity(75);
    setWavelength('white');
    setCo2(450);
    setTemperature(25);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Interactive Lab
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Photosynthetic Chamber Simulation
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Gas Exchange & Limiting Factors Workbench
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 self-start sm:self-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset standard baseline</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: The Experimental Chamber Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-6 text-white relative shadow-inner overflow-hidden min-h-[360px]">
          
          {/* Chamber Glassware */}
          <div className="relative w-48 h-64 border-4 border-slate-600 border-t-0 rounded-b-3xl bg-blue-950/40 p-4 flex flex-col items-center justify-end overflow-hidden">
            
            {/* Water Fill */}
            <div className="absolute inset-x-0 bottom-0 h-[85%] bg-gradient-to-t from-emerald-950/60 to-cyan-900/40 border-t border-cyan-400/30" />

            {/* Light beam illumination overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                wavelength === 'red' ? 'bg-red-500/20' :
                wavelength === 'blue' ? 'bg-blue-500/20' :
                wavelength === 'green' ? 'bg-green-500/25' :
                'bg-amber-100/15'
              }`}
              style={{ opacity: lightIntensity / 100 }}
            />

            {/* Rising Oxygen Bubbles (simulated count based on bubbleRate) */}
            {bubbleRate > 0 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(Math.min(12, Math.max(3, Math.round(bubbleRate / 6))))].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/70 border border-cyan-200 animate-pulse"
                    style={{
                      left: `${30 + (i * 14) % 45}%`,
                      bottom: `${20 + (i * 22) % 70}%`,
                      animationDuration: `${1.5 + (i % 3) * 0.4}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Submerged Elodea Plant Sprig */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-1.5 h-28 bg-emerald-600 rounded-full relative">
                {/* Leaf pairs */}
                <div className="absolute top-2 -left-3 w-4 h-2 bg-emerald-500 rounded-full rotate-[-30deg]" />
                <div className="absolute top-2 -right-3 w-4 h-2 bg-emerald-500 rounded-full rotate-[30deg]" />
                <div className="absolute top-8 -left-4 w-5 h-2.5 bg-emerald-500 rounded-full rotate-[-25deg]" />
                <div className="absolute top-8 -right-4 w-5 h-2.5 bg-emerald-500 rounded-full rotate-[25deg]" />
                <div className="absolute top-16 -left-4 w-5 h-2.5 bg-emerald-500 rounded-full rotate-[-20deg]" />
                <div className="absolute top-16 -right-4 w-5 h-2.5 bg-emerald-500 rounded-full rotate-[20deg]" />
              </div>
              <div className="w-10 h-3 bg-amber-900 rounded-full -mt-1" />
            </div>

            {/* Dissolved Sensor Probe */}
            <div className="absolute top-6 right-2 w-2 h-24 bg-slate-400 rounded-b-md border border-slate-300">
              <div className="w-3 h-3 rounded-full bg-cyan-400 -top-1 -left-0.5 absolute animate-ping opacity-75" />
            </div>
          </div>

          {/* Real-time output meters */}
          <div className="grid grid-cols-2 gap-3 w-full mt-5">
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Oxygen Release Rate
              </span>
              <span className="text-xl font-mono font-extrabold text-cyan-300">
                {bubbleRate} <span className="text-xs font-sans text-slate-400 font-normal">bubbles/min</span>
              </span>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Glucose Output
              </span>
              <span className="text-xl font-mono font-extrabold text-emerald-400">
                {glucoseRate} <span className="text-xs font-sans text-slate-400 font-normal">μg / hr</span>
              </span>
            </div>
          </div>

        </div>

        {/* Right: Controls & Liebig's Law of the Minimum */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Active Limiting Factor Callout */}
          <div className={`p-4 rounded-xl border space-y-1.5 ${
            bubbleRate < 10
              ? 'bg-rose-50 border-rose-200 text-rose-950'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              {bubbleRate < 10 ? (
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              <span>Active Limiting Factor: {limitingFactor}</span>
            </div>
            <p className="text-xs leading-relaxed">
              {limitingExplanation}
            </p>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-4 pt-1">
            
            {/* Wavelength Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Light Wavelength (Nanometers):</span>
                <span className="font-mono text-slate-500 uppercase text-[11px] font-semibold">{wavelength} spectrum</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['red', 'blue', 'green', 'white'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWavelength(w)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      wavelength === w
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {w === 'red' ? '🔴 680nm' :
                     w === 'blue' ? '🔵 450nm' :
                     w === 'green' ? '🟢 530nm' : '⚪ White'}
                  </button>
                ))}
              </div>
            </div>

            {/* Light Intensity */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Light Intensity:</span>
                </span>
                <span className="font-mono font-bold text-slate-800">{lightIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lightIntensity}
                onChange={(e) => setLightIntensity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* CO2 Concentration */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-600" />
                  <span>CO₂ Concentration:</span>
                </span>
                <span className="font-mono font-bold text-slate-800">{co2} ppm</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={co2}
                onChange={(e) => setCo2(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                  <span>Chamber Temperature:</span>
                </span>
                <span className="font-mono font-bold text-slate-800">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="5"
                max="45"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Quick Guided Hypothesis */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Experiment to Try:</span>
            </div>
            <p>
              Switch the wavelength to <strong>Green (530nm)</strong> while keeping light intensity at 100%. Notice why oxygen bubbling drops to 0: chlorophyll cannot absorb the wavelength it reflects!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
