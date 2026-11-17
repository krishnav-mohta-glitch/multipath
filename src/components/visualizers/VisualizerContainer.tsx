import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Info,
  Sliders,
  Activity,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { ModelTelemetryItem, ContextualExplanation, ModelPreset } from '../../types/scientificModel';

interface VisualizerContainerProps<TState> {
  title: string;
  discipline: string;
  curriculumTopicId: string;
  mode: '3d' | '2d';
  onToggleMode: (mode: '3d' | '2d') => void;
  onReset: () => void;
  stageContent: React.ReactNode;
  controlsContent: React.ReactNode;
  telemetry: ModelTelemetryItem[];
  explanation: ContextualExplanation;
  presets?: ModelPreset<TState>[];
  onSelectPreset?: (preset: ModelPreset<TState>) => void;
  formulaDisplay?: {
    latex: string;
    description: string;
  };
}

export function VisualizerContainer<TState>({
  title,
  discipline,
  curriculumTopicId,
  mode,
  onToggleMode,
  onReset,
  stageContent,
  controlsContent,
  telemetry,
  explanation,
  presets,
  onSelectPreset,
  formulaDisplay,
}: VisualizerContainerProps<TState>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'presets' | 'explanation'>('controls');

  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#080A0E] text-[#F3F4EC] shadow-2xl transition-all duration-200 overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50 overflow-y-auto bg-[#080A0E]/98 p-6 ring-2 ring-[#B8FF00]' : 'p-4 sm:p-6 lg:p-7 space-y-6'
      }`}
    >
      {/* Visualizer Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
              {discipline}
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {curriculumTopicId}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight break-words">
            {title}
          </h3>
        </div>

        {/* Global Experiment Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* 3D / 2D View Switcher */}
          <div className="flex items-center bg-[#141A22] p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => onToggleMode('3d')}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === '3d'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Simulation</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleMode('2d')}
              className={`px-3 py-1 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                mode === '2d'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              <span>2D Schematic</span>
            </button>
          </div>

          {/* Reset Experiment */}
          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors cursor-pointer"
            title="Reset Experiment Parameters to Defaults"
            aria-label="Reset Experiment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors cursor-pointer hidden md:flex"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Simulation Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Governing Formula Banner (if present) */}
      {formulaDisplay && (
        <div className="px-4 py-2.5 rounded-2xl bg-[#0D121B] border border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span className="text-[#8DA391]">{formulaDisplay.description}:</span>
          </div>
          <code className="text-[#B8FF00] bg-black/40 px-3 py-1 rounded-lg border border-white/10 font-bold tracking-wider">
            {formulaDisplay.latex}
          </code>
        </div>
      )}

      {/* Main Simulation Stage & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Top: Interactive Simulation Stage (col-span-7 or 8) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#040608] shadow-inner min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center justify-center">
            {stageContent}
          </div>

          {/* Live Telemetry HUD Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5">
            {telemetry.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#0E131A] border border-white/08 flex flex-col justify-between gap-1 shadow-xs"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono text-[10px] text-[#8DA391] uppercase truncate">
                    {item.label}
                  </span>
                  {item.symbol && (
                    <span className="font-mono text-[9px] text-[#B8FF00] font-bold">
                      {item.symbol}
                    </span>
                  )}
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-white tracking-tight truncate">
                  {item.value}
                </div>
                {item.description && (
                  <span className="text-[9px] text-[#8DA391]/70 truncate">
                    {item.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right / Bottom: Controls, Presets & Explanation Workbench (col-span-5 or 4) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          
          {/* Navigation Tabs for Right Panel */}
          <div className="flex items-center bg-[#141A22] p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('controls')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'controls'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Controls</span>
            </button>
            {presets && presets.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                    : 'text-[#8DA391] hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveTab('explanation')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'explanation'
                  ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm'
                  : 'text-[#8DA391] hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Principle</span>
            </button>
          </div>

          {/* Tab 1: Experiment Variables & Controls */}
          {activeTab === 'controls' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-white/08">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Variable Parameters
                </span>
                <span className="font-mono text-[10px] text-[#8DA391]">
                  Real-time recalculation
                </span>
              </div>
              <div className="space-y-4">
                {controlsContent}
              </div>
            </div>
          )}

          {/* Tab 2: Curated Presets Scenarios */}
          {activeTab === 'presets' && presets && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-3 animate-in fade-in duration-150">
              <div className="pb-2 border-b border-white/08">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Curated Laboratory Scenarios
                </span>
                <p className="text-[11px] text-[#8DA391]">
                  Click to configure state and observe known scientific edge cases.
                </p>
              </div>
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSelectPreset && onSelectPreset(preset)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B8FF00]/40 transition-all cursor-pointer group space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs font-bold text-white group-hover:text-[#B8FF00] transition-colors">
                        {preset.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#B8FF00]">Apply →</span>
                    </div>
                    <p className="text-[11px] text-[#8DA391] line-clamp-2">
                      {preset.description}
                    </p>
                    <div className="text-[10px] font-mono text-amber-300/80 pt-1 border-t border-white/05">
                      Target: {preset.expectedOutcome}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Contextual Scientific Explanation */}
          {activeTab === 'explanation' && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-4 animate-in fade-in duration-150">
              <div className="pb-2 border-b border-white/08">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Why This Happens (Scientific Principle)
                </span>
                <span className="block text-[10px] font-mono text-[#B8FF00]">
                  {explanation.educationalLevel}
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-white/5 border border-white/08 space-y-1">
                  <span className="font-mono text-[10px] uppercase text-[#8DA391] block">
                    Current Observation:
                  </span>
                  <p className="text-[#F3F4EC] font-medium">
                    {explanation.observation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#B8FF00]/10 border border-[#B8FF00]/25 space-y-1 text-[#E0FF88]">
                  <span className="font-mono text-[10px] uppercase text-[#B8FF00] font-bold block">
                    Governing Law:
                  </span>
                  <p className="font-semibold">
                    {explanation.governingPrinciple}
                  </p>
                </div>

                <div className="space-y-1 pt-1 text-[#C8D6C9]">
                  <span className="font-mono text-[10px] uppercase text-[#8DA391] block">
                    Key Educational Takeaway:
                  </span>
                  <p>{explanation.keyTakeaway}</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
