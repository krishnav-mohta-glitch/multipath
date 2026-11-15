import React from 'react';
import {
  Bookmark,
  ArrowRight,
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  CheckCircle2,
  Box,
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { TopicVisualExhibit } from '../visuals/TopicVisualExhibit';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/useAuth';
import { getPrimaryMappingForTopic } from '../../data/curriculumMappings';
import { INTERACTIVE_TOPIC_IDS } from '../../utils/curriculumDiscovery';

interface TopicCardProps {
  topic: Topic;
  selectedBoard?: CurriculumBoardCode | 'all';
  selectedClass?: ClassLevel | 'all';
}

/**
 * Visual-first topic exhibit card inspired by Google Labs and NASA Eyes.
 * Features a bespoke animated/interactive scientific visual exhibit,
 * compact typography, official curriculum provenance, and direct 4-path jump points.
 */
export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  selectedBoard = 'all',
  selectedClass = 'all',
}) => {
  const { openTopic, toggleBookmark, isBookmarked } = useApp();
  const { profile } = useAuth();
  const bookmarked = isBookmarked(topic.id);

  const profileBoard: CurriculumBoardCode | undefined =
    profile?.preferred_board === 'CBSE'
      ? 'CBSE'
      : profile?.preferred_board === 'ICSE/CISCE'
      ? 'CISCE'
      : undefined;

  const profileGradeMatch = profile?.grade_level?.match(/Class\s*(\d+)/i);
  const profileClass: ClassLevel | undefined = profileGradeMatch
    ? (parseInt(profileGradeMatch[1], 10) as ClassLevel)
    : undefined;

  // Determine the primary relevant mapping for display
  const targetBoard = selectedBoard !== 'all' ? selectedBoard : profileBoard;
  const targetClass = selectedClass !== 'all' ? selectedClass : profileClass;
  const curriculumMapping = getPrimaryMappingForTopic(topic.id, targetBoard, targetClass);

  const has3DExperience = INTERACTIVE_TOPIC_IDS.has(topic.id);

  const pathIconMap: Record<LearningPathId, React.FC<{ className?: string }>> = {
    'structured-explanation': BookOpen,
    'visual-learning': Eye,
    'examples-applications': Wrench,
    'explore-experiment': FlaskConical,
  };

  const pathNameMap: Record<LearningPathId, string> = {
    'structured-explanation': 'Structured Proof',
    'visual-learning': 'Spatial Model',
    'examples-applications': 'Real-World Case',
    'explore-experiment': 'Interactive Lab',
  };

  return (
    <div className="group relative bg-[#0D1117] hover:bg-[#141A22] border border-white/10 hover:border-white/25 rounded-3xl transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl text-left">
      {/* Visual Exhibit Banner (Top 55% of visual focus) */}
      <div className="relative p-2 pb-0">
        <div
          onClick={() => openTopic(topic.id)}
          className="cursor-pointer overflow-hidden rounded-2xl relative"
        >
          <TopicVisualExhibit
            topicId={topic.id}
            subjectId={topic.subjectId}
            title={topic.title}
          />

          {/* Floating Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
            {has3DExperience && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold bg-[#080A0E]/85 backdrop-blur-md text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm">
                <Box className="w-2.5 h-2.5" />
                <span>3D LAB</span>
              </span>
            )}
          </div>

          {/* Floating Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(topic.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md border transition-all z-20 cursor-pointer ${
              bookmarked
                ? 'bg-[#B8FF00]/20 border-[#B8FF00] text-[#B8FF00]'
                : 'bg-[#080A0E]/80 border-white/15 text-[#8B9DAE] hover:text-white hover:bg-[#141A22]'
            }`}
            title={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
            aria-label={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Metadata Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h3
              onClick={() => openTopic(topic.id)}
              className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#B8FF00] transition-colors cursor-pointer leading-tight line-clamp-1"
              title={topic.title}
            >
              {topic.title}
            </h3>
            <p className="text-xs text-[#8B9DAE] line-clamp-2 leading-relaxed">
              {topic.subtitle}
            </p>
          </div>
        </div>

        {/* Curriculum Alignment Strip */}
        {curriculumMapping && (
          <div className="p-2.5 rounded-xl bg-[#080A0E]/80 border border-white/08 flex items-center justify-between gap-2 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-[#D0D4C7] min-w-0">
              <span className="font-bold px-1.5 py-0.5 rounded bg-white/05 text-[#38BDF8] shrink-0">
                {curriculumMapping.boardCode} {curriculumMapping.classLevel}
              </span>
              <span className="truncate text-[#8B9DAE]" title={curriculumMapping.unitName}>
                {curriculumMapping.unitName}
              </span>
            </div>
            {curriculumMapping.verificationStatus === 'verified_official' && (
              <span
                className="shrink-0 inline-flex items-center gap-1 text-emerald-400 font-semibold"
                title="Verified against official board syllabus document"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">Official</span>
              </span>
            )}
          </div>
        )}

        {/* Action Strip: Direct 4-Path Jumps & Launch */}
        <div className="pt-2 border-t border-white/08 flex items-center justify-between gap-2">
          {/* 4 Path Quick Launch Buttons */}
          <div className="flex items-center gap-1" title="Direct launch into one of 4 epistemic paths">
            {topic.availablePaths.map((pathId) => {
              const PathIcon = pathIconMap[pathId];
              return (
                <button
                  key={pathId}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(topic.id, pathId);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#080A0E] border border-white/10 hover:border-[#B8FF00]/50 hover:bg-[#1C2430] text-[#8B9DAE] hover:text-[#B8FF00] flex items-center justify-center transition-all cursor-pointer"
                  title={`Launch via ${pathNameMap[pathId]}`}
                  aria-label={`Launch ${topic.title} via ${pathNameMap[pathId]}`}
                >
                  <PathIcon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => openTopic(topic.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B8FF00] hover:bg-[#A3E635] text-[#080A0E] font-mono font-bold text-xs transition-all shadow-sm cursor-pointer group-hover:scale-[1.02]"
          >
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 stroke-[2.4]" />
          </button>
        </div>
      </div>
    </div>
  );
};
