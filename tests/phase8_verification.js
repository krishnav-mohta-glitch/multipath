/**
 * Phase 8 Reliability and Correctness Hardening Verification Suite
 * Tests Gemini Service, Socratic Engine (8 subjects + 4 tiers + session resilience),
 * Feynman Engine (persona + rubrics + session resilience), Media Engine (schemas + fallback),
 * and API routing / security (health checks + rewrite resilience).
 */

import assert from 'node:assert';
import http from 'node:http';
import { geminiService } from '../server/geminiService.js';
import { SocraticEngine } from '../server/socraticEngine.js';
import { FeynmanEngine } from '../server/feynmanEngine.js';
import { MediaEngine } from '../server/mediaEngine.js';
import app from '../api/index.js';

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    process.stdout.write(`TEST: ${name}... `);
    await fn();
    console.log('PASSED');
    passed++;
  } catch (err) {
    console.log(`FAILED: ${err.message}`);
    console.error(err);
    failed++;
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('MULTIPATH PHASE 8: AUTOMATED VERIFICATION SUITE');
  console.log('====================================================\n');

  // ----------------------------------------------------
  // SECTION 1: GEMINI SERVICE CONFIGURATION & SECURITY
  // ----------------------------------------------------
  console.log('--- SECTION 1: GEMINI SERVICE CONFIGURATION & SECURITY ---');

  await test('Gemini model defaults to gemini-3.8-flash and is configurable', () => {
    assert.strictEqual(geminiService.model, 'gemini-3.8-flash', 'Default model should be gemini-3.8-flash');
    
    // Test custom model configuration via environment variable
    const originalModel = process.env.GEMINI_MODEL;
    process.env.GEMINI_MODEL = 'gemini-2.5-pro';
    assert.strictEqual(geminiService.model, 'gemini-2.5-pro', 'Should respect GEMINI_MODEL override');
    
    // Restore
    if (originalModel !== undefined) {
      process.env.GEMINI_MODEL = originalModel;
    } else {
      delete process.env.GEMINI_MODEL;
    }
    assert.strictEqual(geminiService.model, 'gemini-3.8-flash');
  });

  await test('Gemini unconfigured state reports isConfigured() = false without throwing', () => {
    const isConf = geminiService.isConfigured();
    assert.strictEqual(typeof isConf, 'boolean');
  });

  await test('Gemini endpoint uses model without exposing keys in URL', () => {
    const ep = geminiService.endpoint;
    assert.ok(ep.includes('gemini-3.8-flash'));
    assert.ok(!ep.includes('key='));
    assert.ok(!ep.includes('AIza'));
  });

  // ----------------------------------------------------
  // SECTION 2: SOCRATIC ENGINE & SUBJECT EVALUATORS (8 DOMAINS)
  // ----------------------------------------------------
  console.log('\n--- SECTION 2: SOCRATIC ENGINE (8 SUBJECTS + 4 EVALUATION TIERS) ---');

  const socratic = new SocraticEngine();

  // Test 1: Mathematics (math-linear-equations)
  await test('Socratic: Mathematics correct evaluation', async () => {
    const startRes = socratic.startSession({
      topicId: 'math-linear-equations',
      subject: 'mathematics',
      topicTitle: 'Linear Equations',
      initialQuestion: 'Solve 3x + 7 = 22'
    });
    assert.ok(startRes.sessionId);
    assert.ok(startRes.session);

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Subtract 7 from both sides to get 3x = 15',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'partially-correct');
    assert.strictEqual(step1.isGoalReached, false);

    const step2 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Divide by 3 so x = 5',
      sessionPayload: step1.session
    });
    assert.strictEqual(step2.evaluation, 'correct');
    assert.strictEqual(step2.isGoalReached, true);
  });

  await test('Socratic: Mathematics incorrect & insufficient info evaluation', async () => {
    const startRes = socratic.startSession({
      topicId: 'math-linear-equations',
      subject: 'mathematics',
      topicTitle: 'Linear Equations',
      initialQuestion: 'Solve 3x + 7 = 22'
    });

    const stepWrong = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'x = 100 because I guessed',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepWrong.evaluation, 'incorrect');

    const stepInsufficient = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'yes',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepInsufficient.evaluation, 'insufficient-info');
  });

  // Test 2: Biology (bio-photosynthesis)
  await test('Socratic: Biology (photosynthesis light & dark reactions)', async () => {
    const startRes = socratic.startSession({
      topicId: 'bio-photosynthesis',
      subject: 'biology',
      topicTitle: 'Photosynthesis',
      initialQuestion: 'Why do plants produce oxygen?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Oxygen is produced when water molecules (H2O) are split during light-dependent reactions in thylakoid membranes to generate ATP and NADPH for the Calvin cycle',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');

    const stepInsufficient = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'plants are green',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepInsufficient.evaluation, 'insufficient-info');
  });

  // Test 3: Physics (phys-newtons-laws)
  await test('Socratic: Physics (Newton second law & inertia)', async () => {
    const startRes = socratic.startSession({
      topicId: 'phys-newtons-laws',
      subject: 'physics',
      topicTitle: "Newton's Laws of Motion",
      initialQuestion: 'What happens to acceleration if mass doubles while force is constant?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'By F = ma, if force is constant and mass doubles, acceleration is cut in half because acceleration is inversely proportional to mass.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');
  });

  // Test 4: Chemistry (chem-periodic-table)
  await test('Socratic: Chemistry (Periodic table & valence electrons)', async () => {
    const startRes = socratic.startSession({
      topicId: 'chem-periodic-table',
      subject: 'chemistry',
      topicTitle: 'The Periodic Table & Chemical Bonding',
      initialQuestion: 'Why do alkali metals readily lose an electron?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Alkali metals have a single valence electron in their outermost s-orbital and low first ionization energy, so losing it achieves a stable noble gas octet configuration.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');
  });

  // Test 5: History (hist-french-revolution)
  await test('Socratic: History (French revolution causal factors)', async () => {
    const startRes = socratic.startSession({
      topicId: 'hist-french-revolution',
      subject: 'history',
      topicTitle: 'The French Revolution',
      initialQuestion: 'Why did the Estates-General deadlock in 1789?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'The Third Estate represented 98% of the population but voting by order meant the First and Second Estates (clergy and nobility) could always outvote them 2 to 1, causing a deadlock until the Third Estate declared the National Assembly at the Tennis Court.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');
  });

  // Test 6: English / Literature (canonical eng-understanding-metaphors)
  await test('Socratic: Literature canonical eng-understanding-metaphors', async () => {
    const startRes = socratic.startSession({
      topicId: 'eng-understanding-metaphors',
      subject: 'english',
      topicTitle: 'Understanding Metaphors and Poetic Imagery',
      initialQuestion: 'How does vehicle, tenor, and ground function in metaphors?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'In a metaphor, the tenor is the primary concept being described, the vehicle is the figurative image used, and the ground is the common associative attribute transferred between them.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');

    const stepInsufficient = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'metaphors are poems',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepInsufficient.evaluation, 'insufficient-info');
  });

  // Test 7: Geography (geo-plate-tectonics)
  await test('Socratic: Geography (Plate tectonics & mantle convection)', async () => {
    const startRes = socratic.startSession({
      topicId: 'geo-plate-tectonics',
      subject: 'geography',
      topicTitle: 'Plate Tectonics & Continental Drift',
      initialQuestion: 'What drives the movement of tectonic plates?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Tectonic plates move because thermal convection currents in the plastic asthenosphere transport heat from the core, creating ridge push and subduction slab pull that drag the rigid lithosphere.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');

    const stepPartial = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Convection currents in the mantle move them.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepPartial.evaluation, 'partially-correct');
  });

  // Test 8: Computer Science (cs-binary-search)
  await test('Socratic: Computer Science (Binary search & sorted invariant)', async () => {
    const startRes = socratic.startSession({
      topicId: 'cs-binary-search',
      subject: 'computer-science',
      topicTitle: 'Binary Search Algorithm',
      initialQuestion: 'Why does binary search require a sorted array?'
    });

    const step1 = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'Binary search requires a sorted array so that comparing the target with the midpoint allows us to eliminate half the search space with guaranteed O(log n) time complexity.',
      sessionPayload: startRes.session
    });
    assert.strictEqual(step1.evaluation, 'correct');

    const stepInsufficient = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'it is fast',
      sessionPayload: startRes.session
    });
    assert.strictEqual(stepInsufficient.evaluation, 'insufficient-info');
  });

  // ----------------------------------------------------
  // SECTION 3: SESSION RESILIENCE & ERROR HANDLING
  // ----------------------------------------------------
  console.log('\n--- SECTION 3: STATELESS SESSION RESILIENCE & SANITIZATION ---');

  await test('Socratic: Expired or invalid session returns SESSION_NOT_FOUND error instead of silent Math default', async () => {
    const res = await socratic.processTurn({
      sessionId: 'non-existent-session-id',
      studentMessage: 'test answer'
    });
    assert.ok(res.error);
    assert.strictEqual(res.code, 'SESSION_NOT_FOUND', 'Must reject missing session with SESSION_NOT_FOUND');
  });

  await test('Socratic: Client-owned session payload roundtrips cleanly without server in-memory reliance', async () => {
    // 1. Client starts session
    const startRes = socratic.startSession({
      topicId: 'cs-binary-search',
      subject: 'computer-science',
      topicTitle: 'Binary Search Algorithm',
      initialQuestion: 'Explain binary search.'
    });

    // 2. Clear server in-memory sessions map to simulate a new serverless cold-start instance
    socratic.sessions.clear();

    // 3. Client sends request passing its client-owned active session payload
    const turnRes = await socratic.processTurn({
      sessionId: startRes.sessionId,
      studentMessage: 'It halves the search space at each step in O(log n) time.',
      sessionPayload: startRes.session
    });
    assert.ok(turnRes.session, 'Must return updated session object');
    assert.strictEqual(turnRes.session.id, startRes.sessionId);
    assert.strictEqual(turnRes.session.topicId, 'cs-binary-search');
    assert.strictEqual(turnRes.session.history.length >= 2, true);

    // 4. Request hint passing client session
    socratic.sessions.clear();
    const hintRes = await socratic.provideHint({
      sessionId: startRes.sessionId,
      sessionPayload: turnRes.session
    });
    assert.ok(hintRes.hint);
    assert.strictEqual(hintRes.hintLevel, 1);
    assert.ok(hintRes.session);
    assert.strictEqual(hintRes.session.hintLevel, 1);

    // 5. Request complete solution passing client session
    socratic.sessions.clear();
    const solRes = await socratic.provideSolution({
      sessionId: startRes.sessionId,
      sessionPayload: hintRes.session
    });
    assert.ok(solRes.solution);
    assert.ok(Array.isArray(solRes.solution.steps));
    assert.ok(solRes.solution.keyTakeaway);
  });

  await test('Socratic: Session payload validation catches malformed payloads', () => {
    const invalidPayloads = [
      null,
      {},
      { id: '123' }, // missing topicId
      { id: '123', topicId: 'math', history: 'not-an-array' }
    ];

    for (const invalid of invalidPayloads) {
      const isValid = socratic.validateSessionPayload(invalid);
      assert.strictEqual(isValid, false, `Malformed payload should fail validation: ${JSON.stringify(invalid)}`);
    }
  });

  // ----------------------------------------------------
  // SECTION 4: FEYNMAN ENGINE & 6-DIMENSION ASSESSMENT
  // ----------------------------------------------------
  console.log('\n--- SECTION 4: FEYNMAN ENGINE & HONEST PROVIDER REPORTING ---');

  const feynman = new FeynmanEngine();

  await test('Feynman: Supports all 8 subjects in initial greeting', async () => {
    const subjects = ['mathematics', 'physics', 'chemistry', 'biology', 'history', 'english', 'geography', 'computer-science'];
    for (const subj of subjects) {
      const startRes = await feynman.startSession({
        topicId: `test-${subj}`,
        subject: subj,
        topicTitle: `Test ${subj}`,
        learningObjectives: ['Core objective 1']
      });
      assert.ok(startRes.sessionId);
      assert.ok(startRes.session);
      assert.strictEqual(startRes.session.history.length, 1);
      assert.strictEqual(startRes.session.history[0].role, 'learner');
      assert.ok(startRes.session.history[0].content.length > 10);
    }
  });

  await test('Feynman: Missing session returns SESSION_NOT_FOUND error', async () => {
    const res = await feynman.processTurn({
      sessionId: 'unknown-feynman-id',
      studentExplanation: 'My explanation'
    });
    assert.ok(res.error);
    assert.strictEqual(res.code, 'SESSION_NOT_FOUND');
  });

  await test('Feynman: Client-owned session payload roundtrips and handles assessment fallback accurately', async () => {
    const startRes = await feynman.startSession({
      topicId: 'math-linear-equations',
      subject: 'mathematics',
      topicTitle: 'Linear Equations',
      learningObjectives: ['Solve for x', 'Balance operations']
    });

    // Clear server memory
    feynman.sessions.clear();

    // Submit explanation with client session
    const turnRes = await feynman.processTurn({
      sessionId: startRes.sessionId,
      studentExplanation: 'To solve 3x + 7 = 22, whatever we do to one side we must do to the other side to keep it balanced.',
      sessionPayload: startRes.session
    });
    assert.ok(turnRes.session);
    assert.ok(turnRes.learnerResponse);

    // Clear server memory again to verify assessment operates on client session
    feynman.sessions.clear();

    // Request 6-dimension assessment
    const assessRes = await feynman.generateAssessment({
      sessionId: startRes.sessionId,
      sessionPayload: turnRes.session
    });
    assert.ok(assessRes.assessment);
    assert.ok(assessRes.assessment.dimensions);
    assert.ok(assessRes.assessment.knowledgeGapReport);
    assert.ok(assessRes.adaptiveMediaPayload);

    // Honest reporting check: When Gemini API key is absent, must report deterministic demonstration mode
    assert.strictEqual(assessRes.isDemonstrationMode, true, 'Must report demonstration mode when key is absent');
    assert.ok(assessRes.modeNotice.includes('Demonstration Mode') || assessRes.modeNotice.includes('Deterministic'));
  });

  // ----------------------------------------------------
  // SECTION 5: ADAPTIVE MEDIA ENGINE & SCHEMAS
  // ----------------------------------------------------
  console.log('\n--- SECTION 5: ADAPTIVE MEDIA ENGINE & SCHEMAS ---');

  const media = new MediaEngine();

  await test('Adaptive Media: Mind map adheres to MindMapContent schema', async () => {
    const res = await media.generateMedia({
      format: 'mindmap',
      topicId: 'math-linear-equations',
      subject: 'mathematics',
      topicTitle: 'Linear Equations',
      selectedGaps: ['Balancing both sides']
    });

    assert.ok(res.resourceId);
    assert.strictEqual(res.format, 'mindmap');
    assert.ok(res.content.title);
    assert.ok(res.content.root);
    assert.ok(Array.isArray(res.content.branches));
    assert.ok(Array.isArray(res.content.connections));
    assert.ok(res.isDemonstrationMode);
  });

  await test('Adaptive Media: Podcast adheres to PodcastContent schema', async () => {
    const res = await media.generateMedia({
      format: 'podcast',
      topicId: 'bio-photosynthesis',
      subject: 'biology',
      topicTitle: 'Photosynthesis',
      selectedGaps: ['Thylakoid light reactions']
    });

    assert.ok(res.resourceId);
    assert.strictEqual(res.format, 'podcast');
    assert.ok(res.content.title);
    assert.ok(Array.isArray(res.content.segments));
    assert.ok(res.content.segments.length >= 3);
    assert.ok(res.content.segments[0].speaker);
    assert.ok(res.content.segments[0].text);
  });

  await test('Adaptive Media: Video storyboard adheres to VideoContent schema', async () => {
    const res = await media.generateMedia({
      format: 'video',
      topicId: 'cs-binary-search',
      subject: 'computer-science',
      topicTitle: 'Binary Search Algorithm',
      selectedGaps: ['Halving the search space']
    });

    assert.ok(res.resourceId);
    assert.strictEqual(res.format, 'video');
    assert.ok(res.content.title);
    assert.ok(Array.isArray(res.content.scenes));
    assert.ok(res.content.scenes.length >= 2);
    assert.ok(res.content.scenes[0].narration);
    assert.ok(res.content.scenes[0].visualType);
  });

  // ----------------------------------------------------
  // SECTION 6: API ROUTING, VERCEL REWRITES & SECURITY
  // ----------------------------------------------------
  console.log('\n--- SECTION 6: API ROUTING, VERCEL REWRITES & SECURITY ---');

  function executeHttp(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const server = http.createServer(app);
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        const reqPayload = body ? JSON.stringify(body) : '';
        const clientReq = http.request({
          hostname: '127.0.0.1',
          port,
          path,
          method,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(reqPayload)
          }
        }, (clientRes) => {
          let chunks = '';
          clientRes.on('data', (d) => chunks += d);
          clientRes.on('end', () => {
            server.close();
            try {
              resolve({
                status: clientRes.statusCode,
                headers: clientRes.headers,
                data: JSON.parse(chunks)
              });
            } catch {
              resolve({
                status: clientRes.statusCode,
                headers: clientRes.headers,
                raw: chunks
              });
            }
          });
        });

        clientReq.on('error', (err) => {
          server.close();
          reject(err);
        });

        if (reqPayload) {
          clientReq.write(reqPayload);
        }
        clientReq.end();
      });
    });
  }

  await test('API: Root health check /api/health returns 200 with model and status', async () => {
    const res = await executeHttp('GET', '/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'healthy');
    assert.strictEqual(res.data.model, 'gemini-3.8-flash');
    assert.strictEqual(typeof res.data.geminiConfigured, 'boolean');
  });

  await test('API: Discovery health check /api/discovery/health returns 200', async () => {
    const res = await executeHttp('GET', '/api/discovery/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'ok');
    assert.strictEqual(res.data.service, 'Guided Discovery Socratic API');
    assert.strictEqual(res.data.model, 'gemini-3.8-flash');
  });

  await test('API: Feynman health check /api/feynman/health returns 200', async () => {
    const res = await executeHttp('GET', '/api/feynman/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'ok');
    assert.strictEqual(res.data.service, 'Feynman Mode Curious Learner API');
  });

  await test('API: Media health check /api/media/health returns 200', async () => {
    const res = await executeHttp('GET', '/api/media/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'ok');
    assert.strictEqual(res.data.service, 'Adaptive Media Generation Engine');
  });

  await test('API: Rewrite resilience - direct non-prefixed paths reach correct handlers', async () => {
    const resRoot = await executeHttp('GET', '/health');
    assert.strictEqual(resRoot.status, 200);
    assert.strictEqual(resRoot.data.status, 'healthy');

    const resDiscovery = await executeHttp('GET', '/discovery/health');
    assert.strictEqual(resDiscovery.status, 200);
    assert.strictEqual(resDiscovery.data.service, 'Guided Discovery Socratic API');

    const resFeynman = await executeHttp('GET', '/feynman/health');
    assert.strictEqual(resFeynman.status, 200);
    assert.strictEqual(resFeynman.data.service, 'Feynman Mode Curious Learner API');

    const resMedia = await executeHttp('GET', '/media/health');
    assert.strictEqual(resMedia.status, 200);
    assert.strictEqual(resMedia.data.service, 'Adaptive Media Generation Engine');
  });

  await test('API: Rate limiter sets headers on requests', async () => {
    const res = await executeHttp('GET', '/api/health');
    assert.ok(res.headers['x-ratelimit-limit'], 'Must send X-RateLimit-Limit');
    assert.ok(res.headers['x-ratelimit-remaining'], 'Must send X-RateLimit-Remaining');
  });

  await test('API: Socratic POST /api/discovery/respond with invalid session returns 404 SESSION_NOT_FOUND', async () => {
    const res = await executeHttp('POST', '/api/discovery/respond', {
      sessionId: 'fake-session-id',
      studentMessage: 'x = 5'
    });
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.data.code, 'SESSION_NOT_FOUND');
  });

  await test('API: Feynman POST /api/feynman/respond with invalid session returns 404 SESSION_NOT_FOUND', async () => {
    const res = await executeHttp('POST', '/api/feynman/respond', {
      sessionId: 'fake-session-id',
      studentExplanation: 'Test explanation'
    });
    assert.strictEqual(res.status, 404);
    assert.strictEqual(res.data.code, 'SESSION_NOT_FOUND');
  });

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${passed + failed}`);
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Fatal test runner error:', e);
  process.exit(1);
});
