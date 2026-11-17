import type { FeynmanAnchor } from '../../types/topic';

export const BIO_ANCHORS: Record<string, FeynmanAnchor> = {
  'bio-photosynthesis': {
    visceralMetaphor: {
      headline: 'The Solar-Powered Sugar Bakery',
      analogy: 'Imagine a miniature factory where the power outlet is direct sunlight, the raw ingredients are invisible carbon dioxide gas scooped from the air and water sucked from roots. The factory splits water molecules, discards oxygen as scrap waste, and bakes high-energy glucose sugar bars.',
      physicalObject: 'A fresh green leaf held up to the sun showing intricate translucent veins.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach the chemical formula (6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂) and immediately drown students in the Thylakoid membrane, Photosystem II, ATP Synthase, and the Calvin Cycle without explaining the big picture.',
      unmaskedTruth: 'Plants don’t eat soil! Almost every atom of wood in a giant 100-ton oak tree came out of THIN AIR. Photosynthesis is the miraculous capture of solar photons into stable chemical carbon bonds.'
    },
    ahaLadder: [
      { step: 1, title: 'Light Phase Splits Water', intuition: 'Sunlight knocks electrons out of chlorophyll, splitting H₂O into oxygen waste and charging cellular rechargeable batteries (ATP & NADPH).' },
      { step: 2, title: 'Dark Phase (Calvin Cycle) Assembles Sugar', intuition: 'Even in darkness, the charged batteries fuse CO₂ molecules one by one into solid glucose sugar blocks.' },
      { step: 3, title: 'Chlorophyll Absorbs Blue & Red', intuition: 'Leaves look green because chlorophyll eagerly absorbs energetic blue and red photons, bouncing unused green light into your eyes.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing plants only do photosynthesis and never respire.',
      realityCheck: 'Plants respire 24 hours a day! At night with no sun, plants take in oxygen and breathe out CO₂ to power their cells, exactly like animals do.'
    }
  },

  'bio-cell-unit-of-life': {
    visceralMetaphor: {
      headline: 'The Walled Medieval Castle City',
      analogy: 'A living cell is a bustling metropolis: The cell membrane is the gated city wall with guarded customs gates (protein channels). The nucleus is the royal vault holding the architectural master blueprints (DNA). Mitochondria are the roaring coal-fire power plants supplying electricity (ATP), and ribosomes are 3D printers churning out proteins.',
      physicalObject: 'An onion epidermal skin peeled onto a microscope slide showing crisp rectangular cell walls.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing 15 organelles and their definitions (Golgi apparatus, Endoplasmic Reticulum, Lysosomes) like a glossary without seeing how they form an automated assembly line.',
      unmaskedTruth: 'A cell is an interconnected biochemical supply chain! The nucleus writes the mRNA recipe, ribosomes print the peptide chain, the ER folds it, the Golgi packages it into delivery vesicles, and motor proteins walk along microtubules to ship it.'
    },
    ahaLadder: [
      { step: 1, title: 'Phospholipid Bilayer Membrane', intuition: 'Molecules with water-loving heads and oil-loving tails naturally arrange into a two-layer bubble, creating an insulated microscopic chamber.' },
      { step: 2, title: 'Plant vs Animal Adaptations', intuition: 'Plants have rigid cellulose walls and water vacuoles to stand tall without skeletons; animals have flexible membranes for fast movement and muscles.' },
      { step: 3, title: 'Endosymbiotic Origin', intuition: 'Mitochondria and chloroplasts were once free-living ancient bacteria that took up permanent residence inside primitive cells billions of years ago!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking all living cells have a nucleus.',
      realityCheck: 'Bacteria and Archaea (prokaryotes) make up the vast majority of life on Earth and have zero nucleus or membrane-bound organelles—their DNA floats freely in the cytoplasm.'
    }
  },

  'bio-cell-division-genetics': {
    visceralMetaphor: {
      headline: 'The Master Blueprint Xerox Machine & The Shuffled Card Deck',
      analogy: 'Mitosis is taking a master instruction manual, photocopying every single page with near-zero errors, and handing one complete binder to each of two new identical daughter cells. Meiosis is shuffling two decks of cards (mother and father) and dealing half a deck to make unique reproductive sex cells.',
      physicalObject: 'A pair of striped socks demonstrating homologous chromosome pairs and crossing over.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'PMAT (Prophase, Metaphase, Anaphase, Telophase) is taught as a quiz on chromosome arm appearances rather than a mechanical system for splitting DNA without tangling.',
      unmaskedTruth: 'DNA is 2 meters long inside a microscopic nucleus! If you tried to divide without condensing it into tight chromosome spools, it would rip and knot like tangled headphone wires in your pocket.'
    },
    ahaLadder: [
      { step: 1, title: 'Interphase Copying', intuition: 'Before dividing, every single chromosome duplicates into two identical sister chromatids attached at the centromere.' },
      { step: 2, title: 'The Metaphase Tug-of-War', intuition: 'Spindle fibers attach to both sides and line chromosomes up at the equator, checking tension before ripping them cleanly to opposite poles.' },
      { step: 3, title: 'Mendelian Allele Shuffling', intuition: 'You get one allele from mom and one from dad. Dominant alleles mask recessive ones unless you inherit two copies of the quiet recessive trait.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Confusing Mitosis (body cell cloning) with Meiosis (gamete egg/sperm production).',
      realityCheck: 'Mitosis creates two IDENTICAL cells with full chromosomes (46). Meiosis creates four DIVERSE sex cells with half chromosomes (23) for reproduction.'
    }
  },

  'bio-respiration-metabolism': {
    visceralMetaphor: {
      headline: 'The Controlled Campfire & The Cellular Battery Charger',
      analogy: 'If you drop a marshmallow into a fire, it bursts into flame and dumps all its energy as heat and light at once. Cellular respiration is taking that exact same marshmallow and burning it in 30 microscopic, controlled steps, capturing 38 tiny packets of chemical ATP energy without burning down the cell.',
      physicalObject: 'A pulse oximeter clipped to a fingertip reading oxygen saturation and pulse rate.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students confuse breathing (lungs expanding to inhale air) with cellular respiration (mitochondria burning glucose for ATP).',
      unmaskedTruth: 'Lungs are just the shipping dock! The real customer for that inhaled oxygen is the electron transport chain inside the mitochondria of your toe cells, liver cells, and brain cells.'
    },
    ahaLadder: [
      { step: 1, title: 'Glycolysis is Sugar Snapping', intuition: 'In the cytoplasm, the 6-carbon glucose is snapped in half into two 3-carbon pyruvates, netting 2 quick ATP without needing any oxygen.' },
      { step: 2, title: 'The Krebs Cycle Strips Electrons', intuition: 'Inside mitochondria, pyruvate is dismantled, releasing CO₂ waste and loading high-energy electron carriers (NADH & FADH₂).' },
      { step: 3, title: 'The ATP Synthase Waterwheel', intuition: 'Protons pumped across the mitochondrial membrane rush back through a microscopic rotary motor (ATP synthase) that spins at 7000 RPM, churning out ATP.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking anaerobic respiration (fermentation) produces as much energy as aerobic respiration.',
      realityCheck: 'Without oxygen, you only get 2 ATP from glucose (plus lactic acid cramps). With oxygen, you extract over 32-36 ATP from the exact same sugar molecule!'
    }
  },

  'bio-circulatory-system': {
    visceralMetaphor: {
      headline: 'The Two-Loop Highway Plumbing System',
      analogy: 'The human heart is not one pump; it is two distinct pumps glued side by side. The right pump sends deoxygenated blood on a short loop to the lungs to pick up oxygen. The left pump is 3x thicker and more muscular, blasting that fresh red oxygenated blood out through the aorta highway to your entire body.',
      physicalObject: 'A stethoscope placing rhythmic "lub-dub" heart valve beats in your ears.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Anatomy diagrams show blue vessels on the right and red vessels on the left, making students believe blood actually turns blue inside their veins.',
      unmaskedTruth: 'Human blood is NEVER blue! Deoxygenated blood is deep dark maroon; oxygenated blood is bright scarlet. Medical diagrams only use blue ink to help students trace circulation paths on paper.'
    },
    ahaLadder: [
      { step: 1, title: 'Arteries Away, Veins Visit', intuition: 'Arteries carry high-pressure blood AWAY from the heart (thick elastic walls). Veins carry blood back to the heart (one-way flapper valves to prevent backflow).' },
      { step: 2, title: 'Capillaries are Microscopic Tollbooths', intuition: 'Capillaries are so narrow that red blood cells must march single-file, allowing oxygen and glucose to diffuse easily into tissues.' },
      { step: 3, title: 'The Double Circulation Advantage', intuition: 'By separating pulmonary (lung) pressure from systemic (body) pressure, birds and mammals maintain warm-blooded high-energy metabolisms.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming the pulmonary artery carries oxygen-rich blood because it is an artery.',
      realityCheck: 'The pulmonary artery goes AWAY from the heart to the lungs, so it carries deoxygenated blood! Artery/vein describes direction of travel, not oxygen content.'
    }
  },

  'bio-nervous-system-endocrine': {
    visceralMetaphor: {
      headline: 'The Fiber-Optic Cable vs. The Postal Delivery Van',
      analogy: 'Your body needs two communication networks: The nervous system is a high-speed fiber-optic network delivering electrical telegrams in milliseconds (jerking your hand away from a hot stove). The endocrine system is the postal mail service, dumping hormone chemical letters into the bloodstream that travel to distant organs over minutes, hours, or years.',
      physicalObject: 'A rubber reflex hammer striking the patellar tendon below the kneecap causing an instant kick.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teaching the action potential as an electrical current traveling like electrons in a copper wire.',
      unmaskedTruth: 'Nerves don’t conduct electricity like copper wires! An action potential is a wave of sodium (Na+) and potassium (K+) ions rushing across the cell membrane through voltage-gated gates, resetting after every pulse like stadium fans doing the wave.'
    },
    ahaLadder: [
      { step: 1, title: 'The Neuron Anatomy', intuition: 'Dendrites receive incoming signals, the cell body decides whether to fire, the axon transmits the pulse, and axon terminals spray neurotransmitters across synapses.' },
      { step: 2, title: 'Reflex Arcs Bypass the Brain', intuition: 'When you touch a hot iron, sensory neurons report directly to the spinal cord, which triggers motor neurons instantly before your brain even registers pain.' },
      { step: 3, title: 'Hormonal Negative Feedback', intuition: 'Like a home thermostat: when blood sugar spikes, the pancreas releases insulin to store glucose; when sugar drops, it releases glucagon to replenish it.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing neurons physically touch each other inside the brain.',
      realityCheck: 'There is a tiny gap called the synaptic cleft! Electrical pulses cannot jump the gap directly; they must convert into chemical neurotransmitters (dopamine, acetylcholine) that diffuse across.'
    }
  },

  'bio-tissues-plant-animal': {
    visceralMetaphor: {
      headline: 'The Fabric Weave of Specialized Workers',
      analogy: 'A single cell is like an individual worker. A tissue is an organized guild of identical workers specializing in one specific job: muscle tissue contracts, nerve tissue transmits signals, epithelial tissue acts as waterproof wallpaper, and connective tissue acts as biological rope and glue.',
      physicalObject: 'A prepared histology slide showing stratified squamous skin cells under cross-polarized light.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students get lost memorizing Latin tissue taxonomy (Parenchyma, Collenchyma, Sclerenchyma, Areolar, Adipose) without seeing their structural mechanical purpose.',
      unmaskedTruth: 'Tissue names simply describe their physical material: Parenchyma is soft filler flesh (like apple pulp); Collenchyma is flexible reinforcement (the crunchy strings in celery); Sclerenchyma is rock-hard dead wood (gritty pear cells and walnut shells).'
    },
    ahaLadder: [
      { step: 1, title: 'Cell → Tissue → Organ → System', intuition: 'Muscle cells build muscle tissue; muscle, nerve, and epithelial tissues build the stomach; the stomach and intestines form the digestive system.' },
      { step: 2, title: 'Meristematic Plant Growth', intuition: 'Plants only grow at active tip zones (meristems). If you carve your initials into an oak tree 1 meter off the ground, 20 years later it will STILL be 1 meter off the ground.' },
      { step: 3, title: 'Animal Connective Matrix', intuition: 'Bone is just collagen fibers hardened with calcium phosphate cement; blood is a liquid connective tissue whose matrix is fluid plasma.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking blood is an organ or simple chemical solution.',
      realityCheck: 'Blood is classified as a true connective tissue because it originates from mesoderm stem cells and consists of specialized living cells suspended in an extracellular matrix (plasma).'
    }
  },

  'bio-human-excretory-system': {
    visceralMetaphor: {
      headline: 'The High-Speed Dialysis Filter & Recovery Sieve',
      analogy: 'Imagine emptying your entire backpack onto the floor every morning, throwing away the junk, and carefully putting back your keys, wallet, phone, and lunch. That is how the kidney works: it dumps almost everything out of blood plasma into nephron tubules, then carefully reabsorbs 99% of the water, glucose, and salts, leaving toxic urea to be flushed.',
      physicalObject: 'A laboratory dialysis tubing strip immersed in water filtering iodine and starch.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Students think kidneys actively search for poison and pick it out of blood like tweezers.',
      unmaskedTruth: 'Kidneys use non-selective filtration under high blood pressure! The glomerulus forces everything smaller than a protein into the tubule. The real genius is the selective reabsorption that rescues all the valuable nutrients.'
    },
    ahaLadder: [
      { step: 1, title: 'Nephrons are Microscopic Sinks', intuition: 'Each kidney contains over 1 million nephron units filtering 180 liters of fluid every single day.' },
      { step: 2, title: 'Loop of Henle Salt Concentration', intuition: 'The loop of Henle dives deep into salty kidney tissue, pulling water out by osmosis so humans don’t dehydrate and die.' },
      { step: 3, title: 'Osmoregulation and ADH', intuition: 'When you are dehydrated on a hot day, the pituitary gland releases ADH, instructing kidneys to reabsorb even more water, producing concentrated dark urine.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Confusing excretion (urine removal of cellular metabolic waste) with egestion (defecation of undigested food).',
      realityCheck: 'Feces is undigested food that never entered body cells or crossed into blood; Excretion is the removal of chemical nitrogen wastes produced by cellular metabolism inside cells.'
    }
  },

  'bio-plant-transpiration-transport': {
    visceralMetaphor: {
      headline: 'The Giant Water Siphon Straw in the Sky',
      analogy: 'How does a 100-meter-tall California Redwood suck tons of water from the ground up to its needles with zero mechanical pumps? Water molecules hold hands tightly via hydrogen bonds (cohesion). When the sun evaporates one water droplet from a leaf pore, it tugs the entire microscopic water rope up through the xylem pipes from roots to sky.',
      physicalObject: 'A celery stalk standing in red food dye water with veins turning vivid scarlet.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Conflating Xylem (unidirectional dead water pipes) with Phloem (bidirectional living nutrient highways).',
      unmaskedTruth: 'Xylem is dead hollow timber (wood)! Water transport requires zero ATP energy from the plant; it is powered entirely by solar evaporation at the leaves (transpirational pull).'
    },
    ahaLadder: [
      { step: 1, title: 'Cohesion and Adhesion', intuition: 'Water molecules stick to each other (cohesion) and stick to cellulose pipe walls (adhesion), forming an unbroken continuous water column.' },
      { step: 2, title: 'Stomatal Guard Cells', intuition: 'Stomata pores open to inhale CO₂ for photosynthesis, but pay an inevitable water tax as moisture evaporates into the dry air.' },
      { step: 3, title: 'Phloem Pressure-Flow', intuition: 'Phloem carries sucrose sugar from source leaves to sink roots or fruits using osmotic pressure gradients generated by active sugar loading.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking roots "push" water all the way to the top of tall trees.',
      realityCheck: 'Root pressure can only push water a couple of meters off the ground. The rest of the climb (up to 100+ meters) is a PULL from leaf evaporation in the canopy!'
    }
  },

  'bio-ecosystems-environment': {
    visceralMetaphor: {
      headline: 'The Pyramidal Energy Leak & The Food Web Engine',
      analogy: 'Imagine a financial system where every middleman takes a brutal 90% transaction fee. Grass captures 10,000 calories of sunlight. A deer eats the grass and only gets 1,000 calories (the rest is lost as heat, movement, and waste). A tiger eats the deer and only gets 100 calories. That is why apex predators are rare in every forest.',
      physicalObject: 'A sealed glass terrarium containing soil, moss, springtails, and water that thrives for years in sunlight without being opened.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Drawing simple food chains (Grass → Grasshopper → Frog → Snake → Hawk) as if animals only eat one single menu item in nature.',
      unmaskedTruth: 'Nature is a resilient web, not a brittle chain! If one prey species collapses, predators shift to alternative branches. Biomagnification happens because synthetic toxins (like DDT or microplastics) cannot be broken down and concentrate up the pyramid.'
    },
    ahaLadder: [
      { step: 1, title: 'The 10% Energy Rule', intuition: 'Only about 10% of energy moves to the next trophic level; 90% is burned by metabolism and lost as thermal heat.' },
      { step: 2, title: 'Matter Cycles, Energy Flows', intuition: 'Energy flows one-way from the sun through the web and radiates into cold space; Atoms (carbon, nitrogen, water) cycle eternally on Earth.' },
      { step: 3, title: 'Decomposers Complete the Loop', intuition: 'Bacteria and fungi are the unsung heroes of the planet—without them, dead trees and animals would pile miles high, locking away all nutrients forever.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing that decomposers are at the "bottom" of the food chain.',
      realityCheck: 'Decomposers feed on EVERY trophic level! They recycle energy and nutrients from plants, herbivores, and top carnivores alike, returning vital nitrates back to the soil.'
    }
  }
};
