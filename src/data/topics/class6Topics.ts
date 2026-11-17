import type { Topic } from '../../types/topic';

export const CLASS_6_TOPICS: Topic[] = [
  // ---------------------------------------------------------------------------
  // MATHEMATICS (Class 6)
  // ---------------------------------------------------------------------------
  {
    id: 'math-6-knowing-numbers',
    slug: 'math-6-knowing-numbers',
    title: 'Knowing Our Numbers',
    subtitle: 'Place value arithmetic, Indian vs International notation, and magnitude estimation',
    subjectId: 'mathematics',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'Understanding numbers is about grasping magnitude and position. Our base-10 place-value system transforms 10 simple digits into tools that can measure single grains of sand or the billions of stars in the cosmos.',
    whyItMatters: 'Every financial budget, scientific measurement, and digital dataset relies on place value. Estimating magnitudes allows engineers and everyday citizens to spot calculation blunders before they cause disasters.',
    learningObjectives: [
      'Compare multi-digit numbers and identify place values with certainty.',
      'Convert fluidly between Indian numbering (Lakhs/Crores) and International notation (Millions/Billions).',
      'Round large quantities to meaningful powers of ten for realistic estimation.',
      'Use Roman numerals and understand their additive/subtractive logic.'
    ],
    coreQuestions: [
      'Why does shifting a digit one column to the left multiply its value by ten?',
      'Why do Indian commas group by twos after hundreds, while International commas group in threes?',
      'How does estimation prevent real-world arithmetic catastrophes?'
    ],
    prerequisites: ['Basic counting', 'Addition and subtraction of whole numbers'],
    keyTerms: [
      { term: 'Place Value', definition: 'The numerical value a digit holds by virtue of its position in a number.' },
      { term: 'Lakh', definition: 'One hundred thousand (1,00,000 in Indian notation), represented as 100,000 internationally.' },
      { term: 'Crore', definition: 'Ten million (1,00,00,000 in Indian notation), represented as 10,000,000 internationally.' },
      { term: 'Rounding Off', definition: 'Replacing a number with an approximate value that is shorter, simpler, or easier to communicate.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'Numbers are not mere abstract glyphs on paper; they represent quantities and scales of physical reality. The Hindu-Arabic place-value system was a revolutionary human invention because it allowed any number, no matter how vast, to be written using only ten distinct symbols (0 through 9).',
        sections: [
          {
            id: 'place-value-power',
            title: '1. The Multiplicative Engine of Place Value',
            subtitle: 'Why the position of a symbol determines its quantitative weight',
            paragraphs: [
              'In the number 555, the three digits look identical, yet each communicates a completely different magnitude. The rightmost 5 represents five loose single units. The middle 5 represents five bundles of ten (fifty). The leftmost 5 represents five boxes of one hundred (five hundred).',
              'Every time a digit steps one column to the left, its intrinsic value is magnified by exactly ten. Conversely, shifting one column to the right divides its weight by ten. This geometric progression is the foundation of modern mathematics.'
            ],
            bulletPoints: [
              'Units Column: 10^0 = 1',
              'Tens Column: 10^1 = 10',
              'Hundreds Column: 10^2 = 100',
              'Thousands Column: 10^3 = 1,000'
            ],
            callout: {
              type: 'axiom',
              title: 'Positional Principle',
              text: 'The total value of any number is the sum of each digit multiplied by its positional power of ten.'
            }
          },
          {
            id: 'comma-conventions',
            title: '2. Indian vs International Comma Conventions',
            subtitle: 'Two distinct systems for packaging large cognitive loads',
            paragraphs: [
              'To make large numbers human-readable, societies insert commas as visual chunking anchors. The International system packages digits in uniform triplets: thousands, millions, billions, trillions (e.g. 15,250,000).',
              'The Indian system acknowledges hundreds first with three digits, but then groups all subsequent higher values into pairs: thousands, lakhs, and crores (e.g. 1,52,50,000). Both systems describe the exact same quantity of atoms or rupees, but structure human speech differently.'
            ],
            callout: {
              type: 'insight',
              title: 'Bridge Equation',
              text: '1 Million = 10 Lakhs. 10 Million = 1 Crore. 1 Billion = 100 Crores.'
            }
          }
        ],
        summaryTakeaways: [
          'Place value multiplies a digit by 10 for every column shifted to the left.',
          'Indian notation groups 3 digits, then pairs (Lakhs, Crores); International notation groups purely in threes (Millions, Billions).',
          'Rounding off simplifies communication without discarding essential magnitude.'
        ],
        reflectionPrompt: 'Why is it impossible to express fractions easily in Roman numerals compared to the base-10 Hindu-Arabic decimal system?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'The Stepping Pyramid of Multiplicative Place Value',
        caption: 'Visualizing how physical units bundle into tens, hundreds, thousands, and lakhs.',
        diagramTitle: 'Base-10 Spatial Hierarchy',
        diagramDescription: 'Observe how a single unit square grows tenfold into a stick of 10, a flat square of 100, and a solid cube of 1,000.',
        components: [
          { id: 'unit-cube', name: 'Single Unit Cube', role: 'Base Particle', description: 'A 1x1x1 mm physical block representing the number 1.', badge: '10^0' },
          { id: 'ten-rod', name: 'Tens Rod', role: 'Linear Bundle', description: 'Ten unit cubes fused in a straight row representing 10.', badge: '10^1' },
          { id: 'hundred-flat', name: 'Hundred Flat', role: 'Planar Sheet', description: 'Ten rods side by side forming a 10x10 sheet of 100 units.', badge: '10^2' },
          { id: 'thousand-block', name: 'Thousand Block', role: 'Spatial Cube', description: 'Ten flats stacked vertically into a 10x10x10 cube of 1,000 units.', badge: '10^3' }
        ],
        interactiveLayers: [
          { layerId: 'indian-layer', label: 'Indian Partitioning (Lakhs / Crores)', description: 'Displays comma grouping at 3 digits then sets of 2 digits.', highlightedComponentIds: ['unit-cube', 'ten-rod', 'hundred-flat'] },
          { layerId: 'intl-layer', label: 'International Partitioning (Millions / Billions)', description: 'Displays uniform 3-digit comma intervals.', highlightedComponentIds: ['hundred-flat', 'thousand-block'] }
        ],
        processFlow: [
          { step: 1, label: 'Count Units', detail: 'Gather loose units up to 9.', annotation: '0-9' },
          { step: 2, label: 'Bundle into Ten', detail: 'At 10, collapse the loose units into a single tens rod and place a 0 in units.', annotation: 'Reset & Carry' },
          { step: 3, label: 'Bundle into Hundred', detail: 'At 10 rods, fuse them into a flat hundred sheet.', annotation: '10 x 10' }
        ],
        spatialAnalogy: {
          metaphor: 'Stacking Coins into Sealed Bank Rolls',
          explanation: 'Loose single coins clutter a cash register. Banks roll them into sleeves of 10 coins, box 10 rolls into crates of 100, and pack 10 crates into palettes of 1,000.'
        },
        visualSummary: 'Positional notation is physical packaging: grouping units in powers of ten makes infinite quantities mentally manageable.'
      },
      'examples-applications': {
        overview: 'Place value allows engineers, economists, and doctors to communicate exact values across borders without misinterpreting dosages or financial budgets.',
        workedExamples: [
          {
            id: 'ex-1-conversion',
            title: 'Converting Indian Lakhs to International Millions',
            difficulty: 'Foundational',
            contextOrPrompt: 'A solar installation project in Rajasthan costs ₹45,00,000. Express this number in the International System of numeration.',
            steps: [
              { stepNumber: 1, explanation: 'Write down the full integer without commas.', work: '4500000', annotation: 'Raw digit string.' },
              { stepNumber: 2, explanation: 'Insert commas from right to left in triplets of three.', work: '4,500,000', annotation: 'International format.' },
              { stepNumber: 3, explanation: 'Read out the verbal number name based on triplet groups.', work: 'Four million, five hundred thousand rupees.', annotation: 'Verbal translation.' }
            ],
            finalResult: '₹4,500,000 (Four million, five hundred thousand rupees)',
            verificationTip: 'Check: 45 Lakhs = 45 x 100,000 = 4,500,000 = 4.5 Million. Perfectly consistent.'
          }
        ],
        applications: [
          {
            domain: 'Space Missions & Telemetry',
            title: 'ISRO Chandrayaan Distance Computation',
            context: 'Lunar orbital missions require continuous translation of distances from kilometers to astronomical units.',
            realWorldScenario: 'The distance to the Moon is roughly 3,84,400 km in Indian notation. International tracking stations record this as 384,400 km. Place value errors of a single decimal shift would send the spacecraft into deep space.',
            impactMetric: 'Zero-tolerance parsing prevents mission trajectory deviations.'
          }
        ],
        selfCheckExercise: {
          question: 'Write 8 Crore, 7 Lakh, 4 Thousand, 20 in standard Indian numeral format with proper commas.',
          hint: 'Remember that missing place values (like ten-lakhs or hundreds) must be filled with a zero placeholder.',
          solution: '8,07,04,020'
        }
      },
      'explore-experiment': {
        activityTitle: 'Place Value Bundling Lab',
        objective: 'Observe how units bundle into tens, hundreds, and thousands.',
        instructions: 'Gather loose units to see automatic column carry-overs.',
        experimentType: 'generic',
        variables: [
          { id: 'units', label: 'Loose Units', description: 'Count of single units', min: 0, max: 100, step: 1, defaultValue: 15 }
        ],
        guidingQuestions: ['Why does placing 0 in an empty column matter when writing a number?'],
        whatToObserve: ['Notice that omitting the zero turns 8,07,04,020 into 8742, completely corrupting the intended magnitude.'],
        takeawayInsight: 'Zero is the vital anchor that holds place-value columns in their true mathematical positions.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // SCIENCE (Class 6)
  // ---------------------------------------------------------------------------
  {
    id: 'sci-6-light-shadows',
    slug: 'sci-6-light-shadows',
    title: 'Light, Shadows and Reflections',
    subtitle: 'Rectilinear propagation, opacity, and the geometry of inverted pinhole images',
    subjectId: 'physics',
    difficulty: 'Foundational',
    estimatedMinutes: 20,
    overview: 'Light travels in strictly straight lines through uniform media. When an opaque obstacle blocks this relentless path, a shadow forms behind it. When light bounces off a polished planar boundary, reflection mirrors the scene.',
    whyItMatters: 'From solar eclipses that dim entire continents to the camera lenses in modern smartphones, straight-line ray optics governs how humans visualize the cosmos.',
    learningObjectives: [
      'Classify materials as transparent, translucent, or opaque based on light transmission.',
      'Explain rectilinear propagation through experimental pinhole cameras.',
      'Distinguish between a shadow (absence of light) and a reflection (redirection of light).',
      'Construct a functional pinhole camera and explain why its image appears inverted.'
    ],
    coreQuestions: [
      'Why can light never bend around the corner of a solid brick wall?',
      'Why is a shadow always dark regardless of the vibrant colors of the obstacle casting it?',
      'Why does an image inside a pinhole camera appear upside down?'
    ],
    prerequisites: ['Basic concept of day and night', 'Light sources like sun and torches'],
    keyTerms: [
      { term: 'Rectilinear Propagation', definition: 'The property of light by which it travels strictly in straight lines in a uniform medium.' },
      { term: 'Opaque Material', definition: 'An object that absorbs or scatters all incident light, casting a crisp shadow behind it.' },
      { term: 'Pinhole Camera', definition: 'A simple lensless optical camera consisting of a light-tight box with a tiny aperture on one side.' },
      { term: 'Reflection', definition: 'The bouncing back of light rays when they strike a smooth, polished boundary.' }
    ],
    availablePaths: ['structured-explanation', 'visual-learning', 'examples-applications', 'explore-experiment'],
    paths: {
      'structured-explanation': {
        introduction: 'We see the world because light enters our eyes. Some objects (the Sun, a glowing lightbulb, a torch) emit their own light; these are luminous. Most objects are non-luminous: we perceive them only because they reflect ambient light rays into our retinas.',
        sections: [
          {
            id: 'rectilinear-line',
            title: '1. Rectilinear Propagation: Nature Straight Laser',
            subtitle: 'Why light cannot curve around obstacles on its own',
            paragraphs: [
              'If you look at a lit candle through a straight plastic pipe, the flame is clearly visible. But if you bend the pipe into an S-shape, the flame instantly vanishes.',
              'This simple demonstration proves that light travels exclusively along straight lines. Unlike sound waves, which can bend around open doorways, light rays travel straight forward until they strike matter.'
            ],
            callout: {
              type: 'axiom',
              title: 'First Principle of Geometric Optics',
              text: 'In any homogeneous transparent medium, light propagates along straight Euclidean paths known as rays.'
            }
          },
          {
            id: 'shadow-vs-image',
            title: '2. Shadows vs Images: The Essential Distinction',
            subtitle: 'A shadow is an absence; an image is a detailed light mapping',
            paragraphs: [
              'A shadow is not an image. A shadow is simply a patch of darkness formed on a screen where an opaque obstacle blocked straight-line rays from reaching it. Shadows carry zero color and zero internal detail; they show only the outer silhouette of the object.',
              'In contrast, a mirror image or a pinhole projection is formed by real rays reaching the eye or screen, preserving authentic colors, textures, and details.'
            ]
          }
        ],
        summaryTakeaways: [
          'Light travels in straight lines (rectilinear propagation).',
          'Opaque objects block light rays, creating shadows behind them.',
          'Pinhole cameras produce real, inverted images because top rays travel straight to the bottom and bottom rays travel straight to the top.'
        ],
        reflectionPrompt: 'Why does a bird flying high in the sky cast no visible shadow on the ground, while a bird sitting on a low fence casts a sharp shadow?'
      },
      'visual-learning': {
        visualType: 'diagram',
        headline: 'Ray Geometry of the Inverted Pinhole Camera',
        caption: 'Tracing straight light rays from tree crown and tree trunk through a tiny aperture.',
        diagramTitle: 'Pinhole Image Inversion Mechanics',
        diagramDescription: 'Observe how top and bottom rays cross straight through the pinhole fulcrum, flipping the image upside-down on the translucent back screen.',
        components: [
          { id: 'tree-top', name: 'Tree Crown (Object Top)', role: 'Light Emitter', description: 'Sunlight reflects off top leaves, sending straight rays in all directions.', badge: 'Object Top' },
          { id: 'pinhole-aperture', name: 'Tiny Pinhole Aperture', role: 'Ray Filter', description: 'Allows only one single straight ray from each point to pass through without overlapping.', badge: 'Filter Fulcrum' },
          { id: 'inverted-screen', name: 'Translucent Screen Image', role: 'Projection Surface', description: 'Top ray hits bottom of screen; bottom ray hits top of screen, rendering inverted tree.', badge: 'Inverted Image' }
        ],
        interactiveLayers: [
          { layerId: 'ray-tracing', label: 'Straight Line Rays', description: 'Rays crossing through the pinhole with zero bending.', highlightedComponentIds: ['tree-top', 'pinhole-aperture', 'inverted-screen'] }
        ],
        processFlow: [
          { step: 1, label: 'Ray Emission', detail: 'Object reflects ambient light rays.', annotation: 'Source' },
          { step: 2, label: 'Pinhole Selection', detail: 'Small hole isolates single rays from each point.', annotation: 'Cross Point' },
          { step: 3, label: 'Screen Inversion', detail: 'Rays land on opposite side of screen, creating inverted image.', annotation: 'Flipped Real Image' }
        ],
        spatialAnalogy: {
          metaphor: 'Two Skateboarders Passing Through a Narrow Turnstile',
          explanation: 'A skateboarder entering from the high left exits to the low right. A skateboarder entering from the low left exits to the high right. Straight trajectories through a single central constriction must cross and flip orientation.'
        },
        visualSummary: 'Straight rays + narrow hole = inverted image. Light straight path explains both crisp shadows and flipped pinhole pictures.'
      },
      'examples-applications': {
        overview: 'Understanding rectilinear propagation allows architects to design natural daylighting in buildings and astronomers to predict eclipses with microsecond precision.',
        workedExamples: [
          {
            id: 'ex-pinhole-size',
            title: 'Why a Larger Pinhole Makes the Image Blurry',
            difficulty: 'Foundational',
            contextOrPrompt: 'A student makes a pinhole camera with a 0.5mm hole and gets a sharp image. They enlarge the hole to 10mm hoping for a brighter image. What happens and why?',
            steps: [
              { stepNumber: 1, explanation: 'Analyze ray paths through a tiny aperture.', work: 'A 0.5mm hole allows only one ray from each object point to reach the screen, producing sharp points.', annotation: 'Point-to-point correspondence.' },
              { stepNumber: 2, explanation: 'Analyze ray paths through a 10mm hole.', work: 'A 10mm hole acts as hundreds of adjacent pinholes, allowing multiple overlapping rays from each point.', annotation: 'Overlapping circles of confusion.' },
              { stepNumber: 3, explanation: 'Conclude visual effect.', work: 'The image becomes brighter because more light enters, but it blurs completely into an unrecognizable wash.', annotation: 'Trade-off: Sharpness vs Brightness.' }
            ],
            finalResult: 'The image becomes significantly brighter but loses focus and blurs completely.',
            verificationTip: 'A camera aperture must balance brightness and depth of field.'
          }
        ],
        applications: [
          {
            domain: 'Solar Astronomy',
            title: 'Viewing Solar Eclipses Safely',
            context: 'Looking directly at the Sun during an eclipse burns retinas permanently.',
            realWorldScenario: 'By poking a needle through cardboard and projecting the Sun onto a white sheet on the ground, observers view a crisp, safe miniature crescent projection of the Sun.',
            impactMetric: '100% eye-safe direct observation of celestial mechanics.'
          }
        ],
        selfCheckExercise: {
          question: 'If you shine a torch at a red transparent plastic folder, a blue opaque book, and a clear glass window, which one casts a dark black shadow on the wall?',
          hint: 'Which object prevents light rays from passing through entirely?',
          solution: 'The blue opaque book, because it absorbs and reflects all light, leaving an absence of rays behind it.'
        }
      },
      'explore-experiment': {
        activityTitle: 'Virtual Pinhole & Shadow Sandbox',
        objective: 'Observe rectilinear propagation and image inversion through a pinhole aperture.',
        instructions: 'Adjust object distance and pinhole diameter to see image sharpening.',
        experimentType: 'generic',
        variables: [
          { id: 'distance', label: 'Object Distance', description: 'Distance from light to object in cm', min: 10, max: 200, step: 5, defaultValue: 50 },
          { id: 'pinhole', label: 'Pinhole Diameter', description: 'Aperture diameter in mm', min: 0.2, max: 10, step: 0.2, defaultValue: 1 }
        ],
        guidingQuestions: ['Why does moving an obstacle closer to a candle make its shadow grow larger?'],
        whatToObserve: ['Notice the diverging light cone from the candle: closer obstacles intercept rays earlier where the angular spread is wider.'],
        takeawayInsight: 'Shadow size depends on the proportion of the light cone intercepted by the opaque obstacle.'
      }
    }
  }
];
