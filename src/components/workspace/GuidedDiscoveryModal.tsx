import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileCheck2,
  RefreshCw,
  Info,
  Layers,
  ChevronRight,
  ArrowRight,
  BrainCircuit,
  MessageCircle,
  RotateCcw
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import type {
  DiscoveryMessage,
  DiscoveryEvaluation,
  DiscoverySolution,
  DiscoverySession
} from '../../types/discovery';
import { discoveryService } from '../../services/discoveryService';
import { storageService } from '../../services/storageService';

interface GuidedDiscoveryModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_ACTIVE_KEY = (topicId: string) => `multipath_active_discovery_${topicId}`;

export const GuidedDiscoveryModal: React.FC<GuidedDiscoveryModalProps> = ({
  topic,
  isOpen,
  onClose
}) => {
  // Session State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<DiscoverySession | null>(null);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Engine Status
  const [isDemonstrationMode, setIsDemonstrationMode] = useState<boolean>(true);
  const [modeNotice, setModeNotice] = useState<string>('Demonstration Mode');

  // Input & Messages
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [studentInput, setStudentInput] = useState<string>('');
  const [messages, setMessages] = useState<DiscoveryMessage[]>([]);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [solution, setSolution] = useState<DiscoverySolution | null>(null);
  const [isGoalReached, setIsGoalReached] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, solution, isLoading]);

  // Check health and check for resumable session on open
  useEffect(() => {
    if (isOpen) {
      discoveryService.checkHealth().then((health) => {
        setIsDemonstrationMode(!health.geminiConfigured);
        setModeNotice(
          health.geminiConfigured
            ? (health.mode || 'Live Gemini AI')
            : 'Demonstration Mode (Simulated Socratic Guidance)'
        );
      });

      // Check if a saved active session exists for this topic
      queueMicrotask(() => {
        try {
          const rawSaved = localStorage.getItem(STORAGE_ACTIVE_KEY(topic.id));
          if (rawSaved) {
            const parsed: DiscoverySession = JSON.parse(rawSaved);
            if (parsed && parsed.id && Array.isArray(parsed.history) && parsed.history.length > 0 && !parsed.isCompleted) {
              setHasSavedSession(true);
            } else {
              setHasSavedSession(false);
            }
          } else {
            setHasSavedSession(false);
          }
        } catch {
          setHasSavedSession(false);
        }
      });
    }
  }, [isOpen, topic.id]);

  if (!isOpen) return null;

  // Resume an existing active session from browser storage
  const handleResumeSavedSession = () => {
    try {
      const rawSaved = localStorage.getItem(STORAGE_ACTIVE_KEY(topic.id));
      if (!rawSaved) return;
      const parsed: DiscoverySession = JSON.parse(rawSaved);
      if (parsed && parsed.id && Array.isArray(parsed.history)) {
        setSessionId(parsed.id);
        setActiveSession(parsed);
        setMessages(parsed.history);
        setHintLevel(parsed.hintLevel || 0);
        setSessionActive(true);
        setHasSavedSession(false);
        setErrorNotice(null);
      }
    } catch (e) {
      console.warn('[GuidedDiscovery] Failed to resume session:', e);
    }
  };

  // Initialize a new Guided Discovery session
  const handleStartSession = async (questionToUse?: string) => {
    const q = questionToUse || customQuestion || topic.coreQuestions[0] || 'Explain the core principles.';
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await discoveryService.startSession({
        topicId: topic.id,
        subject: topic.subjectId,
        topicTitle: topic.title,
        initialQuestion: q
      });

      setSessionId(res.sessionId);
      setActiveSession(res.session);
      setSessionActive(true);
      setHasSavedSession(false);
      setIsDemonstrationMode(res.isDemonstrationMode);
      setModeNotice(res.modeNotice);
      setMessages(res.session.history);
      setHintLevel(0);
      setSolution(null);
      setIsGoalReached(false);

      // Persist active session locally
      localStorage.setItem(STORAGE_ACTIVE_KEY(topic.id), JSON.stringify(res.session));

      storageService.recordActivity({
        type: 'discovery-session',
        topicId: topic.id,
        subjectId: topic.subjectId,
        topicTitle: topic.title,
        details: `Started Socratic discovery on "${q.slice(0, 50)}..."`
      }).catch((err) => console.warn('[GuidedDiscovery] recordActivity error:', err));
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Failed to connect to Discovery Engine.');
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  };

  // Submit student response
  const handleSubmitResponse = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!studentInput.trim() || !sessionId || isLoading) return;

    const currentText = studentInput.trim();
    setStudentInput('');
    setIsLoading(true);
    setErrorNotice(null);

    // Optimistically show student message
    const tempStudentMsg: DiscoveryMessage = {
      id: `temp_${Date.now()}`,
      role: 'student',
      content: currentText,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempStudentMsg]);

    try {
      const res = await discoveryService.submitResponse(sessionId, currentText, activeSession);
      setIsDemonstrationMode(res.isDemonstrationMode);
      setModeNotice(res.modeNotice);
      setMessages(res.history);
      if (res.session) {
        setActiveSession(res.session);
        localStorage.setItem(STORAGE_ACTIVE_KEY(topic.id), JSON.stringify(res.session));
      }
      if (res.isGoalReached) {
        setIsGoalReached(true);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error sending response to tutor.';
      setErrorNotice(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  // Request progressive hint
  const handleRequestHint = async () => {
    if (!sessionId || isLoading || hintLevel >= 4) return;
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await discoveryService.requestHint(sessionId, activeSession);
      setHintLevel(res.hintLevel);
      setIsDemonstrationMode(res.isDemonstrationMode);

      const hintMsg: DiscoveryMessage = {
        id: `hint_${Date.now()}`,
        role: 'tutor',
        content: res.hint,
        isHint: true,
        hintLevel: res.hintLevel,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, hintMsg]);
      if (res.session) {
        setActiveSession(res.session);
        localStorage.setItem(STORAGE_ACTIVE_KEY(topic.id), JSON.stringify(res.session));
      }
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Unable to retrieve hint.');
    } finally {
      setIsLoading(false);
    }
  };

  // Request complete solution
  const handleRequestSolution = async () => {
    if (!sessionId || isLoading) return;
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await discoveryService.requestSolution(sessionId, activeSession);
      setSolution(res.solution);
      setIsGoalReached(true);
      if (res.session) {
        setActiveSession(res.session);
        localStorage.removeItem(STORAGE_ACTIVE_KEY(topic.id));
      }
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Unable to load solution.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to starter screen
  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_ACTIVE_KEY(topic.id));
    } catch {
      // ignore
    }
    setSessionActive(false);
    setSessionId(null);
    setActiveSession(null);
    setHasSavedSession(false);
    setMessages([]);
    setSolution(null);
    setIsGoalReached(false);
    setHintLevel(0);
    setErrorNotice(null);
    setStudentInput('');
    setCustomQuestion('');
  };

  // Render evaluation pill
  const renderEvaluationBadge = (evalType?: DiscoveryEvaluation) => {
    if (!evalType) return null;

    switch (evalType) {
      case 'correct':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mastery Verified</span>
          </div>
        );
      case 'partially-correct':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>On The Right Track</span>
          </div>
        );
      case 'incorrect':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <Info className="w-3.5 h-3.5 text-rose-600" />
            <span>Needs Review</span>
          </div>
        );
      case 'insufficient-info':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Clarification Needed</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111714]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#F1F1E9] text-[#171C18] rounded-2xl max-w-4xl w-full shadow-2xl border border-[#DFE2D7] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ================================================================= */}
        {/* TOP HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 border-b border-[#DFE2D7] bg-[#E8EAE1] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111714] text-[#C8F36B] flex items-center justify-center font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase font-bold tracking-wider text-[#5E7A65]">
                  SOCRATIC DISCOVERY ENGINE
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#DFE2D7] text-[#171C18] font-semibold capitalize">
                  {topic.subjectId}
                </span>
              </div>
              <h2 className="font-display text-base sm:text-lg font-bold text-[#171C18] tracking-tight">
                {topic.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Engine Status Badge */}
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                isDemonstrationMode
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
              title={modeNotice}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isDemonstrationMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
                }`}
              />
              <span>{isDemonstrationMode ? 'Demonstration Mode' : (modeNotice.includes('Gemini') ? modeNotice : 'Live Gemini AI')}</span>
            </div>

            {sessionActive && (
              <button
                onClick={handleReset}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1"
                title="Restart Discovery Session"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Question</span>
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

        {/* Status notice banner when in Demonstration Mode */}
        {isDemonstrationMode && (
          <div className="bg-[#E8EAE1] border-b border-[#DFE2D7] px-4 py-2 flex items-center justify-between font-mono text-xs text-[#171C18]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#5E7A65] shrink-0" />
              <span>
                <strong>Demonstration Mode:</strong> Socratic questioning is driven by deterministic domain evaluators. (Configure <code className="bg-[#DFE2D7] px-1 py-0.5 rounded text-[10px] font-mono text-[#111714]">GEMINI_API_KEY</code> on server for live Gemini inference).
              </span>
            </div>
          </div>
        )}

        {/* Error notification banner if any */}
        {errorNotice && (
          <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 text-xs text-rose-800 flex items-center justify-between">
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

        {/* ================================================================= */}
        {/* BODY AREA */}
        {/* ================================================================= */}
        {!sessionActive ? (
          /* PRE-SESSION: QUESTION SELECTOR */
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>The Socratic Principle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Don't look up the answer. Discover it.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                In Guided Discovery, MULTIPATH asks you one question at a time. Each step checks your reasoning, provides graduated hints when needed, and guides you to deduce the core principles yourself.
              </p>
            </div>

            {/* Resumable Session Card */}
            {hasSavedSession && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                    <span>Saved In-Progress Session Available</span>
                  </div>
                  <p className="text-xs text-amber-900/80">
                    You have an active Socratic inquiry for this topic saved in your local storage.
                  </p>
                </div>
                <button
                  onClick={handleResumeSavedSession}
                  className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Resume Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Starter Questions */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500" />
                <span>Select a Curated Problem or Socratic Focus:</span>
              </label>

              <div className="grid grid-cols-1 gap-2.5">
                {topic.coreQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStartSession(q)}
                    disabled={isLoading}
                    className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 group-hover:bg-amber-400 group-hover:text-slate-950 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 transition-colors">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-amber-950 transition-colors">
                        {q}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                  </button>
                ))}

                {/* Specific Linear Equation Starter for Math */}
                {topic.id === 'math-linear-equations' && (
                  <button
                    onClick={() => handleStartSession('Solve for x in the equation: 3x + 7 = 22')}
                    disabled={isLoading}
                    className="w-full text-left p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 bg-indigo-50/40 hover:bg-indigo-50/70 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        ★
                      </span>
                      <div>
                        <span className="text-sm font-bold text-indigo-950 block">
                          Step-by-Step Equation: 3x + 7 = 22
                        </span>
                        <span className="text-xs text-indigo-700">
                          Solve using inverse operations and balance scale principles.
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Custom Question Form */}
            <div className="pt-2 border-t border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Or enter your own question or problem:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder={
                    topic.subjectId === 'mathematics'
                      ? 'e.g. 5x - 4 = 16 or 2x + 3 = x + 8'
                      : 'e.g. Why do plants need sunlight if they already have water?'
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleStartSession();
                    }
                  }}
                />
                <button
                  onClick={() => handleStartSession()}
                  disabled={isLoading}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* ACTIVE Socratic Dialogue Thread */
          /* ================================================================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg, index) => {
                const isTutor = msg.role === 'tutor';

                if (msg.isHint) {
                  return (
                    <div
                      key={msg.id || index}
                      className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 shadow-sm space-y-2 animate-in fade-in"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Progressive Hint — Level {msg.hintLevel} of 4</span>
                        </div>
                        <span className="text-[10px] text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded font-mono">
                          Hint
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                        {msg.content}
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id || index}
                    className={`flex flex-col ${isTutor ? 'items-start' : 'items-end'} animate-in fade-in`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {isTutor ? 'Socratic Tutor' : 'You (Student)'}
                      </span>
                      {isTutor && renderEvaluationBadge(msg.evaluation)}
                    </div>

                    <div
                      className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                        isTutor
                          ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-sm'
                          : 'bg-indigo-600 text-white rounded-tr-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Display targeted Next Guiding Question */}
                      {isTutor && msg.nextQuestion && (
                        <div className="mt-3 pt-3 border-t border-slate-100 bg-amber-50/60 -mx-4 -mb-4 p-4 rounded-b-2xl border-l-4 border-amber-400">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                            <MessageCircle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Guiding Question:</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            {msg.nextQuestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Complete Solution Card if revealed */}
              {solution && (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 border-2 border-indigo-200 shadow-md space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                        <FileCheck2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-indigo-950">
                          Complete Pedagogical Derivation
                        </h4>
                        <span className="text-[10px] text-indigo-700">
                          First principles and full solution breakdown
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-200 text-indigo-900">
                      Solution
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-slate-800 font-medium">
                      {solution.summary}
                    </p>

                    <div className="space-y-2 bg-white/80 p-3.5 rounded-xl border border-indigo-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
                        Deductive Steps:
                      </span>
                      <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-none">
                        {solution.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                      <strong>Core Takeaway:</strong> {solution.keyTakeaway}
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900">Final Answer:</span>
                      <span className="text-sm font-mono font-bold text-emerald-800">
                        {solution.finalAnswer}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Goal Reached Celebration Banner */}
              {isGoalReached && !solution && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1 animate-in zoom-in-95">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white mb-1">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Target Discovery Achieved!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    You systematically worked through the reasoning steps to discover the underlying principle.
                  </p>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 w-fit text-xs text-slate-500 animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                  <span>Socratic tutor is evaluating your reasoning...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ============================================================= */}
            {/* ACTION TOOLBAR & STUDENT INPUT */}
            {/* ============================================================= */}
            <div className="p-3 sm:p-4 border-t border-slate-200 bg-white shrink-0 space-y-3">
              
              {/* Assistance Action Row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRequestHint}
                    disabled={isLoading || hintLevel >= 4 || Boolean(solution)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      hintLevel >= 4
                        ? 'All 4 progressive hint levels used'
                        : `Get Level ${hintLevel + 1} Hint`
                    }
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {hintLevel === 0
                        ? 'Request Hint'
                        : hintLevel >= 4
                        ? 'All Hints Used (4/4)'
                        : `Next Hint (${hintLevel}/4)`}
                    </span>
                  </button>

                  {!solution && (
                    <button
                      onClick={handleRequestSolution}
                      disabled={isLoading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Reveal complete solution and deductive steps"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-slate-600" />
                      <span className="hidden sm:inline">Show Complete Solution</span>
                      <span className="sm:hidden">Solution</span>
                    </button>
                  )}
                </div>

                <div className="text-[11px] text-slate-500">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-slate-600 font-mono">Enter</kbd> to respond
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmitResponse} className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    rows={2}
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitResponse();
                      }
                    }}
                    placeholder="Type your answer, mathematical step, or reasoning..."
                    disabled={isLoading || Boolean(solution && isGoalReached)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFE2D7] bg-[#F1F1E9] focus:outline-none focus:ring-1 focus:ring-[#111714] text-xs sm:text-sm resize-none disabled:bg-[#E8EAE1] disabled:cursor-not-allowed text-[#171C18]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!studentInput.trim() || isLoading || Boolean(solution && isGoalReached)}
                  className="px-5 py-3 rounded-xl bg-[#111714] hover:bg-[#19211C] text-[#C8F36B] font-mono font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">SUBMIT STEP</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
