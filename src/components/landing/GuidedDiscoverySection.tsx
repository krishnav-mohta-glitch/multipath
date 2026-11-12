import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GuidedDiscoverySection: React.FC = () => {
  const { openFeatureModal, openTopic } = useApp();

  return (
    <section className="py-20 lg:py-32 bg-[#111714] text-[#F3F4EC] border-b border-[#19211C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Conceptual Philosophy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C] border border-[#2C3B32]">
              <BrainCircuit className="w-3.5 h-3.5 text-[#C8F36B]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#C8F36B] font-semibold">
                SOCRATIC INQUIRY ENGINE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Don't receive the answer. <br />
              <span className="text-[#8DA391]">Discover the principle.</span>
            </h2>

            <p className="text-base text-[#D0D4C7] leading-relaxed">
              When software immediately outputs the final solution, it steals the opportunity for your brain to build neural connections. MULTIPATH uses Socratic questioning to evaluate your deductive reasoning one step at a time.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#19211C] border border-[#2C3B32] flex items-center justify-center text-[#C8F36B] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">4-Tier Reasoning Diagnostic</h4>
                  <p className="text-xs text-[#8DA391] mt-0.5">Categorizes steps as Correct, Partially Correct, Incorrect, or Clarification Needed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#19211C] border border-[#2C3B32] flex items-center justify-center text-[#C8F36B] shrink-0 mt-0.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">4 Graduated Scaffolding Hints</h4>
                  <p className="text-xs text-[#8DA391] mt-0.5">From gentle conceptual nudges to concrete structural operations when stuck.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => openFeatureModal('guided-discovery')}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] rounded-full shadow-xs transition-all"
              >
                <span>Explore Guided Discovery</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Realistic Step-by-Step Interactive Socratic Mockup */}
          <div className="lg:col-span-6 bg-[#19211C] rounded-3xl border border-[#2C3B32] p-6 sm:p-8 space-y-4 shadow-2xl text-left">
            
            {/* Window Top Bar */}
            <div className="flex items-center justify-between border-b border-[#2C3B32] pb-3 text-xs font-mono text-[#8DA391]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8F36B]" />
                <span className="text-white font-bold">Linear Equations • Discovery Session</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#111714] text-[#C8F36B] border border-[#2C3B32] text-[10px]">
                Active Inquiry
              </span>
            </div>

            {/* Conversation Thread */}
            <div className="space-y-3.5 py-2">
              
              {/* Tutor Turn */}
              <div className="p-4 rounded-2xl bg-[#111714] border border-[#2C3B32] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#C8F36B] uppercase font-bold">
                    Socratic Tutor
                  </span>
                  <span className="text-[10px] text-[#8DA391] font-mono">Step 1 of 2</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F3F4EC] leading-relaxed">
                  We are solving <code className="bg-[#19211C] text-[#C8F36B] px-1.5 py-0.5 rounded font-mono">3x + 7 = 22</code>. What operation is currently binding 7 to the variable term, and how do we invert it without tilting the balance?
                </p>
              </div>

              {/* Student Response */}
              <div className="p-4 rounded-2xl bg-[#202A24] border border-[#2C3B32] ml-4 sm:ml-8 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8DA391] uppercase">
                    You (Student)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#C8F36B]/20 text-[#C8F36B] border border-[#C8F36B]/40">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Mastery Verified</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white font-medium">
                  We subtract 7 from both sides to cancel the +7, giving 3x = 15.
                </p>
              </div>

              {/* Tutor Feedback & Next Question */}
              <div className="p-4 rounded-2xl bg-[#111714] border border-[#C8F36B]/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C8F36B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Deduction Confirmed</span>
                </div>
                <p className="text-xs text-[#D0D4C7]">
                  Exactly right. Because 3x represents 3 identical unknown values totaling 15, what final inverse operation isolates x?
                </p>
              </div>

            </div>

            {/* Hint & Input Strip */}
            <div className="pt-3 border-t border-[#2C3B32] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-[#8DA391] font-mono text-[11px]">
                <Lightbulb className="w-3.5 h-3.5 text-[#C8F36B]" />
                <span>Hints: 4 Levels Available</span>
              </div>
              <button
                onClick={() => openTopic('math-linear-equations', 'structured-explanation')}
                className="px-3 py-1.5 rounded-full bg-[#111714] hover:bg-black text-[#C8F36B] border border-[#2C3B32] text-xs font-mono font-bold flex items-center gap-1"
              >
                <span>Try Live Session</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
