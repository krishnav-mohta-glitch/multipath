/**
 * MULTIPATH V3 — Scientific Model Architecture & Telemetry Types
 * Stage B: Interactive Scientific Learning Workspace Transformation
 */

export interface ModelVariable<T = number> {
  id: string;
  name: string;
  symbol: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: T;
  description: string;
  scientificMeaning: string;
}

export interface ModelComponent {
  id: string;
  name: string;
  scientificRole: string;
  description: string;
  relatedVariables?: string[];
}

export interface ModelPreset<TState> {
  id: string;
  name: string;
  description: string;
  state: TState;
  expectedOutcome: string;
}

export interface ModelTelemetryItem {
  id: string;
  label: string;
  symbol?: string;
  value: string | number;
  unit?: string;
  description?: string;
  status?: 'optimal' | 'limiting' | 'inhibited' | 'neutral' | 'balanced';
}

export interface ContextualExplanation {
  observation: string;
  governingPrinciple: string;
  influencingVariables: string[];
  keyTakeaway: string;
  educationalLevel: string; // e.g. "CBSE & CISCE Classes 9–10 Physics"
}

export interface ScientificModelDefinition<TState, TOutputs> {
  id: string;
  name: string;
  discipline: string;
  curriculumTopicId: string;
  overview: string;
  variables: ModelVariable[];
  components: ModelComponent[];
  presets: ModelPreset<TState>[];
  initialState: TState;
  calculateOutputs: (state: TState) => TOutputs;
  getTelemetry: (state: TState, outputs: TOutputs) => ModelTelemetryItem[];
  getExplanation: (state: TState, outputs: TOutputs, selectedComponentId: string | null) => ContextualExplanation;
}

// ============================================================================
// 1. LINEAR EQUATIONS / DYNAMIC BALANCE MODEL TYPES
// ============================================================================

export interface LinearEquationsState {
  slope: number;      // m: rate of change / weight per unit length
  intercept: number;  // c: initial offset / tare load
  xVal: number;       // x: variable input position / token count
  targetY: number;    // y_target: counterweight on opposing pan
}

export interface LinearEquationsOutputs {
  leftLoad: number;        // L = m * x + c
  rightLoad: number;       // R = targetY
  imbalance: number;       // L - R
  tiltAngleRad: number;    // clamped tilt angle in radians
  isBalanced: boolean;     // |imbalance| < 0.001
  solutionX: number | null;// x where m*x + c = targetY (null if m === 0 and c != targetY)
  rateOfChange: number;    // derivative dy/dx = m
}

// ============================================================================
// 2. PHOTOSYNTHESIS PHOTOCHEMICAL CHAMBER MODEL TYPES
// ============================================================================

export type WavelengthType = 'white' | 'red' | 'blue' | 'green';

export interface PhotosynthesisState {
  lightIntensity: number;       // 0 to 100% (or µmol photons / m² / s)
  wavelength: WavelengthType;   // Spectrum band
  co2Concentration: number;     // 200 to 1200 ppm
  temperature: number;          // 10 to 45 °C
}

export interface PhotosynthesisOutputs {
  quantumEfficiency: number;    // 0.0 to 1.0 (chlorophyll a/b absorption curve)
  lightAbsorptionRate: number;  // lightIntensity * quantumEfficiency
  co2SaturationFactor: number;  // Michaelis-Menten kinetic factor [0, 1]
  temperatureFactor: number;    // Optimum at 25-30 °C, denaturation above 38 °C
  limitingFactor: 'LIGHT' | 'CO2' | 'TEMPERATURE' | 'NONE';
  netPhotosyntheticRate: number;// relative arbitrary units [0, 100]
  bubbleRate: number;           // O2 bubbles per minute [0, 60]
  glucoseProductionRate: number;// mg / dm² / hr
  isOptimal: boolean;
}

// ============================================================================
// 3. OPTICS LABORATORY (LIGHT, REFLECTION, SHADOWS) MODEL TYPES
// ============================================================================

export interface OpticsLabState {
  incidentAngleDeg: number;       // 0 to 80 degrees
  mirrorPresent: boolean;         // plane mirror reflection active
  obstacleDistanceCm: number;     // distance of opaque obstacle from light source (10 to 80 cm)
  screenDistanceCm: number;       // distance of screen from light source (50 to 120 cm)
  lightSourceSizeMm: number;      // point vs extended light source (1 to 20 mm)
  obstacleDiameterCm: number;     // diameter of circular obstacle (5 to 25 cm)
}

export interface OpticsLabOutputs {
  reflectedAngleDeg: number;      // law of reflection: θ_r = θ_i
  mirrorImageDistanceCm: number;  // virtual image distance behind mirror: d_i = d_o
  isVirtualImage: boolean;        // plane mirror always virtual, upright
  umbraDiameterCm: number;        // total dark shadow zone
  penumbraDiameterCm: number;     // partial shadow transition zone
  hasPenumbra: boolean;           // true when light source is extended
  magnification: number;          // shadow / obstacle ratio = d_screen / d_obstacle
  isLawOfReflectionVerified: boolean;
}

// ============================================================================
// 4. THERMAL LABORATORY (CONDUCTION, FOURIER'S LAW) MODEL TYPES
// ============================================================================

export type ThermalMaterialId = 'copper' | 'aluminum' | 'iron' | 'glass';

export interface ThermalLabState {
  materialId: ThermalMaterialId;  // material thermal conductivity k
  hotEndTempC: number;            // 20 to 150 °C
  coldEndTempC: number;           // 0 to 30 °C
  rodLengthCm: number;            // 10 to 50 cm
  rodCrossSectionMm2: number;     // 20 to 200 mm²
}

export interface ThermalLabOutputs {
  materialName: string;
  thermalConductivityK: number;   // W / (m · K)
  temperatureGradient: number;    // (T_hot - T_cold) / L in K/m
  heatTransferRateWatts: number;  // Q/t = k * A * ΔT / L (Fourier's Law)
  tempProfile: number[];          // 5 discrete probe points along rod
  atomVibrationAmplitude: number; // normalized molecular kinetic lattice agitation [0.2, 1.8]
  timeToMeltWaxSec: number;       // time for pin/wax to drop at probe point 3
}

// ============================================================================
// 5. MECHANICS LABORATORY (FORCE, PRESSURE, NEWTON'S 2ND LAW) MODEL TYPES
// ============================================================================

export type SurfaceMaterialId = 'ice' | 'wood' | 'concrete';

export interface MechanicsLabState {
  appliedForceN: number;          // 0 to 200 N
  contactAreaCm2: number;         // 1 to 100 cm²
  blockMassKg: number;            // 1 to 20 kg
  surfaceType: SurfaceMaterialId; // friction coefficients
  mode: 'pressure' | 'dynamics';  // Pressure P=F/A vs Acceleration F=ma
}

export interface MechanicsLabOutputs {
  pressurePascals: number;        // P = F / A (N/m²)
  pressureAtm: number;            // standard atmospheres
  frictionCoefficient: number;    // μ_k (ice: 0.05, wood: 0.35, concrete: 0.65)
  maxFrictionForceN: number;      // f = μ * m * g
  netForceN: number;              // F_applied - f (clamped >= 0)
  accelerationMs2: number;        // a = F_net / m
  velocityAfter2sMs: number;      // v = a * t (t = 2.0s)
  displacementAfter2sM: number;   // s = 0.5 * a * t²
  penetrationDepthMm: number;     // substrate indentation based on Pascals
  motionState: 'stationary' | 'accelerating' | 'sliding';
}
