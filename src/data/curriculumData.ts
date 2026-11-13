/**
 * MULTIPATH V2 — Phase 14 Curriculum Ledger & Source Provenance
 * 
 * Traceable curriculum mapping repository for CBSE and CISCE across Classes 6–10.
 * Invariant: Every mapping links directly to official board documentation.
 * Strict Scope: CBSE and ICSE/CISCE only. No IB, Cambridge, or State Board.
 */

import type {
  CurriculumBoard,
  CurriculumYear,
  CurriculumSource,
  CurriculumSubject,
} from '../types/curriculum';

export const CURRICULUM_BOARDS: CurriculumBoard[] = [
  {
    code: 'CBSE',
    name: 'CBSE',
    fullName: 'Central Board of Secondary Education',
    country: 'India',
    websiteUrl: 'https://cbseacademic.nic.in/',
    isActive: true,
  },
  {
    code: 'CISCE',
    name: 'ICSE / CISCE',
    fullName: 'Council for the Indian School Certificate Examinations',
    country: 'India',
    websiteUrl: 'https://cisce.org/',
    isActive: true,
  },
];

export const CURRICULUM_YEARS: CurriculumYear[] = [
  {
    id: 'cbse-2026-27',
    boardCode: 'CBSE',
    academicYear: '2026–27',
    targetCohort: 'Secondary & Middle Stage (Classes 6–10)',
    isCurrent: true,
    notes: 'Aligned with National Curriculum Framework for School Education (NCF-SE) 2023 and NEP 2020.',
  },
  {
    id: 'cbse-r3-2026',
    boardCode: 'CBSE',
    academicYear: '2026–27 (R3 Implementation)',
    targetCohort: 'Class 6 Inception Cohort',
    isCurrent: true,
    notes: 'Circular Acad-17/2026: Mandated 3rd language integration and Middle Stage modular learning standards.',
  },
  {
    id: 'cisce-icse-2027',
    boardCode: 'CISCE',
    academicYear: '2027 Examination',
    targetCohort: 'ICSE Class 10 (Cohort entering Class 9 in 2025–26, appearing 2027)',
    isCurrent: true,
    notes: 'Official Regulations and Syllabuses for the ICSE Year 2027 Examination.',
  },
  {
    id: 'cisce-icse-2028',
    boardCode: 'CISCE',
    academicYear: '2028 Examination',
    targetCohort: 'ICSE Class 9 (Entering Class 9 in 2026–27, appearing 2028 Examination)',
    isCurrent: true,
    notes: 'Official Regulations and Syllabuses for the ICSE Year 2028 Examination (Class IX Two-Year Course Year 1).',
  },
  {
    id: 'cisce-icse-2026',
    boardCode: 'CISCE',
    academicYear: '2026 Examination',
    targetCohort: 'ICSE Class 10 (Appearing 2026)',
    isCurrent: false,
    notes: 'Official Regulations and Syllabuses for the ICSE Year 2026 Examination.',
  },
  {
    id: 'cisce-up-2016',
    boardCode: 'CISCE',
    academicYear: 'Upper Primary (2016 Edition)',
    targetCohort: 'Classes 6–8 Upper Primary',
    isCurrent: true,
    notes: 'CISCE Curriculum for Upper Primary Classes (VI–VIII), published November 2016. Maintained as standard middle-stage syllabus.',
  },
];

export const CURRICULUM_SOURCES: CurriculumSource[] = [
  {
    id: 'src-cbse-sec-2027',
    boardCode: 'CBSE',
    title: 'CBSE Secondary Curriculum 2026–27 (Classes IX–X)',
    officialUrl: 'https://cbseacademic.nic.in/curriculum_2027.html',
    documentReference: 'CBSE-ACAD-CURR-2027-SEC',
    publicationDate: '2026-04-01',
    editionOrSession: '2026–27 Academic Session',
    pageOrSection: 'Part-1: Main Subjects (Math 041/241, Science 086, Social Science 087)',
    verificationNotes: 'Official syllabus published on cbseacademic.nic.in portal.',
  },
  {
    id: 'src-cbse-circ-17-2026',
    boardCode: 'CBSE',
    title: 'CBSE Circular No. Acad-17/2026: Guidelines for Third Language (R3) & NCF-SE Middle Stage',
    officialUrl: 'https://cbseacademic.nic.in/web_material/Circulars/2026/17_Circular_2026.pdf',
    documentReference: 'Circular Acad-17/2026',
    publicationDate: '2026-04-09',
    editionOrSession: '2026–27 Session Implementation',
    pageOrSection: 'Pages 1–4',
    verificationNotes: 'Official notification on Class VI curriculum changes under NCF-SE 2023.',
  },
  {
    id: 'src-cbse-mid-ncfse',
    boardCode: 'CBSE',
    title: 'NCF-SE 2023 / CBSE Middle Stage Learning Standards (Classes VI–VIII)',
    officialUrl: 'https://cbseacademic.nic.in/',
    documentReference: 'NCF-SE-2023-MID',
    publicationDate: '2023-08-23',
    editionOrSession: 'Competency Framework',
    pageOrSection: 'Stage 3: Middle Stage (Ages 11–14)',
    verificationNotes: 'Underlying framework for Classes 6 to 8 modular subject domains.',
  },
  {
    id: 'src-cbse-skill-it402',
    boardCode: 'CBSE',
    title: 'CBSE Secondary Skill Subject: Information Technology (Subject Code 402) & AI (Code 417)',
    officialUrl: 'https://cbseacademic.nic.in/skill-education.html',
    documentReference: 'CBSE-SKILL-SEC-402-417',
    publicationDate: '2026-03-15',
    editionOrSession: '2026–27 Academic Session',
    pageOrSection: 'Curriculum Document Code 402/417',
    verificationNotes: 'Elective vocational curriculum for secondary classes.',
  },
  {
    id: 'src-cisce-icse-2027',
    boardCode: 'CISCE',
    title: 'CISCE Regulations and Syllabuses for the Year 2027 Examination',
    officialUrl: 'https://cisce.org/regulations-and-syllabuses-icse-2027/',
    documentReference: 'ICSE-SYLL-2027',
    publicationDate: '2025-11-20',
    editionOrSession: '2027 Examination Year',
    pageOrSection: 'Group I & II Subject Syllabuses (Math 51, Physics 52, Chemistry 53, Biology 54, History 50)',
    verificationNotes: 'Prescribed syllabus for candidates appearing in ICSE Class 10 examination in 2027.',
  },
  {
    id: 'src-cisce-icse-2028',
    boardCode: 'CISCE',
    title: 'CISCE Regulations and Syllabuses for the Year 2028 Examination (Class IX Initial Year)',
    officialUrl: 'https://cisce.org/regulations-and-syllabuses-icse-2028/',
    documentReference: 'ICSE-SYLL-2028',
    publicationDate: '2026-04-01',
    editionOrSession: '2028 Examination Year',
    pageOrSection: 'Group I & II Subject Syllabuses (Two-Year Course 2026–28)',
    verificationNotes: 'Official prescribed syllabus for candidates admitted to Class IX in academic year 2026–27 appearing for the ICSE examination in March 2028.',
  },
  {
    id: 'src-cisce-icse-2026',
    boardCode: 'CISCE',
    title: 'CISCE Regulations and Syllabuses for the Year 2026 Examination',
    officialUrl: 'https://cisce.org/regulations-and-syllabuses-icse-2026/',
    documentReference: 'ICSE-SYLL-2026',
    publicationDate: '2024-11-15',
    editionOrSession: '2026 Examination Year',
    pageOrSection: 'Group II Science & Mathematics',
    verificationNotes: 'Official syllabus for candidates appearing in 2026.',
  },
  {
    id: 'src-cisce-up-2016',
    boardCode: 'CISCE',
    title: 'CISCE Curriculum for Upper Primary Classes (Classes VI–VIII)',
    officialUrl: 'https://www.cisce.org/wp-content/uploads/2022/10/UpperPrimary.pdf',
    documentReference: 'CISCE-UP-2016-ED',
    publicationDate: '2016-11-01',
    editionOrSession: '2016 Edition Framework',
    pageOrSection: 'Pages 12–88 (Science, Mathematics, Social Studies, Computer Studies)',
    verificationNotes: 'Active upper primary curriculum framework for affiliated ICSE schools.',
  },
];

export const CURRICULUM_SUBJECTS: CurriculumSubject[] = [
  // CBSE Subjects
  { id: 'cbse-math-6', boardCode: 'CBSE', classLevel: 6, subjectCode: '041-M', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-math-7', boardCode: 'CBSE', classLevel: 7, subjectCode: '041-M', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-math-8', boardCode: 'CBSE', classLevel: 8, subjectCode: '041-M', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-math-9', boardCode: 'CBSE', classLevel: 9, subjectCode: '041', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-math-10', boardCode: 'CBSE', classLevel: 10, subjectCode: '041', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  
  { id: 'cbse-sci-6', boardCode: 'CBSE', classLevel: 6, subjectCode: '086-M', subjectName: 'Science', subjectCategory: 'science', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-sci-7', boardCode: 'CBSE', classLevel: 7, subjectCode: '086-M', subjectName: 'Science', subjectCategory: 'science', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-sci-8', boardCode: 'CBSE', classLevel: 8, subjectCode: '086-M', subjectName: 'Science', subjectCategory: 'science', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-sci-9', boardCode: 'CBSE', classLevel: 9, subjectCode: '086', subjectName: 'Science', subjectCategory: 'science', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-sci-10', boardCode: 'CBSE', classLevel: 10, subjectCode: '086', subjectName: 'Science', subjectCategory: 'science', isIntegrated: true, isCompulsory: true },

  { id: 'cbse-soc-6', boardCode: 'CBSE', classLevel: 6, subjectCode: '087-M', subjectName: 'Social Science', subjectCategory: 'social_sciences', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-soc-7', boardCode: 'CBSE', classLevel: 7, subjectCode: '087-M', subjectName: 'Social Science', subjectCategory: 'social_sciences', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-soc-8', boardCode: 'CBSE', classLevel: 8, subjectCode: '087-M', subjectName: 'Social Science', subjectCategory: 'social_sciences', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-soc-9', boardCode: 'CBSE', classLevel: 9, subjectCode: '087', subjectName: 'Social Science', subjectCategory: 'social_sciences', isIntegrated: true, isCompulsory: true },
  { id: 'cbse-soc-10', boardCode: 'CBSE', classLevel: 10, subjectCode: '087', subjectName: 'Social Science', subjectCategory: 'social_sciences', isIntegrated: true, isCompulsory: true },

  { id: 'cbse-eng-9', boardCode: 'CBSE', classLevel: 9, subjectCode: '184', subjectName: 'English Language & Literature', subjectCategory: 'languages', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-eng-10', boardCode: 'CBSE', classLevel: 10, subjectCode: '184', subjectName: 'English Language & Literature', subjectCategory: 'languages', isIntegrated: false, isCompulsory: true },
  { id: 'cbse-it-8', boardCode: 'CBSE', classLevel: 8, subjectCode: '402-M', subjectName: 'Information Technology & Computational Thinking', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },
  { id: 'cbse-it-10', boardCode: 'CBSE', classLevel: 10, subjectCode: '402', subjectName: 'Information Technology', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },

  // CISCE Subjects (Physics, Chemistry, Biology distinct)
  { id: 'cisce-math-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'MAT-UP', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-math-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'MAT-UP', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-math-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'MAT-UP', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-math-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '51', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-math-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '51', subjectName: 'Mathematics', subjectCategory: 'mathematics', isIntegrated: false, isCompulsory: true },

  { id: 'cisce-phys-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'PHY-UP', subjectName: 'Physics', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-phys-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'PHY-UP', subjectName: 'Physics', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-phys-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'PHY-UP', subjectName: 'Physics', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-phys-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '52', subjectName: 'Physics (Science Paper 1)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-phys-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '52', subjectName: 'Physics (Science Paper 1)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },

  { id: 'cisce-chem-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'CHM-UP', subjectName: 'Chemistry', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-chem-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'CHM-UP', subjectName: 'Chemistry', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-chem-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'CHM-UP', subjectName: 'Chemistry', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-chem-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '53', subjectName: 'Chemistry (Science Paper 2)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-chem-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '53', subjectName: 'Chemistry (Science Paper 2)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },

  { id: 'cisce-bio-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'BIO-UP', subjectName: 'Biology', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-bio-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'BIO-UP', subjectName: 'Biology', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-bio-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'BIO-UP', subjectName: 'Biology', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-bio-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '54', subjectName: 'Biology (Science Paper 3)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-bio-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '54', subjectName: 'Biology (Science Paper 3)', subjectCategory: 'science', isIntegrated: false, isCompulsory: true },

  { id: 'cisce-hist-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'HIS-UP', subjectName: 'History & Civics', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-geo-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'GEO-UP', subjectName: 'Geography', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-cs-6', boardCode: 'CISCE', classLevel: 6, subjectCode: 'CS-UP', subjectName: 'Computer Studies', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },

  { id: 'cisce-hist-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'HIS-UP', subjectName: 'History & Civics', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-geo-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'GEO-UP', subjectName: 'Geography', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-cs-7', boardCode: 'CISCE', classLevel: 7, subjectCode: 'CS-UP', subjectName: 'Computer Studies', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },

  { id: 'cisce-hist-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'HIS-UP', subjectName: 'History & Civics', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-geo-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'GEO-UP', subjectName: 'Geography', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-cs-8', boardCode: 'CISCE', classLevel: 8, subjectCode: 'CS-UP', subjectName: 'Computer Studies', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },

  { id: 'cisce-hist-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '50-H', subjectName: 'History & Civics', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-hist-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '50-H', subjectName: 'History & Civics', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-geo-9', boardCode: 'CISCE', classLevel: 9, subjectCode: '50-G', subjectName: 'Geography', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-geo-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '50-G', subjectName: 'Geography', subjectCategory: 'social_sciences', isIntegrated: false, isCompulsory: true },

  { id: 'cisce-eng-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '01', subjectName: 'English Language', subjectCategory: 'languages', isIntegrated: false, isCompulsory: true },
  { id: 'cisce-ca-10', boardCode: 'CISCE', classLevel: 10, subjectCode: '86', subjectName: 'Computer Applications', subjectCategory: 'computing_tech', isIntegrated: false, isCompulsory: false },
];
