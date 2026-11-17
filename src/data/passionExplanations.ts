export interface PassionExplanation {
  passionId: string;
  passionTitle: string;
  inquiryHook: string;
  step1Setup: {
    title: string;
    description: string;
    scenario: string;
  };
  step2Mechanism: {
    title: string;
    scientificLaw: string;
    breakdown: string;
    connection: string;
  };
  step3Trap: {
    title: string;
    commonMyth: string;
    realityUnmasked: string;
  };
  step4Challenge: {
    prompt: string;
    hint: string;
    solution: string;
  };
}

export const TOPIC_PASSION_EXPLANATIONS: Record<string, Record<string, PassionExplanation>> = {
  // ---------------------------------------------------------------------------
  // FORCE AND PRESSURE (Class 8 / Class 9 Physics)
  // ---------------------------------------------------------------------------
  'sci-8-force-pressure': {
    football: {
      passionId: 'football',
      passionTitle: 'Football Pitch Grip, Stud Pressure & Free-Kick Aerodynamics',
      inquiryHook: 'Why does an 80kg striker slip uncontrollably on wet pitch grass wearing running sneakers, but cuts sharply and sprints without slipping in 6-stud boots?',
      step1Setup: {
        title: 'The Rain-Soaked Matchday Pitch',
        description: 'During a Champions League match on rain-soaked turf, players swap standard flat rubber soles for molded aluminum studs.',
        scenario: 'A running sneaker has a flat contact sole of roughly 200 cm² (0.02 m²). A pair of boots with 6 studs has a total tip contact area of only 3 cm² (0.0003 m²).'
      },
      step2Mechanism: {
        title: 'Pressure = Force ÷ Area In Action',
        scientificLaw: 'Pressure (P = F / A) in Pascals (N/m²)',
        breakdown: 'An 80kg striker exerts a downward gravitational force of ~800 N. In sneakers: P = 800 N / 0.02 m² = 40,000 Pa (0.4 atm) — the sole glides on top of slick wet grass. In studs: P = 800 N / 0.0003 m² = 2,666,667 Pa (26.6 atm) — almost 70 times more pressure!',
        connection: 'The magnified pressure forces the studs to penetrate past the slippery top layer of wet grass and bite deeply into the firm underlying soil, delivering immense frictional traction for acceleration.'
      },
      step3Trap: {
        title: 'The Matchday Misconception',
        commonMyth: 'Players think heavy boots give more grip because they weigh more.',
        realityUnmasked: 'Mass has very little to do with it; grip is created by concentrating the player\'s existing body weight onto minuscule surface areas to skyrocket the localized pressure.'
      },
      step4Challenge: {
        prompt: 'If a goalkeeper lands on one single stud of area 0.5 cm² (0.00005 m²) with a momentary impact force of 600 N, what pressure is exerted on the turf?',
        hint: 'Use P = F / A with area converted to square meters: 600 / 0.00005.',
        solution: '12,000,000 Pascals (12 MPa)! That is 120 atmospheres of instantaneous pressure.'
      }
    },
    gaming: {
      passionId: 'gaming',
      passionTitle: 'Game Engine Physics, Hitbox Pressure & Raycast Penetration',
      inquiryHook: 'In shooter or RPG physics engines, why does an armor-piercing sniper dart punch through boss shields while a blunt sledgehammer with equal kinetic energy only knocks the boss back?',
      step1Setup: {
        title: 'The Hitbox Impact Matrix',
        description: 'Game physics engines compute projectile damage and penetration by sampling impulse over contact mesh vertices.',
        scenario: 'Both weapons deal 500 Joules of energy, but the hammer spreads force over a 50x50 vertex polygon patch, while the dart focuses on a single vertex coordinate.'
      },
      step2Mechanism: {
        title: 'Mesh Vertex Stress & Penetration Threshold',
        scientificLaw: 'Mechanical Stress & Pressure (P = F / A)',
        breakdown: 'A physics engine checks if local pressure exceeds the armor material threshold. By shrinking the contact polygon area toward zero, the calculated pressure spikes asymptotically to infinity.',
        connection: 'The engine registers an armor rupture because localized pressure exceeded the vertex yield strength, even though total applied force was identical.'
      },
      step3Trap: {
        title: 'The Gamer Trap',
        commonMyth: 'More total damage stat automatically means higher penetration capability.',
        realityUnmasked: 'Penetration is purely a function of concentrated pressure at the impact vector, not the overall raw energy stat.'
      },
      step4Challenge: {
        prompt: 'A virtual sword strike exerts 1,000 N over an edge thickness of 0.001 m and contact length 0.1 m (Area = 0.0001 m²). What is the calculated pressure?',
        hint: 'P = F / A = 1,000 / 0.0001.',
        solution: '10,000,000 Pascals (10 MPa).'
      }
    },
    cricket: {
      passionId: 'cricket',
      passionTitle: 'Cricket Pitch Hardness, Spike Traction & Seam Indentation',
      inquiryHook: 'Why do fast bowlers wear long metal spikes that chew up the crease, and how does the raised seam of a cricket ball cut sideways off a dry pitch?',
      step1Setup: {
        title: 'The Bowler\'s Crease Delivery Stride',
        description: 'A fast bowler landing at the bowling crease subjects their front foot to over 5 times their body weight during the delivery stride.',
        scenario: 'Without spikes, landing on a polished turf wicket would cause disastrous knee buckling and slipping.'
      },
      step2Mechanism: {
        title: 'Seam Impact & Localized Pitch Indentation',
        scientificLaw: 'Pressure Distribution & Elastic Rebound',
        breakdown: 'When a ball lands upright on its 2mm raised seam, the entire 160g mass impact is absorbed across a razor-thin strip. This concentrates hundreds of thousands of Pascals of pressure onto the pitch surface, indenting the clay and gripping it for sharp sideways deviation.',
        connection: 'Cross-seam deliveries spread the impact across the wide ball leather, producing low pressure, zero pitch bite, and true predictable bounce.'
      },
      step3Trap: {
        title: 'The Commentary Trap',
        commonMyth: 'Commentators say "the pitch made the ball deviate on its own".',
        realityUnmasked: 'The pitch only indents because the raised seam created massive localized pressure to dig in and torque the trajectory.'
      },
      step4Challenge: {
        prompt: 'If a cricket ball hits the turf with 400 N force over a flat leather area of 10 cm² (0.001 m²) vs a seam area of 0.5 cm² (0.00005 m²), compare the two pressures.',
        hint: 'P_flat = 400 / 0.001; P_seam = 400 / 0.00005.',
        solution: 'P_flat = 400,000 Pa (4 atm); P_seam = 8,000,000 Pa (80 atm). The seam exerts 20x higher pressure!'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // PHOTOSYNTHESIS (Class 9 / 10 Biology / Science)
  // ---------------------------------------------------------------------------
  'bio-photosynthesis': {
    football: {
      passionId: 'football',
      passionTitle: 'Premier League Stadium Turf Photochemistry & Growth Rigs',
      inquiryHook: 'Why do modern covered football stadiums (like Wembley, Tottenham Hotspur, or the Santiago Bernabéu) park giant, glowing mobile lighting rigs across the pitch 24 hours a day between matches?',
      step1Setup: {
        title: 'The Enclosed Stadium Turf Crisis',
        description: 'Modern massive multi-tier grandstands block natural sunlight, creating deep shadow zones where pitch grass quickly dies and thins out.',
        scenario: 'Groundskeepers deploy massive motorized LED/sodium lamp arrays emitting specific red (660 nm) and blue (430 nm) wavelengths directly over the turf.'
      },
      step2Mechanism: {
        title: 'Chlorophyll Photons Fueling Carbohydrate Turf Reserves',
        scientificLaw: 'Light-Dependent Photolysis & Calvin Cycle Synthesis',
        breakdown: 'Turf grass chlorophyll pigments absorb red and blue photons to split water molecules (photolysis), generating ATP and NADPH. These energy carriers power the dark reaction to fix atmospheric CO₂ into glucose and cellulose starch.',
        connection: 'Without these artificial photon rigs, the grass cells starve of energy, cannot synthesize cellulose cell walls, and disintegrate when 22 players sprint across them on matchday.'
      },
      step3Trap: {
        title: 'The Groundsman Myth',
        commonMyth: 'People assume the lights are just heating the grass so it doesn\'t freeze.',
        realityUnmasked: 'Heat alone would dry and wither the turf. The lamps are tuned specifically to chlorophyll absorption peaks to drive photochemical ATP production.'
      },
      step4Challenge: {
        prompt: 'Why would illuminating the pitch with pure green light be a total waste of electricity for the stadium groundskeepers?',
        hint: 'Recall why grass looks green to the human eye.',
        solution: 'Chlorophyll reflects green light (500–550 nm) rather than absorbing it. Green light cannot excite electrons in photosystem reaction centers, yielding zero photosynthetic output!'
      }
    },
    gaming: {
      passionId: 'gaming',
      passionTitle: 'Survival Game Mechanics, Solar Energy Farming & Resource Conversion',
      inquiryHook: 'In Minecraft, Rust, or Factorio, how do automated bio-generators and greenhouse farms convert solar tick cycles into energy cells and biomass?',
      step1Setup: {
        title: 'The Closed-Loop Resource Engine',
        description: 'A biological cell is the ultimate biological engine: it takes abundant solar energy and raw atmospheric gas to craft dense fuel blocks.',
        scenario: 'Input: 6 H₂O + 6 CO₂ + Solar Light Energy -> Output: C₆H₁₂O₆ (Glucose fuel) + 6 O₂ (Breathable byproduct).'
      },
      step2Mechanism: {
        title: 'The Real-World Chemical Crafting Recipe',
        scientificLaw: 'Conservation of Mass & Photochemical Redox',
        breakdown: 'Light energy is harvested by antenna complexes like a solar panel grid, charging chemical batteries (ATP). Those batteries run the Calvin cycle assembly line, stitching carbon atoms into glucose sugar bricks.',
        connection: 'Every wooden block, crop harvest, and animal entity in the food chain is stored solar energy, originally minted by plant chloroplasts.'
      },
      step3Trap: {
        title: 'The Gamer Trap',
        commonMyth: 'Plants get their mass from the dirt soil they sit in.',
        realityUnmasked: 'Jan Baptist van Helmont proved centuries ago that soil mass stays nearly constant; the solid woody mass of a tree comes almost entirely from carbon dioxide gas extracted from thin air!'
      },
      step4Challenge: {
        prompt: 'If a greenhouse has abundant sunlight and water, but atmospheric CO₂ drops to 0.001%, why does plant growth completely stall?',
        hint: 'Think of Blackman\'s Law of Limiting Factors: an assembly line stops if one essential part runs out.',
        solution: 'CO₂ is the raw carbon substrate for glucose synthesis. Without CO₂, the Calvin cycle has no building blocks, making sunlight unusable as an energy source.'
      }
    }
  },

  // ---------------------------------------------------------------------------
  // NEWTON'S LAWS OF MOTION (Class 9 Physics)
  // ---------------------------------------------------------------------------
  'phys-newton-laws': {
    football: {
      passionId: 'football',
      passionTitle: 'Striker Volleys, Goalkeeper Reaction Times & Follow-Through Impulse',
      inquiryHook: 'Why does a striker\'s coach constantly shout "Follow through on your kick!" instead of just stabbing the foot at the ball and immediately pulling it back?',
      step1Setup: {
        title: 'The 30-Meter Screamer Volley',
        description: 'When striking a ball from outside the penalty box, the foot stays in contact with the leather for only about 10 to 15 milliseconds (0.015 s).',
        scenario: 'A ball arrives at 10 m/s; the striker wants to launch it at 35 m/s toward the top corner.'
      },
      step2Mechanism: {
        title: 'Impulse and Momentum Transfer (J = F · Δt = m · Δv)',
        scientificLaw: 'Newton\'s Second Law: F = dp/dt => F · Δt = m · (v_final - v_initial)',
        breakdown: 'Impulse (change in momentum) equals the average force multiplied by the duration of contact time (Δt). Following through extends foot contact by just 4 to 6 milliseconds.',
        connection: 'Increasing contact time by 40% with a full follow-through increases the total momentum transferred by 40%, rocketing the ball with devastating velocity without requiring the striker to strain harder.'
      },
      step3Trap: {
        title: 'The Striker\'s Trap',
        commonMyth: 'Players believe kicking harder is the only way to get a faster shot.',
        realityUnmasked: 'Contact duration (Δt) through a fluid kinetic follow-through delivers far greater impulse and exit velocity than raw muscular tension with an abrupt stop.'
      },
      step4Challenge: {
        prompt: 'A 0.45 kg football is accelerated from rest to 30 m/s. If the foot is in contact for 0.015 seconds, what average force did the striker apply?',
        hint: 'F = m · Δv / Δt = (0.45 · 30) / 0.015.',
        solution: 'F = 13.5 / 0.015 = 900 Newtons! That is equivalent to supporting the weight of a 90 kg person on your instep for a split second.'
      }
    },
    cricket: {
      passionId: 'cricket',
      passionTitle: 'Pull Shots, Catching Follow-Through & Inertia of the Bat',
      inquiryHook: 'Why does an outfielder always draw their hands backward when catching a stinging 140 km/h boundary strike rather than holding their hands rigid like brick walls?',
      step1Setup: {
        title: 'The Boundary Line Catch',
        description: 'A cricket ball weighs 160g and hurtles toward the boundary at 40 m/s. Catching it with rigid hands causes agonizing pain, bruised palms, and dropped catches.',
        scenario: 'Rigid hands stop the ball in 0.002 seconds. Pulling hands backward decelerates the ball over 0.040 seconds.'
      },
      step2Mechanism: {
        title: 'Spreading the Impulse Over Time to Halve the Peak Force',
        scientificLaw: 'Impulse-Momentum Theorem: F_average = Δp / Δt',
        breakdown: 'The momentum change Δp is identical in both cases: 0.16 kg · 40 m/s = 6.4 kg·m/s. Rigid hands: F = 6.4 / 0.002 = 3,200 Newtons. Soft hands pulled back: F = 6.4 / 0.040 = 160 Newtons.',
        connection: 'Pulling your hands back reduces the impact force by a staggering 20 times (from 3,200 N down to 160 N), protecting your bones and cushioning the ball into the palms.'
      },
      step3Trap: {
        title: 'The Rookie Fielder Myth',
        commonMyth: 'Beginners think soft hands means you have weak grip.',
        realityUnmasked: 'Soft hands is pure Newton\'s Second Law: maximizing deceleration time Δt to minimize impact force F.'
      },
      step4Challenge: {
        prompt: 'What happens to the impact force if a fielder stops a ball in half the original time?',
        hint: 'Force and time are inversely proportional for a given momentum change.',
        solution: 'Halving the contact time doubles the impact force felt on the hands.'
      }
    }
  }
};

/**
 * Fallback synthesizer for topics that don't have an explicit static override.
 * Translates any topic into the student's chosen passion using first principles.
 */
export function getPassionExplanation(
  topicId: string, 
  topicTitle: string,
  _subjectCategory: string,
  passionId: string
): PassionExplanation {
  const existing = TOPIC_PASSION_EXPLANATIONS[topicId]?.[passionId];
  if (existing) return existing;

  // Generic dynamic synthesizer based on passion
  const passionDisplayMap: Record<string, string> = {
    football: 'Football & Pitch Aerodynamics',
    cricket: 'Cricket Mechanics & Bowling Dynamics',
    gaming: 'Game Engine Physics & Logic Systems',
    space: 'Space Exploration & Orbital Mechanics',
    music: 'Music Production & Acoustic Waves',
    robotics: 'Robotics Sensors & Circuit Feedback',
    anime: 'Anime Action Dynamics & Energy Conversions',
    art: 'Visual Art Geometry & Optics',
    cinema: 'Cinematic Lighting & Optics'
  };

  const pTitle = passionDisplayMap[passionId] || `${passionId.toUpperCase()} Domain Applications`;

  return {
    passionId,
    passionTitle: `${topicTitle} • Grounded in ${pTitle}`,
    inquiryHook: `How does the core principle of ${topicTitle} manifest in the real-world domain of ${pTitle}?`,
    step1Setup: {
      title: `The ${pTitle} Scenario`,
      description: `In ${pTitle}, professionals and enthusiasts encounter the exact physical constraints of ${topicTitle} during high-stakes execution.`,
      scenario: `Every time a system interacts, underlying invariant relationships govern energy, force, momentum, and matter distribution.`
    },
    step2Mechanism: {
      title: 'The Core Scientific Law in Action',
      scientificLaw: `Fundamental Invariants of ${topicTitle}`,
      breakdown: `Instead of viewing ${topicTitle} as an isolated textbook formula, observe how variables trade off against one another in real time.`,
      connection: `When you master this invariant, predicting real-world outcomes in ${pTitle} becomes second nature.`
    },
    step3Trap: {
      title: 'The Common Intuitive Trap',
      commonMyth: 'Most learners assume that apparent surface appearances dictate the entire physical result.',
      realityUnmasked: 'Underlying invisible invariants (conservation laws, differential gradients, equilibrium balance) actually dictate the true outcome.'
    },
    step4Challenge: {
      prompt: `Apply the core relationship of ${topicTitle} to predict what happens when one key variable is doubled in this ${pTitle} scenario.`,
      hint: 'Inspect the governing equation and isolate which variable is held constant.',
      solution: 'The system responds proportionally to maintain equilibrium balance according to the fundamental conservation law.'
    }
  };
}
