import type { Topic } from '../../types/topic';

export const CLASS_11_TOPICS: Topic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICS (Class 11)
  // ---------------------------------------------------------------------------
  {
    id: 'math-11-limits-derivatives',
    slug: 'math-11-limits-derivatives',
    title: 'Limits & First Principles of Derivatives',
    subtitle: 'The calculus of infinitesimal intervals, tangent slopes, and instantaneous rates of change',
    subjectId: 'mathematics',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    overview: 'Limits resolve the ancient paradox of division by zero, unlocking the study of continuous change. The derivative is the limit of the average rate of change as the elapsed interval shrinks to zero, transforming an average secant speed into an exact instantaneous velocity.',
    whyItMatters: 'Calculus powers all physical modeling: orbit trajectories, aerodynamic lift, options pricing in financial quantitative analysis, and neural network gradient descent in machine learning.',
    learningObjectives: [
      'Grasp the intuitive concept of a limit approaching a value without needing to evaluate at the point itself.',
      'Evaluate indeterminate forms of type 0/0 using algebraic factorization and rationalization.',
      'Derive the first-principles definition of derivative: f\'(x) = lim_{h -> 0} [f(x+h) - f(x)] / h.',
      'Differentiate basic polynomials, trigonometric functions, and apply power, product, and quotient rules.'
    ],
    coreQuestions: [
      'Why is 0/0 called an "indeterminate form" rather than simply undefined or equal to 1?',
      'How does a secant line cutting across two points transition into a tangent line at a single point?',
      'What does a car speedometer physically measure if instantaneous time has zero duration?'
    ],
    prerequisites: ['Coordinate geometry (slope of a line)', 'Algebraic factoring and functions'],
    keyTerms: [
      { term: 'Limit', definition: 'The value that a function approaches as the input approaches some specified value.' },
      { term: 'Indeterminate Form', definition: 'An algebraic expression (such as 0/0 or infinity/infinity) whose value cannot be determined solely from the limits of the individual parts.' },
      { term: 'Derivative', definition: 'The instantaneous rate of change of a function with respect to its variable, geometrically representing the slope of the tangent line.' },
      { term: 'Secant Line', definition: 'A straight line connecting two distinct points on a curve, representing an average rate of change over an interval.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'In elementary arithmetic, dividing by zero is forbidden because it produces nonsense. But in physics, calculating instantaneous speed requires dividing a distance traveled by the time taken. If time taken is zero, distance traveled is zero: we face 0/0! Isaac Newton and Gottfried Wilhelm Leibniz solved this dilemma by inventing limits: we never set time to zero; we examine the trend as time gets arbitrarily close to zero.',
        sections: [
          {
            id: 'limit-concept',
            title: '1. The Limiting Process: Getting Infinitely Close',
            subtitle: 'Evaluating behavior near a point without evaluating at the point',
            paragraphs: [
              'Consider the function f(x) = (x^2 - 4) / (x - 2). If you plug in x = 2 directly, you get (4 - 4) / (2 - 2) = 0/0, which is meaningless.',
              'However, for any value of x NOT equal to 2, we can factor the numerator: f(x) = (x - 2)(x + 2) / (x - 2) = x + 2. As x approaches 1.9, 1.99, 1.999, f(x) approaches 3.9, 3.99, 3.999. As x approaches 2.01, 2.001, f(x) approaches 4.01, 4.001.',
              'The limit as x approaches 2 is unambiguously 4! The limit describes the destination, even if there is a pothole at the exact coordinate.'
            ],
            callout: {
              type: 'axiom',
              title: 'Existence of Limit Theorem',
              text: 'The limit lim_{x -> c} f(x) exists and equals L if and only if both the Left-Hand Limit (LHL) and Right-Hand Limit (RHL) exist and equal L.'
            }
          },
          {
            id: 'first-principles',
            title: '2. The Derivative from First Principles',
            subtitle: 'Shrinking the interval h to zero',
            paragraphs: [
              'To find the slope of a curve y = f(x) at point P(x, f(x)), pick an adjacent point Q(x+h, f(x+h)) separated by a horizontal distance h.',
              'The slope of the secant line PQ is: m_sec = [f(x+h) - f(x)] / h.',
              'As we slide Q closer to P by making h approach 0, the secant line rotates until it hugs the curve at exactly one point, becoming the tangent line. This gives the immortal definition of the derivative:',
              "f'(x) = lim_{h -> 0} [f(x+h) - f(x)] / h."
            ]
          }
        ],
        summaryTakeaways: [
          'Limits evaluate the continuous trend of a function as input approaches a target value.',
          'Indeterminate form 0/0 means algebraic cancellation is required before taking the limit.',
          'Derivative f\'(x) is the limit of the difference quotient as interval h -> 0.',
          'Geometrically, the derivative equals the exact slope of the tangent line to the curve at that coordinate.'
        ],
        reflectionPrompt: 'Why does a curve that has a sharp V-shaped corner (like f(x) = |x| at x = 0) fail to have a derivative at that point?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'From Secant Line to Tangent Line: The Geometric Convergence',
        caption: 'Watch secant lines rotate around point P as the second point Q slides closer, locking into the true tangent line as h approaches 0.',
        diagramTitle: 'Dynamic Secant-to-Tangent Convergence',
        diagramDescription: 'Point P(x, f(x)) remains fixed on the parabola y = x². As h shrinks from 2 to 1 to 0.1 to 0.001, the secant line pivots smoothly into the tangent line of slope 2x.',
        components: [
          { id: 'fixed-point-p', name: 'Anchor Point P(x, f(x))', role: 'Fixed Pivot', description: 'The exact coordinate where the instantaneous slope is being measured.', badge: 'Pivot' },
          { id: 'moving-point-q', name: 'Approaching Point Q(x+h, f(x+h))', role: 'Secant Anchor', description: 'Slides along the curved track toward P as interval h shrinks toward zero.', badge: 'Moving Point' },
          { id: 'tangent-line', name: 'Limiting Tangent Line', role: 'Instantaneous Slope', description: 'The unique line touching the curve at P with slope equal to f\'(x).', badge: 'Tangent (h=0)' }
        ],
        interactiveLayers: [
          { layerId: 'h-slider', label: 'Interval Slider (h -> 0)', description: 'Simulates sliding Q toward P.', highlightedComponentIds: ['fixed-point-p', 'moving-point-q', 'tangent-line'] }
        ],
        processFlow: [
          { step: 1, label: 'Form Difference Quotient', detail: 'Slope = [f(x+h) - f(x)] / h.', annotation: 'Average Rate' },
          { step: 2, label: 'Shrink Interval h', detail: 'Let h get infinitesimally close to 0.', annotation: 'Limit Process' },
          { step: 3, label: 'Obtain Derivative', detail: 'Resulting value is instantaneous slope f\'(x).', annotation: 'Instantaneous Rate' }
        ],
        spatialAnalogy: {
          metaphor: 'Zooming in on a Google Map Curved Coastline',
          explanation: 'From high altitude, a coastline looks wildly curved. But as you zoom in 100x, 1,000x, 100,000x, any smooth curve looks indistinguishable from a straight line. The derivative is the slope of that microscopic straight line.'
        },
        visualSummary: 'Calculus is the art of zooming in until curves become straight lines.'
      },
      'examples-applications': {
        overview: 'Derivatives allow engineers to compute acceleration from velocity, optimize rocket fuel staging, and train modern deep learning models.',
        workedExamples: [
          {
            id: 'ex-derivative-first-principles',
            title: 'Differentiating f(x) = x² from First Principles',
            difficulty: 'Advanced',
            contextOrPrompt: 'Use the first-principles limit definition to find the derivative of f(x) = x².',
            steps: [
              { stepNumber: 1, explanation: 'State the difference quotient definition.', work: "f'(x) = lim_{h -> 0} [f(x+h) - f(x)] / h", annotation: 'Definition.' },
              { stepNumber: 2, explanation: 'Substitute f(x) = x² and f(x+h) = (x+h)²', work: "f'(x) = lim_{h -> 0} [(x + h)² - x²] / h", annotation: 'Substitution.' },
              { stepNumber: 3, explanation: 'Expand the algebraic square.', work: "f'(x) = lim_{h -> 0} [x² + 2xh + h² - x²] / h = lim_{h -> 0} [2xh + h²] / h", annotation: 'Cancel x².' },
              { stepNumber: 4, explanation: 'Factor out h and cancel with denominator.', work: "f'(x) = lim_{h -> 0} [h(2x + h)] / h = lim_{h -> 0} (2x + h)", annotation: 'Cancel h.' },
              { stepNumber: 5, explanation: 'Evaluate the limit as h approaches 0.', work: "f'(x) = 2x + 0 = 2x", annotation: 'Final derivative.' }
            ],
            finalResult: "f'(x) = 2x (Slope at any coordinate x on y = x² is exactly 2x)",
            verificationTip: 'At x = 3, slope is 2(3) = 6. Power rule d/dx(x^n) = n x^(n-1) confirms: 2x^1 = 2x.'
          }
        ],
        applications: [
          {
            domain: 'Aerospace Engineering',
            title: 'SpaceX Falcon 9 Maximum Dynamic Pressure (Max-Q)',
            context: 'As a rocket accelerates through the atmosphere, aerodynamic drag increases with velocity squared but decreases with air density.',
            realWorldScenario: 'Dynamic pressure q(t) = 0.5 * rho(t) * v(t)². Engineers find the exact instant of maximum aerodynamic stress (Max-Q) by setting the derivative dq/dt = 0 and solving for time t.',
            impactMetric: 'Throttling rocket engines down at Max-Q prevents structural breakup during supersonic atmospheric ascent.'
          }
        ],
        selfCheckExercise: {
          question: 'What is the limit of (sin x) / x as x approaches 0 (where x is measured in radians)?',
          hint: 'Think of the geometric squeeze theorem: for small angles, the arc length x and the vertical sine height are almost identical.',
          solution: '1 (lim_{x -> 0} (sin x) / x = 1, one of the most celebrated fundamental limits in mathematics).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Instantaneous Tangent Slope Sandbox',
        objective: 'Watch the difference quotient converge as secant interval h approaches zero.',
        instructions: 'Slide interval h toward 0 to watch the secant line lock onto the tangent slope.',
        experimentType: 'generic',
        variables: [
          { id: 'intervalH', label: 'Secant Step (h)', description: 'Distance between secant points', min: 0.001, max: 1, step: 0.01, defaultValue: 0.1 }
        ],
        guidingQuestions: ['Why can we cancel h in the fraction [h(2x + h)] / h when evaluating limits?'],
        whatToObserve: ['Notice that during the limit process, h is approaching 0, meaning h is NEVER EQUAL to 0. Dividing by non-zero h is 100% mathematically legal!'],
        takeawayInsight: 'Limits operate in the open neighborhood of a point, never requiring evaluation at the singularity itself.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // PHYSICS (Class 11)
  // ---------------------------------------------------------------------------
  {
    id: 'phys-11-work-energy-theorem',
    slug: 'phys-11-work-energy-theorem',
    title: 'Work-Energy Theorem & Conservation of Energy',
    subtitle: 'Dot product work, conservative forces, potential wells, and mechanical energy conservation',
    subjectId: 'physics',
    difficulty: 'Advanced',
    estimatedMinutes: 25,
    overview: 'The Work-Energy Theorem is the mathematical bridge connecting forces acting through distances to changes in kinetic energy: W_net = Delta K. When all forces acting on a system are conservative, total mechanical energy (K + U) remains strictly constant throughout all time.',
    whyItMatters: 'Energy conservation simplifies complex mechanical calculations where integrating Newton acceleration vectors is practically impossible, such as roller coasters looping through curved tracks or planetary orbit flybys.',
    learningObjectives: [
      'Define work as the scalar dot product of force and displacement vectors: W = F · s = F s cos(theta).',
      'Prove the Work-Energy Theorem W_net = K_f - K_i using calculus for variable forces.',
      'Differentiate conservative forces (gravity, ideal spring) from non-conservative dissipative forces (friction, drag).',
      'Construct and analyze potential energy curves U(x) to identify stable, unstable, and neutral equilibrium states.'
    ],
    coreQuestions: [
      'Why does holding a heavy 50 kg barbell motionless overhead do zero physical work according to physics?',
      'Why does normal force or centripetal force never alter the kinetic energy or speed of a particle?',
      'What distinguishes a conservative force field from a dissipative force field?'
    ],
    prerequisites: ['Newton laws of motion', 'Vector dot product fundamentals'],
    keyTerms: [
      { term: 'Work', definition: 'The energy transferred to or from an object via the application of force along a displacement: W = Integral(F · dr).' },
      { term: 'Kinetic Energy', definition: 'The energy an object possesses by virtue of its motion: K = 0.5 * m * v².' },
      { term: 'Work-Energy Theorem', definition: 'The theorem stating that the net work done by all forces on a particle equals the change in its kinetic energy: W_net = Delta K.' },
      { term: 'Conservative Force', definition: 'A force for which the work done in moving a particle between two points is independent of the path taken.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'In everyday speech, "work" means effort: studying for an exam or holding up a heavy suitcase feels like hard work. In physics, however, work has an extraordinarily strict geometric definition: work is done ONLY when a force causes a displacement along the direction of that force.',
        sections: [
          {
            id: 'work-definition',
            title: '1. The Vector Dot Product Definition: W = F · s',
            subtitle: 'Why angle theta controls energy transfer',
            paragraphs: [
              'Work is the scalar product of force vector F and displacement vector s: W = F · s = |F| |s| cos(theta), where theta is the angle between the two vectors.',
              'If theta = 0° (pushing in the direction of motion), cos(0°) = 1: work is maximally positive, pumping kinetic energy into the object.',
              'If theta = 90° (perpendicular force, such as magnetic Lorentz force or planetary centripetal gravity in a circular orbit), cos(90°) = 0: work is EXACTLY ZERO. The force curves the trajectory without ever changing the object speed!',
              'If theta = 180° (opposing force like friction), cos(180°) = -1: work is negative, draining kinetic energy into heat.'
            ],
            callout: {
              type: 'axiom',
              title: 'Work-Energy Theorem',
              text: 'The total work done by ALL forces (conservative, non-conservative, internal, and external) acting on a body equals the change in its kinetic energy: W_net = K_final - K_initial.'
            }
          },
          {
            id: 'conservative-potentials',
            title: '2. Conservative Forces & Potential Energy Wells',
            subtitle: 'Why path independence allows storing energy in spatial geometry',
            paragraphs: [
              'A force is conservative if the work it does around any closed loop is zero: Cyclic_Integral(F · dr) = 0. Gravity and ideal springs are conservative; friction is non-conservative.',
              'For conservative forces, we can define a potential energy function U(x) such that F = -dU/dx. Force is the negative gradient of potential energy: objects are always pushed downhill toward regions of lower potential energy!'
            ]
          }
        ],
        summaryTakeaways: [
          'Work is W = F · s = F s cos(theta) in Joules (N·m).',
          'Perpendicular forces (theta = 90°) do ZERO work and cannot change speed.',
          'W_net = Delta K is universally true for any force, constant or variable.',
          'Mechanical energy E = K + U is conserved in the absence of non-conservative forces.'
        ],
        reflectionPrompt: 'When a car brakes to a halt on level asphalt, where did its initial kinetic energy go, and could you recover it to launch the car forward again?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Energy Exchange on a Frictionless Roller Coaster Loop',
        caption: 'Visualizing continuous dynamic trading between Gravitational Potential Energy U = mgh and Kinetic Energy K = 0.5 mv².',
        diagramTitle: 'Mechanical Energy Conservation Manifold',
        diagramDescription: 'A coaster car of mass m releases from rest at height h_max. As it descends into a circular loop, potential energy shrinks while kinetic energy surges, keeping total energy E = K + U constant.',
        components: [
          { id: 'peak-release', name: 'Hill Peak (h = h_max)', role: 'Max Potential', description: 'Velocity v = 0; Kinetic K = 0; Potential U = mgh_max; Total E = mgh_max.', badge: 'All Potential' },
          { id: 'loop-bottom', name: 'Loop Floor (h = 0)', role: 'Max Kinetic', description: 'Height h = 0; Potential U = 0; Kinetic K = 0.5 mv_max²; Velocity is maximal.', badge: 'All Kinetic' },
          { id: 'loop-top', name: 'Loop Apex (h = 2R)', role: 'Critical Boundary', description: 'Car must maintain minimum speed v_top >= sqrt(gR) so normal force does not drop below zero.', badge: 'Loop Apex' }
        ],
        interactiveLayers: [
          { layerId: 'energy-bar-chart', label: 'Dynamic Energy Bars', description: 'Real-time stacked bar chart showing K expanding as U contracts.', highlightedComponentIds: ['peak-release', 'loop-bottom', 'loop-top'] }
        ],
        processFlow: [
          { step: 1, label: 'Release at Apex', detail: 'Energy is 100% gravitational potential.', annotation: 'E = U_max' },
          { step: 2, label: 'Gravity Accelerates Car', detail: 'Gravity does positive work, converting U into K.', annotation: 'W_grav = +Delta K' },
          { step: 3, label: 'Climb into Loop', detail: 'Gravity does negative work, converting K back into U.', annotation: 'U climbs, K falls' }
        ],
        spatialAnalogy: {
          metaphor: 'Pouring Water Between Two Sealed Flasks',
          explanation: 'Imagine a closed system with exactly 1 liter of water. Flask K is kinetic energy; Flask U is potential energy. You can pour water back and forth as fast as you want, but the total volume of water is always exactly 1 liter.'
        },
        visualSummary: 'Energy cannot be created or destroyed; it merely changes costumes between motion (K) and position (U).'
      },
      'examples-applications': {
        overview: 'Work-energy theorems govern crash-test safety design, hydroelectric turbine power generation, and particle accelerator calibrations.',
        workedExamples: [
          {
            id: 'ex-stopping-distance',
            title: 'Car Braking Distance Proportional to Speed Squared',
            difficulty: 'Advanced',
            contextOrPrompt: 'A car traveling at speed v skids to a halt over distance d under constant friction force f_k. If the car doubles its speed to 2v, what is its new skid distance?',
            steps: [
              { stepNumber: 1, explanation: 'Apply the Work-Energy Theorem for the first skid.', work: 'W_net = Delta K  =>  -f_k * d = 0 - 0.5 * m * v²  =>  d = (m * v²) / (2 * f_k)', annotation: 'Initial relation.' },
              { stepNumber: 2, explanation: 'Evaluate with doubled speed v_new = 2v.', work: "d_new = [m * (2v)²] / (2 * f_k) = [4 * m * v²] / (2 * f_k) = 4 * d", annotation: 'Quadratic scaling.' },
              { stepNumber: 3, explanation: 'Conclude physical consequence.', work: 'Doubling the speed quadruples (4x) the braking distance required to stop.', annotation: 'Safety rule.' }
            ],
            finalResult: 'Stopping distance quadruples to 4d.',
            verificationTip: 'Kinetic energy scales quadratically with velocity (v²). Because friction force is constant, stopping distance must scale as v².'
          }
        ],
        applications: [
          {
            domain: 'Hydroelectric Power Generation',
            title: 'Bhakra Nangal Dam Gravitational Energy Harvesting',
            context: 'Water stored in high-altitude reservoirs possesses immense gravitational potential energy.',
            realWorldScenario: 'Water drops through penstock pipes of height h = 150 meters into turbines. Gravitational potential energy U = mgh converts into kinetic water jets, turning turbine coils to generate gigawatts of electrical power.',
            impactMetric: 'Generates over 1,300 MW of clean renewable electrical energy for millions of homes.'
          }
        ],
        selfCheckExercise: {
          question: 'A mass of 2 kg drops from a height of 20 meters above the ground. Assuming g = 10 m/s² and negligible air resistance, what is its velocity just before striking the ground?',
          hint: 'Use conservation of mechanical energy: mgh = 0.5 * m * v². Notice mass m cancels on both sides.',
          solution: '20 m/s (v = sqrt(2gh) = sqrt(2 * 10 * 20) = sqrt(400) = 20 m/s).'
        }
      },
      'explore-experiment': {
        activityTitle: 'Energy Conservation Loop Simulator',
        objective: 'Release a roller coaster car from varying drop heights to see kinetic and potential energy exchange.',
        instructions: 'Vary drop height and mass to observe conservation of mechanical energy.',
        experimentType: 'generic',
        variables: [
          { id: 'dropHeightM', label: 'Drop Height (m)', description: 'Initial release height in meters', min: 5, max: 100, step: 1, defaultValue: 30 },
          { id: 'massKg', label: 'Cart Mass (kg)', description: 'Vehicle mass in kg', min: 100, max: 2000, step: 50, defaultValue: 500 }
        ],
        guidingQuestions: ['Why does a satellite in an elliptical orbit speed up when passing closest to Earth (perigee)?'],
        whatToObserve: ['At perigee, gravitational potential energy U is lowest (most negative), so kinetic energy K must peak to conserve total orbital energy.'],
        takeawayInsight: 'Celestial orbital mechanics is pure mechanical energy conservation on a cosmic scale.'
      }
    }
  }
];
