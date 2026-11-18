import React from 'react';
import {
  Binary,
  Atom,
  FlaskConical,
  Dna,
  Hourglass,
  Globe2,
  BookOpen,
  Terminal,
  Grid,
} from 'lucide-react';
import { SUBJECTS } from '../../data/subjects';
import type { SubjectId } from '../../types/subject';

interface SubjectFilterPillsProps {
  selectedSubjectId: SubjectId | 'all';
  onSelectSubject: (id: SubjectId | 'all') => void;
  totalTopicCount: number;
  subjectCounts: Record<string, number>;
}

export const SubjectFilterPills: React.FC<SubjectFilterPillsProps> = ({
  selectedSubjectId,
  onSelectSubject,
  totalTopicCount,
  subjectCounts,
}) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Binary,
    Atom,
    FlaskConical,
    Dna,
    Hourglass,
    Globe2,
    BookOpen,
    Terminal,
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {/* "All Disciplines" pill */}
      <button
        onClick={() => onSelectSubject('all')}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
          selectedSubjectId === 'all'
            ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-md font-bold'
            : 'bg-[#0D1117] text-slate-300 hover:text-white hover:bg-[#141A22] border-white/10'
        }`}
      >
        <Grid className="w-3.5 h-3.5" />
        <span>All Disciplines</span>
        <span
          className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
            selectedSubjectId === 'all'
              ? 'bg-[#080A0E] text-[#B8FF00] font-bold'
              : 'bg-[#141A22] text-slate-400 border border-white/10'
          }`}
        >
          {totalTopicCount}
        </span>
      </button>

      {/* 8 Subject Category Pills */}
      {SUBJECTS.map((subject) => {
        const Icon = iconMap[subject.iconName] || BookOpen;
        const isSelected = selectedSubjectId === subject.id;
        const count = subjectCounts[subject.id] || 0;

        return (
          <button
            key={subject.id}
            onClick={() => onSelectSubject(subject.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              isSelected
                ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-md font-bold'
                : 'bg-[#0D1117] text-slate-300 hover:text-white hover:bg-[#141A22] border-white/10'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${
                isSelected ? 'text-[#080A0E]' : 'text-[#38BDF8]'
              }`}
            />
            <span>{subject.name}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                isSelected
                  ? 'bg-[#080A0E] text-[#B8FF00] font-bold'
                  : 'bg-[#141A22] text-slate-400 border border-white/10'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
