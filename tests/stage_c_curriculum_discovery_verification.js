import assert from 'node:assert/strict';
import { TOPICS } from '../src/data/topics.ts';
import {
  filterCurriculumTopics,
  calculateDynamicSubjectCounts,
  matchesSearchQuery,
  normalizeSearchString,
  getCurriculumStats,
  CURATED_COLLECTIONS,
  INTERACTIVE_TOPIC_IDS,
} from '../src/utils/curriculumDiscovery.ts';

console.log('🧪 Starting Stage C Curriculum Discovery Verification Suite...\n');

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

// 1. Total Topics Ledger Baseline
test('Baseline Topic Ledger contains 64 canonical topics', () => {
  assert.equal(TOPICS.length, 64, 'TOPICS must contain exactly 64 topics');
});

// 2. Search Normalization
test('normalizeSearchString handles whitespace, punctuation, and casing', () => {
  assert.equal(normalizeSearchString('  Linear, Equations: (Class 9)!  '), 'linear equations class 9');
  assert.equal(normalizeSearchString('Photosynthesis & Chloroplasts...'), 'photosynthesis chloroplasts');
  assert.equal(normalizeSearchString(''), '');
});

// 3. Search Matching with Aliases and Key Terms
test('matchesSearchQuery matches direct titles, terms, and aliases', () => {
  const linearTopic = TOPICS.find((t) => t.id === 'math-linear-equations');
  assert(linearTopic, 'Linear equations topic must exist');

  // Title match
  assert(matchesSearchQuery(linearTopic, 'linear equations'));
  // Alias match
  assert(matchesSearchQuery(linearTopic, 'algebra slope'));
  // Key term match
  assert(matchesSearchQuery(linearTopic, 'variable'));
  // Non-matching query
  assert.equal(matchesSearchQuery(linearTopic, 'french revolution bastille'), false);

  const photoTopic = TOPICS.find((t) => t.id === 'bio-photosynthesis');
  assert(photoTopic, 'Photosynthesis topic must exist');
  assert(matchesSearchQuery(photoTopic, 'chlorophyll'));
  assert(matchesSearchQuery(photoTopic, 'calvin cycle'));
  assert(matchesSearchQuery(photoTopic, 'autotrophs'));
});

// 4. Board & Class Filtering
test('Board filtering correctly partitions CBSE and CISCE', () => {
  const allTopics = filterCurriculumTopics(TOPICS, { board: 'all', classLevel: 'all' });
  assert.equal(allTopics.length, 64);

  const cbseTopics = filterCurriculumTopics(TOPICS, { board: 'CBSE', classLevel: 'all' });
  const cisceTopics = filterCurriculumTopics(TOPICS, { board: 'CISCE', classLevel: 'all' });

  assert(cbseTopics.length > 0, 'CBSE topics must be present');
  assert(cisceTopics.length > 0, 'CISCE topics must be present');
  assert(cbseTopics.length <= 64, 'CBSE topics cannot exceed total topics');
  assert(cisceTopics.length <= 64, 'CISCE topics cannot exceed total topics');
});

test('Class level filtering returns valid subsets', () => {
  const class6 = filterCurriculumTopics(TOPICS, { classLevel: 6 });
  const class9 = filterCurriculumTopics(TOPICS, { classLevel: 9 });
  const class10 = filterCurriculumTopics(TOPICS, { classLevel: 10 });

  assert(class6.length > 0, 'Class 6 should have topics mapped');
  assert(class9.length > 0, 'Class 9 should have topics mapped');
  assert(class10.length > 0, 'Class 10 should have topics mapped');

  // Specific intersection: CBSE Class 10
  const cbseClass10 = filterCurriculumTopics(TOPICS, { board: 'CBSE', classLevel: 10 });
  assert(cbseClass10.length > 0, 'CBSE Class 10 should have topics');
});

// 5. Subject Filtering
test('Subject filtering matches subject IDs', () => {
  const mathTopics = filterCurriculumTopics(TOPICS, { subjectId: 'mathematics' });
  assert.equal(mathTopics.length, 14, 'Mathematics should have 14 topics');
  assert(mathTopics.every((t) => t.subjectId === 'mathematics'));

  const physicsTopics = filterCurriculumTopics(TOPICS, { subjectId: 'physics' });
  assert.equal(physicsTopics.length, 12, 'Physics should have 12 topics');
  assert(physicsTopics.every((t) => t.subjectId === 'physics'));

  const bioTopics = filterCurriculumTopics(TOPICS, { subjectId: 'biology' });
  assert.equal(bioTopics.length, 10, 'Biology should have 10 topics');
  assert(bioTopics.every((t) => t.subjectId === 'biology'));
});

// 6. Dynamic Subject Counts
test('calculateDynamicSubjectCounts computes counts matching filtered array lengths', () => {
  const cbseSubjectCounts = calculateDynamicSubjectCounts('CBSE', 'all', TOPICS);
  const cbseTopics = filterCurriculumTopics(TOPICS, { board: 'CBSE', classLevel: 'all' });

  let sum = 0;
  for (const subjectId of Object.keys(cbseSubjectCounts)) {
    const subjectTopicFiltered = filterCurriculumTopics(cbseTopics, { subjectId });
    assert.equal(
      cbseSubjectCounts[subjectId],
      subjectTopicFiltered.length,
      `Subject count for ${subjectId} must equal filtered length`
    );
    sum += cbseSubjectCounts[subjectId];
  }
  assert.equal(sum, cbseTopics.length, 'Sum of subject counts must equal total filtered topics');
});

// 7. Curated Collections
test('Curated Collections generate verified subsets', () => {
  const interactiveColl = filterCurriculumTopics(TOPICS, { collectionId: 'interactive-sims' });
  assert(interactiveColl.length >= 6, 'Must have at least 6 interactive 3D simulation topics');
  assert(interactiveColl.every((t) => INTERACTIVE_TOPIC_IDS.has(t.id)));

  const foundationalColl = filterCurriculumTopics(TOPICS, { collectionId: 'foundational' });
  assert(foundationalColl.length > 0, 'Foundational collection must not be empty');
  assert(foundationalColl.every((t) => t.difficulty === 'Foundational'));

  const highYieldColl = filterCurriculumTopics(TOPICS, { collectionId: 'high-yield-exam' });
  assert(highYieldColl.length > 0, 'High yield collection must not be empty');

  assert.equal(CURATED_COLLECTIONS.length, 5, 'Should define 5 curated collections');
});

// 8. Sorting Functionality
test('Sorting by duration and alphabetical works deterministically', () => {
  const sortedAsc = filterCurriculumTopics(TOPICS, { sortBy: 'duration-asc' });
  for (let i = 1; i < sortedAsc.length; i++) {
    assert(sortedAsc[i].estimatedMinutes >= sortedAsc[i - 1].estimatedMinutes);
  }

  const sortedAlpha = filterCurriculumTopics(TOPICS, { sortBy: 'alphabetical' });
  for (let i = 1; i < sortedAlpha.length; i++) {
    assert(sortedAlpha[i].title.localeCompare(sortedAlpha[i - 1].title) >= 0);
  }
});

// 9. Telemetry Stats
test('getCurriculumStats returns consistent metrics', () => {
  const stats = getCurriculumStats(TOPICS, 'all', 'all');
  assert.equal(stats.totalInFilter, 64);
  assert(stats.interactiveCount >= 6);
  assert(stats.officialVerifiedCount > 0);
});

console.log(`\n🎉 All ${passedTests} Stage C Curriculum Discovery Verification tests passed successfully!\n`);
