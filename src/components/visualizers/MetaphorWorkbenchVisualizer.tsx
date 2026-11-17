import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import type { BaseVisualizerProps } from './types';

interface MetaphorExample {
  id: string;
  sourceText: string;
  author: string;
  tenor: string;
  vehicle: string;
  ground: string;
  literalInterpretation: string;
  figurativeResonance: string;
}

const METAPHOR_PRESETS: MetaphorExample[] = [
  {
    id: 'shakespeare-stage',
    sourceText: '"All the world\'s a stage, and all the men and women merely players."',
    author: 'William Shakespeare (As You Like It, Act II Scene 7)',
    tenor: 'Human Existence & Mortal Life',
    vehicle: 'A Theatrical Stage with Entrances and Exits',
    ground: 'Transience of mortal roles, performative nature of social expectations, inevitable departure.',
    literalInterpretation: 'Every living human is an actor employed in a theatre company reading pre-written scripts.',
    figurativeResonance: 'Life is structured into distinct developmental acts; human identity is shaped by social performance and inescapable temporality.',
  },
  {
    id: 'dickinson-feathers',
    sourceText: '"Hope is the thing with feathers that perches in the soul."',
    author: 'Emily Dickinson (Poem 314)',
    tenor: 'The Psychological State of Hope',
    vehicle: 'A Small Songbird with Feathers',
    ground: 'Fragile yet resilient, lightweight, enduring storms without demanding food or compensation.',
    literalInterpretation: 'A biological avian creature with plumage physically nests inside human chest tissue.',
    figurativeResonance: 'Optimism is an innate, resilient instinct that sings continuously during emotional crisis without demanding external reward.',
  },
  {
    id: 'sandburg-fog',
    sourceText: '"The fog comes on little cat feet. It sits looking over harbor and city..."',
    author: 'Carl Sandburg (Chicago Poems, 1916)',
    tenor: 'Atmospheric Fog Rolling Over Chicago Harbor',
    vehicle: 'A Silent, Stealthy Cat Prowling on Paws',
    ground: 'Silent arrival, quiet observation, mysterious detachment, stealthy sudden departure.',
    literalInterpretation: 'A feline animal strides across the water and sits on its haunches above skyscrapers.',
    figurativeResonance: 'The sudden, eerie quiet of a meteorological event takes on the conscious, stalking stealth of an animal.',
  },
];

export const MetaphorWorkbenchVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [activeMetaphor, setActiveMetaphor] = useState<MetaphorExample>(METAPHOR_PRESETS[0]);
  const [resonanceLevel, setResonanceLevel] = useState<number>(75);

  return (
    <div className="rounded-3xl border border-white/10 bg-[#080A0E] text-[#F3F4EC] shadow-2xl p-4 sm:p-6 lg:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#B8FF00]">
              Semantic Metaphor Workbench &bull; Richards Tripartite Model
            </span>
            <span className="font-mono text-[10px] text-[#8DA391] bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {topic.id}
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight break-words">
            Anatomy of a Literary Metaphor (Tenor, Vehicle &amp; Ground)
          </h3>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Metaphor Dissection Canvas */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0D121B] border border-white/10 space-y-5">
            {/* Primary Quote Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="font-mono text-[10px] uppercase text-[#B8FF00] tracking-wider block">
                Primary Poetic Excerpt:
              </span>
              <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed">
                {activeMetaphor.sourceText}
              </p>
              <span className="font-mono text-xs text-[#8DA391] block pt-1">
                — {activeMetaphor.author}
              </span>
            </div>

            {/* Tripartite Semantic Map: Tenor -> Ground -> Vehicle */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* 1. Tenor */}
              <div className="p-3.5 rounded-xl bg-[#141A22] border border-blue-500/30 space-y-1">
                <span className="font-mono text-[10px] uppercase text-blue-400 font-bold block">
                  1. The Tenor (Target)
                </span>
                <span className="text-xs font-semibold text-white block">
                  {activeMetaphor.tenor}
                </span>
                <p className="text-[11px] text-[#8DA391] pt-1">
                  The real-world concept or emotion actually being communicated.
                </p>
              </div>

              {/* 2. Ground */}
              <div className="p-3.5 rounded-xl bg-[#141A22] border border-[#B8FF00]/40 space-y-1">
                <span className="font-mono text-[10px] uppercase text-[#B8FF00] font-bold block">
                  2. The Ground (Nexus)
                </span>
                <span className="text-xs font-semibold text-white block">
                  {activeMetaphor.ground}
                </span>
                <p className="text-[11px] text-[#8DA391] pt-1">
                  The shared semantic qualities bridging the two distant ideas.
                </p>
              </div>

              {/* 3. Vehicle */}
              <div className="p-3.5 rounded-xl bg-[#141A22] border border-purple-500/30 space-y-1">
                <span className="font-mono text-[10px] uppercase text-purple-400 font-bold block">
                  3. The Vehicle (Lens)
                </span>
                <span className="text-xs font-semibold text-white block">
                  {activeMetaphor.vehicle}
                </span>
                <p className="text-[11px] text-[#8DA391] pt-1">
                  The figurative imagery or object imported to illuminate the tenor.
                </p>
              </div>
            </div>

            {/* Resonance Slider: Literal vs Figurative Depth */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/08 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#8DA391] flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#B8FF00]" />
                  <span>Interpretation Filter:</span>
                </span>
                <span className="text-white font-bold">
                  {resonanceLevel < 35 ? 'Strictly Literal' : resonanceLevel < 70 ? 'Balanced Imagery' : 'Poetic & Metaphysical'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={resonanceLevel}
                onChange={(e) => setResonanceLevel(Number(e.target.value))}
                className="w-full accent-[#B8FF00] cursor-pointer"
              />
              <div className="p-3 rounded-lg bg-black/40 border border-white/05 text-xs text-[#E5E7EB] leading-relaxed">
                {resonanceLevel < 50 ? (
                  <div>
                    <strong className="text-amber-400 font-mono text-[11px] block">LITERAL COLLAPSE:</strong>
                    {activeMetaphor.literalInterpretation}
                  </div>
                ) : (
                  <div>
                    <strong className="text-[#B8FF00] font-mono text-[11px] block">FIGURATIVE RESONANCE:</strong>
                    {activeMetaphor.figurativeResonance}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Curated Canonical Presets */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0D121B] border border-white/10 space-y-3">
            <div className="pb-2 border-b border-white/08">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Canonical Literary Metaphors
              </span>
              <p className="text-[11px] text-[#8DA391]">
                Select standard curriculum texts to analyze tenor-vehicle dynamics.
              </p>
            </div>

            <div className="space-y-2.5">
              {METAPHOR_PRESETS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMetaphor(m)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer group space-y-1.5 ${
                    activeMetaphor.id === m.id
                      ? 'bg-[#141A22] border-[#B8FF00] ring-1 ring-[#B8FF00]/40 shadow-sm'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-bold text-white group-hover:text-[#B8FF00] transition-colors">
                      {m.tenor}
                    </span>
                    <span className="text-[9px] font-mono text-[#B8FF00]">Inspect →</span>
                  </div>
                  <p className="font-serif italic text-xs text-[#C8D6C9] line-clamp-2">
                    {m.sourceText}
                  </p>
                  <div className="text-[10px] font-mono text-[#8DA391] pt-1 border-t border-white/05">
                    {m.author.split('(')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
