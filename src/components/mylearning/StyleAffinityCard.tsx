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
      icon: FlaskConical,
      color: 'text-[#B8FF00]',
      desc: 'High affinity for interactive simulation, parameter manipulation, and discovery through active trial.',
    },
    {
      name: 'Visual Learning',
      pct: preferences.visualAffinity,
      icon: Eye,
      color: 'text-[#38BDF8]',
      desc: 'Retains concepts best through labeled component maps, process flow diagrams, and spatial analogies.',
    },
    {
      name: 'Examples & Applications',
      pct: preferences.examplesAffinity,
      icon: Wrench,
      color: 'text-amber-400',
      desc: 'Thrives when studying annotated worked solutions and seeing concrete real-world engineering cases.',
    },
    {
      name: 'Structured Explanation',
      pct: preferences.structuredAffinity,
      icon: BookOpen,
      color: 'text-slate-200',
      desc: 'Prefers systematic, section-by-section reading with definitions, logical proofs, and clear synthesis.',
    },
  ];

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800 shadow-xl p-6 sm:p-8 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B8FF00]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              COGNITIVE PROFILE
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FAF9F5] mt-1 tracking-tight">
            Learning Approach Affinities
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Empirical balance across modes. MULTIPATH lets you switch approaches dynamically to consolidate mental models.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {affinities.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <span className="font-display text-sm font-bold text-[#FAF9F5]">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#B8FF00]">
                    {item.pct}%
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#38BDF8] to-[#B8FF00] rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(5, item.pct)}%` }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
