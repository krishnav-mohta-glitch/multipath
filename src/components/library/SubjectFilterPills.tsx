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
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
          selectedSubjectId === 'all'
            ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
            : 'bg-[#E8EAE1] text-[#19211C] hover:bg-[#DFE2D7] border border-[#19211C]/10'
        }`}
      >
        <Grid className="w-3.5 h-3.5" />
        <span>All Disciplines</span>
        <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
          selectedSubjectId === 'all' ? 'bg-[#C8F36B] text-[#111714] font-bold' : 'bg-[#19211C]/10 text-[#111714]'
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
            className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                : 'bg-[#E8EAE1] text-[#19211C] hover:bg-[#DFE2D7] border border-[#19211C]/10'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C8F36B]' : 'text-[#19211C]/60'}`} />
            <span>{subject.name}</span>
            <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
              isSelected ? 'bg-[#C8F36B] text-[#111714] font-bold' : 'bg-[#19211C]/10 text-[#111714]'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
