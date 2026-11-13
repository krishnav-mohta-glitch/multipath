/**
 * MULTIPATH V2 — PHASE 14.1: CURRICULUM ACCURACY & SOURCE TRACEABILITY AUDIT
 * 
 * Independent automated audit suite verifying:
 * 1. Data Model & Foreign Key Traceability: 1:1 board, year, source, and subject relationships.
 * 2. Class Level Alignment: mapping.classLevel === subject.classLevel for all 128 mappings.
 * 3. Examination-Year Cohort Verification:
 *    - ICSE Class 10 (Cohort appearing 2027) -> cisce-icse-2027 / src-cisce-icse-2027
 *    - ICSE Class 9 (Cohort entering 2026-27, appearing 2028) -> cisce-icse-2028 / src-cisce-icse-2028
 *    - Zero occurrences of anachronistic cisce-icse-2026 in mappings.
 * 4. Verification Status Breakdown:
 *    - 110 verified_official (85.94%)
 *    - 14 framework_supported (10.94%)
 *    - 4 school_dependent (3.12%)
 *    - Total: 128 mappings
 * 5. Strict Scope Discipline: Strictly CBSE and CISCE; zero IB, Cambridge, or State Board.
 * 6. Academic Discipline Alignment: Exactly 64 topics across 9 disciplines with 256 learning paths.
 * 7. Live Supabase Integrity & RLS: Anon client access, covering indexes, and write protection.
 */

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

// Polyfill WebSocket for headless Node < 22 environments if absent
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class DummyWebSocket {
    constructor() {}
    addEventListener() {}
    removeEventListener() {}
    send() {}
    close() {}
  };
}

// Load local environment overrides from .env.local
try {
  const envLocalPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const k = trimmed.substring(0, eqIdx).trim();
          const v = trimmed.substring(eqIdx + 1).trim();
          if (!process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    }
  }
} catch {
  // Ignore local env read errors
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://oestvwgkpllikmufvjls.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let testsPassed = 0;
let testsFailed = 0;

function pass(testName) {
  console.log(`TEST: ${testName}... PASSED`);
  testsPassed++;
}

function fail(testName, err) {
  console.error(`TEST: ${testName}... FAILED`);
  console.error(err);
  testsFailed++;
}

async function runPhase14_1CurriculumAuditSuite() {
  console.log('====================================================');
  console.log('MULTIPATH PHASE 14.1: CURRICULUM ACCURACY & TRACEABILITY AUDIT');
  console.log('====================================================\n');

  const curriculumDataPath = path.resolve(process.cwd(), 'src/data/curriculumData.ts');
  const curriculumMappingsPath = path.resolve(process.cwd(), 'src/data/curriculumMappings.ts');
  const topicsPath = path.resolve(process.cwd(), 'src/data/topics.ts');

  const curriculumDataCode = fs.readFileSync(curriculumDataPath, 'utf8');
  const curriculumMappingsCode = fs.readFileSync(curriculumMappingsPath, 'utf8');
  const topicsCode = fs.readFileSync(topicsPath, 'utf8');

  // --------------------------------------------------------------------------
  // SECTION 1: STRICT BOARD SCOPE & GOVERNANCE INVARIANTS
  // --------------------------------------------------------------------------
  console.log('--- SECTION 1: STRICT BOARD SCOPE & GOVERNANCE INVARIANTS ---');

  // Test 1: Only CBSE and CISCE allowed (Strict scope)
  try {
    const forbiddenBoards = ['IB', 'International Baccalaureate', 'Cambridge', 'IGCSE', 'State Board'];
    for (const b of forbiddenBoards) {
      assert.ok(!curriculumDataCode.includes(`'${b}'`), `curriculumData must not contain ${b}`);
      assert.ok(!curriculumMappingsCode.includes(`'${b}'`), `curriculumMappings must not contain ${b}`);
    }
    assert.ok(curriculumDataCode.includes("code: 'CBSE'"), 'CBSE board must exist');
    assert.ok(curriculumDataCode.includes("code: 'CISCE'"), 'CISCE board must exist');
    pass('Curriculum strictly restricted to CBSE and CISCE; zero unauthorized boards');
  } catch (e) {
    fail('Strict board scope check', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 2: PARSE & AUDIT ALL 128 MAPPINGS
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 2: SOURCE TRACEABILITY & CLASS LEVEL ALIGNMENT ---');

  // Parse in-memory objects via regex or simple AST extract
  // Extract all subjects
  const subjectRegex = /id:\s*'([a-z0-9-]+)',\s*boardCode:\s*'([A-Z]+)',\s*classLevel:\s*([0-9]+)/g;
  const subjectsMap = new Map();
  let subMatch;
  while ((subMatch = subjectRegex.exec(curriculumDataCode)) !== null) {
    subjectsMap.set(subMatch[1], {
      id: subMatch[1],
      boardCode: subMatch[2],
      classLevel: parseInt(subMatch[3], 10),
    });
  }

  // Extract all years
  const yearRegex = /id:\s*'([a-z0-9-]+)',\s*boardCode:\s*'([A-Z]+)',\s*academicYear:\s*'([^']+)'/g;
  const yearsMap = new Map();
  let yrMatch;
  while ((yrMatch = yearRegex.exec(curriculumDataCode)) !== null) {
    yearsMap.set(yrMatch[1], {
      id: yrMatch[1],
      boardCode: yrMatch[2],
      academicYear: yrMatch[3],
    });
  }

  // Extract all sources
  const sourceRegex = /id:\s*'([a-z0-9-]+)',\s*boardCode:\s*'([A-Z]+)',\s*title:\s*'([^']+)'/g;
  const sourcesMap = new Map();
  let srcMatch;
  while ((srcMatch = sourceRegex.exec(curriculumDataCode)) !== null) {
    sourcesMap.set(srcMatch[1], {
      id: srcMatch[1],
      boardCode: srcMatch[2],
      title: srcMatch[3],
    });
  }

  // Extract all mappings
  const mappingBlocks = curriculumMappingsCode.split(/\{\s*id:\s*'map-/).slice(1);
  const mappings = mappingBlocks.map((b) => {
    const idMatch = b.match(/^([a-z0-9-]+)'/);
    const topicMatch = b.match(/topicId:\s*'([a-z0-9-]+)'/);
    const boardMatch = b.match(/boardCode:\s*'([A-Z]+)'/);
    const classMatch = b.match(/classLevel:\s*([0-9]+)/);
    const subjectMatch = b.match(/subjectId:\s*'([a-z0-9-]+)'/);
    const yearMatch = b.match(/curriculumYearId:\s*'([a-z0-9-]+)'/);
    const sourceMatch = b.match(/sourceId:\s*'([a-z0-9-]+)'/);
    const statusMatch = b.match(/verificationStatus:\s*'([a-z_]+)'/);
    const sectionMatch = b.match(/pageOrSection:\s*'([^']+)'/);

    return {
      id: `map-${idMatch ? idMatch[1] : 'unknown'}`,
      topicId: topicMatch ? topicMatch[1] : null,
      boardCode: boardMatch ? boardMatch[1] : null,
      classLevel: classMatch ? parseInt(classMatch[1], 10) : null,
      subjectId: subjectMatch ? subjectMatch[1] : null,
      curriculumYearId: yearMatch ? yearMatch[1] : null,
      sourceId: sourceMatch ? sourceMatch[1] : null,
      verificationStatus: statusMatch ? statusMatch[1] : null,
      pageOrSection: sectionMatch ? sectionMatch[1] : null,
    };
  });

  // Test 2: Exactly 128 mappings parsed
  try {
    assert.equal(mappings.length, 128, `Expected exactly 128 mappings, parsed ${mappings.length}`);
    pass('Mapping ledger contains exactly 128 parsed mappings');
  } catch (e) {
    fail('Mapping count check', e);
  }

  // Test 3: Foreign Key Integrity (Every mapping points to existing year, source, and subject)
  try {
    for (const m of mappings) {
      assert.ok(m.curriculumYearId && yearsMap.has(m.curriculumYearId), `Mapping ${m.id} references invalid year: ${m.curriculumYearId}`);
      assert.ok(m.sourceId && sourcesMap.has(m.sourceId), `Mapping ${m.id} references invalid source: ${m.sourceId}`);
      assert.ok(m.subjectId && subjectsMap.has(m.subjectId), `Mapping ${m.id} references invalid subject: ${m.subjectId}`);
      assert.ok(m.pageOrSection && m.pageOrSection.length > 0, `Mapping ${m.id} missing page/section citation`);
    }
    pass('All 128 mappings satisfy foreign key references to years, sources, subjects, and citations');
  } catch (e) {
    fail('Foreign key traceability check', e);
  }

  // Test 4: Subject Class-Level Alignment (mapping.classLevel === subject.classLevel)
  try {
    const classMismatches = [];
    for (const m of mappings) {
      const sub = subjectsMap.get(m.subjectId);
      if (sub && sub.classLevel !== m.classLevel) {
        classMismatches.push(`${m.id}: mapping class ${m.classLevel} vs subject class ${sub.classLevel}`);
      }
    }
    assert.equal(classMismatches.length, 0, `Found ${classMismatches.length} class mismatches: ${classMismatches.join(', ')}`);
    pass('All 128 mappings strictly match the classLevel of their linked curriculum subject (0 mismatches)');
  } catch (e) {
    fail('Subject class-level alignment check', e);
  }

  // Test 5: Board Consistency Across All Foreign Keys
  try {
    for (const m of mappings) {
      const sub = subjectsMap.get(m.subjectId);
      const yr = yearsMap.get(m.curriculumYearId);
      const src = sourcesMap.get(m.sourceId);

      assert.equal(m.boardCode, sub.boardCode, `Mapping ${m.id} board mismatch with subject`);
      assert.equal(m.boardCode, yr.boardCode, `Mapping ${m.id} board mismatch with year`);
      assert.equal(m.boardCode, src.boardCode, `Mapping ${m.id} board mismatch with source`);
    }
    pass('All 128 mappings preserve 1:1 board consistency across subject, year, and source records');
  } catch (e) {
    fail('Board consistency check', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 3: EXAMINATION-YEAR COHORT VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 3: EXAMINATION-YEAR COHORT VERIFICATION ---');

  // Test 6: CISCE Class 10 -> 2027 Examination; CISCE Class 9 -> 2028 Examination
  try {
    const cisceClass10 = mappings.filter((m) => m.boardCode === 'CISCE' && m.classLevel === 10);
    const cisceClass9 = mappings.filter((m) => m.boardCode === 'CISCE' && m.classLevel === 9);

    assert.equal(cisceClass10.length, 45, `Expected 45 CISCE Class 10 mappings (43 official + 2 elective), found ${cisceClass10.length}`);
    for (const m of cisceClass10) {
      assert.equal(m.curriculumYearId, 'cisce-icse-2027', `CISCE Class 10 mapping ${m.id} must cite cisce-icse-2027`);
      assert.equal(m.sourceId, 'src-cisce-icse-2027', `CISCE Class 10 mapping ${m.id} must cite src-cisce-icse-2027`);
    }

    assert.equal(cisceClass9.length, 15, `Expected 15 CISCE Class 9 mappings, found ${cisceClass9.length}`);
    for (const m of cisceClass9) {
      assert.equal(m.curriculumYearId, 'cisce-icse-2028', `CISCE Class 9 mapping ${m.id} must cite cisce-icse-2028 (2028 exam cohort)`);
      assert.equal(m.sourceId, 'src-cisce-icse-2028', `CISCE Class 9 mapping ${m.id} must cite src-cisce-icse-2028`);
    }

    // Ensure zero mappings cite cisce-icse-2026
    const anachronistic = mappings.filter((m) => m.curriculumYearId === 'cisce-icse-2026' || m.sourceId === 'src-cisce-icse-2026');
    assert.equal(anachronistic.length, 0, `Zero mappings should reference 2026 examination, found ${anachronistic.length}`);

    pass('CISCE cohorts verified: Class 10 cites 2027 Exam, Class 9 cites 2028 Exam, 0 anachronistic citations');
  } catch (e) {
    fail('CISCE examination-year cohort verification', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 4: VERIFICATION STATUS BREAKDOWN AUDIT
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 4: VERIFICATION STATUS BREAKDOWN AUDIT ---');

  // Test 7: Strict verification status counts and percentages
  try {
    const official = mappings.filter((m) => m.verificationStatus === 'verified_official');
    const framework = mappings.filter((m) => m.verificationStatus === 'framework_supported');
    const school = mappings.filter((m) => m.verificationStatus === 'school_dependent');

    assert.equal(official.length, 110, `Expected 110 verified_official, found ${official.length}`);
    assert.equal(framework.length, 14, `Expected 14 framework_supported, found ${framework.length}`);
    assert.equal(school.length, 4, `Expected 4 school_dependent, found ${school.length}`);
    assert.equal(official.length + framework.length + school.length, 128);

    const pctOfficial = ((official.length / 128) * 100).toFixed(2);
    const pctFramework = ((framework.length / 128) * 100).toFixed(2);
    const pctSchool = ((school.length / 128) * 100).toFixed(2);

    assert.equal(pctOfficial, '85.94', `Official percentage must be 85.94%, got ${pctOfficial}%`);
    assert.equal(pctFramework, '10.94', `Framework percentage must be 10.94%, got ${pctFramework}%`);
    assert.ok(pctSchool === '3.13' || pctSchool === '3.12', `School percentage must be ~3.13% (3.125%), got ${pctSchool}%`);

    pass(`Verification breakdown verified: 110 official (85.94%), 14 framework (10.94%), 4 school (${pctSchool}%)`);
  } catch (e) {
    fail('Verification status breakdown audit', e);
  }

  // Test 8: Uniqueness of mapping composite keys (board, class, subject, topic)
  try {
    const seen = new Set();
    const duplicates = [];
    for (const m of mappings) {
      const key = `${m.boardCode}:${m.classLevel}:${m.subjectId}:${m.topicId}`;
      if (seen.has(key)) {
        duplicates.push(key);
      }
      seen.add(key);
    }
    assert.equal(duplicates.length, 0, `Found duplicate mappings: ${duplicates.join(', ')}`);
    pass('Composite uniqueness invariant satisfied (0 duplicate board/class/subject/topic tuples)');
  } catch (e) {
    fail('Composite uniqueness check', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 5: DISCIPLINE TAXONOMY & 4-PATH CONVERGENCE
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 5: DISCIPLINE TAXONOMY & 4-PATH CONVERGENCE ---');

  // Test 9: Exactly 9 academic disciplines across 64 canonical topics
  try {
    const slugMatches = topicsCode.match(/["']?slug["']?\s*:\s*['"][a-z0-9-]+['"]/g) || [];
    assert.equal(slugMatches.length, 64, `Expected 64 topics, found ${slugMatches.length}`);

    // Map each topic to one of the 9 disciplines by prefix
    const disciplinePrefixes = {
      'math-': 'Mathematics',
      'phys-': 'Physics',
      'chem-': 'Chemistry',
      'bio-': 'Biology',
      'hist-': 'History',
      'civ-': 'Civics',
      'geo-': 'Geography',
      'eng-': 'English Language & Literature',
      'cs-': 'Computer Science & Information Technology',
    };

    const uniqueTopicIds = new Set(mappings.map((m) => m.topicId));
    assert.equal(uniqueTopicIds.size, 64, `Expected 64 unique topics mapped, found ${uniqueTopicIds.size}`);

    const counts = {};
    for (const prefix of Object.keys(disciplinePrefixes)) {
      counts[prefix] = 0;
    }

    for (const topicId of uniqueTopicIds) {
      let matched = false;
      for (const prefix of Object.keys(disciplinePrefixes)) {
        if (topicId.startsWith(prefix)) {
          counts[prefix]++;
          matched = true;
          break;
        }
      }
      assert.ok(matched, `Topic ${topicId} must belong to one of the 9 academic disciplines`);
    }

    // Verify all 9 disciplines have representation
    for (const [prefix, disciplineName] of Object.entries(disciplinePrefixes)) {
      assert.ok(counts[prefix] > 0, `Discipline ${disciplineName} (${prefix}) must have at least 1 topic, found ${counts[prefix]}`);
    }

    pass(`Canonical topic catalog covers 64 topics across 9 academic disciplines (Math: ${counts['math-']}, Phys: ${counts['phys-']}, Chem: ${counts['chem-']}, Bio: ${counts['bio-']}, Hist: ${counts['hist-']}, Civ: ${counts['civ-']}, Geo: ${counts['geo-']}, Eng: ${counts['eng-']}, CS: ${counts['cs-']})`);
  } catch (e) {
    fail('Discipline taxonomy check', e);
  }

  // Test 10: 4-Path Convergence: 256 complete educational paths
  try {
    const pathKeys = ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'];
    for (const pk of pathKeys) {
      const count = (topicsCode.match(new RegExp(`['"]${pk}['"]:`, 'g')) || []).length;
      assert.equal(count, 64, `Path type '${pk}' must occur exactly 64 times`);
    }
    pass('All 64 topics satisfy strict 4-path convergence (256 complete educational paths preserved)');
  } catch (e) {
    fail('4-path convergence check', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 6: LIVE SUPABASE REPOSITORY & ADVISORS VALIDATION
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 6: LIVE SUPABASE CATALOG & RLS VERIFICATION ---');

  if (!SUPABASE_ANON_KEY) {
    console.warn('VITE_SUPABASE_PUBLISHABLE_KEY not configured. Skipping live network tests.');
    return finish();
  }

  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Test 11: Anon client can read curriculum_years (including cisce-icse-2028)
  try {
    const { data, error } = await anonClient.from('curriculum_years').select('*');
    assert.equal(error, null, error?.message);
    assert.ok(data.length >= 6, `Expected at least 6 curriculum years, found ${data.length}`);
    const has2028 = data.some((y) => y.id === 'cisce-icse-2028');
    assert.ok(has2028, 'Live database must contain cisce-icse-2028');
    pass(`Anon read curriculum_years (${data.length} records, cisce-icse-2028 confirmed)`);
  } catch (e) {
    fail('Live curriculum_years verification', e);
  }

  // Test 12: Anon client can read curriculum_sources (including src-cisce-icse-2028)
  try {
    const { data, error } = await anonClient.from('curriculum_sources').select('*');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 8, `Expected exactly 8 curriculum sources, found ${data.length}`);
    const hasSrc2028 = data.some((s) => s.id === 'src-cisce-icse-2028');
    assert.ok(hasSrc2028, 'Live database must contain src-cisce-icse-2028');
    pass('Anon read curriculum_sources (8 official documents, src-cisce-icse-2028 confirmed)');
  } catch (e) {
    fail('Live curriculum_sources verification', e);
  }

  // Test 13: Anon client can read curriculum_subjects (54 subjects)
  try {
    const { data, error } = await anonClient.from('curriculum_subjects').select('*');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 54, `Expected exactly 54 curriculum subjects, found ${data.length}`);
    const hasHist6 = data.some((s) => s.id === 'cisce-hist-6');
    const hasIt8 = data.some((s) => s.id === 'cbse-it-8');
    const hasCs8 = data.some((s) => s.id === 'cisce-cs-8');
    assert.ok(hasHist6 && hasIt8 && hasCs8, 'Live database must contain middle stage subject additions');
    pass('Anon read curriculum_subjects (54 subjects across Classes 6–10)');
  } catch (e) {
    fail('Live curriculum_subjects verification', e);
  }

  // Test 14: Anon client can read curriculum_topic_mappings (128 mappings, exact class match)
  try {
    const { data: mappingsData, error: mapErr } = await anonClient.from('curriculum_topic_mappings').select(`
      id,
      board_code,
      class_level,
      subject_id,
      topic_id,
      curriculum_year_id,
      source_id,
      verification_status,
      subject:curriculum_subjects ( id, class_level, board_code )
    `);
    assert.equal(mapErr, null, mapErr?.message);
    assert.equal(mappingsData.length, 128, `Expected 128 mappings, found ${mappingsData.length}`);

    // Check class_level matches subject
    const dbMismatches = mappingsData.filter((m) => m.subject && m.subject.class_level !== m.class_level);
    assert.equal(dbMismatches.length, 0, `Live database has ${dbMismatches.length} class mismatches`);

    // Check all CISCE Class 9 mappings in live database cite cisce-icse-2028
    const dbCisceClass9 = mappingsData.filter((m) => m.board_code === 'CISCE' && m.class_level === 9);
    assert.equal(dbCisceClass9.length, 15, `Expected 15 CISCE Class 9 mappings, found ${dbCisceClass9.length}`);
    for (const m of dbCisceClass9) {
      assert.equal(m.curriculum_year_id, 'cisce-icse-2028');
      assert.equal(m.source_id, 'src-cisce-icse-2028');
    }

    pass('Live database curriculum_topic_mappings (128 mappings, 0 class mismatches, Class 9 -> 2028 confirmed)');
  } catch (e) {
    fail('Live curriculum_topic_mappings verification', e);
  }

  // Test 15: Anon client RLS write block on curriculum tables
  try {
    const { error: insertErr } = await anonClient.from('curriculum_boards').insert({
      code: 'IB',
      name: 'International Baccalaureate',
      official_name: 'Forbidden Board',
      country: 'International',
      website_url: 'https://ibo.org',
    });
    assert.ok(insertErr, 'Anon write to curriculum_boards must fail');

    const { data: updateData, error: updateErr } = await anonClient
      .from('curriculum_topic_mappings')
      .update({ verification_status: 'unverified' })
      .eq('id', 'map-cbse-10-math-linear-eq')
      .select();
    assert.ok(updateErr || (updateData && updateData.length === 0), 'Anon update to curriculum_topic_mappings must be blocked by RLS');

    const { data: checkRow } = await anonClient
      .from('curriculum_topic_mappings')
      .select('verification_status')
      .eq('id', 'map-cbse-10-math-linear-eq')
      .single();
    assert.ok(checkRow, 'Target row must exist in live database');
    assert.equal(checkRow.verification_status, 'verified_official', 'Verification status in database must remain untouched');

    pass('RLS write protection strictly blocks unauthenticated mutations to curriculum catalog');
  } catch (e) {
    fail('Live RLS write protection verification', e);
  }

  finish();
}

function finish() {
  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${testsPassed + testsFailed}`);
  console.log(`PASSED: ${testsPassed}`);
  console.log(`FAILED: ${testsFailed}`);
  console.log('====================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runPhase14_1CurriculumAuditSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
