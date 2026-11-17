import type { Topic } from '../../types/topic';

export const CLASS_7_TOPICS: Topic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICS (Class 7)
  // ---------------------------------------------------------------------------
  {
    id: 'math-7-integers-multiplication',
    slug: 'math-7-integers-multiplication',
    title: 'Multiplication & Division of Integers',
    subtitle: 'Sign rules, number line vector direction, and why two negatives make a positive',
    subjectId: 'mathematics',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    overview: 'Multiplying numbers with signs is about direction and reversal. While multiplying positive numbers is repeated addition, multiplying by a negative number represents reversing direction on the number line.',
    whyItMatters: 'From tracking financial debt and accounting balance sheets to calculating altitude adjustments in aviation and velocity changes in physics, integer sign rules govern all dynamic direction-dependent math.',
    learningObjectives: [
      'Master the 4 sign rules for integer multiplication and division.',
      'Explain intuitively why negative times negative yields a positive result using the video reversal metaphor.',
      'Apply distributive property of multiplication over addition with negative values.',
      'Evaluate multi-term integer expressions with correct sign precedence.'
    ],
    coreQuestions: [
      'Why does (-3) x (-4) equal +12 instead of -12?',
      'How does division by a negative integer relate to multiplying by its reciprocal?',
      'Why is division of any integer by zero completely undefined?'
    ],
    prerequisites: ['Addition and subtraction of integers', 'Basic multiplication tables'],
    keyTerms: [
      { term: 'Integer', definition: 'The set of whole numbers, their negative opposites, and zero: {..., -3, -2, -1, 0, 1, 2, 3, ...}.' },
      { term: 'Sign Inversion', definition: 'Reversing the sign of a number from positive to negative, or from negative to positive.' },
      { term: 'Additive Inverse', definition: 'The number that when added to a given number yields zero (the additive inverse of +7 is -7).' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Every student has been told the rule: "negative times negative equals positive." But few are ever shown why it must be true. It is not an arbitrary convention invented to torture students; it is a mathematical necessity to preserve consistency on the number line.',
        sections: [
          {
            id: 'sign-patterns',
            title: '1. The Inescapable Pattern of Decreasing Products',
            subtitle: 'Following the arithmetic escalator downward',
            paragraphs: [
              'Consider this sequence of simple multiplications where we multiply 3 by steadily decreasing numbers:',
              '3 x 3 = 9\n3 x 2 = 6\n3 x 1 = 3\n3 x 0 = 0\n3 x (-1) = -3\n3 x (-2) = -6',
              'Notice that every time the second multiplier drops by 1, the product drops by exactly 3. Now let us turn around and multiply (-3) by decreasing numbers:',
              '(-3) x 3 = -9\n(-3) x 2 = -6\n(-3) x 1 = -3\n(-3) x 0 = 0',
              'Observe the pattern! Every time the second number drops by 1, the result climbs by 3! Therefore, continuing the sequence past zero demands that (-3) x (-1) = +3, and (-3) x (-2) = +6.'
            ],
            callout: {
              type: 'axiom',
              title: 'Rule of Signs Invariant',
              text: 'Like signs produce a positive product: (+) x (+) = (+) and (-) x (-) = (+). Unlike signs produce a negative product: (+) x (-) = (-) and (-) x (+) = (-).'
            }
          },
          {
            id: 'video-rewind-metaphor',
            title: '2. The Video Tape Rewind Intuition',
            subtitle: 'Time reversal of backwards movement',
            paragraphs: [
              'Imagine filming a person walking backwards at 2 meters per second. Walking backwards is a negative velocity: -2 m/s.',
              'If you play the video forward for 3 seconds (+3 s), where do they end up relative to where they started? In reverse: (-2) x (+3) = -6 meters.',
              'Now, play that exact same video tape in REVERSE (rewind, -3 s). What does a person walking backwards look like when rewound in time? They appear to move smoothly FORWARD! Negative velocity (-2) viewed in reverse time (-3) equals forward progress: (-2) x (-3) = +6 meters!'
            ]
          }
        ],
        summaryTakeaways: [
          'Multiplying by a negative number acts as a direction-reversing operation.',
          'Two successive reversals cancel each other out, restoring the positive forward direction.',
          'Division follows identical sign rules because division is simply multiplication by the reciprocal.'
        ],
        reflectionPrompt: 'What happens when you multiply an odd number of negative factors (e.g. (-1) x (-1) x (-1)) versus an even number of negative factors?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Number Line Vector Reflections',
        caption: 'Visualizing multiplication as scaling and negative signs as 180-degree directional flips.',
        diagramTitle: 'Vector Sign Flipping on the Coordinate Axis',
        diagramDescription: 'Starting with a forward arrow of length 4, multiplying by -1 rotates the arrow 180 degrees into the negative zone. Multiplying by -1 again rotates it another 180 degrees back to positive.',
        components: [
          { id: 'positive-vector', name: 'Original Vector (+4)', role: 'Forward Arrow', description: 'Pointing to the right on the number line.', badge: 'Positive Phase' },
          { id: 'first-flip', name: 'First Reversal (-4)', role: 'Inverted Arrow', description: 'Rotated 180 degrees after multiplying by -1, pointing left.', badge: 'Single Inversion' },
          { id: 'second-flip', name: 'Second Reversal (+4)', role: 'Restored Arrow', description: 'Rotated another 180 degrees after second negative factor, pointing right again.', badge: 'Double Inversion' }
        ],
        interactiveLayers: [
          { layerId: 'vector-rotation', label: '180 Degree Flip Engine', description: 'Rotational representation of negative signs.', highlightedComponentIds: ['positive-vector', 'first-flip', 'second-flip'] }
        ],
        processFlow: [
          { step: 1, label: 'Magnitude Calculation', detail: 'Multiply the absolute values ignoring signs: 3 x 4 = 12.', annotation: 'Size: 12' },
          { step: 2, label: 'Count Negative Signs', detail: 'Count the total number of negative signs in the product.', annotation: 'Count: 2' },
          { step: 3, label: 'Apply Parity', detail: 'Even count of negatives = positive (+12); Odd count = negative (-12).', annotation: 'Parity: Positive' }
        ],
        spatialAnalogy: {
          metaphor: 'Taking Back a Debt',
          explanation: 'Owing $5 is a negative balance (-$5). If a generous bank waives or cancels (-1) your debt, you gain $5 of wealth! Subtracting a negative is a pure positive benefit.'
        },
        visualSummary: 'Negative is a flip switch. Flipping a switch twice leaves it in its original on position.'
      },
      'examples-applications': {
        overview: 'Integer arithmetic is the mathematical language of temperature changes, elevation shifts, and accounting ledgers.',
        workedExamples: [
          {
            id: 'ex-submarine-dive',
            title: 'Submarine Descent Rate',
            difficulty: 'Intermediate',
            contextOrPrompt: 'A research submarine descends at a constant rate of 15 meters per minute (-15 m/min). Where is the submarine after 8 minutes relative to sea level?',
            steps: [
              { stepNumber: 1, explanation: 'Identify rate and time with proper signs.', work: 'Rate = -15 m/min. Time = +8 min.', annotation: 'Formulate product.' },
              { stepNumber: 2, explanation: 'Multiply magnitude and apply unlike sign rule.', work: '(-15) x 8 = -(15 x 8) = -120 meters.', annotation: 'Negative depth.' },
              { stepNumber: 3, explanation: 'State physical interpretation.', work: 'The submarine is 120 meters below sea level.', annotation: 'Physical reality.' }
            ],
            finalResult: '-120 meters (120 m below sea level)',
            verificationTip: 'Check: descending for 8 minutes must result in depth below zero, so negative sign is mandatory.'
          }
        ],
        applications: [
          {
            domain: 'Cryogenic Engineering',
            title: 'Rocket Fuel Super-Chamber Cooling',
            context: 'Liquid hydrogen rocket stages must be cooled at strictly controlled negative temperature deltas.',
            realWorldScenario: 'If chillers cool propellant tanks by -4°C per cycle over 12 cycles, the total temperature change is (-4) x 12 = -48°C. If a system failure reverses cooling (-1) during 5 cycles, the heating effect is (-4) x (-5) = +20°C.',
            impactMetric: 'Prevents cryogenic boil-off and catastrophic pressure vessel overpressure.'
          }
        ],
        selfCheckExercise: {
          question: 'Evaluate: (-6) x (-5) x (-2)',
          hint: 'Multiply the first two negatives to get a positive, then multiply that result by the third negative.',
          solution: '-60 (Because (-6) x (-5) = +30, and (+30) x (-2) = -60).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Directional Vector & Sign Sandbox',
        objective: 'Observe real-time vector rotations on the coordinate axis.',
        instructions: 'Adjust multiplier sliders from -10 to +10.',
        experimentType: 'generic',
        variables: [
          { id: 'factorA', label: 'Factor A', description: 'First multiplier', min: -10, max: 10, step: 1, defaultValue: -3 },
          { id: 'factorB', label: 'Factor B', description: 'Second multiplier', min: -10, max: 10, step: 1, defaultValue: -4 }
        ],
        guidingQuestions: ['Why does dividing a negative number by a negative number always yield a positive quotient?'],
        whatToObserve: ['Notice that (-10) / (-2) asks: how many times does -2 fit into -10? Exactly +5 times!'],
        takeawayInsight: 'Division counts how many groups fit. A negative debt of $10 contains 5 debts of $2.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // SCIENCE (Class 7)
  // ---------------------------------------------------------------------------
  {
    id: 'sci-7-heat-transfer',
    slug: 'sci-7-heat-transfer',
    title: 'Heat and Modes of Heat Transfer',
    subtitle: 'Conduction in solids, convection currents in fluids, and radiation through vacuum',
    subjectId: 'physics',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    overview: 'Heat is thermal energy in transit, flowing spontaneously from higher temperature to lower temperature. It travels through matter and empty space via three distinct mechanisms: particle collisions (conduction), bulk fluid circulation (convection), and electromagnetic infrared waves (radiation).',
    whyItMatters: 'Thermal engineering dictates how laptops dissipate heat, how thermos flasks keep soup piping hot, and how coastal winds regulate weather across continents.',
    learningObjectives: [
      'Distinguish between heat (total kinetic energy) and temperature (average kinetic energy).',
      'Explain conduction through molecular lattice vibrations in solid metals.',
      'Describe convection loops in liquids and gases (sea breeze and land breeze).',
      'Understand radiant heat transfer through vacuum without requiring a physical medium.'
    ],
    coreQuestions: [
      'Why does a steel spoon in hot soup burn your fingers while a wooden spoon stays cool?',
      'Why are room heaters always placed near the floor while air conditioners are mounted near the ceiling?',
      'How does the Sun heat the Earth across millions of kilometers of empty outer space?'
    ],
    prerequisites: ['Concept of hot and cold', 'Basic states of matter (solid, liquid, gas)'],
    keyTerms: [
      { term: 'Conduction', definition: 'The transfer of heat through a substance from hotter particle to cooler particle without bulk movement of the substance.' },
      { term: 'Convection', definition: 'The transfer of heat in fluids (liquids and gases) by the physical movement of the heated fluid itself.' },
      { term: 'Radiation', definition: 'The transfer of heat energy by electromagnetic infrared waves without requiring any intervening physical medium.' },
      { term: 'Sea Breeze', definition: 'Cool air flowing from the sea toward the land during daytime as warm air over land rises.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Everything around you is made of vibrating atoms. When an object is hot, its atoms vibrate vigorously with high kinetic energy. Heat transfer is simply the story of that chaotic energy spreading out until everything reaches the same thermal equilibrium.',
        sections: [
          {
            id: 'three-modes',
            title: '1. The Three Pathways of Heat',
            subtitle: 'Conduction, Convection, and Radiation explained',
            paragraphs: [
              'Conduction is heat transfer by microscopic contact. In solids, especially metals with free electrons, vibrating atoms jolt their neighbors, passing thermal agitation along the lattice like dominoes falling.',
              'Convection is heat transfer by bulk fluid movement. When water or air is heated, it expands, becomes less dense, and floats upward. Cooler, denser fluid sinks to replace it, establishing a continuous convection current loop.',
              'Radiation requires no particles at all. Warm objects radiate energy as infrared electromagnetic waves that can cross the total vacuum of empty space at the speed of light.'
            ],
            callout: {
              type: 'axiom',
              title: 'Second Law of Thermodynamics (Elementary Form)',
              text: 'Heat flows spontaneously only from an object at higher temperature to an object at lower temperature—never the reverse on its own.'
            }
          },
          {
            id: 'breezes',
            title: '2. Planetary Convection: Sea Breeze & Land Breeze',
            subtitle: 'Why the ocean regulates coastal temperatures',
            paragraphs: [
              'Land heats up much faster than water under sunlight because water has a remarkably high specific heat capacity. During the day, warm air over coastal land expands and rises. Cool, dense sea air rushes in to take its place: this is the refreshing Sea Breeze.',
              'At night, the reverse happens. Land cools down rapidly, while the ocean holds onto its daytime warmth. Warm air rises over the sea, and cool air flows from land to sea: this is the Land Breeze.'
            ]
          }
        ],
        summaryTakeaways: [
          'Conduction: Heat flows through solid contact via molecular collisions.',
          'Convection: Heat flows through fluids via buoyant rising of hot, less dense material.',
          'Radiation: Heat travels through vacuum as electromagnetic infrared waves.',
          'Thermos flasks eliminate all three modes: silvered walls block radiation, vacuum blocks conduction and convection.'
        ],
        reflectionPrompt: 'Why are heating coils placed at the bottom of an electric kettle rather than near the top?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Anatomy of the Vacuum Thermos Flask',
        caption: 'How a simple container blocks conduction, convection, and radiation simultaneously.',
        diagramTitle: 'Thermos Insulation Architecture',
        diagramDescription: 'Explore the glass double-wall, vacuum gap, reflective silver coating, and insulated stopper that stop thermal leakage.',
        components: [
          { id: 'vacuum-gap', name: 'Vacuum Chamber', role: 'Conduction & Convection Barrier', description: 'Zero air molecules exist in the gap, making conduction and convection physically impossible.', badge: 'Zero Particles' },
          { id: 'silver-coating', name: 'Silvered Mirror Walls', role: 'Radiation Reflector', description: 'Mirrored surfaces bounce radiant infrared waves back inside the flask.', badge: 'Infrared Mirror' },
          { id: 'insulating-stopper', name: 'Plastic/Cork Stopper', role: 'Conduction Cap', description: 'Poor thermal conductor that seals the flask opening, stopping convection drafts.', badge: 'Seal' }
        ],
        interactiveLayers: [
          { layerId: 'conduction-block', label: 'Conduction Isolation', description: 'Highlights the vacuum boundary that halts atomic vibrations.', highlightedComponentIds: ['vacuum-gap', 'insulating-stopper'] },
          { layerId: 'radiation-block', label: 'Radiation Reflection', description: 'Highlights the reflective silvered layer.', highlightedComponentIds: ['silver-coating'] }
        ],
        processFlow: [
          { step: 1, label: 'Heat In Hot Liquid', detail: 'Liquid molecules vibrate at high thermal energy.', annotation: 'High Temp' },
          { step: 2, label: 'Attempted Escape', detail: 'Conduction stopped by vacuum; convection stopped by stopper; radiation reflected by silver.', annotation: 'Blocked' },
          { step: 3, label: 'Thermal Preservation', detail: 'Liquid retains temperature for hours.', annotation: 'Equilibrium Protected' }
        ],
        spatialAnalogy: {
          metaphor: 'Three Ways to Deliver a Heavy Box across a Gymnasium',
          explanation: 'Conduction is a bucket brigade passing the box person to person without moving. Convection is a person picking up the box and running across the room. Radiation is catapulting the box through the air without anyone touching it.'
        },
        visualSummary: 'Stop the particles, stop the drafts, and reflect the light. By blocking all three modes, thermal energy remains trapped.'
      },
      'examples-applications': {
        overview: 'Thermal insulation design protects astronauts in space, cools computer microprocessors, and reduces building air-conditioning bills.',
        workedExamples: [
          {
            id: 'ex-spoon-conduction',
            title: 'Why Metal Feels Colder Than Wood at Room Temperature',
            difficulty: 'Intermediate',
            contextOrPrompt: 'In a 20°C room, a metal door handle and a wooden desk are both at 20°C. Why does the metal handle feel freezing cold to the touch while the wood feels comfortable?',
            steps: [
              { stepNumber: 1, explanation: 'Compare object temperature to human body temperature.', work: 'Human skin is at ~37°C. Both handle and desk are at 20°C. Both are cooler than your hand.', annotation: 'Thermal gradient exists.' },
              { stepNumber: 2, explanation: 'Analyze thermal conductivity.', work: 'Metal is an excellent conductor with free electrons; wood is an insulator.', annotation: 'Rate of heat transfer.' },
              { stepNumber: 3, explanation: 'Explain sensory perception.', work: 'Your skin sensory nerves measure the RATE of heat leaving your hand, not temperature. Metal rapidly siphons heat away, signaling coldness.', annotation: 'Rate sensor, not thermometer.' }
            ],
            finalResult: 'Metal siphons heat away from human skin much faster than wood, tricking temperature receptors.',
            verificationTip: 'A thermometer left on both objects reads the exact same 20°C.'
          }
        ],
        applications: [
          {
            domain: 'Spacecraft Engineering',
            title: 'NASA James Webb Space Telescope Sunshield',
            context: 'JWST infrared sensors must operate at -233°C while the sun-facing side reaches +85°C.',
            realWorldScenario: 'In the vacuum of space, conduction and convection do not occur between separated layers. A 5-layer reflective Kapton sunshield bounces radiant sunlight away, shedding heat through vacuum gaps into deep space.',
            impactMetric: 'Enables deep-space infrared detection of the earliest galaxies.'
          }
        ],
        selfCheckExercise: {
          question: 'Why are houses in hot desert regions painted brilliant white on the outside?',
          hint: 'How does a white surface interact with radiant heat from the Sun compared to a black surface?',
          solution: 'White surfaces reflect most of the incident solar radiation, preventing heat absorption and keeping interiors cool.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Thermal Transfer Chamber Simulator',
        objective: 'Toggle conduction rods of copper, glass, and wood, or heat water in a beaker to watch dye reveal convection current loops.',
        instructions: 'Simulate heating a copper rod vs a glass rod of equal length to compare heat flow rates.',
        experimentType: 'generic',
        variables: [
          { id: 'heatWatts', label: 'Burner Power (Watts)', description: 'Thermal burner wattage', min: 10, max: 500, step: 10, defaultValue: 100 }
        ],
        guidingQuestions: ['Why does warm air rise when heated?'],
        whatToObserve: ['Observe density dropping as heated fluid molecules spread apart, causing surrounding denser fluid to push it upward.'],
        takeawayInsight: 'Convection is driven by buoyancy: gravity pulls denser cold fluid down, displacing lighter warm fluid up.'
      }
    }
  }
];
