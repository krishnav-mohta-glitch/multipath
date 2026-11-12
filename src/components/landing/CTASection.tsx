import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CTASection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Background glow & accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-200">
          <Sparkles className="w-3.5 h-3.5 text-brand-300" />
          <span>Begin Your Multi-Perspective Journey</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Stop memorizing answers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-200 to-white">
              Start understanding the mechanics.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose any demonstration topic, pick your natural thinking method, and see how much deeper your intuition becomes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('library')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-white hover:bg-slate-100 active:scale-[0.98] rounded-xl shadow-lg transition-all"
          >
            <span>Start Learning Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => openTopic('bio-photosynthesis', 'explore-experiment')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all"
          >
            <Compass className="w-4 h-4 text-brand-300" />
            <span>Try Photosynthesis Workspace</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          No sign-up or credit card required. Phase 1 open demonstration library.
        </p>

      </div>
    </section>
  );
};
