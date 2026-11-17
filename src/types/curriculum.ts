/**
 * MULTIPATH V2 — Phase 14 Curriculum Typings
 * Covers ICSE/CISCE and CBSE across Classes 6–10.
 * Strict Scope: ICSE/CISCE and CBSE only. No IB, Cambridge, or State Board.
 */

export type CurriculumBoardCode = 'CBSE' | 'CISCE';

export type ClassLevel = 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type VerificationStatus =
  | 'verified_official'
  | 'framework_supported'
  | 'school_dependent'
  | 'pending_verification';

export type CurriculumSubjectCategory =
  | 'mathematics'
  | 'science'
  | 'social_sciences'
  | 'languages'
  | 'computing_tech';

export interface CurriculumBoard {
  code: CurriculumBoardCode;
  name: string;
  fullName: string;
  country: string;
  websiteUrl: string;
  isActive: boolean;
}

export interface CurriculumYear {
  id: string;
  boardCode: CurriculumBoardCode;
  academicYear: string;
  targetCohort: string;
  isCurrent: boolean;
  notes?: string;
}

export interface CurriculumSource {
  id: string;
  boardCode: CurriculumBoardCode;
  title: string;
  officialUrl: string;
  documentReference: string;
  publicationDate: string;
  editionOrSession: string;
  pageOrSection?: string;
  verificationNotes?: string;
}

export interface CurriculumSubject {
  id: string;
  boardCode: CurriculumBoardCode;
  classLevel: ClassLevel;
  subjectCode?: string;
  subjectName: string;
  subjectCategory: CurriculumSubjectCategory;
  isIntegrated: boolean;
  isCompulsory: boolean;
}

export type SubjectOfferingType =
  | 'compulsory_core'
  | 'compulsory_language'
  | 'compulsory_curricular_area'
  | 'mandatory_vocational'
  | 'compulsory_vocational_pathway'
  | 'co_scholastic_internal'
  | 'foundation_curriculum'
  | 'group_2_elective'
  | 'group_3_elective'
  | 'academic_elective'
  | 'skill_elective'
  | 'language_elective'
  | 'framework_curriculum'
  | 'skill_module';

export type StatutoryExaminationType =
  | 'external_board_examination'
  | 'school_based_internal_assessment'
  | 'curricular_module'
  | 'statutory_framework';

export interface OfficialCurriculumSubjectEntry {
  id: string;
  board: CurriculumBoardCode;
  classLevel: ClassLevel;
  academicYearOrCohort: string;
  applicableCohort?: 'cohort_a_2026_27' | 'general_cohort' | 'subsequent_cohorts';
  officialCurricularArea: string;
  officialSubjectName: string;
  officialSubjectCode: string | null;
  componentsOrPapers?: string[];
  offeringType: SubjectOfferingType;
  compulsoryStatus?: 'compulsory' | 'elective' | 'optional_pathway';
  examinationType?: StatutoryExaminationType;
  selectionRules?: string;
  permissiblePathways?: string[];
  curriculumSource: string;
  sourceDocumentReference: string;
  sourceUrl?: string;
  sourcePageOrSection: string;
  coverageStatus: 'directly_mapped' | 'supplementary_framework';
  mappedInternalDisciplines: string[];
  notes: string;
}

export interface CurriculumTopicMapping {
  id: string;
  topicId: string;
  boardCode: CurriculumBoardCode;
  classLevel: ClassLevel;
  subjectId: string;
  subjectName: string;
  unitName: string;
  chapterOrTopic: string;
  curriculumYearId: string;
  sourceId: string;
  pageOrSection?: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
}

export interface TopicCatalogFilter {
  board?: CurriculumBoardCode | 'all';
  classLevel?: ClassLevel | 'all';
  subjectCategory?: CurriculumSubjectCategory | 'all';
  difficulty?: 'Foundational' | 'Intermediate' | 'Advanced' | 'all';
  searchQuery?: string;
}
