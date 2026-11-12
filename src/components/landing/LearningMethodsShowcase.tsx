import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LEARNING_PATHS } from '../../data/learningPaths';
import type { LearningPathId } from '../../types/learningPath';

export const LearningMethodsShowcase: React.FC = () => {
  const { openTopic } = useApp();
  const [selectedDemoPath, setSelectedDemoPath] = useState<LearningPathId>('structured-explanation');

  const pathTabs: { id: LearningPathId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'structured-explanation', label: 'Structured Explanation', icon: BookOpen },
    { id: 'visual-learning', label: 'Visual Learning', icon: Eye },
    { id: 'examples-applications', label: 'Examples & Applications', icon: Wrench },
    { id: 'explore-experiment', label: 'Explore & Experiment', icon: FlaskConical },
  ];

  const demoContent = {
    'structured-explanation': {
      concept: 'Linear Equations: Isolating Unknowns',
      framework: 'Axiomatic Equality & Symmetric Inverses',
      quote: '“An equation is not a command to calculate; it is a relational statement of mutual balance.”',
      breakdown: [
        {
          heading: '1. The Equality Postulate',
          text: 'Two quantities on either side of the equals sign have strictly identical magnitude. Any reversible operation applied to one side must be mirrored on the other.',
        },
        {
          heading: '2. Inverse Operation Unwrapping',
          text: 'Operations are unwrapped in reverse sequence using arithmetic inverses: addition is neutralized by subtraction; multiplication by non-zero division.',
        },
        {
          heading: '3. Unit Magnitude Isolation',
          text: 'If three identical unknown packages plus 4 kg balance 19 kg, subtracting 4 kg yields 3x = 15 kg, giving a unit value of x = 5 kg.',
        },
      ],
      cognitiveBenefit: 'Eliminates reliance on arbitrary tricks. Students derive solutions logically from foundational axioms.',
    },
    'visual-learning': {
      concept: 'Linear Equations: The Geometry of Constant Slope',
      framework: 'Cartesian Invariant Vector & The Balanced Beam',
      quote: '“A straight line is a geometric graph of absolute predictability.”',
      breakdown: [
        {
          heading: '1. Ground Intercept Anchor (0, b)',
          text: 'The y-intercept represents your baseline elevation before taking a single step into the input domain (when x = 0).',
        },
        {
          heading: '2. The Slope Stepper (Δy / Δx)',
          text: 'For every 1 unit moved along the horizontal axis, the line climbs exactly m vertical units. The steepness is invariant at every millimeter.',
        },
        {
          heading: '3. Dual-Pan Seesaw Equilibrium',
          text: 'Visualize a balanced beam: changing weights on one pan tilts the scale until the identical mass change is applied to the opposite pan.',
        },
      ],
      cognitiveBenefit: 'Translates abstract algebraic formulas into spatial relations that can be visualized and rotated mentally.',
    },
    'examples-applications': {
      concept: 'Linear Equations: Cloud Infrastructure Billing',
      framework: 'Deterministic Pricing & Resource Budgeting',
      quote: '“Why risk a $10,000 server overage when a linear equation bounds your exact runtime capacity?”',
      breakdown: [
        {
          heading: '1. The High-Stakes Dilemma',
          text: 'A tech startup has a fixed subscription of $150/month plus $0.25 per active CPU hour, with an absolute budget cap of $1,000.',
        },
        {
          heading: '2. The Worked Derivation',
          text: 'Cost = 150 + 0.25h. Setting Cost = $1,000: 1000 - 150 = 850; dividing 850 / 0.25 yields exactly 3,400 allowable compute hours.',
        },
        {
          heading: '3. Automated Safeguard',
          text: 'Engineers configure automated scaling thresholds at hour 3,399, preventing catastrophic billing surprises.',
        },
      ],
      cognitiveBenefit: 'Answers the age-old student question: “Where and why is this math actually applied in real life?”',
    },
    'explore-experiment': {
      concept: 'Linear Equations: Live Parameter Sandbox',
      framework: 'Hands-On Variable Manipulation',
      quote: '“Change the slope, shift the intercept, and observe the live coordinate line update instantly.”',
      breakdown: [
        {
          heading: '1. Real-Time Slope Manipulation',
          text: 'Slide m from negative to positive. Observe how negative slope tilts downward left-to-right, while zero creates an entirely flat horizon.',
        },
        {
          heading: '2. Intercept Elevation Shifting',
          text: 'Slide b up and down. Watch the entire line translate vertically without changing its slope angle by a single degree.',
        },
        {
          heading: '3. Balance Scale Verification',
          text: 'Toggle to the interactive pan balance to watch real-time equilibrium maintained as you test different x inputs.',
        },
      ],
      cognitiveBenefit: 'Empowers discovery through active play, trial-and-error experimentation, and immediate dynamic feedback.',
    },
  }[selectedDemoPath];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-brand-700">
            <Layers className="w-3.5 h-3.5" />
            <span>Phase 2: Multiple Learning Approaches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See How One Concept Shifts Across Four Approaches
          </h2>
          <p className="text-base text-slate-600">
            Select an approach below to see how MULTIPATH teaches the exact same topic through genuinely different pedagogical modalities.
          </p>
        </div>

        {/* Path Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {pathTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedDemoPath === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedDemoPath(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-300' : 'text-slate-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
                {demoContent.framework}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">
                {demoContent.concept}
              </h3>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 self-start md:self-auto">
              Active Modality: <strong className="text-slate-900">{LEARNING_PATHS[selectedDemoPath].title}</strong>
            </div>
          </div>

          <div className="py-6">
            <blockquote className="text-base sm:text-lg font-medium text-slate-700 italic border-l-4 border-brand-500 pl-4 py-1 bg-brand-50/40 rounded-r-lg">
              {demoContent.quote}
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {demoContent.breakdown.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.heading}</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                <strong>Pedagogical Value:</strong> {demoContent.cognitiveBenefit}
              </span>
            </div>

            <button
              onClick={() => openTopic('math-linear-equations', selectedDemoPath)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-brand-600 active:scale-[0.98] rounded-xl transition-all shadow-sm shrink-0"
            >
              <span>Open in Topic Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
