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
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TOPICS } from '../../data/topics';
import { SUBJECTS } from '../../data/subjects';
import { CURRICULUM_BOARDS } from '../../data/curriculumData';
import { isTopicInCurriculum, getMappingsForTopic } from '../../data/curriculumMappings';
import { TopicVisualExhibit } from '../visuals/TopicVisualExhibit';
import { FluidCrystallineOrbsScene } from '../three/FluidCrystallineOrbsScene';
import { WebGLFallback } from '../three/WebGLFallback';
import type { SubjectId } from '../../types/subject';
import type { CurriculumBoardCode, ClassLevel } from '../../types/curriculum';

export const SubjectGridPreview: React.FC = () => {
  const { navigateTo, openTopic, setSelectedSubjectId } = useApp();

  const [selectedBoard, setSelectedBoard] = useState<CurriculumBoardCode | 'all'>('all');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>(10);
  const [activeSubject, setActiveSubject] = useState<SubjectId | 'all'>('all');
  const [showOrbs3D, setShowOrbs3D] = useState<boolean>(true);

  const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
    Binary,
    Atom,
    FlaskConical,
    Dna,
    Hourglass,
    Globe2,
    BookOpen,
    Terminal,
  };

  // Class options: Full scope from Class 6 to 12
  const classOptions: ClassLevel[] = [6, 7, 8, 9, 10, 11, 12];

  // Filter topics strictly according to active class and board — ZERO cross-class bleed
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((t) => {
      if (!isTopicInCurriculum(t.id, selectedBoard, selectedClass)) return false;
      if (activeSubject !== 'all' && t.subjectId !== activeSubject) return false;
      return true;
    });
  }, [selectedBoard, selectedClass, activeSubject]);

  // Compute live subject counts based strictly on current board & class
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

  // Up to 6 featured topics for immediate inspection
  const featuredTopics = filteredTopics.slice(0, 6);

  return (
    <section id="curriculum-discovery" className="py-16 lg:py-24 bg-[#06080C] text-[#F3F4EC] border-b border-white/10 relative overflow-hidden">
      
      {/* Background Reticle Grid & Ambient Nebula Glow */}
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#38BDF8]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#B8FF00]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* =================================================================== */}
        {/* 1. SECTION HEADER (Clean, Punchy, High-Impact)                     */}
        {/* =================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111722] border border-[#38BDF8]/30 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8] font-bold">
                CLASS 6–12 CURRICULUM OBSERVATORY
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight break-words">
              Interactive Subject &amp; Class Portals
            </h2>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-2xl font-normal">
              Select your exact class to explore official CBSE (NCERT) and CISCE (ICSE/ISC) units. Every concept is mapped with strict grade isolation, 4 parallel epistemic paths, and the Lost Student Feynman Guide.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleOpenLibrary()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-[#B8FF00] hover:bg-[#a6e600] rounded-full transition-all self-start md:self-auto shadow-lg shadow-[#B8FF00]/20 cursor-pointer group"
          >
            <span>Open Complete Library</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* 1.5. 3D FLUID CRYSTALLINE ORBS OBSERVATORY (Lusion + Active Theory) */}
        {/* =================================================================== */}
        {showOrbs3D && (
          <div className="space-y-3">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-[#B8FF00] shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs uppercase font-bold tracking-normal sm:tracking-wider text-white break-words">
                  3D Fluid Crystalline Observatory &bull; Scroll &amp; Click Interactive Physics
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowOrbs3D(false)}
                className="text-[11px] font-mono text-[#8DA391] hover:text-white underline cursor-pointer shrink-0"
              >
                Hide 3D View
              </button>
            </div>
            <FluidCrystallineOrbsScene
              onSelectSubject={(subId) => {
                setActiveSubject(subId);
                handleOpenLibrary(subId);
              }}
              fallback={<WebGLFallback title="3D Fluid Crystalline Observatory" />}
            />
          </div>
        )}
        {!showOrbs3D && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowOrbs3D(true)}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
              <span>Launch 3D Fluid Crystalline Orbs</span>
            </button>
          </div>
        )}

        {/* =================================================================== */}
        {/* 2. TACTILE CLASS SEGMENTED SLIDER (Classes 6 through 12)            */}
        {/* =================================================================== */}
        <div className="p-3 sm:p-4 rounded-3xl bg-[#0D121A]/90 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-left shadow-2xl">
          
          {/* Class Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="font-mono text-[10px] uppercase text-[#64748B] tracking-wider shrink-0 font-bold hidden sm:inline px-1">
              TARGET CLASS:
            </span>
            <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedClass('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedClass === 'all'
                    ? 'bg-[#B8FF00] text-black font-bold shadow-md shadow-[#B8FF00]/20'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                }`}
              >
                All Classes
              </button>
              {classOptions.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-[#B8FF00] text-black font-bold shadow-md shadow-[#B8FF00]/20'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          {/* Board Selector Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[10px] uppercase text-[#64748B] tracking-wider hidden lg:inline font-bold">
              BOARD:
            </span>
            <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSelectedBoard('all')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedBoard === 'all'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                All Boards
              </button>
              {CURRICULUM_BOARDS.map((board) => (
                <button
                  key={board.code}
                  type="button"
                  onClick={() => setSelectedBoard(board.code)}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedBoard === board.code
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {board.code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. INTERACTIVE SUBJECT PORTALS GRID (Google Labs Card Aesthetic)    */}
        {/* =================================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SUBJECTS.map((sub) => {
            const count = liveSubjectCounts[sub.id] || 0;
            const isSelected = activeSubject === sub.id;
            const Icon = iconMap[sub.iconName] || BookOpen;

            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setActiveSubject(isSelected ? 'all' : sub.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#121A26] border-[#B8FF00] shadow-lg shadow-[#B8FF00]/10 scale-[1.02]'
                    : 'bg-[#0D121A]/70 border-white/10 hover:border-white/20 hover:bg-[#111722]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="p-2 rounded-xl transition-colors"
                    style={{ backgroundColor: `${sub.color.accent}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: sub.color.accent }} />
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-[#B8FF00] text-black'
                        : count > 0
                        ? 'bg-white/10 text-white'
                        : 'bg-white/5 text-[#64748B]'
                    }`}
                  >
                    {count}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-xs font-bold text-white group-hover:text-[#B8FF00] transition-colors truncate">
                    {sub.name}
                  </h4>
                  <span className="font-mono text-[9px] text-[#64748B] block mt-0.5 truncate">
                    {selectedClass === 'all' ? 'All Grades' : `Class ${selectedClass}`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 4. ACTIVE CONCEPTS REPOSITORY (Strictly Filtered for Chosen Class)   */}
        {/* =================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8FF00]" />
              <h3 className="font-mono text-xs uppercase font-bold text-white tracking-wider">
                {selectedClass === 'all'
                  ? 'All Verified Concepts'
                  : `Class ${selectedClass} Official Concepts`}{' '}
                {activeSubject !== 'all' && `• ${activeSubject.toUpperCase()}`}
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#141A22] text-[#B8FF00] font-bold">
                {filteredTopics.length} Active
              </span>
            </div>

            {activeSubject !== 'all' && (
              <button
                type="button"
                onClick={() => setActiveSubject('all')}
                className="font-mono text-[11px] text-[#38BDF8] hover:underline cursor-pointer"
              >
                Clear Subject Filter
              </button>
            )}
          </div>

          {filteredTopics.length === 0 ? (
            <div className="p-12 rounded-3xl bg-[#0D121A]/60 border border-white/10 text-center space-y-3">
              <Layers className="w-8 h-8 text-[#64748B] mx-auto animate-bounce" />
              <h4 className="font-display text-base font-bold text-white">
                No concepts found for this specific filter
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Try selecting "All Classes" or clearing the discipline filter to view verified topics across the complete syllabus.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedClass('all');
                  setActiveSubject('all');
                }}
                className="px-4 py-2 rounded-full bg-white/10 text-white font-mono text-xs hover:bg-white/20 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {featuredTopics.map((topic) => {
                const mappings = getMappingsForTopic(topic.id);
                const firstMapping = mappings[0];

                return (
                  <div
                    key={topic.id}
                    className="group p-3.5 rounded-3xl bg-[#0D121A]/90 hover:bg-[#111722] border border-white/10 hover:border-[#38BDF8]/40 transition-all duration-200 flex flex-col justify-between shadow-xl relative"
                  >
                    {/* Visual Exhibit Banner */}
                    <div
                      onClick={() => openTopic(topic.id)}
                      className="cursor-pointer overflow-hidden rounded-2xl mb-3 border border-white/5"
                    >
                      <TopicVisualExhibit
                        topicId={topic.id}
                        subjectId={topic.subjectId}
                        title={topic.title}
                      />
                    </div>

                    <div className="p-2 space-y-3 flex-1 flex flex-col justify-between">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full bg-black text-[#B8FF00] border border-white/10">
                          {topic.subjectId.toUpperCase()} • {topic.difficulty.toUpperCase()}
                        </span>
                        <span className="font-mono text-[9px] text-[#64748B]">
                          {topic.estimatedMinutes} MINS
                        </span>
                      </div>

                      {/* Title & Overview */}
                      <div className="space-y-1">
                        <h4
                          onClick={() => openTopic(topic.id)}
                          className="font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {topic.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                          {topic.subtitle || topic.overview}
                        </p>
                      </div>

                      {/* Official Syllabus Provenance */}
                      {firstMapping && (
                        <div className="p-2 rounded-xl bg-black/60 border border-white/05 font-mono text-[10px] text-[#64748B] space-y-0.5">
                          <div className="text-white font-semibold truncate">
                            {firstMapping.boardCode} Class {firstMapping.classLevel} • {firstMapping.subjectName}
                          </div>
                          <div className="text-[#94A3B8] truncate">
                            {firstMapping.unitName}
                          </div>
                        </div>
                      )}

                      {/* 4 Epistemic Paths */}
                      <div className="pt-1">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-[#64748B] block mb-1">
                          4 Parallel Perspectives:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => openTopic(topic.id, 'structured-explanation')}
                            className="px-2 py-1 rounded-lg bg-black hover:bg-white/10 text-[#CBD5E1] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                            title="Structured Proof"
                          >
                            1. Axiom Proof
                          </button>
                          <button
                            type="button"
                            onClick={() => openTopic(topic.id, 'visual-learning')}
                            className="px-2 py-1 rounded-lg bg-black hover:bg-white/10 text-[#CBD5E1] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                            title="Spatial Model"
                          >
                            2. Spatial Model
                          </button>
                          <button
                            type="button"
                            onClick={() => openTopic(topic.id, 'examples-applications')}
                            className="px-2 py-1 rounded-lg bg-black hover:bg-white/10 text-[#CBD5E1] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                            title="Engineering Case"
                          >
                            3. Real Systems
                          </button>
                          <button
                            type="button"
                            onClick={() => openTopic(topic.id, 'explore-experiment')}
                            className="px-2 py-1 rounded-lg bg-black hover:bg-white/10 text-[#CBD5E1] hover:text-[#B8FF00] text-[10px] font-mono text-left truncate border border-white/05 transition-colors cursor-pointer"
                            title="Interactive Sandbox"
                          >
                            4. Active Lab
                          </button>
                        </div>
                      </div>

                      {/* Bottom Launch Button */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#10B981]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Feynman Ready</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openTopic(topic.id, 'structured-explanation')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#B8FF00] hover:bg-[#a6e600] text-black font-bold text-xs transition-all cursor-pointer shadow-sm"
                        >
                          <span>Enter Workspace</span>
                          <ArrowRight className="w-3 h-3 stroke-[2.4]" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* 5. BOTTOM CTA TO BROWSE COMPLETE SYLLABUS IN LIBRARY               */}
        {/* =================================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121A]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-2xl">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-base sm:text-lg text-white">
              Looking for a specific board examination chapter or syllabus unit?
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Search textbook units, paper specifications, and Feynman intuitive anchors across all Classes 6–12.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleOpenLibrary()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#141A22] hover:bg-[#1E2634] border border-white/15 rounded-full transition-all shrink-0 cursor-pointer shadow-lg"
          >
            <span>Open Complete Catalog ({TOPICS.length} Topics)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
