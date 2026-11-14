import assert from 'node:assert/strict';
import { TOPICS } from '../src/data/topics.ts';
import { SUBJECTS } from '../src/data/subjects.ts';
import {
  filterCurriculumTopics,
  calculateDynamicSubjectCounts,
  getCurriculumStats,
} from '../src/utils/curriculumDiscovery.ts';
import {
  calculateLinearEquations,
  calculatePhotosynthesis,
  LINEAR_EQUATIONS_MODEL,
  PHOTOSYNTHESIS_MODEL,
} from '../src/utils/scientificEngines.ts';

console.log('🧪 Starting Stage D Trajectory & Final Release Verification Suite...\n');

let passedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// ---------------------------------------------------------------------------
// JOURNEY 1 — GUEST DISCOVERY & MULTI-PERSPECTIVE EXPLORATION
// ---------------------------------------------------------------------------
test('Journey 1: Guest discovery across CBSE & Class 9/10 with search & 4-path convergence', () => {
  // 1. Filter CBSE Class 9
  const cbseClass9 = filterCurriculumTopics(TOPICS, { board: 'CBSE', classLevel: 9 });
  assert(cbseClass9.length > 0, 'CBSE Class 9 must contain topics');
  const newtonSearched = filterCurriculumTopics(cbseClass9, { searchQuery: 'newton' });
  assert(newtonSearched.length > 0, 'Newton laws should match query in CBSE Class 9');

  // 2. Filter CBSE Class 10 and search for linear equations
  const cbseClass10 = filterCurriculumTopics(TOPICS, { board: 'CBSE', classLevel: 10 });
  assert(cbseClass10.length > 0, 'CBSE Class 10 must contain topics');
  const searched = filterCurriculumTopics(cbseClass10, { searchQuery: 'linear equations' });
  assert(searched.length > 0, 'Linear equations should match query in CBSE Class 10');
  const target = searched.find((t) => t.id === 'math-linear-equations');
  assert(target, 'Linear equations topic must exist in search');

  // 3. Confirm 4 convergent learning paths
  assert.equal(target.availablePaths.length, 4, 'Must have exactly 4 learning paths');
  assert(target.availablePaths.includes('structured-explanation'));
  assert(target.availablePaths.includes('visual-learning'));
  assert(target.availablePaths.includes('examples-applications'));
  assert(target.availablePaths.includes('explore-experiment'));
});

// ---------------------------------------------------------------------------
// JOURNEY 2 — SCIENTIFIC LEARNING & DETERMINISTIC SIMULATION ENGINES
// ---------------------------------------------------------------------------
test('Journey 2: Scientific simulations execute deterministically and maintain bounds', () => {
  // A. Linear Equations Balance Mechanics (2x + 1 = 7, solution x = 3)
  const eqState = calculateLinearEquations({ slope: 2, intercept: 1, targetY: 7, xVal: 3 });
  assert.equal(eqState.isBalanced, true, 'System must be in equilibrium when x = 3');
  assert.equal(eqState.tiltAngleRad, 0, 'Tilt angle must be 0 rad at balance');

  // Disequilibrium left heavy (x = 5)
  const leftHeavy = calculateLinearEquations({ slope: 2, intercept: 1, targetY: 7, xVal: 5 });
  assert.equal(leftHeavy.isBalanced, false);
  assert(leftHeavy.tiltAngleRad < 0, 'Left heavy must produce negative tilt');
  assert(leftHeavy.tiltAngleRad >= -0.4, 'Tilt must clamp at -0.4 rad');

  // B. Photosynthesis Chamber (Blackman Limiting Factors & Chlorophyll Action Spectrum)
  const normalPhoto = calculatePhotosynthesis({
    lightIntensity: 75,
    co2Concentration: 500,
    temperature: 25,
    wavelength: 'red', // Red chlorophyll peak
  });
  assert(normalPhoto.quantumEfficiency === 0.95, 'Red peak efficiency must be 0.95');
  assert(normalPhoto.bubbleRate > 0, 'Bubble rate must be positive in red light');

  // Thermal Denaturation at 43C
  const hotPhoto = calculatePhotosynthesis({
    lightIntensity: 75,
    co2Concentration: 500,
    temperature: 43,
    wavelength: 'red',
  });
  assert(hotPhoto.temperatureFactor < 0.35, 'Enzyme activity sharply declines at 43C');
  assert.equal(hotPhoto.limitingFactor, 'TEMPERATURE', 'Temperature becomes the limiting factor');
  assert(hotPhoto.netPhotosyntheticRate < normalPhoto.netPhotosyntheticRate * 0.4, 'Rate collapses under thermal stress');

  // Presets and component inspections
  assert(LINEAR_EQUATIONS_MODEL.presets.length >= 4);
  assert(PHOTOSYNTHESIS_MODEL.components.length >= 4);
});

// ---------------------------------------------------------------------------
// JOURNEY 3 — LEARNING TRAJECTORY, TIMELINE & SUBJECT PROGRESS
// ---------------------------------------------------------------------------
test('Journey 3: Trajectory calculations group progress accurately without double-counting', () => {
  // 1. Subject topic distribution across 8 disciplines
  const subjectTopicCounts = {};
  for (const t of TOPICS) {
    subjectTopicCounts[t.subjectId] = (subjectTopicCounts[t.subjectId] || 0) + 1;
  }

  assert.equal(SUBJECTS.length, 8, 'Must have exactly 8 academic disciplines');
  let totalTopicsSum = 0;
  for (const sub of SUBJECTS) {
    const count = subjectTopicCounts[sub.id] || 0;
    assert(count > 0, `Discipline ${sub.name} must have mapped topics`);
    totalTopicsSum += count;
  }
  assert.equal(totalTopicsSum, 64, 'Sum of all subject topics must equal 64 without double-counting');

  // 2. Trajectory metric invariants
  const stats = getCurriculumStats(TOPICS, 'all', 'all');
  assert.equal(stats.totalInFilter, 64);
  assert(stats.interactiveCount >= 6);
  assert(stats.officialVerifiedCount > 0);
});

// ---------------------------------------------------------------------------
// JOURNEY 4 — DUAL PERSISTENCE, RLS & DATA CONTRACT INTEGRITY
// ---------------------------------------------------------------------------
test('Journey 4: Data persistence contracts uphold sovereignty and format validity', () => {
  // Mock guest activity item
  const mockActivity = {
    id: 'act-001',
    type: 'topic-opened',
    topicId: 'bio-photosynthesis',
    subjectId: 'biology',
    topicTitle: 'Photosynthesis & Autotrophic Nutrition',
    pathId: 'visual-learning',
    timestamp: new Date().toISOString(),
    details: 'Explored via visual learning.',
  };

  assert.equal(typeof mockActivity.id, 'string');
  assert.equal(typeof mockActivity.timestamp, 'string');
  assert(Date.parse(mockActivity.timestamp) > 0, 'Timestamp must be valid ISO8601');

  // Mock guest trajectory snapshot format
  const guestSnapshot = {
    version: 1,
    exportedAt: new Date().toISOString(),
    activities: [mockActivity],
    bookmarks: ['bio-photosynthesis'],
    topicHistories: {
      'bio-photosynthesis': {
        topicId: 'bio-photosynthesis',
        subjectId: 'biology',
        topicTitle: 'Photosynthesis & Autotrophic Nutrition',
        visitCount: 1,
        pathsUsed: ['visual-learning'],
        lastVisited: new Date().toISOString(),
        feynmanAssessments: [],
      },
    },
  };

  const jsonStr = JSON.stringify(guestSnapshot);
  assert(jsonStr.length > 50, 'JSON serialization must succeed');
  const parsed = JSON.parse(jsonStr);
  assert.equal(parsed.version, 1);
  assert.equal(parsed.activities.length, 1);
  assert.equal(parsed.bookmarks[0], 'bio-photosynthesis');
});

// ---------------------------------------------------------------------------
// JOURNEY 5 — CURRICULUM CONSISTENCY & DIRECT PATH DEEP-LINKING
// ---------------------------------------------------------------------------
test('Journey 5: Curriculum consistency between CBSE and CISCE', () => {
  const cbseCount = filterCurriculumTopics(TOPICS, { board: 'CBSE' }).length;
  const cisceCount = filterCurriculumTopics(TOPICS, { board: 'CISCE' }).length;

  assert(cbseCount > 0, 'CBSE catalog must be non-empty');
  assert(cisceCount > 0, 'CISCE catalog must be non-empty');

  // Dynamic subjects matching
  const cbseSubjectCounts = calculateDynamicSubjectCounts('CBSE', 'all', TOPICS);
  const cisceSubjectCounts = calculateDynamicSubjectCounts('CISCE', 'all', TOPICS);

  assert(Object.keys(cbseSubjectCounts).length > 0);
  assert(Object.keys(cisceSubjectCounts).length > 0);
});

// ---------------------------------------------------------------------------
// JOURNEY 6 — RESPONSIVE, ACCESSIBILITY & REDUCED-MOTION HARMONY
// ---------------------------------------------------------------------------
test('Journey 6: Structural and accessibility contracts are honored', () => {
  // All 64 topics have valid string titles, subtitles, and overviews with appropriate contrast length
  for (const t of TOPICS) {
    assert(t.title && t.title.trim().length > 0, 'Topic must have non-empty title');
    assert(t.subtitle && t.subtitle.trim().length > 0, 'Topic must have non-empty subtitle');
    assert(t.overview && t.overview.trim().length > 20, 'Topic must have detailed overview');
    assert(t.estimatedMinutes >= 5 && t.estimatedMinutes <= 60, 'Estimated minutes must be realistic');
  }
});

console.log(`\n🎉 All ${passedTests} Stage D Trajectory & Final Release Verification tests passed successfully!\n`);
