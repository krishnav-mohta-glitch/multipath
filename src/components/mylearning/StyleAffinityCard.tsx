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
      color: 'bg-[#111714]',
      barBg: 'bg-[#DFE2D7]',
      icon: FlaskConical,
      desc: 'High affinity for interactive simulation, parameter manipulation, and discovery through active trial.',
    },
    {
      name: 'Visual Learning',
      pct: preferences.visualAffinity,
      color: 'bg-[#111714]',
      barBg: 'bg-[#DFE2D7]',
      icon: Eye,
      desc: 'Retains concepts best through labeled component maps, process flow diagrams, and spatial analogies.',
    },
    {
      name: 'Examples & Applications',
      pct: preferences.examplesAffinity,
      color: 'bg-[#111714]',
      barBg: 'bg-[#DFE2D7]',
      icon: Wrench,
      desc: 'Thrives when studying annotated worked solutions and seeing concrete real-world engineering cases.',
    },
    {
      name: 'Structured Explanation',
      pct: preferences.structuredAffinity,
      color: 'bg-[#111714]',
      barBg: 'bg-[#DFE2D7]',
      icon: BookOpen,
      desc: 'Prefers systematic, section-by-section reading with definitions, logical proofs, and clear synthesis.',
    },
  ];

  return (
    <div className="bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#111714]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
              COGNITIVE PROFILE
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#171C18] mt-0.5 tracking-tight">
            Learning Approach Affinities
          </h3>
          <p className="text-xs sm:text-sm text-[#171C18]/80 mt-0.5">
            Empirical balance across modes. MULTIPATH lets you switch approaches dynamically to consolidate mental models.
          </p>
        </div>

        <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#111714] text-[#C8F36B] border border-white/10 self-start sm:self-auto">
          PRIMARY: EXPLORE &amp; EXPERIMENT
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {affinities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="space-y-2.5 p-4 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-display font-bold text-[#171C18]">
                  <Icon className="w-4 h-4 text-[#5E7A65]" />
                  <span>{item.name}</span>
                </div>
                <span className="font-mono font-bold text-[#111714]">{item.pct}%</span>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full ${item.barBg} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>

              <p className="text-[11px] text-[#5E7A65] leading-normal">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
