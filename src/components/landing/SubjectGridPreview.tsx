import React, { useState, useMemo } from 'react';
import {
  Binary,
  Atom,
  FlaskConical,
  Dna,
  Hourglass,
  Globe2,
  BookOpen,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';
import { SUBJECTS } from '../../data/subjects';
import { CURRICULUM_BOARDS } from '../../data/curriculumData';
import { isTopicInCurriculum, getMappingsForTopic } from '../../data/curriculumMappings';
import type { SubjectId } from '../../types/subject';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';

export const SubjectGridPreview: React.FC = () => {
  const { navigateTo, openTopic, setSelectedSubjectId } = useApp();

  const [selectedBoard, setSelectedBoard] = useState<CurriculumBoardCode | 'all'>('all');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all');
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'all'>('all');

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Binary,
    Atom,
    FlaskConical,
    Dna,
    Hourglass,
    Globe2,
    BookOpen,
    Terminal,
  };

  // Filter topics using live curriculum data
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) => {
      if (!isTopicInCurriculum(t.id, selectedBoard, selectedClass)) return false;
      if (activeSubject !== 'all' && t.subjectId !== activeSubject) return false;
      return true;
    });
  }, [selectedBoard, selectedClass, activeSubject]);

  // Compute live subject counts based on current board/class filter
  const liveSubjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of TOPICS) {
      if (isTopicInCurriculum(t.id, selectedBoard, selectedClass)) {
        counts[t.subjectId] = (counts[t.subjectId] || 0) + 1;
      }
    }
    return counts;
  }, [selectedBoard, selectedClass]);

  const handleOpenLibrary = (subjectId?: SubjectId) => {
    if (subjectId) {
      setSelectedSubjectId(subjectId);
    } else {
      setSelectedSubjectId(activeSubject);
    }
    navigateTo('library');
  };

  const featuredTopics = filteredTopics.slice(0, 6);

  return (
    <section id="curriculum-discovery" className="py-16 lg:py-28 bg-[#0D1117] text-[#F3F4EC] border-b border-white/10 relative overflow-hidden">
      
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 cosmic-grid opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141A22] border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8FF00] font-bold">
                CURRICULUM OBSERVATORY &amp; DISCOVERY
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Explore 64 Verified Concepts Across 8 Disciplines
            </h2>

            <p className="text-base text-[#D0D4C7] leading-relaxed">
              Every topic is grounded in official CBSE and CISCE syllabuses for Classes 6 through 10, featuring 4 concurrent epistemic paths, interactive 3D simulations, and Socratic diagnostics.
            </p>
          </div>

          <button
            onClick={() => handleOpenLibrary()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] rounded-full transition-all self-start md:self-auto shadow-sm cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE BOARD & CLASS SELECTOR BAR                              */}
        {/* =================================================================== */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#141A22] border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 text-left">
          
          {/* Board Tabs */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-[#8B9DAE] tracking-wider hidden sm:inline mr-1">
              Curriculum:
            </span>
            <div className="flex items-center bg-[#080A0E] p-1 rounded-xl border border-white/08">
              <button
                onClick={() => setSelectedBoard('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedBoard === 'all'
                    ? 'bg-[#B8FF00] text-[#080A0E] shadow-xs'
                    : 'text-[#8B9DAE] hover:text-white'
                }`}
              >
                All Boards
              </button>
              {CURRICULUM_BOARDS.map((board) => (
                <button
                  key={board.code}
                  onClick={() => setSelectedBoard(board.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedBoard === board.code
                      ? 'bg-[#B8FF00] text-[#080A0E] shadow-xs'
                      : 'text-[#8B9DAE] hover:text-white'
                  }`}
                >
                  {board.code}
                </button>
              ))}
            </div>
          </div>

          {/* Class Level Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <span className="font-mono text-[10px] uppercase text-[#8B9DAE] tracking-wider hidden sm:inline mr-1">
              Class:
            </span>
            <div className="flex items-center bg-[#080A0E] p-1 rounded-xl border border-white/08 shrink-0">
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedClass === 'all'
                    ? 'bg-[#B8FF00] text-[#080A0E]'
                    : 'text-[#8B9DAE] hover:text-white'
                }`}
              >
                All
              </button>
              {([6, 7, 8, 9, 10] as ClassLevel[]).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-[#B8FF00] text-[#080A0E]'
                      : 'text-[#8B9DAE] hover:text-white'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Live Matching Telemetry Count */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="font-mono text-xs px-3 py-1.5 rounded-xl bg-[#080A0E] text-[#B8FF00] border border-white/10 font-bold">
              {filteredTopics.length} Concepts Active
            </span>
          </div>

        </div>

        {/* =================================================================== */}
        {/* DISCIPLINE PILL FILTER STRIP                                        */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveSubject('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium font-mono shrink-0 transition-all cursor-pointer border ${
              activeSubject === 'all'
                ? 'bg-[#1C2430] text-[#B8FF00] border-[#B8FF00]/40 font-bold'
                : 'bg-[#141A22] text-[#8B9DAE] hover:text-white border-white/08'
            }`}
          >
            All Disciplines ({filteredTopics.length})
          </button>
          {SUBJECTS.map((sub) => {
            const count = liveSubjectCounts[sub.id] || 0;
            const isSelected = activeSubject === sub.id;
            const Icon = iconMap[sub.iconName] || BookOpen;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubject(sub.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium font-mono shrink-0 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1C2430] text-[#B8FF00] border-[#B8FF00]/40 font-bold'
                    : 'bg-[#141A22] text-[#8B9DAE] hover:text-white border-white/08'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#B8FF00]' : 'text-[#8B9DAE]'}`} />
                <span>{sub.name}</span>
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                  isSelected ? 'bg-[#B8FF00] text-[#080A0E]' : 'bg-white/10 text-white'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* FEATURED REAL TOPIC PREVIEW CARDS (GRID)                            */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {featuredTopics.map((topic) => {
            const mappings = getMappingsForTopic(topic.id);
            const firstMapping = mappings[0];

            return (
              <div
                key={topic.id}
                className="corner-reticle group p-6 rounded-3xl bg-[#141A22] hover:bg-[#161D26] border border-white/10 hover:border-white/20 transition-all duration-150 flex flex-col justify-between shadow-lg relative"
              >
                <div className="space-y-4">
                  
                  {/* Top Metadata Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#080A0E] text-[#B8FF00] border border-white/10">
                      {topic.subjectId.toUpperCase()} • {topic.difficulty.toUpperCase()}
                    </span>
                    <span className="font-mono text-[9px] text-[#8B9DAE]">
                      {topic.estimatedMinutes} MIN SESSION
                    </span>
                  </div>

                  {/* Title & Overview */}
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#B8FF00] transition-colors line-clamp-1">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-[#D0D4C7] leading-relaxed line-clamp-2">
                      {topic.overview}
                    </p>
                  </div>

                  {/* Official Syllabus Provenance */}
                  {firstMapping && (
                    <div className="p-2.5 rounded-xl bg-[#080A0E]/70 border border-white/05 font-mono text-[10px] text-[#8B9DAE] space-y-0.5">
                      <div className="text-white font-semibold">
                        {firstMapping.boardCode} Class {firstMapping.classLevel} • {firstMapping.subjectName}
                      </div>
                      <div className="text-[#8B9DAE] truncate">
                        {firstMapping.unitName}
                      </div>
                    </div>
                  )}

                  {/* 4 Epistemic Paths Indicator */}
                  <div className="pt-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B9DAE] block mb-1.5">
                      4 Epistemic Perspectives Available:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => openTopic(topic.id, 'structured-explanation')}
                        className="px-2 py-1 rounded bg-[#080A0E] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                        title="Structured Proof"
                      >
                        1. Axiom Proof
                      </button>
                      <button
                        onClick={() => openTopic(topic.id, 'visual-learning')}
                        className="px-2 py-1 rounded bg-[#080A0E] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                        title="Spatial Model"
                      >
                        2. Spatial Model
                      </button>
                      <button
                        onClick={() => openTopic(topic.id, 'examples-applications')}
                        className="px-2 py-1 rounded bg-[#080A0E] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                        title="Engineering Case"
                      >
                        3. Real Systems
                      </button>
                      <button
                        onClick={() => openTopic(topic.id, 'explore-experiment')}
                        className="px-2 py-1 rounded bg-[#080A0E] hover:bg-[#1C2430] text-[#E5E7EB] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                        title="Interactive Sandbox"
                      >
                        4. Active Lab
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Launch Button */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8B9DAE]">
                    [ GUEST READY ]
                  </span>
                  <button
                    onClick={() => openTopic(topic.id, 'structured-explanation')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B8FF00] hover:bg-[#A3E635] text-[#080A0E] font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    <span>Launch Workspace</span>
                    <ArrowRight className="w-3 h-3 stroke-[2.4]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to browse all in Knowledge Library */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#141A22] border border-white/10 text-left">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-base text-white">
              Searching for a specific syllabus chapter or exam cohort?
            </h4>
            <p className="text-xs text-[#8B9DAE]">
              Explore the full interactive matrix with deep search matching textbook units, citations, and key terminology.
            </p>
          </div>
          <button
            onClick={() => handleOpenLibrary()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#1C2430] hover:bg-[#243040] border border-white/15 rounded-full transition-all shrink-0 cursor-pointer"
          >
            <span>Open Complete Catalog ({TOPICS.length} Topics)</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>
        </div>

      </div>
    </section>
  );
};
