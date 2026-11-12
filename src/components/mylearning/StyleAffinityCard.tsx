import React from 'react';
import { BookOpen, Eye, Wrench, FlaskConical, Sparkles } from 'lucide-react';
import type { LearningPreference } from '../../types/session';

interface StyleAffinityCardProps {
  preferences: LearningPreference;
}

export const StyleAffinityCard: React.FC<StyleAffinityCardProps> = ({ preferences }) => {
  const affinities = [
    {
      name: 'Explore & Experiment',
      pct: preferences.exploreAffinity,
      color: 'bg-amber-600',
      barBg: 'bg-amber-100',
      icon: FlaskConical,
      desc: 'High affinity for interactive simulation, parameter manipulation, and discovery through active trial.',
    },
    {
      name: 'Visual Learning',
      pct: preferences.visualAffinity,
      color: 'bg-violet-600',
      barBg: 'bg-violet-100',
      icon: Eye,
      desc: 'Retains concepts best through labeled component maps, process flow diagrams, and spatial analogies.',
    },
    {
      name: 'Examples & Applications',
      pct: preferences.examplesAffinity,
      color: 'bg-emerald-600',
      barBg: 'bg-emerald-100',
      icon: Wrench,
      desc: 'Thrives when studying annotated worked solutions and seeing concrete real-world engineering cases.',
    },
    {
      name: 'Structured Explanation',
      pct: preferences.structuredAffinity,
      color: 'bg-blue-600',
      barBg: 'bg-blue-100',
      icon: BookOpen,
      desc: 'Prefers systematic, section-by-section reading with definitions, logical proofs, and clear synthesis.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cognitive Profile
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Learning Approach Affinities
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Reflects your natural learning tendencies. MULTIPATH lets you switch approaches anytime to reinforce understanding.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 hidden sm:inline-block">
          Primary: Explore & Experiment
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {affinities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Icon className="w-4 h-4 text-slate-600" />
                  <span>{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-700">{item.pct}%</span>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full ${item.barBg} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
