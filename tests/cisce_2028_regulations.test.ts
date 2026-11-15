/**
 * MULTIPATH V3 — CISCE Year 2028 Regulations Comprehensive Test Suite
 * Controlling Source: ICSE Regulations for Examination Year 2028 (January 2026)
 * URL: https://cisce.org/wp-content/uploads/2026/01/1.-Regulations.pdf
 * Reference: Chapter I (General Regulations) & Chapter II (Part I & Part II, pp. 5–6)
 */

import {
  validateCisceSubjectPlan,
  validateCisceClass9Promotion,
  validateCisceExaminationEntryAttendance,
  CISCE_GROUP_I_SUBJECTS,
  CISCE_GROUP_II_SUBJECTS,
  CISCE_GROUP_III_SECTION_A_SUBJECTS,
  CISCE_GROUP_III_SECTION_B_SUBJECTS,
  CisceCandidateSubjectPlan,
} from '../src/utils/cisceRegulationsValidator';

let passed = 0;
let failed = 0;

function assert(condition: boolean, desc: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${desc}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${desc}`);
    failed++;
  }
}

console.log('================================================================');
console.log('TESTING CISCE YEAR 2028 REGULATIONS & SELECTION RULES');
console.log('================================================================\n');

// 1. Group III Section A & Section B Subject Counts & Serial Number Audit
console.log('[SECTION 1: GROUP III CATALOGUE & CODE AUDIT]');
const secAKeys = Object.keys(CISCE_GROUP_III_SECTION_A_SUBJECTS);
const secBKeys = Object.keys(CISCE_GROUP_III_SECTION_B_SUBJECTS);

assert(secAKeys.length === 14, `Section A must have exactly 14 subjects (Found: ${secAKeys.length})`);
assert(secBKeys.length === 8, `Section B must have exactly 8 subjects (Found: ${secBKeys.length})`);

// Verify exact Section A subjects
const expectedSecANames = [
  'Computer Application', 'Economic Application', 'Commercial Application', 'Art', 'Performing Arts',
  'Home Science', 'Cookery', 'Fashion Designing', 'Physical Education', 'Yoga',
  'Technical Drawing Applications', 'Environmental Application', 'Mass Media & Communication', 'Hospitality Management'
];
for (const name of expectedSecANames) {
  const found = secAKeys.some(k => CISCE_GROUP_III_SECTION_A_SUBJECTS[k].name === name);
  assert(found, `Section A contains exact regulatory name: "${name}"`);
}

// Verify exact Section B subjects and that their codes are null (table serial numbers 25-32)
const expectedSecBNames = [
  'Robotics and Artificial Intelligence', 'Assistant Beauty Therapist', 'Assistant Hair Stylist',
  'Basic Data Entry Operator', 'Dietic Aide', 'Cashier',
  'Early Years Physical Activity Facilitator', 'Auto Service Technician'
];
for (const name of expectedSecBNames) {
  const entry = Object.values(CISCE_GROUP_III_SECTION_B_SUBJECTS).find(e => e.name === name);
  assert(!!entry, `Section B contains exact regulatory name: "${name}"`);
  assert(entry?.officialSubjectCode === null, `Section B "${name}" code is null (table serial number, not official exam code)`);
}

// Verify Specific Code Audits
assert(CISCE_GROUP_I_SUBJECTS['ENG'].officialSubjectCode === '01', 'English is Subject Code 01 (consisting of Papers 1 & 2)');
assert(!Object.values(CISCE_GROUP_I_SUBJECTS).some(s => s.officialSubjectCode === '02'), 'Zero independent Subject 02 exists (English has Papers 1 & 2)');
assert(CISCE_GROUP_II_SUBJECTS['82'].officialSubjectCode === '82', 'Environmental Science is Subject Code 82 (verified in published 2028 booklet)');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['ART'].officialSubjectCode === '60', 'Art is Subject Code 60 in Section A');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['EVS_APP'].officialSubjectCode === null, 'Environmental Application code is null (unverified in published 2028 booklets)');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['PERF_ARTS'].officialSubjectCode === null, 'Performing Arts numeric code is null (unverified in 2028 regs)');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['TDA'].officialSubjectCode === null, 'Technical Drawing Applications code is null (unverified in 2028 regs)');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['MASS_MEDIA'].officialSubjectCode === null, 'Mass Media & Communication code is null (unverified in 2028 regs)');
assert(CISCE_GROUP_III_SECTION_A_SUBJECTS['HOSPITALITY'].officialSubjectCode === null, 'Hospitality Management code is null (unverified in 2028 regs)');

// 2. Group I Compulsory Core & Second Language Rules
console.log('\n[SECTION 2: GROUP I COMPULSORY CORE & SECOND LANGUAGE RULES]');

// Valid standard 1 Second Language
const plan1Lang2: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Hindi'],
  hcgSelection: 'standard',
  group2SubjectKeys: ['51', '52'], // Math, Science
  group3SubjectKeys: ['CA'], // Computer Application (Sec A)
  supwGradeOrStatus: 'A',
};
const res1Lang2 = validateCisceSubjectPlan(plan1Lang2);
assert(res1Lang2.isValid, 'Standard 1 Second Language plan is VALID');

// Valid 2 Second Languages when one is Hindi
const plan2Lang2WithHindi: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Bengali', 'Hindi'],
  hcgSelection: 'standard',
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'B',
};
const res2Lang2WithHindi = validateCisceSubjectPlan(plan2Lang2WithHindi);
assert(res2Lang2WithHindi.isValid, 'Two Second Languages with Hindi as one of them is VALID');

// Invalid 2 Second Languages when NEITHER is Hindi
const plan2Lang2NoHindi: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Bengali', 'Tamil'],
  hcgSelection: 'standard',
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'C',
};
const res2Lang2NoHindi = validateCisceSubjectPlan(plan2Lang2NoHindi);
assert(!res2Lang2NoHindi.isValid, 'Two Second Languages without Hindi is INVALID');
assert(res2Lang2NoHindi.ruleBreakdowns.languageSelectionRestrictions.some(r => r.includes('ONE of them MUST be Hindi')), 'Reports Second Language Hindi requirement violation');

// Invalid 3 Second Languages
const plan3Lang2: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Hindi', 'Bengali', 'Tamil'],
  hcgSelection: 'standard',
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'A',
};
const res3Lang2 = validateCisceSubjectPlan(plan3Lang2);
assert(!res3Lang2.isValid, 'Three Second Languages is INVALID (maximum 2 allowed)');

// Thailand HCG Geographic Eligibility
const planThaiHcgNonApproved: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Hindi'],
  hcgSelection: 'thailand',
  isApprovedThailandSchool: false,
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'A',
};
const resThaiHcgNonApproved = validateCisceSubjectPlan(planThaiHcgNonApproved);
assert(!resThaiHcgNonApproved.isValid, 'Thailand HCG in non-approved school is INVALID');
assert(resThaiHcgNonApproved.ruleBreakdowns.geographicEligibilityViolations.length > 0, 'Reports Geographic Eligibility violation');

const planThaiHcgApproved: CisceCandidateSubjectPlan = {
  ...planThaiHcgNonApproved,
  isApprovedThailandSchool: true,
};
const resThaiHcgApproved = validateCisceSubjectPlan(planThaiHcgApproved);
assert(resThaiHcgApproved.isValid, 'Thailand HCG in approved Thailand school is VALID');

// 3. Group II Selection Rules (Candidate must select 2 or 3 subjects)
console.log('\n[SECTION 3: GROUP II SELECTION RULES]');
const planG2Under: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group2SubjectKeys: ['51'], // Only 1 subject
};
assert(!validateCisceSubjectPlan(planG2Under).isValid, 'Group II under-allocation (1 subject) is INVALID');

const planG2Over: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group2SubjectKeys: ['51', '52', '64', '63'], // 4 subjects
};
assert(!validateCisceSubjectPlan(planG2Over).isValid, 'Group II over-allocation (4 subjects) is INVALID');

// 4. Group III Section Selection Rules
console.log('\n[SECTION 4: GROUP III SECTION SELECTION RULES]');
// Option A: 1 subject from Section A
const planG3SecA: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: ['CA'] };
assert(validateCisceSubjectPlan(planG3SecA).isValid, 'Group III: Exactly 1 subject from Section A is VALID');

// Option A: 1 subject from Section B
const planG3SecB: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: ['ROBOTICS_AI'] };
assert(validateCisceSubjectPlan(planG3SecB).isValid, 'Group III: Exactly 1 subject from Section B (Robotics & AI) is VALID');

// Option B: 2 subjects (1 from Sec A + 1 from Sec B)
const planG3BothSections: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: ['CA', 'ROBOTICS_AI'] };
assert(validateCisceSubjectPlan(planG3BothSections).isValid, 'Group III: Two subjects (1 Sec A + 1 Sec B) is VALID');

// Strict Prohibition: 2 subjects from Section A
const planG3TwoSecA: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: ['CA', 'ART'] };
assert(!validateCisceSubjectPlan(planG3TwoSecA).isValid, 'Group III: Two subjects both from Section A is strictly INVALID');

// Strict Prohibition: 2 subjects from Section B
const planG3TwoSecB: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: ['ROBOTICS_AI', 'CASHIER'] };
assert(!validateCisceSubjectPlan(planG3TwoSecB).isValid, 'Group III: Two subjects both from Section B is strictly INVALID');

// Invalid 0 subjects from Group III
const planG3None: CisceCandidateSubjectPlan = { ...plan1Lang2, group3SubjectKeys: [] };
assert(!validateCisceSubjectPlan(planG3None).isValid, 'Group III: 0 subjects is INVALID');

// 5. Minimum 6 Examination Subjects Requirement
console.log('\n[SECTION 5: MINIMUM 6 EXAMINATION SUBJECTS REQUIREMENT]');
const plan5SubjectsOnly: CisceCandidateSubjectPlan = {
  classLevel: 9,
  hasEnglish: true,
  secondLanguages: ['Hindi'], // 1
  hcgSelection: 'standard', // 1 -> Grp I total = 3
  group2SubjectKeys: ['51'], // 1 (invalid)
  group3SubjectKeys: ['CA'], // 1 -> Total = 5
  supwGradeOrStatus: 'A',
};
const res5Subjects = validateCisceSubjectPlan(plan5SubjectsOnly);
assert(!res5Subjects.isValid, 'Candidate with only 5 examination subjects is INVALID');
assert(res5Subjects.totalExamSubjectsCount === 5, 'Reports exactly 5 examination subjects');

// 6. Prohibited Subject Combinations
console.log('\n[SECTION 6: PROHIBITED SUBJECT COMBINATIONS]');
// Rule 1: Economics (64) + Economic Application (87)
const planProhib1: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group2SubjectKeys: ['51', '64'], // Math, Econ
  group3SubjectKeys: ['ECON_APP'], // Economic Application
};
const resProhib1 = validateCisceSubjectPlan(planProhib1);
assert(!resProhib1.isValid, 'Economics (64) + Economic Application (87) is INVALID');
assert(resProhib1.ruleBreakdowns.prohibitedSubjectCombinations.some(p => p.includes('Prohibited Subject Combination 1')), 'Reports Prohibited Combination 1');

// Rule 2: Commercial Studies (63) + Commercial Application (88)
const planProhib2: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group2SubjectKeys: ['51', '63'], // Math, Comm Studies
  group3SubjectKeys: ['COMM_APP'], // Commercial Application
};
const resProhib2 = validateCisceSubjectPlan(planProhib2);
assert(!resProhib2.isValid, 'Commercial Studies (63) + Commercial Application (88) is INVALID');
assert(resProhib2.ruleBreakdowns.prohibitedSubjectCombinations.some(p => p.includes('Prohibited Subject Combination 2')), 'Reports Prohibited Combination 2');

// Rule 3: Environmental Science (82) + Environmental Application
const planProhib3: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group2SubjectKeys: ['51', '82'], // Math, EVS (Code 82)
  group3SubjectKeys: ['EVS_APP'], // Environmental Application
};
const resProhib3 = validateCisceSubjectPlan(planProhib3);
assert(!resProhib3.isValid, 'Environmental Science (82) + Environmental Application is INVALID');
assert(resProhib3.ruleBreakdowns.prohibitedSubjectCombinations.some(p => p.includes('Prohibited Subject Combination 3')), 'Reports Prohibited Combination 3');

// Rule 4: Sanskrit Second Language + Sanskrit Classical Language (25)
const planProhib4: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  secondLanguages: ['Sanskrit'],
  group2SubjectKeys: ['51', 'CLASSICAL'],
  group2SpecificClassicalName: 'Sanskrit',
  group3SubjectKeys: ['CA'],
};
const resProhib4 = validateCisceSubjectPlan(planProhib4);
assert(!resProhib4.isValid, 'Second Language Sanskrit + Classical Sanskrit (25) is INVALID');
assert(resProhib4.ruleBreakdowns.prohibitedSubjectCombinations.some(p => p.includes('Prohibited Subject Combination 4')), 'Reports Prohibited Combination 4');

// Rule 5: Same Modern Foreign Language in Group I and Group II
const planProhib5: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  secondLanguages: ['French'],
  group2SubjectKeys: ['51', 'MFL'],
  group2SpecificMflName: 'French',
  group3SubjectKeys: ['CA'],
};
const resProhib5 = validateCisceSubjectPlan(planProhib5);
assert(!resProhib5.isValid, 'French in Group I + French in Group II is INVALID');
assert(resProhib5.ruleBreakdowns.prohibitedSubjectCombinations.some(p => p.includes('Prohibited Subject Combination 5')), 'Reports Prohibited Combination 5');

// 7. Third Language vs Second Language Restriction
console.log('\n[SECTION 7: THIRD LANGUAGE VS SECOND LANGUAGE RESTRICTION]');
const planThirdLangConflict: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  secondLanguages: ['French'],
  thirdLanguageStudiedInMiddleSchool: 'French', // Studied in Class V-VIII
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'A',
};
const resThirdLangConflict = validateCisceSubjectPlan(planThirdLangConflict);
assert(!resThirdLangConflict.isValid, 'Offering Third Language studied in Class V-VIII as Second Language is INVALID');
assert(resThirdLangConflict.ruleBreakdowns.languageSelectionRestrictions.some(r => r.includes('Language Selection Restriction')), 'Reports Third Language vs Second Language restriction');

// 8. School-Level Subject Provision Restriction
console.log('\n[SECTION 8: SCHOOL SUBJECT-PROVISION RESTRICTION]');
const planSchoolProvisionValid: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  schoolApprovedSubjects: ['51', '52', 'CA', 'ART'],
};
assert(validateCisceSubjectPlan(planSchoolProvisionValid).isValid, 'Subjects approved and taught by school are VALID');

const planSchoolProvisionInvalid: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  group3SubjectKeys: ['ROBOTICS_AI'], // School does not teach Robotics & AI
  schoolApprovedSubjects: ['51', '52', 'CA'],
};
const resSchoolProv = validateCisceSubjectPlan(planSchoolProvisionInvalid);
assert(!resSchoolProv.isValid, 'Subject not approved or taught by school is INVALID');
assert(resSchoolProv.ruleBreakdowns.schoolProvisionViolations.length > 0, 'Reports School Provision Restriction violation');

// 9. Council Registration & 15 September Subject Change Cutoff
console.log('\n[SECTION 9: COUNCIL REGISTRATION & 15 SEPTEMBER SUBJECT-CHANGE CUTOFF]');
const planUnregistered: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  isCouncilRegistered: false,
};
const resUnreg = validateCisceSubjectPlan(planUnregistered);
assert(!resUnreg.isValid, 'Candidate not registered with Council is INVALID');
assert(resUnreg.ruleBreakdowns.registrationCutoffViolations.some(v => v.includes('registered with the Council')), 'Reports Council Registration error');

// 15 September Subject Change Cutoff Boundary Tests (Chapter II, Section B, clause 3)
// Cutoff is strictly 15 September of the year candidate was registered in Class IX (e.g. 2026-09-15).
// Boundary Test 1: 14 September of Class IX registration year (VALID)
const planChange14Sep: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 9,
  class9RegistrationYear: 2026,
  subjectChangeDate: '2026-09-14',
};
assert(validateCisceSubjectPlan(planChange14Sep).isValid, 'Boundary Test 1: Subject change on 14 September of Class IX registration year is VALID');

// Boundary Test 2: 15 September of Class IX registration year (VALID - exact cutoff date)
const planChange15Sep: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 9,
  class9RegistrationYear: 2026,
  subjectChangeDate: '2026-09-15',
};
assert(validateCisceSubjectPlan(planChange15Sep).isValid, 'Boundary Test 2: Subject change on 15 September cutoff of Class IX registration year is VALID');

// Boundary Test 3: 16 September of Class IX registration year (INVALID - first day after cutoff)
const planChange16Sep: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 9,
  class9RegistrationYear: 2026,
  subjectChangeDate: '2026-09-16',
};
const resChange16Sep = validateCisceSubjectPlan(planChange16Sep);
assert(!resChange16Sep.isValid, 'Boundary Test 3: Subject change on 16 September of Class IX registration year is INVALID');
assert(resChange16Sep.ruleBreakdowns.registrationCutoffViolations.some(v => v.includes('15 September')), 'Reports 15 September cutoff violation for 16 September change');

// Boundary Test 4: Subsequent Class X year date (INVALID - attempted in following year)
const planChangeClass10: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 10,
  class9RegistrationYear: 2026,
  subjectChangeDate: '2027-08-10', // Following Class X year date
  studiedInClass9: true,
};
const resChangeClass10 = validateCisceSubjectPlan(planChangeClass10);
assert(!resChangeClass10.isValid, 'Boundary Test 4: Subject change attempted in following Class X year (2027-08-10) is INVALID');
assert(resChangeClass10.ruleBreakdowns.registrationCutoffViolations.some(v => v.includes('15 September')), 'Reports 15 September cutoff violation for Class X attempt');

// Boundary Test 5: Date in Class X year before September 15 of that year (still INVALID because cutoff is tied to Class IX registration year)
const planChangeClass10Sep14: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 10,
  class9RegistrationYear: 2026,
  subjectChangeDate: '2027-09-14', // 14 September of Class X year
  studiedInClass9: true,
};
const resChangeClass10Sep14 = validateCisceSubjectPlan(planChangeClass10Sep14);
assert(!resChangeClass10Sep14.isValid, 'Boundary Test 5: Subject change in Class X year even on 14 September is INVALID against Class IX 2026 cutoff');
assert(resChangeClass10Sep14.ruleBreakdowns.registrationCutoffViolations.some(v => v.includes('15 September')), 'Reports 15 September cutoff violation against Class IX registration year');

// 10. Class IX-to-X Continuity Requirement
console.log('\n[SECTION 10: CLASS IX-TO-X CONTINUITY REQUIREMENT]');
const planNoContinuity: CisceCandidateSubjectPlan = {
  classLevel: 10,
  hasEnglish: true,
  secondLanguages: ['Hindi'],
  hcgSelection: 'standard',
  group2SubjectKeys: ['51', '52'],
  group3SubjectKeys: ['CA'],
  supwGradeOrStatus: 'A',
  studiedInClass9: false, // Did not register/study in Class IX
};
const resNoContinuity = validateCisceSubjectPlan(planNoContinuity);
assert(!resNoContinuity.isValid, 'Class 10 candidate without Class 9 continuity is INVALID');
assert(resNoContinuity.ruleBreakdowns.continuityViolations.length > 0, 'Reports Continuity Violation');

// Discrepancy between Class 9 and Class 10 subjects without approved change
const planSubjectMismatch: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  classLevel: 10,
  studiedInClass9: true,
  class9RegisteredSubjects: ['51', '52', 'ART'], // Class 9 had ART, current has CA
  group3SubjectKeys: ['CA'],
  subjectChangedInClass10: false,
};
const resSubjMismatch = validateCisceSubjectPlan(planSubjectMismatch);
assert(!resSubjMismatch.isValid, 'Class 10 candidate offering subject not registered in Class 9 without change is INVALID');
assert(resSubjMismatch.ruleBreakdowns.continuityViolations.some(v => v.includes('not registered in Class IX')), 'Reports Class IX-to-X Subject Continuity Violation');

// 11. Practical/Project-Work School Examination Requirements
console.log('\n[SECTION 11: PRACTICAL/PROJECT-WORK REQUIREMENTS]');
const planPracticalValid: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  practicalProjectWorkCertified: {
    english: true,
    secondLanguage: true,
    hcg: true,
    choiceSubjects: true,
    supw: true,
  },
};
assert(validateCisceSubjectPlan(planPracticalValid).isValid, 'Practical/project work certified across all subjects is VALID');

const planPracticalMissing: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  practicalProjectWorkCertified: {
    english: true,
    secondLanguage: false, // Missing
    hcg: true,
    choiceSubjects: true,
    supw: true,
  },
};
const resPracticalMissing = validateCisceSubjectPlan(planPracticalMissing);
assert(!resPracticalMissing.isValid, 'Missing practical work in Second Language is INVALID');
assert(resPracticalMissing.ruleBreakdowns.practicalWorkViolations.length > 0, 'Reports Practical Work Requirement violation');

// 12. SUPW Grading Logic
console.log('\n[SECTION 12: SUPW GRADING LOGIC]');
for (const grade of ['A', 'B', 'C', 'D'] as const) {
  const plan = { ...plan1Lang2, supwGradeOrStatus: grade };
  assert(validateCisceSubjectPlan(plan).isValid, `SUPW Grade "${grade}" is a passing grade`);
}
const planSupwE = { ...plan1Lang2, supwGradeOrStatus: 'E' as const };
const resSupwE = validateCisceSubjectPlan(planSupwE);
assert(!resSupwE.isValid, 'SUPW Grade "E" is a failing grade');
assert(resSupwE.ruleBreakdowns.courseCompletionViolations.some(v => v.includes('Grade E is a failing grade')), 'Reports SUPW Grade E failure');

// 13. Distinct Attendance Provisions: Examination Entry (Chapter I) vs Class IX Promotion (Chapter II)
console.log('\n[SECTION 13: DISTINCT ATTENDANCE PROVISIONS]');
// Chapter I: Examination Entry Attendance (75% standard, condonation between 60% and 75%)
const entryAttPass = validateCisceExaminationEntryAttendance({
  candidateName: 'Priya Sen',
  attendancePercentageYear1: 82,
  attendancePercentageYear2: 78,
});
assert(entryAttPass.isEligibleForEntry, 'Attendance >= 75% in each year meets examination entry standard');

const entryAttCondoned = validateCisceExaminationEntryAttendance({
  candidateName: 'Priya Sen',
  attendancePercentageYear1: 65,
  attendancePercentageYear2: 76,
  hasCouncilCondonation: true,
  condonationReason: 'Certified medical grounds with hospital documentation',
});
assert(entryAttCondoned.isEligibleForEntry && entryAttCondoned.condonationApplied, 'Attendance between 60% and 74.9% with discretionary condonation by Chief Executive and Secretary is ELIGIBLE');
assert(entryAttCondoned.reasons.some(r => r.includes('Chief Executive and Secretary')), 'Condonation reason explicitly cites Chief Executive and Secretary');

const entryAttUncondoned = validateCisceExaminationEntryAttendance({
  candidateName: 'Priya Sen',
  attendancePercentageYear1: 68,
  attendancePercentageYear2: 76,
  hasCouncilCondonation: false,
});
assert(!entryAttUncondoned.isEligibleForEntry, 'Attendance between 60% and 74.9% WITHOUT discretionary condonation is INELIGIBLE');
assert(entryAttUncondoned.reasons.some(r => r.includes('Chief Executive and Secretary')), 'Ineligibility reason identifies discretionary condonation by Chief Executive and Secretary');

// Attendance below 60% without exceptional condonation is INELIGIBLE
const entryAttBelow60WithoutExceptional = validateCisceExaminationEntryAttendance({
  candidateName: 'Priya Sen',
  attendancePercentageYear1: 54, // Below 60%
  attendancePercentageYear2: 70,
  hasCouncilCondonation: true, // Ordinary condonation cannot cure <60%
  hasExceptionalCouncilCondonation: false,
});
assert(!entryAttBelow60WithoutExceptional.isEligibleForEntry, 'Attendance below 60% without exceptional condonation is INELIGIBLE');
assert(entryAttBelow60WithoutExceptional.reasons.some(r => r.includes('Chief Executive and Secretary')), 'Under-60 ineligibility reason identifies Chief Executive and Secretary exceptional authority');

// Attendance below 60% WITH exceptional condonation by Chief Executive and Secretary (serious medical / authorised representation) IS ELIGIBLE
const entryAttBelow60WithExceptional = validateCisceExaminationEntryAttendance({
  candidateName: 'Priya Sen',
  attendancePercentageYear1: 54, // Below 60%
  attendancePercentageYear2: 70,
  hasExceptionalCouncilCondonation: true,
  exceptionalCondonationReason: 'Authorised National representation in youth sports championships',
});
assert(entryAttBelow60WithExceptional.isEligibleForEntry && entryAttBelow60WithExceptional.exceptionalCondonationApplied, 'Attendance below 60% with exceptional condonation by Chief Executive and Secretary under Chapter I Section E is ELIGIBLE');
assert(entryAttBelow60WithExceptional.reasons.some(r => r.includes('Chief Executive and Secretary')), 'Exceptional condonation reason explicitly cites Chief Executive and Secretary');

// 14. Class IX Internal Examination & Promotion Validator (Chapter II)
console.log('\n[SECTION 14: CLASS IX PROMOTION CRITERIA]');
// Pass: 33%+ in 5 subjects including English, 75%+ attendance
const recPass = {
  candidateName: 'Rohan Sharma',
  subjectScores: [
    { subjectName: 'English', marksPercentage: 65, isEnglish: true },
    { subjectName: 'Hindi', marksPercentage: 70, isEnglish: false },
    { subjectName: 'History & Civics', marksPercentage: 58, isEnglish: false },
    { subjectName: 'Mathematics', marksPercentage: 45, isEnglish: false },
    { subjectName: 'Science', marksPercentage: 52, isEnglish: false },
    { subjectName: 'Computer Application', marksPercentage: 80, isEnglish: false },
  ],
  attendancePercentage: 85,
};
const resPromPass = validateCisceClass9Promotion(recPass);
assert(resPromPass.isPromoted, 'Candidate meeting all promotion criteria is PROMOTED');

// Fail: English < 33%
const recFailEng = {
  ...recPass,
  subjectScores: recPass.subjectScores.map(s => s.isEnglish ? { ...s, marksPercentage: 28 } : s),
};
const resPromFailEng = validateCisceClass9Promotion(recFailEng);
assert(!resPromFailEng.isPromoted, 'Candidate with English < 33% is NOT PROMOTED');

// Fail: < 5 subjects passed
const recFailSubjects = {
  ...recPass,
  subjectScores: [
    { subjectName: 'English', marksPercentage: 50, isEnglish: true },
    { subjectName: 'Hindi', marksPercentage: 45, isEnglish: false },
    { subjectName: 'Mathematics', marksPercentage: 40, isEnglish: false },
    { subjectName: 'Science', marksPercentage: 25, isEnglish: false }, // fail
    { subjectName: 'HCG', marksPercentage: 20, isEnglish: false }, // fail
    { subjectName: 'CA', marksPercentage: 22, isEnglish: false }, // fail -> only 3 passed
  ],
};
const resPromFailSubj = validateCisceClass9Promotion(recFailSubjects);
assert(!resPromFailSubj.isPromoted, 'Candidate with only 3 subjects passed is NOT PROMOTED');

// Fail: Attendance < 75%
const recFailAtt = { ...recPass, attendancePercentage: 70 };
const resPromFailAtt = validateCisceClass9Promotion(recFailAtt);
assert(!resPromFailAtt.isPromoted, 'Candidate with attendance < 75% is NOT PROMOTED');

// 15. Chapter II Part I: 5 Compulsory Course-Completion Requirements
console.log('\n[SECTION 15: 5 COMPULSORY COURSE-COMPLETION REQUIREMENTS (CHAPTER II PART I)]');
const planCourseCompPass: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  part1CompletedCourses: {
    thirdLanguageClass5to8: true,
    art: true,
    supwAndCommunityService: true,
    physicalEducation: true,
    educationInMoralAndSpiritualValues: true,
  },
};
const resCourseCompPass = validateCisceSubjectPlan(planCourseCompPass);
assert(resCourseCompPass.isValid, 'Candidate completing all 5 Part I internal courses is VALID');

const planCourseCompMissingThirdLang: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  part1CompletedCourses: {
    thirdLanguageClass5to8: false, // Incomplete
    art: true,
    supwAndCommunityService: true,
    physicalEducation: true,
    educationInMoralAndSpiritualValues: true,
  },
};
const resCourseCompMissingThirdLang = validateCisceSubjectPlan(planCourseCompMissingThirdLang);
assert(!resCourseCompMissingThirdLang.isValid, 'Missing Third Language (Class V–VIII) course is INVALID');
assert(resCourseCompMissingThirdLang.ruleBreakdowns.courseCompletionViolations.some(v => v.includes('Third Language')), 'Reports Third Language course completion violation');

const planCourseCompMissingArt: CisceCandidateSubjectPlan = {
  ...plan1Lang2,
  part1CompletedCourses: {
    thirdLanguageClass5to8: true,
    art: false, // Incomplete
    supwAndCommunityService: true,
    physicalEducation: true,
    educationInMoralAndSpiritualValues: true,
  },
};
const resCourseCompMissingArt = validateCisceSubjectPlan(planCourseCompMissingArt);
assert(!resCourseCompMissingArt.isValid, 'Missing Art course is INVALID');
assert(resCourseCompMissingArt.ruleBreakdowns.courseCompletionViolations.some(v => v.includes('Art')), 'Reports Art course completion violation');

console.log(`\n================================================================`);
console.log(`CISCE YEAR 2028 TEST SUMMARY: ${passed} passed, ${failed} failed.`);
console.log(`================================================================`);

if (failed > 0) {
  process.exit(1);
}
