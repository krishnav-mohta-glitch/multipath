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
      <div className="py-16 px-4 text-center bg-white rounded-2xl border border-slate-200 shadow-xs max-w-lg mx-auto space-y-4">
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
          <SearchX className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">No matching topics found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or subject filters to explore our demonstration library.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg transition-colors"
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
