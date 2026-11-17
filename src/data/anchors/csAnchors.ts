import type { FeynmanAnchor } from '../../types/topic';

export const CS_ANCHORS: Record<string, FeynmanAnchor> = {
  'cs-binary-search': {
    visceralMetaphor: {
      headline: 'The Phonebook Tear & The Number Guessing Game',
      analogy: 'If I pick a secret number between 1 and 1,000,000 and tell you "higher" or "lower" after each guess: don’t guess 1, 2, 3! Guess 500,000. If I say "higher", you have just eliminated half a million numbers with a single question. Repeat this, and you find the exact number in just 20 guesses.',
      physicalObject: 'A thick 2000-page telephone directory split cleanly in half with a ruler.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools show index pointer formulas (mid = (low + high) / 2) and off-by-one errors (while low <= high) without driving home the single requirement: SORTED ORDER.',
      unmaskedTruth: 'Binary search ONLY works if the data is already strictly ordered! In a messy closet, you have to search shirt by shirt (linear search O(N)). In an alphabetized dictionary, you can divide and conquer (O(log N)).'
    },
    ahaLadder: [
      { step: 1, title: 'The Precondition is Monotonicity', intuition: 'The items must increase or decrease steadily so that checking the middle element guarantees which half cannot contain your target.' },
      { step: 2, title: 'The Exponential Halving Power', intuition: 'Every step cuts the remaining suspects by 50%. A list of 4 billion items takes at most 32 comparisons (log₂ 4,000,000,000 ≈ 32)!' },
      { step: 3, title: 'Integer Overflow Prevention', intuition: 'In code, (low + high) / 2 can exceed maximum integer bounds for huge arrays; writing low + (high - low) / 2 prevents memory overflow.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Attempting to run binary search on an unsorted list or array.',
      realityCheck: 'If the list is jumbled, checking the middle tells you NOTHING about whether your item is to the left or right. It must be sorted first!'
    }
  },

  'cs-computational-thinking-algorithms': {
    visceralMetaphor: {
      headline: 'The Master Chef’s Robot Kitchen Recipe',
      analogy: 'An algorithm is not magical code; it is a crystal-clear recipe written for an obedient robot chef that has zero imagination and takes every word literally. If you tell the robot "put butter on bread", it will place the entire paper-wrapped stick of butter on the plastic bag unless you specify exact steps.',
      physicalObject: 'A flowchart printed on transparency film showing conditional diamonds and execution rectangles.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teaching Big-O notation (O(1), O(N), O(N²)) as scary college calculus formulas.',
      unmaskedTruth: 'Big-O is simply answering: "If my user list grows from 10 people to 10 million people, does my program slow down by 10 million steps (O(N)), or does it explode into 100 trillion steps and melt my server (O(N²))?"'
    },
    ahaLadder: [
      { step: 1, title: 'Decomposition Breaks Mountains', intuition: 'Take a giant terrifying problem (building an entire search engine) and break it into bite-sized sub-tasks (crawling, indexing, ranking).' },
      { step: 2, title: 'Pattern Recognition and Abstraction', intuition: 'Notice that finding the largest number, the fastest runner, and the highest grade all use the exact same algorithm: keep a running champion variable and update it.' },
      { step: 3, title: 'Time vs Space Tradeoff', intuition: 'You can make programs run faster by caching answers in memory (RAM), or save memory by recalculating on the fly when needed.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a faster computer makes bad algorithms acceptable.',
      realityCheck: 'An O(N²) algorithm on a multimillion-dollar supercomputer will quickly lose to an O(N log N) algorithm running on a cheap $50 smartphone as dataset size scales.'
    }
  },

  'cs-oop-classes-objects': {
    visceralMetaphor: {
      headline: 'The Cookie Cutter & The Baked Cookies',
      analogy: 'A Class is a steel cookie cutter blueprint. You cannot eat the cookie cutter. An Object is the actual ginger cookie stamped out of the dough, baked, frosted, and eaten. You can stamp 50 individual cookies (instances) from one single cutter, and decorate each with different colored sprinkles (state).',
      physicalObject: 'A blue plastic gingerbread-man cookie cutter alongside three baked cookies.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Bombarding students with the "Four Pillars" buzzwords: Encapsulation, Abstraction, Inheritance, Polymorphism without showing why procedural code turns into spaghetti.',
      unmaskedTruth: 'OOP is simply bundling data together with the functions that operate on that data, so one buggy part of your program cannot reach into another part and mess with its internal variables.'
    },
    ahaLadder: [
      { step: 1, title: 'Encapsulation is Private Compartments', intuition: 'Keep an object’s internal variables private, like the engine of a car locked under the hood; the driver only interacts with public pedals and steering wheel.' },
      { step: 2, title: 'Inheritance Shares Common DNA', intuition: 'A "SportsCar" class inherits all basic features from "Vehicle" (wheels, engine, brakes) without having to rewrite common logic from scratch.' },
      { step: 3, title: 'Polymorphism Speaks One Interface', intuition: 'Call animal.makeSound() on Dog, Cat, and Cow: each executes its own specific noise without the caller needing 20 "if-else" statements.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Modifying a class definition expecting already-instantiated objects to magically change their static snapshot values.',
      realityCheck: 'The class defines the shape, but each instantiated object owns its own independent memory allocation in the heap.'
    }
  }
};
