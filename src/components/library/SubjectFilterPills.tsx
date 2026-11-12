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
      {/* "All Subjects" pill */}
      <button
        onClick={() => onSelectSubject('all')}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
          selectedSubjectId === 'all'
            ? 'bg-slate-900 text-white shadow-xs'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        <Grid className="w-3.5 h-3.5" />
        <span>All Subjects</span>
        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
          selectedSubjectId === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
        }`}>
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
            <span>{subject.name}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              isSelected ? 'bg-brand-700 text-brand-100' : 'bg-slate-100 text-slate-600'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
