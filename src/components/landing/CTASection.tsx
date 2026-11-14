import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CTASection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();

  return (
    <section className="py-20 lg:py-32 bg-[#080A0E] text-[#F3F4EC] relative overflow-hidden text-center border-t border-white/10">
      
      {/* Precision ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B8FF00]/05 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Subtle Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A22] border border-white/15">
          <span className="w-2 h-2 rounded-full bg-[#B8FF00]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8FF00] font-bold">
            SOVEREIGN SCIENTIFIC LEARNING
          </span>
        </div>

        {/* Closing Headline */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The way you learn <br />
            <span className="text-[#8B9DAE]">should not be decided for you.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D0D4C7] max-w-xl mx-auto leading-relaxed">
            Break free from rigid one-size-fits-all curricula. Switch perspectives, inspect 3D physical models, and master concepts on your own terms.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <button
            onClick={() => navigateTo('library')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-xs sm:text-sm font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] active:scale-[0.98] rounded-full shadow-lg shadow-[#B8FF00]/15 transition-all cursor-pointer"
          >
            <span>Start Learning (No Account Needed)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.4]" />
          </button>

          <button
            onClick={() => openTopic('math-linear-equations', 'structured-explanation')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-xs sm:text-sm font-semibold text-white bg-[#141A22] hover:bg-[#1C2430] border border-white/15 rounded-full transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#8B9DAE]" />
            <span>Launch Linear Equations Demo</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8B9DAE] font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8FF00]" />
            Local-First Privacy
          </span>
          <span>•</span>
          <span>Zero Data Lock-in</span>
          <span>•</span>
          <span>64 Verified Curriculum Topics</span>
        </div>

      </div>
    </section>
  );
};
