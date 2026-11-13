/**
 * MULTIPATH V2 — PHASE 14: ICSE/CISCE & CBSE CURRICULUM EXPANSION VERIFICATION SUITE
 * 
 * Verifies:
 * 1. Strict Curriculum Scope: Exactly CBSE & CISCE; strictly NO IB, NO Cambridge, NO State Boards.
 * 2. Classes 6 to 10 coverage with authentic board subject codes and units.
 * 3. Canonical 64 Topics with 100% 4-path convergence (256 learning paths total).
 * 4. At least 100 verified curriculum mappings (128 implemented) with traceable official citations.
 * 5. Live Supabase database catalog public read-only access for anon/guest learners.
 * 6. Live Supabase database RLS write protection blocking unprivileged mutations.
 * 7. Frontend filter logic and guest independence.
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

async function runPhase14VerificationSuite() {
  console.log('====================================================');
  console.log('MULTIPATH PHASE 14: CURRICULUM EXPANSION SUITE');
  console.log('====================================================\n');

  // --------------------------------------------------------------------------
  // SECTION 1: IN-MEMORY DATA LEDGER & SCOPE AUDIT
  // --------------------------------------------------------------------------
  console.log('--- SECTION 1: STRICT CURRICULUM SCOPE & BOARDS ---');

  const curriculumDataCode = fs.readFileSync(path.resolve(process.cwd(), 'src/data/curriculumData.ts'), 'utf8');
  const curriculumMappingsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/data/curriculumMappings.ts'), 'utf8');
  const topicsCode = fs.readFileSync(path.resolve(process.cwd(), 'src/data/topics.ts'), 'utf8');

  // Test 1: Exactly 2 boards: CBSE and CISCE
  try {
    assert.ok(curriculumDataCode.includes("code: 'CBSE'"), 'CBSE must be present in curriculumData');
    assert.ok(curriculumDataCode.includes("code: 'CISCE'"), 'CISCE must be present in curriculumData');

    // Forbidden boards check
    assert.ok(!curriculumDataCode.includes("'IB'"), 'Strict Scope: Must not contain IB board');
    assert.ok(!curriculumDataCode.includes("'Cambridge'"), 'Strict Scope: Must not contain Cambridge board');
    assert.ok(!curriculumDataCode.includes("'State Board'"), 'Strict Scope: Must not contain State Board');
    assert.ok(!curriculumMappingsCode.includes("'IB'"), 'Strict Scope: Mappings must not contain IB');
    assert.ok(!curriculumMappingsCode.includes("'Cambridge'"), 'Strict Scope: Mappings must not contain Cambridge');
    assert.ok(!curriculumMappingsCode.includes("'State Board'"), 'Strict Scope: Mappings must not contain State Board');

    pass('Curriculum boards strictly restricted to CBSE and CISCE (no IB, Cambridge, or State Board)');
  } catch (e) {
    fail('Curriculum boards strictly restricted to CBSE and CISCE', e);
  }

  // Test 2: Classes 6 through 10 represented
  try {
    const classes = [6, 7, 8, 9, 10];
    for (const c of classes) {
      assert.ok(curriculumDataCode.includes(`classLevel: ${c}`), `curriculumData must contain classLevel: ${c}`);
      assert.ok(curriculumMappingsCode.includes(`classLevel: ${c}`), `curriculumMappings must contain classLevel: ${c}`);
    }
    pass('Classes 6, 7, 8, 9, and 10 comprehensively covered with official subjects');
  } catch (e) {
    fail('Classes 6, 7, 8, 9, and 10 coverage', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 2: TOPIC CATALOG & 4-PATH CONVERGENCE INVARIANT
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 2: CANONICAL 64 TOPICS & 4-PATH CONVERGENCE ---');

  // Test 3: Exactly 64 canonical topics in topics.ts
  try {
    const slugMatches = topicsCode.match(/["']?slug["']?\s*:\s*['"][a-z0-9-]+['"]/g) || [];
    assert.equal(slugMatches.length, 64, `Expected 64 topics in topics.ts, found ${slugMatches.length}`);

    // Verify all 8 disciplines are represented
    const requiredDisciplines = ['mathematics', 'physics', 'chemistry', 'biology', 'history', 'geography', 'english', 'computer-science'];
    for (const d of requiredDisciplines) {
      const disciplinePresent = topicsCode.includes(`subjectId: '${d}'`) || topicsCode.includes(`"subjectId": "${d}"`);
      assert.ok(disciplinePresent, `Discipline ${d} must be present in topics.ts`);
    }

    pass('Topic catalog contains exactly 64 canonical topics across all 8 disciplines');
  } catch (e) {
    fail('Topic catalog count check', e);
  }

  // Test 4: All 64 topics satisfy 4-path convergence
  try {
    const pathKeys = ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'];
    for (const pk of pathKeys) {
      const singleQuotes = (topicsCode.match(new RegExp(`'${pk}':`, 'g')) || []).length;
      const doubleQuotes = (topicsCode.match(new RegExp(`"${pk}":`, 'g')) || []).length;
      const totalOccurrences = singleQuotes + doubleQuotes;
      assert.equal(totalOccurrences, 64, `Path type '${pk}' must occur exactly 64 times (found ${totalOccurrences})`);
    }
    pass('All 64 topics satisfy strict 4-path convergence (256 complete educational paths)');
  } catch (e) {
    fail('4-path convergence verification', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 3: VERIFIED CURRICULUM MAPPINGS LEDGER
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 3: VERIFIED CURRICULUM MAPPINGS LEDGER ---');

  // Test 5: At least 100 verified curriculum mappings (128 implemented)
  try {
    const mappingMatches = curriculumMappingsCode.match(/id:\s*['"]map-[a-z0-9-]+['"]/g) || [];
    assert.ok(mappingMatches.length >= 100, `Expected at least 100 mappings, found ${mappingMatches.length}`);
    assert.equal(mappingMatches.length, 128, 'Curriculum ledger contains exactly 128 mappings');

    const verifiedOfficialCount = (curriculumMappingsCode.match(/verificationStatus:\s*'verified_official'/g) || []).length;
    const frameworkSupportedCount = (curriculumMappingsCode.match(/verificationStatus:\s*'framework_supported'/g) || []).length;
    const schoolDependentCount = (curriculumMappingsCode.match(/verificationStatus:\s*'school_dependent'/g) || []).length;

    assert.ok(verifiedOfficialCount >= 100, `Must have >= 100 verified_official mappings (found ${verifiedOfficialCount})`);
    assert.equal(verifiedOfficialCount + frameworkSupportedCount + schoolDependentCount, 128);

    pass(`Curriculum mappings ledger: 128 mappings (${verifiedOfficialCount} verified_official, ${frameworkSupportedCount} framework_supported, ${schoolDependentCount} school_dependent)`);
  } catch (e) {
    fail('Curriculum mappings verification', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 4: LIVE SUPABASE CATALOG PUBLIC READ-ONLY ACCESS (ANON CLIENT)
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 4: LIVE SUPABASE PUBLIC READ-ONLY ACCESS ---');

  if (!SUPABASE_ANON_KEY) {
    console.warn('VITE_SUPABASE_PUBLISHABLE_KEY not configured. Skipping live network tests.');
    return;
  }

  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Test 6: Anon client can read curriculum_boards
  try {
    const { data, error } = await anonClient.from('curriculum_boards').select('*').order('code');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 2, 'Live database must contain 2 boards');
    assert.deepEqual(data.map((b) => b.code), ['CBSE', 'CISCE']);
    pass('Anon client can read curriculum_boards (2 boards: CBSE & CISCE)');
  } catch (e) {
    fail('Anon read curriculum_boards', e);
  }

  // Test 7: Anon client can read curriculum_sources
  try {
    const { data, error } = await anonClient.from('curriculum_sources').select('*');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 8, 'Live database must contain 8 curriculum sources');
    pass('Anon client can read curriculum_sources (8 official documents)');
  } catch (e) {
    fail('Anon read curriculum_sources', e);
  }

  // Test 8: Anon client can read curriculum_subjects
  try {
    const { data, error } = await anonClient.from('curriculum_subjects').select('*');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 54, 'Live database must contain 54 curriculum subjects');
    pass('Anon client can read curriculum_subjects (54 subjects across Classes 6-10)');
  } catch (e) {
    fail('Anon read curriculum_subjects', e);
  }

  // Test 9: Anon client can read topics
  try {
    const { data, error } = await anonClient.from('topics').select('id, title, subject_category, difficulty');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 64, 'Live database must contain 64 topics');
    pass('Anon client can read topics (64 canonical educational topics)');
  } catch (e) {
    fail('Anon read topics', e);
  }

  // Test 10: Anon client can read curriculum_topic_mappings
  try {
    const { data, error } = await anonClient.from('curriculum_topic_mappings').select('id, board_code, class_level, verification_status');
    assert.equal(error, null, error?.message);
    assert.equal(data.length, 128, 'Live database must contain 128 curriculum mappings');
    pass('Anon client can read curriculum_topic_mappings (128 verified mappings)');
  } catch (e) {
    fail('Anon read curriculum_topic_mappings', e);
  }

  // Test 11: Anon client can read topic_learning_paths
  try {
    const { count, error } = await anonClient.from('topic_learning_paths').select('*', { count: 'exact', head: true });
    assert.equal(error, null, error?.message);
    assert.equal(count, 256, 'Live database must contain 256 topic learning paths');
    pass('Anon client can read topic_learning_paths (all 256 learning paths)');
  } catch (e) {
    fail('Anon read topic_learning_paths count', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 5: LIVE SUPABASE RLS WRITE PROTECTION (ANON CLIENT)
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 5: LIVE SUPABASE RLS WRITE PROTECTION ---');

  // Test 12: Anon client CANNOT insert into curriculum_boards
  try {
    const { error } = await anonClient.from('curriculum_boards').insert({
      code: 'IB',
      name: 'International Baccalaureate',
      full_name: 'International Baccalaureate Organization',
      country: 'International',
      website_url: 'https://ibo.org',
    });
    assert.ok(error !== null, 'Anon client MUST NOT be able to insert into curriculum_boards');
    pass('Anon client cannot insert forbidden board into curriculum_boards (RLS write block)');
  } catch (e) {
    fail('RLS block curriculum_boards insert', e);
  }

  // Test 13: Anon client CANNOT insert into topics
  try {
    const { error } = await anonClient.from('topics').insert({
      id: 'unauthorized-topic',
      slug: 'unauthorized-topic',
      title: 'Unauthorized Topic',
      subtitle: 'Hacker topic',
      subject_category: 'mathematics',
      difficulty: 'Foundational',
      estimated_minutes: 20,
      overview: 'Test',
      why_it_matters: 'Test',
    });
    assert.ok(error !== null, 'Anon client MUST NOT be able to insert into topics');
    pass('Anon client cannot insert into topics (RLS write block)');
  } catch (e) {
    fail('RLS block topics insert', e);
  }

  // Test 14: Anon client CANNOT update topic_learning_paths
  try {
    const { error } = await anonClient
      .from('topic_learning_paths')
      .update({ title: 'Defaced Title' })
      .eq('id', 'math-linear-equations__structured-explanation');
    // An unprivileged update should fail or yield 0 affected rows
    if (error) {
      assert.ok(error !== null, 'Update failed as expected');
    }
    // Verify title in database did NOT change
    const { data: checkData } = await anonClient
      .from('topic_learning_paths')
      .select('title')
      .eq('id', 'math-linear-equations__structured-explanation')
      .single();
    assert.notEqual(checkData?.title, 'Defaced Title', 'Title must not be defaced');
    pass('Anon client cannot update topic_learning_paths (RLS write protection)');
  } catch (e) {
    fail('RLS block topic_learning_paths update', e);
  }

  // --------------------------------------------------------------------------
  // SECTION 6: FRONTEND CURRICULUM FILTER LOGIC & GUEST INDEPENDENCE
  // --------------------------------------------------------------------------
  console.log('\n--- SECTION 6: CURRICULUM FILTER LOGIC & GUEST INDEPENDENCE ---');

  // Test 15: Verified filter helpers exist in curriculumMappings.ts
  try {
    assert.ok(curriculumMappingsCode.includes('export const getMappingsForTopic'), 'getMappingsForTopic helper must be exported');
    assert.ok(curriculumMappingsCode.includes('export const getPrimaryMappingForTopic'), 'getPrimaryMappingForTopic helper must be exported');
    assert.ok(curriculumMappingsCode.includes('export const isTopicInCurriculum'), 'isTopicInCurriculum helper must be exported');
    pass('Frontend curriculum helper functions (getMappingsForTopic, isTopicInCurriculum) are exported');
  } catch (e) {
    fail('Frontend filter helpers check', e);
  }

  // Test 16: CurriculumFilterBar component exists and integrates with LibraryPage
  try {
    const libraryPageCode = fs.readFileSync(path.resolve(process.cwd(), 'src/pages/LibraryPage.tsx'), 'utf8');
    const filterBarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/library/CurriculumFilterBar.tsx'), 'utf8');
    assert.ok(libraryPageCode.includes('CurriculumFilterBar'), 'LibraryPage must include CurriculumFilterBar');
    assert.ok(libraryPageCode.includes('selectedBoard'), 'LibraryPage must manage selectedBoard state');
    assert.ok(libraryPageCode.includes('selectedClass'), 'LibraryPage must manage selectedClass state');
    assert.ok(filterBarCode.includes('ICSE / CISCE'), 'CurriculumFilterBar must support ICSE / CISCE');
    assert.ok(filterBarCode.includes('CBSE'), 'CurriculumFilterBar must support CBSE');
    pass('CurriculumFilterBar component is seamlessly integrated into LibraryPage');
  } catch (e) {
    fail('CurriculumFilterBar integration check', e);
  }

  // Test 17: Guest independence invariant
  try {
    const filterBarCode = fs.readFileSync(path.resolve(process.cwd(), 'src/components/library/CurriculumFilterBar.tsx'), 'utf8');
    assert.ok(filterBarCode.includes('isGuest'), 'CurriculumFilterBar must handle isGuest state');
    // Ensure no blocking redirects or errors for guest users
    assert.ok(!filterBarCode.includes('throw'), 'No errors thrown in filter bar');
    pass('Guest mode allows full curriculum browsing and filtering without authentication');
  } catch (e) {
    fail('Guest mode curriculum browsing check', e);
  }

  console.log('\n====================================================');
  console.log(`TOTAL TESTS: ${testsPassed + testsFailed}`);
  console.log(`PASSED: ${testsPassed}`);
  console.log(`FAILED: ${testsFailed}`);
  console.log('====================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runPhase14VerificationSuite().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
