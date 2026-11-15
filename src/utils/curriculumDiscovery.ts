import { TOPICS } from '../data/topics';
import { isTopicInCurriculum, getMappingsForTopic, getPrimaryMappingForTopic } from '../data/curriculumMappings';
import { CURRICULUM_SUBJECT_MATRIX, type SubjectMatrixRow } from '../data/curriculumData';
import type { Topic, DifficultyLevel } from '../types/topic';
import type { CurriculumBoardCode, ClassLevel } from '../types/curriculum';
import type { SubjectId } from '../types/subject';

export type CuratedCollectionId = 'all' | 'interactive-sims' | 'foundational' | 'high-yield-exam' | 'cross-disciplinary';

export type TopicSortOption = 'default' | 'duration-asc' | 'duration-desc' | 'alphabetical' | 'difficulty';

export interface CurriculumFilterOptions {
  board?: CurriculumBoardCode | 'all';
  classLevel?: ClassLevel | 'all';
  subjectId?: SubjectId | 'all';
  difficulty?: DifficultyLevel | 'all';
  searchQuery?: string;
  collectionId?: CuratedCollectionId;
  sortBy?: TopicSortOption;
}

export interface CuratedCollectionMeta {
  id: CuratedCollectionId;
  title: string;
  shortTitle: string;
  description: string;
  badge: string;
  iconName: string;
}

export const CURATED_COLLECTIONS: CuratedCollectionMeta[] = [
  {
    id: 'all',
    title: 'Complete Curriculum Library',
    shortTitle: 'All Topics',
    description: 'All 64 foundational, intermediate, and advanced curriculum topics across 8 disciplines.',
    badge: 'Comprehensive',
    iconName: 'Grid',
  },
  {
    id: 'interactive-sims',
    title: 'Interactive 3D Simulation Labs',
    shortTitle: 'Interactive Labs',
    description: 'Topics featuring interactive scientific models, virtual apparatus, and 3D exploratory canvases.',
    badge: '3D Simulation',
    iconName: 'Box',
  },
  {
    id: 'foundational',
    title: 'Core Conceptual Foundations',
    shortTitle: 'Foundations',
    description: 'Essential introductory concepts building mental models for higher grade levels.',
    badge: 'Foundational',
    iconName: 'Compass',
  },
  {
    id: 'high-yield-exam',
    title: 'High-Yield Board Syllabus Units',
    shortTitle: 'High Yield',
    description: 'Topics rigorously verified against official CBSE and CISCE board exam specifications.',
    badge: 'Official Verified',
    iconName: 'CheckCircle2',
  },
  {
    id: 'cross-disciplinary',
    title: 'Cross-Disciplinary & Applied Science',
    shortTitle: 'Applied Science',
    description: 'Topics connecting mathematics, physics, biology, and chemistry to real-world technology.',
    badge: 'Applied',
    iconName: 'Cpu',
  },
];

export const INTERACTIVE_TOPIC_IDS = new Set([
  'math-linear-equations',
  'bio-photosynthesis',
  'hist-french-revolution',
  'eng-understanding-metaphors',
  'cs-binary-search',
  'phys-newtons-laws',
  'chem-periodic-table',
  'geo-plate-tectonics',
  'math-pythagoras-triangles',
  'phys-light-reflection',
  'phys-light-refraction-lenses',
  'chem-acids-bases-salts',
  'bio-cell-unit-of-life',
]);

const TOPIC_ALIASES: Record<string, string[]> = {
  'math-linear-equations': ['linear equations', 'algebra', 'balance', 'variables', 'coefficients', 'equations', 'slope'],
  'bio-photosynthesis': ['photosynthesis', 'chlorophyll', 'light reaction', 'calvin cycle', 'plants', 'autotrophs', 'chloroplast'],
  'phys-newtons-laws': ['newton', 'mechanics', 'force', 'acceleration', 'inertia', 'motion', 'friction', 'gravity'],
  'chem-periodic-table': ['elements', 'atomic number', 'mendeleev', 'periodic table', 'groups', 'periods', 'valence'],
  'math-pythagoras-triangles': ['pythagoras', 'right triangle', 'hypotenuse', 'geometry', 'triangles'],
  'phys-light-reflection': ['light', 'optics', 'mirrors', 'reflection', 'focal length', 'spherical mirror'],
  'phys-light-refraction-lenses': ['refraction', 'lenses', 'snell law', 'refractive index', 'prisms'],
  'chem-acids-bases-salts': ['ph scale', 'acids', 'bases', 'neutralization', 'litmus', 'alkali', 'salts'],
  'bio-cell-unit-of-life': ['mitochondria', 'nucleus', 'organelles', 'cytoplasm', 'plant cell', 'animal cell', 'membrane'],
  'hist-french-revolution': ['france', 'bastille', 'liberty', 'revolution', 'estates', 'louis xvi'],
  'eng-understanding-metaphors': ['figurative language', 'allegory', 'metaphor', 'simile', 'literature', 'symbolism'],
  'cs-binary-search': ['binary search', 'algorithms', 'divide and conquer', 'search complexity', 'time complexity'],
  'cs-computational-thinking-algorithms': ['algorithm', 'logic', 'flowchart', 'coding', 'pseudocode', 'computer science'],
};

/**
 * Normalizes text for search by lowercasing, stripping extra whitespace and punctuation.
 */
export function normalizeSearchString(str: string): string {
  return str.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Checks if a topic matches a search query using multi-field matching with aliases.
 */
export function matchesSearchQuery(topic: Topic, rawQuery: string): boolean {
  const query = normalizeSearchString(rawQuery);
  if (!query) return true;

  const searchTokens = query.split(' ').filter(Boolean);
  if (searchTokens.length === 0) return true;

  // Build searchable corpus for this topic
  const searchableCorpusParts: string[] = [
    topic.title,
    topic.subtitle,
    topic.overview,
    topic.subjectId,
    topic.difficulty,
    ...topic.keyTerms.map((t) => `${t.term} ${t.definition}`),
    ...topic.coreQuestions,
  ];

  // Include curriculum mapping metadata (unit name, chapter, subject name)
  const mappings = getMappingsForTopic(topic.id);
  for (const m of mappings) {
    searchableCorpusParts.push(m.unitName);
    searchableCorpusParts.push(m.chapterOrTopic);
    searchableCorpusParts.push(m.subjectName);
    if (m.pageOrSection) searchableCorpusParts.push(m.pageOrSection);
    searchableCorpusParts.push(`${m.boardCode} class ${m.classLevel}`);
  }

  // Include domain aliases
  const aliases = TOPIC_ALIASES[topic.id];
  if (aliases) {
    searchableCorpusParts.push(...aliases);
  }

  const normalizedCorpus = normalizeSearchString(searchableCorpusParts.join(' '));

  // Every token in the search query must appear in the corpus (AND semantics for precision)
  return searchTokens.every((token) => normalizedCorpus.includes(token));
}

/**
 * Filters and sorts curriculum topics based on multiple dimensions.
 */
export function filterCurriculumTopics(
  topics: Topic[] = TOPICS,
  options: CurriculumFilterOptions = {}
): Topic[] {
  const {
    board = 'all',
    classLevel = 'all',
    subjectId = 'all',
    difficulty = 'all',
    searchQuery = '',
    collectionId = 'all',
    sortBy = 'default',
  } = options;

  let results = topics.filter((topic) => {
    // 1. Board & Class curriculum alignment
    if (!isTopicInCurriculum(topic.id, board, classLevel)) {
      return false;
    }

    // 2. Discipline / Subject Filter
    if (subjectId !== 'all' && topic.subjectId !== subjectId) {
      return false;
    }

    // 3. Difficulty Level Filter
    if (difficulty !== 'all' && topic.difficulty !== difficulty) {
      return false;
    }

    // 4. Curated Collection Filter
    if (collectionId === 'interactive-sims' && !INTERACTIVE_TOPIC_IDS.has(topic.id)) {
      return false;
    }
    if (collectionId === 'foundational' && topic.difficulty !== 'Foundational') {
      return false;
    }
    if (collectionId === 'high-yield-exam') {
      const mappings = getMappingsForTopic(topic.id);
      const isOfficial = mappings.some((m) => m.verificationStatus === 'verified_official');
      if (!isOfficial) return false;
    }
    if (collectionId === 'cross-disciplinary') {
      const isCross = [
        'math-linear-equations',
        'bio-photosynthesis',
        'phys-newtons-laws',
        'chem-periodic-table',
        'cs-binary-search',
        'cs-computational-thinking-algorithms',
      ].includes(topic.id);
      if (!isCross && topic.difficulty !== 'Intermediate') return false;
    }

    // 5. Search query matching
    if (searchQuery.trim() && !matchesSearchQuery(topic, searchQuery)) {
      return false;
    }

    return true;
  });

  // Apply sorting
  if (sortBy === 'duration-asc') {
    results = [...results].sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);
  } else if (sortBy === 'duration-desc') {
    results = [...results].sort((a, b) => b.estimatedMinutes - a.estimatedMinutes);
  } else if (sortBy === 'alphabetical') {
    results = [...results].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'difficulty') {
    const diffOrder: Record<DifficultyLevel, number> = {
      Foundational: 1,
      Intermediate: 2,
      Advanced: 3,
    };
    results = [...results].sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
  }

  return results;
}

/**
 * Derives accurate dynamic topic counts for each subject based on active board/class filters.
 */
export function calculateDynamicSubjectCounts(
  board: CurriculumBoardCode | 'all',
  classLevel: ClassLevel | 'all',
  topics: Topic[] = TOPICS
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const topic of topics) {
    if (isTopicInCurriculum(topic.id, board, classLevel)) {
      counts[topic.subjectId] = (counts[topic.subjectId] || 0) + 1;
    }
  }

  return counts;
}

/**
 * Returns summary statistics for the discovery header and telemetry HUD.
 */
export function getCurriculumStats(
  filteredTopics: Topic[],
  board: CurriculumBoardCode | 'all',
  classLevel: ClassLevel | 'all'
) {
  const totalInFilter = filteredTopics.length;
  const interactiveCount = filteredTopics.filter((t) => INTERACTIVE_TOPIC_IDS.has(t.id)).length;
  const officialVerifiedCount = filteredTopics.filter((t) => {
    const primary = getPrimaryMappingForTopic(
      t.id,
      board !== 'all' ? board : undefined,
      classLevel !== 'all' ? classLevel : undefined
    );
    return primary?.verificationStatus === 'verified_official';
  }).length;

  return {
    totalInFilter,
    interactiveCount,
    officialVerifiedCount,
  };
}

/**
 * Returns the verified curriculum subjects applicable to the selected board and class level.
 * Filters out subjects that do not exist for that specific board and grade.
 */
export function getApplicableCurriculumSubjects(
  board: CurriculumBoardCode | 'all',
  classLevel: ClassLevel | 'all'
): SubjectMatrixRow[] {
  return CURRICULUM_SUBJECT_MATRIX.filter((s) => {
    if (board !== 'all' && s.board !== board) return false;
    if (classLevel !== 'all' && s.classLevel !== classLevel) return false;
    return true;
  });
}

export interface CbseClass10SelectionInput {
  language1Code: string;
  language2Code: string;
  subject6SkillCode?: string;
  subject7ElectiveCode?: string;
}

export interface CbseClass10SelectionResult {
  isValid: boolean;
  errors: string[];
  selectedSubjectCodes: string[];
  subject6Details?: {
    code: string;
    group: 'Group S';
    title: string;
    isSupported: boolean;
    coverageStatus: 'directly_mapped' | 'supplementary_framework';
  };
  subject7Details?: {
    code: string;
    group: 'Group A2' | 'Group L';
    title: string;
    isSupported: boolean;
    coverageStatus: 'directly_mapped' | 'supplementary_framework';
  };
}

/**
 * Validates CBSE Class X statutory Subject 6 (Group S) and Subject 7 (Group A2 / Group L) selection rules.
 * Controlling Sources:
 * - Official CBSE Scheme of Studies: https://skilleducation.cbseit.in/scheme-of-studies-x.html
 * - CBSE Secondary Curriculum 2026–27: https://cbseacademic.nic.in/curriculum_2027.html
 * Enforces:
 * 1. Subject 6 accepts eligible Group S Skill Subjects (Codes 401–422) ONLY.
 * 2. Subject 7 accepts eligible Group L Languages or Group A2 Academic Electives ONLY.
 * 3. Subject 7 strictly REJECTS every Group S Skill Subject code (401–422).
 * 4. A previously selected subject code (including Language 1, Language 2, or Group A1 core) cannot be re-selected.
 * 5. Compulsory Group A1 core subjects (041, 086, 087) are rejected as optional alternatives.
 * 6. Eligible Group A2 profiles (e.g. Computer Applications 165) and Group L languages are supported.
 * 7. Accurately reports coverageStatus (directly_mapped vs supplementary_framework) to prevent misrepresenting unauthored electives.
 */
export function validateCbseClass10SubjectSelection(
  input: CbseClass10SelectionInput
): CbseClass10SelectionResult {
  const errors: string[] = [];
  const compulsoryCoreCodes = ['041', '086', '087']; // Compulsory Math, Science, Social Science (Group A1)
  const selectedCodes = [...compulsoryCoreCodes];

  // Validate Compulsory Languages 1 & 2
  if (!input.language1Code || !input.language2Code) {
    errors.push('Compulsory Languages 1 and 2 must both be selected from Group L.');
  } else if (input.language1Code === input.language2Code) {
    errors.push('Language 1 and Language 2 must be distinct language courses.');
  } else {
    selectedCodes.push(input.language1Code, input.language2Code);
  }

  // Validate Subject 6 (Strictly Group S Skill Subject: Codes 401–422)
  let subject6Details: CbseClass10SelectionResult['subject6Details'];
  if (input.subject6SkillCode) {
    const codeStr = input.subject6SkillCode.trim();
    // Strict non-permissive code format check (exactly 3 digits, no malformed trailing characters)
    const isStrictThreeDigits = /^\d{3}$/.test(codeStr);
    const codeNum = isStrictThreeDigits ? parseInt(codeStr, 10) : NaN;
    if (isNaN(codeNum) || codeNum < 401 || codeNum > 422) {
      errors.push(`Subject 6 must be an eligible Skill Subject from Group S (Codes 401–422). Received: ${input.subject6SkillCode}`);
    } else if (selectedCodes.includes(codeStr)) {
      errors.push(`Subject 6 code ${codeStr} has already been selected.`);
    } else {
      selectedCodes.push(codeStr);
      const isDirect = codeStr === '402'; // IT 402 is directly mapped with interactive labs
      const title = codeStr === '402' ? 'Information Technology' :
                    codeStr === '417' ? 'Artificial Intelligence' :
                    codeStr === '415' ? 'Multi-Media' : `Skill Subject ${codeStr}`;
      subject6Details = {
        code: codeStr,
        group: 'Group S',
        title,
        isSupported: isDirect || codeStr === '417',
        coverageStatus: isDirect ? 'directly_mapped' : 'supplementary_framework',
      };
    }
  }

  // Validate Subject 7 (Strictly Group L Language or Group A2 Academic Elective — Group S is FORBIDDEN)
  let subject7Details: CbseClass10SelectionResult['subject7Details'];
  if (input.subject7ElectiveCode) {
    const codeStr = input.subject7ElectiveCode.trim();
    // Strict non-permissive code format check (reject malformed strings like "402abc", negative numbers, etc.)
    const isStrictThreeDigits = /^\d{3}$/.test(codeStr);
    const codeNum = isStrictThreeDigits ? parseInt(codeStr, 10) : NaN;

    // Rule 1: Reject malformed non-3-digit codes immediately
    if (!isStrictThreeDigits) {
      errors.push(`Subject 7 code "${input.subject7ElectiveCode}" is malformed. Subject codes must be exact 3-digit numeric strings.`);
    }
    // Rule 2: Group S Skill Subjects are strictly forbidden under Subject 7
    else if (!isNaN(codeNum) && codeNum >= 401 && codeNum <= 422) {
      errors.push(`Subject 7 cannot be a Skill Subject from Group S (received Code ${codeStr}). Under the official CBSE Scheme of Studies (skilleducation.cbseit.in/scheme-of-studies-x.html), Group S subjects are eligible exclusively under Subject 6, while Subject 7 is reserved for Group L (Language 3) or Group A2 (Academic Elective).`);
    }
    // Rule 3: Cannot repeat compulsory Group A1 core subjects
    else if (compulsoryCoreCodes.includes(codeStr)) {
      errors.push(`Subject 7 cannot be a compulsory Group A1 core subject (Code ${codeStr}). Group A1 subjects are compulsory and cannot be re-selected as optional electives.`);
    }
    // Rule 4: Cannot repeat Language 1 or Language 2
    else if (codeStr === input.language1Code || codeStr === input.language2Code) {
      errors.push(`Subject 7 code ${codeStr} repeats Language 1 or Language 2. Subject 7 must be a distinct language offering.`);
    }
    // Rule 5: Cannot repeat any other already selected code
    else if (selectedCodes.includes(codeStr)) {
      errors.push(`Subject 7 code ${codeStr} has already been selected in this curriculum combination.`);
    }
    // Rule 6: Positive Eligibility — Group A2 Academic Electives (exact authoritative list)
    else if (['165', '049', '064', '076', '154', '254', '031', '032', '033', '034', '035', '036'].includes(codeStr)) {
      selectedCodes.push(codeStr);
      const isDirect = codeStr === '165'; // Computer Applications 165 has interactive binary search / algorithms
      const titleMap: Record<string, string> = {
        '165': 'Computer Applications',
        '049': 'Painting',
        '064': 'Home Science',
        '076': 'National Cadet Corps (NCC)',
        '154': 'Elements of Business',
        '254': 'Elements of Book Keeping',
      };
      subject7Details = {
        code: codeStr,
        group: 'Group A2',
        title: titleMap[codeStr] || `Music Elective ${codeStr}`,
        isSupported: isDirect,
        coverageStatus: isDirect ? 'directly_mapped' : 'supplementary_framework',
      };
    }
    // Rule 7: Positive Eligibility — Group L Language Electives (exact authoritative list)
    else {
      // Recognized CBSE Class X language codes from official portal collapse22
      const recognizedGroupLCodes = [
        '184', '101', '002', '085', '122', '119', '021', '088',
        '016', '014', '099', '005', '095', '092', '018', '020', '010', '132',
        '094', '015', '097', '135', '026', '025', '012', '011', '009', '098',
        '024', '013', '023', '004', '131', '008', '096', '134', '133', '006',
        '093', '007', '089', '017', '136', '003', '303'
      ];
      if (recognizedGroupLCodes.includes(codeStr)) {
        selectedCodes.push(codeStr);
        const titleMap: Record<string, string> = {
          '122': 'Sanskrit',
          '119': 'Sanskrit Communicative',
          '021': 'Russian',
          '088': 'Bhoti',
          '184': 'English Language & Literature',
          '101': 'English Communicative',
          '002': 'Hindi Course A',
          '085': 'Hindi Course B',
          '018': 'French',
          '020': 'German',
        };
        subject7Details = {
          code: codeStr,
          group: 'Group L',
          title: titleMap[codeStr] || `Language Elective ${codeStr}`,
          isSupported: ['184', '101', '002', '085', '122', '119', '021', '088'].includes(codeStr),
          coverageStatus: codeStr === '184' ? 'directly_mapped' : 'supplementary_framework',
        };
      } else {
        // Rule 8: Reject arbitrary unknown or non-eligible subject codes
        errors.push(`Subject 7 code ${codeStr} is not recognized as an eligible Group L Language or Group A2 Academic Elective offering.`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    selectedSubjectCodes: selectedCodes,
    subject6Details,
    subject7Details,
  };
}
