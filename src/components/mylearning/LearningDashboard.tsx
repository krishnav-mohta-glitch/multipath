import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Clock,
  ArrowRight,
  Trash2,
  BarChart3,
  FolderArchive,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';
import { LEARNING_PATHS } from '../../data/learningPaths';
import { SubjectBadge } from '../common/Badge';
import { StyleAffinityCard } from './StyleAffinityCard';
import { ResourceLibrarySection } from './ResourceLibrarySection';
import { ReassessmentHistorySection } from './ReassessmentHistorySection';
import { ProgressDashboardSection } from './ProgressDashboardSection';
import { storageService } from '../../services/storageService';

export type DashboardTab = 'progress' | 'resources' | 'reassessment' | 'bookmarks';

export const LearningDashboard: React.FC = () => {
  const { sessionState, openTopic, toggleBookmark, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<DashboardTab>('progress');
  const [resourceCount, setResourceCount] = useState<number>(0);
  const [assessedTopicsCount, setAssessedTopicsCount] = useState<number>(0);

  useEffect(() => {
    const loadCounts = async () => {
      const resources = await storageService.getAllMediaResources();
      setResourceCount(resources.length);

      const historyMap = storageService.getAllTopicHistory();
      const assessed = Object.values(historyMap).filter(
        (h) => h.feynmanAssessments && h.feynmanAssessments.length > 0
      );
      setAssessedTopicsCount(assessed.length);
    };

    loadCounts();
  }, [activeTab]);

  const savedTopics = TOPICS.filter((t) => sessionState.savedTopicIds.includes(t.id));
  const recentVisitsWithTopics = sessionState.recentVisits
    .map((v) => ({
      visit: v,
      topic: TOPICS.find((t) => t.id === v.topicId),
    }))
    .filter((item): item is { visit: typeof item.visit; topic: (typeof TOPICS)[0] } => Boolean(item.topic));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* =================================================================== */}
      {/* DASHBOARD TABS NAVIGATION                                           */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'bg-white text-brand-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Progress & History</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'resources'
              ? 'bg-white text-indigo-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <FolderArchive className="w-4 h-4" />
          <span>Resource Library</span>
          {resourceCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800">
              {resourceCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('reassessment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'reassessment'
              ? 'bg-white text-emerald-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reassessment & Gaps</span>
          {assessedTopicsCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
              {assessedTopicsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'bg-white text-amber-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Bookmarks</span>
          {savedTopics.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
              {savedTopics.length}
            </span>
          )}
        </button>

      </div>

      {/* =================================================================== */}
      {/* TAB 1: PROGRESS & HISTORY                                           */}
      {/* =================================================================== */}
      {activeTab === 'progress' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Grounded Evidence-Based Metrics, Timeline & Privacy Notice */}
          <ProgressDashboardSection
            onNavigateToLibrary={() => navigateTo('library')}
            onOpenTopic={(id) => openTopic(id)}
          />

          {/* Cognitive Profile Section */}
          <StyleAffinityCard preferences={sessionState.preferences} />

          {/* Quick Resumption of Recent Explorations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600" />
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Recently Explored Topics
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Click to resume where you left off
              </span>
            </div>

            {recentVisitsWithTopics.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
                No recent topic history yet. Open any topic from the library to begin!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentVisitsWithTopics.map(({ visit, topic }) => (
                  <div
                    key={topic.id}
                    onClick={() => openTopic(topic.id, visit.lastPathUsed)}
                    className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <SubjectBadge subjectId={topic.subjectId} />
                        <span>{visit.lastVisited}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {topic.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span className="text-[11px] text-slate-500">
                        Last Path: <strong className="text-slate-800">{LEARNING_PATHS[visit.lastPathUsed].shortTitle}</strong>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: RESOURCE LIBRARY                                             */}
      {/* =================================================================== */}
      {activeTab === 'resources' && (
        <ResourceLibrarySection
          onNavigateToLibrary={() => navigateTo('library')}
        />
      )}

      {/* =================================================================== */}
      {/* TAB 3: REASSESSMENT & GAPS                                          */}
      {/* =================================================================== */}
      {activeTab === 'reassessment' && (
        <ReassessmentHistorySection
          onOpenTopic={(id) => openTopic(id)}
        />
      )}

      {/* =================================================================== */}
      {/* TAB 4: SAVED BOOKMARKS                                              */}
      {/* =================================================================== */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Bookmarked Topics ({savedTopics.length})
              </h3>
            </div>

            <button
              onClick={() => navigateTo('library')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline cursor-pointer"
            >
              Browse More in Library
            </button>
          </div>

          {savedTopics.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <Bookmark className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">
                You haven't bookmarked any topics yet. Click the bookmark icon on any topic card to save it here.
              </p>
              <button
                onClick={() => navigateTo('library')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors cursor-pointer"
              >
                <span>Explore Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SubjectBadge subjectId={topic.subjectId} />
                      <button
                        onClick={() => toggleBookmark(topic.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4
                        onClick={() => openTopic(topic.id)}
                        className="text-base font-bold text-slate-900 hover:text-brand-600 transition-colors cursor-pointer"
                      >
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                        {topic.subtitle}
                      </p>
                    </div>

                    {sessionState.notes[topic.id] && (
                      <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 font-serif italic">
                        “{sessionState.notes[topic.id]}”
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{topic.estimatedMinutes} mins</span>
                    <button
                      onClick={() => openTopic(topic.id)}
                      className="inline-flex items-center gap-1 font-bold text-brand-600 hover:text-brand-700 cursor-pointer"
                    >
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
