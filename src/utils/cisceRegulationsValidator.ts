/**
 * MULTIPATH V3 — CISCE ICSE Year 2028 Regulations Validator
 * 
 * Controlling Statutory Document:
 * ICSE Regulations for Examination Year 2028 — January 2026
 * Primary URL: https://cisce.org/wp-content/uploads/2026/01/1.-Regulations.pdf
 * Reference: Chapter I (General Regulations) & Chapter II (Part I & Part II, pp. 5–6)
 * 
 * Statutory Architecture:
 * - Group I (Compulsory Core):
 *   1. English (Subject Code 01: Paper 1 Language & Paper 2 Literature in English)
 *   2. Second Language (1 or 2 permitted languages; if 2 offered, one MUST be Hindi)
 *   3. History, Civics and Geography (Subject Code 50: Paper 1 History & Civics, Paper 2 Geography;
 *      or Thailand HCG for candidates entered by approved affiliated schools in Thailand)
 * - Group II (Choice of Subjects): Candidate must select TWO or THREE subjects from 7 options:
 *   (Mathematics 51, Science 52, Economics 64, Commercial Studies 63, Modern Foreign Language, Classical Language, Environmental Science 58).
 *   Math + Science is an official curriculum recommendation, NOT an unconditional statutory requirement.
 * - Group III (Choice of Subjects — Strict Section Rules):
 *   - Exactly ONE subject from Section A or Section B; OR
 *   - Exactly TWO subjects: ONE from Section A AND ONE from Section B.
 *   - Strictly NO two-subject selections from the same section (e.g. 2 from Sec A or 2 from Sec B).
 * - Section A: Exactly 14 subjects (table serials 11–24; codes confirmed in separate syllabus booklets or null).
 * - Section B: Exactly 8 vocational subjects (table serials 25–32; numeric exam codes are strictly null).
 * - Table Serial Numbers 1–32 are list serials in the regulations booklet, NOT numeric examination codes.
 * - Minimum 6 examination subjects registered.
 * - School Subject-Provision Restriction: Candidates may only offer subjects approved and taught by their school.
 * - 15 September Subject-Change Cutoff (Chapter II, Section B, clause 3): A candidate shall not be permitted to change subjects after 15 September of the year in which they were registered in Class IX. Procedural requirements for changes on or before this cutoff are unspecified by Clause 3.
 * - Class IX-to-X Subject Continuity: Candidate must have registered and studied the subjects in Class IX.
 * - Practical/Project-Work Evaluation: Candidates must be examined by school in practical/project work across subjects & SUPW.
 * - Attendance Provisions Separated:
 *   * Examination Entry (Chapter I): 75% standard in each year; discretionary condonation by the Chief Executive and Secretary between 60% and 74.9% (illness/special circumstances), and below 60% in exceptional cases (serious psychological/medical grounds, authorised sports/arts representation, unforeseen circumstances).
 *   * Class IX Promotion (Chapter II): 33% in 5 subjects individually including English; 75% attendance of working days.
 * - Compulsory Course Completion (Chapter II Part I): Third Language (Classes V-VIII Internal Examination), Art (Internal Assessment), SUPW (Internal Assessment, Grades A-E, min Grade D pass), Physical Education, Education in Moral and Spiritual Values.
 * - SUPW Grades: Grades A, B, C, D pass (Grade D is lowest pass); Grade E is failing grade.
 */

export interface CisceSubjectDefinition {
  serialNumber: number; // Table serial number (1–32)
  name: string;
  officialSubjectCode: string | null; // Verified official code, or null if unverified / not assigned
  codeSource?: string;
  group: 'I' | 'II' | 'III';
  groupSection?: 'A' | 'B';
  isCompulsory?: boolean;
}

// Group I Subjects (Serial 1–3)
export const CISCE_GROUP_I_SUBJECTS: Record<string, CisceSubjectDefinition> = {
  'ENG': {
    serialNumber: 1,
    name: 'English',
    officialSubjectCode: '01',
    codeSource: 'ICSE Syllabuses Subject Code 01 (Paper 1: English Language, Paper 2: Literature in English)',
    group: 'I',
    isCompulsory: true,
  },
  'LANG2': {
    serialNumber: 2,
    name: 'Second Language',
    officialSubjectCode: null, // Varies by language (e.g. Hindi 05, Bengali 03, Gujarati 04, Sanskrit 19)
    codeSource: 'ICSE Syllabuses Language Codes (generic pool entry carries null)',
    group: 'I',
    isCompulsory: true,
  },
  'HCG': {
    serialNumber: 3,
    name: 'History, Civics and Geography',
    officialSubjectCode: '50',
    codeSource: 'ICSE Syllabuses Subject Code 50 (Paper 1 History & Civics, Paper 2 Geography)',
    group: 'I',
    isCompulsory: true,
  },
  'HCG_THAI': {
    serialNumber: 3,
    name: 'History, Civics and Geography (Thailand)',
    officialSubjectCode: null,
    codeSource: 'ICSE Regulations Chapter II Part II (Thailand alternative in lieu of Code 50 for approved schools in Thailand)',
    group: 'I',
    isCompulsory: false,
  },
};

// Group II Subjects (Serial 4–10)
export const CISCE_GROUP_II_SUBJECTS: Record<string, CisceSubjectDefinition> = {
  '51': {
    serialNumber: 4,
    name: 'Mathematics',
    officialSubjectCode: '51',
    codeSource: 'ICSE Syllabuses Subject Code 51',
    group: 'II',
  },
  '52': {
    serialNumber: 5,
    name: 'Science (Physics, Chemistry, Biology)',
    officialSubjectCode: '52',
    codeSource: 'ICSE Syllabuses Subject Code 52 (Physics, Chemistry, Biology papers)',
    group: 'II',
  },
  '64': {
    serialNumber: 6,
    name: 'Economics',
    officialSubjectCode: '64',
    codeSource: 'ICSE Syllabuses Subject Code 64',
    group: 'II',
  },
  '63': {
    serialNumber: 7,
    name: 'Commercial Studies',
    officialSubjectCode: '63',
    codeSource: 'ICSE Syllabuses Subject Code 63',
    group: 'II',
  },
  'MFL': {
    serialNumber: 8,
    name: 'A Modern Foreign Language',
    officialSubjectCode: null, // French 27, German 28, Spanish 36 (generic pool carries null)
    codeSource: 'ICSE Syllabuses MFL Codes',
    group: 'II',
  },
  'CLASSICAL': {
    serialNumber: 9,
    name: 'A Classical Language',
    officialSubjectCode: null, // Sanskrit 25, Persian 26 (generic pool carries null)
    codeSource: 'ICSE Syllabuses Classical Language Codes',
    group: 'II',
  },
  '82': {
    serialNumber: 10,
    name: 'Environmental Science',
    officialSubjectCode: '82',
    codeSource: 'ICSE Regulations and Syllabuses, 2028 — ENVIRONMENTAL SCIENCE (82) (https://cisce.org/wp-content/uploads/2026/01/17.-Environmental-Science.pdf)',
    group: 'II',
  },
};

// Group III Section A Subjects (Exactly 14 subjects, Serial 11–24)
export const CISCE_GROUP_III_SECTION_A_SUBJECTS: Record<string, CisceSubjectDefinition> = {
  'CA': {
    serialNumber: 11,
    name: 'Computer Application',
    officialSubjectCode: '86',
    codeSource: 'ICSE Syllabuses Subject Code 86',
    group: 'III',
    groupSection: 'A',
  },
  'ECON_APP': {
    serialNumber: 12,
    name: 'Economic Application',
    officialSubjectCode: '87',
    codeSource: 'ICSE Syllabuses Subject Code 87',
    group: 'III',
    groupSection: 'A',
  },
  'COMM_APP': {
    serialNumber: 13,
    name: 'Commercial Application',
    officialSubjectCode: '88',
    codeSource: 'ICSE Syllabuses Subject Code 88',
    group: 'III',
    groupSection: 'A',
  },
  'ART': {
    serialNumber: 14,
    name: 'Art',
    officialSubjectCode: '60',
    codeSource: 'ICSE Syllabuses Subject Code 60 (Papers 1–4)',
    group: 'III',
    groupSection: 'A',
  },
  'PERF_ARTS': {
    serialNumber: 15,
    name: 'Performing Arts',
    officialSubjectCode: null, // Unverified in Year 2028 regulations; no numeric code published
    codeSource: 'Table Serial No. 15 in Regulations 2028 (numeric code unverified for Year 2028)',
    group: 'III',
    groupSection: 'A',
  },
  'HOME_SCI': {
    serialNumber: 16,
    name: 'Home Science',
    officialSubjectCode: '69',
    codeSource: 'ICSE Syllabuses Subject Code 69',
    group: 'III',
    groupSection: 'A',
  },
  'COOKERY': {
    serialNumber: 17,
    name: 'Cookery',
    officialSubjectCode: '70',
    codeSource: 'ICSE Syllabuses Subject Code 70',
    group: 'III',
    groupSection: 'A',
  },
  'FASHION': {
    serialNumber: 18,
    name: 'Fashion Designing',
    officialSubjectCode: '71',
    codeSource: 'ICSE Syllabuses Subject Code 71',
    group: 'III',
    groupSection: 'A',
  },
  'PE': {
    serialNumber: 19,
    name: 'Physical Education',
    officialSubjectCode: '72',
    codeSource: 'ICSE Syllabuses Subject Code 72',
    group: 'III',
    groupSection: 'A',
  },
  'YOGA': {
    serialNumber: 20,
    name: 'Yoga',
    officialSubjectCode: '84',
    codeSource: 'ICSE Syllabuses Subject Code 84',
    group: 'III',
    groupSection: 'A',
  },
  'TDA': {
    serialNumber: 21,
    name: 'Technical Drawing Applications',
    officialSubjectCode: null, // Historical Code 65 applied to Technical Drawing; TDA is unverified in Year 2028
    codeSource: 'Table Serial No. 21 in Regulations 2028 (numeric code unverified for Year 2028)',
    group: 'III',
    groupSection: 'A',
  },
  'EVS_APP': {
    serialNumber: 22,
    name: 'Environmental Application',
    officialSubjectCode: null, // Unverified in published Year 2028 syllabus booklets
    codeSource: 'Table Serial No. 22 in Regulations 2028 (numeric exam code unverified in published Year 2028 syllabus booklets; null)',
    group: 'III',
    groupSection: 'A',
  },
  'MASS_MEDIA': {
    serialNumber: 23,
    name: 'Mass Media & Communication',
    officialSubjectCode: null, // Draft 90 unverified in Year 2028 official publications
    codeSource: 'Table Serial No. 23 in Regulations 2028 (numeric code unverified for Year 2028)',
    group: 'III',
    groupSection: 'A',
  },
  'HOSPITALITY': {
    serialNumber: 24,
    name: 'Hospitality Management',
    officialSubjectCode: null, // Draft 93 unverified in Year 2028 official publications
    codeSource: 'Table Serial No. 24 in Regulations 2028 (numeric code unverified for Year 2028)',
    group: 'III',
    groupSection: 'A',
  },
};

// Group III Section B Subjects (Exactly 8 vocational subjects, Serial 25–32)
// NOTE: Table serial numbers 25-32 in the 2028 regulations are list serials, not numeric exam codes.
export const CISCE_GROUP_III_SECTION_B_SUBJECTS: Record<string, CisceSubjectDefinition> = {
  'ROBOTICS_AI': {
    serialNumber: 25,
    name: 'Robotics and Artificial Intelligence',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 25 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'BEAUTY_THERAPIST': {
    serialNumber: 26,
    name: 'Assistant Beauty Therapist',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 26 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'HAIR_STYLIST': {
    serialNumber: 27,
    name: 'Assistant Hair Stylist',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 27 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'DATA_ENTRY': {
    serialNumber: 28,
    name: 'Basic Data Entry Operator',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 28 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'DIETIC_AIDE': {
    serialNumber: 29,
    name: 'Dietic Aide',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 29 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'CASHIER': {
    serialNumber: 30,
    name: 'Cashier',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 30 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'EARLY_YEARS_PE': {
    serialNumber: 31,
    name: 'Early Years Physical Activity Facilitator',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 31 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
  'AUTO_TECH': {
    serialNumber: 32,
    name: 'Auto Service Technician',
    officialSubjectCode: null,
    codeSource: 'Table Serial No. 32 in Regulations 2028 (no published numeric code in booklet)',
    group: 'III',
    groupSection: 'B',
  },
};

export interface CisceCandidateSubjectPlan {
  classLevel: 9 | 10;
  hasEnglish: boolean;
  secondLanguages: string[]; // 1 or 2 languages (e.g. ['Hindi'], ['Bengali', 'Hindi'], etc.)
  thirdLanguageStudiedInMiddleSchool?: string; // e.g. 'French', 'Sanskrit', etc. (Classes V–VIII)
  hcgSelection: 'standard' | 'thailand';
  isApprovedThailandSchool?: boolean;
  group2SubjectKeys: string[]; // Keys from CISCE_GROUP_II_SUBJECTS ('51', '52', '64', '63', 'MFL', 'CLASSICAL', '82')
  group2SpecificMflName?: string; // e.g. 'French', 'German', 'Spanish'
  group2SpecificClassicalName?: string; // e.g. 'Sanskrit', 'Persian'
  group3SubjectKeys: string[]; // Keys from Section A or Section B
  supwGradeOrStatus: 'A' | 'B' | 'C' | 'D' | 'E' | 'satisfied' | 'unsatisfied';

  // Distinct Registration & Eligibility Constraints
  schoolApprovedSubjects?: string[]; // If provided, candidate's selected subject keys must be provisioned/taught by school
  isCouncilRegistered?: boolean; // Council subject registration flag (defaults to true if unspecified)
  class9RegistrationYear?: number; // Year candidate was registered in Class IX (e.g. 2026)
  subjectChangedInClass10?: boolean; // Whether candidate changed subjects in Class 10
  subjectChangeDate?: string; // Date of change (cutoff: 15 September of the year candidate was registered in Class IX)
  studiedInClass9?: boolean; // For Class 10 candidates (continuity requirement)
  class9RegisteredSubjects?: string[]; // Subject keys registered in Class 9 (for Class 10 continuity check)

  // Practical/Project-Work Certification (School Evaluation across all subjects & SUPW)
  practicalProjectWorkCertified?: {
    english?: boolean;
    secondLanguage?: boolean;
    hcg?: boolean;
    choiceSubjects?: boolean;
    supw?: boolean;
  };

  // Compulsory course completions (Chapter II Part I)
  part1CompletedCourses?: {
    thirdLanguageClass5to8?: boolean;
    art?: boolean;
    supwAndCommunityService?: boolean;
    physicalEducation?: boolean;
    educationInMoralAndSpiritualValues?: boolean;
  };
}

export interface CisceValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalExamSubjectsCount: number;
  ruleBreakdowns: {
    prohibitedSubjectCombinations: string[];
    groupSelectionViolations: string[];
    languageSelectionRestrictions: string[];
    continuityViolations: string[];
    geographicEligibilityViolations: string[];
    courseCompletionViolations: string[];
    schoolProvisionViolations: string[];
    registrationCutoffViolations: string[];
    practicalWorkViolations: string[];
  };
  details: {
    group1Valid: boolean;
    group1Count: number;
    group2Count: number;
    group2Valid: boolean;
    group3Count: number;
    group3Valid: boolean;
    group3SectionACount: number;
    group3SectionBCount: number;
    supwValid: boolean;
    continuityValid: boolean;
    courseCompletionValid: boolean;
    schoolProvisionValid: boolean;
    registrationCutoffValid: boolean;
    practicalWorkValid: boolean;
  };
}

/**
 * Validates a candidate's ICSE Class IX / X subject combination against
 * CISCE Year 2028 Regulations (January 2026).
 */
export function validateCisceSubjectPlan(plan: CisceCandidateSubjectPlan): CisceValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const prohibitedSubjectCombinations: string[] = [];
  const groupSelectionViolations: string[] = [];
  const languageSelectionRestrictions: string[] = [];
  const continuityViolations: string[] = [];
  const geographicEligibilityViolations: string[] = [];
  const courseCompletionViolations: string[] = [];
  const schoolProvisionViolations: string[] = [];
  const registrationCutoffViolations: string[] = [];
  const practicalWorkViolations: string[] = [];

  // 1. Group I Validation (Compulsory Core)
  let group1Valid = true;
  if (!plan.hasEnglish) {
    const err = 'Group I Requirement: English (Subject Code 01: Papers 1 & 2) is compulsory for all candidates.';
    errors.push(err);
    groupSelectionViolations.push(err);
    group1Valid = false;
  }

  const secondLangs = (plan.secondLanguages || []).map((l) => l.trim()).filter(Boolean);
  if (secondLangs.length === 0) {
    const err = 'Group I Requirement: A candidate must offer at least ONE Second Language.';
    errors.push(err);
    groupSelectionViolations.push(err);
    group1Valid = false;
  } else if (secondLangs.length > 2) {
    const err = `Group I Requirement: A candidate may offer at most TWO Second Languages. (Currently selected: ${secondLangs.length}).`;
    errors.push(err);
    groupSelectionViolations.push(err);
    group1Valid = false;
  } else if (secondLangs.length === 2) {
    // Statutory Rule: Where a candidate offers two Second Languages, one MUST be Hindi.
    const hasHindi = secondLangs.some((l) => l.toLowerCase() === 'hindi');
    if (!hasHindi) {
      const err = 'Group I Statutory Language Rule: Where a candidate offers two Second Languages, ONE of them MUST be Hindi.';
      errors.push(err);
      languageSelectionRestrictions.push(err);
      group1Valid = false;
    }
  }

  if (!plan.hcgSelection) {
    const err = 'Group I Requirement: History, Civics and Geography (or approved Thailand alternative) is compulsory.';
    errors.push(err);
    groupSelectionViolations.push(err);
    group1Valid = false;
  }

  // Geographic Eligibility Condition: Thailand HCG
  if (plan.hcgSelection === 'thailand') {
    if (!plan.isApprovedThailandSchool) {
      const violation = 'Geographic Eligibility Condition: History, Civics and Geography (Thailand) may ONLY be offered by candidates entered by approved affiliated schools in Thailand in lieu of standard HCG.';
      errors.push(violation);
      geographicEligibilityViolations.push(violation);
      group1Valid = false;
    }
  }

  const group1Count = (plan.hasEnglish ? 1 : 0) + secondLangs.length + (plan.hcgSelection ? 1 : 0);

  // 2. Group II Validation (Choice: candidate must select 2 or 3 subjects)
  const g2Keys = Array.from(new Set(plan.group2SubjectKeys || []));
  const group2Count = g2Keys.length;
  let group2Valid = true;

  if (group2Count < 2) {
    const err = `Group II Selection Requirement: Candidate must select at least TWO subjects from Group II. (Currently selected: ${group2Count}).`;
    errors.push(err);
    groupSelectionViolations.push(err);
    group2Valid = false;
  } else if (group2Count > 3) {
    const err = `Group II Selection Requirement: Candidate may select at most THREE subjects from Group II. (Currently selected: ${group2Count}).`;
    errors.push(err);
    groupSelectionViolations.push(err);
    group2Valid = false;
  }

  for (const k of g2Keys) {
    if (!CISCE_GROUP_II_SUBJECTS[k]) {
      const err = `Invalid Group II subject key: "${k}".`;
      errors.push(err);
      groupSelectionViolations.push(err);
      group2Valid = false;
    }
  }

  // 3. Group III Validation (Choice: 1 from Sec A or B; OR 2: 1 from Sec A AND 1 from Sec B)
  const g3Keys = Array.from(new Set(plan.group3SubjectKeys || []));
  const group3Count = g3Keys.length;
  let group3Valid = true;

  let sectionACount = 0;
  let sectionBCount = 0;

  for (const k of g3Keys) {
    if (CISCE_GROUP_III_SECTION_A_SUBJECTS[k]) {
      sectionACount++;
    } else if (CISCE_GROUP_III_SECTION_B_SUBJECTS[k]) {
      sectionBCount++;
    } else {
      const err = `Invalid Group III subject identifier: "${k}".`;
      errors.push(err);
      groupSelectionViolations.push(err);
      group3Valid = false;
    }
  }

  if (group3Count === 0) {
    const err = 'Group III Selection Requirement: Candidate must select at least ONE subject from Group III (Section A or Section B).';
    errors.push(err);
    groupSelectionViolations.push(err);
    group3Valid = false;
  } else if (group3Count === 1) {
    // Exactly 1 subject from either Section A or Section B is valid
    group3Valid = true;
  } else if (group3Count === 2) {
    // If two subjects offered, exactly ONE must be from Section A and ONE from Section B
    if (sectionACount === 2) {
      const err = 'Group III Selection Constraint: Offering two subjects from Section A alone is strictly prohibited. If two subjects are offered, exactly ONE must be from Section A and ONE from Section B.';
      errors.push(err);
      groupSelectionViolations.push(err);
      group3Valid = false;
    } else if (sectionBCount === 2) {
      const err = 'Group III Selection Constraint: Offering two subjects from Section B alone is strictly prohibited. If two subjects are offered, exactly ONE must be from Section A and ONE from Section B.';
      errors.push(err);
      groupSelectionViolations.push(err);
      group3Valid = false;
    } else if (sectionACount === 1 && sectionBCount === 1) {
      group3Valid = true;
    }
  } else {
    const err = `Group III Selection Requirement: Candidate may offer at most TWO subjects from Group III (1 from Section A + 1 from Section B). (Currently selected: ${group3Count}).`;
    errors.push(err);
    groupSelectionViolations.push(err);
    group3Valid = false;
  }

  // 4. Statutory Prohibited Subject Combinations
  // Prohibited Rule 1: Economics in Group II with Economic Application in Group III
  const hasG2Econ = g2Keys.includes('64');
  const hasG3EconApp = g3Keys.includes('ECON_APP');
  if (hasG2Econ && hasG3EconApp) {
    const violation = 'Prohibited Subject Combination 1: Economics in Group II (Code 64) CANNOT be offered with Economic Application in Group III (Code 87).';
    errors.push(violation);
    prohibitedSubjectCombinations.push(violation);
  }

  // Prohibited Rule 2: Commercial Studies in Group II with Commercial Application in Group III
  const hasG2Comm = g2Keys.includes('63');
  const hasG3CommApp = g3Keys.includes('COMM_APP');
  if (hasG2Comm && hasG3CommApp) {
    const violation = 'Prohibited Subject Combination 2: Commercial Studies in Group II (Code 63) CANNOT be offered with Commercial Application in Group III (Code 88).';
    errors.push(violation);
    prohibitedSubjectCombinations.push(violation);
  }

  // Prohibited Rule 3: Environmental Science in Group II with Environmental Application in Group III
  const hasG2Evs = g2Keys.includes('82');
  const hasG3EvsApp = g3Keys.includes('EVS_APP');
  if (hasG2Evs && hasG3EvsApp) {
    const violation = 'Prohibited Subject Combination 3: Environmental Science in Group II (Code 82) CANNOT be offered with Environmental Application in Group III.';
    errors.push(violation);
    prohibitedSubjectCombinations.push(violation);
  }

  // Prohibited Rule 4: Sanskrit as a Second Language in Group I with Sanskrit as a Classical Language in Group II
  const hasSanskritInG1 = secondLangs.some((l) => l.toLowerCase() === 'sanskrit');
  const hasClassicalInG2 = g2Keys.includes('CLASSICAL');
  const classicalIsSanskrit = (plan.group2SpecificClassicalName || '').toLowerCase() === 'sanskrit';
  if (hasSanskritInG1 && hasClassicalInG2 && classicalIsSanskrit) {
    const violation = 'Prohibited Subject Combination 4: Sanskrit as a Second Language in Group I CANNOT be offered with Sanskrit as a Classical Language in Group II (Code 25).';
    errors.push(violation);
    prohibitedSubjectCombinations.push(violation);
  }

  // Prohibited Rule 5: A Modern Foreign Language as Second Language in Group I with a Modern Foreign Language in Group II
  const hasMflInG2 = g2Keys.includes('MFL');
  const g2MflName = (plan.group2SpecificMflName || '').toLowerCase().trim();
  if (hasMflInG2 && g2MflName) {
    const sameMflInG1 = secondLangs.some((l) => l.toLowerCase().trim() === g2MflName);
    if (sameMflInG1) {
      const violation = `Prohibited Subject Combination 5: ${plan.group2SpecificMflName} CANNOT be offered simultaneously as a Second Language in Group I and as a Modern Foreign Language in Group II.`;
      errors.push(violation);
      prohibitedSubjectCombinations.push(violation);
    }
  }

  // 5. Language Selection Restrictions (Third Language vs Second Language)
  if (plan.thirdLanguageStudiedInMiddleSchool) {
    const thirdLangNorm = plan.thirdLanguageStudiedInMiddleSchool.toLowerCase().trim();
    const secondLangMatchesThird = secondLangs.some((l) => l.toLowerCase().trim() === thirdLangNorm);
    if (secondLangMatchesThird) {
      const restriction = `Language Selection Restriction: A candidate who has studied "${plan.thirdLanguageStudiedInMiddleSchool}" as a Third Language from Class V to Class VIII CANNOT offer that same language as a Second Language.`;
      errors.push(restriction);
      languageSelectionRestrictions.push(restriction);
    }
  }

  // 6. Minimum Examination Subjects Requirement (At least 6 subjects)
  const totalExamSubjectsCount = group1Count + group2Count + group3Count;
  if (totalExamSubjectsCount < 6) {
    const err = `Minimum Registered Subjects Requirement: Candidate must enter for at least SIX external examination subjects. Current total: ${totalExamSubjectsCount}.`;
    errors.push(err);
    groupSelectionViolations.push(err);
  }

  // 7. Compulsory Internal Assessment: SUPW & Community Service (Grades A-E; D is lowest pass)
  let supwValid = true;
  if (plan.supwGradeOrStatus === 'E' || plan.supwGradeOrStatus === 'unsatisfied') {
    const err = 'SUPW Certification Requirement: Socially Useful Productive Work and Community Service is evaluated on Grades A to E. Grade E is a failing grade; attaining at least Grade D (lowest passing grade) is mandatory for the award of the ICSE Pass Certificate.';
    errors.push(err);
    courseCompletionViolations.push(err);
    supwValid = false;
  }

  // 8. School-Level Subject Provision Restriction (Chapter II, Section B)
  // The regulation states that a school may not enter candidates for subjects for which the school makes no provision.
  let schoolProvisionValid = true;
  if (plan.schoolApprovedSubjects && plan.schoolApprovedSubjects.length > 0) {
    const approvedSet = new Set(plan.schoolApprovedSubjects);
    const candidateSubjects = [...g2Keys, ...g3Keys];
    for (const sub of candidateSubjects) {
      if (!approvedSet.has(sub)) {
        const err = `School Provision Restriction: The school makes no provision for subject "${sub}".`;
        errors.push(err);
        schoolProvisionViolations.push(err);
        schoolProvisionValid = false;
      }
    }
  }

  // 9. 15 September Subject-Change Cutoff (Chapter II, Section B, clause 3)
  // Clause 3 establishes that a candidate shall not be permitted to change subjects after 15 September of the year in which they were registered in Class IX.
  // Procedural requirements for changes on or before this cutoff are unspecified by Clause 3 (neither blanket authorization nor an unstated prior approval requirement is inferred).
  let registrationCutoffValid = true;
  if (plan.isCouncilRegistered === false) {
    const err = 'Council Registration Requirement: Candidate must be officially registered with the Council for the ICSE examination.';
    errors.push(err);
    registrationCutoffViolations.push(err);
    registrationCutoffValid = false;
  }

  if (plan.subjectChangeDate) {
    const regYear = plan.class9RegistrationYear || 2026;
    const cutoffDate = `${regYear}-09-15`;
    if (plan.subjectChangeDate > cutoffDate) {
      const err = `Subject Change Cutoff Violation: Candidates may not change their subject(s) after 15 September of the year in which they were registered in Class IX (Cutoff: ${cutoffDate}; Attempted: ${plan.subjectChangeDate}).`;
      errors.push(err);
      registrationCutoffViolations.push(err);
      registrationCutoffValid = false;
    }
  }

  // 10. Class IX-to-X Subject Continuity Requirement (Chapter II, Section B)
  // The regulation states that candidates may not opt for a Class X subject for which they were not registered and studied in Class IX.
  let continuityValid = true;
  if (plan.classLevel === 10) {
    if (plan.studiedInClass9 === false) {
      const err = 'Class IX-to-X Continuity Requirement: A candidate entering Class X must have registered for, studied, and completed the course in Class IX at an affiliated school.';
      errors.push(err);
      continuityViolations.push(err);
      continuityValid = false;
    }
    if (plan.class9RegisteredSubjects && plan.class9RegisteredSubjects.length > 0) {
      const cl9Set = new Set(plan.class9RegisteredSubjects);
      const currentSubjects = [...g2Keys, ...g3Keys];
      for (const sub of currentSubjects) {
        if (!cl9Set.has(sub)) {
          const err = `Class IX-to-X Subject Continuity Violation: Candidate may not opt for a Class X subject for which they were not registered and studied in Class IX (Subject "${sub}" was not registered in Class IX).`;
          errors.push(err);
          continuityViolations.push(err);
          continuityValid = false;
        }
      }
    }
  }

  // 11. Practical/Project-Work School Examination Requirements
  let practicalWorkValid = true;
  if (plan.practicalProjectWorkCertified) {
    const cert = plan.practicalProjectWorkCertified;
    if (cert.english === false) {
      const err = 'Practical Work Requirement: Candidate must have been examined by the school in practical/project work in English.';
      errors.push(err);
      practicalWorkViolations.push(err);
      practicalWorkValid = false;
    }
    if (cert.secondLanguage === false) {
      const err = 'Practical Work Requirement: Candidate must have been examined by the school in practical/project work in Second Language.';
      errors.push(err);
      practicalWorkViolations.push(err);
      practicalWorkValid = false;
    }
    if (cert.hcg === false) {
      const err = 'Practical Work Requirement: Candidate must have been examined by the school in practical/project work in History, Civics & Geography.';
      errors.push(err);
      practicalWorkViolations.push(err);
      practicalWorkValid = false;
    }
    if (cert.choiceSubjects === false) {
      const err = 'Practical Work Requirement: Candidate must have been examined by the school in practical/project work in the choice subjects.';
      errors.push(err);
      practicalWorkViolations.push(err);
      practicalWorkValid = false;
    }
    if (cert.supw === false) {
      const err = 'Practical Work Requirement: Candidate must have completed the practical internal evaluation in SUPW and Community Service.';
      errors.push(err);
      practicalWorkViolations.push(err);
      practicalWorkValid = false;
    }
  }

  // 12. Compulsory Course Completion Verification (Chapter II Part I)
  let courseCompletionValid = true;
  if (plan.part1CompletedCourses) {
    const p1 = plan.part1CompletedCourses;
    if (p1.thirdLanguageClass5to8 === false) {
      const err = 'Part I Course Completion: Candidate must have satisfactorily completed a course in a Third Language from Class V to Class VIII.';
      errors.push(err);
      courseCompletionViolations.push(err);
      courseCompletionValid = false;
    }
    if (p1.art === false) {
      const err = 'Part I Course Completion: Candidate must have completed an internal school course in Art.';
      errors.push(err);
      courseCompletionViolations.push(err);
      courseCompletionValid = false;
    }
    if (p1.physicalEducation === false) {
      const err = 'Part I Course Completion: Candidate must have completed an internal school course in Physical Education.';
      errors.push(err);
      courseCompletionViolations.push(err);
      courseCompletionValid = false;
    }
    if (p1.educationInMoralAndSpiritualValues === false) {
      const err = 'Part I Course Completion: Candidate must have completed an internal course in Education in Moral and Spiritual Values.';
      errors.push(err);
      courseCompletionViolations.push(err);
      courseCompletionValid = false;
    }
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
    totalExamSubjectsCount,
    ruleBreakdowns: {
      prohibitedSubjectCombinations,
      groupSelectionViolations,
      languageSelectionRestrictions,
      continuityViolations,
      geographicEligibilityViolations,
      courseCompletionViolations,
      schoolProvisionViolations,
      registrationCutoffViolations,
      practicalWorkViolations,
    },
    details: {
      group1Valid,
      group1Count,
      group2Count,
      group2Valid,
      group3Count,
      group3Valid,
      group3SectionACount: sectionACount,
      group3SectionBCount: sectionBCount,
      supwValid,
      continuityValid,
      courseCompletionValid,
      schoolProvisionValid,
      registrationCutoffValid,
      practicalWorkValid,
    },
  };
}

export interface CisceExaminationEntryAttendanceRecord {
  candidateName: string;
  attendancePercentageYear1: number; // Class IX attendance
  attendancePercentageYear2: number; // Class X attendance
  hasCouncilCondonation?: boolean; // For attendance between 60% and 74.9% (condoned by Chief Executive and Secretary)
  condonationReason?: string; // e.g. 'certified medical grounds', 'illness'
  hasExceptionalCouncilCondonation?: boolean; // For attendance below 60% (condoned in exceptional cases)
  exceptionalCondonationReason?: string; // e.g. 'serious psychological or medical grounds', 'authorised sports/arts participation'
}

export interface CisceExaminationEntryAttendanceResult {
  isEligibleForEntry: boolean;
  attendanceStandardMet: boolean;
  condonationApplied: boolean;
  exceptionalCondonationApplied: boolean;
  reasons: string[];
}

/**
 * Validates examination entry attendance under Chapter I (General Regulations):
 * - First-time candidates ordinarily require at least 75% attendance during EACH YEAR
 *   of the two-year course at an affiliated and registered school.
 * - Condonation: Candidates with attendance between 60% and 74.9% may be condoned
 *   by the Chief Executive and Secretary in specified circumstances (e.g. illness).
 * - Below 60%: May also be condoned in exceptional cases (serious psychological or medical grounds,
 *   authorised participation in recognised State/National/International sports/arts/cultural events,
 *   or other unforeseen or special circumstances).
 * - There is no absolute under-60% statutory prohibition.
 */
export function validateCisceExaminationEntryAttendance(
  record: CisceExaminationEntryAttendanceRecord
): CisceExaminationEntryAttendanceResult {
  const reasons: string[] = [];
  const minAttendance = Math.min(record.attendancePercentageYear1, record.attendancePercentageYear2);
  const attendanceStandardMet = minAttendance >= 75;

  let condonationApplied = false;
  let exceptionalCondonationApplied = false;
  let isEligibleForEntry = false;

  if (attendanceStandardMet) {
    isEligibleForEntry = true;
  } else if (minAttendance >= 60) {
    if (record.hasCouncilCondonation) {
      condonationApplied = true;
      isEligibleForEntry = true;
      reasons.push(`Attendance shortage condoned by the Chief Executive and Secretary on grounds: "${record.condonationReason || 'Illness or special circumstances'}". (Minimum recorded: ${minAttendance}%).`);
    } else {
      isEligibleForEntry = false;
      reasons.push(`Examination Entry Ineligible: Attendance is ${minAttendance}% (below 75% standard). Requires discretionary condonation by the Chief Executive and Secretary for attendance between 60% and 74.9%.`);
    }
  } else {
    // Below 60% attendance
    if (record.hasExceptionalCouncilCondonation) {
      exceptionalCondonationApplied = true;
      isEligibleForEntry = true;
      reasons.push(`Attendance below 60% condoned by the Chief Executive and Secretary under exceptional provisions: "${record.exceptionalCondonationReason || 'Serious medical grounds or authorised sports/arts representation'}". (Minimum recorded: ${minAttendance}%).`);
    } else {
      isEligibleForEntry = false;
      reasons.push(`Examination Entry Ineligible: Attendance is ${minAttendance}% (below 60%). Candidates with attendance below 60% require discretionary condonation by the Chief Executive and Secretary on exceptional serious medical, psychological, or authorised representation grounds.`);
    }
  }

  return {
    isEligibleForEntry,
    attendanceStandardMet,
    condonationApplied,
    exceptionalCondonationApplied,
    reasons,
  };
}

export interface CisceClass9CandidateRecord {
  candidateName: string;
  subjectScores: {
    subjectName: string;
    marksPercentage: number;
    isEnglish: boolean;
  }[];
  attendancePercentage: number;
}

export interface CiscePromotionResult {
  isPromoted: boolean;
  passedSubjectsCount: number;
  passedEnglish: boolean;
  attendanceSatisfied: boolean;
  reasons: string[];
}

/**
 * Validates Class IX promotion against CISCE Year 2028 Regulations (Chapter II):
 * - Conducted internally by schools.
 * - Promotion requires at least 33% marks in FIVE subjects individually, including English, on cumulative average.
 * - Minimum attendance of 75% of working days.
 * - No other criteria shall be used.
 */
export function validateCisceClass9Promotion(record: CisceClass9CandidateRecord): CiscePromotionResult {
  const reasons: string[] = [];
  let passedEnglish = false;
  let passedSubjectsCount = 0;

  for (const s of record.subjectScores) {
    if (s.marksPercentage >= 33) {
      passedSubjectsCount++;
      if (s.isEnglish) passedEnglish = true;
    }
  }

  const attendanceSatisfied = record.attendancePercentage >= 75;

  if (!passedEnglish) {
    reasons.push('Promotion denied: Candidate must secure at least 33% marks in English.');
  }
  if (passedSubjectsCount < 5) {
    reasons.push(`Promotion denied: Candidate must pass at least 5 subjects individually with 33% or more marks. Current passed: ${passedSubjectsCount}.`);
  }
  if (!attendanceSatisfied) {
    reasons.push(`Promotion denied: Minimum attendance of 75% of working days required. Current attendance: ${record.attendancePercentage}%.`);
  }

  const isPromoted = passedEnglish && passedSubjectsCount >= 5 && attendanceSatisfied;

  return {
    isPromoted,
    passedSubjectsCount,
    passedEnglish,
    attendanceSatisfied,
    reasons,
  };
}
