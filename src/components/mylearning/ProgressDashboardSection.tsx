import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  Trash2,
  ShieldCheck,
  Sparkles,
  GitFork,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { storageService } from '../../services/storageService';
import type { LearningActivityItem, TopicHistoryRecord } from '../../types/history';
import { SubjectBadge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

interface ProgressDashboardSectionProps {
  onNavigateToLibrary: () => void;
  onOpenTopic: (topicId: string) => void;
}

export const ProgressDashboardSection: React.FC<ProgressDashboardSectionProps> = ({
  onNavigateToLibrary,
  onOpenTopic
}) => {
  const { user, profile, openGuestImportModal } = useAuth();
  const [activities, setActivities] = useState<LearningActivityItem[]>([]);
  const [topicHistories, setTopicHistories] = useState<Record<string, TopicHistoryRecord>>({});
  const [storageStats, setStorageStats] = useState<{
    activitiesCount: number;
    topicsExploredCount: number;
    assessmentsCount: number;
    mediaResourcesCount: number;
    storageType: string;
    hasIndexedDB: boolean;
  }>({
    activitiesCount: 0,
    topicsExploredCount: 0,
    assessmentsCount: 0,
    mediaResourcesCount: 0,
    storageType: 'Detecting...',
    hasIndexedDB: true
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const refreshData = async () => {
    const actList = await storageService.getAllActivities();
    const thMap = storageService.getAllTopicHistory();
    const stats = await storageService.getStorageStats();

    setActivities(actList);
    setTopicHistories(thMap);
    setStorageStats(stats);
  };

  useEffect(() => {
    let active = true;
    void (async () => {
      const actList = await storageService.getAllActivities();
      const thMap = storageService.getAllTopicHistory();
      const stats = await storageService.getStorageStats();
      if (active) {
        setActivities(actList);
        setTopicHistories(thMap);
        setStorageStats(stats);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Compute Grounded Metrics
  const topicsExplored = Object.keys(topicHistories).length;
  
  // Topics revisited (visited > 1 time, or having multiple assessments)
  const topicsRevisited = Object.values(topicHistories).filter(
    (th) => th.visitCount > 1 || (th.feynmanAssessments && th.feynmanAssessments.length > 1)
  ).length;

  // Concepts Demonstrated across latest assessments
  const demonstratedConceptsSet = new Set<string>();
  const gapConceptsSet = new Set<string>();

  Object.values(topicHistories).forEach((th) => {
    if (th.feynmanAssessments && th.feynmanAssessments.length > 0) {
      const latest = th.feynmanAssessments[th.feynmanAssessments.length - 1].assessment;
      latest.conceptAssessments?.forEach((c) => {
        if (c.status === 'demonstrated') {
          demonstratedConceptsSet.add(`${th.topicTitle}: ${c.name}`);
        } else {
          gapConceptsSet.add(`${th.topicTitle}: ${c.name}`);
        }
      });
      latest.knowledgeGapReport?.conceptsNeedingClarification?.forEach((c) => {
        gapConceptsSet.add(`${th.topicTitle}: ${c.name}`);
      });
    }
  });

  const conceptsDemonstratedCount = demonstratedConceptsSet.size;
  const conceptsRequiringWorkCount = gapConceptsSet.size;

  // Export JSON backup
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const jsonString = await storageService.exportAllDataAsJSON(profile as Record<string, unknown> | null);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `multipath-learning-history-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setFeedbackNotice('Data successfully exported to JSON file.');
      setTimeout(() => setFeedbackNotice(null), 4000);
    } catch (e) {
      console.error(e);
      setFeedbackNotice('Export failed. Please check browser permissions.');
    } finally {
      setIsExporting(false);
    }
  };

  // Clear data
  const handleClearData = async () => {
    if (window.confirm('Are you sure you want to delete all local learning records, Socratic logs, Feynman assessments, and generated media? This cannot be undone.')) {
      setIsClearing(true);
      try {
        await storageService.clearAllLearningData();
        await refreshData();
        setFeedbackNotice('All local learning records have been cleared.');
        setTimeout(() => setFeedbackNotice(null), 4000);
      } catch (e) {
        console.error(e);
      } finally {
        setIsClearing(false);
      }
    }
  };

  const getActivityIcon = (type: LearningActivityItem['type']) => {
    switch (type) {
      case 'topic-opened':
        return <BookOpen className="w-3.5 h-3.5 text-blue-600" />;
      case 'path-changed':
        return <Layers className="w-3.5 h-3.5 text-purple-600" />;
      case 'discovery-session':
        return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
      case 'feynman-explanation':
      case 'feynman-assessed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'media-generated':
        return <GitFork className="w-3.5 h-3.5 text-indigo-600" />;
      case 'resource-deleted':
        return <Trash2 className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const privacyNotice = storageService.getPrivacyNotice();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Feedback Toast */}
      {feedbackNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackNotice}</span>
          </div>
          <button onClick={() => setFeedbackNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            Dismiss
          </button>
        </div>
      )}

      {/* Guest Data Import Banner (when authenticated and guest records exist) */}
      {user && storageService.hasGuestData() && (
        <div className="p-4 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#111714] text-[#C8F36B] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#171C18]">
                Guest Learning Stream Detected
              </h4>
              <p className="text-xs text-[#171C18]/70">
                You have unimported bookmarks and activities saved locally on this browser.
              </p>
            </div>
          </div>
          <button
            onClick={openGuestImportModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111714] text-[#C8F36B] font-mono text-xs font-bold hover:bg-[#111714]/90 transition-colors cursor-pointer shrink-0"
          >
            <span>IMPORT TO ACCOUNT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* 1. GROUNDED METRICS CARDS (No arbitrary streaks or XP)             */}
      {/* =================================================================== */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Evidence-Based Learning Metrics
            </h3>
            <p className="text-xs text-slate-500">
              Grounded exclusively in your observed understanding and recorded sessions—no artificial streaks or points.
            </p>
          </div>
          <div className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            {user ? 'Cloud Sync (PostgreSQL RLS)' : 'Local Browser Storage'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Topics Explored */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Topics Explored</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900">{topicsExplored}</div>
              <p className="text-[11px] text-slate-500 mt-1">Unique concepts studied</p>
            </div>
          </div>

          {/* Card 2: Topics Revisited */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Topics Revisited</span>
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900">{topicsRevisited}</div>
              <p className="text-[11px] text-slate-500 mt-1">Re-explored for deeper mastery</p>
            </div>
          </div>

          {/* Card 3: Concepts Demonstrated */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concepts Demonstrated</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900">{conceptsDemonstratedCount}</div>
              <p className="text-[11px] text-slate-500 mt-1">Confirmed with verbatim evidence</p>
            </div>
          </div>

          {/* Card 4: Concepts Requiring Further Work */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concepts Needing Work</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-3xl font-extrabold text-slate-900">{conceptsRequiringWorkCount}</div>
              <p className="text-[11px] text-slate-500 mt-1">Active diagnostic gaps</p>
            </div>
          </div>

        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. RECENT STUDY ACTIVITY TIMELINE                                  */}
      {/* =================================================================== */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recent Study Activity Timeline
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Recorded chronological events ({activities.length})
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="py-8 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No activity recorded yet. Explore a topic, switch learning paths, or complete a Socratic session to build your learning stream.
            </p>
            <button
              onClick={onNavigateToLibrary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold text-xs"
            >
              <span>Explore Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
            {activities.slice(0, 50).map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-slate-100 mt-0.5 shrink-0">
                    {getActivityIcon(act.type)}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenTopic(act.topicId)}
                        className="font-bold text-slate-900 hover:text-brand-600 transition-colors text-left"
                      >
                        {act.topicTitle}
                      </button>
                      <SubjectBadge subjectId={act.subjectId} />
                    </div>
                    <p className="text-slate-600">{act.details}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                  {new Date(act.timestamp).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric'
                  })}{' '}
                  •{' '}
                  {new Date(act.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* 3. STORAGE ARCHITECTURE & LOCAL PRIVACY GUARANTEES                 */}
      {/* =================================================================== */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Storage Architecture & Student Privacy
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {user ? 'PostgreSQL RLS Secured' : '100% On-Device'}
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {privacyNotice.description}
        </p>

        {/* Storage stats badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs">
          <div>
            <span className="text-[11px] text-slate-500 block">Database Engine</span>
            <strong className="text-slate-800 font-bold">{storageStats.storageType}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Logged Events</span>
            <strong className="text-slate-800 font-bold">{storageStats.activitiesCount} records</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Feynman Assessments</span>
            <strong className="text-slate-800 font-bold">{storageStats.assessmentsCount} saved</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block">Generated Media</span>
            <strong className="text-slate-800 font-bold">{storageStats.mediaResourcesCount} resources</strong>
          </div>
        </div>

        {/* Guarantees List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
          {privacyNotice.guarantees.map((g, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{g}</span>
            </div>
          ))}
        </div>

        {/* Action Controls: Export JSON & Clear Data */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Exporting...' : 'Export All Data (JSON)'}</span>
            </button>
          </div>

          <button
            onClick={handleClearData}
            disabled={isClearing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isClearing ? 'Clearing...' : 'Clear All Learning Records'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
