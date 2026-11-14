import React, { useState } from 'react';
import {
  Sliders,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  calculateLinearEquations,
  LINEAR_EQUATIONS_MODEL,
} from '../../../utils/scientificEngines';
import type { LinearEquationsState } from '../../../types/scientificModel';

export const LinearEquationsExperiment: React.FC = () => {
  const [modelState, setModelState] = useState<LinearEquationsState>(
    LINEAR_EQUATIONS_MODEL.initialState
  );
  const [activeTab, setActiveTab] = useState<'cartesian' | 'balance'>('cartesian');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activePresetId, setActivePresetId] = useState<string>('equilibrium_standard');

  const { slope, intercept, xVal, targetY } = modelState;

  // Calculate deterministic scientific outputs
  const outputs = calculateLinearEquations(modelState);
  const telemetry = LINEAR_EQUATIONS_MODEL.getTelemetry(modelState, outputs);
  const explanation = LINEAR_EQUATIONS_MODEL.getExplanation(
    modelState,
    outputs,
    selectedComponentId
  );

  // SVG grid settings
  const width = 380;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 20; // 20 pixels per grid unit (-9 to +9)

  // Endpoints for line
  const x1 = -9;
  const y1 = slope * x1 + intercept;
  const x2 = 9;
  const y2 = slope * x2 + intercept;

  const svgX1 = centerX + x1 * scale;
  const svgY1 = centerY - y1 * scale;
  const svgX2 = centerX + x2 * scale;
  const svgY2 = centerY - y2 * scale;

  // Point at xVal
  const pointSvgX = centerX + xVal * scale;
  const pointSvgY = centerY - outputs.leftLoad * scale;

  // Challenge solved check: slope=3, intercept=-2, targetY=10 at x=4
  const isChallengeSolved = slope === 3 && intercept === -2 && xVal === 4 && outputs.isBalanced;

  const handleUpdate = (field: keyof LinearEquationsState, value: number) => {
    setModelState((prev) => {
      const updated = { ...prev, [field]: value };
      setActivePresetId('');
      return updated;
    });
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = LINEAR_EQUATIONS_MODEL.presets.find((p) => p.id === presetId);
    if (preset) {
      setModelState(preset.state);
      setActivePresetId(preset.id);
    }
  };

  const handleReset = () => {
    setModelState(LINEAR_EQUATIONS_MODEL.initialState);
    setActivePresetId('equilibrium_standard');
    setSelectedComponentId(null);
  };

  return (
    <div className="bg-[#080A0E] text-[#F3F4EC] rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative corner-reticle">
      {/* Top Telemetry Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 bg-[#0D1117] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30">
              PHYSICAL CONSERVATION LAB
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] uppercase">
              MODEL: {LINEAR_EQUATIONS_MODEL.name.toUpperCase()}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
            Conservation of Equality &amp; Dynamic Torque Balance
          </h3>
          <p className="text-xs text-[#8DA391] mt-0.5 max-w-2xl">
            {LINEAR_EQUATIONS_MODEL.overview}
          </p>
        </div>

        {/* View Switcher & Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('cartesian')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'cartesian'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              Cartesian Plane
            </button>
            <button
              onClick={() => setActiveTab('balance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'balance'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              Pan Balance Beam
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors"
            title="Reset to default initial parameters"
            aria-label="Reset parameters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Scenario Selector Pill Bar */}
      <div className="px-5 py-3 bg-[#0A0D12] border-b border-white/5 flex flex-wrap sm:flex-nowrap items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-[#8DA391] uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
          <Target className="w-3 h-3 text-[#B8FF00]" />
          PRESETS:
        </span>
        {LINEAR_EQUATIONS_MODEL.presets.map((p) => (
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
        
        {/* Left Side: Visual Screen & Component Inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#05070A] rounded-2xl p-5 border border-white/10 relative shadow-inner overflow-hidden min-h-[360px] flex flex-col items-center justify-center">
            
            {/* Background Reticle Grid */}
            <div
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Active Formula Floating Telemetry Badge */}
            <div className="absolute top-3 left-4 z-10 bg-[#0D1117]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 text-xs font-mono flex items-center gap-2">
              <span className="text-[#8DA391]">Equation:</span>
              <strong className="text-[#B8FF00]">
                y = {slope !== 0 ? `${slope === 1 ? '' : slope === -1 ? '-' : slope}x` : ''}
                {intercept > 0
                  ? slope !== 0
                    ? ` + ${intercept}`
                    : `${intercept}`
                  : intercept < 0
                  ? ` - ${Math.abs(intercept)}`
                  : slope === 0
                  ? '0'
                  : ''}
              </strong>
            </div>

            {/* Equilibrium Status Indicator */}
            <div
              className={`absolute top-3 right-4 z-10 px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border backdrop-blur-md ${
                outputs.isBalanced
                  ? 'bg-[#B8FF00]/10 border-[#B8FF00]/30 text-[#B8FF00]'
                  : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]'
              }`}
            >
              {outputs.isBalanced ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>BALANCED (Δ = 0)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>IMBALANCE ({outputs.imbalance > 0 ? `+${outputs.imbalance}` : outputs.imbalance} kg)</span>
                </>
              )}
            </div>

            {/* Canvas View: Cartesian or Balance */}
            {activeTab === 'cartesian' ? (
              <div className="w-full flex flex-col items-center justify-center pt-8">
                <svg
                  viewBox={`0 0 ${width} ${height}`}
                  className="w-full max-w-[380px] h-[280px] overflow-visible"
                >
                  <defs>
                    <pattern id="cartesian-grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
                      <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Grid Background */}
                  <rect width={width} height={height} fill="url(#cartesian-grid)" />

                  {/* Axes */}
                  <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                  <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

                  {/* Axis labels */}
                  <text x={width - 15} y={centerY - 6} fill="#8DA391" fontSize="10" fontFamily="monospace">X</text>
                  <text x={centerX + 6} y={15} fill="#8DA391" fontSize="10" fontFamily="monospace">Y</text>

                  {/* Target Y Reference Line */}
                  <line
                    x1={0}
                    y1={centerY - targetY * scale}
                    x2={width}
                    y2={centerY - targetY * scale}
                    stroke="rgba(56, 189, 248, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={10}
                    y={centerY - targetY * scale - 4}
                    fill="#38BDF8"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    Target y = {targetY}
                  </text>

                  {/* The Line y = mx + c */}
                  <line
                    x1={svgX1}
                    y1={svgY1}
                    x2={svgX2}
                    y2={svgY2}
                    stroke="#B8FF00"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Y-intercept anchor point (0, c) */}
                  <circle
                    cx={centerX}
                    cy={centerY - intercept * scale}
                    r="5"
                    fill="#F59E0B"
                    stroke="#080A0E"
                    strokeWidth="1.5"
                    className="cursor-pointer hover:scale-125 transition-transform"
                    onClick={() => setSelectedComponentId('left_pan')}
                  />

                  {/* Active Tested Point (xVal, leftLoad) */}
                  {pointSvgX >= 0 && pointSvgX <= width && pointSvgY >= 0 && pointSvgY <= height && (
                    <g>
                      <circle
                        cx={pointSvgX}
                        cy={pointSvgY}
                        r="6"
                        fill={outputs.isBalanced ? '#B8FF00' : '#EF4444'}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <line
                        x1={pointSvgX}
                        y1={centerY}
                        x2={pointSvgX}
                        y2={pointSvgY}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                      <line
                        x1={centerX}
                        y1={pointSvgY}
                        x2={pointSvgX}
                        y2={pointSvgY}
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    </g>
                  )}
                </svg>

                <div className="font-mono text-[11px] text-[#8DA391] mt-3 flex items-center gap-4 flex-wrap justify-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span>Y-Intercept (0, {intercept})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF00]" />
                    <span>Tested Point ({xVal}, {outputs.leftLoad})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#38BDF8]" />
                    <span>Target Balance Line</span>
                  </span>
                </div>
              </div>
            ) : (
              /* Physical Pan Balance Beam Visualizer */
              <div className="w-full flex flex-col items-center justify-center py-8 space-y-6">
                <div className="text-xs font-mono text-[#8DA391] text-center">
                  Left Pan Moment: <strong className="text-[#B8FF00]">{outputs.leftLoad} kg</strong> &bull; Right Pan Counterweight: <strong className="text-[#38BDF8]">{outputs.rightLoad} kg</strong>
                </div>

                {/* Balance Scale Rig */}
                <div className="relative w-72 h-44 flex flex-col items-center justify-end">
                  
                  {/* Pivoting Crossbeam */}
                  <div
                    className="w-64 h-3.5 bg-gradient-to-r from-[#B8FF00] via-white to-[#38BDF8] rounded-full shadow-lg relative transition-transform duration-300 origin-center cursor-pointer"
                    style={{
                      transform: `rotate(${-(outputs.tiltAngleRad * (180 / Math.PI))}deg)`,
                    }}
                    onClick={() => setSelectedComponentId('crossbeam')}
                  >
                    {/* Left Pan Carrier */}
                    <div
                      className="absolute -left-2 top-3 w-20 h-16 border-b-2 border-l-2 border-r-2 border-[#B8FF00] rounded-b-2xl flex flex-col items-center justify-center bg-[#080A0E]/90 text-[10px] font-mono cursor-pointer hover:border-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponentId('left_pan');
                      }}
                    >
                      <span className="text-[#B8FF00] font-bold">{outputs.leftLoad} kg</span>
                      <span className="text-[9px] text-[#8DA391]">{slope}x + ({intercept})</span>
                    </div>

                    {/* Right Pan Carrier */}
                    <div
                      className="absolute -right-2 top-3 w-20 h-16 border-b-2 border-l-2 border-r-2 border-[#38BDF8] rounded-b-2xl flex flex-col items-center justify-center bg-[#080A0E]/90 text-[10px] font-mono cursor-pointer hover:border-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedComponentId('right_pan');
                      }}
                    >
                      <span className="text-[#38BDF8] font-bold">{outputs.rightLoad} kg</span>
                      <span className="text-[9px] text-[#8DA391]">Target y</span>
                    </div>
                  </div>

                  {/* Central Fulcrum */}
                  <div
                    className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[32px] border-b-[#8DA391] cursor-pointer hover:border-b-[#B8FF00] transition-colors"
                    onClick={() => setSelectedComponentId('fulcrum')}
                  />
                  <div className="w-28 h-2.5 bg-[#1F2937] rounded-full mt-1 border border-white/10" />
                </div>

                <div className="text-[11px] font-mono text-[#8DA391] text-center">
                  Tip: Click on the <button onClick={() => setSelectedComponentId('fulcrum')} className="text-[#B8FF00] underline">Fulcrum</button>, <button onClick={() => setSelectedComponentId('crossbeam')} className="text-[#B8FF00] underline">Crossbeam</button>, or <button onClick={() => setSelectedComponentId('left_pan')} className="text-[#B8FF00] underline">Pans</button> to inspect their physical role.
                </div>
              </div>
            )}
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

        {/* Right Side: Parametric Variable Control Deck */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#B8FF00]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  VARIABLE PARAMETER DECK
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8DA391]">
                4 INDEPENDENT VARIABLES
              </span>
            </div>

            {/* Variable 1: Slope (m) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <span>Slope / Rate (m):</span>
                  <span className="text-[10px] text-[#8DA391]">kg/unit</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={slope}
                    onChange={(e) => handleUpdate('slope', parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-[#B8FF00] font-bold focus:border-[#B8FF00] focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.5"
                value={slope}
                onChange={(e) => handleUpdate('slope', parseFloat(e.target.value))}
                className="w-full accent-[#B8FF00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>-5 (Negative gradient)</span>
                <span>0 (Zero pitch)</span>
                <span>+5 (Steep pitch)</span>
              </div>
            </div>

            {/* Variable 2: Intercept (c) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <span>Y-Intercept / Tare (c):</span>
                  <span className="text-[10px] text-[#8DA391]">kg</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="-8"
                    max="8"
                    step="1"
                    value={intercept}
                    onChange={(e) => handleUpdate('intercept', parseInt(e.target.value, 10) || 0)}
                    className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-[#F59E0B] font-bold focus:border-[#F59E0B] focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="-8"
                max="8"
                step="1"
                value={intercept}
                onChange={(e) => handleUpdate('intercept', parseInt(e.target.value, 10))}
                className="w-full accent-[#F59E0B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>-8 (Under-tare)</span>
                <span>0 (At origin)</span>
                <span>+8 (Heavy tare)</span>
              </div>
            </div>

            {/* Variable 3: Input Quantity (x) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <span>Input Load (x):</span>
                  <span className="text-[10px] text-[#8DA391]">units</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="-5"
                    max="8"
                    step="1"
                    value={xVal}
                    onChange={(e) => handleUpdate('xVal', parseInt(e.target.value, 10) || 0)}
                    className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-white font-bold focus:border-white focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="-5"
                max="8"
                step="1"
                value={xVal}
                onChange={(e) => handleUpdate('xVal', parseInt(e.target.value, 10))}
                className="w-full accent-white cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>-5 units</span>
                <span>x = {xVal}</span>
                <span>+8 units</span>
              </div>
            </div>

            {/* Variable 4: Target Counterweight (y) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-white font-bold flex items-center gap-1.5">
                  <span>Target Counterweight (y):</span>
                  <span className="text-[10px] text-[#8DA391]">kg</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="-10"
                    max="20"
                    step="1"
                    value={targetY}
                    onChange={(e) => handleUpdate('targetY', parseInt(e.target.value, 10) || 0)}
                    className="w-16 px-2 py-0.5 rounded bg-black/60 border border-white/15 text-right font-mono text-xs text-[#38BDF8] font-bold focus:border-[#38BDF8] focus:outline-none"
                  />
                </div>
              </div>
              <input
                type="range"
                min="-10"
                max="20"
                step="1"
                value={targetY}
                onChange={(e) => handleUpdate('targetY', parseInt(e.target.value, 10))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391] font-mono">
                <span>-10 kg</span>
                <span>y = {targetY} kg</span>
                <span>+20 kg</span>
              </div>
            </div>

          </div>

          {/* Interactive Scientific Challenge Card */}
          <div className="p-5 rounded-2xl bg-[#0D1117] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>EQUILIBRIUM CHALLENGE</span>
              </span>
              {isChallengeSolved ? (
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B8FF00]/15 text-[#B8FF00] border border-[#B8FF00]/30">
                  SOLVED!
                </span>
              ) : (
                <span className="font-mono text-[10px] text-[#8DA391]">IN PROGRESS</span>
              )}
            </div>

            <p className="text-xs text-[#8DA391] leading-relaxed">
              Find the line with a rate of <strong>3 kg/unit</strong> and tare of <strong>-2 kg</strong> that perfectly balances a target of <strong>10 kg</strong>. (Target equation: 3x - 2 = 10).
            </p>

            {isChallengeSolved && (
              <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/30 text-xs text-[#B8FF00] font-mono">
                ✓ Perfect! With m = 3, c = -2, and x = 4: 3(4) - 2 = 10 kg. Net torque is zero!
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
