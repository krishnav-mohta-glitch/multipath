/**
 * PROFESSOR DAVE EXPLAINS — SIMPLIFIED ELI5 STORY GENERATOR
 * 
 * Inspired by Dave Farina's teaching pedagogy (Professor Dave Explains):
 * - Conversational, upbeat, and crystal-clear ("Hey guys, Professor Dave here!")
 * - Zero dense textbook jargon or intimidating mathematical abstraction up-front.
 * - Everyday physical metaphors that a 5-year-old can picture in their mind.
 * - Deep, seamless connection to the student's chosen real-world passion (football, gaming, cricket, space, music, etc.).
 * - Clean, flowing narrative without cluttered nested card-in-card containers.
 */

import type { Topic } from '../types/topic';

export interface ProfessorDaveStory {
  topicId: string;
  topicTitle: string;
  greeting: string;
  hook: string;
  eli5Metaphor: {
    title: string;
    story: string;
    punchline: string;
  };
  passionConnection: {
    passionName: string;
    passionIcon: string;
    title: string;
    explanation: string;
    concreteNumbersOrScenario: string;
  };
  theGoldenRule: {
    ruleName: string;
    formula?: string;
    breakdownPoints: string[];
    summary: string;
  };
  theCommonTrap: {
    myth: string;
    reality: string;
  };
  quickCheck: {
    question: string;
    hint: string;
    answer: string;
  };
}

const PASSION_METADATA: Record<string, { name: string; icon: string }> = {
  football: { name: 'Football', icon: '⚽' },
  cricket: { name: 'Cricket', icon: '🏏' },
  gaming: { name: 'Gaming', icon: '🎮' },
  space: { name: 'Space & Astronomy', icon: '🚀' },
  music: { name: 'Music & Sound', icon: '🎵' },
  robotics: { name: 'Robotics & Tech', icon: '🤖' },
  anime: { name: 'Anime & Action', icon: '⚡' },
  cinema: { name: 'Cinema & Film', icon: '🎬' },
  art: { name: 'Visual Arts', icon: '🎨' },
};

export const CURATED_DAVE_STORIES: Record<string, Record<string, Partial<ProfessorDaveStory>>> = {
  // ---------------------------------------------------------------------------
  // FORCE AND PRESSURE (Physics)
  // ---------------------------------------------------------------------------
  'sci-8-force-pressure': {
    football: {
      hook: "Why does a high-heel shoe hurt a thousand times more when someone steps on your foot than if they step on you wearing a giant flat sneaker—even if the person weighs the exact same 60 kilograms?",
      eli5Metaphor: {
        title: "The Balloon and the Finger vs. The Sewing Pin",
        story: "Imagine holding a blown-up party balloon. If you press against it with your flat palm as hard as you can, the rubber just squishes and stretches. But touch the balloon with the microscopic tip of a sewing pin with barely any effort at all—POP! You used way less total push with the pin, but all of that force was concentrated into a microscopic point. That concentration is what physicists call Pressure. When you squeeze a push into a tiny space, the punch gets enormous!",
        punchline: "Big contact area = gentle spread. Tiny contact area = massive punch!"
      },
      passionConnection: {
        passionName: "Football",
        passionIcon: "⚽",
        title: "Why Strikers Wear 6-Stud Boots on Rain-Soaked Turf",
        explanation: "Now let's bring this to the pitch. Why do footballers wear sharp studs instead of flat sneakers on wet grass? If an 80kg striker runs onto wet turf in sneakers, their body weight is spread across a flat 200 cm² rubber sole. The wet grass acts like a slip-and-slide. But switch to 6 sharp aluminum studs? That exact same 80kg body weight is now shoved onto just 3 cm² of stud tips! That concentrates the pressure by almost 70 times—so the studs slice right through the wet slime and bite into the firm soil underneath. That's why you can cut sharply and sprint without wiping out!",
        concreteNumbersOrScenario: "Flat sneaker: 40,000 Pascals (glides on top). 6 Studs: 2,666,667 Pascals (bites deep). Same body weight, 70 times the localized grip!"
      },
      theGoldenRule: {
        ruleName: "The Master Rule: Pressure = Force ÷ Area",
        formula: "P = \\frac{F}{A}",
        breakdownPoints: [
          "Force (F): How hard you push down (measured in Newtons). More push = more pressure.",
          "Area (A): How wide or tiny the contact spot is (measured in square meters). Smaller spot = gigantic pressure!",
          "Want to pierce or cut (knives, nails, football studs)? Shrink the area to almost zero.",
          "Want to walk safely on soft snow or desert sand (snowshoes, camel paws)? Make the area huge so you don't sink!"
        ],
        summary: "Pressure is just a ratio: Force on top, Area on the bottom. Shrink the bottom number, and the pressure shoots to the moon."
      },
      theCommonTrap: {
        myth: "Heavier objects always create more pressure on the ground.",
        reality: "A giant 4-ton African elephant actually exerts less pressure on the ground than a 50kg ballet dancer standing on one single pointe shoe! The elephant has massive wide foot pads that spread its weight over huge areas, while the dancer concentrates all her weight on a tiny square centimeter of wood. Always look at the contact area!"
      },
      quickCheck: {
        question: "If you push twice as hard on a surface, but you ALSO double the contact area, what happens to the pressure?",
        hint: "Think about what happens when you multiply both the top and the bottom of a fraction by 2.",
        answer: "It stays the exact same! 2 divided by 2 is 1. The extra push is spread across twice as much room, so the pressure doesn't change at all."
      }
    },
    gaming: {
      hook: "In your favorite video games, why does a tiny sniper needle punch right through a boss's titanium armor, while a giant sledgehammer with the exact same energy only knocks them backward?",
      eli5Metaphor: {
        title: "The Sledgehammer vs. The Armor-Piercing Dart",
        story: "Think of an egg resting on a table. If you press a soft pillow down on it with 10 pounds of force, the egg is completely fine. But if you press a tiny pebble onto that exact same egg with just 2 pounds of force, CRACK! The egg doesn't care how much total force exists in the room; it only breaks when the force at one specific spot is high enough to snap its shell.",
        punchline: "Total force is just energy in the room. Pressure is what actually breaks things!"
      },
      passionConnection: {
        passionName: "Gaming",
        passionIcon: "🎮",
        title: "Game Engine Physics & Hitbox Vertex Penetration",
        explanation: "Game physics engines calculate damage by sampling impulse across mesh polygons. When a blunt hammer hits, its 500 Joules are divided across 2,500 polygon vertices—meaning each vertex feels a tiny trickle of stress. But when an armor-piercing projectile strikes, all 500 Joules hit a single vertex coordinate of near-zero area. The calculated local pressure instantly spikes past the shield material's rupture threshold, causing a critical armor breach!",
        concreteNumbersOrScenario: "Hammer: 500 N spread over 50x50 vertex mesh = negligible stress. Piercing needle: 500 N on 1 vertex = instantaneous threshold rupture."
      },
      theGoldenRule: {
        ruleName: "The Master Rule: Pressure = Force ÷ Area",
        formula: "P = \\frac{F}{A}",
        breakdownPoints: [
          "Force (F): The total hit or push you apply.",
          "Area (A): How many pixels or meters absorb that hit.",
          "High Area = Low Damage Density (shields, armor plates, trampolines).",
          "Low Area = Extreme Damage Density (darts, arrows, cutting edges)."
        ],
        summary: "Whenever you want to break through a barrier, minimize the surface area to maximize the punch."
      },
      theCommonTrap: {
        myth: "Higher raw damage stats always mean better armor penetration.",
        reality: "Penetration is strictly a function of pressure at the impact vector, not total damage points. A low-damage needle will pierce armor that deflects a massive blunt stone."
      },
      quickCheck: {
        question: "If an in-game shield can withstand 1,000,000 Pascals of pressure, which attack breaks it: 100 N over 0.001 m², or 100 N over 0.00005 m²?",
        hint: "Calculate 100 ÷ 0.001 (100,000) vs 100 ÷ 0.00005 (2,000,000).",
        answer: "The second one! 100 ÷ 0.00005 = 2,000,000 Pascals, which is double the shield's breaking limit!"
      }
    },
    cricket: {
      hook: "Why do fast bowlers wear long metal spikes that chew up the bowling crease, and how does a cricket ball's raised seam cut sharply sideways off the pitch?",
      eli5Metaphor: {
        title: "The Butter Knife vs. The Razor Blade",
        story: "Try cutting a tomato with the flat wide handle of a spoon. You end up squishing the whole tomato into juice. But take a razor-thin blade, and it glides through like magic with zero effort. Why? The razor blade doesn't need huge muscles; its edge is so microscopically thin that whatever gentle push you give it gets turned into huge cutting pressure.",
        punchline: "Thin edges bite and grip; wide surfaces bounce and glide."
      },
      passionConnection: {
        passionName: "Cricket",
        passionIcon: "🏏",
        title: "Crease Landing Stride & Seam Bite on Turf",
        explanation: "When a fast bowler lands in their delivery stride, their front foot slams down with over 5 times their body weight! On a smooth turf wicket, rubber soles would slip instantly and blow out their knee. The long metal spikes concentrate that enormous force onto tiny metal tips that dig deep into the turf clay for immovable anchor traction. And when the ball lands upright on its 2mm raised seam? All the ball's weight concentrates on that razor-thin strip, biting into the clay to deviate sharply sideways!",
        concreteNumbersOrScenario: "Cross-seam ball: hits flat on leather, low pressure, true bounce. Upright seam ball: hits on 2mm strip, high pressure, indents pitch for sharp turn!"
      },
      theGoldenRule: {
        ruleName: "The Master Rule: Pressure = Force ÷ Area",
        formula: "P = \\frac{F}{A}",
        breakdownPoints: [
          "Force (F): Downward gravitational and impact weight.",
          "Area (A): Surface contact zone.",
          "Seam contact (tiny strip) = immense localized indentation pressure.",
          "Flat leather contact (wide zone) = gentle distributed bounce."
        ],
        summary: "To grip or cut a surface, focus force into the narrowest possible contact line."
      },
      theCommonTrap: {
        myth: "Heavy cricket balls bite into the pitch more than lighter balls solely because of weight.",
        reality: "The seam orientation matters far more than mass. A ball landing cleanly on its seam exerts hundreds of times more pressure than a heavier ball landing flat."
      },
      quickCheck: {
        question: "Why do fielders catching a screaming cricket ball pull their hands back instead of slapping forward?",
        hint: "Pulling back extends the stopping time and spreads the impact over distance.",
        answer: "Pulling back increases the contact time, drastically lowering the impact force and reducing the painful pressure on their palms!"
      }
    }
  },

  // ---------------------------------------------------------------------------
  // LINEAR EQUATIONS (Mathematics)
  // ---------------------------------------------------------------------------
  'math-linear-equations': {
    football: {
      hook: "How do football managers figure out exactly how many matches a striker needs to play to hit a 25-goal bonus if they score at a steady pace of 0.5 goals every game?",
      eli5Metaphor: {
        title: "The Playground Seesaw That Can Never Tip",
        story: "Imagine a playground seesaw with two 5-year-old kids of the exact same weight balancing in the air. Perfectly level. Now, if you give one kid a heavy 5kg backpack, what happens? BANG! The seesaw crashes to the dirt. How do you fix it? You MUST give the other kid the exact same 5kg backpack! That is the only golden rule in all of algebra: whatever you do to the left side of the equals sign, you must do to the right side to keep the seesaw balanced.",
        punchline: "The '=' sign isn't a button you press; it's a balance scale that must stay level!"
      },
      passionConnection: {
        passionName: "Football",
        passionIcon: "⚽",
        title: "Predicting Points & Goal Tallies with y = mx + c",
        explanation: "Think of your team's league table points. In football, every win gives 3 points. If your team starts the second half of the season with 20 points, your total points (y) after playing (x) games is: Total Points = 3 × Games + 20. The 20 points you already have is your starting offset (c), and the 3 points per win is your steady rate of change (m). Want to know how many wins you need to reach 50 points? Just balance the equation: 50 = 3x + 20. Subtract 20 from both sides: 30 = 3x. Divide both sides by 3: x = 10 wins!",
        concreteNumbersOrScenario: "50 = 3x + 20 → 30 = 3x → x = 10 wins needed. Clean, predictable, and perfectly balanced."
      },
      theGoldenRule: {
        ruleName: "The Master Equation of Lines: y = mx + c",
        formula: "y = mx + c",
        breakdownPoints: [
          "y: Where you end up (Total points, total goals, total money).",
          "x: What you control (Matches played, hours trained, items bought).",
          "m (Slope): The constant rate of change (3 points per win).",
          "c (Intercept): The starting baseline (the points you already had at kick-off)."
        ],
        summary: "Linear means 'constant rate'. If slope is constant, you can predict the future in a straight line."
      },
      theCommonTrap: {
        myth: "Moving a number to the other side of the equals sign just magically flips its sign because of a memorized trick.",
        reality: "There's no magic! When 3x + 20 = 50 becomes 3x = 30, you didn't 'move' 20. You physically subtracted 20 from BOTH sides of the seesaw so the scales stayed level!"
      },
      quickCheck: {
        question: "If a player scores 2 goals every match, and already has 6 goals, how many more matches until they have 20 goals?",
        hint: "20 = 2x + 6. Subtract 6 from both sides, then divide by 2.",
        answer: "7 matches! 20 - 6 = 14, and 14 ÷ 2 = 7."
      }
    }
  }
};

/**
 * Universal Professor Dave Story Synthesizer
 * Generates an upbeat, ELI5 explanation for ANY topic and passion.
 */
export function getProfessorDaveStory(topic: Topic, passionId: string): ProfessorDaveStory {
  const pMeta = PASSION_METADATA[passionId] || { name: passionId.charAt(0).toUpperCase() + passionId.slice(1), icon: '✨' };
  
  // Check curated database first
  const curated = CURATED_DAVE_STORIES[topic.id]?.[passionId];
  if (curated) {
    return {
      topicId: topic.id,
      topicTitle: topic.title,
      greeting: `Hey everyone, Professor Dave here! Today we're exploring ${topic.title}—and we're going to make it crystal clear, dead simple, and grounded in real life.`,
      hook: curated.hook || `Have you ever wondered how ${topic.title} actually works when you strip away the dense formulas?`,
      eli5Metaphor: curated.eli5Metaphor || {
        title: `The Simple 5-Year-Old Picture`,
        story: `Think of ${topic.title} not as numbers on a blackboard, but as a simple physical trade-off you see every day. Whenever one piece moves, another piece responds to keep the system in balance.`,
        punchline: `Simple rules create predictable results!`
      },
      passionConnection: {
        passionName: pMeta.name,
        passionIcon: pMeta.icon,
        title: curated.passionConnection?.title || `${topic.title} in ${pMeta.name}`,
        explanation: curated.passionConnection?.explanation || `In the world of ${pMeta.name}, ${topic.title} governs how forces, energy, and decisions trade off against each other in real time.`,
        concreteNumbersOrScenario: curated.passionConnection?.concreteNumbersOrScenario || `Understanding this trade-off gives you total intuitive clarity over the entire topic.`
      },
      theGoldenRule: curated.theGoldenRule || {
        ruleName: `The Fundamental Invariant of ${topic.title}`,
        formula: undefined,
        breakdownPoints: [
          `First: Identify what quantity is staying constant.`,
          `Second: Notice which variable you can adjust.`,
          `Third: See how the output responds proportionally.`
        ],
        summary: `When you know what stays balanced, solving problems becomes second nature.`
      },
      theCommonTrap: curated.theCommonTrap || {
        myth: `Most people try to memorize the equations without picturing what is physically happening.`,
        reality: `Once you can picture the physical balance, you don't need to memorize anything—you can deduce the answer from scratch.`
      },
      quickCheck: curated.quickCheck || {
        question: `If you double the main input to this system, how does the output respond?`,
        hint: `Check whether the relationship is direct or inverse.`,
        answer: `It scales directly according to the fundamental conservation law!`
      }
    };
  }

  // Dynamic universal synthesizer
  return {
    topicId: topic.id,
    topicTitle: topic.title,
    greeting: `Hey everyone, Professor Dave here! Let's talk about ${topic.title}. We're going to strip away the academic jargon, look at what's really going on, and connect it directly to your passion for ${pMeta.name}.`,
    hook: `Why does ${topic.title} seem so intimidating in textbooks, when in reality it's just a simple balance rule that you already use in everyday life?`,
    eli5Metaphor: {
      title: `The 5-Year-Old Playground Picture`,
      story: `Imagine you're on a playground. If two friends have the exact same size snack box, everything is fair and balanced. If one friend gets an extra cookie, the other friend needs one too to keep things fair. That's all this concept is: nature's way of keeping score so that energy, matter, or mathematical truth is never lost.`,
      punchline: `Nature doesn't memorize formulas—nature just follows the balance!`
    },
    passionConnection: {
      passionName: pMeta.name,
      passionIcon: pMeta.icon,
      title: `How This Controls Everything in ${pMeta.name}`,
      explanation: `When you're engaged with ${pMeta.name}, you see this law in action constantly. Whether it's timing, force, energy transfer, or spatial positioning, the exact same rules that govern ${topic.title} dictate peak performance on the field, in the engine, or across the screen.`,
      concreteNumbersOrScenario: `Observe the trade-off: when you push on one variable, the system responds instantly to maintain equilibrium.`
    },
    theGoldenRule: {
      ruleName: `The Core Rule of ${topic.title}`,
      breakdownPoints: [
        `Cause: An input or force is applied to the system.`,
        `Mechanism: The system distributes that input across space or time.`,
        `Effect: The observable outcome changes in direct proportion to the input.`
      ],
      summary: `Keep your eye on the invariant relationship—that is where true mastery comes from.`
    },
    theCommonTrap: {
      myth: `Students often think this is just a set of isolated exam definitions to memorize for a test.`,
      reality: `It's not an abstract test question—it's a real-world tool that engineers, athletes, and scientists use every single day to predict outcomes before they happen.`
    },
    quickCheck: {
      question: `What is the single most important variable you need to know to predict the outcome in this scenario?`,
      hint: `Look at what is being held constant versus what is changing.`,
      answer: `The constant rate of exchange between the input and output variables!`
    }
  };
}
