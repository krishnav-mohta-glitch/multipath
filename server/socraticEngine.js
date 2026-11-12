/**
 * Socratic Tutoring Engine
 * Implements MULTIPATH Phase 3 Guided Discovery principles:
 * "Don't immediately give the student the answer. Help them discover it."
 * 
 * Features:
 * - One useful guiding question at a time.
 * - Subject-aware evaluation: Math, Science, History, Literature.
 * - 4-Level Progressive Hint System (nudge -> specific -> next step -> detailed walkthrough).
 * - Complete solution generator upon explicit request.
 * - Deterministic fallback with explicit demonstration mode indicator.
 */

import { evaluateMathResponse } from './evaluators/mathEvaluator.js';
import { evaluateScienceResponse } from './evaluators/scienceEvaluator.js';
import { evaluateHistoryResponse } from './evaluators/historyEvaluator.js';
import { evaluateLiteratureResponse } from './evaluators/literatureEvaluator.js';
import { geminiService } from './geminiService.js';

// Subject-specific Socratic System Instructions
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

  science: `
You are a master Socratic science tutor for MULTIPATH.
Your goal: Help students uncover empirical mechanisms, causal relationships, and discard teleological misconceptions.
RULES:
1. Ask exactly ONE question per turn focusing on the causal mechanism (e.g. photolysis, energy carriers, wavelength absorption).
2. Never simply dump biological terminology; guide the student to deduce *why* the process occurs.
3. Correct common misconceptions gently (e.g., plants do not create oxygen "for us to breathe"; it is a photolysis byproduct).
`.trim(),

  history: `
You are a master Socratic history tutor for MULTIPATH.
Your goal: Help students evaluate historical causality, primary evidence, and multiple historiographical perspectives.
RULES:
1. Ask exactly ONE question per turn focusing on the connection between long-term structural causes and immediate catalysts.
2. Accept valid alternative interpretations when backed by evidence.
3. Avoid treating historical outcomes as preordained; encourage students to examine choices and material constraints.
`.trim(),

  english: `
You are a master Socratic literature tutor for MULTIPATH.
Your goal: Guide students to decode figurative language using the rhetorical triad (Tenor, Vehicle, Ground).
RULES:
1. Ask exactly ONE question per turn directing attention to imagery, figurative connotations, or structural comparisons.
2. Validate creative and nuanced interpretations that are anchored in the text.
3. Distinguish clearly between literal assertions, similes, and deep metaphorical transfer.
`.trim()
};

export class SocraticEngine {
  constructor() {
    this.sessions = new Map();
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
      subject: subject.toLowerCase(),
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

    return {
      sessionId,
      session,
      firstQuestion: initialGreeting.firstQuestion,
      isDemonstrationMode: !geminiService.isConfigured(),
      modeNotice: geminiService.isConfigured()
        ? 'Live Gemini 1.5 Flash AI'
        : 'Demonstration Mode (Deterministic Socratic Guidance)'
    };
  }

  /**
   * Processes a student's answer or step.
   */
  async processTurn({ sessionId, studentMessage }) {
    let session = this.sessions.get(sessionId);
    if (!session) {
      // Reconstitute fallback session if state was lost
      session = {
        id: sessionId || `session_${Date.now()}`,
        topicId: 'math-linear-equations',
        subject: 'mathematics',
        topicTitle: 'Linear Equations',
        problemContext: studentMessage,
        hintLevel: 0,
        turnCount: 0,
        history: [],
        isCompleted: false
      };
      this.sessions.set(session.id, session);
    }

    session.turnCount++;

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
      const sysPrompt = SOCRATIC_SYSTEM_PROMPTS[session.subject] || SOCRATIC_SYSTEM_PROMPTS.mathematics;
      aiResult = await geminiService.generateSocraticTurn({
        systemPrompt: sysPrompt,
        conversationHistory: session.history,
        studentMessage,
        subject: session.subject,
        topicTitle: session.topicTitle
      });
    }

    // 3. Synthesize result (prefer deterministic mathematical certainty where applicable)
    let evaluation = 'partially-correct';
    let feedback = '';
    let nextQuestion = '';
    let isDemonstrationMode = true;
    let modeNotice = 'Demonstration Mode (Deterministic Socratic Engine)';
    let isGoalReached = false;

    if (deterministicResult.isDeterministic && deterministicResult.evaluation) {
      // Deterministic math check takes precedence for arithmetic truth
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
        ? 'Live Gemini AI with Deterministic Math Verification'
        : 'Demonstration Mode (Deterministic Math Verification)';
    } else if (aiResult && !aiResult.isDemonstrationMode && aiResult.data) {
      // Use Live Gemini Response
      evaluation = aiResult.data.evaluation;
      feedback = aiResult.data.feedback;
      nextQuestion = aiResult.data.nextQuestion;
      isGoalReached = Boolean(aiResult.data.isGoalReached);
      isDemonstrationMode = false;
      modeNotice = aiResult.modeNotice;
    } else {
      // Fallback deterministic / topic-specific reasoning
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
      history: session.history
    };
  }

  /**
   * Provides the next progressive hint level (1 to 4).
   */
  async provideHint({ sessionId }) {
    let session = this.sessions.get(sessionId);
    if (!session) {
      return { error: 'Session not found', hint: null };
    }

    session.hintLevel = Math.min(4, session.hintLevel + 1);
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
          remainingHints: 4 - level
        };
      }
    }

    // Deterministic progressive hints
    const hintText = this.getDeterministicHint(session.topicId, session.problemContext, level);
    return {
      hintLevel: level,
      hint: hintText,
      isDemonstrationMode: !geminiService.isConfigured(),
      remainingHints: 4 - level
    };
  }

  /**
   * Generates a complete solution when explicitly requested.
   */
  async provideSolution({ sessionId }) {
    let session = this.sessions.get(sessionId);
    if (!session) {
      return { error: 'Session not found', solution: null };
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
          solution: aiSol.solution
        };
      }
    }

    // Deterministic complete solution
    const sol = this.getDeterministicSolution(session.topicId, session.problemContext);
    return {
      isDemonstrationMode: !geminiService.isConfigured(),
      solution: sol
    };
  }

  // --- Internal Helpers ---

  getDefaultQuestion(topicId, topicTitle) {
    switch (topicId) {
      case 'math-linear-equations':
        return 'Solve for x in the equation: 3x + 7 = 22';
      case 'bio-photosynthesis':
        return 'Why do plants appear green, and what happens to the light energy they capture?';
      case 'hist-french-revolution':
        return 'What were the primary underlying causes that triggered the French Revolution in 1789?';
      case 'eng-metaphors':
        return 'Explain the metaphor: "Time is a thief that steals our moments."';
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
      case 'hist-french-revolution':
        return {
          message: `Welcome to Guided Discovery for **The French Revolution**! We are examining: "${question}". Rather than memorizing a single date, we'll dissect the structural tensions of 1789 France.`,
          firstQuestion: `In 1789, France was the most populous and culturally dominant nation in Europe. Why was the royal treasury completely empty?`
        };
      case 'eng-metaphors':
        return {
          message: `Welcome to Guided Discovery for **Understanding Metaphors**! We are analyzing: "${question}". We'll break down the subtle mechanics of figurative transfer.`,
          firstQuestion: `In the statement "Time is a thief", what is the literal subject being discussed (the tenor), and what is the figurative image applied to it (the vehicle)?`
        };
      default:
        return {
          message: `Welcome to Guided Discovery for **${topicTitle}** (${subject})! We'll work through: "${question}".`,
          firstQuestion: `What is the very first principle or observation that comes to mind when you consider this problem?`
        };
    }
  }

  runDeterministicEvaluation(subject, topicId, problemContext, studentMessage) {
    if (subject === 'mathematics') {
      return evaluateMathResponse(problemContext, studentMessage);
    }
    if (subject === 'biology' || topicId === 'bio-photosynthesis') {
      return evaluateScienceResponse(topicId, studentMessage);
    }
    if (subject === 'history' || topicId === 'hist-french-revolution') {
      return evaluateHistoryResponse(topicId, studentMessage);
    }
    if (subject === 'english' || topicId === 'eng-metaphors') {
      return evaluateLiteratureResponse(topicId, studentMessage);
    }
    return { isDeterministic: false };
  }

  generateSimulatedResponse(session, studentMessage, deterministicResult) {
    const clean = studentMessage.toLowerCase();

    // Check if deterministic evaluation provided guidance
    if (deterministicResult?.guidanceTip) {
      const evalStatus = deterministicResult.evaluation || 'correct';
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

    if (session.topicId === 'hist-french-revolution') {
      if (clean.includes('money') || clean.includes('debt') || clean.includes('bankrupt') || clean.includes('war')) {
        return {
          evaluation: 'partially-correct',
          feedback: `Accurate identification: Decades of war debt (notably aiding the American Revolution) crippled royal finances.`,
          nextQuestion: `Why couldn't the King simply raise taxes on the richest landowners in the Kingdom?`,
          isGoalReached: false
        };
      }
      if (clean.includes('estate') || clean.includes('nobility') || clean.includes('clergy') || clean.includes('privilege')) {
        return {
          evaluation: 'correct',
          feedback: `Superb institutional insight: The First (Clergy) and Second (Nobility) Estates held tax exemptions, shifting the burden onto the Third Estate.`,
          nextQuestion: `What sudden environmental shock in 1788-89 transformed this fiscal crisis into a mass street insurrection?`,
          isGoalReached: true
        };
      }
    }

    if (session.topicId === 'eng-metaphors') {
      if (clean.includes('time') && clean.includes('thief')) {
        return {
          evaluation: 'correct',
          feedback: `Spot on: "Time" is the tenor (the reality being explained), and "thief" is the vehicle (the borrowed figurative vessel).`,
          nextQuestion: `What is the "ground" between them—what specific attribute does an unnoticed thief share with passing time?`,
          isGoalReached: true
        };
      }
    }

    // General fallback
    return {
      evaluation: 'partially-correct',
      feedback: `Interesting perspective. You're beginning to examine the structure of the problem.`,
      nextQuestion: `Can you specify which exact factor or rule links your idea back to the core question?`,
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
      'hist-french-revolution': [
        'Level 1: Consider the difference between long-term systemic pressures and immediate physical triggers in 1788-1789.',
        'Level 2: The French Crown was bankrupt due to foreign wars (Seven Years War, American Revolution), but could not tax the wealthiest citizens.',
        'Level 3: The Three Estates system created deep resentment: the 1st and 2nd Estates (Clergy & Nobility) were largely tax-exempt, forcing the 3rd Estate (98% of the population) to bear the fiscal burden.',
        'Level 4: Detailed Step: A disastrous harvest in 1788 doubled bread prices in Paris, turning political deadlock into popular armed uprising (Storming of the Bastille).'
      ],
      'eng-metaphors': [
        'Level 1: Separate the literal truth from the figurative comparison. A metaphor asserts an identity (X is Y) rather than using "like" or "as".',
        'Level 2: Identify the two parts: Tenor (the real subject being described) and Vehicle (the imaginative image used).',
        'Level 3: Examine the "Ground": the shared quality or connotation that makes the comparison evocative and intellectually meaningful.',
        'Level 4: Detailed Step: In "Time is a thief", the tenor is Time, the vehicle is a Thief, and the ground is the silent, sneaky, irreversible deprivation of moments without our conscious permission.'
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

      case 'hist-french-revolution':
        return {
          summary: 'The French Revolution of 1789 was caused by an explosive intersection of structural fiscal bankruptcy, archaic caste tax privileges, and an acute famine subsistence crisis.',
          steps: [
            '1. Fiscal Insolvency: Massive Crown deficits accumulated from financing the Seven Years War and the American War of Independence.',
            '2. Social Inequity: The Three Estates system gave the Clergy (1st) and Nobility (2nd) total tax exemption, forcing the overburdened Third Estate (bourgeoisie, peasants, artisans) to bear the tax burden.',
            '3. Institutional Paralysis: King Louis XVI attempted fiscal reforms, but regional Parlements (nobles) blocked tax universalization, forcing the convocation of the Estates-General.',
            '4. Subsistence Catalyst: The severe 1788 hailstorms and brutal winter decimated cereal harvests, causing bread prices to soar to 88% of an artisan wage by July 1789, sparking the storming of the Bastille.'
          ],
          keyTakeaway: 'Revolutions occur not merely when conditions are miserable, but when an entrenched social and fiscal hierarchy proves institutionally incapable of reform during an economic crisis.',
          finalAnswer: 'A multi-causal synthesis of fiscal bankruptcy, Third Estate disenfranchisement, Enlightenment discourse, and subsistence famine.'
        };

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
