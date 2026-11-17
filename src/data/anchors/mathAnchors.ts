import type { FeynmanAnchor } from '../../types/topic';

export const MATH_ANCHORS: Record<string, FeynmanAnchor> = {
  'math-linear-equations': {
    visceralMetaphor: {
      headline: 'The Two-Pan Fruit Scale',
      analogy: 'Imagine a physical grocer’s scale holding bags of mystery fruit on the left pan and metal kilogram weights on the right pan. As long as the pans hover at the exact same height, they are equal. If you remove 2 kg from one side, the scale tips—unless you immediately remove 2 kg from the other side.',
      physicalObject: 'A brass double-pan balance scale with identical brass counterweights.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools tell you: "Move the number to the other side and flip its sign." This makes students believe numbers magically leap across equal signs and change identity.',
      unmaskedTruth: 'Numbers never jump anywhere. You are simply performing the identical physical act to both pans of the scale (subtracting 5 or dividing by 2) so the scale stays level while isolating the mystery bag.'
    },
    ahaLadder: [
      { step: 1, title: 'The Level Beam', intuition: 'An equals sign (=) is not an instruction to "do something"; it is a factual statement that both sides currently weigh the exact same amount.' },
      { step: 2, title: 'Unwrapping the Box', intuition: 'To find what is inside x, undo whatever was done to it in reverse order, like unwrapping wrapping paper before opening the cardboard box.' },
      { step: 3, title: 'The Constant Slope', intuition: 'On a graph, linear simply means every single step you take forward climbs the exact same number of steps upward—steady, predictable staircases.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Dividing only the number on the right side while forgetting to divide all terms on the left side.',
      realityCheck: 'If you halve the weight on the right pan, you must cut EVERYTHING on the left pan in half, not just your favorite term.'
    }
  },

  'math-rational-numbers': {
    visceralMetaphor: {
      headline: 'The Pizza Slices in Equal Boxes',
      analogy: 'A rational number is simply any quantity that can be created by slicing whole pizzas into identical, fair pieces and counting how many pieces you hold. 3/4 just means cut one pizza into 4 fair quarters, and take 3.',
      physicalObject: 'A wooden pizza board marked with laser-cut slice lines.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Definitions like "A number in the form p/q where p and q are integers and q ≠ 0" bury the simple concept in abstract letter soup.',
      unmaskedTruth: 'Rational comes from "RATIO"—it literally means "can be expressed as a clean ratio of whole counting counts". The only rule is you cannot divide by zero because you cannot cut a pizza into zero pieces.'
    },
    ahaLadder: [
      { step: 1, title: 'Whole Numbers in Disguise', intuition: 'Every normal integer like 5 is actually rational (5/1)—you just have 5 uncut single pizzas.' },
      { step: 2, title: 'Common Denominator is Common Language', intuition: 'You cannot add quarters and thirds directly because their slice sizes are different. You must cut both into twelfths so every piece speaks the same unit language.' },
      { step: 3, title: 'The Density Property', intuition: 'Between any two fractions, no matter how close, you can always zoom in and slice another fraction right down the middle.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Adding denominators together: 1/2 + 1/3 = 2/5.',
      realityCheck: '1/2 a pizza plus 1/3 a pizza is almost a whole pizza! 2/5 is less than half. Denominators only tell you slice size, they never add together.'
    }
  },

  'math-pythagoras-triangles': {
    visceralMetaphor: {
      headline: 'The Tiled Floor Square Puzzle',
      analogy: 'Imagine a right-angled triangular carpet on a hardwood floor. If you build square tile patios extending outwards from each of the two shorter edges, all the tiles from both patios will combine to perfectly tile the large square patio built along the longest diagonal edge.',
      physicalObject: 'Three square wooden trays filled with water or small ball bearings.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools reduce it to chant: "a squared plus b squared equals c squared", leading students to blindly square numbers without seeing that a² literally means a physical geometric square.',
      unmaskedTruth: 'The theorem is about actual geometric AREAS of squares attached to the triangle legs, which is why it only works when the two legs meet at a clean 90° corner.'
    },
    ahaLadder: [
      { step: 1, title: 'The Right-Angle Corner', intuition: 'The 90-degree corner ensures the two shorter sides do not lean toward or away from each other—they are completely perpendicular.' },
      { step: 2, title: 'Area Conservation', intuition: 'The square drawn on the hypotenuse has an area equal to the sum of the areas of the squares on the other two sides.' },
      { step: 3, title: 'Triangles that Scale', intuition: 'Similar triangles are just photo enlargements or shrinkages: angles stay identical, while every side stretches by the exact same multiplier.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming a + b = c (thinking the sum of the side lengths equals the diagonal).',
      realityCheck: 'Walking straight down the diagonal is ALWAYS shorter than walking along the two perpendicular sidewalks. The areas add, not the straight lengths.'
    }
  },

  'math-quadratic-equations': {
    visceralMetaphor: {
      headline: 'The Cannonball’s Flight & The Garden Wall',
      analogy: 'Imagine shooting an apple into the sky. It rockets up, slows to a pause at the peak, and arcs back down to the ground. A quadratic equation is the math of anything that speeds up or bends smoothly—like an expanding square or gravity’s parabolic trajectory.',
      physicalObject: 'A water fountain jet forming a smooth symmetrical arch in the air.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Forcing students to memorize the giant quadratic formula chant (-b ± √(b²-4ac)/2a) before explaining why the ± symbol is even there.',
      unmaskedTruth: 'The ± is there because a parabola is completely symmetrical! The axis of symmetry sits at -b/(2a), and the roots are simply equal distances to the left (-) and right (+) of that center line.'
    },
    ahaLadder: [
      { step: 1, title: 'The Square with Unknown Area', intuition: 'Quadratic means "square" (quadratus). You are solving for the unknown side length of a square whose area changes non-linearly.' },
      { step: 2, title: 'The Discriminant as a Ground Detector', intuition: 'b² - 4ac tells you if the cannonball hits the ground twice (positive), just grazes it at the turnaround point (zero), or stays in the sky never touching the floor (negative).' },
      { step: 3, title: 'Factoring as Shape Reconstruction', intuition: 'Factoring (x - p)(x - q) = 0 is just finding the two specific ground coordinates where the height drops to zero.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Taking the square root of both sides of x² = 9 and only writing x = 3.',
      realityCheck: '(-3) × (-3) is also +9! A square doesn’t care whether you march forward or backward; squaring destroys the minus sign.'
    }
  },

  'math-trigonometric-ratios': {
    visceralMetaphor: {
      headline: 'The Sunbeam Shadow Stick',
      analogy: 'Stick a 1-meter flagpole vertically in the sand on a sunny beach. As the sun climbs into the sky, the angle of the sunbeam changes the ratio between the flagpole’s height and the shadow’s length. Trigonometry is simply the universal lookup table for shadow-to-stick ratios at every sun angle.',
      physicalObject: 'A sundial with an angled gnomon casting a crisp shadow.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools barrage students with six greek-sounding names (Sine, Cosine, Tangent, Cosecant, Secant, Cotangent) and "SOH-CAH-TOA" without telling them what these words actually measure.',
      unmaskedTruth: 'Every right triangle with a 30° angle has the exact same proportions, whether it is a tiny drawing in your notebook or a giant skyscraper reaching into the clouds. Sine is just "percentage of height relative to the slope".'
    },
    ahaLadder: [
      { step: 1, title: 'Angles Dictate Proportions', intuition: 'If the slope angle is fixed, the triangle cannot change its shape, only its size. The ratio of opposite to hypotenuse is locked in stone.' },
      { step: 2, title: 'Sine is Height, Cosine is Ground', intuition: 'Imagine a wheel of radius 1: Sine tells you how high you are off the ground, Cosine tells you how far forward from the axle you have traveled.' },
      { step: 3, title: 'Tangent is Steepness', intuition: 'Tangent is simply Rise over Run—how many meters you climb vertically for each single meter you walk forward horizontally.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking sin(θ) means "sin multiplied by θ".',
      realityCheck: 'Sin is not a number; it is an action, like a recipe or machine. Sin(30°) asks the machine: "For a 30-degree ramp, what fraction is the vertical rise?"'
    }
  },

  'math-coordinate-geometry': {
    visceralMetaphor: {
      headline: 'The City Street Grid & GPS Map',
      analogy: 'Imagine Manhattan or Chandigarh where every street is numbered. If you tell a friend "meet me at 4th Avenue and 7th Street", they know the exact intersection without ambiguity. Coordinate geometry turns shapes into street addresses.',
      physicalObject: 'A transparent sheet of graph paper overlaid on a real-world city map.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Giving students complex formulas like the Distance Formula √((x₂-x₁)² + (y₂-y₁)²) without pointing out that it is literally just the Pythagorean Theorem in disguise.',
      unmaskedTruth: '(x₂ - x₁) is just the horizontal sidewalk length, (y₂ - y₁) is the vertical sidewalk length, and the distance between them is the diagonal hypotenuse!'
    },
    ahaLadder: [
      { step: 1, title: 'The Origin is Home', intuition: '(0,0) is simply the town square where all distance measurements begin.' },
      { step: 2, title: 'Right-Triangle Walking', intuition: 'To measure distance between any two points, construct an imaginary right triangle and use a² + b² = c².' },
      { step: 3, title: 'The Midpoint is the Fair Meeting Spot', intuition: 'To find the exact midpoint, just average the two X addresses and average the two Y addresses.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Mixing up the order of coordinates, plotting (y, x) instead of (x, y).',
      realityCheck: 'Alphabetical order: X comes before Y. You must walk along the ground to the elevator before you ride the elevator up.'
    }
  },

  'math-mensuration-surface-volumes': {
    visceralMetaphor: {
      headline: 'The Gift Wrap vs. The Water Tank',
      analogy: 'Surface area is how much wrapping paper you need to cover a gift box completely without overlaps. Volume is how many 1-centimeter ice cubes or drops of water fit inside that box when hollow.',
      physicalObject: 'A hollow glass cube filled with liquid alongside a flat unfolded cardboard net.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing 20 distinct formula sheets for cylinders, cones, and spheres without understanding the common generative principle.',
      unmaskedTruth: 'Almost every prism or cylinder volume is simply: (Area of the Base shape) × (Height extruded). If you know how to calculate a 2D floor, you just stack those floors upwards!'
    },
    ahaLadder: [
      { step: 1, title: 'Dimensions as Counters', intuition: 'Length is 1D (meters of string), Area is 2D (square meters of carpet), Volume is 3D (cubic meters of water).' },
      { step: 2, title: 'The Extrusion Trick', intuition: 'A cylinder is just a circular coin stacked h times high: πr² × h.' },
      { step: 3, title: 'The Cone is 1/3 of the Can', intuition: 'If a cone and a cylinder have the exact same base and height, it takes exactly three full cones of water to fill the cylinder: V = 1/3 πr²h.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Doubling the radius of a sphere and thinking its volume doubles.',
      realityCheck: 'Volume scales with the CUBE of the dimension. Doubling the radius multiplies the volume by 2³ = 8 times!'
    }
  },

  'math-probability-foundations': {
    visceralMetaphor: {
      headline: 'The Colored Marble Bag & The Dartboard',
      analogy: 'Imagine a dark cloth bag with 3 red marbles and 7 blue marbles. If you reach in blindfolded, what is your chance of pulling red? It’s simply your target count (3) divided by all possible outcomes in the bag (10).',
      physicalObject: 'A standard six-sided pair of casino dice alongside a spinning roulette wheel.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools jump straight into set notation like P(A ∩ B) and permutation formulas, making simple counting feel like alien cryptography.',
      unmaskedTruth: 'Probability is just fair fractions: (What you care about) ÷ (Everything that can possibly happen).'
    },
    ahaLadder: [
      { step: 1, title: 'The 0 to 1 Spectrum', intuition: '0 means completely impossible (rolling an 8 on a six-sided die); 1 means 100% guaranteed (the sun rising tomorrow).' },
      { step: 2, title: 'Independent Means Memoryless', intuition: 'A coin does not remember its last flip. Even if it landed on Heads 10 times in a row, the next flip is STILL exactly 50/50.' },
      { step: 3, title: 'Complement Rule Saves Time', intuition: 'Instead of counting 99 complicated winning ways, just calculate the 1 single losing way and subtract it from 1.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'The Gambler’s Fallacy: "Red has come up 5 times, so Black is overdue!"',
      realityCheck: 'Dice, coins, and roulette wheels have no brains, memory, or cosmic guilt. Each trial starts fresh with identical odds.'
    }
  },

  'math-statistics-measures': {
    visceralMetaphor: {
      headline: 'The Teeter-Totter Fulcrum & The Middle Kid in Line',
      analogy: 'Imagine all students standing on a long seesaw based on their exam scores. The Mean (average) is the exact balance point where the seesaw hovers flat. The Median is simply the student standing in the dead center if you lined everyone up from shortest to tallest.',
      physicalObject: 'A wooden ruler balanced on a pencil pivot with pennies stacked at different inch markers.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teaching Mean, Median, and Mode as identical synonyms for "average" without showing why one outlier ruins the mean.',
      unmaskedTruth: 'If 9 regular workers in a coffee shop make $30,000 and Elon Musk walks in making $30 billion, the Mean salary becomes $3 billion! The Median stays at $30,000, revealing the real everyday truth.'
    },
    ahaLadder: [
      { step: 1, title: 'Mean balances weights', intuition: 'Mean adds all values and divides equally—great for evenly distributed data, vulnerable to extreme spikes.' },
      { step: 2, title: 'Median ignores extremes', intuition: 'Median only cares about order and ranking, making it robust against millionaires and test anomalies.' },
      { step: 3, title: 'Mode is the popularity vote', intuition: 'Mode is simply the single number that appears most frequently on the scorecard.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming the average (mean) represents the majority of people.',
      realityCheck: 'Almost everyone has more than the average number of legs (because a few people have 1 or 0 legs, pulling the mean down to 1.99).'
    }
  },

  'math-arithmetic-progressions': {
    visceralMetaphor: {
      headline: 'The Uniform Wooden Staircase',
      analogy: 'Imagine climbing a staircase where every single step is built to exact 15 cm height. If you start on step 1 and take 10 steps, you know your height instantly because each step adds the exact same constant riser.',
      physicalObject: 'A wooden carpenter’s folding ruler unfolding section by uniform section.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing tn = a + (n - 1)d and wondering why the formula has "(n - 1)" instead of "n".',
      unmaskedTruth: 'Because you are ALREADY standing on the first step (a) at the start! To reach the 5th step, you only need to take 4 jumps forward, not 5.'
    },
    ahaLadder: [
      { step: 1, title: 'The Constant Jump', intuition: 'An Arithmetic Progression is defined by a single constant number: the difference d added at every single step.' },
      { step: 2, title: 'The Gauss Pairing Trick', intuition: 'To add 1 to 100, pair 1+100=101, 2+99=101, 3+98=101. Every pair gives the same sum, giving n/2 pairs!' },
      { step: 3, title: 'Discrete Linear Line', intuition: 'An AP is just a linear equation (y = mx + c) where you only look at whole counting steps (x = 1, 2, 3).' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Calculating the 10th term by multiplying the first term by 10.',
      realityCheck: 'You only multiply the common difference d by 9 jumps, then add the starting value a.'
    }
  },

  'math-circles-theorems': {
    visceralMetaphor: {
      headline: 'The Pinned String & The Stadium Spotlight',
      analogy: 'Tie a piece of non-stretching string to a pushpin stuck in corkboard. Pull the pencil taut and swing it around. Every single point on that drawn pencil path is at the exact same distance from the pushpin. That is all a circle is: pure equidistant symmetry.',
      physicalObject: 'A compass with a metal spike and graphite pencil arm.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools present 15 separate circle theorems (angle at center is double angle at circumference, cyclic quadrilaterals, alternate segment theorem) as isolated memorization drills.',
      unmaskedTruth: 'Every circle theorem is an inevitable consequence of two facts: radii are all equal (creating hidden isosceles triangles), and the total turn around a point is 360°.'
    },
    ahaLadder: [
      { step: 1, title: 'The Equidistant Boundary', intuition: 'Every line drawn from the center to the edge has identical length r. Connect two radii with a chord and you always get an isosceles triangle.' },
      { step: 2, title: 'The Center Angle is Double', intuition: 'Standing at the center gives you twice the viewing angle of standing all the way back at the stadium bleachers looking at the same stage.' },
      { step: 3, title: 'Tangents are Perpendicular', intuition: 'A tangent touches the circle at only one microscopic point. The radius meeting that point must be at a razor-sharp 90° angle.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a chord passes through the center.',
      realityCheck: 'A chord connects ANY two rim points. Only the longest chord that passes through the exact center gets the title of "diameter".'
    }
  },

  'math-polynomials-factorisation': {
    visceralMetaphor: {
      headline: 'Breaking LEGO Sculptures into Basic Bricks',
      analogy: 'Imagine a composite LEGO castle. Factorisation is taking the big finished castle apart and showing the small indivisible prime bricks that snapped together to build it. Expanding multiplies the bricks out; factoring reveals the original components.',
      physicalObject: 'A set of interlocking prime-colored toy blocks.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Splitting the middle term using mysterious trial-and-error number games without explaining what roots actually tell you.',
      unmaskedTruth: 'A polynomial is like a roller coaster track. Factoring it into (x - 2)(x + 3) immediately tells you the exact checkpoints where the roller coaster car touches the ground (x = 2 and x = -3).'
    },
    ahaLadder: [
      { step: 1, title: 'Zero Product Rule', intuition: 'If two mystery numbers multiply to 0 (A × B = 0), at least one of them MUST be 0! There is no other way to get zero in multiplication.' },
      { step: 2, title: 'Remainder Theorem Intuition', intuition: 'Plugging a number k into P(x) is like testing if that number fits the lock. If P(k) = 0, (x - k) is an exact key with zero remainder.' },
      { step: 3, title: 'Degree Equals Turning Limit', intuition: 'A polynomial of degree 3 (x³) can cross the ground at most 3 times and make at most 2 roller-coaster turns.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'If (x - 4)(x + 2) = 10, concluding x - 4 = 10 or x + 2 = 10.',
      realityCheck: 'The zero product rule ONLY works for zero! If the right side is 10, it could be 1×10, 2×5, -2×-5. You must expand, subtract 10, and reset the right side to 0 first.'
    }
  },

  'math-algebraic-expressions-identities': {
    visceralMetaphor: {
      headline: 'The Expanding Modular Patio Tile',
      analogy: 'Take a square garden patio of side a. Expand the length and width by adding a strip b on both sides. The new total area (a + b)² is made of four physical pieces: one big square a², two identical rectangles a×b, and one small corner square b².',
      physicalObject: 'A wooden geometric puzzle set with square and rectangular tiles.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students memorize (a + b)² = a² + 2ab + b² as a string of letters, and inevitably forget the middle term "2ab".',
      unmaskedTruth: 'If you only square a and square b, you left out the two large rectangular wings of the patio! The 2ab is not an algebra trick; it is two physical rectangular regions.'
    },
    ahaLadder: [
      { step: 1, title: 'Identities are True for ALL Numbers', intuition: 'An equation is only true for specific answers (like x = 3). An identity is an unbreakable universal truth that works for any number you pick.' },
      { step: 2, title: 'Difference of Squares Cancels the Wings', intuition: '(a + b)(a - b) = a² - b² because the two rectangular wings have opposite signs (+ab and -ab), canceling each other out completely.' },
      { step: 3, title: 'Algebra as Shorthand Arithmetic', intuition: 'Instead of calculating 99² by hand, think (100 - 1)² = 10000 - 200 + 1 = 9801. Identities are mental shortcuts for real numbers.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Writing (a + b)² = a² + b² (The "Freshman’s Dream").',
      realityCheck: 'Test with numbers: (3 + 4)² = 7² = 49. But 3² + 4² = 9 + 16 = 25! 49 does not equal 25. The missing 24 is the 2×3×4 middle term.'
    }
  },

  'math-commercial-arithmetic': {
    visceralMetaphor: {
      headline: 'The Snowball Rolling Downhill & The Store Price Tag',
      analogy: 'Simple interest is like a bank giving you the exact same fixed pocket money every month. Compound interest is a snowball rolling downhill: as it rolls, the snow stuck to it starts collecting its OWN snow, growing faster and faster with every turn.',
      physicalObject: 'A glass savings jar where each month’s interest coins start earning baby coins of their own.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Blinding students with multi-step formulas A = P(1 + r/n)^(nt) without explaining what the base multiplier (1 + r) represents.',
      unmaskedTruth: 'The "1" keeps your original money safe, and the "+ r" adds your profit. Multiplying by 1.10 just means "keep 100% of my principal and give me 10% extra".'
    },
    ahaLadder: [
      { step: 1, title: 'Percentage is "Per Hundred"', intuition: '18% GST means for every 100 rupees or dollars you spend, the government takes 18. That’s just a 0.18 multiplier.' },
      { step: 2, title: 'Simple vs. Compound', intuition: 'Simple interest only pays on the original seed. Compound interest pays interest on your accumulated interest.' },
      { step: 3, title: 'Discounts do not simply add', intuition: 'A 20% discount followed by another 20% discount is NOT a 40% discount! The second discount only shaves money off the already-reduced price.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a 50% loss can be recovered by a 50% gain.',
      realityCheck: 'If you have $100 and lose 50%, you have $50. If you now gain 50% on that $50, you only have $75! You need a 100% gain to get back to $100.'
    }
  }
};
