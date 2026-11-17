import type { FeynmanAnchor } from '../../types/topic';

export const PHYSICS_ANCHORS: Record<string, FeynmanAnchor> = {
  'phys-newtons-laws': {
    visceralMetaphor: {
      headline: 'The Frictionless Air Hockey Table',
      analogy: 'Imagine an air hockey puck on a glass table with jets of air blasting underneath it. Give it one gentle tap. It doesn’t stop, slow down, or veer off—it glides in a straight line forever until it slams into the wall. Objects don’t want to stop; the invisible thief called friction steals their energy in daily life.',
      physicalObject: 'A smooth plastic air hockey puck floating on a cushion of compressed air.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Everyday human intuition says: "If I stop pushing my bicycle, it stops moving; therefore, continuous motion requires continuous force." Schools teach the first law without disproving this Aristotle trap first.',
      unmaskedTruth: 'Motion does NOT need a force to continue! Force is only needed to CHANGE motion (speed up, slow down, or turn). If space had friction, the planets would have crashed into the sun billions of years ago.'
    },
    ahaLadder: [
      { step: 1, title: 'Inertia is Mass Stubbornness', intuition: 'Mass is simply how stubborn an object is to having its velocity changed. Pushing an empty shopping cart is easy; pushing one filled with bowling balls requires huge effort.' },
      { step: 2, title: 'F = ma is an Acceleration Equation', intuition: 'Force does not cause velocity; force causes ACCELERATION (the rate at which velocity changes).' },
      { step: 3, title: 'Forces Always Come in Matched Pairs', intuition: 'You cannot touch something without it touching you back with the exact same strength. When you jump, your feet push the entire Earth downward with the exact same force the Earth pushes you up!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing heavier objects fall faster in a vacuum.',
      realityCheck: 'A heavier rock has more gravitational pull, but it also has proportionally more inertia (stubbornness). The two effects cancel out perfectly, so all objects accelerate at 9.8 m/s².'
    }
  },

  'phys-light-reflection': {
    visceralMetaphor: {
      headline: 'The Rubber Ball Bouncing Off a Hardwood Floor',
      analogy: 'Throw a tennis ball down at a smooth gym floor at a 30-degree angle. It bounces up off the floor at the exact same 30-degree angle on the other side. A light ray striking a mirror does the exact same thing: the bounce angle always mirrors the strike angle.',
      physicalObject: 'A handheld laser pointer bouncing off a flat glass mirror onto a chalk-dusted wall.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students draw ray diagrams mechanically with "normal lines" and sign conventions (+ and - focal lengths) without understanding what a virtual image actually is.',
      unmaskedTruth: 'A mirror doesn’t contain an image inside the glass! Light rays bounce off the mirror into your eyes, and your brain traces them backward in straight lines, hallucinating a copy of you standing behind the wall.'
    },
    ahaLadder: [
      { step: 1, title: 'The Normal Line as the Floor', intuition: 'The "normal" is just an imaginary perpendicular pole sticking out of the mirror to measure angles fairly.' },
      { step: 2, title: 'Angle of Incidence = Angle of Reflection', intuition: 'The incoming angle equals the outgoing angle—nature always takes the path requiring the least time.' },
      { step: 3, title: 'Curved Mirrors are Bent Spoons', intuition: 'A concave mirror caves in like a cave, bending rays together to a hot focus point; a convex mirror curves outward like a security mirror, spreading rays apart for a wider field of view.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a mirror reverses left and right.',
      realityCheck: 'A mirror does NOT reverse left and right; it reverses front and back! Raise your right hand, and the reflection raises the hand directly opposite your right hand.'
    }
  },

  'phys-light-refraction-lenses': {
    visceralMetaphor: {
      headline: 'The Shopping Cart Crossing from Concrete into Mud',
      analogy: 'Push a two-wheeled lawnmower or shopping cart from a smooth paved driveway diagonally into thick mud. The right wheel hits the mud first and slows down, while the left wheel keeps rolling fast on concrete. The cart naturally pivots and bends its direction toward the mud.',
      physicalObject: 'A glass prism splitting a beam of white sunlight into a spectrum on paper.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Throwing Snell’s Law (n₁ sin θ₁ = n₂ sin θ₂) at students without explaining why light bends at an interface.',
      unmaskedTruth: 'Light bends because it travels at different speeds in different materials! Light slows down in water and glass because it has to interact with atomic electrons along the way.'
    },
    ahaLadder: [
      { step: 1, title: 'Speed Drop Causes Pivoting', intuition: 'When light hits a denser medium at an angle, the side entering first slows down, causing the entire wave front to pivot toward the normal line.' },
      { step: 2, title: 'Refractive Index is a Speedometer', intuition: 'Index n = 1.5 means light travels 1.5 times slower in that glass than in empty space.' },
      { step: 3, title: 'Lenses are Back-to-Back Prisms', intuition: 'A convex lens is thick in the middle, so center rays delay longer than edge rays, focusing them all to a single bright point.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking light bends even when hitting the glass head-on (at 90 degrees).',
      realityCheck: 'If both wheels hit the mud at the exact same instant, the cart slows down but does not bend! Refraction requires an oblique angle to create a pivot.'
    }
  },

  'phys-current-electricity': {
    visceralMetaphor: {
      headline: 'The Water Slide Theme Park Circuit',
      analogy: 'Imagine a closed-loop water slide: The water pump is the battery (pumping water up to high pressure/potential). The water flowing through the pipes is the electric current. Narrow pipes or gravel traps are resistors that slow the flow down and convert kinetic energy into heat.',
      physicalObject: 'A small DC motor spinning with two wires connected to a 1.5V AA battery.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach Ohm’s law as V = IR and show circuit schematics where electrons supposedly race through wires like cars on empty highways.',
      unmaskedTruth: 'Electrons in a copper wire actually move at the speed of a crawling snail (drift velocity is ~1 mm per second)! The energy travels at near the speed of light as an electric field wave, like tapping one end of a packed pipe full of marbles.'
    },
    ahaLadder: [
      { step: 1, title: 'Voltage is Electrical Height/Push', intuition: 'Voltage is the push per unit charge (Joules per Coulomb)—the height of the water tower.' },
      { step: 2, title: 'Current is Flow Rate', intuition: 'Current (Amperes) is how many coulombs of charge pass through a cross-section per second—gallons per minute.' },
      { step: 3, title: 'Resistance is Pipe Narrowness', intuition: 'Thicker wires allow more charge to flow easily (low resistance); longer wires restrict the flow (high resistance).' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a lightbulb "consumes" or uses up electrons.',
      realityCheck: 'Every electron that enters the lightbulb leaves it on the other side! It consumes ENERGY (voltage drop), not charges. The current before and after a bulb is identical.'
    }
  },

  'phys-magnetic-effects': {
    visceralMetaphor: {
      headline: 'The Swirling Water Whirlpool Around a Moving Wire',
      analogy: 'Whenever water rushes down a drain, it creates a swirling vortex. Similarly, whenever electric charges move through a copper wire, an invisible swirling magnetic vortex wraps around that wire like invisible rings of smoke.',
      physicalObject: 'A magnetic compass needle deflecting when held next to a wire carrying DC current.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Making students memorize three different hand rules (Fleming’s Left-Hand, Right-Hand, and Right-Hand Grip) without understanding that electricity and magnetism are two sides of the same relativistic coin.',
      unmaskedTruth: 'A magnetic field is simply what an electric field looks like when charges are in motion relative to you! Moving electricity creates magnetism (electromagnets/motors), and moving magnets create electricity (generators).'
    },
    ahaLadder: [
      { step: 1, title: 'Current Generates Magnetic Rings', intuition: 'Wrap your right hand around a wire with your thumb pointing in the current direction—your fingers curl in the direction of the magnetic field.' },
      { step: 2, title: 'Motors: Magnet Pushes Current', intuition: 'Place a current-carrying wire inside an external magnetic field, and the conflicting fields push the wire sideways—that is how every electric motor spins.' },
      { step: 3, title: 'Generators: Induction', intuition: 'Push a magnet through a wire coil, and the moving magnetic field forces free electrons to march, generating electricity from mechanical work.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a stationary charge experiences a magnetic force.',
      realityCheck: 'Magnetic force (F = qvB sin θ) requires VELOCITY (v > 0). If a charge is sitting completely still, the strongest magnet in the universe will exert zero force on it.'
    }
  },

  'phys-work-energy-power': {
    visceralMetaphor: {
      headline: 'The Bank Account of the Universe',
      analogy: 'Energy is the universal currency of the cosmos. Potential energy is money safely deposited in a high-yield savings account (a boulder perched atop a mountain). Kinetic energy is cash in motion being actively spent (the boulder rolling down). You can transfer currency between accounts, but the total balance can never increase or decrease.',
      physicalObject: 'A pendulum swinging back and forth, trading height for speed at every oscillation.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students think "holding a heavy 50 kg barbell above your head for 10 minutes" is massive physical work because their muscles burn.',
      unmaskedTruth: 'In physics, Work = Force × Displacement in the direction of force (W = F·d). If the barbell doesn’t move any distance (d = 0), you did ZERO mechanical work on the barbell!'
    },
    ahaLadder: [
      { step: 1, title: 'Work is Energy in Transit', intuition: 'Work is the physical act of transferring energy from one object to another through a push or pull over a distance.' },
      { step: 2, title: 'Energy Conservation', intuition: 'Total mechanical energy (Kinetic + Potential) remains strictly constant in the absence of friction or drag.' },
      { step: 3, title: 'Power is Speed of Spending', intuition: 'Energy is how much work you can do; Power (Watts) is how quickly you do it (Joules per second). Climbing stairs slowly takes the same energy as sprinting up, but sprinting uses 10x more power.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Carrying a heavy suitcase while walking horizontally across an airport and thinking you are doing work against gravity.',
      realityCheck: 'Gravity pulls DOWN, but you are walking FORWARD (at 90 degrees). Since cos(90°) = 0, you do zero work against gravity while walking horizontally.'
    }
  },

  'phys-gravitation-planetary': {
    visceralMetaphor: {
      headline: 'The Cosmic Bowling Ball on a Trampoline',
      analogy: 'Imagine placing a heavy bowling ball in the middle of a stretched rubber trampoline sheet. It creates a deep bowl-shaped depression. Roll a marble onto the trampoline: it doesn’t fly in a straight line, it curves gracefully around the bowling ball in an orbit.',
      physicalObject: 'Two lead spheres on a sensitive torsion balance detecting mutual gravitational attraction.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students think astronauts on the International Space Station float because "there is no gravity in space".',
      unmaskedTruth: 'Gravity on the ISS (400 km up) is still 90% as strong as it is on Earth! Astronauts float because the station is falling toward Earth at 28,000 km/h, while moving sideways so fast that the Earth curves away underneath them at the exact same rate—they are in eternal freefall!'
    },
    ahaLadder: [
      { step: 1, title: 'Universal Attraction', intuition: 'Every single piece of matter in the cosmos attracts every other piece of matter, proportional to their masses and inversely proportional to the square of distance.' },
      { step: 2, title: 'Inverse-Square Weakening', intuition: 'Double your distance from Earth’s center, and gravity drops to 1/4. Triple the distance, and it drops to 1/9.' },
      { step: 3, title: 'An Orbit is Infinite Falling', intuition: 'Newton’s cannonball: shoot a cannonball fast enough horizontally, and the trajectory curve matches the curvature of Earth, creating a perpetual orbit.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Confusing Mass (kg) with Weight (Newtons).',
      realityCheck: 'Mass is the amount of atoms you are made of (invariant anywhere in the universe). Weight is the downward gravitational pull on those atoms (6x weaker on the Moon).'
    }
  },

  'phys-sound-wave-properties': {
    visceralMetaphor: {
      headline: 'The Compression Slinky & The Clapping Crowd',
      analogy: 'Take a long metal slinky toy stretched across the floor. Bunch up 10 coils at one end and release them. A pulse of squeezed coils (compression) travels all the way to the other end, followed by stretched coils (rarefaction). Individual coils only wiggle back and forth; the wave travels.',
      physicalObject: 'A vibrating tuning fork dipping into water, spraying droplets in rhythm.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Textbooks always draw sound as an up-and-down wavy squiggle (transverse wave), making students think air molecules fly up and down in waves.',
      unmaskedTruth: 'Sound is a LONGITUDINAL wave: air molecules bump forward and backward in the exact same direction the wave travels, like dominos bumping into each other.'
    },
    ahaLadder: [
      { step: 1, title: 'Sound Requires a Medium', intuition: 'Sound is mechanical vibrations passed from atom to atom. In the vacuum of outer space, there are no air atoms to bump, so complete silence reigns.' },
      { step: 2, title: 'Pitch is Frequency, Loudness is Amplitude', intuition: 'Frequency (Hertz) is how many times per second the drum vibrates (high pitch = bird whistle, low pitch = thunder); Amplitude is how hard the drum was hit.' },
      { step: 3, title: 'Echoes and the 17-Meter Rule', intuition: 'Human brains need 0.1 seconds to distinguish two separate sounds. Since sound travels at ~340 m/s in air, a wall must be at least 17 meters away for you to hear a clear echo.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking sound travels faster in air than in solid steel.',
      realityCheck: 'Sound travels fastest in dense solids (over 5000 m/s in steel) because atoms are tightly bound by stiff spring-like chemical bonds, passing vibrations almost instantly.'
    }
  },

  'phys-heat-thermodynamics': {
    visceralMetaphor: {
      headline: 'The Mosh Pit of Jiggling Atoms',
      analogy: 'Imagine a concert hall where everyone is dancing wildly. Temperature is simply the average speed of that chaotic mosh pit. In a cold ice cube, atoms are locked in place, shivering slightly. In boiling steam, atoms are sprinting across the room at supersonic speeds and slamming into walls.',
      physicalObject: 'A bimetallic strip bending when heated over a candle flame.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Treating Heat and Temperature as identical synonyms, and confusing "coldness" as a real physical substance.',
      unmaskedTruth: 'There is no such physical thing as "cold"! Cold is simply the absence of thermal energy. Your refrigerator doesn’t pump cold into food; it pumps thermal vibrations OUT of food and dumps them behind the fridge.'
    },
    ahaLadder: [
      { step: 1, title: 'Heat is Energy in Transit', intuition: 'Heat always flows spontaneously from the hotter object to the colder object until both reach thermal equilibrium.' },
      { step: 2, title: 'Specific Heat Capacity is Thermal Inertia', intuition: 'Water has immense specific heat—it takes an enormous amount of energy to heat up 1 liter of water, which is why oceans keep coastal climates mild.' },
      { step: 3, title: 'Latent Heat Breaks Bonds Without Heating', intuition: 'When ice melts into water at 0°C, adding heat doesn’t raise the temperature at all! The energy is busy breaking rigid crystal bonds.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Touching a metal table leg and a wooden tabletop in the same room and believing the metal is colder.',
      realityCheck: 'Both are at the exact same room temperature! Metal feels colder because it is a high-speed thermal conductor that robs heat from your warm finger 100x faster than wood.'
    }
  },

  'phys-fluid-pressure-buoyancy': {
    visceralMetaphor: {
      headline: 'The Submerged Beach Ball & The Water Column',
      analogy: 'Try pushing an inflated beach ball down into a swimming pool. The deeper you push it, the more violently the water fights to kick it back to the surface. Why? Because the water pressure pushing UP on the bottom of the ball is greater than the water pressure pushing DOWN on top of it.',
      physicalObject: 'A Cartesian diver pipette floating and sinking inside a squeezed plastic bottle.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing Archimedes’ Principle word-for-word ("Buoyant force equals the weight of displaced fluid") without seeing where this mysterious upward force comes from.',
      unmaskedTruth: 'Fluids have weight. The deeper you dive, the more heavy water sits above you, so pressure increases linearly with depth (P = ρgh). The pressure on the bottom of any object is always higher than the top, creating a net upward lift!'
    },
    ahaLadder: [
      { step: 1, title: 'Pressure Acts in All Directions', intuition: 'At any point in a liquid, pressure pushes equally in every direction—up, down, left, right.' },
      { step: 2, title: 'The Displaced Fluid Rule', intuition: 'If an iron ship weighs 10,000 tons, but its hollow hull pushes aside 15,000 tons of water, the upward buoyant force is 15,000 tons—so the ship floats easily.' },
      { step: 3, title: 'Hydraulic Multiplier (Pascal’s Law)', intuition: 'Squeeze liquid on a small 1 cm² piston with 10 N, and that pressure transmits through pipes to lift a 100 cm² piston with 1000 N—you multiply force by trading distance!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking heavy objects always sink and light objects always float.',
      realityCheck: 'A massive 100,000-ton aircraft carrier floats, while a tiny 1-gram iron nail sinks instantly. Floating depends entirely on DENSITY (mass per volume relative to water), not total weight.'
    }
  },

  'phys-motion-kinematics': {
    visceralMetaphor: {
      headline: 'The Highway Speedometer vs. The Odometer',
      analogy: 'Distance is the total reading on your car’s odometer after winding through neighborhood streets. Displacement is the straight-line crow’s flight distance from your driveway to your final parking spot with an arrow indicating direction.',
      physicalObject: 'A toy car rolling down an inclined aluminum track with digital photogate timers.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools bombard students with the three kinematics formulas (v = u + at, s = ut + 1/2 at², v² = u² + 2as) without showing that they are simply areas and slopes on a velocity-time graph.',
      unmaskedTruth: 'On a velocity-time graph: the SLOPE of the line is your acceleration, and the physical AREA under the curve is the exact distance traveled!'
    },
    ahaLadder: [
      { step: 1, title: 'Vectors Have Direction', intuition: 'Speed is just a scalar number (60 km/h). Velocity is a vector with a compass direction (60 km/h due North).' },
      { step: 2, title: 'Acceleration is Velocity Change', intuition: 'If you drive around a roundabout at a constant 30 km/h, your speed is constant, but your velocity is changing every millisecond—so you are accelerating toward the center!' },
      { step: 3, title: 'The Area Under the Curve', intuition: 'Distance = Average Velocity × Time. On a graph, that is just the area of a rectangle plus the area of a triangle: ut + 1/2 at².' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming zero velocity means zero acceleration.',
      realityCheck: 'Toss a ball straight up into the air. At the highest point of its flight, its velocity is exactly 0 m/s for a split second, but its acceleration is STILL 9.8 m/s² downward! If acceleration were zero, it would hover in the air forever.'
    }
  },

  'phys-radioactivity-nuclear': {
    visceralMetaphor: {
      headline: 'The Overstuffed Suitcase & Popcorn Kernels',
      analogy: 'Imagine a travel suitcase stuffed with so many winter coats and heavy boots that the zipper is bursting under tremendous stress. That is an unstable radioactive nucleus. Eventually, without warning, a zipper tooth snaps and pieces pop out to relieve the internal strain.',
      physicalObject: 'A Geiger-Müller radiation counter clicking irregularly near a piece of uranium ore.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Treating the half-life formula N(t) = N₀(1/2)^(t/T) as a deterministic countdown where atoms schedule their own demise.',
      unmaskedTruth: 'Decay is purely quantum probabilistic! You can never predict when one individual atom will decay—it could be in 2 seconds or 2 million years. But out of a trillion atoms, half are guaranteed to decay within the half-life period, just like a bowl of popcorn kernels in a microwave.'
    },
    ahaLadder: [
      { step: 1, title: 'The Strong Force vs. Electrostatic Repulsion', intuition: 'Protons hate each other because like charges repel. The Strong Nuclear Force acts like superglue, but only over microscopic distances. If the nucleus gets too big, glue can’t reach, and it becomes unstable.' },
      { step: 2, title: 'Three Types of Radiation', intuition: 'Alpha (heavy helium nucleus, stopped by paper), Beta (fast electron, stopped by aluminum), Gamma (high-energy light photon, stopped by thick lead).' },
      { step: 3, title: 'Mass-Energy Equivalence (E = mc²)', intuition: 'When heavy uranium splits (fission) or light hydrogen fuses, the products weigh slightly less than the starting ingredients. That tiny missing mass is converted into explosive energy.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing an object irradiated by gamma rays becomes radioactive itself.',
      realityCheck: 'Shining a flashlight on an apple doesn’t make the apple glow in the dark! Irradiating food or surgical tools kills bacteria, but does not leave behind radioactive atoms.'
    }
  }
};
