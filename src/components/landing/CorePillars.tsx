import React from 'react';
import {
  Layers,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CorePillars: React.FC = () => {
  const { openFeatureModal, openTopic } = useApp();

  const pillars = [
    {
      id: 'multiple-paths' as const,
      number: '01',
      title: 'Multiple Learning Paths',
      tagline: 'Match your brain’s natural thinking style',
      description:
        'Instead of forcing one rigid textbook angle, every concept is presented across 4 distinct cognitive paradigms: First Principles, Visual & Spatial, Applied Real-World, and Historical Narrative.',
      icon: Layers,
      iconColor: 'text-brand-600 bg-brand-50 border-brand-200',
      highlights: [
        'Structured Explanation: Sectioned, systematic conceptual breakdowns',
        'Visual Learning: Dynamic component maps, diagrams & process flows',
        'Examples & Applications: Step-by-step worked solutions & real-world cases',
        'Explore & Experiment: Hands-on parameter manipulation & live simulations',
      ],
      actionLabel: 'Explore Multi-Path Model',
      badge: 'Interactive in Phase 2',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      demoAction: () => openTopic('math-linear-equations', 'structured-explanation'),
    },
    {
      id: 'guided-discovery' as const,
      number: '02',
      title: 'Guided Discovery',
      tagline: 'Socratic inquiry over passive reading',
      description:
        'True mastery is forged by arriving at answers yourself. Guided Discovery replaces passive lecture walls with step-by-step diagnostic prompts that guide you to reconstruct core formulas and principles.',
      icon: Sparkles,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      highlights: [
        'Active recall prompts that trigger independent deduction',
        'Misconception interception before faulty intuition solidifies',
        'Progressive scaffolding calibrated to your cognitive edge',
        'Diagnostic questions testing genuine causal understanding',
      ],
      actionLabel: 'Preview Socratic Engine',
      badge: 'Feature Specification',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      demoAction: () => openFeatureModal('guided-discovery'),
    },
    {
      id: 'feynman-mode' as const,
      number: '03',
      title: 'Feynman Mode',
      tagline: 'Explain simply to expose hidden blind spots',
      description:
        'Named after Nobel physicist Richard Feynman, this mode challenges you to synthesize concepts in plain, jargon-free language. If you cannot explain it without technical buzzwords, you found your learning gap.',
      icon: HelpCircle,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      highlights: [
        'Jargon-free synthesis challenge (explain like to a 12-year-old)',
        'Unmasks the illusion of competence created by passive reading',
        'Identifies exact logical leaps and hand-waving explanations',
        'Builds durable mental models that survive exam pressure',
      ],
      actionLabel: 'Preview Feynman Mode',
      badge: 'Feature Specification',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      demoAction: () => openFeatureModal('feynman-mode'),
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
            The MULTIPATH Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Three Core Pillars of Independent Thinking
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Education platforms typically test how much information you memorize. MULTIPATH trains how deeply you understand, how independently you reason, and how quickly you spot your own misunderstandings.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="flex flex-col justify-between bg-slate-50/70 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-md group"
              >
                <div className="space-y-6">
                  {/* Top Bar: Icon & Pillar Number */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${pillar.iconColor} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-2xl font-mono font-bold text-slate-300">
                        {pillar.number}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${pillar.badgeClass}`}>
                        {pillar.badge}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                      {pillar.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-slate-600">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-2">
                      {pillar.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openFeatureModal(pillar.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:underline"
                  >
                    View Details
                  </button>

                  <button
                    onClick={pillar.demoAction}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
