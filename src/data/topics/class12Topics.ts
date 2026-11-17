import type { Topic } from '../../types/topic';

export const CLASS_12_TOPICS: Topic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICS (Class 12)
  // ---------------------------------------------------------------------------
  {
    id: 'math-12-integrals-calculus',
    slug: 'math-12-integrals-calculus',
    title: 'Definite Integrals & Fundamental Theorem of Calculus',
    subtitle: 'Riemann sums, area accumulation under curved boundaries, and the differentiation-integration inversion',
    subjectId: 'mathematics',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    overview: 'Integration is the twin pillar of calculus. While differentiation slices reality into infinitesimal rates of change, integration reassembles those infinitesimal slivers back into macroscopic totals. The Fundamental Theorem of Calculus unites both, proving that integration is the exact mathematical inverse of differentiation.',
    whyItMatters: 'From calculating cardiac output in cardiology and computing work done in thermodynamics to modeling quantum wave function probability densities, definite integration is the universal tool for continuous accumulation.',
    learningObjectives: [
      'Interpret a definite integral as the limit of a Riemann sum of infinitesimal rectangular strips: Integral_a^b f(x) dx.',
      'State and prove both parts of the Fundamental Theorem of Calculus (FTC).',
      'Master key integration techniques: substitution (u-sub), integration by parts (LIATE rule), and partial fractions.',
      'Apply standard definite integral symmetry properties to evaluate definite integrals effortlessly.'
    ],
    coreQuestions: [
      'Why does finding the area under a curve have anything to do with finding an anti-derivative?',
      'How does a sum of infinitely many zero-width rectangles equal a finite positive non-zero area?',
      'Why is the arbitrary integration constant (+C) strictly necessary for indefinite integrals, but vanishes for definite integrals?'
    ],
    prerequisites: ['Differential calculus (derivatives of basic functions)', 'Limits and continuous functions'],
    keyTerms: [
      { term: 'Definite Integral', definition: 'The net signed area under the graph of a function between two bounds a and b: Integral_a^b f(x) dx.' },
      { term: 'Fundamental Theorem of Calculus', definition: 'The theorem asserting that if F\'(x) = f(x), then Integral_a^b f(x) dx = F(b) - F(a).' },
      { term: 'Riemann Sum', definition: 'An approximation of a region area under a curve formed by dividing it into shapes (such as rectangles) whose areas are summed.' },
      { term: 'Integration by Parts', definition: 'A technique derived from the product rule: Integral u dv = u v - Integral v du.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'For centuries, finding the area of irregular curved shapes was a grueling geometric ordeal known as the method of exhaustion. In the late 17th century, Newton and Leibniz made one of the greatest intellectual breakthroughs in human history: they realized that finding the accumulated area under a curve is the EXACT INVERSE of finding the slope of a curve.',
        sections: [
          {
            id: 'riemann-accumulation',
            title: '1. The Riemann Accumulation Principle',
            subtitle: 'Slicing curves into infinitely many thin vertical ribbons',
            paragraphs: [
              'To find the area bounded by y = f(x) from x = a to x = b, partition the interval into n equal subintervals of width Delta x = (b - a) / n.',
              'The area of the k-th rectangular ribbon is height f(x_k) multiplied by width Delta x: Area_k = f(x_k) Delta x.',
              'Summing all n ribbons yields the Riemann sum: S_n = Sum_{k=1}^n f(x_k) Delta x. As n approaches infinity, the width Delta x shrinks to the infinitesimal differential dx, and the jagged staircase converges to the smooth exact area: Integral_a^b f(x) dx.'
            ],
            callout: {
              type: 'axiom',
              title: 'First Fundamental Theorem of Calculus',
              text: 'If f is continuous on [a, b] and F(x) = Integral_a^x f(t) dt, then F is differentiable and F\'(x) = f(x) for all x in (a, b).'
            }
          },
          {
            id: 'ftc-part-two',
            title: '2. The Evaluation Theorem: Integral_a^b f(x) dx = F(b) - F(a)',
            subtitle: 'Evaluating infinite sums with a simple subtraction',
            paragraphs: [
              'The Second Fundamental Theorem of Calculus is what makes calculus practical: you do not need to compute infinite Riemann limits by hand.',
              'If you can identify any anti-derivative F(x) such that F\'(x) = f(x), the exact area is simply: F(b) - F(a).',
              'For example, the area under f(x) = x² from 0 to 3: The anti-derivative is F(x) = x³ / 3. The area is F(3) - F(0) = (27/3) - 0 = 9! An infinite sum of microscopic slivers evaluated in three seconds.'
            ]
          }
        ],
        summaryTakeaways: [
          'Definite integral is the limit of a Riemann sum as rectangle width dx -> 0.',
          'FTC establishes differentiation and integration as exact inverse operations.',
          'Evaluate definite integrals by finding the anti-derivative: Integral_a^b f(x) dx = F(b) - F(a).',
          'Integration by parts (LIATE) reverses the product rule for products of functions.'
        ],
        reflectionPrompt: 'Why does an integral produce a negative area when the curve f(x) dips below the horizontal x-axis?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Riemann Sum Convergence to Continuous Area',
        caption: 'Watch the staircase of discrete rectangles melt into the smooth continuous curve as n climbs from 4 to 100.',
        diagramTitle: 'Riemann Integration Slicing Engine',
        diagramDescription: 'A parabola y = x² sliced from x = 0 to x = 3. At n = 4 strips, noticeable error gaps exist. At n = 50 strips, the error is sub-pixel. At the limit n -> infinity, error is precisely zero.',
        components: [
          { id: 'curve-boundary', name: 'Continuous Curve f(x)', role: 'Upper Ceiling', description: 'The mathematical function defining the height of each infinitesimal sliver.', badge: 'Ceiling' },
          { id: 'riemann-strip', name: 'Infinitesimal Strip [f(x) dx]', role: 'Area Element', description: 'Height f(x) multiplied by infinitesimal width dx.', badge: 'Differential dA' },
          { id: 'accumulated-area', name: 'Accumulation Solid [F(b) - F(a)]', role: 'Integral Result', description: 'The complete enclosed 2D manifold area equal to 9 square units.', badge: 'Area = 9' }
        ],
        interactiveLayers: [
          { layerId: 'n-slider', label: 'Partition Slider (n -> infinity)', description: 'Simulates increasing strip count from 4 to 1,000.', highlightedComponentIds: ['curve-boundary', 'riemann-strip', 'accumulated-area'] }
        ],
        processFlow: [
          { step: 1, label: 'Slice Region', detail: 'Divide interval [a, b] into n subintervals.', annotation: 'Delta x = (b-a)/n' },
          { step: 2, label: 'Sum Rectangles', detail: 'Sum f(x_k) Delta x from k=1 to n.', annotation: 'Riemann Sum' },
          { step: 3, label: 'Take Limit', detail: 'Let n -> infinity so Delta x -> dx.', annotation: 'Exact Integral' }
        ],
        spatialAnalogy: {
          metaphor: 'Weighing an Uneven Loaf of Bread',
          explanation: 'To find the weight of an irregularly tapered loaf of bread, you slice it into 100 paper-thin slices. Each slice is nearly a uniform rectangle. Summing the weight of all thin slices gives the exact total weight of the loaf.'
        },
        visualSummary: 'Integration is reassembly: sum infinitely many zero-thickness slices to reconstruct the continuous macroscopic whole.'
      },
      'examples-applications': {
        overview: 'Integration allows civil engineers to calculate hydrostatic dam wall pressures and aerospace engineers to compute total thrust delivered by rocket engines.',
        workedExamples: [
          {
            id: 'ex-ftc-evaluation',
            title: 'Evaluating Integral of sin(x) from 0 to Pi',
            difficulty: 'Advanced',
            contextOrPrompt: 'Evaluate the definite integral Integral_0^pi sin(x) dx and interpret its geometric meaning.',
            steps: [
              { stepNumber: 1, explanation: 'Find the anti-derivative of sin(x).', work: "Since d/dx(-cos x) = sin x, F(x) = -cos(x).", annotation: 'Anti-derivative.' },
              { stepNumber: 2, explanation: 'Apply the Fundamental Theorem of Calculus.', work: "Integral_0^pi sin(x) dx = [-cos(x)]_0^pi = -cos(pi) - (-cos(0))", annotation: 'Bounds substitution.' },
              { stepNumber: 3, explanation: 'Evaluate trigonometric values.', work: "-(-1) - (-1) = 1 + 1 = 2.", annotation: 'Arithmetic result.' }
            ],
            finalResult: '2 (The total area under one positive arch of the sine wave is exactly 2 square units)',
            verificationTip: 'A single arch of sin(x) fits inside a bounding box of width pi (~3.14) and height 1 (area ~3.14). An area of 2 is completely reasonable.'
          }
        ],
        applications: [
          {
            domain: 'Biomedical Engineering',
            title: 'Cardiac Output Measurement via Dye Dilution',
            context: 'Cardiologists measure the pumping capacity of a patient heart in liters per minute.',
            realWorldScenario: 'A known mass of indicator dye is injected into the right atrium. A downstream arterial sensor records dye concentration c(t) over time. Total cardiac output Q = Mass / Integral_0^T c(t) dt.',
            impactMetric: 'Enables non-invasive diagnosis of heart failure and valve regurgitation in critical care units.'
          }
        ],
        selfCheckExercise: {
          question: 'What is the value of Integral_(-a)^a x³ dx for any positive constant a?',
          hint: 'Examine the symmetry of the integrand: is f(x) = x³ an odd function or an even function?',
          solution: '0 (Because x³ is an odd function, f(-x) = -f(x). The area to the left of the origin is strictly negative and cancels the positive area on the right).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Riemann Accumulator & Anti-Derivative Sandbox',
        objective: 'Observe upper and lower Darboux sums squeeze into the exact analytical area as rectangle strip count increases.',
        instructions: 'Vary strip count from 2 to 500 to observe convergence to the definite integral.',
        experimentType: 'generic',
        variables: [
          { id: 'numStrips', label: 'Partition Strips (n)', description: 'Number of Riemann subdivisions', min: 2, max: 500, step: 2, defaultValue: 10 }
        ],
        guidingQuestions: ['Why does the derivative of an accumulation function Integral_a^x f(t) dt give back the original boundary f(x)?'],
        whatToObserve: ['Notice that adding an extra sliver of width dx adds area dA = f(x) dx, so the rate of area growth dA/dx is simply the height f(x)!'],
        takeawayInsight: 'Rate of area growth equals boundary height: the essence of the Fundamental Theorem of Calculus.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // PHYSICS (Class 12)
  // ---------------------------------------------------------------------------
  {
    id: 'phys-12-electrostatics-coulomb-gauss',
    slug: 'phys-12-electrostatics-coulomb-gauss',
    title: "Electrostatics: Coulomb's Law & Gauss's Law",
    subtitle: 'Inverse-square force fields, electric flux geometry, and closed Gaussian surface symmetry',
    subjectId: 'physics',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    overview: "Electrostatics investigates stationary electric charges and their surrounding force fields. Coulomb's Law describes the pairwise inverse-square force between point charges. Gauss's Law elevates this principle into field geometry, stating that the net electric flux through any closed Gaussian surface is directly proportional to the enclosed charge: Phi_E = q_enclosed / epsilon_0.",
    whyItMatters: 'Gauss Law governs electrical insulation in high-voltage power lines, Faraday cage electromagnetic shielding in aircraft, and electron beam steering in semiconductor manufacturing lithography.',
    learningObjectives: [
      "State and apply Coulomb's Law in vector form for multiple point charge configurations.",
      'Define electric field intensity E as force per unit positive test charge: E = F / q_0.',
      "Formulate Gauss's Law in integral form: Closed_Integral(E · dA) = q_enclosed / epsilon_0.",
      'Apply Gaussian symmetry (spherical, cylindrical, planar) to calculate electric fields of wires, sheets, and shells.'
    ],
    coreQuestions: [
      'Why does Coulomb force follow the exact same inverse-square law as Newton gravity, yet be 10^36 times stronger?',
      'Why does Gauss Law yield zero net flux for charges located outside the closed Gaussian surface?',
      'Why is the electric field inside a hollow metal conductor strictly zero, regardless of external lightning strikes?'
    ],
    prerequisites: ['Vector algebra (dot product and unit vectors)', 'Basic integral calculus'],
    keyTerms: [
      { term: "Coulomb's Law", definition: "The fundamental law stating that the electrostatic force between two point charges is proportional to their product and inversely proportional to the square of their separation: F = k |q1 q2| / r²." },
      { term: 'Electric Flux (Phi)', definition: 'The measure of the total number of electric field lines passing perpendicularly through a given surface area: Phi = Integral(E · dA).' },
      { term: "Gauss's Law", definition: 'The physical law stating that the total electric flux through any closed surface equals the enclosed charge divided by the permittivity of free space: Closed_Integral(E · dA) = q_enclosed / epsilon_0.' },
      { term: 'Permittivity (epsilon_0)', definition: 'The physical constant describing the ability of a vacuum to permit electric field lines: epsilon_0 = 8.854 x 10^-12 C²/(N·m²).' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Matter is made of charged particles: protons with positive charge and electrons with negative charge. When charges are static, they communicate their presence through invisible vector fields that stretch through space at the speed of light.',
        sections: [
          {
            id: 'coulomb-law',
            title: "1. Coulomb's Inverse-Square Law: F = k q1 q2 / r²",
            subtitle: 'The vector attraction and repulsion of stationary charges',
            paragraphs: [
              'Between any two point charges q1 and q2 separated by distance r in vacuum, the electrostatic force magnitude is given by:\nF = (1 / 4 pi epsilon_0) * (|q1 q2| / r²).',
              'Like charges (+ and +, or - and -) repel along the line connecting their centers; unlike charges (+ and -) attract.',
              'The electrostatic constant k = 1 / (4 pi epsilon_0) is roughly 9 x 10^9 N·m²/C². This immense constant explains why electrostatic forces dominate chemistry and atomic structure.'
            ],
            callout: {
              type: 'axiom',
              title: "Coulomb Vector Principle",
              text: 'The force exerted by q1 on q2 is directed along the unit vector r_hat pointing from q1 to q2, obeying Newton third law of action-reaction: F_12 = -F_21.'
            }
          },
          {
            id: 'gauss-law-flux',
            title: "2. Gauss's Law & Electric Flux Geometry",
            subtitle: 'Counting field line piercing through closed envelopes',
            paragraphs: [
              'Electric flux Phi measures the flow of field lines through a surface: dPhi = E · dA = |E| |dA| cos(theta).',
              'Gauss discovered that if you draw ANY imaginary closed surface (a Gaussian bubble) around charges, every positive charge acts as a fountain emitting field lines, and every negative charge acts as a sink draining them.',
              'The net flux piercing through the boundary depends ONLY on the net charge trapped inside, completely independent of the shape or size of the bubble: Closed_Integral(E · dA) = q_enclosed / epsilon_0!'
            ]
          }
        ],
        summaryTakeaways: [
          'Coulomb force is inverse-square, pairwise, and central: F = k q1 q2 / r².',
          'Electric field E is force per unit test charge (E = F / q).',
          'Electric flux is Phi = Closed_Integral(E · dA).',
          "Gauss's Law allows effortless field computation for symmetric charge distributions (wires, sheets, spheres).",
          'Inside an electrostatic conductor in equilibrium, E = 0 (Faraday cage shielding).'
        ],
        reflectionPrompt: 'If a closed Gaussian sphere surrounds an electric dipole (+q and -q), what is the net electric flux exiting the sphere, and does that mean the electric field on the surface is zero?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Spherical Gaussian Surface Enclosing a Central Point Charge',
        caption: 'Radially symmetric electric field lines piercing perpendicularly through an imaginary spherical bubble of radius r.',
        diagramTitle: "Gauss's Law Spherical Shell Symmetry",
        diagramDescription: 'Point charge +q sits at origin. The field lines radiate uniformly outward in all 4pi steradians. Because field E is perpendicular to the spherical surface at every point, E · dA = E dA.',
        components: [
          { id: 'central-charge', name: 'Central Point Charge (+q)', role: 'Flux Fountain', description: 'Emits electric field lines radiating symmetrically into 3D space.', badge: '+q Source' },
          { id: 'gaussian-sphere', name: 'Imaginary Gaussian Sphere', role: 'Integration Envelope', description: 'Closed spherical bubble of radius r concentric with the charge.', badge: 'Area = 4 pi r²' },
          { id: 'field-vector', name: 'Radial Electric Field Vector (E)', role: 'Field Force', description: 'Points directly outward along the surface normal vector dA.', badge: 'E || dA' }
        ],
        interactiveLayers: [
          { layerId: 'flux-lines', label: 'Field Line Trapping', description: 'Shows that expanding the sphere radius does not change the total number of lines trapped.', highlightedComponentIds: ['central-charge', 'gaussian-sphere', 'field-vector'] }
        ],
        processFlow: [
          { step: 1, label: 'Identify Symmetry', detail: 'Spherical symmetry ensures E is constant in magnitude on the surface.', annotation: 'E = const' },
          { step: 2, label: 'Integrate Flux', detail: 'Closed_Integral E dA = E Closed_Integral dA = E (4 pi r²).', annotation: 'Flux = E * Area' },
          { step: 3, label: 'Equate to Enclosed Charge', detail: 'E (4 pi r²) = q / epsilon_0  =>  E = q / (4 pi epsilon_0 r²).', annotation: "Deduce Coulomb's Law" }
        ],
        spatialAnalogy: {
          metaphor: 'A Glowing Lightbulb Inside a Spherical Lampshade',
          explanation: 'A 60W lightbulb emits a fixed number of light lumens per second. Whether you enclose it in a small 10 cm glass globe or a massive 10-meter balloon, the total amount of light exiting the surface is identical: 60 Watts! Total flux depends only on the bulb wattage, not the lampshade size.'
        },
        visualSummary: 'Gauss Law is conservation of field lines: whatever charge is born inside must puncture through the outer skin.'
      },
      'examples-applications': {
        overview: 'Electrostatic field theory protects passengers in commercial airplanes struck by lightning and governs cathode ray displays and electron microscopy.',
        workedExamples: [
          {
            id: 'ex-infinite-sheet',
            title: "Electric Field of an Infinite Uniformly Charged Plane Sheet",
            difficulty: 'Advanced',
            contextOrPrompt: "Use Gauss's Law to calculate the electric field due to an infinite flat plane with uniform surface charge density sigma (C/m²).",
            steps: [
              { stepNumber: 1, explanation: 'Choose a symmetric Gaussian pillbox cylinder.', work: 'Construct a cylinder of cross-sectional area A cutting perpendicularly through the sheet, with ends equidistant from the sheet.', annotation: 'Pillbox selection.' },
              { stepNumber: 2, explanation: 'Analyze flux through curved and flat surfaces.', work: 'Electric field lines point directly away from the sheet, parallel to the curved cylinder walls (flux = 0) and perpendicular to the two flat end caps.', annotation: 'Only end caps contribute.' },
              { stepNumber: 3, explanation: 'Calculate total flux through both end caps.', work: 'Phi_total = E * A + E * A = 2 E A.', annotation: 'Dual end caps.' },
              { stepNumber: 4, explanation: 'Equate flux to enclosed charge via Gauss Law.', work: 'q_enclosed = sigma * A  =>  2 E A = (sigma * A) / epsilon_0  =>  E = sigma / (2 epsilon_0).', annotation: 'Solve for E.' }
            ],
            finalResult: 'E = sigma / (2 epsilon_0) (The field is completely independent of distance from the infinite sheet!)',
            verificationTip: 'A uniform field between capacitor plates combines two such sheets: sigma / (2 epsilon_0) + sigma / (2 epsilon_0) = sigma / epsilon_0.'
          }
        ],
        applications: [
          {
            domain: 'Aviation Safety',
            title: 'Faraday Cage Lightning Protection in Commercial Jetliners',
            context: 'Commercial airliners are struck by atmospheric lightning roughly once per year during routine flight operations.',
            realWorldScenario: 'By encapsulating the aircraft in an aluminum conductive skin, external lightning currents distribute exclusively along the outer conductive surface. Gauss Law guarantees that the interior electric field remains strictly zero.',
            impactMetric: '100% protection for sensitive avionics, flight computers, and passenger cabins.'
          }
        ],
        selfCheckExercise: {
          question: 'What is the electric field inside a hollow spherical metal shell carrying a total charge of +10 Coulombs on its outer surface?',
          hint: 'Draw an imaginary Gaussian sphere inside the hollow interior cavity. What is the enclosed charge q_enclosed inside that sphere?',
          solution: 'Zero (0 N/C). Because all charges reside strictly on the outer metal surface, an interior Gaussian surface encloses zero charge: E = 0 / epsilon_0 = 0.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Gauss Law Flux & Charge Sandbox',
        objective: 'Observe electric flux through a closed surface and understand why external charges yield zero net flux.',
        instructions: 'Drag charges inside and outside the virtual Gaussian bubble to observe net flux.',
        experimentType: 'generic',
        variables: [
          { id: 'innerChargeMicroC', label: 'Enclosed Charge (uC)', description: 'Charge placed inside the Gaussian surface', min: -50, max: 50, step: 1, defaultValue: 5 }
        ],
        guidingQuestions: ['Why does an external charge outside the Gaussian surface produce zero net flux?'],
        whatToObserve: ['Notice that every field line originating from an outside charge enters the bubble on one side (negative flux) and exits on the other side (positive flux), canceling to zero net change!'],
        takeawayInsight: 'What enters must leave: outside charges contribute zero net flux across any closed surface.'
      }
    }
  }
];
