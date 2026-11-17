import type { FeynmanAnchor } from '../../types/topic';

export const CLASS_EXPANSION_ANCHORS: Record<string, FeynmanAnchor> = {
  // ---------------------------------------------------------------------------
  // CLASS 6 ANCHORS
  // ---------------------------------------------------------------------------
  'math-6-knowing-numbers': {
    visceralMetaphor: {
      headline: 'The Cashier Coin Sleeves and Bank Crates',
      analogy: 'Imagine a busy grocery store cashier with thousands of coins. Loose coins create chaos on the counter. So the cashier rolls exactly 10 coins into a paper sleeve (Tens). When they have 10 sleeves, they pack them into a small wooden box of 100 (Hundreds). Ten boxes go into a warehouse crate of 1,000. Every step to the left is simply boxing up ten of the smaller packages. Place value is not an abstract math trick; it is an organized packing warehouse where the column position tells you the size of the box.',
      physicalObject: 'A stack of 10 coin sleeves packed into a banker cardboard box.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools make you memorize lengthy period charts (Ones, Tens, Hundreds, Thousands, Ten-Thousands, Lakhs) and mechanical comma rules without ever showing that commas are just verbal breathing pauses to package large quantities.',
      unmaskedTruth: 'A comma is just a label for a package size. Indian notation breathes at the first 3 digits (Hundreds) and then in pairs of 2 (Lakhs, Crores). International notation breathes uniformly every 3 digits (Thousands, Millions, Billions). Both represent the exact same pile of coins.'
    },
    ahaLadder: [
      { step: 1, title: 'One Column, Tenfold Jump', intuition: 'Every step to the left makes a digit 10 times more powerful. A 5 in the tens place is 50; a 5 in the hundreds place is 500.' },
      { step: 2, title: 'Zero as the Empty Box Placeholder', intuition: 'Zero does not mean "nothing"; zero means "this box size is currently empty, do not collapse the columns!" Without zero, 505 becomes 55.' },
      { step: 3, title: 'Estimating Before Calculating', intuition: 'Round off numbers to their biggest box first. If buying 48 items at ₹98 each, think 50 x 100 = ~₹5,000. If your calculator says ₹470, you instantly know a decimal key was missed.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing that a number with more digits is always larger, or forgetting that 1 Million equals 10 Lakhs.',
      realityCheck: '1 Million is 1,000,000 (one thousand thousands), which is exactly 10 Lakhs (10 x 1,00,000). Both have exactly 6 zeros.'
    }
  },

  'sci-6-light-shadows': {
    visceralMetaphor: {
      headline: 'The Relentless Laser Pointer and the Intercepted Screen',
      analogy: 'Imagine thousands of marching soldiers who can only walk in straight lines and cannot turn left or right. If a solid brick wall stands in their path, they crash into it and stop dead. The open space on either side keeps marching forward. Behind the wall, there is an empty pocket of ground where no soldier can reach: that empty patch is a shadow. Light cannot curve around corners like a creeping fog; it is a laser that either strikes or misses.',
      physicalObject: 'A wooden silhouette puppet casting a crisp black outline on a bedroom wall under a flashlight.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Textbooks present confusing ray diagrams and make you memorize terms like "rectilinear propagation" and "penumbra" without explaining why a shadow has no color.',
      unmaskedTruth: 'A shadow is not a thing; a shadow is an ABSENCE of light. It has no color because no light rays reached that patch of wall to bounce back into your eyes. Even if you hold up a bright red apple, its shadow is pitch black because the apple absorbed and reflected all the light away from the wall.'
    },
    ahaLadder: [
      { step: 1, title: 'Straight Line Invariant', intuition: 'Light rays never bend on their own in clear air. If you bend a garden hose, water still flows out; if you bend a plastic pipe, light instantly cuts off.' },
      { step: 2, title: 'The Pinhole Crossover', intuition: 'Make a tiny pinhole in a box. Light from the top of a tree can only travel straight down through the hole to hit the bottom of the screen. Light from the bottom travels up to hit the top. The image MUST flip upside-down!' },
      { step: 3, title: 'Shadow Size Geometry', intuition: 'Bring the object closer to the torch, and it intercepts a wider cone of diverging straight rays, casting a giant shadow. Push it closer to the wall, and the shadow shrinks to its true size.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a shadow is an image of the object, or that light bends around doors like sound does.',
      realityCheck: 'Sound waves are long and bend around doorframes (diffraction). Light waves are microscopic (~500 nanometers) and travel strictly straight, leaving sharp geometric shadows behind opaque barriers.'
    }
  },

  // ---------------------------------------------------------------------------
  // CLASS 7 ANCHORS
  // ---------------------------------------------------------------------------
  'math-7-integers-multiplication': {
    visceralMetaphor: {
      headline: 'The Video Rewind of a Person Walking Backwards',
      analogy: 'Imagine filming a friend walking backwards at 2 meters per second. Walking backwards is a negative speed (-2 m/s). If you play the film forward for 3 seconds (+3 s), they move 6 meters in reverse: (-2) x (+3) = -6 meters. Now, hit the REWIND button on your remote control (-3 seconds). What does a person walking backwards look like when rewound in time? They are moving smoothly FORWARD: (-2) x (-3) = +6 meters! Reversing a reverse is forward motion.',
      physicalObject: 'A handheld video camera playback screen playing a backwards walker in reverse.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teachers chant "minus into minus is plus" like a magical spell, leaving students baffled why debt times debt could ever become wealth.',
      unmaskedTruth: 'A negative sign is simply a 180-degree turn on a directional road. If you face East (+) and turn around once (-), you face West (-). If you turn around a second time (-), you are facing East (+) again! Two 180-degree turns make a full 360-degree restoration.'
    },
    ahaLadder: [
      { step: 1, title: 'Sign as Directional Flip', intuition: 'A positive sign means "keep going the same way". A negative sign means "flip 180 degrees into the opposite direction".' },
      { step: 2, title: 'Cancelling a Debt is Income', intuition: 'If you owe a shopkeeper ₹500, that is -$500. If the shopkeeper forgives or removes (-1) that debt, you are ₹500 richer!' },
      { step: 3, title: 'Parity Rule for Many Factors', intuition: 'Count the negative signs. Pair them up: every pair cancels into a positive. If one negative is left over without a partner, the entire product is negative.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Confusing integer addition rules with integer multiplication rules (e.g. thinking (-3) + (-4) equals +7).',
      realityCheck: 'Adding two debts gives a bigger debt: (-3) + (-4) = -7. Multiplying reverses direction: (-3) x (-4) = +12. Never mix the balance scale with the direction flipper!'
    }
  },

  'sci-7-heat-transfer': {
    visceralMetaphor: {
      headline: 'The Bucket Brigade, the Running Courier, and the Catapult',
      analogy: 'Imagine a gymnasium with three ways to move heavy boxes from one wall to the other. Method 1 (Conduction): A line of people stand shoulder-to-shoulder, passing the box hand-to-hand without anyone leaving their spot. Method 2 (Convection): A runner picks up the box and sprints across the room. Method 3 (Radiation): A catapult hurls the box through the empty air without touching anyone. Conduction needs vibrating neighbors; convection needs moving fluids; radiation flies across total emptiness.',
      physicalObject: 'A hot steel spoon burning your fingers while a wooden spoon in the same soup stays cool.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Textbooks overload you with heat vs temperature definitions and thermal equations, making you think cold is a substance that creeps into objects.',
      unmaskedTruth: 'There is no such thing as "cold" in physics. Cold is simply the ABSENCE of heat energy. When you hold an ice cube, cold does not enter your hand; your hand warm thermal kinetic energy rushes out into the ice cube!'
    },
    ahaLadder: [
      { step: 1, title: 'Heat is Atomic Jiggling', intuition: 'Temperature is how fast atoms are jiggling. In hot soup, atoms vibrate violently; in cold water, they barely tremble.' },
      { step: 2, title: 'Convection Buoyancy', intuition: 'When water or air is heated, its atoms spread out. It becomes lighter (less dense) and floats up. Cold dense fluid sinks down to take its place, creating a spinning carousel loop.' },
      { step: 3, title: 'The Miracle of Radiation', intuition: 'The Sun warms your face across 150 million kilometers of empty vacuum where zero atoms exist. It travels as invisible infrared light waves, requiring zero particles to deliver warmth.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing that a blanket or winter jacket generates heat on its own.',
      realityCheck: 'Wrap a thermometer in a winter coat for an hour; it reads the exact same room temperature. Blankets are insulators: they trap your own body heat from escaping via conduction and convection.'
    }
  },

  // ---------------------------------------------------------------------------
  // CLASS 8 ANCHORS
  // ---------------------------------------------------------------------------
  'math-8-linear-equations-1var': {
    visceralMetaphor: {
      headline: 'The Two-Pan Balance with Mystery Bags on Both Sides',
      analogy: 'Imagine an old-fashioned grocery scale. On the left pan sits 5 identical mystery paper bags [x] and 4 one-kilogram weights. On the right pan sits 2 mystery paper bags [x] and 19 one-kilogram weights. The scale is in dead-level balance! What is the fastest way to find what a single bag weighs? Walk up and remove 2 mystery bags from BOTH pans simultaneously! The scale stays in perfect balance, but now the right pan has ZERO bags: 3 bags + 4 kg = 19 kg. Remove 4 kg from both sides: 3 bags = 15 kg. Each bag must weigh 5 kg.',
      physicalObject: 'A brass balance scale with cloth drawstring mystery bags and cast-iron counterweights.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach students to "transpose" terms by flipping signs like an arbitrary incantation, causing frequent sign errors and lost negative signs.',
      unmaskedTruth: 'Transposing is not magic. Moving a +2x to the other side as -2x is simply subtracting 2x from both pans of the balance scale so it vanishes from the right side. You are conserving physical balance.'
    },
    ahaLadder: [
      { step: 1, title: 'Pick a Side for the Unknowns', intuition: 'Look at both pans. Choose the side with MORE variables (e.g. 5x beats 2x). Clear variables off the opposite side by subtracting 2x.' },
      { step: 2, title: 'Evict the Numbers to the Opposite Side', intuition: 'Once variables live on the left, evict all pure numbers to the right by adding or subtracting the opposites.' },
      { step: 3, title: 'The Final Divide', intuition: 'When you reach 3x = 15, divide both sides by the multiplier 3 to reveal what one single bag weighs.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Dividing only part of an expression when simplifying fractions or forgetting to distribute negative signs across parentheses.',
      realityCheck: 'In -(2x - 5), the negative applies to BOTH terms: -2x + 5. The negative is a multiplier of -1 distributed to every occupant inside the brackets.'
    }
  },

  'sci-8-force-pressure': {
    visceralMetaphor: {
      headline: 'The Stiletto Heel and the Elephant Foot',
      analogy: 'Imagine a 60 kg woman stepping on a soft wooden floor wearing sharp stiletto heels. The tiny heel tip has an area of only 0.5 cm². Her entire 600 N weight concentrates on that tiny pinpoint, exerting 12,000,000 Pascals—denting the hardwood! Now imagine a massive 3,000 kg elephant standing on four broad, spongy feet (area 1,000 cm²). Its immense weight is dispersed so broadly that it exerts only 300,000 Pascals—40 times LESS pressure than the woman! Force is the total weight; pressure is how sharply it is focused.',
      physicalObject: 'A steel thumbtack pressed into a corkboard: broad flat head against your thumb, needle point into the board.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students frequently mix up Force (in Newtons) and Pressure (in Pascals), thinking that a larger force always causes more damage.',
      unmaskedTruth: 'A gentle force focused on a microscopic point (like a syringe needle) easily pierces skin, while an immense force spread over a huge area (like lying on a mattress) is harmless. Damage, penetration, and cutting depend on PRESSURE, not raw force.'
    },
    ahaLadder: [
      { step: 1, title: 'The Master Formula P = F / A', intuition: 'Pressure is force divided by contact area. Smaller area = higher pressure. Bigger area = lower pressure.' },
      { step: 2, title: 'Why Knives Must Be Sharp', intuition: 'A sharp knife has an edge microscopic nanometers thin. Even a gentle push creates gigapascals of pressure, effortlessly severing tomato skin.' },
      { step: 3, title: 'The Ocean of Air Above Your Head', intuition: 'A 1-meter square column of atmosphere weighing 10,000 kg presses on you right now. Your internal blood and cell pressure pushes outward with the exact same strength, keeping you in perfect equilibrium.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking air has no weight because we cannot feel it.',
      realityCheck: 'Pump air into an empty basketball and weigh it on a digital scale; it gets measurably heavier! Air is matter with mass, pulled down by Earth gravity.'
    }
  },

  // ---------------------------------------------------------------------------
  // CLASS 11 ANCHORS
  // ---------------------------------------------------------------------------
  'math-11-limits-derivatives': {
    visceralMetaphor: {
      headline: 'The High-Speed Camera Zooming in on a Car Speedometer',
      analogy: 'Suppose you drive 100 kilometers in 2 hours. Your average speed is 50 km/h. But were you traveling at exactly 50 km/h when you passed a traffic speed camera? No! You stopped at red lights and hit 90 km/h on the highway. To find your speed at one EXACT millisecond, you must measure distance over an interval so tiny that speed has no time to change. But if time interval is zero, distance is zero: 0/0! Limits allow us to shrink the interval to 0.0001 seconds without ever dividing by zero. The derivative is the reading on that speedometer.',
      physicalObject: 'A digital dashboard speedometer updating its readout at 60 frames per second.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Curriculums drown students in epsilon-delta definitions and mechanical polynomial power rules without ever showing that a derivative is simply the SLOPE of a zoomed-in curve.',
      unmaskedTruth: 'Take ANY smooth curve—a circle, a parabola, a sine wave. Zoom in 100x. Zoom in 10,000x. The curve straightens out into a completely straight line! The derivative is simply the slope (Rise / Run) of that microscopic straight line.'
    },
    ahaLadder: [
      { step: 1, title: 'Secant Line as Average Speed', intuition: 'Connect two distant points on a curve with a straight line. That slope is the average rate of change between them.' },
      { step: 2, title: 'Sliding Point Q Toward Point P', intuition: 'Slide the second point closer and closer. The line pivots and hugs the curve, turning into a tangent line touching at only one point.' },
      { step: 3, title: 'The Limit as h Approaches Zero', intuition: "In [f(x+h) - f(x)] / h, as h -> 0, the fraction 0/0 resolves algebraically (like (2xh + h²)/h = 2x + h = 2x), giving the exact instantaneous slope." }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a derivative f\'(x) is an approximation of the slope.',
      realityCheck: 'A secant line is an approximation. The limit as h approaches zero is the EXACT, mathematically rigorous instantaneous rate of change.'
    }
  },

  'phys-11-work-energy-theorem': {
    visceralMetaphor: {
      headline: 'The Bank Account of Motion and Altitude',
      analogy: 'Imagine a closed financial account that holds energy instead of rupees. You start with 1,000 Joules at the top of a roller coaster hill (stored as Potential Energy U = mgh). As you plummet, gravity withdraws Joules from the height account and deposits them directly into the motion account (Kinetic Energy K = 0.5 mv²). At the bottom of the drop, your height account is zero, but your motion account has 1,000 Joules, screaming at maximum speed! When you climb the next hill, motion Joules are redeposited into height Joules. The total balance NEVER changes.',
      physicalObject: 'A roller coaster car roaring through a loop without any engine, powered purely by its initial drop.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students memorize W = F s cos(theta) and get confused why carrying a 30 kg heavy backpack across a flat floor does zero work on the backpack.',
      unmaskedTruth: 'Work is force acting ALONG displacement. If you lift upward with 300 N while walking horizontally, the angle theta is 90 degrees. cos(90°) = 0! Your legs do work against the floor, but your upward lifting force does ZERO work on the backpack horizontal motion.'
    },
    ahaLadder: [
      { step: 1, title: 'Work is Energy Transferred', intuition: 'Push an object in the direction it moves (theta = 0°), and you inject kinetic energy (+W). Push against it like brakes (theta = 180°), and you drain kinetic energy (-W).' },
      { step: 2, title: 'Perpendicular Forces Do Zero Work', intuition: 'Gravity acting on a satellite in a circular orbit points at 90° to its velocity. It curves the path into a circle without ever changing its speed by even 1 km/h!' },
      { step: 3, title: 'The Master Invariant W_net = Delta K', intuition: 'Sum the work done by every force in the universe acting on a particle. That sum equals the exact change in its kinetic energy: 0.5 m v_final² - 0.5 m v_initial².' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking that stopping distance doubles when car speed doubles.',
      realityCheck: 'Kinetic energy scales with VELOCITY SQUARED (v²)! If you double your speed from 30 to 60 km/h, your car possesses FOUR TIMES (2² = 4) as much kinetic energy. Your brakes must do 4x the work, quadrupling your skid distance!'
    }
  },

  // ---------------------------------------------------------------------------
  // CLASS 12 ANCHORS
  // ---------------------------------------------------------------------------
  'math-12-integrals-calculus': {
    visceralMetaphor: {
      headline: 'The Loaf of Bread Sliced into Micron Ribbons',
      analogy: 'Imagine you have an irregularly shaped, artisan loaf of bread—thick in the middle, tapered at the ends. How do you find its exact volume? Take a razor and slice it into 1,000 paper-thin vertical slices. Each individual slice is so thin that its curved edge is negligible; it looks just like a flat cylinder of area A(x) and tiny thickness dx. Multiply area by thickness to get slice volume dV = A(x) dx. Now sum all 1,000 slices together! Integration is the sum of infinitely many paper-thin slices reconstructing the full 3D reality.',
      physicalObject: 'A stack of 500 paper-thin laser-cut wooden sheets forming a contoured architectural terrain model.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach integration as a bewildering catalog of 50 algebraic substitution tricks without ever showing the big picture: integration is just ADDITION of continuous quantities.',
      unmaskedTruth: 'The integral sign Integral is simply an elongated Latin letter "S" standing for "Summa" (Sum)! Leibniz designed it specifically to mean: "sum up all the tiny rectangles f(x) · dx from x = a to x = b".'
    },
    ahaLadder: [
      { step: 1, title: 'Riemann Ribbon Sum', intuition: 'Divide an area under a curve into vertical strips of width dx and height f(x). Summing their areas gives a close approximation of the total area.' },
      { step: 2, title: 'The Miracle of Anti-Differentiation', intuition: 'Newton and Leibniz discovered that if you know a function F whose derivative is f (F\' = f), the area is simply F(b) - F(a)! You do not need to sum infinite strips by hand.' },
      { step: 3, title: 'Integration by Parts is Product Rule in Reverse', intuition: 'The product rule says d(uv) = u dv + v du. Rearrange it and integrate: Integral u dv = uv - Integral v du. It trades a hard integral for an easier one.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing that an integral always represents a geometric area in square meters.',
      realityCheck: 'If the vertical axis is velocity (m/s) and horizontal axis is time (s), the area is (m/s) x s = METERS (total distance traveled). An integral accumulates whatever physical quantity the two axes multiply to create!'
    }
  },

  'phys-12-electrostatics-coulomb-gauss': {
    visceralMetaphor: {
      headline: 'The 60-Watt Lightbulb and the Enclosing Lampshade',
      analogy: 'Imagine a glowing 60-Watt lightbulb hanging from a ceiling. It radiates a fixed amount of light energy in all directions. Now, place a tiny 10 cm spherical glass lampshade around the bulb. How much light passes through the glass? Exactly 60 Watts! Now replace it with a massive 5-meter balloon lampshade. How much light passes through? Still exactly 60 Watts! Gauss Law states that the total electric flux (field lines) piercing through ANY closed surface depends solely on the charge trapped INSIDE, completely independent of the shape or size of the bubble.',
      physicalObject: 'A frosted glass spherical lampshade glowing uniformly from a central filament.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Textbooks present surface integrals Closed_Integral(E · dA) with frightening vector calculus notation, making students think they have to perform complex multivariable calculus by hand.',
      unmaskedTruth: 'Gauss Law is designed to AVOID calculus! If you pick a Gaussian surface that matches the symmetry of the charge (a sphere for point charges, a cylinder for wires, a box for sheets), the electric field E is CONSTANT across the surface, pulling right out of the integral: E x Area = q / epsilon_0! It turns calculus into middle-school algebra.'
    },
    ahaLadder: [
      { step: 1, title: 'Field Lines as Invisible Streams', intuition: 'Positive charges shoot field lines outward like fountains. Negative charges swallow them like drains. Electric flux is the count of lines punching through a surface.' },
      { step: 2, title: 'Outside Charges Cancel Out', intuition: 'If a charge sits OUTSIDE your Gaussian bubble, every field line that enters on one side must exit on the other side. Net flux contribution = 0!' },
      { step: 3, title: 'The Faraday Cage Shield', intuition: 'Inside a hollow metal box, free electrons rush to the outer surface until they perfectly cancel the electric field inside. Inside any hollow conductor, E is STRICTLY ZERO. That is why you are safe inside an airplane struck by lightning.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking that if the net flux through a surface is zero, the electric field must be zero everywhere on that surface.',
      realityCheck: 'If you enclose an electric dipole (+q and -q), net flux is zero because lines entering equal lines exiting. But the electric field E on the surface is vibrant and non-zero!'
    }
  }
};
