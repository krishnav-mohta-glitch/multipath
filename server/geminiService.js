/**
 * Server-Side Gemini AI Service Interface
 * Securely encapsulates communication with Google's Gemini API.
 * 
 * Safety & Security:
 * - API keys remain strictly server-side (process.env.GEMINI_API_KEY).
 * - Enforces 10-second request timeout with AbortController.
 * - Model is configurable via GEMINI_MODEL env var (defaults to gemini-3.8-flash).
 * - Uses x-goog-api-key request header; never embeds key in request URL.
 * - Never prints API keys or raw credentials in logs.
 * - Handles rate-limiting, network failures, and JSON structure validation.
 * - Clearly distinguishes real AI inference from Demonstration Mode.
 */

const DEFAULT_TIMEOUT_MS = 10000;
const DEFAULT_MODEL = 'gemini-3.8-flash';

export class GeminiService {
  constructor() {
    this.defaultModel = DEFAULT_MODEL;
  }

  get apiKey() {
    return (process.env.GEMINI_API_KEY || '').trim();
  }

  get model() {
    return (process.env.GEMINI_MODEL || this.defaultModel).trim();
  }

  get endpoint() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
  }

  /**
   * Whether a valid Gemini API key is configured in the environment.
   */
  isConfigured() {
    return Boolean(this.apiKey && this.apiKey.length > 10);
  }

  /**
   * Internal sanitized fetch call to Gemini API using x-goog-api-key header.
   */
  async _callApi({ contents, systemInstruction, temperature = 0.2, maxOutputTokens = 1200 }) {
    if (!this.isConfigured()) {
      return { ok: false, status: 0, reason: 'KEY_NOT_CONFIGURED', data: null };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    try {
      const payload = {
        contents,
        generationConfig: {
          temperature,
          maxOutputTokens,
          responseMimeType: 'application/json'
        }
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        signal: controller.signal,
        body: JSON.stringify(payload)
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const rawStatus = response.status;
        const errorText = await response.text().catch(() => '');
        // Sanitize error text to ensure API key is never logged
        const safeError = errorText.replace(new RegExp(this.apiKey.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '[REDACTED]');
        console.warn(`[GeminiService] Model ${this.model} returned HTTP ${rawStatus}: ${safeError.slice(0, 150)}`);
        return {
          ok: false,
          status: rawStatus,
          reason: rawStatus === 429 ? 'RATE_LIMITED' : `HTTP_${rawStatus}`,
          data: null
        };
      }

      const rawJson = await response.json();
      const candidateText = rawJson.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!candidateText || typeof candidateText !== 'string') {
        return { ok: false, status: 200, reason: 'EMPTY_CANDIDATE', data: null };
      }

      // Strip optional Markdown fences if model wrapped response in ```json ... ```
      let cleanedText = candidateText.trim();
      if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, '').replace(/```$/g, '').trim();
      }

      const parsedData = JSON.parse(cleanedText);
      return { ok: true, status: 200, data: parsedData };
    } catch (err) {
      clearTimeout(timeout);
      const isAbort = err.name === 'AbortError';
      console.warn(`[GeminiService] ${isAbort ? 'Timeout after 10s' : 'Network/Parsing exception'}`);
      return {
        ok: false,
        status: isAbort ? 408 : 500,
        reason: isAbort ? 'TIMEOUT' : 'NETWORK_ERROR',
        data: null
      };
    }
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

    const contextPrompt = `
Subject: ${subject}
Topic: ${topicTitle}

Conversation History:
${(conversationHistory || []).map(m => `${(m.role || 'user').toUpperCase()}: ${m.content}`).join('\n')}

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

    const result = await this._callApi({
      systemInstruction: systemPrompt,
      contents: [{ role: 'user', parts: [{ text: contextPrompt }] }],
      temperature: 0.3,
      maxOutputTokens: 800
    });

    if (!result.ok || !result.data) {
      const notice = result.reason === 'RATE_LIMITED'
        ? 'Demonstration Mode: Live Gemini API rate-limited (429). Falling back to deterministic engine.'
        : `Demonstration Mode: Live Gemini API unavailable (${result.reason || 'offline'}). Using deterministic engine.`;
      return {
        isDemonstrationMode: true,
        modeNotice: notice,
        data: null
      };
    }

    const parsedData = result.data;
    const validEvaluations = ['correct', 'partially-correct', 'incorrect', 'insufficient-info'];
    if (
      !validEvaluations.includes(parsedData.evaluation) ||
      typeof parsedData.nextQuestion !== 'string' ||
      typeof parsedData.feedback !== 'string'
    ) {
      return {
        isDemonstrationMode: true,
        modeNotice: 'Demonstration Mode: Malformed JSON structure from Gemini. Using deterministic engine.',
        data: null
      };
    }

    return {
      isDemonstrationMode: false,
      modeNotice: `Live Gemini AI (${this.model})`,
      data: parsedData
    };
  }

  /**
   * Generates a 4-level progressive hint using Gemini.
   */
  async generateHint({ subject, topicTitle, problemText, hintLevel, currentQuestion }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, hint: null };
    }

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

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.2,
      maxOutputTokens: 400
    });

    if (result.ok && result.data && typeof result.data.hint === 'string') {
      return {
        isDemonstrationMode: false,
        hint: result.data.hint
      };
    }

    return { isDemonstrationMode: true, hint: null };
  }

  /**
   * Generates a complete solution and pedagogical retrospective.
   */
  async generateCompleteSolution({ subject, topicTitle, problemText }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, solution: null };
    }

    const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Question/Problem: ${problemText}

TASK: Provide a comprehensive, crystal-clear explanation and complete solution.
Explain the underlying first principles, step-by-step logic, and why this concept matters.

Respond ONLY with valid JSON:
{
  "summary": "1-2 sentence core conclusion",
  "steps": ["Step 1 explanation...", "Step 2 explanation..."],
  "keyTakeaway": "Core enduring principle",
  "finalAnswer": "Explicit final solution"
}
`.trim();

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.2,
      maxOutputTokens: 1000
    });

    if (
      result.ok &&
      result.data &&
      typeof result.data.summary === 'string' &&
      Array.isArray(result.data.steps) &&
      typeof result.data.finalAnswer === 'string'
    ) {
      return {
        isDemonstrationMode: false,
        solution: result.data
      };
    }

    return { isDemonstrationMode: true, solution: null };
  }

  /**
   * Generates a curious AI learner turn in Feynman Mode.
   */
  async generateFeynmanLearnerTurn({ subject, topicTitle, learningObjectives, conversationHistory, latestExplanation }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, data: null };
    }

    const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Learning Objectives:
${(learningObjectives || []).map(o => `- ${o}`).join('\n')}

Conversation History:
${(conversationHistory || []).map(m => `${(m.role || 'user').toUpperCase()}: ${m.content}`).join('\n')}

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

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.3,
      maxOutputTokens: 600
    });

    if (
      result.ok &&
      result.data &&
      typeof result.data.acknowledgment === 'string' &&
      typeof result.data.curiousQuestion === 'string'
    ) {
      return {
        isDemonstrationMode: false,
        modeNotice: `Live Gemini AI Learner (${this.model})`,
        data: result.data
      };
    }

    return { isDemonstrationMode: true, data: null };
  }

  /**
   * Generates genuine Gemini 6-dimension assessment for Feynman Mode.
   */
  async generateFeynmanAssessment({ subject, topicTitle, topicId, learningObjectives, conversationHistory, allStudentTexts }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, assessment: null, adaptiveMediaPayload: null };
    }

    const combinedStudentExplanation = (allStudentTexts || []).join('\n\n');
    const prompt = `
Subject: ${subject}
Topic: ${topicTitle}
Topic ID: ${topicId}
Learning Objectives:
${(learningObjectives || []).map(o => `- ${o}`).join('\n')}

Student's Explanations in Teaching Dialogue:
"${combinedStudentExplanation}"

Full Dialogue Context:
${(conversationHistory || []).map(m => `[${m.role || 'speaker'}]: ${m.content}`).join('\n')}

TASK:
Act as a master pedagogical evaluator. Conduct a comprehensive 6-dimension diagnostic assessment of the student's explanation.
Dimensions to evaluate:
1. Accuracy
2. Completeness
3. Conceptual Understanding
4. Relationships Between Concepts
5. Use of Important Terminology
6. Quality of Reasoning

For each concept in the learning objectives, assess status as: "demonstrated" | "partly-demonstrated" | "not-yet-demonstrated", quoting direct student evidence where available.
Identify any misconceptions / incorrect statements.
Provide an Adaptive Media Payload (Phase 5) outlining specific remediation gaps.

Respond ONLY with valid JSON matching this schema:
{
  "dimensions": [
    { "dimension": "Accuracy", "rating": "string", "feedback": "string" },
    { "dimension": "Completeness", "rating": "string", "feedback": "string" },
    { "dimension": "Conceptual Understanding", "rating": "string", "feedback": "string" },
    { "dimension": "Relationships Between Concepts", "rating": "string", "feedback": "string" },
    { "dimension": "Use of Important Terminology", "rating": "string", "feedback": "string" },
    { "dimension": "Quality of Reasoning", "rating": "string", "feedback": "string" }
  ],
  "conceptAssessments": [
    {
      "id": "string",
      "name": "string",
      "status": "demonstrated" | "partly-demonstrated" | "not-yet-demonstrated",
      "evidence": "string",
      "reasoning": "string"
    }
  ],
  "knowledgeGapReport": {
    "conceptsUnderstoodWell": [
      { "name": "string", "evidence": "string", "praise": "string" }
    ],
    "conceptsNeedingClarification": [
      { "name": "string", "evidence": "string", "issue": "string" }
    ],
    "incorrectStatements": [
      { "conceptName": "string", "studentQuote": "string", "correction": "string", "misconception": "string" }
    ],
    "missingRelationships": [
      { "name": "string", "description": "string" }
    ],
    "recommendations": ["string"]
  },
  "adaptiveMediaPayload": {
    "version": "2.0",
    "phase": 5,
    "topicId": "${topicId}",
    "topicTitle": "${topicTitle}",
    "subject": "${subject}",
    "generatedAt": "${new Date().toISOString()}",
    "sessionSummary": {
      "turnCount": ${(allStudentTexts || []).length},
      "demonstratedConceptsCount": 0,
      "partlyDemonstratedCount": 0,
      "notYetDemonstratedCount": 0
    },
    "strengths": ["string"],
    "identifiedGaps": [
      {
        "conceptId": "string",
        "conceptName": "string",
        "status": "partly-demonstrated",
        "studentEvidence": "string",
        "isIncorrectStatement": false,
        "correctionRequired": null,
        "targetLearningObjective": "string",
        "remediationStrategy": "string",
        "recommendedExamples": ["string"],
        "subjectSpecificContext": "string"
      }
    ],
    "missingRelationships": [],
    "incorrectStatements": [],
    "recommendedNextSteps": ["string"],
    "readyForMediaGeneration": true
  }
}
`.trim();

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.2,
      maxOutputTokens: 2000
    });

    if (result.ok && result.data) {
      const data = result.data;
      if (
        Array.isArray(data.dimensions) &&
        data.dimensions.length >= 4 &&
        Array.isArray(data.conceptAssessments) &&
        data.knowledgeGapReport &&
        data.adaptiveMediaPayload
      ) {
        return {
          isDemonstrationMode: false,
          modeNotice: `Live Gemini AI Assessment (${this.model})`,
          assessment: {
            dimensions: data.dimensions,
            conceptAssessments: data.conceptAssessments,
            knowledgeGapReport: data.knowledgeGapReport,
            evaluatedAt: new Date().toISOString()
          },
          adaptiveMediaPayload: data.adaptiveMediaPayload
        };
      }
    }

    return { isDemonstrationMode: true, assessment: null, adaptiveMediaPayload: null };
  }

  /**
   * Generates a structured Mind Map adhering to MindMapContent schema.
   */
  async generateMindMap({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, content: null };
    }

    const prompt = `
Generate a structured Mind Map for student remediation on topic: "${topicTitle}" (${subject}) [ID: ${topicId}].
Targeted Knowledge Gaps to remediate:
${(selectedGaps || []).map(g => `- ${g}`).join('\n')}

Details on student misconceptions:
${JSON.stringify(gapDetails || {})}

REQUIREMENT:
Respond ONLY with valid JSON following this exact MindMapContent schema:
{
  "title": "Mind Map: ${topicTitle} — Resolving Gaps",
  "root": {
    "id": "root",
    "label": "string",
    "subLabel": "string",
    "description": "string",
    "type": "root"
  },
  "branches": [
    {
      "id": "b-1",
      "label": "string",
      "color": "indigo" | "emerald" | "amber" | "purple" | "cyan",
      "relationToRoot": "string",
      "nodes": [
        {
          "id": "n-1",
          "label": "string",
          "description": "string",
          "isRemediationFocus": boolean,
          "misconceptionWarning": "string",
          "evidenceQuote": "string"
        }
      ]
    }
  ],
  "connections": [
    {
      "fromId": "string",
      "toId": "string",
      "label": "string"
    }
  ]
}
`.trim();

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.2,
      maxOutputTokens: 1600
    });

    if (result.ok && result.data) {
      const d = result.data;
      if (d.title && d.root && d.root.label && Array.isArray(d.branches) && d.branches.length > 0) {
        return {
          isDemonstrationMode: false,
          modeNotice: `Live Gemini AI Mind Map (${this.model})`,
          content: d
        };
      }
    }

    return { isDemonstrationMode: true, content: null };
  }

  /**
   * Generates an educational Podcast episode adhering to PodcastContent schema.
   */
  async generatePodcast({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, content: null };
    }

    const prompt = `
Generate an educational podcast script between Devon (curious co-host) and Dr. Maya (subject mentor) to remediate gaps in "${topicTitle}" (${subject}) [ID: ${topicId}].
Targeted Knowledge Gaps:
${(selectedGaps || []).map(g => `- ${g}`).join('\n')}

Student Misconceptions / Details:
${JSON.stringify(gapDetails || {})}

REQUIREMENT:
Respond ONLY with valid JSON following this exact PodcastContent schema:
{
  "title": "string",
  "subtitle": "string",
  "durationEstMinutes": number,
  "hosts": [
    { "name": "Devon", "role": "Lead Inquisitive Host" },
    { "name": "Dr. Maya", "role": "Subject Mentor" }
  ],
  "targetedGaps": ${JSON.stringify(selectedGaps || [])},
  "segments": [
    {
      "id": "seg-1",
      "speaker": "Devon" | "Dr. Maya",
      "text": "spoken narration line...",
      "focusGap": "string",
      "audioCue": "string"
    }
  ]
}
`.trim();

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.3,
      maxOutputTokens: 1800
    });

    if (result.ok && result.data) {
      const d = result.data;
      if (d.title && Array.isArray(d.hosts) && Array.isArray(d.segments) && d.segments.length >= 3) {
        return {
          isDemonstrationMode: false,
          modeNotice: `Live Gemini AI Podcast (${this.model})`,
          content: d
        };
      }
    }

    return { isDemonstrationMode: true, content: null };
  }

  /**
   * Generates a structured Explainer Video Storyboard adhering to VideoContent schema.
   */
  async generateVideoStoryboard({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    if (!this.isConfigured()) {
      return { isDemonstrationMode: true, content: null };
    }

    const prompt = `
Generate a 3-scene animated explainer video storyboard addressing student knowledge gaps in "${topicTitle}" (${subject}) [ID: ${topicId}].
Targeted Knowledge Gaps:
${(selectedGaps || []).map(g => `- ${g}`).join('\n')}

Student Misconceptions / Details:
${JSON.stringify(gapDetails || {})}

REQUIREMENT:
Respond ONLY with valid JSON following this exact VideoContent schema:
{
  "title": "string",
  "topicId": "${topicId}",
  "subject": "${subject}",
  "durationSeconds": 45,
  "totalScenes": 3,
  "targetedGaps": ${JSON.stringify(selectedGaps || [])},
  "scenes": [
    {
      "id": "scene-1",
      "sceneNumber": 1,
      "title": "string",
      "durationSeconds": 15,
      "narration": "voiceover explanation text...",
      "visualType": "concept-diagram",
      "visualData": {
        "focus": "string",
        "note": "string"
      },
      "keyTakeaway": "string"
    }
  ]
}
`.trim();

    const result = await this._callApi({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      temperature: 0.2,
      maxOutputTokens: 1800
    });

    if (result.ok && result.data) {
      const d = result.data;
      if (d.title && Array.isArray(d.scenes) && d.scenes.length >= 2) {
        return {
          isDemonstrationMode: false,
          modeNotice: `Live Gemini AI Video Storyboard (${this.model})`,
          content: d
        };
      }
    }

    return { isDemonstrationMode: true, content: null };
  }
}

export const geminiService = new GeminiService();

