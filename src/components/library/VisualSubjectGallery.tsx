import React from 'react';
import { Sparkles, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SUBJECTS } from '../../data/subjects';
import { SubjectVisualArtwork } from '../visuals/SubjectVisualArtwork';
import type { SubjectId } from '../../types/subject';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';

interface VisualSubjectGalleryProps {
  selectedBoard: CurriculumBoardCode | 'all';
  selectedClass: ClassLevel | 'all';
  activeSubject: SubjectId | 'all';
  onSelectSubject: (subjectId: SubjectId | 'all') => void;
  subjectCounts: Record<string, number>;
}

/**
 * Visual Subject Discovery Gallery inspired by Google Labs and NASA Eyes.
 * Replaces plain text pills with image-led, visual exhibit cards featuring
 * bespoke scientific vector artwork, official syllabus codes, and dynamic topic counts.
 */
export const VisualSubjectGallery: React.FC<VisualSubjectGalleryProps> = ({
  selectedBoard,
  selectedClass,
  activeSubject,
  onSelectSubject,
  subjectCounts,
}) => {
  const totalTopicsInView = Object.values(subjectCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4 text-left">
      {/* Gallery Header Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#B8FF00]" />
          <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
            Verified Curriculum Disciplines
          </h3>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#141A22] text-[#8B9DAE] border border-white/10">
            {selectedBoard !== 'all' ? selectedBoard : 'All Boards'} &bull; {selectedClass !== 'all' ? `Class ${selectedClass}` : 'Classes 6–10'}
          </span>
        </div>

        <button
          onClick={() => onSelectSubject('all')}
          className={`font-mono text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer ${
            activeSubject === 'all'
              ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] font-bold shadow-md shadow-[#B8FF00]/10'
              : 'bg-[#141A22] text-[#8B9DAE] hover:text-white border-white/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Show All Disciplines ({totalTopicsInView})</span>
        </button>
      </div>

      {/* Responsive Visual Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SUBJECTS.map((subject) => {
          const count = subjectCounts[subject.id] || 0;
          const isSelected = activeSubject === subject.id;

          // Official Curriculum Context Badging
          const isCbseScienceSplit = selectedBoard === 'CBSE' && (subject.id === 'physics' || subject.id === 'chemistry' || subject.id === 'biology');
          const isCisceSciencePaper = selectedBoard === 'CISCE' && (subject.id === 'physics' || subject.id === 'chemistry' || subject.id === 'biology');

          return (
            <div
              key={subject.id}
              onClick={() => onSelectSubject(isSelected ? 'all' : subject.id)}
              className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#161E2E] border-[#B8FF00] shadow-xl shadow-[#B8FF00]/05 ring-1 ring-[#B8FF00]/30'
                  : 'bg-[#0D1117]/90 hover:bg-[#141A22] border-white/10 hover:border-white/20 shadow-md'
              }`}
            >
              {/* Card Visual Hero (SVG Artwork) */}
              <div className="relative overflow-hidden">
                <SubjectVisualArtwork subjectId={subject.id} size="sm" />
                
                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#B8FF00] text-[#080A0E] font-mono text-[9px] font-bold flex items-center gap-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                    <span>ACTIVE</span>
                  </div>
                )}

                {/* Topic Count Badge Overlay */}
                <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#080A0E]/85 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] font-bold flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${count > 0 ? 'bg-[#B8FF00]' : 'bg-[#8B9DAE]'}`} />
                  <span>{count} {count === 1 ? 'Topic' : 'Topics'}</span>
                </div>
              </div>

              {/* Card Information Body */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#B8FF00] transition-colors truncate">
                      {subject.name}
                    </h4>
                    
                    {isCisceSciencePaper && (
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 shrink-0">
                        ICSE Paper
                      </span>
                    )}

                    {isCbseScienceSplit && (
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 shrink-0">
                        CBSE 086
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#8B9DAE] leading-relaxed line-clamp-2">
                    {subject.description}
                  </p>
                </div>

                {/* Explore Action Link */}
                <div className="pt-2 border-t border-white/05 flex items-center justify-between font-mono text-[10px]">
                  <span className={isSelected ? 'text-[#B8FF00] font-bold' : 'text-[#8B9DAE] group-hover:text-white'}>
                    {isSelected ? 'Viewing Topics' : 'Filter Subject'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                    isSelected ? 'text-[#B8FF00]' : 'text-[#8B9DAE]'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
