/**
 * Server-Side Gemini AI Service Interface
 * Securely encapsulates communication with Google's Gemini API.
 * 
 * Safety & Security:
 * - API keys remain strictly server-side (process.env.GEMINI_API_KEY).
 * - Enforces 10-second request timeout with AbortController.
 * - Handles rate-limiting, network failures, and JSON structure validation.
 * - Clearly distinguishes real AI inference from Demonstration Mode.
 */

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const DEFAULT_TIMEOUT_MS = 10000;

export class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

  /**
   * Whether a valid Gemini API key is configured in the environment.
   */
  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.trim().length > 10);
  }

  /**
   * Generates structured Socratic evaluation and next question using Gemini.
   */
  async generateSocraticTurn({ systemPrompt, conversationHistory, studentMessage, subject, topicTitle }) {
    if (!this.isConfigured()) {
      return {
        isDemonstrationMode: true,
        modeNotice: 'Demonstration Mode: GEMINI_API_KEY is not set on the server. Using deterministic Socratic engine.',
        data: null
      };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      // Build the contextual prompt
      const contextPrompt = `
Subject: ${subject}
Topic: ${topicTitle}

Conversation History:
${conversationHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

Student's Latest Input:
"${studentMessage}"

TASK:
1. Evaluate student's understanding: "correct" | "partially-correct" | "incorrect" | "insufficient-info".
2. Provide brief, encouraging feedback acknowledging their thought process.
3. Formulate exactly ONE guided Socratic question that helps the student take the next conceptual step.
4. Do NOT give away the final answer. Keep the student discovering.

Respond ONLY with valid JSON matching this schema:
{
  "evaluation": "correct" | "partially-correct" | "incorrect" | "insufficient-info",
  "feedback": "string",
  "nextQuestion": "string",
  "conceptGrasp": "string",
  "isGoalReached": boolean
}
`.trim();

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: contextPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
            responseMimeType: 'application/json'
          }
        })
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[GeminiService] API returned ${response.status}: ${errorText}`);
        return {
          isDemonstrationMode: true,
          modeNotice: `Demonstration Mode: Live Gemini API returned HTTP ${response.status}. Falling back to deterministic engine.`,
          data: null
        };
      }

      const rawJson = await response.json();
      const candidateText = rawJson.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText) {
        throw new Error('Empty response from Gemini');
      }

      const parsedData = JSON.parse(candidateText);

      // Validate required keys
      if (!parsedData.evaluation || !parsedData.nextQuestion) {
        throw new Error('Malformed JSON structure from Gemini');
      }

      return {
        isDemonstrationMode: false,
        modeNotice: 'Live Gemini 1.5 Flash AI',
        data: parsedData
      };
    } catch (err) {
      clearTimeout(timeout);
      const isAbort = err.name === 'AbortError';
      console.warn(`[GeminiService] ${isAbort ? 'Timeout after 10s' : err.message}`);
      return {
        isDemonstrationMode: true,
        modeNotice: `Demonstration Mode: ${isAbort ? 'API request timed out (10s)' : 'Connection unavailable'}. Using deterministic engine.`,
        data: null
      };
    }
  }

  /**
   * Generates a 4-level progressive hint using Gemini or fallback.
   */
  async generateHint({ subject, topicTitle, problemText, hintLevel, currentQuestion }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, hint: null };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const hintPrompts = {
        1: 'Provide Level 1: A subtle conceptual nudge without any numbers, steps, or direct hints.',
        2: 'Provide Level 2: A more specific hint pointing to relevant principles or terms.',
        3: 'Provide Level 3: A concrete next step or relevant formula/principle.',
        4: 'Provide Level 4: A detailed walkthrough of the mechanism or principle without giving the final answer outright.'
      };

      const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Problem/Question: ${problemText}
Current Socratic Focus: ${currentQuestion}

Target Hint Level: ${hintLevel} (1-4)
Requirement: ${hintPrompts[hintLevel] || hintPrompts[1]}
Do NOT give away the final conclusion or complete answer.

Respond ONLY with valid JSON:
{
  "hint": "string",
  "hintLevel": ${hintLevel}
}
`.trim();

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 400,
            responseMimeType: 'application/json'
          }
        })
      });

      clearTimeout(timeout);

      if (!response.ok) return { isDemonstrationMode: true, hint: null };

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(text);

      return {
        isDemonstrationMode: false,
        hint: parsed.hint || null
      };
    } catch {
      clearTimeout(timeout);
      return { isDemonstrationMode: true, hint: null };
    }
  }

  /**
   * Generates a complete solution and pedagogical retrospective.
   */
  async generateCompleteSolution({ subject, topicTitle, problemText }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, solution: null };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Question/Problem: ${problemText}

TASK: Provide a comprehensive, crystal-clear explanation and complete solution.
Explain the underlying first principles, step-by-step logic, and why this concept matters.

Respond ONLY with valid JSON:
{
  "summary": "1-2 sentence core conclusion",
  "steps": ["Step 1 explanation...", "Step 2 explanation...", ...],
  "keyTakeaway": "Core enduring principle",
  "finalAnswer": "Explicit final solution"
}
`.trim();

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1000,
            responseMimeType: 'application/json'
          }
        })
      });

      clearTimeout(timeout);

      if (!response.ok) return { isDemonstrationMode: true, solution: null };

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(text);

      return {
        isDemonstrationMode: false,
        solution: parsed
      };
    } catch {
      clearTimeout(timeout);
      return { isDemonstrationMode: true, solution: null };
    }
  }

  /**
   * Generates a curious AI learner turn in Feynman Mode.
   */
  async generateFeynmanLearnerTurn({ subject, topicTitle, learningObjectives, conversationHistory, latestExplanation }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, data: null };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Learning Objectives:
${(learningObjectives || []).map(o => `- ${o}`).join('\n')}

Conversation History:
${conversationHistory.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

Student's Latest Explanation/Teaching Turn:
"${latestExplanation}"

TASK:
You are Alex, a curious, thoughtful high school peer who is learning this concept from the user.
1. Examine the student's explanation.
2. Acknowledge what was explained clearly.
3. If anything is vague, incomplete, missing a step, or incorrect, challenge it politely ("Wait, how does that work if...?").
4. Formulate exactly ONE curious, focused follow-up question.
5. Do NOT just agree with everything blindly.

Respond ONLY with valid JSON:
{
  "acknowledgment": "string",
  "challengeOrClarification": "string",
  "curiousQuestion": "string",
  "tone": "enthusiastic-learner" | "respectfully-inquisitive" | "thoughtful-curious"
}
`.trim();

      const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600,
            responseMimeType: 'application/json'
          }
        })
      });

      clearTimeout(timeout);

      if (!response.ok) return { isDemonstrationMode: true, data: null };

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(text);

      return {
        isDemonstrationMode: false,
        data: parsed
      };
    } catch {
      clearTimeout(timeout);
      return { isDemonstrationMode: true, data: null };
    }
  }
}

export const geminiService = new GeminiService();
