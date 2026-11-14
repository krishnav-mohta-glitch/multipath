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
