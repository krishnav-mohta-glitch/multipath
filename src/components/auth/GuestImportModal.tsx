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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111714]/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-import-modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-[#FBFBF9] rounded-3xl border border-[#DFE2D7] shadow-2xl p-6 md:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8EAE1] text-[#5E7A65] font-mono text-[11px] font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Learner Data Portability</span>
            </div>
            <h2 id="guest-import-modal-title" className="font-display text-xl font-bold text-[#171C18]">
              Import Guest Learning Records
            </h2>
            <p className="text-xs text-[#171C18]/70">
              Synchronize your browser-local guest learning stream into account{' '}
              <span className="font-semibold text-[#171C18]">{user?.email}</span>.
            </p>
          </div>

          <button
            onClick={closeGuestImportModal}
            disabled={isImporting}
            className="p-1.5 rounded-xl text-[#171C18]/50 hover:text-[#171C18] hover:bg-[#E8EAE1] transition-colors cursor-pointer"
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
            <div className="p-4 rounded-2xl bg-[#E8EAE1] border border-[#DFE2D7] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#5E7A65] font-bold">
                <span>DETECTED LOCAL GUEST RECORDS</span>
                <span>STATUS: READY</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#DFE2D7]/80">
                  <Bookmark className="w-4 h-4 text-[#5E7A65] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-[#171C18]">
                    {summary.bookmarksCount}
                  </span>
                  <span className="text-[10px] font-mono text-[#171C18]/60">Topics</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#DFE2D7]/80">
                  <Activity className="w-4 h-4 text-[#5E7A65] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-[#171C18]">
                    {summary.activitiesCount}
                  </span>
                  <span className="text-[10px] font-mono text-[#171C18]/60">Events</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#DFE2D7]/80">
                  <GraduationCap className="w-4 h-4 text-[#5E7A65] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-[#171C18]">
                    {summary.sessionsCount}
                  </span>
                  <span className="text-[10px] font-mono text-[#171C18]/60">Sessions</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#DFE2D7]/80">
                  <FolderArchive className="w-4 h-4 text-[#5E7A65] mx-auto mb-1" />
                  <span className="block font-display font-bold text-sm text-[#171C18]">
                    {summary.resourcesCount}
                  </span>
                  <span className="text-[10px] font-mono text-[#171C18]/60">Media</span>
                </div>
              </div>
            </div>

            {/* Conflict resolution assurance */}
            <div className="p-3.5 rounded-xl bg-[#F1F1E9] border border-[#DFE2D7] text-xs text-[#171C18]/80 leading-relaxed space-y-1">
              <span className="font-semibold block text-[#171C18]">Deterministic Conflict Guarantee:</span>
              <p>
                Existing account records remain untouched. Duplicate topics and sessions are unified using idempotent client UUID hashes. Original guest data is preserved until full import verification.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
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
                className="w-full sm:w-1/2 py-3 rounded-xl border border-[#DFE2D7] text-[#171C18] font-mono text-xs font-bold hover:bg-[#E8EAE1] transition-colors cursor-pointer text-center"
              >
                KEEP SEPARATE
              </button>

              <button
                type="button"
                onClick={handleImport}
                disabled={isImporting}
                className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111714] text-[#C8F36B] font-mono text-xs font-bold hover:bg-[#111714]/90 transition-colors cursor-pointer"
              >
                {isImporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#C8F36B]" />
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
