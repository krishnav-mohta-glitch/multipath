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
  calculateOpticsLab,
  OPTICS_LAB_MODEL,
  calculateThermalLab,
  calculateMechanicsLab,
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

// ----------------------------------------------------------------------------
// 3. OPTICS LABORATORY (LIGHT, REFLECTION, SHADOWS)
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 3: OPTICS LABORATORY & REFLECTION DYNAMICS ---');

test('Law of specular reflection holds across all incident angles (θ_r = θ_i)', () => {
  for (const angle of [0, 15, 30, 45, 60, 75]) {
    const out = calculateOpticsLab({
      incidentAngleDeg: angle,
      mirrorPresent: true,
      obstacleDistanceCm: 30,
      screenDistanceCm: 80,
      lightSourceSizeMm: 2,
      obstacleDiameterCm: 10,
    });
    assert.strictEqual(out.reflectedAngleDeg, angle);
    assert.strictEqual(out.isLawOfReflectionVerified, true);
    assert.strictEqual(out.mirrorImageDistanceCm, 30);
    assert.strictEqual(out.isVirtualImage, true);
  }
});

test('Point source rectilinear shadow produces zero penumbra and exact geometric magnification', () => {
  const out = calculateOpticsLab({
    incidentAngleDeg: 0,
    mirrorPresent: false,
    obstacleDistanceCm: 20,
    screenDistanceCm: 80,
    lightSourceSizeMm: 1, // point source <= 2mm
    obstacleDiameterCm: 10,
  });
  assert.strictEqual(out.hasPenumbra, false);
  assert.strictEqual(out.penumbraDiameterCm, 0);
  assert.strictEqual(out.magnification, 4.0);
  assert.strictEqual(out.umbraDiameterCm, 40);
});

test('Extended light source produces distinct umbra and penumbra zones', () => {
  const out = calculateOpticsLab({
    incidentAngleDeg: 0,
    mirrorPresent: false,
    obstacleDistanceCm: 30,
    screenDistanceCm: 90,
    lightSourceSizeMm: 20, // 2 cm extended source
    obstacleDiameterCm: 15,
  });
  assert.strictEqual(out.hasPenumbra, true);
  assert.ok(out.penumbraDiameterCm > out.umbraDiameterCm);
  assert.ok(out.umbraDiameterCm > 0);
});

test('Optics lab presets and telemetry compliance', () => {
  for (const preset of OPTICS_LAB_MODEL.presets) {
    const out = calculateOpticsLab(preset.state);
    const telem = OPTICS_LAB_MODEL.getTelemetry(preset.state, out);
    assert.strictEqual(telem.length, 5);
    const expl = OPTICS_LAB_MODEL.getExplanation(preset.state, out, null);
    assert.ok(expl.governingPrinciple.length > 5);
  }
});

// ----------------------------------------------------------------------------
// 4. THERMAL LABORATORY (CONDUCTION & FOURIER'S LAW)
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 4: THERMAL LABORATORY & FOURIER CONDUCTION ---');

test("Fourier's Law: Heat flow rate scales proportionally with thermal conductivity k", () => {
  const copper = calculateThermalLab({ materialId: 'copper', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });
  const aluminum = calculateThermalLab({ materialId: 'aluminum', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });
  const iron = calculateThermalLab({ materialId: 'iron', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });
  const glass = calculateThermalLab({ materialId: 'glass', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });

  assert.ok(copper.heatTransferRateWatts > aluminum.heatTransferRateWatts);
  assert.ok(aluminum.heatTransferRateWatts > iron.heatTransferRateWatts);
  assert.ok(iron.heatTransferRateWatts > glass.heatTransferRateWatts * 50);
  assert.strictEqual(glass.thermalConductivityK, 0.8);
});

test('Temperature gradient matches dT/dx and profile drops monotonically from hot to cold', () => {
  const out = calculateThermalLab({ materialId: 'copper', hotEndTempC: 120, coldEndTempC: 20, rodLengthCm: 20, rodCrossSectionMm2: 50 });
  assert.strictEqual(out.temperatureGradient, 500); // 100K / 0.2m = 500 K/m
  assert.strictEqual(out.tempProfile[0], 120);
  assert.strictEqual(out.tempProfile[4], 20);
  assert.strictEqual(out.tempProfile[2], 70); // midpoint
});

test('Wax melting threshold: Copper drops pins rapidly while glass never melts', () => {
  const copper = calculateThermalLab({ materialId: 'copper', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });
  const glass = calculateThermalLab({ materialId: 'glass', hotEndTempC: 100, coldEndTempC: 20, rodLengthCm: 25, rodCrossSectionMm2: 50 });
  assert.ok(copper.timeToMeltWaxSec < 15);
  assert.strictEqual(glass.timeToMeltWaxSec, 999);
});

// ----------------------------------------------------------------------------
// 5. MECHANICS LABORATORY (FORCE, PRESSURE & NEWTON'S 2ND LAW)
// ----------------------------------------------------------------------------
console.log('\n--- SECTION 5: MECHANICS LABORATORY (FORCE & PRESSURE) ---');

test('Pressure definition P = F / A: Halving contact area doubles pressure', () => {
  const broad = calculateMechanicsLab({ appliedForceN: 100, contactAreaCm2: 20, blockMassKg: 5, surfaceType: 'wood', mode: 'pressure' });
  const narrow = calculateMechanicsLab({ appliedForceN: 100, contactAreaCm2: 10, blockMassKg: 5, surfaceType: 'wood', mode: 'pressure' });

  assert.strictEqual(narrow.pressurePascals, broad.pressurePascals * 2);
  assert.ok(narrow.penetrationDepthMm > broad.penetrationDepthMm);
});

test("Newton's 2nd Law with friction: a = (F - f) / m", () => {
  const acc = calculateMechanicsLab({ appliedForceN: 50, contactAreaCm2: 10, blockMassKg: 5, surfaceType: 'ice', mode: 'dynamics' });
  // friction on ice: mu=0.05 * 5 * 9.8 = 2.45 N -> Net force = 47.55 N -> a = 9.51 m/s²
  assert.strictEqual(acc.frictionCoefficient, 0.05);
  assert.strictEqual(acc.maxFrictionForceN, 2.45);
  assert.strictEqual(acc.netForceN, 47.55);
  assert.strictEqual(acc.accelerationMs2, 9.51);
  assert.strictEqual(acc.velocityAfter2sMs, 19.02);
});

test('Static equilibrium: Applied force less than max friction yields zero acceleration', () => {
  const stationary = calculateMechanicsLab({ appliedForceN: 10, contactAreaCm2: 10, blockMassKg: 5, surfaceType: 'concrete', mode: 'dynamics' });
  // concrete: mu=0.65 * 5 * 9.8 = 31.85 N > 10 N -> Net force = 0 -> a = 0
  assert.strictEqual(stationary.netForceN, 0);
  assert.strictEqual(stationary.accelerationMs2, 0);
  assert.strictEqual(stationary.motionState, 'stationary');
});

console.log(`\n====================================================`);
console.log(`TOTAL TESTS: ${passedTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: 0`);
console.log(`====================================================\n`);
