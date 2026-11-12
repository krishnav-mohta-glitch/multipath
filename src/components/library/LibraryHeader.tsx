import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { DifficultyLevel } from '../../types/topic';

interface LibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
  totalFilteredCount: number;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  totalFilteredCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Title & Description */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Learning Library
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore foundational and intermediate topics across 8 academic subjects. Each topic can be navigated through 4 complementary learning methods.
        </p>
      </div>

      {/* Controls row: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search by topic name, concept, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-xs"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 'Foundational', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-600 font-medium ml-2">
            <strong>{totalFilteredCount}</strong> {totalFilteredCount === 1 ? 'topic' : 'topics'}
          </div>
        </div>
      </div>
    </div>
  );
};
