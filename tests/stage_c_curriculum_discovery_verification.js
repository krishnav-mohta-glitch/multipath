import assert from 'node:assert/strict';
import { TOPICS } from '../src/data/topics.ts';
import {
  filterCurriculumTopics,
  calculateDynamicSubjectCounts,
  matchesSearchQuery,
  normalizeSearchString,
  getCurriculumStats,
  validateCbseClass10SubjectSelection,
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

// 10. CBSE Class 10 Subject 6 & Subject 7 Statutory Selection Validation
test('validateCbseClass10SubjectSelection enforces Group S, Group L, and Group A2 rules with complete 401-422 range rejection in Subject 7', () => {
  // Case 1: Subject 6 = Group S (402); Subject 7 = eligible Group L (122 Sanskrit) -> Accept
  const acceptLang = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '122',
  });
  assert.equal(acceptLang.isValid, true, 'Subject 7 with Group L Sanskrit 122 must be accepted');
  assert.equal(acceptLang.subject7Details?.group, 'Group L');
  assert.equal(acceptLang.subject7Details?.coverageStatus, 'supplementary_framework');

  // Case 2: Subject 6 = Group S (402); Subject 7 = eligible Group A2 (165 Computer Applications) -> Accept
  const acceptA2 = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '165',
  });
  assert.equal(acceptA2.isValid, true, 'Subject 7 with Group A2 Computer Applications 165 must be accepted');
  assert.equal(acceptA2.subject7Details?.group, 'Group A2');
  assert.equal(acceptA2.subject7Details?.coverageStatus, 'directly_mapped');

  // Case 3: Subject 6 = Group S (402); Subject 7 = different Group S subject (417 AI) -> Reject
  const rejectDiffSkill = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '417',
  });
  assert.equal(rejectDiffSkill.isValid, false, 'Subject 7 with different Group S subject 417 must be rejected');
  assert.ok(rejectDiffSkill.errors.some((e) => e.includes('Subject 7 cannot be a Skill Subject from Group S')));

  // Case 4: Subject 6 = Group S (402); Subject 7 = same Group S subject (402 IT) -> Reject
  const rejectSameSkill = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '402',
  });
  assert.equal(rejectSameSkill.isValid, false, 'Subject 7 repeating same Group S subject 402 must be rejected');
  assert.ok(rejectSameSkill.errors.some((e) => e.includes('Subject 7 cannot be a Skill Subject from Group S')));

  // Case 5: Subject 7 repeats Language 1 or Language 2 -> Reject
  const rejectRepeatLang1 = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '184',
  });
  assert.equal(rejectRepeatLang1.isValid, false, 'Subject 7 repeating Language 1 must be rejected');
  assert.ok(rejectRepeatLang1.errors.some((e) => e.includes('repeats Language 1 or Language 2')));

  const rejectRepeatLang2 = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '002',
  });
  assert.equal(rejectRepeatLang2.isValid, false, 'Subject 7 repeating Language 2 must be rejected');
  assert.ok(rejectRepeatLang2.errors.some((e) => e.includes('repeats Language 1 or Language 2')));

  // Case 6: Subject 7 = compulsory Group A1 core subject (041, 086, 087) -> Reject
  for (const coreCode of ['041', '086', '087']) {
    const rejectCore = validateCbseClass10SubjectSelection({
      language1Code: '184',
      language2Code: '002',
      subject6SkillCode: '402',
      subject7ElectiveCode: coreCode,
    });
    assert.equal(rejectCore.isValid, false, `Subject 7 selecting compulsory core ${coreCode} must be rejected`);
    assert.ok(rejectCore.errors.some((e) => e.includes('cannot be a compulsory Group A1 core subject')));
  }

  // Case 7: Subject 7 = unprofiled but valid Group L offering (e.g. French 018) -> Accept with supplementary_framework
  const acceptFrench = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '018', // French
  });
  assert.equal(acceptFrench.isValid, true, 'Subject 7 with French 018 must be accepted');
  assert.equal(acceptFrench.subject7Details?.group, 'Group L');
  assert.equal(acceptFrench.subject7Details?.coverageStatus, 'supplementary_framework');
  assert.equal(acceptFrench.subject7Details?.isSupported, false, 'Unprofiled French must not claim full interactive support');

  // Case 8: Verify the complete 401–422 range in Subject 7: EVERY code must be rejected!
  for (let code = 401; code <= 422; code++) {
    const res = validateCbseClass10SubjectSelection({
      language1Code: '184',
      language2Code: '002',
      subject6SkillCode: code === 402 ? '401' : '402',
      subject7ElectiveCode: String(code),
    });
    assert.equal(res.isValid, false, `Subject 7 must strictly reject Group S code ${code}`);
    assert.ok(
      res.errors.some((e) => e.includes('Subject 7 cannot be a Skill Subject from Group S')),
      `Error for code ${code} must cite Group S restriction`
    );
  }

  // Case 9: Arbitrary unknown codes in Subject 7 (e.g. 999, 888) -> Reject with not recognized error
  const rejectUnknown = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '999',
  });
  assert.equal(rejectUnknown.isValid, false, 'Subject 7 with unknown code 999 must be rejected');
  assert.ok(rejectUnknown.errors.some((e) => e.includes('not recognized as an eligible Group L Language or Group A2 Academic Elective')));

  // Case 10: Malformed non-numeric or trailing character codes (e.g. "402abc", "-402", "40") -> Reject as malformed
  const rejectMalformed1 = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '402abc',
  });
  assert.equal(rejectMalformed1.isValid, false, 'Subject 7 with malformed "402abc" must be rejected');
  assert.ok(rejectMalformed1.errors.some((e) => e.includes('malformed')));

  const rejectMalformed2 = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '40',
  });
  assert.equal(rejectMalformed2.isValid, false, 'Subject 7 with 2-digit "40" must be rejected');
  assert.ok(rejectMalformed2.errors.some((e) => e.includes('malformed')));

  // Case 11: Positive eligibility for Group A2 Painting (049) and Home Science (064)
  const acceptPainting = validateCbseClass10SubjectSelection({
    language1Code: '184',
    language2Code: '002',
    subject6SkillCode: '402',
    subject7ElectiveCode: '049',
  });
  assert.equal(acceptPainting.isValid, true, 'Subject 7 with Painting 049 must be accepted');
  assert.equal(acceptPainting.subject7Details?.group, 'Group A2');
  assert.equal(acceptPainting.subject7Details?.title, 'Painting');
  assert.equal(acceptPainting.subject7Details?.coverageStatus, 'supplementary_framework');
});

console.log(`\n🎉 All ${passedTests} Stage C Curriculum Discovery Verification tests passed successfully!\n`);
