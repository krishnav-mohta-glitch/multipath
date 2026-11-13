/**
 * MULTIPATH V2 — Phase 14 Curriculum Typings
 * Covers ICSE/CISCE and CBSE across Classes 6–10.
 * Strict Scope: ICSE/CISCE and CBSE only. No IB, Cambridge, or State Board.
 */

export type CurriculumBoardCode = 'CBSE' | 'CISCE';

export type ClassLevel = 6 | 7 | 8 | 9 | 10;

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
