import React from 'react';
import {
  Clock,
  Bookmark,
  ArrowRight,
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  HelpCircle,
  CheckCircle2,
  Box,
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';
import { SubjectBadge, DifficultyBadge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/useAuth';
import { getPrimaryMappingForTopic } from '../../data/curriculumMappings';
import { INTERACTIVE_TOPIC_IDS } from '../../utils/curriculumDiscovery';

interface TopicCardProps {
  topic: Topic;
  selectedBoard?: CurriculumBoardCode | 'all';
  selectedClass?: ClassLevel | 'all';
}

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
    'structured-explanation': 'Structured Explanation',
    'visual-learning': 'Visual Learning',
    'examples-applications': 'Examples & Applications',
    'explore-experiment': 'Explore & Experiment',
  };

  return (
    <div className="group relative bg-slate-900/80 hover:bg-slate-900/95 border border-slate-800/90 hover:border-slate-700 rounded-2xl transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl text-left">
      {/* Top Section */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Badges & Bookmark Action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <SubjectBadge subjectId={topic.subjectId} />
            <DifficultyBadge difficulty={topic.difficulty} />
            {has3DExperience && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-semibold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                <Box className="w-3 h-3" />
                <span>3D Sim Lab</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(topic.id);
            }}
            className={`p-2 rounded-xl border transition-all ${
              bookmarked
                ? 'bg-[#B8FF00]/10 border-[#B8FF00]/40 text-[#B8FF00]'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            title={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
            aria-label={bookmarked ? 'Saved to My Trajectory' : 'Save for later'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h3
            onClick={() => openTopic(topic.id)}
            className="font-display text-lg font-bold text-[#FAF9F5] group-hover:text-[#B8FF00] transition-colors cursor-pointer leading-tight"
          >
            {topic.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {topic.subtitle}
          </p>
        </div>

        {/* Curriculum Alignment Strip */}
        {curriculumMapping && (
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-200 min-w-0">
              <span className="font-bold px-1.5 py-0.5 rounded-md bg-slate-800 text-[#38BDF8]">
                {curriculumMapping.boardCode} {curriculumMapping.classLevel}
              </span>
              <span className="text-xs text-slate-400 truncate" title={curriculumMapping.unitName}>
                {curriculumMapping.unitName}
              </span>
            </div>
            {curriculumMapping.verificationStatus === 'verified_official' && (
              <span
                className="shrink-0 inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 font-semibold"
                title="Verified against official board syllabus document"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            )}
          </div>
        )}

        {/* Core Question Teaser */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
            <HelpCircle className="w-3 h-3 text-[#B8FF00]" />
            <span>Central Inquiry</span>
          </div>
          <p className="text-xs text-slate-300 font-medium italic line-clamp-2">
            "{topic.coreQuestions[0]}"
          </p>
        </div>
      </div>

      {/* Bottom Section: Path Quick-Launch & Open Workspace */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-3">
        {/* Estimated Duration & Path quick launches */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{topic.estimatedMinutes}m</span>
          </div>

          <div className="h-3 w-px bg-slate-800" />

          {/* Path quick-launch icon strip */}
          <div className="flex items-center gap-1" title="Jump directly into one of 4 convergent paths">
            {topic.availablePaths.map((pathId) => {
              const PathIcon = pathIconMap[pathId];
              return (
                <button
                  key={pathId}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTopic(topic.id, pathId);
                  }}
                  className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-400 hover:text-[#B8FF00] hover:border-[#B8FF00]/50 hover:bg-slate-800 transition-all cursor-pointer"
                  title={`Launch via ${pathNameMap[pathId]}`}
                  aria-label={`Launch ${topic.title} in ${pathNameMap[pathId]}`}
                >
                  <PathIcon className="w-3 h-3" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Open workspace primary button */}
        <button
          onClick={() => openTopic(topic.id)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FAF9F5] group-hover:text-[#B8FF00] group-hover:translate-x-0.5 transition-transform"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B8FF00]" />
        </button>
      </div>
    </div>
  );
};
