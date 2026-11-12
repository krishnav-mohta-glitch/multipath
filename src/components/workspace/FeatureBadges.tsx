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
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
              Interactive Cognitive Tools
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-white/10 text-slate-300 border border-white/15">
              Core Capabilities
            </span>
          </div>

          <h3 className="text-lg font-bold text-white tracking-tight">
            Ready to test your independent understanding?
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Engage with Socratic Guided Discovery, teach AI in Feynman Mode, or generate targeted adaptive media (Mind Maps, Podcasts, Explainer Videos).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => setDiscoveryOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guided Discovery</span>
          </button>

          <button
            onClick={() => setFeynmanOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/40 transition-colors shadow-sm"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span>Feynman Mode</span>
          </button>

          <button
            onClick={() => setMediaOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/40 transition-colors shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-200" />
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
