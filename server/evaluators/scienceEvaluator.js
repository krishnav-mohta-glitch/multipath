/**
 * Subject-Aware Science Evaluator
 * Evaluates causal mechanisms, chemical equations, and common biological misconceptions.
 */

export function evaluateScienceResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  if (topicId === 'bio-photosynthesis') {
    // Check key causal concepts
    const mentionsWaterSplitting = /split.*water|water.*split|photolysis|h2o.*o2|oxygen.*water/.test(clean);
    const mentionsThylakoid = /thylakoid|lumen|membrane/.test(clean);
    const mentionsStroma = /stroma|calvin/.test(clean);
    const mentionsGreenReflection = /reflect.*green|green.*reflect|green.*not absorb/.test(clean);
    const mentionsAtp = /atp|nadph|energy carrier/.test(clean);

    // Common misconceptions
    const sunBecomesSugar = /sunlight.*turns into.*glucose|light.*becomes.*sugar/.test(clean);
    const oxygenForAnimals = /made.*so.*animals.*can breathe|for.*human.*benefit/.test(clean);

    if (sunBecomesSugar) {
      return {
        conceptRecognized: 'energy_transduction_misconception',
        evaluation: 'partially-correct',
        guidanceTip: 'Clarification: Sunlight does not physically turn into glucose mass. Rather, light photons provide the activation energy to strip electrons from water and bond CO2 into sugar rings.'
      };
    }

    if (oxygenForAnimals) {
      return {
        conceptRecognized: 'teleological_misconception',
        evaluation: 'partially-correct',
        guidanceTip: 'Notice the causal mechanism: Oxygen is not produced for animals; it is fundamentally an oxidized waste byproduct generated when Photosystem II strips electrons from water molecules.'
      };
    }

    if (mentionsWaterSplitting && (mentionsAtp || mentionsThylakoid)) {
      return {
        conceptRecognized: 'photolysis_and_energy_carriers',
        evaluation: 'correct',
        guidanceTip: 'Accurate scientific reasoning: You correctly identified water photolysis in the thylakoid membrane and chemical energy carrier generation (ATP/NADPH).'
      };
    }

    if (mentionsStroma) {
      return {
        conceptRecognized: 'carbon_fixation_stroma',
        evaluation: 'correct',
        guidanceTip: 'Precise biochemical localization: The stroma is indeed where the light-independent Calvin cycle fixes atmospheric carbon into sugar.'
      };
    }

    if (mentionsGreenReflection) {
      return {
        conceptRecognized: 'pigment_absorption_spectrum',
        evaluation: 'correct',
        guidanceTip: 'Precise biophysical understanding: Foliage appears green precisely because chlorophyll reflects green light while absorbing red and blue photons.'
      };
    }
  }

  if (topicId === 'phys-newtons-laws') {
    const mentionsInertia = /inertia|first law|remain.*rest|uniform motion|constant velocity|unbalanced force/.test(clean);
    const mentionsFma = /f\s*=\s*m\s*a|f\s*=\s*ma|force.*mass.*acceleration|proportional.*mass/.test(clean);
    const mentionsThirdLaw = /third law|action.*reaction|equal.*opposite|pair/.test(clean);
    const aristotleTrap = /force.*needed.*to keep.*moving|stop.*naturally.*without force/.test(clean);

    if (aristotleTrap) {
      return {
        conceptRecognized: 'aristotelian_motion_misconception',
        evaluation: 'partially-correct',
        guidanceTip: 'Key Newtonian insight: Objects in motion do NOT need a continuous forward force to keep moving. Friction is an external opposing force; in deep space, an object coasts forever with zero applied force.'
      };
    }

    if (mentionsThirdLaw) {
      return {
        conceptRecognized: 'newtons_third_law',
        evaluation: 'correct',
        guidanceTip: 'Precise mechanical reasoning: Forces always occur in matched interaction pairs of equal magnitude and opposite direction acting on different bodies.'
      };
    }

    if (mentionsFma) {
      return {
        conceptRecognized: 'newtons_second_law',
        evaluation: 'correct',
        guidanceTip: 'Exact dynamical formulation: Net force produces acceleration directly proportional to the magnitude of the force and inversely proportional to the inertia (mass).'
      };
    }

    if (mentionsInertia) {
      return {
        conceptRecognized: 'newtons_first_law_inertia',
        evaluation: 'correct',
        guidanceTip: 'Sound physical foundation: An object maintains its state of rest or constant linear velocity unless an unbalanced net external force intervenes.'
      };
    }
  }

  if (topicId === 'chem-periodic-table') {
    const mentionsElectronegativity = /electronegativity|attract.*electrons?|pull.*electron|greedy/.test(clean);
    const mentionsPolarity = /polar|dipole|unequal sharing|partial charge|delta/.test(clean);
    const mentionsIonic = /ionic|transfer.*electron|crystal lattice|cation.*anion/.test(clean);
    const mentionsValence = /valence|outer.*shell|octet|eight electrons/.test(clean);

    if (mentionsElectronegativity && mentionsPolarity) {
      return {
        conceptRecognized: 'electronegativity_and_bond_dipoles',
        evaluation: 'correct',
        guidanceTip: 'Excellent chemical reasoning: Differences in electronegativity (ΔEN) determine whether shared electron clouds distort toward one nucleus, generating permanent molecular dipoles.'
      };
    }

    if (mentionsIonic) {
      return {
        conceptRecognized: 'ionic_bonding_lattice',
        evaluation: 'correct',
        guidanceTip: 'Accurate bonding mechanism: Large differences in electronegativity lead to full electron transfer, yielding oppositely charged ions held together by electrostatic Coulombic forces.'
      };
    }

    if (mentionsValence) {
      return {
        conceptRecognized: 'valence_shell_octet',
        evaluation: 'correct',
        guidanceTip: 'Clear atomic structure: Outer valence electrons dictate bonding geometry and chemical reactivity as atoms seek stable noble-gas electron configurations.'
      };
    }
  }

  return {
    evaluation: null, // Let contextual Socratic engine evaluate
  };
}
