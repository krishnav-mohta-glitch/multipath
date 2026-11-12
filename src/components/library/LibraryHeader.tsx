import React from 'react';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
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
    <div className="space-y-6 text-left">
      {/* Title & Description */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
          <BookOpen className="w-3.5 h-3.5 text-[#111714]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
            KNOWLEDGE ENVIRONMENT
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight">
          Curated Topic Library
        </h1>
        <p className="text-sm sm:text-base text-[#171C18]/80 max-w-2xl leading-relaxed">
          Explore foundational and intermediate topics across eight academic disciplines. Every topic contains four convergent learning paths, Socratic guided inquiry, and Feynman diagnostic evaluation.
        </p>
      </div>

      {/* Controls row: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#19211C]/45" />
          <input
            type="text"
            placeholder="Search by topic, concept, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#E8EAE1] hover:bg-white focus:bg-white border border-[#19211C]/12 rounded-full text-[#111714] placeholder-[#19211C]/45 focus:outline-none focus:ring-2 focus:ring-[#111714]/15 focus:border-[#111714] shadow-xs transition-all"
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#5E7A65]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
          </div>

          <div className="flex items-center gap-1 bg-[#E8EAE1] p-1 rounded-full border border-[#19211C]/10">
            {(['all', 'Foundational', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#111714] text-[#F3F4EC] shadow-xs font-semibold'
                    : 'text-[#19211C]/70 hover:text-[#111714]'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs text-[#19211C]/70 ml-1">
            <strong>{totalFilteredCount}</strong> {totalFilteredCount === 1 ? 'topic' : 'topics'}
          </div>
        </div>
      </div>
    </div>
  );
};
