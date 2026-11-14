import { TOPICS } from '../data/topics';
import { isTopicInCurriculum, getMappingsForTopic, getPrimaryMappingForTopic } from '../data/curriculumMappings';
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
