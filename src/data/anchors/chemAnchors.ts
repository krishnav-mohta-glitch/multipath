import type { FeynmanAnchor } from '../../types/topic';

export const CHEM_ANCHORS: Record<string, FeynmanAnchor> = {
  'chem-periodic-table': {
    visceralMetaphor: {
      headline: 'The Grand Apartment Tower of Elements',
      analogy: 'Imagine a high-rise apartment building where every floor (period) corresponds to a new electron shell, and every vertical column (group) houses families with identical personalities. Group 1 elements are hyperactive extroverts desperate to give away one shoe (electron); Group 17 are greedy collectors who will steal that shoe to complete their set.',
      physicalObject: 'A wooden display case containing pure ampoules of copper, sulfur, and carbon.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teachers make students memorize atomic numbers and electron configuration notations (1s² 2s² 2p⁶) like random telephone numbers.',
      unmaskedTruth: 'The periodic table is arranged by outermost (valence) electrons! Elements in the same vertical column behave almost identically because other atoms only ever touch their outermost shell.'
    },
    ahaLadder: [
      { step: 1, title: 'The Octet Rule is Low-Energy Peace', intuition: 'Atoms aren’t conscious, but having a full outer shell (usually 8 electrons, like noble gases) minimizes electrical potential energy—the ultimate state of chemical tranquility.' },
      { step: 2, title: 'Ionic is Theft, Covalent is Sharing', intuition: 'When an electro-greedy atom meets an electro-generous atom, it rips an electron away (ionic bond); when two greedy atoms meet, neither gives up, so they hold hands and share electrons (covalent bond).' },
      { step: 3, title: 'Trends are Atomic Geometry', intuition: 'As you move right, more positive protons pull the electron cloud tighter (atoms shrink); as you move down, new shells are added, making atoms larger and valence electrons looser.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking all chemical bonds are either 100% ionic or 100% covalent.',
      realityCheck: 'Bonding is a continuous spectrum! Most bonds are polar covalent—one atom tugs the shared electrons closer, creating partial positive (δ+) and partial negative (δ-) poles, like in water.'
    }
  },

  'chem-chemical-reactions': {
    visceralMetaphor: {
      headline: 'The Grand Ballroom Dance Partner Swap',
      analogy: 'Imagine 50 dancing couples on a ballroom floor. When the tempo changes, partners break grip and latch onto new partners with whom they have stronger chemistry. No dancers enter the hall and none leave—every single person is accounted for, just holding different hands.',
      physicalObject: 'A glowing test tube where mixing clear liquids instantly creates a bright yellow precipitate.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Treating balancing equations as a dry algebraic riddle with coefficients without visualizing the conservation of actual physical atoms.',
      unmaskedTruth: 'Atoms are indivisible in chemical reactions. Balancing an equation is simply honoring the unbreakable law of conservation of mass: you cannot conjure an oxygen atom out of thin air or delete one into the void.'
    },
    ahaLadder: [
      { step: 1, title: 'Subscripts vs Coefficients', intuition: 'H₂O means the molecule has 2 hydrogens bonded to 1 oxygen (you cannot change this subscript without making a poison!). 2 H₂O means you hold two entire water bottles in your hands.' },
      { step: 2, title: 'The Four Classical Types', intuition: 'Combination (A + B → AB), Decomposition (AB → A + B), Single Displacement (bullies take a partner), Double Displacement (swapping dance partners).' },
      { step: 3, title: 'Activation Energy Barrier', intuition: 'Wood wants to burn into ash because ash is at lower energy, but it won’t burn on its own—it needs a spark match to push it over the energy activation hump.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Changing the small subscript numbers inside chemical formulas to balance an equation (e.g. turning CO₂ into CO₃).',
      realityCheck: 'Changing subscripts creates entirely different chemicals! You can only place big multiplier numbers (coefficients) in front of the whole molecule.'
    }
  },

  'chem-acids-bases-salts': {
    visceralMetaphor: {
      headline: 'The Proton Cannon vs. The Proton Vacuum Cleaner',
      analogy: 'An acid is a molecule carrying an unstable naked proton (H+) looking for any excuse to fire it away. A base is a molecule with a hungry open trap (OH-) looking to catch and capture that free proton. When they collide, the cannonball and vacuum snap together to create harmless neutral water (H₂O) and common salt.',
      physicalObject: 'Red and blue litmus paper strips changing color instantly when dipped in lemon juice or soap solution.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing the logarithmic pH formula (-log[H+]) before understanding what the 0 to 14 scale physically communicates.',
      unmaskedTruth: 'Because pH is logarithmic, pH 4 is not "one step" stronger than pH 5—it has 10 TIMES more acid protons! pH 3 has 100 times more acid than pH 5. It is an earthquake Richter scale for chemistry.'
    },
    ahaLadder: [
      { step: 1, title: 'The Taste & Feel Test', intuition: 'Acids taste sour (lemons, vinegar) and react with metals; bases taste bitter and feel slippery like wet soap.' },
      { step: 2, title: 'Neutralization is Water Forging', intuition: 'H+ from acid meets OH- from base to form H₂O. The leftover spectator ions crystallize into a salt (like Na+ and Cl- forming table salt NaCl).' },
      { step: 3, title: 'Universal Indicators', intuition: 'Indicators are delicate organic molecules that change their physical shape—and therefore their reflected color—depending on whether a proton is attached to them.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing all acids are deadly burns and all bases are gentle.',
      realityCheck: 'Concentrated sodium hydroxide (drain cleaner base) will dissolve flesh and blind eyes faster and more destructively than many acids! Extreme pH on either end is corrosive.'
    }
  },

  'chem-metals-nonmetals': {
    visceralMetaphor: {
      headline: 'The Communal Electron Sea vs. The Selfish Crystals',
      analogy: 'In a piece of solid copper or iron, all the metal atoms release their outer electrons into a giant communal ocean that sloshes freely across the entire lattice. In non-metals, each atom hoards its electrons in tight, localized covalent bonds.',
      physicalObject: 'A shiny silver spoon conducting heat from hot soup vs. a brittle piece of black coal snapping in half.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Listing physical properties (malleability, ductility, sonority) as a rote checklist to memorize for 5-mark exam questions.',
      unmaskedTruth: 'EVERY single metal property comes from that communal electron sea! Metals conduct electricity because electrons flow like water; metals can be hammered into thin foil without shattering because the atoms simply slide across the liquid electron glue.'
    },
    ahaLadder: [
      { step: 1, title: 'Malleability vs. Brittleness', intuition: 'Hit salt with a hammer: like charges align and shatter the crystal. Hit gold: the positive ions shift, but the electron sea immediately cushions the blow.' },
      { step: 2, title: 'The Reactivity Series', intuition: 'Potassium at the top gives away electrons violently in water; gold and platinum at the bottom cling to their electrons so tightly they never rust or tarnish.' },
      { step: 3, title: 'Metallurgy is Un-Rusting', intuition: 'Metals love oxygen, so in nature they are found locked as ores (oxides). Smelting uses carbon or electricity to steal the oxygen back and liberate pure metal.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking mercury is a non-metal because it is liquid at room temperature.',
      realityCheck: 'Mercury is 100% a metal! Its electron sea is just unusually configured, weakening atomic bonding so it melts at -38.8°C while maintaining stellar electrical conductivity.'
    }
  },

  'chem-carbon-compounds': {
    visceralMetaphor: {
      headline: 'The Universal Four-Handed LEGO Tinker-Toy',
      analogy: 'Carbon has exactly 4 valence electrons, meaning every single carbon atom has four sturdy hands. It can hold hands with other carbons to build endless straight chains, branched trees, closed rings, and 3D cages, bonding with hydrogen, oxygen, and nitrogen to craft the entire machinery of life.',
      physicalObject: 'A plastic ball-and-stick molecular model kit showing tetrahedral methane and a benzene ring.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'IUPAC nomenclature rules (meth, eth, prop, but, pent...) feel like an arbitrary Latin foreign language quiz.',
      unmaskedTruth: 'The names are simply exact coordinates for molecular LEGO: the prefix tells you the length of the carbon backbone (prop = 3 carbons), and the suffix tells you the chemical tool attached (-ol = alcohol, -oic acid = acid).'
    },
    ahaLadder: [
      { step: 1, title: 'Catenation Power', intuition: 'No other element forms stable bonds with itself as strongly or flexibly as carbon, allowing molecules with millions of linked atoms (DNA, proteins, plastics).' },
      { step: 2, title: 'Functional Groups are Power Tools', intuition: 'An alkane chain is just inert plastic scaffolding; adding an -OH group turns it into alcohol, adding a -COOH group turns it into sour vinegar.' },
      { step: 3, title: 'Isomers are Rearranged Identical Bricks', intuition: 'Two molecules can have the exact same chemical formula (like C₄H₁₀) but different 3D shapes, giving them different boiling points and biological properties.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming organic compounds can only be manufactured by living biological organisms.',
      realityCheck: 'In 1828, Friedrich Wöhler heated inorganic ammonium cyanate and created organic urea in a glass flask, proving organic chemistry is simply carbon chemistry, not a supernatural vital force.'
    }
  },

  'chem-structure-of-atom': {
    visceralMetaphor: {
      headline: 'The Fly in the Cathedral & The Cloud of Bees',
      analogy: 'If an atom were the size of a giant football stadium, the nucleus would be a tiny fly sitting on the 50-yard line, holding 99.95% of the stadium’s entire weight. The electrons are like a buzzing cloud of bees flashing in and out of existence throughout the entire stadium bleachers.',
      physicalObject: 'A hollow metallic spherical model showing a dense golden nucleus surrounded by orbital lobes.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Drawing atoms like solar systems where electrons orbit in neat little circular racetracks like tiny planets.',
      unmaskedTruth: 'Electrons do not orbit like planets! Quantum mechanics proves electrons are 3D probability clouds (orbitals) where an electron is smeared out across space until interacted with.'
    },
    ahaLadder: [
      { step: 1, title: 'Rutherford’s Gold Foil Revelation', intuition: 'Shooting alpha particles through gold foil showed that 99.9% pass straight through empty space—matter is almost entirely empty emptiness!' },
      { step: 2, title: 'Protons Define Identity, Neutrons Define Stability', intuition: 'Change the number of protons, you create a new element (6 is Carbon, 7 is Nitrogen). Change neutrons, you get an isotope (same chemistry, different weight).' },
      { step: 3, title: 'Photons are Quantum Leaps', intuition: 'When an electron drops from a high energy shell to a lower shell, it releases a single pure photon of light of exact wavelength—the atomic barcode seen in fireworks.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking electrons spiral into the positive nucleus because opposite charges attract.',
      realityCheck: 'Bohr and de Broglie proved electrons have wave properties. An electron orbital is a standing wave that cannot have a radius smaller than its fundamental wavelength without destroying its existence.'
    }
  },

  'chem-matter-states': {
    visceralMetaphor: {
      headline: 'The Conga Line, The Shopping Mall, and The Bumper Cars',
      analogy: 'In a solid (ice), people are locked arm-in-arm in a rigid conga line, shivering in place. In a liquid (water), people let go of hands and wander through a crowded shopping mall, brushing past each other. In a gas (steam), people are driving supersonic bumper cars, bouncing wildly off walls with vast empty spaces between them.',
      physicalObject: 'A sealed glass syringe containing air and water, showing air compressing easily while water refuses to budge.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Defining states only by shape and volume without explaining the microscopic tug-of-war between thermal kinetic energy and intermolecular attraction.',
      unmaskedTruth: 'Matter state is simply a temperature vs attraction contest: heat wants to tear molecules apart into chaos, while intermolecular attractions want to lock them into crystals.'
    },
    ahaLadder: [
      { step: 1, title: 'Incompressibility of Liquids and Solids', intuition: 'Liquids and solids already have atoms touching each other’s electron clouds, which repel fiercely. Gases are 99.9% empty space, so they compress easily.' },
      { step: 2, title: 'Evaporation Happens at ANY Temperature', intuition: 'Boiling requires the whole liquid to vaporize, but surface evaporation happens anytime high-speed outlier molecules randomly kick themselves free.' },
      { step: 3, title: 'Diffusion is Molecular Random Walks', intuition: 'Perfume spreads across a room because billions of air molecules continually collide and bounce in random directions (Brownian motion).' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing steam and water vapor are the white clouds you see coming out of a kettle.',
      realityCheck: 'Real water vapor is completely invisible! The white mist you see is already tiny condensed liquid water droplets suspended in cold air.'
    }
  },

  'chem-atoms-molecules-mole': {
    visceralMetaphor: {
      headline: 'The Baker’s Dozen for Giant Invisible Counts',
      analogy: 'A "dozen" means 12 (whether eggs, donuts, or elephants). A "mole" is simply the chemist’s giant counting word: exactly 6.022 × 10²³ items. Why that specific weird number? Because if you count out that many carbon-12 atoms, they weigh exactly 12 grams on a kitchen scale!',
      physicalObject: 'A flask containing exactly 18 mL of water (which contains exactly one mole, 6.022 × 10²³, of H₂O molecules).'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Avogadro’s number is introduced as a magical, terrifying constant without explaining that it is simply the conversion bridge between atomic mass units and grams.',
      unmaskedTruth: 'Single atoms are too feather-light to weigh on human scales. The mole is the bridge that lets you count atoms simply by placing a pile of powder on a laboratory balance.'
    },
    ahaLadder: [
      { step: 1, title: 'The Atomic Mass Bridge', intuition: 'Look at the periodic table: Carbon says 12.01. That means one atom weighs 12 amu, and ONE MOLE of carbon weighs exactly 12.01 grams.' },
      { step: 2, title: 'Molar Mass as Conversion Currency', intuition: 'Molar mass (g/mol) converts weight into atom counts, just as price per dozen converts cash into egg counts.' },
      { step: 3, title: 'Stoichiometry is Recipe Scaling', intuition: '2 H₂ + O₂ → 2 H₂O means 2 moles of hydrogen gas react with 1 mole of oxygen gas to make 2 moles of water—just like baking a cake.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking one mole of lead and one mole of helium have the same weight.',
      realityCheck: 'A dozen eggs and a dozen cars both have 12 items, but cars weigh vastly more. One mole of lead (207 g) has the same NUMBER of atoms as one mole of helium (4 g), but lead atoms are much heavier.'
    }
  },

  'chem-water-solutions': {
    visceralMetaphor: {
      headline: 'The Molecular Crowbar & The Dissolving Dance',
      analogy: 'Water is shaped like Mickey Mouse: the oxygen head is negatively charged (δ-), and the two hydrogen ears are positively charged (δ+). When salt crystals hit water, millions of water molecules swarm the crystal, wedging themselves between Na+ and Cl- like molecular crowbars and pulling them apart.',
      physicalObject: 'A glass of clear saltwater that conducts electricity and illuminates an LED bulb.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students confuse melting (turning a solid into liquid via heat) with dissolving (dispersing solute particles into solvent molecules).',
      unmaskedTruth: 'Sugar doesn’t melt in cold water! It dissolves because water’s polar attraction overcomes the weak intermolecular forces holding the sugar crystals together.'
    },
    ahaLadder: [
      { step: 1, title: 'Like Dissolves Like', intuition: 'Polar solvents (water) dissolve polar and ionic substances (salts, sugars). Non-polar solvents (gasoline, acetone) dissolve oils and grease.' },
      { step: 2, title: 'Saturation is a Full Hotel', intuition: 'A solvent can only hold so many solute particles at a given temperature. Once all solvent molecules are busy cradling solute, extra crystals simply pile at the bottom.' },
      { step: 3, title: 'Hard Water has Mineral Hitchhikers', intuition: 'Hard water contains dissolved calcium and magnesium ions that react with soap molecules to form an insoluble white scum.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming dissolved salt or sugar disappears or loses its mass.',
      realityCheck: 'If you dissolve 50 g of sugar in 100 g of water, the final solution weighs EXACTLY 150 grams! The solute is simply broken down into invisible individual molecules.'
    }
  },

  'chem-electrolysis-redox': {
    visceralMetaphor: {
      headline: 'The Electron Tug-of-War & The Chemical Battery',
      analogy: 'Redox is an electron relay race: Oxidation is losing an electron (OIL), Reduction is gaining an electron (RIG). In a battery, electrons flow through an external wire to power your smartphone while seeking a chemical partner with higher electron affinity.',
      physicalObject: 'Two graphite pencils submerged in saltwater connected to a 9V battery with bubbles streaming off both tips.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Remembering which electrode is positive/negative and which is cathode/anode in both electrolytic and galvanic cells.',
      unmaskedTruth: 'Anode ALWAYS means Oxidation (An Ox), Cathode ALWAYS means Reduction (Red Cat)—regardless of whether you are charging or discharging!'
    },
    ahaLadder: [
      { step: 1, title: 'OIL RIG Acronym', intuition: 'Oxidation Is Loss of electrons; Reduction Is Gain of electrons. One cannot happen without the other.' },
      { step: 2, title: 'Electrolysis Forces Unfavorable Chemistry', intuition: 'Water never spontaneously splits into hydrogen and oxygen. Electrolysis uses electrical voltage like a crowbar to force the reaction in reverse.' },
      { step: 3, title: 'Electroplating Metal Coatings', intuition: 'By making a cheap iron spoon the cathode in a silver nitrate bath, silver ions gain electrons at the spoon surface and plate it in pure shiny silver.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking reduction means losing something because the word sounds like "reducing".',
      realityCheck: 'Reduction means REDUCING the electrical charge! Gaining a negative electron (-1) lowers (reduces) the oxidation state from +2 to +1.'
    }
  }
};
