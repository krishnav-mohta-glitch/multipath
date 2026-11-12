import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  RotateCcw,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Info,
  Layers,
  BookOpen,
  ArrowRight,
  Brain,
  MessageSquare,
  Copy,
  Check,
  CheckCircle
} from 'lucide-react';
import type { Topic } from '../../types/topic';
import type {
  FeynmanMessage,
  FeynmanAssessmentData,
  AdaptiveMediaPayload,
  FeynmanConceptStatus,
  FeynmanSession
} from '../../types/feynman';
import type { ReassessmentComparison } from '../../types/history';
import { feynmanService } from '../../services/feynmanService';
import { storageService } from '../../services/storageService';
import { AdaptiveMediaModal } from './adaptiveMedia/AdaptiveMediaModal';
import {
  isSpeechRecognitionSupported,
  createSpeechRecognitionController,
  getSpeechRecognitionSupportNotice
} from '../../utils/speechRecognition';

interface FeynmanModeModalProps {
  topic: Topic;
  isOpen: boolean;
  onClose: () => void;
}

type ModalStage = 'teaching' | 'assessment' | 'adaptive-media';

export const FeynmanModeModal: React.FC<FeynmanModeModalProps> = ({
  topic,
  isOpen,
  onClose
}) => {
  // Navigation / Stage
  const [currentStage, setCurrentStage] = useState<ModalStage>('teaching');
  const [adaptiveMediaOpen, setAdaptiveMediaOpen] = useState<boolean>(false);
  
  // Session State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<FeynmanSession | null>(null);
  const [messages, setMessages] = useState<FeynmanMessage[]>([]);
  const [studentInput, setStudentInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // Engine status
  const [isDemonstrationMode, setIsDemonstrationMode] = useState<boolean>(true);
  const [modeNotice, setModeNotice] = useState<string>('Demonstration Mode');

  // Assessment & Phase 5 Payload
  const [assessment, setAssessment] = useState<FeynmanAssessmentData | null>(null);
  const [reassessmentComparison, setReassessmentComparison] = useState<ReassessmentComparison | null>(null);
  const [adaptiveMediaPayload, setAdaptiveMediaPayload] = useState<AdaptiveMediaPayload | null>(null);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  // Voice Input State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const voiceNotice = getSpeechRecognitionSupportNotice().message;
  const speechControllerRef = useRef<ReturnType<typeof createSpeechRecognitionController>>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasInitializedRef = useRef<boolean>(false);

  const STORAGE_FEYNMAN_KEY = `multipath_active_feynman_${topic.id}`;

  const startInitialSession = useCallback(async () => {
    // 1. Check if an active session exists in browser storage
    try {
      const rawSaved = localStorage.getItem(STORAGE_FEYNMAN_KEY);
      if (rawSaved) {
        const parsed: FeynmanSession = JSON.parse(rawSaved);
        if (parsed && parsed.id && Array.isArray(parsed.history) && parsed.history.length > 0 && !parsed.isCompleted) {
          setSessionId(parsed.id);
          setActiveSession(parsed);
          setMessages(parsed.history);
          return;
        }
      }
    } catch (e) {
      console.warn('[FeynmanMode] Error checking saved session:', e);
    }

    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await feynmanService.startSession({
        topicId: topic.id,
        subject: topic.subjectId,
        topicTitle: topic.title,
        learningObjectives: topic.learningObjectives
      });

      setSessionId(res.sessionId);
      setActiveSession(res.session);
      setMessages(res.session.history);
      setIsDemonstrationMode(res.isDemonstrationMode);
      setModeNotice(res.modeNotice);

      localStorage.setItem(STORAGE_FEYNMAN_KEY, JSON.stringify(res.session));
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Failed to connect to Feynman Engine.');
    } finally {
      setIsLoading(false);
    }
  }, [topic.id, topic.subjectId, topic.title, topic.learningObjectives, STORAGE_FEYNMAN_KEY]);

  // Scroll to bottom on conversation change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Check health and initialize session on open
  useEffect(() => {
    if (isOpen) {
      feynmanService.checkHealth().then((health) => {
        setIsDemonstrationMode(!health.geminiConfigured);
        setModeNotice(
          health.geminiConfigured
            ? (health.mode || 'Live Gemini AI Learner')
            : 'Demonstration Mode (Curious Socratic Learner)'
        );
      });

      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        startInitialSession();
      }
    } else {
      if (speechControllerRef.current?.isListening()) {
        speechControllerRef.current.stop();
        setIsRecording(false);
      }
    }
  }, [isOpen, startInitialSession]);

  // Voice Input Handling
  const toggleVoiceRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      setErrorNotice('Voice input is not supported in this browser. Please use text input.');
      return;
    }

    if (isRecording) {
      speechControllerRef.current?.stop();
      setIsRecording(false);
    } else {
      if (!speechControllerRef.current) {
        speechControllerRef.current = createSpeechRecognitionController();
      }

      if (speechControllerRef.current) {
        setIsRecording(true);
        setErrorNotice(null);

        speechControllerRef.current.start(
          (transcript, isFinal) => {
            if (isFinal) {
              setStudentInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
            }
          },
          (err) => {
            setErrorNotice(err);
            setIsRecording(false);
          }
        );
      }
    }
  };

  // Submit explanation turn
  const handleSubmitExplanation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!studentInput.trim() || !sessionId || isLoading) return;

    if (isRecording && speechControllerRef.current) {
      speechControllerRef.current.stop();
      setIsRecording(false);
    }

    const currentText = studentInput.trim();
    setStudentInput('');
    setIsLoading(true);
    setErrorNotice(null);

    // Optimistically show student message
    const tempStudentMsg: FeynmanMessage = {
      id: `temp_${Date.now()}`,
      role: 'student',
      speakerName: 'You (Teacher)',
      content: currentText,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempStudentMsg]);

    try {
      const res = await feynmanService.submitExplanation(sessionId, currentText, activeSession);
      setMessages(res.history);
      setIsDemonstrationMode(res.isDemonstrationMode);
      setModeNotice(res.modeNotice);
      if (res.session) {
        setActiveSession(res.session);
        localStorage.setItem(STORAGE_FEYNMAN_KEY, JSON.stringify(res.session));
      }
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Error sending explanation to learner.');
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  // Trigger diagnostic assessment & knowledge gap report
  const handleRequestAssessment = async () => {
    if (!sessionId || isLoading) return;
    setIsLoading(true);
    setErrorNotice(null);

    try {
      const res = await feynmanService.requestAssessment(sessionId, activeSession);
      setAssessment(res.assessment);
      setAdaptiveMediaPayload(res.adaptiveMediaPayload);
      if (res.session) {
        setActiveSession(res.session);
        // Clear active session since it's completed
        localStorage.removeItem(STORAGE_FEYNMAN_KEY);
      }

      // Record to storage and check for prior reassessment comparison
      const result = await storageService.recordFeynmanAssessment(
        topic.id,
        topic.subjectId,
        topic.title,
        res.assessment
      );
      setReassessmentComparison(result.comparison);

      setCurrentStage('assessment');
    } catch (err: unknown) {
      setErrorNotice(err instanceof Error ? err.message : 'Failed to generate diagnostic assessment.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset / Restart session
  const handleResetSession = () => {
    if (speechControllerRef.current?.isListening()) {
      speechControllerRef.current.stop();
      setIsRecording(false);
    }
    try {
      localStorage.removeItem(STORAGE_FEYNMAN_KEY);
    } catch {
      // ignore
    }
    setAssessment(null);
    setReassessmentComparison(null);
    setAdaptiveMediaPayload(null);
    setCurrentStage('teaching');
    setStudentInput('');
    setActiveSession(null);
    startInitialSession();
  };

  // Copy Adaptive Media JSON
  const handleCopyPayload = () => {
    if (!adaptiveMediaPayload) return;
    navigator.clipboard.writeText(JSON.stringify(adaptiveMediaPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  // Pre-fill sample explanation for fast testing
  const handleLoadSampleExplanation = () => {
    const samples: Record<string, string> = {
      'math-linear-equations':
        'Think of a linear equation like a balance beam scale. If both sides are in equilibrium, adding or subtracting something from one side tilts the scale. To keep equality true, you must apply the exact same inverse operation to both sides. For 3x + 7 = 22, we subtract 7 from both sides to get 3x = 15, then divide both sides by 3 to isolate x = 5.',
      'bio-photosynthesis':
        'Photosynthesis takes place in two stages. In the thylakoid membrane, chlorophyll absorbs blue and red wavelengths and reflects green light. It splits water molecules through photolysis, releasing oxygen as a byproduct while charging ATP and NADPH. Then in the stroma, the Calvin cycle uses that energy to fix carbon dioxide into glucose.',
      'hist-french-revolution':
        'The French Revolution in 1789 was caused by an unsustainable caste hierarchy. The Three Estates system gave the Clergy and Nobility tax exemptions, forcing the 98% of people in the Third Estate to pay the taille. When royal war debt from the American Revolution bankrupted the treasury and a terrible 1788 harvest doubled bread prices, popular rebellion erupted.',
      'eng-understanding-metaphors':
        'A metaphor is not just poetic decoration; it is a cognitive mapping from a concrete source domain onto an abstract target domain. In "Time is a thief", Time is the tenor, Thief is the vehicle, and the ground is the silent, irreversible way moments are stolen away. Unlike similes, metaphors make a direct conceptual equation.'
    };

    setStudentInput(samples[topic.id] || `Here is how ${topic.title} works in first principles...`);
  };

  // Render status badge for concept assessment
  const renderConceptStatusBadge = (status: FeynmanConceptStatus) => {
    switch (status) {
      case 'demonstrated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Demonstrated</span>
          </span>
        );
      case 'partly-demonstrated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>Partly Demonstrated</span>
          </span>
        );
      case 'not-yet-demonstrated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <Info className="w-3 h-3 text-slate-400" />
            <span>Not Yet Discussed</span>
          </span>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111714]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#F1F1E9] text-[#171C18] rounded-2xl max-w-4xl w-full shadow-2xl border border-[#DFE2D7] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* ================================================================= */}
        {/* MODAL HEADER */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 border-b border-[#DFE2D7] bg-[#E8EAE1] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#111714] text-[#C8F36B] flex items-center justify-center font-bold shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase font-bold tracking-wider text-[#5E7A65]">
                  FEYNMAN PROTOCOL: TEACH TO CONSOLIDATE
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

            <button
              onClick={handleResetSession}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors flex items-center gap-1"
              title="Restart Feynman Explanation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restart</span>
            </button>

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
          <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Demonstration Mode:</strong> The curious learner persona and 6-dimension evaluation run on deterministic rubrics. (Set <code className="bg-amber-100 px-1 py-0.5 rounded text-[10px] font-mono">GEMINI_API_KEY</code> on server for live Gemini inference).
              </span>
            </div>
          </div>
        )}

        {/* Error notification banner if any */}
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

        {/* Stage Navigation Pills */}
        <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between gap-2 overflow-x-auto text-xs font-semibold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStage('teaching')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                currentStage === 'teaching'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>1. Teach the Learner</span>
            </button>

            <button
              onClick={() => assessment && setCurrentStage('assessment')}
              disabled={!assessment}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                currentStage === 'assessment'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>2. Diagnostic Rubric & Gap Report</span>
            </button>

            <button
              onClick={() => adaptiveMediaPayload && setCurrentStage('adaptive-media')}
              disabled={!adaptiveMediaPayload}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                currentStage === 'adaptive-media'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Adaptive Media Bridge</span>
            </button>
          </div>

          {currentStage === 'teaching' && messages.some((m) => m.role === 'student') && (
            <button
              onClick={handleRequestAssessment}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-1 text-[11px] shadow-xs shrink-0"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Assess My Explanation</span>
            </button>
          )}
        </div>

        {/* ================================================================= */}
        {/* STAGE 1: TEACH THE LEARNER (CONVERSATION) */}
        {/* ================================================================= */}
        {currentStage === 'teaching' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Conversation Log */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              
              {/* Persona Context Card */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                  A
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-2">
                    <span>Alex — Curious High School Learner</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-200/70 text-emerald-900 font-semibold">
                      AI Peer
                    </span>
                  </div>
                  <p className="text-emerald-900/80 leading-relaxed text-[11px]">
                    Alex wants to understand from first principles. Explain in plain English. Alex won't just flatter you—if your explanation is vague or skips a step, Alex will ask for clarification.
                  </p>
                </div>
              </div>

              {/* Chat Thread */}
              {messages.map((msg, idx) => {
                const isLearner = msg.role === 'learner';

                return (
                  <div
                    key={msg.id || idx}
                    className={`flex flex-col ${isLearner ? 'items-start' : 'items-end'} animate-in fade-in`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {msg.speakerName}
                      </span>
                    </div>

                    <div
                      className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs text-sm leading-relaxed ${
                        isLearner
                          ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs'
                          : 'bg-emerald-700 text-white rounded-tr-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Display Learner's curious follow-up question */}
                      {isLearner && msg.curiousQuestion && (
                        <div className="mt-3 pt-3 border-t border-slate-100 bg-emerald-50/60 -mx-4 -mb-4 p-4 rounded-b-2xl border-l-4 border-emerald-500">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Alex's Curious Question:</span>
                          </div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-900">
                            {msg.curiousQuestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 w-fit text-xs text-slate-500 animate-pulse">
                  <Brain className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>Alex is reviewing your explanation...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Toolbar */}
            <div className="p-3 sm:p-4 border-t border-slate-200 bg-white shrink-0 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>
                    Word count: <strong>{studentInput.trim() ? studentInput.trim().split(/\s+/).length : 0}</strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={handleLoadSampleExplanation}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                  >
                    Insert Sample Explanation
                  </button>
                </div>

                {/* Voice Status Pill */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  {isRecording && (
                    <span className="inline-flex items-center gap-1 text-rose-600 font-bold animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      Listening...
                    </span>
                  )}
                  <span className="hidden sm:inline text-[10px] text-slate-400">
                    {voiceNotice}
                  </span>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmitExplanation} className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    rows={3}
                    value={studentInput}
                    onChange={(e) => setStudentInput(e.target.value)}
                    placeholder="Teach Alex how this works in your own words. Use plain English, describe the cause-and-effect mechanisms..."
                    disabled={isLoading}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs sm:text-sm resize-none disabled:bg-slate-100 leading-relaxed"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        handleSubmitExplanation();
                      }
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  {/* Voice Input Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    title={
                      isSpeechRecognitionSupported()
                        ? isRecording
                          ? 'Stop voice recording'
                          : 'Start voice dictation (Web Speech API)'
                        : 'Voice input not supported in this browser'
                    }
                    className={`p-3 rounded-xl border transition-colors flex items-center justify-center ${
                      isRecording
                        ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                        : isSpeechRecognitionSupported()
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Send Explanation Button */}
                  <button
                    type="submit"
                    disabled={!studentInput.trim() || isLoading}
                    className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Teach Alex</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STAGE 2: DIAGNOSTIC RUBRIC & KNOWLEDGE GAP REPORT */}
        {/* ================================================================= */}
        {currentStage === 'assessment' && assessment && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50">
            
            {/* Header Banner */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Diagnostic Assessment Summary
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Concept Mastery & Evidence-Based Knowledge Gaps
                </h3>
                <p className="text-xs text-slate-600">
                  Evaluated across 6 dimensions with direct quotes from your explanation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentStage('teaching')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Continue Teaching
                </button>
                <button
                  onClick={() => setCurrentStage('adaptive-media')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Prepare Phase 5 Media</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Reassessment Comparison Banner (if revisiting topic) */}
            {reassessmentComparison && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Reassessment Progress vs Previous Session
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Compared with {new Date(reassessmentComparison.previousDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {reassessmentComparison.newlyDemonstrated.length > 0 ? (
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-emerald-900 block">
                      Newly Demonstrated Concepts in This Session:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {reassessmentComparison.newlyDemonstrated.map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-800">
                    Understanding maintained. Continue addressing the specific remaining gaps below.
                  </p>
                )}

                {reassessmentComparison.resolvedMisconceptions.length > 0 && (
                  <div className="text-xs text-emerald-900 bg-white/70 p-2.5 rounded-lg border border-emerald-200">
                    <strong className="block font-bold mb-1">Resolved Previous Misconceptions:</strong>
                    {reassessmentComparison.resolvedMisconceptions.map((m, i) => (
                      <div key={i} className="text-[11px] text-slate-700">
                        Previously questioned: <em>"{m.statement}"</em> → Resolved with evidence in latest explanation.
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 1. Six Dimensions Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                6-Dimension Understanding Breakdown:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {assessment.dimensions.map((dim, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{dim.dimension}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {dim.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {dim.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Concepts Demonstrated vs. Partly vs. Not Yet */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Concept Mastery with Verbatim Student Evidence:
              </label>
              <div className="space-y-2.5">
                {assessment.conceptAssessments.map((concept) => (
                  <div
                    key={concept.id}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{concept.name}</span>
                        {renderConceptStatusBadge(concept.status)}
                      </div>
                    </div>

                    {concept.status !== 'not-yet-demonstrated' && (
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                          Evidence from your explanation:
                        </span>
                        <blockquote className="italic text-slate-800">
                          "{concept.evidence}"
                        </blockquote>
                      </div>
                    )}

                    <p className="text-xs text-slate-600">
                      <strong>Analysis:</strong> {concept.reasoning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Knowledge Gap Report Sections */}
            <div className="space-y-4 pt-2 border-t border-slate-200">
              
              {/* Concepts Understood Well */}
              {assessment.knowledgeGapReport.conceptsUnderstoodWell.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Concepts Understood Well:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {assessment.knowledgeGapReport.conceptsUnderstoodWell.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold">• {c.name}:</span>
                        <span>{c.praise} (<em>"{c.evidence}"</em>)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concepts Needing Clarification */}
              {assessment.knowledgeGapReport.conceptsNeedingClarification.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Concepts Needing Clarification:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {assessment.knowledgeGapReport.conceptsNeedingClarification.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold">• {c.name}:</span>
                        <span>{c.issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Incorrect Statements */}
              {assessment.knowledgeGapReport.incorrectStatements.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Statements Requiring Correction:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-rose-950">
                    {assessment.knowledgeGapReport.incorrectStatements.map((item, i) => (
                      <li key={i} className="p-2.5 rounded-lg bg-white/80 border border-rose-200 space-y-1">
                        <div>
                          <span className="font-bold text-rose-900">Your statement: </span>
                          <span className="italic">"{item.studentQuote}"</span>
                        </div>
                        <div>
                          <span className="font-bold text-emerald-800">Correction: </span>
                          <span>{item.correction}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Relationships */}
              {assessment.knowledgeGapReport.missingRelationships.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2 text-xs text-slate-800">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-700">
                    <Layers className="w-4 h-4 text-slate-500" />
                    <span>Important Missing Relationships to Connect:</span>
                  </div>
                  <ul className="space-y-1">
                    {assessment.knowledgeGapReport.missingRelationships.map((r, i) => (
                      <li key={i}>
                        <strong>{r.name}:</strong> {r.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Study Recommendations */}
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs text-indigo-950">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-indigo-900">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Topic-Specific Study Recommendations:</span>
                </div>
                <ul className="space-y-1 list-disc list-inside">
                  {assessment.knowledgeGapReport.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STAGE 3: ADAPTIVE MEDIA BRIDGE (PHASE 5 INTEGRATION POINT) */}
        {/* ================================================================= */}
        {currentStage === 'adaptive-media' && adaptiveMediaPayload && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Phase 5 Adaptive Media Integration Point</span>
              </div>
              <h3 className="text-lg font-bold">
                Knowledge Gap Payload Ready for Generation
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                This structured schema translates the student's evaluated misconceptions, unaddressed mechanisms, and conceptual strengths into an actionable payload for Phase 5 to generate targeted podcasts, visual diagrams, or remedial video scripts.
              </p>
            </div>

            {/* Gap Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Demonstrated Strengths</span>
                <span className="text-xl font-bold text-emerald-600">{adaptiveMediaPayload.sessionSummary.demonstratedConceptsCount}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Concepts ready for reinforcement</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Gaps to Remediate</span>
                <span className="text-xl font-bold text-amber-600">{adaptiveMediaPayload.identifiedGaps.length}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Weak or incomplete concepts</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Incorrect Misconceptions</span>
                <span className="text-xl font-bold text-rose-600">{adaptiveMediaPayload.incorrectStatements.length}</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Requires explicit refutation</p>
              </div>
            </div>

            {/* JSON Code Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Structured Payload Schema (Phase 5 Hand-Off):</span>
                </label>

                <button
                  onClick={handleCopyPayload}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1"
                >
                  {copiedPayload ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPayload ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
                {JSON.stringify(adaptiveMediaPayload, null, 2)}
              </pre>
            </div>

            {/* Launch Adaptive Media Action */}
            <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-indigo-950">
                  Ready to Generate Personalized Media?
                </h4>
                <p className="text-xs text-indigo-700">
                  Select whether you want an interactive Mind Map, an educational Podcast, or an animated Explainer Video.
                </p>
              </div>

              <button
                onClick={() => setAdaptiveMediaOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Launch Adaptive Media Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Adaptive Media Modal */}
      <AdaptiveMediaModal
        topic={topic}
        isOpen={adaptiveMediaOpen}
        onClose={() => setAdaptiveMediaOpen(false)}
        feynmanPayload={adaptiveMediaPayload}
      />
    </div>
  );
};
