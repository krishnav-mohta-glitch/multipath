import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  GitFork,
  Headphones,
  Film,
  CheckCircle2,
  AlertTriangle,
  History,
  Layers,
  ArrowRight,
  RefreshCw,
  Library
} from 'lucide-react';
import type { Topic } from '../../../types/topic';
import type {
  MediaType,
  AdaptiveMediaResource,
  MindMapContent,
  PodcastContent,
  VideoContent
} from '../../../types/media';
import type { AdaptiveMediaPayload } from '../../../types/feynman';
import { mediaService } from '../../../services/mediaService';
import { MindMapViewer } from './MindMapViewer';
import { PodcastPlayer } from './PodcastPlayer';
import { ExplainerVideoPlayer } from './ExplainerVideoPlayer';

interface AdaptiveMediaModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
  feynmanPayload?: AdaptiveMediaPayload | null;
}

export const AdaptiveMediaModal: React.FC<AdaptiveMediaModalProps> = ({
  topic,
  isOpen,
  onClose,
  feynmanPayload
}) => {
  // Derive available gaps from feynman payload or topic learning objectives
  const availableGaps =
    feynmanPayload && feynmanPayload.identifiedGaps?.length > 0
      ? feynmanPayload.identifiedGaps.map((g) => g.conceptName)
      : topic.learningObjectives.slice(0, 3);

  const [userSelectedGaps, setUserSelectedGaps] = useState<string[] | null>(null);
  const selectedGaps = userSelectedGaps !== null ? userSelectedGaps : availableGaps;

  // Chosen format (STUDENT CHOICE ONLY)
  const [selectedFormat, setSelectedFormat] = useState<MediaType | null>(null);

  // Active resource being viewed
  const [activeResource, setActiveResource] = useState<AdaptiveMediaResource | null>(null);

  // Previously generated resources for this topic
  const [savedResources, setSavedResources] = useState<AdaptiveMediaResource[]>([]);
  const [showSavedList, setShowSavedList] = useState<boolean>(false);

  // Loading & error
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Fetch saved resources when opened
  useEffect(() => {
    if (isOpen) {
      mediaService.getTopicResources(topic.id).then((resources) => {
        setSavedResources(resources);
      });
    }
  }, [isOpen, topic.id]);

  if (!isOpen) return null;

  // Toggle individual gap checkbox
  const handleToggleGap = (gapName: string) => {
    const current = [...selectedGaps];
    const next = current.includes(gapName)
      ? current.filter((g) => g !== gapName)
      : [...current, gapName];
    setUserSelectedGaps(next);
  };

  const handleSelectAllGaps = () => {
    if (selectedGaps.length === availableGaps.length) {
      setUserSelectedGaps([]);
    } else {
      setUserSelectedGaps([...availableGaps]);
    }
  };

  // Generate the chosen media format
  const handleGenerate = async () => {
    if (!selectedFormat) {
      setErrorNotice('Please select which media format you would prefer to learn with.');
      return;
    }

    if (selectedGaps.length === 0) {
      setErrorNotice('Please select at least one knowledge gap concept to focus on.');
      return;
    }

    setIsGenerating(true);
    setErrorNotice(null);

    try {
      const res = await mediaService.generateMedia({
        format: selectedFormat,
        topicId: topic.id,
        subject: topic.subjectId,
        topicTitle: topic.title,
        selectedGaps,
        gapDetails: feynmanPayload?.identifiedGaps
      });

      const newResource: AdaptiveMediaResource = {
        id: res.resourceId || `res_${Date.now()}`,
        topicId: topic.id,
        subject: topic.subjectId,
        topicTitle: topic.title,
        associatedGaps: selectedGaps,
        mediaType: res.format,
        createdAt: res.generatedAt,
        content: res.content,
        generationStatus: 'completed'
      };

      setActiveResource(newResource);
      setSavedResources((prev) => [newResource, ...prev.filter((r) => r.id !== newResource.id)]);
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Media generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Switch to viewing a previously generated resource
  const handleViewSavedResource = (res: AdaptiveMediaResource) => {
    setActiveResource(res);
    setShowSavedList(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ================================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-indigo-900">
                  Adaptive Media Engine
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-semibold capitalize">
                  {topic.subjectId}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedResources.length > 0 && (
              <button
                onClick={() => setShowSavedList(!showSavedList)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1.5 border border-slate-300"
                title="View previously generated resources for this topic"
              >
                <History className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Saved Media ({savedResources.length})</span>
                <span className="sm:hidden">({savedResources.length})</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Error notification banner */}
        {errorNotice && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 text-xs text-rose-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              {errorNotice}
            </span>
            <button
              onClick={() => setErrorNotice(null)}
              className="text-rose-600 hover:text-rose-900 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Saved Resources Dropdown Drawer */}
        {showSavedList && savedResources.length > 0 && (
          <div className="bg-slate-100 p-4 border-b border-slate-200 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Previously Generated Resources for {topic.title}
              </span>
              <button
                onClick={() => setShowSavedList(false)}
                className="text-[11px] text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {savedResources.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleViewSavedResource(res)}
                  className="p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 cursor-pointer shadow-xs transition-all space-y-1"
                >
                  <div className="flex items-center gap-2">
                    {res.mediaType === 'mindmap' && <GitFork className="w-3.5 h-3.5 text-amber-500" />}
                    {res.mediaType === 'podcast' && <Headphones className="w-3.5 h-3.5 text-purple-500" />}
                    {res.mediaType === 'video' && <Film className="w-3.5 h-3.5 text-indigo-500" />}
                    <span className="text-xs font-bold capitalize text-slate-900">{res.mediaType}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {res.associatedGaps.join(', ')}
                  </p>
                  <span className="text-[9px] text-slate-400 block font-mono">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* BODY AREA: ACTIVE VIEWER OR MEDIA SELECTION */}
        {/* ================================================================= */}
        {activeResource ? (
          /* ACTIVE MEDIA VIEWER */
          activeResource.mediaType === 'mindmap' ? (
            <MindMapViewer
              content={activeResource.content as MindMapContent}
              onBackToSelector={() => setActiveResource(null)}
            />
          ) : activeResource.mediaType === 'podcast' ? (
            <PodcastPlayer
              content={activeResource.content as PodcastContent}
              onBackToSelector={() => setActiveResource(null)}
            />
          ) : (
            <ExplainerVideoPlayer
              content={activeResource.content as VideoContent}
              onBackToSelector={() => setActiveResource(null)}
            />
          )
        ) : (
          /* ================================================================= */
          /* MEDIA FORMAT & GAP SELECTION INTERFACE */
          /* ================================================================= */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Top Prompt */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                <Library className="w-3.5 h-3.5" />
                <span>Personalized Knowledge Gap Remediation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                How would you prefer to understand these concepts?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                MULTIPATH creates custom educational media targeted specifically to your diagnosed knowledge gaps. Choose the format that best fits your learning style.
              </p>
            </div>

            {/* 1. Per-Gap Selection */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Identified Knowledge Gaps to Address:</span>
                </label>

                <button
                  onClick={handleSelectAllGaps}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  {selectedGaps.length === availableGaps.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-2">
                {availableGaps.map((gap, idx) => {
                  const isChecked = selectedGaps.includes(gap);
                  return (
                    <label
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white border-indigo-300 shadow-xs ring-1 ring-indigo-500/20'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleGap(gap)}
                        className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-0"
                      />
                      <div className="space-y-0.5">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block">
                          {gap}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          Targeted concept flagged during Feynman Mode assessment.
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Format Selection Cards (STUDENT MUST CHOOSE) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Select Your Desired Format (Student Choice Required):
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                
                {/* Format A: Mind Map */}
                <div
                  onClick={() => setSelectedFormat('mindmap')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    selectedFormat === 'mindmap'
                      ? 'bg-amber-50/60 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <GitFork className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Interactive Mind Map</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Visual node-link diagram mapping central axioms, sub-mechanisms, and warning callouts for misconceptions.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-800">
                    <span>Exportable SVG / JSON</span>
                    {selectedFormat === 'mindmap' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </div>
                </div>

                {/* Format B: Educational Podcast */}
                <div
                  onClick={() => setSelectedFormat('podcast')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    selectedFormat === 'podcast'
                      ? 'bg-purple-50/60 border-purple-500 shadow-md ring-2 ring-purple-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Audio Lab Podcast</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Conversational educational dialogue with dual hosts unpacking misconceptions, synchronized transcript, and audio narration.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-purple-800">
                    <span>Web Speech Narration</span>
                    {selectedFormat === 'podcast' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </div>
                </div>

                {/* Format C: Explainer Video */}
                <div
                  onClick={() => setSelectedFormat('video')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    selectedFormat === 'video'
                      ? 'bg-indigo-50/60 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Animated Explainer Video</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Scene-by-scene storyboard with animated physical models (balance scales, thylakoids) and synchronized voiceover.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-800">
                    <span>Animated Canvas & Slides</span>
                    {selectedFormat === 'video' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                </div>

              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                You can return later to generate another format for the same topic.
              </span>

              <button
                onClick={handleGenerate}
                disabled={!selectedFormat || selectedGaps.length === 0 || isGenerating}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating {selectedFormat?.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {selectedFormat
                        ? `Generate ${selectedFormat.charAt(0).toUpperCase() + selectedFormat.slice(1)}`
                        : 'Select Format to Generate'}
                    </span>
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
