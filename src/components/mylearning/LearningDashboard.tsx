import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Clock,
  ArrowRight,
  Trash2,
  BarChart3,
  FolderArchive,
  RotateCcw,
  Sparkles,
  Download,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { TOPICS } from '../../data/topics';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { StyleAffinityCard } from './StyleAffinityCard';
import { ResourceLibrarySection } from './ResourceLibrarySection';
import { ReassessmentHistorySection } from './ReassessmentHistorySection';
import { storageService } from '../../services/storageService';
import type { LearningActivityItem, TopicHistoryRecord } from '../../types/history';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';
import type { SubjectId } from '../../types/subject';
import { TrajectoryOverview } from '../trajectory/TrajectoryOverview';
import { TrajectoryTimeline } from '../trajectory/TrajectoryTimeline';
import { SubjectProgressMatrix } from '../trajectory/SubjectProgressMatrix';
import { TopicResumptionDeck } from '../trajectory/TopicResumptionDeck';

export type DashboardTab = 'progress' | 'resources' | 'reassessment' | 'bookmarks' | 'affinities';

export const LearningDashboard: React.FC = () => {
  const {
    sessionState,
    openTopic,
    toggleBookmark,
    navigateTo,
    dashboardSubTab,
    setDashboardSubTab,
    setSelectedSubjectId,
  } = useApp();
  const { user, profile, isGuest, openGuestImportModal } = useAuth();

  const activeTab: DashboardTab = (dashboardSubTab as DashboardTab) || 'progress';

  const [activities, setActivities] = useState<LearningActivityItem[]>([]);
  const [topicHistories, setTopicHistories] = useState<Record<string, TopicHistoryRecord>>({});
  const [resourceCount, setResourceCount] = useState<number>(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const loadData = async () => {
    const actList = await storageService.getAllActivities();
    const thMap = storageService.getAllTopicHistory();
    const resources = await storageService.getAllMediaResources();

    setActivities(actList);
    setTopicHistories(thMap);
    setResourceCount(resources.length);
  };

  useEffect(() => {
    let isMounted = true;
    void (async () => {
      const actList = await storageService.getAllActivities();
      const thMap = storageService.getAllTopicHistory();
      const resources = await storageService.getAllMediaResources();
      if (isMounted) {
        setActivities(actList);
        setTopicHistories(thMap);
        setResourceCount(resources.length);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [activeTab]);

  const setActiveTab = (tab: DashboardTab) => {
    setDashboardSubTab(tab as any);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const jsonString = await storageService.exportAllDataAsJSON(profile as Record<string, unknown> | null);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `multipath-trajectory-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setFeedbackNotice('Data successfully exported to sovereign JSON vault.');
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (e) {
      console.error(e);
      setFeedbackNotice('Export failed. Please check browser permissions.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to delete all local learning records, Socratic logs, Feynman assessments, and generated media? This cannot be undone.')) {
      setIsClearing(true);
      try {
        await storageService.clearAllLearningData();
        await loadData();
        setFeedbackNotice('All local learning records have been cleared.');
        setTimeout(() => setFeedbackNotice(null), 4000);
      } catch (e) {
        console.error(e);
      } finally {
        setIsClearing(false);
      }
    }
  };

  const handleSelectSubjectToExplore = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    navigateTo('library');
  };

  // Derive ground-truth counts
  const topicsExploredCount = Object.keys(topicHistories).length;
  const pathsExploredSet = new Set<string>();
  activities.forEach((act) => {
    if (act.pathId) pathsExploredSet.add(act.pathId);
  });
  const pathsExploredCount = Math.max(pathsExploredSet.size, topicsExploredCount > 0 ? 1 : 0);

  const completedTopicsCount = Object.values(topicHistories).filter(
    (th) => th.feynmanAssessments && th.feynmanAssessments.length > 0
  ).length;

  const preferredBoard: CurriculumBoardCode | null =
    profile?.preferred_board === 'CBSE'
      ? 'CBSE'
      : profile?.preferred_board === 'ICSE/CISCE'
      ? 'CISCE'
      : null;

  const profileGradeMatch = profile?.grade_level?.match(/Class\s*(\d+)/i);
  const preferredClass: ClassLevel | null = profileGradeMatch
    ? (parseInt(profileGradeMatch[1], 10) as ClassLevel)
    : null;

  const savedTopics = TOPICS.filter((t) => sessionState.savedTopicIds.includes(t.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-200 text-left">
      {/* Feedback Toast */}
      {feedbackNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{feedbackNotice}</span>
          </div>
          <button onClick={() => setFeedbackNotice(null)} className="text-emerald-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Guest Data Import Banner (when authenticated and guest records exist) */}
      {user && storageService.hasGuestData() && (
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-[#B8FF00] border border-slate-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#FAF9F5]">Unsynchronized Guest Data Detected</h4>
              <p className="text-xs text-slate-400">
                You have learning history, Feynman assessments, or media generated as a guest. Synchronize them into your authenticated account.
              </p>
            </div>
          </div>
          <button
            onClick={openGuestImportModal}
            className="px-4 py-2 rounded-xl bg-[#B8FF00] text-slate-950 font-bold text-xs hover:bg-[#a6e600] transition-colors shrink-0 shadow-sm"
          >
            Import to Account
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* DASHBOARD TABS NAVIGATION                                           */}
      {/* =================================================================== */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
            activeTab === 'progress'
              ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
              : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>PROGRESS &amp; TRAJECTORY</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
            activeTab === 'resources'
              ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
              : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
          }`}
        >
          <FolderArchive className="w-4 h-4" />
          <span>RESOURCE VAULT</span>
          {resourceCount > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                activeTab === 'resources'
                  ? 'bg-slate-950 text-[#B8FF00]'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {resourceCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('reassessment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
            activeTab === 'reassessment'
              ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
              : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>REASSESSMENT MATRIX</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
            activeTab === 'bookmarks'
              ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
              : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>SAVED TOPICS</span>
          {sessionState.savedTopicIds.length > 0 && (
            <span
              className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                activeTab === 'bookmarks'
                  ? 'bg-slate-950 text-[#B8FF00]'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {sessionState.savedTopicIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('affinities')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
            activeTab === 'affinities'
              ? 'bg-[#B8FF00] text-slate-950 border-[#B8FF00] shadow-sm font-bold'
              : 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800 border-transparent'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>COGNITIVE PROFILE</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB CONTENT RENDERING                                               */}
      {/* =================================================================== */}

      {/* 1. PROGRESS & TRAJECTORY VIEW */}
      {activeTab === 'progress' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <TrajectoryOverview
            topicsExploredCount={topicsExploredCount}
            totalTopicsCount={TOPICS.length}
            pathsExploredCount={pathsExploredCount}
            completedTopicsCount={completedTopicsCount}
            bookmarksCount={sessionState.savedTopicIds.length}
            resourcesCount={resourceCount}
            isGuest={isGuest}
            preferredBoard={preferredBoard}
            preferredClass={preferredClass}
            onExploreClick={() => navigateTo('library')}
          />

          <TopicResumptionDeck
            recentVisits={sessionState.recentVisits}
            onOpenTopic={openTopic}
            onExploreLibrary={() => navigateTo('library')}
          />

          <SubjectProgressMatrix
            topicHistories={topicHistories}
            onSelectSubjectToExplore={handleSelectSubjectToExplore}
          />

          <TrajectoryTimeline
            activities={activities}
            onOpenTopic={openTopic}
            onNavigateToLibrary={() => navigateTo('library')}
          />

          {/* Sovereign Data Vault Controls */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8FF00]" />
                <h4 className="font-display text-sm font-bold text-[#FAF9F5]">
                  Sovereign Data Portability &amp; Vault Controls
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your learning trajectory, Feynman assessments, and generated artifacts belong exclusively to you. Export your complete encrypted JSON record at any time.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                onClick={handleExportData}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{isExporting ? 'Exporting...' : 'Export JSON Vault'}</span>
              </button>

              <button
                onClick={handleClearData}
                disabled={isClearing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 text-xs font-semibold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. RESOURCE VAULT VIEW */}
      {activeTab === 'resources' && (
        <ResourceLibrarySection onNavigateToLibrary={() => navigateTo('library')} />
      )}

      {/* 3. REASSESSMENT MATRIX VIEW */}
      {activeTab === 'reassessment' && (
        <ReassessmentHistorySection onOpenTopic={openTopic} />
      )}

      {/* 4. SAVED BOOKMARKS VIEW */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#B8FF00]" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#B8FF00]">
                TRAJECTORY QUEUE
              </span>
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-[#FAF9F5] tracking-tight">
              Pinned Curriculum Topics ({savedTopics.length})
            </h3>
            <p className="text-xs text-slate-400">
              Curriculum topics saved for later investigation. Launch directly into any topic workspace.
            </p>
          </div>

          {savedTopics.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="font-display text-sm font-bold text-[#FAF9F5]">No Pinned Topics Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click the bookmark ribbon on any topic card in the Curriculum Explorer to save it here for later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => openTopic(topic.id)}
                  className="p-5 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SubjectBadge subjectId={topic.subjectId} />
                        <DifficultyBadge difficulty={topic.difficulty} />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(topic.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[#B8FF00] hover:bg-slate-800 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h4 className="font-display text-sm font-bold text-[#FAF9F5] group-hover:text-[#B8FF00] transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {topic.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-semibold text-[#B8FF00]">
                    <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{topic.estimatedMinutes}m</span>
                    </div>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. COGNITIVE AFFINITIES VIEW */}
      {activeTab === 'affinities' && (
        <StyleAffinityCard preferences={sessionState.preferences} />
      )}
    </div>
  );
};
