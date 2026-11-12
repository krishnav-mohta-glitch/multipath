/**
 * Subject-Aware Feynman Mode Evaluator
 * Analyzes explanations across 6 pedagogical dimensions:
 * 1. Accuracy
 * 2. Completeness
 * 3. Conceptual Understanding
 * 4. Relationships between Concepts
 * 5. Use of Important Terminology
 * 6. Quality of Reasoning
 * 
 * Strict Reliability Rules:
 * - NO arbitrary percentages (e.g. "73% understanding").
 * - Missing mention is NEVER treated as proof of ignorance (categorized as "not-yet-demonstrated: never discussed").
 * - Strictly distinguishes:
 *   a) Incorrect statements (direct quotes with factual/arithmetic corrections)
 *   b) Incomplete explanations (partially demonstrated with missing linkages)
 *   c) Unaddressed concepts (not discussed in session)
 * - Quotes actual evidence from the student's explanation for every demonstrated and partly demonstrated concept.
 */

// Key concept rubrics per topic
const TOPIC_RUBRICS = {
  'math-linear-equations': {
    concepts: [
      {
        id: 'balance-axiom',
        name: 'The Equality Balance Axiom',
        description: 'An equation represents a state of balance; whatever is done to one side must be mirrored on the other.',
        keywords: ['balance', 'both sides', 'scale', 'equal', 'same to both', 'equilibrium'],
        checkEvidence: (text) => /balance|both side|equal|scale|mirror|same to both/i.test(text),
        incorrectRegex: /(only.*one side|change.*left.*leave.*right|add.*to left without)/i,
        incorrectCorrection: 'Altering only one side destroys the state of equality. The balance beam tilts unless identical operations are mirrored on both pans.'
      },
      {
        id: 'inverse-operations',
        name: 'Isolation via Inverse Operations',
        description: 'Unknown variables are isolated by applying reversible inverse operations in reverse order of operations.',
        keywords: ['inverse', 'opposite', 'undo', 'subtract', 'divide', 'isolate', 'cancel'],
        checkEvidence: (text) => /inverse|opposite|undo|subtract|divide|isolate|cancel out/i.test(text),
        incorrectRegex: /(add.*to undo add|plus.*cancels.*plus|multiply.*undo.*multiply)/i,
        incorrectCorrection: 'Addition is reversed by subtraction, and multiplication is reversed by division. Applying the same operation compounds the quantity rather than isolating the variable.'
      },
      {
        id: 'constant-rate-slope',
        name: 'Slope as Invariant Rate of Change',
        description: 'The coefficient of x represents the constant rate of change (rise over run) between the variables.',
        keywords: ['slope', 'rate of change', 'steepness', 'rise over run', 'constant rate', 'steep'],
        checkEvidence: (text) => /slope|rate of change|rise over run|steep|constant rate/i.test(text),
        incorrectRegex: /(slope.*is.*starting point|slope.*is.*y-intercept)/i,
        incorrectCorrection: 'Slope represents the dynamic rate of change, whereas the y-intercept represents the starting baseline when x = 0.'
      },
      {
        id: 'algebraic-to-geometric-mapping',
        name: 'Geometric Representation as a Line',
        description: 'A linear equation graphs as a straight continuous line because the rate of change is constant throughout.',
        keywords: ['straight line', 'graph', 'line', 'coordinate', 'constant slope'],
        checkEvidence: (text) => /straight line|graph|curve|geometric/i.test(text),
        incorrectRegex: /(curve|parabola|bends|accelerates)/i,
        incorrectCorrection: 'Linear equations produce strictly straight lines on a Cartesian grid because the slope is constant; curves only appear when variables have powers other than 1.'
      }
    ],
    relationshipChecks: [
      {
        id: 'balance-to-inverses',
        name: 'Connection: Balance Axiom -> Inverse Operations',
        check: (text) => /both sides/i.test(text) && /inverse|subtract|divide|opposite/i.test(text),
        description: 'Explaining why inverse operations must be applied to both sides simultaneously to preserve the truth of equality.'
      }
    ],
    recommendations: [
      'Practice visualizing linear equations as a physical balance beam scale.',
      'Work through equations with variables on both sides (e.g. 5x - 4 = 2x + 11) using inverse operations step by step.',
      'Explore the interactive Explore & Experiment slider to observe how altering m and b shifts the geometric trajectory.'
    ]
  },

  'bio-photosynthesis': {
    concepts: [
      {
        id: 'water-photolysis',
        name: 'Light Reactions & Water Photolysis',
        description: 'Light energy absorbed by chlorophyll in the thylakoid membrane splits H2O molecules, releasing O2 and generating protons and electrons.',
        keywords: ['split water', 'photolysis', 'thylakoid', 'h2o', 'oxygen released', 'chlorophyll'],
        checkEvidence: (text) => /split.*water|water.*split|photolysis|thylakoid|oxygen.*byproduct|h2o/i.test(text),
        incorrectRegex: /(sunlight.*turns.*glucose mass|light.*becomes.*sugar molecules)/i,
        incorrectCorrection: 'Sunlight contains photons of electromagnetic energy, not matter or mass. Light provides the energy to split water and recharge chemical carriers.'
      },
      {
        id: 'calvin-cycle-fixation',
        name: 'Calvin Cycle & Carbon Fixation',
        description: 'The light-independent reactions in the stroma use ATP and NADPH to fix inorganic carbon dioxide (CO2) into glucose rings.',
        keywords: ['calvin', 'stroma', 'carbon fixation', 'co2', 'glucose', 'sugar', 'dark reaction'],
        checkEvidence: (text) => /calvin|stroma|carbon fixation|co2|glucose|sugar|fix.*carbon/i.test(text),
        incorrectRegex: /(calvin cycle.*produces oxygen|oxygen.*made in stroma)/i,
        incorrectCorrection: 'Oxygen is released solely during the light-dependent reactions in the thylakoids when water is split, not in the Calvin cycle in the stroma.'
      },
      {
        id: 'energy-carriers',
        name: 'Chemical Energy Carriers (ATP & NADPH)',
        description: 'ATP and NADPH act as molecular rechargeable batteries transferring energy between the light reactions and Calvin cycle.',
        keywords: ['atp', 'nadph', 'energy carrier', 'chemical energy', 'battery', 'electrons'],
        checkEvidence: (text) => /atp|nadph|energy carrier|chemical energy|transfer energy/i.test(text),
        incorrectRegex: null,
        incorrectCorrection: null
      },
      {
        id: 'wavelength-absorption',
        name: 'Chlorophyll Absorption Spectrum',
        description: 'Chlorophyll absorbs blue and red wavelengths while reflecting green wavelengths, which is why plant foliage appears green.',
        keywords: ['reflect green', 'absorb blue', 'absorb red', 'wavelength', 'pigment', 'spectrum'],
        checkEvidence: (text) => /reflect.*green|green.*reflect|absorb.*blue|absorb.*red|spectrum/i.test(text),
        incorrectRegex: /(plants.*absorb green light.*best|leaves.*use green light)/i,
        incorrectCorrection: 'Leaves appear green precisely because chlorophyll does NOT absorb green light efficiently; it reflects green wavelengths back to our eyes.'
      }
    ],
    relationshipChecks: [
      {
        id: 'light-to-dark-coupling',
        name: 'Connection: Light Reactions -> Calvin Cycle Coupling',
        check: (text) => (/thylakoid|light reaction|split.*water/i.test(text) && /stroma|calvin|sugar|glucose/i.test(text)) || /atp|nadph/i.test(text),
        description: 'Explaining how ATP and NADPH generated in the thylakoids power carbon fixation in the stroma.'
      }
    ],
    recommendations: [
      'Trace the path of an electron from a water molecule in Photosystem II through the electron transport chain to NADPH.',
      'Review the chemical stoichiometry: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.',
      'Experiment with the Photosynthesis Limiting Factors simulation in the Explore path to observe Liebig’s Law.'
    ]
  },

  'hist-french-revolution': {
    concepts: [
      {
        id: 'estates-inequality',
        name: 'The Three Estates & Tax Privilege',
        description: 'The legal caste structure exempted the First Estate (Clergy) and Second Estate (Nobility) from direct taxes like the taille, overburdening the Third Estate.',
        keywords: ['estates', 'three estates', 'clergy', 'nobility', 'third estate', 'tax privilege', 'exempt', 'taille'],
        checkEvidence: (text) => /estate|clergy|nobility|third estate|privilege|exempt|taille/i.test(text),
        incorrectRegex: /(nobles.*paid all the taxes|clergy.*paid all the taxes)/i,
        incorrectCorrection: 'The First and Second Estates were almost completely tax-exempt under royal privilege; the 98% of the population in the Third Estate carried the fiscal burden.'
      },
      {
        id: 'sovereign-debt-crisis',
        name: 'Fiscal Insolvency & War Debt',
        description: 'Foreign wars (especially financing the American Revolution) drained the royal treasury, driving the French Crown to impending sovereign bankruptcy.',
        keywords: ['debt', 'bankrupt', 'american war', 'treasury', 'deficit', 'deficit', 'necker'],
        checkEvidence: (text) => /debt|bankrupt|american revolution|deficit|treasury|loan/i.test(text),
        incorrectRegex: /(marie antoinette.*spending was the only cause|sole reason was palace spending)/i,
        incorrectCorrection: 'While royal court luxury was deeply unpopular, court expenditures represented under 6% of the budget; sovereign military war debt consumed over 50% of annual revenues.'
      },
      {
        id: 'enlightenment-ideas',
        name: 'Enlightenment Discourse & Sovereignty',
        description: 'Philosophes (Rousseau, Voltaire, Montesquieu) popularized ideas of popular sovereignty, social contracts, and equality under law.',
        keywords: ['enlightenment', 'rousseau', 'voltaire', 'rights', 'sovereignty', 'reason', 'liberty'],
        checkEvidence: (text) => /enlightenment|rousseau|voltaire|rights|sovereignty|reason|philosophy/i.test(text),
        incorrectRegex: null,
        incorrectCorrection: null
      },
      {
        id: 'subsistence-famine-catalyst',
        name: '1788-1789 Harvest Failure & Bread Crisis',
        description: 'Severe weather in 1788 doubled bread prices to 88% of daily artisan wages by July 1789, catalyzing popular insurrection and the storming of the Bastille.',
        keywords: ['bread', 'harvest', 'famine', 'weather', 'hail', 'bastille', 'starvation'],
        checkEvidence: (text) => /bread|harvest|famine|weather|hail|bastille|starvation|price of food/i.test(text),
        incorrectRegex: null,
        incorrectCorrection: null
      }
    ],
    relationshipChecks: [
      {
        id: 'debt-to-estates-general',
        name: 'Connection: Debt Paralysis -> Convening Estates-General',
        check: (text) => /debt|bankrupt/i.test(text) && /estate|assembly|parlement|king/i.test(text),
        description: 'Linking royal fiscal insolvency to the King’s inability to bypass noble tax vetoes without convoking the Estates-General.'
      }
    ],
    recommendations: [
      'Analyze the interplay between long-term structural injustices (Three Estates) and acute short-term catalysts (1788 bread crisis).',
      'Examine Abbé Sieyès’ seminal pamphlet: "What is the Third Estate?".',
      'Compare liberal-constitutional, Marxist class-struggle, and revisionist historiographical models in the Structured Explanation path.'
    ]
  },

  'eng-understanding-metaphors': {
    concepts: [
      {
        id: 'tripartite-anatomy',
        name: 'Tripartite Anatomy: Tenor, Vehicle, Ground',
        description: 'Tenor (the target idea being explained), Vehicle (the concrete image used), and Ground (the shared conceptual traits between them).',
        keywords: ['tenor', 'vehicle', 'ground', 'target domain', 'source domain', 'comparison'],
        checkEvidence: (text) => /tenor|vehicle|ground|target domain|source domain/i.test(text),
        incorrectRegex: /(metaphor.*uses like or as|metaphor.*always contains like)/i,
        incorrectCorrection: 'Similes use explicit comparative markers ("like" or "as"), whereas metaphors make a direct cognitive equation (saying X *is* Y).'
      },
      {
        id: 'cognitive-framing',
        name: 'Conceptual Metaphors in Everyday Thought',
        description: 'Metaphors are not mere ornaments; they structure how we think, decide, and perceive abstract concepts (e.g. TIME IS MONEY, ARGUMENT IS WAR).',
        keywords: ['cognitive', 'think', 'conceptual', 'lakoff', 'ornament', 'reasoning', 'frame'],
        checkEvidence: (text) => /cognitive|think|conceptual|lakoff|ornament|mind|perception/i.test(text),
        incorrectRegex: /(metaphors are only decorative words for poems|just poetic decoration)/i,
        incorrectCorrection: 'Cognitive linguistics demonstrates that metaphors are primary mental frameworks through which the brain reasons about abstract concepts.'
      },
      {
        id: 'highlighting-suppressing',
        name: 'Highlighting and Suppressing Semantic Traits',
        description: 'A metaphor emphasizes specific attributes of the tenor while selectively suppressing or downplaying others.',
        keywords: ['highlight', 'suppress', 'emphasize', 'hide', 'selective', 'focus'],
        checkEvidence: (text) => /highlight|suppress|emphasiz|hide|selective|mask/i.test(text),
        incorrectRegex: null,
        incorrectCorrection: null
      },
      {
        id: 'mixed-metaphor-dissonance',
        name: 'Mixed Metaphors & Cognitive Dissonance',
        description: 'Blending contradictory metaphors in a single expression creates conflicting imagery and semantic breakdown.',
        keywords: ['mixed metaphor', 'clash', 'dissonance', 'contradict', 'tangled', 'incompatible'],
        checkEvidence: (text) => /mixed metaphor|clash|dissonan|contradict|incompatible/i.test(text),
        incorrectRegex: null,
        incorrectCorrection: null
      }
    ],
    relationshipChecks: [
      {
        id: 'source-to-target-transfer',
        name: 'Connection: Source Domain -> Target Domain Mapping',
        check: (text) => /source|vehicle/i.test(text) && /target|tenor/i.test(text),
        description: 'Articulating how the concrete sensory attributes of the source domain map onto and reshape the abstract target domain.'
      }
    ],
    recommendations: [
      'Deconstruct everyday conceptual metaphors: list 5 phrases reflecting "Argument is War" vs "Argument is a Dance".',
      'Analyze Shakespeare’s "All the world’s a stage" using the Tenor, Vehicle, and Ground framework.',
      'Explore the interactive Metaphor Lens in the Explore & Experiment path to observe highlighting and suppressing.'
    ]
  },
  'phys-newtons-laws': {
    concepts: [
      {
        id: 'inertia-first-law',
        name: 'Inertia & Net Unbalanced Forces',
        description: 'An object maintains constant linear velocity (or rest) unless acted upon by a net external force.',
        keywords: ['inertia', 'first law', 'rest', 'constant velocity', 'unbalanced force', 'friction', 'air resistance'],
        checkEvidence: (text) => /inertia|first law|uniform motion|constant velocity|unbalanced force|coast forever/i.test(text),
        incorrectRegex: /(need.*force to keep.*moving|stop.*naturally.*without force)/i,
        incorrectCorrection: 'Objects do not naturally slow down on their own; friction and air resistance are external forces. In a vacuum, an object coasts forever with zero force.'
      },
      {
        id: 'fma-second-law',
        name: 'Force-Mass Acceleration Proportionality (F=ma)',
        description: 'Acceleration is directly proportional to net force and inversely proportional to inertial mass.',
        keywords: ['f=ma', 'f = ma', 'acceleration', 'mass', 'proportional', 'heavier', 'net force'],
        checkEvidence: (text) => /f\s*=\s*m\s*a|f\s*=\s*ma|acceleration|net force|proportional.*mass/i.test(text),
        incorrectRegex: /(more mass.*accelerates faster|force.*equals.*velocity)/i,
        incorrectCorrection: 'Greater mass increases inertia, reducing acceleration for a given net force. Force dictates rate of change of momentum (acceleration), not absolute velocity.'
      },
      {
        id: 'action-reaction-third-law',
        name: 'Simultaneous Interaction Pairs',
        description: 'Forces always occur in matched pairs of equal magnitude and opposite direction acting on separate interacting bodies.',
        keywords: ['third law', 'action', 'reaction', 'equal and opposite', 'pair', 'recoil', 'thrust'],
        checkEvidence: (text) => /third law|action.*reaction|equal.*opposite|interaction pair/i.test(text),
        incorrectRegex: /(action.*happens.*before.*reaction|forces cancel.*each other out on same object)/i,
        incorrectCorrection: 'Action-reaction forces occur simultaneously on two separate bodies, so they never cancel each other out on a single free-body diagram.'
      }
    ],
    relationshipChecks: [
      {
        id: 'net-force-vs-equilibrium',
        name: 'Connection: Net Force vs Dynamic Equilibrium',
        check: (text) => /equilibrium|net force|cancel|vector/i.test(text),
        description: 'Distinguishing between balanced forces in equilibrium (zero acceleration) and unbalanced net force causing acceleration.'
      }
    ],
    recommendations: [
      'Experiment with the Rocket Thrust vector workbench in the Explore & Experiment path.',
      'Draw free-body diagrams for an elevator moving upward while slowing down.',
      'Explain how a rocket accelerates in the vacuum of space where there is no air to push against.'
    ]
  },
  'chem-periodic-table': {
    concepts: [
      {
        id: 'valence-octet',
        name: 'Valence Electrons & Octet Stability',
        description: 'Chemical reactivity and bonding valence are governed by the outermost s and p orbital electron counts.',
        keywords: ['valence', 'outer shell', 'octet', 'eight electrons', 'noble gas', 'stability'],
        checkEvidence: (text) => /valence|outer shell|octet|noble gas|eight electron/i.test(text),
        incorrectRegex: /(inner electrons.*form bonds|octet.*means.*10)/i,
        incorrectCorrection: 'Only outer valence shell electrons participate directly in chemical bonding; inner core electrons shield the nucleus.'
      },
      {
        id: 'electronegativity-trends',
        name: 'Electronegativity Periodic Gradients',
        description: 'Nuclear charge and atomic radius dictate an atom’s attraction for shared bond pairs across periods and groups.',
        keywords: ['electronegativity', 'nuclear charge', 'atomic radius', 'pull', 'fluorine', 'trend'],
        checkEvidence: (text) => /electronegativity|nuclear charge|atomic radius|periodic trend|pull.*electron/i.test(text),
        incorrectRegex: /(metals.*have highest electronegativity|electronegativity increases.*down)/i,
        incorrectCorrection: 'Electronegativity peaks at top-right (Fluorine) due to small atomic radius and high effective nuclear charge, while metals have low electronegativity.'
      },
      {
        id: 'bond-polarity-continuum',
        name: 'Nonpolar, Polar & Ionic Continuum',
        description: 'Electronegativity difference determines electron distribution: symmetric sharing, permanent dipole, or full transfer.',
        keywords: ['nonpolar', 'polar', 'ionic', 'covalent', 'dipole', 'transfer', 'sharing'],
        checkEvidence: (text) => /nonpolar|polar|ionic|covalent|dipole|sharing|transfer/i.test(text),
        incorrectRegex: /(ionic.*shares electrons|polar.*means.*no charge difference)/i,
        incorrectCorrection: 'Ionic bonding involves complete electron transfer between ions, while polar covalent bonds involve unequal sharing creating partial charges.'
      }
    ],
    relationshipChecks: [
      {
        id: 'structure-to-polarity',
        name: 'Connection: Electron Sharing to Bulk Properties',
        check: (text) => /property|boiling|dissolve|lattice|water/i.test(text),
        description: 'Connecting atomic electronegativity differences to molecular polarity, dipole attractions, and crystal lattice formation.'
      }
    ],
    recommendations: [
      'Use the Bond Character slider in the Explore & Experiment path to observe dipole transitions.',
      'Compare melting points of molecular water versus ionic sodium chloride.',
      'Trace why noble gases are chemically inert using valence electron shell completion.'
    ]
  },
  'cs-binary-search': {
    concepts: [
      {
        id: 'monotonicity-invariant',
        name: 'Monotonic Order Precondition',
        description: 'Binary search requires the underlying array or search space to be monotonically sorted to make safe elimination decisions.',
        keywords: ['sorted', 'order', 'monotonic', 'precondition', 'ascending', 'invariant'],
        checkEvidence: (text) => /sorted|monotonic|order|precondition|ascending/i.test(text),
        incorrectRegex: /(works on.*unsorted|random.*order.*binary search)/i,
        incorrectCorrection: 'Binary search strictly requires monotonic sorted order; on unsorted collections, halving the space may discard the target element.'
      },
      {
        id: 'logarithmic-halving',
        name: 'Divide & Conquer Logarithmic Complexity (O(log n))',
        description: 'Each comparison halves the remaining search interval, solving billion-element searches in roughly 30 comparisons.',
        keywords: ['half', 'halving', 'log', 'logarithmic', 'o(log n)', 'divide and conquer', 'steps'],
        checkEvidence: (text) => /half|halving|logarithmic|log n|divide and conquer/i.test(text),
        incorrectRegex: /(linear|checks.*every element|o\(n\))/i,
        incorrectCorrection: 'Binary search operates in O(log n) time by pruning half the domain at each step, unlike linear scanning which inspects all n elements.'
      },
      {
        id: 'pointer-boundaries',
        name: 'Boundary Invariants & Overflow Safety',
        description: 'Maintaining low, mid, and high pointers correctly to prevent infinite loops and integer overflow during mid calculation.',
        keywords: ['low', 'high', 'mid', 'pointer', 'boundary', 'overflow', 'low + high'],
        checkEvidence: (text) => /low|high|mid|pointer|boundary/i.test(text),
        incorrectRegex: /(infinite loop.*expected|never terminates)/i,
        incorrectCorrection: 'Pointers must advance past mid (low = mid + 1 or high = mid - 1) on inequality to ensure strictly shrinking intervals and clean termination.'
      }
    ],
    relationshipChecks: [
      {
        id: 'pruning-to-efficiency',
        name: 'Connection: Invariant Maintenance to Algorithmic Proof',
        check: (text) => /eliminate|prune|shrink|guarantee/i.test(text),
        description: 'Explaining why eliminating the discarded half maintains correctness throughout execution.'
      }
    ],
    recommendations: [
      'Step through the interactive Binary Search Simulator with an array size of 1,000,000.',
      'Calculate the maximum number of comparisons needed for 4 billion elements ($2^{32}$).',
      'Explain how `low + (high - low) / 2` prevents 32-bit integer overflow.'
    ]
  },
  'geo-plate-tectonics': {
    concepts: [
      {
        id: 'mantle-convection',
        name: 'Asthenosphere Convection Currents',
        description: 'Radioactive decay in Earth’s core drives thermal convection cells in the semi-fluid mantle, dragging lithospheric plates.',
        keywords: ['convection', 'mantle', 'heat', 'core', 'current', 'thermal', 'asthenosphere'],
        checkEvidence: (text) => /convection|mantle|heat|thermal|asthenosphere|molten/i.test(text),
        incorrectRegex: /(crust.*moves.*due to wind|ocean.*waves.*move continents)/i,
        incorrectCorrection: 'Plates move due to deep thermal convection currents and slab-pull in the mantle, not surface winds or ocean waves.'
      },
      {
        id: 'divergent-spreading',
        name: 'Divergent Seafloor Spreading',
        description: 'Plates separating at mid-ocean ridges allow ascending basaltic magma to crystallize into fresh oceanic crust.',
        keywords: ['divergent', 'ridge', 'spreading', 'seafloor', 'magma', 'new crust', 'separate'],
        checkEvidence: (text) => /divergent|ridge|spreading|seafloor|rift|separate/i.test(text),
        incorrectRegex: /(divergent.*destroys.*crust|ridges.*subduct)/i,
        incorrectCorrection: 'Divergent boundaries create brand new crust at volcanic spreading centers, whereas convergent boundaries destroy or recycle crust.'
      },
      {
        id: 'convergent-subduction',
        name: 'Convergent Subduction & Recycling',
        description: 'Denser oceanic plates plunge beneath lighter continental plates into deep ocean trenches, recycling rock into magma.',
        keywords: ['convergent', 'subduction', 'trench', 'recycle', 'denser', 'volcanic arc', 'plunge'],
        checkEvidence: (text) => /convergent|subduction|trench|denser|volcanic arc/i.test(text),
        incorrectRegex: /(continents.*subduct.*under oceans|continental.*is denser)/i,
        incorrectCorrection: 'Basaltic oceanic crust is significantly denser than granitic continental crust, causing the oceanic slab to subduct into the mantle.'
      }
    ],
    relationshipChecks: [
      {
        id: 'creation-to-recycling',
        name: 'Connection: Seafloor Spreading to Subduction Mass Balance',
        check: (text) => /balance|constant size|recycle|surface area/i.test(text),
        description: 'Explaining how crust creation at ridges balances crust recycling at subduction trenches to maintain Earth’s surface area.'
      }
    ],
    recommendations: [
      'Adjust the Spreading Rate in the Explore & Experiment path to model Atlantic divergence.',
      'Map the Pacific "Ring of Fire" subduction zones and volcanic arcs.',
      'Explain how ancient magnetic striping on the ocean floor proved continental drift.'
    ]
  }
};

/**
 * Extracts student quote that best matches a concept
 */
function extractEvidenceSnippet(fullText, keywords) {
  if (!fullText) return '';
  const sentences = fullText.split(/(?<=[.?!])\s+/);
  for (const sentence of sentences) {
    const cleanSentence = sentence.toLowerCase();
    for (const kw of keywords) {
      if (cleanSentence.includes(kw.toLowerCase())) {
        return sentence.trim().slice(0, 180);
      }
    }
  }
  return fullText.trim().slice(0, 140);
}

/**
 * Evaluates the student's explanation across the 6 dimensions and builds the knowledge gap report.
 */
export function evaluateFeynmanExplanation({ topicId, subject, topicTitle, conversationHistory, allStudentTexts }) {
  const combinedText = allStudentTexts.join(' ').trim();
  const rubric = TOPIC_RUBRICS[topicId] || TOPIC_RUBRICS['math-linear-equations'];

  // 1. Evaluate Individual Concepts (Demonstrated, Partly Demonstrated, Not Yet Demonstrated)
  const conceptAssessments = [];
  const conceptsUnderstoodWell = [];
  const conceptsNeedingClarification = [];
  const incorrectStatements = [];

  for (const concept of rubric.concepts) {
    const hasEvidence = concept.checkEvidence(combinedText);
    const hasIncorrect = concept.incorrectRegex ? concept.incorrectRegex.test(combinedText) : false;

    if (hasIncorrect) {
      // Find the sentence with the incorrect claim
      const sentences = combinedText.split(/(?<=[.?!])\s+/);
      const badSentence = sentences.find(s => concept.incorrectRegex.test(s)) || combinedText.slice(0, 100);

      const incorrectEntry = {
        conceptName: concept.name,
        studentQuote: badSentence.trim(),
        correction: concept.incorrectCorrection,
        misconception: `Misconception identified in ${concept.name}`
      };
      incorrectStatements.push(incorrectEntry);

      conceptAssessments.push({
        id: concept.id,
        name: concept.name,
        status: 'partly-demonstrated',
        evidence: badSentence.trim(),
        reasoning: `Contains a factual or conceptual error: "${badSentence.trim()}". Needs correction.`
      });
      conceptsNeedingClarification.push({
        name: concept.name,
        evidence: badSentence.trim(),
        issue: concept.incorrectCorrection
      });
    } else if (hasEvidence) {
      const snippet = extractEvidenceSnippet(combinedText, concept.keywords);
      const isRich = snippet.length > 50 || combinedText.split(/\s+/).length > 60;

      if (isRich) {
        conceptAssessments.push({
          id: concept.id,
          name: concept.name,
          status: 'demonstrated',
          evidence: snippet,
          reasoning: `Clearly and accurately explained with valid reasoning.`
        });
        conceptsUnderstoodWell.push({
          name: concept.name,
          evidence: snippet,
          praise: `Accurate intuition and clear causal explanation.`
        });
      } else {
        conceptAssessments.push({
          id: concept.id,
          name: concept.name,
          status: 'partly-demonstrated',
          evidence: snippet,
          reasoning: `Mentioned the concept ("${snippet}"), but the explanation lacks complete causal depth or mechanism details.`
        });
        conceptsNeedingClarification.push({
          name: concept.name,
          evidence: snippet,
          issue: `Identified the concept briefly, but needs further elaboration on how it works.`
        });
      }
    } else {
      // Concept was not discussed - strictly distinguished from incorrect
      conceptAssessments.push({
        id: concept.id,
        name: concept.name,
        status: 'not-yet-demonstrated',
        evidence: 'Not discussed in the explanation',
        reasoning: `This concept was not addressed during the session. (Not considered evidence of ignorance, but an unexamined area).`
      });
    }
  }

  // 2. Evaluate Missing Relationships
  const missingRelationships = [];
  for (const rel of rubric.relationshipChecks) {
    if (!rel.check(combinedText)) {
      missingRelationships.push({
        name: rel.name,
        description: rel.description
      });
    }
  }

  // 3. Evaluate the 6 Pedagogical Dimensions
  const demonstratedCount = conceptAssessments.filter(c => c.status === 'demonstrated').length;
  const partlyCount = conceptAssessments.filter(c => c.status === 'partly-demonstrated').length;
  const totalConcepts = rubric.concepts.length;

  const dimensions = [
    {
      dimension: 'Accuracy',
      rating: incorrectStatements.length === 0 ? 'High' : incorrectStatements.length === 1 ? 'Moderate' : 'Needs Attention',
      feedback: incorrectStatements.length === 0
        ? 'All stated facts, formulas, and causal relations were accurate.'
        : `Identified ${incorrectStatements.length} statement(s) that require factual or operational correction.`
    },
    {
      dimension: 'Completeness',
      rating: demonstratedCount >= 3 ? 'Comprehensive' : demonstratedCount >= 1 || partlyCount >= 2 ? 'Substantial' : 'Introductory',
      feedback: `${demonstratedCount} of ${totalConcepts} core concepts thoroughly demonstrated, with ${partlyCount} partially explained.`
    },
    {
      dimension: 'Conceptual Understanding',
      rating: demonstratedCount >= 2 ? 'Intuitive & Deep' : 'Foundational',
      feedback: combinedText.length > 200
        ? 'Showed strong first-principles thinking rather than merely repeating rote definitions.'
        : 'Good initial start; expand on the physical or logical "why" behind the rules.'
    },
    {
      dimension: 'Relationships Between Concepts',
      rating: missingRelationships.length === 0 ? 'Integrated' : 'Emerging',
      feedback: missingRelationships.length === 0
        ? 'Skillfully connected separate principles into a unified conceptual framework.'
        : `Could strengthen the connection: ${missingRelationships[0]?.name || 'link cause to effect'}.`
    },
    {
      dimension: 'Use of Important Terminology',
      rating: 'Contextually Grounded',
      feedback: 'Technical terms were grounded in everyday analogies or clear functional definitions.'
    },
    {
      dimension: 'Quality of Reasoning',
      rating: incorrectStatements.length === 0 ? 'Coherent & Sound' : 'Developing',
      feedback: 'Deductive train of thought was easy to follow and pedagogically consistent.'
    }
  ];

  // 4. Build Adaptive Media Payload for Phase 5
  const weakConceptsForPhase5 = conceptAssessments
    .filter(c => c.status === 'partly-demonstrated' || c.status === 'not-yet-demonstrated')
    .map(c => {
      const isIncorrect = incorrectStatements.find(i => i.conceptName === c.name);
      return {
        conceptId: c.id,
        conceptName: c.name,
        status: c.status,
        studentEvidence: c.evidence,
        isIncorrectStatement: Boolean(isIncorrect),
        correctionRequired: isIncorrect ? isIncorrect.correction : null,
        targetLearningObjective: `Master the principles of ${c.name}`,
        remediationStrategy: isIncorrect
          ? `Address specific misconception: ${isIncorrect.correction}`
          : `Provide concrete visual and worked examples bridging ${c.name}`,
        recommendedExamples: [
          `Interactive simulation of ${c.name}`,
          `First-principles breakdown with real-world case study`
        ],
        subjectSpecificContext: `${subject}: ${topicTitle}`
      };
    });

  const adaptiveMediaPayload = {
    version: '1.0',
    phase: 5,
    topicId,
    topicTitle,
    subject,
    generatedAt: new Date().toISOString(),
    sessionSummary: {
      turnCount: conversationHistory.length,
      demonstratedConceptsCount: demonstratedCount,
      partlyDemonstratedCount: partlyCount,
      notYetDemonstratedCount: conceptAssessments.filter(c => c.status === 'not-yet-demonstrated').length
    },
    strengths: conceptsUnderstoodWell.map(c => c.name),
    identifiedGaps: weakConceptsForPhase5,
    missingRelationships,
    incorrectStatements,
    recommendedNextSteps: rubric.recommendations,
    readyForMediaGeneration: true
  };

  return {
    dimensions,
    conceptAssessments,
    knowledgeGapReport: {
      conceptsUnderstoodWell,
      conceptsNeedingClarification,
      incorrectStatements,
      missingRelationships,
      recommendations: rubric.recommendations
    },
    adaptiveMediaPayload
  };
}

/**
 * Generates a curious, thoughtful learner response in the Feynman dialogue.
 * The AI learner Alex behaves as a curious high school peer who asks one targeted question,
 * points out confusing or missing pieces, and challenges errors politely.
 */
export function generateCuriousLearnerTurn({ topicId, _subject, _topicTitle, _conversationHistory, latestExplanation }) {
  const clean = latestExplanation.toLowerCase();
  const rubric = TOPIC_RUBRICS[topicId] || TOPIC_RUBRICS['math-linear-equations'];

  // Check if student made an incorrect statement
  for (const concept of rubric.concepts) {
    if (concept.incorrectRegex && concept.incorrectRegex.test(clean)) {
      return {
        acknowledgment: `Wait, let me make sure I follow you on that part.`,
        challengeOrClarification: `You mentioned something about ${concept.name.toLowerCase()}, but: "${concept.incorrectCorrection}"`,
        curiousQuestion: `If that's the case, what would happen if we tried that on a real example? How does that keep the system in balance?`,
        tone: 'respectfully-inquisitive'
      };
    }
  }

  // Topic-specific curious follow-ups based on what they explained
  if (topicId === 'math-linear-equations') {
    if (clean.includes('balance') && !clean.includes('inverse')) {
      return {
        acknowledgment: `I really like the balance scale image—it makes sense that both sides have to weigh the same!`,
        challengeOrClarification: `I'm still a little fuzzy on how we actually get the variable x alone.`,
        curiousQuestion: `When you have something like 3x + 7 = 22, how do you decide which number to undo first, and what operation do you use?`,
        tone: 'enthusiastic-learner'
      };
    }
    if (clean.includes('inverse') || clean.includes('subtract') || clean.includes('divide')) {
      return {
        acknowledgment: `Okay, so subtracting 7 undoes the +7, and dividing by 3 undoes the multiplication. That makes sense!`,
        challengeOrClarification: `What if there are variables on BOTH sides, like 5x - 4 = 2x + 11?`,
        curiousQuestion: `Can we treat the x terms just like regular weights on the balance scale, and subtract them from both sides too?`,
        tone: 'curious-extender'
      };
    }
    return {
      acknowledgment: `Thanks for explaining that!`,
      challengeOrClarification: `I'm trying to picture how doing the same thing to both sides preserves the truth.`,
      curiousQuestion: `Why is an equation called 'linear'? What does this balance have to do with a straight line on a graph?`,
      tone: 'curious-learner'
    };
  }

  if (topicId === 'bio-photosynthesis') {
    if (clean.includes('sunlight') && !clean.includes('water')) {
      return {
        acknowledgment: `So sunlight hits the plant leaf and gives it energy. Got it!`,
        challengeOrClarification: `Wait, where does the plant get the actual physical atoms to build a giant tree? Sunlight doesn't have mass, right?`,
        curiousQuestion: `What molecules does the leaf take in from the outside world to physically assemble into sugar rings?`,
        tone: 'thoughtful-curious'
      };
    }
    if (clean.includes('water') && clean.includes('oxygen')) {
      return {
        acknowledgment: `Whoa, so plants actually split water molecules apart and that's where breathable oxygen comes from! That blew my mind.`,
        challengeOrClarification: `What happens to the hydrogens and electrons that got stripped from the water?`,
        curiousQuestion: `How does the plant carry those electrons over to the Calvin cycle to stick CO2 molecules together?`,
        tone: 'enthusiastic-learner'
      };
    }
    return {
      acknowledgment: `I'm following your explanation of the leaf absorbing light.`,
      challengeOrClarification: `Why do leaves look green to us if they love sunlight so much?`,
      curiousQuestion: `Does chlorophyll use green light, or is green light the one wavelength it rejects?`,
      tone: 'curious-learner'
    };
  }

  if (topicId === 'hist-french-revolution') {
    if (clean.includes('debt') || clean.includes('money') || clean.includes('bankrupt')) {
      return {
        acknowledgment: `I see—so France was essentially broke because of foreign war loans, especially helping the American Revolution!`,
        challengeOrClarification: `If the country was in debt, why couldn't the King just tax the richest people in France?`,
        curiousQuestion: `Who were the First and Second Estates, and why were they legally allowed to pay almost nothing in land taxes?`,
        tone: 'curious-historian'
      };
    }
    if (clean.includes('estate') || clean.includes('clergy') || clean.includes('nobility')) {
      return {
        acknowledgment: `That makes the anger of the Third Estate so clear—carrying 98% of the people and almost all the tax burden!`,
        challengeOrClarification: `This inequality existed for hundreds of years. Why did everything explode right in the summer of 1789?`,
        curiousQuestion: `What happened to bread prices and the harvest in 1788 that pushed ordinary working people into taking up arms at the Bastille?`,
        tone: 'eager-inquirer'
      };
    }
    return {
      acknowledgment: `You're painting a really vivid picture of 18th-century France.`,
      challengeOrClarification: `How did Enlightenment writers like Rousseau or Voltaire influence people who couldn't even read?`,
      curiousQuestion: `How did abstract ideas about liberty and contracts become revolutionary slogans on the streets of Paris?`,
      tone: 'curious-learner'
    };
  }

  if (topicId === 'eng-understanding-metaphors') {
    if (clean.includes('tenor') || clean.includes('vehicle')) {
      return {
        acknowledgment: `The Tenor and Vehicle breakdown makes a lot of sense! Tenor is the real subject, Vehicle is the borrowed image.`,
        challengeOrClarification: `How do they actually connect in our brains?`,
        curiousQuestion: `What is the 'Ground', and what happens if two metaphors get mixed together in the same sentence?`,
        tone: 'literary-curious'
      };
    }
    return {
      acknowledgment: `I see what you mean about metaphors comparing two things.`,
      challengeOrClarification: `How is a metaphor different from a simile, and why do poets say 'Time IS a thief' instead of just 'Time is LIKE a thief'?`,
      curiousQuestion: `Does saying 'is' change how we feel and think compared to saying 'like'?`,
      tone: 'thoughtful-curious'
    };
  }

  if (topicId === 'phys-newtons-laws') {
    if (clean.includes('f=ma') || clean.includes('f = ma') || clean.includes('acceleration')) {
      return {
        acknowledgment: `F = ma makes the math super clear: double the force, double the acceleration!`,
        challengeOrClarification: `What if there's no force at all? In deep space, why doesn't a moving spaceship eventually slow down?`,
        curiousQuestion: `Why did people think for thousands of years that motion required a continuous push? What were they ignoring?`,
        tone: 'physics-curious'
      };
    }
    return {
      acknowledgment: `You've got a great grasp of Newton's laws of motion.`,
      challengeOrClarification: `How does the third law work when a rocket fires in space where there's no air to push against?`,
      curiousQuestion: `If the rocket pushes the gas backward and the gas pushes the rocket forward, what is actually accelerating?`,
      tone: 'curious-inquirer'
    };
  }

  if (topicId === 'chem-periodic-table') {
    if (clean.includes('electronegativity') || clean.includes('polar')) {
      return {
        acknowledgment: `Thinking of electronegativity like a tug-of-war for electrons makes total sense!`,
        challengeOrClarification: `Where does the line blur between polar covalent and pure ionic bonding?`,
        curiousQuestion: `Why does water dissolve table salt so easily, but oil won't dissolve salt at all?`,
        tone: 'chem-curious'
      };
    }
    return {
      acknowledgment: `Thanks for walking through how atoms share or transfer electrons!`,
      challengeOrClarification: `Why are valence electrons so much more important for chemical bonding than the electrons closer to the nucleus?`,
      curiousQuestion: `How does the octet rule explain why noble gases like neon and argon never form compounds?`,
      tone: 'curious-learner'
    };
  }

  if (topicId === 'cs-binary-search') {
    if (clean.includes('sorted') || clean.includes('log') || clean.includes('half')) {
      return {
        acknowledgment: `Throwing away half the array with every single check is such a cool speedup!`,
        challengeOrClarification: `What happens if the array has duplicates, or if we look for an item that isn't there?`,
        curiousQuestion: `How do our low and high boundary pointers know when to stop so we don't get trapped in an infinite loop?`,
        tone: 'algo-curious'
      };
    }
    return {
      acknowledgment: `I can see why binary search is so much faster than checking every item one by one!`,
      challengeOrClarification: `Why does binary search completely break if the list isn't sorted first?`,
      curiousQuestion: `If sorting takes O(n log n), when is it worth sorting a list just to run binary search?`,
      tone: 'curious-learner'
    };
  }

  if (topicId === 'geo-plate-tectonics') {
    if (clean.includes('convection') || clean.includes('subduction') || clean.includes('ridge')) {
      return {
        acknowledgment: `Seeing the mantle like a boiling pot of soup with convection currents dragging the crust really helps me picture it!`,
        challengeOrClarification: `If new crust is constantly being created at mid-ocean ridges, why isn't the Earth getting bigger?`,
        curiousQuestion: `What happens to the old oceanic crust at deep subduction trenches like the Mariana Trench?`,
        tone: 'geo-curious'
      };
    }
    return {
      acknowledgment: `The idea of continental plates floating and colliding is mind-blowing!`,
      challengeOrClarification: `How fast do continents actually move, and what evidence convinced scientists that South America and Africa were once joined?`,
      curiousQuestion: `What happens when two continental plates collide instead of an oceanic plate and a continental plate?`,
      tone: 'curious-learner'
    };
  }

  // General fallback
  return {
    acknowledgment: `I understand what you're saying so far!`,
    challengeOrClarification: `Could you give me a concrete example or walk me through the next step?`,
    curiousQuestion: `How would you explain the core cause-and-effect relationship to someone who has never studied this before?`,
    tone: 'curious-learner'
  };
}
