import type { Topic } from '../../types/topic';

export const CLASS_8_TOPICS: Topic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICS (Class 8)
  // ---------------------------------------------------------------------------
  {
    id: 'math-8-linear-equations-1var',
    slug: 'math-8-linear-equations-1var',
    title: 'Linear Equations in One Variable',
    subtitle: 'Balancing multi-step equations with variables on both sides and cross-multiplication',
    subjectId: 'mathematics',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    overview: 'Building upon simple equations, Class 8 linear algebra introduces equations where the unknown variable appears on both the left and right sides. Mastering the systematic movement of variable terms to one pan and constant numbers to the other is the foundational gateway to higher algebra.',
    whyItMatters: 'Whether calculating break-even points in business where production costs equal sales revenue or determining when two accelerating vehicles meet, linear balance models real-world equilibrium.',
    learningObjectives: [
      'Solve linear equations containing variables on both sides.',
      'Apply cross-multiplication to simplify complex rational/fractional equations.',
      'Translate narrative word problems into algebraic models with verifiable solutions.',
      'Identify equations with infinite solutions (identities) versus equations with no solutions (contradictions).'
    ],
    coreQuestions: [
      'What is the logical strategy for consolidating variables that appear on both sides of an equals sign?',
      'Why does cross-multiplication work, and what hidden assumption about zero denominators does it make?',
      'How can an equation have "no solution" or "infinite solutions"?'
    ],
    prerequisites: ['Basic linear equations', 'Operations on fractions and integers'],
    keyTerms: [
      { term: 'Linear Equation', definition: 'An algebraic equation where the highest power of the variable is strictly 1.' },
      { term: 'Transposition', definition: 'Moving a term from one side of an equation to the other while changing its mathematical sign (+ becomes -, and vice versa).' },
      { term: 'Cross-Multiplication', definition: 'Multiplying the numerator of one fraction by the denominator of the other across an equals sign: if a/b = c/d, then ad = bc.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'In simpler equations like 2x + 3 = 11, the variable x sits comfortably on only one side, like an unknown weight on a single scale pan. But in real-world scenarios, unknown quantities often exert influence on both sides of an interaction, such as 5x - 4 = 2x + 11. Solving these requires systematic consolidation.',
        sections: [
          {
            id: 'variables-both-sides',
            title: '1. The Strategy of Segregation: Variables Left, Numbers Right',
            subtitle: 'Eliminating variable terms from one side to restore clarity',
            paragraphs: [
              'When facing 5x - 4 = 2x + 11, the first goal is to eliminate the variable from one of the sides. We subtract 2x from both sides of the equation simultaneously.',
              '(5x - 2x) - 4 = (2x - 2x) + 11  =>  3x - 4 = 11.',
              'In a single balanced step, the problem has transformed back into a familiar two-step equation! We now add 4 to both sides (3x = 15) and divide by 3 (x = 5).'
            ],
            callout: {
              type: 'axiom',
              title: 'Segregation Protocol',
              text: 'Always collect all terms containing the unknown variable on one side and all pure constant terms on the opposing side.'
            }
          },
          {
            id: 'cross-multiplication',
            title: '2. The Mechanics of Cross-Multiplication',
            subtitle: 'Eliminating fractional denominators in a single leap',
            paragraphs: [
              'When an equation presents as a single fraction on each side, such as (x + 1) / (2x + 3) = 3 / 8, cross-multiplication allows us to clear the denominators at once.',
              'Why does cross-multiplication work? It is simply multiplying both sides of the equation by the common denominator 8(2x + 3). The denominators cancel on each respective side, leaving: 8(x + 1) = 3(2x + 3).',
              'Expanding both sides: 8x + 8 = 6x + 9. Subtracting 6x gives 2x + 8 = 9, so 2x = 1, leading to x = 1/2.'
            ]
          }
        ],
        summaryTakeaways: [
          'Collect variable terms on one side by adding or subtracting the smaller variable term.',
          'Collect numeric constants on the opposite side.',
          'Use cross-multiplication only when both sides are single consolidated fractions.',
          'Always verify your final answer by substituting it back into the original unedited equation.'
        ],
        reflectionPrompt: 'What happens when you attempt to solve the equation 2(x + 3) = 2x + 6 versus 2(x + 3) = 2x + 5?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'The Dual-Pan Mechanical Balance Model',
        caption: 'Visualizing variable consolidation as physically removing equal weights from both balance pans.',
        diagramTitle: 'Physical Transposition Mechanism',
        diagramDescription: 'Left pan contains 5 mystery bags [x] and 4 negative balloon lifts. Right pan contains 2 mystery bags [x] and 11 positive unit weights. Removing 2 mystery bags from both pans preserves level equilibrium.',
        components: [
          { id: 'left-pan', name: 'Left Pan [5x - 4]', role: 'Expression Assembly', description: 'Five variable weight blocks of mass x counterbalanced by a negative offset of 4.', badge: 'Left Tray' },
          { id: 'fulcrum', name: 'Precision Pivot Fulcrum', role: 'Equals Sign Boundary', description: 'The zero-friction center pivot representing equality (=).', badge: 'Equilibrium' },
          { id: 'right-pan', name: 'Right Pan [2x + 11]', role: 'Counter-Expression', description: 'Two variable weight blocks of mass x plus eleven 1-kg counterweights.', badge: 'Right Tray' }
        ],
        interactiveLayers: [
          { layerId: 'removal-layer', label: 'Simultaneous Bag Removal', description: 'Highlights the 2 variable bags removed from both sides.', highlightedComponentIds: ['left-pan', 'right-pan'] }
        ],
        processFlow: [
          { step: 1, label: 'Inspect Both Pans', detail: 'Identify variable counts on both sides: 5x on left, 2x on right.', annotation: 'Identify' },
          { step: 2, label: 'Remove 2x from Both', detail: 'Left becomes 3x - 4; right becomes 11.', annotation: 'Consolidate Variable' },
          { step: 3, label: 'Add 4 to Both', detail: 'Left becomes 3x; right becomes 15.', annotation: 'Consolidate Constants' },
          { step: 4, label: 'Divide by 3', detail: 'Each mystery bag x weighs exactly 5 kg.', annotation: 'Solution: x = 5' }
        ],
        spatialAnalogy: {
          metaphor: 'Two Children on a Seesaw with Backpacks',
          explanation: 'If each child removes a 2-kg textbook from their backpack at the same instant, the seesaw does not tip. Balancing equations is purely symmetric subtraction.'
        },
        visualSummary: 'Whatever you do to one side, you must mirror on the other. Symmetrical moves leave the unknown isolated and revealed.'
      },
      'examples-applications': {
        overview: 'Setting two expressions equal to each other is how engineers determine when costs break even or when moving bodies intercept.',
        workedExamples: [
          {
            id: 'ex-age-problem',
            title: 'Classic Age Narrative Problem',
            difficulty: 'Intermediate',
            contextOrPrompt: 'A mother is 4 times as old as her daughter. In 20 years, she will be only twice as old as her daughter. Find their current ages.',
            steps: [
              { stepNumber: 1, explanation: 'Define the unknown variable.', work: 'Let daughter current age = x years. Mother current age = 4x years.', annotation: 'Variables established.' },
              { stepNumber: 2, explanation: 'Model their ages in 20 years.', work: 'Daughter in 20 yrs = (x + 20). Mother in 20 yrs = (4x + 20).', annotation: 'Time shift.' },
              { stepNumber: 3, explanation: 'Formulate the equality based on the given ratio.', work: '4x + 20 = 2(x + 20)  =>  4x + 20 = 2x + 40.', annotation: 'Linear equation.' },
              { stepNumber: 4, explanation: 'Subtract 2x from both sides and subtract 20.', work: '2x + 20 = 40  =>  2x = 20  =>  x = 10.', annotation: 'Solve for x.' }
            ],
            finalResult: 'Daughter is 10 years old; mother is 40 years old.',
            verificationTip: 'Verify in 20 years: Daughter will be 30, mother will be 60. 60 is exactly twice 30! Solution confirmed.'
          }
        ],
        applications: [
          {
            domain: 'Business Finance',
            title: 'Break-Even Analysis for Manufacturing',
            context: 'A production facility compares high fixed setup costs vs variable per-unit costs.',
            realWorldScenario: 'Machine A costs $5,000 upfront plus $2 per widget. Machine B costs $2,000 upfront plus $5 per widget. To find the production volume where both options cost the exact same: 5000 + 2w = 2000 + 5w  =>  3000 = 3w  =>  w = 1,000 widgets.',
            impactMetric: 'Managers select Machine B if producing under 1,000 units, but Machine A if producing over 1,000 units, saving hundreds of thousands of dollars.'
          }
        ],
        selfCheckExercise: {
          question: 'Solve for y: (3y + 4) / (2 - 6y) = -2/5',
          hint: 'Cross-multiply: 5(3y + 4) = -2(2 - 6y). Distribute carefully with negative signs.',
          solution: 'y = -8 (5(3y + 4) = 15y + 20; -2(2 - 6y) = -4 + 12y; 15y - 12y = -4 - 20; 3y = -24; y = -8).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Two-Pan Algebraic Equilibrium Simulator',
        objective: 'Observe how keeping both sides of an equation balanced allows isolating unknown variables.',
        instructions: 'Remove equal weights and unknown blocks from both pans to isolate the variable.',
        experimentType: 'generic',
        variables: [
          { id: 'leftBags', label: 'Left Variable Bags (x)', description: 'Number of variable bags on left pan', min: 1, max: 10, step: 1, defaultValue: 5 },
          { id: 'rightBags', label: 'Right Variable Bags (x)', description: 'Number of variable bags on right pan', min: 0, max: 10, step: 1, defaultValue: 2 }
        ],
        guidingQuestions: ['Why does transposing a term across the equals sign reverse its sign?'],
        whatToObserve: ['Notice that adding +4 to the left pan cancels out a -4 weight, leaving pure positive variable blocks.'],
        takeawayInsight: 'Transposition is not magic; it is simply adding the additive inverse to both sides of the balance.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // SCIENCE (Class 8)
  // ---------------------------------------------------------------------------
  {
    id: 'sci-8-force-pressure',
    slug: 'sci-8-force-pressure',
    title: 'Force and Pressure Dynamics',
    subtitle: 'Contact vs non-contact forces, pressure distribution, and atmospheric columns',
    subjectId: 'physics',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    overview: 'A force is a push or a pull upon an object resulting from its interaction with another object. Pressure measures how concentrated that force is across a given surface area: Pressure = Force / Area. Shrinking the contact area magnifies pressure into a sharp cutting force; expanding the area dissipates pressure safely.',
    whyItMatters: 'Pressure principles explain why sharp knives slice effortlessly while blunt ones crush, why heavy construction bulldozers drive on massive wide tracks, and how hydraulic brakes stop multi-ton trucks.',
    learningObjectives: [
      'Classify forces into contact (muscular, friction) and non-contact (magnetic, electrostatic, gravitational).',
      'Calculate pressure using P = F / A in Pascals (N/m²).',
      'Explain why liquid pressure increases with depth and acts equally in all directions.',
      'Demonstrate the immense magnitude of atmospheric pressure crushing an evacuated metal can.'
    ],
    coreQuestions: [
      'Why does a sharp needle pierce cloth easily while a blunt pencil with identical force fails completely?',
      'Why do deep-sea submarines require thick titanium hulls while surface boats can be made of fiberglass?',
      'Why are human bodies not crushed flat by the thousands of kilograms of atmospheric air pressing down on our shoulders?'
    ],
    prerequisites: ['Basic concept of push and pull', 'Units of area and mass'],
    keyTerms: [
      { term: 'Force', definition: 'A push or pull acting on an object resulting in a change in its state of rest, motion, or physical shape.' },
      { term: 'Pressure', definition: 'The perpendicular force exerted per unit area of a surface: P = F / A.' },
      { term: 'Pascal (Pa)', definition: 'The standard SI unit of pressure, equal to one Newton of perpendicular force per square meter (1 N/m²).' },
      { term: 'Atmospheric Pressure', definition: 'The pressure exerted by the weight of the massive column of air extending from sea level to the edge of the atmosphere.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'We apply forces every day: opening a door, kicking a soccer ball, writing with a pen. But the dramatic effect of any force depends entirely on the contact surface area through which that force is channeled. Force is the hammer; pressure is the concentrated sharpness of the impact.',
        sections: [
          {
            id: 'formula-mechanics',
            title: '1. The Master Equation: Pressure = Force / Area',
            subtitle: 'Why inverse proportionality governs penetration and cutting',
            paragraphs: [
              'The fundamental formula of pressure is:\nPressure (P) = Force (F) / Area (A).',
              'Because Area is in the denominator, Pressure is inversely proportional to contact area. If you apply a 50 N force with a blunt wooden block of area 0.05 m², the pressure is 1,000 Pa.',
              'If you apply that exact same 50 N force with the tip of a sewing needle of area 0.000001 m², the pressure skyrockets to 50,000,000 Pa! That immense concentrated pressure easily severs molecular bonds, puncturing the material effortlessly.'
            ],
            callout: {
              type: 'axiom',
              title: 'Pressure Proportionality Law',
              text: 'At constant force, shrinking the contact surface area magnifies pressure proportionally. At constant area, increasing force increases pressure linearly.'
            }
          },
          {
            id: 'fluid-atmosphere',
            title: '2. Liquid Depth & The Ocean of Air Above Us',
            subtitle: 'Hydrostatic pressure and the atmospheric canopy',
            paragraphs: [
              'Liquids exert pressure on the walls and base of their container. Because liquids are heavy, pressure increases directly with depth: water pressure at 10 meters depth is twice as high as at the surface.',
              'We live at the bottom of an ocean of air. The weight of the air column above an average adult head weighs roughly 1,000 kg (equivalent to a small car). We are not crushed because the internal fluid and blood pressure inside our bodies pushes outward with equal magnitude, maintaining perfect hydrostatic balance.'
            ]
          }
        ],
        summaryTakeaways: [
          'Pressure is force distributed per unit area (P = F / A).',
          'Small contact area = high pressure (knives, needles, stiletto heels).',
          'Large contact area = low pressure (snowshoes, tank treads, foundations).',
          'Liquids exert pressure in all directions, increasing with depth.',
          'Atmospheric pressure is immense (~101 kPa at sea level), balanced by our internal bodily fluid pressure.'
        ],
        reflectionPrompt: 'Why does an inflated balloon burst when squeezed against a sharp needle tip, but withstands being pressed against a bed of 500 identical needles?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Pressure Concentration: Stiletto Heel vs Elephant Foot',
        caption: 'Comparing the ground pressure exerted by a 60 kg woman in stiletto heels versus a 3,000 kg elephant.',
        diagramTitle: 'Surface Area Distribution Mechanics',
        diagramDescription: 'Observe how a tiny 0.5 cm² heel tip concentrates 600 N into 12,000,000 Pa, while four broad elephant feet (total 1,000 cm²) disperse 30,000 N into only 300,000 Pa.',
        components: [
          { id: 'stiletto-tip', name: 'Stiletto Heel Tip (0.5 cm²)', role: 'Concentrated Contact', description: 'Tiny contact area channels body weight into ground-cracking pressure.', badge: '12 MPa' },
          { id: 'elephant-foot', name: 'Elephant Foot Pad (1,000 cm²)', role: 'Dispersed Contact', description: 'Broad spongy foot distributes multi-ton mass harmlessly over soft savannah mud.', badge: '0.3 MPa' },
          { id: 'wooden-floor', name: 'Parquet Flooring Surface', role: 'Impact Substrate', description: 'Dents easily under high localized pressure, but remains undamaged under broad dispersed force.', badge: 'Threshold' }
        ],
        interactiveLayers: [
          { layerId: 'pressure-heatmap', label: 'Stress Heatmap Projection', description: 'Color-coded force intensity displaying sharp red spike under heel vs cool blue under elephant foot.', highlightedComponentIds: ['stiletto-tip', 'elephant-foot'] }
        ],
        processFlow: [
          { step: 1, label: 'Calculate Total Force', detail: 'Force = mass x gravity (F = mg).', annotation: 'Weight: Newtons' },
          { step: 2, label: 'Measure Contact Area', detail: 'Sum contact surface area in square meters (m²).', annotation: 'Area: m²' },
          { step: 3, label: 'Divide to Find Pressure', detail: 'P = F / A in Pascals (N/m²).', annotation: 'Pressure: Pa' }
        ],
        spatialAnalogy: {
          metaphor: 'Lying on a Bed of Nails vs a Single Nail',
          explanation: 'Stepping on a single nail punctures skin because your entire 70 kg weight presses on one microscopic point. Lying on a bed of 1,000 nails distributes your weight across 1,000 points; each nail tip bears only 70 grams of force, which is far too gentle to break human skin.'
        },
        visualSummary: 'Area is the pressure divisor. Broaden the footprint to travel over mud; sharpen the edge to cut steel.'
      },
      'examples-applications': {
        overview: 'Pressure calculations dictate civil engineering foundation widths, hydraulic excavator designs, and deep-sea exploration submersible hulls.',
        workedExamples: [
          {
            id: 'ex-pressure-brick',
            title: 'Calculating Pressure of a Solid Brick in Two Orientations',
            difficulty: 'Intermediate',
            contextOrPrompt: 'A brick has mass 3 kg (weight 30 N) and dimensions 20 cm x 10 cm x 5 cm. Calculate the pressure it exerts when resting on (a) its smallest face (10 cm x 5 cm) and (b) its largest face (20 cm x 10 cm).',
            steps: [
              { stepNumber: 1, explanation: 'Convert dimensions to meters and calculate areas.', work: 'Smallest face = 0.10 m x 0.05 m = 0.005 m². Largest face = 0.20 m x 0.10 m = 0.02 m².', annotation: 'Area in m².' },
              { stepNumber: 2, explanation: 'Calculate pressure on smallest face.', work: 'P_small = 30 N / 0.005 m² = 6,000 Pa (N/m²).', annotation: 'Concentrated pressure.' },
              { stepNumber: 3, explanation: 'Calculate pressure on largest face.', work: 'P_large = 30 N / 0.02 m² = 1,500 Pa (N/m²).', annotation: 'Dispersed pressure.' }
            ],
            finalResult: 'Smallest face: 6,000 Pa; Largest face: 1,500 Pa (4 times less pressure).',
            verificationTip: 'Ratio of areas is 0.02 / 0.005 = 4. Since force is constant, pressure ratio must be exactly 4:1.'
          }
        ],
        applications: [
          {
            domain: 'Heavy Construction Machinery',
            title: 'Continuous Caterpillar Crawler Tracks on Excavators',
            context: 'A 40-ton excavator operating on wet construction soil would sink to its axles on ordinary wheels.',
            realWorldScenario: 'By mounting the excavator on wide continuous steel tracks with a contact area of 6 m², the ground pressure is reduced to only 65 kPa—lower than the foot pressure of an adult human walking.',
            impactMetric: 'Enables multi-ton earthmovers to traverse soft mud, sand, and marshland without sinking.'
          }
        ],
        selfCheckExercise: {
          question: 'If a force of 200 N is applied across an area of 0.04 m², what is the resulting pressure in Pascals?',
          hint: 'Divide force by area: P = 200 / 0.04.',
          solution: '5,000 Pa (Because 200 / 0.04 = 20,000 / 4 = 5,000 N/m²).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Force & Area Pressure Chamber Sandbox',
        objective: 'Observe real-time penetration depth in a virtual block as force and contact area vary.',
        instructions: 'Adjust force and contact area to observe pressure changes.',
        experimentType: 'generic',
        variables: [
          { id: 'forceN', label: 'Applied Force (N)', description: 'Total applied force in Newtons', min: 10, max: 1000, step: 10, defaultValue: 100 },
          { id: 'areaM2', label: 'Contact Area (m²)', description: 'Surface contact area in square meters', min: 0.001, max: 1, step: 0.005, defaultValue: 0.01 }
        ],
        guidingQuestions: ['Why do mountain climbers experience nosebleeds at extreme altitudes like Mount Everest?'],
        whatToObserve: ['Notice that atmospheric pressure drops dramatically with altitude, causing internal blood vessel pressure to exceed external air pressure.'],
        takeawayInsight: 'Pressure balance is life-preserving: human cardiovascular systems evolved to operate specifically under 1 atmosphere of external pressure.'
      }
    }
  }
];
