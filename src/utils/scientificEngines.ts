/**
 * MULTIPATH V3 — Deterministic Scientific Engines & Models
 * Stage B: Interactive Scientific Learning Workspace Transformation
 *
 * Implements deterministic scientific computations for:
 * 1. Linear Equations / Dynamic Balance Model (Physical Conservation of Equality)
 * 2. Photosynthesis Photochemical Reaction Chamber (Blackman's Law & Action Spectrum)
 */

import type {
  LinearEquationsState,
  LinearEquationsOutputs,
  PhotosynthesisState,
  PhotosynthesisOutputs,
  OpticsLabState,
  OpticsLabOutputs,
  ThermalLabState,
  ThermalLabOutputs,
  ThermalMaterialId,
  MechanicsLabState,
  MechanicsLabOutputs,
  SurfaceMaterialId,
  ScientificModelDefinition,
} from '../types/scientificModel';

// ============================================================================
// 1. LINEAR EQUATIONS / CONSERVATION OF EQUALITY PHYSICAL MODEL
// ============================================================================

export function calculateLinearEquations(state: LinearEquationsState): LinearEquationsOutputs {
  const leftLoad = state.slope * state.xVal + state.intercept;
  const rightLoad = state.targetY;
  const rawImbalance = leftLoad - rightLoad;
  const imbalance = Math.abs(rawImbalance) < 0.00001 ? 0 : rawImbalance;
  
  // Max tilt angle ~ 23 degrees (0.4 rad)
  const rawTilt = Math.max(-0.4, Math.min(0.4, -imbalance * 0.08));
  const tiltAngleRad = Math.abs(rawTilt) < 0.00001 ? 0 : rawTilt;
  const isBalanced = Math.abs(imbalance) < 0.001;

  let solutionX: number | null = null;
  if (Math.abs(state.slope) > 0.0001) {
    solutionX = Number(((state.targetY - state.intercept) / state.slope).toFixed(3));
  } else if (Math.abs(state.intercept - state.targetY) < 0.001) {
    // 0x + c = targetY -> infinite solutions (tautology)
    solutionX = state.xVal;
  }

  return {
    leftLoad: Number(leftLoad.toFixed(2)),
    rightLoad: Number(rightLoad.toFixed(2)),
    imbalance: Number(imbalance.toFixed(2)),
    tiltAngleRad,
    isBalanced,
    solutionX,
    rateOfChange: state.slope,
  };
}

export const LINEAR_EQUATIONS_MODEL: ScientificModelDefinition<LinearEquationsState, LinearEquationsOutputs> = {
  id: 'linear-equations',
  name: 'Conservation of Equality Pan Balance',
  discipline: 'Mathematics & Mechanics',
  curriculumTopicId: 'math-linear-eq-1',
  overview:
    'An algebraic equation is fundamentally a physical law of balance. The equals sign (=) represents the fulcrum of a pan balance. The left side (mx + c) and the right side (y) must exert equal gravitational moments for equilibrium to exist.',
  initialState: {
    slope: 2,
    intercept: 1,
    xVal: 3,
    targetY: 7,
  },
  variables: [
    {
      id: 'slope',
      name: 'Slope / Unit Rate',
      symbol: 'm',
      unit: 'kg/unit',
      min: -5,
      max: 5,
      step: 0.5,
      defaultValue: 2,
      description: 'The rate of change; physically represents the mass added per unit increase of x.',
      scientificMeaning: 'Determines the gradient of the line on a Cartesian plane and the sensitivity of the left pan to variations in x.',
    },
    {
      id: 'intercept',
      name: 'Y-Intercept / Tare Offset',
      symbol: 'c',
      unit: 'kg',
      min: -8,
      max: 8,
      step: 1,
      defaultValue: 1,
      description: 'Initial constant offset on the left pan before any variable x is introduced.',
      scientificMeaning: 'Represents initial conditions or tare weight at x = 0.',
    },
    {
      id: 'xVal',
      name: 'Input Quantity',
      symbol: 'x',
      unit: 'units',
      min: -5,
      max: 8,
      step: 1,
      defaultValue: 3,
      description: 'The independent variable input loaded onto the left-hand scale.',
      scientificMeaning: 'The variable operand whose value determines the total left-hand moment.',
    },
    {
      id: 'targetY',
      name: 'Counterweight / Output',
      symbol: 'y',
      unit: 'kg',
      min: -10,
      max: 20,
      step: 1,
      defaultValue: 7,
      description: 'The target load placed on the right pan.',
      scientificMeaning: 'The dependent target magnitude that balances the algebraic expression.',
    },
  ],
  components: [
    {
      id: 'fulcrum',
      name: 'Central Fulcrum (= Sign)',
      scientificRole: 'Zero-Moment Pivot Point',
      description: 'The mathematical equals sign. Distributes gravitational torque equally between opposing arms.',
      relatedVariables: ['targetY'],
    },
    {
      id: 'crossbeam',
      name: 'Torque Crossbeam',
      scientificRole: 'Moment Arm Transducer',
      description: 'Rigid bar displaying dynamic angular displacement based on net torque Δ = (mx + c) - y.',
      relatedVariables: ['slope', 'xVal', 'intercept'],
    },
    {
      id: 'left_pan',
      name: 'Left Pan (Expression mx + c)',
      scientificRole: 'Variable Load Carrier',
      description: 'Houses the variable tokens (m × x) plus constant tare blocks (c). Total mass = mx + c.',
      relatedVariables: ['slope', 'intercept', 'xVal'],
    },
    {
      id: 'right_pan',
      name: 'Right Pan (Target y)',
      scientificRole: 'Counterweight Carrier',
      description: 'Holds the target reference mass y. Serves as the fixed comparator for equilibrium.',
      relatedVariables: ['targetY'],
    },
  ],
  presets: [
    {
      id: 'equilibrium_standard',
      name: 'Standard Equilibrium (2x + 1 = 7)',
      description: 'Symmetric solution where x = 3 perfectly balances 7 kg.',
      state: { slope: 2, intercept: 1, xVal: 3, targetY: 7 },
      expectedOutcome: 'Perfect zero-degree horizontal equilibrium (Balanced).',
    },
    {
      id: 'direct_proportion',
      name: 'Direct Proportion (y = 3x)',
      description: 'Zero constant offset (c = 0), demonstrating pure linear scale.',
      state: { slope: 3, intercept: 0, xVal: 2, targetY: 6 },
      expectedOutcome: 'Zero tare, passes through the origin (0, 0).',
    },
    {
      id: 'negative_offset',
      name: 'Negative Offset (3x - 2 = 10)',
      description: 'Introduces negative intercept subtracting from variable torque.',
      state: { slope: 3, intercept: -2, xVal: 4, targetY: 10 },
      expectedOutcome: 'Equilibrium reached when 3(4) - 2 = 10.',
    },
    {
      id: 'disequilibrium_challenge',
      name: 'Imbalance Diagnostic (2x + 1 vs 12)',
      description: 'Right-heavy scenario requiring student to determine corrective x.',
      state: { slope: 2, intercept: 1, xVal: 2, targetY: 12 },
      expectedOutcome: 'Beam tilts down to the right (Imbalance = -7 kg). Required x = 5.5.',
    },
  ],
  calculateOutputs: calculateLinearEquations,
  getTelemetry: (state, outputs) => [
    {
      id: 'left_load',
      label: 'Left Pan (mx + c)',
      symbol: 'L',
      value: outputs.leftLoad,
      unit: 'kg',
      description: `${state.slope} × ${state.xVal} + (${state.intercept})`,
      status: outputs.isBalanced ? 'balanced' : 'neutral',
    },
    {
      id: 'right_load',
      label: 'Right Pan (Target y)',
      symbol: 'R',
      value: outputs.rightLoad,
      unit: 'kg',
      description: 'Target mass on right pan',
      status: outputs.isBalanced ? 'balanced' : 'neutral',
    },
    {
      id: 'net_imbalance',
      label: 'Net Imbalance',
      symbol: 'Δ',
      value: outputs.imbalance === 0 ? '0.00' : (outputs.imbalance > 0 ? `+${outputs.imbalance}` : `${outputs.imbalance}`),
      unit: 'kg',
      description: 'Displacement from equilibrium',
      status: outputs.isBalanced ? 'optimal' : 'inhibited',
    },
    {
      id: 'equilibrium_x',
      label: 'Equilibrium Solution (x)',
      symbol: 'x*',
      value: outputs.solutionX !== null ? outputs.solutionX : 'Undefined',
      unit: 'units',
      description: 'Value of x that achieves exact horizontal balance',
      status: 'neutral',
    },
  ],
  getExplanation: (state, outputs, selectedComponentId) => {
    if (selectedComponentId === 'fulcrum') {
      return {
        observation: 'The central fulcrum is at static rest.',
        governingPrinciple: 'Newtonian Statics & The Equality Axiom',
        influencingVariables: ['targetY', 'xVal', 'slope', 'intercept'],
        keyTakeaway: 'The mathematical equals sign acts as a frictionless fulcrum. Equality holds if and only if net rotational torque about the pivot is zero.',
        educationalLevel: 'CBSE & CISCE Classes 7–9 Mathematics (Algebraic Equations)',
      };
    }
    if (selectedComponentId === 'crossbeam') {
      return {
        observation: outputs.isBalanced
          ? 'The crossbeam is exactly horizontal (0° deflection).'
          : `The crossbeam is tilted by ${Math.abs(Number((outputs.tiltAngleRad * (180 / Math.PI)).toFixed(1)))}° toward the ${outputs.imbalance > 0 ? 'left' : 'right'} pan.`,
        governingPrinciple: 'Torque Balance (τ = F × d)',
        influencingVariables: ['slope', 'intercept', 'xVal', 'targetY'],
        keyTakeaway: `Net torque is proportional to Δ = ${outputs.imbalance} kg. To restore balance, adjust x to ${outputs.solutionX ?? 'the calculated root'}.`,
        educationalLevel: 'CBSE & CISCE Classes 8–10 Physics & Mathematics',
      };
    }
    if (outputs.isBalanced) {
      return {
        observation: `Both pans balance perfectly at ${outputs.leftLoad} kg.`,
        governingPrinciple: 'Conservation of Equality (Axiom of Substitution)',
        influencingVariables: ['slope', 'intercept', 'xVal', 'targetY'],
        keyTakeaway: `Because ${state.slope}(${state.xVal}) + (${state.intercept}) = ${state.targetY}, the pair (x=${state.xVal}, y=${state.targetY}) is a true solution point on the Cartesian line.`,
        educationalLevel: 'CBSE & CISCE Class 9 Mathematics (Chapter 4: Linear Equations in Two Variables)',
      };
    }
    return {
      observation: outputs.imbalance > 0
        ? `Left pan is heavier by ${outputs.imbalance} kg (${outputs.leftLoad} kg > ${outputs.rightLoad} kg).`
        : `Right pan is heavier by ${Math.abs(outputs.imbalance)} kg (${outputs.rightLoad} kg > ${outputs.leftLoad} kg).`,
      governingPrinciple: 'Algebraic Disequilibrium & Root Finding',
      influencingVariables: ['slope', 'xVal', 'intercept', 'targetY'],
      keyTakeaway: `To achieve balance, set x = (${state.targetY} - ${state.intercept}) / ${state.slope} = ${outputs.solutionX}.`,
      educationalLevel: 'CBSE & CISCE Classes 7–9 Algebra',
    };
  },
};

// ============================================================================
// 2. PHOTOSYNTHESIS PHOTOCHEMICAL CHAMBER MODEL
// ============================================================================

export function calculatePhotosynthesis(state: PhotosynthesisState): PhotosynthesisOutputs {
  // 1. Quantum efficiency based on Chlorophyll a/b absorption spectrum
  let quantumEfficiency = 0.75; // White light default
  switch (state.wavelength) {
    case 'red':
      quantumEfficiency = 0.95; // 660 nm peak absorption
      break;
    case 'blue':
      quantumEfficiency = 0.90; // 430 nm peak absorption
      break;
    case 'green':
      quantumEfficiency = 0.15; // 520 nm chlorophyll reflection ("green window")
      break;
    case 'white':
    default:
      quantumEfficiency = 0.75;
      break;
  }

  // 2. Light absorption rate [0, 100]
  const lightAbsorptionRate = Number(((state.lightIntensity / 100) * quantumEfficiency * 100).toFixed(1));

  // 3. CO2 saturation curve (Michaelis-Menten: Km ~ 350 ppm)
  const kmCO2 = 350;
  const rawCO2Factor = state.co2Concentration / (kmCO2 + state.co2Concentration);
  // Max CO2 factor at 1200 ppm ~ 0.774; normalized to 1.0 at 1200 ppm
  const maxFactorAt1200 = 1200 / (kmCO2 + 1200);
  const co2SaturationFactor = Number(Math.min(1.0, rawCO2Factor / maxFactorAt1200).toFixed(2));

  // 4. Temperature enzyme kinetics (Optimum at 28°C; sharp drop above 38°C due to denaturation)
  let temperatureFactor = 0;
  if (state.temperature < 5) {
    temperatureFactor = 0.05;
  } else if (state.temperature <= 28) {
    // Q10 acceleration up to 28°C
    temperatureFactor = 0.1 + 0.9 * ((state.temperature - 5) / 23);
  } else if (state.temperature <= 36) {
    // High activity plateau with slight photorespiration penalty
    temperatureFactor = 1.0 - 0.15 * ((state.temperature - 28) / 8);
  } else if (state.temperature <= 45) {
    // Thermal denaturation of RuBisCO and Photosystem II
    const denaturation = (state.temperature - 36) / 9;
    temperatureFactor = Math.max(0, 0.85 * (1 - denaturation * denaturation));
  }
  temperatureFactor = Number(temperatureFactor.toFixed(2));

  // 5. Blackman's Law of Limiting Factors
  const lightPotential = lightAbsorptionRate; // 0 to 95
  const co2Potential = co2SaturationFactor * 90; // 0 to 90

  let limitingFactor: 'LIGHT' | 'CO2' | 'TEMPERATURE' | 'NONE' = 'NONE';
  if (temperatureFactor < 0.35) {
    limitingFactor = 'TEMPERATURE';
  } else if (lightPotential < co2Potential - 10) {
    limitingFactor = 'LIGHT';
  } else if (co2Potential < lightPotential - 10) {
    limitingFactor = 'CO2';
  } else {
    limitingFactor = 'NONE';
  }

  // 6. Net Photosynthetic Rate (relative score 0 - 100)
  const darkRespiration = 2.5; // Baseline cellular respiration
  const rawPhotosynthesis = Math.min(lightPotential, co2Potential) * temperatureFactor;
  const netRate = Math.max(0, rawPhotosynthesis - darkRespiration);
  const netPhotosyntheticRate = Number(netRate.toFixed(1));

  // 7. Oxygen bubble rate (0 to 60 bubbles per minute)
  const bubbleRate = Math.round((netPhotosyntheticRate / 90) * 55);

  // 8. Glucose production rate (mg / dm² / hr)
  const glucoseProductionRate = Number(((netPhotosyntheticRate / 100) * 12.5).toFixed(2));

  const isOptimal = netPhotosyntheticRate > 65;

  return {
    quantumEfficiency,
    lightAbsorptionRate,
    co2SaturationFactor,
    temperatureFactor,
    limitingFactor,
    netPhotosyntheticRate,
    bubbleRate,
    glucoseProductionRate,
    isOptimal,
  };
}

export const PHOTOSYNTHESIS_MODEL: ScientificModelDefinition<PhotosynthesisState, PhotosynthesisOutputs> = {
  id: 'photosynthesis',
  name: 'Photochemical Reaction Chamber & Thylakoid Membrane',
  discipline: 'Life Sciences / Plant Physiology',
  curriculumTopicId: 'bio-photosynthesis-1',
  overview:
    'Photosynthesis converts radiant electromagnetic energy into stable chemical bonds via the photolysis of water and carbon fixation. According to Blackman’s Principle of Limiting Factors (1905), the overall reaction rate is pace-limited by whichever essential variable is closest to its minimum.',
  initialState: {
    lightIntensity: 70,
    wavelength: 'white',
    co2Concentration: 450,
    temperature: 26,
  },
  variables: [
    {
      id: 'lightIntensity',
      name: 'Light Intensity (PAR)',
      symbol: 'I',
      unit: '%',
      min: 0,
      max: 100,
      step: 5,
      defaultValue: 70,
      description: 'Photosynthetically Active Radiation (400–700 nm) incident on the leaf surface.',
      scientificMeaning: 'Drives the light-dependent reactions by exciting P680 reaction centers in Photosystem II.',
    },
    {
      id: 'co2Concentration',
      name: 'CO₂ Partial Pressure',
      symbol: '[CO₂]',
      unit: 'ppm',
      min: 200,
      max: 1200,
      step: 50,
      defaultValue: 450,
      description: 'Ambient carbon dioxide concentration entering through stomatal pores.',
      scientificMeaning: 'Primary substrate for RuBisCO in the stroma during the light-independent Calvin cycle.',
    },
    {
      id: 'temperature',
      name: 'Chamber Temperature',
      symbol: 'T',
      unit: '°C',
      min: 10,
      max: 45,
      step: 1,
      defaultValue: 26,
      description: 'Kinetic thermal energy governing enzyme catalysis.',
      scientificMeaning: 'Regulates kinetic rates of stromal enzymes (RuBisCO, kinase) and membrane fluidity.',
    },
  ],
  components: [
    {
      id: 'thylakoid_membrane',
      name: 'Thylakoid Bilayer Membrane',
      scientificRole: 'Light-Dependent Reaction Center',
      description: 'Contains embedded Photosystem II (P680) and Photosystem I (P700) complexes, cytochrome b6f, and ATP synthase.',
      relatedVariables: ['lightIntensity'],
    },
    {
      id: 'light_source',
      name: 'Photon Radiator (Illuminator)',
      scientificRole: 'Electromagnetic Quantum Emitter',
      description: 'Provides photons across selectable wavelengths. Green photons reflect; red and blue excite chlorophyll electrons.',
      relatedVariables: ['lightIntensity'],
    },
    {
      id: 'stroma',
      name: 'Stromal Fluid Matrix',
      scientificRole: 'Calvin Cycle Reaction Space',
      description: 'Aqueous matrix where RuBisCO fixes CO₂ into 3-phosphoglycerate and temperature-sensitive enzymatic cycles occur.',
      relatedVariables: ['co2Concentration', 'temperature'],
    },
    {
      id: 'bubble_collector',
      name: 'Oxygen Eudiometer / Bubble Stream',
      scientificRole: 'Photolysis Byproduct Metric',
      description: 'Collects evolved gaseous O₂ resulting from the photolytic splitting of water: 2H₂O → 4H⁺ + 4e⁻ + O₂↑.',
      relatedVariables: ['lightIntensity', 'co2Concentration', 'temperature'],
    },
  ],
  presets: [
    {
      id: 'optimal_summer',
      name: 'Optimal Summer Noon (70% Light, 450 ppm, 26°C, White)',
      description: 'Balanced natural outdoor sunlight with ambient atmospheric CO₂.',
      state: { lightIntensity: 70, wavelength: 'white', co2Concentration: 450, temperature: 26 },
      expectedOutcome: 'High steady bubble production (~43 bubbles/min).',
    },
    {
      id: 'red_laser_peak',
      name: 'Red Spectrum Maximizer (80% Light, 800 ppm, 28°C, Red)',
      description: '660 nm monochromatic light targeting Chlorophyll a absorption peak.',
      state: { lightIntensity: 80, wavelength: 'red', co2Concentration: 800, temperature: 28 },
      expectedOutcome: 'Peak photochemical efficiency (~50 bubbles/min, optimal status).',
    },
    {
      id: 'green_window_penalty',
      name: 'Green Light Reflection (70% Light, 600 ppm, 25°C, Green)',
      description: 'Demonstrates why plants appear green: chlorophyll reflects 520 nm wavelengths.',
      state: { lightIntensity: 70, wavelength: 'green', co2Concentration: 600, temperature: 25 },
      expectedOutcome: 'Near-zero bubble rate (~6 bubbles/min) despite high light intensity.',
    },
    {
      id: 'heatwave_denaturation',
      name: 'Extreme Heatwave (80% Light, 600 ppm, 43°C, White)',
      description: 'High temperature causes RuBisCO denaturation and stomatal closure.',
      state: { lightIntensity: 80, wavelength: 'white', co2Concentration: 600, temperature: 43 },
      expectedOutcome: 'Sharp photochemical collapse due to enzyme thermal denaturation.',
    },
  ],
  calculateOutputs: calculatePhotosynthesis,
  getTelemetry: (state, outputs) => [
    {
      id: 'net_rate',
      label: 'Net Photosynthetic Rate',
      symbol: 'P_net',
      value: outputs.netPhotosyntheticRate,
      unit: 'a.u.',
      description: 'Photochemical carbon assimilation efficiency',
      status: outputs.isOptimal ? 'optimal' : outputs.netPhotosyntheticRate > 25 ? 'neutral' : 'inhibited',
    },
    {
      id: 'o2_evolution',
      label: 'O₂ Bubble Evolution',
      symbol: 'dO₂/dt',
      value: outputs.bubbleRate,
      unit: 'bubbles/min',
      description: 'Rate of water photolysis in Photosystem II',
      status: outputs.bubbleRate > 30 ? 'optimal' : 'neutral',
    },
    {
      id: 'limiting_factor',
      label: 'Active Limiting Factor',
      symbol: 'Lim',
      value: outputs.limitingFactor,
      unit: '',
      description: "Blackman's Law of Limiting Factors bottleneck",
      status: outputs.limitingFactor === 'NONE' ? 'optimal' : 'limiting',
    },
    {
      id: 'quantum_eff',
      label: 'Quantum Efficiency (η)',
      symbol: 'η',
      value: `${(outputs.quantumEfficiency * 100).toFixed(0)}%`,
      unit: '',
      description: `Absorption efficiency for ${state.wavelength} spectrum`,
      status: outputs.quantumEfficiency >= 0.75 ? 'optimal' : 'inhibited',
    },
  ],
  getExplanation: (state, outputs, selectedComponentId) => {
    if (selectedComponentId === 'thylakoid_membrane') {
      return {
        observation: 'Inspecting the thylakoid lipid bilayer and photosystem complexes.',
        governingPrinciple: 'Light-Dependent Photophosphorylation (Z-Scheme)',
        influencingVariables: ['lightIntensity', 'wavelength'],
        keyTakeaway: 'Photons excite P680 reaction centers, driving the photolysis of water (2H₂O → 4H⁺ + 4e⁻ + O₂↑) and generating ATP and NADPH across the thylakoid lumen.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology (Light Reactions)',
      };
    }
    if (selectedComponentId === 'bubble_collector') {
      return {
        observation: `Oxygen eudiometer collecting gas at ${outputs.bubbleRate} bubbles/minute.`,
        governingPrinciple: 'Measurement of Photolytic Evolution Rate',
        influencingVariables: ['lightIntensity', 'co2Concentration', 'temperature', 'wavelength'],
        keyTakeaway: 'The gas collected in the inverted tube is pure oxygen produced exclusively during the light reaction when water molecules are cleaved.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology Lab (Elodea Gas Exchange Experiment)',
      };
    }
    if (state.wavelength === 'green') {
      return {
        observation: `Despite ${state.lightIntensity}% light intensity, the bubble rate drops dramatically to ${outputs.bubbleRate} bubbles/min.`,
        governingPrinciple: 'Chlorophyll Action Spectrum & The "Green Window"',
        influencingVariables: ['wavelength', 'lightIntensity'],
        keyTakeaway: 'Chlorophyll pigments a and b strongly absorb red (660 nm) and blue (430 nm) photons, but reflect green wavelengths (~520 nm). Hence, green light cannot drive photolysis efficiently.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology (Chapter: Life Processes — Nutrition in Plants)',
      };
    }
    if (state.temperature >= 40) {
      return {
        observation: `Photosynthetic rate collapsed to ${outputs.netPhotosyntheticRate} a.u. at ${state.temperature}°C.`,
        governingPrinciple: 'Thermal Denaturation of Enzymes & Membrane Fluidity',
        influencingVariables: ['temperature'],
        keyTakeaway: 'High heat destroys the tertiary conformation of RuBisCO enzymes in the stroma and disrupts the thylakoid lipid bilayer, stopping both light and dark reactions.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology (Enzymatic Kinetics)',
      };
    }
    if (outputs.limitingFactor === 'CO2') {
      return {
        observation: `Carbon dioxide at ${state.co2Concentration} ppm is the active bottleneck. Increasing light further will not increase the rate.`,
        governingPrinciple: "Blackman's Principle of Limiting Factors (1905)",
        influencingVariables: ['co2Concentration', 'lightIntensity'],
        keyTakeaway: 'When a chemical process depends on several factors, its rate is limited by the pace of the slowest factor. Here, the Calvin cycle is starved of carbon substrate.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology',
      };
    }
    if (outputs.limitingFactor === 'LIGHT') {
      return {
        observation: `Light intensity at ${state.lightIntensity}% is currently limiting the reaction rate.`,
        governingPrinciple: 'Quantum Photon Flux & Photolysis of Water',
        influencingVariables: ['lightIntensity', 'wavelength'],
        keyTakeaway: 'Insufficient photons are arriving at the P680 reaction centers to maintain electron flow along the Z-scheme transport chain.',
        educationalLevel: 'CBSE & CISCE Class 10 Biology',
      };
    }
    return {
      observation: `System operating in balanced regime: ${outputs.bubbleRate} O₂ bubbles/min evolved from the thylakoid chamber.`,
      governingPrinciple: 'Photochemical Equilibrium (Light & Dark Reactions Harmonized)',
      influencingVariables: ['lightIntensity', 'co2Concentration', 'temperature', 'wavelength'],
      keyTakeaway: 'ATP and NADPH produced by the light-dependent reactions are consumed at an identical rate by the Calvin cycle in the stroma.',
      educationalLevel: 'CBSE & CISCE Class 10 Biology (Life Processes)',
    };
  },
};

// ============================================================================
// 3. OPTICS LABORATORY (LIGHT, REFLECTION, SHADOWS)
// Curriculum: sci-6-light-shadows (CBSE & CISCE Class 6-8 Physics)
// ============================================================================

export function calculateOpticsLab(state: OpticsLabState): OpticsLabOutputs {
  const reflectedAngleDeg = state.incidentAngleDeg; // θ_r = θ_i
  const mirrorImageDistanceCm = state.obstacleDistanceCm; // d_i = d_o
  const isVirtualImage = true; // plane mirror images are always virtual & erect

  const dObs = Math.max(1, state.obstacleDistanceCm);
  const dScreen = Math.max(dObs + 1, state.screenDistanceCm);
  const magnification = Number((dScreen / dObs).toFixed(2));

  // Light source size: Point source vs Extended source
  const sourceSize = state.lightSourceSizeMm / 10; // convert mm to cm
  const hasPenumbra = sourceSize > 0.2;

  let umbraDiameterCm = 0;
  let penumbraDiameterCm = 0;

  if (hasPenumbra) {
    // Extended source shadow cone geometry
    const rawUmbra = state.obstacleDiameterCm * (dScreen / dObs) - sourceSize * ((dScreen - dObs) / dObs);
    umbraDiameterCm = Number(Math.max(0, rawUmbra).toFixed(2));
    const rawPenumbra = state.obstacleDiameterCm * (dScreen / dObs) + sourceSize * ((dScreen - dObs) / dObs);
    penumbraDiameterCm = Number(Math.max(umbraDiameterCm, rawPenumbra).toFixed(2));
  } else {
    // Point source: Sharp uniform shadow, zero penumbra
    umbraDiameterCm = Number((state.obstacleDiameterCm * magnification).toFixed(2));
    penumbraDiameterCm = 0;
  }

  return {
    reflectedAngleDeg,
    mirrorImageDistanceCm,
    isVirtualImage,
    umbraDiameterCm,
    penumbraDiameterCm,
    hasPenumbra,
    magnification,
    isLawOfReflectionVerified: Math.abs(reflectedAngleDeg - state.incidentAngleDeg) < 0.001,
  };
}

export const OPTICS_LAB_MODEL: ScientificModelDefinition<OpticsLabState, OpticsLabOutputs> = {
  id: 'optics-lab',
  name: 'Optical Reflection & Shadow Formation Laboratory',
  discipline: 'Physics & Optics',
  curriculumTopicId: 'sci-6-light-shadows',
  overview:
    'Light travels in rectilinear straight rays in a homogeneous medium. When it strikes a polished plane mirror, the angle of reflection equals the angle of incidence (θ_r = θ_i), forming an upright virtual image at identical distance behind the reflecting surface. When an opaque body intercepts light, rectilinear propagation creates umbra and penumbra shadow regions governed by geometric similarity.',
  initialState: {
    incidentAngleDeg: 45,
    mirrorPresent: true,
    obstacleDistanceCm: 30,
    screenDistanceCm: 80,
    lightSourceSizeMm: 2,
    obstacleDiameterCm: 10,
  },
  variables: [
    {
      id: 'incidentAngleDeg',
      name: 'Angle of Incidence',
      symbol: 'θ_i',
      unit: '°',
      min: 0,
      max: 80,
      step: 5,
      defaultValue: 45,
      description: 'The angle between the incoming incident ray and the normal vector to the reflecting plane.',
      scientificMeaning: 'Governs the specular reflection ray vector according to Snell-Descartes law of reflection.',
    },
    {
      id: 'lightSourceSizeMm',
      name: 'Light Source Aperture',
      symbol: 'S',
      unit: 'mm',
      min: 1,
      max: 20,
      step: 1,
      defaultValue: 2,
      description: 'Size of the illuminating aperture. Point sources produce sharp umbras; extended sources produce penumbras.',
      scientificMeaning: 'Differentiates point-source pinhole ray optics from extended-source geometric penumbra transitions.',
    },
    {
      id: 'obstacleDistanceCm',
      name: 'Obstacle Distance',
      symbol: 'd_o',
      unit: 'cm',
      min: 10,
      max: 70,
      step: 5,
      defaultValue: 30,
      description: 'Distance from the illumination origin to the opaque light-intercepting disk.',
      scientificMeaning: 'Controls geometric ray magnification ratio M = d_screen / d_obstacle.',
    },
    {
      id: 'screenDistanceCm',
      name: 'Projection Screen Distance',
      symbol: 'd_s',
      unit: 'cm',
      min: 40,
      max: 120,
      step: 5,
      defaultValue: 80,
      description: 'Distance to the observation backdrop where the shadow silhouette is cast.',
      scientificMeaning: 'Determines the intercept plane of diverging rectilinear shadow rays.',
    },
  ],
  components: [
    {
      id: 'light-source',
      name: 'Coherent Illuminator',
      scientificRole: 'Photon Emitter',
      description: 'Emits diverging linear rays according to rectilinear propagation.',
      relatedVariables: ['lightSourceSizeMm'],
    },
    {
      id: 'plane-mirror',
      name: 'Specular Plane Mirror',
      scientificRole: 'Reflecting Boundary',
      description: 'Reverses the normal component of incoming light vectors while preserving tangential velocity.',
      relatedVariables: ['incidentAngleDeg'],
    },
    {
      id: 'opaque-obstacle',
      name: 'Opaque Obstacle Disk',
      scientificRole: 'Photon Absorber',
      description: 'Blocks photons, casting geometric umbra and penumbra cones behind it.',
      relatedVariables: ['obstacleDistanceCm'],
    },
  ],
  presets: [
    {
      id: 'specular-reflection-45',
      name: 'Specular 45° Reflection',
      description: 'Classic equal-angle specular reflection showing θ_i = θ_r = 45° with plane mirror image formation.',
      state: {
        incidentAngleDeg: 45,
        mirrorPresent: true,
        obstacleDistanceCm: 30,
        screenDistanceCm: 80,
        lightSourceSizeMm: 1,
        obstacleDiameterCm: 10,
      },
      expectedOutcome: 'Reflected ray leaves at 45°; virtual image formed exactly 30 cm behind mirror.',
    },
    {
      id: 'point-source-umbra',
      name: 'Point Source Sharp Umbra',
      description: 'Infinitesimal point emitter producing a razor-sharp, uniform shadow with zero penumbra boundary.',
      state: {
        incidentAngleDeg: 0,
        mirrorPresent: false,
        obstacleDistanceCm: 25,
        screenDistanceCm: 100,
        lightSourceSizeMm: 1,
        obstacleDiameterCm: 10,
      },
      expectedOutcome: 'Zero penumbra (sharp boundary); shadow magnified 4.0× to 40 cm.',
    },
    {
      id: 'extended-source-penumbra',
      name: 'Extended Source (Solar/Lunar Eclipse Analog)',
      description: 'Broad light source (20 mm) creating a dual-zone shadow: central dark umbra flanked by soft gray penumbra.',
      state: {
        incidentAngleDeg: 0,
        mirrorPresent: false,
        obstacleDistanceCm: 30,
        screenDistanceCm: 90,
        lightSourceSizeMm: 20,
        obstacleDiameterCm: 15,
      },
      expectedOutcome: 'Both umbra and penumbra visible, demonstrating the physical mechanism of solar eclipses.',
    },
  ],
  calculateOutputs: calculateOpticsLab,
  getTelemetry: (_state, outputs) => [
    {
      id: 'reflection-angle',
      label: 'Reflected Angle',
      symbol: 'θ_r',
      value: `${outputs.reflectedAngleDeg}°`,
      unit: 'deg',
      status: outputs.isLawOfReflectionVerified ? 'optimal' : 'neutral',
      description: 'Law of Reflection: θ_r = θ_i',
    },
    {
      id: 'virtual-distance',
      label: 'Virtual Image Depth',
      symbol: "d_i'",
      value: `${outputs.mirrorImageDistanceCm} cm`,
      unit: 'cm',
      status: 'neutral',
      description: 'Distance of virtual image behind mirror plane',
    },
    {
      id: 'umbra-diameter',
      label: 'Umbra Diameter',
      symbol: 'D_u',
      value: `${outputs.umbraDiameterCm} cm`,
      unit: 'cm',
      status: 'optimal',
      description: 'Region of total photon occlusion',
    },
    {
      id: 'penumbra-diameter',
      label: 'Penumbra Outer Diameter',
      symbol: 'D_p',
      value: outputs.hasPenumbra ? `${outputs.penumbraDiameterCm} cm` : 'None (Point Source)',
      unit: 'cm',
      status: outputs.hasPenumbra ? 'limiting' : 'neutral',
      description: 'Region of partial illumination around umbra',
    },
    {
      id: 'magnification',
      label: 'Shadow Magnification',
      symbol: 'M',
      value: `${outputs.magnification}×`,
      unit: 'ratio',
      status: 'neutral',
      description: 'Ratio of screen distance to obstacle distance (d_s / d_o)',
    },
  ],
  getExplanation: (state, outputs) => {
    if (state.mirrorPresent) {
      return {
        observation: `Incident ray at ${state.incidentAngleDeg}° reflects symmetrically at ${outputs.reflectedAngleDeg}°. Virtual image forms ${outputs.mirrorImageDistanceCm} cm behind the mirror.`,
        governingPrinciple: 'First Law of Specular Reflection (Rectilinear Ray Reversal)',
        influencingVariables: ['incidentAngleDeg', 'obstacleDistanceCm'],
        keyTakeaway: 'The angle of incidence equals the angle of reflection (θ_i = θ_r), and the incident ray, reflected ray, and normal all lie in the exact same plane.',
        educationalLevel: 'CBSE & CISCE Class 6–8 Physics (Chapter: Light, Shadows and Reflections)',
      };
    }
    if (outputs.hasPenumbra) {
      return {
        observation: `Extended light source (${state.lightSourceSizeMm} mm) produces an inner umbra (${outputs.umbraDiameterCm} cm) enveloped by a penumbra (${outputs.penumbraDiameterCm} cm).`,
        governingPrinciple: 'Geometric Ray Divergence from Extended Illumination (Eclipse Mechanics)',
        influencingVariables: ['lightSourceSizeMm', 'obstacleDistanceCm', 'screenDistanceCm'],
        keyTakeaway: 'When a light source has finite size, some points on the screen receive light from part of the source (penumbra), while points shielded from the entire source form the dark umbra.',
        educationalLevel: 'CBSE & CISCE Class 6–8 Physics (Chapter: Shadows and Eclipses)',
      };
    }
    return {
      observation: `Point light source produces a razor-sharp shadow magnified ${outputs.magnification}× on the projection screen.`,
      governingPrinciple: 'Rectilinear Propagation of Light in a Uniform Medium',
      influencingVariables: ['obstacleDistanceCm', 'screenDistanceCm'],
      keyTakeaway: 'Light travels in strictly straight lines. Because light cannot bend around the opaque obstacle, a crisp geometric shadow silhouette forms on the screen.',
      educationalLevel: 'CBSE & CISCE Class 6 Physics (Rectilinear Propagation)',
    };
  },
};

// ============================================================================
// 4. THERMAL LABORATORY (CONDUCTION, FOURIER'S LAW)
// Curriculum: sci-7-heat-transfer (CBSE & CISCE Class 7-9 Physics)
// ============================================================================

const THERMAL_CONDUCTIVITY_MAP: Record<ThermalMaterialId, { name: string; k: number }> = {
  copper: { name: 'Pure Electrolytic Copper', k: 385 },
  aluminum: { name: 'Duralumin / Aluminum', k: 205 },
  iron: { name: 'Wrought Iron', k: 80 },
  glass: { name: 'Borosilicate Glass', k: 0.8 },
};

export function calculateThermalLab(state: ThermalLabState): ThermalLabOutputs {
  const mat = THERMAL_CONDUCTIVITY_MAP[state.materialId] || THERMAL_CONDUCTIVITY_MAP.copper;
  const k = mat.k;

  const lengthM = Math.max(0.05, state.rodLengthCm / 100);
  const areaM2 = Math.max(1e-6, state.rodCrossSectionMm2 * 1e-6);
  const deltaT = Math.max(0, state.hotEndTempC - state.coldEndTempC);

  // Temperature gradient = ΔT / L in K/m
  const temperatureGradient = Number((deltaT / lengthM).toFixed(1));

  // Fourier's Law: Q / t = k * A * (T_hot - T_cold) / L in Watts
  const heatTransferRateWatts = Number((k * areaM2 * (deltaT / lengthM)).toFixed(2));

  // 5 discrete probe points along the rod: x = 0, 0.25, 0.5, 0.75, 1.0
  const tempProfile = [0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
    return Number((state.hotEndTempC - deltaT * frac).toFixed(1));
  });

  // Molecular kinetic lattice agitation amplitude
  const avgTempK = (state.hotEndTempC + state.coldEndTempC) / 2 + 273.15;
  const atomVibrationAmplitude = Number(Math.min(2.0, Math.max(0.2, (avgTempK / 350) * (k > 100 ? 1.2 : 0.6))).toFixed(2));

  // Time for wax to melt at probe point 3 (75% along rod)
  // Inversely proportional to heat transfer rate
  const timeToMeltWaxSec = heatTransferRateWatts > 0.01 
    ? Number(Math.min(300, (45 / heatTransferRateWatts) * (lengthM / 0.2)).toFixed(1))
    : 999;

  return {
    materialName: mat.name,
    thermalConductivityK: k,
    temperatureGradient,
    heatTransferRateWatts,
    tempProfile,
    atomVibrationAmplitude,
    timeToMeltWaxSec,
  };
}

export const THERMAL_LAB_MODEL: ScientificModelDefinition<ThermalLabState, ThermalLabOutputs> = {
  id: 'thermal-lab',
  name: 'Thermal Conduction & Fourier Heat Flow Chamber',
  discipline: 'Physics & Thermodynamics',
  curriculumTopicId: 'sci-7-heat-transfer',
  overview:
    'Thermal conduction is the transfer of internal kinetic energy between adjacent atoms and through free electrons without macroscopic movement of the matter itself. Under steady-state conditions, heat flow Q/t is governed by Fourier’s Law: directly proportional to thermal conductivity (k), cross-sectional area (A), and temperature gradient (ΔT/L).',
  initialState: {
    materialId: 'copper',
    hotEndTempC: 100,
    coldEndTempC: 20,
    rodLengthCm: 25,
    rodCrossSectionMm2: 50,
  },
  variables: [
    {
      id: 'hotEndTempC',
      name: 'Hot Reservoir Temperature',
      symbol: 'T_hot',
      unit: '°C',
      min: 30,
      max: 150,
      step: 5,
      defaultValue: 100,
      description: 'Temperature applied at the heat source end of the conducting rod.',
      scientificMeaning: 'Determines the high-energy boundary condition driving molecular lattice vibrations.',
    },
    {
      id: 'coldEndTempC',
      name: 'Cold Reservoir Temperature',
      symbol: 'T_cold',
      unit: '°C',
      min: 0,
      max: 30,
      step: 2,
      defaultValue: 20,
      description: 'Temperature at the cold heat sink end of the conducting rod.',
      scientificMeaning: 'Governs the thermal sink boundary condition and net temperature differential ΔT.',
    },
    {
      id: 'rodLengthCm',
      name: 'Rod Conduction Length',
      symbol: 'L',
      unit: 'cm',
      min: 10,
      max: 50,
      step: 5,
      defaultValue: 25,
      description: 'Physical length of the conducting bar separating hot and cold reservoirs.',
      scientificMeaning: 'Fourier’s Law states heat transfer is inversely proportional to conduction path length L.',
    },
    {
      id: 'rodCrossSectionMm2',
      name: 'Cross-Sectional Area',
      symbol: 'A',
      unit: 'mm²',
      min: 20,
      max: 200,
      step: 10,
      defaultValue: 50,
      description: 'Area of the cylindrical conducting cross-section perpendicular to heat flow.',
      scientificMeaning: 'Heat flux capacity scales linearly with available conduction cross-sectional area A.',
    },
  ],
  components: [
    {
      id: 'burner-source',
      name: 'Bunsen Heat Source',
      scientificRole: 'Thermal Reservoir (T_hot)',
      description: 'Injects continuous thermal kinetic energy into the crystal lattice.',
      relatedVariables: ['hotEndTempC'],
    },
    {
      id: 'conducting-rod',
      name: 'Solid Conduction Medium',
      scientificRole: 'Phonon & Electron Carrier',
      description: 'Transfers kinetic vibrational packets (phonons) and free electrons along length L.',
      relatedVariables: ['rodLengthCm', 'rodCrossSectionMm2'],
    },
    {
      id: 'wax-probes',
      name: 'Indicator Wax Pins',
      scientificRole: 'Thermal Iso-Therm Detectors',
      description: 'Fall when local rod temperature exceeds the melting point of paraffin wax (55°C).',
    },
  ],
  presets: [
    {
      id: 'copper-high-conduction',
      name: 'Copper (High Thermal Conductor)',
      description: 'Electrolytic copper (k = 385 W/m·K) demonstrating rapid steady-state heat conduction and rapid wax drop.',
      state: {
        materialId: 'copper',
        hotEndTempC: 100,
        coldEndTempC: 20,
        rodLengthCm: 25,
        rodCrossSectionMm2: 50,
      },
      expectedOutcome: 'High heat flow rate (~6.16 W); wax pin at 75% mark drops in under 10 seconds.',
    },
    {
      id: 'iron-moderate-conduction',
      name: 'Iron (Moderate Conductor)',
      description: 'Wrought iron (k = 80 W/m·K) demonstrating sluggish thermal propagation typical of transition metals.',
      state: {
        materialId: 'iron',
        hotEndTempC: 100,
        coldEndTempC: 20,
        rodLengthCm: 25,
        rodCrossSectionMm2: 50,
      },
      expectedOutcome: 'Heat transfer rate drops ~4.8× to ~1.28 W; pins drop with noticeable temporal delay.',
    },
    {
      id: 'glass-insulator',
      name: 'Borosilicate Glass (Thermal Insulator)',
      description: 'Glass rod (k = 0.8 W/m·K) showing virtually zero conduction despite a 100°C thermal gradient.',
      state: {
        materialId: 'glass',
        hotEndTempC: 120,
        coldEndTempC: 10,
        rodLengthCm: 20,
        rodCrossSectionMm2: 50,
      },
      expectedOutcome: 'Heat flow rate under 0.03 W; distant wax pins never reach melting threshold.',
    },
  ],
  calculateOutputs: calculateThermalLab,
  getTelemetry: (_state, outputs) => [
    {
      id: 'heat-flow-rate',
      label: 'Heat Transfer Rate',
      symbol: 'Q/t',
      value: `${outputs.heatTransferRateWatts} W`,
      unit: 'Watts (J/s)',
      status: outputs.heatTransferRateWatts > 3.0 ? 'optimal' : outputs.heatTransferRateWatts < 0.2 ? 'limiting' : 'neutral',
      description: 'Fourier Law: Q/t = k · A · (ΔT / L)',
    },
    {
      id: 'thermal-k',
      label: 'Thermal Conductivity',
      symbol: 'k',
      value: `${outputs.thermalConductivityK}`,
      unit: 'W / (m · K)',
      status: outputs.thermalConductivityK > 150 ? 'optimal' : 'neutral',
      description: `Material property for ${outputs.materialName}`,
    },
    {
      id: 'temp-gradient',
      label: 'Temperature Gradient',
      symbol: 'dT/dx',
      value: `${outputs.temperatureGradient} K/m`,
      unit: 'K/m',
      status: 'neutral',
      description: 'Rate of temperature drop along rod axis',
    },
    {
      id: 'mid-temp',
      label: 'Mid-Point Temperature',
      symbol: 'T_mid',
      value: `${outputs.tempProfile[2]} °C`,
      unit: '°C',
      status: 'neutral',
      description: 'Calculated steady-state temperature at x = L/2',
    },
    {
      id: 'melt-time',
      label: 'Wax Drop Time (Pin 3)',
      symbol: 't_melt',
      value: outputs.timeToMeltWaxSec < 290 ? `${outputs.timeToMeltWaxSec} s` : '> 5 mins (Insulator)',
      unit: 'sec',
      status: outputs.timeToMeltWaxSec < 15 ? 'optimal' : 'limiting',
      description: 'Demonstrates the historic Ingen-Housz experiment',
    },
  ],
  getExplanation: (state, outputs) => {
    if (state.materialId === 'glass') {
      return {
        observation: `Glass conducts only ${outputs.heatTransferRateWatts} W of heat despite a ${state.hotEndTempC - state.coldEndTempC}°C differential. Wax pins do not drop.`,
        governingPrinciple: 'Amorphous Lattice Phonon Scattering & Lack of Free Electrons',
        influencingVariables: ['materialId'],
        keyTakeaway: 'Insulators like glass lack free conduction electrons and have disordered atomic arrangements that rapidly scatter vibrational phonons, preventing macroscopic heat conduction.',
        educationalLevel: 'CBSE & CISCE Class 7 Physics (Chapter: Heat Transfer & Thermal Conductors)',
      };
    }
    if (state.materialId === 'copper') {
      return {
        observation: `Copper rod transfers ${outputs.heatTransferRateWatts} W, causing wax pins to drop in ${outputs.timeToMeltWaxSec} seconds.`,
        governingPrinciple: 'Free Electron Conduction & Low Phonon Scattering in Metals',
        influencingVariables: ['materialId', 'rodLengthCm', 'rodCrossSectionMm2'],
        keyTakeaway: 'Good conductors possess a delocalized "sea of electrons" that rapidly transport kinetic energy from the high-temperature reservoir along the entire metallic rod.',
        educationalLevel: 'CBSE & CISCE Class 7–8 Physics (Ingen-Housz Conduction Experiment)',
      };
    }
    return {
      observation: `Thermal gradient of ${outputs.temperatureGradient} K/m drives steady-state heat conduction across ${outputs.materialName}.`,
      governingPrinciple: "Fourier's Law of One-Dimensional Thermal Conduction",
      influencingVariables: ['hotEndTempC', 'coldEndTempC', 'rodLengthCm'],
      keyTakeaway: 'Heat flows spontaneously from regions of higher temperature to lower temperature at a rate directly proportional to the temperature gradient.',
      educationalLevel: 'CBSE & CISCE Class 7 Physics (Modes of Heat Transfer)',
    };
  },
};

// ============================================================================
// 5. MECHANICS LABORATORY (FORCE, PRESSURE, NEWTON'S 2ND LAW)
// Curriculum: sci-8-force-pressure (CBSE & CISCE Class 8-9 Physics)
// ============================================================================

const FRICTION_MAP: Record<SurfaceMaterialId, { name: string; mu: number }> = {
  ice: { name: 'Polished Ice', mu: 0.05 },
  wood: { name: 'Planed Pine Wood', mu: 0.35 },
  concrete: { name: 'Rough Concrete', mu: 0.65 },
};

export function calculateMechanicsLab(state: MechanicsLabState): MechanicsLabOutputs {
  const g = 9.8; // gravitational acceleration in m/s²
  const areaM2 = Math.max(1e-4, state.contactAreaCm2 * 1e-4); // cm² to m²
  const massKg = Math.max(0.1, state.blockMassKg);

  // Pressure: P = F / A in Pascals (N/m²)
  const pressurePascals = Number((state.appliedForceN / areaM2).toFixed(1));
  const pressureAtm = Number((pressurePascals / 101325).toFixed(3));

  // Friction: f = μ * m * g
  const surface = FRICTION_MAP[state.surfaceType] || FRICTION_MAP.wood;
  const mu = surface.mu;
  const maxFrictionForceN = Number((mu * massKg * g).toFixed(2));

  // Net force: F_net = F_applied - f
  const rawNetForce = state.appliedForceN - maxFrictionForceN;
  const netForceN = Number(Math.max(0, rawNetForce).toFixed(2));

  // Acceleration: a = F_net / m
  const accelerationMs2 = Number((netForceN / massKg).toFixed(2));

  // Kinematics over t = 2.0s: v = a * t, s = 0.5 * a * t²
  const t = 2.0;
  const velocityAfter2sMs = Number((accelerationMs2 * t).toFixed(2));
  const displacementAfter2sM = Number((0.5 * accelerationMs2 * t * t).toFixed(2));

  // Substrate penetration depth (for knife edge vs blunt block pressure demo)
  // Penetration scales with pressure (e.g. 1 mm per 50,000 Pa)
  const penetrationDepthMm = Number(Math.min(25, (pressurePascals / 40000)).toFixed(1));

  let motionState: 'stationary' | 'accelerating' | 'sliding' = 'stationary';
  if (state.appliedForceN > maxFrictionForceN) {
    motionState = 'accelerating';
  } else if (state.appliedForceN === 0) {
    motionState = 'stationary';
  } else {
    motionState = 'stationary'; // static friction balances applied force
  }

  return {
    pressurePascals,
    pressureAtm,
    frictionCoefficient: mu,
    maxFrictionForceN,
    netForceN,
    accelerationMs2,
    velocityAfter2sMs,
    displacementAfter2sM,
    penetrationDepthMm,
    motionState,
  };
}

export const MECHANICS_LAB_MODEL: ScientificModelDefinition<MechanicsLabState, MechanicsLabOutputs> = {
  id: 'mechanics-lab',
  name: 'Force, Pressure & Kinetic Friction Dynamics Simulator',
  discipline: 'Physics & Mechanics',
  curriculumTopicId: 'sci-8-force-pressure',
  overview:
    'Force is a push or pull that can alter a body’s state of motion, direction, or shape. Pressure is the force acting perpendicularly per unit area of a surface (P = F / A). Newton’s Second Law dictates that the net unbalanced force produces acceleration proportional to force and inversely proportional to mass (F_net = m · a), subject to opposing surface friction (f = μ · m · g).',
  initialState: {
    appliedForceN: 50,
    contactAreaCm2: 10,
    blockMassKg: 5,
    surfaceType: 'wood',
    mode: 'pressure',
  },
  variables: [
    {
      id: 'appliedForceN',
      name: 'Applied External Force',
      symbol: 'F',
      unit: 'N',
      min: 0,
      max: 200,
      step: 5,
      defaultValue: 50,
      description: 'Magnitude of the perpendicular or lateral vector force applied to the test block.',
      scientificMeaning: 'Determines both normal pressure thrust and kinetic acceleration potential.',
    },
    {
      id: 'contactAreaCm2',
      name: 'Contact Surface Area',
      symbol: 'A',
      unit: 'cm²',
      min: 1,
      max: 50,
      step: 1,
      defaultValue: 10,
      description: 'Surface area in direct contact with the substrate (e.g., sharp tip 1 cm² vs broad block 50 cm²).',
      scientificMeaning: 'Pressure is inversely proportional to contact area: halving area doubles thrust pressure.',
    },
    {
      id: 'blockMassKg',
      name: 'Block Inertial Mass',
      symbol: 'm',
      unit: 'kg',
      min: 1,
      max: 20,
      step: 1,
      defaultValue: 5,
      description: 'Inertial mass of the specimen opposing acceleration and creating normal weight force (W = m·g).',
      scientificMeaning: 'Quantifies linear inertia in Newton’s Second Law: a = F_net / m.',
    },
  ],
  components: [
    {
      id: 'force-actuator',
      name: 'Hydraulic / Vector Actuator',
      scientificRole: 'Force Generator',
      description: 'Applies calibrated force vectors in Newtons.',
      relatedVariables: ['appliedForceN'],
    },
    {
      id: 'contact-face',
      name: 'Contact Face Geometry',
      scientificRole: 'Area Reducer / Spreader',
      description: 'Concentrates or disperses force across substrate.',
      relatedVariables: ['contactAreaCm2'],
    },
    {
      id: 'friction-track',
      name: 'Substrate Interface Track',
      scientificRole: 'Friction Interface',
      description: 'Opposes lateral motion via microscopic surface asperities.',
      relatedVariables: ['blockMassKg'],
    },
  ],
  presets: [
    {
      id: 'sharp-pin-high-pressure',
      name: 'Needle / Pin Point (High Pressure)',
      description: 'Tiny contact area (1 cm²) demonstrating why sharp needles easily penetrate substrates under modest force.',
      state: {
        appliedForceN: 40,
        contactAreaCm2: 1,
        blockMassKg: 2,
        surfaceType: 'wood',
        mode: 'pressure',
      },
      expectedOutcome: 'Immense pressure of 400,000 Pa (~3.95 atm) causing 10.0 mm substrate penetration.',
    },
    {
      id: 'broad-snowshoe-low-pressure',
      name: 'Broad Snowshoe (Low Pressure)',
      description: 'Large surface area (50 cm²) showing why wide bases prevent sinking into soft sand or snow.',
      state: {
        appliedForceN: 40,
        contactAreaCm2: 50,
        blockMassKg: 2,
        surfaceType: 'wood',
        mode: 'pressure',
      },
      expectedOutcome: 'Pressure drops to only 8,000 Pa (~0.08 atm); virtually zero substrate sinking (0.2 mm).',
    },
    {
      id: 'newton-second-law-acceleration',
      name: 'Newton’s 2nd Law Acceleration Run',
      description: 'Unbalanced 80 N force pulling a 5 kg block across low-friction ice track.',
      state: {
        appliedForceN: 80,
        contactAreaCm2: 20,
        blockMassKg: 5,
        surfaceType: 'ice',
        mode: 'dynamics',
      },
      expectedOutcome: 'Friction is only 2.45 N; net force 77.55 N accelerates block at 15.51 m/s² reaching 31 m/s in 2 seconds.',
    },
  ],
  calculateOutputs: calculateMechanicsLab,
  getTelemetry: (_state, outputs) => [
    {
      id: 'pressure-pa',
      label: 'Substrate Pressure',
      symbol: 'P',
      value: `${outputs.pressurePascals.toLocaleString()} Pa`,
      unit: 'Pascals (N/m²)',
      status: outputs.pressurePascals > 100000 ? 'optimal' : 'neutral',
      description: 'P = F / A: Force distributed over contact area',
    },
    {
      id: 'pressure-atm',
      label: 'Atmospheric Equivalent',
      symbol: 'P_atm',
      value: `${outputs.pressureAtm} atm`,
      unit: 'atm',
      status: 'neutral',
      description: 'Ratio relative to 1 standard atmosphere (101,325 Pa)',
    },
    {
      id: 'friction-force',
      label: 'Opposing Friction Force',
      symbol: 'f',
      value: `${outputs.maxFrictionForceN} N`,
      unit: 'N',
      status: 'neutral',
      description: `f = μ · m · g (μ = ${outputs.frictionCoefficient})`,
    },
    {
      id: 'net-force',
      label: 'Net Unbalanced Force',
      symbol: 'F_net',
      value: `${outputs.netForceN} N`,
      unit: 'N',
      status: outputs.netForceN > 0 ? 'optimal' : 'limiting',
      description: 'F_net = F_applied - f',
    },
    {
      id: 'acceleration',
      label: 'Linear Acceleration',
      symbol: 'a',
      value: `${outputs.accelerationMs2} m/s²`,
      unit: 'm/s²',
      status: outputs.accelerationMs2 > 0 ? 'optimal' : 'neutral',
      description: 'Newton’s 2nd Law: a = F_net / m',
    },
    {
      id: 'penetration',
      label: 'Penetration Depth',
      symbol: 'h_pen',
      value: `${outputs.penetrationDepthMm} mm`,
      unit: 'mm',
      status: 'neutral',
      description: 'Substrate deformation depth under localized pressure',
    },
  ],
  getExplanation: (state, outputs) => {
    if (state.mode === 'pressure') {
      if (state.contactAreaCm2 <= 2) {
        return {
          observation: `Concentrating ${state.appliedForceN} N across a tiny area (${state.contactAreaCm2} cm²) generates ${outputs.pressurePascals.toLocaleString()} Pa of pressure, penetrating ${outputs.penetrationDepthMm} mm into the substrate.`,
          governingPrinciple: 'Pressure Inversely Proportional to Contact Area (P = F / A)',
          influencingVariables: ['appliedForceN', 'contactAreaCm2'],
          keyTakeaway: 'For a given force, decreasing surface area multiplies the pressure exponentially. This is why cutting knives have sharp, narrow edges.',
          educationalLevel: 'CBSE & CISCE Class 8 Physics (Chapter: Force and Pressure)',
        };
      }
      return {
        observation: `Spreading ${state.appliedForceN} N over a broad area (${state.contactAreaCm2} cm²) lowers pressure to ${outputs.pressurePascals.toLocaleString()} Pa (${outputs.pressureAtm} atm).`,
        governingPrinciple: 'Pressure Distribution Across Extended Area',
        influencingVariables: ['appliedForceN', 'contactAreaCm2'],
        keyTakeaway: 'Increasing contact area disperses the perpendicular thrust, minimizing surface penetration. This explains why heavy construction vehicles use wide caterpillar tracks.',
        educationalLevel: 'CBSE & CISCE Class 8 Physics (Applications of Pressure)',
      };
    }
    if (outputs.netForceN === 0) {
      return {
        observation: `Applied force of ${state.appliedForceN} N cannot overcome the static friction threshold of ${outputs.maxFrictionForceN} N. The block remains stationary.`,
        governingPrinciple: "Newton's First Law of Motion (Inertia & Balanced Forces)",
        influencingVariables: ['appliedForceN', 'blockMassKg'],
        keyTakeaway: 'An object will remain at rest unless acted upon by a net unbalanced external force. Here, friction exactly balances the applied force.',
        educationalLevel: 'CBSE & CISCE Class 8–9 Physics (Newton’s Laws of Motion)',
      };
    }
    return {
      observation: `Net unbalanced force of ${outputs.netForceN} N accelerates the ${state.blockMassKg} kg block at ${outputs.accelerationMs2} m/s², reaching ${outputs.velocityAfter2sMs} m/s in 2 seconds.`,
      governingPrinciple: "Newton's Second Law of Motion (F_net = m · a)",
      influencingVariables: ['appliedForceN', 'blockMassKg'],
      keyTakeaway: 'The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.',
      educationalLevel: 'CBSE & CISCE Class 8–9 Physics (Force and Acceleration)',
    };
  },
};
