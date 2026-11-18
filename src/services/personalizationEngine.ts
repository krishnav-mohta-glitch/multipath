import type { Topic } from '../types/topic';
import type { 
  InterestDomain, 
  PersonalizedConceptExperience, 
  PersonalizedLearningContext,
  InteractiveSandboxModel,
  UnderstandingCheckQuestion,
  RealWorldApplication
} from '../types/personalization';

export const INTEREST_DOMAINS: InterestDomain[] = [
  {
    id: 'football',
    name: 'Football & Sports',
    icon: '⚽',
    badge: 'Athletics & Physics',
    tagline: 'Trajectory arcs, stadium turf friction, stud pressure & sprint kinetics',
    theme: {
      glow: 'from-[#0A1A12]/60 via-[#08120C]/30 to-[#080A0E]',
      border: 'border-[#10B981]/30',
      badge: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30',
      text: 'text-[#34D399]',
      accent: '#10B981'
    },
    sampleConnection: 'Understanding force distributions and ball momentum during penalties and set pieces.'
  },
  {
    id: 'gaming',
    name: 'Gaming & Esports',
    icon: '🎮',
    badge: 'Game Physics & Logic',
    tagline: 'Game engine mechanics, frame delta vectors, hitboxes & resource curves',
    theme: {
      glow: 'from-[#06B6D4]/20 via-[#8B5CF6]/15 to-[#080A0E]',
      border: 'border-[#06B6D4]/35',
      badge: 'bg-[#06B6D4]/15 text-[#67E8F9] border-[#06B6D4]/30',
      text: 'text-[#67E8F9]',
      accent: '#06B6D4'
    },
    sampleConnection: 'Balancing player health, armor stat multipliers and logarithmic weapon scaling.'
  },
  {
    id: 'tech',
    name: 'Technology & Computers',
    icon: '💻',
    badge: 'Hardware & Code',
    tagline: 'Silicon logic gates, binary state trees, network packet routing & memory pipelines',
    theme: {
      glow: 'from-[#6366F1]/20 via-[#3B82F6]/15 to-[#080A0E]',
      border: 'border-[#6366F1]/35',
      badge: 'bg-[#6366F1]/15 text-[#A5B4FC] border-[#6366F1]/30',
      text: 'text-[#A5B4FC]',
      accent: '#6366F1'
    },
    sampleConnection: 'Algorithmic state transitions, CPU clock cycles and deterministic data structures.'
  },
  {
    id: 'space',
    name: 'Space & Astronomy',
    icon: '🚀',
    badge: 'Astrophysics',
    tagline: 'Orbital velocity, gravitational slingshots, escape mechanics & stellar fusion',
    theme: {
      glow: 'from-[#818CF8]/20 via-[#C084FC]/15 to-[#080A0E]',
      border: 'border-[#818CF8]/35',
      badge: 'bg-[#818CF8]/15 text-[#C084FC] border-[#818CF8]/30',
      text: 'text-[#C084FC]',
      accent: '#818CF8'
    },
    sampleConnection: 'Conservation of mechanical energy during orbital insertions and deep-space burns.'
  },
  {
    id: 'science',
    name: 'Science & Experiments',
    icon: '🧪',
    badge: 'Empirical Lab',
    tagline: 'Reaction stoichiometry, molecular bond angles, thermodynamic states & calorimetry',
    theme: {
      glow: 'from-[#14B8A6]/20 via-[#10B981]/15 to-[#080A0E]',
      border: 'border-[#14B8A6]/35',
      badge: 'bg-[#14B8A6]/15 text-[#5EEAD4] border-[#14B8A6]/30',
      text: 'text-[#5EEAD4]',
      accent: '#14B8A6'
    },
    sampleConnection: 'Testing hypotheses by systematically isolating independent and dependent variables.'
  },
  {
    id: 'music',
    name: 'Music & Beats',
    icon: '🎵',
    badge: 'Acoustics & Waves',
    tagline: 'Harmonic overtones, acoustic wave interference, resonance chambers & decibel gain',
    theme: {
      glow: 'from-[#F472B6]/20 via-[#38BDF8]/15 to-[#080A0E]',
      border: 'border-[#F472B6]/35',
      badge: 'bg-[#F472B6]/15 text-[#F472B6] border-[#F472B6]/30',
      text: 'text-[#F472B6]',
      accent: '#F472B6'
    },
    sampleConnection: 'Vibrating strings, sound pressure nodes and constructive audio frequency synthesis.'
  },
  {
    id: 'art',
    name: 'Art & Design',
    icon: '🎨',
    badge: 'Geometry & Optics',
    tagline: 'Perspective projection, golden ratio symmetry, pigment wavelengths & color refraction',
    theme: {
      glow: 'from-[#FB923C]/20 via-[#F43F5E]/15 to-[#080A0E]',
      border: 'border-[#FB923C]/35',
      badge: 'bg-[#FB923C]/15 text-[#FDBA74] border-[#FB923C]/30',
      text: 'text-[#FDBA74]',
      accent: '#FB923C'
    },
    sampleConnection: 'Vanishing-point coordinate geometry, light absorption and structural composition.'
  },
  {
    id: 'nature',
    name: 'Nature & Animals',
    icon: '🌿',
    badge: 'Ecology & Biology',
    tagline: 'Biochemical cycles, cellular respiration, predator-prey equilibria & adaptation',
    theme: {
      glow: 'from-[#84CC16]/20 via-[#10B981]/15 to-[#080A0E]',
      border: 'border-[#84CC16]/35',
      badge: 'bg-[#84CC16]/15 text-[#BEF264] border-[#84CC16]/30',
      text: 'text-[#BEF264]',
      accent: '#84CC16'
    },
    sampleConnection: 'Energy transfer across trophic food webs and photosynthetic carbon fixation.'
  },
  {
    id: 'movies',
    name: 'Cinema & Storytelling',
    icon: '🎬',
    badge: 'Optics & Narrative',
    tagline: 'Optical lens focal length, cinematic pacing, lighting contrast ratios & causal arcs',
    theme: {
      glow: 'from-[#E11D48]/20 via-[#9333EA]/15 to-[#080A0E]',
      border: 'border-[#E11D48]/35',
      badge: 'bg-[#E11D48]/15 text-[#FDA4AF] border-[#E11D48]/30',
      text: 'text-[#FDA4AF]',
      accent: '#E11D48'
    },
    sampleConnection: 'Focal depth refraction, frame-rate shutter physics and dramatic thematic structure.'
  },
  {
    id: 'engineering',
    name: 'Cars & Engineering',
    icon: '🏎️',
    badge: 'Mechanics & Power',
    tagline: 'Combustion cycles, aerodynamic downforce, suspension spring harmonics & gear ratios',
    theme: {
      glow: 'from-[#EF4444]/20 via-[#F59E0B]/15 to-[#080A0E]',
      border: 'border-[#EF4444]/35',
      badge: 'bg-[#EF4444]/15 text-[#FCA5A5] border-[#EF4444]/30',
      text: 'text-[#FCA5A5]',
      accent: '#EF4444'
    },
    sampleConnection: 'Torque transmission, hydraulic braking systems and thermodynamic efficiency.'
  },
  {
    id: 'business',
    name: 'Business & Finance',
    icon: '💼',
    badge: 'Economics & Models',
    tagline: 'Compound interest rates, supply-demand equilibria, profit margins & venture metrics',
    theme: {
      glow: 'from-[#10B981]/20 via-[#3B82F6]/15 to-[#080A0E]',
      border: 'border-[#10B981]/35',
      badge: 'bg-[#10B981]/15 text-[#6EE7B7] border-[#10B981]/30',
      text: 'text-[#6EE7B7]',
      accent: '#10B981'
    },
    sampleConnection: 'Linear cost-revenue balance, statistical risk modeling and compound growth curves.'
  },
  {
    id: 'cooking',
    name: 'Cooking & Food',
    icon: '🍳',
    badge: 'Culinary Chemistry',
    tagline: 'Maillard browning kinetics, acid-base leavening, emulsion stability & heat diffusion',
    theme: {
      glow: 'from-[#F59E0B]/20 via-[#DC2626]/15 to-[#080A0E]',
      border: 'border-[#F59E0B]/35',
      badge: 'bg-[#F59E0B]/15 text-[#FCD34D] border-[#F59E0B]/30',
      text: 'text-[#FCD34D]',
      accent: '#F59E0B'
    },
    sampleConnection: 'Thermal conductivity in cookware, yeast enzyme fermentation and stoichiometric recipes.'
  },
  {
    id: 'history',
    name: 'History & Culture',
    icon: '🏛️',
    badge: 'Civilization & Causality',
    tagline: 'Trade route networks, constitutional reforms, demographic shifts & archaeological dating',
    theme: {
      glow: 'from-[#D97706]/20 via-[#78350F]/20 to-[#080A0E]',
      border: 'border-[#D97706]/35',
      badge: 'bg-[#D97706]/15 text-[#FDE68A] border-[#D97706]/30',
      text: 'text-[#FDE68A]',
      accent: '#D97706'
    },
    sampleConnection: 'Tracing causal preconditions, socio-economic tipping points and historical primary sources.'
  },
  {
    id: 'puzzles',
    name: 'Mathematics & Puzzles',
    icon: '🧩',
    badge: 'Logic & Cryptography',
    tagline: 'Modular arithmetic, combinatorial graph theory, invariant game states & proofs',
    theme: {
      glow: 'from-[#00F0FF]/20 via-[#B8FF00]/15 to-[#080A0E]',
      border: 'border-[#00F0FF]/35',
      badge: 'bg-[#00F0FF]/15 text-[#67E8F9] border-[#00F0FF]/30',
      text: 'text-[#67E8F9]',
      accent: '#00F0FF'
    },
    sampleConnection: 'Invariant states in combinatorial games, prime factorization and deductive logic proofs.'
  },
  {
    id: 'academic',
    name: 'Pure Academic (No Analogy)',
    icon: '📐',
    badge: 'First Principles & Rigor',
    tagline: 'Direct textbook derivations, formal axioms, invariant mathematical proofs & theorems',
    theme: {
      glow: 'from-[#64748B]/20 via-[#475569]/15 to-[#080A0E]',
      border: 'border-white/20',
      badge: 'bg-white/10 text-[#F3F4EC] border-white/20',
      text: 'text-white',
      accent: '#B8FF00'
    },
    sampleConnection: 'Direct deductive derivation without metaphorical abstractions or external domains.'
  }
];

export function getInterestDomain(id?: string | null): InterestDomain {
  if (!id) return INTEREST_DOMAINS[0];
  const found = INTEREST_DOMAINS.find((d) => d.id === id.toLowerCase());
  return found || INTEREST_DOMAINS[0];
}

/**
 * Universal Personalisation Engine:
 * Generates an academically rigorous, interest-grounded 7-part learning experience
 * for ANY of the 74 topics in the MULTIPATH canonical catalog across CBSE & ICSE classes 6-12.
 */
export function getPersonalizedConceptExperience(
  topic: Topic,
  context: PersonalizedLearningContext
): PersonalizedConceptExperience {
  const isPureAcademic = context.selectedInterest === 'academic';
  const interest = isPureAcademic ? getInterestDomain('academic') : getInterestDomain(context.selectedInterest);
  const simplicity = context.simplicityMode || 'eli5';

  // Extract core academic terminology and formulas from the canonical topic definition
  const formulas = extractFormulasFromTopic(topic);
  const primaryFormula = formulas[0] || (topic.subjectId === 'mathematics' ? 'y = mx + c' : 'Invariant Rule');
  const keyTerms = topic.keyTerms?.length ? topic.keyTerms : [
    { term: topic.title, definition: topic.overview || 'The fundamental concept and core invariant principle.' },
    { term: 'Invariant Principle', definition: 'The underlying law that remains unchanged regardless of the contextual example.' }
  ];

  // 1. Personalised Introduction (Hook & Intuitive Bridge)
  const intro = isPureAcademic
    ? {
        headline: `Axiomatic Deconstruction: ${topic.title}`,
        hook: `Understanding ${topic.title} through formal first principles and canonical definitions.`,
        familiarScenario: `In classical academic study, ${topic.title} represents a core foundation of ${topic.subjectId}. Every rule is derived through formal definitions and reversible logical operations.`,
        intuitiveBridge: `We explore ${topic.title} through its formal mathematical or physical properties without relying on external metaphors.`
      }
    : synthesizeInterestIntro(topic, interest, simplicity);

  // 2. The Actual Academic Concept
  const academicConcept = {
    formalDefinition: topic.overview || `A rigorous conceptual model representing ${topic.title} within ${topic.subjectId}.`,
    whyItWorks: topic.whyItMatters || `Understanding this principle allows accurate prediction and quantitative modeling of physical, logical, or mathematical systems.`,
    governingFormulas: formulas.length ? formulas : [primaryFormula],
    keyTerms,
    conditionsAndAssumptions: [
      `Valid under standard educational scope: Class ${context.classLevel || '6-12'} curriculum specifications.`,
      `Assumes idealized system boundaries unless frictional, thermal, or environmental resistance is explicitly modeled.`,
      `Preserves invariant mathematical truth through reversible inverse operations.`
    ],
    commonMisconceptions: [
      {
        myth: `Students often confuse the contextual example (like ${interest.name}) with the literal scientific law.`,
        reality: `The analogy is merely a mental bridge; the true law (${primaryFormula}) applies universally across all physical, biological, or mathematical systems.`
      },
      {
        myth: `Memorizing formulas without understanding the underlying invariant relationship leads to test errors.`,
        reality: `When you understand why variables depend on each other, you can re-derive the solution from first principles under exam pressure.`
      }
    ]
  };

  // 3. Interactive Interest-Themed Sandbox
  const sandbox = synthesizeInteractiveSandbox(topic, interest, isPureAcademic);

  // 4. Visual Explanation
  const visualExplanation = {
    type: (topic.id.includes('math-linear') || topic.id.includes('bio-photosynthesis') ? '2d-interactive' : 'schematic') as '3d' | '2d-interactive' | 'schematic',
    title: `${topic.title}: Spatial Architecture & Invariant Model`,
    caption: `Interactive structural model mapping ${topic.title} to both the ${interest.name} context and universal scientific principles.`
  };

  // 5. Real-World Applications
  const realWorldApplications: RealWorldApplication[] = isPureAcademic
    ? [
        {
          title: `Fundamental Science & Engineering Application`,
          domain: 'Applied Science',
          description: `Direct implementation of ${topic.title} in state-of-the-art computational and industrial workflows.`,
          mechanism: `Operates directly via ${primaryFormula} to predict system behavior and guarantee stability.`,
          isInterestConnected: false
        },
        {
          title: `Academic Research & Standardized Examination Modeling`,
          domain: 'Curriculum & Research',
          description: `How ${topic.title} appears in national examination blueprints (CBSE/ICSE) and university research.`,
          mechanism: `Evaluating balance, rates of change, and causal pathways across structured problem sets.`,
          isInterestConnected: false
        }
      ]
    : [
        {
          title: `${interest.name} Field Scenario`,
          domain: interest.name,
          description: `How professional practitioners in ${interest.name} intuitively apply ${topic.title} to gain performance or structural advantages.`,
          mechanism: `Directly leverages ${primaryFormula} within ${interest.tagline.split(',')[0]}.`,
          isInterestConnected: true
        },
        {
          title: `High-Stakes Industrial & Engineering Reality`,
          domain: 'Global Engineering',
          description: `How global aerospace, biomedical, or civil engineers use ${topic.title} outside recreational contexts.`,
          mechanism: `Guarantees safety margins, prevents structural failures, and optimizes energy transfer.`,
          isInterestConnected: false
        }
      ];

  // 6. Test Your Understanding
  const understandingChecks = synthesizeUnderstandingChecks(topic, interest, isPureAcademic);

  // 7. Apply Beyond Your Interest (Knowledge Transfer to Exam Context)
  const transferBeyondInterest = {
    conventionalContext: `Standard Examination Problem (Board Blueprint Context)`,
    examQuestionScenario: `A standard board examination question testing ${topic.title} will not use ${interest.name}. Instead, it presents an unfamiliar scenario (such as a laboratory calorimeter, a civil suspension bridge, or an abstract algebraic balance).`,
    sampleProblem: `An idealized system governed by ${primaryFormula} experiences a 50% increase in the primary independent variable. How must the dependent variable adapt to preserve invariant equilibrium?`,
    takeawayInsight: `By focusing on the invariant relationship rather than the familiar analogy, you can confidently solve any novel examination question regardless of what scenario the examiner describes.`
  };

  return {
    topicId: topic.id,
    topicTitle: topic.title,
    subjectId: topic.subjectId,
    interestId: interest.id,
    interestName: interest.name,
    interestIcon: interest.icon,
    isPureAcademic,
    intro,
    academicConcept,
    sandbox,
    visualExplanation,
    realWorldApplications,
    understandingChecks,
    transferBeyondInterest
  };
}

// -----------------------------------------------------------------------------
// HELPER SYNTHESIZERS
// -----------------------------------------------------------------------------

function extractFormulasFromTopic(topic: Topic): string[] {
  const formulas: string[] = [];
  const textToScan = `${topic.overview || ''} ${topic.whyItMatters || ''} ${JSON.stringify(topic.paths || {})}`;
  
  // Regex looking for mathematical formulas like P = F / A, y = mx + c, F = ma, etc.
  const formulaRegex = /([A-Za-z]\s*=\s*[^.,;\n]{2,30})/g;
  let match;
  while ((match = formulaRegex.exec(textToScan)) !== null) {
    const candidate = match[1].trim();
    if (candidate.length > 3 && !formulas.includes(candidate)) {
      formulas.push(candidate);
    }
  }

  if (formulas.length === 0) {
    if (topic.subjectId === 'mathematics') formulas.push('y = mx + c', 'Ax + By = C');
    else if (topic.subjectId === 'physics') formulas.push('P = \\frac{F}{A}', 'F = ma');
    else if (topic.subjectId === 'chemistry') formulas.push('PV = nRT', 'A + B \\to C');
    else if (topic.subjectId === 'biology') formulas.push('6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2');
    else if (topic.subjectId === 'computer-science') formulas.push('T(n) = O(\\log n)');
    else formulas.push('\\text{Invariant Cause} \\implies \\text{Invariant Effect}');
  }

  return formulas.slice(0, 3);
}

function synthesizeInterestIntro(topic: Topic, interest: InterestDomain, simplicity: string) {
  const isEli5 = simplicity === 'eli5';
  
  const headline = isEli5
    ? `Hey! Let's understand ${topic.title} through ${interest.name} ${interest.icon}`
    : `${topic.title} Analyzed Through ${interest.name}`;

  const hook = `Ever wondered why ${interest.tagline.split(',')[0]} works so predictably? It turns out the exact same rule that makes ${interest.name} exciting is what governs ${topic.title}!`;

  const familiarScenario = `Picture yourself in your favorite ${interest.name} moment: ${interest.sampleConnection} Every time you make a decision, an unseen physical or logical invariant is strictly at work behind the scenes.`;

  const intuitiveBridge = `Instead of wrestling with dry textbook paragraphs right away, let's explore this rule through ${interest.name}. Once the intuition clicks here, the formal academic formula will feel completely obvious and second nature.`;

  return {
    headline,
    hook,
    familiarScenario,
    intuitiveBridge
  };
}

function synthesizeInteractiveSandbox(topic: Topic, interest: InterestDomain, isPureAcademic: boolean): InteractiveSandboxModel {
  // Topic-specific parameters or domain-aware parameters
  const isPhysicsOrPressure = topic.id.includes('pressure') || topic.id.includes('force') || topic.subjectId === 'physics';
  const isMathOrLinear = topic.id.includes('linear') || topic.subjectId === 'mathematics';
  const isBioOrChem = topic.subjectId === 'biology' || topic.subjectId === 'chemistry';

  if (isPhysicsOrPressure) {
    return {
      title: isPureAcademic ? 'Hydrostatic Pressure & Force Laboratory' : `${interest.name} Force & Contact Pressure Simulator`,
      scenarioDescription: isPureAcademic
        ? 'Manipulate force and contact area to observe resulting pressure in Pascals and atmospheres.'
        : `Simulate how changing mass, equipment contact surface, and impact angles in ${interest.name} dramatically alters the resulting pressure and friction!`,
      formulaDisplay: 'P = \\frac{F}{A}',
      parameters: [
        { id: 'forceParam', label: isPureAcademic ? 'Applied Force (N)' : 'Athlete / Object Weight (kg)', min: 40, max: 120, step: 5, defaultValue: 75, unit: isPureAcademic ? 'N' : 'kg' },
        { id: 'areaParam', label: isPureAcademic ? 'Surface Area (cm²)' : 'Footwear / Surface Contact Area (cm²)', min: 1, max: 300, step: 1, defaultValue: 6, unit: 'cm²' }
      ],
      calculateTelemetry: (params) => {
        const mass = params.forceParam || 75;
        const areaCm2 = params.areaParam || 6;
        const forceN = mass * 9.81;
        const areaM2 = Math.max(0.0001, areaCm2 / 10000);
        const pressurePa = forceN / areaM2;
        const pressureAtm = pressurePa / 101325;

        return {
          metrics: [
            { label: 'Downward Force', value: Math.round(forceN), unit: 'N' },
            { label: 'Effective Pressure', value: (pressurePa / 1000).toFixed(1), unit: 'kPa' },
            { label: 'Atmospheric Ratio', value: pressureAtm.toFixed(2), unit: 'atm' }
          ],
          outcomeMessage: pressureAtm > 10
            ? `Deep Surface Bite: Extreme pressure (${pressureAtm.toFixed(1)} atm) concentrates force into the substrate, delivering maximum traction and stopping power!`
            : `Surface Gliding: Wide contact area lowers localized pressure (${pressureAtm.toFixed(1)} atm), distributing weight evenly to avoid ground penetration.`,
          isSafeOrOptimal: pressureAtm > 5
        };
      }
    };
  }

  if (isMathOrLinear) {
    return {
      title: isPureAcademic ? 'Linear Rate of Change & Equilibrium Sandbox' : `${interest.name} Progression & Equilibrium Simulator`,
      scenarioDescription: isPureAcademic
        ? 'Adjust slope (m) and initial baseline (c) to observe the dynamic equilibrium trajectory y = mx + c.'
        : `Tune your ${interest.name} strategy: adjust rate of score/resource gain and baseline equipment to calculate exact break-even milestones!`,
      formulaDisplay: 'y = mx + c',
      parameters: [
        { id: 'rateParam', label: isPureAcademic ? 'Rate of Change (Slope m)' : 'Points / Gain per Round (m)', min: 1, max: 20, step: 1, defaultValue: 3, unit: 'rate' },
        { id: 'baselineParam', label: isPureAcademic ? 'Initial Offset (Y-Intercept c)' : 'Starting Bonus / Reserve (c)', min: 0, max: 100, step: 5, defaultValue: 15, unit: 'units' },
        { id: 'targetParam', label: isPureAcademic ? 'Target Equilibrium (Y)' : 'Victory Threshold / Target (Y)', min: 50, max: 250, step: 10, defaultValue: 75, unit: 'units' }
      ],
      calculateTelemetry: (params) => {
        const m = params.rateParam || 3;
        const c = params.baselineParam || 15;
        const target = params.targetParam || 75;
        const stepsNeeded = Math.max(0, Math.ceil((target - c) / m));

        return {
          metrics: [
            { label: 'Slope Invariant (m)', value: m, unit: 'Δy/Δx' },
            { label: 'Baseline (c)', value: c, unit: 'offset' },
            { label: 'Rounds to Target (x)', value: stepsNeeded, unit: 'steps' }
          ],
          outcomeMessage: stepsNeeded <= 15
            ? `Equilibrium Achieved in ${stepsNeeded} steps! The constant rate of change isolates the unknown variable x perfectly.`
            : `Gradual Trajectory: Requires ${stepsNeeded} steps. Increasing slope m accelerates progression toward the target threshold.`,
          isSafeOrOptimal: stepsNeeded <= 20
        };
      }
    };
  }

  // Universal fallback sandbox for biology, chemistry, history, etc.
  return {
    title: isPureAcademic ? `${topic.title}: Invariant State Simulator` : `${interest.name} × ${topic.title} Dynamic Model`,
    scenarioDescription: isPureAcademic
      ? `Observe how adjusting independent variables affects state transitions and equilibrium in ${topic.title}.`
      : `Test the principles of ${topic.title} inside a live ${interest.name} simulation. Watch the output shift as you calibrate system parameters!`,
    formulaDisplay: isBioOrChem ? 'Rate = k[A]^x[B]^y' : 'Input \\times Efficiency = Net Output',
    parameters: [
      { id: 'inputIntensity', label: isPureAcademic ? 'Input Energy / Reactant Concentration' : `${interest.name} Resource Input Intensity`, min: 10, max: 100, step: 5, defaultValue: 60, unit: '%' },
      { id: 'efficiencyFactor', label: isPureAcademic ? 'System Efficiency Multiplier' : 'Performance Execution Efficiency', min: 20, max: 100, step: 5, defaultValue: 80, unit: '%' }
    ],
    calculateTelemetry: (params) => {
      const input = params.inputIntensity || 60;
      const efficiency = params.efficiencyFactor || 80;
      const netOutput = (input * (efficiency / 100)).toFixed(1);
      const ratio = (input > 0 ? (Number(netOutput) / input) * 100 : 0).toFixed(0);

      return {
        metrics: [
          { label: 'Gross Input', value: input, unit: '%' },
          { label: 'Net Conversion', value: netOutput, unit: 'units' },
          { label: 'Transfer Ratio', value: ratio, unit: '%' }
        ],
        outcomeMessage: Number(netOutput) > 50
          ? `High-Yield Regime: System operates at peak productivity (${netOutput} units produced). Invariant balance preserved.`
          : `Sub-Optimal Regime: Input constraints or dissipation reduce output to ${netOutput} units. Increasing input drives the state forward.`,
        isSafeOrOptimal: Number(netOutput) > 40
      };
    }
  };
}

function synthesizeUnderstandingChecks(topic: Topic, interest: InterestDomain, isPureAcademic: boolean): UnderstandingCheckQuestion[] {
  return [
    {
      id: 'check-1',
      question: isPureAcademic
        ? `What is the essential invariant principle governing ${topic.title}?`
        : `In our ${interest.name} scenario, what fundamentally causes the system to change state?`,
      options: [
        isPureAcademic
          ? 'Performing symmetric, reversible operations that strictly preserve equality.'
          : 'Concentrating force onto smaller surface areas or accelerating the rate of change.',
        'Random variation that has no predictable mathematical relationship.',
        'Only adding more total mass without considering contact geometry or slope.',
        'Ignoring baseline offsets and guessing the outcome.'
      ],
      correctIndex: 0,
      explanation: isPureAcademic
        ? `Correct! Academic rigor requires preserving the truth of the system through reversible operations and invariant laws.`
        : `Spot on! The ${interest.name} example proves that outcome depends on how force or rate is concentrated and distributed, not mere random luck.`,
      hint: 'Look for the option that describes mathematical or physical balance.',
      transferQuestion: `How would you explain this principle to someone with zero background in ${interest.name}?`,
      transferAnswer: `State that the rule is universal: whenever an input changes, the system must balance it symmetrically according to the governing formula.`
    },
    {
      id: 'check-2',
      question: `If the primary independent variable in ${topic.title} is doubled while keeping other factors constant, what happens?`,
      options: [
        'The output doubles proportionally (linear dependency).',
        'The output drops to zero immediately.',
        'Nothing changes because variables do not affect the system.',
        'The system permanently breaks down.'
      ],
      correctIndex: 0,
      explanation: `Exactly! In a direct relationship, changing the input variable produces a predictable, proportional shift in the dependent output.`,
      hint: 'Think about direct mathematical proportionality.',
      transferQuestion: `Can you identify a place in your everyday life where this same doubling rule applies?`,
      transferAnswer: `Yes, such as walking twice as fast covering twice the distance in the same time period.`
    }
  ];
}
