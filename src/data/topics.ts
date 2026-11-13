import type { Topic } from '../types/topic';

export const TOPICS: Topic[] = [
  // =========================================================================
  // 1. MATHEMATICS: Linear Equations
  // =========================================================================
  {
    id: 'math-linear-equations',
    slug: 'linear-equations',
    title: 'Linear Equations',
    subtitle: 'Preserving balance, rate of change, and the geometry of constant slope',
    subjectId: 'mathematics',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'A linear equation represents a constant rate of change between variables. At its heart lies a single golden rule: equality is a balance scale—any operation applied to one side must be mirrored on the other to preserve mathematical truth.',
    whyItMatters: 'From calculating compound savings to predicting travel time or calibrating sensor inputs in robotics, linear relationships form the bedrock of quantitative modeling across physics, finance, and engineering.',
    learningObjectives: [
      'Understand equality as a physical and mathematical state of mutual balance.',
      'Apply reversible inverse operations to systematically isolate unknown variables.',
      'Interpret slope (m) as the invariant rate of change and y-intercept (b) as the baseline offset.',
      'Formulate and solve linear mathematical models for real-world budgeting and engineering problems.'
    ],
    coreQuestions: [
      'Why does performing identical operations on both sides maintain mathematical truth?',
      'What does "slope" physically communicate about a dynamic relationship?',
      'How does an algebraic balance translate into a straight geometric line?'
    ],
    prerequisites: ['Basic arithmetic operations', 'Concept of variables as unknowns', 'Coordinate plane fundamentals'],
    keyTerms: [
      { term: 'Slope (m)', definition: 'The ratio of vertical change (rise) to horizontal change (run); the constant rate of variation.' },
      { term: 'Y-Intercept (b)', definition: 'The value where the linear trajectory crosses the vertical axis (when input x = 0).' },
      { term: 'Equivalence', definition: 'The condition where two expressions yield the exact same numerical quantity.' },
      { term: 'Inverse Operation', definition: 'An operation that reverses the effect of another operation (addition undoes subtraction; multiplication undoes division).' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'An equation is fundamentally a sentence asserting that two separate mathematical expressions possess the exact same quantitative value. Solving an equation is not a process of guessing or mechanical memorization; it is the art of deducing what must be true about an unknown quantity while strictly preserving the truth of equality.',
        sections: [
          {
            id: 'balance-postulate',
            title: '1. The Balance Postulate & The Meaning of Equality',
            subtitle: 'Why the equals sign is a relational state, not a calculation command',
            paragraphs: [
              'Many students initially view the equals sign "=" as an instruction to calculate an answer (like pressing the equals key on a handheld calculator). In algebra, however, "=" represents a static state of mutual equilibrium.',
              'If expression A equals expression B (written A = B), they carry identical weight on a balance beam. If you add 5 to the left side without altering the right side, the beam tips and the assertion of equality becomes false. But if you add 5 to both sides simultaneously, equilibrium is perfectly conserved: A + 5 = B + 5.'
            ],
            bulletPoints: [
              'Additive Property: If A = B, then A + c = B + c for any real number c.',
              'Multiplicative Property: If A = B, then A · c = B · c for any non-zero real number c.',
              'Reflexive and Symmetric: A = B implies B = A.'
            ],
            callout: {
              type: 'axiom',
              title: 'Conservation of Equality Axiom',
              text: 'Any invertible mathematical function applied identically to both sides of a true equation produces an equivalent equation with the exact same solution set.'
            }
          },
          {
            id: 'inverse-operations',
            title: '2. Isolating the Unknown via Inverse Operations',
            subtitle: 'Unwrapping expressions in reverse order of operations',
            paragraphs: [
              'To solve for an unknown variable x, we must isolate it on one side of the equation. We accomplish this by "unwrapping" the operations currently bound to x using their arithmetic inverses.',
              'Because variables are assembled using standard order of operations (multiplication before addition), we reverse them in opposite order (undoing addition/subtraction first, then undoing multiplication/division). For example, in 3x + 4 = 19, the variable x was multiplied by 3, and then 4 was added. We undo the addition first by subtracting 4 from both sides (yielding 3x = 15), and then undo the multiplication by dividing both sides by 3 (yielding x = 5).'
            ],
            callout: {
              type: 'warning',
              title: 'Division by Zero Prohibition',
              text: 'You may divide both sides by any constant or non-zero expression. Dividing by an expression that equals zero destroys equivalence and introduces false roots.'
            }
          },
          {
            id: 'slope-intercept-form',
            title: '3. The Slope-Intercept Paradigm (y = mx + b)',
            subtitle: 'Translating dynamic change into geometric coordinates',
            paragraphs: [
              'When two variables change in tandem at a constant rate, their relationship is modeled by the canonical linear function: y = mx + b.',
              'The parameter m represents the slope: the vertical change (Δy) divided by the horizontal change (Δx). If m is positive, the line climbs as x increases; if m is negative, it falls. The parameter b represents the y-intercept: the initial baseline value of y when x = 0.'
            ],
            bulletPoints: [
              'Slope (m = Rise / Run): Constant rate of change across the entire real number line.',
              'Intercept (b): Ground anchor coordinate (0, b).',
              'Linearity Guarantee: A constant first derivative ensures the graph forms a perfectly straight line.'
            ]
          }
        ],
        summaryTakeaways: [
          'Equality represents a balance scale; identical reversible operations conserve mathematical truth.',
          'Solve equations by unwrapping operations in reverse order: undo addition/subtraction, then multiplication/division.',
          'In y = mx + b, slope m measures rate of change, while b sets the starting value at x = 0.',
          'A linear model predicts outputs with perfect proportionality across its entire domain.'
        ],
        reflectionPrompt: 'Why does dividing both sides of 4x = 12 by 4 preserve the truth of x, while squaring both sides of x = -3 can introduce an extraneous positive solution?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Cartesian Coordinate Geometry & The Pan Balance Beam',
        caption: 'Visualizing linear equations through two simultaneous models: a physical seesaw balance and a geometric ray with invariant slope.',
        diagramTitle: 'Anatomy of the Linear Geometry: y = mx + b',
        diagramDescription: 'Explore the key visual components that govern how a linear graph behaves on the Cartesian plane.',
        components: [
          {
            id: 'slope-vector',
            name: 'Slope Triangle (Rise / Run)',
            role: 'Directional Vector',
            description: 'For every 1 unit stepped horizontally to the right (Run), the graph climbs m units vertically (Rise). The ratio Δy / Δx remains identical at every microscopic point.',
            badge: 'Rate Controller'
          },
          {
            id: 'y-intercept',
            name: 'Y-Intercept Anchor (0, b)',
            role: 'Vertical Ground Pin',
            description: 'The point where the line pierces the vertical axis. Shifting b translates the entire line up or down without altering its tilt angle.',
            badge: 'Baseline Offset'
          },
          {
            id: 'solution-root',
            name: 'X-Intercept (Root)',
            role: 'Zero-Crossing Coordinate',
            description: 'The horizontal coordinate (-b/m, 0) where the output y reaches zero, representing the root of the equation mx + b = 0.',
            badge: 'Ground Root'
          },
          {
            id: 'pan-left',
            name: 'Left Balance Pan [3x + 4]',
            role: 'Expression Tray',
            description: 'Holds three unknown mass blocks of weight x plus four 1-kg unit weights.',
            badge: 'Pan A'
          },
          {
            id: 'pan-right',
            name: 'Right Balance Pan [19]',
            role: 'Counterweight Tray',
            description: 'Holds nineteen 1-kg unit weights counterbalancing the left pan in level horizontal equilibrium.',
            badge: 'Pan B'
          }
        ],
        interactiveLayers: [
          {
            layerId: 'cartesian-layer',
            label: 'Coordinate Plane Geometry',
            description: 'Focuses on slope vector, y-intercept anchor, and Cartesian projection.',
            highlightedComponentIds: ['slope-vector', 'y-intercept', 'solution-root']
          },
          {
            layerId: 'balance-layer',
            label: 'Physical Pan Balance',
            description: 'Focuses on physical equilibrium and symmetry across the fulcrum.',
            highlightedComponentIds: ['pan-left', 'pan-right']
          }
        ],
        processFlow: [
          {
            step: 1,
            label: 'Identify the Anchor',
            detail: 'Locate the y-intercept (0, b) on the vertical axis as your starting coordinate.',
            annotation: 'Coordinate: (0, b)'
          },
          {
            step: 2,
            label: 'Step with the Slope',
            detail: 'From the anchor, count Run units to the right, then Rise units up (if m > 0) or down (if m < 0).',
            annotation: 'Vector: (Run, Rise)'
          },
          {
            step: 3,
            label: 'Connect the Ray',
            detail: 'Draw an infinite straight line through the points. Every coordinate pair on this line satisfies the equality.',
            annotation: 'Manifold: y = mx + b'
          }
        ],
        spatialAnalogy: {
          metaphor: 'A Wheelchair Accessibility Ramp',
          explanation: 'Building codes require wheelchair ramps to maintain a constant slope of 1:12 (rising 1 inch for every 12 inches of run). Whether the ramp is 12 inches or 120 feet long, the steepness is identical at every millimeter.'
        },
        visualSummary: 'A linear graph is a geometric visualization of absolute predictability: if you know the anchor point (b) and the stepping rate (m), the entire infinite trajectory is completely determined.'
      },
      'examples-applications': {
        overview: 'Mastering linear equations requires both precise symbolic computation and the intuition to translate ambiguous real-world problems into crisp algebraic relationships.',
        workedExamples: [
          {
            id: 'ex-1-basic',
            title: 'Worked Example 1: Isolating a Variable with Two Operations',
            difficulty: 'Foundational',
            contextOrPrompt: 'Solve for x in the equation: 3x + 7 = 22',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Identify operations acting on x and invert the outermost operation (addition of 7).',
                work: '3x + 7 - 7 = 22 - 7',
                annotation: 'Subtract 7 from both sides to preserve balance.'
              },
              {
                stepNumber: 2,
                explanation: 'Simplify both sides of the equation.',
                work: '3x = 15',
                annotation: 'Three unknown packages balance 15 units.'
              },
              {
                stepNumber: 3,
                explanation: 'Invert the multiplication by dividing both sides by the variable coefficient (3).',
                work: '(3x) / 3 = 15 / 3',
                annotation: 'Divide both sides by 3.'
              },
              {
                stepNumber: 4,
                explanation: 'State the isolated unit solution.',
                work: 'x = 5',
                annotation: 'Single package weight isolated.'
              }
            ],
            finalResult: 'x = 5',
            verificationTip: 'Substitute x = 5 back into the original expression: 3(5) + 7 = 15 + 7 = 22. The left side matches the right side, confirming the solution.'
          },
          {
            id: 'ex-2-both-sides',
            title: 'Worked Example 2: Variables Present on Both Sides',
            difficulty: 'Intermediate',
            contextOrPrompt: 'Solve for x in the equation: 5x - 4 = 2x + 11',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Collect variable terms on one side by subtracting 2x from both sides.',
                work: '5x - 2x - 4 = 2x - 2x + 11',
                annotation: 'Eliminates variable from the right pan.'
              },
              {
                stepNumber: 2,
                explanation: 'Simplify like terms.',
                work: '3x - 4 = 11',
                annotation: 'Reduced to a standard two-step equation.'
              },
              {
                stepNumber: 3,
                explanation: 'Undo the subtraction by adding 4 to both sides.',
                work: '3x - 4 + 4 = 11 + 4  =>  3x = 15',
                annotation: 'Isolates the 3x term.'
              },
              {
                stepNumber: 4,
                explanation: 'Divide both sides by 3.',
                work: 'x = 5',
                annotation: 'Final root revealed.'
              }
            ],
            finalResult: 'x = 5',
            verificationTip: 'Check both sides: Left pan = 5(5) - 4 = 21. Right pan = 2(5) + 11 = 21. Both pans balance at 21, verifying the solution.'
          }
        ],
        applications: [
          {
            domain: 'Cloud Systems Architecture',
            title: 'Predicting Cloud Server Operational Costs',
            context: 'Enterprise software companies combine fixed monthly server subscriptions with hourly on-demand compute capacity.',
            realWorldScenario: 'An engineering team has a baseline database cost of $150/month plus $0.25 per active CPU-hour. Their monthly cloud budget is capped at $1,000. Modeling Total Cost = 150 + 0.25h allows engineers to solve for the maximum allowable computing hours: 1000 = 150 + 0.25h  =>  850 = 0.25h  =>  h = 3,400 hours.',
            impactMetric: 'Automated Kubernetes scaling thresholds trigger alerts at hour 3,399, preventing budget overruns.'
          },
          {
            domain: 'Automotive Engineering',
            title: 'Electric Vehicle Stopping Distance Calibration',
            context: 'Autonomous driver-assist systems calculate stopping trajectories based on linear sensor latency plus deceleration vectors.',
            realWorldScenario: 'Distance traveled during sensor perception delay is modeled as d = v · t_latency. At 30 m/s (approx 67 mph) with a 0.2s perception delay, the vehicle travels 6 meters before brake calipers even engage.',
            impactMetric: 'Sub-millisecond software optimization reduced perception latency by 40%, shaving 2.4 meters off emergency braking distances.'
          }
        ],
        selfCheckExercise: {
          question: 'An electric delivery van charges a flat dispatch fee of $8.00 plus $1.75 per mile driven. If a delivery budget is strictly capped at $43.00, what is the maximum whole number of miles the van can travel?',
          hint: 'Set up the linear equation: 8.00 + 1.75m = 43.00. Subtract 8.00 first, then divide by 1.75.',
          solution: '8.00 + 1.75m = 43.00  =>  1.75m = 35.00  =>  m = 35.00 / 1.75 = exactly 20 miles.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Slope-Intercept & Pan Balance Interactive Workbench',
        objective: 'Manipulate slope (m) and intercept (b) with real-time sliders to observe how line pitch, anchor elevation, and balance beam equilibrium respond dynamically.',
        instructions: 'Adjust the Slope slider to see the pitch of the line change, or adjust the Y-Intercept slider to translate the line vertically. Switch between the Coordinate Graph view and the Pan Balance view to see the algebraic balance maintained.',
        experimentType: 'linear-equations',
        variables: [
          {
            id: 'slope',
            label: 'Slope (m)',
            description: 'Controls the rate of change and tilt angle of the trajectory.',
            min: -5,
            max: 5,
            step: 1,
            defaultValue: 2,
            unit: 'Δy/Δx'
          },
          {
            id: 'intercept',
            label: 'Y-Intercept (b)',
            description: 'Sets the baseline vertical elevation where x = 0.',
            min: -6,
            max: 6,
            step: 1,
            defaultValue: 1,
            unit: 'units'
          },
          {
            id: 'test-x',
            label: 'Input X Coordinate',
            description: 'The horizontal coordinate evaluated on the linear manifold.',
            min: -6,
            max: 6,
            step: 1,
            defaultValue: 3,
            unit: 'x'
          }
        ],
        guidingQuestions: [
          'What happens to the graph when slope m is exactly zero? Why does the x variable vanish from dynamic change?',
          'How does a negative slope differ visually from a positive slope?',
          'If you change the y-intercept, does the angle or steepness of the line change at all?'
        ],
        whatToObserve: [
          'Notice that when slope m = 0, the line is perfectly horizontal: y is constant regardless of x.',
          'Notice that changing intercept b translates the line vertically parallel to itself.',
          'Notice how the yellow dot always marks the y-intercept (0, b) on the vertical axis.'
        ],
        takeawayInsight: 'Slope and intercept are independent controls: slope dictates how fast the relationship changes, while the intercept dictates where the relationship begins.'
      }
    }
  },

  // =========================================================================
  // 2. BIOLOGY: Photosynthesis
  // =========================================================================
  {
    id: 'bio-photosynthesis',
    slug: 'photosynthesis',
    title: 'Photosynthesis',
    subtitle: 'Harnessing stellar photons to split water and forge organic chemical bonds',
    subjectId: 'biology',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    overview: 'Photosynthesis is the biochemical engine that fuels Earth’s biosphere. It captures solar energy to split water molecules, releases oxygen as an oxidized byproduct, and fixes atmospheric carbon dioxide into energy-dense carbohydrates.',
    whyItMatters: 'Every breath of oxygen you take and nearly every calorie of food consumed by complex life on land and in the oceans traces its stored energy directly to chloroplasts converting light into molecular chemical bonds.',
    learningObjectives: [
      'Understand the overarching chemical equation of photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2.',
      'Differentiate the dual stages: Light-Dependent Reactions (thylakoid membrane) vs. Calvin Cycle (stroma).',
      'Explain how photolysis of water generates electrons, protons, and atmospheric oxygen.',
      'Analyze limiting environmental factors (light intensity, wavelength, CO2 concentration, temperature) using Liebig’s Law.'
    ],
    coreQuestions: [
      'How does a photon physically kickstart a chemical reaction in chlorophyll?',
      'Why is water split, and what happens to its hydrogen and oxygen atoms?',
      'How does the chloroplast store volatile light energy as durable carbohydrate rings?'
    ],
    prerequisites: ['Basic molecular concepts (atoms, electrons, covalent bonds)', 'Cellular structure (membranes, organelles)', 'Conservation of energy'],
    keyTerms: [
      { term: 'Thylakoid Membrane', definition: 'The internal lipid bilayer inside chloroplasts where the light-dependent reactions take place.' },
      { term: 'ATP Synthase', definition: 'A microscopic rotary turbine enzyme powered by a proton gradient to synthesize ATP from ADP.' },
      { term: 'Calvin Cycle', definition: 'The light-independent biochemical cycle occurring in the stroma that fixes CO₂ into glucose.' },
      { term: 'Photolysis', definition: 'The light-driven chemical cleaving of water molecules into electrons, protons, and diatomic oxygen.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Photosynthesis is nature’s quantum solar engine. Through a series of coupled electrochemical reactions, photoautotrophs transduce volatile electromagnetic radiation into stable covalent carbon bonds, producing the organic matter and oxygen atmosphere required for complex terrestrial life.',
        sections: [
          {
            id: 'bio-solar-engine',
            title: '1. The Thermodynamic Equation of Life',
            subtitle: 'Transducing photons into stable chemical potential energy',
            paragraphs: [
              'The net chemical equation of oxygenic photosynthesis is: 6 CO₂ + 6 H₂O + light energy → C₆H₁₂O₆ + 6 O₂.',
              'Carbon dioxide is reduced (gains electrons and hydrogen) into glucose sugar, while water is oxidized (surrenders electrons) into molecular oxygen gas. This reaction is intensely endergonic, requiring approximately 2,870 kilojoules of energy per mole of glucose synthesized.'
            ],
            callout: {
              type: 'insight',
              title: 'Source of Atmospheric Oxygen',
              text: 'Historically, scientists debated whether oxygen came from CO2 or H2O. Isotopic labeling with Oxygen-18 definitively proved that 100% of the oxygen released into our atmosphere comes from split water molecules, not from carbon dioxide.'
            }
          },
          {
            id: 'light-reactions',
            title: '2. Stage 1: The Light-Dependent Reactions',
            subtitle: 'Photolysis, electron transport, and chemiosmotic proton pumping',
            paragraphs: [
              'The light-dependent reactions take place across the thylakoid membrane inside chloroplasts. When a photon strikes Photosystem II, its energy excites an electron in a P680 chlorophyll molecule to a higher quantum orbital.',
              'To replace this lost electron, the water-splitting complex oxidizes water: 2 H₂O → 4 H⁺ + 4 e⁻ + O₂. As the excited electrons travel down an electron transport chain to Photosystem I, protons (H⁺) are pumped into the interior thylakoid lumen.',
              'This creates a massive electrochemical proton gradient. As protons rush back out into the stroma through ATP Synthase, the turbine-like enzyme rotates, phosphorylating ADP into high-energy ATP, while NADP⁺ reductase generates NADPH.'
            ],
            bulletPoints: [
              'Location: Thylakoid membrane lipid bilayer.',
              'Inputs: Photons (sunlight), H₂O, ADP, NADP⁺.',
              'Outputs: O₂ (byproduct), ATP, NADPH (chemical energy carriers).'
            ]
          },
          {
            id: 'calvin-cycle',
            title: '3. Stage 2: The Calvin Cycle (Light-Independent)',
            subtitle: 'Carbon fixation, reduction, and ribulose regeneration in the stroma',
            paragraphs: [
              'The chemical energy carriers (ATP and NADPH) synthesized in the light reactions migrate into the surrounding stroma fluid to power the Calvin Cycle.',
              'The enzyme RuBisCO (the most abundant protein on Earth) catalyzes the attachment of atmospheric CO₂ to a 5-carbon sugar called ribulose bisphosphate (RuBP). Through subsequent phosphorylation and reduction steps, this carbon is synthesized into glyceraldehyde-3-phosphate (G3P), which the plant assembles into glucose rings.'
            ],
            callout: {
              type: 'note',
              title: 'Dark Reactions Myth',
              text: 'Although termed "light-independent", the Calvin Cycle cannot run indefinitely in darkness because it rapidly exhausts the ATP and NADPH generated by active sunlight.'
            }
          }
        ],
        summaryTakeaways: [
          'Photosynthesis converts sunlight, water, and CO2 into glucose and oxygen.',
          'Stage 1 (Light reactions on thylakoids) splits water, creates oxygen, and charges ATP/NADPH.',
          'Stage 2 (Calvin Cycle in stroma) uses ATP/NADPH to fix CO2 into durable glucose sugar.',
          'Chlorophyll absorbs red and blue light while reflecting green, making foliage appear green.'
        ],
        reflectionPrompt: 'If a plant were grown in an atmosphere enriched with 5x normal CO2 but under pure green light, would its growth rate increase or plummet? Explain through chlorophyll absorption properties.'
      },
      'visual-learning': {
        visualType: 'anatomy',
        headline: 'Chloroplast Anatomy & The Dual-Stage Biochemical Factory',
        caption: 'Visualizing the physical compartmentalization that makes photosynthetic energy conversion possible.',
        diagramTitle: 'Internal Architecture of the Chloroplast',
        diagramDescription: 'Explore the specialized organelles and enzyme complexes that split water and fix carbon.',
        components: [
          {
            id: 'thylakoid-lumen',
            name: 'Thylakoid Lumen',
            role: 'Acidic Proton Reservoir',
            description: 'The sealed interior bag inside the thylakoid membrane where protons (H⁺) accumulate to high concentration, creating the electrochemical battery that powers ATP Synthase.',
            badge: 'pH ~4.0 (High H⁺)'
          },
          {
            id: 'stroma',
            name: 'Chloroplast Stroma',
            role: 'Enzymatic Fluid Floor',
            description: 'The alkaline fluid filling the interior cavity of the chloroplast outside the thylakoids. Houses dissolved RuBisCO enzymes, ribulose sugars, and the spinning Calvin Cycle.',
            badge: 'pH ~8.0 (Calvin Site)'
          },
          {
            id: 'photosystem-2',
            name: 'Photosystem II (P680)',
            role: 'Water-Splitting Sun Collector',
            description: 'A multi-protein complex embedded with chlorophyll pigments. Absorbs 680nm photons, excites electrons, and cleaves water molecules into oxygen and protons.',
            badge: 'Photolysis Site'
          },
          {
            id: 'atp-synthase',
            name: 'ATP Synthase Rotary Turbine',
            role: 'Molecular Generator',
            description: 'A rotary molecular motor. As concentrated protons stream through its rotor down their concentration gradient into the stroma, it spins, fusing phosphate onto ADP to make ATP.',
            badge: 'Rotary Motor'
          },
          {
            id: 'rubisco',
            name: 'RuBisCO Enzyme',
            role: 'Carbon Fixation Catalyst',
            description: 'The primary catalytic enzyme that catches gaseous CO₂ molecules from the air and bonds them onto 5-carbon organic acceptor rings.',
            badge: 'Carbon Fixer'
          }
        ],
        interactiveLayers: [
          {
            layerId: 'stage1-layer',
            label: 'Stage 1: Light Reactions (Thylakoid)',
            description: 'Photons hit Photosystem II, water is split, oxygen bubbles out, and protons accumulate.',
            highlightedComponentIds: ['photosystem-2', 'thylakoid-lumen', 'atp-synthase']
          },
          {
            layerId: 'stage2-layer',
            label: 'Stage 2: Calvin Cycle (Stroma)',
            description: 'ATP and NADPH power RuBisCO in the stroma to knit CO2 into 6-carbon glucose.',
            highlightedComponentIds: ['stroma', 'rubisco']
          }
        ],
        processFlow: [
          {
            step: 1,
            label: 'Photolysis of Water',
            detail: 'Photons strike Photosystem II. Water is cleaved: 2 H₂O → 4 H⁺ + 4 e⁻ + O₂.',
            annotation: 'Input: Sunlight + Water'
          },
          {
            step: 2,
            label: 'Proton Gradient & ATP Generation',
            detail: 'Electron transport pumps H⁺ into the lumen. Outward flow spins ATP Synthase to generate ATP and NADPH.',
            annotation: 'Energy: ATP + NADPH'
          },
          {
            step: 3,
            label: 'Carbon Fixation in Stroma',
            detail: 'RuBisCO uses ATP and NADPH to fix gaseous CO₂ into G3P precursor molecules, which assemble into glucose.',
            annotation: 'Output: Glucose Sugar'
          }
        ],
        spatialAnalogy: {
          metaphor: 'A Solar-Powered Hydroelectric Dam',
          explanation: 'Solar panels pump water uphill into an elevated mountain reservoir during the day (accumulating protons in the thylakoid lumen). When water drains back down through penstocks, it spins turbine generators (ATP Synthase) to power a sugar packaging facility in the valley below (Stroma Calvin Cycle).'
        },
        visualSummary: 'Physical compartmentalization is what makes photosynthesis work: without the enclosed thylakoid membrane bag to contain protons, ATP could never be synthesized.'
      },
      'examples-applications': {
        overview: 'Photosynthetic efficiency dictates global crop yields, atmospheric carbon sequestration, and next-generation renewable fuel synthesis.',
        workedExamples: [
          {
            id: 'ex-stoichiometry',
            title: 'Worked Example 1: Calculating Oxygen and Photon Stoichiometry',
            difficulty: 'Intermediate',
            contextOrPrompt: 'A laboratory culture of Chlorella algae synthesizes 1 mole of glucose (C6H12O6, ~180 grams). Calculate the minimum moles of water split and moles of O2 gas released.',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Inspect the balanced chemical equation for oxygenic photosynthesis.',
                work: '6 CO₂ + 6 H₂O + light energy → C₆H₁₂O₆ + 6 O₂',
                annotation: '1 mole of glucose requires 6 moles of water.'
              },
              {
                stepNumber: 2,
                explanation: 'Determine molar ratio of water consumed to glucose produced.',
                work: 'Moles of H₂O = 1 mole glucose × (6 moles H₂O / 1 mole glucose) = 6 moles H₂O',
                annotation: '6 moles of H₂O (approx 108 grams of liquid water) are cleaved.'
              },
              {
                stepNumber: 3,
                explanation: 'Determine molar ratio of oxygen gas produced.',
                work: 'Moles of O₂ = 1 mole glucose × (6 moles O₂ / 1 mole glucose) = 6 moles O₂',
                annotation: '6 moles of O₂ (approx 192 grams of oxygen gas) released.'
              }
            ],
            finalResult: '6 moles of H₂O split; 6 moles of O₂ gas released.',
            verificationTip: 'Verify atom conservation: Reactant water contains 6 × 2 = 12 H and 6 O. Product glucose contains 12 H and 6 O; product oxygen contains 12 O (derived from water photolysis).'
          }
        ],
        applications: [
          {
            domain: 'Agricultural Biotechnology',
            title: 'LED Spectral Tuning in Vertical Indoor Farms',
            context: 'Commercial indoor vertical farms eliminate sunlight entirely, relying on engineered light-emitting diode (LED) arrays.',
            realWorldScenario: 'Because chlorophyll has sharp absorption peaks at 450nm (blue) and 660nm (red) while reflecting 530nm (green), vertical farms illuminate crops with purple "pink-house" light recipes. Suppressing green wavelengths saves up to 40% in facility electrical costs with zero penalty to plant growth.',
            impactMetric: 'Modern indoor leafy green production achieves 95% less water consumption and 20x higher yield per square meter compared to outdoor soil fields.'
          },
          {
            domain: 'Clean Energy & Materials Science',
            title: 'Bionic Artificial Leaves for Solar Fuel Synthesis',
            context: 'Chemists at Caltech and Cambridge are reverse-engineering Photosystem II to synthesize carbon-neutral liquid fuels.',
            realWorldScenario: 'Using nano-structured cobalt and copper photocatalytic wafers submerged in water, artificial leaves capture photons to cleave water and reduce captured CO2 directly into liquid methanol fuel.',
            impactMetric: 'Achieved 10% solar-to-chemical conversion efficiency—nearly 10x higher than typical agricultural crop conversion (~1%).'
          }
        ],
        selfCheckExercise: {
          question: 'A greenhouse operator observes that during hot summer afternoons (39°C / 102°F), plant photosynthesis crashes despite intense bright sunlight. What biochemical mechanism causes this sudden drop?',
          hint: 'Consider what excessive thermal kinetic energy does to the 3D folded shape of proteins like RuBisCO.',
          solution: 'At temperatures exceeding 35-38°C, thermal agitation breaks weak hydrogen bonds stabilizing RuBisCO and Photosystem proteins. This thermal denaturation deforms the catalytic active sites, disabling carbon fixation.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Photosynthetic Growth Chamber & Gas Exchange Simulator',
        objective: 'Manipulate light intensity, wavelength color, CO2 concentration, and temperature to observe live oxygen bubble rates, glucose yield, and discover Liebig’s Law of the Minimum.',
        instructions: 'Use the interactive controls to adjust environmental parameters. Observe how oxygen bubbling and glucose synthesis respond in real time, and inspect the active limiting factor indicator.',
        experimentType: 'photosynthesis',
        variables: [
          {
            id: 'wavelength',
            label: 'Light Wavelength (Color)',
            description: 'Selects the spectral wavelength striking chloroplast pigments.',
            min: 0,
            max: 3,
            step: 1,
            defaultValue: 3,
            unit: 'nm'
          },
          {
            id: 'light-intensity',
            label: 'Light Intensity (%)',
            description: 'Governs photon flux density reaching Photosystem II.',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 75,
            unit: '%'
          },
          {
            id: 'co2',
            label: 'CO2 Concentration (ppm)',
            description: 'Ambient carbon dioxide available for fixation in the stroma.',
            min: 50,
            max: 1000,
            step: 25,
            defaultValue: 450,
            unit: 'ppm'
          },
          {
            id: 'temperature',
            label: 'Chamber Temperature (°C)',
            description: 'Governs enzyme kinetic collision rates and thermal denaturation.',
            min: 5,
            max: 45,
            step: 1,
            defaultValue: 25,
            unit: '°C'
          }
        ],
        guidingQuestions: [
          'What happens to oxygen bubbling when you switch the light wavelength from White to Green (530nm)? Why?',
          'If light intensity is already at 100%, does increasing CO2 from 400 to 1000 ppm continue increasing glucose forever, or does it saturate?',
          'What happens to photosynthetic rate when temperature exceeds 40°C?'
        ],
        whatToObserve: [
          'Notice that under pure green light, oxygen bubble rate drops to near-zero because chlorophyll reflects green photons.',
          'Notice that above 38°C, the rate crashes due to enzyme denaturation despite maximum light and CO2.',
          'Notice how Liebig’s Law of the Minimum states that the slowest environmental factor bounds the overall reaction rate.'
        ],
        takeawayInsight: 'Photosynthesis is limited by whichever single resource is in shortest supply—increasing light won’t help if the plant is starved of CO2 or paralyzed by extreme temperatures.'
      }
    }
  },

  // =========================================================================
  // 3. HISTORY: Causes of the French Revolution
  // =========================================================================
  {
    id: 'hist-french-revolution',
    slug: 'causes-of-the-french-revolution',
    title: 'Causes of the French Revolution',
    subtitle: 'Systemic debt, social caste rigidity, Enlightenment philosophy, and climatic shock',
    subjectId: 'history',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    overview: 'The explosion of 1789 was not a spontaneous riot against a single monarch, but the catastrophic breakdown of an archaic feudal architecture under the compounding weight of national bankruptcy, regressive taxation, devastating crop failures, and Enlightenment ideals.',
    whyItMatters: 'It marks the birth of modern political ideology: human rights charters, representative democracy, secularism, the concept of political left-vs-right, and the perils of ideological extremism.',
    learningObjectives: [
      'Evaluate the structural inequalities of the Three Estates in Ancien Régime France.',
      'Analyze how sovereign war debt from the American Revolution triggered fiscal insolvency.',
      'Examine the catalytic role of the 1788 climatic harvest failure in driving bread prices to 88% of daily wages.',
      'Acknowledge multiple valid historiographical interpretations (social-class, fiscal-structural, and cultural Enlightenment models).'
    ],
    coreQuestions: [
      'Why was the French crown unable to reform its tax structure before bankruptcy struck?',
      'How did Enlightenment philosophy transition from aristocratic salons to street agitation?',
      'What catalytic role did weather and harvest failure play in accelerating violence?'
    ],
    prerequisites: ['Basic feudal social structure (monarchy, nobility, peasantry)', 'Concept of state budget and sovereign debt'],
    keyTerms: [
      { term: 'The Three Estates', definition: 'The legally codified social order: 1st Estate (Clergy), 2nd Estate (Nobility), and 3rd Estate (Everyone else, 98% of the populace).' },
      { term: 'Estates-General', definition: 'A consultative assembly of the three estates, dormant since 1614, convened by Louis XVI in 1789 to approve new taxes.' },
      { term: 'Taille', definition: 'The direct royal land tax levied almost exclusively upon Third Estate peasants, from which nobles and clergy were exempt.' },
      { term: 'Parlements', definition: 'Regional noble appellate courts that held the legal power to register royal edicts and repeatedly vetoed universal tax reforms.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Historians recognize that the French Revolution was not caused by a single villain or spontaneous spark, but by the simultaneous convergence of four systemic crises: an inequitable social caste structure, a sovereign debt trap, a severe climatic famine, and a crisis of monarchical legitimacy.',
        sections: [
          {
            id: 'feudal-caste',
            title: '1. The Ancien Régime & The Three Estates',
            subtitle: 'Legal privilege, regressive taxation, and institutional sclerosis',
            paragraphs: [
              'Pre-revolutionary French society was divided into three legal orders. The First Estate (Catholic Clergy, ~130,000 people) and Second Estate (Nobility, ~350,000 people) comprised less than 2% of the population, yet owned over 40% of all agricultural land.',
              'Crucially, both privileged orders enjoyed extensive exemptions from direct royal taxation (such as the taille). The fiscal burden fell almost entirely upon the Third Estate (peasants, urban artisans, merchants, and lawyers—totaling 26 million people). Peasants paid tithes to the Church, feudal dues to local seigneurs, royal taxes to the King, and the hated gabelle (salt tax).'
            ],
            bulletPoints: [
              'First Estate: Catholic clergy; collected 10% tithe on all harvests; paid only a voluntary gift (don gratuit).',
              'Second Estate: Sword and robe nobility; held monopoly over senior military commissions and judicial benches.',
              'Third Estate: 98% of France; carried 100% direct tax incidence with zero institutional political representation.'
            ]
          },
          {
            id: 'debt-trap',
            title: '2. The Sovereign Debt Crisis & War Finance',
            subtitle: 'How bankrolling the American Revolution bankrupted the French crown',
            paragraphs: [
              'Between 1778 and 1783, France provided massive financial and naval subsidies to the American Revolutionary War to weaken its British rival. Finance Minister Jacques Necker financed the war not through new domestic taxes, but through high-interest loans from Swiss and Dutch bankers.',
              'By 1788, sovereign interest payments consumed over 50% of the entire annual French national budget. Credit markets panicked, refusing to lend further funds to the Crown unless structural tax reforms were enacted.'
            ],
            callout: {
              type: 'insight',
              title: 'Historiographical Debate: Class vs. Fiscal Crisis',
              text: 'While traditional Marxist historians (Georges Lefebvre) framed the revolution as an inevitable class war between the rising bourgeoisie and feudal aristocracy, revisionist historians (François Furet, William Doyle) argue that France was brought down primarily by a modern financial debt crisis that the archaic state apparatus could not manage.'
            }
          },
          {
            id: 'climatic-shock',
            title: '3. The Climatic Famine of 1788–1789',
            subtitle: 'Volcanic ash, summer hail, and the surge in bread prices',
            paragraphs: [
              'In 1783, Iceland’s Laki volcanic fissure erupted, spewing aerosols across Europe and destabilizing weather patterns for years. In July 1788, catastrophic freak hailstorms destroyed grain crops across northern France, followed by one of the bitterest winters on record.',
              'By the spring of 1789, the price of a standard 4-pound loaf of bread in Paris soared to 88% of an average laborer’s daily wage. Starvation forced urban artisans onto the streets, transforming political constitutional debates in Versailles into armed popular revolution in Paris.'
            ],
            callout: {
              type: 'warning',
              title: 'Catalytic vs. Root Cause',
              text: 'The bread famine did not create revolutionary ideas on its own; it acted as the physical catalyst that mobilized millions of desperate citizens behind the political framework already established by Enlightenment thinkers.'
            }
          }
        ],
        summaryTakeaways: [
          'The Three Estates system placed the entire tax burden on the 98% commoner population.',
          'War debt from the American Revolution consumed >50% of royal revenues in interest payments.',
          'The noble-dominated Parlements vetoed universal land tax reforms, forcing the convocation of the Estates-General.',
          'Extreme harvest failure pushed bread prices to 88% of daily wages, mobilizing the masses to storm the Bastille.'
        ],
        reflectionPrompt: 'Could Louis XVI have prevented the revolution by simply declaring national bankruptcy in 1787 as earlier French monarchs had done? What international and domestic credit factors prevented this?'
      },
      'visual-learning': {
        visualType: 'matrix',
        headline: 'The Fractured Architecture of the Three Estates (1789)',
        caption: 'Visualizing demographic proportions, land distribution, and tax incidence under the Ancien Régime.',
        diagramTitle: 'Social Order & Fiscal Disparity Matrix',
        diagramDescription: 'Inspect the legal categories and structural inequities that paralyzed French governance.',
        components: [
          {
            id: 'first-estate',
            name: 'First Estate: Catholic Clergy',
            role: 'Spiritual Authority & Tithes',
            description: '130,000 individuals (~0.5% population). Owned 10% of productive agricultural land. Levied a 10% tithe on all peasant crops. Paid no direct royal taxes.',
            badge: '0.5% Pop • 0% Direct Tax'
          },
          {
            id: 'second-estate',
            name: 'Second Estate: Aristocracy',
            role: 'Military & Judicial Monopoly',
            description: '350,000 individuals (~1.5% population). Owned 25-30% of agricultural land. Held exclusive monopolies over officer ranks and high courts. Exempt from royal land taxes and forced road labor.',
            badge: '1.5% Pop • 0% Direct Tax'
          },
          {
            id: 'third-estate-bourgeoisie',
            name: 'Third Estate: Bourgeoisie',
            role: 'Commercial & Legal Professionals',
            description: '3 million urban merchants, bankers, doctors, and lawyers. Generated substantial wealth but were blocked from aristocratic social advancement and state policy making.',
            badge: 'Wealth Without Voice'
          },
          {
            id: 'third-estate-peasantry',
            name: 'Third Estate: Rural Peasants',
            role: 'Agrarian Economic Bedrock',
            description: '22 million rural farmers (~85% of France). Owned fragmented small plots. Carried the taille, corvée (unpaid labor), seigneurial mill fees, and tithe.',
            badge: '85% Pop • 100% Tax Incidence'
          }
        ],
        processFlow: [
          {
            step: 1,
            label: '1787: Assembly of Notables Rejects Tax Reform',
            detail: 'Controller-General Calonne proposes universal land tax; noble assembly refuses to surrender tax exemptions.',
            annotation: 'Deadlock'
          },
          {
            step: 2,
            label: 'May 1789: Estates-General Voting Crisis',
            detail: 'Monarchy decrees voting "by order" (2-to-1 privilege victory) rather than "by head". Third Estate bolts.',
            annotation: 'Institutional Rupture'
          },
          {
            step: 3,
            label: 'July 14, 1789: Fall of the Bastille',
            detail: 'Parisian citizens seize 28,000 muskets and capture the medieval fortress, ending royal absolute power.',
            annotation: 'Insurrection'
          }
        ],
        spatialAnalogy: {
          metaphor: 'An Inverted Pyramid Balancing on a Splinter',
          explanation: 'Imagine a towering skyscraper where the top two luxury penthouse floors pay zero building maintenance fees and consume 80% of building utilities, while the tenants living in the basement boiler rooms carry the entire mortgage. When the boiler floods, the whole skyscraper collapses.'
        },
        visualSummary: 'The voting procedure of the Estates-General (voting by Estate rather than by individual delegate) mathematically ensured that the 2% privileged nobility and clergy could permanently outvote 98% of the nation 2-to-1.'
      },
      'examples-applications': {
        overview: 'Historical analysis requires interrogating primary source documents, weighing conflicting evidence, and observing how economic shocks translate into political violence.',
        workedExamples: [
          {
            id: 'primary-source-sieyes',
            title: 'Primary Source Analysis: Abbé Sieyès’ "What is the Third Estate?" (January 1789)',
            difficulty: 'Intermediate',
            contextOrPrompt: 'Analyze the famous revolutionary pamphlet that redefined national sovereignty in France months before the storming of the Bastille.',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Identify the author and rhetorical context.',
                work: 'Author: Emmanuel-Joseph Sieyès, a Catholic clergyman writing in defense of the Third Estate.',
                annotation: 'Published during the national pamphlet war preparing for the Estates-General.'
              },
              {
                stepNumber: 2,
                explanation: 'Analyze the famous opening three-question syllogism.',
                work: '“What is the Third Estate? Everything. What has it been heretofore in the political order? Nothing. What does it demand? To become something.”',
                annotation: 'Argues that the Third Estate performs all useful labor (farming, commerce, crafts) and therefore constitutes the complete nation.'
              },
              {
                stepNumber: 3,
                explanation: 'Identify the radical constitutional conclusion.',
                work: 'Sieyès concludes that the nobility is an alien, parasitical caste that could be amputated with zero harm to the nation: “The Third Estate is a complete nation in itself.”',
                annotation: 'Lays the direct intellectual groundwork for the Third Estate declaring itself the sovereign National Assembly on June 17, 1789.'
              }
            ],
            finalResult: 'Redefined sovereignty from the King’s body to the productive citizenry of the nation.',
            verificationTip: 'Check for author bias: Sieyès was an ambitious clergyman passed over for aristocratic bishop appointments, giving him personal grievance against noble exclusivity.'
          }
        ],
        applications: [
          {
            domain: 'Macroeconomics & Political Risk',
            title: 'Sovereign Debt Default & Social Instability Indices',
            context: 'Modern financial institutions and intelligence agencies monitor state fragility using fiscal indicators pioneered in the study of 1789 France.',
            realWorldScenario: 'Contemporary sovereign collapses—such as Sri Lanka in 2022 or Lebanon in 2020—exhibit the identical causal chain as France in 1789: unsustainable foreign debt service (>40% of fiscal revenue), sudden currency devaluation, and bread/fuel subsidies collapsing.',
            impactMetric: 'Modern early-warning risk frameworks use food inflation thresholds (>50% YoY) combined with fiscal debt rigidity to forecast civil unrest 6 to 12 months in advance.'
          }
        ],
        selfCheckExercise: {
          question: 'Why did the French nobility in the Parlements oppose the King’s universal land tax in 1787, even though their own financial security depended on state solvency?',
          hint: 'Consider what submitting to a universal tax would do to their feudal legal identity and status privilege.',
          solution: 'To French aristocrats, paying taxes was not merely a monetary cost; it meant surrendering their centuries-old legal distinction as a privileged caste. They viewed tax exemption as the defining boundary between free nobility and taxable commoners.'
        }
      },
      'explore-experiment': {
        activityTitle: '1789 State Fragility & Civil Insurrection Simulator',
        objective: 'Manipulate noble tax exemptions, harvest failure severity, and war debt service burden to observe real-time impacts on treasury deficit, bread prices, and the probability of revolution.',
        instructions: 'Adjust the historical systemic levers to test counterfactual scenarios (e.g. what if the nobility had paid taxes in 1787?). Observe how historical milestones unlock as critical thresholds are crossed.',
        experimentType: 'french-revolution',
        variables: [
          {
            id: 'privilege-exemption',
            label: 'Aristocratic & Church Tax Exemption Rate (%)',
            description: 'Percentage of land tax exempted for the 1st and 2nd Estates.',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 95,
            unit: '%'
          },
          {
            id: 'harvest-failure',
            label: 'Crop Harvest Failure (Climatic Shock)',
            description: 'Severity of the 1788 volcanic winter and hailstorm destruction.',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 85,
            unit: '%'
          },
          {
            id: 'war-debt',
            label: 'Sovereign Debt Interest Share (%)',
            description: 'Percentage of crown revenue consumed by interest on American War debt.',
            min: 10,
            max: 80,
            step: 5,
            defaultValue: 55,
            unit: '%'
          }
        ],
        guidingQuestions: [
          'If you reduce the Noble/Clergy Tax Exemption from 95% to 0%, what happens to the royal treasury deficit?',
          'Why did good harvests prevent revolution in earlier decades despite equally corrupt monarchical taxation?',
          'What threshold of bread wage expenditure triggers popular insurrection in the model?'
        ],
        whatToObserve: [
          'Notice that when bread prices exceed 75% of a daily wage, rebellion risk surges into the red zone regardless of royal decrees.',
          'Notice that eliminating tax exemptions wipes out the treasury deficit, proving that France’s bankruptcy was institutional rather than economic.',
          'Observe how the 1789 event triggers (Estates-General, Tennis Court Oath, Bastille) correspond to compounding stress.'
        ],
        takeawayInsight: 'Revolutions occur not when people are merely poor, but when an archaic political architecture refuses to distribute civic burdens equitably during an environmental crisis.'
      }
    }
  },

  // =========================================================================
  // 4. ENGLISH: Understanding Metaphors
  // =========================================================================
  {
    id: 'eng-understanding-metaphors',
    slug: 'understanding-metaphors',
    title: 'Understanding Metaphors',
    subtitle: 'Conceptual mapping, cognitive lenses, and the architecture of figurative thought',
    subjectId: 'english',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'A metaphor is not merely a poetic flourish or decorative literary ornament. It is a fundamental cognitive mechanism: a conceptual bridge that maps a familiar, physical source domain onto an abstract, unfamiliar target domain.',
    whyItMatters: 'We conceptualize time as money ("spending time"), arguments as war ("defending a position"), and love as a journey ("we hit a crossroads"). Metaphors shape how human beings reason, make decisions, and form empathy.',
    learningObjectives: [
      'Define the tripartite anatomy of a metaphor: Tenor (Target), Vehicle (Source), and Ground (Shared Structure).',
      'Distinguish between decorative literary metaphors and deep cognitive conceptual metaphors (Lakoff & Johnson).',
      'Analyze how metaphors highlight certain features of a concept while systematically suppressing others.',
      'Detect and correct mixed metaphors that cause semantic dissonance.'
    ],
    coreQuestions: [
      'How does a metaphor differ functionally from a simile or an analogy?',
      'What are the "Tenor" and "Vehicle", and how does semantic tension create meaning?',
      'How do deep conceptual metaphors subtly govern everyday decision making?'
    ],
    prerequisites: ['Basic grammar and sentence syntax', 'Concept of literal vs. figurative meaning'],
    keyTerms: [
      { term: 'Target Domain (Tenor)', definition: 'The abstract subject or idea being explained or illuminated.' },
      { term: 'Source Domain (Vehicle)', definition: 'The concrete, sensory concept lending its attributes, imagery, and physical properties.' },
      { term: 'Ground', definition: 'The common conceptual territory and shared structural traits between the source and target.' },
      { term: 'Mixed Metaphor', definition: 'The contradictory blending of two incompatible metaphors in the same sentence, creating cognitive dissonance.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'For centuries, traditional rhetoric treated metaphors as decorative linguistic poetry—optional jewelry added to prose. Modern cognitive linguistics, pioneered by George Lakoff and Mark Johnson in "Metaphors We Live By", demonstrated the opposite: metaphor is the primary operating system through which the human brain comprehends abstract thought.',
        sections: [
          {
            id: 'anatomy-of-metaphor',
            title: '1. The Tripartite Anatomy: Tenor, Vehicle, and Ground',
            subtitle: 'The semantic mechanics of asserting that A is B',
            paragraphs: [
              'Literary theorist I.A. Richards established that every metaphor operates through three interrelated components:',
              '1. The Tenor (Target Domain): The underlying idea or subject being described (e.g., "His temper").',
              '2. The Vehicle (Source Domain): The concrete, sensory image carrying the comparison (e.g., "A volcano").',
              '3. The Ground: The shared structural properties between them that make the comparison coherent (e.g., building pressure, heat, and sudden explosive release).'
            ],
            callout: {
              type: 'axiom',
              title: 'The Semantic Collision',
              text: 'A metaphor asserts an impossibility: "His temper is a volcano." Literally, a temper is a human neurochemical emotion; a volcano is a geological landform. The human brain instantly rejects the literal falsehood and seeks the deep relational isomorphism in the Ground.'
            }
          },
          {
            id: 'conceptual-metaphors',
            title: '2. Conceptual Metaphors in Everyday Cognition',
            subtitle: 'How embodied physical experience structures abstract reasoning',
            paragraphs: [
              'Human beings understand intangible domains (like time, ideas, or emotions) by projecting physical experiences of space, containers, and gravity onto them.',
              'Consider the conceptual metaphor TIME IS MONEY. Because money is a scarce, quantifiable commodity in our culture, we speak of time using commercial vocabulary: "You are wasting my time," "I invested three hours," "Can you spare ten minutes?" This is not poetic exaggeration; it governs how we experience and schedule our lives.'
            ],
            bulletPoints: [
              'ARGUMENT IS WAR: "Your claims are indefensible," "He attacked my points," "I shot down his idea."',
              'IDEAS ARE OBJECTS / MINDS ARE CONTAINERS: "Put that thought into words," "His head is full of facts."',
              'MORE IS UP / LESS IS DOWN: "Prices rose," "My spirits plummeted," "High performance."'
            ]
          },
          {
            id: 'highlighting-suppressing',
            title: '3. Highlighting, Suppressing, and Mixed Metaphors',
            subtitle: 'Every metaphor illuminates certain truths while concealing others',
            paragraphs: [
              'When you frame an argument as war, you highlight conflict, winning, and defeat, while suppressing cooperative synthesis and mutual learning.',
              'A "mixed metaphor" occurs when a speaker accidentally invokes two incompatible source domains simultaneously. For example: "We must lay a solid foundation before the ship sets sail." Laying a foundation invokes architecture (stone, cement, immovable ground); setting sail invokes seafaring (water, wind, dynamic motion). The listener’s brain tries to construct two conflicting spatial models simultaneously, producing cognitive confusion.'
            ],
            callout: {
              type: 'warning',
              title: 'Spotting Mixed Metaphors',
              text: 'Beware clichés like "We’re skating on thin ice, so don’t rock the boat!" Skating requires frozen solid ice; rocking a boat requires liquid water.'
            }
          }
        ],
        summaryTakeaways: [
          'Metaphors consist of a Tenor (Target), Vehicle (Source), and Ground (Shared Structure).',
          'Metaphors are cognitive tools that allow physical sensory brains to reason about abstract ideas.',
          'Every metaphor highlights specific traits while systematically suppressing others.',
          'Avoid mixed metaphors where two contradictory physical source domains collide.'
        ],
        reflectionPrompt: 'How would our legal courtrooms change if the dominant conceptual metaphor was ARGUMENT IS DANCE rather than ARGUMENT IS WAR? What behaviors would be rewarded or discouraged?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Conceptual Domain Projection & The Shared Ground',
        caption: 'Visualizing how a metaphor projects concrete sensory properties from a Source Domain onto an Abstract Target Domain.',
        diagramTitle: 'The Tripartite Anatomy of Conceptual Mapping',
        diagramDescription: 'Inspect how attributes transfer across domains and where the illuminated Ground is created.',
        components: [
          {
            id: 'target-domain',
            name: 'Target Domain (Tenor)',
            role: 'Abstract Subject',
            description: 'The intangible concept receiving illumination (e.g., "Time", "Argument", "Temper"). It lacks physical sensory coordinates until mapped.',
            badge: 'Abstract'
          },
          {
            id: 'source-domain',
            name: 'Source Domain (Vehicle)',
            role: 'Sensory Anchor',
            description: 'The physical, embodied experience lending its attributes (e.g., "Money", "War", "Volcano"). Rich in sensory memory, tactile weight, and spatial motion.',
            badge: 'Sensory'
          },
          {
            id: 'the-ground',
            name: 'The Ground (Venn Intersection)',
            role: 'Shared Relational Matrix',
            description: 'The active set of structural correspondences that hold true between source and target (e.g., scarcity, budgeting, or explosive pressure release).',
            badge: 'The Core Truth'
          },
          {
            id: 'suppression-filter',
            name: 'Cognitive Suppression Filter',
            role: 'Biological Detail Gate',
            description: 'Filters out irrelevant physical properties (e.g., when saying "Lawyers are sharks", we map predatory speed and suppress gills, fins, and saltwater habitat).',
            badge: 'Noise Filter'
          }
        ],
        interactiveLayers: [
          {
            layerId: 'projection-layer',
            label: 'Domain Projection',
            description: 'Source domain rays cast structural features across toward the abstract target.',
            highlightedComponentIds: ['target-domain', 'source-domain']
          },
          {
            layerId: 'ground-layer',
            label: 'The Ground Matrix',
            description: 'The illuminated conceptual overlap where meaning is synthesized.',
            highlightedComponentIds: ['the-ground', 'suppression-filter']
          }
        ],
        processFlow: [
          {
            step: 1,
            label: 'Semantic Collision',
            detail: 'Read the assertion: "Time is a thief." The brain detects category incompatibility.',
            annotation: 'Trigger'
          },
          {
            step: 2,
            label: 'Feature Extraction & Filtering',
            detail: 'Isolate shared traits (stealing away silently, unrecoverable loss); suppress irrelevant traits (ski masks, jail sentences).',
            annotation: 'Filtering'
          },
          {
            step: 3,
            label: 'Emergent Synthesis',
            detail: 'The listener experiences a heightened urgency to protect their remaining minutes.',
            annotation: 'Cognitive Impact'
          }
        ],
        spatialAnalogy: {
          metaphor: 'A Tinted Camera Lens Filter',
          explanation: 'Putting a sepia filter over a camera lens does not change the physical objects in the room, but it alters which wavelengths of light reach the sensor. A metaphor filters which attributes of an abstract concept your consciousness notices.'
        },
        visualSummary: 'The power of a metaphor lies in its compression ratio: a single word ("anchored", "ignited", "unraveled") immediately loads an entire sensory operating system into the reader’s imagination.'
      },
      'examples-applications': {
        overview: 'Examine how master rhetoricians, playwrights, and technology designers use conceptual metaphors to shape human behavior and emotion.',
        workedExamples: [
          {
            id: 'ex-shakespeare-stage',
            title: 'Worked Example 1: Shakespeare’s "All the world’s a stage" (As You Like It)',
            difficulty: 'Foundational',
            contextOrPrompt: 'Deconstruct Jaques’ monologue: “All the world’s a stage, and all the men and women merely players; they have their exits and their entrances...”',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Identify the Target (Tenor) and Source (Vehicle).',
                work: 'Target: Human Life and Society. Source: The Theater and Stage Acting.',
                annotation: 'Tenor = Life; Vehicle = Theater.'
              },
              {
                stepNumber: 2,
                explanation: 'Map the Ground correspondences.',
                work: 'Birth = Entering the stage; Death = Exiting the stage; Social roles = Costumes and scripts; Aging = Moving through acts.',
                annotation: 'Structural isomorphism between living in society and playing assigned theatrical roles.'
              },
              {
                stepNumber: 3,
                explanation: 'Identify the philosophical implication.',
                work: 'Frames human vanity and self-importance as ephemeral: our grandest struggles are temporary performances on a platform we do not own.',
                annotation: 'Philosophical detachment and existential clarity.'
              }
            ],
            finalResult: 'Maps theatrical impermanence onto human lifespan to demystify existential anxiety.',
            verificationTip: 'Notice what is suppressed: stage curtains, ticket prices, backstage makeup mirrors.'
          },
          {
            id: 'ex-mlk-promissory',
            title: 'Worked Example 2: Dr. Martin Luther King Jr.’s "Promissory Note" (1963)',
            difficulty: 'Intermediate',
            contextOrPrompt: 'Analyze the banking/financial metaphor in the opening passages of the "I Have a Dream" speech.',
            steps: [
              {
                stepNumber: 1,
                explanation: 'Isolate the figurative sentence.',
                work: '“In a sense we’ve come to our nation’s capital to cash a check... a promissory note to which every American was to fall heir.”',
                annotation: 'Vehicle = Financial Banking & Check Redemption; Tenor = Constitutional Civil Rights.'
              },
              {
                stepNumber: 2,
                explanation: 'Trace the Ground across the banking domain.',
                work: 'Founding Documents (Constitution & Declaration) = Promissory Note; Segregation & Discrimination = "A bad check that came back marked insufficient funds"; Civil Rights March = "Refusing to believe the bank of justice is bankrupt."',
                annotation: 'Translates moral justice into a legally binding financial contract that America defaulted on.'
              },
              {
                stepNumber: 3,
                explanation: 'Evaluate rhetorical power.',
                work: 'By using the commercial language of banking, King framed civil rights not as a radical demand for new privileges, but as demanding payment on an overdue, signed contract that white America already acknowledged.',
                annotation: 'Universal persuasive leverage across diverse audiences.'
              }
            ],
            finalResult: 'Transformed an abstract moral cause into a breach of financial contract.',
            verificationTip: 'Recognize the rhetorical brilliance: even segregationists could not deny that a signed promissory note must be honored.'
          }
        ],
        applications: [
          {
            domain: 'Human-Computer Interaction (HCI)',
            title: 'The Apple Macintosh & Xerox PARC "Desktop" Metaphor',
            context: 'In the late 1970s, personal computers required typing arcane command-line strings that ordinary office workers could not use.',
            realWorldScenario: 'Engineers mapped the digital computer file-system onto an office worker’s physical desk: digital documents sit on a "desktop", nested within "folders", and discarded into a "trash can".',
            impactMetric: 'Adoption of personal computing exploded worldwide; the desktop metaphor remains the primary operating system interface 45+ years later.'
          }
        ],
        selfCheckExercise: {
          question: 'Identify the mixed metaphor in this corporate press release: "We must steer our ship through turbulent waters to ensure our foundation remains anchored to solid rock."',
          hint: 'Identify the two physical vehicles being forced together in the same sentence.',
          solution: 'The sentence mixes a nautical vehicle ("steer our ship through turbulent waters") with an architectural civil engineering vehicle ("foundation remains anchored to solid rock"). A ship does not have a bedrock foundation; an anchored building does not sail through water.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Cognitive Linguistics Metaphor Projection Lab',
        objective: 'Select target domains (Time, Argument, Mind, Love) and source domains (Money, War, Building, Journey, Ocean) to inspect ground mapping, suppressed attributes, and test mixed metaphors.',
        instructions: 'Choose a Target Concept and a Source Experience. Observe the generated expressions, the illuminated Ground, and test the optional "Conflicting Second Source" to witness a mixed metaphor alert.',
        experimentType: 'metaphors',
        variables: [
          {
            id: 'target-concept',
            label: 'Target Concept (Tenor)',
            description: 'The abstract domain being conceptualized.',
            min: 0,
            max: 3,
            step: 1,
            defaultValue: 0,
            unit: 'domain'
          },
          {
            id: 'source-experience',
            label: 'Source Domain (Vehicle)',
            description: 'The physical sensory domain lending its structure.',
            min: 0,
            max: 4,
            step: 1,
            defaultValue: 0,
            unit: 'domain'
          }
        ],
        guidingQuestions: [
          'How does framing ARGUMENT as a BUILDING (construction) lead to different conversational behaviors than framing ARGUMENT as a WAR (combat)?',
          'Why does saying "Time is Money" make people feel guilty when relaxing, while saying "Time is a River" encourages peaceful acceptance?',
          'What happens in your mind when you inject a conflicting second source into a metaphor?'
        ],
        whatToObserve: [
          'Notice how changing the source domain completely shifts the everyday expressions we use without changing the underlying fact.',
          'Notice which physical attributes are mapped into the Ground and which biological attributes are actively suppressed.',
          'Notice the cognitive dissonance created when you activate the Mixed Metaphor tester.'
        ],
        takeawayInsight: 'Metaphors do not simply describe the world; they prescribe how we perceive, feel, and act within it.'
      }
    }
  },

  // =========================================================================
  // 5. COMPUTER SCIENCE: Binary Search & Algorithmic Complexity
  // =========================================================================
  {
    id: 'cs-binary-search',
    slug: 'binary-search',
    title: 'Binary Search & Algorithmic Complexity',
    subtitle: 'Divide-and-conquer, logarithmic scaling, and search space reduction',
    subjectId: 'computer-science',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    overview: 'Binary search is the quintessential divide-and-conquer algorithm. By inspecting the midpoint of a sorted array and discarding half the candidate space at each step, it finds targets in logarithmic time O(log n)—searching 4 billion records in at most 32 comparisons.',
    whyItMatters: 'Database indexing (B-Trees), Git bisect debugging, distributed hash tables, and operating system memory locators all rely directly on the logarithmic division of candidate spaces.',
    learningObjectives: [
      'Understand the invariant precondition: binary search requires sorted monotonic data.',
      'Explain the mathematical derivation of logarithmic time complexity O(log2 n).',
      'Trace step-by-step array halving and identify mid-point index overflow safeguards.',
      'Analyze real-world systems applications like git bisect and database B-Tree index lookups.'
    ],
    coreQuestions: [
      'Why is sorting a prerequisite for binary search to function correctly?',
      'How does O(log n) performance compare intuitively to O(n) linear search?',
      'Why do off-by-one errors and integer overflow famously plague binary search implementations?'
    ],
    prerequisites: ['Basic programming syntax (arrays, indices, loops)', 'Basic understanding of sorted data'],
    keyTerms: [
      { term: 'Logarithmic Time O(log n)', definition: 'Complexity where doubling input size adds only a single additional execution step.' },
      { term: 'Search Invariant', definition: 'The property guaranteed to hold true before and after each loop iteration (e.g., target is between low and high).' },
      { term: 'Divide and Conquer', definition: 'An algorithmic paradigm that breaks a problem into non-overlapping subproblems of identical type.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Binary search is computer science’s most elegant illustration of algorithmic efficiency. While linear search inspects elements one by one, binary search leverages order to eliminate half the universe at every query.',
        sections: [
          {
            id: 'cs-monotonicity',
            title: '1. The Monotonicity Guarantee',
            subtitle: 'Why sorted order enables instant elimination of half the space',
            paragraphs: [
              'In an unsorted array, testing an element at index mid reveals nothing about whether the target lies to the left or right. You are forced to perform a linear scan in O(n) time.',
              'However, in a strictly monotonic sorted array S, testing S[mid] partitions the elements into three disjoint sets: S[mid] itself, all elements left of mid (strictly smaller or equal), and all elements right of mid (strictly greater or equal). If your target is smaller than S[mid], transitivity guarantees that every element from mid to the end of the array is also too large, allowing you to discard that entire half.'
            ]
          },
          {
            id: 'cs-logarithmic',
            title: '2. Logarithmic Growth: O(log₂ n)',
            subtitle: 'Why 32 queries can search 4 billion records',
            paragraphs: [
              'With each iteration, the candidate array length n is halved: n, n/2, n/4, ..., n/(2^k). The search terminates when the candidate window shrinks to 1 item: n / (2^k) = 1, meaning 2^k = n, or k = log₂(n).',
              'For an array of 1,000,000 items, linear search takes up to 1,000,000 checks; binary search takes at most 20 checks. For 4,000,000,000 items (the size of a massive global database), binary search takes at most 32 checks.'
            ]
          }
        ],
        summaryTakeaways: [
          'Binary search requires sorted data as a strict precondition.',
          'Each check cuts remaining candidates in half, yielding O(log n) efficiency.',
          'Doubling the dataset size adds only one additional check.'
        ],
        reflectionPrompt: 'If sorting takes O(n log n) time and searching takes O(log n), how many searches must you perform on an unsorted list before it becomes mathematically worth sorting it first?'
      },
      'visual-learning': {
        visualType: 'process-flow',
        headline: 'Array Halving & Decision Tree Dynamics',
        caption: 'Visualizing how a 16-element search window shrinks to a single element in 4 cuts.',
        diagramTitle: 'Visual Binary Halving',
        diagramDescription: 'Observe how the low, mid, and high pointers collapse around the target.',
        components: [
          { id: 'low-ptr', name: 'Low Pointer', role: 'Left boundary of search window', description: 'Advances to mid + 1 when target is greater than S[mid].' },
          { id: 'high-ptr', name: 'High Pointer', role: 'Right boundary of search window', description: 'Retreats to mid - 1 when target is less than S[mid].' },
          { id: 'mid-ptr', name: 'Mid Pivot', role: 'Inspection point', description: 'Calculated as low + (high - low) / 2 to avoid integer overflow.' }
        ],
        processFlow: [
          { step: 1, label: 'Inspect Midpoint', detail: 'Compare target with array midpoint element.', annotation: 'Pass 1: 16 items' },
          { step: 2, label: 'Discard Incompatible Half', detail: 'Adjust low or high pointer past mid.', annotation: 'Pass 2: 8 items' },
          { step: 3, label: 'Direct Match or Narrow to 1', detail: 'Pinpoint target index or return not found.', annotation: 'Pass 3: 4 items' }
        ],
        visualSummary: 'Linear search is a 45-degree slope; binary search is an almost flat curve that barely climbs even when dataset counts reach trillions.'
      },
      'examples-applications': {
        overview: 'Binary search powers database queries, debugging pipelines, and distributed hash rings.',
        workedExamples: [
          {
            id: 'ex-bs-search',
            title: 'Worked Example: Locating Value 42 in a Sorted Array',
            difficulty: 'Foundational',
            contextOrPrompt: 'Search for target = 42 in array [3, 9, 14, 21, 33, 42, 57, 68, 79, 90]',
            steps: [
              { stepNumber: 1, explanation: 'Set low = 0, high = 9. Mid = 4 (value = 33).', work: '33 < 42, so target must lie to the right. Set low = 5.', annotation: 'Left half discarded.' },
              { stepNumber: 2, explanation: 'Set low = 5, high = 9. Mid = 7 (value = 68).', work: '68 > 42, so target must lie to the left. Set high = 6.', annotation: 'Right half discarded.' },
              { stepNumber: 3, explanation: 'Set low = 5, high = 6. Mid = 5 (value = 42).', work: '42 == 42. Match found at index 5!', annotation: 'Search terminates in 3 checks.' }
            ],
            finalResult: 'Target 42 found at index 5 in 3 iterations.',
            verificationTip: 'A linear scan would have taken 6 checks; binary search did it in 3.'
          }
        ],
        applications: [
          {
            domain: 'DevOps & Git Debugging',
            title: 'Automated Root-Cause Isolation with Git Bisect',
            context: 'When a production bug is discovered across 10,000 commits, git bisect binary-searches the commit history in 14 automated test runs.',
            realWorldScenario: 'Testing the halfway commit determines whether the bug was introduced before or after, finding the faulty commit in minutes.',
            impactMetric: 'Reduces debugging time from days to under 15 minutes.'
          }
        ],
        selfCheckExercise: {
          question: 'If a sorted database contains 1,048,576 records, what is the maximum number of comparisons binary search requires to locate any key?',
          hint: 'Calculate log2(1,048,576). Remember that 2^10 = 1024.',
          solution: '1,048,576 is 2^20. Therefore, binary search requires at most 20 comparisons.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Algorithmic Complexity & Halving Sandbox',
        objective: 'Observe how logarithmic halving collapses immense candidate spaces.',
        instructions: 'Test different search spaces to observe how doubling dataset size adds only a single comparison.',
        experimentType: 'generic',
        variables: [
          { id: 'array-size', label: 'Array Size (n)', description: 'Total sorted elements.', min: 10, max: 1000000, step: 10000, defaultValue: 100000, unit: 'items' }
        ],
        guidingQuestions: [
          'Why does increasing array size from 1,000 to 1,000,000 only increase binary search steps from 10 to 20?',
          'What happens if you run binary search on an unsorted array?'
        ],
        whatToObserve: [
          'Notice that doubling the input size adds exactly 1 comparison.',
          'Notice how linear search scales directly with n while binary search barely moves.'
        ],
        takeawayInsight: 'Efficiency in computing is not about running loops faster; it is about algorithmically proving what work never needs to be done at all.'
      }
    }
  },

  // =========================================================================
  // 6. PHYSICS: Newton's Laws of Motion
  // =========================================================================
  {
    id: 'phys-newtons-laws',
    slug: 'newtons-laws-of-motion',
    title: "Newton's Laws of Motion",
    subtitle: 'Inertia, dynamic force acceleration, and universal mutual interaction',
    subjectId: 'physics',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'Isaac Newton’s three laws of motion unified terrestrial and celestial mechanics. They establish that objects maintain constant velocity unless acted upon by a net external force (Inertia), force equals rate of change of momentum (F=ma), and all physical interactions are strictly reciprocal (Action-Reaction).',
    whyItMatters: 'From keeping satellites in orbit to engineering automotive crumple zones and designing high-speed trains, classical dynamics continues to govern mechanical civil engineering worldwide.',
    learningObjectives: [
      'Understand the First Law: uniform motion and static rest are physically identical states of zero net force.',
      'Apply the Second Law: F = ma to calculate acceleration from unbalanced vector forces.',
      'Explain the Third Law: mutual interaction forces act on different bodies and never cancel internally.',
      'Analyze impulse and momentum in collision safety engineering.'
    ],
    coreQuestions: [
      'Why does an object continue moving forever in a vacuum without any ongoing fuel or push?',
      'How does mass serve as the quantitative measure of resistance to acceleration?',
      'Why do action and reaction forces never cancel each other out on the same object?'
    ],
    prerequisites: ['Concepts of distance, velocity, and acceleration', 'Basic vector addition'],
    keyTerms: [
      { term: 'Inertia', definition: 'The fundamental property of mass resisting any alteration in its current velocity vector.' },
      { term: 'Net Force (ΣF)', definition: 'The vector sum of all individual external forces acting upon a body.' },
      { term: 'Conservation of Momentum', definition: 'The physical law that the total momentum of an isolated system remains constant.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Newtonian dynamics revolutionized human understanding of the physical cosmos. Prior to Newton, natural philosophers believed continuous motion required continuous pushing; Newton proved that motion continues effortlessly, and only changes in motion require a force.',
        sections: [
          {
            id: 'first-law',
            title: '1. The First Law: The Law of Inertia',
            subtitle: 'Zero net force implies constant velocity vector',
            paragraphs: [
              'Newton’s First Law states: An object at rest stays at rest, and an object in uniform motion continues at constant velocity in a straight line, unless compelled to change by a net external force.',
              'On Earth, moving objects naturally slow down not because motion decays, but because invisible contact forces (friction and air resistance) continuously oppose movement. In the vacuum of deep space, a satellite cruises for billions of miles with engines powered off.'
            ]
          },
          {
            id: 'second-law',
            title: '2. The Second Law: F = ma',
            subtitle: 'Force as the quantitative driver of momentum change',
            paragraphs: [
              'Newton’s Second Law defines force quantitatively: Net Force equals mass times acceleration (F = ma).',
              'Mass is the scalar inertia coefficient: doubling an object’s mass cuts its acceleration in half for the exact same applied force.'
            ]
          }
        ],
        summaryTakeaways: [
          'Zero net force means constant velocity (whether static at 0 m/s or gliding at 10,000 m/s).',
          'Force causes acceleration (change in speed or direction), not velocity itself.',
          'Action-reaction force pairs act on two separate interacting bodies.'
        ],
        reflectionPrompt: 'When a rocket fires its engines in the vacuum of deep space where there is no air to push against, how does it accelerate forward?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Vector Free-Body Diagrams & Reciprocal Thrust',
        caption: 'Visualizing unbalanced vector forces and action-reaction pairs.',
        diagramTitle: 'Free Body Vector Resolution',
        diagramDescription: 'Inspect how opposing vectors sum to produce net acceleration.',
        components: [
          { id: 'f-thrust', name: 'Thrust Vector (Forward)', role: 'Engine force', description: 'Gaseous exhaust expelled backward produces forward reaction on rocket body.' },
          { id: 'f-drag', name: 'Drag Vector (Backward)', role: 'Frictional resistance', description: 'Atmospheric fluid resistance opposing forward velocity.' },
          { id: 'f-gravity', name: 'Gravitational Vector (Downward)', role: 'Planetary attraction', description: 'Downwards force proportional to object mass and local g.' }
        ],
        visualSummary: 'When opposing vector arrows balance, velocity is invariant. When arrows are unequal, the difference produces acceleration in the direction of the net arrow.'
      },
      'examples-applications': {
        overview: 'Automotive crash safety and spaceflight trajectories are direct applied Newtonian mechanics.',
        workedExamples: [
          {
            id: 'ex-fma',
            title: 'Worked Example: Calculating Braking Force',
            difficulty: 'Foundational',
            contextOrPrompt: 'A 1,200 kg car decelerates from 20 m/s to a full stop (0 m/s) in 4 seconds. Calculate the net braking force.',
            steps: [
              { stepNumber: 1, explanation: 'Calculate acceleration: a = (v_final - v_initial) / t.', work: 'a = (0 - 20) / 4 = -5 m/s²', annotation: 'Negative indicates deceleration.' },
              { stepNumber: 2, explanation: 'Apply Newton’s Second Law: F = m · a.', work: 'F = 1,200 kg × (-5 m/s²) = -6,000 N', annotation: 'Braking force is 6,000 Newtons opposing motion.' }
            ],
            finalResult: 'F = 6,000 Newtons in opposite direction.',
            verificationTip: 'Impulse check: F · t = 6,000 · 4 = 24,000 N·s. Momentum change: m · Δv = 1,200 · 20 = 24,000 kg·m/s. Values match.'
          }
        ],
        applications: [
          {
            domain: 'Automotive Safety Engineering',
            title: 'Crash Crumple Zones',
            context: 'Designing vehicle front ends to deform progressively in a collision.',
            realWorldScenario: 'Extending collision impact time from 0.03s to 0.60s cuts the peak impact force felt by human organs by 20x, turning fatal impacts into survivable events.',
            impactMetric: 'Saved hundreds of thousands of lives worldwide since mandatory adoption.'
          }
        ],
        selfCheckExercise: {
          question: 'If you push against a heavy 500 kg stone wall with 200 N of force and the wall does not move, how much force is the wall exerting back against your hands?',
          hint: 'Newton’s Third Law: For every action, there is an equal and opposite reaction.',
          solution: 'Exactly 200 N. The wall exerts the exact same magnitude force back against your hands in the opposite direction.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Newtonian Force & Acceleration Sandbox',
        objective: 'Vary mass and applied force to observe real-time acceleration and braking trajectories.',
        instructions: 'Adjust the mass of the cart and applied force to verify F = ma.',
        experimentType: 'generic',
        variables: [
          { id: 'mass', label: 'Object Mass (kg)', description: 'Inertia coefficient.', min: 10, max: 2000, step: 50, defaultValue: 500, unit: 'kg' },
          { id: 'force', label: 'Net Applied Force (N)', description: 'Unbalanced external push.', min: -2000, max: 2000, step: 100, defaultValue: 500, unit: 'N' }
        ],
        guidingQuestions: [
          'If you double the mass while keeping force constant, what happens to acceleration?',
          'Why do seatbelts lock during sudden braking even before you consciously react?'
        ],
        whatToObserve: [
          'Notice that acceleration is inversely proportional to mass.',
          'Notice that when net force is zero, velocity remains constant.'
        ],
        takeawayInsight: 'Inertia is not a force; it is the fundamental stubbornness of matter resisting any change to its velocity.'
      }
    }
  },

  // =========================================================================
  // 7. CHEMISTRY: The Periodic Table & Chemical Bonding
  // =========================================================================
  {
    id: 'chem-periodic-table',
    slug: 'periodic-table-and-bonding',
    title: 'The Periodic Table & Chemical Bonding',
    subtitle: 'Valence electron shells, electronegativity, and molecular geometry',
    subjectId: 'chemistry',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    overview: 'The periodic table is nature’s organizational blueprint. By arranging elements according to atomic number and electron shell architecture, periodic trends emerge—explaining why atoms share, steal, or pool electrons to form the molecules of the universe.',
    whyItMatters: 'From pharmacology and drug discovery to lithium-ion batteries and semiconductor chip engineering, mastering electron valence enables the synthesis of novel materials.',
    learningObjectives: [
      'Understand how electron configuration and valence shells dictate chemical reactivity.',
      'Differentiate ionic bonds (electron transfer) from covalent bonds (electron sharing).',
      'Explain how electronegativity differences predict bond polarity and molecular geometry.',
      'Analyze periodic trends: atomic radius, ionization energy, and electron affinity.'
    ],
    coreQuestions: [
      'Why do elements in the same column (group) exhibit nearly identical chemical reactivity?',
      'What dictates whether two atoms form an ionic, covalent, or metallic bond?',
      'How does electronegativity predict molecular polarity and the unique properties of water?'
    ],
    prerequisites: ['Basic atomic structure (protons, neutrons, electrons)', 'Concept of electric charge attract/repel'],
    keyTerms: [
      { term: 'Valence Electrons', definition: 'Electrons located in the outermost shell that participate in chemical bonding.' },
      { term: 'Electronegativity', definition: 'The relative pull an atom exerts on shared bonding electrons.' },
      { term: 'Octet Rule', definition: 'The tendency of atoms to attain a stable noble-gas electron configuration of 8 valence electrons.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'The periodic table is the Rosetta Stone of physical science. Dmitri Mendeleev’s insight was that chemical properties recur periodically when elements are arranged by atomic structure.',
        sections: [
          {
            id: 'chem-valence',
            title: '1. Electron Shell Architecture & The Octet Rule',
            subtitle: 'Why noble gases are inert while alkali metals explode in water',
            paragraphs: [
              'Atoms naturally seek configurations of lowest potential energy. By quantum mechanics, electron shells hold discrete capacities (2, 8, 8, 18).',
              'Noble gases (Group 18) have fully populated valence shells, making them thermodynamically inert. Other elements share, donate, or accept electrons to achieve this stable octet.'
            ]
          },
          {
            id: 'chem-bonding',
            title: '2. The Chemical Bonding Spectrum',
            subtitle: 'Ionic transfer versus covalent sharing',
            paragraphs: [
              'Chemical bonding is a continuous spectrum governed by electronegativity differences (ΔEN).',
              'When ΔEN > 2.0 (like Na and Cl), one atom strips an electron completely, forming oppositely charged ions that bind electrostatically into a crystalline ionic lattice. When ΔEN is small, atoms share electrons in covalent molecular bonds.'
            ]
          }
        ],
        summaryTakeaways: [
          'Column (group) determines the number of valence electrons and chemical reactivity.',
          'Ionic bonds transfer electrons; covalent bonds share electrons.',
          'Electronegativity differences dictate whether a molecule is polar or nonpolar.'
        ],
        reflectionPrompt: 'Why does Carbon form the basis of all complex organic molecules, while Silicon directly beneath it in Group 14 cannot sustain equivalent biochemical complexity in water?'
      },
      'visual-learning': {
        visualType: 'spectrum',
        headline: 'Electronegativity Spectrum & Valence Shell Maps',
        caption: 'Visualizing how bond types transition continuously from nonpolar covalent to polar covalent and ionic lattices.',
        diagramTitle: 'Bond Type Classification Spectrum',
        diagramDescription: 'Explore the transition of electron cloud probability densities across different atom pairs.',
        components: [
          { id: 'nonpolar', name: 'Nonpolar Covalent (ΔEN < 0.4)', role: 'Equal Sharing', description: 'Symmetric electron cloud between identical or similar atoms (e.g., H₂, O₂, C-H).' },
          { id: 'polar', name: 'Polar Covalent (0.4 < ΔEN < 1.8)', role: 'Unequal Sharing', description: 'Electrons pulled toward the more electronegative atom, creating permanent dipoles (e.g., H₂O, HCl).' },
          { id: 'ionic', name: 'Ionic Bond (ΔEN > 2.0)', role: 'Complete Transfer', description: 'Full electron transfer creating cations and anions bound in a crystal lattice (e.g., NaCl).' }
        ],
        visualSummary: 'Looking at an element’s column tells you its bonding hands; looking at its row tells you how many layers of electron insulation buffer its positive nucleus.'
      },
      'examples-applications': {
        overview: 'Chemical bonding principles govern drug receptor binding and advanced battery chemistries.',
        workedExamples: [
          {
            id: 'ex-polar-water',
            title: 'Worked Example: Determining Water’s Molecular Polarity',
            difficulty: 'Intermediate',
            contextOrPrompt: 'Analyze the bonding and geometry of H2O to explain why water is a polar universal solvent.',
            steps: [
              { stepNumber: 1, explanation: 'Find electronegativities: Oxygen = 3.44, Hydrogen = 2.20.', work: 'ΔEN = 3.44 - 2.20 = 1.24', annotation: 'Falls squarely in the polar covalent range.' },
              { stepNumber: 2, explanation: 'Determine VSEPR geometry: Oxygen has 2 bonding pairs and 2 lone pairs.', work: 'Molecular geometry is bent at 104.5 degrees.', annotation: 'Bending prevents dipole cancellation.' },
              { stepNumber: 3, explanation: 'Resulting permanent dipole.', work: 'Net dipole moment pointing toward Oxygen (δ-).', annotation: 'Forms hydrogen bonds with neighboring water molecules.' }
            ],
            finalResult: 'Water is permanently polar, creating high surface tension and dissolving ionic solutes.',
            verificationTip: 'Contrast with CO2: although C=O bonds are polar (ΔEN = 0.89), CO2 is linear, so bond dipoles cancel out symmetrically, making CO2 nonpolar.'
          }
        ],
        applications: [
          {
            domain: 'Battery Chemistries',
            title: 'Lithium-Ion vs. Sodium-Ion Battery Cells',
            context: 'Electric vehicles depend on alkali metals readily surrendering their single valence electron.',
            realWorldScenario: 'Sodium (directly below Lithium) offers similar redox electrochemistry from abundant sea salt, reducing reliance on scarce cobalt and nickel.',
            impactMetric: 'Enables 30% cheaper grid energy storage for solar and wind farms.'
          }
        ],
        selfCheckExercise: {
          question: 'Predict the bond type between Calcium (EN = 1.00) and Chlorine (EN = 3.16).',
          hint: 'Calculate ΔEN = 3.16 - 1.00.',
          solution: 'ΔEN = 2.16. Since ΔEN > 2.0, Calcium transfers electrons to Chlorine, forming an ionic crystal lattice (CaCl2).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Periodic Valence & Electronegativity Sandbox',
        objective: 'Pair elements to calculate electronegativity difference and observe resulting bond characteristics.',
        instructions: 'Select element pairs to test covalent vs ionic properties.',
        experimentType: 'generic',
        variables: [
          { id: 'en-diff', label: 'Electronegativity Difference (ΔEN)', description: 'Controls bond character.', min: 0, max: 3.5, step: 0.1, defaultValue: 1.2, unit: 'ΔEN' }
        ],
        guidingQuestions: [
          'At what exact threshold does a bond transition from polar covalent to predominantly ionic?',
          'Why are noble gases unable to form stable bonds under normal temperature and pressure?'
        ],
        whatToObserve: [
          'Notice how bond polarity increases continuously with ΔEN.',
          'Notice that when ΔEN = 0, electron density is perfectly balanced between nuclei.'
        ],
        takeawayInsight: 'Chemical bonds are not rigid sticks; they are dynamic probability clouds of electrons minimizing electrostatic potential energy.'
      }
    }
  },

  // =========================================================================
  // 8. GEOGRAPHY: Plate Tectonics & Earth Systems
  // =========================================================================
  {
    id: 'geo-plate-tectonics',
    slug: 'plate-tectonics',
    title: 'Plate Tectonics & Earth Systems',
    subtitle: 'Mantle convection currents, lithospheric drift, subduction zones, and planetary recycling',
    subjectId: 'geography',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'The Earth’s outer crust is fractured into rigid lithospheric jigsaw plates that float and grind over the semi-fluid asthenosphere. Driven by deep mantle thermal convection and gravitational slab-pull, plate boundaries give birth to ocean trenches, volcanic arcs, and mountain ranges.',
    whyItMatters: 'Plate tectonics explains why gold veins exist in California, why tsunami early-warning systems are needed in the Pacific Ring of Fire, and how carbon recycling maintains Earth’s habitable climate.',
    learningObjectives: [
      'Understand the mechanical engine of plate motion: mantle thermal convection and slab-pull.',
      'Differentiate the three primary plate boundaries: Divergent, Convergent, and Transform.',
      'Explain how seafloor spreading and paleomagnetic zebra stripes proved continental drift.',
      'Analyze earthquake and volcanic hazards along subduction zones.'
    ],
    coreQuestions: [
      'What mechanical engine pushes immense continental landmasses thousands of kilometers?',
      'How does seafloor spreading record magnetic pole reversals like a giant tape recorder?',
      'What happens when dense oceanic crust collides with buoyant continental granite?'
    ],
    prerequisites: ['Basic planetary layers (crust, mantle, core)', 'Concept of density and buoyant flotation'],
    keyTerms: [
      { term: 'Subduction Zone', definition: 'A boundary where a denser oceanic plate slides beneath a lighter continental plate into the mantle.' },
      { term: 'Mid-Ocean Ridge', definition: 'An underwater mountain range formed by divergent plates where magma wells up to create new oceanic crust.' },
      { term: 'Transform Fault', definition: 'A boundary where plates slide past each other horizontally (e.g., the San Andreas Fault).' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Plate tectonics is the unifying framework of modern earth science. Prior to the mid-20th century, continents were believed to be immovably anchored; plate tectonics proved that Earth’s surface is a dynamic planetary recycling conveyor belt.',
        sections: [
          {
            id: 'geo-convection',
            title: '1. Mantle Convection & Slab Pull',
            subtitle: 'The thermal heat engine driving planetary crust recycling',
            paragraphs: [
              'Earth’s core functions as a nuclear-thermal furnace (~5,000°C). Deep silicate mantle rock under high heat and pressure deforms plastically over millions of years, rising in slow convection plumes.',
              'As newly created basaltic oceanic crust moves away from mid-ocean ridges, it cools and becomes denser than the underlying asthenosphere. At subduction zones, gravity pulls this cold, dense slab downward into the mantle ("slab pull"), providing over 70% of the mechanical force driving plate motion.'
            ]
          },
          {
            id: 'geo-boundaries',
            title: '2. The Three Boundary Archetypes',
            subtitle: 'Divergent, convergent, and transform interactions',
            paragraphs: [
              'Plate boundaries fall into three primary categories:',
              '1. Divergent Boundaries: Plates pull apart (e.g., Mid-Atlantic Ridge, East African Rift). Magma wells up to forge fresh oceanic crust.',
              '2. Convergent Boundaries: Plates collide. Denser oceanic basalt subducts beneath lighter continental granite (forming deep trenches and volcanic mountain arcs), or two buoyant continents crumple upward (forming the Himalayas).',
              '3. Transform Boundaries: Plates grind past each other horizontally (e.g., San Andreas Fault), locking under friction until stress ruptures in major earthquakes.'
            ]
          }
        ],
        summaryTakeaways: [
          'Earth’s crust is divided into rigid lithospheric plates floating on the plastic asthenosphere.',
          'Mantle convection and gravitational slab-pull drive plate motion at 2 to 15 cm per year.',
          'Crust creation at divergent ridges is exactly balanced by crust destruction at subduction trenches.'
        ],
        reflectionPrompt: 'Why is the oldest oceanic crust on Earth only ~200 million years old, while continental cratons are over 3.8 billion years old?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Tectonic Boundaries & The Continental Conveyor',
        caption: 'Visualizing crust recycling across divergent ridges and subduction trenches.',
        diagramTitle: 'Lithospheric Conveyor Belt Architecture',
        diagramDescription: 'Explore the mechanics of crust creation, lateral migration, and mantle subduction.',
        components: [
          { id: 'mid-ridge', name: 'Mid-Ocean Ridge (Divergent)', role: 'Crust Birthplace', description: 'Magma ascends to crystallize into new basaltic seafloor, pushing older crust aside by 2.5 cm/year.' },
          { id: 'subduction-trench', name: 'Deep Sea Trench (Convergent)', role: 'Crust Recycling Abyss', description: 'Cold dense oceanic plate plunges beneath lighter continental plate into the mantle furnace.' },
          { id: 'magma-arc', name: 'Volcanic Arc / Mountain Range', role: 'Dehydration Melting', description: 'Subducting slab releases trapped seawater, lowering mantle melting point to spawn volcanic magma chambers.' }
        ],
        visualSummary: 'Earth maintains constant surface area: every square kilometer of new seafloor born at the Mid-Atlantic Ridge is matched by a square kilometer consumed under the Pacific Rim.'
      },
      'examples-applications': {
        overview: 'Geotechnical engineering and seismic building design rely on plate boundary mechanics.',
        workedExamples: [
          {
            id: 'ex-drift-rate',
            title: 'Worked Example: Calculating Seafloor Spreading Age',
            difficulty: 'Foundational',
            contextOrPrompt: 'The Atlantic Ocean is 4,500 km wide between South America and Africa. If the plates separate at 2.5 cm per year, how long ago did the Atlantic begin to open?',
            steps: [
              { stepNumber: 1, explanation: 'Convert distance from kilometers to centimeters.', work: '4,500 km × 100,000 cm/km = 450,000,000 cm', annotation: '450 million centimeters total distance.' },
              { stepNumber: 2, explanation: 'Divide total distance by annual spreading rate (2.5 cm/year).', work: 'Time = 450,000,000 cm / 2.5 cm/year = 180,000,000 years', annotation: '180 million years.' }
            ],
            finalResult: 'The Atlantic began unzipping approximately 180 million years ago (Late Jurassic).',
            verificationTip: 'Matches marine fossil and paleomagnetic magnetic striping evidence perfectly.'
          }
        ],
        applications: [
          {
            domain: 'Structural Civil Engineering',
            title: 'Seismic Base Isolation in Subduction Zones',
            context: 'Skyscrapers in Tokyo and San Francisco must survive magnitude 8.0+ earthquakes without collapse.',
            realWorldScenario: 'Base isolation bearings decouple the building superstructure from ground shaking, while tuned mass dampers swing in counter-phase to ground waves.',
            impactMetric: 'Tokyo Skytree (634m) survived the massive 2011 Tohoku 9.1 earthquake with zero structural damage.'
          }
        ],
        selfCheckExercise: {
          question: 'What happens when two continental plates of equal density collide (e.g. India colliding into Eurasia)?',
          hint: 'Remember that continental granite is too buoyant to sink into the dense mantle.',
          solution: 'Neither plate can subduct; instead, the continental crust crumples, thickens, and thrusts upward, building massive non-volcanic mountain ranges like the Himalayas.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Tectonic Plate Drift & Spreading Simulator',
        objective: 'Vary spreading rate and duration to observe ocean basin formation and subduction trench dynamics.',
        instructions: 'Adjust plate drift velocities to calculate continental separation over geologic epochs.',
        experimentType: 'generic',
        variables: [
          { id: 'drift-rate', label: 'Spreading Rate (cm/year)', description: 'Rate of divergence at mid-ocean ridge.', min: 1, max: 15, step: 0.5, defaultValue: 3, unit: 'cm/yr' }
        ],
        guidingQuestions: [
          'Why do earthquakes along transform faults tend to be shallow, while subduction zone quakes can be up to 700 km deep?',
          'How did magnetic zebra stripes on the seafloor prove that Earth’s magnetic poles flip periodically?'
        ],
        whatToObserve: [
          'Notice how continents fit together like puzzle pieces before spreading.',
          'Notice that oceanic crust age increases symmetrically as you move away from the central ridge.'
        ],
        takeawayInsight: 'Earth is not a dead rock in space; it is a thermodynamic heat engine whose moving surface continuously renews the planetary habitat.'
      }
    }
  }
,

  // =========================================================================
  // MATHEMATICS: Rational Numbers & Real Properties
  // =========================================================================
  {
  "id": "math-rational-numbers",
  "slug": "rational-numbers",
  "title": "Rational Numbers & Real Properties",
  "subtitle": "Density, fractional representations, and algebraic operations on Q",
  "subjectId": "mathematics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "A rational number is any number expressible as the quotient p/q of two integers, with non-zero denominator. Between any two distinct rational numbers lies an infinite multitude of others.",
  "whyItMatters": "From financial accounting and currency conversion to scientific precision measurements, rational numbers provide the discrete arithmetic backbone of quantitative systems.",
  "learningObjectives": [
    "Represent rational numbers on a continuous number line.",
    "Demonstrate density between any two rational points.",
    "Apply arithmetic operations under closure and commutative laws."
  ],
  "coreQuestions": [
    "Why is division by zero undefined in rational fields?",
    "How does the density property distinguish rational numbers from integers?"
  ],
  "prerequisites": [
    "Integer arithmetic",
    "Basic fractions and decimals"
  ],
  "keyTerms": [
    {
      "term": "Rational Number (Q)",
      "definition": "A number expressible in the form p/q where p, q are integers and q ≠ 0."
    },
    {
      "term": "Density Property",
      "definition": "Between any two distinct rational numbers, there exists at least one other rational number."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Rational numbers expand discrete integers into a continuous continuum of fractional partitions.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Standard Form and Equivalence",
          "subtitle": "Coprime representations and sign conventions",
          "paragraphs": [
            "A rational number p/q is in standard form when q > 0 and gcd(p, q) = 1. Two rational numbers a/b and c/d are equivalent if and only if ad = bc."
          ],
          "bulletPoints": [
            "Closure under addition, subtraction, and multiplication.",
            "Identity element 0 for addition and 1 for multiplication."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Fraction Equivalence Invariant",
            "text": "Multiplying numerator and denominator by non-zero k leaves value invariant: (k·p)/(k·q) = p/q."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Arithmetic Mean Density Principle",
          "subtitle": "Infinite divisibility between any bounds",
          "paragraphs": [
            "Given a < b, their arithmetic mean (a + b)/2 satisfies a < (a + b)/2 < b. Repeating this process yields an infinite sequence of intermediate numbers."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "All integers are rational numbers with denominator 1.",
        "Between any two distinct rationals exist infinitely many others."
      ],
      "reflectionPrompt": "Why cannot √2 be written in the form p/q where p and q are coprime integers?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Rational Number Line and Fractional Partitions",
      "caption": "Visualizing intermediate fractions between integers via recursive subdivisions.",
      "diagramTitle": "Subdivision Geometry of the Real Line",
      "diagramDescription": "Nested intervals showing continuous density between 0 and 1.",
      "components": [
        {
          "id": "c1",
          "name": "Integer Grid",
          "role": "Macro anchors",
          "description": "Major coordinates (0, 1, 2...)"
        },
        {
          "id": "c2",
          "name": "Subdivision Points",
          "role": "Micro rationals",
          "description": "Fractional coordinates (1/4, 1/2, 3/4)"
        }
      ],
      "visualSummary": "Every interval on the number line contains dense rational subdivisions."
    },
    "examples-applications": {
      "overview": "Practical applications in shared partitioning and financial settlements.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Inserting Three Rationals Between 1/3 and 1/2",
          "difficulty": "Foundational",
          "contextOrPrompt": "Find three distinct rational numbers between 1/3 and 1/2.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Find common denominator",
              "work": "1/3 = 8/24 and 1/2 = 12/24."
            },
            {
              "stepNumber": 2,
              "explanation": "Select intermediate numerators",
              "work": "Valid numerators between 8 and 12 are 9, 10, 11."
            }
          ],
          "finalResult": "9/24 (3/8), 10/24 (5/12), and 11/24.",
          "verificationTip": "Multiply numerator and denominator by (n + 1) to find n intermediate points easily."
        }
      ],
      "applications": [
        {
          "domain": "Financial Clearing",
          "title": "Pro-Rata Settlement Accounting",
          "context": "Splitting equity investments across non-integer ownership ratios.",
          "realWorldScenario": "Liquidating a partnership where assets must be divided precisely into 7/19ths and 12/19ths.",
          "impactMetric": "Zero fractional leakage in multi-party fund transfers."
        }
      ],
      "selfCheckExercise": {
        "question": "Is 0.333... a rational number?",
        "hint": "Let x = 0.333... and multiply both sides by 10.",
        "solution": "Yes, 10x - x = 3, so 9x = 3, giving x = 1/3 = p/q."
      }
    },
    "explore-experiment": {
      "activityTitle": "Rational Density Interactive Slider",
      "objective": "Observe continuous insertion of midpoints between two fractions.",
      "instructions": "Adjust the boundary numerators to inspect the generated intermediate rationals.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "left",
          "label": "Left Numerator (over 12)",
          "description": "Starting fraction numerator",
          "min": 1,
          "max": 5,
          "step": 1,
          "defaultValue": 2,
          "unit": "/12"
        },
        {
          "id": "right",
          "label": "Right Numerator (over 12)",
          "description": "Ending fraction numerator",
          "min": 6,
          "max": 11,
          "step": 1,
          "defaultValue": 8,
          "unit": "/12"
        }
      ],
      "guidingQuestions": [
        "What happens to the denominator when taking successive midpoints?"
      ],
      "whatToObserve": [
        "The denominator doubles with each successive bisection."
      ],
      "takeawayInsight": "The density of rationals allows infinite precision within any finite interval."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Pythagorean Theorem & Triangle Similarity
  // =========================================================================
  {
  "id": "math-pythagoras-triangles",
  "slug": "pythagoras-triangles",
  "title": "Pythagorean Theorem & Triangle Similarity",
  "subtitle": "Geometric proof, Euclidean ratios, and right-triangle invariant metrics",
  "subjectId": "mathematics",
  "difficulty": "Foundational",
  "estimatedMinutes": 25,
  "overview": "In any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides. Similar triangles have equal corresponding angles and proportional side lengths.",
  "whyItMatters": "Essential for navigation, GPS triangulation, architectural structural framing, and 3D computer graphics rendering.",
  "learningObjectives": [
    "Prove the Pythagorean Theorem using area dissection and similarity.",
    "Apply AA, SAS, and SSS similarity criteria.",
    "Calculate diagonal distances in Cartesian planes."
  ],
  "coreQuestions": [
    "Why does area equality establish side length relationships?",
    "How does scaling preserve shape but transform area by k²?"
  ],
  "prerequisites": [
    "Triangles and angles",
    "Square roots and exponents"
  ],
  "keyTerms": [
    {
      "term": "Hypotenuse",
      "definition": "The longest side of a right triangle, situated opposite the 90° angle."
    },
    {
      "term": "Similar Triangles",
      "definition": "Triangles having congruent corresponding angles and proportional sides."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The Pythagorean theorem connects length and two-dimensional area through orthogonal geometry.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Area Conservation Proof",
          "subtitle": "The algebraic and spatial equivalence of a² + b² = c²",
          "paragraphs": [
            "Consider a square of side (a + b) containing four right triangles. The interior tilted square has area c². Equating total area (a+b)² = 4(½ab) + c² simplifies directly to a² + b² = c²."
          ],
          "bulletPoints": [
            "In right triangles: c = √(a² + b²).",
            "Pythagorean triples: (3, 4, 5), (5, 12, 13), (8, 15, 17)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Euclid’s Invariant",
            "text": "Orthogonality guarantees that cross-terms cancel when projecting vector displacements."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Criteria for Triangle Similarity",
          "subtitle": "AA, SAS, and SSS similarity postulates",
          "paragraphs": [
            "When two triangles are similar (ΔABC ~ ΔDEF), ratio AB/DE = BC/EF = AC/DF = k. If side lengths scale by k, their areas scale by k²."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "a² + b² = c² applies strictly to right-angled triangles.",
        "Similar triangles scale lengths by k and areas by k²."
      ],
      "reflectionPrompt": "If a triangle has side lengths 6, 8, and 10, how do you verify whether it is right-angled without measuring the angle?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Hypotenuse Area Decomposition",
      "caption": "Visualizing squares constructed on the base, perpendicular, and hypotenuse.",
      "diagramTitle": "Orthogonal Square Area Summation",
      "diagramDescription": "Square on base a plus square on perpendicular b exactly tile square on hypotenuse c.",
      "components": [
        {
          "id": "c1",
          "name": "Base Square (a²)",
          "role": "Base area",
          "description": "Area constructed on horizontal leg."
        },
        {
          "id": "c2",
          "name": "Height Square (b²)",
          "role": "Height area",
          "description": "Area constructed on vertical leg."
        },
        {
          "id": "c3",
          "name": "Hypotenuse Square (c²)",
          "role": "Combined area",
          "description": "Total enclosing diagonal square area."
        }
      ],
      "visualSummary": "Area on hypotenuse equals sum of areas on the remaining two perpendicular sides."
    },
    "examples-applications": {
      "overview": "Civil engineering structural design and aerial flight path triangulation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Guy-Wire Tension Anchor Length",
          "difficulty": "Foundational",
          "contextOrPrompt": "A vertical antenna tower of height 24 m is secured by a guy wire anchored 7 m from its base. Find the wire length.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply Pythagorean theorem",
              "work": "c² = a² + b² = 7² + 24² = 49 + 576 = 625."
            },
            {
              "stepNumber": 2,
              "explanation": "Take square root",
              "work": "c = √625 = 25 m."
            }
          ],
          "finalResult": "The guy wire length is exactly 25 metres.",
          "verificationTip": "Check if numbers form a known triple (7, 24, 25) to solve in one step."
        }
      ],
      "applications": [
        {
          "domain": "Geodesy & Cartography",
          "title": "Global Positioning Distance Measurement",
          "context": "Calculating Euclidean straight-line distance between elevation coordinates.",
          "realWorldScenario": "Deducing direct line-of-sight distance between an aircraft and a runway beacon.",
          "impactMetric": "Sub-centimetre positioning precision in aerial avionics."
        }
      ],
      "selfCheckExercise": {
        "question": "Can a triangle with sides 5 cm, 7 cm, and 9 cm be right-angled?",
        "hint": "Check if 5² + 7² equals 9².",
        "solution": "5² + 7² = 25 + 49 = 74 ≠ 81 (9²). Hence it is not right-angled."
      }
    },
    "explore-experiment": {
      "activityTitle": "Right Triangle Dynamic Dimensioner",
      "objective": "Vary leg lengths and observe real-time recalculation of hypotenuse and area ratio.",
      "instructions": "Slide base and height values to explore how hypotenuse responds.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "base",
          "label": "Base Leg a (m)",
          "description": "Horizontal leg dimension",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 6,
          "unit": "m"
        },
        {
          "id": "height",
          "label": "Height Leg b (m)",
          "description": "Vertical leg dimension",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 8,
          "unit": "m"
        }
      ],
      "guidingQuestions": [
        "Does doubling both legs double the hypotenuse or quadruple it?"
      ],
      "whatToObserve": [
        "Doubling both legs doubles the hypotenuse length and quadruples the area."
      ],
      "takeawayInsight": "Linear dimensions scale proportionally, preserving triangle similarity."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Quadratic Equations & The Discriminant
  // =========================================================================
  {
  "id": "math-quadratic-equations",
  "slug": "quadratic-equations",
  "title": "Quadratic Equations & The Discriminant",
  "subtitle": "Parabolic trajectories, roots of ax² + bx + c = 0, and nature of solutions",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "A quadratic equation is a second-degree polynomial equation. The discriminant D = b² - 4ac determines whether roots are real and distinct, coincident, or non-real.",
  "whyItMatters": "Governs parabolic projectile trajectories, structural arch loads, lens focal geometries, and revenue-optimizing price equilibria.",
  "learningObjectives": [
    "Solve quadratics via factorisation and quadratic formula.",
    "Use the discriminant D to classify root character.",
    "Relate roots α and β to coefficients via Vieta’s formulas."
  ],
  "coreQuestions": [
    "What occurs geometrically when the discriminant equals zero?",
    "Why does completing the square derive the quadratic formula?"
  ],
  "prerequisites": [
    "Linear equations",
    "Algebraic identities (a+b)²",
    "Square roots"
  ],
  "keyTerms": [
    {
      "term": "Quadratic Formula",
      "definition": "Universal formula: x = (-b ± √(b² - 4ac)) / (2a)."
    },
    {
      "term": "Discriminant (D)",
      "definition": "The quantity D = b² - 4ac determining the number of real roots."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Quadratic equations model physical phenomena where rates of change are themselves variable.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Derivation and the Universal Formula",
          "subtitle": "Completing the square on ax² + bx + c = 0",
          "paragraphs": [
            "Divide by a, shift the constant c/a to the right, and add (b/2a)² to complete the square on the left side: (x + b/2a)² = (b² - 4ac)/(4a²). Taking square roots produces x = (-b ± √(b² - 4ac)) / (2a)."
          ],
          "bulletPoints": [
            "Sum of roots: α + β = -b/a.",
            "Product of roots: α · β = c/a."
          ],
          "callout": {
            "type": "axiom",
            "title": "Zero Product Invariant",
            "text": "If (x - α)(x - β) = 0, then x = α or x = β."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Root Analysis via the Discriminant",
          "subtitle": "D > 0, D = 0, and D < 0 geometric interpretations",
          "paragraphs": [
            "When D > 0, the parabola intersects the x-axis twice. When D = 0, the vertex touches the axis tangentially. When D < 0, the parabola never crosses the axis."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "D = b² - 4ac reveals root multiplicity before full computation.",
        "Quadratic curves possess bilateral symmetry about x = -b/(2a)."
      ],
      "reflectionPrompt": "Why cannot a quadratic equation with real coefficients have exactly one non-real root?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Parabolic Curves Relative to the X-Axis",
      "caption": "How discriminant values govern axis intersection points.",
      "diagramTitle": "Discriminant Regimes and Root Crossings",
      "diagramDescription": "Three parabolas showing two roots (D > 0), one touchpoint (D = 0), and floating curve (D < 0).",
      "components": [
        {
          "id": "c1",
          "name": "Parabola D > 0",
          "role": "Secant curve",
          "description": "Crosses axis at two distinct points."
        },
        {
          "id": "c2",
          "name": "Parabola D = 0",
          "role": "Tangent curve",
          "description": "Vertex kisses axis at single point."
        },
        {
          "id": "c3",
          "name": "Parabola D < 0",
          "role": "Disjoint curve",
          "description": "Entire curve lies strictly above or below axis."
        }
      ],
      "visualSummary": "Discriminant sign dictates the topological intersection count with the real axis."
    },
    "examples-applications": {
      "overview": "Physics ballistic flight paths and mechanical spring oscillations.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Cannonball Flight Duration",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A projectile follows height h(t) = -5t² + 30t. When does it hit the ground (h = 0)?",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Set equation to 0 and factor",
              "work": "-5t(t - 6) = 0."
            },
            {
              "stepNumber": 2,
              "explanation": "Solve individual linear factors",
              "work": "t = 0 (launch) or t = 6 s (landing)."
            }
          ],
          "finalResult": "The projectile lands after 6.0 seconds.",
          "verificationTip": "Discard t = 0 as the initial launch epoch when asked for flight duration."
        }
      ],
      "applications": [
        {
          "domain": "Aero-Ballistics",
          "title": "Missile Trajectory Intercepts",
          "context": "Calculating time to apogee and target impact coordinates.",
          "realWorldScenario": "Predicting launch angle and burnout velocity for sounding rockets.",
          "impactMetric": "Milliseconds flight timing accuracy."
        }
      ],
      "selfCheckExercise": {
        "question": "Find the discriminant of 2x² - 4x + 3 = 0. Are its roots real?",
        "hint": "Compute b² - 4ac with a = 2, b = -4, c = 3.",
        "solution": "D = (-4)² - 4(2)(3) = 16 - 24 = -8 < 0. The roots are not real."
      }
    },
    "explore-experiment": {
      "activityTitle": "Parabolic Discriminant Visualizer",
      "objective": "Adjust coefficients to shift the parabola across the x-axis.",
      "instructions": "Slide parameters a, b, and c to observe discriminant recalculation.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "a",
          "label": "Coefficient a",
          "description": "Leading coefficient (curvature)",
          "min": 1,
          "max": 5,
          "step": 1,
          "defaultValue": 1,
          "unit": "units"
        },
        {
          "id": "b",
          "label": "Coefficient b",
          "description": "Linear term (slope at origin)",
          "min": -10,
          "max": 10,
          "step": 1,
          "defaultValue": -4,
          "unit": "units"
        },
        {
          "id": "c",
          "label": "Coefficient c",
          "description": "Constant term (y-intercept)",
          "min": -10,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "What value of c makes the roots coincident for a = 1, b = -4?"
      ],
      "whatToObserve": [
        "When c = 4, D = (-4)² - 4(1)(4) = 0, making the parabola tangent to x = 2."
      ],
      "takeawayInsight": "The discriminant determines root reality and spatial intersection geometry."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Trigonometric Ratios & Height/Distance
  // =========================================================================
  {
  "id": "math-trigonometric-ratios",
  "slug": "trigonometric-ratios",
  "title": "Trigonometric Ratios & Height/Distance",
  "subtitle": "Sine, cosine, tangent invariants, and angular elevation measurement",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Trigonometric ratios express scale-invariant relationships between angles and side ratios in right triangles. Sine, cosine, and tangent allow calculating inaccessible heights and distances.",
  "whyItMatters": "Foundational to astronomical distance measurement, marine navigation, telecommunications antenna alignment, and audio wave modeling.",
  "learningObjectives": [
    "Define sin, cos, tan, cot, sec, cosec in terms of opposite, adjacent, hypotenuse.",
    "Verify standard identities: sin²θ + cos²θ = 1.",
    "Calculate heights of buildings using angles of elevation and depression."
  ],
  "coreQuestions": [
    "Why are trigonometric ratios invariant under triangle scaling?",
    "How does tangent connect vertical rise with horizontal run?"
  ],
  "prerequisites": [
    "Similar triangles",
    "Pythagorean theorem",
    "Angle concepts"
  ],
  "keyTerms": [
    {
      "term": "Sine (sin θ)",
      "definition": "Ratio of opposite side to hypotenuse in a right triangle."
    },
    {
      "term": "Angle of Elevation",
      "definition": "The upward angle between the horizontal line of sight and the observed object."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Trigonometry translates angular orientation into linear distance coordinates.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Foundational Ratios and Definitions",
          "subtitle": "Opposite, adjacent, and hypotenuse quotients",
          "paragraphs": [
            "For acute angle θ in a right triangle: sin θ = opp/hyp, cos θ = adj/hyp, tan θ = opp/adj. Because all right triangles with angle θ are similar, these ratios depend purely on θ, not side length."
          ],
          "bulletPoints": [
            "sin²θ + cos²θ = 1.",
            "1 + tan²θ = sec²θ.",
            "1 + cot²θ = cosec²θ."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Unit Circle Invariant",
            "text": "Coordinates on unit circle: (cos θ, sin θ), directly yielding sin²θ + cos²θ = 1."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Heights and Distances Applications",
          "subtitle": "Angles of elevation and depression",
          "paragraphs": [
            "When observing a tower of height h from ground distance d at elevation angle θ: tan θ = h/d, so h = d · tan θ. If observer eye height is e, total height H = e + d · tan θ."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Trigonometric ratios are scale-invariant properties of angles.",
        "tan θ directly calculates unknown heights from baseline distances."
      ],
      "reflectionPrompt": "Why does tan 90° approach infinity as angle θ approaches 90°?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Right Triangle Angular Ratios",
      "caption": "Mapping opposite, adjacent, and hypotenuse lengths to sin, cos, and tan.",
      "diagramTitle": "Orthogonal Projection and Angular Vectors",
      "diagramDescription": "Ray tilted at angle θ with projected horizontal and vertical component legs.",
      "components": [
        {
          "id": "c1",
          "name": "Hypotenuse (r)",
          "role": "Radius vector",
          "description": "Radial distance from origin."
        },
        {
          "id": "c2",
          "name": "Vertical Leg (y)",
          "role": "Opposite side",
          "description": "y = r · sin θ."
        },
        {
          "id": "c3",
          "name": "Horizontal Leg (x)",
          "role": "Adjacent side",
          "description": "x = r · cos θ."
        }
      ],
      "visualSummary": "Angular orientation determines the proportion of vector length projected on each axis."
    },
    "examples-applications": {
      "overview": "Surveying lighthouses, cell towers, and architectural monuments.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Determining Cliff Height from a Boat",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A surveyor in a boat 100 m from a vertical cliff measures the angle of elevation of the top as 30°. Find cliff height.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Set up tangent equation",
              "work": "tan 30° = h / 100."
            },
            {
              "stepNumber": 2,
              "explanation": "Substitute known exact value",
              "work": "1/√3 = h / 100, so h = 100 / √3 ≈ 57.74 m."
            }
          ],
          "finalResult": "The cliff height is 57.74 metres.",
          "verificationTip": "Memorize exact values for 30°, 45°, and 60°: tan 30° = 1/√3, tan 45° = 1, tan 60° = √3."
        }
      ],
      "applications": [
        {
          "domain": "Geodetic Surveying",
          "title": "Theodolite Topographic Mapping",
          "context": "Surveying mountain peak elevations without climbing the peak.",
          "realWorldScenario": "Triangulating mountain summit altitude from two baseline measuring points.",
          "impactMetric": "Centimetre precision over kilometre baseline sightlines."
        }
      ],
      "selfCheckExercise": {
        "question": "If sin θ = 3/5, what is cos θ for acute angle θ?",
        "hint": "Use identity cos θ = √(1 - sin²θ).",
        "solution": "cos θ = √(1 - 9/25) = √(16/25) = 4/5."
      }
    },
    "explore-experiment": {
      "activityTitle": "Elevation Angle & Height Simulator",
      "objective": "Vary baseline distance and angle of elevation to observe calculated height.",
      "instructions": "Slide distance and angle parameters to see how height responds.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "dist",
          "label": "Baseline Distance d (m)",
          "description": "Horizontal distance from tower",
          "min": 10,
          "max": 200,
          "step": 10,
          "defaultValue": 50,
          "unit": "m"
        },
        {
          "id": "angle",
          "label": "Elevation Angle θ (°)",
          "description": "Angle measured from ground",
          "min": 15,
          "max": 75,
          "step": 5,
          "defaultValue": 45,
          "unit": "°"
        }
      ],
      "guidingQuestions": [
        "At 45° elevation, how does tower height compare to baseline distance?"
      ],
      "whatToObserve": [
        "At 45°, tan 45° = 1, so tower height equals baseline distance exactly."
      ],
      "takeawayInsight": "Trigonometric ratios provide exact geometric scaling across any distance."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Cartesian Coordinate Geometry
  // =========================================================================
  {
  "id": "math-coordinate-geometry",
  "slug": "coordinate-geometry",
  "title": "Cartesian Coordinate Geometry",
  "subtitle": "Distance formula, section formula, midpoints, and collinearity",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Coordinate geometry unifies algebra and geometry by representing points as ordered pairs (x, y) on a Cartesian grid. Distance formula, section formula, and slope formulas allow precise spatial deductions.",
  "whyItMatters": "The universal language of computer graphics, robotics trajectory planning, GIS satellite cartography, and CAD architectural drafting.",
  "learningObjectives": [
    "Compute distance between two Cartesian points via d = √((x₂-x₁)² + (y₂-y₁)²).",
    "Apply section formula to divide line segments in ratio m:n.",
    "Establish collinearity of three points using slopes and area metrics."
  ],
  "coreQuestions": [
    "How is the distance formula an algebraic restatement of Pythagoras?",
    "Why does the section formula use weighted averages of coordinates?"
  ],
  "prerequisites": [
    "Linear equations",
    "Pythagorean theorem",
    "Negative numbers"
  ],
  "keyTerms": [
    {
      "term": "Distance Formula",
      "definition": "d = √((x₂ - x₁)² + (y₂ - y₁)²)."
    },
    {
      "term": "Section Formula",
      "definition": "Point dividing segment in ratio m:n: ((mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n))."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "René Descartes bridged algebra and shape by projecting numerical pairs onto perpendicular spatial axes.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Distance Formula",
          "subtitle": "Metric distance in two-dimensional Euclidean space",
          "paragraphs": [
            "Given points P(x₁, y₁) and Q(x₂, y₂), the horizontal leg is |x₂ - x₁| and vertical leg is |y₂ - y₁|. By Pythagoras, hypotenuse distance d = √((x₂ - x₁)² + (y₂ - y₁)²)."
          ],
          "bulletPoints": [
            "Distance is always non-negative: d ≥ 0.",
            "Midpoint formula: ((x₁+x₂)/2, (y₁+y₂)/2)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Metric Invariance",
            "text": "Distance is invariant under translation or rigid rotation of coordinate axes."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Internal Section Formula",
          "subtitle": "Weighted partitioning of line segments",
          "paragraphs": [
            "A point R(x, y) dividing PQ internally in ratio m:n has coordinates x = (mx₂ + nx₁)/(m + n) and y = (my₂ + ny₁)/(m + n). When m = n = 1, it yields the standard midpoint formula."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Distance formula is the Pythagorean theorem applied to Cartesian coordinates.",
        "Section formula calculates weighted barycentric coordinates."
      ],
      "reflectionPrompt": "How can you prove that three points A, B, C are collinear using the distance formula alone?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Cartesian Grid and Segment Partitioning",
      "caption": "Visualizing distance triangle and weighted division point R between P and Q.",
      "diagramTitle": "Orthogonal Projection and Division Ratio",
      "diagramDescription": "Line segment PQ with horizontal Δx, vertical Δy, and section point R.",
      "components": [
        {
          "id": "c1",
          "name": "Start Point P(x₁, y₁)",
          "role": "Initial node",
          "description": "Segment origin."
        },
        {
          "id": "c2",
          "name": "End Point Q(x₂, y₂)",
          "role": "Terminal node",
          "description": "Segment destination."
        },
        {
          "id": "c3",
          "name": "Section Point R",
          "role": "Partition node",
          "description": "Internal division point dividing PQ in ratio m:n."
        }
      ],
      "visualSummary": "Coordinates provide exact spatial addresses for geometric deduction."
    },
    "examples-applications": {
      "overview": "Drone waypoint navigation and robotics arm path interpolation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Finding the Midpoint and Distance of a Segment",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Find distance and midpoint between A(2, 3) and B(8, 11).",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply distance formula",
              "work": "d = √((8-2)² + (11-3)²) = √(6² + 8²) = √(36 + 64) = √100 = 10."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply midpoint formula",
              "work": "M = ((2+8)/2, (3+11)/2) = (10/2, 14/2) = (5, 7)."
            }
          ],
          "finalResult": "Distance is 10 units; Midpoint is (5, 7).",
          "verificationTip": "Notice the (6, 8, 10) Pythagorean triple in Δx and Δy."
        }
      ],
      "applications": [
        {
          "domain": "Autonomous Logistics",
          "title": "Drone Waypoint Segment Intersect",
          "context": "Calculating battery-recharge rendezvous point at 2:1 distance along a flight path.",
          "realWorldScenario": "Directing delivery drone to rendezvous point R dividing flight route in ratio 2:1.",
          "impactMetric": "Millimetre navigation waypoint accuracy."
        }
      ],
      "selfCheckExercise": {
        "question": "Find the distance from origin (0, 0) to point (5, 12).",
        "hint": "Compute √(5² + 12²).",
        "solution": "d = √(25 + 144) = √169 = 13 units."
      }
    },
    "explore-experiment": {
      "activityTitle": "Cartesian Coordinate Segment Explorer",
      "objective": "Move point coordinates to observe dynamic distance and midpoint computation.",
      "instructions": "Adjust coordinate sliders to observe length and midpoint changes.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "x2",
          "label": "Coordinate x₂",
          "description": "X-coordinate of point B",
          "min": -10,
          "max": 10,
          "step": 1,
          "defaultValue": 6,
          "unit": "units"
        },
        {
          "id": "y2",
          "label": "Coordinate y₂",
          "description": "Y-coordinate of point B",
          "min": -10,
          "max": 10,
          "step": 1,
          "defaultValue": 8,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "If point B is placed at (-6, -8), what is the distance from (0,0)?"
      ],
      "whatToObserve": [
        "Distance remains 10 units because squaring negatives yields positive values."
      ],
      "takeawayInsight": "Distance in Cartesian space is independent of coordinate signs."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Surface Areas & Volumes of Solids
  // =========================================================================
  {
  "id": "math-mensuration-surface-volumes",
  "slug": "mensuration-surface-volumes",
  "title": "Surface Areas & Volumes of Solids",
  "subtitle": "Cylinders, cones, spheres, and composite solid geometry",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Solid mensuration computes the surface boundaries and three-dimensional capacities of geometric solids: cylinders, cones, spheres, and hemispheres, including industrial combination forms.",
  "whyItMatters": "Crucial for civil concrete estimation, manufacturing container capacities, chemical storage tanks, and aerodynamic fairing design.",
  "learningObjectives": [
    "Compute total and curved surface areas for cylinder, cone, and sphere.",
    "Calculate volumetric capacities for solids and composite assemblies.",
    "Model melting and recasting conversions with volume conservation."
  ],
  "coreQuestions": [
    "Why does a sphere have the minimum surface area for a given volume?",
    "How does slant height differ from vertical height in cones?"
  ],
  "prerequisites": [
    "Circle circumference and area (2πr, πr²)",
    "Basic geometric units"
  ],
  "keyTerms": [
    {
      "term": "Curved Surface Area (CSA)",
      "definition": "The area of the curved boundary surface excluding flat circular bases."
    },
    {
      "term": "Volume Conservation",
      "definition": "When a solid is melted and recast into another shape, its total volume remains invariant."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Mensuration extends two-dimensional plane geometry into three-dimensional enclosed space.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Standard Solid Formulas",
          "subtitle": "Cylinder, cone, and sphere geometry",
          "paragraphs": [
            "Cylinder: CSA = 2πrh, Volume = πr²h. Cone: CSA = πrl where slant height l = √(r² + h²), Volume = ⅓πr²h. Sphere: Surface Area = 4πr², Volume = 4/3πr³."
          ],
          "bulletPoints": [
            "Cone volume is exactly ⅓ the volume of a cylinder with identical base and height.",
            "Hemisphere: CSA = 2πr², TSA = 3πr², Volume = ⅔πr³."
          ],
          "callout": {
            "type": "axiom",
            "title": "Archimedes’ Discovery",
            "text": "A sphere occupies exactly ⅔ the volume and ⅔ the surface area of its circumscribing cylinder."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Melting and Recasting Invariants",
          "subtitle": "Conservation of volume during phase change",
          "paragraphs": [
            "When a solid metallic sphere of radius R is melted to form n smaller identical spheres of radius r, total volume is conserved: 4/3πR³ = n · (4/3πr³), simplifying directly to n = (R/r)³."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Curved surface area excludes planar circular bases; total surface area includes them.",
        "Recasting preserves total volume, allowing direct algebraic equating."
      ],
      "reflectionPrompt": "If radius of a sphere is doubled, by what factor does its surface area increase, and by what factor does its volume increase?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Solid Geometry Dissections",
      "caption": "Unrolling curved surface of cylinder into a rectangle and cone into a circular sector.",
      "diagramTitle": "Unfolded Net Geometries",
      "diagramDescription": "Unrolled cylinder shows 2πr width and h height; cone unrolls into sector of radius l.",
      "components": [
        {
          "id": "c1",
          "name": "Cylinder Net",
          "role": "Unrolled rectangle",
          "description": "Rectangle of dimensions 2πr by h."
        },
        {
          "id": "c2",
          "name": "Circular Bases",
          "role": "End caps",
          "description": "Two identical circular discs each of area πr²."
        },
        {
          "id": "c3",
          "name": "Cone Sector",
          "role": "Curved net",
          "description": "Sector of radius l with arc length 2πr."
        }
      ],
      "visualSummary": "Three-dimensional curved surfaces unfold into planar geometric figures."
    },
    "examples-applications": {
      "overview": "Packaging container design and industrial silo manufacturing.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Capacity and Sheet Metal of a Grain Silo",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A silo consists of a cylinder of radius 3 m and height 7 m, topped by a cone of height 4 m. Find total volume.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate cylinder volume",
              "work": "V_cyl = πr²h = π(3²)(7) = 63π m³."
            },
            {
              "stepNumber": 2,
              "explanation": "Calculate cone volume",
              "work": "V_cone = ⅓πr²h_cone = ⅓π(3²)(4) = 12π m³."
            },
            {
              "stepNumber": 3,
              "explanation": "Sum total volume",
              "work": "V_total = 63π + 12π = 75π ≈ 235.6 m³."
            }
          ],
          "finalResult": "Total storage capacity is 75π m³ (approx 235.6 m³).",
          "verificationTip": "Factor out common terms (πr²) when summing composite volumes to simplify arithmetic."
        }
      ],
      "applications": [
        {
          "domain": "Chemical Engineering",
          "title": "Industrial Pressure Vessel Sizing",
          "context": "Designing cylindrical storage tanks with hemispherical end caps to resist internal pressure.",
          "realWorldScenario": "Optimizing metal plate thickness and volume capacity for liquified petroleum gas.",
          "impactMetric": "Cubic metre capacity per kilogram of alloy shell weight."
        }
      ],
      "selfCheckExercise": {
        "question": "How many small spheres of radius 1 cm can be formed by melting a sphere of radius 4 cm?",
        "hint": "Use ratio n = (R/r)³.",
        "solution": "n = (4/1)³ = 64 small spheres."
      }
    },
    "explore-experiment": {
      "activityTitle": "Solid Dimension & Capacity Simulator",
      "objective": "Vary cylinder radius and height to explore how volume and surface area scale.",
      "instructions": "Slide radius and height to watch volumetric capacity and surface area diverge.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "r",
          "label": "Radius r (m)",
          "description": "Base radius of cylinder",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "m"
        },
        {
          "id": "h",
          "label": "Height h (m)",
          "description": "Height of cylinder",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 7,
          "unit": "m"
        }
      ],
      "guidingQuestions": [
        "Does doubling radius have a larger impact on volume than doubling height?"
      ],
      "whatToObserve": [
        "Volume scales with r² but only linearly with h; doubling radius quadruples volume."
      ],
      "takeawayInsight": "Radial dimensions exert quadratic influence on volumetric capacities."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Probability & Event Spaces
  // =========================================================================
  {
  "id": "math-probability-foundations",
  "slug": "probability-foundations",
  "title": "Probability & Event Spaces",
  "subtitle": "Sample spaces, theoretical probability, complementary events, and odds",
  "subjectId": "mathematics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Probability quantifies the likelihood of occurrence of random events. The classical probability P(E) = n(E)/n(S) measures the ratio of favorable outcomes to the total equally likely outcomes in sample space S.",
  "whyItMatters": "The foundation of insurance actuarial science, medical clinical trial evaluations, weather forecasting, financial portfolio risk, and quantum mechanics.",
  "learningObjectives": [
    "Define sample spaces and equally likely outcomes.",
    "Compute probability P(E) = n(E)/n(S) where 0 ≤ P(E) ≤ 1.",
    "Apply the complementary event rule: P(not E) = 1 - P(E)."
  ],
  "coreQuestions": [
    "Why must probability values always lie strictly between 0 and 1?",
    "What distinguishes theoretical probability from empirical experimental frequency?"
  ],
  "prerequisites": [
    "Fractions and percentages",
    "Basic counting principles"
  ],
  "keyTerms": [
    {
      "term": "Sample Space (S)",
      "definition": "The set of all possible distinct outcomes of a random experiment."
    },
    {
      "term": "Complementary Event (E')",
      "definition": "The event that E does not occur, with P(E') = 1 - P(E)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Probability models uncertainty with mathematical rigor by mapping likelihood onto the unit interval [0, 1].",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Classical Definition of Probability",
          "subtitle": "Equally likely outcomes and the sample space ratio",
          "paragraphs": [
            "For a random experiment with finite sample space S of equally likely outcomes, the probability of event E is P(E) = n(E) / n(S). Impossible events have P(∅) = 0; certain events have P(S) = 1."
          ],
          "bulletPoints": [
            "0 ≤ P(E) ≤ 1 for every event E.",
            "Sum of probabilities of all elementary events equals 1."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Normalization Invariant",
            "text": "The total probability mass over the entire sample space is strictly conserved at 1.0."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Complementary Events",
          "subtitle": "The power of calculating 1 - P(not E)",
          "paragraphs": [
            "For any event E, exactly one of E or E' must occur. Therefore P(E) + P(E') = 1. Often calculating the probability that an event does NOT occur is substantially simpler than summing all favorable configurations."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "All probabilities satisfy 0 ≤ P(E) ≤ 1.",
        "Complementary event formula P(E) = 1 - P(E') simplifies complex multi-outcome problems."
      ],
      "reflectionPrompt": "Why does flipping a fair coin 10 times with 10 consecutive heads still yield a 50% probability of heads on the 11th flip?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Sample Space and Event Subsets",
      "caption": "Venn diagram representation of favorable event E within sample space S.",
      "diagramTitle": "Venn Diagram of Probability Spaces",
      "diagramDescription": "Universal rectangle representing sample space S with circular subset representing event E.",
      "components": [
        {
          "id": "c1",
          "name": "Sample Space S",
          "role": "Total outcomes",
          "description": "Universal set of all possible outcomes with total probability 1."
        },
        {
          "id": "c2",
          "name": "Event E",
          "role": "Favorable outcomes",
          "description": "Subset containing favorable outcomes with probability n(E)/n(S)."
        },
        {
          "id": "c3",
          "name": "Complement E'",
          "role": "Unfavorable outcomes",
          "description": "Exterior region satisfying P(E') = 1 - P(E)."
        }
      ],
      "visualSummary": "Event probability represents the area fraction of subset E relative to universal space S."
    },
    "examples-applications": {
      "overview": "Quality assurance batch sampling and insurance risk pricing.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Drawing Cards from a Well-Shuffled Deck",
          "difficulty": "Foundational",
          "contextOrPrompt": "A card is drawn from a standard deck of 52 playing cards. Find the probability of drawing a face card (Jack, Queen, King).",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Count total outcomes",
              "work": "n(S) = 52."
            },
            {
              "stepNumber": 2,
              "explanation": "Count favorable outcomes",
              "work": "Each of 4 suits has 3 face cards: n(E) = 4 × 3 = 12."
            },
            {
              "stepNumber": 3,
              "explanation": "Compute ratio",
              "work": "P(E) = 12 / 52 = 3 / 13 ≈ 0.2308."
            }
          ],
          "finalResult": "Probability of drawing a face card is 3/13 (approx 23.1%).",
          "verificationTip": "Simplify fractions to lowest terms to avoid calculation errors."
        }
      ],
      "applications": [
        {
          "domain": "Actuarial Science",
          "title": "Underwriting Life and Property Risk",
          "context": "Calculating insurance policy premiums based on mortality and hazard probability tables.",
          "realWorldScenario": "Estimating probability of lightning strike damage across commercial warehouse roofs.",
          "impactMetric": "Actuarial solvency margin within 99.9% statistical confidence."
        }
      ],
      "selfCheckExercise": {
        "question": "Two fair dice are thrown simultaneously. What is the probability of rolling a sum of 7?",
        "hint": "n(S) = 36. List pairs summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).",
        "solution": "Favorable pairs = 6. P(Sum = 7) = 6/36 = 1/6."
      }
    },
    "explore-experiment": {
      "activityTitle": "Empirical vs Theoretical Probability Simulator",
      "objective": "Simulate repeated coin tosses and observe convergence to theoretical 0.5 probability.",
      "instructions": "Increase the trial count to observe the Law of Large Numbers in action.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "trials",
          "label": "Trial Count (n)",
          "description": "Number of simulated trials",
          "min": 10,
          "max": 10000,
          "step": 100,
          "defaultValue": 100,
          "unit": "tosses"
        }
      ],
      "guidingQuestions": [
        "How does the experimental frequency behave as trials n increases from 10 to 10,000?"
      ],
      "whatToObserve": [
        "At low n, fluctuations are wide; as n exceeds 1,000, frequency converges tightly to 0.500."
      ],
      "takeawayInsight": "Empirical frequency converges asymptotically to theoretical probability as sample size grows."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Statistics & Measures of Central Tendency
  // =========================================================================
  {
  "id": "math-statistics-measures",
  "slug": "statistics-measures",
  "title": "Statistics & Measures of Central Tendency",
  "subtitle": "Mean, median, mode, ogives, and grouped frequency distributions",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Statistics synthesizes raw empirical data into actionable metrics. Mean (arithmetic average), median (middle rank), and mode (most frequent value) characterize central tendency in grouped and ungrouped distributions.",
  "whyItMatters": "Essential for economic policymaking, clinical trial outcomes, algorithmic recommendation engines, and industrial quality management.",
  "learningObjectives": [
    "Calculate mean for grouped data via Direct and Assumed Mean / Step-Deviation methods.",
    "Determine median graphically using cumulative frequency curves (ogives).",
    "Identify modal class and compute empirical mode via grouped formulas."
  ],
  "coreQuestions": [
    "Why is the median more resilient to extreme outlier values than the mean?",
    "How does an ogive locate quartiles geometrically?"
  ],
  "prerequisites": [
    "Frequency tables",
    "Arithmetic averages",
    "Cartesian graphing"
  ],
  "keyTerms": [
    {
      "term": "Step-Deviation Method",
      "definition": "Mean calculation technique using u_i = (x_i - a)/h to minimize arithmetic scale."
    },
    {
      "term": "Ogive",
      "definition": "A cumulative frequency graph used to locate medians and quartiles graphically."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Statistics distills large multivariate datasets into representative central values and dispersion profiles.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Grouped Mean Computation",
          "subtitle": "Direct, Assumed Mean, and Step-Deviation methods",
          "paragraphs": [
            "For grouped data with class marks x_i and frequencies f_i, direct mean x̄ = (∑f_i·x_i) / (∑f_i). Under step-deviation with assumed mean a and class width h: x̄ = a + h · [(∑f_i·u_i) / (∑f_i)], where u_i = (x_i - a)/h."
          ],
          "bulletPoints": [
            "Mean balances total numerical deviation: ∑f_i(x_i - x̄) = 0.",
            "Mode formula: L + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] · h."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Outlier Sensitivity Axiom",
            "text": "The arithmetic mean incorporates every data point and shifts under outliers; the median is order-based and robust."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Median via Cumulative Frequency",
          "subtitle": "Using N/2 on the Ogive",
          "paragraphs": [
            "The median partitions the sorted population exactly in half. For grouped data: Median = L + [((N/2) - cf) / f] · h, where L is lower boundary of median class, cf is preceding cumulative frequency, and f is median class frequency."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Step-deviation streamlines grouped mean computation without altering results.",
        "Median splits population into two equal halves; mode identifies peak concentration."
      ],
      "reflectionPrompt": "In a nation with extreme income inequality, why do economists report median household income rather than mean household income?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Cumulative Frequency Curve (Ogive)",
      "caption": "Locating the median at cumulative frequency N/2 on an S-shaped ogive.",
      "diagramTitle": "Less-than Ogive with Median Projection",
      "diagramDescription": "Sigmoid curve rising to total frequency N with horizontal dashed line at N/2 projecting down to median value.",
      "components": [
        {
          "id": "c1",
          "name": "Cumulative Frequency Axis",
          "role": "Vertical count",
          "description": "Cumulative frequency scale from 0 to N."
        },
        {
          "id": "c2",
          "name": "N/2 Midpoint Line",
          "role": "50th percentile rank",
          "description": "Horizontal projection at half of total observations."
        },
        {
          "id": "c3",
          "name": "Median Coordinate",
          "role": "Horizontal intersection",
          "description": "Projected value on x-axis representing median."
        }
      ],
      "visualSummary": "The intersection of N/2 with the cumulative ogive identifies the exact median score."
    },
    "examples-applications": {
      "overview": "Public census demographic reporting and customer satisfaction metrics.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Mean Test Score via Assumed Mean",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Given class marks x_i = [15, 25, 35, 45] with frequencies f_i = [2, 3, 4, 1], find mean using assumed mean a = 35.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Compute deviations d_i = x_i - 35",
              "work": "d_i = [-20, -10, 0, 10]."
            },
            {
              "stepNumber": 2,
              "explanation": "Calculate ∑f_i·d_i",
              "work": "2(-20) + 3(-10) + 4(0) + 1(10) = -40 - 30 + 0 + 10 = -60."
            },
            {
              "stepNumber": 3,
              "explanation": "Apply formula with N = 10",
              "work": "x̄ = a + (∑f_i·d_i)/N = 35 + (-60)/10 = 35 - 6 = 29."
            }
          ],
          "finalResult": "Mean test score is 29.",
          "verificationTip": "Choosing assumed mean near central frequency simplifies arithmetic products to near zero."
        }
      ],
      "applications": [
        {
          "domain": "Epidemiology",
          "title": "Incubation Period Statistics",
          "context": "Analyzing patient viral incubation periods during public health epidemiological outbreaks.",
          "realWorldScenario": "Reporting median incubation duration to determine appropriate mandatory quarantine timelines.",
          "impactMetric": "Ninety-five percent confidence interval around median outbreak recovery epoch."
        }
      ],
      "selfCheckExercise": {
        "question": "If a distribution has mean 30 and median 28, estimate mode using empirical formula Mode ≈ 3·Median - 2·Mean.",
        "hint": "Mode ≈ 3(28) - 2(30).",
        "solution": "Mode ≈ 84 - 60 = 24."
      }
    },
    "explore-experiment": {
      "activityTitle": "Central Tendency & Outlier Sandbox",
      "objective": "Add extreme outlier values to a dataset and observe differential drift between mean and median.",
      "instructions": "Slide the outlier value to observe how mean pulls away while median remains pinned.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "outlier",
          "label": "Outlier Value",
          "description": "Single extreme data point added to dataset [10, 12, 14, 15, 16]",
          "min": 16,
          "max": 200,
          "step": 10,
          "defaultValue": 20,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "Does the median change when the outlier shifts from 20 to 200?"
      ],
      "whatToObserve": [
        "The median remains invariant at 14.5; the mean escalates continuously from 14.5 to 44.5."
      ],
      "takeawayInsight": "Median measures rank order and resists outliers; mean balances total magnitude."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Arithmetic Progressions & Series
  // =========================================================================
  {
  "id": "math-arithmetic-progressions",
  "slug": "arithmetic-progressions",
  "title": "Arithmetic Progressions & Series",
  "subtitle": "Common difference, nth term formula, and Gaussian summation S_n",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "An arithmetic progression (AP) is a sequence of numbers in which the difference between consecutive terms is constant. The nth term a_n = a + (n-1)d and sum S_n = n/2 · [2a + (n-1)d] govern uniform growth.",
  "whyItMatters": "Foundational for uniform depreciation schedules, loan amortisation, clock pulse intervals, and laddered financial savings plans.",
  "learningObjectives": [
    "Identify first term a and common difference d in numerical sequences.",
    "Calculate any arbitrary term using a_n = a + (n-1)d.",
    "Derive and apply the sum formula S_n = n/2 · (first + last)."
  ],
  "coreQuestions": [
    "How does Carl Friedrich Gauss’s childhood proof derive the AP sum formula?",
    "What determines whether an AP is increasing, decreasing, or constant?"
  ],
  "prerequisites": [
    "Linear equations",
    "Pattern recognition",
    "Basic algebra"
  ],
  "keyTerms": [
    {
      "term": "Common Difference (d)",
      "definition": "The constant value added to each term to produce the succeeding term: d = a_(k+1) - a_k."
    },
    {
      "term": "Arithmetic Mean (A)",
      "definition": "For three numbers a, A, b in AP: A = (a + b)/2."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Arithmetic progressions model discrete uniform linear change where each step advances by constant difference d.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The General Term Formulation",
          "subtitle": "Deducing a_n = a + (n - 1)d",
          "paragraphs": [
            "A sequence a₁, a₂, a₃ ... is an AP if a_(k+1) - a_k = d for all positive integers k. The terms expand as: a, a+d, a+2d, a+3d ... Observe that the kth term adds (k - 1) increments of d. Hence a_n = a + (n - 1)d."
          ],
          "bulletPoints": [
            "If d > 0, AP increases monotonically.",
            "If d < 0, AP decreases monotonically.",
            "If d = 0, AP is a constant sequence."
          ],
          "callout": {
            "type": "axiom",
            "title": "Linearity of Discrete Sequences",
            "text": "The nth term a_n is a linear function of n with slope equal to common difference d."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Sum of First n Terms (Gauss’s Pairing)",
          "subtitle": "Symmetric pairing yields n/2 · (a + l)",
          "paragraphs": [
            "Writing the sum forwards S = a + (a+d) + ... + l and backwards S = l + (l-d) + ... + a and adding the two equations yields 2S = n(a + l). Dividing by 2 gives S_n = n/2 · [2a + (n - 1)d]."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "a_n = a + (n - 1)d gives any term directly without iterative calculation.",
        "Sum of AP pairs first and last terms symmetrically: S_n = n/2 · (a + l)."
      ],
      "reflectionPrompt": "How can you find the sum of all odd integers between 1 and 99 in less than ten seconds?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Stepped Staircase of Arithmetic Progressions",
      "caption": "Visualizing terms as uniform vertical bar columns advancing by common difference d.",
      "diagramTitle": "Step-Staircase Sequence Geometry",
      "diagramDescription": "Bar chart where each column height increases by constant step d, paired into a rectangle of height (a + l).",
      "components": [
        {
          "id": "c1",
          "name": "First Term Bar (a)",
          "role": "Base height",
          "description": "Starting elevation of sequence at n = 1."
        },
        {
          "id": "c2",
          "name": "Common Step (d)",
          "role": "Uniform increment",
          "description": "Constant height added at each successive step."
        },
        {
          "id": "c3",
          "name": "Complementary Inversion",
          "role": "Gauss pairing",
          "description": "Inverted identical staircase completing an n by (a+l) rectangle."
        }
      ],
      "visualSummary": "Pairing two identical AP staircases creates a rectangle of dimensions n by (first + last)."
    },
    "examples-applications": {
      "overview": "Financial recurring deposits and seating layout capacity estimation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Auditorium Seating Capacity",
          "difficulty": "Intermediate",
          "contextOrPrompt": "An auditorium has 20 rows of seats. The first row has 25 seats, and each successive row has 2 more seats than the previous. Find total seats.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify AP parameters",
              "work": "a = 25, d = 2, n = 20."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply sum formula S_n = n/2 · [2a + (n-1)d]",
              "work": "S₂₀ = 20/2 · [2(25) + (19)(2)] = 10 · [50 + 38] = 10 · 88 = 880."
            }
          ],
          "finalResult": "The auditorium contains exactly 880 seats.",
          "verificationTip": "Double check whether the problem asks for the nth term (last row) or the sum (all rows)."
        }
      ],
      "applications": [
        {
          "domain": "Finance & Banking",
          "title": "Laddered Savings Accumulation",
          "context": "Calculating accumulated savings when a student deposits $10 in week 1, increasing deposit by $5 each week.",
          "realWorldScenario": "Predicting total savings balance at end of 52 weeks.",
          "impactMetric": "Zero variance forecasting of matured principal savings."
        }
      ],
      "selfCheckExercise": {
        "question": "Find the 10th term of the AP: 3, 7, 11, 15...",
        "hint": "a = 3, d = 4, n = 10. Use a_n = a + (n-1)d.",
        "solution": "a₁₀ = 3 + 9(4) = 3 + 36 = 39."
      }
    },
    "explore-experiment": {
      "activityTitle": "Arithmetic Sequence & Series Builder",
      "objective": "Vary first term a and common difference d to watch sequence terms and series sum grow.",
      "instructions": "Slide parameters to observe term values and total accumulated sum.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "a",
          "label": "First Term a",
          "description": "Initial sequence value",
          "min": -10,
          "max": 20,
          "step": 1,
          "defaultValue": 5,
          "unit": "units"
        },
        {
          "id": "d",
          "label": "Common Difference d",
          "description": "Step size between consecutive terms",
          "min": -5,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "units"
        },
        {
          "id": "n",
          "label": "Number of Terms n",
          "description": "Total terms in sequence",
          "min": 3,
          "max": 30,
          "step": 1,
          "defaultValue": 10,
          "unit": "terms"
        }
      ],
      "guidingQuestions": [
        "If d is negative, what happens to the sum as n becomes very large?"
      ],
      "whatToObserve": [
        "The sum initially increases while terms are positive, reaches a maximum, then plunges into negative values."
      ],
      "takeawayInsight": "The sum of an AP quadratic in n reflects cumulative linear accumulation."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Circle Geometry: Chords & Tangents
  // =========================================================================
  {
  "id": "math-circles-theorems",
  "slug": "circles-theorems",
  "title": "Circle Geometry: Chords & Tangents",
  "subtitle": "Tangent perpendicularity, equal tangents from external points, and cyclic quadrilaterals",
  "subjectId": "mathematics",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Circle theorems formulate exact angular and linear relationships between radii, chords, tangents, and subtended arcs. A tangent is perpendicular to the radius at contact, and tangents from an external point are equal.",
  "whyItMatters": "Critical for precision gear mesh engineering, railway track transition curves, optics lens curvature, and orbital satellite horizons.",
  "learningObjectives": [
    "Prove that the tangent at any point on a circle is perpendicular to the radius.",
    "Prove that lengths of tangents drawn from an external point are equal.",
    "Apply the theorem: angle subtended by an arc at the centre is double the angle subtended at the circumference."
  ],
  "coreQuestions": [
    "Why does a tangent intersect a circle at exactly one unique point?",
    "How does the perpendicular radius guarantee shortest distance to the tangent?"
  ],
  "prerequisites": [
    "Triangles congruence (RHS, SSS)",
    "Circle circumference and radius"
  ],
  "keyTerms": [
    {
      "term": "Tangent",
      "definition": "A straight line touching a circle at exactly one point of contact."
    },
    {
      "term": "Secant",
      "definition": "A straight line intersecting a circle at two distinct points."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "A circle is the locus of all points equidistant from a centre, generating pure rotational symmetry.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Tangent-Radius Orthogonality Theorem",
          "subtitle": "Proof by shortest distance property",
          "paragraphs": [
            "Let line l be tangent to circle C(O, r) at point P. For any other point Q on l, Q lies strictly outside the circle, so OQ > OP = r. Since OP is the shortest distance from centre O to line l, OP must be perpendicular to l."
          ],
          "bulletPoints": [
            "Radius ⊥ Tangent at point of contact.",
            "Exactly one tangent can be drawn through any point on the circumference."
          ],
          "callout": {
            "type": "axiom",
            "title": "Orthogonality Invariant",
            "text": "The tangent vector is always perpendicular to the radial position vector at contact."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Tangents from an External Point",
          "subtitle": "Congruence of right triangles ΔOPA and ΔOPB",
          "paragraphs": [
            "From external point P, draw tangents PA and PB touching the circle at A and B. In right triangles ΔOPA and ΔOPB, hypotenuse OP is common and radii OA = OB = r. By RHS congruence, ΔOPA ≅ ΔOPB, which proves PA = PB."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Tangents from an external point to a circle are equal in length.",
        "The line joining external point to centre bisects the angle between tangents."
      ],
      "reflectionPrompt": "Why can zero real tangents be drawn to a circle from a point situated inside the circle?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The External Point Tangent Kite",
      "caption": "Congruent right triangles formed by radius vectors and tangent segments.",
      "diagramTitle": "Geometry of Tangents from External Point P",
      "diagramDescription": "Kite OAPB formed by two equal radii and two equal tangent segments meeting at external point P.",
      "components": [
        {
          "id": "c1",
          "name": "Centre O & Radii",
          "role": "Circle anchors",
          "description": "Radii OA and OB perpendicular to tangents."
        },
        {
          "id": "c2",
          "name": "Tangent Segments PA & PB",
          "role": "Equal tangents",
          "description": "Equal segments PA = PB touching circle at A and B."
        },
        {
          "id": "c3",
          "name": "Central Secant OP",
          "role": "Axis of symmetry",
          "description": "Line bisecting angle APB and angle AOB."
        }
      ],
      "visualSummary": "External tangents and radii form a cyclic kite with perpendicular right angles at contact points."
    },
    "examples-applications": {
      "overview": "Pulley belt transmissions and satellite line-of-sight horizon calculation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Tangent Length from Horizon",
          "difficulty": "Advanced",
          "contextOrPrompt": "A point P is 13 cm away from the centre O of a circle of radius 5 cm. Find the length of the tangent PT drawn from P.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply tangent-radius orthogonality",
              "work": "∠OTP = 90°, so ΔOTP is a right triangle with hypotenuse OP = 13 cm and leg OT = 5 cm."
            },
            {
              "stepNumber": 2,
              "explanation": "Use Pythagorean theorem",
              "work": "PT = √(OP² - OT²) = √(13² - 5²) = √(169 - 25) = √144 = 12 cm."
            }
          ],
          "finalResult": "Tangent length PT is exactly 12 cm.",
          "verificationTip": "Remember that the line segment from the centre to the external point is always the hypotenuse."
        }
      ],
      "applications": [
        {
          "domain": "Orbital Mechanics",
          "title": "Geostationary Satellite Horizon Footprint",
          "context": "Calculating the line-of-sight surface tangent coverage from a weather satellite.",
          "realWorldScenario": "Deducing the maximum terrestrial surface circle visible from satellite altitude.",
          "impactMetric": "Line-of-sight communications coverage radius in kilometres."
        }
      ],
      "selfCheckExercise": {
        "question": "If two tangents inclined at an angle of 60° are drawn to a circle of radius 3 cm, what is the length of each tangent?",
        "hint": "The line from centre bisects the 60° angle into 30°. Use tan 30° = r / tangent.",
        "solution": "tan 30° = 3 / PT => 1/√3 = 3 / PT => PT = 3√3 cm ≈ 5.196 cm."
      }
    },
    "explore-experiment": {
      "activityTitle": "Circle Tangent Angle Explorer",
      "objective": "Move external point P further from the circle and observe how tangent angle and length vary.",
      "instructions": "Slide distance OP to observe the angle between tangents shrink and tangent length grow.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "radius",
          "label": "Circle Radius r (cm)",
          "description": "Radius of circle",
          "min": 2,
          "max": 10,
          "step": 1,
          "defaultValue": 5,
          "unit": "cm"
        },
        {
          "id": "dist",
          "label": "Distance OP (cm)",
          "description": "Distance of external point P from centre",
          "min": 6,
          "max": 25,
          "step": 1,
          "defaultValue": 13,
          "unit": "cm"
        }
      ],
      "guidingQuestions": [
        "What happens to the angle between tangents as point P recedes to infinity?"
      ],
      "whatToObserve": [
        "As distance grows large, the tangents become nearly parallel, and angle APB approaches 0°."
      ],
      "takeawayInsight": "Tangents converge asymptotically to parallel rays as the source point approaches infinity."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Polynomials & Factor Theorem
  // =========================================================================
  {
  "id": "math-polynomials-factorisation",
  "slug": "polynomials-factorisation",
  "title": "Polynomials & Factor Theorem",
  "subtitle": "Remainder theorem, synthetic division, and polynomial zeroes",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Polynomial algebra explores expressions of the form P(x) = a_n x^n + ... + a₀. The Remainder Theorem and Factor Theorem state that (x - a) is a factor of P(x) if and only if P(a) = 0.",
  "whyItMatters": "Crucial for signal processing filter design, error-correcting codes (Reed-Solomon), robotics spline interpolation, and structural vibration modes.",
  "learningObjectives": [
    "Evaluate polynomial zeroes and relate zeroes to graphical x-intercepts.",
    "Apply the Remainder Theorem: dividing P(x) by (x - a) leaves remainder P(a).",
    "Factorise cubic and higher-order polynomials using the Factor Theorem."
  ],
  "coreQuestions": [
    "Why does P(a) = 0 guarantee that (x - a) divides P(x) without remainder?",
    "How does the Fundamental Theorem of Algebra limit the number of roots?"
  ],
  "prerequisites": [
    "Algebraic expansions",
    "Long division of integers",
    "Linear equations"
  ],
  "keyTerms": [
    {
      "term": "Zero of a Polynomial",
      "definition": "A value c such that P(c) = 0."
    },
    {
      "term": "Factor Theorem",
      "definition": "If P(a) = 0, then (x - a) is an exact factor of P(x)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Polynomials are algebraic building blocks that approximate smooth curves with arbitrary precision.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Division Algorithm & Remainder Theorem",
          "subtitle": "P(x) = d(x) · q(x) + r(x)",
          "paragraphs": [
            "When P(x) is divided by a linear divisor (x - a), the remainder must be of degree less than 1 (a constant R). Substituting x = a yields P(a) = (a - a)q(a) + R = R. Thus the remainder upon division by (x - a) is simply P(a)."
          ],
          "bulletPoints": [
            "Degree of remainder is strictly less than degree of divisor.",
            "If remainder R = 0, then divisor is a factor."
          ],
          "callout": {
            "type": "axiom",
            "title": "Division Algorithm Invariant",
            "text": "Dividend = (Divisor × Quotient) + Remainder, valid for all real and complex x."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Factor Theorem and Root Finding",
          "subtitle": "Systematic factoring of cubic polynomials",
          "paragraphs": [
            "To factor cubic P(x) = x³ - 6x² + 11x - 6, test factors of the constant term (±1, ±2, ±3). Since P(1) = 1 - 6 + 11 - 6 = 0, (x - 1) is a factor. Long division yields quadratic quotient (x² - 5x + 6), factoring into (x - 2)(x - 3)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "P(a) gives remainder directly without carrying out long polynomial division.",
        "(x - a) divides P(x) evenly if and only if P(a) = 0."
      ],
      "reflectionPrompt": "Why can a cubic polynomial have at most three distinct real zeroes?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Polynomial Division and Remainder Extraction",
      "caption": "Visualizing polynomial area factoring into linear dimensions.",
      "diagramTitle": "Factor Partitioning of Cubic Polynomial",
      "diagramDescription": "Cubic curve P(x) crossing x-axis at x = 1, 2, 3 corresponding to linear factors.",
      "components": [
        {
          "id": "c1",
          "name": "Zero at x = 1",
          "role": "Root node",
          "description": "Point where P(1) = 0, indicating (x - 1) factor."
        },
        {
          "id": "c2",
          "name": "Zero at x = 2",
          "role": "Root node",
          "description": "Point where P(2) = 0, indicating (x - 2) factor."
        },
        {
          "id": "c3",
          "name": "Zero at x = 3",
          "role": "Root node",
          "description": "Point where P(3) = 0, indicating (x - 3) factor."
        }
      ],
      "visualSummary": "Every geometric axis crossing corresponds directly to an algebraic factor (x - c)."
    },
    "examples-applications": {
      "overview": "Cryptography error correction and aircraft wing profile spline modeling.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Testing Factors of a Cubic Expression",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Check if (x + 2) is a factor of P(x) = x³ + 3x² + 3x + 2.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify test value a for divisor (x - a)",
              "work": "x + 2 = x - (-2), so test a = -2."
            },
            {
              "stepNumber": 2,
              "explanation": "Evaluate P(-2)",
              "work": "P(-2) = (-2)³ + 3(-2)² + 3(-2) + 2 = -8 + 3(4) - 6 + 2 = -8 + 12 - 6 + 2 = 0."
            }
          ],
          "finalResult": "Since P(-2) = 0, (x + 2) is an exact factor of P(x).",
          "verificationTip": "Be careful with signs: divisor (x + 2) requires evaluating P(-2), not P(2)."
        }
      ],
      "applications": [
        {
          "domain": "Telecommunications",
          "title": "Cyclic Redundancy Check (CRC)",
          "context": "Detecting accidental transmission bit errors in Ethernet data packets using polynomial division.",
          "realWorldScenario": "Dividing data bit polynomial by generator polynomial to compute CRC checksum remainder.",
          "impactMetric": "100% detection rate for single-bit transmission corruptions."
        }
      ],
      "selfCheckExercise": {
        "question": "Find the remainder when P(x) = 2x³ - 5x + 7 is divided by (x - 1).",
        "hint": "Evaluate P(1).",
        "solution": "P(1) = 2(1)³ - 5(1) + 7 = 2 - 5 + 7 = 4. The remainder is 4."
      }
    },
    "explore-experiment": {
      "activityTitle": "Polynomial Factor Evaluator",
      "objective": "Test different test values a on a polynomial to locate zeroes and watch remainder collapse to zero.",
      "instructions": "Slide candidate root value a to observe P(a) evaluation in real time.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "root",
          "label": "Candidate Root a",
          "description": "Trial root value to evaluate P(a)",
          "min": -4,
          "max": 4,
          "step": 1,
          "defaultValue": 1,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "Which integer values of a make P(a) = a³ - 2a² - a + 2 equal to zero?"
      ],
      "whatToObserve": [
        "P(a) vanishes at a = -1, a = 1, and a = 2, yielding factors (x+1), (x-1), and (x-2)."
      ],
      "takeawayInsight": "The zeroes of a polynomial completely decompose its algebraic structure."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Algebraic Identities & Expansions
  // =========================================================================
  {
  "id": "math-algebraic-expressions-identities",
  "slug": "algebraic-expressions-identities",
  "title": "Algebraic Identities & Expansions",
  "subtitle": "Binomial squares, difference of squares, and cubic expansion proofs",
  "subjectId": "mathematics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Algebraic identities are equality statements true for all values of their variables. Core identities include (a+b)² = a² + 2ab + b², (a-b)² = a² - 2ab + b², and (a+b)(a-b) = a² - b².",
  "whyItMatters": "Essential for fast mental arithmetic, factoring high-order equations, geometric area decomposition, and algorithmic computational efficiency.",
  "learningObjectives": [
    "Expand binomials and trinomials using algebraic identities.",
    "Factor algebraic expressions via difference of squares and perfect squares.",
    "Verify identities using geometric square and rectangle area dissections."
  ],
  "coreQuestions": [
    "Why does (a + b)² contain the middle cross-term 2ab instead of just a² + b²?",
    "How does (a - b)(a + b) eliminate the linear cross-term entirely?"
  ],
  "prerequisites": [
    "Basic arithmetic",
    "Distributive law",
    "Variables and exponents"
  ],
  "keyTerms": [
    {
      "term": "Identity",
      "definition": "An algebraic equation that remains true for every possible substitution of its variables."
    },
    {
      "term": "Difference of Squares",
      "definition": "The identity a² - b² = (a - b)(a + b)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Algebraic identities provide universal shortcuts by capturing invariant structural patterns.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Binomial Square Identities",
          "subtitle": "Geometric and algebraic proof of (a + b)²",
          "paragraphs": [
            "A square with side length (a + b) has total area (a + b)². Partitioning it along internal lines creates four sub-regions: a square of area a², a square of area b², and two congruent rectangles each of area ab. Summing these yields (a + b)² = a² + 2ab + b²."
          ],
          "bulletPoints": [
            "(a + b)² = a² + 2ab + b².",
            "(a - b)² = a² - 2ab + b².",
            "(a + b)(a - b) = a² - b²."
          ],
          "callout": {
            "type": "axiom",
            "title": "Cross-Term Invariant",
            "text": "The cross-term 2ab accounts for the two interaction rectangles formed between dimensions a and b."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Difference of Squares and Mental Math",
          "subtitle": "Using a² - b² = (a + b)(a - b)",
          "paragraphs": [
            "To calculate 52 × 48 mentally, recognize both numbers as (50 + 2)(50 - 2). By difference of squares: 50² - 2² = 2500 - 4 = 2496. This transforms tedious long multiplication into subtraction."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Identities hold for all real and complex variable inputs.",
        "Difference of squares factorisation eliminates cross-terms completely."
      ],
      "reflectionPrompt": "Why is (a + b)³ equal to a³ + 3a²b + 3ab² + b³ rather than simply a³ + b³?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Geometric Area Dissection of (a + b)²",
      "caption": "Decomposing a large square into two smaller squares and two symmetric rectangles.",
      "diagramTitle": "Visual Dissection of (a + b)²",
      "diagramDescription": "Square of dimension a+b showing a² (top-left), b² (bottom-right), and two ab rectangles.",
      "components": [
        {
          "id": "c1",
          "name": "Square a²",
          "role": "Dominant square",
          "description": "Corner region of area a × a."
        },
        {
          "id": "c2",
          "name": "Square b²",
          "role": "Minor square",
          "description": "Opposite corner region of area b × b."
        },
        {
          "id": "c3",
          "name": "Two Rectangles (2ab)",
          "role": "Cross regions",
          "description": "Two identical rectangles each of area a × b."
        }
      ],
      "visualSummary": "The total area (a + b)² is the exact sum of a², b², and the two intermediate ab rectangles."
    },
    "examples-applications": {
      "overview": "Rapid mental arithmetic and computer arithmetic logic unit (ALU) multiplier algorithms.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Factoring Quadratic via Difference of Squares",
          "difficulty": "Foundational",
          "contextOrPrompt": "Factorise 49x² - 36y².",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Express terms as perfect squares",
              "work": "49x² = (7x)² and 36y² = (6y)²."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply a² - b² = (a - b)(a + b)",
              "work": "(7x - 6y)(7x + 6y)."
            }
          ],
          "finalResult": "Factored form is (7x - 6y)(7x + 6y).",
          "verificationTip": "Identify the square root of each coefficient before applying the identity."
        }
      ],
      "applications": [
        {
          "domain": "Computer Architecture",
          "title": "High-Speed Binary Multiplication",
          "context": "Karatsuba multiplication algorithm dividing large multi-precision numbers using identity tricks.",
          "realWorldScenario": "Multiplying 1024-bit cryptographic keys in hardware registers with minimal clock cycles.",
          "impactMetric": "Twenty-five percent reduction in multiplication gate operations."
        }
      ],
      "selfCheckExercise": {
        "question": "Evaluate 103² using the identity (a + b)².",
        "hint": "Write 103 as (100 + 3) and expand 100² + 2(100)(3) + 3².",
        "solution": "10000 + 600 + 9 = 10,609."
      }
    },
    "explore-experiment": {
      "activityTitle": "Binomial Area Dissector",
      "objective": "Vary dimensions a and b to inspect how sub-region areas scale interactively.",
      "instructions": "Slide dimensions a and b to observe real-time calculation of a², 2ab, and b².",
      "experimentType": "generic",
      "variables": [
        {
          "id": "a",
          "label": "Dimension a",
          "description": "First length parameter",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 4,
          "unit": "units"
        },
        {
          "id": "b",
          "label": "Dimension b",
          "description": "Second length parameter",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "What fraction of the total area does the 2ab cross-term represent when a = b?"
      ],
      "whatToObserve": [
        "When a = b, 2ab = 2a² and total area is 4a², so the cross-term represents exactly half (50%) of total area."
      ],
      "takeawayInsight": "Cross-terms account for a substantial portion of expanded polynomial magnitude."
    }
  }
},

  // =========================================================================
  // MATHEMATICS: Commercial Arithmetic: Interest & GST
  // =========================================================================
  {
  "id": "math-commercial-arithmetic",
  "slug": "commercial-arithmetic",
  "title": "Commercial Arithmetic: Interest & GST",
  "subtitle": "Compound interest, recurring deposits, and value-added tax computation",
  "subjectId": "mathematics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Commercial arithmetic analyzes financial transactions: compound interest A = P(1 + r/n)^(nt), Goods and Services Tax (GST), and recurring deposit banking maturities.",
  "whyItMatters": "Essential for personal wealth accumulation, mortgage planning, consumer price transparency, and corporate accounting compliance.",
  "learningObjectives": [
    "Calculate compound interest compounded annually and semi-annually.",
    "Differentiate simple linear interest from compounding exponential interest.",
    "Compute intra-state GST (CGST + SGST) and recurring deposit maturity amounts."
  ],
  "coreQuestions": [
    "Why does compounding interest produce exponential rather than linear wealth growth?",
    "How does intra-state GST split between state and central governments?"
  ],
  "prerequisites": [
    "Percentages",
    "Exponents",
    "Linear arithmetic"
  ],
  "keyTerms": [
    {
      "term": "Compound Interest (CI)",
      "definition": "Interest calculated on the initial principal and also on accumulated interest of previous periods."
    },
    {
      "term": "GST (Goods and Services Tax)",
      "definition": "A comprehensive destination-based value-added tax levied on manufacture, sale, and consumption."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Commercial mathematics models the time value of money and fiscal statutory compliance.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Compound Interest Formula",
          "subtitle": "A = P(1 + r/100)ⁿ vs simple interest",
          "paragraphs": [
            "Simple interest I = (P · r · t)/100 grows linearly because principal remains constant. In compound interest, accrued interest is reinvested into the principal at the end of each compounding period: A = P(1 + r/100)ⁿ. Compound Interest CI = A - P."
          ],
          "bulletPoints": [
            "Semi-annual compounding: rate becomes r/2, periods become 2n.",
            "Compound interest produces exponential curves over long horizons."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Time Value of Money Invariant",
            "text": "A currency unit today is worth more than a currency unit tomorrow due to compounding earning potential."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Recurring Deposits & GST",
          "subtitle": "Bank maturity values and split tax schedules",
          "paragraphs": [
            "In a recurring deposit (RD), monthly deposit P is paid for n months: Maturity Value = n·P + Interest, where Interest = P · [n(n+1)/(2 × 12)] · (r/100). In intra-state commerce, GST is split equally into CGST (Central) and SGST (State)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Compounding reinvests interest, generating exponential growth over time.",
        "Intra-state GST divides equally into CGST and SGST."
      ],
      "reflectionPrompt": "Why is compounding frequency (monthly vs annually) critical when comparing loan interest rates?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Linear vs Exponential Capital Accumulation",
      "caption": "Comparing simple interest linear growth against compound interest exponential curve.",
      "diagramTitle": "Growth Trajectories over 20 Years",
      "diagramDescription": "Graph showing straight line of simple interest and ascending exponential curve of compound interest.",
      "components": [
        {
          "id": "c1",
          "name": "Principal Baseline (P)",
          "role": "Initial capital",
          "description": "Starting deposit."
        },
        {
          "id": "c2",
          "name": "Simple Interest Line",
          "role": "Linear path",
          "description": "Constant dollar return per year."
        },
        {
          "id": "c3",
          "name": "Compound Interest Curve",
          "role": "Exponential path",
          "description": "Interest generating further interest."
        }
      ],
      "visualSummary": "Over multi-year horizons, compound interest dominates linear simple interest dramatically."
    },
    "examples-applications": {
      "overview": "Retirement fund accumulation and commercial enterprise retail billing.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Compound Interest over 2 Years",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Calculate compound interest on $10,000 at 10% per annum compounded annually for 2 years.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply compound amount formula",
              "work": "A = P(1 + r/100)ⁿ = 10000(1 + 10/100)² = 10000(1.1)² = 10000(1.21) = $12,100."
            },
            {
              "stepNumber": 2,
              "explanation": "Subtract principal to find interest",
              "work": "CI = A - P = 12100 - 10000 = $2,100."
            }
          ],
          "finalResult": "Compound interest earned is $2,100.",
          "verificationTip": "Simple interest would only be $2,000; the extra $100 is interest earned on Year 1 interest."
        }
      ],
      "applications": [
        {
          "domain": "Personal Wealth Management",
          "title": "Retirement Pension Growth",
          "context": "Modeling 30-year compounding returns in index fund retirement accounts.",
          "realWorldScenario": "Predicting maturity corpus for an employee contributing monthly retirement savings.",
          "impactMetric": "Retirement corpus multiple of initial principal contributions."
        }
      ],
      "selfCheckExercise": {
        "question": "An article costs $500. If GST rate is 18%, calculate CGST and total customer bill.",
        "hint": "CGST is 9% of $500. Total GST is 18% of $500.",
        "solution": "CGST = $45, SGST = $45, Total GST = $90. Total bill = $590."
      }
    },
    "explore-experiment": {
      "activityTitle": "Compound Interest Growth Simulator",
      "objective": "Vary interest rate and time horizon to witness exponential divergence from simple interest.",
      "instructions": "Slide interest rate and duration to see final accumulated balance.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "p",
          "label": "Principal P ($)",
          "description": "Initial investment",
          "min": 1000,
          "max": 50000,
          "step": 1000,
          "defaultValue": 10000,
          "unit": "$"
        },
        {
          "id": "r",
          "label": "Annual Rate r (%)",
          "description": "Interest rate per year",
          "min": 2,
          "max": 15,
          "step": 1,
          "defaultValue": 8,
          "unit": "%"
        },
        {
          "id": "t",
          "label": "Time t (years)",
          "description": "Investment duration",
          "min": 1,
          "max": 30,
          "step": 1,
          "defaultValue": 10,
          "unit": "years"
        }
      ],
      "guidingQuestions": [
        "By what factor does the balance increase after 20 years at 8%?"
      ],
      "whatToObserve": [
        "At 8% for 20 years, (1.08)²⁰ ≈ 4.66, multiplying original wealth by more than 4.6 times."
      ],
      "takeawayInsight": "Time horizon is the most powerful exponent in commercial financial growth."
    }
  }
},

  // =========================================================================
  // PHYSICS: Light Reflection & Spherical Mirrors
  // =========================================================================
  {
  "id": "phys-light-reflection",
  "slug": "light-reflection",
  "title": "Light Reflection & Spherical Mirrors",
  "subtitle": "Laws of reflection, focal properties, and mirror formula 1/f = 1/v + 1/u",
  "subjectId": "physics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Light reflection governs how wavefronts bounce off surfaces. For spherical mirrors (concave and convex), focal length f = R/2 and the mirror formula 1/f = 1/v + 1/u predict image formation, magnification, and orientation.",
  "whyItMatters": "Essential for automotive rear-view mirrors, solar concentrators, astronomical reflecting telescopes, and dental examination tools.",
  "learningObjectives": [
    "Verify laws of reflection: angle of incidence equals angle of reflection (i = r).",
    "Construct ray diagrams for concave and convex mirrors across various object positions.",
    "Apply the Cartesian sign convention and mirror formula 1/f = 1/v + 1/u."
  ],
  "coreQuestions": [
    "Why do concave mirrors converge light rays while convex mirrors diverge them?",
    "How does the Cartesian sign convention prevent algebraic ambiguity?"
  ],
  "prerequisites": [
    "Straight line propagation of light",
    "Plane mirrors basics"
  ],
  "keyTerms": [
    {
      "term": "Principal Focus (F)",
      "definition": "Point where rays parallel to principal axis converge (concave) or appear to diverge from (convex)."
    },
    {
      "term": "Mirror Formula",
      "definition": "1/f = 1/v + 1/u, connecting focal length f, image distance v, and object distance u."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Reflection describes the boundary behavior of electromagnetic waves encountering a change in media impedance.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Laws of Reflection and Spherical Surfaces",
          "subtitle": "i = r and the center of curvature normal",
          "paragraphs": [
            "The incident ray, normal to the mirror at the point of incidence, and reflected ray all lie in the same plane, with angle of incidence equal to angle of reflection (∠i = ∠r). For spherical mirrors, the normal at any point passes through the center of curvature C."
          ],
          "bulletPoints": [
            "Concave mirror: Converging mirror with real or virtual focus.",
            "Convex mirror: Diverging mirror with virtual focus behind mirror.",
            "Focal length f = R/2."
          ],
          "callout": {
            "type": "axiom",
            "title": "Fermat’s Principle",
            "text": "Light travels between two points along the path requiring the least time, establishing i = r."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Mirror Formula and Magnification",
          "subtitle": "Cartesian sign convention and 1/f = 1/v + 1/u",
          "paragraphs": [
            "Distances measured in direction of incident light are positive; opposite are negative. Object distance u is always negative. Magnification m = -v/u = h_i/h_o. A negative magnification signifies a real, inverted image."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Mirror equation 1/f = 1/v + 1/u holds universally when using Cartesian signs.",
        "Convex mirrors always produce erect, virtual, and diminished images with wide field of view."
      ],
      "reflectionPrompt": "Why are convex mirrors preferred as vehicle side-view mirrors over flat plane mirrors?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Spherical Ray Tracing & Focal Point Geometry",
      "caption": "Ray geometry showing parallel rays converging through principal focus F.",
      "diagramTitle": "Concave Mirror Ray Convergence",
      "diagramDescription": "Concave mirror showing principal axis, center of curvature C, focus F, pole P, and reflected rays.",
      "components": [
        {
          "id": "c1",
          "name": "Pole P",
          "role": "Origin coordinate",
          "description": "Center point of the reflecting mirror surface."
        },
        {
          "id": "c2",
          "name": "Focus F",
          "role": "Focal convergence",
          "description": "Midpoint between pole and center of curvature where parallel rays focus."
        },
        {
          "id": "c3",
          "name": "Center of Curvature C",
          "role": "Geometric center",
          "description": "Center of the hollow sphere from which the mirror was cut (R = 2f)."
        }
      ],
      "visualSummary": "Parallel incoming rays converge through the focal point, forming real inverted images."
    },
    "examples-applications": {
      "overview": "Solar thermal parabolic troughs and automotive headlight reflector design.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Image Formation by a Concave Mirror",
          "difficulty": "Foundational",
          "contextOrPrompt": "An object is placed at u = -30 cm in front of a concave mirror of focal length f = -20 cm. Find the image distance v and magnification.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply mirror formula 1/f = 1/v + 1/u",
              "work": "1/(-20) = 1/v + 1/(-30) => 1/v = -1/20 + 1/30."
            },
            {
              "stepNumber": 2,
              "explanation": "Find common denominator",
              "work": "1/v = (-3 + 2)/60 = -1/60 => v = -60 cm."
            },
            {
              "stepNumber": 3,
              "explanation": "Compute magnification m = -v/u",
              "work": "m = -(-60)/(-30) = -2."
            }
          ],
          "finalResult": "Image is formed at v = -60 cm (in front of mirror); it is real, inverted, and magnified 2x.",
          "verificationTip": "Negative image distance v indicates a real image on the same side as the object."
        }
      ],
      "applications": [
        {
          "domain": "Renewable Energy",
          "title": "Parabolic Solar Concentrator",
          "context": "Focusing incident sunlight onto central oil pipes to drive steam electricity turbines.",
          "realWorldScenario": "Aligning parabolic mirror array to achieve 400°C thermal focus on heat-transfer fluid.",
          "impactMetric": "Concentration ratio exceeding 50x ambient solar irradiance."
        }
      ],
      "selfCheckExercise": {
        "question": "A convex mirror has focal length 15 cm. If an object is at -10 cm, is the image real or virtual?",
        "hint": "1/v = 1/f - 1/u = 1/15 - (-1/10) = 1/15 + 1/10.",
        "solution": "1/v = (2+3)/30 = 5/30 = 1/6 => v = +6 cm. Positive v means image is virtual and behind the mirror."
      }
    },
    "explore-experiment": {
      "activityTitle": "Spherical Mirror Ray Simulator",
      "objective": "Vary object distance u to observe transitions between real inverted and virtual erect images.",
      "instructions": "Slide object distance u from beyond C to within the focal length f.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "focal",
          "label": "Focal Length f (cm)",
          "description": "Mirror focal length (negative for concave)",
          "min": -30,
          "max": -10,
          "step": 5,
          "defaultValue": -20,
          "unit": "cm"
        },
        {
          "id": "u",
          "label": "Object Distance u (cm)",
          "description": "Position of object from pole",
          "min": 5,
          "max": 60,
          "step": 5,
          "defaultValue": 30,
          "unit": "cm"
        }
      ],
      "guidingQuestions": [
        "What happens when the object is placed inside the focal length (u < |f|)?"
      ],
      "whatToObserve": [
        "When u < |f|, reflected rays diverge and produce a virtual, magnified, erect image behind the mirror."
      ],
      "takeawayInsight": "Object position relative to focus governs whether an image is real or virtual."
    }
  }
},

  // =========================================================================
  // PHYSICS: Light Refraction & Thin Lenses
  // =========================================================================
  {
  "id": "phys-light-refraction-lenses",
  "slug": "light-refraction-lenses",
  "title": "Light Refraction & Thin Lenses",
  "subtitle": "Snell’s Law, refractive index, lens formula 1/f = 1/v - 1/u, and optical power",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Refraction is the bending of light as it passes between media of different optical densities due to changes in phase velocity. Snell’s law (n₁ sin i = n₂ sin r) and the lens formula 1/f = 1/v - 1/u govern optical imaging.",
  "whyItMatters": "The operating principle behind corrective eyeglasses, microscope objectives, telescope lenses, smartphone cameras, and fiber optic internet backbones.",
  "learningObjectives": [
    "Apply Snell’s law n₁ sin i = n₂ sin r and define absolute refractive index n = c/v.",
    "Analyze Total Internal Reflection (TIR) and critical angle θ_c = arcsin(1/n).",
    "Solve lens problems using 1/f = 1/v - 1/u and power P = 1/f (dioptres)."
  ],
  "coreQuestions": [
    "Why does light bend towards the normal when entering an optically denser medium?",
    "What causes total internal reflection when exceeding the critical angle?"
  ],
  "prerequisites": [
    "Reflection of light",
    "Trigonometric ratios (sin θ)"
  ],
  "keyTerms": [
    {
      "term": "Refractive Index (n)",
      "definition": "The ratio of speed of light in vacuum c to speed of light in medium v: n = c/v."
    },
    {
      "term": "Lens Formula",
      "definition": "1/f = 1/v - 1/u, relating lens focal length f, image distance v, and object distance u."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Refraction emerges from the principle of least time as wave crests change speed across optical interfaces.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Snell’s Law and Wave Velocity Change",
          "subtitle": "n₁ sin i = n₂ sin r",
          "paragraphs": [
            "When light enters an optically denser medium (n₂ > n₁), its speed decreases (v₂ < v₁), causing the wavefront to pivot towards the normal (r < i). Refractive index n = c/v. When passing from dense to rare media, rays bend away from the normal."
          ],
          "bulletPoints": [
            "Frequency f remains invariant across refraction; wavelength λ scales as λ = λ₀/n.",
            "Critical angle: sin θ_c = 1/n when light attempts to exit dense medium."
          ],
          "callout": {
            "type": "axiom",
            "title": "Total Internal Reflection Invariant",
            "text": "When i > θ_c at a boundary to a rarer medium, 100% of energy reflects back with zero transmission."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Thin Lenses and Optical Power",
          "subtitle": "1/f = 1/v - 1/u and Dioptres P = 1/f",
          "paragraphs": [
            "For a convex lens, f is positive (+); for a concave lens, f is negative (-). Lens power P = 1/f (with f in metres), measured in Dioptres (D). A +2.0 D lens has focal length f = +0.5 m (convex, converging)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Light refracts because its phase velocity changes between media.",
        "Total internal reflection enables loss-free signal transmission in optical fibers."
      ],
      "reflectionPrompt": "Why does a swimming pool appear shallower than its actual physical depth?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Refractive Bending and Lens Focal Rays",
      "caption": "Ray refraction through biconvex lens focusing parallel rays at focal plane.",
      "diagramTitle": "Convex Lens Dual Refraction Mechanics",
      "diagramDescription": "Light rays refracting at first surface and second surface to converge at focal point F₂.",
      "components": [
        {
          "id": "c1",
          "name": "Optical Centre O",
          "role": "Undeviated ray path",
          "description": "Central point of lens where rays pass through without deviation."
        },
        {
          "id": "c2",
          "name": "Principal Focus F₂",
          "role": "Convergence point",
          "description": "Focal point on far side where parallel rays meet."
        },
        {
          "id": "c3",
          "name": "Focal Plane",
          "role": "Image sensor plane",
          "description": "Planar surface perpendicular to axis at distance f."
        }
      ],
      "visualSummary": "Convex lenses converge light rays through optical refraction at curved glass-air interfaces."
    },
    "examples-applications": {
      "overview": "Fiber-optic telecommunications and corrective vision optometry.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Correcting Hypermetropia with a Convex Lens",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A student uses a convex lens of focal length f = +20 cm. An object is placed at u = -30 cm. Find image distance v and power P.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply lens formula 1/f = 1/v - 1/u",
              "work": "1/20 = 1/v - 1/(-30) => 1/20 = 1/v + 1/30."
            },
            {
              "stepNumber": 2,
              "explanation": "Rearrange for 1/v",
              "work": "1/v = 1/20 - 1/30 = (3 - 2)/60 = 1/60 => v = +60 cm."
            },
            {
              "stepNumber": 3,
              "explanation": "Calculate optical power P = 1/f(m)",
              "work": "f = 0.2 m => P = 1/0.2 = +5.0 Dioptres (D)."
            }
          ],
          "finalResult": "Image is real, inverted, at v = +60 cm behind lens; lens power is +5.0 D.",
          "verificationTip": "Notice difference between mirror formula (1/v + 1/u) and lens formula (1/v - 1/u)."
        }
      ],
      "applications": [
        {
          "domain": "Telecommunications",
          "title": "Subsea Fiber Optic Cable Transmission",
          "context": "Propagating laser data pulses across thousands of kilometres via Total Internal Reflection.",
          "realWorldScenario": "Guiding 100 Gbps light signals through silica glass core (n=1.48) bounded by cladding (n=1.46).",
          "impactMetric": "Signal attenuation below 0.2 dB per kilometre."
        }
      ],
      "selfCheckExercise": {
        "question": "Calculate the critical angle for glass with refractive index n = 1.5.",
        "hint": "sin θ_c = 1/n = 1/1.5 = 2/3 ≈ 0.6667.",
        "solution": "θ_c = arcsin(0.6667) ≈ 41.8°."
      }
    },
    "explore-experiment": {
      "activityTitle": "Refractive Index & Snell’s Law Explorer",
      "objective": "Vary refractive index n₂ and incident angle i to observe refractive bending and total internal reflection.",
      "instructions": "Slide incident angle to discover the critical angle where refracted ray grazes surface.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "n2",
          "label": "Medium Refractive Index n₂",
          "description": "Optical density of second medium",
          "min": 1,
          "max": 2.4,
          "step": 0.1,
          "defaultValue": 1.5,
          "unit": "units"
        },
        {
          "id": "angle_i",
          "label": "Incident Angle i (°)",
          "description": "Angle measured from normal",
          "min": 0,
          "max": 85,
          "step": 5,
          "defaultValue": 30,
          "unit": "°"
        }
      ],
      "guidingQuestions": [
        "What happens to refracted angle r when entering diamond (n = 2.42)?"
      ],
      "whatToObserve": [
        "Light bends dramatically towards the normal; at i = 30°, r drops to only 11.9°."
      ],
      "takeawayInsight": "Higher refractive index forces light along a steeper path closer to the surface normal."
    }
  }
},

  // =========================================================================
  // PHYSICS: Current Electricity & Circuit Laws
  // =========================================================================
  {
  "id": "phys-current-electricity",
  "slug": "current-electricity",
  "title": "Current Electricity & Circuit Laws",
  "subtitle": "Ohm’s law, resistivity, series/parallel combinations, and Joule heating",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Current electricity analyzes the drift flow of charge carriers under electric potential differences. Ohm’s Law (V = IR), resistance formulas R = ρL/A, and Joule heating H = I²Rt govern electric circuits.",
  "whyItMatters": "The foundation of all electrical power grids, household appliances, semiconductor microchips, and electric vehicle battery systems.",
  "learningObjectives": [
    "State and verify Ohm’s law V = IR for ohmic conductors.",
    "Derive equivalent resistance for series (R = ∑R_i) and parallel (1/R = ∑1/R_i) circuits.",
    "Calculate electrical energy and power consumption P = VI = I²R = V²/R."
  ],
  "coreQuestions": [
    "Why does resistance increase with conductor length but decrease with cross-sectional area?",
    "How does parallel wiring ensure independent device operation in households?"
  ],
  "prerequisites": [
    "Electric charge fundamentals",
    "Potential difference (Volts)",
    "Basic algebra"
  ],
  "keyTerms": [
    {
      "term": "Ohm’s Law",
      "definition": "Potential difference across a conductor is directly proportional to current, provided temperature remains constant: V = IR."
    },
    {
      "term": "Resistivity (ρ)",
      "definition": "An intrinsic material property determining electrical resistance: R = ρL/A (units: Ω·m)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Electric current is the net macroscopic flow of electron charge carriers under the influence of an electric field.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Ohm’s Law and Conductor Resistance",
          "subtitle": "V = IR and geometric factors R = ρL/A",
          "paragraphs": [
            "For metallic conductors at constant temperature, current I is proportional to potential difference V: V = IR. Resistance depends on material resistivity ρ, conductor length L, and cross-sectional area A: R = ρL/A. Silver and copper have low resistivity; nichrome has high resistivity."
          ],
          "bulletPoints": [
            "Series circuit: Current I is identical; voltage divides: R_eq = R₁ + R₂ + R₃.",
            "Parallel circuit: Voltage V is identical; current divides: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃."
          ],
          "callout": {
            "type": "axiom",
            "title": "Kirchhoff’s Current Invariant",
            "text": "Charge cannot accumulate at a circuit junction: total entering current equals total leaving current."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Joule’s Law of Heating and Electric Power",
          "subtitle": "Thermal dissipation H = I²Rt and power P = VI",
          "paragraphs": [
            "When current flows through a resistor, electron collisions with the lattice convert kinetic energy into thermal heat: H = I²Rt Joules. Electric power is the rate of energy dissipation: P = VI = I²R = V²/R (Watts). One commercial electrical unit is 1 kWh = 3.6 × 10⁶ Joules."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Parallel connection lowers total equivalent resistance below the smallest individual resistor.",
        "Joule heating scales quadratically with current (I²), making high-voltage transmission efficient."
      ],
      "reflectionPrompt": "Why are household electrical circuits wired in parallel rather than in series?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Electrical Potential Circuit Model",
      "caption": "Visualizing voltage source, current flow, and resistance drops in closed loop.",
      "diagramTitle": "Closed Circuit Potential Waterfall",
      "diagramDescription": "Battery elevates potential; resistors drop potential back to zero along closed circuit loop.",
      "components": [
        {
          "id": "c1",
          "name": "EMF Source (Battery)",
          "role": "Charge pump",
          "description": "Maintains potential difference V between terminals."
        },
        {
          "id": "c2",
          "name": "Resistor R₁ (Series)",
          "role": "Potential drop",
          "description": "Drops potential by V₁ = I·R₁."
        },
        {
          "id": "c3",
          "name": "Parallel Resistor Pair",
          "role": "Current divider",
          "description": "Splits current inversely proportional to resistance."
        }
      ],
      "visualSummary": "Voltage drives charge flow against resistance, dropping potential around every closed loop."
    },
    "examples-applications": {
      "overview": "Household power distribution and appliance power consumption metering.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Equivalent Resistance in a Combined Circuit",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Two resistors of 6 Ω and 3 Ω are connected in parallel, and this combination is connected in series with a 4 Ω resistor to a 12 V battery. Find total current.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate parallel equivalent R_p",
              "work": "1/R_p = 1/6 + 1/3 = (1 + 2)/6 = 3/6 = 1/2 => R_p = 2 Ω."
            },
            {
              "stepNumber": 2,
              "explanation": "Add series resistor",
              "work": "R_total = R_p + R_series = 2 + 4 = 6 Ω."
            },
            {
              "stepNumber": 3,
              "explanation": "Calculate total current via Ohm’s law",
              "work": "I = V / R_total = 12 V / 6 Ω = 2.0 Amperes."
            }
          ],
          "finalResult": "Total circuit current is 2.0 A.",
          "verificationTip": "Resolve parallel branch clusters first before summing series elements."
        }
      ],
      "applications": [
        {
          "domain": "Electrical Utilities",
          "title": "High-Voltage Power Grid Transmission",
          "context": "Stepping up voltage to 400 kV to minimize I²R transmission line heat losses across provinces.",
          "realWorldScenario": "Transmitting 500 MW of hydroelectric power over 300 km with under 3% line loss.",
          "impactMetric": "Ninety-eight percent electrical transmission efficiency."
        }
      ],
      "selfCheckExercise": {
        "question": "An electric iron of 1000 W operates on 220 V. Calculate its electrical resistance.",
        "hint": "Use P = V² / R => R = V² / P.",
        "solution": "R = (220)² / 1000 = 48400 / 1000 = 48.4 Ω."
      }
    },
    "explore-experiment": {
      "activityTitle": "Ohm’s Law & Resistor Network Simulator",
      "objective": "Vary voltage and resistance to observe current response and Joule heating power.",
      "instructions": "Slide voltage and resistance parameters to observe current and power meters.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "volts",
          "label": "Voltage V (Volts)",
          "description": "Applied potential difference",
          "min": 1,
          "max": 24,
          "step": 1,
          "defaultValue": 12,
          "unit": "V"
        },
        {
          "id": "ohms",
          "label": "Resistance R (Ohms)",
          "description": "Circuit electrical resistance",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 6,
          "unit": "Ω"
        }
      ],
      "guidingQuestions": [
        "If voltage is doubled while resistance is halved, by what factor does power increase?"
      ],
      "whatToObserve": [
        "Power P = V²/R increases by a factor of (2)² / (0.5) = 8 times."
      ],
      "takeawayInsight": "Voltage and resistance together govern electrical current and power dissipation."
    }
  }
},

  // =========================================================================
  // PHYSICS: Magnetic Effects of Electric Current
  // =========================================================================
  {
  "id": "phys-magnetic-effects",
  "slug": "magnetic-effects",
  "title": "Magnetic Effects of Electric Current",
  "subtitle": "Biot-Savart rules, solenoids, Fleming’s Left-Hand Rule, and induction",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Hans Christian Ørsted discovered that moving electric charges create magnetic fields. Fleming’s Left-Hand Rule governs motor thrust, and Faraday’s Law explains electromagnetic induction in generators.",
  "whyItMatters": "Drives all electric vehicle motors, industrial generators, MRI medical scanners, magnetic levitation trains, and audio loudspeakers.",
  "learningObjectives": [
    "Map magnetic field lines around straight conductors and solenoids using Right-Hand Thumb Rule.",
    "Apply Fleming’s Left-Hand Rule to determine mechanical force on current-carrying conductors.",
    "Explain electromagnetic induction and Lenz’s law of induced EMF direction."
  ],
  "coreQuestions": [
    "Why does a coiled solenoid produce a magnetic field identical to a bar magnet?",
    "How does Lenz’s law enforce the conservation of energy in induction?"
  ],
  "prerequisites": [
    "Current electricity",
    "Basic magnetic poles"
  ],
  "keyTerms": [
    {
      "term": "Electromagnetic Induction",
      "definition": "The generation of an electric current in a conductor moving through a varying magnetic field."
    },
    {
      "term": "Fleming’s Left-Hand Rule",
      "definition": "Rule relating Thumb (Force), Forefinger (Magnetic Field), and Center finger (Current)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Electromagnetism reveals the fundamental unity between electrical charges in motion and magnetic force fields.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Oersted’s Principle and Field Geometry",
          "subtitle": "Concentric field circles and solenoids",
          "paragraphs": [
            "A current-carrying straight wire generates concentric circular magnetic field lines given by the Right-Hand Thumb Rule. Winding the wire into a helix (solenoid) causes interior field lines to add constructively, creating a strong, uniform magnetic field inside identical to a bar magnet."
          ],
          "bulletPoints": [
            "Field strength B inside a solenoid: B ∝ n·I (number of turns per unit length × current).",
            "Inserting a soft iron core creates a temporary high-strength electromagnet."
          ],
          "callout": {
            "type": "axiom",
            "title": "Lorentz Force Invariant",
            "text": "Magnetic force F = q(v × B) acts strictly perpendicular to both particle velocity and magnetic field."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Electric Motors and Induction",
          "subtitle": "Fleming’s rules and Faraday’s law",
          "paragraphs": [
            "When a conductor carrying current I is placed in magnetic field B, it experiences force F = I·L·B·sin θ (maximum at θ = 90°). Conversely, changing magnetic flux through a loop induces an EMF: ε = -dΦ/dt. Lenz’s law states the induced current opposes the flux change, conserving energy."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Electric current inherently generates magnetic fields.",
        "Relative motion between magnetic field and conductor induces electric current."
      ],
      "reflectionPrompt": "Why must the core of an electric transformer be laminated with thin insulated sheets instead of being a solid metal block?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Magnetic Field Topology of Current Loops",
      "caption": "Right-hand rule mapping circular field loops around current vectors.",
      "diagramTitle": "Field Vectors Surrounding Current-Carrying Solenoid",
      "diagramDescription": "Dense uniform horizontal field lines inside solenoid emerging from North pole and looping back to South pole.",
      "components": [
        {
          "id": "c1",
          "name": "Solenoid Coil",
          "role": "Helical conductor",
          "description": "Insulated copper windings carrying current I."
        },
        {
          "id": "c2",
          "name": "Uniform Internal Field",
          "role": "Dense parallel vectors",
          "description": "Homogeneous magnetic field lines inside coil."
        },
        {
          "id": "c3",
          "name": "Magnetic Dipole Poles",
          "role": "North and South poles",
          "description": "Emergent flux at North face looping to South face."
        }
      ],
      "visualSummary": "A solenoid organizes scattered concentric wire fields into a unified dipole bar magnet field."
    },
    "examples-applications": {
      "overview": "Electric vehicle traction motors and wind turbine alternating current generators.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Force on a Conductor in a Magnetic Field",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A straight wire of length 0.5 m carrying 4 A current is placed perpendicular to a magnetic field of 0.2 Tesla. Find the magnetic force.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify known variables",
              "work": "L = 0.5 m, I = 4 A, B = 0.2 T, θ = 90°."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply force formula F = I·L·B·sin θ",
              "work": "F = 4 · 0.5 · 0.2 · sin 90° = 2 · 0.2 · 1 = 0.40 Newtons."
            }
          ],
          "finalResult": "The mechanical force exerted on the wire is 0.40 N.",
          "verificationTip": "If the wire is parallel to the magnetic field (θ = 0°), the magnetic force is exactly zero."
        }
      ],
      "applications": [
        {
          "domain": "Electric Mobility",
          "title": "Permanent Magnet Synchronous Motor",
          "context": "Generating mechanical torque on electric car rotor windings from 3-phase inverter currents.",
          "realWorldScenario": "Controlling rotor torque in an EV accelerating from 0 to 100 km/h in 3.5 seconds.",
          "impactMetric": "Four hundred Newton-metres instantaneous mechanical torque."
        }
      ],
      "selfCheckExercise": {
        "question": "What happens to the direction of magnetic force when current direction in a wire is reversed?",
        "hint": "Apply Fleming’s Left-Hand Rule with reversed center finger.",
        "solution": "By Fleming’s Left-Hand Rule, reversing current reverses the direction of force by 180°."
      }
    },
    "explore-experiment": {
      "activityTitle": "Electromagnet Solenoid Field Simulator",
      "objective": "Vary coil turn count and current to observe magnetic field strength and iron core magnetization.",
      "instructions": "Slide turn count and current to watch magnetic field density expand.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "turns",
          "label": "Coil Turns n",
          "description": "Number of wire windings",
          "min": 50,
          "max": 1000,
          "step": 50,
          "defaultValue": 200,
          "unit": "turns"
        },
        {
          "id": "current",
          "label": "Current I (A)",
          "description": "Electrical current through coil",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "A"
        }
      ],
      "guidingQuestions": [
        "Does doubling current have the same effect as doubling coil turn count?"
      ],
      "whatToObserve": [
        "Yes, magnetic field strength B is directly proportional to the product n · I."
      ],
      "takeawayInsight": "Current and winding density compound linearly to create powerful magnetic fields."
    }
  }
},

  // =========================================================================
  // PHYSICS: Work, Mechanical Energy & Power
  // =========================================================================
  {
  "id": "phys-work-energy-power",
  "slug": "work-energy-power",
  "title": "Work, Mechanical Energy & Power",
  "subtitle": "W = F·s·cos θ, kinetic/potential energy, conservation laws, and efficiency",
  "subjectId": "physics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Work is done when a force produces displacement along its line of action: W = F·s·cos θ. The work-energy theorem establishes that net work equals change in kinetic energy (½mv²), conserving mechanical energy in conservative fields.",
  "whyItMatters": "Governs roller coaster physics, hydroelectric dam power generation, automotive braking distances, and rocket launch energetics.",
  "learningObjectives": [
    "Calculate mechanical work W = F·s·cos θ under positive, negative, and zero work conditions.",
    "Derive kinetic energy KE = ½mv² and gravitational potential energy PE = mgh.",
    "Verify the law of conservation of mechanical energy in free fall and pendulum swings."
  ],
  "coreQuestions": [
    "Why does carrying a load horizontally at constant speed perform zero physical work against gravity?",
    "How does doubling vehicle speed quadruple required braking distance?"
  ],
  "prerequisites": [
    "Newton’s second law",
    "Kinematic motion equations"
  ],
  "keyTerms": [
    {
      "term": "Joule (J)",
      "definition": "The SI unit of work done when a force of 1 Newton moves an object through 1 metre."
    },
    {
      "term": "Conservation of Mechanical Energy",
      "definition": "In the absence of non-conservative dissipative forces, KE + PE = Constant."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Energy is the universal currency of physical transformations, conserved across all physical interactions.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Scientific Definition of Work",
          "subtitle": "W = F·s·cos θ and work conditions",
          "paragraphs": [
            "In physics, work requires both an applied force and displacement with a component along the force direction: W = F·s·cos θ. If θ = 0°, W = F·s (positive work). If θ = 90°, W = 0 (zero work, e.g. planetary orbits or porter carrying load). If θ = 180°, work is negative (e.g. friction)."
          ],
          "bulletPoints": [
            "Work-Energy Theorem: W_net = ΔKE = ½mv² - ½mu².",
            "Gravitational potential energy near Earth: PE = mgh."
          ],
          "callout": {
            "type": "axiom",
            "title": "Work Invariant",
            "text": "Forces perpendicular to displacement perform zero work and cannot alter an object’s speed."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Mechanical Energy Conservation and Power",
          "subtitle": "Kinetic and potential energy exchange",
          "paragraphs": [
            "For a freely falling body, loss in potential energy equals gain in kinetic energy: mgh = ½mv², giving impact velocity v = √(2gh). Power is the rate of doing work: P = W/t = F·v (Watts). 1 Horsepower = 746 Watts."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Work is done only when displacement has a non-zero component along the force vector.",
        "Total mechanical energy KE + PE remains constant in conservative fields."
      ],
      "reflectionPrompt": "Why does doubling a car’s speed quadruple the stopping distance when the braking force is constant?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Pendulum Energy Interchange",
      "caption": "Continuous exchange between gravitational potential energy and kinetic energy.",
      "diagramTitle": "Conservative Energy Interchange in a Simple Pendulum",
      "diagramDescription": "Pendulum bob at peak height (100% PE, 0% KE) converting to bottom equilibrium (0% PE, 100% KE).",
      "components": [
        {
          "id": "c1",
          "name": "Peak Amplitude Position",
          "role": "Maximum potential energy",
          "description": "Velocity v = 0; PE = mgh is maximum."
        },
        {
          "id": "c2",
          "name": "Equilibrium Bottom",
          "role": "Maximum kinetic energy",
          "description": "Height h = 0; KE = ½mv² is maximum with v = √(2gh)."
        },
        {
          "id": "c3",
          "name": "Intermediate Positions",
          "role": "Shared energy",
          "description": "Continuous sum KE + PE = Total Mechanical Energy."
        }
      ],
      "visualSummary": "Gravitational potential energy transforms seamlessly into kinetic velocity without energy loss."
    },
    "examples-applications": {
      "overview": "Hydroelectric pumped storage reservoirs and roller coaster track profiling.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Hydroelectric Power Output",
          "difficulty": "Foundational",
          "contextOrPrompt": "A dam drops 2000 kg of water per second through a vertical head height of 50 m. If turbine efficiency is 80%, find electrical power output.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate gravitational potential energy per second (input power)",
              "work": "P_in = mgh / t = (2000 kg/s) · (9.8 m/s²) · (50 m) = 980,000 Watts (980 kW)."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply 80% generator efficiency",
              "work": "P_out = 0.80 · 980 kW = 784 kW."
            }
          ],
          "finalResult": "Electrical power output is 784 kilowatts.",
          "verificationTip": "Power is energy per unit time; mass flow rate (m/t) can be substituted directly into mgh/t."
        }
      ],
      "applications": [
        {
          "domain": "Renewable Hydro-Power",
          "title": "Pumped Hydroelectric Storage",
          "context": "Pumping water to mountain reservoirs during surplus solar hours and generating power at peak night demand.",
          "realWorldScenario": "Storing 10 gigawatt-hours of potential energy in high-altitude pumped reservoirs.",
          "impactMetric": "Eighty-two percent round-trip cycle energy storage efficiency."
        }
      ],
      "selfCheckExercise": {
        "question": "A force of 50 N acts on a cart moving it 10 m horizontally. If force is angled at 60° to the horizontal, find work done.",
        "hint": "W = F · s · cos 60°. cos 60° = 0.5.",
        "solution": "W = 50 · 10 · 0.5 = 250 Joules."
      }
    },
    "explore-experiment": {
      "activityTitle": "Mechanical Energy Roller Coaster Sandbox",
      "objective": "Vary starting drop height and cart mass to observe velocity at track bottom.",
      "instructions": "Slide drop height h to inspect kinetic energy and speed v = √(2gh).",
      "experimentType": "generic",
      "variables": [
        {
          "id": "height",
          "label": "Drop Height h (m)",
          "description": "Initial vertical elevation",
          "min": 5,
          "max": 100,
          "step": 5,
          "defaultValue": 20,
          "unit": "m"
        },
        {
          "id": "mass",
          "label": "Cart Mass m (kg)",
          "description": "Mass of roller coaster cart",
          "min": 100,
          "max": 1000,
          "step": 100,
          "defaultValue": 500,
          "unit": "kg"
        }
      ],
      "guidingQuestions": [
        "Does cart mass affect the bottom speed v in the absence of friction?"
      ],
      "whatToObserve": [
        "Mass cancels out: mgh = ½mv² => v = √(2gh); velocity depends purely on height."
      ],
      "takeawayInsight": "Gravitational acceleration accelerates all masses identically regardless of weight."
    }
  }
},

  // =========================================================================
  // PHYSICS: Universal Gravitation & Orbital Motion
  // =========================================================================
  {
  "id": "phys-gravitation-planetary",
  "slug": "gravitation-planetary",
  "title": "Universal Gravitation & Orbital Motion",
  "subtitle": "F = G(m₁m₂)/r², free fall acceleration g, and Keplerian orbital speeds",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Newton’s Law of Universal Gravitation states that every point mass attracts every other point mass with a force proportional to the product of their masses and inversely proportional to the square of distance: F = G·m₁m₂/r².",
  "whyItMatters": "Governs planetary orbits, tides, lunar landing Apollo trajectories, GPS satellite constellations, and exoplanet discovery.",
  "learningObjectives": [
    "State Newton’s Law of Universal Gravitation F = G·m₁m₂/r².",
    "Calculate gravitational acceleration g = GM/R² and analyze its variation with altitude and depth.",
    "Differentiate mass (invariant scalar) from weight (gravitational force W = mg)."
  ],
  "coreQuestions": [
    "Why do astronauts experience weightlessness in orbit even though gravity is 90% as strong as on Earth?",
    "How does the inverse-square law govern orbital periods?"
  ],
  "prerequisites": [
    "Circular motion",
    "Newton’s second law",
    "Vectors"
  ],
  "keyTerms": [
    {
      "term": "Universal Gravitational Constant (G)",
      "definition": "G = 6.674 × 10⁻¹¹ N·m²/kg², universal across all matter in the cosmos."
    },
    {
      "term": "Weightlessness",
      "definition": "The sensation of zero contact force when an object and its frame are in mutual free fall."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Newton unified the apple falling to Earth and the Moon orbiting overhead under a single universal gravitational force.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Universal Gravitation Law",
          "subtitle": "Inverse-square force F = G(m₁m₂)/r²",
          "paragraphs": [
            "Every two bodies in the universe attract with force F = G·(m₁m₂)/r², where G = 6.674 × 10⁻¹¹ N·m²/kg². For a body of mass m on Earth’s surface: mg = G·(M_e·m)/R_e², which yields surface acceleration g = G·M_e/R_e² ≈ 9.8 m/s²."
          ],
          "bulletPoints": [
            "Acceleration g is independent of falling body mass m.",
            "Mass is scalar quantity of matter (kg); weight is gravitational force (Newtons)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Inverse-Square Invariant",
            "text": "Doubling orbital distance reduces mutual gravitational attraction by a factor of 4."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Orbital Velocity and Free Fall",
          "subtitle": "Centripetal gravity balance v = √(GM/r)",
          "paragraphs": [
            "For a satellite in circular orbit at radius r, gravity provides centripetal acceleration: G·M·m/r² = m·v²/r, yielding orbital velocity v = √(GM/r). In orbit, the satellite is in perpetual free fall towards Earth, creating microgravity weightlessness."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Gravitational force follows an inverse-square distance relationship.",
        "Orbital motion is continuous free fall matching the curvature of the Earth."
      ],
      "reflectionPrompt": "If Earth’s mass doubled while its radius remained identical, what would happen to your weight?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Gravitational Field and Orbital Trajectory",
      "caption": "Newton’s cannonball thought experiment showing orbital trajectory matching Earth curvature.",
      "diagramTitle": "Circular Orbit Balance of Gravity and Inertia",
      "diagramDescription": "Earth at center with radial gravitational vector pulling orbiting satellite in circular trajectory.",
      "components": [
        {
          "id": "c1",
          "name": "Earth Mass (M)",
          "role": "Central attractor",
          "description": "Gravitational field origin."
        },
        {
          "id": "c2",
          "name": "Orbital Path (r)",
          "role": "Circular trajectory",
          "description": "Stable orbital radius where v = √(GM/r)."
        },
        {
          "id": "c3",
          "name": "Centripetal Force Vector",
          "role": "Inward pull",
          "description": "Gravitational attraction vector F_g directed to center."
        }
      ],
      "visualSummary": "A circular orbit occurs when forward velocity causes an object to fall around the curve of the Earth."
    },
    "examples-applications": {
      "overview": "Satellite communications constellations and interplanetary gravity assists.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Gravitational Acceleration on Mars",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Mars has mass 6.4 × 10²³ kg and radius 3.4 × 10⁶ m. Calculate surface gravity g on Mars.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply g = GM/R²",
              "work": "g = (6.674 × 10⁻¹¹) · (6.4 × 10²³) / (3.4 × 10⁶)²."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute denominator and numerator",
              "work": "Numerator = 4.271 × 10¹³; Denominator = 1.156 × 10¹³."
            },
            {
              "stepNumber": 3,
              "explanation": "Divide values",
              "work": "g = 4.271 / 1.156 ≈ 3.70 m/s²."
            }
          ],
          "finalResult": "Surface gravity on Mars is 3.70 m/s² (approx 38% of Earth’s gravity).",
          "verificationTip": "A 70 kg astronaut weighing 686 N on Earth weighs only 259 N on Mars."
        }
      ],
      "applications": [
        {
          "domain": "Astronautics",
          "title": "Low Earth Orbit Satellite Maintenance",
          "context": "Calculating orbital velocity for International Space Station at 400 km altitude.",
          "realWorldScenario": "Maintaining 7.66 km/s orbital speed to balance atmospheric drag decay.",
          "impactMetric": "Ninety-two minute orbital period per Earth revolution."
        }
      ],
      "selfCheckExercise": {
        "question": "If distance between two bodies is tripled, by what factor does gravitational force change?",
        "hint": "Use inverse-square relationship F ∝ 1/r².",
        "solution": "Force becomes 1/(3)² = 1/9 of its original value."
      }
    },
    "explore-experiment": {
      "activityTitle": "Orbital Mechanics & Gravitation Simulator",
      "objective": "Vary orbital altitude to observe how orbital speed and period change.",
      "instructions": "Slide orbital altitude to see speed drop and orbital period lengthen.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "altitude",
          "label": "Orbital Altitude h (km)",
          "description": "Height above Earth surface",
          "min": 200,
          "max": 36000,
          "step": 200,
          "defaultValue": 400,
          "unit": "km"
        }
      ],
      "guidingQuestions": [
        "At geostationary altitude (35,786 km), what is the satellite orbital period?"
      ],
      "whatToObserve": [
        "At 35,786 km, orbital period reaches exactly 24.0 hours, matching Earth’s rotation."
      ],
      "takeawayInsight": "Orbital speed decreases with altitude while period increases under Kepler’s laws."
    }
  }
},

  // =========================================================================
  // PHYSICS: Sound Waves: Frequency, Echoes & Resonance
  // =========================================================================
  {
  "id": "phys-sound-wave-properties",
  "slug": "sound-wave-properties",
  "title": "Sound Waves: Frequency, Echoes & Resonance",
  "subtitle": "Longitudinal compression waves, speed v = f·λ, echoes, and auditory thresholds",
  "subjectId": "physics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Sound is a mechanical longitudinal wave requiring a material medium for propagation. Successive compressions and rarefactions advance with wave speed v = f·λ. Reflection produces echoes and acoustic resonance.",
  "whyItMatters": "Essential for medical ultrasound diagnostics, sonar submarine navigation, architectural concert hall acoustics, and noise-cancelling headphones.",
  "learningObjectives": [
    "Explain longitudinal wave propagation via compressions and rarefactions.",
    "Apply the wave relationship v = f·λ to calculate wavelength and frequency.",
    "Determine echo reflection conditions (minimum 17.2 m obstacle distance in air)."
  ],
  "coreQuestions": [
    "Why can sound waves not travel through a cosmic vacuum?",
    "Why is a minimum distance of 17.2 m required to perceive a distinct echo?"
  ],
  "prerequisites": [
    "Kinematics speed = distance/time",
    "Basic wave concepts"
  ],
  "keyTerms": [
    {
      "term": "Longitudinal Wave",
      "definition": "A wave in which medium particles oscillate parallel to the direction of wave propagation."
    },
    {
      "term": "Echo",
      "definition": "The repetition of sound caused by reflection from an obstacle, heard after persistence of hearing (0.1 s)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Sound propagates as mechanical pressure pulses through colliding particles in elastic media.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Wave Nature and Velocity Invariants",
          "subtitle": "v = f·λ and medium dependence",
          "paragraphs": [
            "Sound requires a deformable elastic medium to propagate. Particles oscillate back and forth about their equilibrium positions, forming alternating high-pressure compressions and low-pressure rarefactions. Wave speed v = f·λ depends on medium elasticity and density: fastest in solids (~5000 m/s in steel), intermediate in liquids (~1500 m/s in water), slowest in air (~340 m/s)."
          ],
          "bulletPoints": [
            "Human audible frequency range: 20 Hz to 20,000 Hz.",
            "Infrasound: < 20 Hz (earthquakes); Ultrasound: > 20,000 Hz (bats, SONAR, medical scans)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Medium Elasticity Invariant",
            "text": "Sound velocity increases with medium bulk modulus; sound cannot propagate across empty vacuum."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Echoes and Acoustic Reflection",
          "subtitle": "The 0.1-second human persistence threshold",
          "paragraphs": [
            "Human auditory sensation persists in the brain for 0.1 seconds (persistence of hearing). For a distinct echo to be heard, reflected sound must arrive at least 0.1 s after the original sound: Total distance 2d = v · t => d = (343 m/s × 0.1 s) / 2 ≈ 17.2 metres minimum distance to reflecting wall."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Sound travels via longitudinal compressions and rarefactions.",
        "Distinct echoes require a minimum obstacle distance of 17.2 m in standard air."
      ],
      "reflectionPrompt": "Why does an empty room sound echoey, while adding carpets and curtains eliminates reverberation?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Compressions, Rarefactions and Wave Pressure",
      "caption": "Microscopic particle density oscillations corresponding to pressure peaks and troughs.",
      "diagramTitle": "Acoustic Pressure Wavefront Geometry",
      "diagramDescription": "Piston vibrating horizontally producing dense compression bands and spaced rarefaction bands.",
      "components": [
        {
          "id": "c1",
          "name": "Compression Region",
          "role": "High density peak",
          "description": "Particles pushed close together; peak acoustic pressure."
        },
        {
          "id": "c2",
          "name": "Rarefaction Region",
          "role": "Low density trough",
          "description": "Particles spread apart; minimum acoustic pressure."
        },
        {
          "id": "c3",
          "name": "Wavelength (λ)",
          "role": "Spatial period",
          "description": "Distance between two consecutive compression centers."
        }
      ],
      "visualSummary": "Particle oscillations transfer kinetic energy down the line without transporting matter."
    },
    "examples-applications": {
      "overview": "Marine SONAR depth sounders and medical obstetric ultrasound.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Determining Ocean Depth via SONAR Echo",
          "difficulty": "Foundational",
          "contextOrPrompt": "A research ship sends a SONAR pulse into the ocean. The reflected signal returns after 2.4 seconds. If sound speed in seawater is 1500 m/s, find ocean depth.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Recognize round-trip echo path",
              "work": "2 · depth = speed × time."
            },
            {
              "stepNumber": 2,
              "explanation": "Solve for depth d",
              "work": "d = (v · t) / 2 = (1500 m/s × 2.4 s) / 2 = 3600 / 2 = 1800 m."
            }
          ],
          "finalResult": "Ocean floor depth is exactly 1,800 metres.",
          "verificationTip": "Always divide by 2 when calculating obstacle distance from round-trip echo times."
        }
      ],
      "applications": [
        {
          "domain": "Medical Diagnostics",
          "title": "Obstetric Ultrasound Imaging",
          "context": "Imaging fetal anatomy using high-frequency 3.5 MHz ultrasound pulse reflections.",
          "realWorldScenario": "Deducing amniotic fluid boundaries from tissue acoustic impedance mismatches.",
          "impactMetric": "Sub-millimetre spatial tissue imaging resolution."
        }
      ],
      "selfCheckExercise": {
        "question": "A sound wave has frequency 500 Hz and speed 340 m/s. What is its wavelength?",
        "hint": "Use λ = v / f.",
        "solution": "λ = 340 / 500 = 0.68 metres (68 cm)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Acoustic Wave & Echo Simulator",
      "objective": "Vary wall obstacle distance and observe whether human hearing can resolve a distinct echo.",
      "instructions": "Slide wall distance to observe time delay and echo resolution status.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "dist",
          "label": "Wall Distance d (m)",
          "description": "Distance to reflecting obstacle",
          "min": 5,
          "max": 50,
          "step": 1,
          "defaultValue": 25,
          "unit": "m"
        },
        {
          "id": "temp",
          "label": "Air Temperature (°C)",
          "description": "Governs sound speed v = 331 + 0.6T",
          "min": -10,
          "max": 40,
          "step": 5,
          "defaultValue": 20,
          "unit": "°C"
        }
      ],
      "guidingQuestions": [
        "What occurs when wall distance is set to 10 m at 20°C?"
      ],
      "whatToObserve": [
        "Delay is only 0.058 s (< 0.1 s), producing blended reverberation rather than a distinct echo."
      ],
      "takeawayInsight": "The 0.1-second cognitive threshold dictates the boundary between reverberation and distinct echo."
    }
  }
},

  // =========================================================================
  // PHYSICS: Heat Transfer & Specific Heat Capacity
  // =========================================================================
  {
  "id": "phys-heat-thermodynamics",
  "slug": "heat-thermodynamics",
  "title": "Heat Transfer & Specific Heat Capacity",
  "subtitle": "Conduction, convection, radiation, Q = mcΔT, and latent heat of fusion",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Thermal energy transfers spontaneously from regions of higher temperature to lower temperature via conduction, convection, and radiation. Thermal absorption Q = mcΔT and latent heat Q = mL govern heating curves and phase changes.",
  "whyItMatters": "Governs climate ocean heat moderation, car engine coolant system design, architectural building insulation, and spacecraft thermal heat shields.",
  "learningObjectives": [
    "Differentiate conduction (solids), convection (fluids), and radiation (electromagnetic waves).",
    "Apply heat capacity equation Q = mcΔT and principle of mixtures Q_lost = Q_gained.",
    "Analyze phase change transitions at constant temperature using latent heat Q = mL."
  ],
  "coreQuestions": [
    "Why does temperature remain constant during phase changes even while heat is supplied?",
    "Why does water’s high specific heat capacity moderate coastal maritime climates?"
  ],
  "prerequisites": [
    "Temperature scales (Celsius, Kelvin)",
    "Conservation of energy"
  ],
  "keyTerms": [
    {
      "term": "Specific Heat Capacity (c)",
      "definition": "The heat energy required to raise the temperature of 1 kg of a substance by 1 Kelvin (or 1°C)."
    },
    {
      "term": "Latent Heat (L)",
      "definition": "The heat absorbed or released during a phase change without any change in temperature."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Heat is thermal energy in transit across a boundary driven by a temperature differential.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Specific Heat Capacity and Thermal Inertia",
          "subtitle": "Q = mcΔT and water’s high capacity",
          "paragraphs": [
            "The quantity of heat absorbed by mass m to undergo temperature change ΔT is Q = mcΔT. Water has an unusually high specific heat capacity (4184 J/kg·K), meaning it absorbs enormous heat energy with minimal temperature rise, acting as a global climatic thermal buffer."
          ],
          "bulletPoints": [
            "Principle of Mixtures: In an insulated calorimeter, Heat Lost = Heat Gained.",
            "Calorie to Joule conversion: 1 cal ≈ 4.184 Joules."
          ],
          "callout": {
            "type": "axiom",
            "title": "Calorimetric Invariant",
            "text": "Total thermal energy is conserved in isolated mixing systems: ∑Q_i = 0."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Latent Heat and Phase Changes",
          "subtitle": "Constant temperature during melting and boiling",
          "paragraphs": [
            "During melting or boiling, supplied heat energy does not increase kinetic vibrational temperature; instead, it performs work breaking intermolecular crystal or liquid bonds: Q = mL. For water, latent heat of fusion L_f = 334 kJ/kg; latent heat of vaporization L_v = 2260 kJ/kg."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Temperature measures average kinetic energy; heat is total thermal energy transferred.",
        "During phase changes, latent heat breaks molecular bonds at invariant temperature."
      ],
      "reflectionPrompt": "Why does steam at 100°C cause significantly more severe burns than liquid water at 100°C?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Heating Curve and Phase Plateaus",
      "caption": "Temperature-time graph showing flat plateaus during melting and boiling transitions.",
      "diagramTitle": "Water Phase Transition Calorimetry Curve",
      "diagramDescription": "Graph rising from ice (-20°C) to melting plateau (0°C), liquid slope to boiling plateau (100°C), and steam slope.",
      "components": [
        {
          "id": "c1",
          "name": "Melting Plateau (0°C)",
          "role": "Latent heat of fusion",
          "description": "Phase change: ice to water; Q = m·L_f at constant 0°C."
        },
        {
          "id": "c2",
          "name": "Liquid Heating Slope",
          "role": "Sensible heat",
          "description": "Temperature rise: Q = m·c_w·ΔT with c_w = 4184 J/kg·K."
        },
        {
          "id": "c3",
          "name": "Boiling Plateau (100°C)",
          "role": "Latent heat of vaporization",
          "description": "Phase change: water to steam; Q = m·L_v at constant 100°C."
        }
      ],
      "visualSummary": "Thermal plateaus represent pure intermolecular bond breaking with zero temperature increase."
    },
    "examples-applications": {
      "overview": "Nuclear power plant steam turbine loops and thermal building insulation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Mixing Hot Water with Cold Water",
          "difficulty": "Intermediate",
          "contextOrPrompt": "100 g of water at 80°C is mixed with 200 g of water at 20°C in an insulated cup. Find final equilibrium temperature T.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply Principle of Mixtures: Heat Lost = Heat Gained",
              "work": "m₁·c·(80 - T) = m₂·c·(T - 20)."
            },
            {
              "stepNumber": 2,
              "explanation": "Cancel specific heat c and solve for T",
              "work": "100(80 - T) = 200(T - 20) => 80 - T = 2(T - 20) => 80 - T = 2T - 40."
            },
            {
              "stepNumber": 3,
              "explanation": "Isolate T",
              "work": "3T = 120 => T = 40°C."
            }
          ],
          "finalResult": "The equilibrium mixture temperature is exactly 40.0°C.",
          "verificationTip": "Notice the temperature change is inversely proportional to mass: cold water mass is 2x larger, so its ΔT is half as big."
        }
      ],
      "applications": [
        {
          "domain": "Automotive Engineering",
          "title": "Engine Cooling Radiator Sizing",
          "context": "Circulating water-glycol coolant mixtures to remove combustion heat from internal combustion cylinder blocks.",
          "realWorldScenario": "Dissipating 50 kW of waste thermal heat through aluminum radiator matrix airflow.",
          "impactMetric": "Maintenance of engine block core temperature at 90°C ± 2°C."
        }
      ],
      "selfCheckExercise": {
        "question": "How much heat is required to convert 2 kg of ice at 0°C into water at 0°C? (L_f = 3.34 × 10⁵ J/kg).",
        "hint": "Apply Q = m · L_f.",
        "solution": "Q = 2 · (3.34 × 10⁵) = 6.68 × 10⁵ Joules (668 kJ)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Thermal Mixing & Calorimetry Sandbox",
      "objective": "Vary masses and initial temperatures of two fluids to observe final equilibrium temperature.",
      "instructions": "Slide mass and temperature of hot and cold fluids to watch thermal equilibrium reach balance.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "m_hot",
          "label": "Hot Water Mass (g)",
          "description": "Mass of hot liquid",
          "min": 50,
          "max": 500,
          "step": 50,
          "defaultValue": 100,
          "unit": "g"
        },
        {
          "id": "t_hot",
          "label": "Hot Water Temp (°C)",
          "description": "Initial temperature of hot liquid",
          "min": 50,
          "max": 100,
          "step": 5,
          "defaultValue": 80,
          "unit": "°C"
        },
        {
          "id": "m_cold",
          "label": "Cold Water Mass (g)",
          "description": "Mass of cold liquid",
          "min": 50,
          "max": 500,
          "step": 50,
          "defaultValue": 200,
          "unit": "g"
        }
      ],
      "guidingQuestions": [
        "What happens to equilibrium temperature when cold water mass is ten times the hot water mass?"
      ],
      "whatToObserve": [
        "Equilibrium temperature drops to near the cold water starting value due to thermal mass dominance."
      ],
      "takeawayInsight": "Thermal equilibrium is a weighted average governed by the heat capacities of participating masses."
    }
  }
},

  // =========================================================================
  // PHYSICS: Fluid Pressure & Archimedes’ Principle
  // =========================================================================
  {
  "id": "phys-fluid-pressure-buoyancy",
  "slug": "fluid-pressure-buoyancy",
  "title": "Fluid Pressure & Archimedes’ Principle",
  "subtitle": "Hydrostatic pressure P = ρgh, Pascal’s principle, and buoyant upthrust",
  "subjectId": "physics",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Fluids exert pressure equally in all directions, increasing linearly with depth according to P = ρgh. Archimedes’ Principle establishes that an object immersed in fluid experiences an upward buoyant force equal to the weight of displaced fluid.",
  "whyItMatters": "Underpins submarine dive tanks, hydraulic brakes and jacks, cargo ship flotation, hot air balloons, and scuba diving decompression tables.",
  "learningObjectives": [
    "Calculate hydrostatic pressure P = ρgh at depth h in liquids.",
    "Apply Pascal’s principle F₁/A₁ = F₂/A₂ in hydraulic force multiplication.",
    "State Archimedes’ principle and analyze the laws of flotation."
  ],
  "coreQuestions": [
    "Why does hydrostatic pressure depend strictly on vertical depth and not on container shape?",
    "How can an aircraft carrier weighing 100,000 tons float while a tiny steel coin sinks?"
  ],
  "prerequisites": [
    "Density = mass/volume",
    "Newton’s laws of motion"
  ],
  "keyTerms": [
    {
      "term": "Pascal’s Principle",
      "definition": "Pressure applied to an enclosed fluid is transmitted undiminished to every portion of fluid and container walls."
    },
    {
      "term": "Archimedes’ Principle",
      "definition": "Upward buoyant force equals the weight of the fluid displaced by the submerged body: F_b = ρ_f · V_sub · g."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Fluid statics describes how pressure isotropic distributed forces balance gravity in liquids and gases.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Hydrostatic Pressure and Pascal’s Principle",
          "subtitle": "P = ρgh and hydraulic multiplication",
          "paragraphs": [
            "The weight of a column of fluid of density ρ, cross-section A, and height h exerts downward force F = m·g = (ρAh)g. Pressure P = F/A = ρgh. By Pascal’s principle, pressure is transmitted equally: F₁/A₁ = F₂/A₂, allowing a small force on small piston A₁ to lift a massive load on large piston A₂."
          ],
          "bulletPoints": [
            "Hydrostatic paradox: Pressure depends only on depth h, not on container geometry.",
            "Atmospheric pressure at sea level: P_atm ≈ 101.3 kPa ≈ 760 mm of mercury."
          ],
          "callout": {
            "type": "axiom",
            "title": "Pascal’s Transmission Invariant",
            "text": "Incompressible fluids conserve pressure, creating mechanical force advantage F₂ = F₁(A₂/A₁)."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Archimedes’ Principle and Flotation",
          "subtitle": "Buoyant force F_b = ρ_fluid · V_displaced · g",
          "paragraphs": [
            "Because pressure is higher at the bottom of a submerged object than at the top, a net upward force emerges: Upthrust F_b = Weight of displaced fluid. If F_b > Weight, object accelerates upward; if F_b = Weight, object floats in equilibrium; if F_b < Weight, object sinks."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Fluid pressure increases linearly with depth (P = ρgh).",
        "An object floats when it displaces an amount of fluid whose weight equals its total weight."
      ],
      "reflectionPrompt": "Why does an iron ship float while a solid iron block sinks in water?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Hydraulic Press and Buoyancy Balance",
      "caption": "Pascal force multiplication on dual pistons and upward buoyant vector.",
      "diagramTitle": "Hydrostatic Pressure & Buoyant Displacement",
      "diagramDescription": "Piston A₁ transmitting pressure P across hydraulic oil to larger piston A₂; submerged cube showing vertical pressure differential.",
      "components": [
        {
          "id": "c1",
          "name": "Input Piston A₁",
          "role": "Control actuator",
          "description": "Small cross-section generating pressure P = F₁/A₁."
        },
        {
          "id": "c2",
          "name": "Output Piston A₂",
          "role": "Load lifter",
          "description": "Large cross-section generating amplified force F₂ = P · A₂."
        },
        {
          "id": "c3",
          "name": "Submerged Body",
          "role": "Buoyancy target",
          "description": "Net upthrust vector F_b = F_bottom - F_top."
        }
      ],
      "visualSummary": "Differential depth pressure produces buoyant upthrust equal to the displaced fluid weight."
    },
    "examples-applications": {
      "overview": "Submarine ballast tanks and automotive hydraulic disc braking systems.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Force Multiplication in a Hydraulic Car Lift",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A hydraulic lift has a small piston of radius 5 cm and a large piston of radius 20 cm. Find the force needed to lift a 2000 kg car.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate car weight on output piston",
              "work": "F₂ = m·g = 2000 kg × 9.8 m/s² = 19,600 N."
            },
            {
              "stepNumber": 2,
              "explanation": "Calculate area ratio A₂ / A₁",
              "work": "A₂ / A₁ = (r₂ / r₁)² = (20 / 5)² = 4² = 16."
            },
            {
              "stepNumber": 3,
              "explanation": "Apply Pascal’s principle F₁ = F₂ / (A₂/A₁)",
              "work": "F₁ = 19,600 N / 16 = 1,225 N."
            }
          ],
          "finalResult": "A modest force of 1,225 N (equivalent to ~125 kg mass) lifts the 2,000 kg vehicle.",
          "verificationTip": "Force multiplication scales with the square of the piston radius ratio (r₂/r₁)²"
        }
      ],
      "applications": [
        {
          "domain": "Marine Architecture",
          "title": "Submarine Buoyancy Ballast Control",
          "context": "Pumping compressed air into ballast tanks to displace seawater and achieve positive buoyancy for surfacing.",
          "realWorldScenario": "Surfacing a 6000-ton naval submarine from 200 m operating depth.",
          "impactMetric": "Sub-minute positive buoyancy displacement transition."
        }
      ],
      "selfCheckExercise": {
        "question": "A solid cube of wood of volume 0.002 m³ floats in water with 60% of its volume submerged. What is the buoyant force? (ρ_w = 1000 kg/m³).",
        "hint": "V_sub = 0.60 × 0.002 = 0.0012 m³. F_b = ρ_w · V_sub · g.",
        "solution": "F_b = 1000 × 0.0012 × 9.8 = 11.76 Newtons."
      }
    },
    "explore-experiment": {
      "activityTitle": "Hydraulic Press & Buoyancy Sandbox",
      "objective": "Vary fluid density and submerged volume to observe buoyant upthrust and flotation equilibrium.",
      "instructions": "Slide fluid density and object density to see whether the object sinks, floats, or balances.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "rho_fluid",
          "label": "Fluid Density (kg/m³)",
          "description": "Density of liquid (Water = 1000, Mercury = 13600)",
          "min": 700,
          "max": 2000,
          "step": 100,
          "defaultValue": 1000,
          "unit": "kg/m³"
        },
        {
          "id": "rho_obj",
          "label": "Object Density (kg/m³)",
          "description": "Density of solid material",
          "min": 200,
          "max": 2500,
          "step": 100,
          "defaultValue": 800,
          "unit": "kg/m³"
        }
      ],
      "guidingQuestions": [
        "What fraction of the object is submerged when object density is 800 kg/m³ in water (1000 kg/m³)?"
      ],
      "whatToObserve": [
        "Submerged fraction is exactly equal to the density ratio: 800/1000 = 80% submerged."
      ],
      "takeawayInsight": "The submerged fraction of a floating body equals the ratio of its density to fluid density."
    }
  }
},

  // =========================================================================
  // PHYSICS: Kinematics: 1D Motion & Graphs
  // =========================================================================
  {
  "id": "phys-motion-kinematics",
  "slug": "motion-kinematics",
  "title": "Kinematics: 1D Motion & Graphs",
  "subtitle": "Distance vs displacement, velocity-time curves, and kinematic equations of motion",
  "subjectId": "physics",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Kinematics describes motion without considering its causes. Displacement, velocity, and acceleration are related through the three kinematic equations: v = u + at, s = ut + ½at², and v² = u² + 2as under uniform acceleration.",
  "whyItMatters": "Essential for automotive crash safety crumple zone design, air traffic takeoff/landing runway length calculation, and railway braking signals.",
  "learningObjectives": [
    "Differentiate scalar distance and speed from vector displacement and velocity.",
    "Interpret gradient (acceleration) and area under curve (displacement) on velocity-time graphs.",
    "Solve motion problems using the three equations of uniformly accelerated motion."
  ],
  "coreQuestions": [
    "Why does the area under a velocity-time graph represent total displacement?",
    "How can an object have zero velocity while undergoing non-zero acceleration?"
  ],
  "prerequisites": [
    "Linear graphing",
    "Slope calculation",
    "Basic algebra"
  ],
  "keyTerms": [
    {
      "term": "Velocity",
      "definition": "The rate of change of displacement with respect to time; a vector quantity."
    },
    {
      "term": "Acceleration",
      "definition": "The rate of change of velocity with respect to time: a = (v - u)/t."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Kinematics provides the geometric and differential language to describe the trajectories of bodies through space.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Displacement and Velocity Vectors",
          "subtitle": "Scalars vs vectors in one dimension",
          "paragraphs": [
            "Distance is total path length traveled (scalar); displacement is the straight-line vector from initial to final position. Average velocity is displacement divided by elapsed time: v_avg = Δs/Δt. Acceleration is the rate of change of velocity: a = (v - u)/t."
          ],
          "bulletPoints": [
            "v = u + at (velocity from acceleration).",
            "s = ut + ½at² (displacement from time).",
            "v² = u² + 2as (velocity from displacement)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Calculus Connection",
            "text": "Velocity is the time derivative of displacement (v = ds/dt); acceleration is the time derivative of velocity (a = dv/dt)."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Graphical Analysis of Motion",
          "subtitle": "Slope and area under v-t curves",
          "paragraphs": [
            "On a displacement-time graph, the slope represents velocity. On a velocity-time graph: (1) The slope represents instantaneous acceleration, and (2) The total area under the curve represents the net displacement traveled during the interval."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The three kinematic equations apply strictly when acceleration is constant.",
        "Area under velocity-time graph equals displacement; slope equals acceleration."
      ],
      "reflectionPrompt": "At the very peak of its flight, a ball thrown vertically has zero velocity. Is its acceleration also zero?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Velocity-Time Graphs and Area Integration",
      "caption": "Decomposing area under v-t graph into rectangle (ut) and triangle (½at²).",
      "diagramTitle": "Graphical Derivation of s = ut + ½at²",
      "diagramDescription": "Velocity ramp from u to v over time t divided into bottom rectangle of area ut and upper triangle of area ½(v-u)t.",
      "components": [
        {
          "id": "c1",
          "name": "Initial Velocity Bar (u)",
          "role": "Base speed",
          "description": "Starting velocity coordinate on vertical axis."
        },
        {
          "id": "c2",
          "name": "Rectangle Area (ut)",
          "role": "Uniform displacement",
          "description": "Displacement if velocity had remained constant at u."
        },
        {
          "id": "c3",
          "name": "Triangle Area (½at²)",
          "role": "Accelerated displacement",
          "description": "Additional displacement gained from acceleration."
        }
      ],
      "visualSummary": "The total area under the linear velocity ramp directly proves s = ut + ½at²."
    },
    "examples-applications": {
      "overview": "Airport runway takeoff run calculations and high-speed train braking limits.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Runway Length for Aircraft Takeoff",
          "difficulty": "Foundational",
          "contextOrPrompt": "An airliner accelerates uniformly from rest (u = 0) at 3.0 m/s² until reaching takeoff speed of 75 m/s. Find minimum runway distance required.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Select equation linking u, v, a, and s",
              "work": "Use v² = u² + 2as."
            },
            {
              "stepNumber": 2,
              "explanation": "Substitute known values and solve for s",
              "work": "(75)² = 0² + 2(3.0)s => 5625 = 6.0s => s = 5625 / 6.0 = 937.5 m."
            }
          ],
          "finalResult": "Minimum runway distance required is 937.5 metres.",
          "verificationTip": "Use v² = u² + 2as when elapsed time t is unknown."
        }
      ],
      "applications": [
        {
          "domain": "Automotive Safety",
          "title": "Autonomous Emergency Braking (AEB)",
          "context": "Calculating radar-triggered stopping distance under maximum decelerations of 8.0 m/s².",
          "realWorldScenario": "Initiating emergency stop from 100 km/h (27.8 m/s) to avoid pedestrian collision.",
          "impactMetric": "Sub-40-metre complete vehicle stopping distance."
        }
      ],
      "selfCheckExercise": {
        "question": "A car starting from rest accelerates at 2 m/s² for 5 seconds. Find its final speed and distance traveled.",
        "hint": "v = u + at and s = ut + ½at² with u = 0.",
        "solution": "v = 0 + 2(5) = 10 m/s; s = 0 + ½(2)(5)² = 25 metres."
      }
    },
    "explore-experiment": {
      "activityTitle": "Kinematic 1D Motion Sandbox",
      "objective": "Vary acceleration and initial velocity to observe velocity ramp and displacement parabola.",
      "instructions": "Slide initial velocity u and acceleration a to watch distance curve bend upward.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "u",
          "label": "Initial Velocity u (m/s)",
          "description": "Starting speed",
          "min": 0,
          "max": 30,
          "step": 5,
          "defaultValue": 10,
          "unit": "m/s"
        },
        {
          "id": "a",
          "label": "Acceleration a (m/s²)",
          "description": "Rate of velocity change",
          "min": -5,
          "max": 10,
          "step": 1,
          "defaultValue": 2,
          "unit": "m/s²"
        },
        {
          "id": "t",
          "label": "Time t (s)",
          "description": "Elapsed duration",
          "min": 1,
          "max": 15,
          "step": 1,
          "defaultValue": 5,
          "unit": "s"
        }
      ],
      "guidingQuestions": [
        "If acceleration is negative (-2 m/s²) with u = 10 m/s, when does the object stop?"
      ],
      "whatToObserve": [
        "Object stops when v = 0 = 10 - 2t, which occurs at t = 5 seconds."
      ],
      "takeawayInsight": "Kinematic equations model past, present, and future positions with continuous algebraic precision."
    }
  }
},

  // =========================================================================
  // PHYSICS: Radioactivity & Nuclear Physics
  // =========================================================================
  {
  "id": "phys-radioactivity-nuclear",
  "slug": "radioactivity-nuclear",
  "title": "Radioactivity & Nuclear Physics",
  "subtitle": "Alpha, beta, gamma decay, half-life N(t) = N₀(½)^(t/T), and mass-energy E = mc²",
  "subjectId": "physics",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Radioactivity is the spontaneous disintegration of unstable atomic nuclei accompanied by ionizing emissions: alpha particles (He²⁺), beta particles (high-speed electrons), and gamma rays (photons). Half-life and Einstein’s mass-energy equation E = mc² govern nuclear reactions.",
  "whyItMatters": "Drives nuclear fission power reactors, cancer radiotherapy, carbon-14 archaeological dating, and deep-space radioisotope thermoelectric generators (RTGs).",
  "learningObjectives": [
    "Differentiate alpha (α), beta (β), and gamma (γ) emissions by charge, mass, and penetration power.",
    "Calculate remaining radioactive parent nuclei using half-life decay equations.",
    "Explain mass defect and energy release in nuclear fission and fusion via E = Δm·c²."
  ],
  "coreQuestions": [
    "Why does gamma radiation possess vastly higher penetration power than alpha particles?",
    "How does a tiny mass defect produce gigajoules of thermal energy in fission?"
  ],
  "prerequisites": [
    "Atomic structure (protons, neutrons, electrons)",
    "Isotopes"
  ],
  "keyTerms": [
    {
      "term": "Half-Life (T_½)",
      "definition": "The time required for half the radioactive nuclei in a sample to undergo decay."
    },
    {
      "term": "Mass Defect (Δm)",
      "definition": "The difference between the mass of an intact nucleus and the sum of its individual constituent nucleons."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Radioactivity originates within the subatomic domain where the strong nuclear force contends with electrostatic repulsion.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Three Nuclear Radiations",
          "subtitle": "Alpha, Beta, and Gamma characteristics",
          "paragraphs": [
            "Alpha (α) particles are helium nuclei (⁴₂He²⁺) with high ionizing power and low penetration (stopped by paper). Beta (β⁻) particles are high-speed electrons emitted when a neutron converts to a proton, with moderate penetration (stopped by aluminium). Gamma (γ) rays are high-energy photons with zero charge and mass, possessing extreme penetration (requiring thick lead shielding)."
          ],
          "bulletPoints": [
            "Alpha decay reduces mass number by 4 and atomic number by 2: ᴬ_Z X → ᴬ⁻⁴_{Z-2} Y + ⁴₂He.",
            "Beta decay keeps mass number constant and increases atomic number by 1: ᴬ_Z X → ᴬ_{Z+1} Y + ⁰₋₁e."
          ],
          "callout": {
            "type": "axiom",
            "title": "Conservation of Nucleon Number",
            "text": "Total mass number A and total electric charge Z are strictly conserved in all nuclear decay equations."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Half-Life Decay and E = mc²",
          "subtitle": "N(t) = N₀(½)^(t/T) and mass-energy conversion",
          "paragraphs": [
            "Radioactive decay is random and spontaneous: the number of remaining nuclei after n half-lives is N = N₀(½)ⁿ where n = t / T_½. In nuclear fission, uranium-235 splits into lighter fragments whose total mass is slightly less than reactants; this mass defect Δm converts to thermal kinetic energy via E = Δm·c²."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Radioactive decay follows an exponential decay law N(t) = N₀(½)^(t/T_½).",
        "E = mc² demonstrates that mass and energy are equivalent manifestations of the same entity."
      ],
      "reflectionPrompt": "Why is carbon-14 dating effective for biological archaeological artifacts but useless for dating dinosaur fossils millions of years old?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Penetration Power and Nuclear Emissions",
      "caption": "Comparing alpha, beta, and gamma radiation stopping barriers.",
      "diagramTitle": "Shielding Absorption Profiles for Nuclear Radiations",
      "diagramDescription": "Alpha stopped by sheet of paper; beta passing paper and stopped by 5mm aluminium; gamma penetrating aluminium and stopped by dense lead block.",
      "components": [
        {
          "id": "c1",
          "name": "Alpha Beam (⁴₂He²⁺)",
          "role": "Low penetration",
          "description": "Stopped completely by single sheet of paper or skin."
        },
        {
          "id": "c2",
          "name": "Beta Beam (⁰₋₁e)",
          "role": "Medium penetration",
          "description": "Passes paper; stopped by 5 mm aluminium sheet."
        },
        {
          "id": "c3",
          "name": "Gamma Beam (γ)",
          "role": "High penetration",
          "description": "Passes aluminium; attenuated only by thick lead or dense concrete."
        }
      ],
      "visualSummary": "Ionizing power is inversely related to penetration depth across the three radiation types."
    },
    "examples-applications": {
      "overview": "Radiocarbon dating of historical manuscripts and nuclear oncology radiation therapy.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Remaining Activity after 3 Half-Lives",
          "difficulty": "Advanced",
          "contextOrPrompt": "A radioactive isotope has a half-life of 8 days. If the initial activity is 800 Bequerels, what is the activity after 24 days?",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Determine number of elapsed half-lives n",
              "work": "n = t / T_½ = 24 days / 8 days = 3 half-lives."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply decay formula N = N₀(½)ⁿ",
              "work": "N = 800 × (½)³ = 800 × (1/8) = 100 Bq."
            }
          ],
          "finalResult": "The remaining activity after 24 days is 100 Bequerels.",
          "verificationTip": "Each half-life halves the sample: 800 → 400 (day 8) → 200 (day 16) → 100 (day 24)."
        }
      ],
      "applications": [
        {
          "domain": "Archaeometry",
          "title": "Carbon-14 Archaeological Dating",
          "context": "Measuring residual ¹⁴C activity in ancient timber beams to determine epoch of construction.",
          "realWorldScenario": "Dating wooden beams from an archaeological excavation site with 25% residual ¹⁴C (two half-lives = 11,460 years).",
          "impactMetric": "Dating precision within ±50 years across a 10,000-year historical span."
        }
      ],
      "selfCheckExercise": {
        "question": "A nucleus of ²³⁸₉₂U undergoes alpha decay. What are the mass number and atomic number of the daughter nucleus?",
        "hint": "Subtract 4 from mass number (238 - 4) and 2 from atomic number (92 - 2).",
        "solution": "Daughter nucleus is ²³⁴₉₀Th (Thorium-234): Mass number 234, atomic number 90."
      }
    },
    "explore-experiment": {
      "activityTitle": "Radioactive Half-Life Decay Sandbox",
      "objective": "Simulate exponential decay and watch parent nuclei transmute into stable daughter products over time.",
      "instructions": "Slide elapsed time to observe exponential parent decay and daughter buildup.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "half_life",
          "label": "Half-Life T_½ (days)",
          "description": "Isotope half-life period",
          "min": 1,
          "max": 30,
          "step": 1,
          "defaultValue": 8,
          "unit": "days"
        },
        {
          "id": "elapsed",
          "label": "Elapsed Time t (days)",
          "description": "Total observation duration",
          "min": 0,
          "max": 60,
          "step": 2,
          "defaultValue": 16,
          "unit": "days"
        }
      ],
      "guidingQuestions": [
        "What percentage of parent nuclei remain after 4 half-lives?"
      ],
      "whatToObserve": [
        "(½)⁴ = 1/16 = 6.25% parent nuclei remain, while 93.75% have decayed into daughter nuclei."
      ],
      "takeawayInsight": "Radioactive decay follows a strict geometric progression invariant over macroscopic timescales."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Chemical Reactions & Equations
  // =========================================================================
  {
  "id": "chem-chemical-reactions",
  "slug": "chemical-reactions",
  "title": "Chemical Reactions & Equations",
  "subtitle": "Stoichiometry balancing, reaction taxonomy, and redox electron transfer",
  "subjectId": "chemistry",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Chemical reactions involve the breaking and forming of chemical bonds to transform reactant substances into distinct products while strictly conserving total atomic mass. Major types include combination, decomposition, displacement, and redox reactions.",
  "whyItMatters": "Essential for industrial ammonia synthesis (Haber-Bosch), pharmaceutical drug development, battery electrochemistry, and environmental carbon capture.",
  "learningObjectives": [
    "Balance chemical equations to satisfy the Law of Conservation of Mass.",
    "Classify reaction archetypes: combination, decomposition, displacement, double displacement.",
    "Identify oxidizing and reducing agents in terms of electron transfer and oxygen gain/loss."
  ],
  "coreQuestions": [
    "Why must chemical equations be balanced using coefficients rather than altering subscript numbers?",
    "How do redox reactions couple simultaneous oxidation and reduction?"
  ],
  "prerequisites": [
    "Chemical symbols and valency",
    "Atoms and molecules basics"
  ],
  "keyTerms": [
    {
      "term": "Law of Conservation of Mass",
      "definition": "Mass cannot be created or destroyed in a chemical reaction; total reactant mass equals total product mass."
    },
    {
      "term": "Redox Reaction",
      "definition": "A reaction in which oxidation (loss of electrons) and reduction (gain of electrons) occur simultaneously."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Chemical reactions rearrange atomic arrangements without destroying atomic nuclei.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Conservation of Mass & Stoichiometric Balancing",
          "subtitle": "Balancing atom inventories across the reaction arrow",
          "paragraphs": [
            "Antoine Lavoisier established that mass is conserved in all chemical changes. In an unbalanced equation such as H₂ + O₂ → H₂O, two oxygen atoms on the left produce only one on the right. Introducing stoichiometric coefficients yields 2H₂ + O₂ → 2H₂O, preserving exact atom counts: 4 hydrogen and 2 oxygen atoms on both sides."
          ],
          "bulletPoints": [
            "Combination: A + B → AB (e.g. CaO + H₂O → Ca(OH)₂).",
            "Decomposition: AB → A + B (e.g. 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃).",
            "Displacement: A + BC → AC + B (e.g. Fe + CuSO₄ → FeSO₄ + Cu)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Stoichiometric Invariant",
            "text": "Subscripts denote fixed molecular identity; only leading stoichiometric coefficients may be adjusted during balancing."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Redox Reactions and Electron Transfer",
          "subtitle": "OIL RIG: Oxidation Is Loss, Reduction Is Gain",
          "paragraphs": [
            "In modern terms, oxidation is loss of electrons (or gain of oxygen / loss of hydrogen), while reduction is gain of electrons (or loss of oxygen / gain of hydrogen). In the reaction CuO + H₂ → Cu + H₂O, CuO loses oxygen (reduced to Cu, acting as oxidizing agent), while H₂ gains oxygen (oxidized to H₂O, acting as reducing agent)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Balanced equations guarantee mass conservation across all participating elements.",
        "Oxidation and reduction are complementary halves of every electron-transfer reaction."
      ],
      "reflectionPrompt": "Why is rusting of iron classified as an oxidation-reduction reaction?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Reaction Types & Electron Transfer Paths",
      "caption": "Single displacement reaction showing iron atoms transferring electrons to copper ions.",
      "diagramTitle": "Single Displacement Electron Exchange Mechanics",
      "diagramDescription": "Fe nail immersed in blue CuSO₄ solution: Fe oxidizes to Fe²⁺ entering solution, while Cu²⁺ reduces to red copper metal coating.",
      "components": [
        {
          "id": "c1",
          "name": "Iron Anode Surface (Fe)",
          "role": "Electron donor",
          "description": "Fe → Fe²⁺ + 2e⁻ (Oxidation)."
        },
        {
          "id": "c2",
          "name": "Copper Ions (Cu²⁺)",
          "role": "Electron acceptor",
          "description": "Cu²⁺ + 2e⁻ → Cu (Reduction)."
        },
        {
          "id": "c3",
          "name": "Sulphate Spectator (SO₄²⁻)",
          "role": "Counter ion",
          "description": "Remains in solution maintaining electrical neutrality."
        }
      ],
      "visualSummary": "More reactive metals displace less reactive metal ions via spontaneous electron transfer."
    },
    "examples-applications": {
      "overview": "Industrial metallurgy smelting and automotive catalytic converters.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Balancing the Combustion of Propane",
          "difficulty": "Foundational",
          "contextOrPrompt": "Balance the complete combustion equation: C₃H₈ + O₂ → CO₂ + H₂O.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Balance carbon atoms",
              "work": "C₃H₈ has 3 carbons; place coefficient 3 before CO₂: C₃H₈ + O₂ → 3CO₂ + H₂O."
            },
            {
              "stepNumber": 2,
              "explanation": "Balance hydrogen atoms",
              "work": "C₃H₈ has 8 hydrogens; place coefficient 4 before H₂O: C₃H₈ + O₂ → 3CO₂ + 4H₂O."
            },
            {
              "stepNumber": 3,
              "explanation": "Count total oxygen on right and balance left",
              "work": "Right side has 3(2) + 4(1) = 10 oxygens. Place coefficient 5 before O₂: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O."
            }
          ],
          "finalResult": "Balanced equation is C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",
          "verificationTip": "Balance elements appearing in only one compound first; leave uncombined diatomic elements (like O₂) for last."
        }
      ],
      "applications": [
        {
          "domain": "Automotive Engineering",
          "title": "Three-Way Catalytic Converter Reactions",
          "context": "Catalyzing simultaneous reduction of nitrogen oxides (NOx → N₂) and oxidation of carbon monoxide (2CO + O₂ → 2CO₂).",
          "realWorldScenario": "Converting toxic tailpipe exhaust gases into inert atmospheric gases using platinum-rhodium catalyst honeycombs.",
          "impactMetric": "Ninety-nine percent catalytic conversion efficiency under stoichiometric air-fuel ratio."
        }
      ],
      "selfCheckExercise": {
        "question": "In the reaction 2PbO + C → 2Pb + CO₂, which substance is reduced and which is oxidized?",
        "hint": "Identify which species loses oxygen and which species gains oxygen.",
        "solution": "PbO loses oxygen (reduced to Pb); carbon gains oxygen (oxidized to CO₂)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Reaction Stoichiometry Balancer",
      "objective": "Vary coefficient numbers to balance atom inventories between reactants and products.",
      "instructions": "Slide stoichiometric coefficients to see left and right atom counters reach exact parity.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "coeff_react",
          "label": "Fuel Coefficient",
          "description": "Multiplier for hydrocarbon reactant",
          "min": 1,
          "max": 4,
          "step": 1,
          "defaultValue": 1,
          "unit": "units"
        },
        {
          "id": "coeff_o2",
          "label": "Oxygen Coefficient",
          "description": "Multiplier for O₂ molecules",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 5,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "What occurs to the oxygen atom inventory when the fuel coefficient is doubled?"
      ],
      "whatToObserve": [
        "Doubling fuel requires doubling oxygen input to maintain balanced stoichiometric combustion."
      ],
      "takeawayInsight": "Stoichiometric coefficients maintain atom-by-atom conservation in every chemical process."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Acids, Bases & The pH Scale
  // =========================================================================
  {
  "id": "chem-acids-bases-salts",
  "slug": "acids-bases-salts",
  "title": "Acids, Bases & The pH Scale",
  "subtitle": "Proton transfer, logarithmic pH = -log[H⁺], neutralization, and indicators",
  "subjectId": "chemistry",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Acids release hydrogen ions (H⁺ / H₃O⁺) in aqueous solution, while bases produce hydroxide ions (OH⁻). The logarithmic pH scale quantifies acidity from 0 to 14, and neutralization produces salt and water.",
  "whyItMatters": "Essential for biological blood buffer homeostasis (pH 7.35–7.45), agricultural soil fertilization, water treatment purification, and antacid pharmaceuticals.",
  "learningObjectives": [
    "Define Arrhenius and Brønsted-Lowry concepts of acids and bases.",
    "Explain the pH scale as logarithmic metric pH = -log₁₀[H⁺].",
    "Predict products of acid-base neutralizations and classify resulting salts (acidic, basic, neutral)."
  ],
  "coreQuestions": [
    "Why does a drop from pH 6 to pH 4 represent a 100-fold increase in hydrogen ion concentration?",
    "Why is pure water considered neutral at pH 7 at 25°C?"
  ],
  "prerequisites": [
    "Ions and dissociation",
    "Exponents and logarithms basics"
  ],
  "keyTerms": [
    {
      "term": "pH Scale",
      "definition": "The negative logarithm to base 10 of hydrogen ion concentration: pH = -log₁₀[H⁺]."
    },
    {
      "term": "Neutralization",
      "definition": "The reaction between an acid and a base producing a salt and water: H⁺ + OH⁻ → H₂O."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Acids and bases govern proton dynamics in aqueous solutions, controlling chemical reactivity and biological vitality.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Ionization and the Definition of Acids and Bases",
          "subtitle": "Hydronium ions H₃O⁺ and hydroxide ions OH⁻",
          "paragraphs": [
            "According to Svante Arrhenius, an acid is a substance that dissociates in water to yield hydronium ions (HCl + H₂O → H₃O⁺ + Cl⁻), while a base dissociates to yield hydroxide ions (NaOH → Na⁺ + OH⁻). Strong acids/bases dissociate 100%; weak acids (like acetic acid CH₃COOH) exist in dynamic equilibrium."
          ],
          "bulletPoints": [
            "Neutral water self-ionization: [H⁺][OH⁻] = K_w = 1.0 × 10⁻¹⁴ at 25°C.",
            "In neutral solution: [H⁺] = [OH⁻] = 10⁻⁷ M, giving pH = 7.0."
          ],
          "callout": {
            "type": "axiom",
            "title": "Logarithmic Acidity Invariant",
            "text": "Each unit decrease in pH represents a ten-fold (10x) increase in hydrogen ion concentration."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Neutralization and Salt Classification",
          "subtitle": "Acid + Base → Salt + Water",
          "paragraphs": [
            "Neutralization is the reaction between H⁺ and OH⁻ to form neutral water: H⁺(aq) + OH⁻(aq) → H₂O(l). The nature of the resulting salt depends on the strength of parents: Strong Acid + Strong Base = Neutral salt (NaCl, pH 7); Strong Acid + Weak Base = Acidic salt (NH₄Cl, pH < 7); Weak Acid + Strong Base = Basic salt (CH₃COONa, pH > 7)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "pH = -log[H⁺] scales inversely with hydrogen ion concentration.",
        "Salt hydrolysis dictates whether salt solutions test acidic, basic, or neutral."
      ],
      "reflectionPrompt": "Why does human gastric juice maintain a pH around 1.5–2.0, and how does the stomach lining protect itself from autodigestion?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Universal Indicator pH Spectrum",
      "caption": "Color gradient of Universal Indicator from red (strong acid) through green (neutral) to purple (strong base).",
      "diagramTitle": "Logarithmic Hydrogen Ion Concentration Scale",
      "diagramDescription": "Continuous spectrum showing pH values 0 to 14 mapped against common household substances and indicator colors.",
      "components": [
        {
          "id": "c1",
          "name": "Acidic Domain (pH 0-6)",
          "role": "Excess H⁺ ions",
          "description": "Red to yellow; battery acid, lemon juice, coffee."
        },
        {
          "id": "c2",
          "name": "Neutral Midpoint (pH 7)",
          "role": "Equal [H⁺] = [OH⁻]",
          "description": "Green; pure distilled water at 25°C."
        },
        {
          "id": "c3",
          "name": "Basic Domain (pH 8-14)",
          "role": "Excess OH⁻ ions",
          "description": "Blue to deep violet; baking soda, bleach, sodium hydroxide."
        }
      ],
      "visualSummary": "The pH scale maps hydrogen ion concentration across fourteen orders of magnitude."
    },
    "examples-applications": {
      "overview": "Agricultural soil liming and clinical dialysis buffer regulation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating pH from Hydrogen Ion Concentration",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A hydrochloric acid solution has [H⁺] = 0.001 M (10⁻³ mol/L). Calculate its pH and hydroxide concentration [OH⁻].",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply pH definition pH = -log[H⁺]",
              "work": "pH = -log₁₀(10⁻³) = -(-3) = 3.0."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply ionic product of water K_w = [H⁺][OH⁻] = 10⁻¹⁴",
              "work": "[OH⁻] = 10⁻¹⁴ / 10⁻³ = 10⁻¹¹ M."
            }
          ],
          "finalResult": "The solution has pH = 3.0 (strongly acidic) and [OH⁻] = 10⁻¹¹ M.",
          "verificationTip": "pH + pOH = 14 at 25°C, providing an instant cross-check."
        }
      ],
      "applications": [
        {
          "domain": "Agronomy & Agriculture",
          "title": "Soil Acidity Neutralization via Agricultural Lime",
          "context": "Spreading calcium carbonate (CaCO₃) on acidic farmland (pH < 5.5) to optimize nutrient bioavailability.",
          "realWorldScenario": "Neutralizing acid rain soil leaching to raise field pH to optimal 6.5 for wheat germination.",
          "impactMetric": "Thirty percent increase in crop grain yield through pH optimization."
        }
      ],
      "selfCheckExercise": {
        "question": "If solution A has pH 3 and solution B has pH 6, how many times more acidic is solution A than B?",
        "hint": "Each pH unit is a factor of 10. Compute 10^(6 - 3).",
        "solution": "10³ = 1,000 times more acidic."
      }
    },
    "explore-experiment": {
      "activityTitle": "Acid-Base Titration & pH Simulator",
      "objective": "Titrate a strong acid with a strong base to observe the sharp S-shaped pH neutralization curve.",
      "instructions": "Add base volume dropwise to observe the sudden inflection leap around pH 7.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "acid_conc",
          "label": "Acid Concentration (M)",
          "description": "Molarity of HCl solution",
          "min": 0.01,
          "max": 1,
          "step": 0.05,
          "defaultValue": 0.1,
          "unit": "M"
        },
        {
          "id": "base_vol",
          "label": "Base Added (mL)",
          "description": "Volume of 0.1 M NaOH added to 25 mL acid",
          "min": 0,
          "max": 50,
          "step": 1,
          "defaultValue": 25,
          "unit": "mL"
        }
      ],
      "guidingQuestions": [
        "Why does the pH jump dramatically from 4 to 10 with just a few drops of base near the equivalence point?"
      ],
      "whatToObserve": [
        "Because the logarithmic scale requires minimal ion additions to alter orders of magnitude when concentrations are near 10⁻⁷ M."
      ],
      "takeawayInsight": "Neutralization curves exhibit extreme sensitivity at the exact stoichiometric equivalence point."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Metals, Non-Metals & Metallurgy
  // =========================================================================
  {
  "id": "chem-metals-nonmetals",
  "slug": "metals-nonmetals",
  "title": "Metals, Non-Metals & Metallurgy",
  "subtitle": "Reactivity series, ionic lattice formation, and metallurgical extraction",
  "subjectId": "chemistry",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Elements are broadly classified into metals (electropositive electron donors) and non-metals (electronegative electron acceptors). The Reactivity Series governs displacement reactions, metal extraction from ores, and electrolytic refining.",
  "whyItMatters": "Essential for structural steel skyscrapers, aerospace aluminium airframes, copper electrical conductors, and corrosion prevention anodization.",
  "learningObjectives": [
    "Differentiate metals and non-metals by physical and chemical properties.",
    "Rank metals in the Reactivity Series and predict displacement outcomes.",
    "Explain metallurgical extraction: roasting, calcination, reduction by carbon, and electrolysis."
  ],
  "coreQuestions": [
    "Why can carbon reduce iron oxide in a blast furnace but cannot reduce aluminium oxide?",
    "How does ionic bonding explain the high melting point and electrical conductivity of molten salts?"
  ],
  "prerequisites": [
    "Periodic table valence",
    "Chemical reactions"
  ],
  "keyTerms": [
    {
      "term": "Reactivity Series",
      "definition": "A vertical arrangement of metals in decreasing order of chemical reactivity."
    },
    {
      "term": "Metallurgy",
      "definition": "The scientific and industrial process of extracting metals from their mineral ores."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The metallic state is defined by delocalized valence electrons, creating characteristic malleability, luster, and electrical conductivity.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Chemical Properties & The Reactivity Series",
          "subtitle": "K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au",
          "paragraphs": [
            "Metals react with oxygen to form basic oxides (e.g., 2Mg + O₂ → 2MgO). Amphoteric oxides (Al₂O₃, ZnO) react with both acids and bases. In the Reactivity Series, any metal situated above hydrogen displaces hydrogen gas from dilute acids; metals below hydrogen (Cu, Ag, Au) do not."
          ],
          "bulletPoints": [
            "Potassium and sodium react vigorously with cold water, evolving H₂ gas.",
            "Zinc and iron react with steam; copper does not react with water or dilute acid."
          ],
          "callout": {
            "type": "axiom",
            "title": "Electrochemical Invariant",
            "text": "Metals with higher oxidation potential displace metals with lower oxidation potential from their aqueous salt solutions."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Principles of Metallurgy",
          "subtitle": "Extraction based on position in reactivity series",
          "paragraphs": [
            "High-reactivity metals (K, Na, Ca, Mg, Al) are extracted by electrolytic reduction of molten chlorides or oxides (e.g. Hall-Héroult process for Al). Medium-reactivity metals (Zn, Fe, Pb) exist as sulphides or carbonates, converted by roasting or calcination into oxides and reduced with carbon (coke). Low-reactivity metals (Cu, Ag) occur in native or sulphide forms, reduced by heat alone."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Reactivity dictates whether thermal carbon reduction or high-energy electrolysis is required.",
        "Ionic compounds form brittle crystal lattices with high melting points."
      ],
      "reflectionPrompt": "Why is aluminium extracted via electrolysis of molten bauxite rather than carbon reduction in a blast furnace?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Reactivity Ladder and Extraction Thresholds",
      "caption": "Vertical reactivity hierarchy dividing electrolytic reduction from carbon smelting.",
      "diagramTitle": "Reactivity Series and Industrial Extraction Regimes",
      "diagramDescription": "Top tier (K, Na, Al) labeled Electrolysis; Middle tier (Zn, Fe) labeled Carbon Reduction; Bottom tier (Cu, Ag) labeled Thermal Roasting.",
      "components": [
        {
          "id": "c1",
          "name": "Electrolytic Tier (K to Al)",
          "role": "Strongest electron donors",
          "description": "Extremely stable oxides; requires molten salt electrolysis."
        },
        {
          "id": "c2",
          "name": "Smelting Tier (Zn to Pb)",
          "role": "Intermediate donors",
          "description": "Oxides reducible with carbon coke in blast furnaces."
        },
        {
          "id": "c3",
          "name": "Native Tier (Cu to Au)",
          "role": "Weak donors / Noble metals",
          "description": "Easily reduced by thermal heating or found native."
        }
      ],
      "visualSummary": "Extraction energy costs scale directly with a metal’s electropositive position in the reactivity ladder."
    },
    "examples-applications": {
      "overview": "Blast furnace pig iron production and electrolytic copper refining.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Predicting Displacement in Metal-Salt Pairs",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A strip of zinc is dipped into an aqueous solution of copper(II) sulphate. Write the balanced equation and explain observations.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Check reactivity series position",
              "work": "Zinc (Zn) is above Copper (Cu); Zn displaces Cu."
            },
            {
              "stepNumber": 2,
              "explanation": "Write molecular equation",
              "work": "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)."
            },
            {
              "stepNumber": 3,
              "explanation": "Record observable changes",
              "work": "Blue colour of CuSO₄ solution fades to colourless ZnSO₄; reddish-brown copper deposits on zinc strip."
            }
          ],
          "finalResult": "Zinc displaces copper: Zn + CuSO₄ → ZnSO₄ + Cu.",
          "verificationTip": "If a strip of copper is placed in zinc sulphate, zero reaction occurs because Cu is less reactive than Zn."
        }
      ],
      "applications": [
        {
          "domain": "Industrial Metallurgy",
          "title": "Electrolytic Refining of Blister Copper",
          "context": "Purifying 98% impure blister copper into 99.99% high-conductivity electrical grade copper.",
          "realWorldScenario": "Using impure copper anode, pure copper cathode sheet, and acidified CuSO₄ electrolyte bath.",
          "impactMetric": "Four-nines (99.99%) copper purity required for low-loss telecommunications cabling."
        }
      ],
      "selfCheckExercise": {
        "question": "Why does aluminium not corrode rapidly like iron when exposed to atmospheric air and moisture?",
        "hint": "Aluminium forms a protective, non-porous surface oxide layer.",
        "solution": "Aluminium instantly forms a tough, self-healing layer of aluminium oxide (Al₂O₃) that passivates the underlying metal from further corrosion."
      }
    },
    "explore-experiment": {
      "activityTitle": "Metal Displacement Reaction Sandbox",
      "objective": "Pair different metals and aqueous salt solutions to observe whether displacement occurs.",
      "instructions": "Select metal and solution pairs to verify the Reactivity Series hierarchy.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "metal_choice",
          "label": "Solid Metal Strip",
          "description": "1: Mg, 2: Zn, 3: Fe, 4: Cu",
          "min": 1,
          "max": 4,
          "step": 1,
          "defaultValue": 2,
          "unit": "units"
        },
        {
          "id": "solution_choice",
          "label": "Salt Solution",
          "description": "1: MgSO₄, 2: ZnSO₄, 3: FeSO₄, 4: CuSO₄",
          "min": 1,
          "max": 4,
          "step": 1,
          "defaultValue": 4,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "Can zinc displace magnesium from magnesium sulphate?"
      ],
      "whatToObserve": [
        "No, because zinc is below magnesium in the reactivity series."
      ],
      "takeawayInsight": "Spontaneous displacement occurs only when the solid metal is more reactive than the metal ion in solution."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Carbon Compounds & Functional Groups
  // =========================================================================
  {
  "id": "chem-carbon-compounds",
  "slug": "carbon-compounds",
  "title": "Carbon Compounds & Functional Groups",
  "subtitle": "Tetravalency, catenation, homologous series, and IUPAC nomenclature",
  "subjectId": "chemistry",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Carbon’s unique tetravalency and catenation ability allow it to form millions of stable chain, branched, and ring covalent compounds. Homologous series (alkanes, alkenes, alkynes) and functional groups govern organic chemistry.",
  "whyItMatters": "The architectural foundation of all living biochemistry (DNA, proteins, lipids), modern synthetic polymers, pharmaceuticals, and synthetic fuels.",
  "learningObjectives": [
    "Explain carbon’s versatility through tetravalency, sp³ hybridization, and catenation.",
    "Name organic molecules using systematic IUPAC nomenclature rules.",
    "Classify functional groups: alcohols (-OH), aldehydes (-CHO), ketones (>C=O), and carboxylic acids (-COOH)."
  ],
  "coreQuestions": [
    "Why does carbon form covalent bonds rather than ionic C⁴⁺ or C⁴⁻ ions?",
    "How does a homologous series exhibit uniform chemical properties and graduated physical trends?"
  ],
  "prerequisites": [
    "Covalent bonding",
    "Valence electrons"
  ],
  "keyTerms": [
    {
      "term": "Catenation",
      "definition": "The unique ability of carbon atoms to form strong covalent bonds with other carbon atoms, creating long chains and rings."
    },
    {
      "term": "Homologous Series",
      "definition": "A family of organic compounds with the same functional group and general formula, where adjacent members differ by -CH₂- (14 u)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Organic chemistry is the chemistry of carbon, whose electronic structure allows infinite molecular diversity.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Unique Versatility of Carbon",
          "subtitle": "Tetravalency, small atomic radius, and catenation",
          "paragraphs": [
            "With atomic number 6 (configuration 2, 4), carbon needs 4 electrons to complete its octet. Gaining 4 electrons to form C⁴⁻ would require a tiny nucleus to hold 10 electrons; losing 4 to form C⁴⁺ requires enormous ionization energy. Hence, carbon exclusively shares electrons via four covalent bonds. Its small atomic radius forms exceptionally strong C-C bonds."
          ],
          "bulletPoints": [
            "Alkanes: C_n H_(2n+2) (single bonds, saturated).",
            "Alkenes: C_n H_(2n) (double bond, unsaturated).",
            "Alkynes: C_n H_(2n-2) (triple bond, unsaturated)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Catenation Invariant",
            "text": "Strong C-C bond enthalpy enables carbon chains of virtually unlimited length and geometric complexity."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Functional Groups & IUPAC Nomenclature",
          "subtitle": "-OH, -CHO, >C=O, -COOH",
          "paragraphs": [
            "A functional group is an atom or group of atoms that imparts characteristic chemical reactivity regardless of chain length. Alcohols (-ol): Ethanol CH₃CH₂OH. Aldehydes (-al): Ethanal CH₃CHO. Ketones (-one): Propanone CH₃COCH₃. Carboxylic acids (-oic acid): Ethanoic acid CH₃COOH. Esterification: Acid + Alcohol → Ester (sweet-smelling) + Water."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Carbon achieves octet stability exclusively through covalent electron sharing.",
        "Members of a homologous series differ by -CH₂- and share identical chemical reaction pathways."
      ],
      "reflectionPrompt": "Why is diamond an electrical insulator while graphite, another allotrope of pure carbon, conducts electricity?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Homologous Series Ladder",
      "caption": "Stepwise progression of linear alkane chain lengths from methane to butane.",
      "diagramTitle": "Methylene (-CH₂-) Chain Progression",
      "diagramDescription": "Molecular models showing methane (CH₄), ethane (C₂H₆), propane (C₃H₈), and butane (C₄H₁₀) with tetrahedral 109.5° bond angles.",
      "components": [
        {
          "id": "c1",
          "name": "Methane (CH₄)",
          "role": "Single carbon root",
          "description": "Tetrahedral geometry with four C-H bonds."
        },
        {
          "id": "c2",
          "name": "Ethane (C₂H₆)",
          "role": "Two-carbon chain",
          "description": "Single C-C bond with six C-H bonds."
        },
        {
          "id": "c3",
          "name": "Propane (C₃H₈)",
          "role": "Three-carbon chain",
          "description": "Two C-C bonds; boiling point increases due to van der Waals forces."
        }
      ],
      "visualSummary": "Each successive member of a homologous series adds exactly one -CH₂- unit and 14 u molecular mass."
    },
    "examples-applications": {
      "overview": "Polymer synthesis (plastics) and pharmaceutical active ingredient design.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Naming and Drawing Structural Isomers of Butane",
          "difficulty": "Advanced",
          "contextOrPrompt": "Draw and name the two structural isomers of butane (C₄H₁₀).",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Draw straight-chain isomer",
              "work": "CH₃-CH₂-CH₂-CH₃ (IUPAC name: n-butane or butane)."
            },
            {
              "stepNumber": 2,
              "explanation": "Draw branched-chain isomer",
              "work": "CH₃-CH(CH₃)-CH₃ (IUPAC name: 2-methylpropane or isobutane)."
            }
          ],
          "finalResult": "C₄H₁₀ has two structural isomers: Butane and 2-Methylpropane.",
          "verificationTip": "Isomers possess the identical molecular formula but different spatial connectivity of atoms."
        }
      ],
      "applications": [
        {
          "domain": "Petrochemical Refining",
          "title": "Octane Rating Optimization in Gasoline",
          "context": "Catalytic isomerization of straight-chain heptane into highly branched iso-octane (2,2,4-trimethylpentane).",
          "realWorldScenario": "Preventing engine knocking and pre-ignition in high-compression automotive cylinders.",
          "impactMetric": "Octane rating index exceeding 95 RON."
        }
      ],
      "selfCheckExercise": {
        "question": "Write the IUPAC name for CH₃-CH₂-COOH.",
        "hint": "Three carbons with a terminal carboxylic acid group.",
        "solution": "Propanoic acid."
      }
    },
    "explore-experiment": {
      "activityTitle": "Hydrocarbon Chain & Functional Group Builder",
      "objective": "Vary carbon chain length n to observe changes in molecular formula, mass, and boiling point.",
      "instructions": "Slide carbon count to watch alkane formulas expand by -CH₂- units.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "carbons",
          "label": "Carbon Atom Count n",
          "description": "Number of carbons in alkane chain C_n H_(2n+2)",
          "min": 1,
          "max": 10,
          "step": 1,
          "defaultValue": 3,
          "unit": "carbons"
        }
      ],
      "guidingQuestions": [
        "What is the formula and molecular weight of an alkane with n = 6?"
      ],
      "whatToObserve": [
        "Formula is C₆H₁₄; molecular mass is 6(12) + 14(1) = 86 atomic mass units."
      ],
      "takeawayInsight": "Homologous series exhibit predictable, linear scaling of physical and structural properties."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Atomic Structure: Subatomic Particles & Orbitals
  // =========================================================================
  {
  "id": "chem-structure-of-atom",
  "slug": "structure-of-atom",
  "title": "Atomic Structure: Subatomic Particles & Orbitals",
  "subtitle": "Rutherford scattering, Bohr model, electronic configuration, and isotopes",
  "subjectId": "chemistry",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "The atom comprises a dense, positively charged nucleus (protons and neutrons) surrounded by quantized electron shells. The Bohr model and 2n² electron capacity rule explain chemical periodicity, valency, and isotopic mass.",
  "whyItMatters": "Foundational to spectroscopy, semiconductor physics, laser technology, nuclear medicine, and quantum chemistry.",
  "learningObjectives": [
    "Describe Rutherford’s alpha particle scattering experiment and nuclear model.",
    "Apply Bohr’s postulates of quantized energy orbits and 2n² electron capacity.",
    "Differentiate isotopes (same Z, different A) from isobars (same A, different Z)."
  ],
  "coreQuestions": [
    "Why did most alpha particles pass straight through gold foil without deflection in Rutherford’s experiment?",
    "Why do electrons in Bohr orbits not radiate electromagnetic energy and spiral into the nucleus?"
  ],
  "prerequisites": [
    "Electric charge",
    "Periodic table basics"
  ],
  "keyTerms": [
    {
      "term": "Atomic Number (Z)",
      "definition": "The number of protons in the nucleus of an atom, defining elemental identity."
    },
    {
      "term": "Mass Number (A)",
      "definition": "The total number of nucleons (protons + neutrons) in an atomic nucleus: A = Z + N."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The journey from Dalton’s indivisible sphere to the quantum atom revealed the architecture of subatomic reality.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Rutherford’s Nuclear Model",
          "subtitle": "The gold foil alpha scattering experiment",
          "paragraphs": [
            "Rutherford bombarded thin gold foil with alpha particles. Most passed undeflected, proving the atom is mostly empty space. A tiny fraction (1 in 20,000) bounced back, proving all positive charge and nearly all mass are concentrated in a tiny dense core called the nucleus."
          ],
          "bulletPoints": [
            "Nucleus diameter (~10⁻¹⁵ m) is 100,000 times smaller than atom diameter (~10⁻¹⁰ m).",
            "Electrons orbit the nucleus under electrostatic Coulomb attraction."
          ],
          "callout": {
            "type": "axiom",
            "title": "Rutherford’s Paradox",
            "text": "Classical electrodynamics predicted accelerating orbiting electrons must radiate energy and collapse in 10⁻⁸ seconds, necessitating Bohr’s quantization."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Bohr Quantum Model and Shell Capacity",
          "subtitle": "Discrete energy shells K, L, M, N and 2n²",
          "paragraphs": [
            "Niels Bohr postulated that electrons occupy discrete non-radiating stationary orbits where angular momentum is quantized. Maximum electrons per shell follows 2n²: K-shell (n=1) holds 2, L-shell (n=2) holds 8, M-shell (n=3) holds 18. Valence electrons in the outermost shell govern chemical bonding and octet stability."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Atoms are overwhelmingly empty space with nearly all mass concentrated in the nucleus.",
        "Bohr orbits are quantized; electrons radiate only when jumping between levels."
      ],
      "reflectionPrompt": "Why do two isotopes of chlorine (³⁵Cl and ³⁷Cl) exhibit identical chemical reactivity despite different atomic masses?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Concentric Bohr Energy Shells",
      "caption": "Planetary model of quantized K, L, and M electron energy levels around the nucleus.",
      "diagramTitle": "Quantized Bohr Atom Architecture",
      "diagramDescription": "Central nucleus (protons + neutrons) with concentric quantized orbits K (2e), L (8e), and M (up to 18e).",
      "components": [
        {
          "id": "c1",
          "name": "Dense Nucleus",
          "role": "Mass and positive charge",
          "description": "Contains protons and neutrons held by strong nuclear force."
        },
        {
          "id": "c2",
          "name": "K-Shell (n = 1)",
          "role": "Ground orbital",
          "description": "Capacity 2(1)² = 2 electrons."
        },
        {
          "id": "c3",
          "name": "L-Shell (n = 2)",
          "role": "Second energy level",
          "description": "Capacity 2(2)² = 8 electrons; satisfies octet rule."
        }
      ],
      "visualSummary": "Electrons orbit exclusively within quantized energy levels, absorbing or emitting discrete photons upon transition."
    },
    "examples-applications": {
      "overview": "Spectral fingerprint emission analysis and carbon isotopic ratio dating.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Electronic Configuration and Valency of Sodium",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Sodium has atomic number Z = 11 and mass number A = 23. Find its subatomic particle counts, electron configuration, and valency.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Determine proton, neutron, and electron counts",
              "work": "Protons = Z = 11; Electrons = 11; Neutrons = A - Z = 23 - 11 = 12."
            },
            {
              "stepNumber": 2,
              "explanation": "Distribute electrons across shells (2n²)",
              "work": "K-shell = 2, L-shell = 8, M-shell = 1. Configuration is (2, 8, 1)."
            },
            {
              "stepNumber": 3,
              "explanation": "Determine valency",
              "work": "Outermost shell has 1 valence electron. It readily loses 1 electron to achieve octet (2, 8), so Valency = 1."
            }
          ],
          "finalResult": "Sodium has 11p, 12n, 11e; configuration (2, 8, 1); valency is 1.",
          "verificationTip": "Elements with 1, 2, or 3 valence electrons tend to lose electrons (metals, positive valency)."
        }
      ],
      "applications": [
        {
          "domain": "Analytical Chemistry",
          "title": "Flame Emission Spectroscopy",
          "context": "Identifying elemental impurities in drinking water by matching characteristic emission wavelengths.",
          "realWorldScenario": "Detecting trace sodium yellow emission line at 589 nm as electrons drop from excited 3p to 3s levels.",
          "impactMetric": "Parts-per-billion elemental detection sensitivity."
        }
      ],
      "selfCheckExercise": {
        "question": "Chlorine has atomic number 17. What is its electronic configuration and valency?",
        "hint": "Distribute 17 electrons: 2 in K, 8 in L, remaining in M. How many electrons to reach 8?",
        "solution": "Configuration is (2, 8, 7). Valency is 8 - 7 = 1 (needs 1 electron to achieve octet)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Bohr Atom Shell Configuration Sandbox",
      "objective": "Vary atomic number Z from 1 to 20 to observe electron filling across K, L, and M shells.",
      "instructions": "Slide atomic number Z to watch electrons populate concentric orbital rings.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "z_num",
          "label": "Atomic Number Z",
          "description": "Proton count defining element",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 11,
          "unit": "protons"
        }
      ],
      "guidingQuestions": [
        "At which atomic numbers does an outer shell close with a noble gas octet?"
      ],
      "whatToObserve": [
        "Shells close at Z = 2 (Helium, K=2), Z = 10 (Neon, 2,8), and Z = 18 (Argon, 2,8,8)."
      ],
      "takeawayInsight": "Valence shell electron configuration dictates elemental chemical periodicity."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: States of Matter & Kinetic Molecular Theory
  // =========================================================================
  {
  "id": "chem-matter-states",
  "slug": "matter-states",
  "title": "States of Matter & Kinetic Molecular Theory",
  "subtitle": "Intermolecular forces, Brownian motion, sublimation, and phase diagrams",
  "subjectId": "chemistry",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Matter exists in solid, liquid, gas, and plasma states governed by kinetic molecular energy versus intermolecular attractive forces. Temperature measures average particle kinetic energy, driving phase transitions.",
  "whyItMatters": "Essential for cryogenic refrigeration, liquefied natural gas (LNG) transport, aerosol propellant packaging, and atmospheric meteorological cycles.",
  "learningObjectives": [
    "Explain macroscopic properties of solids, liquids, and gases via Kinetic Molecular Theory.",
    "Describe Brownian motion and diffusion as direct evidence of particle agitation.",
    "Analyze phase transitions: melting, boiling, condensation, freezing, and sublimation."
  ],
  "coreQuestions": [
    "Why does an open perfume bottle scent diffuse across an entire room without mechanical air currents?",
    "Why does pressure decrease boiling temperature at high mountain altitudes?"
  ],
  "prerequisites": [
    "Basic units of mass and volume",
    "Temperature concepts"
  ],
  "keyTerms": [
    {
      "term": "Brownian Motion",
      "definition": "The continuous, rapid, random zigzag motion of microscopic particles suspended in a fluid."
    },
    {
      "term": "Sublimation",
      "definition": "The direct transition of a solid to the gaseous state without passing through the liquid phase (e.g., dry ice, camphor)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Macroscopic properties of matter are the statistical manifestation of trillions of jiggling molecules in collision.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Kinetic Molecular Postulates",
          "subtitle": "Intermolecular spacing, attraction, and kinetic velocity",
          "paragraphs": [
            "Matter is composed of discrete particles with intermolecular spaces between them. In solids, intermolecular forces are strongest, keeping particles vibrating in fixed lattice positions. In liquids, particles slide past one another with intermediate spacing. In gases, kinetic energy overwhelms attractive forces, causing particles to move rapidly in straight lines."
          ],
          "bulletPoints": [
            "Solids: Definite shape, definite volume, nearly incompressible.",
            "Liquids: Indefinite shape, definite volume, low compressibility.",
            "Gases: Indefinite shape, indefinite volume, highly compressible."
          ],
          "callout": {
            "type": "axiom",
            "title": "Kinetic Temperature Invariant",
            "text": "Absolute thermodynamic temperature T (Kelvin) is directly proportional to average molecular kinetic energy: KE_avg = 3/2 k_B T."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Phase Changes & Evaporation vs Boiling",
          "subtitle": "Surface phenomenon vs bulk phenomenon",
          "paragraphs": [
            "Evaporation is a surface phenomenon occurring at all temperatures: high-energy particles escape the liquid surface, causing cooling. Boiling is a bulk phenomenon occurring only at the boiling point where saturated vapor pressure equals atmospheric pressure. At high elevations, lower atmospheric pressure lowers boiling point."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "States of matter balance kinetic thermal agitation against intermolecular attractive forces.",
        "Evaporation causes cooling because escaping molecules carry away above-average kinetic energy."
      ],
      "reflectionPrompt": "Why do municipal water towers store liquid water above ground level instead of pumping compressed steam?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Molecular Density and Particle Packing",
      "caption": "Comparing microscopic molecular arrangements across solid lattice, liquid cluster, and gas void.",
      "diagramTitle": "Three Regimes of Molecular Aggregation",
      "diagramDescription": "Side-by-side molecular boxes: Solid (ordered crystal lattice), Liquid (disordered close clusters), Gas (isolated flying particles).",
      "components": [
        {
          "id": "c1",
          "name": "Solid Phase",
          "role": "Rigid lattice",
          "description": "Molecules locked in fixed positions; low kinetic energy."
        },
        {
          "id": "c2",
          "name": "Liquid Phase",
          "role": "Fluid cluster",
          "description": "Molecules maintain contact while slipping past each other."
        },
        {
          "id": "c3",
          "name": "Gaseous Phase",
          "role": "Independent particles",
          "description": "Intermolecular space > 10x particle diameter; elastic collisions."
        }
      ],
      "visualSummary": "Thermal energy disrupts intermolecular bonding, expanding molecular spacing from solid to gas."
    },
    "examples-applications": {
      "overview": "Cryogenic liquid nitrogen preservation and freeze-drying pharmaceuticals.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Explaining Sublimation of Dry Ice",
          "difficulty": "Foundational",
          "contextOrPrompt": "Solid carbon dioxide (dry ice) sublimes directly into CO₂ gas at -78.5°C at 1 atm. Explain why it leaves zero liquid residue.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Inspect carbon dioxide phase diagram",
              "work": "The triple point of CO₂ occurs at 5.1 atmospheres of pressure and -56.6°C."
            },
            {
              "stepNumber": 2,
              "explanation": "Analyze atmospheric pressure condition",
              "work": "At 1.0 atm (below the triple point), liquid CO₂ cannot exist in thermodynamic equilibrium."
            },
            {
              "stepNumber": 3,
              "explanation": "Deduce phase transition",
              "work": "Heating solid CO₂ at 1 atm drives direct transition from solid to vapor (sublimation)."
            }
          ],
          "finalResult": "Dry ice sublimes directly to gas because atmospheric pressure is below its triple point.",
          "verificationTip": "Sublimation occurs when vapor pressure of the solid equals ambient pressure below the triple point."
        }
      ],
      "applications": [
        {
          "domain": "Cryogenics",
          "title": "Liquefied Natural Gas (LNG) Cryo-Transport",
          "context": "Cooling methane gas to -162°C to condense it into a liquid, reducing storage volume by 600 times.",
          "realWorldScenario": "Shipping 150,000 m³ of liquid methane across transoceanic tanker routes under atmospheric pressure.",
          "impactMetric": "Six-hundred-fold volumetric density condensation factor."
        }
      ],
      "selfCheckExercise": {
        "question": "Why does human perspiration cool the body on a hot day?",
        "hint": "Consider which molecules escape during evaporation and what happens to the remaining average kinetic energy.",
        "solution": "Perspiring water molecules with highest kinetic energy escape as vapor, lowering the average kinetic energy and temperature of the skin."
      }
    },
    "explore-experiment": {
      "activityTitle": "Kinetic Particle Simulator",
      "objective": "Vary temperature from 100 K to 600 K and watch particles transition from ordered solid to rapid gas.",
      "instructions": "Slide temperature slider to observe particle velocity and spatial separation increase.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "temp_k",
          "label": "Temperature T (Kelvin)",
          "description": "Absolute thermal energy level",
          "min": 50,
          "max": 600,
          "step": 25,
          "defaultValue": 300,
          "unit": "K"
        }
      ],
      "guidingQuestions": [
        "What happens to particle movement when temperature approaches absolute zero (0 K)?"
      ],
      "whatToObserve": [
        "Thermal vibrational motion drops to near zero as kinetic energy approaches minimum quantum ground state."
      ],
      "takeawayInsight": "Temperature directly dictates the kinetic agitation and phase state of matter."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: The Mole Concept & Stoichiometry
  // =========================================================================
  {
  "id": "chem-atoms-molecules-mole",
  "slug": "atoms-molecules-mole",
  "title": "The Mole Concept & Stoichiometry",
  "subtitle": "Avogadro’s constant 6.022 × 10²³, molar mass, and empirical formulas",
  "subjectId": "chemistry",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "The mole is the SI unit of amount of substance, bridging microscopic atomic mass to macroscopic gram quantities. One mole contains exactly 6.022 × 10²³ elementary entities (Avogadro’s number N_A). Moles n = mass / molar_mass.",
  "whyItMatters": "The central quantitative counting unit across all chemical manufacturing, pharmaceutical dosage compounding, and environmental pollution stoichiometry.",
  "learningObjectives": [
    "Define the mole as 6.022 × 10²³ entities and connect atomic mass (u) to molar mass (g/mol).",
    "Calculate number of moles, molecules, and atoms via n = m / M = N / N_A.",
    "Determine empirical and molecular formulas from percentage mass composition."
  ],
  "coreQuestions": [
    "Why is the mole defined such that 12 grams of Carbon-12 contains exactly one mole of atoms?",
    "How does Avogadro’s number connect daltons to grams?"
  ],
  "prerequisites": [
    "Atomic structure",
    "Molecular mass computation",
    "Ratios"
  ],
  "keyTerms": [
    {
      "term": "Avogadro’s Number (N_A)",
      "definition": "N_A = 6.02214076 × 10²³ entities per mole, the exact proportionality constant."
    },
    {
      "term": "Molar Mass (M)",
      "definition": "The mass in grams of one mole of a substance, numerically equal to its molecular weight in atomic mass units."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Because atoms are unimaginably small, chemists count particles by weighing macroscopic mole packages.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Avogadro’s Number and Molar Mass",
          "subtitle": "The macroscopic bridge: 1 u × N_A = 1 gram",
          "paragraphs": [
            "A single carbon-12 atom has mass 12 atomic mass units (u). Avogadro’s constant N_A = 6.022 × 10²³ is defined such that one mole of carbon-12 weighs exactly 12.000 grams. This ensures any molecule’s atomic weight in u translates directly into its molar mass in grams per mole (g/mol). For water (H₂O), molecular mass = 18 u, so 1 mole of water = 18 grams."
          ],
          "bulletPoints": [
            "Moles n = mass (g) / Molar Mass (g/mol).",
            "Particle count N = n × N_A.",
            "Molar gas volume at STP: 1 mole of any ideal gas occupies 22.4 Litres."
          ],
          "callout": {
            "type": "axiom",
            "title": "Avogadro’s Invariant",
            "text": "Equal volumes of all gases under identical temperature and pressure contain equal numbers of molecules."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Empirical and Molecular Formulas",
          "subtitle": "Simplest integer ratio vs true molecular stoichiometry",
          "paragraphs": [
            "The empirical formula expresses the simplest whole-number ratio of atoms in a compound; the molecular formula reflects the actual count. Glucose has empirical formula CH₂O (molar mass 30 g/mol) and molecular formula C₆H₁₂O₆ (molar mass 180 g/mol), where n = 180 / 30 = 6."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "One mole always contains 6.022 × 10²³ representative particles.",
        "Molar mass in g/mol is numerically identical to molecular weight in unified atomic mass units (u)."
      ],
      "reflectionPrompt": "Which contains more atoms: 1 gram of hydrogen gas (H₂) or 1 gram of gold (Au)?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Central Stoichiometric Mole Bridge",
      "caption": "Converting between mass (grams), amount (moles), particle count, and gas volume.",
      "diagramTitle": "Stoichiometric Conversion Road Map",
      "diagramDescription": "Central hub labeled Moles connected via arrows: ÷Molar Mass from grams, ×N_A to particles, ×22.4L to gas volume at STP.",
      "components": [
        {
          "id": "c1",
          "name": "Mass in Grams",
          "role": "Weighable input",
          "description": "Macroscopic physical balance reading."
        },
        {
          "id": "c2",
          "name": "Central Mole Hub (n)",
          "role": "Stoichiometric core",
          "description": "Bridge metric: n = mass / Molar Mass."
        },
        {
          "id": "c3",
          "name": "Number of Molecules (N)",
          "role": "Microscopic particle count",
          "description": "N = n × 6.022 × 10²³."
        }
      ],
      "visualSummary": "All chemical calculations convert through the central mole hub before mapping to mass or volume."
    },
    "examples-applications": {
      "overview": "Pharmaceutical drug synthesizing and semiconductor dopant gas metering.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Molecules in a Water Droplet",
          "difficulty": "Advanced",
          "contextOrPrompt": "A drop of water has mass 0.054 grams. Calculate the number of water molecules and total hydrogen atoms present.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate molar mass of water H₂O",
              "work": "M = 2(1.008) + 16.00 = 18.016 g/mol ≈ 18.0 g/mol."
            },
            {
              "stepNumber": 2,
              "explanation": "Find moles of water n = m / M",
              "work": "n = 0.054 g / 18.0 g/mol = 0.003 moles (3.0 × 10⁻³ mol)."
            },
            {
              "stepNumber": 3,
              "explanation": "Multiply by Avogadro’s number",
              "work": "N = n × N_A = (3.0 × 10⁻³) · (6.022 × 10²³) = 1.807 × 10²¹ molecules."
            },
            {
              "stepNumber": 4,
              "explanation": "Count hydrogen atoms (2 per molecule)",
              "work": "H atoms = 2 × (1.807 × 10²¹) = 3.614 × 10²¹ atoms."
            }
          ],
          "finalResult": "The droplet contains 1.81 × 10²¹ water molecules and 3.61 × 10²¹ hydrogen atoms.",
          "verificationTip": "Remember that each H₂O molecule contains two hydrogen atoms and one oxygen atom."
        }
      ],
      "applications": [
        {
          "domain": "Industrial Chemistry",
          "title": "Haber-Bosch Ammonia Synthesis Stoichiometry",
          "context": "Reacting N₂ and H₂ gases under 200 atm pressure in exact 1:3 mole ratio to produce NH₃ fertilizer.",
          "realWorldScenario": "Feeding 28 metric tons of N₂ with 6 metric tons of H₂ to produce 34 tons of ammonia with zero unused reactant.",
          "impactMetric": "Ninety-nine percent stoichiometric utilization efficiency."
        }
      ],
      "selfCheckExercise": {
        "question": "What is the volume occupied by 4.4 g of carbon dioxide gas (CO₂) at STP? (Molar mass = 44 g/mol).",
        "hint": "Find moles n = 4.4 / 44, then multiply by 22.4 L/mol.",
        "solution": "n = 0.1 mol. Volume = 0.1 × 22.4 L = 2.24 Litres."
      }
    },
    "explore-experiment": {
      "activityTitle": "Mole & Particle Quantity Converter",
      "objective": "Vary mass of a substance to observe real-time calculation of moles and atomic particle counts.",
      "instructions": "Slide mass to observe particle counter reach trillions of billions of molecules.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "mass_g",
          "label": "Mass m (grams)",
          "description": "Sample weight",
          "min": 1,
          "max": 100,
          "step": 1,
          "defaultValue": 18,
          "unit": "g"
        },
        {
          "id": "mol_weight",
          "label": "Molar Mass (g/mol)",
          "description": "Substance molecular weight (H₂O=18, CO₂=44, NaCl=58.5)",
          "min": 10,
          "max": 100,
          "step": 1,
          "defaultValue": 18,
          "unit": "g/mol"
        }
      ],
      "guidingQuestions": [
        "If mass equals molar mass, how many molecules does the sample contain?"
      ],
      "whatToObserve": [
        "When mass = molar mass, n = 1.0, containing exactly 6.022 × 10²³ molecules."
      ],
      "takeawayInsight": "The mole scale unifies macroscopic laboratory measurements with microscopic particle counts."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Water: Solutions, Solubility & Hardness
  // =========================================================================
  {
  "id": "chem-water-solutions",
  "slug": "water-solutions",
  "title": "Water: Solutions, Solubility & Hardness",
  "subtitle": "Universal solvent, hydrogen bonding, water of crystallization, and softening",
  "subjectId": "chemistry",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Water’s bent molecular geometry and strong dipole moment make it the universal solvent. It hydrates ionic lattices, incorporates into crystals as water of crystallization, and exhibits temporary vs permanent hardness.",
  "whyItMatters": "Essential for boiler scale prevention in power plants, industrial soap cleansing efficiency, potable water filtration, and marine ecosystems.",
  "learningObjectives": [
    "Explain water’s solvent power through polarity and hydrogen bonding.",
    "Define water of crystallization and explain efflorescence and deliquescence.",
    "Differentiate temporary hardness (bicarbonates) from permanent hardness (chlorides/sulphates) and methods of softening."
  ],
  "coreQuestions": [
    "Why does ice float on liquid water, exhibiting maximum density at 4°C?",
    "Why does soap form insoluble curds in hard water?"
  ],
  "prerequisites": [
    "States of matter",
    "Ionic and covalent bonding"
  ],
  "keyTerms": [
    {
      "term": "Water of Crystallisation",
      "definition": "The fixed number of water molecules chemically bonded into the crystal structure of a salt (e.g. CuSO₄·5H₂O)."
    },
    {
      "term": "Hard Water",
      "definition": "Water containing dissolved calcium and magnesium ions that prevents lather formation with soap."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Water’s anomalous physical properties stem from an intricate, dynamic network of intermolecular hydrogen bonds.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Polar Dipole & Water of Crystallisation",
          "subtitle": "H₂O geometry and hydrated crystal salts",
          "paragraphs": [
            "With an electronegativity difference of 1.24 and a 104.5° bent bond angle, water is highly polar. Its positive hydrogen ends cluster around anions while negative oxygen clusters around cations, tearing ionic crystal lattices apart. In hydrated crystals, water molecules coordinate around metal ions: Blue vitriol CuSO₄·5H₂O loses its water of crystallization upon heating to become anhydrous white CuSO₄."
          ],
          "bulletPoints": [
            "Efflorescence: Loss of crystal water to atmosphere (e.g., washing soda Na₂CO₃·10H₂O).",
            "Deliquescence: Absorbing atmospheric moisture to dissolve into a liquid solution (e.g., CaCl₂)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Hydrogen Bond Invariant",
            "text": "Hydrogen bonds create high dielectric constant (ε_r ≈ 80), reducing electrostatic attraction between dissolved ions by 98%."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Hardness of Water and Softening Techniques",
          "subtitle": "Temporary vs permanent hardness",
          "paragraphs": [
            "Temporary hardness is caused by dissolved calcium and magnesium bicarbonates: Ca(HCO₃)₂ decomposes upon boiling to precipitate insoluble carbonate scale CaCO₃: Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂. Permanent hardness caused by CaSO₄ or MgCl₂ cannot be removed by boiling; it requires washing soda (Na₂CO₃ + CaSO₄ → CaCO₃↓ + Na₂SO₄) or synthetic ion-exchange resin beads."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Water’s polarity enables hydration and dissolution of ionic salts.",
        "Temporary hardness is removed by boiling; permanent hardness requires chemical ion-exchange softening."
      ],
      "reflectionPrompt": "Why is boiler scale formation in industrial steam boilers an extreme engineering hazard?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Hydration Shells & Crystal Water Lattices",
      "caption": "Water dipoles surrounding positive sodium and negative chloride ions in solution.",
      "diagramTitle": "Ionic Solvation and Hydrogen Bond Lattice",
      "diagramDescription": "Central cation surrounded by oxygen dipoles pointing inward; central anion surrounded by hydrogen dipoles pointing inward.",
      "components": [
        {
          "id": "c1",
          "name": "Polar Water Dipole",
          "role": "Electrostatic cage",
          "description": "Oxygen (δ-) and hydrogen (δ+) ends organizing around ions."
        },
        {
          "id": "c2",
          "name": "Solvated Cation (Na⁺)",
          "role": "Hydrated ion",
          "description": "Surrounded by four to six coordinated water molecules."
        },
        {
          "id": "c3",
          "name": "Hydrated Crystal Salt",
          "role": "Crystalline hydrate",
          "description": "Fixed stoichiometric water molecules incorporated in crystal lattice."
        }
      ],
      "visualSummary": "Hydration shells shield dissolved ions, overcoming crystal lattice energy."
    },
    "examples-applications": {
      "overview": "Municipal water softening plants and industrial boiler feed treatment.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Removing Temporary Hardness via Boiling",
          "difficulty": "Foundational",
          "contextOrPrompt": "A sample of water contains 16.2 mg of dissolved Ca(HCO₃)₂ per litre. Write the precipitation reaction upon boiling and calculate the mass of CaCO₃ precipitate formed per litre.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Write thermal decomposition equation",
              "work": "Ca(HCO₃)₂ (aq) → CaCO₃ (s) + H₂O (l) + CO₂ (g)."
            },
            {
              "stepNumber": 2,
              "explanation": "Calculate molar masses",
              "work": "Ca(HCO₃)₂ = 40 + 2(1 + 12 + 48) = 162 g/mol; CaCO₃ = 40 + 12 + 48 = 100 g/mol."
            },
            {
              "stepNumber": 3,
              "explanation": "Compute precipitate mass",
              "work": "Moles = 0.0162 g / 162 g/mol = 0.0001 mol. Mass of CaCO₃ = 0.0001 mol × 100 g/mol = 0.010 g = 10.0 mg."
            }
          ],
          "finalResult": "10.0 mg of solid CaCO₃ precipitates out of solution upon boiling.",
          "verificationTip": "Notice the 162 : 100 stoichiometric ratio between calcium bicarbonate and calcium carbonate."
        }
      ],
      "applications": [
        {
          "domain": "Power Generation",
          "title": "Thermal Power Plant Boiler Feed Demineralization",
          "context": "Using dual-bed cation and anion exchange resins to eliminate all dissolved minerals from boiler feed water.",
          "realWorldScenario": "Preventing thermal insulating scale deposition on 600°C supercritical boiler tubes.",
          "impactMetric": "Feed water electrical conductivity below 0.1 microsiemens per centimetre."
        }
      ],
      "selfCheckExercise": {
        "question": "What happens when anhydrous copper(II) sulphate (white) is exposed to water drops?",
        "hint": "Think about water of crystallization rehydration.",
        "solution": "It rehydrates into copper(II) sulphate pentahydrate (CuSO₄·5H₂O), turning vibrant royal blue."
      }
    },
    "explore-experiment": {
      "activityTitle": "Water Hardness & Softening Simulator",
      "objective": "Vary concentrations of calcium bicarbonate and calcium sulphate to test boiling and chemical softening.",
      "instructions": "Select boiling or washing soda treatment to observe dissolved ion precipitate removal.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "temp_hard",
          "label": "Temporary Hardness Ca(HCO₃)₂ (ppm)",
          "description": "Concentration of bicarbonate hardness",
          "min": 0,
          "max": 300,
          "step": 25,
          "defaultValue": 150,
          "unit": "ppm"
        },
        {
          "id": "perm_hard",
          "label": "Permanent Hardness CaSO₄ (ppm)",
          "description": "Concentration of sulphate hardness",
          "min": 0,
          "max": 300,
          "step": 25,
          "defaultValue": 100,
          "unit": "ppm"
        }
      ],
      "guidingQuestions": [
        "Does boiling water remove the permanent calcium sulphate hardness?"
      ],
      "whatToObserve": [
        "Boiling precipitates the temporary bicarbonate completely, but permanent hardness remains 100% in solution."
      ],
      "takeawayInsight": "Different chemical species of hardness demand distinct physical and chemical softening treatments."
    }
  }
},

  // =========================================================================
  // CHEMISTRY: Electrolysis & Electrochemical Cells
  // =========================================================================
  {
  "id": "chem-electrolysis-redox",
  "slug": "electrolysis-redox",
  "title": "Electrolysis & Electrochemical Cells",
  "subtitle": "Faraday’s laws, preferential discharge, electroplating, and refining",
  "subjectId": "chemistry",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Electrolysis uses direct electrical current to drive non-spontaneous chemical reactions. Cations reduce at the cathode while anions oxidize at the anode, governed by preferential discharge series and Faraday’s laws of electrolysis (m = Z·I·t).",
  "whyItMatters": "Essential for industrial aluminium extraction, copper electro-refining, chlorine and caustic soda production (chlor-alkali), and green hydrogen water electrolysis.",
  "learningObjectives": [
    "Explain migration of ions towards cathode and anode during electrolysis.",
    "Apply preferential discharge rules to predict products of aqueous salt electrolysis.",
    "Calculate electroplated metal mass using Faraday’s First Law: m = Z·I·t."
  ],
  "coreQuestions": [
    "Why does reduction always occur at the cathode and oxidation at the anode?",
    "Why is hydrogen gas evolved at the cathode rather than sodium metal during electrolysis of aqueous brine?"
  ],
  "prerequisites": [
    "Ionic bonding",
    "Current electricity",
    "Redox reactions"
  ],
  "keyTerms": [
    {
      "term": "Electrolysis",
      "definition": "The decomposition of an electrolyte by passing direct electric current through it."
    },
    {
      "term": "Faraday’s First Law",
      "definition": "The mass of a substance deposited or liberated at an electrode is directly proportional to quantity of electric charge: m = Z·Q = Z·I·t."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Electrolysis converts electrical energy into chemical potential by forcing electrons into non-spontaneous pathways.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Mechanism of Electrolytic Conduction",
          "subtitle": "Cathodic reduction and Anodic oxidation",
          "paragraphs": [
            "An electrolytic cell contains an electrolyte and two conductive electrodes connected to a DC source. Positive cations migrate to the negative cathode where they gain electrons (Reduction: Mⁿ⁺ + ne⁻ → M). Negative anions migrate to the positive anode where they lose electrons (Oxidation: 2X⁻ → X₂ + 2e⁻). PANIC acronym: Positive Anode, Negative Is Cathode."
          ],
          "bulletPoints": [
            "In aqueous solutions, water ions (H⁺, OH⁻) compete with salt ions.",
            "Preferential discharge series: Cations: K⁺ < Na⁺ < Ca²⁺ < Mg²⁺ < Al³⁺ < Zn²⁺ < Fe²⁺ < Pb²⁺ < H⁺ < Cu²⁺ < Ag⁺. Lower ions discharge preferentially."
          ],
          "callout": {
            "type": "axiom",
            "title": "Electrochemical Invariant",
            "text": "Current in electrolyte is carried by mobile ions; in outer external circuit, current is carried exclusively by electrons."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Faraday’s Laws and Electroplating",
          "subtitle": "m = Z·I·t and surface deposition",
          "paragraphs": [
            "Faraday’s First Law: Mass deposited m = Z·I·t, where Z is the electrochemical equivalent of the substance (g/Coulomb). In electroplating, the article to be plated is made the cathode; the plating metal is the anode; the electrolyte is a soluble salt of the plating metal. This produces smooth, adherent decorative and protective metal coatings."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Reduction occurs at the cathode; oxidation occurs at the anode.",
        "Preferential discharge dictates product identity when multiple ions compete in aqueous media."
      ],
      "reflectionPrompt": "Why must direct current (DC) be used for electroplating instead of alternating current (AC)?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Electrolytic Cell and Ion Migration",
      "caption": "Direct current driving ion migration and selective discharge at electrode surfaces.",
      "diagramTitle": "Electroplating of a Spoon with Silver",
      "diagramDescription": "Silver anode dissolving (Ag → Ag⁺ + e⁻) while silver ions reduce onto spoon cathode (Ag⁺ + e⁻ → Ag) in AgNO₃ bath.",
      "components": [
        {
          "id": "c1",
          "name": "Cathode (Object to Plate)",
          "role": "Reduction site",
          "description": "Negative electrode where silver ions gain electrons: Ag⁺ + e⁻ → Ag(s)."
        },
        {
          "id": "c2",
          "name": "Anode (Pure Silver Plate)",
          "role": "Oxidation site",
          "description": "Positive electrode replenishing silver ions: Ag(s) → Ag⁺ + e⁻."
        },
        {
          "id": "c3",
          "name": "Electrolyte (Silver Salt)",
          "role": "Ionic conductor",
          "description": "Maintains constant Ag⁺ concentration in solution."
        }
      ],
      "visualSummary": "Electrochemical potential forces atoms off the anode to plate onto the cathode with atomic precision."
    },
    "examples-applications": {
      "overview": "Electrolytic chlor-alkali production and green hydrogen water electrolysis.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Copper Deposited during Electro-Refining",
          "difficulty": "Advanced",
          "contextOrPrompt": "A current of 5.0 A is passed through a copper sulphate cell for 32 minutes and 10 seconds (1930 seconds). Find the mass of copper deposited. (Z = 0.000329 g/C).",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate total electric charge Q = I · t",
              "work": "Q = 5.0 A × 1930 s = 9,650 Coulombs."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply Faraday’s First Law m = Z · Q",
              "work": "m = 0.000329 g/C × 9650 C = 3.175 grams."
            }
          ],
          "finalResult": "Exactly 3.18 grams of copper metal is deposited on the cathode.",
          "verificationTip": "Convert all time units to seconds before calculating electric charge in Coulombs."
        }
      ],
      "applications": [
        {
          "domain": "Clean Energy",
          "title": "Proton Exchange Membrane (PEM) Water Electrolysis",
          "context": "Splitting purified water into zero-emission green hydrogen fuel and pure oxygen using renewable solar electricity.",
          "realWorldScenario": "Operating a 1 MW electrolyzer stack generating 200 kg of hydrogen gas per day at 30 bar pressure.",
          "impactMetric": "Fifty kilowatt-hours electrical input per kilogram of hydrogen produced."
        }
      ],
      "selfCheckExercise": {
        "question": "During electrolysis of molten lead bromide (PbBr₂), what products form at the cathode and anode?",
        "hint": "Pb²⁺ is the cation; Br⁻ is the anion.",
        "solution": "Cathode: Molten lead metal (Pb²⁺ + 2e⁻ → Pb). Anode: Reddish-brown bromine gas (2Br⁻ → Br₂ + 2e⁻)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Electrolytic Cell & Electroplating Sandbox",
      "objective": "Vary current and plating duration to observe deposited mass and layer thickness accumulation.",
      "instructions": "Slide current I and time t to observe electroplated metal mass calculate according to Faraday’s law.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "current",
          "label": "Current I (Amperes)",
          "description": "Electrical current through bath",
          "min": 1,
          "max": 20,
          "step": 1,
          "defaultValue": 5,
          "unit": "A"
        },
        {
          "id": "time_min",
          "label": "Plating Time (minutes)",
          "description": "Duration of electrolysis",
          "min": 5,
          "max": 120,
          "step": 5,
          "defaultValue": 30,
          "unit": "min"
        }
      ],
      "guidingQuestions": [
        "If current is doubled while plating time is halved, how does deposited mass change?"
      ],
      "whatToObserve": [
        "Total charge Q = I · t remains identical, depositing the exact same mass of metal."
      ],
      "takeawayInsight": "Total electrodeposited mass depends exclusively on total electrical charge passed."
    }
  }
},

  // =========================================================================
  // BIOLOGY: The Cell: Fundamental Unit of Life
  // =========================================================================
  {
  "id": "bio-cell-unit-of-life",
  "slug": "cell-unit-of-life",
  "title": "The Cell: Fundamental Unit of Life",
  "subtitle": "Cell theory, organelle ultrastructure, membrane transport, and prokaryote vs eukaryote",
  "subjectId": "biology",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "The cell is the basic structural and functional unit of all living organisms. Plant and animal cells compartmentalize specialized metabolic biochemistry within membrane-bound organelles: nucleus, mitochondria, endoplasmic reticulum, and Golgi apparatus.",
  "whyItMatters": "Essential for cancer biology, genetic engineering CRISPR therapeutics, vaccine cell culture manufacturing, and regenerative stem cell medicine.",
  "learningObjectives": [
    "State the postulates of modern Cell Theory (Schleiden, Schwann, Virchow).",
    "Compare and contrast prokaryotic and eukaryotic cellular structures.",
    "Detail the specialized functions of nucleus, mitochondria, ribosomes, ER, and chloroplasts."
  ],
  "coreQuestions": [
    "Why is the cell membrane described as a \"fluid mosaic\" of lipids and proteins?",
    "Why are mitochondria termed the semi-autonomous powerhouses of the cell?"
  ],
  "prerequisites": [
    "Basic microscope concepts",
    "Living organisms characteristics"
  ],
  "keyTerms": [
    {
      "term": "Cell Theory",
      "definition": "All living organisms are composed of cells, the cell is the basic unit of life, and all cells arise from pre-existing cells."
    },
    {
      "term": "Phospholipid Bilayer",
      "definition": "The semi-permeable amphipathic lipid membrane regulating selective molecular transport in and out of cells."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Life is defined at the cellular boundary, where metabolic homeostasis resists thermodynamic entropy.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Cell Theory and Architecture",
          "subtitle": "Omnis cellula e cellula (Virchow)",
          "paragraphs": [
            "Cell Theory establishes that every organism is composed of one or more cells. Prokaryotic cells (bacteria) lack membrane-bound nuclei and organelles, containing circular nucleoid DNA. Eukaryotic cells possess compartmentalized membrane-bound organelles that isolate specialized metabolic reactions."
          ],
          "bulletPoints": [
            "Plant cells: Rigid cellulose cell wall, large central vacuole, photosynthetic chloroplasts.",
            "Animal cells: Flexible plasma membrane, centrioles for spindle formation, lysosomes."
          ],
          "callout": {
            "type": "axiom",
            "title": "Compartmentalization Invariant",
            "text": "Membrane-bound organelles allow mutually incompatible biochemical reactions (e.g. synthesis vs digestion) to occur simultaneously."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Organelle Specialization & Membrane Transport",
          "subtitle": "Mitochondria, Endoplasmic Reticulum, and Golgi apparatus",
          "paragraphs": [
            "The nucleus stores chromosomal DNA. The rough ER synthesizes proteins using attached ribosomes; the smooth ER synthesizes lipids. The Golgi apparatus modifies, sorts, and packages proteins into vesicles. Mitochondria produce ATP via cellular respiration across folded cristae inner membranes."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Cells compartmentalize biochemical pathways within membrane-bound organelles.",
        "The semi-permeable phospholipid membrane regulates passive and active molecular exchange."
      ],
      "reflectionPrompt": "Why do mitochondria and chloroplasts possess their own circular DNA and 70S ribosomes (Endosymbiotic Theory)?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Eukaryotic Cell Ultrastructure",
      "caption": "Cutaway view of plant and animal cell showing compartmentalized organelle architecture.",
      "diagramTitle": "Eukaryotic Organelle Anatomy and Transport Pathways",
      "diagramDescription": "Central nucleus surrounded by rough ER cisternae, Golgi stacks, and cristae-folded mitochondria.",
      "components": [
        {
          "id": "c1",
          "name": "Nucleus & Nuclear Envelope",
          "role": "Genetic command center",
          "description": "Double membrane containing chromatin and nucleolus."
        },
        {
          "id": "c2",
          "name": "Mitochondrion",
          "role": "ATP powerhouse",
          "description": "Dual-membrane organelle driving oxidative phosphorylation."
        },
        {
          "id": "c3",
          "name": "Endoplasmic Reticulum",
          "role": "Synthesis highway",
          "description": "Tubular network studded with ribosomes for protein synthesis."
        }
      ],
      "visualSummary": "Eukaryotic cells operate as complex biochemical factories with specialized organelle assembly lines."
    },
    "examples-applications": {
      "overview": "Monoclonal antibody manufacturing and CAR-T cell immunotherapy.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Predicting Osmotic Behavior in Red Blood Cells",
          "difficulty": "Foundational",
          "contextOrPrompt": "A drop of human blood is placed into pure distilled water (hypotonic solution). Predict and explain what happens to the red blood cells.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Analyze solute and water concentration gradient",
              "work": "Distilled water has lower solute concentration (hypotonic) than red blood cell cytoplasm."
            },
            {
              "stepNumber": 2,
              "explanation": "Determine direction of net endosmosis",
              "work": "Water moves into the red blood cell across the semi-permeable plasma membrane via endosmosis."
            },
            {
              "stepNumber": 3,
              "explanation": "Predict anatomical consequence in animal cells lacking cell walls",
              "work": "Without a rigid cell wall to withstand turgor pressure, the cell swells and bursts (hemolysis)."
            }
          ],
          "finalResult": "Red blood cells undergo endosmosis, swell, and burst (hemolysis).",
          "verificationTip": "Plant cells in hypotonic solutions become turgid rather than bursting because of their tough cellulose cell wall."
        }
      ],
      "applications": [
        {
          "domain": "Biopharmaceuticals",
          "title": "CHO Cell Line Bioreactor Expression",
          "context": "Culturing genetically engineered Chinese Hamster Ovary (CHO) cells to express human therapeutic proteins.",
          "realWorldScenario": "Maximizing protein glycosylation in 10,000-litre stainless steel cellular bioreactors.",
          "impactMetric": "Five grams of monoclonal antibody protein expressed per litre of cell culture."
        }
      ],
      "selfCheckExercise": {
        "question": "Which cell organelle is known as the \"suicide bag\" of the cell and why?",
        "hint": "Contains digestive hydrolytic enzymes.",
        "solution": "Lysosomes; when damaged, they rupture and their digestive hydrolytic enzymes digest the cell itself (autolysis)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Cellular Organelle & Transport Sandbox",
      "objective": "Vary external solute concentration to observe osmosis and turgor pressure changes in cells.",
      "instructions": "Slide external tonicity to witness transitions between plasmolysis, flaccidity, and turgidity.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "tonicity",
          "label": "External Solution Tonicity",
          "description": "1: Hypotonic (0.1%), 2: Isotonic (0.9%), 3: Hypertonic (5.0%)",
          "min": 1,
          "max": 3,
          "step": 1,
          "defaultValue": 2,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "What occurs to plant cells in a concentrated salt solution (hypertonic)?"
      ],
      "whatToObserve": [
        "Water exits the cell (exosmosis), causing the cytoplasm to shrink away from the cell wall (plasmolysis)."
      ],
      "takeawayInsight": "Osmotic pressure gradients dictate cellular water balance and mechanical turgidity."
    }
  }
},

  // =========================================================================
  // BIOLOGY: Cell Division, Mitosis & Mendelian Genetics
  // =========================================================================
  {
  "id": "bio-cell-division-genetics",
  "slug": "cell-division-genetics",
  "title": "Cell Division, Mitosis & Mendelian Genetics",
  "subtitle": "Mitosis vs meiosis, chromosome karyotypes, and Mendel’s laws of inheritance",
  "subjectId": "biology",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Cell division guarantees organismal growth and reproductive continuity. Mitosis produces two genetically identical diploid daughter cells; meiosis produces four diverse haploid gametes. Gregor Mendel’s laws of segregation and independent assortment govern genetic trait transmission.",
  "whyItMatters": "The foundation of medical clinical genetics, selective crop hybridization, forensic DNA profiling, and hereditary disease diagnosis.",
  "learningObjectives": [
    "Detail the stages of mitosis (Prophase, Metaphase, Anaphase, Telophase).",
    "Differentiate mitotic equational division from meiotic reductional division.",
    "Construct Punnett squares for monohybrid crosses and verify Mendel’s 3:1 phenotypic ratio."
  ],
  "coreQuestions": [
    "Why is meiosis essential for sexually reproducing organisms to prevent chromosome doubling in each generation?",
    "How does independent assortment generate vast genetic variation?"
  ],
  "prerequisites": [
    "Cell structure and nucleus",
    "Basic reproduction concepts"
  ],
  "keyTerms": [
    {
      "term": "Mitosis",
      "definition": "Equational nuclear division producing two genetically identical daughter cells with the same chromosome number."
    },
    {
      "term": "Law of Segregation",
      "definition": "Allele pairs separate during gamete formation so that each gamete carries only one allele for each gene."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Genetics is the software code of biology, replicated by mitosis and shuffled by meiosis.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Mitosis and the Cell Cycle",
          "subtitle": "Equational division for growth and tissue repair",
          "paragraphs": [
            "The cell cycle consists of Interphase (G₁, S, G₂ phases) where DNA replicates, followed by Mitosis (M phase). Prophase: Chromatin condenses into chromosomes, nuclear envelope breaks down. Metaphase: Chromosomes align along equatorial plate. Anaphase: Sister chromatids separate towards opposite poles. Telophase: Nuclear envelopes reform, followed by cytokinesis."
          ],
          "bulletPoints": [
            "Mitosis produces 2 diploid (2n) daughter cells.",
            "Meiosis involves two consecutive divisions producing 4 haploid (n) gametes with crossing over."
          ],
          "callout": {
            "type": "axiom",
            "title": "Genetic Equational Invariant",
            "text": "DNA replication in S-phase followed by precise anaphase disjunction preserves identical karyotypes across somatic cells."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Mendelian Inheritance & The Monohybrid Cross",
          "subtitle": "Dominant vs recessive alleles and Punnett squares",
          "paragraphs": [
            "Gregor Mendel crossed pure-breeding tall (TT) and dwarf (tt) pea plants. The F₁ generation showed only the tall phenotype (Tt, Law of Dominance). Self-pollinating F₁ produced the F₂ generation in a 3:1 phenotypic ratio (3 tall : 1 dwarf) and 1:2:1 genotypic ratio (1 TT : 2 Tt : 1 tt), demonstrating the Law of Segregation."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Mitosis maintains chromosome stability in somatic cells; meiosis reduces chromosome number in gametes.",
        "Mendel’s discrete particulate factors (genes) segregate independently into gametes."
      ],
      "reflectionPrompt": "Why is crossing over in Prophase I of meiosis considered the primary engine of evolutionary diversity?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Stages of Mitosis and Spindle Segregation",
      "caption": "Sequential progression from chromosome condensation to sister chromatid separation.",
      "diagramTitle": "Mitotic Division Chromosome Trajectories",
      "diagramDescription": "Four-panel diagram showing Prophase, Metaphase plate alignment, Anaphase sister chromatid migration, and Telophase cleavage furrow.",
      "components": [
        {
          "id": "c1",
          "name": "Centromere & Spindle Fibers",
          "role": "Mechanical tugger",
          "description": "Microtubule spindles attached to kinetochore plates."
        },
        {
          "id": "c2",
          "name": "Equatorial Metaphase Plate",
          "role": "Chromosome lineup",
          "description": "Central plane where chromosomes align during metaphase."
        },
        {
          "id": "c3",
          "name": "Separated Chromatids",
          "role": "Daughter chromosomes",
          "description": "Identical chromatids pulled to opposite poles during anaphase."
        }
      ],
      "visualSummary": "Spindle fibers ensure that each new daughter cell receives an identical set of genetic instructions."
    },
    "examples-applications": {
      "overview": "Pre-implantation genetic screening and agricultural hybrid seed breeding.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Solving a Monohybrid Punnett Square for Eye Color",
          "difficulty": "Advanced",
          "contextOrPrompt": "Two heterozygous brown-eyed parents (Bb) have a child. Brown eyes (B) are dominant over blue eyes (b). Find the probability that the child has blue eyes.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify parent gamete alleles",
              "work": "Each parent produces gametes with allele B (50%) and allele b (50%)."
            },
            {
              "stepNumber": 2,
              "explanation": "Construct 2x2 Punnett square combinations",
              "work": "BB (25%), Bb (25%), Bb (25%), bb (25%)."
            },
            {
              "stepNumber": 3,
              "explanation": "Identify blue-eyed homozygous recessive genotype",
              "work": "Only the bb genotype displays blue eyes. Probability = 1/4 = 25%."
            }
          ],
          "finalResult": "The probability of having a blue-eyed child is 25% (1 in 4).",
          "verificationTip": "Dominant phenotypes result from either homozygous dominant (BB) or heterozygous (Bb) genotypes."
        }
      ],
      "applications": [
        {
          "domain": "Clinical Genetics",
          "title": "Cystic Fibrosis Carrier Risk Assessment",
          "context": "Calculating transmission probability for autosomal recessive genetic disorders in prospective parents.",
          "realWorldScenario": "Screening prospective parents who are both asymptomatic carriers (Cc) of CFTR gene mutations.",
          "impactMetric": "Twenty-five percent homozygous risk probability per conception."
        }
      ],
      "selfCheckExercise": {
        "question": "A human somatic cell has 46 chromosomes. How many chromosomes are present in a human sperm or ovum?",
        "hint": "Meiosis halves the diploid (2n) count to haploid (n).",
        "solution": "23 chromosomes (haploid, n = 23)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Mendelian Punnett Square Simulator",
      "objective": "Cross different parental genotypes and observe resulting offspring genotypic and phenotypic ratios.",
      "instructions": "Select parent 1 and parent 2 allele pairs to watch Punnett square probabilities update.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "p1_allele",
          "label": "Parent 1 Genotype",
          "description": "1: TT (Homozygous Dom), 2: Tt (Heterozygous), 3: tt (Homozygous Rec)",
          "min": 1,
          "max": 3,
          "step": 1,
          "defaultValue": 2,
          "unit": "units"
        },
        {
          "id": "p2_allele",
          "label": "Parent 2 Genotype",
          "description": "1: TT, 2: Tt, 3: tt",
          "min": 1,
          "max": 3,
          "step": 1,
          "defaultValue": 2,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "What is the phenotypic outcome when crossing pure tall (TT) with pure dwarf (tt)?"
      ],
      "whatToObserve": [
        "100% of offspring are heterozygous Tt and exhibit the tall phenotype (Law of Dominance)."
      ],
      "takeawayInsight": "Dominant alleles mask recessive phenotypes in heterozygous genetic combinations."
    }
  }
},

  // =========================================================================
  // BIOLOGY: Cellular Respiration & Human Metabolism
  // =========================================================================
  {
  "id": "bio-respiration-metabolism",
  "slug": "respiration-metabolism",
  "title": "Cellular Respiration & Human Metabolism",
  "subtitle": "Glycolysis, Krebs cycle, electron transport chain, and alveolar gas exchange",
  "subjectId": "biology",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Respiration is the biochemical breakdown of glucose to release biological energy in the form of ATP. Aerobic respiration converts C₆H₁₂O₆ + 6O₂ into 6CO₂ + 6H₂O + 38 ATP across cytoplasm and mitochondria, while anaerobic pathways produce lactate or ethanol.",
  "whyItMatters": "Essential for athletic endurance training, metabolic diabetes management, commercial brewing fermentation, and intensive care ventilator oxygenation.",
  "learningObjectives": [
    "Differentiate aerobic respiration (high ATP yield) from anaerobic fermentation.",
    "Trace the pathway of oxygen from alveoli into pulmonary capillaries via partial pressure gradients.",
    "Explain the role of hemoglobin in oxygen transportation and cellular ATP synthesis."
  ],
  "coreQuestions": [
    "Why does anaerobic respiration in human muscle produce painful lactic acid cramps?",
    "How do alveolar surface area and thin membranes optimize diffusion of respiratory gases?"
  ],
  "prerequisites": [
    "Cell structure (mitochondria)",
    "Basic chemical equations"
  ],
  "keyTerms": [
    {
      "term": "ATP (Adenosine Triphosphate)",
      "definition": "The universal molecular energy currency of all biological living systems."
    },
    {
      "term": "Alveoli",
      "definition": "Tiny, thin-walled air sacs in the lungs surrounded by capillaries, providing over 80 m² for gas diffusion."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Respiration is the cellular combustion engine of life, coupling carbon oxidation to phosphorylation of ADP into ATP.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Aerobic vs Anaerobic Biochemical Pathways",
          "subtitle": "Cytoplasmic glycolysis followed by mitochondrial oxidation",
          "paragraphs": [
            "Respiration initiates in the cytoplasm with Glycolysis: 6-carbon glucose is cleaved into two 3-carbon pyruvate molecules, generating net 2 ATP. In the presence of oxygen, pyruvate enters the mitochondrial matrix for the Krebs Cycle and Electron Transport Chain, yielding ~36-38 ATP per glucose. Without oxygen, anaerobic fermentation reduces pyruvate to lactic acid (muscles) or ethanol and CO₂ (yeast), yielding only 2 ATP."
          ],
          "bulletPoints": [
            "Aerobic equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP.",
            "Anaerobic in yeast: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP."
          ],
          "callout": {
            "type": "axiom",
            "title": "Thermodynamic Efficiency Invariant",
            "text": "Aerobic respiration captures ~40% of glucose free energy into ATP; the remaining 60% maintains mammalian endothermic body temperature."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Human Respiratory Mechanism",
          "subtitle": "Diaphragm contractions and alveolar gas exchange",
          "paragraphs": [
            "Inhalation occurs when the diaphragm contracts downward and external intercostal muscles expand the rib cage, lowering intrathoracic pressure below atmospheric pressure. Oxygen diffuses across the thin (0.5 µm) moist alveolar-capillary membrane down its partial pressure gradient (pO₂ 104 mmHg to 40 mmHg), binding reversibly to iron in hemoglobin."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Aerobic respiration yields 19 times more ATP per glucose molecule than anaerobic fermentation.",
        "Alveolar gas exchange operates purely through passive physical diffusion down partial pressure gradients."
      ],
      "reflectionPrompt": "Why is carbon monoxide (CO) gas rapidly lethal to humans even when present in small concentrations?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Alveolar Capillary Gas Exchange Interface",
      "caption": "Oxygen diffusing into capillary red blood cells while carbon dioxide diffuses into alveolar air.",
      "diagramTitle": "Pulmonary Microvascular Diffusion Mechanics",
      "diagramDescription": "Cross-section of single alveolus surrounded by pulmonary capillary bed showing counter-diffusion of O₂ and CO₂.",
      "components": [
        {
          "id": "c1",
          "name": "Alveolar Epithelium",
          "role": "Diffusion barrier",
          "description": "Ultra-thin squamous epithelial cell layer (~0.2 µm)."
        },
        {
          "id": "c2",
          "name": "Capillary Endothelium",
          "role": "Blood vessel wall",
          "description": "Endothelial lining facilitating red blood cell transit."
        },
        {
          "id": "c3",
          "name": "Erythrocyte Hemoglobin",
          "role": "Oxygen sponge",
          "description": "Red blood cell carrying oxygen as oxyhemoglobin Hb(O₂)₄."
        }
      ],
      "visualSummary": "Enormous surface area and ultra-thin membranes allow complete oxygen saturation within 0.25 seconds of capillary transit."
    },
    "examples-applications": {
      "overview": "Intensive care mechanical ventilation and high-altitude mountaineering acclimatization.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Energy Yield Difference in Exercise",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A sprinter consumes 2 moles of glucose under anaerobic conditions, while a marathon runner oxidizes 2 moles of glucose aerobically. Compare ATP outputs.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Compute anaerobic ATP yield",
              "work": "Anaerobic yield = 2 moles × 2 ATP/mol = 4 moles of ATP."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute aerobic ATP yield",
              "work": "Aerobic yield = 2 moles × 38 ATP/mol = 76 moles of ATP."
            },
            {
              "stepNumber": 3,
              "explanation": "Calculate ratio",
              "work": "76 / 4 = 19 times greater energy yield."
            }
          ],
          "finalResult": "The marathon runner generates 76 moles of ATP—nineteen times more energy than the sprinter from identical glucose mass.",
          "verificationTip": "Anaerobic metabolism prioritizes speed of ATP delivery over efficiency."
        }
      ],
      "applications": [
        {
          "domain": "Sports Physiology",
          "title": "VO₂ Max and Lactate Threshold Profiling",
          "context": "Measuring maximal oxygen uptake volume per minute during treadmill stress tests.",
          "realWorldScenario": "Determining the exact cardiovascular pace where aerobic metabolism transitions to anaerobic lactate accumulation.",
          "impactMetric": "Millilitres of oxygen utilized per kilogram body weight per minute (mL/kg/min)."
        }
      ],
      "selfCheckExercise": {
        "question": "Why does bread dough rise when yeast is added?",
        "hint": "What gas is produced during anaerobic alcoholic fermentation?",
        "solution": "Yeast ferments sugar into ethanol and carbon dioxide gas (CO₂); bubbles of CO₂ become trapped in the gluten matrix, causing the dough to expand."
      }
    },
    "explore-experiment": {
      "activityTitle": "Cellular Respiration & Exercise Metabolic Simulator",
      "objective": "Vary exercise intensity and oxygen availability to watch cells switch between aerobic and anaerobic lactic pathways.",
      "instructions": "Slide exercise exertion to observe oxygen deficit and lactic acid accumulation.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "exertion",
          "label": "Exercise Intensity (%)",
          "description": "Percent of VO₂ max exertion",
          "min": 20,
          "max": 100,
          "step": 10,
          "defaultValue": 50,
          "unit": "%"
        }
      ],
      "guidingQuestions": [
        "At what intensity does lactic acid begin to rapidly accumulate in muscle tissue?"
      ],
      "whatToObserve": [
        "Above 75% intensity (lactate threshold), oxygen delivery lags energy demand, driving rapid lactic acid accumulation."
      ],
      "takeawayInsight": "Cellular respiration dynamically shifts between aerobic efficiency and anaerobic speed based on oxygen availability."
    }
  }
},

  // =========================================================================
  // BIOLOGY: The Circulatory System & Double Circulation
  // =========================================================================
  {
  "id": "bio-circulatory-system",
  "slug": "circulatory-system",
  "title": "The Circulatory System & Double Circulation",
  "subtitle": "Cardiac anatomy, systemic/pulmonary loops, blood components, and blood pressure",
  "subjectId": "biology",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "The human circulatory system operates as a closed, double-circulation hydraulic loop powered by the four-chambered heart. Pulmonary circulation oxygenates deoxygenated blood in the lungs; systemic circulation delivers oxygen and nutrients to tissues.",
  "whyItMatters": "Essential for treating cardiovascular coronary heart disease, stroke prevention, hypertension therapeutics, and bypass surgical engineering.",
  "learningObjectives": [
    "Detail the four-chambered anatomy of the human heart and directional valve mechanics.",
    "Trace the double circulation pathway: pulmonary loop vs systemic loop.",
    "Differentiate arteries (thick, elastic), veins (thin, with valves), and capillaries (single-cell walls)."
  ],
  "coreQuestions": [
    "Why is complete separation of oxygenated and deoxygenated blood vital for mammalian endothermy?",
    "Why do veins contain internal pocket valves while arteries do not?"
  ],
  "prerequisites": [
    "Tissues and organs",
    "Respiratory gas exchange"
  ],
  "keyTerms": [
    {
      "term": "Double Circulation",
      "definition": "Blood passes through the heart twice during one complete cycle through the body (pulmonary and systemic)."
    },
    {
      "term": "Systolic / Diastolic Pressure",
      "definition": "Standard blood pressure: peak ventricular contraction pressure (~120 mmHg) over resting ventricular filling pressure (~80 mmHg)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The heart is a synchronized twin muscular pump sustaining nutrient delivery and metabolic waste clearance across 100,000 kilometres of blood vessels.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Cardiac Anatomy and Valve Mechanics",
          "subtitle": "Atria, ventricles, and unidirectional flow",
          "paragraphs": [
            "The heart consists of two receiving atria and two pumping ventricles. Deoxygenated blood from the body enters the right atrium via the vena cava, passes through the tricuspid valve into the right ventricle, and is pumped via the pulmonary artery to the lungs. Oxygenated blood from the lungs enters the left atrium via pulmonary veins, passes through the bicuspid (mitral) valve into the thick-walled left ventricle, and is pumped via the aorta to the systemic body."
          ],
          "bulletPoints": [
            "Atrioventricular (AV) valves prevent backflow into atria during systole.",
            "Semilunar valves in aorta and pulmonary artery prevent backflow into ventricles during diastole."
          ],
          "callout": {
            "type": "axiom",
            "title": "Cardiac Pressure Invariant",
            "text": "The left ventricle wall is three times thicker than the right ventricle because it must overcome systemic peripheral vascular resistance."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Blood Composition and Vascular Types",
          "subtitle": "Erythrocytes, leukocytes, platelets, and vessel architecture",
          "paragraphs": [
            "Blood comprises 55% plasma and 45% formed elements: red blood cells (erythrocytes, transport O₂), white blood cells (leukocytes, immune defense), and platelets (thrombocytes, blood clotting). Arteries carry blood away from heart under high pulsatile pressure; veins return blood under low pressure assisted by muscular pumps and one-way pocket valves; capillaries enable diffusion."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Double circulation maintains high systemic blood pressure while protecting fragile lung capillaries.",
        "Arteries have thick elastic muscular walls; veins possess one-way valves to prevent retrograde backflow."
      ],
      "reflectionPrompt": "Why does the pulmonary artery carry deoxygenated blood while all other arteries carry oxygenated blood?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Double Circulation Circuit Loops",
      "caption": "Figure-eight schematic of pulmonary and systemic circulatory loops powered by four cardiac chambers.",
      "diagramTitle": "Dual Loop Cardiovascular Architecture",
      "diagramDescription": "Upper loop: Pulmonary circulation (Right Ventricle → Lungs → Left Atrium). Lower loop: Systemic circulation (Left Ventricle → Body → Right Atrium).",
      "components": [
        {
          "id": "c1",
          "name": "Right Side (Deoxygenated)",
          "role": "Low pressure pulmonary pump",
          "description": "Right atrium and right ventricle pumping blue deoxygenated blood to lungs."
        },
        {
          "id": "c2",
          "name": "Left Side (Oxygenated)",
          "role": "High pressure systemic pump",
          "description": "Left atrium and left ventricle pumping red oxygenated blood to aorta."
        },
        {
          "id": "c3",
          "name": "Capillary Beds",
          "role": "Nutrient/gas exchange",
          "description": "Microvascular networks where O₂ and glucose diffuse into tissues."
        }
      ],
      "visualSummary": "Complete cardiac septal separation ensures that oxygen-rich blood never mixes with oxygen-poor venous return."
    },
    "examples-applications": {
      "overview": "Coronary artery bypass grafting (CABG) and artificial ventricular assist devices (LVAD).",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Cardiac Output",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A resting human has a heart rate of 72 beats per minute and a stroke volume of 70 mL per beat. Calculate total cardiac output in litres per minute.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "State cardiac output formula",
              "work": "Cardiac Output = Heart Rate (bpm) × Stroke Volume (mL/beat)."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute volumetric product",
              "work": "Cardiac Output = 72 beats/min × 70 mL/beat = 5,040 mL/min."
            },
            {
              "stepNumber": 3,
              "explanation": "Convert to litres",
              "work": "5040 mL/min = 5.04 Litres per minute."
            }
          ],
          "finalResult": "Cardiac output is 5.04 litres per minute (the entire blood volume circulated every minute).",
          "verificationTip": "During intense exercise, cardiac output can surge up to 25–30 litres per minute."
        }
      ],
      "applications": [
        {
          "domain": "Cardiology",
          "title": "Coronary Angioplasty & Stenting",
          "context": "Restoring arterial lumen diameter in coronary arteries occluded by atherosclerotic cholesterol plaques.",
          "realWorldScenario": "Inflating a tiny catheter balloon to expand a drug-eluting cobalt-chromium stent inside an occluded left anterior descending artery.",
          "impactMetric": "Restoration of 100% distal myocardial blood perfusion."
        }
      ],
      "selfCheckExercise": {
        "question": "What produces the characteristic \"lub-dub\" sound of the beating heart?",
        "hint": "Sounds correspond to valve closures, not muscular contractions.",
        "solution": "\"Lub\" is the closure of atrioventricular (tricuspid/bicuspid) valves; \"Dub\" is the closure of aortic and pulmonary semilunar valves."
      }
    },
    "explore-experiment": {
      "activityTitle": "Cardiovascular Hemodynamics Simulator",
      "objective": "Vary heart rate and stroke volume to observe real-time cardiac output and systemic blood pressure response.",
      "instructions": "Slide heart rate and stroke volume to explore cardiovascular exertion.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "heart_rate",
          "label": "Heart Rate (bpm)",
          "description": "Beats per minute",
          "min": 50,
          "max": 180,
          "step": 5,
          "defaultValue": 72,
          "unit": "bpm"
        },
        {
          "id": "stroke_vol",
          "label": "Stroke Volume (mL)",
          "description": "Blood pumped per ventricular contraction",
          "min": 50,
          "max": 120,
          "step": 5,
          "defaultValue": 70,
          "unit": "mL"
        }
      ],
      "guidingQuestions": [
        "How does cardiac output change during exercise when heart rate reaches 150 bpm and stroke volume reaches 100 mL?"
      ],
      "whatToObserve": [
        "Cardiac output triples to 15.0 L/min, dramatically accelerating tissue oxygen delivery."
      ],
      "takeawayInsight": "The heart dynamically modulates stroke volume and frequency to match metabolic oxygen demand."
    }
  }
},

  // =========================================================================
  // BIOLOGY: The Nervous System & Endocrine Regulation
  // =========================================================================
  {
  "id": "bio-nervous-system-endocrine",
  "slug": "nervous-system-endocrine",
  "title": "The Nervous System & Endocrine Regulation",
  "subtitle": "Neuron action potentials, reflex arcs, brain anatomy, and hormonal homeostasis",
  "subjectId": "biology",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "The nervous and endocrine systems coordinate physiological responses across the human body. The nervous system transmits rapid electrical action potentials via neurons across synapses, while the endocrine system secretes chemical hormones into the bloodstream for sustained homeostasis.",
  "whyItMatters": "Essential for neurodegenerative treatments (Parkinson’s, Alzheimer’s), diabetes insulin therapy, mental health neurotransmitter pharmaceuticals, and robotic neural interfaces.",
  "learningObjectives": [
    "Detail the anatomical structure of a multipolar neuron (dendrites, axon, myelin sheath, synapse).",
    "Trace the neurological pathway of a reflex arc from receptor to effector.",
    "Compare rapid localized nervous signaling with sustained diffuse endocrine hormonal regulation."
  ],
  "coreQuestions": [
    "Why does myelination accelerate nerve impulse conduction by up to 100 times via saltatory conduction?",
    "How does negative feedback maintain homeostatic blood glucose levels via insulin and glucagon?"
  ],
  "prerequisites": [
    "Cell biology",
    "Tissues"
  ],
  "keyTerms": [
    {
      "term": "Reflex Arc",
      "definition": "The shortest neural pathway mediating an involuntary reflex action: Receptor → Sensory Neuron → Spinal Relay → Motor Neuron → Effector."
    },
    {
      "term": "Synapse",
      "definition": "The microscopic junction between two neurons across which neurotransmitters diffuse chemically."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Coordination unites trillions of individual cells into a responsive organism capable of perception, thought, and homeostasis.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Neuron Structure and Synaptic Transmission",
          "subtitle": "Dendrites, axon, and chemical neurotransmitter release",
          "paragraphs": [
            "A neuron is an electrically excitable cell consisting of dendrites (receive inputs), soma (cell body), and an elongated axon wrapped in insulating myelin sheath. An electrical action potential travels along the axon. Upon reaching the axon terminal, it triggers calcium influx, releasing chemical neurotransmitters (e.g. acetylcholine) into the synaptic cleft to bind receptors on the post-synaptic cell."
          ],
          "bulletPoints": [
            "Resting membrane potential: -70 mV maintained by Na⁺/K⁺ ATPase pumps.",
            "Saltatory conduction: Action potential leaps between nodes of Ranvier."
          ],
          "callout": {
            "type": "axiom",
            "title": "All-or-None Invariant",
            "text": "An action potential fires at full amplitude once membrane threshold (-55 mV) is reached; stimulus intensity is encoded by firing frequency, not spike voltage."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Reflex Arc and Endocrine Hormones",
          "subtitle": "Spinal reflexes vs glandular chemical coordination",
          "paragraphs": [
            "Reflex actions are rapid, involuntary responses mediated at spinal cord level to protect tissues from damage (e.g. withdrawing hand from hot pan). In contrast, the endocrine system uses ductless glands to secrete hormones into blood: Pituitary (master gland), Thyroid (thyroxine, metabolic rate), Pancreas (insulin/glucagon, glucose control), Adrenal (adrenaline, fight-or-flight response)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Nervous signaling is rapid, electrical, and point-to-point.",
        "Endocrine signaling is chemical, blood-borne, and sustained over hours to days."
      ],
      "reflectionPrompt": "Why does adrenaline simultaneously dilate airways and pupils while constricting blood flow to the digestive system during danger?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Reflex Arc and Synaptic Junction",
      "caption": "Five-element neural pathway of spinal reflex arc bypassing conscious brain processing.",
      "diagramTitle": "Reflex Arc Circuit Architecture",
      "diagramDescription": "Pain receptor in skin sending signal along sensory neuron into spinal cord gray matter, connecting via interneuron to motor neuron directing muscle effector.",
      "components": [
        {
          "id": "c1",
          "name": "Sensory Receptor",
          "role": "Stimulus sensor",
          "description": "Transduces heat or mechanical pain into action potential."
        },
        {
          "id": "c2",
          "name": "Spinal Interneuron",
          "role": "Local relay node",
          "description": "Processes input in spinal cord gray matter without waiting for brain."
        },
        {
          "id": "c3",
          "name": "Motor Effector Muscle",
          "role": "Action actuator",
          "description": "Rapidly contracts muscle to withdraw limb from hazard."
        }
      ],
      "visualSummary": "Reflex arcs protect tissues by executing immediate motor responses prior to conscious sensory perception."
    },
    "examples-applications": {
      "overview": "Deep brain stimulation neuro-prosthetics and continuous glucose monitor insulin pumps.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Tracing Blood Glucose Homeostasis via Negative Feedback",
          "difficulty": "Advanced",
          "contextOrPrompt": "Explain how the endocrine system restores normal blood glucose levels after eating a carbohydrate-rich meal.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Detect stimulus deviation",
              "work": "Digestion of carbohydrates elevates blood glucose concentration above baseline (90 mg/dL)."
            },
            {
              "stepNumber": 2,
              "explanation": "Endocrine gland secretion response",
              "work": "Beta cells of the Islets of Langerhans in the pancreas detect hyperglycemia and secrete insulin into blood."
            },
            {
              "stepNumber": 3,
              "explanation": "Target organ cellular uptake",
              "work": "Insulin stimulates liver and skeletal muscle cells to absorb glucose and polymerize it into storage glycogen."
            },
            {
              "stepNumber": 4,
              "explanation": "Negative feedback loop closure",
              "work": "Blood glucose levels drop back to 90 mg/dL, inhibiting further insulin secretion."
            }
          ],
          "finalResult": "Negative feedback ensures that blood glucose returns tightly to homeostatic baseline.",
          "verificationTip": "When blood glucose drops too low (hypoglycemia), alpha cells secrete glucagon to break down glycogen into glucose."
        }
      ],
      "applications": [
        {
          "domain": "Endocrinology",
          "title": "Automated Closed-Loop Artificial Pancreas",
          "context": "Combining continuous subcutaneous glucose sensors with automated micro-dosing insulin infusion pumps.",
          "realWorldScenario": "Regulating Type-1 diabetic blood glucose within 70–140 mg/dL range through algorithmic micro-bolus adjustments.",
          "impactMetric": "Ninety percent time-in-target-range glycemic control."
        }
      ],
      "selfCheckExercise": {
        "question": "Which hormone is known as the \"emergency\" or \"fight-or-flight\" hormone, and which gland secretes it?",
        "hint": "Prepares the body for immediate vigorous physical exertion.",
        "solution": "Adrenaline (epinephrine), secreted by the adrenal medulla situated atop the kidneys."
      }
    },
    "explore-experiment": {
      "activityTitle": "Neural Impulse & Synapse Simulator",
      "objective": "Stimulate a sensory axon to observe action potential propagation and neurotransmitter release across the synapse.",
      "instructions": "Slide stimulus intensity to test threshold firing and observe neurotransmitter vesicle exocytosis.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "stimulus",
          "label": "Stimulus Intensity (mV)",
          "description": "Membrane depolarization input",
          "min": -70,
          "max": 0,
          "step": 5,
          "defaultValue": -50,
          "unit": "mV"
        }
      ],
      "guidingQuestions": [
        "What occurs when stimulus fails to reach the -55 mV threshold?"
      ],
      "whatToObserve": [
        "Zero action potential is generated; the neuron remains quiescent under the all-or-none law."
      ],
      "takeawayInsight": "Threshold-gated action potentials convert continuous analog stimuli into noise-resistant digital neural spikes."
    }
  }
},

  // =========================================================================
  // BIOLOGY: Plant & Animal Tissues: Structure & Function
  // =========================================================================
  {
  "id": "bio-tissues-plant-animal",
  "slug": "tissues-plant-animal",
  "title": "Plant & Animal Tissues: Structure & Function",
  "subtitle": "Meristematic, permanent, epithelial, connective, muscular, and vascular tissues",
  "subjectId": "biology",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "A tissue is an ensemble of similar cells specialized to perform a common physiological function. Plants divide into meristematic (growth) and permanent (parenchyma, collenchyma, sclerenchyma, xylem, phloem) tissues; animals divide into epithelial, connective, muscular, and nervous tissues.",
  "whyItMatters": "Essential for histopathology cancer biopsies, tissue engineering artificial skin grafts, agricultural plant grafting, and tendon injury rehabilitation.",
  "learningObjectives": [
    "Classify plant tissues into meristematic (apical, lateral, intercalary) and permanent tissues.",
    "Differentiate supportive tissues: parenchyma (storage), collenchyma (flexibility), and sclerenchyma (rigidity).",
    "Distinguish four animal tissue classes: epithelial, connective (bone, cartilage, blood), muscular, and nervous."
  ],
  "coreQuestions": [
    "Why do plants retain localized regions of perpetual cell division while animal growth is diffuse?",
    "How does the lignin in sclerenchyma provide mechanical strength to tree trunks?"
  ],
  "prerequisites": [
    "Cell structure and organelles",
    "Microscopy"
  ],
  "keyTerms": [
    {
      "term": "Meristematic Tissue",
      "definition": "Undifferentiated, actively dividing plant tissue responsible for vegetative growth."
    },
    {
      "term": "Connective Tissue",
      "definition": "Tissue that supports, binds, and protects other tissues and organs, characterized by an extracellular matrix."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Multicellular complexity is organized through division of labor, where cells differentiate into specialized tissue architectures.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Plant Tissue Architecture",
          "subtitle": "Meristems, simple permanent, and complex vascular tissues",
          "paragraphs": [
            "Plants possess meristematic tissues (apical meristems drive root/shoot length; lateral cambium drives girth). Once differentiated, they form permanent tissues: Parenchyma (thin-walled living storage), Collenchyma (living flexible support with corner pectin thickenings), and Sclerenchyma (dead, lignified thick-walled rigid structural fibers). Complex vascular tissues comprise Xylem (unidirectional water transport) and Phloem (bidirectional sugar translocation)."
          ],
          "bulletPoints": [
            "Xylem: Tracheids, vessels, xylem parenchyma, xylem fibers (dead at maturity).",
            "Phloem: Sieve tubes, companion cells, phloem fibers, phloem parenchyma (living)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Plant Growth Invariant",
            "text": "Plant growth is open-ended and localized to meristems; secondary cambium produces annual growth rings."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Animal Tissue Archetypes",
          "subtitle": "Epithelium, connective matrix, and muscle fibers",
          "paragraphs": [
            "Epithelial tissue forms protective surface barriers (squamous, cuboidal, columnar, ciliated). Connective tissue features abundant extracellular matrix: blood (liquid plasma matrix), bone (hard calcium phosphate matrix with osteocytes), cartilage (chondrocytes in chondrin matrix), and ligaments/tendons. Muscle tissue comprises striated (voluntary skeletal), smooth (involuntary visceral), and cardiac (involuntary intercalated discs)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Plant tissues specialize into dividing meristems and differentiated permanent structural systems.",
        "Animal tissues combine cells with specialized extracellular matrices to execute structural and physiological roles."
      ],
      "reflectionPrompt": "Why are xylem vessels hollow and dead at functional maturity rather than living cellular tubes?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Microscopic Histology of Plant and Animal Tissues",
      "caption": "Cross-sectional histology comparing plant sclerenchyma fibers with animal osteocyte bone tissue.",
      "diagramTitle": "Structural Comparison of Plant and Animal Supportive Tissues",
      "diagramDescription": "Left: Thick lignified pentagonal sclerenchyma cells with narrow lumen. Right: Concentric Haversian systems of compact bone with osteocytes.",
      "components": [
        {
          "id": "c1",
          "name": "Lignified Sclerenchyma",
          "role": "Plant mechanical fiber",
          "description": "Dead hollow cells with thick secondary walls providing tensile strength."
        },
        {
          "id": "c2",
          "name": "Haversian Canal (Bone)",
          "role": "Nutrient delivery",
          "description": "Central vascular conduit surrounded by concentric lamellae."
        },
        {
          "id": "c3",
          "name": "Osteocytes in Lacunae",
          "role": "Living bone cells",
          "description": "Entombed living cells communicating via radiating canaliculi."
        }
      ],
      "visualSummary": "Both plant and animal supportive tissues construct robust extracellular reinforcement matrices."
    },
    "examples-applications": {
      "overview": "Orthopedic cartilage grafting and forensic skeletal age estimation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Identifying Tissue Type from Microscopic Specimen",
          "difficulty": "Foundational",
          "contextOrPrompt": "A histology slide shows elongated, multinucleated cylindrical cells with distinct light and dark transverse bands under voluntary control. Identify the tissue.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Analyze cellular morphology",
              "work": "Elongated, unbranched cylindrical cells with multiple peripheral nuclei."
            },
            {
              "stepNumber": 2,
              "explanation": "Inspect banding pattern",
              "work": "Transverse striations (alternating actin and myosin protein filaments)."
            },
            {
              "stepNumber": 3,
              "explanation": "Match physiological classification",
              "work": "Striated skeletal muscle tissue (voluntary muscle attached to skeleton)."
            }
          ],
          "finalResult": "The specimen is Skeletal (Striated) Muscular Tissue.",
          "verificationTip": "Cardiac muscle also has striations but features branched cells with single nuclei and intercalated discs."
        }
      ],
      "applications": [
        {
          "domain": "Regenerative Medicine",
          "title": "Autologous Chondrocyte Implantation (ACI)",
          "context": "Harvesting and multiplying a patient’s own cartilage chondrocytes in vitro to repair damaged knee articular surfaces.",
          "realWorldScenario": "Implanting cultured chondrocyte matrix patch to restore knee joint meniscus function after traumatic tear.",
          "impactMetric": "Restoration of smooth low-friction joint articulation without joint replacement."
        }
      ],
      "selfCheckExercise": {
        "question": "What is the functional difference between a tendon and a ligament?",
        "hint": "One joins muscle to bone; the other joins bone to bone.",
        "solution": "Tendons connect skeletal muscle to bone (transmitting pulling force); ligaments connect bone to bone at joints (stabilizing joint articulation)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Histological Tissue Classifier Sandbox",
      "objective": "Examine characteristic features of different tissue classes to observe structural adaptations.",
      "instructions": "Select tissue archetype to inspect cell shape, matrix composition, and physiological role.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "tissue_type",
          "label": "Tissue Category",
          "description": "1: Parenchyma, 2: Sclerenchyma, 3: Epithelial, 4: Compact Bone",
          "min": 1,
          "max": 4,
          "step": 1,
          "defaultValue": 4,
          "unit": "units"
        }
      ],
      "guidingQuestions": [
        "Why does compact bone require central Haversian canals while plant sclerenchyma requires none?"
      ],
      "whatToObserve": [
        "Bone contains living osteocytes requiring active capillary blood supply; sclerenchyma is dead at functional maturity."
      ],
      "takeawayInsight": "Tissue structure is directly optimized for its living metabolic or dead structural role."
    }
  }
},

  // =========================================================================
  // BIOLOGY: The Excretory System & Renal Osmoregulation
  // =========================================================================
  {
  "id": "bio-human-excretory-system",
  "slug": "human-excretory-system",
  "title": "The Excretory System & Renal Osmoregulation",
  "subtitle": "Kidney anatomy, nephron ultrafiltration, selective reabsorption, and dialysis",
  "subjectId": "biology",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "The human excretory system eliminates nitrogenous metabolic wastes (urea) and regulates blood fluid-electrolyte homeostasis (osmoregulation). One million nephrons per kidney filter blood through ultrafiltration, selective reabsorption, and tubular secretion.",
  "whyItMatters": "Essential for understanding chronic kidney disease (CKD), hemodialysis artificial filtration, kidney transplantation, and diuretic hypertension therapies.",
  "learningObjectives": [
    "Detail the anatomical structure of the urinary system and kidney cross-section.",
    "Explain nephron mechanics: Bowman’s capsule ultrafiltration, loop of Henle, and collecting duct.",
    "Describe selective reabsorption of glucose, amino acids, and water under antidiuretic hormone (ADH)."
  ],
  "coreQuestions": [
    "Why do proteins and blood cells remain in capillaries during renal ultrafiltration?",
    "How does the countercurrent multiplier mechanism in the loop of Henle concentrate urine?"
  ],
  "prerequisites": [
    "Circulatory system",
    "Diffusion and osmosis"
  ],
  "keyTerms": [
    {
      "term": "Nephron",
      "definition": "The microscopic structural and functional filtration unit of the kidney (~1 million per kidney)."
    },
    {
      "term": "Ultrafiltration",
      "definition": "Filtration of blood under high hydrostatic pressure in the glomerulus into Bowman’s capsule, excluding large proteins."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The kidneys are master chemical regulators, continuously filtering blood plasma to maintain biochemical homeostasis.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Renal Anatomy and Ultrafiltration",
          "subtitle": "Glomerulus, Bowman’s capsule, and filtrate formation",
          "paragraphs": [
            "Renal arteries deliver ~20% of resting cardiac output to the kidneys. In the renal cortex, afferent arterioles enter the glomerulus knot, which exits through narrower efferent arterioles, generating high hydrostatic filtration pressure (~55 mmHg). Small solutes (water, glucose, urea, amino acids, salts) are forced through glomerular capillary fenestrations into Bowman’s capsule as nephric filtrate (~180 litres/day), while blood cells and plasma proteins are retained."
          ],
          "bulletPoints": [
            "Afferent arteriole lumen is wider than efferent arteriole, generating filtration pressure.",
            "Glomerular filtration rate (GFR) averages 125 mL/min in healthy adults."
          ],
          "callout": {
            "type": "axiom",
            "title": "Size-Exclusion Invariant",
            "text": "Glomerular basement membrane excludes molecules with molecular weight exceeding 68,000 Daltons (e.g. albumin)."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Selective Reabsorption & Osmoregulation",
          "subtitle": "Proximal tubule, Loop of Henle, and ADH control",
          "paragraphs": [
            "Of the 180 L of daily filtrate, 99% is reabsorbed, excreting only ~1.5 L of concentrated urine. Proximal convoluted tubule (PCT) reabsorbs 100% of glucose and amino acids via active transport, and 70% of water. The Loop of Henle creates a hypertonic medullary gradient. Antidiuretic hormone (ADH / vasopressin) from the pituitary regulates aquaporin channels in collecting ducts: high ADH causes water reabsorption, producing concentrated urine."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Ultrafiltration separates plasma solutes by size under hydrostatic pressure.",
        "Selective reabsorption recovers 99% of filtered water and 100% of valuable nutrients."
      ],
      "reflectionPrompt": "Why is the presence of glucose in a patient’s urine (glucosuria) a clinical biomarker for uncontrolled diabetes mellitus?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Nephron Filtration and Reabsorption Pathway",
      "caption": "Sequential transit of filtrate through glomerulus, PCT, loop of Henle, DCT, and collecting duct.",
      "diagramTitle": "Nephron Functional Zonation and Concentration Gradients",
      "diagramDescription": "Glomerulus in cortex leading into convoluted tubules descending into medulla loop of Henle and collecting duct.",
      "components": [
        {
          "id": "c1",
          "name": "Glomerulus & Capsule",
          "role": "Ultrafiltration barrier",
          "description": "High-pressure capillary bed filtering 180 L/day of plasma solutes."
        },
        {
          "id": "c2",
          "name": "Proximal Convoluted Tubule",
          "role": "Nutrient reabsorption",
          "description": "Active recovery of 100% glucose, amino acids, and majority of ions."
        },
        {
          "id": "c3",
          "name": "Loop of Henle & Collecting Duct",
          "role": "Countercurrent concentrator",
          "description": "Osmotic water extraction generating concentrated hypertonic urine."
        }
      ],
      "visualSummary": "The nephron converts 180 litres of raw filtrate into 1.5 litres of concentrated metabolic waste daily."
    },
    "examples-applications": {
      "overview": "Hemodialysis artificial kidney circuits and renal organ transplant matching.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Fractional Water Reabsorption in Kidneys",
          "difficulty": "Advanced",
          "contextOrPrompt": "A patient has a glomerular filtration rate of 125 mL/min and produces 1.5 mL of urine per minute. What percentage of filtered water is reabsorbed?",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "State reabsorption relationship",
              "work": "Volume reabsorbed = GFR - Urine output = 125 mL/min - 1.5 mL/min = 123.5 mL/min."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute percentage fraction",
              "work": "Percentage = (123.5 / 125) × 100 = 0.988 × 100 = 98.8%."
            }
          ],
          "finalResult": "98.8% of filtered water is selectively reabsorbed back into the bloodstream.",
          "verificationTip": "Severe dehydration triggers maximum ADH release, elevating water reabsorption to over 99.5%."
        }
      ],
      "applications": [
        {
          "domain": "Nephrology",
          "title": "Hemodialysis Artificial Kidney Therapy",
          "context": "Filtering blood through semi-permeable cellulose hollow fibers against dialysate fluid for end-stage renal failure patients.",
          "realWorldScenario": "Removing urea, creatinine, and surplus potassium from blood across countercurrent dialysate flow.",
          "impactMetric": "Four-hour dialysis clearance reducing blood urea nitrogen (BUN) by over 65%."
        }
      ],
      "selfCheckExercise": {
        "question": "What happens to urine volume and concentration on a hot day when a person perspires heavily and drinks little water?",
        "hint": "How does the body conserve water? Consider ADH release.",
        "solution": "Pituitary gland releases high levels of ADH, maximizing water reabsorption in collecting ducts; urine volume decreases and becomes highly concentrated and darker yellow."
      }
    },
    "explore-experiment": {
      "activityTitle": "Renal Nephron Filtration & ADH Simulator",
      "objective": "Vary hydration status and ADH hormone levels to observe urine volume and solute concentration changes.",
      "instructions": "Slide ADH level to observe aquaporin channel opening and urine volume collapse.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "hydration",
          "label": "Blood Hydration Level",
          "description": "1: Severe dehydration, 2: Normal, 3: Over-hydrated",
          "min": 1,
          "max": 3,
          "step": 1,
          "defaultValue": 2,
          "unit": "units"
        },
        {
          "id": "adh_level",
          "label": "ADH Hormone Level (%)",
          "description": "Antidiuretic hormone concentration",
          "min": 10,
          "max": 100,
          "step": 10,
          "defaultValue": 50,
          "unit": "%"
        }
      ],
      "guidingQuestions": [
        "What occurs to urine output when ADH secretion is blocked (e.g. by alcohol or in diabetes insipidus)?"
      ],
      "whatToObserve": [
        "Collecting ducts become impermeable to water; large volumes of very dilute, pale urine are excreted (polyuria)."
      ],
      "takeawayInsight": "ADH dynamically tunes collecting duct water permeability to safeguard circulatory blood volume."
    }
  }
},

  // =========================================================================
  // BIOLOGY: Plant Transport: Xylem, Phloem & Transpiration
  // =========================================================================
  {
  "id": "bio-plant-transpiration-transport",
  "slug": "plant-transpiration-transport",
  "title": "Plant Transport: Xylem, Phloem & Transpiration",
  "subtitle": "Cohesion-tension theory, root absorption, stomatal mechanics, and phloem translocation",
  "subjectId": "biology",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Plants transport water and inorganic minerals upwards through xylem via transpiration pull and root pressure, and translocate organic sucrose bidirectionally through phloem via pressure-flow. Cohesion and adhesion enable sap to ascend over 100 metres in giant redwoods.",
  "whyItMatters": "Essential for agricultural irrigation scheduling, forestry timber growth modeling, plant drought resilience breeding, and systemic pesticide application.",
  "learningObjectives": [
    "Explain water uptake by root hairs through osmosis and root pressure.",
    "Detail the Cohesion-Tension Theory of transpiration pull in xylem.",
    "Describe Munch’s Pressure-Flow hypothesis for bidirectional sucrose translocation in phloem."
  ],
  "coreQuestions": [
    "How can water ascend 100-metre redwood trees without any active mechanical pumps?",
    "How do potassium ions (K⁺) regulate the opening and closing of guard cell stomata?"
  ],
  "prerequisites": [
    "Plant tissues (xylem and phloem)",
    "Osmosis and diffusion"
  ],
  "keyTerms": [
    {
      "term": "Transpiration",
      "definition": "The loss of water vapor from the aerial parts of a plant, primarily through microscopic stomata in leaves."
    },
    {
      "term": "Cohesion-Tension Theory",
      "definition": "Water ascent driven by surface tension evaporation generating negative pressure (tension) transmitted via cohesive hydrogen bonds."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Plants achieve hydraulic engineering marvels, moving tonnes of water against gravity without a beating heart.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Root Absorption and Transpiration Pull",
          "subtitle": "Root hairs, water potential, and cohesion-tension",
          "paragraphs": [
            "Root hair cells absorb water from soil by osmosis due to higher solute concentration in vacuolar sap. Water moves across cortex into xylem. As water evaporates from leaf stomata during transpiration, meniscus curvature in mesophyll cell walls generates strong negative pressure (-15 to -30 atmospheres). Because water molecules exhibit powerful mutual cohesion (hydrogen bonds) and adhesion to xylem walls, an unbroken water column is pulled upwards like a hydraulic rope."
          ],
          "bulletPoints": [
            "Stomatal opening: Light triggers K⁺ uptake into guard cells, causing endosmosis, turgidity, and pore opening.",
            "Guttation: Exudation of liquid water droplets from hydathodes under high nocturnal root pressure."
          ],
          "callout": {
            "type": "axiom",
            "title": "Cohesion Invariant",
            "text": "Tensile strength of water in narrow xylem vessels exceeds 30 MPa, resisting cavitation breakage under extreme negative tension."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Phloem Translocation (Pressure-Flow)",
          "subtitle": "Source-to-sink sucrose transport",
          "paragraphs": [
            "Photosynthetic leaves (sources) actively load sucrose into sieve tube elements with companion cells. Elevated sucrose lowers water potential, drawing water in from adjacent xylem by osmosis, creating high hydrostatic pressure. At consuming tissues (sinks, e.g. roots, fruits), sucrose is unloaded, water exits, and low hydrostatic pressure results. This pressure gradient drives bulk flow of sap."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Transpiration pull is the primary driving motor lifting xylem sap to canopy leaves.",
        "Phloem translocates photosynthates bidirectionally from source to sink via hydrostatic turgor pressure gradients."
      ],
      "reflectionPrompt": "Why do plants wilt on hot, windy afternoons even when soil contains adequate moisture?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Cohesion-Tension Xylem Column",
      "caption": "Continuous water column connecting soil water, root xylem, stem conduits, and stomatal leaf pores.",
      "diagramTitle": "Soil-Plant-Atmosphere Continuum (SPAC)",
      "diagramDescription": "Diagram showing water vapor exiting leaf stomata, generating tension pulling cohesive water molecules up xylem vessels from root hairs.",
      "components": [
        {
          "id": "c1",
          "name": "Root Hair Membrane",
          "role": "Osmotic intake",
          "description": "Massive surface area absorbing water down water potential gradient."
        },
        {
          "id": "c2",
          "name": "Xylem Capillary Conduit",
          "role": "Lignified pipeline",
          "description": "Rigid hollow tube carrying continuous cohesive water column."
        },
        {
          "id": "c3",
          "name": "Stomatal Guard Cells",
          "role": "Evaporation gate",
          "description": "Turgor-operated valve regulating water vapor transpiration loss."
        }
      ],
      "visualSummary": "Evaporation at the leaf surface creates negative tension that pulls an unbroken cohesive water chain from the roots."
    },
    "examples-applications": {
      "overview": "Precision drip irrigation scheduling and Ganong’s potometer transpiration measuring.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Measuring Transpiration Rate with a Potometer",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A leafy shoot in a Ganong’s potometer draws an air bubble across a 1.0 mm diameter capillary tube by 120 mm in 10 minutes. Calculate the transpiration rate in mm³/min.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Calculate capillary cross-sectional area A = πr²",
              "work": "Radius r = 0.5 mm. Area A = π(0.5)² = 0.25π ≈ 0.7854 mm²."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute volume displaced V = A × length",
              "work": "V = 0.7854 mm² × 120 mm = 94.25 mm³."
            },
            {
              "stepNumber": 3,
              "explanation": "Divide by time to find rate",
              "work": "Rate = 94.25 mm³ / 10 min = 9.425 mm³/min."
            }
          ],
          "finalResult": "Transpiration rate is 9.43 mm³ of water per minute.",
          "verificationTip": "A potometer strictly measures water uptake rate, which closely approximates transpiration rate (~98% transpired)."
        }
      ],
      "applications": [
        {
          "domain": "Agronomy",
          "title": "Evapotranspiration-Based Precision Irrigation",
          "context": "Monitoring stomatal conductance and canopy thermal temperature to automate vineyard drip irrigation.",
          "realWorldScenario": "Irrigating almond orchards only when leaf water potential falls below -1.2 MPa threshold.",
          "impactMetric": "Forty percent reduction in commercial orchard freshwater consumption."
        }
      ],
      "selfCheckExercise": {
        "question": "How does high ambient atmospheric humidity affect the rate of transpiration?",
        "hint": "Consider the vapor concentration gradient between inside the leaf and outside air.",
        "solution": "High external humidity decreases the water vapor concentration gradient between leaf interior and ambient air, slowing the rate of transpiration."
      }
    },
    "explore-experiment": {
      "activityTitle": "Transpiration Environmental Factor Simulator",
      "objective": "Vary sunlight, wind speed, temperature, and humidity to observe how transpiration rate responds.",
      "instructions": "Slide environmental parameters to discover combinations that trigger peak transpiration or stomatal closure.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "light",
          "label": "Sunlight Intensity (lux)",
          "description": "Drives stomatal opening",
          "min": 0,
          "max": 10000,
          "step": 1000,
          "defaultValue": 5000,
          "unit": "lux"
        },
        {
          "id": "humidity",
          "label": "Relative Humidity (%)",
          "description": "Ambient air moisture",
          "min": 20,
          "max": 95,
          "step": 5,
          "defaultValue": 50,
          "unit": "%"
        },
        {
          "id": "wind",
          "label": "Wind Velocity (m/s)",
          "description": "Blows away humid boundary layer",
          "min": 0,
          "max": 10,
          "step": 1,
          "defaultValue": 2,
          "unit": "m/s"
        }
      ],
      "guidingQuestions": [
        "Which conditions produce maximum transpiration rate?"
      ],
      "whatToObserve": [
        "Bright sunlight (open stomata), high temperature, low humidity (steep gradient), and breezy wind produce peak transpiration."
      ],
      "takeawayInsight": "Transpiration rate is dictated by the steepness of the water vapor concentration gradient across stomatal boundaries."
    }
  }
},

  // =========================================================================
  // BIOLOGY: Ecosystems, Trophic Energy & Environment
  // =========================================================================
  {
  "id": "bio-ecosystems-environment",
  "slug": "ecosystems-environment",
  "title": "Ecosystems, Trophic Energy & Environment",
  "subtitle": "Food webs, 10% energy transfer law, biomagnification, and ozone layer dynamics",
  "subjectId": "biology",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "An ecosystem consists of biotic communities interacting with abiotic environments. Energy flows unidirectionally through trophic levels governed by Lindeman’s 10% law, while non-biodegradable toxins undergo biological magnification up food chains.",
  "whyItMatters": "Essential for global climate change policy, marine fishery quotas, biodiversity conservation, toxic waste remediation, and ozone layer protection.",
  "learningObjectives": [
    "Construct ecological food chains and food webs connecting producers, consumers, and decomposers.",
    "Apply Lindeman’s 10% Law of Energy Transfer across consecutive trophic levels.",
    "Explain biological magnification of persistent pesticides (e.g. DDT) and ozone depletion by CFCs."
  ],
  "coreQuestions": [
    "Why are food chains in nature rarely longer than four or five trophic levels?",
    "Why do top apex predators accumulate the highest concentrations of non-biodegradable toxins?"
  ],
  "prerequisites": [
    "Photosynthesis basics",
    "Energy conservation"
  ],
  "keyTerms": [
    {
      "term": "10% Law of Energy",
      "definition": "Only approximately 10% of energy entering a trophic level is assimilated and transferred to the next higher level."
    },
    {
      "term": "Biomagnification",
      "definition": "The progressive increase in concentration of persistent, non-biodegradable toxins at each successive trophic level."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Ecosystems are energetic open systems where solar photons drive biogeochemical cycles.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Trophic Levels & The 10% Energy Law",
          "subtitle": "Unidirectional energy dissipation",
          "paragraphs": [
            "Solar energy enters ecosystems via autotrophic producers (capturing ~1% of incident sunlight). When herbivores consume plants, only about 10% of food energy is converted into herbivore biomass; the remaining 90% is dissipated as metabolic respiration heat, digestion waste, and movement. Primary consumers → Secondary consumers → Tertiary consumers each retain only 10% of the preceding tier’s energy."
          ],
          "bulletPoints": [
            "Energy flow is strictly unidirectional (cannot cycle back to sun).",
            "Nutrient flow is cyclical (decomposers return minerals to soil)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Lindeman’s Thermodynamic Invariant",
            "text": "Because 90% of energy is lost as metabolic heat at each trophic step, energy pyramids are always strictly upright."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Biomagnification & Ozone Dynamics",
          "subtitle": "Toxin accumulation and stratospheric ozone depletion",
          "paragraphs": [
            "Non-biodegradable chemicals like DDT and heavy metals (mercury) cannot be metabolized or excreted. As biomass diminishes 10-fold at each step up the food chain, the persistent toxin concentrates progressively, reaching lethal apex concentrations (e.g., eggshell thinning in bald eagles). In the stratosphere, chlorofluorocarbons (CFCs) release chlorine radicals that break down protective ozone (O₃ + Cl → ClO + O₂), creating seasonal ozone holes."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Energy diminishes tenfold at each higher trophic level, limiting food chain length.",
        "Non-biodegradable pollutants magnify in concentration up the food chain, endangering apex predators."
      ],
      "reflectionPrompt": "Why is a vegetarian diet thermodynamically capable of supporting a vastly larger human population than a meat-intensive diet?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Ecological Pyramid of Energy & Biomagnification",
      "caption": "Inverted relationship between diminishing energy pyramid and escalating toxin concentration.",
      "diagramTitle": "Trophic Energy Attenuation vs Toxin Concentration Escalation",
      "diagramDescription": "Four tiers: Producers (10,000 kJ energy, 0.01 ppm DDT) → Herbivores (1,000 kJ, 0.1 ppm) → Carnivores (100 kJ, 1.0 ppm) → Apex Predator (10 kJ, 10.0 ppm).",
      "components": [
        {
          "id": "c1",
          "name": "Primary Producers (Plants)",
          "role": "Energy base",
          "description": "10,000 kJ biomass energy; minimal ambient toxin level."
        },
        {
          "id": "c2",
          "name": "Primary Consumers (Herbivores)",
          "role": "First transfer",
          "description": "1,000 kJ energy retained (10% transfer); 10x toxin concentration."
        },
        {
          "id": "c3",
          "name": "Apex Predators (Hawks/Humans)",
          "role": "Terminal tier",
          "description": "Only 10 kJ energy available; peak 1000x biomagnified toxin load."
        }
      ],
      "visualSummary": "While usable energy collapses by 90% per step, persistent lipid-soluble toxins concentrate tenfold at each trophic tier."
    },
    "examples-applications": {
      "overview": "Marine fisheries ecosystem modeling and Montreal Protocol global treaty monitoring.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Energy Available to Apex Predators",
          "difficulty": "Foundational",
          "contextOrPrompt": "If plants capture 20,000 Joules of energy from sunlight, calculate the energy available to hawks in the food chain: Plants → Grasshoppers → Frogs → Snakes → Hawks.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Apply 10% law to Level 1: Plants to Grasshoppers",
              "work": "Grasshoppers = 20,000 J × 0.10 = 2,000 J."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply 10% law to Level 2: Grasshoppers to Frogs",
              "work": "Frogs = 2,000 J × 0.10 = 200 J."
            },
            {
              "stepNumber": 3,
              "explanation": "Apply 10% law to Level 3: Frogs to Snakes",
              "work": "Snakes = 200 J × 0.10 = 20 J."
            },
            {
              "stepNumber": 4,
              "explanation": "Apply 10% law to Level 4: Snakes to Hawks",
              "work": "Hawks = 20 J × 0.10 = 2.0 Joules."
            }
          ],
          "finalResult": "Only 2.0 Joules of energy reaches the hawk (0.01% of original plant energy).",
          "verificationTip": "Notice why food chains rarely exceed 4 or 5 trophic levels: energy runs out."
        }
      ],
      "applications": [
        {
          "domain": "Environmental Ecotoxicology",
          "title": "Mercury Biomagnification in Oceanic Tuna",
          "context": "Monitoring methylmercury neurotoxin accumulation in apex marine commercial fish species.",
          "realWorldScenario": "Establishing public health dietary advisory limits for apex predator fish consumption by pregnant mothers.",
          "impactMetric": "Parts-per-million methylmercury threshold enforcement."
        }
      ],
      "selfCheckExercise": {
        "question": "Which treaty globally banned the production of ozone-depleting chlorofluorocarbons (CFCs)?",
        "hint": "Signed in 1987 in Canada.",
        "solution": "The Montreal Protocol on Substances that Deplete the Ozone Layer (1987)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Trophic Energy Flow & Biomagnification Simulator",
      "objective": "Vary initial producer energy and pesticide ppm to observe how energy diminishes while toxins concentrate up the food web.",
      "instructions": "Slide producer energy to see trophic tier capacities and apex predator accumulation.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "plant_energy",
          "label": "Plant Energy Input (kJ)",
          "description": "Solar energy captured by producers",
          "min": 1000,
          "max": 100000,
          "step": 5000,
          "defaultValue": 10000,
          "unit": "kJ"
        },
        {
          "id": "pesticide_ppm",
          "label": "Water Pesticide Level (ppm)",
          "description": "Initial environmental chemical contamination",
          "min": 0.001,
          "max": 0.1,
          "step": 0.005,
          "defaultValue": 0.01,
          "unit": "ppm"
        }
      ],
      "guidingQuestions": [
        "By what factor does pesticide concentration increase from plants to apex carnivore across three trophic levels?"
      ],
      "whatToObserve": [
        "Pesticide concentration multiplies by 10³ = 1,000 times as biomass diminishes by 99.9%."
      ],
      "takeawayInsight": "The physical laws of thermodynamics dictate the structure of ecological pyramids and environmental vulnerability."
    }
  }
},

  // =========================================================================
  // HISTORY: The Harappan Civilisation & Urban Planning
  // =========================================================================
  {
  "id": "hist-indus-valley-civilisation",
  "slug": "indus-valley-civilisation",
  "title": "The Harappan Civilisation & Urban Planning",
  "subtitle": "Bronze Age town planning, citadel architecture, drainage engineering, and trade networks",
  "subjectId": "history",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "The Harappan (Indus Valley) Civilisation (c. 2600–1900 BCE) represents one of the world's earliest urban Bronze Age societies. Distinguished by sophisticated orthogonal grid street layouts, advanced subterranean sanitation systems, standardized burnt brick proportions (1:2:4), and maritime trade routes connecting Mesopotamia.",
  "whyItMatters": "Provides foundational archaeological insights into prehistoric hydraulic engineering, egalitarian public infrastructure, civil administration, and sustainable ancient urbanism.",
  "learningObjectives": [
    "Analyze the orthogonal grid system and civil segregation of the Harappan Citadel and Lower Town.",
    "Explain the technological sophistication of the covered brick drainage and Great Bath hydraulic engineering.",
    "Trace maritime and overland trade contacts between Harappan ports (such as Lothal) and contemporary Mesopotamian polities.",
    "Evaluate prevailing hypotheses explaining the gradual de-urbanization and decline of Harappan settlements."
  ],
  "coreQuestions": [
    "What does the uniformity of brick dimensions across thousands of kilometers indicate about Harappan administrative centralized authority?",
    "Why did Harappan sanitation and civic drainage systems surpass those of contemporary Bronze Age Egypt and Sumer?"
  ],
  "prerequisites": [
    "Basic understanding of archaeological evidence and Bronze Age timelines"
  ],
  "keyTerms": [
    {
      "term": "Citadel",
      "definition": "The elevated western sector of Harappan cities built on mud-brick platforms, housing public administrative and ritual structures like the Great Bath and Granaries."
    },
    {
      "term": "Lothal Dockyard",
      "definition": "The world's earliest known tidal basin and brick dockyard situated in coastal Gujarat, facilitating ancient maritime trade with Dilmun and Magan."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Four thousand years before modern urban zoning laws, Harappan engineers engineered thriving grid-iron cities with standardized civil municipal infrastructure.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Orthogonal Grid Planning & Architectural Uniformity",
          "subtitle": "The Citadel and Lower Residential Settlements",
          "paragraphs": [
            "Harappan settlements like Mohenjo-daro and Harappa were divided into two distinct zones: an elevated Citadel on the west and a sprawling Lower Town on the east. Streets intersected at strict right angles, orienting north-south and east-west to harness prevailing desert winds for natural ventilation.",
            "Domestic architecture prioritized privacy and hygiene: houses featured central courtyards, interior bathrooms, and no street-facing ground-floor windows. Remarkably, kiln-burnt bricks across Harappan sites conformed strictly to the standardized ratio 1:2:4 (thickness:breadth:length)."
          ],
          "bulletPoints": [
            "The Great Bath: Waterproofed with a thick layer of natural bitumen (asphalt) between burnt brick walls and gypsum mortar.",
            "Granaries: Elevated with air-duct ventilation channels beneath timber floors to prevent grain spoilage and moisture damage."
          ],
          "callout": {
            "type": "axiom",
            "title": "Standardization Invariant",
            "text": "Across more than a million square kilometers, Harappan weight systems (binary at lower values, decimal at higher values) and brick metrics maintained exact mathematical consistency without evidence of military coercion."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Subterranean Sanitation & Maritime Trade",
          "subtitle": "Covered Drainage Systems and Lothal's Tidal Basin",
          "paragraphs": [
            "Every house possessed a private bathing platform connected via terracotta pipes to covered street drains lined with dressed stone and removable inspection sumps. Soak-pits caught solid sediment before wastewater exited into peripheral town outflows.",
            "At Lothal in Gujarat, a tidal dockyard engineered with sluice gates received sea vessels through the Sabarmati river basin. Carnelian beads, lapis lazuli, shell ornaments, and steatite unicorn seals confirmed extensive international exchange with Mesopotamian civilizations (Meluhha)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Harappan civilization achieved peerless civic engineering in water management, hygiene, and brick construction.",
        "Standardized weights, measures, and urban layouts indicate sophisticated municipal administration and commercial governance."
      ],
      "reflectionPrompt": "How did ecological shifts, tectonic river rerouting (Sarasvati/Indus), and prolonged climatic aridity combine to decentralize Harappan urban centers?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Harappan Hydraulic & Urban Engineering",
      "caption": "Diagrammatic reconstruction of Mohenjo-daro street cross-section with subterranean brick drainage.",
      "diagramTitle": "Orthogonal Street Cross-Section and Domestic Drainage Layout",
      "diagramDescription": "House courtyard bathing slab flowing into residential terracotta chutes, connecting to main paved street sewer with inspection covers.",
      "components": [
        {
          "id": "c1",
          "name": "Domestic Wastewater Chute",
          "role": "Gravity flow collector",
          "description": "Terracotta drain emptying private bathroom effluent into street channels."
        },
        {
          "id": "c2",
          "name": "Main Street Covered Drain",
          "role": "Municipal trunk sewer",
          "description": "Deep burnt-brick culvert sealed with flat limestone flags for odor control."
        },
        {
          "id": "c3",
          "name": "Sediment Inspection Sump",
          "role": "Solid separation trap",
          "description": "Depressed pit where silt settled out before water overflowed to main river."
        }
      ],
      "visualSummary": "Subterranean covered drains ensured public health and hygiene unmatched anywhere in the ancient world."
    },
    "examples-applications": {
      "overview": "Archaeological material analysis, isotope provenance studies, and modern urban sanitation civil planning.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Harappan Standardized Brick Volume and Mass",
          "difficulty": "Foundational",
          "contextOrPrompt": "A typical Harappan standard brick possesses dimensions 7 cm × 14 cm × 28 cm. If its fired clay density is 1.9 g/cm³, calculate its volume and mass.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Verify the dimensional ratio",
              "work": "Ratio: 7 : 14 : 28 = 1 : 2 : 4, exactly conforming to the Harappan canon."
            },
            {
              "stepNumber": 2,
              "explanation": "Compute the brick volume",
              "work": "Volume V = l × w × h = 28 cm × 14 cm × 7 cm = 2744 cm³."
            },
            {
              "stepNumber": 3,
              "explanation": "Compute brick mass using density",
              "work": "Mass m = density × volume = 1.9 g/cm³ × 2744 cm³ = 5213.6 g = 5.21 kg."
            }
          ],
          "finalResult": "The standard brick volume is 2744 cm³ with a mass of approximately 5.21 kg.",
          "verificationTip": "The 1:2:4 ratio is structurally optimal for interlocking bond courses (English bond) in load-bearing masonry."
        }
      ],
      "applications": [
        {
          "domain": "Civil Engineering & Urban Archaeology",
          "title": "Modern Decentralized Stormwater Drainage Design",
          "context": "Designing gravity-fed urban runoff swales modeled after ancient Indus slope ratios.",
          "realWorldScenario": "Mitigating monsoon flash flooding in historic dense metropolitan quarters through subterranean settling sumps.",
          "impactMetric": "Zero surface standing water achieved within 20 minutes of peak 50 mm/hr monsoon precipitation."
        }
      ],
      "selfCheckExercise": {
        "question": "What material did Harappan builders use to waterproof the brick masonry floor of the Great Bath at Mohenjo-daro?",
        "hint": "A natural hydrocarbon tar found in geological seepages.",
        "solution": "A layer of natural bitumen (asphalt) laid between the brick floor and surrounding plaster."
      }
    },
    "explore-experiment": {
      "activityTitle": "Harappan Settlement & Hydraulic Simulator",
      "objective": "Balance residential density, kiln brick production, and street drainage slopes to maintain municipal sanitation.",
      "instructions": "Select town quadrant type (Citadel or Lower Town). Adjust street gradient between 1% and 3% for optimal gravity sewer discharge without scouring. Observe silt accumulation rates in clean-out sumps.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Street Slope Gradient (%)",
          "description": "Controls street slope gradient (%) in the simulation.",
          "min": 0.5,
          "max": 4,
          "step": 1,
          "defaultValue": 1.5,
          "unit": "gradient"
        },
        {
          "id": "var-2",
          "label": "Household Discharge Rate",
          "description": "Controls household discharge rate in the simulation.",
          "min": 50,
          "max": 500,
          "step": 1,
          "defaultValue": 200,
          "unit": "litres"
        }
      ],
      "guidingQuestions": [
        "What occurs when sewer gradients fall below 1% in heavy silt-bearing wastewater?",
        "Why did Harappan architects position the Citadel higher than the Lower Town?"
      ],
      "whatToObserve": [
        "Sediment settles cleanly in collection sumps when water velocity is maintained between 0.6 m/s and 1.2 m/s."
      ],
      "takeawayInsight": "The Harappans mastered civil engineering physics, establishing sanitation invariants that predate modern sewer codes by 4,000 years."
    }
  }
},

  // =========================================================================
  // HISTORY: The Vedic Age & the Rise of Mahajanapadas
  // =========================================================================
  {
  "id": "hist-vedic-period-empires",
  "slug": "vedic-period-empires",
  "title": "The Vedic Age & the Rise of Mahajanapadas",
  "subtitle": "Vedic socio-political transitions, Second Urbanisation, iron metallurgy, and the Mauryan Empire",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Traces the historical evolution of northern India from pastoral Early Vedic lineage clans (Janahs) through the settled agrarian Late Vedic polities to the 16 Mahajanapadas (c. 600 BCE). Explores how iron technology enabled Gangetic clearing, surplus agriculture, monetization, and imperial consolidation under the Mauryan Empire (Chandragupta and Ashoka).",
  "whyItMatters": "Essential for understanding the sociopolitical origins of Indian philosophical traditions (Buddhism, Jainism, Upanishads), administrative statecraft (Kautilya's Arthashastra), and imperial governance.",
  "learningObjectives": [
    "Contrast Early Vedic pastoral-tribal governance (Sabha, Samiti) with Late Vedic territorial kingship (Rajan, Ashvamedha).",
    "Explain how iron metallurgy sparked the Second Urbanisation along the middle Gangetic plains.",
    "Examine the administrative, military, and diplomatic strategies of Magadha's rise to imperial hegemony.",
    "Analyze Ashoka's policy of Dhamma and imperial epigraphy across major rock and pillar edicts."
  ],
  "coreQuestions": [
    "How did iron axe metallurgy fundamentally reshape Gangetic agricultural ecosystems and socioeconomic hierarchies?",
    "In what ways did Ashoka's edicts represent a transformative shift from military conquest (Bherighosha) to moral consensus (Dhammaghosha)?"
  ],
  "prerequisites": [
    "Basic understanding of ancient historical chronologies and geographical river basins"
  ],
  "keyTerms": [
    {
      "term": "Mahajanapadas",
      "definition": "The 16 major territorial states (monarchies and republics/Ganasanghas) that dominated northern and central India by the 6th century BCE."
    },
    {
      "term": "Ashoka's Dhamma",
      "definition": "A state-promoted ethical code rooted in non-violence (Ahimsa), religious tolerance, filial piety, and humanitarian governance inscribed in Prakrit on stone edicts."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Between 1500 BCE and 300 BCE, northern India underwent a tectonic transformation from nomadic cattle-rearing clans into fortified Gangetic empires governed by sophisticated administrative statecraft.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Pastoral Clans to Gangetic Territorial States",
          "subtitle": "The Role of Iron Metallurgy and Agrarian Surpluses",
          "paragraphs": [
            "The Rigvedic society was primarily pastoral, organized around kinship clans (Janas) governed by tribal chiefs (Rajans) checked by popular assemblies (Sabha and Samiti). Wealth was measured in cattle (Gau), and conflicts were fought for cattle herds (Gavishti).",
            "By 1000–600 BCE, the discovery and exploitation of rich iron ore deposits in the Chota Nagpur plateau provided durable iron axes and ploughshares. This enabled dense alluvial forests of the middle Ganga valley to be cleared, yielding massive rice surpluses, fixed agrarian settlements, and the emergence of territorial states (Janapadas and Mahajanapadas)."
          ],
          "bulletPoints": [
            "Monarchies vs Ganasanghas: Powerful dynastic kingdoms (Magadha, Kosala) coexisted with aristocratic republics (Vajji confederacy).",
            "Punch-Marked Coins: The emergence of silver and copper punch-marked coins marked the inception of monetized trade and urban guilds (Shrenis)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Second Urbanisation Invariant",
            "text": "Iron technology produced agricultural surpluses that could feed non-farming urban populations—artisans, merchants, administrators, and soldiers—triggering urban revival across the Gangetic basin."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Magadhan Imperialism & Ashokan Statecraft",
          "subtitle": "From the Arthashastra to Moral Governance",
          "paragraphs": [
            "Magadha emerged supreme among the 16 Mahajanapadas due to natural defensive capitals (Rajagriha's hills and Pataliputra's riverine confluence), rich iron mines, fertile alluvial soils, and a war elephant monopoly. Chandragupta Maurya, guided by Chanakya (Kautilya), defeated the Nanda dynasty and established India's first subcontinental empire.",
            "Following the catastrophic trauma of the Kalinga War (261 BCE), Emperor Ashoka renounced aggressive expansion, replacing Bherighosha with Dhammaghosha. He issued major and minor edicts in Brahmi, Kharosthi, and Greek scripts, instituting welfare policies, appointing Dhamma Mahamattas, and establishing the Lion Capital that forms India's national emblem."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Iron metallurgy catalyzed agricultural productivity and political centralization along the Ganga valley.",
        "Ashoka's state policy demonstrated a pioneering model of moral, ethical governance and multi-cultural tolerance."
      ],
      "reflectionPrompt": "How did Kautilya's pragmatic realpolitik in the Arthashastra complement or contradict Ashoka's ethical policy of Dhamma?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Geopolitical Rise of Magadha",
      "caption": "Map schematic showing Magadha's strategic river junction at Pataliputra and Chota Nagpur iron sources.",
      "diagramTitle": "Magadha's Strategic Advantages for Imperial Unification",
      "diagramDescription": "Four pillars of Magadhan dominance: iron resources, elephant cavalry, riverine trade arteries, and agricultural alluvial plain.",
      "components": [
        {
          "id": "c1",
          "name": "Iron Ore Access",
          "role": "Superior weaponry",
          "description": "Chota Nagpur mines supplied wrought iron for swords and armor."
        },
        {
          "id": "c2",
          "name": "Riverine Waterways",
          "role": "Commercial and troop transport",
          "description": "Ganga, Son, and Gandak rivers facilitated swift naval logistics."
        },
        {
          "id": "c3",
          "name": "Forest Elephants",
          "role": "Shock warfare asset",
          "description": "Trained war elephants broke enemy infantry formations and fortifications."
        }
      ],
      "visualSummary": "Material endowments and administrative genius propelled Magadha to subcontinental imperial dominance."
    },
    "examples-applications": {
      "overview": "Ancient statecraft analysis, numismatics, epigraphy, and comparative imperial governance.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Deciphering Ashoka's Major Rock Edict XIII",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Analyze the historical significance of Ashoka's Major Rock Edict XIII at Shahbazgarhi regarding his foreign policy.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify historical event documented",
              "work": "Edict XIII records the remorse felt after the conquest of Kalinga (100,000 dead, 150,000 displaced)."
            },
            {
              "stepNumber": 2,
              "explanation": "Analyze diplomatic outreach",
              "work": "Mentions diplomatic and moral missions sent to Hellenistic rulers: Antiochus of Syria, Ptolemy of Egypt, Antigonus of Macedonia, Magas of Cyrene, and Alexander of Epirus."
            },
            {
              "stepNumber": 3,
              "explanation": "State foreign policy transformation",
              "work": "Proof of peaceful diplomatic influence and cultural exchange extending from the Indian subcontinent across the Mediterranean world."
            }
          ],
          "finalResult": "Edict XIII proves Ashoka replaced military aggression with international diplomatic and humanitarian missions.",
          "verificationTip": "Ashoka used local scripts (Kharosthi in the northwest, Greek/Aramaic in Afghanistan) to communicate directly with diverse subjects."
        }
      ],
      "applications": [
        {
          "domain": "Public Administration & Ethics",
          "title": "Ethical Leadership in Civil Service Governance",
          "context": "Applying Ashoka's civil ombudsman principles (Dhamma Mahamattas) to contemporary anti-corruption bodies.",
          "realWorldScenario": "Ensuring administrative accountability and public welfare through proactive citizen charter audits.",
          "impactMetric": "Ninety-five percent citizen satisfaction achieved through accessible local administrative dispute resolution."
        }
      ],
      "selfCheckExercise": {
        "question": "Which council system in the Rigvedic period served as the broader national assembly of the entire clan?",
        "hint": "Contrasted with the smaller council of elders (Sabha).",
        "solution": "The Samiti was the general assembly of the people, whereas the Sabha was a select council of elders and aristocrats."
      }
    },
    "explore-experiment": {
      "activityTitle": "Mahajanapada Statecraft & Resource Simulator",
      "objective": "Allocate agrarian surplus, iron mining output, and elephant cavalry to maintain defensive stability and trade revenue.",
      "instructions": "Select Magadha, Kosala, or Vajji. Distribute seasonal revenue between irrigation dykes, military garrisons, and highway trade security. Observe effects on merchant caravan arrivals and tax collection.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Iron Weapon Production (units/yr)",
          "description": "Controls iron weapon production (units/yr) in the simulation.",
          "min": 1000,
          "max": 10000,
          "step": 1,
          "defaultValue": 4,
          "unit": "blades"
        },
        {
          "id": "var-2",
          "label": "Road Infrastructure Investment",
          "description": "Controls road infrastructure investment in the simulation.",
          "min": 10,
          "max": 50,
          "step": 1,
          "defaultValue": 25,
          "unit": "budget share"
        }
      ],
      "guidingQuestions": [
        "Why did republican Ganasanghas struggle to match the standing imperial armies of centralized monarchies?",
        "How did punch-marked silver coins accelerate long-distance trade?"
      ],
      "whatToObserve": [
        "Sustained investments in road networks and river patrols generate exponential tax yields from merchant guilds."
      ],
      "takeawayInsight": "Imperial power rested on the triangular foundation of iron metallurgy, agrarian surplus, and centralized fiscal administration."
    }
  }
},

  // =========================================================================
  // HISTORY: The Mughal Empire: Administration, Economy & Culture
  // =========================================================================
  {
  "id": "hist-mughal-empire-administration",
  "slug": "mughal-empire-administration",
  "title": "The Mughal Empire: Administration, Economy & Culture",
  "subtitle": "Mansabdari system, Zabt land revenue, religious policies of Akbar, and Indo-Islamic architecture",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Examines the consolidation, administrative machinery, agrarian revenue architecture, and cultural synthesis of the Mughal Empire under Akbar (1556–1605) and his successors. Features an in-depth analysis of the Mansabdari meritocratic military framework, Todar Mal's Zabt revenue measurement system, Sulh-i-kul policy of universal peace, and grand architectural synthesis.",
  "whyItMatters": "The Mughal revenue and district administration framework directly influenced British colonial revenue boards and modern South Asian district revenue collectorates.",
  "learningObjectives": [
    "Detail the dual-rank mechanism (Zat and Sawar) of the Mansabdari administrative-military system.",
    "Explain Raja Todar Mal's Ain-i-Dahsala land survey, classification (Polaj, Parauti, Chachar, Banjar), and revenue settlement.",
    "Analyze Akbar's policy of Sulh-i-kul and debates in the Ibadat Khana at Fatehpur Sikri.",
    "Appraise the architectural elements of Mughal monumentality from Humayun's Tomb to the Taj Mahal."
  ],
  "coreQuestions": [
    "How did the Mansabdari system balance imperial central control with military decentralization?",
    "Why was Todar Mal's Ain-i-Dahsala revenue system equitable for both the imperial treasury and cultivating peasants?"
  ],
  "prerequisites": [
    "Basic chronology of medieval Indian history and Delhi Sultanate background"
  ],
  "keyTerms": [
    {
      "term": "Mansabdari System",
      "definition": "The administrative-military hierarchy where every state officer held a graded Mansab defined by personal status (Zat) and required cavalry contingent (Sawar)."
    },
    {
      "term": "Sulh-i-Kul",
      "definition": "Akbar's state doctrine of \"universal peace and religious harmony\" ensuring non-sectarian governance, freedom of worship, and abolition of the Jizya tax."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The Mughal Empire achieved institutional stability by combining rigorous bureaucratic land surveying with an inclusive political synthesis that integrated diverse regional elites.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Administrative Foundations: The Mansabdari Framework",
          "subtitle": "Zat, Sawar, and Jagir Allocations",
          "paragraphs": [
            "Akbar restructured imperial governance around the Mansabdari system. Officers were designated Mansabdars ranging from ranks of 10 to 10,000. Each rank had two components: Zat determined personal rank, pay scale, and imperial precedence; Sawar dictated the exact number of mounted cavalry troopers the officer was obligated to maintain for military service.",
            "To prevent hereditary regional fiefdoms, Mansabdars were paid either in cash (Naqd) or through non-hereditary revenue assignments known as Jagirs. Periodic transfers of Jagirs every 3 to 4 years prevented officials from entrenching autonomous regional power bases."
          ],
          "bulletPoints": [
            "Dagh and Chehra: Strict branding of imperial horses (Dagh) and descriptive roll-call of soldiers (Chehra) prevented payroll fraud.",
            "Non-Hereditary Status: Upon a Mansabdar's death, assigned Jagirs reverted to the state treasury (Khalsa)."
          ],
          "callout": {
            "type": "axiom",
            "title": "Bureaucratic Mobility Invariant",
            "text": "The Mansabdari system integrated Rajput chieftains, Turanis, Iranis, and Indian Muslims into a unified, merit-based civil-military service answering directly to the Emperor."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Agrarian Fiscal System & Cultural Synthesis",
          "subtitle": "Ain-i-Dahsala, Sulh-i-kul, and Architectural Monumentality",
          "paragraphs": [
            "Finance Minister Raja Todar Mal introduced the Ain-i-Dahsala system. Lands were meticulously measured using standard bamboo reeds with iron rings (Tanab). Soil was classified into four categories: Polaj (cultivated annually), Parauti (left fallow briefly), Chachar (fallow for 3–4 years), and Banjar (uncultivated). Revenue was fixed at one-third of the average 10-year yield, payable in cash.",
            "Akbar promoted Sulh-i-kul (\"peace with all\"), abolishing the pilgrim tax and Jizya on non-Muslim subjects. He established the Ibadat Khana at Fatehpur Sikri for interfaith dialogues. Culturally, this era birthed the Mughal architectural style—characterized by red sandstone, Pietra dura marble inlay, double domes, and Charbagh symmetrical gardens."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The Mansabdari system combined military mobilization with strict fiscal and administrative accountability.",
        "The Ain-i-Dahsala provided fiscal predictability by basing taxes on measured 10-year crop averages."
      ],
      "reflectionPrompt": "How did later strains on the Jagirdari system under Aurangzeb contribute to agrarian rebellions and imperial decentralization?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Mughal Mansabdari & Revenue Structure",
      "caption": "Schematic flow of Zat/Sawar responsibilities, Jagir revenue collection, and imperial treasury audits.",
      "diagramTitle": "The Tripartite Governance Architecture of the Mughal State",
      "diagramDescription": "Imperial Center (Emperor & Wazir) directing Mansabdars, who collected revenue from cultivators to fund imperial cavalry regiments.",
      "components": [
        {
          "id": "c1",
          "name": "Zat & Sawar Ranks",
          "role": "Status and troop readiness",
          "description": "Dual index defining salary, precedence, and horse brigade quotas."
        },
        {
          "id": "c2",
          "name": "Jagir Land Assignment",
          "role": "Revenue allocation",
          "description": "Assigned fiscal territory evaluated under standard estimated revenue (Jama)."
        },
        {
          "id": "c3",
          "name": "Todar Mal Land Survey",
          "role": "Agrarian measurement",
          "description": "Polaj to Banjar classification determining 1/3 cash tax rate."
        }
      ],
      "visualSummary": "Rigorous land measurement and mobile administrative rank assignments powered Mughal imperial stability."
    },
    "examples-applications": {
      "overview": "Revenue administration, historical GIS mapping of agrarian settlements, and architectural preservation.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Land Revenue Under the Ain-i-Dahsala System",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A farmer cultivates 12 Bighas of Polaj land producing wheat. The 10-year average yield is 15 Quintals per Bigha, and the average market price is Rs 20 per Quintal. If the imperial state share is 1/3, calculate the cash revenue demand.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Compute total harvest yield",
              "work": "Total harvest = 12 Bighas × 15 Quintals/Bigha = 180 Quintals of wheat."
            },
            {
              "stepNumber": 2,
              "explanation": "Determine total cash valuation of harvest",
              "work": "Total gross value = 180 Quintals × Rs 20/Quintal = Rs 3,600."
            },
            {
              "stepNumber": 3,
              "explanation": "Calculate state revenue share at 1/3",
              "work": "Revenue demand = 1/3 × Rs 3,600 = Rs 1,200."
            }
          ],
          "finalResult": "The total imperial cash revenue demand on the farmer is Rs 1,200.",
          "verificationTip": "Under Todar Mal's system, in years of famine or pestilence, the state granted revenue remissions (Takavi loans)."
        }
      ],
      "applications": [
        {
          "domain": "Public Finance & Tax Administration",
          "title": "Multi-Year Moving Average Tax Assessment",
          "context": "Modern agricultural crop insurance and tax valuation systems using historical rolling yield data.",
          "realWorldScenario": "Preventing sudden taxpayer distress by indexing property and crop taxes to 5-year production rolling averages.",
          "impactMetric": "Zero farmer default rates during dry spells due to indexed variable revenue buffers."
        }
      ],
      "selfCheckExercise": {
        "question": "What was the official designation for Mughal imperial lands whose revenue flowed directly into the central treasury rather than to Mansabdars?",
        "hint": "Contrasted with assigned Jagir lands.",
        "solution": "Khalsa lands were directly administered by the central imperial treasury."
      }
    },
    "explore-experiment": {
      "activityTitle": "Mughal Mansab & Revenue Management Sandbox",
      "objective": "Manage imperial budgets by balancing Zat salaries, Sawar cavalry readiness, and Jagir revenue collections.",
      "instructions": "Assign Mansabdars to provinces. Select revenue collection mode: cash assessment (Zabt) or crop division (Batai). Monitor imperial cavalry readiness and provincial peasant contentment.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Imperial Tax Rate Share",
          "description": "Controls imperial tax rate share in the simulation.",
          "min": 25,
          "max": 50,
          "step": 1,
          "defaultValue": 33.3,
          "unit": "fraction"
        },
        {
          "id": "var-2",
          "label": "Jagir Rotation Frequency",
          "description": "Controls jagir rotation frequency in the simulation.",
          "min": 1,
          "max": 6,
          "step": 1,
          "defaultValue": 3,
          "unit": "tenure"
        }
      ],
      "guidingQuestions": [
        "Why did rotating Jagirs prevent feudal warlordism?",
        "What happened to agricultural output when tax rates exceeded 40%?"
      ],
      "whatToObserve": [
        "Over-taxing beyond one-third leads to land abandonment and desertion to Banjar fallow status."
      ],
      "takeawayInsight": "The Mughal administrative system succeeded because it synchronized fiscal realism with institutional meritocracy."
    }
  }
},

  // =========================================================================
  // HISTORY: The Indian National Movement & Freedom Struggle
  // =========================================================================
  {
  "id": "hist-indian-national-movement",
  "slug": "indian-national-movement",
  "title": "The Indian National Movement & Freedom Struggle",
  "subtitle": "From the 1857 Uprising through the Gandhian Mass Movements to Independence and Partition (1947)",
  "subjectId": "history",
  "difficulty": "Advanced",
  "estimatedMinutes": 30,
  "overview": "A comprehensive study of India's struggle for independence from British colonial rule. Covers the Revolt of 1857, the foundation of the Indian National Congress (1885), the Moderate and Extremist phases, the Swadeshi movement, the emergence of Mahatma Gandhi and mass mobilization (Non-Cooperation, Civil Disobedience, Quit India), revolutionary nationalism, INA, and the transfer of power with Partition in 1947.",
  "whyItMatters": "Provides the historical foundation for modern Indian constitutional democracy, secular nation-building, civil rights jurisprudence, and anti-colonial liberation movements worldwide.",
  "learningObjectives": [
    "Examine the political, socioeconomic, and military causes and consequences of the Revolt of 1857.",
    "Differentiate the constitutionalist methods of Early Nationalists (Moderates) from the assertive direct-action of Assertive Nationalists (Extremists).",
    "Analyze the strategy of Satyagraha, Ahimsa, and non-violent civil disobedience in the Non-Cooperation and Salt Satyagraha campaigns.",
    "Evaluate the roles of the Indian National Army (Subhas Chandra Bose), revolutionary activists, and the Quit India Movement in hastening British departure."
  ],
  "coreQuestions": [
    "How did Mahatma Gandhi transform an elite constitutional debating society into an all-India mass anti-colonial movement?",
    "Why was the salt tax chosen as the central focal point for the 1930 Civil Disobedience Movement?"
  ],
  "prerequisites": [
    "Basic understanding of British colonial expansion in India and the East India Company"
  ],
  "keyTerms": [
    {
      "term": "Satyagraha",
      "definition": "Gandhi's philosophy and method of non-violent resistance rooted in the power of truth (Satya) and soul-force, demanding steadfast opposition to injustice without hatred."
    },
    {
      "term": "Drain of Wealth",
      "definition": "Dadabhai Naoroji's economic theory demonstrating the unilateral siphoning of Indian revenue, capital, and raw materials to Britain without adequate economic return."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The Indian National Movement was one of the largest mass political mobilizations in human history, dismantling the British Empire through non-violent resistance, popular protest, and constitutional struggle.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Awakening of National Consciousness",
          "subtitle": "From 1857 to the Swadeshi Movement (1905)",
          "paragraphs": [
            "The Revolt of 1857 ended East India Company rule, placing India directly under the British Crown via the Queen's Proclamation of 1858. However, economic exploitation continued through the unilateral \"Drain of Wealth\" documented by Dadabhai Naoroji and Romesh Chunder Dutt.",
            "The foundation of the Indian National Congress in 1885 initially championed constitutional petitions (the Moderate phase: Gokhale, Naoroji, Ranade). Lord Curzon's Partition of Bengal in 1905 ignited the Swadeshi and Boycott Movement, led by the Assertive trio—Lal, Bal, and Pal—who demanded Swaraj (self-rule) as an inalienable birthright."
          ],
          "bulletPoints": [
            "Moderates: Faith in British sense of justice, 3 Ps (Petitions, Prayers, Protests), constitutional reform.",
            "Assertive Nationalists: Boycott of foreign cloth, national education, passive resistance, direct mass action."
          ],
          "callout": {
            "type": "axiom",
            "title": "Economic Critique Invariant",
            "text": "The early nationalists systematically exposed that Indian poverty was not natural or fatalistic, but the structural consequence of colonial de-industrialization and revenue extraction."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Gandhian Mass Movements & Final Independence",
          "subtitle": "Non-Cooperation, Civil Disobedience, INA, and Quit India",
          "paragraphs": [
            "Returning from South Africa, Mahatma Gandhi introduced Satyagraha—tested at Champaran (1917), Kheda, and Ahmedabad. Outrage over the Rowlatt Act and the Jallianwala Bagh Massacre (1919) led to the Non-Cooperation Movement (1920–22), uniting Hindus and Muslims alongside the Khilafat cause.",
            "In 1930, Gandhi initiated the Salt Satyagraha with the historic Dandi March, demonstrating how breaking a seemingly simple state monopoly on salt resonated universally across caste, gender, and economic divides. In 1942, the Quit India Movement (\"Do or Die\"), combined with Subhas Chandra Bose's Azad Hind Fauj (INA) campaigns and the Royal Indian Navy Mutiny of 1946, rendered colonial governance untenable, culminating in the Indian Independence Act of 1947."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The movement evolved from elite petitioning into a nationwide, multi-class mass movement.",
        "Non-violent civil disobedience demonstrated that state power collapses when citizens withdraw consent."
      ],
      "reflectionPrompt": "How did the communal divide and the Two-Nation Theory compromise the vision of a united independent India, leading to the tragedy of Partition?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Timeline of the Indian Freedom Struggle",
      "caption": "Evolutionary phases: 1857 Revolt -> Moderates -> Swadeshi -> Non-Cooperation -> Salt March -> Quit India (1942).",
      "diagramTitle": "The Escalation of Mass Resistance (1885–1947)",
      "diagramDescription": "Trajectory showing broadening participation: from legal elites to students, peasants, industrial workers, and women.",
      "components": [
        {
          "id": "c1",
          "name": "Constitutional Agitation (1885-1905)",
          "role": "Elite intellectual awakening",
          "description": "Legislative petitions, press critiques, economic drain analyses."
        },
        {
          "id": "c2",
          "name": "Swadeshi & Boycott (1905-1918)",
          "role": "Direct economic resistance",
          "description": "Bonfires of foreign textiles and indigenous industry promotion."
        },
        {
          "id": "c3",
          "name": "Gandhian Satyagraha (1919-1947)",
          "role": "Mass civil disobedience",
          "description": "All-India strikes, salt march, village constructive work, Quit India."
        }
      ],
      "visualSummary": "Mass non-cooperation systematically eroded the legitimacy and administrative machinery of the British Raj."
    },
    "examples-applications": {
      "overview": "Historical documentary analysis, oral histories of Partition, and comparative anti-colonial liberation studies.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Analyzing the Economic Strategy of the Salt March (1930)",
          "difficulty": "Advanced",
          "contextOrPrompt": "Explain why Mahatma Gandhi selected the salt tax as the central symbol to launch the 1930 Civil Disobedience Movement.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify universal impact",
              "work": "Salt was an absolute biological necessity consumed equally by the poorest peasant and the wealthiest citizen."
            },
            {
              "stepNumber": 2,
              "explanation": "Expose colonial injustice",
              "work": "The British state taxed a natural resource readily available along India's 6,000 km coastline and prohibited free private manufacture."
            },
            {
              "stepNumber": 3,
              "explanation": "Assess mobilizing power",
              "work": "Manufacture of illicit salt was simple, non-violent, immediately actionable, and visually dramatic for global press coverage."
            }
          ],
          "finalResult": "The salt monopoly was the perfect unifier across caste, class, and religion, exposing raw colonial exploitation.",
          "verificationTip": "The 240-mile march from Sabarmati to Dandi galvanized thousands of village communities along the route before the law was formally broken."
        }
      ],
      "applications": [
        {
          "domain": "Political Science & Civil Rights",
          "title": "Global Diffusion of Non-Violent Civil Disobedience",
          "context": "How Gandhian methods directly inspired Martin Luther King Jr.'s US Civil Rights Movement and Nelson Mandela's anti-Apartheid campaign.",
          "realWorldScenario": "Using non-violent boycotts, sit-ins, and peaceful marches to expose systemic legal disenfranchisement.",
          "impactMetric": "Passage of landmark civil rights legislation through moral mass pressure without armed insurrection."
        }
      ],
      "selfCheckExercise": {
        "question": "Which tragic incident in 1922 prompted Mahatma Gandhi to abruptly suspend the nationwide Non-Cooperation Movement?",
        "hint": "A police station was set on fire in Uttar Pradesh.",
        "solution": "The Chauri Chaura incident (February 1922), where a violent clash resulted in the death of 22 policemen, violating strict non-violence."
      }
    },
    "explore-experiment": {
      "activityTitle": "National Movement Strategy & Mobilization Lab",
      "objective": "Coordinate political campaigns between boycott, constructive village work, and constitutional negotiations.",
      "instructions": "Select campaign epoch (1905 Swadeshi, 1920 Non-Cooperation, or 1930 Salt Satyagraha). Balance rural peasant mobilization with municipal worker strikes. Observe British administrative reaction and international press coverage.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Boycott Rigor Level (%)",
          "description": "Controls boycott rigor level (%) in the simulation.",
          "min": 20,
          "max": 90,
          "step": 1,
          "defaultValue": 60,
          "unit": "compliance"
        },
        {
          "id": "var-2",
          "label": "Khadi & Constructive Work Focus",
          "description": "Controls khadi & constructive work focus in the simulation.",
          "min": 10,
          "max": 80,
          "step": 1,
          "defaultValue": 40,
          "unit": "effort share"
        }
      ],
      "guidingQuestions": [
        "Why did Gandhi insist on constructive work (spinning khadi, removing untouchability) between active protest phases?",
        "How did World War II accelerate Britain's fiscal inability to sustain Indian colonial garrisoning?"
      ],
      "whatToObserve": [
        "Combining economic boycotts with universal constructive self-reliance breaks colonial administrative control peacefully."
      ],
      "takeawayInsight": "Independence was won when millions of ordinary citizens refused to collaborate with foreign rule, proving moral courage over imperial arms."
    }
  }
},

  // =========================================================================
  // HISTORY: The First World War: Causes, Dynamics & Consequences
  // =========================================================================
  {
  "id": "hist-first-world-war",
  "slug": "first-world-war",
  "title": "The First World War: Causes, Dynamics & Consequences",
  "subtitle": "Imperialism, militarism, the alliance system, trench warfare, Treaty of Versailles, and the League of Nations",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Explores the systemic causes of World War I (1914–1918)—Militarism, Alliances, Imperialism, and Nationalism (MAIN)—triggered by the assassination of Archduke Franz Ferdinand at Sarajevo. Examines industrial warfare (machine guns, poison gas, artillery, tanks), the Russian Revolution of 1917, American entry, and the punitive Treaty of Versailles that reshaped the global geopolitical order.",
  "whyItMatters": "Essential for understanding the collapse of four major imperial dynasties (Russian, German, Austro-Hungarian, Ottoman), the rise of 20th-century fascism, and the root causes of World War II.",
  "learningObjectives": [
    "Deconstruct the MAIN underlying causes of the conflict: Militarism, Alliances, Imperialism, and Nationalism.",
    "Trace the July Crisis of 1914 from the Sarajevo assassination to the domino mobilization of European armies.",
    "Explain the nature of static industrial trench warfare along the Western Front.",
    "Critique the terms of the Treaty of Versailles (1919) and evaluate the structural weaknesses of the League of Nations."
  ],
  "coreQuestions": [
    "Why did the complex European alliance system (Triple Entente vs Triple Alliance) transform a Balkan regional conflict into a global total war?",
    "How did Article 231 (the \"War Guilt\" clause) of the Versailles Treaty sow the seeds of German revanchism?"
  ],
  "prerequisites": [
    "Basic understanding of 19th-century European imperialism and the Industrial Revolution"
  ],
  "keyTerms": [
    {
      "term": "Schlieffen Plan",
      "definition": "Germany's strategic military plan to rapidly knock out France by invading through neutral Belgium before turning east to confront slower Russian mobilization."
    },
    {
      "term": "Treaty of Versailles (1919)",
      "definition": "The peace settlement imposing heavy reparations, territorial losses, military disarmament, and the \"War Guilt Clause\" on Germany."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Between 1914 and 1918, the industrial powers of Europe unleashed mechanized slaughter on an unprecedented scale, permanently destroying the 19th-century balance of power.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Powder Keg of Europe & Systemic Causes",
          "subtitle": "Militarism, Alliances, Imperial Rivalries, and Pan-Slavism",
          "paragraphs": [
            "By the early 20th century, Europe was divided into two armed camps: the Triple Alliance (Germany, Austria-Hungary, Italy) and the Triple Entente (Britain, France, Russia). Imperial competition for African colonies and naval arms races (British Dreadnoughts vs German battleships) heightened tensions.",
            "The Balkans were known as the \"powder keg of Europe.\" Nationalism and Slavic self-determination, backed by Russia, clashed with Austro-Hungarian imperial hegemony. On June 28, 1914, Gavrilo Princip, a member of the Serbian nationalist group \"Black Hand\", assassinated Archduke Franz Ferdinand at Sarajevo, triggering a rigid cascade of mobilization treaties."
          ],
          "bulletPoints": [
            "Blank Cheque: Germany assured unconditional military support to Austria-Hungary in its ultimatum to Serbia.",
            "Mobilization Inflexibility: Railway timetables locked military high commands into irreversible all-out troop deployments."
          ],
          "callout": {
            "type": "axiom",
            "title": "Alliance Trap Invariant",
            "text": "Defensive secret treaties, designed to deter war through collective security, ironically ensured that a local regional crisis automatically dragged every major continent-spanning empire into catastrophic conflict."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Total War & The Flawed Peace of 1919",
          "subtitle": "Trench Stalemate, Russian Exit, and the Versailles Settlement",
          "paragraphs": [
            "Defensive industrial technology (rapid-fire machine guns, barbed wire, heavy artillery) rendered 19th-century cavalry charges obsolete, resulting in a 400-mile static trench stalemate along the Western Front. At Verdun and the Somme, casualties exceeded millions without strategic breakthroughs.",
            "Exhausted by war, Russia plunged into the Bolshevik Revolution of 1917, exiting via the Treaty of Brest-Litovsk. The entry of the United States shifted the material and manpower balance to the Allies, forcing the German Armistice on November 11, 1918. The subsequent Paris Peace Conference produced the Treaty of Versailles, stripping Germany of its overseas colonies, demilitarizing the Rhineland, capping its army at 100,000, and demanding astronomical monetary reparations."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Industrialized technology created catastrophic military stalemates that exhausted entire societies.",
        "The vindictive terms of the Versailles Treaty undermined the fragile Weimar Republic and created conditions for World War II."
      ],
      "reflectionPrompt": "Could the League of Nations have prevented World War II if the United States had ratified its covenant and joined as an active member?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Mechanisms of the 1914 Alliance Domino Effect",
      "caption": "Network graph showing bilateral mutual defense treaties cascading across Europe in July 1914.",
      "diagramTitle": "The July Crisis Mobilization Cascade",
      "diagramDescription": "Austria attacks Serbia -> Russia mobilizes -> Germany declares war on Russia & France -> Germany invades Belgium -> Britain enters.",
      "components": [
        {
          "id": "c1",
          "name": "Sarajevo Catalyst",
          "role": "Trigger event",
          "description": "Assassination of Archduke Franz Ferdinand by Serbian nationalists."
        },
        {
          "id": "c2",
          "name": "Secret Dual Alliances",
          "role": "Transmission mechanism",
          "description": "Triple Entente and Triple Alliance mutual defense obligations."
        },
        {
          "id": "c3",
          "name": "Railway Mobilization Timetables",
          "role": "Irreversible momentum",
          "description": "Inflexible logistical schedules that prevented diplomatic de-escalation."
        }
      ],
      "visualSummary": "Rigid military timetables and interconnected treaties transformed a local crisis into global industrial devastation."
    },
    "examples-applications": {
      "overview": "Geopolitical analysis, war finance, industrial logistics, and the history of international disarmament treaties.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Analyzing the Economic Terms of the Treaty of Versailles",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Explain how the economic reparations imposed on Germany in 1921 (£6.6 billion / 132 billion gold marks) contributed to the 1923 Weimar hyperinflation crisis.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Assess baseline economic capacity",
              "work": "Germany lost key coal and iron regions (Saar Basin under League supervision, Alsace-Lorraine returned to France, Upper Silesia ceded)."
            },
            {
              "stepNumber": 2,
              "explanation": "Analyze government debt financing",
              "work": "Unable to pay installments, French and Belgian troops occupied the Ruhr industrial basin in 1923; the Weimar government ordered passive resistance and printed paper marks to pay striking workers."
            },
            {
              "stepNumber": 3,
              "explanation": "Trace monetary collapse",
              "work": "Unbacked currency printing collapsed the Mark's purchasing power, triggering hyperinflation and destroying middle-class savings."
            }
          ],
          "finalResult": "Reparations combined with currency over-printing caused the catastrophic hyperinflation of 1923, radicalizing German politics.",
          "verificationTip": "Economist John Maynard Keynes resigned from the British peace delegation, publishing \"The Economic Consequences of the Peace\" warning of inevitable European collapse."
        }
      ],
      "applications": [
        {
          "domain": "International Diplomacy & Peace Studies",
          "title": "Post-Conflict Reconstruction vs Punitive Treaties",
          "context": "Comparing the vindictive Versailles Treaty with the post-WWII Marshall Plan in fostering long-term continental peace.",
          "realWorldScenario": "Designing economic aid and democratic rebuilding programs instead of extractive reparations after civil or interstate conflicts.",
          "impactMetric": "Eighty years of uninterrupted peace and economic integration in post-1945 Western Europe."
        }
      ],
      "selfCheckExercise": {
        "question": "Which clause in the Treaty of Versailles explicitly forced Germany to accept sole moral responsibility for causing all loss and damage in the war?",
        "hint": "Article number in the two-hundreds.",
        "solution": "Article 231, universally known as the \"War Guilt Clause\"."
      }
    },
    "explore-experiment": {
      "activityTitle": "Great War Diplomatic & Alliance Crisis Simulator",
      "objective": "Navigate the July Crisis of 1914 by choosing between diplomatic de-escalation, partial mobilization, or full mobilization.",
      "instructions": "Represent a Great Power (Germany, Britain, France, Russia, or Austria-Hungary). Review telegram dispatches and ultimatums. Evaluate whether halting rail mobilization can preserve peace without sacrificing border defense.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Mobilization Readiness (%)",
          "description": "Controls mobilization readiness (%) in the simulation.",
          "min": 10,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "preparedness"
        },
        {
          "id": "var-2",
          "label": "Diplomatic Mediation Efforts",
          "description": "Controls diplomatic mediation efforts in the simulation.",
          "min": 1,
          "max": 5,
          "step": 1,
          "defaultValue": 2,
          "unit": "diplomacy"
        }
      ],
      "guidingQuestions": [
        "Why was partial mobilization technically impossible for the Russian and German general staffs?",
        "How did Britain's treaty guaranteeing Belgian neutrality dictate its entry into the war?"
      ],
      "whatToObserve": [
        "Once railway mobilization orders are signed, diplomatic negotiations collapse as military panic drives decision-making."
      ],
      "takeawayInsight": "When military planning prioritizes rapid first-strikes over diplomatic flexibility, war becomes a self-fulfilling prophecy."
    }
  }
},

  // =========================================================================
  // HISTORY: The United Nations: Charter, Organs & Global Governance
  // =========================================================================
  {
  "id": "hist-united-nations-charter",
  "slug": "united-nations-charter",
  "title": "The United Nations: Charter, Organs & Global Governance",
  "subtitle": "Origins from the ashes of WWII, General Assembly, Security Council veto, specialized agencies, and peacekeeping",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Examines the establishment of the United Nations in San Francisco (1945) following the failure of the League of Nations. Details the structure and distinct mandates of its principal organs: General Assembly, Security Council (P5 veto power), Secretariat, International Court of Justice, and ECOSOC. Reviews specialized agencies (UNESCO, WHO, UNICEF) and UN peacekeeping operations in conflict zones.",
  "whyItMatters": "Essential for understanding contemporary international law, multilateral diplomacy, humanitarian relief, refugee protection, and global crisis management.",
  "learningObjectives": [
    "Trace the diplomatic origins of the UN from the Atlantic Charter (1941) to the San Francisco Conference (1945).",
    "Compare the composition and powers of the UN General Assembly with the UN Security Council.",
    "Explain the legal mechanism and geopolitical implications of the Permanent Five (P5) veto power.",
    "Appraise the humanitarian and developmental work of specialized agencies (WHO, UNESCO, UNICEF, UNHCR)."
  ],
  "coreQuestions": [
    "Why was the veto power granted exclusively to the five permanent members of the Security Council in 1945?",
    "How does the UN balance respect for national state sovereignty (Article 2.7) with universal human rights protection and collective security?"
  ],
  "prerequisites": [
    "Basic understanding of World War II and the failure of the League of Nations"
  ],
  "keyTerms": [
    {
      "term": "UN Security Council (UNSC)",
      "definition": "The 15-member body with primary responsibility for maintaining international peace and security, capable of passing legally binding resolutions and authorizing sanctions or force."
    },
    {
      "term": "P5 Veto Power",
      "definition": "The legal privilege held by the five permanent members (USA, UK, France, Russia, China) to block any substantive Security Council resolution with a single negative vote."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Created \"to save succeeding generations from the scourge of war,\" the United Nations serves as humanity's premier multilateral forum for diplomacy, international law, and collective security.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Genesis & Constitutional Architecture",
          "subtitle": "From the San Francisco Charter to Principal Organs",
          "paragraphs": [
            "On June 26, 1945, representatives of 50 nations signed the UN Charter at San Francisco. Determined not to repeat the fatal flaws of the League of Nations (which lacked enforcement mechanisms and required unanimity), the architects created an executive enforcement organ: the Security Council.",
            "The UN architecture comprises six principal organs: the General Assembly (the deliberative body where each of the 193 member states has one equal vote), the Security Council (15 members, 5 permanent with veto power), the Economic and Social Council (ECOSOC), the International Court of Justice at The Hague, the Secretariat led by the Secretary-General, and the Trusteeship Council (suspended in 1994)."
          ],
          "bulletPoints": [
            "General Assembly: Recommends resolutions on international peace, budget, and development; passes declarations (non-binding).",
            "Security Council: Sole body empowered to authorize military enforcement (Chapter VII), economic sanctions, and dispatch blue-helmet peacekeepers."
          ],
          "callout": {
            "type": "axiom",
            "title": "Collective Security Invariant",
            "text": "Under Chapter VII of the UN Charter, an attack or threat to peace anywhere can trigger mandatory, legally binding sanctions and military action by the international community."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. The Veto Dilemma, Peacekeeping & Specialized Agencies",
          "subtitle": "P5 Geopolitics, Blue Helmets, and Global Human Welfare",
          "paragraphs": [
            "The P5 veto power was conceived as a pragmatic compromise to ensure that world superpowers remained invested in the institution. However, during the Cold War and contemporary crises, veto stalemates have frequently paralyzed council responses to urgent humanitarian emergencies.",
            "Beyond military deterrence, the UN's greatest triumphs lie in its specialized agencies: the World Health Organization (WHO) eradicating smallpox and combating pandemics, UNICEF safeguarding children's health and education, UNESCO preserving world cultural heritage, and UNHCR providing sanctuary to tens of millions of displaced refugees."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The UN Security Council possesses sole international authority to legally mandate military force and economic sanctions.",
        "Specialized agencies deliver vital global public goods in health, education, and refugee humanitarian protection."
      ],
      "reflectionPrompt": "Should the UN Security Council be reformed to expand permanent membership to rising global powers like India, Japan, Germany, and Brazil?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "Structure of the United Nations System",
      "caption": "Organizational hierarchy: General Assembly, Security Council (P5 + 10 elected), ICJ, and Specialized Agencies.",
      "diagramTitle": "The Principal Organs and Global Agency Networks",
      "diagramDescription": "Executive security channel (UNSC) alongside deliberative assembly (UNGA) coordinating specialized humanitarian and legal bodies.",
      "components": [
        {
          "id": "c1",
          "name": "UN Security Council",
          "role": "Peace enforcement",
          "description": "5 Permanent (veto) + 10 Non-permanent members passing binding Chapter VII mandates."
        },
        {
          "id": "c2",
          "name": "General Assembly",
          "role": "Universal deliberative parliament",
          "description": "193 member states deliberating global treaties, budgets, and conventions."
        },
        {
          "id": "c3",
          "name": "Specialized Agencies (WHO/UNICEF)",
          "role": "Humanitarian & development execution",
          "description": "Autonomous bodies coordinating worldwide public health, disaster relief, and human rights."
        }
      ],
      "visualSummary": "The UN combines high-level geopolitical crisis mediation with worldwide grass-roots humanitarian assistance."
    },
    "examples-applications": {
      "overview": "International treaty analysis, diplomatic negotiations, and UN peacekeeping mission logistics.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Analyzing the Mechanics of a Security Council Vote",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A draft resolution authorizing a humanitarian ceasefire in a regional conflict receives 12 'Yes' votes, 2 'Abstentions', and 1 'No' vote from a Permanent Member. Determine the outcome and explain the constitutional reasoning.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Check affirmative vote threshold",
              "work": "Under Article 27(3), substantive decisions require 9 affirmative votes. 12 votes exceeds the minimum threshold."
            },
            {
              "stepNumber": 2,
              "explanation": "Check abstentions",
              "work": "By long-standing established UN precedent, an abstention by a permanent member does not constitute a veto."
            },
            {
              "stepNumber": 3,
              "explanation": "Assess the single negative vote",
              "work": "Because the one 'No' vote was cast by a Permanent Member (P5), it exercises the veto power."
            }
          ],
          "finalResult": "The resolution is defeated and fails to adopt despite overwhelming majority support, due to the P5 veto.",
          "verificationTip": "In situations of UNSC veto paralysis, the UN General Assembly can convene an Emergency Special Session under the \"Uniting for Peace\" Resolution 377A."
        }
      ],
      "applications": [
        {
          "domain": "International Law & Global Diplomacy",
          "title": "Multilateral Pandemic Response Coordination",
          "context": "Deploying the International Health Regulations (IHR) via the World Health Organization during disease outbreaks.",
          "realWorldScenario": "Coordinating international genomic sequencing data sharing and vaccine distribution to vulnerable developing nations.",
          "impactMetric": "Ninety percent reduction in initial outbreak containment delay across member states."
        }
      ],
      "selfCheckExercise": {
        "question": "Where is the official seat of the International Court of Justice (ICJ), the principal judicial organ of the UN?",
        "hint": "A city in the Netherlands known for the Peace Palace.",
        "solution": "The Hague, Netherlands (all other five principal organs are located at UN Headquarters in New York)."
      }
    },
    "explore-experiment": {
      "activityTitle": "UN Security Council Diplomatic Negotiation Sandbox",
      "objective": "Draft and pass a humanitarian resolution while negotiating language to prevent a P5 veto.",
      "instructions": "Draft resolution clauses addressing border monitoring, refugee corridors, or sanctions. Identify competing geopolitical interests of P5 members. Amend terminology (e.g. \"urges\" vs \"demands\") to secure consensus.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Resolution Enforcement Strength",
          "description": "Controls resolution enforcement strength in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "legal power"
        },
        {
          "id": "var-2",
          "label": "Sanctions Scope Level",
          "description": "Controls sanctions scope level in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "severity"
        }
      ],
      "guidingQuestions": [
        "Why do diplomats frequently negotiate under Chapter VI instead of Chapter VII to avoid veto threats?",
        "What role does the UN Secretary-General play under Article 99 of the Charter?"
      ],
      "whatToObserve": [
        "Softening coercive phrasing to diplomatic recommendations allows resolutions to survive without vetoes, enabling humanitarian access."
      ],
      "takeawayInsight": "The United Nations remains indispensable because it provides the only universal forum where competing superpowers must justify their actions to world opinion."
    }
  }
},

  // =========================================================================
  // HISTORY: The Indian Constitution: Preamble, Fundamental Rights & Duties
  // =========================================================================
  {
  "id": "civ-indian-constitution-fundamental-rights",
  "slug": "indian-constitution-fundamental-rights",
  "title": "The Indian Constitution: Preamble, Fundamental Rights & Duties",
  "subtitle": "Constituent Assembly debates, basic structure doctrine, Articles 12-35, and constitutional remedies",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "A deep dive into the world's longest written democratic constitution. Covers the philosophical blueprint of the Preamble (Sovereign, Socialist, Secular, Democratic, Republic), the six categories of Fundamental Rights (Articles 12–35), Directive Principles of State Policy (Part IV), Fundamental Duties (Part IVA), and Article 32 (Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto).",
  "whyItMatters": "Forms the bedrock of Indian civil liberties, social justice legislation, affirmative action jurisprudence, judicial review, and everyday citizen empowerment.",
  "learningObjectives": [
    "Interpret the key philosophical values embodied in the Preamble to the Indian Constitution.",
    "Analyze the scope and reasonable restrictions of the six Fundamental Rights (Articles 14–32).",
    "Explain the significance of Article 32 (\"Heart and Soul of the Constitution\") and the five constitutional writs.",
    "Differentiate between legally enforceable Fundamental Rights and non-justiciable Directive Principles."
  ],
  "coreQuestions": [
    "Why did Dr. B.R. Ambedkar designate Article 32 as the \"heart and soul\" of the Indian Constitution?",
    "How does the Basic Structure Doctrine (Kesavananda Bharati, 1973) limit Parliament's constitutional amending power under Article 368?"
  ],
  "prerequisites": [
    "Basic understanding of government branches and the Indian independence movement"
  ],
  "keyTerms": [
    {
      "term": "Article 32 (Right to Constitutional Remedies)",
      "definition": "The fundamental right guaranteeing direct access to the Supreme Court for the enforcement of fundamental rights through prerogative writs."
    },
    {
      "term": "Basic Structure Doctrine",
      "definition": "The judicial principle established in Kesavananda Bharati (1973) ruling that Parliament cannot amend or alter the foundational core features of the Constitution."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The Constitution of India is not merely a legal text, but a transformative social document designed to dismantle caste, feudal, and gender hierarchies into a democratic society founded on justice, liberty, and equality.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Preamble & The Six Fundamental Rights",
          "subtitle": "Articles 14 through 30: Pillars of Liberty and Equality",
          "paragraphs": [
            "Adopted on November 26, 1949, and coming into force on January 26, 1950, the Constitution was drafted by the Constituent Assembly under the chairmanship of Dr. B.R. Ambedkar. The Preamble proclaims India as a Sovereign, Socialist, Secular, Democratic Republic committed to Justice, Liberty, Equality, and Fraternity.",
            "Part III guarantees six fundamental rights against arbitrary state action: Right to Equality (Articles 14–18, abolishing untouchability and titles), Right to Freedom (Articles 19–22, protecting speech, assembly, and personal liberty under Article 21), Right against Exploitation (Articles 23–24, prohibiting trafficking and child labor), Right to Freedom of Religion (Articles 25–28), and Cultural and Educational Rights (Articles 29–30 for minority protections)."
          ],
          "bulletPoints": [
            "Article 21 (Protection of Life and Personal Liberty): Expanded by the judiciary to include the right to privacy, clean environment, education, and livelihood.",
            "Reasonable Restrictions: Rights are not absolute; they can be reasonably restricted on grounds of national sovereignty, public order, and morality."
          ],
          "callout": {
            "type": "axiom",
            "title": "Transformative Constitutionalism Invariant",
            "text": "Fundamental Rights operate as negative obligations restricting state tyranny, while Directive Principles impose positive obligations on the state to build an egalitarian welfare order."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Constitutional Remedies & The Prerogative Writs",
          "subtitle": "Article 32, Judicial Review, and the Five Writs",
          "paragraphs": [
            "A right without a remedy is meaningless. Dr. Ambedkar called Article 32 the \"very soul of the Constitution and the very heart of it.\" Under Article 32 (Supreme Court) and Article 226 (High Courts), citizens can petition the judiciary to issue five prerogative writs to enforce fundamental rights.",
            "The writs include: Habeas Corpus (\"to have the body\", protecting against illegal detention), Mandamus (\"we command\", ordering a public official to perform a statutory duty), Prohibition (halting subordinate court proceedings exceeding jurisdiction), Certiorari (quashing an unlawful order passed by a lower tribunal), and Quo-Warranto (challenging a person's legal right to hold a public office)."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Fundamental rights protect individual liberties and social equality against legislative and executive excess.",
        "Article 32 empowers the Supreme Court to safeguard rights through enforceable constitutional writs."
      ],
      "reflectionPrompt": "How did the Supreme Court's interpretation in the Maneka Gandhi case (1978) transform Article 21 from mere \"procedure established by law\" into substantive \"due process\" of fairness?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Architecture of Constitutional Rights & Remedies",
      "caption": "Relationship between Fundamental Rights, Judicial Review, and the Five Prerogative Writs.",
      "diagramTitle": "Constitutional Defense Mechanism: Part III and Article 32",
      "diagramDescription": "Aggrieved citizen invoking Article 32 directly to the Supreme Court to issue writs restraining state violations.",
      "components": [
        {
          "id": "c1",
          "name": "Part III Fundamental Rights",
          "role": "Constitutional shield",
          "description": "Civil liberties (Articles 14, 19, 21, 25) binding on all state instrumentalities."
        },
        {
          "id": "c2",
          "name": "Article 32 Writ Jurisdiction",
          "role": "Enforcement engine",
          "description": "Supreme Court power to issue Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo-Warranto."
        },
        {
          "id": "c3",
          "name": "Basic Structure Doctrine",
          "role": "Constitutional anchor",
          "description": "Judicial safeguard preventing legislative dilution of democratic core principles."
        }
      ],
      "visualSummary": "Constitutional remedies ensure that fundamental rights remain living guarantees rather than paper declarations."
    },
    "examples-applications": {
      "overview": "Constitutional litigation, public interest litigation (PIL), human rights jurisprudence, and legal aid clinics.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Selecting the Appropriate Constitutional Writ",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A citizen is arrested without a warrant and held in police custody for 72 hours without being produced before a magistrate, violating Article 22. Which constitutional writ should their family file, and in which court?",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify the constitutional violation",
              "work": "Article 22(2) mandates that every arrested person must be produced before the nearest magistrate within 24 hours of arrest."
            },
            {
              "stepNumber": 2,
              "explanation": "Select the matching prerogative writ",
              "work": "The writ of Habeas Corpus (\"produce the body\") is specifically designed to challenge unlawful or arbitrary detention."
            },
            {
              "stepNumber": 3,
              "explanation": "Identify competent legal forum",
              "work": "The petition can be filed directly before the High Court under Article 226 or before the Supreme Court under Article 32."
            }
          ],
          "finalResult": "A writ of Habeas Corpus must be filed under Article 32 (Supreme Court) or Article 226 (High Court) to secure immediate release.",
          "verificationTip": "Habeas Corpus petitions can even be initiated by letters or postcards addressed to the Chief Justice under the relaxed rules of Public Interest Litigation (PIL)."
        }
      ],
      "applications": [
        {
          "domain": "Constitutional Law & Civil Rights Advocacy",
          "title": "Public Interest Litigation (PIL) for Environmental Rights",
          "context": "Invoking Article 21 to compel municipal authorities to clean polluted drinking water sources.",
          "realWorldScenario": "Filing a Mandamus petition ordering industrial effluent treatment compliance along riverfront settlements.",
          "impactMetric": "One hundred percent compliance with zero-liquid discharge norms achieved within six months."
        }
      ],
      "selfCheckExercise": {
        "question": "Which constitutional amendment added the Fundamental Duties (Article 51A) to the Indian Constitution?",
        "hint": "Enacted in 1976 during the Emergency period.",
        "solution": "The 42nd Constitutional Amendment Act of 1976, recommended by the Swaran Singh Committee."
      }
    },
    "explore-experiment": {
      "activityTitle": "Constitutional Court & Fundamental Rights Simulator",
      "objective": "Review state legislative actions and executive orders against Part III constitutional standards.",
      "instructions": "Review incoming case facts (censorship order, arbitrary arrest, religious restriction). Determine if a fundamental right is infringed. Select the appropriate writ and draft the operative judicial order.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "State Police Action Grounds",
          "description": "Controls state police action grounds in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "legal standard"
        },
        {
          "id": "var-2",
          "label": "Proportionality Test Level",
          "description": "Controls proportionality test level in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "standard"
        }
      ],
      "guidingQuestions": [
        "Why cannot the state impose restrictions on free speech outside the specific categories listed in Article 19(2)?",
        "Why is the right to constitutional remedies itself made a fundamental right?"
      ],
      "whatToObserve": [
        "Applying strict proportionality tests prevents executive authorities from using vague public order justifications to silence dissent."
      ],
      "takeawayInsight": "The Indian Constitution empowers citizens with direct judicial remedies, guaranteeing liberty through the rule of law."
    }
  }
},

  // =========================================================================
  // HISTORY: Union Legislature & Executive: The Parliamentary System
  // =========================================================================
  {
  "id": "civ-parliamentary-democracy",
  "slug": "parliamentary-democracy",
  "title": "Union Legislature & Executive: The Parliamentary System",
  "subtitle": "Lok Sabha, Rajya Sabha, Prime Minister and Council of Ministers, President of India, and legislative processes",
  "subjectId": "history",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Explains the Westminster model of parliamentary democracy adopted by the Indian Constitution. Analyzes the bicameral Union Parliament: Lok Sabha (House of the People) and Rajya Sabha (Council of States), the constitutional office of the President (nominal executive), the Prime Minister and Council of Ministers (real executive), the principle of collective responsibility (Article 75), and the lifecycle of a bill becoming law.",
  "whyItMatters": "Understanding parliamentary procedure, budget passage, question hour, and no-confidence motions is crucial for active civic participation and holding elected officials accountable.",
  "learningObjectives": [
    "Compare the composition, election mechanism, and special powers of the Lok Sabha and Rajya Sabha.",
    "Explain the relationship between the nominal executive (President) and the real executive (Prime Minister and Cabinet).",
    "Describe the constitutional principle of collective responsibility of the Council of Ministers to the Lok Sabha.",
    "Trace the complete legislative journey of an ordinary bill and a money bill through Parliament."
  ],
  "coreQuestions": [
    "Why did India's constitutional framers choose a parliamentary system of government over a presidential system?",
    "What constitutional mechanisms grant the Lok Sabha financial supremacy over the Rajya Sabha regarding Money Bills?"
  ],
  "prerequisites": [
    "Basic understanding of elections and the three branches of government"
  ],
  "keyTerms": [
    {
      "term": "Collective Responsibility",
      "definition": "The constitutional convention (Article 75) where the Council of Ministers functions as a single team and is collectively accountable to the Lok Sabha; if a No-Confidence Motion passes, the entire ministry must resign."
    },
    {
      "term": "Money Bill",
      "definition": "A bill defined under Article 110 dealing exclusively with taxation, borrowing, or expenditure, which can only be introduced in the Lok Sabha on the President's recommendation."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "In India's parliamentary system, the executive is drawn directly from the legislature and remains continuously accountable to it through parliamentary oversight.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Bicameral Union Parliament",
          "subtitle": "Lok Sabha, Rajya Sabha, and the Legislative Process",
          "paragraphs": [
            "The Union Legislature (Sansad) is bicameral, comprising the President and two Houses: the Lok Sabha (Lower House / House of the People) and the Rajya Sabha (Upper House / Council of States). Lok Sabha members are directly elected by universal adult franchise for a 5-year term. Rajya Sabha is a permanent body not subject to dissolution; one-third of its members retire every second year, elected indirectly by State Legislative Assemblies.",
            "Both Houses share equal powers regarding ordinary legislation, constitutional amendments, and impeachment of the President. However, the Lok Sabha possesses exclusive pre-eminence over financial matters: Money Bills can only originate in the Lok Sabha, and the Rajya Sabha has only 14 days to recommend changes, which the Lok Sabha may accept or reject."
          ],
          "bulletPoints": [
            "Question Hour: The first hour of every parliamentary sitting where MPs interrogate ministers on departmental actions.",
            "No-Confidence Motion: Exclusive to the Lok Sabha; tests whether the governing ministry continues to enjoy the majority support of the House."
          ],
          "callout": {
            "type": "axiom",
            "title": "Financial Supremacy Invariant",
            "text": "Under Article 109, the elected House directly representing the taxpayers (Lok Sabha) possesses absolute final authority over taxation and expenditure of public funds."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Nominal Executive vs Real Executive",
          "subtitle": "The President, Prime Minister, and Cabinet Governance",
          "paragraphs": [
            "The Indian executive features a dual head: the President of India is the constitutional, nominal head of state (De jure), in whose name all executive actions are taken. However, under Article 74, the President is bound to act in accordance with the advice of the Council of Ministers headed by the Prime Minister (De facto real executive).",
            "The Prime Minister is the keystone of the cabinet arch—selecting ministers, allocating portfolios, presiding over Cabinet meetings, and acting as the primary channel of communication between the Council of Ministers and the President. Under Article 75(3), the Council of Ministers is collectively responsible to the Lok Sabha, meaning a defeat on a policy bill or budget forces the resignation of the entire government."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The executive branch remains permanently tethered to and accountable to the elected legislature.",
        "The Lok Sabha wields financial supremacy and holds the government's survival through confidence motions."
      ],
      "reflectionPrompt": "How do parliamentary standing committees provide non-partisan technical scrutiny of complex bills away from televised floor debate?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Westminster Governance Matrix in India",
      "caption": "Relationship between Electorate, Lok Sabha, Rajya Sabha, Prime Minister & Cabinet, and the President.",
      "diagramTitle": "Executive-Legislative Integration and Accountability Chain",
      "diagramDescription": "Electorate -> Lok Sabha -> Majority party forms Council of Ministers -> Advises President -> Accountable to Parliament.",
      "components": [
        {
          "id": "c1",
          "name": "Lok Sabha (543 MPs)",
          "role": "Direct public representation",
          "description": "Passes legislation, controls budget, and enforces executive accountability."
        },
        {
          "id": "c2",
          "name": "Prime Minister & Cabinet",
          "role": "Real executive policymaking",
          "description": "Steers national policy, drafts government bills, and executes laws."
        },
        {
          "id": "c3",
          "name": "President of India",
          "role": "Nominal constitutional head",
          "description": "Assents to bills, summons sessions, acts on binding Council advice."
        }
      ],
      "visualSummary": "The parliamentary executive cannot govern without maintaining the active confidence of the popular chamber."
    },
    "examples-applications": {
      "overview": "Parliamentary records analysis, legislative drafting, budget tracking, and civic governance monitoring.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Tracing the Passage of a Financial Bill",
          "difficulty": "Intermediate",
          "contextOrPrompt": "A newly introduced Union Finance Bill proposes a revision of income tax slabs. Outline the required constitutional procedure for its enactment.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify bill classification",
              "work": "Taxation provisions make this a Money Bill under Article 110. It requires prior recommendation of the President."
            },
            {
              "stepNumber": 2,
              "explanation": "Introduction and passage in Lok Sabha",
              "work": "Introduced exclusively in the Lok Sabha. Following debates and clause-by-clause voting, it is certified as a Money Bill by the Speaker and transmitted to the Rajya Sabha."
            },
            {
              "stepNumber": 3,
              "explanation": "Rajya Sabha review window",
              "work": "The Rajya Sabha must return the bill within 14 days. Whether it makes recommendations or not, the bill is deemed passed by both Houses at the expiry of 14 days."
            },
            {
              "stepNumber": 4,
              "explanation": "Presidential assent",
              "work": "Presented to the President, who cannot withhold assent or return a Money Bill for reconsideration."
            }
          ],
          "finalResult": "The Finance Bill becomes law upon the President's mandatory assent.",
          "verificationTip": "The Speaker of the Lok Sabha has the final, non-justiciable constitutional authority to decide whether a bill is a Money Bill."
        }
      ],
      "applications": [
        {
          "domain": "Public Policy & Civic Technology",
          "title": "Citizen Legislative Accountability Dashboards",
          "context": "Tracking parliamentary attendance, questions asked, and voting records of local Members of Parliament.",
          "realWorldScenario": "Empowering constituents with real-time empirical data on legislative debates and constituency development fund (MPLADS) utilization.",
          "impactMetric": "Forty percent increase in voter participation in town-hall accountability forums."
        }
      ],
      "selfCheckExercise": {
        "question": "What happens to the entire Council of Ministers if a No-Confidence Motion is passed by a simple majority in the Lok Sabha?",
        "hint": "Governed by the rule of collective responsibility.",
        "solution": "The Prime Minister and the entire Council of Ministers must immediately submit their resignation to the President."
      }
    },
    "explore-experiment": {
      "activityTitle": "Parliamentary Debate & Bill Passage Sandbox",
      "objective": "Guide a contested public health bill through parliamentary committee stages and floor debates.",
      "instructions": "Draft bill amendments to address Opposition questions. Manage coalition partner floor votes. Overcome filibuster motions during the third reading clause review.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Ruling Coalition Majority Margin",
          "description": "Controls ruling coalition majority margin in the simulation.",
          "min": 5,
          "max": 100,
          "step": 1,
          "defaultValue": 25,
          "unit": "MPs"
        },
        {
          "id": "var-2",
          "label": "Opposition Amendments Accepted",
          "description": "Controls opposition amendments accepted in the simulation.",
          "min": 0,
          "max": 15,
          "step": 1,
          "defaultValue": 3,
          "unit": "clauses"
        }
      ],
      "guidingQuestions": [
        "Why does the government negotiate with opposition parties in the Business Advisory Committee?",
        "What occurs during a joint sitting of Parliament under Article 108?"
      ],
      "whatToObserve": [
        "Accepting constructive amendments in standing committees accelerates swift floor passage with bipartisan support."
      ],
      "takeawayInsight": "Parliamentary democracy balances majority rule with institutionalized minority debate and scrutiny."
    }
  }
},

  // =========================================================================
  // HISTORY: The Judiciary & the Rule of Law
  // =========================================================================
  {
  "id": "civ-judiciary-rule-of-law",
  "slug": "judiciary-rule-of-law",
  "title": "The Judiciary & the Rule of Law",
  "subtitle": "Supreme Court of India, High Courts, Judicial Review, collegium system, and Public Interest Litigation",
  "subjectId": "history",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "Examines the structure, independence, and constitutional role of India's integrated single judicial hierarchy. Covers the Supreme Court of India, High Courts, and Subordinate Courts. Analyzes Original, Appellate, Advisory, and Writ jurisdictions, judicial independence safeguards, judicial review, the Collegium system for judicial appointments, and the evolution of Public Interest Litigation (PIL).",
  "whyItMatters": "An independent judiciary is the ultimate guardian of constitutional democracy, civil rights, and the rule of law against legislative and executive overreach.",
  "learningObjectives": [
    "Explain the integrated judicial pyramid in India (Supreme Court -> High Courts -> Subordinate District Courts).",
    "Examine constitutional safeguards securing judicial independence (tenure, fixed salaries, impeachment threshold).",
    "Differentiate the jurisdictions of the Supreme Court: Original (Article 131), Appellate (Articles 132-134), Advisory (Article 143), and Special Leave Petitions (Article 136).",
    "Critique the evolution and impact of Public Interest Litigation (PIL) on expanding access to justice."
  ],
  "coreQuestions": [
    "Why did India opt for a single integrated judiciary rather than dual federal-state court systems like the United States?",
    "How does Public Interest Litigation (PIL) democratize access to justice for marginalized citizens who cannot afford litigation?"
  ],
  "prerequisites": [
    "Basic understanding of the Indian Constitution and separation of powers"
  ],
  "keyTerms": [
    {
      "term": "Judicial Review",
      "definition": "The constitutional power of the Supreme Court and High Courts to declare any legislative statute or executive order unconstitutional and void if it violates the Constitution."
    },
    {
      "term": "Public Interest Litigation (PIL)",
      "definition": "A legal proceeding initiated by any public-spirited individual or organization on behalf of disadvantaged citizens whose fundamental rights are violated, relaxing traditional locus standi."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Unlike federal systems with separate federal and state courts, India features a single integrated judicial pyramid, with the Supreme Court at the apex ensuring uniform interpretation of the law across the nation.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Integrated Judicial Hierarchy & Independence",
          "subtitle": "The Supreme Court, High Courts, and Institutional Autonomy",
          "paragraphs": [
            "The Indian judiciary is structured as a unified pyramid: District and Subordinate Courts at the base, 25 High Courts at the state level, and the Supreme Court of India at the apex. A single body of civil and criminal law (IPC/BNS, CrPC/BNSS, CPC) applies nationwide.",
            "Constitutional framers instituted robust structural safeguards to guarantee judicial independence from political pressure: judges have security of tenure until retirement age (65 for Supreme Court, 62 for High Courts); salaries and allowances are charged directly onto the Consolidated Fund of India (not subject to annual parliamentary vote); and removal requires an extraordinarily high impeachment threshold (two-thirds majority in both Houses of Parliament on proven misbehavior or incapacity)."
          ],
          "bulletPoints": [
            "Original Jurisdiction (Article 131): Exclusive power to arbitrate federal disputes between the Union and States or between two States.",
            "Advisory Jurisdiction (Article 143): Power of the President to consult the Supreme Court on questions of law or public importance."
          ],
          "callout": {
            "type": "axiom",
            "title": "Judicial Independence Invariant",
            "text": "Under Article 141, the law declared by the Supreme Court is binding on all courts, tribunals, and authorities within the territory of India."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Judicial Review & Public Interest Litigation (PIL)",
          "subtitle": "Basic Structure, Locus Standi Relaxation, and Social Justice",
          "paragraphs": [
            "Judicial Review empowers the higher courts to examine the constitutional validity of legislative enactments and executive decrees. If a law infringes Fundamental Rights or violates the Basic Structure of the Constitution, the court strikes it down as ultra vires.",
            "Beginning in the late 1970s under Justices P.N. Bhagwati and V.R. Krishna Iyer, the Supreme Court pioneered Public Interest Litigation (PIL). By relaxing the traditional rule of locus standi (which required the aggrieved person themselves to file suit), the court allowed any citizen, journalist, or NGO to file petitions on behalf of bonded laborers, prisoners, and victims of environmental pollution, transforming the judiciary into a people's court."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "India's integrated judicial pyramid enforces uniform constitutional and statutory standards nationwide.",
        "PIL democratized justice by allowing public-spirited citizens to advocate for marginalized communities."
      ],
      "reflectionPrompt": "How can the judiciary balance active social justice intervention (PIL) with the risk of judicial overreach into executive and legislative policy domains?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Indian Judicial Pyramid & Jurisdiction Hierarchy",
      "caption": "Supreme Court (Apex) -> High Courts (State) -> District & Sessions Courts -> Subordinate Magistrates.",
      "diagramTitle": "Integrated Single Judicial Pyramid of India",
      "diagramDescription": "Appeals flow upward from Subordinate Courts to High Courts and culminate at the Supreme Court; precedents bind downward.",
      "components": [
        {
          "id": "c1",
          "name": "Supreme Court of India (Apex)",
          "role": "Final arbiter & constitutional guardian",
          "description": "Original, Appellate, Advisory, and Article 32 Writ jurisdiction."
        },
        {
          "id": "c2",
          "name": "High Courts (State Level)",
          "role": "Provincial constitutional authority",
          "description": "Article 226 broad writ powers, supervision over all subordinate state tribunals."
        },
        {
          "id": "c3",
          "name": "District & Sessions Courts",
          "role": "Trial and fact-finding base",
          "description": "Civil and criminal trials, evidence recording, and initial sentencing."
        }
      ],
      "visualSummary": "A single, unified hierarchy ensures consistent application of constitutional principles and statutory justice."
    },
    "examples-applications": {
      "overview": "Case law analysis, constitutional jurisprudence, courtroom procedure, and legal aid clinic operations.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Evaluating Locus Standi in a Public Interest Litigation Case",
          "difficulty": "Advanced",
          "contextOrPrompt": "A non-profit organization discovers that children in a remote quarry district are subjected to hazardous child labor in violation of Article 24. Can the NGO petition the Supreme Court under Article 32 if none of its own members are victims?",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Analyze traditional locus standi rule",
              "work": "Traditionally, only the individual whose rights were personally infringed had standing to petition the court."
            },
            {
              "stepNumber": 2,
              "explanation": "Apply PIL exception doctrine",
              "work": "Under the doctrine established in S.P. Gupta (1981) and Bandhua Mukti Morcha (1984), where victims belong to a deprived class unable to approach the court due to poverty or ignorance, any public-spirited entity has locus standi."
            },
            {
              "stepNumber": 3,
              "explanation": "Determine constitutional remedy",
              "work": "The petition is fully maintainable under Article 32. The Supreme Court can appoint court commissioners to inspect the quarry and order rescue, rehabilitation, and prosecution."
            }
          ],
          "finalResult": "The petition is maintainable; the court will exercise jurisdiction to enforce fundamental rights on behalf of the children.",
          "verificationTip": "The Supreme Court can treat even a newspaper report or telegram as a PIL writ petition (epistolary jurisdiction)."
        }
      ],
      "applications": [
        {
          "domain": "Constitutional Law & Environmental Jurisprudence",
          "title": "Judicial Enforcement of the Precautionary Principle",
          "context": "Applying the polluter pays and precautionary environmental principles to halt industrial river pollution.",
          "realWorldScenario": "Issuing judicial orders to relocate polluting tanneries and install mandatory common effluent treatment facilities.",
          "impactMetric": "Eighty percent reduction in toxic hexavalent chromium discharge in local municipal watersheds."
        }
      ],
      "selfCheckExercise": {
        "question": "What is the mandatory retirement age for a Judge of the Supreme Court of India?",
        "hint": "Contrasted with 62 years for High Court judges.",
        "solution": "65 years (as specified in Article 124(2) of the Indian Constitution)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Constitutional Bench & Judicial Review Sandbox",
      "objective": "Adjudicate constitutional challenges to state statutes and balance public interest with fundamental rights.",
      "instructions": "Review legislative enactment challenged under Article 14 (Equality) and Article 19 (Freedoms). Apply tests of intelligible differentia and proportional state objective. Deliver bench ruling: uphold, sever, or strike down.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Judicial Scrutiny Rigor",
          "description": "Controls judicial scrutiny rigor in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "standard"
        },
        {
          "id": "var-2",
          "label": "Public Interest Weighting",
          "description": "Controls public interest weighting in the simulation.",
          "min": 10,
          "max": 90,
          "step": 1,
          "defaultValue": 50,
          "unit": "balance"
        }
      ],
      "guidingQuestions": [
        "What is the doctrine of severability when only one section of a statute is unconstitutional?",
        "Why does the collegium system aim to insulate judicial appointments from executive political patronage?"
      ],
      "whatToObserve": [
        "Striking down unconstitutional sections while severing valid statutory provisions preserves legislative intent without compromising civil liberties."
      ],
      "takeawayInsight": "The judiciary protects the rule of law by ensuring that no majority in Parliament can violate basic constitutional rights."
    }
  }
},

  // =========================================================================
  // GEOGRAPHY: Climate & Monsoon Mechanisms of the Indian Subcontinent
  // =========================================================================
  {
  "id": "geo-climate-monsoon-mechanisms",
  "slug": "climate-monsoon-mechanisms",
  "title": "Climate & Monsoon Mechanisms of the Indian Subcontinent",
  "subtitle": "Thermal contrast, ITCZ migration, jet streams, El Niño/IOD, and regional rainfall distribution",
  "subjectId": "geography",
  "difficulty": "Advanced",
  "estimatedMinutes": 25,
  "overview": "A comprehensive scientific analysis of the South Asian monsoon system. Explains the differential heating of land and sea, the seasonal migration of the Inter-Tropical Convergence Zone (ITCZ), Tibetan plateau thermal heating, subtropical westerly and tropical easterly jet streams, Somali low-level jet, and teleconnections with El Niño-Southern Oscillation (ENSO) and the Indian Ocean Dipole (IOD).",
  "whyItMatters": "The monsoon delivers over 70% of India's annual precipitation, directly dictating agricultural crop yields (Kharif/Rabi), groundwater replenishment, hydroelectric power generation, and macro-economic stability.",
  "learningObjectives": [
    "Explain the thermal and dynamic theories explaining the onset and progression of the Southwest Monsoon.",
    "Analyze the atmospheric role of the shifting Inter-Tropical Convergence Zone (ITCZ) and the Tibetan Plateau.",
    "Differentiate the two branches of the Southwest Monsoon: Arabian Sea branch and Bay of Bengal branch.",
    "Evaluate how global ocean-atmosphere teleconnections (ENSO, El Niño, La Niña, positive/negative IOD) alter monsoon reliability."
  ],
  "coreQuestions": [
    "Why does the monsoon \"burst\" over the Malabar coast in early June rather than progressing gradually?",
    "How does an El Niño event in the eastern tropical Pacific disrupt the moisture-bearing monsoon winds over the Indian subcontinent?"
  ],
  "prerequisites": [
    "Basic understanding of atmospheric pressure belts, Coriolis force, and evaporation cycles"
  ],
  "keyTerms": [
    {
      "term": "Inter-Tropical Convergence Zone (ITCZ)",
      "definition": "The low-pressure equatorial trough where northeast and southeast trade winds converge, which migrates northward to 20°-25°N over the Gangetic plain in summer."
    },
    {
      "term": "Indian Ocean Dipole (IOD)",
      "definition": "An ocean-atmosphere phenomenon characterized by anomalous differences in sea surface temperatures between the western and eastern tropical Indian Ocean."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "The Indian monsoon is not simply a seasonal wind change; it is one of the planet's most massive coupled land-ocean-atmosphere heat engines, governing the lives of over 1.4 billion people.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Dynamic Foundations of the Southwest Monsoon",
          "subtitle": "Thermal Heating, ITCZ Migration, and Upper-Air Jet Streams",
          "paragraphs": [
            "In summer, intense solar insolation heats the vast landmass of north-western India and the high-altitude Tibetan Plateau (elevated heat engine), creating an intense low-pressure trough known as the Monsoon Trough (migrated ITCZ). Concurrently, the subtropical southern Indian Ocean remains relatively cool, establishing an intense high-pressure cell near Mascarene Islands.",
            "Southeast trade winds crossing the equator are deflected to the right by the Coriolis force (Ferrel's Law), transforming into the moisture-laden Southwest Monsoon winds. The retreat of the Subtropical Westerly Jet Stream from south of the Himalayas and the sudden establishment of the Tropical Easterly Jet Stream (TEJ) over peninsular India triggers the dramatic \"burst of the monsoon\" over Kerala in early June."
          ],
          "bulletPoints": [
            "Arabian Sea Branch: Hits the Western Ghats causing massive orographic rainfall on the windward side (250–400 cm) while leaving the Deccan Plateau in rain-shadow.",
            "Bay of Bengal Branch: Channeled by the Arakan Yoma mountains of Myanmar into the Gangetic valley, delivering heavy precipitation to the Northeast (Mawsynram/Cherrapunji) and northern plains."
          ],
          "callout": {
            "type": "axiom",
            "title": "Orographic Invariant",
            "text": "When moisture-saturated air ascends the steep Western Ghats, adiabatic cooling forces immediate condensation and torrential rain on the coast, leaving the interior plateau dry and arid."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Retreating Monsoon & Global Teleconnections",
          "subtitle": "Northeast Monsoon, Tropical Cyclones, and ENSO/IOD Impacts",
          "paragraphs": [
            "By October, solar insolation moves south towards the Tropic of Capricorn. The northern landmass cools rapidly, causing the low-pressure trough to withdraw southward. Winds reverse direction, blowing from land to sea as the Northeast (Retreating) Monsoon. Picking up moisture over the Bay of Bengal, these winds bring vital winter rains to coastal Tamil Nadu (Coromandel coast) and spawn destructive post-monsoon tropical cyclones.",
            "Monsoon interannual variability is deeply coupled to global teleconnections. An El Niño event (warming of the eastern Pacific) typically suppresses Indian monsoon rainfall by disrupting the Walker Circulation. Conversely, a Positive Indian Ocean Dipole (+IOD, warm western Indian Ocean) counters El Niño's drying effect, bolstering rainfall across peninsular India."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "The monsoon is driven by the seasonal migration of the ITCZ, differential land-sea thermal contrasts, and jet streams.",
        "Global oceanic patterns (El Niño and IOD) exert decisive influence over seasonal precipitation reliability."
      ],
      "reflectionPrompt": "How is anthropogenic global warming altering the Indian monsoon, making rainfall events more extreme yet reducing total rainy days?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Indian Ocean Monsoon Circulation Engine",
      "caption": "Atmospheric pressure gradients, Somali Jet, Arabian Sea/Bay of Bengal branches, and ITCZ positioning.",
      "diagramTitle": "Summer Monsoon Atmospheric Dynamics over South Asia",
      "diagramDescription": "Mascarene High pushing crossed-equator winds toward the Gangetic low-pressure trough via Arabian Sea and Bay of Bengal arms.",
      "components": [
        {
          "id": "c1",
          "name": "Monsoon Trough (ITCZ)",
          "role": "Low-pressure thermal vacuum",
          "description": "Draws marine air masses deep into the northern plains."
        },
        {
          "id": "c2",
          "name": "Somali Low-Level Jet",
          "role": "Moisture superhighway",
          "description": "Fast-moving low-level air stream funneling Indian Ocean vapor to the western coast."
        },
        {
          "id": "c3",
          "name": "Western Ghats Barrier",
          "role": "Orographic trigger",
          "description": "Forces rapid condensation, causing heavy windward coastal deluges."
        }
      ],
      "visualSummary": "Differential heating and atmospheric jet streams drive the seasonal wind reversal that sustains South Asian agriculture."
    },
    "examples-applications": {
      "overview": "Meteorological forecasting, radar precipitation analysis, agricultural planting calendars, and water reservoir management.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Calculating Orographic Rainfall Gradient Across the Western Ghats",
          "difficulty": "Advanced",
          "contextOrPrompt": "A moist air parcel at 28°C and 100% relative humidity at sea level ascends the Western Ghats to a crest altitude of 2,000 m. If the saturated adiabatic lapse rate is 5°C per 1,000 m, determine its crest temperature and explain why coastal rainfall is so intense.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Compute temperature decrease during ascent",
              "work": "Temperature drop = lapse rate × altitude = (5°C / 1,000 m) × 2,000 m = 10°C."
            },
            {
              "stepNumber": 2,
              "explanation": "Determine crest air parcel temperature",
              "work": "Crest temperature = 28°C - 10°C = 18°C."
            },
            {
              "stepNumber": 3,
              "explanation": "Evaluate moisture-holding capacity loss",
              "work": "Cooling from 28°C to 18°C reduces saturation vapor capacity by nearly 50%, forcing rapid liquid droplet condensation and torrential orographic precipitation."
            }
          ],
          "finalResult": "The air parcel cools to 18°C at the crest, triggering heavy orographic downpours on the windward coastal belt.",
          "verificationTip": "Once the air descends the leeward eastern slope, adiabatic compression warms it at 10°C/km (dry adiabatic lapse rate), creating warm, dry rain-shadow conditions."
        }
      ],
      "applications": [
        {
          "domain": "Hydrology & Agricultural Planning",
          "title": "Monsoon-Synchronized Reservoir Inflow Management",
          "context": "Optimizing hydroelectric and irrigation dam releases based on 10-day monsoon trough tracking.",
          "realWorldScenario": "Preventing downstream dam-induced flooding during sudden monsoon surge depressions while storing adequate irrigation water for dry winter crops.",
          "impactMetric": "Zero emergency spillway overflows achieved with 98% conservation storage efficiency."
        }
      ],
      "selfCheckExercise": {
        "question": "Which place in Meghalaya, India, records the highest average annual rainfall in the world due to its funnel-shaped funneling hills?",
        "hint": "Near Cherrapunji in the Khasi Hills.",
        "solution": "Mawsynram (recording approximately 11,870 mm of annual precipitation)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Monsoon Atmospheric & Ocean Teleconnection Simulator",
      "objective": "Vary sea surface temperatures, El Niño index, and Tibetan heating to observe monsoon onset dates and rainfall distributions.",
      "instructions": "Adjust eastern Pacific sea surface temperature anomaly (-2°C La Niña to +3°C El Niño). Toggle Indian Ocean Dipole (+IOD / -IOD). Observe the resulting monsoon burst date and percentage departure from normal rainfall.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "ENSO Index (°C anomaly)",
          "description": "Controls enso index (°c anomaly) in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 0,
          "unit": "temperature"
        },
        {
          "id": "var-2",
          "label": "Indian Ocean Dipole (IOD)",
          "description": "Controls indian ocean dipole (iod) in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 0.5,
          "unit": "dipole mode"
        }
      ],
      "guidingQuestions": [
        "Why does a positive IOD often neutralize a weak El Niño's negative drying impact on India?",
        "How do the Himalayas prevent dry, freezing Central Asian winter winds from penetrating into the subcontinent?"
      ],
      "whatToObserve": [
        "When an El Niño event coincides with a negative IOD, catastrophic drought anomalies emerge across central and northwest India."
      ],
      "takeawayInsight": "The South Asian monsoon is an intricately balanced global heat engine where Pacific ocean temperatures directly modulate Indian agriculture."
    }
  }
},

  // =========================================================================
  // ENGLISH: Active & Passive Voice: Structural Mechanics & Pragmatics
  // =========================================================================
  {
  "id": "eng-active-passive-voice",
  "slug": "active-passive-voice",
  "title": "Active & Passive Voice: Structural Mechanics & Pragmatics",
  "subtitle": "Syntactic transformations, agent demotion, tense conjugations, and rhetorical purpose in discourse",
  "subjectId": "english",
  "difficulty": "Foundational",
  "estimatedMinutes": 20,
  "overview": "Examines the syntactic transformation between active voice (where the grammatical subject performs the action) and passive voice (where the subject receives the action). Details rules for auxiliary verb insertion (be + past participle), pronoun case shifts, modal verbs, imperative sentences, and explains why passive voice is essential in scientific reporting, legal drafting, and news neutrality.",
  "whyItMatters": "Mastering voice enhances stylistic range, rhetorical precision, scientific objective tone, and critical awareness of syntactic agent concealment.",
  "learningObjectives": [
    "Transform sentences between active and passive voice across simple, continuous, and perfect tenses.",
    "Explain the syntactic rule: Subject -> Prepositional Agent (\"by\"), Object -> Grammatical Subject, Verb -> (be-verb + V3).",
    "Identify when the agent should be omitted (truncated passive) when unknown, irrelevant, or universally obvious.",
    "Critique the rhetorical use of passive voice in journalism, politics, and scientific research publications."
  ],
  "coreQuestions": [
    "Why is passive voice preferred in scientific methodology sections and scientific research papers?",
    "How does the passive voice allow writers to deemphasize or entirely conceal the person responsible for an action?"
  ],
  "prerequisites": [
    "Subject-Verb-Object (SVO) sentence structure and principal parts of irregular verbs"
  ],
  "keyTerms": [
    {
      "term": "Agent",
      "definition": "The semantic entity that performs the action denoted by the verb, introduced by the preposition \"by\" in a passive construction."
    },
    {
      "term": "Truncated (Agentless) Passive",
      "definition": "A passive construction where the agent is omitted entirely because it is unknown, obvious, or intentionally concealed (e.g. \"Mistakes were made\")."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Grammatical voice dictates the focus of attention in a sentence: active voice spotlights the actor, while passive voice spotlights the action or the entity affected.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Core Syntactic Transformation Rules",
          "subtitle": "The Triad: Object Elevation, Auxiliary Insertion, and Agent Demotion",
          "paragraphs": [
            "In active voice, the subject acts: \"The research team (S) synthesized (V) the compound (O).\" In passive voice, the direct object becomes the subject: \"The compound (S) was synthesized (V) by the research team (Agent).\" The core invariant is that only transitive verbs (verbs taking direct objects) can undergo passive transformation; intransitive verbs (e.g., sleep, arrive, occur) cannot.",
            "The passive verb phrase always follows the structure: appropriate tense form of auxiliary \"to be\" + Past Participle (V3). Tense consistency is mandatory across transformations."
          ],
          "bulletPoints": [
            "Simple Present / Past: \"writes\" -> \"is written\"; \"wrote\" -> \"was written\".",
            "Continuous Tenses: \"is writing\" -> \"is being written\"; \"was writing\" -> \"was being written\".",
            "Perfect Tenses: \"has written\" -> \"has been written\"; \"had written\" -> \"had been written\".",
            "Modal Auxiliaries: \"must complete\" -> \"must be completed\"."
          ],
          "callout": {
            "type": "axiom",
            "title": "Transitivity Invariant",
            "text": "Passive transformation requires a direct object to elevate into the subject slot. A sentence like \"The birds flew into the sunset\" cannot be passivized because \"flew\" is intransitive."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Rhetorical Purpose & The Agentless Passive",
          "subtitle": "Scientific Objectivity, Journalistic Neutrality, and Bureaucratic Obfuscation",
          "paragraphs": [
            "Passive voice is not a grammatical error; it is a vital rhetorical tool. In scientific writing, the passive voice establishes experimental objectivity (\"The solution was heated to 100°C\") because the researcher's identity is irrelevant to the replicability of the phenomenon.",
            "Similarly, the truncated passive is essential when the agent is unknown (\"My bicycle was stolen\"), universally understood (\"Wheat is harvested in April\"), or when tact or diplomacy requires avoiding personal accusation (\"An administrative error has been detected\" rather than \"You made an error\")."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Active voice ensures clarity, vigor, and accountability in general narrative prose.",
        "Passive voice delivers scientific neutrality, focus on results, and diplomatic tact."
      ],
      "reflectionPrompt": "How can the uncritical overuse of agentless passive constructions in political speech obscure accountability for controversial decisions?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Active to Passive Syntactic Pipeline",
      "caption": "Step-by-step grammatical shift: Subject, Transitive Verb, Object transforming to Subject, [Be + V3], [By + Agent].",
      "diagramTitle": "The S-V-O to S-[Be+V3]-[By Agent] Transformation Engine",
      "diagramDescription": "Direct Object ascends to Subject; original Subject demotes to prepositional phrase; main verb acquires tense-matched \"be\" auxiliary.",
      "components": [
        {
          "id": "c1",
          "name": "Direct Object Elevation",
          "role": "New focal subject",
          "description": "Entity receiving the action promoted to grammatical subject."
        },
        {
          "id": "c2",
          "name": "Auxiliary \"Be\" + V3",
          "role": "Tense-preserving passive core",
          "description": "Be-verb conjugated in original tense paired with past participle."
        },
        {
          "id": "c3",
          "name": "Agent Demotion (\"by ...\")",
          "role": "Optional actor attribution",
          "description": "Original actor moved to prepositional phrase or omitted for focus."
        }
      ],
      "visualSummary": "Voice shifting alters perspective and discourse focus without changing underlying semantic truth."
    },
    "examples-applications": {
      "overview": "Technical writing, scientific journal peer-review editing, journalistic reporting, and legal contract drafting.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Transforming Complex Sentences into Passive Voice",
          "difficulty": "Foundational",
          "contextOrPrompt": "Transform the following active sentence into passive voice, selecting whether to retain the agent: \"The aerospace engineers had thoroughly inspected the turbine blades before launching the test flight.\"",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify grammatical constituents",
              "work": "Subject: \"The aerospace engineers\", Verb: \"had thoroughly inspected\" (Past Perfect), Object: \"the turbine blades\", Adverbial: \"before launching the test flight\"."
            },
            {
              "stepNumber": 2,
              "explanation": "Elevate direct object to subject",
              "work": "New subject: \"The turbine blades\"."
            },
            {
              "stepNumber": 3,
              "explanation": "Conjugate verb in passive past perfect",
              "work": "\"had thoroughly inspected\" -> \"had been thoroughly inspected\"."
            },
            {
              "stepNumber": 4,
              "explanation": "Append agent and modifying clause",
              "work": "\"by the aerospace engineers before the test flight was launched.\""
            }
          ],
          "finalResult": "\"The turbine blades had been thoroughly inspected by the aerospace engineers before the test flight was launched.\"",
          "verificationTip": "Keep adverbs like \"thoroughly\" between the auxiliary verbs: \"had been thoroughly inspected\"."
        }
      ],
      "applications": [
        {
          "domain": "Technical & Scientific Publishing",
          "title": "Laboratory Procedure Documentation",
          "context": "Standard Operating Procedures (SOP) written in passive voice to guarantee reproducible execution by any technician.",
          "realWorldScenario": "Converting laboratory notes into formal standardized test protocols.",
          "impactMetric": "One hundred percent procedural compliance in ISO-certified cleanroom trials."
        }
      ],
      "selfCheckExercise": {
        "question": "Can the sentence \"The train arrived at the station precisely on time\" be changed into passive voice? Explain why or why not.",
        "hint": "Check whether the verb \"arrived\" takes a direct object.",
        "solution": "No; \"arrived\" is an intransitive verb and cannot take a direct object, making passive transformation impossible."
      }
    },
    "explore-experiment": {
      "activityTitle": "Grammatical Voice & Discourse Focus Sandbox",
      "objective": "Transform active sentences into passive voice across various narrative contexts and evaluate stylistic impact.",
      "instructions": "Select sentence genre (Scientific Lab Report, News Headline, or Historical Narrative). Apply passive transformation. Toggle agent inclusion (\"by actor\") on and off to observe rhetorical focus.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Discourse Context",
          "description": "Controls discourse context in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "genre"
        },
        {
          "id": "var-2",
          "label": "Agent Retention",
          "description": "Controls agent retention in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "attribution"
        }
      ],
      "guidingQuestions": [
        "Why does \"The police arrested the suspect\" become \"The suspect was arrested\" in news headlines?",
        "How does agent deletion alter the assignment of blame in corporate communications?"
      ],
      "whatToObserve": [
        "Omitting the agent places 100% of reader attention on the affected outcome rather than the actor."
      ],
      "takeawayInsight": "Voice is a powerful rhetorical switch: active for dynamic action and personal responsibility; passive for objective outcomes and shared focus."
    }
  }
},

  // =========================================================================
  // ENGLISH: Reported Speech: Direct & Indirect Discourse
  // =========================================================================
  {
  "id": "eng-direct-indirect-speech",
  "slug": "direct-indirect-speech",
  "title": "Reported Speech: Direct & Indirect Discourse",
  "subtitle": "Tense backshifting, deictic temporal/spatial shifts, pronoun conversions, and reporting verbs",
  "subjectId": "english",
  "difficulty": "Intermediate",
  "estimatedMinutes": 20,
  "overview": "Explains the grammatical and pragmatic rules governing the conversion between Direct Speech (quoting exact words in quotation marks) and Indirect (Reported) Speech. Explores backshifting of tenses when the reporting verb is in the past, shifts in deictic adverbs of time and place (here -> there, now -> then, tomorrow -> the next day), pronoun perspectives, imperative commands, and reporting questions (wh- words and if/whether).",
  "whyItMatters": "Critical for journalistic reporting, legal witness statements, academic citations, meeting minutes documentation, and narrative storytelling.",
  "learningObjectives": [
    "Apply tense backshifting rules accurately when the reporting verb is in the past tense.",
    "Convert deictic temporal and spatial expressions (now, today, yesterday, tomorrow, here).",
    "Transform interrogative (questions), imperative (commands/requests), and exclamatory sentences into indirect statements.",
    "Identify situations where tense does not backshift (universal scientific truths and habitual facts)."
  ],
  "coreQuestions": [
    "Why does the verb tense not backshift when reporting a universal scientific truth or permanent physical law?",
    "How does the syntax of questions change when converted to reported speech (word order and auxiliary omission)?"
  ],
  "prerequisites": [
    "Basic sentence types (declarative, interrogative, imperative) and verb tenses"
  ],
  "keyTerms": [
    {
      "term": "Backshifting",
      "definition": "The grammatical shifting of verb tenses one step into the past when reporting speech after a past-tense reporting verb (e.g. simple present -> simple past)."
    },
    {
      "term": "Deictic Shift",
      "definition": "The necessary adjustment of context-dependent words of time, place, and person (e.g. \"here\" -> \"there\", \"tomorrow\" -> \"the following day\") to match the reporter's perspective."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Direct speech captures the exact spoken utterance in quotes; reported speech translates that utterance across time, space, and perspective into the reporter's framework.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Tense Backshift Mechanism & The Reporting Verb",
          "subtitle": "When the Reporting Verb is in the Past Tense",
          "paragraphs": [
            "When the reporting verb is in the past tense (e.g., said, stated, informed), the verbs in the reported clause generally shift one step backward in time (backshift). Simple present becomes simple past (\"I work\" -> \"he worked\"); present continuous becomes past continuous (\"is working\" -> \"was working\"); present perfect becomes past perfect (\"has worked\" -> \"had worked\"); and simple past becomes past perfect (\"worked\" -> \"had worked\").",
            "Modals also shift: can -> could, may -> might, will -> would, must -> had to. However, if the reporting verb is in the present or future tense (e.g., \"She says\"), no backshift occurs (\"She says she is tired\")."
          ],
          "bulletPoints": [
            "Universal Truth Exception: When reporting a permanent scientific fact, tenses do not backshift: He said, \"The Earth orbits the Sun\" -> He said that the Earth orbits the Sun.",
            "Pronoun Realignment: Pronouns shift to reflect the speaker-listener perspective: \"I will call you\" -> She said that she would call him."
          ],
          "callout": {
            "type": "axiom",
            "title": "The Universal Fact Invariant",
            "text": "Timeless physical, scientific, or mathematical axioms never backshift because their validity remains true across all past, present, and future timeframes."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Interrogative, Imperative & Exclamatory Conversions",
          "subtitle": "Wh-words, Inverted Question Syntax, and Infinitive Commands",
          "paragraphs": [
            "Reporting questions requires two key changes: removing the question mark and converting the inverted question syntax back into standard declarative Subject + Verb word order. For yes/no questions, use \"if\" or \"whether\" (\"Do you like coffee?\" -> He asked if she liked coffee). For wh- questions, retain the interrogative pronoun (\"Where do you live?\" -> He asked where she lived, NOT *where did she live).",
            "For imperative sentences (commands, advice, requests), replace quotation marks with the to-infinitive form: The doctor said to me, \"Take this medicine\" -> The doctor advised me to take that medicine. For negative commands, use \"not to\": \"Do not touch the wire\" -> He warned us not to touch the wire."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Reported speech harmonizes time, location, and point of view between original speaker and reporter.",
        "Reported questions convert to normal declarative S-V order, eliminating inverted auxiliary verbs."
      ],
      "reflectionPrompt": "How can subtle choices of reporting verbs (e.g., claimed, admitted, revealed, insinuated) alter reader perception of an original speaker's credibility?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Direct-to-Indirect Conversion Matrix",
      "caption": "Systematic transformation of Pronouns, Tenses, Modals, and Temporal/Spatial Deictics.",
      "diagramTitle": "The Reported Speech Translation Engine",
      "diagramDescription": "Original utterance filtered through Reporting Verb tense, Deictic coordinate adjustment, and Syntactic normalization.",
      "components": [
        {
          "id": "c1",
          "name": "Reporting Verb Evaluator",
          "role": "Gatekeeper for backshift",
          "description": "Checks whether reporting verb is past (triggering backshift) or present (no backshift)."
        },
        {
          "id": "c2",
          "name": "Deictic Coordinate Shifter",
          "role": "Spatiotemporal alignment",
          "description": "Converts \"now\" -> \"then\", \"this\" -> \"that\", \"today\" -> \"that day\", \"yesterday\" -> \"the previous day\"."
        },
        {
          "id": "c3",
          "name": "Syntactic Normalizer",
          "role": "Declarative structure enforcer",
          "description": "Eliminates question inversions and quotation marks, inserting conjunctions (that/if)."
        }
      ],
      "visualSummary": "Converting direct speech to reported speech restores declarative narrative coherence across time."
    },
    "examples-applications": {
      "overview": "Legal depositions, court reporting, parliamentary Hansard transcription, and diplomatic dispatches.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Converting an Interrogative Direct Speech Utterance",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Convert the following direct utterance into reported speech: The detective asked the witness, \"Did you see anyone near the warehouse yesterday evening?\"",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Identify sentence type and reporting verb",
              "work": "Sentence type: Yes/No interrogative in Simple Past tense. Reporting verb: \"asked\" (past tense)."
            },
            {
              "stepNumber": 2,
              "explanation": "Select linking conjunction and apply backshift",
              "work": "Connect using \"if\" or \"whether\". Simple past (\"did you see\") backshifts to Past Perfect (\"had seen\")."
            },
            {
              "stepNumber": 3,
              "explanation": "Normalize word order and shift deictics",
              "work": "Convert question inversion to declarative (Subject + Verb: \"he/she had seen\"). Shift \"yesterday evening\" to \"the previous evening\"."
            }
          ],
          "finalResult": "The detective asked the witness whether he (or she) had seen anyone near the warehouse the previous evening.",
          "verificationTip": "Never include the auxiliary \"did\" in the reported clause: avoid *\"asked if did he see\"."
        }
      ],
      "applications": [
        {
          "domain": "Journalism & Legal Documentation",
          "title": "Neutral Court Testimony Reporting",
          "context": "Transcribing legal witness cross-examinations into official court deposition summaries.",
          "realWorldScenario": "Ensuring absolute semantic fidelity while eliminating colloquial fragments into standard reported discourse.",
          "impactMetric": "Zero misattribution or perjury claims across documented testimony archives."
        }
      ],
      "selfCheckExercise": {
        "question": "Convert into indirect speech: The physics teacher said, \"Light travels at approximately 300,000 kilometres per second in a vacuum.\"",
        "hint": "Is this a universal scientific truth?",
        "solution": "The physics teacher said that light travels at approximately 300,000 kilometres per second in a vacuum (the verb does NOT backshift because it is a universal scientific truth)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Reported Speech & Deictic Shift Simulator",
      "objective": "Select reporting verb tenses and observe how temporal, modal, and pronoun tokens automatically adjust.",
      "instructions": "Enter a direct quotation containing modals, pronouns, and time words. Switch reporting verb between \"says\" and \"said\". Observe the automatic backshifting and deictic shifts in the generated reported clause.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Reporting Verb Tense",
          "description": "Controls reporting verb tense in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "tense"
        },
        {
          "id": "var-2",
          "label": "Utterance Type",
          "description": "Controls utterance type in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "syntax"
        }
      ],
      "guidingQuestions": [
        "Why does \"Where are you going?\" become \"She asked where I was going\" instead of \"where was I going\"?",
        "What happens to \"must\" in reported speech?"
      ],
      "whatToObserve": [
        "Switching the reporting verb from present to past triggers an immediate domino backshift across all finite verbs."
      ],
      "takeawayInsight": "Mastery of reported speech allows precise, objective communication of human testimony across temporal distance."
    }
  }
},

  // =========================================================================
  // COMPUTER-SCIENCE: Computational Thinking, Algorithms & Complexity
  // =========================================================================
  {
  "id": "cs-computational-thinking-algorithms",
  "slug": "computational-thinking-algorithms",
  "title": "Computational Thinking, Algorithms & Complexity",
  "subtitle": "Decomposition, pattern recognition, abstraction, algorithmic flowcharts, and Big-O efficiency",
  "subjectId": "computer-science",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Introduces the four pillars of computational thinking: Decomposition, Pattern Recognition, Abstraction, and Algorithm Design. Covers pseudocode conventions, standard flowchart iconography (ISO 5807), fundamental control structures (sequence, selection, iteration), searching and sorting heuristics, and an accessible introduction to asymptotic Big-O algorithmic time and space complexity.",
  "whyItMatters": "Computational thinking is a universal problem-solving paradigm essential not only for software engineering and AI, but for bioinformatics, robotics, economic modeling, and systems engineering.",
  "learningObjectives": [
    "Apply the four cornerstones of computational thinking to solve complex unstructured problems.",
    "Design clear, ambiguity-free algorithms using standard flowchart symbols and structured pseudocode.",
    "Trace loop execution states using step-by-step trace tables with variable state tracking.",
    "Compare linear O(n) and binary O(log n) algorithmic growth rates using Big-O notation."
  ],
  "coreQuestions": [
    "How does abstraction allow computer scientists to manage overwhelming complexity in computing systems?",
    "Why is an algorithm with O(n²) time complexity considered unviable for large-scale dataset processing?"
  ],
  "prerequisites": [
    "Basic mathematical logic, variables, and inequalities"
  ],
  "keyTerms": [
    {
      "term": "Abstraction",
      "definition": "The process of filtering out unessential operational details to focus exclusively on core computational properties and functional interfaces."
    },
    {
      "term": "Big-O Notation",
      "definition": "Mathematical notation describing the upper bound of the execution time or space requirements of an algorithm as the input size n grows asymptotically."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Computational thinking is not about thinking like a computer; it is about equipping humans with the conceptual tools to formulate problems so that machines or other humans can solve them.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. The Four Pillars of Computational Problem-Solving",
          "subtitle": "Decomposition, Pattern Recognition, Abstraction, and Algorithm Design",
          "paragraphs": [
            "Faced with a massive challenge, computational thinking applies four systematic phases. First, Decomposition breaks an overwhelming monolithic problem down into smaller, self-contained sub-problems. Second, Pattern Recognition identifies recurring similarities or trends across sub-problems that allow previously proven solutions to be reused.",
            "Third, Abstraction strips away distracting implementation noise, distilling the essential conceptual model (e.g. representing a city subway as a simplified topological graph rather than a geographic terrain map). Finally, Algorithm Design constructs an unambiguous, step-by-step recipe of finite instructions that reliably solves the problem for any valid input."
          ],
          "bulletPoints": [
            "Sequence: Executing instructions in strict top-to-bottom chronological succession.",
            "Selection: Branching execution paths conditionally using if-then-else logic.",
            "Iteration: Repeating a block of instructions using deterministic (for-loop) or conditional (while-loop) constructs."
          ],
          "callout": {
            "type": "axiom",
            "title": "Algorithmic Finiteness Invariant",
            "text": "An algorithm must be deterministic (every step precisely defined), terminate after a finite number of operations, and produce a valid output for all valid inputs within its specification."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Algorithmic Representation & Asymptotic Complexity",
          "subtitle": "Flowcharts, Trace Tables, and Big-O Efficiency",
          "paragraphs": [
            "Algorithms are visually represented through standardized flowcharts (terminal ovals, process rectangles, input/output parallelograms, decision diamonds). Trace tables mathematically verify correctness by stepping through loops row by row, logging every variable's memory state at each clock cycle.",
            "To evaluate algorithm performance regardless of specific hardware speeds, computer scientists use Big-O asymptotic notation. For an input of size n: Constant time O(1) executes immediately; Logarithmic time O(log n) halves the search space each step (Binary Search); Linear time O(n) scales proportionally; and Quadratic time O(n²) squares operations (nested loops in Bubble Sort), becoming impractical for big data."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Decomposition and abstraction transform intractable challenges into modular, programmable components.",
        "Big-O notation measures how an algorithm's runtime scales asymptotically as data size grows."
      ],
      "reflectionPrompt": "Why is an algorithm with optimal Big-O complexity preferred over one that simply runs fast on a specific CPU?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Computational Thinking Architecture",
      "caption": "From Complex Problem -> Decomposition -> Pattern Recognition -> Abstraction -> Finite Algorithm -> Code.",
      "diagramTitle": "The Four-Stage Problem Resolution Pipeline",
      "diagramDescription": "Real-world complexity broken into sub-modules, abstract patterns identified, and verified via flowcharts and trace tables.",
      "components": [
        {
          "id": "c1",
          "name": "Decomposition Engine",
          "role": "Granularity divider",
          "description": "Splits monoliths into independent functional units."
        },
        {
          "id": "c2",
          "name": "Abstraction Filter",
          "role": "Complexity reducer",
          "description": "Eliminates extraneous details, retaining core mathematical invariants."
        },
        {
          "id": "c3",
          "name": "Algorithm Blueprint",
          "role": "Deterministic recipe",
          "description": "Sequence, selection, and iteration steps evaluated under Big-O bounds."
        }
      ],
      "visualSummary": "Computational thinking bridges human conceptual problem formulation with automated machine execution."
    },
    "examples-applications": {
      "overview": "Software architecture, database indexing, logistics route optimization, and autonomous systems control.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Constructing a Trace Table for a Maximum Value Search",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Given array A = [14, 28, 9, 42, 19], trace an algorithm that initializes maxVal = A[0] and iterates through the array from index i = 1 to 4, updating maxVal when A[i] > maxVal.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Initialize memory state",
              "work": "maxVal = 14, i = 1, array length n = 5."
            },
            {
              "stepNumber": 2,
              "explanation": "Step i = 1 and i = 2",
              "work": "i = 1: A[1] = 28 > 14 -> Condition True -> maxVal updated to 28. i = 2: A[2] = 9 < 28 -> Condition False -> maxVal remains 28."
            },
            {
              "stepNumber": 3,
              "explanation": "Step i = 3 and i = 4",
              "work": "i = 3: A[3] = 42 > 28 -> Condition True -> maxVal updated to 42. i = 4: A[4] = 19 < 42 -> Condition False -> maxVal remains 42."
            },
            {
              "stepNumber": 4,
              "explanation": "Terminate loop",
              "work": "i reaches 5 (end of array). Output maxVal = 42. Total comparisons = 4 (n - 1)."
            }
          ],
          "finalResult": "maxVal = 42; trace verifies linear O(n) single-pass complexity with exactly 4 comparisons.",
          "verificationTip": "Trace tables are essential for debugging off-by-one index boundary errors and runaway infinite loops."
        }
      ],
      "applications": [
        {
          "domain": "Logistics & Supply Chain Management",
          "title": "Autonomous Warehouse Routing Optimization",
          "context": "Designing collision-free pathfinding algorithms for automated guided robotic vehicles (AGVs).",
          "realWorldScenario": "Decomposing grid fulfillment warehouse movement into graph shortest-path algorithms.",
          "impactMetric": "Thirty-five percent reduction in parcel transit time with zero robotic collisions."
        }
      ],
      "selfCheckExercise": {
        "question": "What is the worst-case time complexity of searching for an element in an unsorted list of n items?",
        "hint": "You may have to inspect every item from the first to the very last.",
        "solution": "Linear time: O(n), because in the worst case the target element is at the end of the list or not present at all."
      }
    },
    "explore-experiment": {
      "activityTitle": "Algorithmic Complexity & Growth Rate Sandbox",
      "objective": "Compare operation counts between O(1), O(log n), O(n), and O(n²) as input data size scales.",
      "instructions": "Select input size n from 10 to 1,000,000. Run search algorithms (Linear Search vs Binary Search). Observe the exponential divergence in required clock cycles and wall-clock execution time.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Input Array Size (n)",
          "description": "Controls input array size (n) in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 10,
          "unit": "elements"
        },
        {
          "id": "var-2",
          "label": "Algorithm Selected",
          "description": "Controls algorithm selected in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "algorithm"
        }
      ],
      "guidingQuestions": [
        "For n = 1,000,000, how many comparisons does Binary Search require compared to Linear Search?",
        "Why does nested looping immediately create O(n²) quadratic scaling?"
      ],
      "whatToObserve": [
        "At n = 1,000,000, Linear Search requires up to 1,000,000 steps, while Binary Search completes in at most 20 steps (log₂ 1,000,000 ≈ 20)."
      ],
      "takeawayInsight": "Algorithmic design efficiency dwarfs raw hardware processing speed when scaling to real-world datasets."
    }
  }
},

  // =========================================================================
  // COMPUTER-SCIENCE: Object-Oriented Programming: Classes & Objects
  // =========================================================================
  {
  "id": "cs-oop-classes-objects",
  "slug": "oop-classes-objects",
  "title": "Object-Oriented Programming: Classes & Objects",
  "subtitle": "The four OOP pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism in modern software",
  "subjectId": "computer-science",
  "difficulty": "Intermediate",
  "estimatedMinutes": 25,
  "overview": "Explains the Object-Oriented Programming (OOP) paradigm as a model for constructing robust, maintainable, modular software systems. Details classes as blueprints and objects as stateful runtime instances. Analyzes the four foundational pillars: Encapsulation (data hiding, getters/setters), Abstraction (interfaces, abstract classes), Inheritance (code reuse, subclassing, super keyword), and Polymorphism (method overloading and overriding).",
  "whyItMatters": "OOP is the dominant architectural paradigm behind major enterprise programming languages (Java, C++, C#, Python, TypeScript) and modern software application design.",
  "learningObjectives": [
    "Differentiate between a class (conceptual template/blueprint) and an object (instantiated runtime entity with state and behavior).",
    "Implement Encapsulation to protect object internal state using private access modifiers and validated getters/setters.",
    "Construct hierarchical inheritance relationships using parent/base classes and derived/subclasses.",
    "Demonstrate compile-time polymorphism (overloading) and runtime dynamic polymorphism (method overriding)."
  ],
  "coreQuestions": [
    "Why is direct public modification of an object's fields considered a dangerous anti-pattern in software architecture?",
    "How does runtime dynamic polymorphism enable software systems to follow the Open-Closed Principle (open for extension, closed for modification)?"
  ],
  "prerequisites": [
    "Basic programming syntax, variables, conditionals, and functions/methods"
  ],
  "keyTerms": [
    {
      "term": "Encapsulation",
      "definition": "The bundling of data (fields) and methods that manipulate that data into a single unit (class), while restricting direct external access to internal component representation."
    },
    {
      "term": "Polymorphism",
      "definition": "The capability of different classes to respond to the same interface or method call in their own specialized manner, resolved either at compile time (overloading) or runtime (overriding)."
    }
  ],
  "availablePaths": [
    "structured-explanation",
    "visual-learning",
    "examples-applications",
    "explore-experiment"
  ],
  "paths": {
    "structured-explanation": {
      "introduction": "Object-Oriented Programming mirrors the physical world: instead of disconnected procedures manipulating global variables, software is organized into self-contained entities that possess internal state and collaborate through messages.",
      "sections": [
        {
          "id": "sec-foundations",
          "title": "1. Blueprint to Reality: Classes, Objects & Encapsulation",
          "subtitle": "Fields, Methods, Constructors, and Information Hiding",
          "paragraphs": [
            "A class is a user-defined template or blueprint defining the attributes (fields/data) and behaviors (methods) common to all entities of its type. An object is a concrete, stateful instance allocated in memory at runtime via a constructor: `BankAccount acc1 = new BankAccount(\"Alice\", 1000);`. Each instance maintains its own distinct member variables.",
            "Encapsulation bundles fields and methods together while restricting arbitrary outside tampering. By marking variables as `private` and exposing controlled `public` accessor (getter) and mutator (setter) methods, a class enforces business logic invariants—such as preventing account balances from becoming negative or invalid."
          ],
          "bulletPoints": [
            "Access Modifiers: `private` (accessible only within class), `protected` (class and subclasses), `public` (accessible anywhere).",
            "Constructors: Special initialization methods invoked automatically when memory is allocated for a new object instance."
          ],
          "callout": {
            "type": "axiom",
            "title": "Information Hiding Invariant",
            "text": "An object should never expose its raw internal data representations directly; external code must interact exclusively through verified public method contracts."
          }
        },
        {
          "id": "sec-mechanics",
          "title": "2. Code Reuse & Dynamic Extensibility",
          "subtitle": "Inheritance Hierarchies and Polymorphic Dispatch",
          "paragraphs": [
            "Inheritance allows a child class (subclass) to inherit fields and methods from a parent class (superclass), establishing an \"is-a\" relationship (e.g., `SavingsAccount` is a `BankAccount`). The subclass can add specialized capabilities or override existing behaviors using the `super` keyword.",
            "Polymorphism (\"many forms\") elevates flexibility to an architectural level. Compile-time polymorphism (method overloading) uses identical method names with differing parameter signatures. Runtime polymorphism (method overriding) enables a parent reference to hold child objects; when a method is called (`shape.draw()`), the runtime dynamically dispatches the specific child implementation (`Circle.draw()` or `Square.draw()`) without the caller needing to know the concrete subtype."
          ],
          "callout": {
            "type": "insight",
            "title": "Pedagogical Insight",
            "text": "Connecting theoretical models to empirical reality."
          }
        }
      ],
      "summaryTakeaways": [
        "Classes provide structural blueprints; objects embody active state and behavior at runtime.",
        "Encapsulation protects data integrity, while polymorphism enables seamless runtime extensibility."
      ],
      "reflectionPrompt": "Why do modern software architects often recommend \"favoring composition over inheritance\" to prevent rigid, deeply nested class hierarchies?"
    },
    "visual-learning": {
      "visualType": "diagram",
      "headline": "The Four Pillars of Object-Oriented Design",
      "caption": "Architectural schematic: Encapsulation, Abstraction, Inheritance, and Dynamic Polymorphism.",
      "diagramTitle": "The OOP Foundation Matrix",
      "diagramDescription": "Encapsulation safeguards internal state; Abstraction simplifies interfaces; Inheritance shares capabilities; Polymorphism decouples consumers.",
      "components": [
        {
          "id": "c1",
          "name": "Encapsulation Barrier",
          "role": "State guardian",
          "description": "Private fields guarded by validation logic inside getters and setters."
        },
        {
          "id": "c2",
          "name": "Inheritance Tree",
          "role": "Reusable hierarchy",
          "description": "Base superclass propagating core behavior to specialized subclasses."
        },
        {
          "id": "c3",
          "name": "Polymorphic Dispatcher",
          "role": "Dynamic caller",
          "description": "Invoking shared interface methods dynamically bound to runtime instance types."
        }
      ],
      "visualSummary": "OOP encapsulates state and decouples consumers from internal implementation details."
    },
    "examples-applications": {
      "overview": "Enterprise software architecture, game engine entity-component systems, GUI windowing frameworks, and REST API controllers.",
      "workedExamples": [
        {
          "id": "ex-1",
          "title": "Designing a Polymorphic Payment Processing Hierarchy",
          "difficulty": "Intermediate",
          "contextOrPrompt": "Design an object-oriented class structure for an e-commerce checkout system that processes multiple payment modes (CreditCard, UPI, PayPal) through a unified interface.",
          "steps": [
            {
              "stepNumber": 1,
              "explanation": "Define the abstract parent contract",
              "work": "Create an abstract class or interface `PaymentMethod` declaring abstract method `boolean processPayment(double amount);`."
            },
            {
              "stepNumber": 2,
              "explanation": "Encapsulate specialized child implementations",
              "work": "Create subclasses `CreditCardPayment` (private cardNumber, cvv) and `UPIPayment` (private upiId) implementing `processPayment` with specific gateway APIs."
            },
            {
              "stepNumber": 3,
              "explanation": "Demonstrate polymorphic invocation",
              "work": "The checkout shopping cart holds a reference `PaymentMethod currentPayment;` and executes `currentPayment.processPayment(cartTotal);` regardless of chosen payment type."
            }
          ],
          "finalResult": "The checkout system supports arbitrary new payment types without modifying existing checkout code, upholding the Open-Closed Principle.",
          "verificationTip": "Using an interface rather than a concrete class prevents tight coupling and allows easy mock unit testing."
        }
      ],
      "applications": [
        {
          "domain": "Enterprise Software & Financial Tech",
          "title": "Banking Core Account Transaction Engine",
          "context": "Managing multi-tier checking, savings, and loan accounts with polymorphic fee and interest calculation schedules.",
          "realWorldScenario": "Safely processing millions of nightly batch transactions without risking data corruption or unauthorized balance mutations.",
          "impactMetric": "100% data consistency with zero race-condition balance overdraws across distributed account ledgers."
        }
      ],
      "selfCheckExercise": {
        "question": "What is the key difference between method overloading and method overriding in OOP?",
        "hint": "Consider whether they occur within the same class or across a parent-child hierarchy.",
        "solution": "Method overloading occurs in the same class with identical method names but different parameter lists (compile-time); method overriding occurs in a subclass providing a specific implementation of a method defined in its superclass (runtime)."
      }
    },
    "explore-experiment": {
      "activityTitle": "Object-Oriented Class Hierarchy & Polymorphism Sandbox",
      "objective": "Instantiate diverse subclasses through a shared base class interface and observe dynamic polymorphic dispatch at runtime.",
      "instructions": "Select base class (Vehicle, Shape, or Employee). Add subclasses with overridden methods. Invoke methods through an array of base class references and observe how the correct specialized method executes.",
      "experimentType": "generic",
      "variables": [
        {
          "id": "var-1",
          "label": "Encapsulation Access Level",
          "description": "Controls encapsulation access level in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "modifier"
        },
        {
          "id": "var-2",
          "label": "Dispatch Mechanism",
          "description": "Controls dispatch mechanism in the simulation.",
          "min": 0,
          "max": 100,
          "step": 1,
          "defaultValue": 50,
          "unit": "binding"
        }
      ],
      "guidingQuestions": [
        "Why does marking a field private prevent unauthorized external mutation?",
        "How does runtime polymorphism allow adding new subclasses without touching existing client code?"
      ],
      "whatToObserve": [
        "When calling a method on a base reference, the runtime JVM automatically executes the child's overridden method via virtual method table lookup."
      ],
      "takeawayInsight": "Object-Oriented Programming structures code into modular, maintainable building blocks that scale gracefully as system complexity grows."
    }
  }
}
];
