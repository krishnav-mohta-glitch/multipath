import React from 'react';
import {
  Brain,
  ArrowRight,
  AlertTriangle,
  Quote
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeynmanModeSection: React.FC = () => {
  const { openFeatureModal } = useApp();

  const dimensions = [
    { name: 'Plain Language Synthesis', score: 'Strong', color: '#C8F36B' },
    { name: 'First Principles Grounding', score: 'Developing', color: '#8DA391' },
    { name: 'Mechanism Completeness', score: 'Strong', color: '#C8F36B' },
    { name: 'Misconception Inoculation', score: 'Needs Review', color: '#E8A87C' },
    { name: 'Empirical Boundary Awareness', score: 'Developing', color: '#8DA391' },
    { name: 'Interconnected Synthesis', score: 'Strong', color: '#C8F36B' },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F1F1E9] border-b border-[#19211C]/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Diagnostic Showcase */}
          <div className="lg:col-span-6 bg-[#E8EAE1] rounded-3xl border border-[#19211C]/15 p-6 sm:p-8 space-y-5 shadow-sm order-2 lg:order-1">
            
            {/* Header: Persona Badge */}
            <div className="flex items-center justify-between border-b border-[#19211C]/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#111714] text-[#C8F36B] flex items-center justify-center font-bold font-mono text-sm border border-[#19211C]">
                  AL
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-[#111714] block">
                    Alex (Curious Socratic Learner)
                  </span>
                  <span className="font-mono text-[10px] text-[#5E7A65]">
                    Simulated Feynman Inquiry Partner
                  </span>
                </div>
              </div>

              <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#111714] text-[#C8F36B]">
                Persona Active
              </span>
            </div>

            {/* Persona Dialogue Prompt */}
            <div className="p-4 rounded-2xl bg-white border border-[#19211C]/10 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#5E7A65] uppercase">
                <Quote className="w-3 h-3 text-[#111714]" />
                <span>Alex asks:</span>
              </div>
              <p className="text-xs sm:text-sm text-[#171C18] leading-relaxed">
                “Wait, you said we subtract 7 because it's addition, but why can't we divide by 3 first? What happens to the 7 if we divide everything right at the start?”
              </p>
            </div>

            {/* 6-Dimension Assessment Breakdown */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#19211C]/60">
                <span>6-Dimension Diagnostic Matrix</span>
                <span className="text-[#111714] font-bold">Evidence-Grounded</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {dimensions.map((d, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/70 border border-[#19211C]/08 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#111714] truncate mr-2">{d.name}</span>
                    <span 
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: d.score === 'Strong' ? '#C8F36B' : d.score === 'Developing' ? '#CFDDD1' : '#FDE8E8',
                        color: '#111714'
                      }}
                    >
                      {d.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Gap Extraction Callout */}
            <div className="p-3.5 rounded-xl bg-[#111714] text-[#F3F4EC] border border-[#19211C] flex items-start gap-3 text-xs">
              <AlertTriangle className="w-4 h-4 text-[#C8F36B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Diagnosed Knowledge Gap:</span>
                <p className="text-[11px] text-[#8DA391] mt-0.5">
                  Distributive property division across polynomials when isolating constants prematurely.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Educational Methodology */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
              <Brain className="w-3.5 h-3.5 text-[#111714]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
                THE FEYNMAN PRINCIPLE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111714] leading-tight">
              Teach it in plain terms. <br />
              <span className="text-[#5E7A65]">Expose your blind spots.</span>
            </h2>

            <p className="text-base text-[#171C18]/80 leading-relaxed">
              Named after Nobel physicist Richard Feynman, this mode inverts the traditional classroom: you step into the role of the teacher. As you explain concepts in simple, jargon-free terms to our curious learner Alex, the engine identifies exact logical leaps and hidden gaps.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EAE1] border border-[#19211C]/15 flex items-center justify-center text-[#111714] shrink-0 mt-0.5">
                  <span className="font-mono text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111714]">Jargon-Free Synthesis</h4>
                  <p className="text-xs text-[#5F6B62] mt-0.5">Tests whether you truly understand underlying physical mechanics or are simply parroting memorized definitions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E8EAE1] border border-[#19211C]/15 flex items-center justify-center text-[#111714] shrink-0 mt-0.5">
                  <span className="font-mono text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111714]">Direct Adaptive Media Hand-Off</h4>
                  <p className="text-xs text-[#5F6B62] mt-0.5">Every diagnosed gap can be remediated directly through custom visual mind maps, audio lab podcasts, or video storyboards.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openFeatureModal('feynman-mode')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] rounded-full shadow-xs transition-all"
              >
                <span>Try Feynman Mode</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
