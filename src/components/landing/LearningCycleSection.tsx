import React from 'react';
import { ArrowRight, RefreshCw, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LearningCycleSection: React.FC = () => {
  const { navigateTo } = useApp();

  const cycleSteps = [
    {
      num: '01',
      title: 'Learn',
      sub: 'Multi-Path Deconstruction',
      desc: 'Encounter the concept through your choice of First Principles, Visual models, Applied dilemmas, or Active sandboxes.',
      tag: '4 Perspectives'
    },
    {
      num: '02',
      title: 'Practise',
      sub: 'Socratic Inquiry',
      desc: 'Work through deductive steps with an AI tutor that challenges your reasoning rather than handing out answers.',
      tag: 'Active Recall'
    },
    {
      num: '03',
      title: 'Explain',
      sub: 'Feynman Teaching Turn',
      desc: 'Teach the concept in plain English to Alex, our simulated curious learner who questions jargon and leaps.',
      tag: 'Plain Language'
    },
    {
      num: '04',
      title: 'Identify Gaps',
      sub: '6-Dimension Diagnosis',
      desc: 'The engine evaluates your explanation against evidence-based rubrics, extracting exact logical blind spots.',
      tag: 'Zero Hand-waving'
    },
    {
      num: '05',
      title: 'Choose Media',
      sub: 'Targeted Remediation',
      desc: 'You select the medium that fits your brain—interactive mind map, dual-host podcast, or animated storyboard.',
      tag: 'Student Choice'
    },
    {
      num: '06',
      title: 'Reassess',
      sub: 'Durable Mastery',
      desc: 'Verify that the conceptual gap has closed and record your cognitive progress into your permanent local trajectory.',
      tag: 'Verified Growth'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#F1F1E9] border-b border-[#19211C]/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
            <RefreshCw className="w-3.5 h-3.5 text-[#111714]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
              CLOSED-LOOP REASONING
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111714]">
            The MULTIPATH Learning Cycle
          </h2>

          <p className="text-base sm:text-lg text-[#171C18]/80 leading-relaxed max-w-2xl">
            A continuous feedback loop designed to move students from initial exposure to self-verified cognitive mastery.
          </p>
        </div>

        {/* Precision Architectural Cycle Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {cycleSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#E8EAE1] border border-[#19211C]/15 space-y-4 flex flex-col justify-between hover:border-[#111714] transition-all relative group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#111714] text-[#C8F36B]">
                    {step.num}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#5E7A65]">
                    {step.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl text-[#111714]">
                    {step.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#5E7A65] block mt-0.5">
                    {step.sub}
                  </span>
                </div>

                <p className="text-xs text-[#171C18]/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator arrow */}
              <div className="pt-3 border-t border-[#19211C]/10 flex items-center justify-between text-[11px] font-mono text-[#19211C]/60">
                <span>Phase {step.num} in loop</span>
                <ChevronRight className="w-4 h-4 text-[#111714] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Diagram Flow Connector Pill */}
        <div className="mt-12 p-5 rounded-2xl bg-[#111714] text-[#F3F4EC] border border-[#19211C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
            <span className="text-white font-medium">
              Learn → Practise → Explain → Identify Gaps → Choose Media → Reassess
            </span>
          </div>

          <button
            onClick={() => navigateTo('library')}
            className="px-5 py-2.5 rounded-full bg-[#C8F36B] hover:bg-[#BCEB58] text-[#111714] font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0"
          >
            <span>Begin the Cycle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
