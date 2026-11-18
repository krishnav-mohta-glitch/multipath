import React, { useState } from 'react';
import {
  X,
  Headphones,
  Film,
  Sparkles,
  Loader2,
} from 'lucide-react';
import type { Topic } from '../../../types/topic';
import { mediaService } from '../../../services/mediaService';
import { PodcastPlayer } from './PodcastPlayer';
import { ExplainerVideoPlayer } from './ExplainerVideoPlayer';
import type { PodcastContent, VideoContent } from '../../../types/media';

interface AdaptiveMediaStudioModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'audio' | 'video';
}

export const AdaptiveMediaStudioModal: React.FC<AdaptiveMediaStudioModalProps> = ({
  topic,
  isOpen,
  onClose,
  initialMode = 'audio',
}) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>(initialMode);
  const [podcastContent, setPodcastContent] = useState<PodcastContent | null>(null);
  const [videoContent, setVideoContent] = useState<VideoContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();
    const loadInitial = async () => {
      if (activeTab === 'audio' && !podcastContent) {
        setIsLoading(true);
        try {
          const res = await mediaService.generateMedia({
            format: 'podcast',
            topicId: topic.id,
            subject: topic.subjectId,
            topicTitle: topic.title,
            selectedGaps: topic.learningObjectives.slice(0, 3),
          });
          if (!controller.signal.aborted) {
            setPodcastContent(res.content as PodcastContent);
          }
        } catch (err) {
          console.warn('Failed to generate podcast:', err);
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      } else if (activeTab === 'video' && !videoContent) {
        setIsLoading(true);
        try {
          const res = await mediaService.generateMedia({
            format: 'video',
            topicId: topic.id,
            subject: topic.subjectId,
            topicTitle: topic.title,
            selectedGaps: topic.learningObjectives.slice(0, 3),
          });
          if (!controller.signal.aborted) {
            setVideoContent(res.content as VideoContent);
          }
        } catch (err) {
          console.warn('Failed to generate video explainer:', err);
        } finally {
          if (!controller.signal.aborted) {
            setIsLoading(false);
          }
        }
      }
    };
    void loadInitial();
    return () => {
      controller.abort();
    };
  }, [isOpen, activeTab, podcastContent, videoContent, topic]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-[#080A0E] border border-white/15 shadow-2xl flex flex-col text-[#F3F4EC]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-[#0D121B]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#B8FF00]/15 text-[#B8FF00] flex items-center justify-center border border-[#B8FF00]/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold text-[#B8FF00] tracking-wider">
                  ADAPTIVE MEDIA STUDIO
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">
                {topic.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-[#141A22] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('audio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'audio'
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm font-bold'
                    : 'text-[#8DA391] hover:text-white'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Audio Overview</span>
                <span className="sm:hidden">Audio</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-sm font-bold'
                    : 'text-[#8DA391] hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Video Overview</span>
                <span className="sm:hidden">Video</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8DA391] hover:text-white transition-colors cursor-pointer"
              title="Close Media Studio"
              aria-label="Close Media Studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center space-y-3 text-center p-8">
              <Loader2 className="w-8 h-8 text-[#B8FF00] animate-spin" />
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-wider text-white font-bold block">
                  Generating Synthetic Media Stream
                </span>
                <p className="text-xs text-[#8DA391]">
                  Aligning multi-turn dialogue, acoustic rhythm, and visual scenes to curriculum objectives...
                </p>
              </div>
            </div>
          ) : activeTab === 'audio' ? (
            podcastContent ? (
              <PodcastPlayer
                content={podcastContent}
                onBackToSelector={() => setActiveTab('video')}
              />
            ) : null
          ) : videoContent ? (
            <ExplainerVideoPlayer
              content={videoContent}
              onBackToSelector={() => setActiveTab('audio')}
            />
          ) : null}
        </div>

      </div>
    </div>
  );
};
