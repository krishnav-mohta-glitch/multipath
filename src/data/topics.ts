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
];
