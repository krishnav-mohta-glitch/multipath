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

    return {
      sessionId,
      session,
      isDemonstrationMode: !geminiService.isConfigured(),
      modeNotice: geminiService.isConfigured()
        ? 'Live Gemini 1.5 Flash AI Learner'
        : 'Demonstration Mode (Curious Socratic Learner)'
    };
  }

  /**
   * Processes a teaching turn from the student.
   */
  async processTurn({ sessionId, studentExplanation }) {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        id: sessionId || `feynman_${Date.now()}`,
        topicId: 'math-linear-equations',
        subject: 'mathematics',
        topicTitle: 'Linear Equations',
        learningObjectives: [],
        studentExplanations: [],
        history: [],
        isCompleted: false
      };
      this.sessions.set(session.id, session);
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
        modeNotice = 'Live Gemini 1.5 Flash AI Learner';
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
      turnCount: session.studentExplanations.length
    };
  }

  /**
   * Generates comprehensive 6-dimension assessment and knowledge gap report.
   */
  async generateAssessment({ sessionId }) {
    let session = this.sessions.get(sessionId);
    if (!session) {
      return { error: 'Session not found' };
    }

    if (session.studentExplanations.length === 0) {
      return { error: 'No student explanation recorded to assess.' };
    }

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
      isDemonstrationMode: !geminiService.isConfigured(),
      modeNotice: geminiService.isConfigured()
        ? 'Live Gemini AI Assessment'
        : 'Demonstration Mode (6-Dimension Diagnostic Rubric)',
      assessment: session.assessment,
      adaptiveMediaPayload: session.adaptiveMediaPayload
    };
  }

  /**
   * Returns structured Adaptive Media Payload for Phase 5.
   */
  getAdaptiveMediaPayload({ sessionId }) {
    const session = this.sessions.get(sessionId);
    if (!session || !session.adaptiveMediaPayload) {
      return { error: 'No adaptive media payload ready. Please run assessment first.' };
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
      case 'hist-french-revolution':
        return {
          message: `Hey there! I'm Alex. In history class we learned that the French Revolution broke out in 1789, but I never got why the richest kingdom in Europe suddenly collapsed into violence.`,
          firstQuestion: `Can you teach me what the main underlying causes were, and what pushed ordinary people to storm the Bastille?`
        };
      case 'eng-understanding-metaphors':
        return {
          message: `Hi! I'm Alex. In English class we're studying metaphors. My teacher said a metaphor isn't just a fancy comparison with 'like' or 'as', but a way our minds think. That confused me!`,
          firstQuestion: `Could you explain how a metaphor actually works, and what terms like 'Tenor' and 'Vehicle' mean?`
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
