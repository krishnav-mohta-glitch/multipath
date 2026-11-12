import React, { useState } from 'react';
import { Sliders, RotateCcw, CheckCircle2, Sparkles, Info } from 'lucide-react';

export const LinearEquationsExperiment: React.FC = () => {
  const [slope, setSlope] = useState<number>(2);
  const [intercept, setIntercept] = useState<number>(1);
  const [testX, setTestX] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'cartesian' | 'balance'>('cartesian');

  // SVG grid settings
  const width = 360;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = 20; // 20 pixels per grid unit (-8 to +8)

  // Compute endpoints for line within view: x = -8 to +8
  const x1 = -8;
  const y1 = slope * x1 + intercept;
  const x2 = 8;
  const y2 = slope * x2 + intercept;

  const svgX1 = centerX + x1 * scale;
  const svgY1 = centerY - y1 * scale;
  const svgX2 = centerX + x2 * scale;
  const svgY2 = centerY - y2 * scale;

  // Calculated point at testX
  const computedY = slope * testX + intercept;
  const pointSvgX = centerX + testX * scale;
  const pointSvgY = centerY - computedY * scale;

  // Challenge check: e.g. slope=2, intercept=1 passes through (2, 5)
  const isChallengeSolved = slope === 3 && intercept === -2;

  const handleReset = () => {
    setSlope(1);
    setIntercept(0);
    setTestX(2);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Interactive Lab
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-blue-100 text-blue-800 font-semibold">
              Cartesian & Balance Dynamics
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Slope-Intercept & Pan Balance Simulator
          </h3>
        </div>

        {/* Tab switcher: Graph vs Balance */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('cartesian')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cartesian' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Coordinate Graph
          </button>
          <button
            onClick={() => setActiveTab('balance')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'balance' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pan Balance Beam
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Visual Screen (Graph or Balance) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900 rounded-2xl p-4 text-white relative shadow-inner overflow-hidden min-h-[340px]">
          
          {/* Active Formula Floating Badge */}
          <div className="absolute top-3 left-4 z-10 bg-slate-800/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-mono">
            <span className="text-slate-400">Equation: </span>
            <strong className="text-amber-400">
              y = {slope !== 0 ? `${slope === 1 ? '' : slope === -1 ? '-' : slope}x` : ''}
              {intercept > 0 ? (slope !== 0 ? ` + ${intercept}` : `${intercept}`) : intercept < 0 ? ` - ${Math.abs(intercept)}` : (slope === 0 ? '0' : '')}
            </strong>
          </div>

          <div className="absolute top-3 right-4 z-10 bg-slate-800/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-emerald-400">
            x = {testX} → y = {computedY}
          </div>

          {activeTab === 'cartesian' ? (
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[360px] h-[280px] overflow-visible"
            >
              <defs>
                <pattern id="grid" width={scale} height={scale} patternUnits="userSpaceOnUse">
                  <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke="#334155" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Grid Background */}
              <rect width={width} height={height} fill="url(#grid)" />

              {/* Axes */}
              <line x1={0} y1={centerY} x2={width} y2={centerY} stroke="#94a3b8" strokeWidth="1.5" />
              <line x1={centerX} y1={0} x2={centerX} y2={height} stroke="#94a3b8" strokeWidth="1.5" />

              {/* Axis labels */}
              <text x={width - 15} y={centerY - 6} fill="#94a3b8" fontSize="10" fontFamily="sans-serif">X</text>
              <text x={centerX + 6} y={15} fill="#94a3b8" fontSize="10" fontFamily="sans-serif">Y</text>

              {/* The Line y = mx + b */}
              <line
                x1={svgX1}
                y1={svgY1}
                x2={svgX2}
                y2={svgY2}
                stroke="#38bdf8"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Y-intercept anchor point (0, b) */}
              <circle
                cx={centerX}
                cy={centerY - intercept * scale}
                r="5"
                fill="#f59e0b"
                stroke="#ffffff"
                strokeWidth="1.5"
              />

              {/* Active Tested Point (testX, computedY) */}
              {pointSvgX >= 0 && pointSvgX <= width && pointSvgY >= 0 && pointSvgY <= height && (
                <g>
                  <circle
                    cx={pointSvgX}
                    cy={pointSvgY}
                    r="6"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <line
                    x1={pointSvgX}
                    y1={centerY}
                    x2={pointSvgX}
                    y2={pointSvgY}
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1={centerX}
                    y1={pointSvgY}
                    x2={pointSvgX}
                    y2={pointSvgY}
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              )}
            </svg>
          ) : (
            /* Balance Beam Visualizer */
            <div className="w-full flex flex-col items-center justify-center py-6 space-y-6">
              <div className="text-xs text-slate-400">
                Left Pan: <strong className="text-amber-400">{slope}x + ({intercept})</strong> = <strong className="text-amber-400">{computedY}</strong> | Right Pan: <strong className="text-emerald-400">y</strong> = <strong className="text-emerald-400">{computedY}</strong>
              </div>

              {/* Balance scale illustration */}
              <div className="relative w-64 h-32 flex flex-col items-center justify-end">
                {/* Horizontal Beam */}
                <div className="w-56 h-3 bg-amber-400 rounded-full shadow-md relative transition-transform duration-300">
                  {/* Left Pan */}
                  <div className="absolute -left-2 top-3 w-16 h-12 border-b-2 border-l-2 border-r-2 border-amber-300 rounded-b-xl flex flex-col items-center justify-center bg-amber-950/40 text-[10px]">
                    <span className="text-amber-300 font-bold">{computedY} kg</span>
                    <span className="text-[9px] text-slate-400">{slope}x+{intercept}</span>
                  </div>

                  {/* Right Pan */}
                  <div className="absolute -right-2 top-3 w-16 h-12 border-b-2 border-l-2 border-r-2 border-emerald-300 rounded-b-xl flex flex-col items-center justify-center bg-emerald-950/40 text-[10px]">
                    <span className="text-emerald-300 font-bold">{computedY} kg</span>
                    <span className="text-[9px] text-slate-400">Target y</span>
                  </div>
                </div>

                {/* Fulcrum Triangle */}
                <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-slate-400 mt-0" />
                <div className="w-24 h-2 bg-slate-600 rounded-full mt-1" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-medium border border-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pan Equilibrium Maintained (Equality Conserved)</span>
              </div>
            </div>
          )}

          {/* Sub-label */}
          <div className="text-[11px] text-slate-400 mt-2">
            Yellow dot = Y-Intercept <code className="text-amber-400 font-mono">(0, {intercept})</code> • Green dot = Tested point <code className="text-emerald-400 font-mono">({testX}, {computedY})</code>
          </div>
        </div>

        {/* Right Side: Interactive Controls & Observation Feedback */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Controls */}
          <div className="space-y-4">
            
            {/* Slope slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-brand-600" />
                  <span>Slope (m = Δy / Δx):</span>
                </label>
                <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  {slope}
                </span>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={slope}
                onChange={(e) => setSlope(parseInt(e.target.value, 10))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>-5 (Steep Down)</span>
                <span>0 (Flat Horizontal)</span>
                <span>+5 (Steep Up)</span>
              </div>
            </div>

            {/* Y-Intercept slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>Y-Intercept (b, where x=0):</span>
                </label>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {intercept}
                </span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={intercept}
                onChange={(e) => setIntercept(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-600 font-mono">
                <span>-6 (Below Origin)</span>
                <span>0 (At Origin)</span>
                <span>+6 (Above Origin)</span>
              </div>
            </div>

            {/* Test Input X */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Test Input X Coordinate:</span>
                </label>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  x = {testX}
                </span>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={testX}
                onChange={(e) => setTestX(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Reset button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset parameters</span>
            </button>
          </div>

          {/* Discovery Challenge Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Discovery Challenge</span>
              </span>
              {isChallengeSolved ? (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Solved!
                </span>
              ) : (
                <span className="text-[11px] text-slate-600">Pending</span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Find the line that passes through <strong>(0, -2)</strong> and rises at a rate of <strong>3 units per step</strong> (slope = 3, intercept = -2).
            </p>

            {isChallengeSolved && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium animate-in fade-in">
                Outstanding! You configured <strong>y = 3x - 2</strong>. Notice how the y-intercept directly sets the height at x=0, while slope governs the pitch!
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
