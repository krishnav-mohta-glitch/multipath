import React from 'react';
import {
  GraduationCap,
  Layers,
  Sparkles,
  CheckCircle2,
  Filter,
  RotateCcw,
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
    <div className="bg-[#E8EAE1] rounded-3xl border border-[#19211C]/12 p-4 sm:p-5 space-y-4 shadow-xs">
      {/* Top Row: Title, Profile Synced Badge & Filter Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#111714] text-[#C8F36B] flex items-center justify-center shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-[#111714] tracking-tight flex items-center gap-2">
              <span>Curriculum Framework</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#111714]/08 text-[#111714] border border-[#19211C]/10 font-normal">
                ICSE/CISCE & CBSE
              </span>
            </h3>
            <p className="text-xs text-[#5F6B62]">
              Aligned with verified official syllabuses for Classes 6–10
            </p>
          </div>
        </div>

        {/* Profile Sync Shortcut or Counter */}
        <div className="flex items-center gap-2">
          {!isGuest && hasProfilePreference && !isMatchingProfile && (
            <button
              onClick={applyProfilePreferences}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111714] text-[#C8F36B] hover:bg-black text-xs font-semibold transition-all shadow-xs"
              title="Apply board and grade from your student profile"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Use My Profile ({profileBoard === 'CISCE' ? 'ICSE' : profileBoard}{' '}
                {profileClass ? `Cl. ${profileClass}` : ''})
              </span>
            </button>
          )}

          {!isGuest && isMatchingProfile && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C8F36B]/30 border border-[#C8F36B] text-[#111714] font-mono text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#111714]" />
              <span>Profile Aligned</span>
            </div>
          )}

          {isFiltering && onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/70 hover:bg-white text-[#19211C] border border-[#19211C]/10 text-xs font-medium transition-all"
              title="Reset curriculum filter"
            >
              <RotateCcw className="w-3 h-3 text-[#5F6B62]" />
              <span>Reset</span>
            </button>
          )}

          <div className="font-mono text-xs text-[#5F6B62] px-2.5 py-1 rounded-lg bg-[#DFE2D7] border border-[#19211C]/08">
            <span className="font-bold text-[#111714]">{filteredCount}</span>
            <span className="text-[#19211C]/50"> / {totalCount} topics</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Board Selector & Class Selector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
        {/* Board Selection */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[#5F6B62] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#111714]" />
            <span>Examination Board</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onSelectBoard('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBoard === 'all'
                  ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                  : 'bg-white/80 text-[#19211C] hover:bg-white border border-[#19211C]/10'
              }`}
            >
              All Boards
            </button>
            <button
              onClick={() => onSelectBoard('CBSE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBoard === 'CBSE'
                  ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                  : 'bg-white/80 text-[#19211C] hover:bg-white border border-[#19211C]/10'
              }`}
            >
              CBSE
            </button>
            <button
              onClick={() => onSelectBoard('CISCE')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedBoard === 'CISCE'
                  ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                  : 'bg-white/80 text-[#19211C] hover:bg-white border border-[#19211C]/10'
              }`}
            >
              ICSE / CISCE
            </button>
          </div>
        </div>

        {/* Class / Grade Selection */}
        <div className="md:col-span-6 space-y-1.5">
          <label className="text-[11px] font-mono font-medium text-[#5F6B62] uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#111714]" />
            <span>Target Class (Grades 6–10)</span>
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onSelectClass('all')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedClass === 'all'
                  ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                  : 'bg-white/80 text-[#19211C] hover:bg-white border border-[#19211C]/10'
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
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#111714] text-[#F3F4EC] shadow-xs'
                      : 'bg-white/80 text-[#19211C] hover:bg-white border border-[#19211C]/10'
                  }`}
                >
                  Class {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
