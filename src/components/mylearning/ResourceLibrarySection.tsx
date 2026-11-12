import React, { useState, useEffect } from 'react';
import {
  GitFork,
  Headphones,
  Film,
  Trash2,
  ExternalLink,
  Search,
  BookOpen,
  X
} from 'lucide-react';
import type {
  AdaptiveMediaResource,
  MediaType,
  MindMapContent,
  PodcastContent,
  VideoContent
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
  onNavigateToLibrary
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
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Filter Controls */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Personal Resource Library
            </h3>
            <p className="text-xs text-slate-500">
              Saved Mind Maps, Podcasts, and Explainer Videos generated to address your knowledge gaps.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg w-fit">
            Total Saved: <strong>{resources.length}</strong> resources
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-3 border-t border-slate-100">
          
          {/* Format Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setSelectedFormat('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedFormat === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Formats ({resources.length})
            </button>
            <button
              onClick={() => setSelectedFormat('mindmap')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                selectedFormat === 'mindmap'
                  ? 'bg-white text-amber-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitFork className="w-3.5 h-3.5 text-amber-500" />
              <span>Mind Maps ({resources.filter((r) => r.mediaType === 'mindmap').length})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('podcast')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                selectedFormat === 'podcast'
                  ? 'bg-white text-purple-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-purple-500" />
              <span>Podcasts ({resources.filter((r) => r.mediaType === 'podcast').length})</span>
            </button>
            <button
              onClick={() => setSelectedFormat('video')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                selectedFormat === 'video'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-indigo-500" />
              <span>Videos ({resources.filter((r) => r.mediaType === 'video').length})</span>
            </button>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 capitalize font-medium"
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
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic or gap keyword..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-slate-800"
            />
          </div>

        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No matching media resources found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {resources.length === 0
              ? 'You have not generated any adaptive media yet. Complete a Feynman Mode session to generate targeted Mind Maps, Podcasts, or Explainer Videos.'
              : 'No saved resources match the current filter criteria. Try selecting another format or clearing the search.'}
          </p>
          {resources.length === 0 && (
            <button
              onClick={onNavigateToLibrary}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
            >
              <span>Explore Library Topics</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => {
            const isMindMap = res.mediaType === 'mindmap';
            const isPodcast = res.mediaType === 'podcast';
            const isVideo = res.mediaType === 'video';

            return (
              <div
                key={res.id}
                onClick={() => setActiveResource(res)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Badge & Delete */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isMindMap
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : isPodcast
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        }`}
                      >
                        {isMindMap && <GitFork className="w-3 h-3 text-amber-600" />}
                        {isPodcast && <Headphones className="w-3 h-3 text-purple-600" />}
                        {isVideo && <Film className="w-3 h-3 text-indigo-600" />}
                        <span>{res.mediaType}</span>
                      </span>

                      <SubjectBadge subjectId={res.subject as any} />
                    </div>

                    <button
                      onClick={(e) => handleDeleteResource(res.id, e)}
                      disabled={deletingId === res.id}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete resource"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Topic */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {res.topicTitle}
                    </h4>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Created: {new Date(res.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Covered Knowledge Gaps */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Addressed Knowledge Gaps:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {res.associatedGaps.map((gap, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span>Open & Inspect Resource</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Resource Full-Screen Modal Viewer */}
      {activeResource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-slate-900 rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Top Close Header */}
            <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4">
              <span className="text-xs text-slate-400">
                Viewing Saved Resource • <strong className="text-slate-200">{activeResource.topicTitle}</strong>
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
            <div className="flex-1 flex flex-col overflow-hidden">
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
