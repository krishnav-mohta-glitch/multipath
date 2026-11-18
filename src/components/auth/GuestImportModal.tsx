import React, { useState, useEffect } from 'react';
import {
  X,
  Bookmark,
  Activity,
  GraduationCap,
  FolderArchive,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storageService';
import type { GuestDataSummary, GuestImportResult } from '../../types/cloudPersistence';

export const GuestImportModal: React.FC = () => {
  const { isGuestImportModalOpen, closeGuestImportModal, importGuestDataToAccount, user } = useAuth();
  const [summary, setSummary] = useState<GuestDataSummary>(() => storageService.getGuestDataSummary());
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [result, setResult] = useState<GuestImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isGuestImportModalOpen) {
      Promise.resolve().then(() => {
        const stats = storageService.getGuestDataSummary();
        setSummary(stats);
        setResult(null);
        setError(null);
        setIsImporting(false);
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGuestImportModalOpen && !isImporting) {
        closeGuestImportModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGuestImportModalOpen, isImporting, closeGuestImportModal]);

  if (!isGuestImportModalOpen) return null;

  const handleImport = async () => {
    setIsImporting(true);
    setError(null);

    try {
      const res = await importGuestDataToAccount();
      setResult(res);
      if (res.success) {
        // Clear local guest cache only after verified cloud commit
        await storageService.clearGuestDataOnly();
      } else {
        setError(res.errors.join('; ') || 'Import failed to complete cleanly.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error during import.');
    } finally {
      setIsImporting(false);
    }
  };

  const handleKeepSeparate = () => {
    closeGuestImportModal();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-import-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-[#0D1117] text-slate-100 rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141A22] text-[#B8FF00] font-mono text-[11px] font-semibold tracking-wider uppercase border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Learner Data Portability</span>
            </div>
            <h2 id="guest-import-modal-title" className="font-display text-xl font-bold text-white">
              Import Guest Learning Records
            </h2>
            <p className="text-xs text-slate-400">
              Synchronize your browser-local guest learning stream into account{' '}
              <span className="font-semibold text-white">{user?.email}</span>.
            </p>
          </div>

          <button
            onClick={closeGuestImportModal}
            disabled={isImporting}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on state */}
        {result && result.success ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-base text-emerald-900">
                Synchronization Verified &amp; Complete
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your guest learning records have been securely persisted to your Supabase cloud account under strict Row Level Security.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7]">
                <span className="font-mono text-[10px] text-[#5E7A65] uppercase block">Saved Topics</span>
                <span className="font-display font-bold text-base text-[#171C18]">
                  {result.importedCounts.bookmarks} imported
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7]">
                <span className="font-mono text-[10px] text-[#5E7A65] uppercase block">Activity Events</span>
                <span className="font-display font-bold text-base text-[#171C18]">
                  {result.importedCounts.activities} imported
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7]">
                <span className="font-mono text-[10px] text-[#5E7A65] uppercase block">Sessions</span>
                <span className="font-display font-bold text-base text-[#171C18]">
                  {result.importedCounts.sessions} imported
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1] border border-[#DFE2D7]">
                <span className="font-mono text-[10px] text-[#5E7A65] uppercase block">Resources</span>
                <span className="font-display font-bold text-base text-[#171C18]">
                  {result.importedCounts.resources} imported
                </span>
              </div>
            </div>

            <button
              onClick={closeGuestImportModal}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111714] text-[#C8F36B] font-mono text-xs font-bold hover:bg-[#111714]/90 transition-colors cursor-pointer"
            >
              <span>CONTINUE TO MY TRAJECTORY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary preview */}
            <div className="p-4 rounded-2xl bg-[#141A22] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#B8FF00] font-bold">
                <span>DETECTED LOCAL GUEST RECORDS</span>
                <span>STATUS: READY</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#080A0E] border border-white/10">
                  <Bookmark className="w-4 h-4 text-[#B8FF00] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-white">
                    {summary.bookmarksCount}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Topics</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080A0E] border border-white/10">
                  <Activity className="w-4 h-4 text-[#38BDF8] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-white">
                    {summary.activitiesCount}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Events</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080A0E] border border-white/10">
                  <GraduationCap className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-white">
                    {summary.sessionsCount}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Sessions</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#080A0E] border border-white/10">
                  <FolderArchive className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-white">
                    {summary.resourcesCount}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Media</span>
                </div>
              </div>
            </div>

            {/* Conflict resolution assurance */}
            <div className="p-3.5 rounded-xl bg-[#141A22] border border-white/10 text-xs text-slate-300 leading-relaxed space-y-1">
              <span className="font-semibold block text-white font-mono text-[11px]">Deterministic Conflict Guarantee:</span>
              <p>
                Existing account records remain untouched. Duplicate topics and sessions are unified using idempotent client UUID hashes. Original guest data is preserved until full import verification.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <span className="font-semibold block">Import Warning</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleKeepSeparate}
                disabled={isImporting}
                className="w-full sm:w-1/2 py-3 rounded-xl border border-white/10 text-slate-300 font-mono text-xs font-bold hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-center"
              >
                KEEP SEPARATE
              </button>

              <button
                type="button"
                onClick={handleImport}
                disabled={isImporting}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#B8FF00] text-[#080A0E] font-mono text-xs font-bold hover:bg-[#A3E635] transition-colors cursor-pointer"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#080A0E]" />
                    <span>SYNCHRONIZING...</span>
                  </>
                ) : (
                  <>
                    <span>IMPORT TO ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
