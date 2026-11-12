import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import type { Topic } from '../../types/topic';
import { TopicCard } from './TopicCard';

interface TopicGridProps {
  topics: Topic[];
  onResetFilters: () => void;
}

export const TopicGrid: React.FC<TopicGridProps> = ({ topics, onResetFilters }) => {
  if (topics.length === 0) {
    return (
      <div className="py-20 px-6 text-center bg-[#E8EAE1] rounded-3xl border border-[#19211C]/15 shadow-xs max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#111714] text-[#C8F36B] flex items-center justify-center mx-auto">
          <SearchX className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-[#111714]">No matching topics found</h3>
          <p className="text-xs text-[#5F6B62] max-w-sm mx-auto leading-relaxed">
            Try adjusting your search query or discipline filter to discover relevant principles.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] rounded-full transition-all shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset all filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
};
