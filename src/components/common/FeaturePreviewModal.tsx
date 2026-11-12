import React from 'react';
import {
  X,
  Compass,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  BookOpen,
  Eye,
  Wrench,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FeaturePreviewModal: React.FC = () => {
  const { featureModal, closeFeatureModal, navigateTo } = useApp();

  if (!featureModal.isOpen || !featureModal.feature) return null;

  const contentMap = {
    'multiple-paths': {
      title: 'Multiple Learning Paths',
      subtitle: 'Cognitive Polyphony: One Concept, Four Distinct Perspectives',
      icon: Layers,
      iconBg: 'bg-brand-50 text-brand-600',
      tagline: 'Different brains learn differently. Never get trapped in a single explanation.',
      problemStatement:
        'Standard educational platforms force every student down a single didactic funnel. If a textbook explanation does not match a student’s natural cognitive style, they hit an intellectual wall and assume they are "bad at the subject."',
      howItWorks: [
        {
          name: 'Structured Explanation',
          desc: 'A clear, disciplined breakdown dividing the concept into its foundational principles, core mechanisms, key definitions, and synthesis.',
          icon: BookOpen,
        },
        {
          name: 'Visual Learning',
          desc: 'Interactive diagrams, process flows, labelled component anatomy, and spatial analogies for visual thinkers.',
          icon: Eye,
        },
        {
          name: 'Examples & Applications',
          desc: 'Step-by-step annotated worked problems followed by high-stakes real-world engineering and historical case studies.',
          icon: Wrench,
        },
        {
          name: 'Explore & Experiment',
          desc: 'Hands-on interactive lab: adjust variables with real-time sliders and observe dynamic mathematical, biological, and historical consequences.',
          icon: Compass,
        },
      ],
      phaseStatus:
        'Phase 2 Live: Fully functional across our curriculum with interactive simulators, worked problems, visual maps, and structured readings!',
      ctaAction: () => {
        closeFeatureModal();
        navigateTo('library');
      },
      ctaText: 'Explore Paths in Library',
    },
    'guided-discovery': {
      title: 'Guided Discovery Mode',
      subtitle: 'Socratic Inquiry Over Passive Information Consumption',
      icon: Sparkles,
      iconBg: 'bg-amber-50 text-amber-600',
      tagline: 'True understanding is arrived at through guided questioning, not copy-pasting answers.',
      problemStatement:
        'Reading an answer creates the "illusion of competence"—students feel they understand because the text makes sense in the moment, but fail to reconstruct the idea independently on exams or in real-world problem solving.',
      howItWorks: [
        {
          name: 'Socratic Probing',
          desc: 'Instead of lecturing, the system asks targeted questions that guide students to formulate the underlying rule themselves.',
          icon: HelpCircle,
        },
        {
          name: 'Misconception Interception',
          desc: 'Identifies faulty intuitive leaps before they become ingrained habits, providing gentle counter-examples.',
          icon: Lightbulb,
        },
        {
          name: 'Scaffolded Hints',
          desc: 'Layered clues calibrated to push students just past their current edge of competence without revealing the full solution.',
          icon: CheckCircle2,
        },
        {
          name: 'Phase 2 Architecture Target',
          desc: 'Will integrate low-latency LLM agents with deterministic pedagogical guardrails to maintain authentic Socratic dialogue.',
          icon: Cpu,
        },
      ],
      phaseStatus:
        'Phase 1 Specification: Previewed as an architectural capability. The Topic Workspace includes the interface layout and prompt scaffolding, ready for Phase 2 LLM orchestration.',
      ctaAction: () => {
        closeFeatureModal();
        navigateTo('workspace', 'math-linear-equations');
      },
      ctaText: 'Preview Topic Workspace',
    },
    'feynman-mode': {
      title: 'Feynman Mode',
      subtitle: 'The Ultimate Acid Test: Explain It In Plain English',
      icon: HelpCircle,
      iconBg: 'bg-emerald-50 text-emerald-600',
      tagline: '“If you cannot explain it simply, you do not understand it well enough.” — Richard Feynman',
      problemStatement:
        'Jargon is the great hider of ignorance. Students often use technical terms like "osmosis", "photosystem", or "derivative" without truly understanding the physical mechanics underneath.',
      howItWorks: [
        {
          name: 'Jargon-Free Synthesis',
          desc: 'Students explain the concept in their own everyday language as if speaking to a curious 12-year-old.',
          icon: BookOpen,
        },
        {
          name: 'Blind Spot Highlighting',
          desc: 'In Phase 2, automated diagnostic parsing detects logical gaps, circular definitions, and hand-waving explanations.',
          icon: Eye,
        },
        {
          name: 'Intuition Refinement',
          desc: 'Returns targeted feedback pinpointing exactly where the student’s mental model broke down.',
          icon: Lightbulb,
        },
        {
          name: 'Confidence vs. Competence Matrix',
          desc: 'Calibrates student metacognition so they know what they know—and what they only thought they knew.',
          icon: CheckCircle2,
        },
      ],
      phaseStatus:
        'Phase 1 Specification: Integrated into the Topic Workspace as an exploratory feature preview with prompt templates and evaluation criteria.',
      ctaAction: () => {
        closeFeatureModal();
        navigateTo('workspace', 'bio-photosynthesis');
      },
      ctaText: 'View Photosynthesis Topic',
    },
  }[featureModal.feature];

  const Icon = contentMap.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header banner */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${contentMap.iconBg} shadow-sm`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
                  MULTIPATH Core Capability
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {contentMap.title}
                </h3>
              </div>
            </div>

            <button
              onClick={closeFeatureModal}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-700 italic">
            "{contentMap.tagline}"
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Problem it solves */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              The Cognitive Problem
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {contentMap.problemStatement}
            </p>
          </div>

          {/* How it works grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              How It Works
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {contentMap.howItWorks.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <ItemIcon className="w-4 h-4 text-brand-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phase 1 Scope & Status */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                Phase 1 Implementation Notice
              </span>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {contentMap.phaseStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={closeFeatureModal}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={contentMap.ctaAction}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] rounded-lg shadow-sm transition-all"
          >
            <span>{contentMap.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
