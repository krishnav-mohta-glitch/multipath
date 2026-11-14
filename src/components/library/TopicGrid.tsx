import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import type { Topic } from '../../types/topic';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';
import { TopicCard } from './TopicCard';

interface TopicGridProps {
  topics: Topic[];
  selectedBoard?: CurriculumBoardCode | 'all';
  selectedClass?: ClassLevel | 'all';
  onResetFilters: () => void;
}

export const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  selectedBoard = 'all',
  selectedClass = 'all',
  onResetFilters,
}) => {
  if (topics.length === 0) {
    return (
      <div className="py-20 px-6 text-center bg-slate-900/60 rounded-3xl border border-slate-800 shadow-xl max-w-lg mx-auto space-y-5 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-2xl bg-slate-800 text-[#B8FF00] border border-slate-700/80 flex items-center justify-center mx-auto shadow-inner">
          <SearchX className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-xl font-bold text-[#FAF9F5]">
            No matching topics found
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            No curriculum topics match your current combination of examination board, class level, subject, or search term.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-[#B8FF00] hover:bg-[#a6e600] rounded-xl transition-all shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            selectedBoard={selectedBoard}
            selectedClass={selectedClass}
          />
        ))}
      </div>
    </div>
  );
};
