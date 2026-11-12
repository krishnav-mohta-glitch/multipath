/**
 * Feynman Mode Engine
 * Implements MULTIPATH Phase 4 Feynman Mode:
 * "Students demonstrate their understanding by teaching a concept to an AI learner."
 * 
 * Features:
 * - Curious AI Learner persona ("Alex").
 * - Acknowledges good explanations, challenges vague/incorrect assertions politely.
 * - Asks one useful guiding question at a time.
 * - 6-dimension diagnostic assessment with direct student quote evidence.
 * - Structured Knowledge Gap Report.
 * - Adaptive Media Integration Point (Payload for Phase 5).
 * - Honest Demonstration Mode indicator when live API key is unavailable.
 */

import { geminiService } from './geminiService.js';
import {
  evaluateFeynmanExplanation,
  generateCuriousLearnerTurn
} from './evaluators/feynmanEvaluator.js';

export class FeynmanEngine {
  constructor() {
    this.sessions = new Map();
  }

  /**
   * Validates the structure and bounds of a client-owned session payload.
   */
  validateSessionPayload(session) {
    if (!session || typeof session !== 'object') return false;
    if (typeof session.id !== 'string' || session.id.trim().length === 0) return false;
    if (typeof session.topicId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(session.topicId)) return false;
    if (typeof session.subject !== 'string') return false;
    if (!Array.isArray(session.studentExplanations)) return false;
    if (!Array.isArray(session.history)) return false;
    if (session.history.length > 80 || session.studentExplanations.length > 50) return false;

    for (const msg of session.history) {
      if (!msg || typeof msg !== 'object') return false;
      if (typeof msg.content !== 'string' || msg.content.length > 6000) return false;
    }

    return true;
  }

  /**
   * Resolves session from in-memory cache OR client-supplied serializable session payload.
   */
  resolveSession(sessionId, sessionPayload) {
    if (this.sessions.has(sessionId)) {
      const cached = this.sessions.get(sessionId);
      if (
        sessionPayload &&
        this.validateSessionPayload(sessionPayload) &&
        sessionPayload.id === sessionId &&
        sessionPayload.history.length >= cached.history.length
      ) {
        this.sessions.set(sessionId, sessionPayload);
        return sessionPayload;
      }
      return cached;
    }

    if (sessionPayload && this.validateSessionPayload(sessionPayload) && sessionPayload.id === sessionId) {
      this.sessions.set(sessionId, sessionPayload);
      return sessionPayload;
    }

    return null;
  }

  /**
   * Initializes a Feynman Mode teaching session.
   */
  async startSession({ topicId, subject, topicTitle, learningObjectives, initialExplanation }) {
    const sessionId = `feynman_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const initialGreeting = this.getLearnerInitialGreeting(topicId, topicTitle, subject);

    const session = {
      id: sessionId,
      topicId,
      subject: (subject || 'general').toLowerCase(),
      topicTitle,
      learningObjectives: learningObjectives || [],
      studentExplanations: [],
      history: [
        {
          id: `msg_0`,
          role: 'learner',
          speakerName: 'Alex (Curious Learner)',
          content: initialGreeting.message,
          curiousQuestion: initialGreeting.firstQuestion,
          timestamp: new Date().toISOString()
        }
      ],
      assessment: null,
      adaptiveMediaPayload: null,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    this.sessions.set(sessionId, session);

    // If student provided an initial explanation right at start, process it immediately
    if (initialExplanation && initialExplanation.trim()) {
      const turnResult = await this.processTurn({ sessionId, studentExplanation: initialExplanation });
      return {
        sessionId,
        session,
        isDemonstrationMode: turnResult.isDemonstrationMode,
        modeNotice: turnResult.modeNotice
      };
    }

    const isLive = geminiService.isConfigured();
    return {
      sessionId,
      session,
      isDemonstrationMode: !isLive,
      modeNotice: isLive
        ? `Live Gemini AI Learner (${geminiService.model})`
        : 'Demonstration Mode (Curious Socratic Learner)'
    };
  }

  /**
   * Processes a teaching turn from the student.
   * Accepts optional client-owned session payload for stateless serverless resilience.
   */
  async processTurn({ sessionId, studentExplanation, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session) {
      return {
        error: 'Session not found or session payload invalid. Please start or resume a valid session.',
        code: 'SESSION_NOT_FOUND',
        session: null
      };
    }

    const cleanText = studentExplanation.trim();
    session.studentExplanations.push(cleanText);

    // Record student turn
    const studentEntry = {
      id: `msg_${session.history.length + 1}`,
      role: 'student',
      speakerName: 'You (Teacher)',
      content: cleanText,
      timestamp: new Date().toISOString()
    };
    session.history.push(studentEntry);

    // Try Gemini AI Learner
    let learnerTurn = null;
    let isDemonstrationMode = true;
    let modeNotice = 'Demonstration Mode (Curious Socratic Learner)';

    if (geminiService.isConfigured()) {
      const aiResponse = await geminiService.generateFeynmanLearnerTurn({
        subject: session.subject,
        topicTitle: session.topicTitle,
        learningObjectives: session.learningObjectives,
        conversationHistory: session.history,
        latestExplanation: cleanText
      });

      if (!aiResponse.isDemonstrationMode && aiResponse.data) {
        learnerTurn = aiResponse.data;
        isDemonstrationMode = false;
        modeNotice = aiResponse.modeNotice;
      }
    }

    // Fallback deterministic learner
    if (!learnerTurn) {
      learnerTurn = generateCuriousLearnerTurn({
        topicId: session.topicId,
        subject: session.subject,
        topicTitle: session.topicTitle,
        conversationHistory: session.history,
        latestExplanation: cleanText
      });
      isDemonstrationMode = true;
      modeNotice = 'Demonstration Mode (Curious Socratic Learner)';
    }

    // Construct learner reply
    const fullLearnerMessage = `${learnerTurn.acknowledgment} ${learnerTurn.challengeOrClarification}`.trim();
    const learnerEntry = {
      id: `msg_${session.history.length + 1}`,
      role: 'learner',
      speakerName: 'Alex (Curious Learner)',
      content: fullLearnerMessage,
      curiousQuestion: learnerTurn.curiousQuestion,
      tone: learnerTurn.tone,
      timestamp: new Date().toISOString()
    };
    session.history.push(learnerEntry);

    return {
      sessionId: session.id,
      learnerResponse: learnerEntry,
      history: session.history,
      isDemonstrationMode,
      modeNotice,
      turnCount: session.studentExplanations.length,
      session
    };
  }

  /**
   * Generates comprehensive 6-dimension assessment and knowledge gap report.
   * Genuinely integrates Gemini when configured, or transparently labels deterministic fallback.
   */
  async generateAssessment({ sessionId, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session) {
      return { error: 'Session not found or session payload invalid.', code: 'SESSION_NOT_FOUND', session: null };
    }

    if (!session.studentExplanations || session.studentExplanations.length === 0) {
      return { error: 'No student explanation recorded to assess.', code: 'NO_EXPLANATIONS' };
    }

    let isDemonstrationMode = true;
    let modeNotice = 'Demonstration Mode (6-Dimension Diagnostic Rubric)';

    // 1. Try Live Gemini Assessment if configured
    if (geminiService.isConfigured()) {
      const aiAssessment = await geminiService.generateFeynmanAssessment({
        subject: session.subject,
        topicTitle: session.topicTitle,
        topicId: session.topicId,
        learningObjectives: session.learningObjectives,
        conversationHistory: session.history,
        allStudentTexts: session.studentExplanations
      });

      if (!aiAssessment.isDemonstrationMode && aiAssessment.assessment && aiAssessment.adaptiveMediaPayload) {
        session.assessment = aiAssessment.assessment;
        session.adaptiveMediaPayload = aiAssessment.adaptiveMediaPayload;
        session.isCompleted = true;
        isDemonstrationMode = false;
        modeNotice = aiAssessment.modeNotice;

        return {
          sessionId: session.id,
          isDemonstrationMode,
          modeNotice,
          assessment: session.assessment,
          adaptiveMediaPayload: session.adaptiveMediaPayload,
          session
        };
      }
    }

    // 2. Deterministic 6-dimension evaluation fallback
    const evaluation = evaluateFeynmanExplanation({
      topicId: session.topicId,
      subject: session.subject,
      topicTitle: session.topicTitle,
      conversationHistory: session.history,
      allStudentTexts: session.studentExplanations
    });

    session.assessment = {
      dimensions: evaluation.dimensions,
      conceptAssessments: evaluation.conceptAssessments,
      knowledgeGapReport: evaluation.knowledgeGapReport,
      evaluatedAt: new Date().toISOString()
    };
    session.adaptiveMediaPayload = evaluation.adaptiveMediaPayload;
    session.isCompleted = true;

    return {
      sessionId: session.id,
      isDemonstrationMode: true,
      modeNotice,
      assessment: session.assessment,
      adaptiveMediaPayload: session.adaptiveMediaPayload,
      session
    };
  }

  /**
   * Returns structured Adaptive Media Payload for Phase 5.
   */
  getAdaptiveMediaPayload({ sessionId, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session || !session.adaptiveMediaPayload) {
      return { error: 'No adaptive media payload ready. Please run assessment first.', code: 'PAYLOAD_NOT_FOUND' };
    }

    return {
      readyForMediaGeneration: true,
      payload: session.adaptiveMediaPayload
    };
  }

  // --- Internal Helpers ---

  getLearnerInitialGreeting(topicId, topicTitle, subject) {
    switch (topicId) {
      case 'math-linear-equations':
        return {
          message: `Hey! I'm Alex. I've always struggled with algebra equations like $3x + 7 = 22$. People say you have to "balance" it, but I never really got what that means in real life.`,
          firstQuestion: `Could you explain what a linear equation actually is, and why doing the same thing to both sides keeps it true?`
        };
      case 'bio-photosynthesis':
        return {
          message: `Hi! I'm Alex. I know plants need sunlight and produce oxygen, but I've never understood the molecular machinery behind it. Like, does sunlight physically turn into sugar?`,
          firstQuestion: `Could you explain to me how a plant turns sunlight, water, and air into solid plant mass?`
        };
      case 'phys-newtons-laws':
        return {
          message: `Hey Alex here! I'm trying to wrap my head around Newton's Laws. People say an object in space moves forever without engines, but on Earth everything stops unless you push it. That confused me!`,
          firstQuestion: `Can you teach me what inertia really means, and how force connects to mass and acceleration?`
        };
      case 'chem-periodic-table':
        return {
          message: `Hi! I'm Alex. In chemistry we're looking at the periodic table. Why do some atoms form molecules by sharing electrons, while others like sodium and chlorine transfer them completely?`,
          firstQuestion: `Could you explain what valence electrons and electronegativity mean, and how they determine the type of chemical bond?`
        };
      case 'hist-french-revolution':
        return {
          message: `Hey there! I'm Alex. In history class we learned that the French Revolution broke out in 1789, but I never got why the richest kingdom in Europe suddenly collapsed into violence.`,
          firstQuestion: `Can you teach me what the main underlying causes were, and what pushed ordinary people to storm the Bastille?`
        };
      case 'eng-understanding-metaphors':
      case 'eng-metaphors':
        return {
          message: `Hi! I'm Alex. In English class we're studying metaphors. My teacher said a metaphor isn't just a fancy comparison with 'like' or 'as', but a way our minds think. That confused me!`,
          firstQuestion: `Could you explain how a metaphor actually works, and what terms like 'Tenor' and 'Vehicle' mean?`
        };
      case 'geo-plate-tectonics':
        return {
          message: `Hey! I'm Alex. I'm learning about plate tectonics. People say continents drift across the globe, but rocks seem completely rigid and solid. How can huge landmasses move over time?`,
          firstQuestion: `Could you teach me what drives tectonic plate movement from inside the Earth, and what happens at subduction zones?`
        };
      case 'cs-binary-search':
        return {
          message: `Hi! I'm Alex. I'm learning about search algorithms in computer science. Everyone says binary search is way faster than checking items one by one, but that it only works on sorted data.`,
          firstQuestion: `Could you explain to me how binary search actually works, why it requires sorted data, and what O(log n) efficiency means?`
        };
      default:
        return {
          message: `Hi! I'm Alex. I'm trying to understand ${topicTitle} (${subject}), but it seems complicated.`,
          firstQuestion: `Can you explain the foundational idea to me in your own words, as if I've never seen it before?`
        };
    }
  }
}

export const feynmanEngine = new FeynmanEngine();
