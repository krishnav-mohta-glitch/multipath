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
