import React, { useState } from 'react';
import { Sparkles, HelpCircle, Layers } from 'lucide-react';
import type { Topic } from '../../types/topic';
import { GuidedDiscoveryModal } from './GuidedDiscoveryModal';
import { FeynmanModeModal } from './FeynmanModeModal';
import { AdaptiveMediaModal } from './adaptiveMedia/AdaptiveMediaModal';

interface FeatureBadgesProps {
  topic: Topic;
}

export const FeatureBadges: React.FC<FeatureBadgesProps> = ({ topic }) => {
  const [discoveryOpen, setDiscoveryOpen] = useState(false);
  const [feynmanOpen, setFeynmanOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  return (
    <>
      <div className="bg-[#111714] text-[#F3F4EC] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#C8F36B 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />

        <div className="space-y-2 max-w-xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[#C8F36B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F36B] animate-pulse" />
              Cognitive Diagnostic Lab
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#8DA391] border border-white/10">
              Active Session
            </span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F3F4EC] tracking-tight">
            Stress-test your comprehension.
          </h3>

          <p className="text-xs sm:text-sm text-[#8DA391] leading-relaxed">
            Move beyond passive reading. Engage in Socratic dialectic, teach an inquiring student in Feynman Mode, or synthesise multi-modal representations tailored to your learning style.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={() => setDiscoveryOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#d6f78a] transition-all shadow-sm active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#111714]" />
            <span>Guided Discovery</span>
          </button>

          <button
            onClick={() => setFeynmanOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-[#F3F4EC] bg-[#19211C] hover:bg-[#202A24] border border-white/15 hover:border-[#C8F36B]/40 transition-all shadow-sm active:scale-[0.98]"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C8F36B]" />
            <span>Feynman Mode</span>
          </button>

          <button
            onClick={() => setMediaOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-[#F3F4EC] bg-[#19211C] hover:bg-[#202A24] border border-white/15 hover:border-white/30 transition-all shadow-sm active:scale-[0.98]"
          >
            <Layers className="w-3.5 h-3.5 text-[#8DA391]" />
            <span>Adaptive Media</span>
          </button>
        </div>
      </div>

      {/* Guided Discovery Interactive Engine */}
      <GuidedDiscoveryModal
        topic={topic}
        isOpen={discoveryOpen}
        onClose={() => setDiscoveryOpen(false)}
      />

      {/* Feynman Mode Interactive Engine */}
      <FeynmanModeModal
        topic={topic}
        isOpen={feynmanOpen}
        onClose={() => setFeynmanOpen(false)}
      />

      {/* Adaptive Media Engine */}
      <AdaptiveMediaModal
        topic={topic}
        isOpen={mediaOpen}
        onClose={() => setMediaOpen(false)}
      />
    </>
  );
};
