# MULTIPATH V3: Final Statutory Curriculum Reconciliation & Cohort-Complete Assessment Audit

**Workspace**: `D:\Projects\Multipath`  
**Branch**: `main`  
**Reported HEAD**: `098e18d`  
**Ledger Version**: `4.3.0`  
**Statutory Framework Audit Date**: November 15, 2026  
**Evaluation Standard**: Primary source provenance verification against governing circulars, regulations, and official curriculum frameworks (CBSE Circulars Acad-33/2026 and Acad-70/2026, NCF-SE 2023, CISCE Year 2028 Regulations, and Upper Primary Framework 2016).

---

## 1. Executive Summary & Resolution of Statutory Uncertainties

Every subject code, Upper Primary baseline figure, selection-rule constraint, and internal assessment entry has been audited against controlling primary source documents, codified into the data layer, and validated through **299 automated test assertions across 12 test suites** with zero failures:

1. **CISCE Subject-Code Provenance & Discrepancy Resolution**:
   - The list serials 1–32 in Chapter II Part II of the Year 2028 Regulations booklet (`1.-Regulations.pdf`, pp. 5–6) are sequential list serials, **not** official numeric examination codes.
   - **English**: Audited as **Subject Code 01** consisting of two compulsory papers: Paper 1 (English Language) and Paper 2 (Literature in English). There is no independent Subject 02.
   - **Art**: Subject Code **60** is verified from the separate *ICSE Regulations and Syllabuses, Art Subject Syllabus* (pp. 197–210), confirmed in Section A.
   - **Environmental Science**: Subject Code **82** is verified under Group II from the *ICSE Regulations and Syllabuses, 2028 — ENVIRONMENTAL SCIENCE (82)* (`17.-Environmental-Science.pdf`, URL: `https://cisce.org/wp-content/uploads/2026/01/17.-Environmental-Science.pdf`, published January 2026). The document cover explicitly identifies **Environmental Science (82), Examination Year 2028**. It explicitly mandates that candidates offering Environmental Applications in Group III cannot offer Environmental Science in Group II. Code 82 is verified directly from this booklet; Code 58 was an earlier draft misattribution and not an official prior code.
   - **Environmental Application**: Numeric code is **null** (labeled `unverified_for_2028_null`), as no published 2028 syllabus establishes Code 85. The mutual-exclusion rule is enforced using stable internal subject IDs (`CISCE_GROUP_II_SUBJECTS['82']` vs `CISCE_GROUP_III_SECTION_A_SUBJECTS['EVS_APP']`) so it does not depend on an unverified numeric code.
   - **Verified Language Codes in Group I & II**: Bengali is **03**, Gujarati is **04**, Hindi is **05**, Sanskrit (Second Language, Group I) is **19**, Sanskrit (Classical Language, Group II) is **25**.
   - **Unverified Year 2028 Codes Set Strictly to `null`**:
     * **Performing Arts**: Table serial 15; numeric code unverified in published 2028 booklets -> `null`.
     * **Technical Drawing Applications**: Table serial 21; historical code 65 applied to "Technical Drawing"; "Technical Drawing Applications" has no verified numeric code for Year 2028 -> `null`.
     * **Mass Media & Communication**: Table serial 23; draft code 90 unverified in 2028 publications -> `null`.
     * **Hospitality Management**: Table serial 24; draft code 93 unverified in 2028 publications -> `null`.
     * **Section B Vocational Subjects (8 Offerings)**: Table serials 25–32; no numeric examination codes exist in regulations -> `null`.
     * **SUPW & Community Service**: Evaluated internally on Grades A–E; no numeric examination code -> `null`.

2. **CISCE Upper Primary Curriculum Baseline**:
   - The controlling document is *Curriculum for Upper Primary Classes (VI–VIII), First Edition, November 2016* (hosted at `https://www.cisce.org/wp-content/uploads/2022/10/UpperPrimary.pdf`).
   - The document establishes **7 distinct subject areas** (English, Second Language, Mathematics, Science [Physics, Chemistry, Biology], History/Civics & Geography, Computer Studies, Arts Education) and **4 additional curricular areas** (Third Language Classes V–VIII, Physical Education / Yoga, Moral and Spiritual Values, SUPW).
   - Reconciled 9-offering count strictly via **Method A (Valid Disciplinary Disaggregation)** ($1+1+1+3+1+1+1 = 9$ records per grade, 27 total across Classes 6–8). Method B invalid double-counting discarded.

3. **CBSE Circular Acad-70/2026 Official Title & Scope**:
   - Official circular index title on `https://cbseacademic.nic.in/circulars.html`: **Scheme of Studies for Class IX 2026-27 – reg.**
   - Interior document PDF heading: `Scheme of Studies for Secondary Stage for the Session 2026-27`.
   - Publication date: **29 October 2026**.

4. **15 September Subject-Change Interpretation & Boundary Enforcement**:
   - Controlling provision: Chapter II, Section B, clause 3 of Year 2028 ICSE Regulations.
   - Enforced strictly against the candidate's Class IX registration year (`${class9RegistrationYear}-09-15`).
   - Changes after the cutoff are prohibited.
   - Procedural requirements for changes on or before the cutoff date are modeled as unspecified by Clause 3 (no blanket pre-cutoff authorization without approval, no invented prior Council-approval requirement).
   - Boundary tests verify 14 September (valid), 15 September (valid), 16 September (invalid), and subsequent Class X dates (invalid).

5. **Attendance Condonation Authority**:
   - Controlling provision: Chapter I, Section E of Year 2028 ICSE Regulations.
   - Ordinary requirement: At least **75% of working days in each year** of the two-year course.
   - Shortage between **60% and 74.9%**: Discretionary condonation by the **Chief Executive and Secretary** (illness or special circumstances).
   - Shortage **below 60%**: Discretionary condonation by the **Chief Executive and Secretary** in exceptional cases (serious psychological or medical grounds, authorised sports/arts representation, unforeseen circumstances).
   - Both are modeled as discretionary condonation provisions, not automatic entitlements.

6. **Cohort-Complete Internal Assessment Inventory (57 Records)**:
   - Full multi-cohort inventory accounts for **57 records**: 41 CBSE records (12 Middle + 10 IX + 9 Legacy X + 10 Cohort A X) + 16 CISCE records (9 Upper Primary + 1 Third Lang + 2 IX + 4 X).
   - Cross-sectional school-year view (2026–27): **37 items** (16 verified internal assessment applications + 21 framework entries; multi-year course-completion prerequisites are excluded from the annual session cross-section).
   - CBSE Cohort A longitudinal progression view: **20 Secondary items** (32 total with Middle Stage).
   - Includes course-spanning Third Language Internal Examination (`cisce-ia-middle-lang3`, Classes V–VIII).
   - Semantics strictly reflect source specifications (`school_internal_evaluation` and `not_specified_by_source` for CT & AI and co-curricular areas without published percentage weights).

---

## 2. CISCE Year 2028 Subject Code Provenance Register

| Subject Name | Group / Section | Assigned Code | Official Controlling Document | Verification Status | Verification & Provenance Notes |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **English** | Group I (Compulsory Core) | `01` | *ICSE Regulations & Syllabuses, English Subject Syllabus* (pp. 1–14) | `verified_in_syllabus` | Subject Code 01 consists of Paper 1 (Language) & Paper 2 (Literature in English). Zero independent Subject 02. |
| **Second Language** | Group I (Compulsory Core) | `null` | *ICSE Regulations 2028 Chapter II Part II* & Language Syllabuses | `generic_pool_null` | Generic pool entry carries null. Specific language codes exist in syllabuses (e.g. Hindi 05, Bengali 03, Gujarati 04, Sanskrit 19). |
| **History, Civics and Geography** | Group I (Compulsory Core) | `50` | *ICSE Regulations & Syllabuses, HCG Subject Syllabus* (pp. 15–42) | `verified_in_syllabus` | Subject Code 50 consists of Paper 1 (History & Civics) and Paper 2 (Geography). |
| **History, Civics & Geography (Thailand)** | Group I (Compulsory Core) | `null` | *ICSE Regulations 2028 Chapter II Part II* | `verified_in_regulations` | Alternative in lieu of Code 50 for approved affiliated schools located in Thailand. |
| **Mathematics** | Group II (Elective Pool) | `51` | *ICSE Regulations & Syllabuses, Mathematics Subject Syllabus* (pp. 58–76) | `verified_in_syllabus` | Subject Code 51. Candidate choice pool (recommended with Science). |
| **Science (Physics, Chemistry, Biology)** | Group II (Elective Pool) | `52` | *ICSE Regulations & Syllabuses, Science Subject Syllabus* (pp. 77–130) | `verified_in_syllabus` | Subject Code 52. Consists of Paper 1 (Physics), Paper 2 (Chemistry), Paper 3 (Biology). |
| **Economics** | Group II (Elective Pool) | `64` | *ICSE Regulations & Syllabuses, Economics Subject Syllabus* (pp. 153–166) | `verified_in_syllabus` | Subject Code 64. Mutually exclusive with Group III Economic Application (Code 87). |
| **Commercial Studies** | Group II (Elective Pool) | `63` | *ICSE Regulations & Syllabuses, Commercial Studies Subject Syllabus* (pp. 140–152) | `verified_in_syllabus` | Subject Code 63. Mutually exclusive with Group III Commercial Application (Code 88). |
| **Environmental Science** | Group II (Elective Pool) | `82` | *ICSE Regulations and Syllabuses, 2028 — ENVIRONMENTAL SCIENCE (82)* (`17.-Environmental-Science.pdf`, URL: `https://cisce.org/wp-content/uploads/2026/01/17.-Environmental-Science.pdf`) | `verified_in_2028_syllabus` | Subject Code 82 verified in published 2028 syllabus booklet. Cover identifies Environmental Science (82), Examination Year 2028. Mutually exclusive with Group III Environmental Application. |
| **A Modern Foreign Language** | Group II (Elective Pool) | `null` | *ICSE Regulations Chapter II Part II* & Language Syllabuses | `generic_pool_null` | Generic pool entry carries null. Specific codes: French 27, German 28, Spanish 36. |
| **A Classical Language** | Group II (Elective Pool) | `null` | *ICSE Regulations Chapter II Part II* & Language Syllabuses | `generic_pool_null` | Generic pool entry carries null. Specific codes: Sanskrit 25, Persian 26. |
| **Computer Application** | Group III Section A | `86` | *ICSE Regulations & Syllabuses, Computer Applications Syllabus* (pp. 180–196) | `verified_in_syllabus` | Subject Code 86. Section A Applied Arts & Sciences. |
| **Economic Application** | Group III Section A | `87` | *ICSE Regulations & Syllabuses, Economic Applications Syllabus* | `verified_in_syllabus` | Subject Code 87. Mutually exclusive with Group II Economics (Code 64). |
| **Commercial Application** | Group III Section A | `88` | *ICSE Regulations & Syllabuses, Commercial Applications Syllabus* | `verified_in_syllabus` | Subject Code 88. Mutually exclusive with Group II Commercial Studies (Code 63). |
| **Art** | Group III Section A | `60` | *ICSE Regulations & Syllabuses, Art Subject Syllabus* (pp. 197–210) | `verified_in_syllabus` | Subject Code 60 (Papers 1, 2, 3, 4). Confirmed in Section A. |
| **Performing Arts** | Group III Section A | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 15)* | `unverified_for_2028_null` | Listed by name in 2028 Regulations (Table Serial 15). Numeric code unverified in published 2028 booklets (strictly null). |
| **Home Science** | Group III Section A | `69` | *ICSE Regulations & Syllabuses, Home Science Syllabus* | `verified_in_syllabus` | Subject Code 69. |
| **Cookery** | Group III Section A | `70` | *ICSE Regulations & Syllabuses, Cookery Syllabus* | `verified_in_syllabus` | Subject Code 70. |
| **Fashion Designing** | Group III Section A | `71` | *ICSE Regulations & Syllabuses, Fashion Designing Syllabus* | `verified_in_syllabus` | Subject Code 71. |
| **Physical Education** | Group III Section A | `72` | *ICSE Regulations & Syllabuses, Physical Education Syllabus* | `verified_in_syllabus` | Subject Code 72. |
| **Yoga** | Group III Section A | `84` | *ICSE Regulations & Syllabuses, Yoga Syllabus* | `verified_in_syllabus` | Subject Code 84. |
| **Technical Drawing Applications** | Group III Section A | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 21)* | `unverified_for_2028_null` | Table serial 21. Historical code 65 applied to "Technical Drawing"; "Technical Drawing Applications" has no verified numeric code for Year 2028 (strictly null). |
| **Environmental Application** | Group III Section A | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 22)* | `unverified_for_2028_null` | Table serial 22. Mutually exclusive with Group II Environmental Science (Code 82) based on stable subject IDs. No published 2028 booklet assigns Code 85 (strictly null). |
| **Mass Media & Communication** | Group III Section A | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 23)* | `unverified_for_2028_null` | Table serial 23. Draft code 90 unverified in published 2028 syllabuses (strictly null). |
| **Hospitality Management** | Group III Section A | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 24)* | `unverified_for_2028_null` | Table serial 24. Draft code 93 unverified in published 2028 syllabuses (strictly null). |
| **Robotics and AI** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 25)* | `not_applicable_vocational_null` | Table serial 25. Vocational elective subject. Evaluated under 50/50 external/internal weighting. No numeric examination code published (strictly null). |
| **Assistant Beauty Therapist** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 26)* | `not_applicable_vocational_null` | Table serial 26. Vocational elective subject. No numeric examination code (strictly null). |
| **Assistant Hair Stylist** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 27)* | `not_applicable_vocational_null` | Table serial 27. Vocational elective subject. No numeric examination code (strictly null). |
| **Basic Data Entry Operator** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 28)* | `not_applicable_vocational_null` | Table serial 28. Vocational elective subject. No numeric examination code (strictly null). |
| **Dietic Aide** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 29)* | `not_applicable_vocational_null` | Table serial 29. Vocational elective subject. No numeric examination code (strictly null). |
| **Cashier** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 30)* | `not_applicable_vocational_null` | Table serial 30. Vocational elective subject. No numeric examination code (strictly null). |
| **Early Years Physical Activity Facilitator** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 31)* | `not_applicable_vocational_null` | Table serial 31. Vocational elective subject. No numeric examination code (strictly null). |
| **Auto Service Technician** | Group III Section B | `null` | *ICSE Regulations 2028 Chapter II Part II, p. 6 (Table Item 32)* | `not_applicable_vocational_null` | Table serial 32. Vocational elective subject. No numeric examination code (strictly null). |
| **SUPW & Community Service** | Compulsory Course Completion | `null` | *ICSE Regulations 2028 Chapter I & II Part I, p. 6* | `not_applicable_vocational_null` | Evaluated internally by schools on Grades A to E (min Grade D pass). No numeric examination code exists. |

---

## 3. CISCE Upper Primary Framework & Disciplinary Disaggregation

Under the controlling primary document (*Curriculum for Upper Primary Classes: Classes VI–VIII*, First Edition, November 2016, hosted at `https://www.cisce.org/wp-content/uploads/2022/10/UpperPrimary.pdf`), MULTIPATH models the middle years curriculum framework with exact statutory fidelity:

### 3.1 Statutory Structure (7 Core + 4 Additional)
1. **7 Distinct Subject Areas**:
   - English (Language & Literature).
   - Second Language (Hindi or regional Indian languages).
   - Mathematics.
   - Science (Physics, Chemistry, Biology presented as separate disciplines).
   - History, Civics & Geography (History & Civics, Geography).
   - Computer Studies.
   - Arts Education (Visual and expressive arts).
2. **4 Additional Curricular Areas**:
   - Third Language (studied continuously from at least Class V to Class VIII).
   - Physical Education / Yoga.
   - Education in Moral and Spiritual Values.
   - Socially Useful Productive Work (SUPW) (prescribed for Classes VI–VIII).

### 3.2 Method A Valid Disciplinary Disaggregation ($1+1+1+3+1+1+1 = 9$)
- **English**: 1 offering per grade.
- **Second Language**: 1 offering per grade.
- **Mathematics**: 1 offering per grade.
- **Science Disaggregation**: 3 offerings per grade (`Physics`, `Chemistry`, `Biology`).
- **History, Civics & Geography**: 1 offering per grade.
- **Computer Studies**: 1 offering per grade.
- **Arts Education**: 1 offering per grade.
- **Total per grade**: $1 + 1 + 1 + 3 + 1 + 1 + 1 = 9$ offerings per grade.
- **Total across Upper Primary (Classes 6–8)**: $9 \times 3 = 27$ catalogued offerings in `src/data/curriculumData.ts`.

### 3.3 Five Year 2028 Statutory Course-Completion Requirements
Under Chapter II Part I, all ICSE candidates must satisfactorily complete:
1. **A Third Language from at least Class V to Class VIII (Internal Examination)**.
2. **Art (Internal Assessment)**.
3. **Socially Useful Productive Work and Community Service (SUPW & CS) (Internal Assessment, Grades A–E, min Grade D pass)**.
4. **Physical Education**.
5. **Education in Moral and Spiritual Values**.

---

## 4. Selection-Rule Model & Registration Constraints

The rebuilt `src/utils/cisceRegulationsValidator.ts` codifies the complete legal rulebook governing candidate eligibility and examination entry, verified by **115 automated unit test assertions**:

### 4.1 Distinct Registration Constraints
1. **School-Level Subject Provision Restriction**:
   - The school may not enter candidates for subjects for which the school makes no provision.
   - Evaluated via `schoolApprovedSubjects`: any candidate selection outside the school's approved list is rejected.
2. **Council Subject Registration Requirement**:
   - Candidates must be formally registered with the Council for the ICSE examination (`isCouncilRegistered: true`).
3. **15 September Subject-Change Cutoff (Chapter II, Section B, clause 3)**:
   - Candidates shall not be permitted to change subjects after **15 September** of the year in which they were registered in Class IX (`${class9RegistrationYear}-09-15`).
   - Changes after cutoff are prohibited. Procedural requirements for changes on or before the cutoff date are modeled as unspecified by Clause 3 (neither blanket authorization nor an unstated prior approval requirement is inferred).
   - Verified via boundary tests: 14 September (valid), 15 September (valid), 16 September (invalid), and following Class X dates (invalid).
4. **Class IX-to-X Subject Continuity**:
   - Candidate entering Class X may not opt for a subject for which they were not registered and studied in Class IX.
   - Unapproved subject deviations between Class IX and Class X are flagged as continuity violations.
5. **Practical and Project-Work Certification**:
   - Candidates must be examined by their school in practical/project work in: English, Second Language, History/Civics & Geography, their choice subjects, and SUPW.
   - Modeled via `practicalProjectWorkCertified` without treating practical components as independent pseudo-subjects.

### 4.2 Disaggregated Attendance Provisions
The regulations contain two separate attendance provisions that must not be conflated:
1. **Examination Entry Attendance Eligibility (Chapter I, Section E)**:
   - *Standard Requirement*: Minimum **75% attendance of working days** in each year of the two-year course at an affiliated school.
   - *Discretionary Condonation (60% to 74.9%)*: Discretionary condonation authority is vested in the **Chief Executive and Secretary** for shortages between 60% and 74.9% (illness or special circumstances).
   - *Discretionary Condonation (Below 60%)*: Discretionary condonation authority is vested in the **Chief Executive and Secretary** in exceptional cases (serious psychological or medical grounds, authorised sports/arts representation, unforeseen circumstances). Condonation is discretionary, not an automatic entitlement.
2. **Class IX Promotion Criteria (Chapter II, Section B, clause 4)**:
   - *Pass Mark Requirement*: Minimum **33% marks** in at least **five subjects individually**, which **MUST** include English, on cumulative average.
   - *Working Days Attendance*: Minimum **75% attendance of working days**.
   - *Statutory Exclusivity*: No other criteria shall be used by schools for Class IX promotion.

---

## 5. Normalized Two-Layer Architecture: Statutory Rules, Granular Assessment Applications & Curricular Framework Profiles

To resolve all counting ambiguities and clearly separate reusable statutory policies, granular subject/group assessment implementations, and broad curricular framework areas, MULTIPATH V3 codifies a formal **Two-Layer Normalized Assessment Architecture (Ledger v4.3.0)**:

- **Layer A: Statutory Policies and Framework Profiles**:
  - **Category A: 14 Source-Defined Assessment Rules** (8 CBSE Secondary + 6 CISCE Secondary).
  - **Category B: 1 Statutory Course-Completion / Prerequisite Requirement** (`rule-cisce-middle-lang3` under ICSE Regulations 2028 Chapter II Part I).
  - **Total Statutory Rules**: Exactly **15 Statutory Rules** ($14 + 1$).
  - **Category C: 2 Distinct Curriculum Framework Profiles** (`profile-cbse-middle-framework` and `profile-cisce-upper-primary-framework`), each carrying distinct source metadata and strictly excluded from statutory assessment rule counts.
- **Layer B: 57 Registry Records**:
  - **36 Verified Assessment Applications (`recordType: "assessment_application"`)**:
    * Granularity breakdown: 29 `subject_level` + 3 `group_level` + 1 `cohort_exam_event` + 1 `course_completion` + 2 `separate_qualification_requirement` = **36 items**.
    * Modality breakdown: 20 wholly school-assessed / internal examination instances + 16 mixed assessment instances (including 3 conditional/optional pathways).
  - **21 Curricular Framework Entries (`recordType: "curriculum_framework_entry"`)**:
    * 12 CBSE Middle Stage records and 9 CISCE Upper Primary grade-specific records that define statutory curricular areas under NCF-SE 2023 and CISCE Upper Primary 2016, but for which the governing bodies have not promulgated statutory board-level internal assessment percentage weightings or external examination rubrics (`assessmentModality: "not_specified_by_source"`).

---

### 5.1 Layer A: Statutory Assessment Rules & Framework Profiles

#### Category A: 14 Source-Defined Assessment Rules

| Rule ID | Board | Target Stage / Cohort | Assessment Scope | Statutory Modality | Primary Legal Authority | Statutory Description & Exact Source Wording |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `rule-cbse-sec-cl9-table1` | CBSE | Secondary (Class IX, Cohort A) | Classes 9 (Session 2026–27) | School-Based Assessment | CBSE Circular No. Acad-70/2026 Table I, p. 4 | *School-based Assessment — As per assessment rubrics already available in the syllabus.* (Numerical weighting: null; covers 9 compulsory requirements + 1 optional subject selection). |
| `rule-cbse-sec-cl10-table2-mixed` | CBSE | Secondary (Class X, Cohort A) | Class 10 (Session 2027–28) | Mixed (School IA + Board Exam) | CBSE Circular No. Acad-70/2026 Table II, p. 4 | Table II merged assessment cell: School-based Internal Assessment + Board Examination for first 5 subjects (R1, R2, Std Math, Std Sci, SocSci) + Slot 10. |
| `rule-cbse-sec-cl10-table2-internal` | CBSE | Secondary (Class X, Cohort A) | Class 10 (Session 2027–28) | School-based Internal Assessment Solely | CBSE Circular No. Acad-70/2026 Table II, p. 4 | School-based internal assessment sole for Language 3 (R3), Kaushal Vikas (Vocational), Art Education, and Physical Education; no Board Exam. |
| `rule-cbse-sec-cl10-table2-board-only` | CBSE | Secondary (Class X, Cohort A) | Class 10 (Session 2027–28) | Board Examination Solely | CBSE Circular No. Acad-70/2026 Table II, p. 4 | External Board Examination solely for Mathematics Advanced, Science Advanced, and 22 Skill Subjects (excluded from IA inventory). |
| `rule-cbse-sec-cl10-legacy-internal` | CBSE | Secondary (Class X, Legacy) | Class 10 (Session 2026–27) | Wholly School-Assessed | CBSE Secondary Curriculum 2026–27 & HPE Curriculum p. 7 | Health and Physical Education is assessed internally on a five-point scale (A, B, C, D, E) per HPE curriculum p. 7. Work Experience is officially subsumed in HPE with SEWA grades considered separately. Art Education is school-assessed without numerical weighting. Official subject codes are null. |
| `rule-cbse-sec-cl10-legacy-mixed` | CBSE | Secondary (Class X, Legacy) | Class 10 (Session 2026–27) | Mixed (80% Board Exam / 20% School IA) | CBSE Secondary School Curriculum 2026–27 (Vol. 1) & Circular Acad-11/2019 | 80 marks external Board Examination theory + 20 marks school internal assessment across all 5 compulsory academic subjects. Audited sub-components: English 184 (four 5-mark components: Periodic Pen-Paper 5 + Multiple Assessment 5 + Portfolio 5 + ALS/Enrichment 5 = 20 IA per Acad-11/2019), Hindi 002/085 (5 Periodic + 5 Multiple + 5 Portfolio + 5 Listening/Speaking per p. 7), Mathematics (5 Pen-Paper + 5 Multiple + 5 Portfolio + 5 Lab), Science (5 Periodic + 5 Multiple + 5 Practical + 5 Portfolio), Social Science (5 Pen-Paper + 5 Multiple + 5 Portfolio + 5 Project). Other Group L languages inherit broad 80/20 division without assuming identical sub-components. |
| `rule-cbse-sec-cl10-legacy-skill-mixed` | CBSE | Secondary (Class X, Legacy) | Class 10 (Session 2026–27) | Mixed (50% Board Exam / 50% Practical Exam) | CBSE Circular dated 05.11.2026 (*Subject-wise bifurcation of marks*) & Skill Curriculum (2026–27) | 50 marks external Board Examination (Theory) + 50 marks Practical Examination (conducted by school-appointed examiners; External Examiner: NO per 05.11.2026 circular) across all 22 Group S Skill Subjects (401–422). Practical marks constitute a school-conducted practical examination, not generic continuous internal assessment. |
| `rule-cbse-sec-cl10-legacy-subj7-selection` | CBSE | Secondary (Class X, Legacy) | Class 10 (Session 2026–27) | Variable by Elected Subject Profile | CBSE Circular dated 05.11.2026 & Secondary Curriculum 2026–27 (Vol. 1, Scheme of Studies Sec 2.2) | Optional Subject 7 Selection Position across Group L (Language 3) and Group A2 (Academic Electives). Group S Skill Subjects are strictly forbidden under Subject 7 per official CBSE Scheme of Studies (skilleducation.cbseit.in/scheme-of-studies-x.html). Subject-specific marks distributions: Computer Applications 165 (50 Theory / 50 Practical Exam, school-appointed examiner, External: NO), Painting 049 (30 Theory / 50 Practical Exam [school-appointed examiner, External: NO] / 20 Internal Assessment [School: 10 Periodic + 10 Project]), Home Science 064 (70 Theory / 30 Practical Exam, school-appointed examiner, External: NO), Music 031–036 (30 Theory / 50 Practical Exam [school-appointed examiner, External: NO] / 20 IA), NCC 076 (70 Theory / 0 Practical / 30 IA), Elements of Business 154 (70 Theory / 30 Project [school-appointed examiner, External: NO]), Language Elective (80 Theory / 20 IA). |
| `rule-cisce-sec-cl9-school-exam` | CISCE | Secondary (Class IX, ICSE 2028 Cohort) | Class 9 (Session 2026–27) | School-Conducted Promotion Examination | ICSE Regulations 2028 Chapter II Part II Section D | School-conducted comprehensive annual examination evaluated against ICSE syllabus standards for promotion to Class X. |
| `rule-cisce-sec-cl9-supw` | CISCE | Secondary (Class IX, ICSE 2028 Cohort) | Class 9 (Session 2026–27) | Wholly School-Assessed | ICSE Regulations 2028 Chapter II Part I, p. 6 | Internal continuous evaluation of Socially Useful Productive Work and Community Service, graded A to E (Grade D minimum pass). |
| `rule-cisce-sec-cl10-grp1-mixed` | CISCE | Secondary (Class X, ICSE 2028 Cohort) | Class 10 (Session 2027–28) | Mixed (80% Board Exam / 20% School IA) | ICSE Regulations 2028 Chapter II Part II Section A | 80% External Council Board Examination + 20% School Internal Assessment for Group I Compulsory Core Subjects (English, Second Lang, HCG). |
| `rule-cisce-sec-cl10-grp2-mixed` | CISCE | Secondary (Class X, ICSE 2028 Cohort) | Class 10 (Session 2027–28) | Mixed (80% Board Exam / 20% School IA) | ICSE Regulations 2028 Chapter II Part II Section A | 80% External Council Board Examination + 20% School Internal Assessment for Group II Elective Subjects (Math, Science, Econ, Comm, EVS, MFL, Classical). |
| `rule-cisce-sec-cl10-grp3-mixed` | CISCE | Secondary (Class X, ICSE 2028 Cohort) | Class 10 (Session 2027–28) | Mixed (50% Board Exam / 50% School IA) | ICSE Regulations 2028 Chapter II Part II Section A | 50% External Council Board Examination + 50% School Internal Assessment (Practical / Project Work) for Group III Applied Elective Subjects. |
| `rule-cisce-sec-cl10-supw` | CISCE | Secondary (Class X, ICSE 2028 Cohort) | Class 10 (Session 2027–28) | Wholly School-Assessed | ICSE Regulations 2028 Chapter II Part I, p. 6 | Internal continuous evaluation of SUPW & Community Service, graded A to E (Grade D minimum pass); council results withheld if unfulfilled. |

#### Category B: 1 Statutory Course-Completion / Prerequisite Requirement

| Rule ID | Board | Target Stage / Cohort | Assessment Scope | Statutory Modality | Primary Legal Authority | Statutory Description |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `rule-cisce-middle-lang3` | CISCE | Upper Primary / Secondary Prerequisite | Classes 5 to 8 (Course Spanning) | School-Conducted Internal Examination | ICSE Regulations 2028 Chapter II Part I, p. 5 | Mandatory course-spanning completion of Third Language from at least Classes V–VIII evaluated via school-conducted internal examination. |

#### Category C: 2 Distinct Curriculum Framework Profiles (Excluded from Statutory Assessment Rule Counts)

| Profile ID | Board | Target Stage | Framework Scope | Assessment Guidance Type | Primary Legal Authority & Section Citations | Framework Characterization |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| `profile-cbse-middle-framework` | CBSE | Middle Stage (Classes 6–8) | 7 Curricular Areas + Skill Modules | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 (p. 51), Sec. 3.4.6.3 (p. 87), Sec. 3.5.3.2; Circulars Acad-15/2026 & 18/2026 | General stage-level competency assessment guidance (classroom projects, portfolios, experiments, periodic summative assessments, end-of-stage summative assessment); boardSpecificAssessmentSplit is null. |
| `profile-cisce-upper-primary-framework` | CISCE | Upper Primary (Classes 6–8) | 7 Subject Areas + 4 Additional Areas | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), First Edition, November 2016 (`UpperPrimary.pdf`) | Broad curricular and pedagogical framework for affiliated schools; council does not prescribe statutory numerical internal assessment percentage weightings or external examination rubrics. |

---

### 5.2 Layer B: 36 Verified Assessment Applications (`recordType: "assessment_application"`)

| Application ID | Linked Rule ID | Board | Class | Scope Type | Subject / Component | Scope Details | Assessment Modality | Component Type | Primary Legal Authority |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| `cbse-ia-cl9-lang-r1` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Language 1 (R1) | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-lang-r2` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Language 2 (R2) | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-math` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Mathematics (incl. Math Adv) | Single subject (with Adv) | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-sci` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Science (incl. Sci Adv) | Single subject (with Adv) | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-socsci` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Social Science | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-lang-r3` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Language 3 (R3: Native Lang) | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I & Acad-33/2026 |
| `cbse-ia-cl9-art` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Art Education | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-pe` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Physical Education & Well-being | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-voc` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Vocational Education (Skill Ed) | Single subject | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl9-opt` | `rule-cbse-sec-cl9-table1` | CBSE | 9 | `subject_level` | Optional Subject (Slot 10) | Single subject (Slot 10) | school_based_assessment | `school_based_assessment` | CBSE Circular No. Acad-70/2026 Table I, p. 4 |
| `cbse-ia-cl10-legacy-art` | `rule-cbse-sec-cl10-legacy-internal` | CBSE | 10 | `subject_level` | Art Education | Single co-scholastic area | wholly_school_assessed | `wholly_school_assessed` | CBSE Secondary Curriculum 2026–27 (Main Index) |
| `cbse-ia-cl10-legacy-pe` | `rule-cbse-sec-cl10-legacy-internal` | CBSE | 10 | `subject_level` | Health & Physical Education (subsuming Work Experience with separate SEWA consideration, official code null) | Single co-scholastic area | wholly_school_assessed | `wholly_school_assessed` | CBSE Health and Physical Education 2026–27, p. 7 |
| `cbse-ia-cl10-legacy-lang1-ia` | `rule-cbse-sec-cl10-legacy-mixed` | CBSE | 10 | `subject_level` | Language 1 (Audited representative: English Language & Literature Code 184 / Group L) | Single subject | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, English 184 Sec VI & Circular Acad-11/2019 |
| `cbse-ia-cl10-legacy-lang2-ia` | `rule-cbse-sec-cl10-legacy-mixed` | CBSE | 10 | `subject_level` | Language 2 (Audited representatives: Hindi Course A 002 / Hindi Course B 085 / Group L) | Single subject | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, Hindi A & B p. 7 |
| `cbse-ia-cl10-legacy-math-ia` | `rule-cbse-sec-cl10-legacy-mixed` | CBSE | 10 | `subject_level` | Mathematics (Standard 041 / Basic 241) | Single subject | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, Mathematics (Code 041/241) |
| `cbse-ia-cl10-legacy-sci-ia` | `rule-cbse-sec-cl10-legacy-mixed` | CBSE | 10 | `subject_level` | Science (Subject Code 086) | Single subject | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, Science (Code 086) |
| `cbse-ia-cl10-legacy-socsci-ia` | `rule-cbse-sec-cl10-legacy-mixed` | CBSE | 10 | `subject_level` | Social Science (Subject Code 087) | Single subject | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, Social Science (Code 087) |
| `cbse-ia-cl10-legacy-opt-skill` | `rule-cbse-sec-cl10-legacy-skill-mixed` | CBSE | 10 | `selection_position` | Optional Skill Subject Selection Position (Slot 6: Group S, e.g., IT 402, AI 417, Retail 401, Auto 404) | Selection position | mixed_theory_and_practical_examination | `practical_examination_component` | CBSE Skill Education Curriculum 2026–27, Secondary Level |
| `cbse-ia-cl10-legacy-opt-academic` | `rule-cbse-sec-cl10-legacy-subj7-selection` | CBSE | 10 | `selection_position` | Optional Subject 7 Selection Position (Group L [Language 3], Group A2 Academic Electives [Computer Apps 165, Painting 049, Home Sci 064]; Group S strictly forbidden) | Selection position | variable_by_elected_subject_profile | `internal_component_of_externally_examined_subject` | CBSE Secondary Curriculum 2026–27, Scheme of Studies Sec 2.2 |
| `cbse-ia-cl10-cohort-a-lang-r1` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Language 1 (R1) | Single subject | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-lang-r2` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Language 2 (R2) | Single subject | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-math` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Mathematics (Standard pathway) | Single subject | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-sci` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Science (Standard pathway) | Single subject | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-socsci` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Social Science | Single subject | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-lang-r3` | `rule-cbse-sec-cl10-table2-internal` | CBSE | 10 | `subject_level` | Language 3 (R3) | Single subject | school_based_internal_assessment_only | `wholly_school_assessed` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-kv` | `rule-cbse-sec-cl10-table2-internal` | CBSE | 10 | `subject_level` | Vocational: Kaushal Vikas (Pathway A) | Single subject | school_based_internal_assessment_only | `wholly_school_assessed` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-art` | `rule-cbse-sec-cl10-table2-internal` | CBSE | 10 | `subject_level` | Art Education | Single subject | school_based_internal_assessment_only | `wholly_school_assessed` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-pe` | `rule-cbse-sec-cl10-table2-internal` | CBSE | 10 | `subject_level` | Physical Education & Well-being | Single subject | school_based_internal_assessment_only | `wholly_school_assessed` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cbse-ia-cl10-cohort-a-slot10` | `rule-cbse-sec-cl10-table2-mixed` | CBSE | 10 | `subject_level` | Optional Subject (Slot 10) | Single subject (Slot 10) | mixed_school_internal_and_board_examination | `internal_component_of_externally_examined_subject` | CBSE Circular No. Acad-70/2026 Table II, p. 4 |
| `cisce-ia-middle-lang3` | `rule-cisce-middle-lang3` | CISCE | 8 | `course_completion` | Third Language (Classes V–VIII) | Course-spanning prerequisite | school_conducted_internal_examination | `school_conducted_internal_examination` | ICSE Regulations 2028 Chapter II Part I, p. 5 |
| `cisce-ia-cl9-supw` | `rule-cisce-sec-cl9-supw` | CISCE | 9 | `separate_qualification_requirement` | SUPW & Community Service | Standalone graduation condition | wholly_school_assessed | `wholly_school_assessed` | ICSE Regulations 2028 Chapter II Part I, p. 6 |
| `cisce-ia-cl9-internal-exam` | `rule-cisce-sec-cl9-school-exam` | CISCE | 9 | `cohort_exam_event` | Class IX Annual Promotion Exam | All registered subjects | school_conducted_internal_examination | `school_conducted_internal_examination` | ICSE Regulations 2028 Chapter II Part II Section D |
| `cisce-ia-cl10-supw` | `rule-cisce-sec-cl10-supw` | CISCE | 10 | `separate_qualification_requirement` | SUPW & Community Service | Standalone graduation condition | wholly_school_assessed | `wholly_school_assessed` | ICSE Regulations 2028 Chapter II Part I, p. 6 |
| `cisce-ia-cl10-grp1-mixed` | `rule-cisce-sec-cl10-grp1-mixed` | CISCE | 10 | `group_level` | Group I Core Subjects | English (01), 2nd Lang, HCG (50) | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | ICSE Regulations 2028 Chapter II Part II Section A |
| `cisce-ia-cl10-grp2-mixed` | `rule-cisce-sec-cl10-grp2-mixed` | CISCE | 10 | `group_level` | Group II Electives | Math (51), Sci (52), Econ (64), Comm (63), EVS (82), Langs | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | ICSE Regulations 2028 Chapter II Part II Section A |
| `cisce-ia-cl10-grp3-mixed` | `rule-cisce-sec-cl10-grp3-mixed` | CISCE | 10 | `group_level` | Group III Applied Electives | Sec A (14 subjects) + Sec B (8 subjects) | mixed_assessment_modality | `internal_component_of_externally_examined_subject` | ICSE Regulations 2028 Chapter II Part II Section A |

---

### 5.3 Layer B: 21 Curricular Framework Entries (`recordType: "curriculum_framework_entry"`)

| Instance ID | Linked Profile ID | Board | Class | Curricular Area | Assessment Modality | Assessment Guidance Type | Primary Legal Authority & Section Citations |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :--- |
| `cbse-ia-cl6-voc` | `profile-cbse-middle-framework` | CBSE | 6 | Vocational Education (Kaushal Bodh) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 / CBSE Kaushal Bodh Framework |
| `cbse-ia-cl6-ct-ai` | `profile-cbse-middle-framework` | CBSE | 6 | Computational Thinking & AI Modules | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | CBSE Circular Acad-15/2026 & Acad-18/2026 |
| `cbse-ia-cl6-art` | `profile-cbse-middle-framework` | CBSE | 6 | Art Education (Visual & Performing) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cbse-ia-cl6-pe` | `profile-cbse-middle-framework` | CBSE | 6 | Physical Education and Well-being | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cbse-ia-cl7-voc` | `profile-cbse-middle-framework` | CBSE | 7 | Vocational Education (Kaushal Bodh) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 / CBSE Kaushal Bodh Framework |
| `cbse-ia-cl7-ct-ai` | `profile-cbse-middle-framework` | CBSE | 7 | Computational Thinking & AI Modules | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | CBSE Circular Acad-15/2026 & Acad-18/2026 |
| `cbse-ia-cl7-art` | `profile-cbse-middle-framework` | CBSE | 7 | Art Education (Visual & Performing) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cbse-ia-cl7-pe` | `profile-cbse-middle-framework` | CBSE | 7 | Physical Education and Well-being | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cbse-ia-cl8-voc` | `profile-cbse-middle-framework` | CBSE | 8 | Vocational Education (Kaushal Bodh) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 / CBSE Kaushal Bodh Framework |
| `cbse-ia-cl8-ct-ai` | `profile-cbse-middle-framework` | CBSE | 8 | Computational Thinking & AI Modules | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | CBSE Circular Acad-15/2026 & Acad-18/2026 |
| `cbse-ia-cl8-art` | `profile-cbse-middle-framework` | CBSE | 8 | Art Education (Visual & Performing) | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cbse-ia-cl8-pe` | `profile-cbse-middle-framework` | CBSE | 8 | Physical Education and Well-being | `not_specified_by_source` | `ncf_stage_level_competency_guidance` | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3 |
| `cisce-ia-cl6-art` | `profile-cisce-upper-primary-framework` | CISCE | 6 | Arts Education | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl6-pe` | `profile-cisce-upper-primary-framework` | CISCE | 6 | Physical Education / Yoga | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl6-supw` | `profile-cisce-upper-primary-framework` | CISCE | 6 | Socially Useful Productive Work (SUPW) | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl7-art` | `profile-cisce-upper-primary-framework` | CISCE | 7 | Arts Education | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl7-pe` | `profile-cisce-upper-primary-framework` | CISCE | 7 | Physical Education / Yoga | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl7-supw` | `profile-cisce-upper-primary-framework` | CISCE | 7 | Socially Useful Productive Work (SUPW) | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl8-art` | `profile-cisce-upper-primary-framework` | CISCE | 8 | Arts Education | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl8-pe` | `profile-cisce-upper-primary-framework` | CISCE | 8 | Physical Education / Yoga | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |
| `cisce-ia-cl8-supw` | `profile-cisce-upper-primary-framework` | CISCE | 8 | Socially Useful Productive Work (SUPW) | `not_specified_by_source` | `cisce_institutional_framework_guidance` | Curriculum for Upper Primary Classes (VI–VIII), Nov 2016 (`UpperPrimary.pdf`) |

---

### 5.4 Middle Stage & Upper Primary Source Validation & Supplementary Inclusion Registry

To ensure complete transparency regarding why Middle Stage records are modeled as framework entries and how supplementary areas are catalogued:

| Curricular Registry Scope | Grade Level | Board | Records Count | Modality / Classification | Statutory Source Basis | Architectural Handling & Scope Invariants |
| :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **Middle Stage Supplementary Registry** | Classes 6–8 | CBSE | 12 items (4 per class: Kaushal Bodh, CT & AI, Art, PE) | `curriculum_framework_entry` (`not_specified_by_source`) | NCF-SE 2023 Part A, Sec. 2.4.3 & 3.4.6.3; Circulars Acad-15/2026 & 18/2026 | Represents 4 supplementary areas per grade; core academic disciplines (Science, Math, Social Science, Language) are represented directly in the canonical curriculum catalogue. CT & AI 12-hour skill modules are active in Classes III–VIII only and are excluded for Class IX Cohort A. |
| **Upper Primary Supplementary Framework** | Classes 6–8 | CISCE | 9 grade-specific items (3 per class: Art, PE/Yoga, SUPW) | `curriculum_framework_entry` (`not_specified_by_source`) | CISCE Upper Primary Framework (Nov 2016, `UpperPrimary.pdf`) | Establishes 7 subject areas + 4 additional areas. Education in Moral and Spiritual Values is preserved as an institutional ethos framework area in `profile-cisce-upper-primary-framework` but excluded from individual grade assessment entries (school-wide non-evaluated ethos). |
| **Statutory Third Language Prerequisite** | Classes 5–8 | CISCE | 1 item (`cisce-ia-middle-lang3`) | `assessment_application` (`course_completion`, Rule 13) | ICSE Regulations 2028 Chapter II Part I, p. 5 | Mandates that candidates must have completed an internal school course and passed a school-conducted internal examination in a Third Language from at least Classes V–VIII as a statutory prerequisite for examination entry. |


### 5.3 Audited Subject-Specific Assessment Profiles (Primary Source Verification)

To completely eliminate the conflation of marks distributions with assessment authorities, MULTIPATH V3 maintains verified, primary-source-grounded assessment profiles for representative subjects:

| Subject Code & Name | Category | Marks Distribution | Component Assessment Authority | Internal Sub-Component Breakdown / Syllabus Guidance | Primary Source Reference |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **English Language & Literature (184)** | Compulsory Academic (Language 1) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | Periodic Pen-Paper Test 5 marks, Multiple Assessment 5 marks, Portfolio 5 marks, Assessment of Listening & Speaking (ALS) / Subject Enrichment 5 marks. (Four 5-mark components reconcile to 20 marks without double counting per Acad-11/2019 and English LL syllabus Sec VI; ALS is exactly 5 marks, not 10). | *English 184 Syllabus*, Section VI & Circular Acad-11/2019 |
| **English Communicative (101)** | Compulsory / Elective Academic (Group L) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | Periodic Assessment & Portfolio 15 marks, Assessment of Listening & Speaking (ALS) 5 marks (= 20 IA). Sourced to Class X English Communicative syllabus. | *English Comm 101 Syllabus* & *CBSE Circular 05.11.2026* |
| **Hindi Course A (002)** | Compulsory Academic (Language 2) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | सामयिक आकलन 5 marks, बहुविध आकलन 5 marks, पोर्टफोलियो 5 marks, श्रवण एवं वाचन 5 marks (Statutory 5+5+5+5 structure). | *Hindi A Syllabus*, p. 7 |
| **Hindi Course B (085)** | Compulsory Academic (Language 2) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | सामयिक आकलन 5 marks, बहुविध आकलन 5 marks, पोर्टफोलियो 5 marks, श्रवण एवं वाचन 5 marks (Statutory 5+5+5+5 structure, independently verified). | *Hindi B Syllabus*, p. 7 |
| **Mathematics Standard/Basic (041/241)** | Compulsory Academic | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | Pen-Paper Test 5 marks, Multiple Assessment 5 marks (Periodic 10), Portfolio 5 marks, Lab Practical Activities 5 marks. | *Mathematics 041/241 Syllabus*, pp. 8–10 |
| **Science (086)** | Compulsory Academic | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | Periodic Assessment 5 marks, Multiple Assessment / Diverse Methods 5 marks, Practical Lab Work 5 marks, Portfolio 5 marks. | *Science 086 Syllabus*, pp. 9–11 |
| **Social Science (087)** | Compulsory Academic | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | Pen-Paper Test 5 marks, Multiple Assessment 5 marks, Portfolio 5 marks, Subject Enrichment Project Work 5 marks. | *Social Science 087 Syllabus*, pp. 12–15 |
| **Information Technology (402)** | Optional Skill Subject (Group S) | 50 Theory, 50 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Practical Examination 20 marks (Digital Documentation 5, Electronic Spreadsheet 5, DBMS 10), Viva Voce 10 marks, Project Work / Field Visit 10 marks, Practical File / Student Portfolio 10 marks (= 50 Practical). External practical examiner is NO per CBSE Circular dated 05.11.2026; school conducts practical examination through its own teachers. Primary Source: https://cbseacademic.nic.in/web_material/Curriculum27/Sec/402-IT-X.pdf. | *CBSE Circular 05.11.2026* & *Skill Curriculum 402* |
| **Artificial Intelligence (417)** | Optional Skill Subject (Group S) | 50 Theory, 50 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Practical File 15 marks, Practical Examination 15 marks, Viva Voce 5 marks, Project Work / Portfolio 10 marks, Project Viva Voce 5 marks (= 50 Practical). External examiner is NO per 05.11.2026 circular; school conducts practical. | *CBSE Circular 05.11.2026* & *Skill Curriculum 417* |
| **Retail (401)** | Optional Skill Subject (Group S) | 50 Theory, 50 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Viva based on Project 5 marks, Practical File 25 marks, Skill Demonstration in Lab 20 marks (= 50 Practical). Conducted by two internal examiners; external examiner is NO per 05.11.2026 circular. | *CBSE Circular 05.11.2026* & *Skill Curriculum 401* |
| **Automotive (404)** | Optional Skill Subject (Group S) | 50 Theory, 50 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Project Work 10 marks, Viva Voce 5 marks, Practical File 15 marks, Skill Demonstration in Lab 20 marks (= 50 Practical). Conducted by two internal examiners; external examiner is NO per 05.11.2026 circular. | *CBSE Circular 05.11.2026* & *Skill Curriculum 404* |
| **Complete Group S Offerings (401–422)** | 22 Optional Skill Subjects (Group S) | 50 Theory, 50 Practical, 0 Project, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | All 22 Group S Skill Subjects (Retail 401, Information Technology 402, Security 403, Automotive 404, Introduction to Financial Markets 405, Introduction to Tourism 406, Beauty & Wellness 407, Agriculture 408, Food Production 409, Front Office Operations 410, Banking & Insurance 411, Marketing & Sales 412, Health Care 413, Apparel 414, Multi-Media 415, Multi Skill Foundation Course 416, Artificial Intelligence 417, Physical Activity Trainer 418, Data Science 419, Electronics & Hardware 420, Foundation Skills for Sciences (Pharmaceutical & Biotechnology) 421, Design Thinking & Innovation 422) adhere to 50 Board Theory / 50 Practical Examination with external examiner designated as NO per 05.11.2026 circular. | *CBSE Circular 05.11.2026* & *Skill Curriculum 2026–27* |
| **Computer Applications (165)** | Optional Academic Elective (Group A2) | 50 Theory, 50 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Lab Test 20 marks, Report File & Viva Voce 20 marks (Report File 15 marks, Viva Voce 5 marks), Project 10 marks (= 50 Practical). External practical examiner is NO per 05.11.2026 circular; school conducts practical examination. | *CBSE Circular 05.11.2026* & *Comp Apps 165 Syllabus*, p. 12 |
| **Painting (049)** | Optional Academic Elective (Group A2) | 30 Theory, 50 Practical, 20 IA (Total: 100) | Theory: Board Exam; Practical: School-Appointed Examiner (External: NO); IA: School | Periodic Tests 10 marks, Project Work / Portfolio 10 marks (= 20 IA); Practical Exam 50 marks (Still Life 25, Composition 25). Distinct 3-part structure; practical total max 70 includes 20 marks explicit IA. External practical examiner is NO per 05.11.2026 circular. | *CBSE Circular 05.11.2026* & *Painting 049 Syllabus*, p. 8 |
| **Home Science (064)** | Optional Academic Elective (Group A2) | 70 Theory, 30 Practical, 0 IA (Total: 100) | Theory: External Board Exam; Practical: School-Appointed Examiner (External: NO) | Lab Practical Activities 30 marks. External practical examiner is NO per 05.11.2026 circular; school conducts practical examination. | *CBSE Circular 05.11.2026* & *Home Science 064 Syllabus*, p. 10 |
| **Music Offerings (031–036)** | Optional Academic Elective (Group A2) | 30 Theory, 50 Practical, 20 IA (Total: 100) | Theory: Board Exam; Practical: School-Appointed Examiner (External: NO); IA: School | 30 marks Board Theory + 50 marks Practical Exam (School-Appointed Examiner, External: NO per 05.11.2026 circular) + 20 marks School Internal Assessment. Encompasses Carnatic (031–033) and Hindustani (034–036) Vocal, Melodic, and Percussion. | *CBSE Circular 05.11.2026* & Music Syllabuses |
| **NCC (076)** | Optional Academic Elective (Group A2) | 70 Theory, 0 Practical, 30 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | 70 marks Board Theory + 30 marks School Internal Assessment per 05.11.2026 circular. | *CBSE Circular 05.11.2026* & NCC Syllabus |
| **Elements of Business (154) / Book Keeping (254)** | Optional Academic Elective (Group A2) | 70 Theory, 0 Practical, 30 Project (Total: 100) | Theory: Board Exam; Project: School-Appointed Examiner (External: NO) | 70 marks Board Theory + 30 marks Project (School-Appointed Examiner, External: NO per 05.11.2026 circular). | *CBSE Circular 05.11.2026* & Commerce Syllabuses |
| **Russian (021)** | Language Elective (Group L) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | 80 marks Board Exam Theory + 20 marks School Internal Assessment. Sourced to Class X Russian syllabus. | *Russian 021 Syllabus* |
| **Bhoti (088)** | Language Elective (Group L) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | 80 marks Board Exam Theory + 20 marks School Internal Assessment. Sourced to Class X Bhoti syllabus (Code 088 per Bhoti_SecP1_2026-27.pdf and 5 Nov 2026 circular). Obsolete draft code 022 decommissioned. | *CBSE Circular 05.11.2026* & *Bhoti 088 Syllabus* |
| **Sanskrit (122)** | Language Elective (Group L) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | 80 marks Board Exam Theory + 20 marks School Internal Assessment. Sourced to Class X Sanskrit syllabus. | *Sanskrit 122 Syllabus* |
| **Sanskrit Communicative (119)** | Compulsory / Elective Academic (Group L) | 80 Theory, 0 Practical, 20 IA (Total: 100) | Theory: External Board Exam; IA: School-Assessed | 80 marks Board Exam Theory + 20 marks School Internal Assessment. Sourced to Class X Sanskrit Communicative syllabus. | *Sanskrit Comm 119 Syllabus* & *CBSE Circular 05.11.2026* |
| **Health & Physical Education** | Compulsory Co-Scholastic | 0 Theory, 0 Practical, 0 IA (Graded A–E) | Internal Assessment: School-Assessed | Graded on 5-point scale (A, B, C, D, E) per printed page 7. Work Experience is subsumed in HPE with separate SEWA consideration. Official subject code is null (no 506 code for secondary Classes IX–X). | *HPE Curriculum 2026–27*, printed page 7 |
| **Art Education** | Compulsory Co-Scholastic | 0 Theory, 0 Practical, 0 IA (School Assessed) | Internal Assessment: School-Assessed | Continuous portfolio and visual expression evaluation; strictly separate from optional elective Painting 049. Official subject code is null. | *CBSE Secondary Curriculum Main Index* |

## 6. Two-Level Disaggregated Views & Mathematical Set Reconciliation Proofs

To eliminate all ambiguity between the verified statutory internal assessment instances and the broader multi-cohort educational catalogue:

### 6.1 Level 1: Verified Statutory Internal Assessment & Selection Applications (36 Items)

This level aggregates **strictly verified statutory assessment applications and selection positions** governed by Rules 1–13 (excluding framework entries with unspecified modalities):

- **View A — Session 2026–27 Cross-Sectional View**: Exactly **21 items**:
  - CBSE Class IX Cohort A (Session 2026–27 Table I): **10 items** (`cbse-ia-cl9-lang-r1` through `cbse-ia-cl9-opt`).
  - CBSE Legacy Class X (Session 2026–27): **9 items** (2 co-scholastic [Art, PE], 5 compulsory academic [Lang 1, Lang 2, Math, Sci, SocSci], 2 statutory selection positions [Skill Slot 6, Academic Elective Slot 7]).
  - CISCE Class IX (Session 2026–27): **2 items** (`cisce-ia-cl9-supw`, `cisce-ia-cl9-internal-exam`).
  - *(Note: `cisce-ia-middle-lang3` is a continuous course-completion prerequisite spanning Classes V–VIII under ICSE 2028 Chapter II Part I and is strictly excluded from the Session 2026–27 annual cross-sectional view).*
  - $\text{Level 1 View A Total} = 10 + 9 + 2 = \mathbf{21}\text{ items}$
  - CISCE Class IX (Session 2026–27): **2 instances** (`cisce-ia-cl9-supw`, `cisce-ia-cl9-internal-exam`).
  - *(Note: `cisce-ia-middle-lang3` is a continuous course-completion prerequisite spanning Classes V–VIII under ICSE 2028 Chapter II Part I and is strictly excluded from the Session 2026–27 annual cross-sectional view).*
  - $\text{Level 1 View A Total} = 10 + 9 + 2 = \mathbf{21}\text{ instances}$

- **View B — Secondary Longitudinal Progression with Course-Completion Prerequisite**: Exactly **27 instances**:
  - CBSE Secondary Cohort A (Class IX 2026–27 Table I + Class X 2027–28 Table II): **20 instances** ($10 + 10$).
  - CISCE Secondary (Class IX 2026–27 + Class X 2027–28): **6 instances** ($2 + 4$).
  - CISCE Third Language Course-Completion Prerequisite: **1 instance** (`cisce-ia-middle-lang3`).
  - *(Note: Pure Secondary progression without course-completion prerequisite is exactly **26 instances**).*
  - $$\text{Level 1 View B Total} = 20 + 6 + 1 = \mathbf{27}\text{ instances}$$

- **Level 1 Set Arithmetic Reconciliation Proof**:
  - Let $S_{\text{L1-A}}$ be the set of instances in View A ($|S_{\text{L1-A}}| = 21$).
  - Let $S_{\text{L1-B}}$ be the set of instances in View B ($|S_{\text{L1-B}}| = 27$).
  - **Intersection ($S_{\text{L1-A}} \cap S_{\text{L1-B}}$)**: Exactly **12 instances** (10 CBSE Class IX Cohort A + 2 CISCE Class IX).
  - **Unique to View A ($S_{\text{L1-A}} \setminus S_{\text{L1-B}}$)**: Exactly **9 instances** (the 9 CBSE Legacy Class X records).
  - **Unique to View B ($S_{\text{L1-B}} \setminus S_{\text{L1-A}}$)**: Exactly **15 instances** (10 CBSE Class X Cohort A Session 2027–28 + 4 CISCE Class X Session 2027–28 + 1 CISCE Third Language prerequisite).
  - **Level 1 Union Derivation Formula**:
    $|S_{\text{L1-A}} \cup S_{\text{L1-B}}| = |S_{\text{L1-A}}| + |S_{\text{L1-B}}| - |S_{\text{L1-A}} \cap S_{\text{L1-B}}| = 21 + 27 - 12 = \mathbf{36}\text{ unique verified assessment and qualification applications}$

---

### 6.2 Level 2: Master Multi-Cohort Catalogue Offerings (57 Records)

This level encompasses the **entire educational offering catalogue** across all cohorts and sessions (36 verified instances + 21 curricular framework entries):

- **View A — School-Year 2026–27 Cross-Sectional View**: Exactly **42 records**:
  - 21 Verified Assessment Applications (Session 2026–27).
  - 21 Curricular Framework Entries (12 CBSE Middle Stage + 9 CISCE Upper Primary).
  - $\text{Level 2 View A Total} = 21 + 21 = \mathbf{42}\text{ records}$
  - *(Disaggregated breakdown: 12 CBSE Middle + 10 CBSE IX + 9 CBSE Legacy X + 9 CISCE Upper Primary + 2 CISCE IX = 42 records).*

- **View B — Secondary Longitudinal Progression**:
  - Secondary Progression with Course-Completion Prerequisite: Exactly **27 records** (20 CBSE Secondary + 6 CISCE Secondary + 1 CISCE Third Lang).
  - Pure Secondary Progression: Exactly **26 records** (20 CBSE Secondary + 6 CISCE Secondary).
  - Secondary Progression with Middle Precursors: Exactly **48 records** (32 CBSE + 16 CISCE).

- **Level 2 Set Arithmetic Reconciliation Proof**:
  - Let $S_{\text{L2-A}}$ be the set of catalogue records in View A ($|S_{\text{L2-A}}| = 42$).
  - Let $S_{\text{L2-B}}$ be the set of catalogue records in View B with Course-Completion Prerequisite ($|S_{\text{L2-B}}| = 27$).
  - **Intersection ($S_{\text{L2-A}} \cap S_{\text{L2-B}}$)**: Exactly **12 records** (10 CBSE Class IX + 2 CISCE Class IX).
  - **Unique to View A ($S_{\text{L2-A}} \setminus S_{\text{L2-B}}$)**: Exactly **30 records** (12 CBSE Middle + 9 CBSE Legacy Class X + 9 CISCE Upper Primary).
  - **Unique to View B ($S_{\text{L2-B}} \setminus S_{\text{L2-A}}$)**: Exactly **15 records** (10 CBSE Cohort A Class X + 4 CISCE Class X + 1 CISCE Third Language prerequisite).
  - **Level 2 Union Derivation Formula**:
    $|S_{\text{L2-A}} \cup S_{\text{L2-B}}| = |S_{\text{L2-A}}| + |S_{\text{L2-B}}| - |S_{\text{L2-A}} \cap S_{\text{L2-B}}| = 42 + 27 - 12 = \mathbf{57}\text{ unique catalogue records}$
  - *(Alternative with Pure Secondary View B [26 records]: $|S_{\text{L2-A}} \cup S_{\text{L2-B (Sec)}}| = 42 + 26 - 12 = 56$ records, plus 1 external Course-Completion Prerequisite = **57 unique records**).*

- **Record-Level De-Duplication Rule**: Every statutory requirement and curricular entry is assigned a persistent, globally unique ID. In multi-cohort aggregations, distinct record IDs are counted strictly once in the catalogue total.

## 7. Deterministic Verification Evidence

### 7.1 Automated Test Suites (12 Test Suites, 301 Passed Tests & Assertions)
Every test suite executes deterministically with zero failures:

| Suite Name | File | Verified Assertions / Passed Tests |
| :--- | :--- | :---: |
| Phase 8: Automated Socratic, Feynman & Adaptive Media Verification | `tests/phase8_verification.js` | 29 |
| Phase 12.1: Supabase Authentication Gateway & RLS Security Hardening | `tests/phase12_supabase_verification.js` | 18 |
| Phase 13: Cloud Persistence, RLS Account Isolation & Idempotent Import | `tests/phase13_persistence_verification.js` | 22 |
| Phase 13.1: Multi-Account Data Isolation & Primary-Key Reuse Resilience | `tests/phase13_1_cross_account_verification.js` | 13 |
| Phase 14: Dual-Board Curriculum Expansion (Classes 6–10) | `tests/phase14_curriculum_verification.js` | 17 |
| Phase 14.1: Statutory Curriculum Audit & 128 Mapping Ledger Verification | `tests/phase14_1_curriculum_audit.js` | 15 |
| Phase 15: Final Release-Readiness & Journey Verification Suite | `tests/phase15_release_readiness.js` | 24 |
| Stage B: Scientific Engine Simulation Physics & Biological Verification | `tests/stage_b_scientific_verification.js` | 12 |
| Stage C: Curriculum Discovery, Filter & Search Verification | `tests/stage_c_curriculum_discovery_verification.js` | 10 |
| Stage D: Trajectory Engine, Constellation Math & Sovereign Persistence | `tests/stage_d_trajectory_release_verification.js` | 6 |
| Independent Audit: Final Regulatory Invariant Verification | `tests/final_independent_audit_verification.js` | 20 |
| CISCE Regulations Year 2028: Statutory Subject Choice & Validator Tests | `tests/cisce_2028_regulations.test.ts` | 115 |
| **Aggregate Total** | **12 Suites Executed** | **301 Passed (0 Failures)** |

### 7.2 Static Analysis & Production Build
- `npx oxlint`: Found 0 warnings and 0 errors across 144 files (116 rules).
- `npx tsc -b`: Clean exit with code 0 (zero compiler errors).
- `npm run build`: Cleanly compiled client bundle via Vite in **2.28s**.
- `git diff --check`: Clean exit with code 0 (zero whitespace or formatting errors).

---

## 8. Release Invariant Compliance Declaration

In strict compliance with project invariants and release directives:
- **No Git remote push**, branch switching, Vercel deployment, or unapproved publication has been performed.
- All 64 canonical topics, 256 epistemic paths, 128 board mappings, and Supabase RLS security contracts remain frozen and intact.
- All modifications are strictly confined to `D:\Projects\Multipath` on branch `main`.
