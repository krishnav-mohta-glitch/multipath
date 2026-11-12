import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CTASection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();

  return (
    <section className="py-24 lg:py-36 bg-[#111714] text-[#F3F4EC] relative overflow-hidden text-center border-t border-[#19211C]">
      
      {/* Precision ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8F36B]/06 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Subtle Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#19211C] border border-[#2C3B32]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8F36B]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8F36B] font-semibold">
            SOVEREIGN INTELLECT
          </span>
        </div>

        {/* Closing Headline as specified */}
        <div className="space-y-4">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            The way you learn <br />
            <span className="text-[#8DA391]">should not be decided for you.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#D0D4C7] max-w-xl mx-auto leading-relaxed">
            Break free from rigid one-size-fits-all curricula. Switch perspectives, question derivations, and master concepts on your own terms.
          </p>
        </div>

        {/* CTA Button as specified */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('library')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 text-sm font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] active:scale-[0.98] rounded-full shadow-lg transition-all"
          >
            <span>Start learning</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            onClick={() => openTopic('math-linear-equations', 'structured-explanation')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium text-white bg-[#19211C] hover:bg-[#202A24] border border-[#2C3B32] rounded-full transition-all"
          >
            <Compass className="w-4 h-4 text-[#C8F36B]" />
            <span>Try Linear Equations Demo</span>
          </button>
        </div>

        <div className="pt-6 flex items-center justify-center gap-6 text-xs text-[#8DA391] font-mono">
          <span>✓ Local-First Privacy</span>
          <span>✓ Zero Data Lock-in</span>
          <span>✓ 8 Complete Disciplines</span>
        </div>

      </div>
    </section>
  );
};
