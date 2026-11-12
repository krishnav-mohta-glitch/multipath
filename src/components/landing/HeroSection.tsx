import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30">
      
      {/* Subtle grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-xs font-semibold text-brand-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Phase 1 Architectural Foundation</span>
            <span className="w-1 h-1 rounded-full bg-brand-400" />
            <span className="text-slate-600">Adaptive Multi-Method Learning</span>
          </div>

          {/* Main Headline & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Learn differently. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-800">
                Think independently.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Master complex ideas through multiple cognitive perspectives. When conventional explanations fail, MULTIPATH deconstructs concepts into First Principles, Visual geometry, Real-World applications, and Historical breakthroughs.
            </p>
          </div>

          {/* Prominent CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigateTo('library')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] rounded-xl shadow-lg shadow-brand-600/25 transition-all"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => openTopic('math-linear-equations', 'explore-experiment')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-sm transition-all"
            >
              <Compass className="w-4 h-4 text-brand-600" />
              <span>Try Demo: Linear Equations</span>
            </button>
          </div>

          {/* Value Propositions */}
          <div className="pt-8 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-xl font-bold text-slate-900">4 Perspectives</div>
              <div className="text-xs text-slate-600 font-medium">Every topic broken down 4 ways</div>
            </div>

            <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-xl font-bold text-slate-900">8 Core Disciplines</div>
              <div className="text-xs text-slate-600 font-medium">Math, Sciences, Humanities & CS</div>
            </div>

            <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-xl font-bold text-slate-900">Socratic Inquiry</div>
              <div className="text-xs text-slate-600 font-medium">Guided discovery over lecturing</div>
            </div>

            <div className="p-3 rounded-lg bg-white/70 border border-slate-200/60 shadow-xs">
              <div className="text-xl font-bold text-slate-900">Feynman Method</div>
              <div className="text-xs text-slate-600 font-medium">Expose blind spots in plain English</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
