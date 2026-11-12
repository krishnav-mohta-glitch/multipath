/**
 * Socratic Tutoring Engine
 * Implements MULTIPATH Phase 3 Guided Discovery principles:
 * "Don't immediately give the student the answer. Help them discover it."
 * 
 * Features:
 * - One useful guiding question at a time.
 * - Subject-aware evaluation across 8 domains:
 *   Math, Physics, Chemistry, Biology, History, English/Literature, Geography, Computer Science.
 * - 4-Level Progressive Hint System (nudge -> specific -> next step -> detailed walkthrough).
 * - Complete solution generator upon explicit request.
 * - Client-owned serializable session protocol for stateless serverless resilience.
 * - Honest mode reporting (Live Gemini AI vs Demonstration Mode).
 */

import { evaluateMathResponse } from './evaluators/mathEvaluator.js';
import { evaluateScienceResponse } from './evaluators/scienceEvaluator.js';
import { evaluateHistoryResponse } from './evaluators/historyEvaluator.js';
import { evaluateLiteratureResponse } from './evaluators/literatureEvaluator.js';
import { evaluateGeographyResponse } from './evaluators/geographyEvaluator.js';
import { evaluateCsResponse } from './evaluators/csEvaluator.js';
import { geminiService } from './geminiService.js';

// Subject-specific Socratic System Instructions across all 8 domains
const SOCRATIC_SYSTEM_PROMPTS = {
  mathematics: `
You are a master Socratic mathematics tutor for MULTIPATH.
Your goal: Guide the student to discover how to solve equations and reason algebraically on their own.
RULES:
1. Ask exactly ONE guiding question per turn.
2. Never reveal the final numeric answer or complete solved line unless the student has reached it.
3. If the student makes an arithmetic or sign error, guide them to examine that specific operation (e.g. "What is the inverse operation of adding 7?").
4. Maintain a warm, encouraging, intellectually rigorous tone.
`.trim(),

  physics: `
You are a master Socratic physics tutor for MULTIPATH.
Your goal: Help students discover fundamental physical laws, dynamic force interactions, and dismantle intuitive Aristotelian motion misconceptions.
RULES:
1. Ask exactly ONE question per turn focusing on forces, frames of reference, inertia, or momentum conservation.
2. Guide the student to analyze free-body balances and causal equations (like F_net = ma).
3. Do not lecture; pose physical thought experiments (e.g., deep space with zero friction).
`.trim(),

  chemistry: `
You are a master Socratic chemistry tutor for MULTIPATH.
Your goal: Guide students to uncover atomic structure, periodic trends, electronegativity differences, and bond formation.
RULES:
1. Ask exactly ONE question per turn focusing on valence electrons, electrostatic Coulombic forces, and energy stability.
2. Guide the student to deduce why atoms share or transfer electrons rather than memorizing rules blindly.
3. Address partial charges and dipoles from fundamental electronegativity differences.
`.trim(),

  biology: `
You are a master Socratic biology tutor for MULTIPATH.
Your goal: Help students uncover empirical cellular mechanisms and discard teleological misconceptions.
RULES:
1. Ask exactly ONE question per turn focusing on causal mechanisms (e.g. photolysis, electron transport, enzyme active sites).
2. Never simply dump biological terminology; guide the student to deduce *why* the process occurs.
3. Correct misconceptions gently (e.g., plants do not produce oxygen "for us to breathe"; it is a photolysis byproduct).
`.trim(),

  history: `
You are a master Socratic history tutor for MULTIPATH.
Your goal: Help students evaluate historical causality, primary evidence, and multiple historiographical perspectives.
RULES:
1. Ask exactly ONE question per turn focusing on the connection between long-term structural causes and immediate catalysts.
2. Accept valid alternative interpretations when backed by historical evidence.
3. Avoid treating historical outcomes as preordained; encourage students to examine human choices and material constraints.
`.trim(),

  english: `
You are a master Socratic literature tutor for MULTIPATH.
Your goal: Guide students to decode figurative language using the rhetorical triad (Tenor, Vehicle, Ground).
RULES:
1. Ask exactly ONE question per turn directing attention to imagery, figurative connotations, or structural comparisons.
2. Validate creative and nuanced interpretations that are anchored in the text.
3. Distinguish clearly between literal assertions, similes, and deep metaphorical transfer.
`.trim(),

  geography: `
You are a master Socratic geography and earth systems tutor for MULTIPATH.
Your goal: Guide students to deduce Earth's dynamic geomorphic engines, tectonic mechanics, and human-environmental feedback loops.
RULES:
1. Ask exactly ONE question per turn connecting internal thermal energy (mantle convection, slab pull) to surface landforms.
2. Clarify that the mantle is a ductile solid rock flowing under pressure, not an open subterranean liquid lava ocean.
3. Connect spatial patterns to causal physical and societal processes.
`.trim(),

  'computer-science': `
You are a master Socratic computer science tutor for MULTIPATH.
Your goal: Guide students to deduce algorithmic invariants, precondition requirements, divide-and-conquer strategies, and asymptotic complexity.
RULES:
1. Ask exactly ONE question per turn directing focus to the invariant state (e.g. sorted order) and pointer boundaries.
2. Guide the student to deduce why halving search space yields logarithmic O(log n) scaling.
3. Prompt students to reason about edge cases (empty lists, single elements, target not present).
`.trim()
};

// Aliases for system prompts
SOCRATIC_SYSTEM_PROMPTS.math = SOCRATIC_SYSTEM_PROMPTS.mathematics;
SOCRATIC_SYSTEM_PROMPTS.science = SOCRATIC_SYSTEM_PROMPTS.biology;
SOCRATIC_SYSTEM_PROMPTS.cs = SOCRATIC_SYSTEM_PROMPTS['computer-science'];
SOCRATIC_SYSTEM_PROMPTS.literature = SOCRATIC_SYSTEM_PROMPTS.english;
SOCRATIC_SYSTEM_PROMPTS.geo = SOCRATIC_SYSTEM_PROMPTS.geography;

export class SocraticEngine {
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
    if (!Array.isArray(session.history)) return false;
    if (session.history.length > 80) return false;

    // Check individual messages
    for (const msg of session.history) {
      if (!msg || typeof msg !== 'object') return false;
      if (typeof msg.content !== 'string' || msg.content.length > 5000) return false;
    }

    return true;
  }

  /**
   * Resolves session from in-memory cache OR client-supplied serializable session payload.
   */
  resolveSession(sessionId, sessionPayload) {
    if (this.sessions.has(sessionId)) {
      const cached = this.sessions.get(sessionId);
      // If client supplied an updated payload with more turns, merge/favor client
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
   * Initializes a new Guided Discovery session.
   */
  startSession({ topicId, subject, topicTitle, initialQuestion }) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const question = initialQuestion || this.getDefaultQuestion(topicId, topicTitle);
    const initialGreeting = this.generateInitialGreeting(topicId, subject, topicTitle, question);

    const session = {
      id: sessionId,
      topicId,
      subject: (subject || 'general').toLowerCase(),
      topicTitle,
      problemContext: question,
      hintLevel: 0,
      turnCount: 0,
      history: [
        {
          id: `msg_0`,
          role: 'tutor',
          content: initialGreeting.message,
          nextQuestion: initialGreeting.firstQuestion,
          evaluation: null,
          timestamp: new Date().toISOString()
        }
      ],
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    this.sessions.set(sessionId, session);

    const isLive = geminiService.isConfigured();
    return {
      sessionId,
      session,
      firstQuestion: initialGreeting.firstQuestion,
      isDemonstrationMode: !isLive,
      modeNotice: isLive
        ? `Live Gemini AI (${geminiService.model})`
        : 'Demonstration Mode (Deterministic Socratic Guidance)'
    };
  }

  /**
   * Processes a student's answer or step.
   * Accepts optional client-owned session payload for stateless serverless resilience.
   */
  async processTurn({ sessionId, studentMessage, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session) {
      return {
        error: 'Session not found or session payload invalid. Please start or resume a valid session.',
        code: 'SESSION_NOT_FOUND',
        session: null
      };
    }

    session.turnCount = (session.turnCount || 0) + 1;

    // 1. Run deterministic subject evaluator
    const deterministicResult = this.runDeterministicEvaluation(
      session.subject,
      session.topicId,
      session.problemContext,
      studentMessage
    );

    // 2. Try Gemini AI if configured
    let aiResult = null;
    if (geminiService.isConfigured()) {
      const normalizedSub = session.subject.toLowerCase();
      const sysPrompt = SOCRATIC_SYSTEM_PROMPTS[normalizedSub] || SOCRATIC_SYSTEM_PROMPTS.mathematics;
      aiResult = await geminiService.generateSocraticTurn({
        systemPrompt: sysPrompt,
        conversationHistory: session.history,
        studentMessage,
        subject: session.subject,
        topicTitle: session.topicTitle
      });
    }

    // 3. Synthesize result
    let evaluation = 'partially-correct';
    let feedback = '';
    let nextQuestion = '';
    let isDemonstrationMode = true;
    let modeNotice = 'Demonstration Mode (Guided Socratic Engine)';
    let isGoalReached = false;

    if (deterministicResult.isDeterministic && deterministicResult.evaluation) {
      evaluation = deterministicResult.evaluation;
      feedback = deterministicResult.feedbackTip;
      isGoalReached = deterministicResult.isCorrect === true;

      if (isGoalReached) {
        nextQuestion = `Outstanding work! You've successfully solved for the unknown: ${deterministicResult.studentValue}. Notice how maintaining equality at every step guaranteed the correctness of your answer. Would you like to explore another equation or summarize what we discovered?`;
      } else if (deterministicResult.isPartiallyCorrect) {
        nextQuestion = `You are on the right track! What happens if you double-check your arithmetic sign? What is the opposite operation needed here?`;
      } else {
        nextQuestion = `Let's take a step back. What is the main barrier preventing the variable from standing alone?`;
      }
      isDemonstrationMode = !geminiService.isConfigured();
      modeNotice = geminiService.isConfigured()
        ? `Live Gemini AI (${geminiService.model}) with Deterministic Verification`
        : 'Demonstration Mode (Deterministic Math Verification)';
    } else if (aiResult && !aiResult.isDemonstrationMode && aiResult.data) {
      evaluation = aiResult.data.evaluation;
      feedback = aiResult.data.feedback;
      nextQuestion = aiResult.data.nextQuestion;
      isGoalReached = Boolean(aiResult.data.isGoalReached);
      isDemonstrationMode = false;
      modeNotice = aiResult.modeNotice;
    } else {
      const sim = this.generateSimulatedResponse(session, studentMessage, deterministicResult);
      evaluation = sim.evaluation;
      feedback = sim.feedback;
      nextQuestion = sim.nextQuestion;
      isGoalReached = sim.isGoalReached;
      isDemonstrationMode = true;
      modeNotice = 'Demonstration Mode (Guided Socratic Engine)';
    }

    // 4. Update session history
    const studentEntry = {
      id: `msg_${session.history.length + 1}`,
      role: 'student',
      content: studentMessage,
      timestamp: new Date().toISOString()
    };
    const tutorEntry = {
      id: `msg_${session.history.length + 2}`,
      role: 'tutor',
      content: feedback,
      nextQuestion: nextQuestion,
      evaluation,
      timestamp: new Date().toISOString()
    };

    session.history.push(studentEntry, tutorEntry);
    if (isGoalReached) session.isCompleted = true;

    return {
      evaluation,
      feedback,
      nextQuestion,
      isGoalReached,
      isDemonstrationMode,
      modeNotice,
      turnCount: session.turnCount,
      history: session.history,
      session
    };
  }

  /**
   * Provides the next progressive hint level (1 to 4).
   */
  async provideHint({ sessionId, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session) {
      return { error: 'Session not found', code: 'SESSION_NOT_FOUND', hint: null, session: null };
    }

    session.hintLevel = Math.min(4, (session.hintLevel || 0) + 1);
    const level = session.hintLevel;

    // Check Gemini hint
    if (geminiService.isConfigured()) {
      const aiHint = await geminiService.generateHint({
        subject: session.subject,
        topicTitle: session.topicTitle,
        problemText: session.problemContext,
        hintLevel: level,
        currentQuestion: session.history[session.history.length - 1]?.nextQuestion || ''
      });

      if (!aiHint.isDemonstrationMode && aiHint.hint) {
        return {
          hintLevel: level,
          hint: aiHint.hint,
          isDemonstrationMode: false,
          remainingHints: 4 - level,
          session
        };
      }
    }

    // Deterministic progressive hints
    const hintText = this.getDeterministicHint(session.topicId, session.problemContext, level);
    return {
      hintLevel: level,
      hint: hintText,
      isDemonstrationMode: true,
      remainingHints: 4 - level,
      session
    };
  }

  /**
   * Generates a complete solution when explicitly requested.
   */
  async provideSolution({ sessionId, sessionPayload }) {
    const session = this.resolveSession(sessionId, sessionPayload);
    if (!session) {
      return { error: 'Session not found', code: 'SESSION_NOT_FOUND', solution: null, session: null };
    }

    session.isCompleted = true;

    if (geminiService.isConfigured()) {
      const aiSol = await geminiService.generateCompleteSolution({
        subject: session.subject,
        topicTitle: session.topicTitle,
        problemText: session.problemContext
      });

      if (!aiSol.isDemonstrationMode && aiSol.solution) {
        return {
          isDemonstrationMode: false,
          solution: aiSol.solution,
          session
        };
      }
    }

    const sol = this.getDeterministicSolution(session.topicId, session.problemContext);
    return {
      isDemonstrationMode: true,
      solution: sol,
      session
    };
  }

  // --- Internal Helpers ---

  getDefaultQuestion(topicId, topicTitle) {
    switch (topicId) {
      case 'math-linear-equations':
        return 'Solve for x in the equation: 3x + 7 = 22';
      case 'bio-photosynthesis':
        return 'Why do plants appear green, and what happens to the light energy they capture?';
      case 'phys-newtons-laws':
        return 'If a satellite is coasting in deep space with its engines off, does it need a continuous force to keep moving?';
      case 'chem-periodic-table':
        return 'Why does sodium readily give up an electron to chlorine, and what holds the resulting table salt together?';
      case 'hist-french-revolution':
        return 'What were the primary underlying causes that triggered the French Revolution in 1789?';
      case 'eng-understanding-metaphors':
      case 'eng-metaphors':
        return 'Explain the metaphor: "Time is a thief that steals our moments."';
      case 'geo-plate-tectonics':
        return 'What dynamic thermal mechanism inside Earth drives the motion of tectonic plates, and what occurs at subduction zones?';
      case 'cs-binary-search':
        return 'Why does binary search require a sorted collection, and how does it achieve O(log n) efficiency compared to linear search?';
      default:
        return `How does the core principle of ${topicTitle} work?`;
    }
  }

  generateInitialGreeting(topicId, subject, topicTitle, question) {
    switch (topicId) {
      case 'math-linear-equations':
        return {
          message: `Welcome to Guided Discovery for **Linear Equations**! Here, we won't just tell you the answer—we will discover the balance together step by step. We are exploring: "${question}".`,
          firstQuestion: `Imagine the equation as a balance beam in perfect equilibrium. What is currently happening to the variable x on the left side?`
        };
      case 'bio-photosynthesis':
        return {
          message: `Welcome to Guided Discovery for **Photosynthesis**! We are exploring: "${question}". Let's investigate the molecular machinery from first principles.`,
          firstQuestion: `When sunlight strikes a leaf, what is the very first physical event that occurs inside the chloroplast's thylakoid membrane?`
        };
      case 'phys-newtons-laws':
        return {
          message: `Welcome to Guided Discovery for **Newton's Laws of Motion**! We are exploring: "${question}". Let's examine inertia and force interactions from first principles.`,
          firstQuestion: `Imagine sliding a hockey puck across ice versus deep interstellar space. Why does the puck slow down on ice, and what would it do forever in a vacuum?`
        };
      case 'chem-periodic-table':
        return {
          message: `Welcome to Guided Discovery for **The Periodic Table & Chemical Bonding**! We are exploring: "${question}". Let's investigate valence stability and electrostatic attraction.`,
          firstQuestion: `Looking at sodium (Group 1) and chlorine (Group 17), how many valence electrons does each have in its outermost shell?`
        };
      case 'hist-french-revolution':
        return {
          message: `Welcome to Guided Discovery for **The French Revolution**! We are examining: "${question}". Rather than memorizing a single date, we'll dissect the structural tensions of 1789 France.`,
          firstQuestion: `In 1789, France was the most populous and culturally dominant nation in Europe. Why was the royal treasury completely empty?`
        };
      case 'eng-understanding-metaphors':
      case 'eng-metaphors':
        return {
          message: `Welcome to Guided Discovery for **Understanding Metaphors**! We are analyzing: "${question}". We'll break down the subtle mechanics of figurative transfer.`,
          firstQuestion: `In the statement "Time is a thief", what is the literal subject being discussed (the tenor), and what is the figurative image applied to it (the vehicle)?`
        };
      case 'geo-plate-tectonics':
        return {
          message: `Welcome to Guided Discovery for **Plate Tectonics & Earth Systems**! We are exploring: "${question}". Let's investigate the geophysical engine driving continental drift.`,
          firstQuestion: `Earth's mantle is extremely hot under high pressure. What physical phenomenon causes heated rock deep within the mantle to rise toward the crust?`
        };
      case 'cs-binary-search':
        return {
          message: `Welcome to Guided Discovery for **Binary Search & Algorithmic Complexity**! We are exploring: "${question}". Let's unpack divide-and-conquer efficiency from first principles.`,
          firstQuestion: `If you are looking for a name in a physical telephone directory of 1,000 pages, do you flip page by page from page 1, or do you open to the exact middle? Why?`
        };
      default:
        return {
          message: `Welcome to Guided Discovery for **${topicTitle}** (${subject})! We'll work through: "${question}".`,
          firstQuestion: `What is the very first principle or observation that comes to mind when you consider this problem?`
        };
    }
  }

  runDeterministicEvaluation(subject, topicId, problemContext, studentMessage) {
    const s = (subject || '').toLowerCase();
    const tid = (topicId || '').toLowerCase();

    if (s === 'mathematics' || s === 'math' || tid === 'math-linear-equations') {
      return evaluateMathResponse(problemContext, studentMessage);
    }
    if (s === 'physics' || tid === 'phys-newtons-laws') {
      return evaluateScienceResponse(topicId, studentMessage);
    }
    if (s === 'chemistry' || tid === 'chem-periodic-table') {
      return evaluateScienceResponse(topicId, studentMessage);
    }
    if (s === 'biology' || tid === 'bio-photosynthesis') {
      return evaluateScienceResponse(topicId, studentMessage);
    }
    if (s === 'history' || tid === 'hist-french-revolution') {
      return evaluateHistoryResponse(topicId, studentMessage);
    }
    if (
      s === 'english' ||
      s === 'literature' ||
      tid === 'eng-understanding-metaphors' ||
      tid === 'eng-metaphors'
    ) {
      return evaluateLiteratureResponse(topicId, studentMessage);
    }
    if (s === 'geography' || s === 'geo' || tid === 'geo-plate-tectonics') {
      return evaluateGeographyResponse(topicId, studentMessage);
    }
    if (s === 'computer-science' || s === 'cs' || tid === 'cs-binary-search') {
      return evaluateCsResponse(topicId, studentMessage);
    }

    return { isDeterministic: false };
  }

  generateSimulatedResponse(session, studentMessage, deterministicResult) {
    const clean = studentMessage.toLowerCase();

    if (deterministicResult?.guidanceTip) {
      const evalStatus = deterministicResult.evaluation || 'partially-correct';
      return {
        evaluation: evalStatus,
        feedback: deterministicResult.guidanceTip,
        nextQuestion: evalStatus === 'correct'
          ? `You have uncovered a foundational concept! How would you now synthesize this insight into a complete concluding principle?`
          : `Keeping that observation in mind, what is the next logical piece of the puzzle?`,
        isGoalReached: evalStatus === 'correct'
      };
    }

    // Heuristics for standard demonstration topics
    if (session.topicId === 'bio-photosynthesis') {
      if (clean.includes('chlorophyll') || clean.includes('light') || clean.includes('pigment')) {
        return {
          evaluation: 'partially-correct',
          feedback: `Good observation: Chlorophyll absorbs blue and red wavelengths while reflecting green light back to our eyes.`,
          nextQuestion: `Now, when chlorophyll absorbs those photons, what molecule is physically split to release electrons and oxygen gas?`,
          isGoalReached: false
        };
      }
      if (clean.includes('water') || clean.includes('h2o') || clean.includes('photolysis')) {
        return {
          evaluation: 'correct',
          feedback: `Brilliant! Water molecules (H2O) undergo photolysis, yielding protons, electrons, and O2 as a byproduct.`,
          nextQuestion: `Where do those high-energy electrons travel next to form chemical energy carriers?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'phys-newtons-laws') {
      if (clean.includes('inertia') || clean.includes('friction') || clean.includes('space')) {
        return {
          evaluation: 'correct',
          feedback: `Sound Newtonian reasoning: In deep space without friction, an object coasts forever at constant velocity with zero applied force.`,
          nextQuestion: `What is required to change that velocity—either speed it up, slow it down, or turn it?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'chem-periodic-table') {
      if (clean.includes('valence') || clean.includes('octet') || clean.includes('transfer')) {
        return {
          evaluation: 'correct',
          feedback: `Precise chemical understanding: Sodium transfers its single 3s electron to chlorine's valence shell, achieving stable octets.`,
          nextQuestion: `What force holds the resulting Na+ cation and Cl- anion tightly together in a crystal lattice?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'geo-plate-tectonics') {
      if (clean.includes('convection') || clean.includes('mantle') || clean.includes('heat')) {
        return {
          evaluation: 'correct',
          feedback: `Excellent geodynamic insight: Thermal convection currents in the ductile asthenosphere mantle circulate heat from Earth's core.`,
          nextQuestion: `What happens where two lithospheric plates collide and one plate is colder and denser than the other?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'cs-binary-search') {
      if (clean.includes('sorted') || clean.includes('middle') || clean.includes('half')) {
        return {
          evaluation: 'correct',
          feedback: `Exact algorithmic logic: Because the array is sorted, checking the middle element allows us to immediately discard 50% of the remaining search space.`,
          nextQuestion: `If a dataset has 1,024 elements, what is the maximum number of comparisons binary search will ever make?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'hist-french-revolution') {
      if (clean.includes('debt') || clean.includes('war') || clean.includes('bankrupt')) {
        return {
          evaluation: 'partially-correct',
          feedback: `Accurate identification: Decades of war debt (notably aiding the American Revolution) crippled royal finances.`,
          nextQuestion: `Why couldn't the King simply raise taxes on the richest landowners in the Kingdom?`,
          isGoalReached: false
        };
      }
      if (clean.includes('estate') || clean.includes('nobility') || clean.includes('clergy')) {
        return {
          evaluation: 'correct',
          feedback: `Superb institutional insight: The First (Clergy) and Second (Nobility) Estates held tax exemptions, shifting the burden onto the Third Estate.`,
          nextQuestion: `What sudden environmental shock in 1788-89 transformed this fiscal crisis into a mass street insurrection?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'eng-understanding-metaphors' || session.topicId === 'eng-metaphors') {
      if (clean.includes('time') && clean.includes('thief')) {
        return {
          evaluation: 'correct',
          feedback: `Spot on: "Time" is the tenor (the reality being explained), and "thief" is the vehicle (the borrowed figurative vessel).`,
          nextQuestion: `What is the "ground" between them—what specific attribute does an unnoticed thief share with passing time?`,
          isGoalReached: true
        };
      }
    }

    return {
      evaluation: 'insufficient-info',
      feedback: `You are beginning to examine the problem. In this subject, look closely at the governing mechanism or underlying principle.`,
      nextQuestion: `What specific rule or observation connects your thought back to the core question?`,
      isGoalReached: false
    };
  }

  getDeterministicHint(topicId, problemContext, level) {
    const hintsByTopic = {
      'math-linear-equations': [
        'Level 1: Focus on what operations are attached to the variable x. Remember that equality acts like a balanced scale.',
        'Level 2: Look at the constant term (+7). To isolate x, what is the inverse (opposite) operation of addition?',
        'Level 3: Subtract 7 from both sides: 3x + 7 - 7 = 22 - 7, giving 3x = 15. Now what operation reverses multiplication by 3?',
        'Level 4: Detailed Step: Divide both sides by the coefficient 3: (3x)/3 = 15/3. This leaves x = 5.'
      ],
      'bio-photosynthesis': [
        'Level 1: Think about the electromagnetic spectrum of light and what wavelengths of light are absorbed versus reflected.',
        'Level 2: Chlorophyll absorbs blue and red wavelengths efficiently, but does not absorb green photons; it bounces them back.',
        'Level 3: In the thylakoid membrane, light energy drives "photolysis"—the splitting of water molecules (H2O) into electrons, hydrogen protons, and oxygen.',
        'Level 4: Detailed Step: The light reactions use water photolysis to recharge ADP and NADP+ into high-energy ATP and NADPH, which then power the Calvin cycle in the stroma to fix CO2 into glucose.'
      ],
      'phys-newtons-laws': [
        'Level 1: Think about Newton\'s First Law: an object in motion stays in motion unless an unbalanced external force acts on it.',
        'Level 2: Friction and air resistance are external forces on Earth. In space, there is no air or surface friction to oppose forward velocity.',
        'Level 3: Force does not cause velocity; net force causes acceleration (change in velocity). With F_net = 0, acceleration is 0, so speed and direction remain constant.',
        'Level 4: Detailed Step: A deep-space probe requires fuel only to change its trajectory or accelerate; coasting requires zero fuel and zero applied force.'
      ],
      'chem-periodic-table': [
        'Level 1: Look at the valence electron shells: atoms strive for a stable octet (8 outer electrons), mirroring noble gases.',
        'Level 2: Sodium has 1 valence electron (easily lost), while chlorine has 7 (readily accepts 1).',
        'Level 3: When sodium transfers 1 electron to chlorine, it forms Na+ and Cl- ions with full outer shells.',
        'Level 4: Detailed Step: The strong electrostatic attraction between the oppositely charged Na+ cation and Cl- anion forms the ionic bond in sodium chloride.'
      ],
      'hist-french-revolution': [
        'Level 1: Consider the difference between long-term systemic pressures and immediate physical triggers in 1788-1789.',
        'Level 2: The French Crown was bankrupt due to foreign wars (Seven Years War, American Revolution), but could not tax the wealthiest citizens.',
        'Level 3: The Three Estates system created deep resentment: the 1st and 2nd Estates (Clergy & Nobility) were largely tax-exempt, forcing the 3rd Estate (98% of the population) to bear the fiscal burden.',
        'Level 4: Detailed Step: A disastrous harvest in 1788 doubled bread prices in Paris, turning political deadlock into popular armed uprising (Storming of the Bastille).'
      ],
      'eng-understanding-metaphors': [
        'Level 1: Separate the literal truth from the figurative comparison. A metaphor asserts an identity (X is Y) rather than using "like" or "as".',
        'Level 2: Identify the two parts: Tenor (the real subject being described) and Vehicle (the imaginative image used).',
        'Level 3: Examine the "Ground": the shared quality or connotation that makes the comparison evocative and intellectually meaningful.',
        'Level 4: Detailed Step: In "Time is a thief", the tenor is Time, the vehicle is a Thief, and the ground is the silent, sneaky, irreversible deprivation of moments without our conscious permission.'
      ],
      'eng-metaphors': [
        'Level 1: Separate the literal truth from the figurative comparison. A metaphor asserts an identity (X is Y) rather than using "like" or "as".',
        'Level 2: Identify the two parts: Tenor (the real subject being described) and Vehicle (the imaginative image used).',
        'Level 3: Examine the "Ground": the shared quality or connotation that makes the comparison evocative and intellectually meaningful.',
        'Level 4: Detailed Step: In "Time is a thief", the tenor is Time, the vehicle is a Thief, and the ground is the silent, sneaky, irreversible deprivation of moments without our conscious permission.'
      ],
      'geo-plate-tectonics': [
        'Level 1: Think about how boiling water circulates in a pot: heated water rises, cools at the surface, and sinks.',
        'Level 2: Earth\'s core heats the lower mantle, generating massive thermal convection currents in the plastic asthenosphere.',
        'Level 3: Where convection currents upwell, tectonic plates pull apart (divergent boundaries like the Mid-Atlantic Ridge); where they sink, one plate subducts beneath another.',
        'Level 4: Detailed Step: Dense oceanic lithosphere sinks into the mantle at subduction trenches (slab pull), which is the primary gravitational engine driving tectonic drift.'
      ],
      'cs-binary-search': [
        'Level 1: Consider how you would guess a secret number between 1 and 100 with "higher/lower" feedback.',
        'Level 2: Guessing the midpoint (50) immediately eliminates 50 numbers. But this only works if the numbers are in strict sorted order.',
        'Level 3: In an array: calculate mid = floor((low + high) / 2). If target < arr[mid], adjust high = mid - 1; if target > arr[mid], adjust low = mid + 1.',
        'Level 4: Detailed Step: Because each comparison halves the remaining elements, N elements require at most ceil(log2(N)) steps, giving O(log n) time complexity.'
      ]
    };

    const topicHints = hintsByTopic[topicId] || hintsByTopic['math-linear-equations'];
    return topicHints[level - 1] || topicHints[0];
  }

  getDeterministicSolution(topicId, problemContext) {
    switch (topicId) {
      case 'math-linear-equations':
        return {
          summary: 'A linear equation represents a state of equality that is solved by systematically undoing operations in reverse order.',
          steps: [
            '1. Identify the equation: 3x + 7 = 22.',
            '2. Apply the Subtraction Property of Equality: Subtract 7 from both sides to isolate the variable term: 3x = 15.',
            '3. Apply the Division Property of Equality: Divide both sides by 3 to isolate x: x = 15 / 3 = 5.',
            '4. Verification: Substitute x = 5 into original equation: 3(5) + 7 = 15 + 7 = 22. Equality is confirmed.'
          ],
          keyTakeaway: 'The golden rule of algebra: whatever operation is applied to one side must be mirrored on the other to preserve mathematical equilibrium.',
          finalAnswer: 'x = 5'
        };

      case 'bio-photosynthesis':
        return {
          summary: 'Photosynthesis is a two-stage biochemical transducer converting electromagnetic photon energy into the chemical energy of carbon-carbon covalent bonds.',
          steps: [
            '1. Light-Dependent Reactions (Thylakoids): Chlorophyll pigments absorb blue and red photons, exciting electrons. Water molecules (H2O) are split (photolysis), releasing O2 as a waste byproduct while charging ATP and NADPH.',
            '2. Foliage Color: Chlorophyll does not absorb green wavelengths; it reflects them, which is why leaves appear green.',
            '3. Light-Independent Calvin Cycle (Stroma): Uses the chemical energy from ATP and NADPH to fix inorganic atmospheric CO2 into three-carbon sugars (G3P), synthesizing glucose.'
          ],
          keyTakeaway: 'Sunlight does not turn into plant mass; rather, light provides the energy to strip electrons from water and fuse atmospheric carbon into solid biological matter.',
          finalAnswer: '6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2'
        };

      case 'phys-newtons-laws':
        return {
          summary: "Newton's Laws describe the mathematical relationship between forces and motion, establishing that net force produces acceleration rather than maintaining velocity.",
          steps: [
            "1. First Law (Inertia): An object remains at rest or in uniform linear motion unless an unbalanced net external force acts upon it (F_net = 0 => a = 0).",
            "2. Second Law (Dynamics): F_net = ma. Acceleration is directly proportional to net force and inversely proportional to mass.",
            "3. Third Law (Interaction): For every applied action force, there is a simultaneous reaction force equal in magnitude and opposite in direction acting on the other body."
          ],
          keyTakeaway: 'Forces cause changes in motion (acceleration), not motion itself. In deep space, an object coasts forever with zero force.',
          finalAnswer: 'F_net = ma; no continuous force is required to sustain constant velocity in vacuum.'
        };

      case 'chem-periodic-table':
        return {
          summary: 'Chemical bonding is driven by the thermodynamic imperative of atoms to attain stable valence electron configurations (octets) through electron sharing or transfer.',
          steps: [
            '1. Valence Configurations: Elements in the same periodic group share identical outer valence configurations, dictating reactivity.',
            '2. Electronegativity Differential: Large differences (ΔEN > 2.0) lead to ionic electron transfer (e.g. Na+ and Cl-); smaller differences lead to covalent electron sharing.',
            '3. Electrostatic Bonding: Oppositely charged ions attract via Coulombic forces into macroscopic crystal lattices.'
          ],
          keyTakeaway: 'Electronegativity differences determine bond character (ionic vs covalent), governed by the drive for valence shell octet stability.',
          finalAnswer: 'Ionic bond formed via electron transfer from Na to Cl, held by electrostatic Coulombic forces.'
        };

      case 'hist-french-revolution':
        return {
          summary: 'The French Revolution of 1789 was caused by an explosive intersection of structural fiscal bankruptcy, archaic caste tax privileges, and an acute famine subsistence crisis.',
          steps: [
            '1. Fiscal Insolvency: Massive Crown deficits accumulated from financing the Seven Years War and the American War of Independence.',
            '2. Social Inequity: The Three Estates system gave the Clergy (1st) and Nobility (2nd) total tax exemption, forcing the overburdened Third Estate to bear the tax burden.',
            '3. Institutional Paralysis: Regional Parlements blocked tax universalization, forcing the convocation of the Estates-General.',
            '4. Subsistence Catalyst: The 1788 hailstorms and brutal winter doubled bread prices in Paris, sparking the storming of the Bastille.'
          ],
          keyTakeaway: 'Revolutions occur not merely when conditions are miserable, but when an entrenched social hierarchy proves institutionally incapable of reform during economic crisis.',
          finalAnswer: 'A multi-causal synthesis of fiscal bankruptcy, Third Estate disenfranchisement, Enlightenment discourse, and subsistence famine.'
        };

      case 'eng-understanding-metaphors':
      case 'eng-metaphors':
        return {
          summary: 'A metaphor is a cognitive figure of speech that transfers the attributes, connotations, and emotional resonance of a familiar vehicle onto an underlying tenor without explicit comparative markers.',
          steps: [
            '1. Identify the Tenor: The literal subject or concept being examined (e.g. "Time").',
            '2. Identify the Vehicle: The figurative vessel or concrete image providing the metaphorical lens (e.g. "a Thief").',
            '3. Analyze the Ground: The shared semantic and emotional terrain between them (stealth, irrevocability, quiet taking away of value).',
            '4. Contrast with Simile: Unlike a simile ("Time is like a thief"), a metaphor asserts an ontological equation, forcing the reader to cognitively fuse the two domains.'
          ],
          keyTakeaway: 'Metaphors do not merely decorate language; they reshape how human minds perceive and reason about abstract concepts through concrete physical analogies.',
          finalAnswer: 'Tenor: Time; Vehicle: Thief; Ground: Irreversible, silent deprivation.'
        };

      case 'geo-plate-tectonics':
        return {
          summary: 'Plate tectonics is the unifying geodynamic theory explaining how mantle convection currents and gravitational slab pull drive the continuous motion of lithospheric plates.',
          steps: [
            '1. Thermal Engine: Earth\'s internal radioactive and primordial heat creates convection currents in the plastic asthenosphere mantle.',
            '2. Divergent Boundaries: Upwelling magma creates new oceanic crust at mid-ocean spreading ridges.',
            '3. Convergent Subduction: Colder, denser oceanic plates sink into the mantle at subduction zones, pulling the trailing plate (slab pull) and triggering volcanism and deep earthquakes.',
            '4. Transform Boundaries: Plates slide horizontally past one another along faults (e.g. San Andreas Fault).'
          ],
          keyTakeaway: 'Earth\'s rigid lithosphere floats on a ductile, convective asthenosphere; gravitational slab pull and thermal convection continuously recycle the planet\'s surface.',
          finalAnswer: 'Mantle convection currents and slab pull drive plate interactions at convergent, divergent, and transform boundaries.'
        };

      case 'cs-binary-search':
        return {
          summary: 'Binary search is a logarithmic divide-and-conquer algorithm that finds an element in a sorted collection by repeatedly halving the search space.',
          steps: [
            '1. Essential Precondition: The input array MUST be sorted. Without sorted order, halving cannot eliminate elements safely.',
            '2. Midpoint Calculation: Compare search target with element at mid = floor((low + high) / 2).',
            '3. Search Space Halving: If target equals arr[mid], element is found. If target < arr[mid], search left half (high = mid - 1). If target > arr[mid], search right half (low = mid + 1).',
            '4. Complexity Analysis: Each step eliminates half the remaining elements. Thus, N elements require at most ceil(log2(N)) steps, achieving O(log n) time complexity.'
          ],
          keyTakeaway: 'Binary search trades the O(n) linear scan for O(log n) logarithmic scaling by exploiting the sorted invariant through divide-and-conquer.',
          finalAnswer: 'O(log n) time complexity achieved by repeatedly dividing the sorted search space in half.'
        };

      default:
        return {
          summary: `Complete foundational analysis for ${problemContext}`,
          steps: [
            '1. Frame the core conceptual questions.',
            '2. Deduce the governing principles from first principles.',
            '3. Synthesize the findings into an actionable conclusion.'
          ],
          keyTakeaway: 'Consistent deductive inquiry unlocks complex conceptual mastery.',
          finalAnswer: 'Conceptual derivation completed.'
        };
    }
  }
}

export const socraticEngine = new SocraticEngine();
