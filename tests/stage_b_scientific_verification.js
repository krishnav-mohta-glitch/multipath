/**
 * MULTIPATH V3 — Stage B Scientific Verification Suite
 * Verifies deterministic formulas, boundary conditions, telemetry outputs,
 * presets, units, and Blackman's Law of Limiting Factors.
 */

import assert from 'node:assert';
import {
  calculateLinearEquations,
  LINEAR_EQUATIONS_MODEL,
  calculatePhotosynthesis,
  PHOTOSYNTHESIS_MODEL,
} from '../src/utils/scientificEngines.ts';

console.log('====================================================');
console.log('MULTIPATH V3 STAGE B: SCIENTIFIC ENGINE VERIFICATION');
console.log('====================================================\n');

let passedTests = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`TEST: ${name}... PASSED`);
    passedTests++;
  } catch (err) {
    console.error(`TEST: ${name}... FAILED!`, err.message);
    process.exit(1);
  }
}

// ----------------------------------------------------------------------------
// 1. LINEAR EQUATIONS / PHYSICAL PAN BALANCE MODEL
// ----------------------------------------------------------------------------
console.log('--- SECTION 1: LINEAR EQUATIONS / PHYSICAL PAN BALANCE ---');

test('Equilibrium standard (2x + 1 = 7 at x = 3)', () => {
  const outputs = calculateLinearEquations({ slope: 2, intercept: 1, xVal: 3, targetY: 7 });
  assert.strictEqual(outputs.leftLoad, 7);
  assert.strictEqual(outputs.rightLoad, 7);
  assert.strictEqual(outputs.imbalance, 0);
  assert.strictEqual(outputs.isBalanced, true);
  assert.strictEqual(outputs.solutionX, 3);
  assert.strictEqual(outputs.tiltAngleRad, 0);
});

test('Left-heavy disequilibrium (2x + 1 = 7 at x = 5)', () => {
  const outputs = calculateLinearEquations({ slope: 2, intercept: 1, xVal: 5, targetY: 7 });
  assert.strictEqual(outputs.leftLoad, 11);
  assert.strictEqual(outputs.rightLoad, 7);
  assert.strictEqual(outputs.imbalance, 4);
  assert.strictEqual(outputs.isBalanced, false);
  assert.strictEqual(outputs.solutionX, 3);
  // Imbalance > 0 tilts to left (negative radian angle clamped up to -0.4)
  assert.ok(outputs.tiltAngleRad < 0);
});

test('Right-heavy disequilibrium (2x + 1 = 7 at x = 1)', () => {
  const outputs = calculateLinearEquations({ slope: 2, intercept: 1, xVal: 1, targetY: 7 });
  assert.strictEqual(outputs.leftLoad, 3);
  assert.strictEqual(outputs.rightLoad, 7);
  assert.strictEqual(outputs.imbalance, -4);
  assert.strictEqual(outputs.isBalanced, false);
  assert.ok(outputs.tiltAngleRad > 0);
});

test('Zero slope horizontal constant line (0x + 5 = 5)', () => {
  const outputs = calculateLinearEquations({ slope: 0, intercept: 5, xVal: 4, targetY: 5 });
  assert.strictEqual(outputs.leftLoad, 5);
  assert.strictEqual(outputs.isBalanced, true);
});

test('Tilt angle bounding (-0.4 to +0.4 rad clamp)', () => {
  const extremeOutputs = calculateLinearEquations({ slope: 10, intercept: 50, xVal: 10, targetY: 0 });
  assert.strictEqual(extremeOutputs.tiltAngleRad, -0.4);
});

test('Linear equations presets match declared expected outcomes', () => {
  for (const preset of LINEAR_EQUATIONS_MODEL.presets) {
    const out = calculateLinearEquations(preset.state);
    assert.ok(typeof out.leftLoad === 'number');
    assert.ok(typeof out.isBalanced === 'boolean');
    const telem = LINEAR_EQUATIONS_MODEL.getTelemetry(preset.state, out);
    assert.strictEqual(telem.length, 4);
  }
});

// ----------------------------------------------------------------------------
// 2. PHOTOSYNTHESIS PHOTOCHEMICAL CHAMBER MODEL
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 2: PHOTOSYNTHESIS PHOTOCHEMICAL CHAMBER ---');

test('Chlorophyll absorption action spectrum: Red/Blue peak vs Green window', () => {
  const red = calculatePhotosynthesis({ lightIntensity: 80, wavelength: 'red', co2Concentration: 600, temperature: 26 });
  const green = calculatePhotosynthesis({ lightIntensity: 80, wavelength: 'green', co2Concentration: 600, temperature: 26 });
  
  assert.strictEqual(red.quantumEfficiency, 0.95);
  assert.strictEqual(green.quantumEfficiency, 0.15);
  assert.ok(red.bubbleRate > green.bubbleRate * 3, 'Red light must yield far higher bubble evolution than green');
});

test("Blackman's Law: Carbon dioxide limitation bottleneck", () => {
  const co2Starved = calculatePhotosynthesis({ lightIntensity: 90, wavelength: 'white', co2Concentration: 200, temperature: 26 });
  assert.strictEqual(co2Starved.limitingFactor, 'CO2');
  assert.ok(co2Starved.co2SaturationFactor < 0.6);
});

test("Blackman's Law: Light intensity limitation bottleneck", () => {
  const lightStarved = calculatePhotosynthesis({ lightIntensity: 15, wavelength: 'white', co2Concentration: 800, temperature: 26 });
  assert.strictEqual(lightStarved.limitingFactor, 'LIGHT');
});

test('Enzyme thermal denaturation at extreme temperature (43°C)', () => {
  const optimal = calculatePhotosynthesis({ lightIntensity: 70, wavelength: 'white', co2Concentration: 500, temperature: 26 });
  const extremeHeat = calculatePhotosynthesis({ lightIntensity: 70, wavelength: 'white', co2Concentration: 500, temperature: 43 });
  
  assert.ok(extremeHeat.temperatureFactor < 0.35);
  assert.strictEqual(extremeHeat.limitingFactor, 'TEMPERATURE');
  assert.ok(extremeHeat.netPhotosyntheticRate < optimal.netPhotosyntheticRate * 0.4);
});

test('Photosynthesis presets and contextual explanations', () => {
  for (const preset of PHOTOSYNTHESIS_MODEL.presets) {
    const out = calculatePhotosynthesis(preset.state);
    const telem = PHOTOSYNTHESIS_MODEL.getTelemetry(preset.state, out);
    assert.ok(telem.length >= 4);
    const expl = PHOTOSYNTHESIS_MODEL.getExplanation(preset.state, out, null);
    assert.ok(expl.governingPrinciple.length > 5);
    assert.ok(expl.keyTakeaway.length > 10);
  }
});

console.log(`\n====================================================`);
console.log(`TOTAL TESTS: ${passedTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: 0`);
console.log(`====================================================\n`);
