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
  const { sessionState, openTopic, toggleBookmark, navigateTo, dashboardSubTab, setDashboardSubTab } = useApp();
  const activeTab: DashboardTab = dashboardSubTab || 'progress';
  const [resourceCount, setResourceCount] = useState<number>(0);
  const [assessedTopicsCount, setAssessedTopicsCount] = useState<number>(0);

  const setActiveTab = (tab: DashboardTab) => {
    setDashboardSubTab(tab);
  };

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
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7]">
        
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'bg-[#111714] text-[#C8F36B] shadow-xs'
              : 'text-[#171C18] hover:bg-[#DFE2D7]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>PROGRESS &amp; EVIDENCE</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'resources'
              ? 'bg-[#111714] text-[#C8F36B] shadow-xs'
              : 'text-[#171C18] hover:bg-[#DFE2D7]'
          }`}
        >
          <FolderArchive className="w-4 h-4" />
          <span>RESOURCE VAULT</span>
          {resourceCount > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'resources' ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#DFE2D7] text-[#171C18]'
            }`}>
              {resourceCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('reassessment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'reassessment'
              ? 'bg-[#111714] text-[#C8F36B] shadow-xs'
              : 'text-[#171C18] hover:bg-[#DFE2D7]'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>REASSESSMENT &amp; GAPS</span>
          {assessedTopicsCount > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'reassessment' ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#DFE2D7] text-[#171C18]'
            }`}>
              {assessedTopicsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'bg-[#111714] text-[#C8F36B] shadow-xs'
              : 'text-[#171C18] hover:bg-[#DFE2D7]'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>SAVED TOPICS</span>
          {savedTopics.length > 0 && (
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeTab === 'bookmarks' ? 'bg-[#C8F36B] text-[#111714]' : 'bg-[#DFE2D7] text-[#171C18]'
            }`}>
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
                <Clock className="w-4 h-4 text-[#111714]" />
                <h3 className="font-display text-lg font-bold text-[#171C18] tracking-tight">
                  Recently Explored Topics
                </h3>
              </div>
              <span className="font-mono text-xs text-[#5E7A65]">
                RESUME SESSION
              </span>
            </div>

            {recentVisitsWithTopics.length === 0 ? (
              <div className="p-8 text-center bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] text-xs text-[#5E7A65]">
                No recent topic history yet. Open any topic from the library to begin.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentVisitsWithTopics.map(({ visit, topic }) => (
                  <div
                    key={topic.id}
                    onClick={() => openTopic(topic.id, visit.lastPathUsed)}
                    className="p-5 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] hover:border-[#8DA391] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-[#5E7A65]">
                        <SubjectBadge subjectId={topic.subjectId} />
                        <span className="font-mono text-[10px]">{visit.lastVisited}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-[#171C18] group-hover:text-[#5E7A65] transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-[#171C18]/70 line-clamp-2">
                        {topic.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DFE2D7] flex items-center justify-between text-xs text-[#171C18]">
                      <span className="font-mono text-[10px] text-[#5E7A65]">
                        PATH: <strong className="text-[#171C18] font-bold">{LEARNING_PATHS[visit.lastPathUsed].shortTitle.toUpperCase()}</strong>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#111714] group-hover:translate-x-1 transition-transform" />
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
              <Bookmark className="w-5 h-5 text-[#111714]" />
              <h3 className="font-display text-xl font-bold text-[#171C18] tracking-tight">
                Bookmarked Topics ({savedTopics.length})
              </h3>
            </div>

            <button
              onClick={() => navigateTo('library')}
              className="font-mono text-xs font-semibold text-[#171C18] hover:text-[#5E7A65] hover:underline cursor-pointer"
            >
              BROWSE LIBRARY &rarr;
            </button>
          </div>

          {savedTopics.length === 0 ? (
            <div className="p-12 text-center bg-[#E8EAE1] rounded-2xl border border-[#DFE2D7] space-y-3">
              <Bookmark className="w-8 h-8 text-[#5E7A65] mx-auto" />
              <p className="text-xs text-[#5E7A65]">
                You haven&apos;t bookmarked any topics yet. Click the bookmark icon on any topic card to save it here.
              </p>
              <button
                onClick={() => navigateTo('library')}
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold text-[#111714] bg-[#C8F36B] hover:bg-[#d6f78a] rounded-xl transition-colors cursor-pointer"
              >
                <span>EXPLORE LIBRARY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-6 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <SubjectBadge subjectId={topic.subjectId} />
                      <button
                        onClick={() => toggleBookmark(topic.id)}
                        className="p-1 text-[#5E7A65] hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <h4
                        onClick={() => openTopic(topic.id)}
                        className="font-display text-base font-bold text-[#171C18] hover:text-[#5E7A65] transition-colors cursor-pointer"
                      >
                        {topic.title}
                      </h4>
                      <p className="text-xs text-[#171C18]/70 line-clamp-2 mt-1">
                        {topic.subtitle}
                      </p>
                    </div>

                    {sessionState.notes[topic.id] && (
                      <div className="p-3 rounded-lg bg-[#F1F1E9] border border-[#DFE2D7] text-xs text-[#171C18] font-serif italic">
                        &ldquo;{sessionState.notes[topic.id]}&rdquo;
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#DFE2D7] flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-[#5E7A65]">{topic.estimatedMinutes} MINS</span>
                    <button
                      onClick={() => openTopic(topic.id)}
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#111714] hover:text-[#5E7A65] cursor-pointer"
                    >
                      <span>OPEN WORKSPACE</span>
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
