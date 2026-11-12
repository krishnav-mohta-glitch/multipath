import React, { useState } from 'react';
import { Layers, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

interface MappingDefinition {
  target: string;
  source: string;
  ground: string[];
  suppressed: string[];
  sampleExpressions: string[];
  cognitiveImplication: string;
}

export const MetaphorWorkbenchExperiment: React.FC = () => {
  const [selectedTarget, setSelectedTarget] = useState<'Time' | 'Argument' | 'Mind' | 'Love'>('Time');
  const [selectedSource, setSelectedSource] = useState<'Money' | 'War' | 'Building' | 'Journey' | 'Ocean'>('Money');
  const [mixedSource, setMixedSource] = useState<'None' | 'War' | 'Building' | 'Ocean'>('None');

  const mappings: Record<string, MappingDefinition> = {
    'Time-Money': {
      target: 'Time',
      source: 'Money / Limited Commodity',
      ground: [
        'Finite and quantifiable resource',
        'Can be spent, budgeted, wasted, or invested',
        'Has opportunity cost: spending on A means losing B',
      ],
      suppressed: [
        'Physical paper bills and coins',
        'Inflation printing and interest rates',
        'Bank vault robberies',
      ],
      sampleExpressions: [
        '“You are wasting my time.”',
        '“I have invested months in this project.”',
        '“How do you spend your weekends?”',
        '“I am running out of time.”',
      ],
      cognitiveImplication: 'Frames hours as scarce capital. In industrial societies, time is commodified; people feel guilt when "wasting" hours.',
    },
    'Time-Ocean': {
      target: 'Time',
      source: 'Ocean / Fluid Stream',
      ground: [
        'Continuous, unceasing flow in one direction',
        'Inability to hold or halt the current',
        'Things surface and sink into the past',
      ],
      suppressed: [
        'Salt salinity and marine fish',
        'Tides caused by lunar gravity',
        'Evaporation and precipitation cycles',
      ],
      sampleExpressions: [
        '“Time flows like a river.”',
        '“Lost in the mists of time.”',
        '“Caught in the tide of historical events.”',
      ],
      cognitiveImplication: 'Frames time as an uncontrollable natural force rather than a private bank account. Encourages acceptance of impermanence.',
    },
    'Argument-War': {
      target: 'Argument',
      source: 'War / Physical Combat',
      ground: [
        'Two opposing parties with conflicting territories',
        'Claims function as fortifications and attacks',
        'Defending positions and shooting down fallacies',
      ],
      suppressed: [
        'Physical bloodshed and artillery shells',
        'Geneva conventions and military uniforms',
      ],
      sampleExpressions: [
        '“Your claims are indefensible.”',
        '“He attacked every weak point in my premise.”',
        '“I demolished his argument.”',
        '“She shot down my proposal.”',
      ],
      cognitiveImplication: 'Forces debate into a win-lose zero-sum conflict. Participants treat concession as surrender rather than cooperative discovery.',
    },
    'Argument-Building': {
      target: 'Argument',
      source: 'Building / Architecture',
      ground: [
        'Requires solid bedrock foundation (premises)',
        'Built with supporting frameworks (evidence)',
        'Can collapse under flawed structural stress',
      ],
      suppressed: [
        'Bricks, mortar, drywall, and building codes',
        'Plumbing pipes and elevator shafts',
      ],
      sampleExpressions: [
        '“We need a solid foundation of data.”',
        '“His theory collapsed under scrutiny.”',
        '“Let me construct a coherent case.”',
      ],
      cognitiveImplication: 'Frames discourse as constructive engineering. Participants work together to build durable, sound structures of thought.',
    },
    'Mind-Building': {
      target: 'Mind / Memory',
      source: 'Building / Architecture',
      ground: [
        'Contains chambers, corridors, and compartmentalization',
        'Shelters stored items (memories) in archives',
        'Can have doors locked or windows opened',
      ],
      suppressed: [
        'Brick dust and fire sprinklers',
        'Property taxes and zoning permits',
      ],
      sampleExpressions: [
        '“Locked away in the back of my mind.”',
        '“He has an open mind.”',
        '“My memory palace has many rooms.”',
      ],
      cognitiveImplication: 'Enables spatial indexing of knowledge and compartmentalization of emotional trauma.',
    },
    'Love-Journey': {
      target: 'Love / Relationship',
      source: 'Journey / Travel',
      ground: [
        'Two travelers moving forward together along a path',
        'Encountering obstacles, forks in the road, crossroads',
        'Common vehicle (the relationship itself)',
      ],
      suppressed: [
        'Buying gasoline and train tickets',
        'Flat tires and highway toll booths',
      ],
      sampleExpressions: [
        '“Look how far we have come.”',
        '“We have hit a dead-end street.”',
        '“We are at a critical crossroads.”',
        '“This relationship is spinning its wheels.”',
      ],
      cognitiveImplication: 'Transforms relationship friction from individual malice into collaborative navigation of difficult terrain.',
    },
  };

  const currentKey = `${selectedTarget}-${selectedSource}`;
  const activeMapping = mappings[currentKey] || {
    target: selectedTarget,
    source: selectedSource,
    ground: [
      `Shared abstract structure between ${selectedTarget} and ${selectedSource}`,
      'Relational attributes transferred to illuminate unknown features',
    ],
    suppressed: [
      'Tangible physical substrate and biological details of the source',
    ],
    sampleExpressions: [
      `“Conceptualizing ${selectedTarget} through the lens of ${selectedSource}.”`,
      `“The ${selectedTarget.toLowerCase()} behaves according to ${selectedSource.toLowerCase()} dynamics.”`,
    ],
    cognitiveImplication: `Projecting ${selectedSource} onto ${selectedTarget} highlights dynamic motion and relational pressure while filtering out static qualities.`,
  };

  const isMixedMetaphor = mixedSource !== 'None' && mixedSource !== selectedSource;

  const handleReset = () => {
    setSelectedTarget('Time');
    setSelectedSource('Money');
    setMixedSource('None');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Interactive Lab
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
              Cognitive Linguistics Projection Lab
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Target-to-Source Mapping & Mixed Metaphor Tester
          </h3>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 self-start sm:self-auto"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset defaults</span>
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: The Conceptual Projector Display */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-900 rounded-2xl p-6 text-white relative shadow-inner overflow-hidden min-h-[380px] space-y-6">
          
          {/* Active Formula */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Active Conceptual Mapping
              </span>
              <span className="text-xs font-mono font-bold text-indigo-300">
                Target: {selectedTarget} is Source: {selectedSource}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 leading-relaxed font-serif italic">
              “{activeMapping.cognitiveImplication}”
            </div>
          </div>

          {/* Conceptual Venn / Intersection Representation */}
          <div className="flex items-center justify-center py-2 relative">
            <div className="w-28 h-28 rounded-full bg-indigo-600/40 border-2 border-indigo-400 flex flex-col items-center justify-center p-2 text-center z-10 -mr-6 shadow-lg">
              <span className="text-[10px] font-bold uppercase text-indigo-200">Target (Tenor)</span>
              <span className="text-sm font-extrabold text-white">{selectedTarget}</span>
              <span className="text-[9px] text-indigo-200">Abstract</span>
            </div>

            <div className="w-32 h-32 rounded-full bg-amber-500/30 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center p-2 text-center z-20 shadow-xl backdrop-blur-xs">
              <span className="text-[9px] font-bold uppercase text-amber-300">The Ground</span>
              <span className="text-xs font-bold text-white text-center leading-tight">
                {activeMapping.ground[0]}
              </span>
            </div>

            <div className="w-28 h-28 rounded-full bg-emerald-600/40 border-2 border-emerald-400 flex flex-col items-center justify-center p-2 text-center z-10 -ml-6 shadow-lg">
              <span className="text-[10px] font-bold uppercase text-emerald-200">Source (Vehicle)</span>
              <span className="text-sm font-extrabold text-white">{selectedSource}</span>
              <span className="text-[9px] text-emerald-200">Sensory</span>
            </div>
          </div>

          {/* Everyday Linguistic Expressions Produced */}
          <div className="space-y-1.5 border-t border-slate-800 pt-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Natural Expressions Born From This Metaphor:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeMapping.sampleExpressions.slice(0, 4).map((expr, i) => (
                <div key={i} className="p-2 rounded-lg bg-slate-800 border border-slate-700/80 text-amber-200 font-medium">
                  {expr}
                </div>
              ))}
            </div>
          </div>

          {/* Mixed Metaphor Warning if enabled */}
          {isMixedMetaphor && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-xs text-rose-200 space-y-1 animate-in fade-in">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Mixed Metaphor Alert! (Cognitive Incoherence)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Combining <strong>{selectedSource}</strong> with <strong>{mixedSource}</strong> causes contradictory physical mappings (e.g., “We must lay a solid foundation before the ship sets sail”). The mind cannot form a coherent spatial image.
              </p>
            </div>
          )}

        </div>

        {/* Right: Selectors & Ground/Suppression Analysis */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* 1. Choose Target Domain */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              1. Select Target Domain (Abstract Concept):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Time', 'Argument', 'Mind', 'Love'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTarget(t)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedTarget === t
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Choose Source Domain */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800">
              2. Select Source Domain (Concrete Experience):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['Money', 'War', 'Building', 'Journey', 'Ocean'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSource(s)}
                  className={`py-2 px-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSource === s
                      ? 'bg-brand-600 text-white border-brand-600 shadow-2xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Mixed Metaphor Stress-Tester */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>3. Optional: Inject Conflicting Second Source:</span>
              <span className="text-[10px] text-slate-500 font-normal">Tests cognitive coherence</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['None', 'War', 'Building', 'Ocean'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMixedSource(m)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                    mixedSource === m
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  {m === 'None' ? 'None (Clean)' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Breakdown: Ground vs Suppressed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Ground */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mapped Into Ground</span>
              </span>
              <ul className="space-y-1 text-xs text-emerald-950">
                {activeMapping.ground.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suppressed */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                <span>Suppressed Attributes</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {activeMapping.suppressed.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
