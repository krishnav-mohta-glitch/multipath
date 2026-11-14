import React from 'react';
import {
  Compass,
  Layers,
  CheckCircle2,
  Bookmark,
  FolderArchive,
  GraduationCap,
  HardDrive,
  Cloud,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';

interface TrajectoryOverviewProps {
  topicsExploredCount: number;
  totalTopicsCount: number;
  pathsExploredCount: number;
  completedTopicsCount: number;
  bookmarksCount: number;
  resourcesCount: number;
  isGuest: boolean;
  preferredBoard?: CurriculumBoardCode | null;
  preferredClass?: ClassLevel | null;
  onExploreClick: () => void;
}

export const TrajectoryOverview: React.FC<TrajectoryOverviewProps> = ({
  topicsExploredCount,
  totalTopicsCount,
  pathsExploredCount,
  completedTopicsCount,
  bookmarksCount,
  resourcesCount,
  isGuest,
  preferredBoard,
  preferredClass,
  onExploreClick,
}) => {
  const explorationPct = totalTopicsCount > 0 ? Math.round((topicsExploredCount / totalTopicsCount) * 100) : 0;

  return (
    <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6 shadow-xl relative overflow-hidden text-left">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-40 bg-[#B8FF00]/03 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry and profile strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#B8FF00] border border-slate-700 flex items-center justify-center shadow-inner">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                EMPIRICAL TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
            </div>
            <h2 className="font-display text-lg font-bold text-[#FAF9F5] tracking-tight">
              Learning Trajectory &amp; Competency State
            </h2>
          </div>
        </div>

        {/* Persistence Status & Curriculum Profile Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {preferredBoard && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-medium">
              <GraduationCap className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{preferredBoard} {preferredClass ? `Class ${preferredClass}` : ''}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 text-slate-300 border border-slate-800 text-xs font-mono">
            {isGuest ? (
              <>
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>Guest Sovereign (IndexedDB)</span>
              </>
            ) : (
              <>
                <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloud Synchronized (RLS Vault)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Real telemetry metric HUD grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
        {/* Topics Explored */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Topics Explored</span>
            <Compass className="w-3.5 h-3.5 text-[#B8FF00]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-[#FAF9F5]">{topicsExploredCount}</span>
            <span className="text-slate-500 font-mono text-xs">/ {totalTopicsCount}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">{explorationPct}% of full syllabus</div>
        </div>

        {/* Epistemic Paths Explored */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Paths Explored</span>
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-[#38BDF8]">{pathsExploredCount}</span>
            <span className="text-slate-500 font-mono text-xs">/ 4 paths</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Parallel perspectives</div>
        </div>

        {/* Topics Assessed / Completed */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-emerald-400">{completedTopicsCount}</span>
            <span className="text-slate-500 font-mono text-xs">mastered</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Rigorous evaluations</div>
        </div>

        {/* In-Progress Topics */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>In Progress</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-amber-400">
              {Math.max(0, topicsExploredCount - completedTopicsCount)}
            </span>
            <span className="text-slate-500 font-mono text-xs">active</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Ready to resume</div>
        </div>

        {/* Saved Bookmarks */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Saved Topics</span>
            <Bookmark className="w-3.5 h-3.5 text-[#B8FF00]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-[#FAF9F5]">{bookmarksCount}</span>
            <span className="text-slate-500 font-mono text-xs">pinned</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Trajectory queue</div>
        </div>

        {/* Generated Resources */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            <span>Media Vault</span>
            <FolderArchive className="w-3.5 h-3.5 text-[#38BDF8]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-mono text-xl font-bold text-[#38BDF8]">{resourcesCount}</span>
            <span className="text-slate-500 font-mono text-xs">artifacts</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">Audio, maps, stories</div>
        </div>
      </div>

      {/* Progress Bar & Quick Action */}
      <div className="space-y-2 relative z-10 pt-1">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Curriculum Mastery Breadth</span>
          <div className="flex items-center gap-3">
            <span className="text-[#B8FF00] font-bold">{explorationPct}% Explored</span>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-[#B8FF00] transition-colors"
            >
              <span>Explore More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#38BDF8] to-[#B8FF00] rounded-full transition-all duration-500"
            style={{ width: `${Math.max(4, explorationPct)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
