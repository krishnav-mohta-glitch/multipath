import React, { useRef, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Compass,
  X,
  Box,
  CheckCircle2,
  Cpu,
  Grid,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import type { DifficultyLevel } from '../../types/topic';
import {
  CURATED_COLLECTIONS,
  type CuratedCollectionId,
  type TopicSortOption,
} from '../../utils/curriculumDiscovery';

interface LibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
  selectedCollection: CuratedCollectionId;
  onCollectionChange: (col: CuratedCollectionId) => void;
  selectedSort: TopicSortOption;
  onSortChange: (sort: TopicSortOption) => void;
  totalFilteredCount: number;
  totalTopicsCount: number;
  interactiveCount: number;
  verifiedCount: number;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCollection,
  onCollectionChange,
  selectedSort,
  onSortChange,
  totalFilteredCount,
  totalTopicsCount,
  interactiveCount,
  verifiedCount,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut to focus search with '/' or 'Cmd+K' / 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement?.tagName || ''))
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const collectionIconMap: Record<string, React.FC<{ className?: string }>> = {
    Grid,
    Box,
    Compass,
    CheckCircle2,
    Cpu,
  };

  return (
    <div className="relative space-y-6 text-left">
      {/* Title, Badge & Telemetry Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-800/80">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
            <Compass className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
              CURRICULUM EXPLORATION PROTOCOL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF9F5] tracking-tight">
            Scientific Curriculum Library
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Explore 64 structured topics across 8 academic disciplines aligned with CBSE &amp; CISCE Classes 6–10.
            Every topic contains four convergent learning paths, interactive simulations, and diagnostic Socratic assessment.
          </p>
        </div>

        {/* Telemetry HUD metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2.5 shrink-0">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Total Catalog</div>
            <div className="font-mono text-lg font-bold text-[#FAF9F5] mt-0.5">{totalTopicsCount}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">In View</div>
            <div className="font-mono text-lg font-bold text-[#B8FF00] mt-0.5">{totalFilteredCount}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Box className="w-3 h-3 text-[#38BDF8]" />
              <span>3D Labs</span>
            </div>
            <div className="font-mono text-lg font-bold text-[#38BDF8] mt-0.5">{interactiveCount}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Verified</span>
            </div>
            <div className="font-mono text-lg font-bold text-emerald-400 mt-0.5">{verifiedCount}</div>
          </div>
        </div>
      </div>

      {/* Curated Collection Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
          <span>Curated:</span>
        </span>
        {CURATED_COLLECTIONS.map((col) => {
          const IconComponent = collectionIconMap[col.iconName] || Grid;
          const isSelected = selectedCollection === col.id;
          return (
            <button
              key={col.id}
              onClick={() => onCollectionChange(col.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
                  : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
              }`}
              title={col.description}
            >
              <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-400'}`} />
              <span>{col.shortTitle}</span>
              {col.id === 'interactive-sims' && (
                <span className={`px-1.5 py-0.2 rounded-full font-mono text-[9px] ${
                  isSelected ? 'bg-slate-950 text-[#B8FF00]' : 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30'
                }`}>
                  3D
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Controls row: Search, Difficulty Tabs & Sort Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-1">
        {/* Search Bar (Left/Center) */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search topic title, concept, syllabus unit, or alias (e.g. 'photosynthesis', 'algebra')..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-20 py-2.5 text-xs bg-slate-900/90 hover:bg-slate-900 focus:bg-slate-950 border border-slate-700/80 focus:border-[#B8FF00] rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#B8FF00] transition-all shadow-inner"
            aria-label="Search curriculum topics"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                /
              </kbd>
            </div>
          )}
        </div>

        {/* Difficulty Filter Tabs */}
        <div className="lg:col-span-4 flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Difficulty:</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {(['all', 'Foundational', 'Intermediate', 'Advanced'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-[#FAF9F5] text-slate-950 shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Selector */}
        <div className="lg:col-span-3 flex items-center justify-start lg:justify-end gap-2">
          <label htmlFor="topic-sort-select" className="flex items-center gap-1 font-mono text-[11px] text-slate-400 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </label>
          <select
            id="topic-sort-select"
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as TopicSortOption)}
            className="bg-slate-900/90 text-slate-200 text-xs border border-slate-700/80 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#B8FF00] focus:border-[#B8FF00] cursor-pointer"
          >
            <option value="default">Curriculum Order</option>
            <option value="duration-asc">Duration (Fastest)</option>
            <option value="duration-desc">Duration (In-depth)</option>
            <option value="alphabetical">Alphabetical (A–Z)</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
      </div>
    </div>
  );
};
