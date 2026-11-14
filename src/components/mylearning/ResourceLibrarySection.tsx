import React, { useState, useEffect } from 'react';
import {
  GitFork,
  Headphones,
  Film,
  Trash2,
  ExternalLink,
  Search,
  X,
  FolderArchive,
  Compass,
} from 'lucide-react';
import type {
  AdaptiveMediaResource,
  MediaType,
  MindMapContent,
  PodcastContent,
  VideoContent,
} from '../../types/media';
import { storageService } from '../../services/storageService';
import { mediaService } from '../../services/mediaService';
import { SubjectBadge } from '../common/Badge';
import { MindMapViewer } from '../workspace/adaptiveMedia/MindMapViewer';
import { PodcastPlayer } from '../workspace/adaptiveMedia/PodcastPlayer';
import { ExplainerVideoPlayer } from '../workspace/adaptiveMedia/ExplainerVideoPlayer';

interface ResourceLibrarySectionProps {
  onNavigateToLibrary: () => void;
}

export const ResourceLibrarySection: React.FC<ResourceLibrarySectionProps> = ({
  onNavigateToLibrary,
}) => {
  const [resources, setResources] = useState<AdaptiveMediaResource[]>(() =>
    mediaService.getAllLocalResources()
  );
  const [selectedFormat, setSelectedFormat] = useState<MediaType | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active resource preview modal
  const [activeResource, setActiveResource] = useState<AdaptiveMediaResource | null>(null);

  // Deletion state
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadResources = async () => {
    const list = await storageService.getAllMediaResources();
    setResources(list);
  };

  useEffect(() => {
    let active = true;
    void (async () => {
      const list = await storageService.getAllMediaResources();
      if (active) {
        setResources(list);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleDeleteResource = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved resource?')) {
      setDeletingId(id);
      await storageService.deleteMediaResource(id);
      mediaService.deleteResource(id);
      await loadResources();
      setDeletingId(null);
      if (activeResource?.id === id) {
        setActiveResource(null);
      }
    }
  };

  // Filtered resources
  const filteredResources = resources.filter((res) => {
    if (selectedFormat !== 'all' && res.mediaType !== selectedFormat) return false;
    if (selectedSubject !== 'all' && res.subject !== selectedSubject) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTopic = res.topicTitle.toLowerCase().includes(q);
      const matchGaps = res.associatedGaps.some((g) => g.toLowerCase().includes(q));
      if (!matchTopic && !matchGaps) return false;
    }
    return true;
  });

  // Extract unique subjects in saved resources
  const availableSubjects = Array.from(new Set(resources.map((r) => r.subject)));

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-200">
      {/* Header & Filter Controls HUD */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-[#38BDF8] border border-slate-700 flex items-center justify-center shadow-inner">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#FAF9F5] tracking-tight">
                Sovereign Resource Vault
              </h3>
              <p className="text-xs text-slate-400">
                Personal collection of generated Mind Maps, Audio Podcasts, and Explainer Storyboards.
              </p>
            </div>
          </div>

          <div className="font-mono text-xs text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 w-fit">
            <span>Vault Inventory: </span>
            <strong className="text-[#38BDF8]">{resources.length}</strong> resources
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-3 border-t border-slate-800/80">
          {/* Format Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl text-xs font-semibold overflow-x-auto border border-slate-800/80 scrollbar-none">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedFormat === 'all'
                  ? 'bg-slate-800 text-[#FAF9F5] shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Formats ({resources.length})
            </button>
            <button
              onClick={() => setSelectedFormat('mindmap')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                selectedFormat === 'mindmap'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GitFork className="w-3.5 h-3.5 text-amber-400" />
              <span>Mind Maps ({resources.filter((r) => r.mediaType === 'mindmap').length})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('podcast')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                selectedFormat === 'podcast'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-purple-400" />
              <span>Podcasts ({resources.filter((r) => r.mediaType === 'podcast').length})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('video')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                selectedFormat === 'video'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-indigo-400" />
              <span>Videos ({resources.filter((r) => r.mediaType === 'video').length})</span>
            </button>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#38BDF8] capitalize font-medium cursor-pointer"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub} className="capitalize">
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or knowledge gap keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950/80 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#38BDF8] text-slate-100 placeholder-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center mx-auto">
            <FolderArchive className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="font-display text-base font-bold text-[#FAF9F5]">
              No matching media resources found
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {resources.length === 0
                ? 'You have not saved any adaptive media yet. Complete Feynman diagnostic sessions in the workspace to generate personalized Mind Maps, Audio Podcasts, and Explainer Storyboards.'
                : 'No saved resources match your active filter combination. Select another format or clear the search query.'}
            </p>
          </div>
          {resources.length === 0 && (
            <button
              onClick={onNavigateToLibrary}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-[#B8FF00] hover:bg-[#a6e600] rounded-xl transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Curriculum Library</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => {
            const isMindMap = res.mediaType === 'mindmap';
            const isPodcast = res.mediaType === 'podcast';

            return (
              <div
                key={res.id}
                onClick={() => setActiveResource(res)}
                className="p-5 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between space-y-4 group shadow-md"
              >
                <div className="space-y-3">
                  {/* Top Badge & Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isMindMap
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : isPodcast
                            ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        }`}
                      >
                        {isMindMap && <GitFork className="w-3 h-3 text-amber-400" />}
                        {isPodcast && <Headphones className="w-3 h-3 text-purple-400" />}
                        {!isMindMap && !isPodcast && <Film className="w-3 h-3 text-indigo-400" />}
                        <span>{res.mediaType}</span>
                      </span>

                      <SubjectBadge subjectId={res.subject as any} />
                    </div>

                    <button
                      onClick={(e) => handleDeleteResource(res.id, e)}
                      disabled={deletingId === res.id}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete resource from vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Topic */}
                  <div>
                    <h4 className="font-display text-sm font-bold text-[#FAF9F5] group-hover:text-[#38BDF8] transition-colors">
                      {res.topicTitle}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      Logged: {new Date(res.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Covered Knowledge Gaps */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-wider">
                      Targeted Concepts:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {res.associatedGaps.map((gap, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800 font-medium"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs font-semibold text-[#38BDF8] group-hover:text-cyan-300">
                  <span>Inspect Artifact</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Resource Full-Screen Modal Viewer */}
      {activeResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-slate-900 rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Top Close Header */}
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
              <span className="font-mono text-xs text-slate-400">
                Viewing Saved Resource • <strong className="text-[#FAF9F5]">{activeResource.topicTitle}</strong>
              </span>
              <button
                onClick={() => setActiveResource(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Close Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewer Component according to format */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#080A0E]">
              {activeResource.mediaType === 'mindmap' && (
                <MindMapViewer
                  content={activeResource.content as MindMapContent}
                  onBackToSelector={() => setActiveResource(null)}
                />
              )}
              {activeResource.mediaType === 'podcast' && (
                <PodcastPlayer
                  content={activeResource.content as PodcastContent}
                  onBackToSelector={() => setActiveResource(null)}
                />
              )}
              {activeResource.mediaType === 'video' && (
                <ExplainerVideoPlayer
                  content={activeResource.content as VideoContent}
                  onBackToSelector={() => setActiveResource(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
