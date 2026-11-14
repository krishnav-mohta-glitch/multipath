import React from 'react';
import {
  GraduationCap,
  Layers,
  Sparkles,
  CheckCircle2,
  Filter,
  RotateCcw,
  X,
} from 'lucide-react';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';
import { useAuth } from '../../context/useAuth';

interface CurriculumFilterBarProps {
  selectedBoard: CurriculumBoardCode | 'all';
  onSelectBoard: (board: CurriculumBoardCode | 'all') => void;
  selectedClass: ClassLevel | 'all';
  onSelectClass: (classLevel: ClassLevel | 'all') => void;
  filteredCount: number;
  totalCount: number;
  onReset?: () => void;
}

export const CurriculumFilterBar: React.FC<CurriculumFilterBarProps> = ({
  selectedBoard,
  onSelectBoard,
  selectedClass,
  onSelectClass,
  filteredCount,
  totalCount,
  onReset,
}) => {
  const { profile, isGuest } = useAuth();

  // Normalize student profile preferences
  const profileBoard: CurriculumBoardCode | null =
    profile?.preferred_board === 'CBSE'
      ? 'CBSE'
      : profile?.preferred_board === 'ICSE/CISCE'
      ? 'CISCE'
      : null;

  const profileGradeMatch = profile?.grade_level?.match(/Class\s*(\d+)/i);
  const profileClass: ClassLevel | null = profileGradeMatch
    ? (parseInt(profileGradeMatch[1], 10) as ClassLevel)
    : null;

  const hasProfilePreference = !!(profileBoard || profileClass);
  const isMatchingProfile =
    hasProfilePreference &&
    (profileBoard ? selectedBoard === profileBoard : true) &&
    (profileClass ? selectedClass === profileClass : true);

  const applyProfilePreferences = () => {
    if (profileBoard) onSelectBoard(profileBoard);
    if (profileClass) onSelectClass(profileClass);
  };

  const isFiltering = selectedBoard !== 'all' || selectedClass !== 'all';
  const classOptions: ClassLevel[] = [6, 7, 8, 9, 10];

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800/90 p-4 sm:p-5 space-y-4 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Decorative subtle ambient highlight */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-[#B8FF00]/03 rounded-full blur-3xl pointer-events-none" />

      {/* Top Row: Title, Profile Synced Badge & Filter Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-[#B8FF00] flex items-center justify-center border border-slate-700/80 shadow-inner">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-[#FAF9F5] tracking-tight flex items-center gap-2">
              <span>Curriculum Framework</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-medium">
                CBSE &amp; CISCE / ICSE
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Verified syllabus provenance across secondary education (Classes 6–10)
            </p>
          </div>
        </div>

        {/* Profile Sync Shortcut or Counter */}
        <div className="flex items-center gap-2 flex-wrap">
          {!isGuest && hasProfilePreference && !isMatchingProfile && (
            <button
              onClick={applyProfilePreferences}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B8FF00] text-slate-950 hover:bg-[#a6e600] text-xs font-semibold transition-all shadow-sm"
              title="Apply board and grade from your student profile"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Sync Profile ({profileBoard === 'CISCE' ? 'ICSE' : profileBoard}{' '}
                {profileClass ? `Cl. ${profileClass}` : ''})
              </span>
            </button>
          )}

          {!isGuest && isMatchingProfile && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Profile Aligned</span>
            </div>
          )}

          {isFiltering && onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
              title="Reset curriculum filter"
            >
              <RotateCcw className="w-3 h-3 text-slate-400" />
              <span>Reset Board/Class</span>
            </button>
          )}

          <div className="font-mono text-xs text-slate-400 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800">
            <span className="font-bold text-[#FAF9F5]">{filteredCount}</span>
            <span className="text-slate-500"> / {totalCount} topics</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Board Selector & Class Selector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 relative z-10">
        {/* Board Selection */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#38BDF8]" />
            <span>Examination Board</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onSelectBoard('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedBoard === 'all'
                  ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-sm'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              All Boards
            </button>
            <button
              onClick={() => onSelectBoard('CBSE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedBoard === 'CBSE'
                  ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              CBSE (Central Board)
            </button>
            <button
              onClick={() => onSelectBoard('CISCE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedBoard === 'CISCE'
                  ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8] shadow-sm font-bold'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              ICSE / CISCE
            </button>
          </div>
        </div>

        {/* Class / Grade Selection */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3 h-3 text-[#B8FF00]" />
            <span>Target Class Level</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onSelectClass('all')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedClass === 'all'
                  ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-sm'
                  : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
              }`}
            >
              All Classes
            </button>
            {classOptions.map((c) => {
              const isSelected = selectedClass === c;
              return (
                <button
                  key={c}
                  onClick={() => onSelectClass(c)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-slate-100 text-slate-950 border-slate-100 shadow-sm font-bold'
                      : 'bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  Class {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {isFiltering && (
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60 flex-wrap relative z-10">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Active:</span>
          {selectedBoard !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs">
              <span>Board: {selectedBoard}</span>
              <button
                onClick={() => onSelectBoard('all')}
                className="hover:text-[#B8FF00]"
                title="Remove board filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedClass !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs">
              <span>Grade: Class {selectedClass}</span>
              <button
                onClick={() => onSelectClass('all')}
                className="hover:text-[#B8FF00]"
                title="Remove class filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
