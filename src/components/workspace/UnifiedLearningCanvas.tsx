import React, { useState, useMemo } from 'react';
import type { Topic } from '../../types/topic';
import type { LearningPathId } from '../../types/learningPath';
import { useAuth } from '../../context/AuthContext';
import { 
  getInterestDomain, 
  INTEREST_DOMAINS, 
  getPersonalizedConceptExperience 
} from '../../services/personalizationEngine';
import { parseStudentPreferences } from '../../types/auth';
import type { SimplicityMode } from '../../types/personalization';
import { PersonalizedConceptSandbox } from './personalization/PersonalizedConceptSandbox';
import { UnderstandingCheckQuiz } from './personalization/UnderstandingCheckQuiz';
import { TopicVisualExhibit } from '../visuals/TopicVisualExhibit';
import { ExploreExperimentView } from './paths/ExploreExperimentView';
import { StructuredExplanationView } from './paths/StructuredExplanationView';
import { VisualLearningView } from './paths/VisualLearningView';
import { ExamplesApplicationsView } from './paths/ExamplesApplicationsView';
import { 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown,
  CheckCircle2,
  Eye,
  Wrench,
  FlaskConical,
  GraduationCap
} from 'lucide-react';

interface UnifiedLearningCanvasProps {
  topic: Topic;
}

export const UnifiedLearningCanvas: React.FC<UnifiedLearningCanvasProps> = ({ topic }) => {
  const { profile, openPassionModal } = useAuth();
  const studentPrefs = useMemo(() => parseStudentPreferences(profile), [profile]);

  // Current active interest lens
  const [activeInterestId, setActiveInterestId] = useState<string>(studentPrefs.activeInterest || 'football');
  const [simplicityMode, setSimplicityMode] = useState<SimplicityMode>('eli5');
  const [activePerspective, setActivePerspective] = useState<LearningPathId | 'sequential'>('sequential');
  const [isContextDropdownOpen, setIsContextDropdownOpen] = useState(false);

  // Retrieve current active domain metadata
  const currentDomain = useMemo(() => getInterestDomain(activeInterestId), [activeInterestId]);
  const isPureAcademic = activeInterestId === 'academic';

  // Generate the 7-Part Personalized Concept Experience through the Universal Engine
  const experience = useMemo(() => {
    return getPersonalizedConceptExperience(topic, {
      topicId: topic.id,
      subjectId: topic.subjectId,
      selectedInterest: activeInterestId,
      simplicityMode,
      learningPerspective: activePerspective === 'sequential' ? undefined : activePerspective
    });
  }, [topic, activeInterestId, simplicityMode, activePerspective]);

  return (
    <div className="space-y-12">
      
      {/* =================================================================== */}
      {/* 0. UNIVERSAL PERSONALISATION CONTROLS & CONTEXT SWITCHER            */}
      {/* =================================================================== */}
      <div className={`p-4 sm:p-5 rounded-3xl bg-[#0D121A] border ${currentDomain.theme.border} shadow-2xl space-y-4 transition-all duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Active Interest Lens & Context Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
              {isPureAcademic ? '📐' : currentDomain.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-bold text-base text-white">
                  {isPureAcademic ? 'Pure Academic Rigor' : `${currentDomain.name} Lens`}
                </span>
                <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded-full border font-bold ${currentDomain.theme.badge}`}>
                  {isPureAcademic ? 'First Principles' : 'Personalised'}
                </span>
              </div>
              <p className="text-xs text-[#8DA391] font-mono">
                {isPureAcademic 
                  ? 'Canonical definitions & axiomatic derivations without analogies' 
                  : `Connecting ${topic.title} to ${currentDomain.tagline.split(',')[0]}`}
              </p>
            </div>
          </div>

          {/* Context Controls Actions */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Quick Context Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsContextDropdownOpen(!isContextDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141A22] hover:bg-[#1E2633] text-white border border-white/15 text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <span>Change Context</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isContextDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-72 p-2.5 rounded-2xl bg-[#080A0E] border border-white/15 shadow-2xl z-40 space-y-2 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-2 py-1 text-[10px] font-mono text-[#8DA391] uppercase tracking-wider">
                    Switch Active Lens
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-1">
                    {INTEREST_DOMAINS.map((domain) => {
                      const isActive = activeInterestId === domain.id;
                      return (
                        <button
                          key={domain.id}
                          type="button"
                          onClick={() => {
                            setActiveInterestId(domain.id);
                            setIsContextDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#B8FF00] text-[#080A0E] font-bold'
                              : 'text-[#CBD5E1] hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{domain.icon}</span>
                            <span>{domain.name}</span>
                          </span>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        openPassionModal();
                        setIsContextDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-mono text-[#38BDF8] hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <span>Edit My Saved Interests</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Simplicity Selector */}
            <div className="flex items-center bg-[#141A22] p-0.5 rounded-xl border border-white/10 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setSimplicityMode('eli5')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  simplicityMode === 'eli5'
                    ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                    : 'text-[#8DA391] hover:text-white'
                }`}
                title="Professor Dave conversational intuition (ELI5)"
              >
                ELI5
              </button>
              <button
                type="button"
                onClick={() => setSimplicityMode('standard')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  simplicityMode === 'standard'
                    ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                    : 'text-[#8DA391] hover:text-white'
                }`}
                title="Balanced academic curriculum explanation"
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setSimplicityMode('formal')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  simplicityMode === 'formal'
                    ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                    : 'text-[#8DA391] hover:text-white'
                }`}
                title="Rigorous mathematical proofs and derivations"
              >
                Formal
              </button>
            </div>
          </div>
        </div>

        {/* 4 Epistemic Perspective Tabs */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {[
              { id: 'sequential', label: 'Complete 7-Part Journey', icon: Sparkles },
              { id: 'structured-explanation', label: '1. Structured Proof', icon: BookOpen },
              { id: 'visual-learning', label: '2. Visual Model', icon: Eye },
              { id: 'examples-applications', label: '3. Real Systems', icon: Wrench },
              { id: 'explore-experiment', label: '4. Interactive Lab', icon: FlaskConical },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activePerspective === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePerspective(tab.id as LearningPathId | 'sequential')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white text-[#080A0E] font-bold shadow-sm'
                      : 'bg-white/5 text-[#8DA391] hover:text-white hover:bg-white/10 border border-white/05'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[10px] text-[#64748B] hidden lg:inline">
            Axiomatic Rigor Preserved Across All Perspectives
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 1. VIEW SWITCHING: DEDICATED PERSPECTIVE vs 7-PART SEQUENTIAL       */}
      {/* =================================================================== */}
      {activePerspective === 'structured-explanation' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl">
          <StructuredExplanationView content={topic.paths['structured-explanation']} />
        </div>
      )}

      {activePerspective === 'visual-learning' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl">
          <VisualLearningView content={topic.paths['visual-learning']} />
        </div>
      )}

      {activePerspective === 'examples-applications' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl">
          <ExamplesApplicationsView content={topic.paths['examples-applications']} />
        </div>
      )}

      {activePerspective === 'explore-experiment' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl">
          <ExploreExperimentView content={topic.paths['explore-experiment']} topic={topic} />
        </div>
      )}

      {/* =================================================================== */}
      {/* COMPLETE 7-PART PERSONALIZED SEQUENTIAL LEARNING JOURNEY           */}
      {/* =================================================================== */}
      {activePerspective === 'sequential' && (
        <div className="space-y-16">
          
          {/* --------------------------------------------------------------- */}
          {/* PART A: PERSONALISED CONCEPT INTRODUCTION (The Familiar Hook)   */}
          {/* --------------------------------------------------------------- */}
          <section id="section-a-introduction" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#B8FF00] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                A
              </span>
              <span>Personalised Concept Introduction</span>
            </div>

            <div className={`p-8 sm:p-10 rounded-3xl bg-gradient-to-br ${currentDomain.theme.glow} border ${currentDomain.theme.border} shadow-2xl space-y-4`}>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-tight">
                {experience.intro.headline}
              </h2>

              <p className="text-base sm:text-lg text-[#F3F4EC] font-normal leading-relaxed">
                {experience.intro.hook}
              </p>

              <div className="p-4 rounded-2xl bg-[#080A0E]/80 border border-white/10 space-y-2">
                <span className="font-mono text-[10px] text-[#B8FF00] uppercase font-bold tracking-wider block">
                  The Everyday Physical Connection:
                </span>
                <p className="text-xs sm:text-sm text-[#D0D4C7] leading-relaxed">
                  {experience.intro.familiarScenario}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#8DA391] italic font-sans">
                {experience.intro.intuitiveBridge}
              </p>
            </div>
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART B: THE ACTUAL ACADEMIC CONCEPT (Formal Definition & Rigor) */}
          {/* --------------------------------------------------------------- */}
          <section id="section-b-academic-concept" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#38BDF8] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                B
              </span>
              <span>The Actual Academic Concept &bull; Curricular Rigor</span>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-[#0D121A] border border-white/15 shadow-2xl space-y-6">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-xl text-white">
                  Formal Definition &amp; Governing Invariants
                </h3>
                <p className="text-sm text-[#D0D4C7] leading-relaxed">
                  {experience.academicConcept.formalDefinition}
                </p>
              </div>

              {/* Governing Formulas */}
              <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#8DA391] block">
                    Governing Law &amp; Mathematical Invariant:
                  </span>
                  <div className="font-mono font-bold text-lg sm:text-xl text-[#B8FF00] mt-1">
                    {experience.academicConcept.governingFormulas.join(' \\quad \\& \\quad ')}
                  </div>
                </div>
                <div className="text-xs text-[#8DA391] font-mono max-w-sm">
                  {experience.academicConcept.whyItWorks}
                </div>
              </div>

              {/* Key Terminology Grid */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-[#8DA391] uppercase tracking-wider block">
                  Authoritative Terminology:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.academicConcept.keyTerms.map((t, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#141A22] border border-white/08 space-y-1">
                      <span className="font-mono font-bold text-xs text-[#38BDF8] block">
                        {t.term}
                      </span>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">
                        {t.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Traps & Misconceptions */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Common Misunderstandings Unmasked</span>
                </div>
                <div className="space-y-2 text-xs text-[#FDE68A]">
                  {experience.academicConcept.commonMisconceptions.map((m, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <p className="font-semibold text-white">&bull; Common Trap: &ldquo;{m.myth}&rdquo;</p>
                      <p className="text-[#FCD34D] pl-3">&rarr; Reality: {m.reality}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART C: INTERACTIVE INTEREST-THEMED SANDBOX                     */}
          {/* --------------------------------------------------------------- */}
          <section id="section-c-interactive-sandbox" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#10B981] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                C
              </span>
              <span>Interactive Learning Experience &bull; Real Mathematical Parameters</span>
            </div>

            <PersonalizedConceptSandbox 
              model={experience.sandbox} 
              interest={currentDomain}
              isPureAcademic={isPureAcademic}
            />
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART D: VISUAL EXPLANATION (Schematics & Spatial Architecture) */}
          {/* --------------------------------------------------------------- */}
          <section id="section-d-visual-explanation" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#C084FC] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                D
              </span>
              <span>Visual Explanation &bull; Domain-Accurate Exhibit</span>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#080A0E] border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-white">
                    {experience.visualExplanation.title}
                  </h4>
                  <p className="text-xs text-[#8DA391] font-mono">
                    {experience.visualExplanation.caption}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#B8FF00] px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  Dynamic Visual
                </span>
              </div>

              {/* High-Definition SVG or Interactive Canvas */}
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-inner">
                <TopicVisualExhibit 
                  topicId={topic.id}
                  subjectId={topic.subjectId}
                  title={topic.title}
                  className="!h-64 sm:!h-72"
                />
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART E: REAL-WORLD APPLICATIONS (Beyond Recreational Context)   */}
          {/* --------------------------------------------------------------- */}
          <section id="section-e-real-world" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#F59E0B] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                E
              </span>
              <span>Real-World Applications &bull; High-Stakes Impact</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {experience.realWorldApplications.map((app, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#0D121A] border border-white/10 shadow-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#38BDF8]">
                        {app.domain}
                      </span>
                      {app.isInterestConnected && (
                        <span className="text-sm">{currentDomain.icon}</span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-base text-white">
                      {app.title}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/05 font-mono text-[11px] text-[#8DA391]">
                    <span className="text-[#B8FF00] font-semibold">Underlying Mechanism:</span> {app.mechanism}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART F: TEST YOUR UNDERSTANDING (Interactive Quiz & Reasoning) */}
          {/* --------------------------------------------------------------- */}
          <section id="section-f-understanding-check" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#EF4444] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                F
              </span>
              <span>Test Your Understanding &bull; Explanatory Evaluation</span>
            </div>

            <UnderstandingCheckQuiz 
              questions={experience.understandingChecks} 
              interest={currentDomain}
              isPureAcademic={isPureAcademic}
            />
          </section>

          {/* --------------------------------------------------------------- */}
          {/* PART G: APPLY BEYOND YOUR INTEREST (Transfer to Exam Context)   */}
          {/* --------------------------------------------------------------- */}
          <section id="section-g-transfer-beyond" className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8DA391] uppercase tracking-wider">
              <span className="w-6 h-6 rounded-lg bg-[#84CC16] text-[#080A0E] flex items-center justify-center font-bold text-xs">
                G
              </span>
              <span>Apply Beyond Your Interest &bull; Examination Transfer</span>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#141A22] to-[#0A1017] border border-white/15 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-[#B8FF00]" />
                <h4 className="font-display font-bold text-lg text-white">
                  {experience.transferBeyondInterest.conventionalContext}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#D0D4C7] leading-relaxed">
                {experience.transferBeyondInterest.examQuestionScenario}
              </p>

              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 space-y-1.5 font-mono text-xs">
                <span className="text-[#38BDF8] font-bold block">
                  Sample Transfer Question:
                </span>
                <p className="text-white">
                  {experience.transferBeyondInterest.sampleProblem}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#B8FF00]/10 border border-[#B8FF00]/25 text-xs text-[#D9F99D] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B8FF00] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Mastery Invariant:</strong> {experience.transferBeyondInterest.takeawayInsight}
                </p>
              </div>
            </div>
          </section>

        </div>
      )}

    </div>
  );
};

export default UnifiedLearningCanvas;
