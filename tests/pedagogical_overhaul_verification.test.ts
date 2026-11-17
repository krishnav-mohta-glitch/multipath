import { TOPICS } from '../src/data/topics';
import { FEYNMAN_ANCHORS, getFeynmanAnchor } from '../src/data/feynmanAnchors';
import type { Topic } from '../src/types/topic';

console.log('================================================================');
console.log('MULTIPATH V3 — PEDAGOGICAL OVERHAUL & FEYNMAN ANCHORS VERIFICATION');
console.log('================================================================');

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
    failed++;
  }
}

// 1. Verify 64 Topics in Canonical Database
assert(TOPICS.length === 64, 'Total canonical topics equals exactly 64', `Actual: ${TOPICS.length}`);

// 2. Verify all 64 topics have hydrated feynmanAnchor
const hydratedCount = TOPICS.filter((t: Topic) => t.feynmanAnchor !== undefined).length;
assert(hydratedCount === 64, 'All 64 topics have hydrated feynmanAnchor', `Hydrated: ${hydratedCount}`);

// 3. Verify FEYNMAN_ANCHORS registry has all 64 keys
const anchorKeys = Object.keys(FEYNMAN_ANCHORS);
assert(anchorKeys.length === 64, 'FEYNMAN_ANCHORS dictionary has 64 entries', `Count: ${anchorKeys.length}`);

// 4. Verify helper function getFeynmanAnchor
const sampleAnchor = getFeynmanAnchor('math-linear-equations');
assert(
  sampleAnchor !== undefined && sampleAnchor.visceralMetaphor.headline === 'The Two-Pan Fruit Scale',
  'getFeynmanAnchor correctly retrieves anchor by topic ID'
);

// 5. Deep validation of all 64 anchors
let completeAnchors = 0;
let threeStepLadders = 0;
let validTraps = 0;
let validMisconceptions = 0;

for (const topic of TOPICS) {
  const a = topic.feynmanAnchor;
  if (!a) continue;

  const hasMetaphor =
    Boolean(a.visceralMetaphor?.headline?.trim()) &&
    Boolean(a.visceralMetaphor?.analogy?.trim()) &&
    Boolean(a.visceralMetaphor?.physicalObject?.trim());

  const hasTrap =
    Boolean(a.whySchoolConfusesYou?.textbookTrap?.trim()) &&
    Boolean(a.whySchoolConfusesYou?.unmaskedTruth?.trim());

  const hasLadder =
    Array.isArray(a.ahaLadder) &&
    a.ahaLadder.length === 3 &&
    a.ahaLadder.every((step, idx) => step.step === idx + 1 && step.title && step.intuition);

  const hasMisconception =
    Boolean(a.misconceptionAlert?.commonBlunder?.trim()) &&
    Boolean(a.misconceptionAlert?.realityCheck?.trim());

  if (hasMetaphor) completeAnchors++;
  if (hasTrap) validTraps++;
  if (hasLadder) threeStepLadders++;
  if (hasMisconception) validMisconceptions++;
}

assert(completeAnchors === 64, 'All 64 topics possess complete visceral metaphors and physical objects', `Actual: ${completeAnchors}`);
assert(validTraps === 64, 'All 64 topics possess unmasked textbook traps and truths', `Actual: ${validTraps}`);
assert(threeStepLadders === 64, 'All 64 topics possess verified 3-step Aha! Ladders', `Actual: ${threeStepLadders}`);
assert(validMisconceptions === 64, 'All 64 topics possess exam misconception alerts and reality checks', `Actual: ${validMisconceptions}`);

// 6. Verify Subject Representation
const subjects = new Set(TOPICS.map((t: Topic) => t.subjectId));
const expectedSubjects = [
  'mathematics',
  'physics',
  'chemistry',
  'biology',
  'computer-science',
  'history',
  'geography',
  'english'
];

const allSubjectsPresent = expectedSubjects.every((s) => subjects.has(s));
assert(allSubjectsPresent, 'All 8 core subject domains are represented', `Subjects: ${[...subjects].join(', ')}`);

console.log('================================================================');
console.log(`TOTAL TESTS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log('================================================================');

if (failed > 0) {
  process.exit(1);
}
