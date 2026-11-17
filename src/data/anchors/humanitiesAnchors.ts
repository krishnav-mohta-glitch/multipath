import type { FeynmanAnchor } from '../../types/topic';

export const HUMANITIES_ANCHORS: Record<string, FeynmanAnchor> = {
  'hist-french-revolution': {
    visceralMetaphor: {
      headline: 'The Ticking Pressure Cooker with Sealed Vents',
      analogy: 'Imagine a giant cast-iron pressure cooker on a roaring stove flame. The fire is national bankruptcy from lavish wars, the trapped steam is a famine where bread costs a month’s wages, and the heavy clamped lid is a feudal system where the top 2% pay zero taxes while the poor 98% bear the entire burden. If there is no release valve, the cooker violently explodes.',
      physicalObject: 'A worn 1789 copper coin stamped with the French royal seal showing deep chisel gouges.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools make students memorize a timeline of dates, names of ministers (Necker, Calonne), and the Estates-General seating chart like isolated trivia.',
      unmaskedTruth: 'The revolution wasn’t about dates; it was about structural financial exhaustion! When bread costs more than an honest laborer earns in a week, and the wealthiest aristocrats refuse to pay a single coin in taxes, revolution is mathematically inevitable.'
    },
    ahaLadder: [
      { step: 1, title: 'The Three Estates Trap', intuition: 'The 1st Estate (Clergy) and 2nd Estate (Nobility) owned 40% of the land and paid zero taxes; the 3rd Estate (Peasants, Doctors, Merchants) paid for everything and had zero voting power.' },
      { step: 2, title: 'Voting by Order vs. Voting by Head', intuition: 'In the Estates-General, each Estate got 1 collective vote. The top two always voted 2-to-1 to block any tax reform—until the 3rd Estate walked out to form the National Assembly.' },
      { step: 3, title: 'From Moderate Reform to The Terror', intuition: 'Revolutions eat their own children: moderate constitutional reform radicalized under foreign invasion and panic into the guillotine Reign of Terror.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing Marie Antoinette actually said "Let them eat cake".',
      realityCheck: 'There is zero historical evidence she ever said it! The quote was propaganda manufactured by revolutionaries to symbolize the court’s total economic detachment from the starving populace.'
    }
  },

  'hist-indus-valley-civilisation': {
    visceralMetaphor: {
      headline: 'The Underground Baked-Brick Plumbing City',
      analogy: 'Imagine walking into a bronze-age city 4,500 years ago where there are no colossal palaces or emperor statues, but EVERY house has its own private bathroom, running water, and covered terra-cotta drainage gutters running beneath paved straight-grid streets.',
      physicalObject: 'A standard 1:2:4 ratio kiln-fired reddish mud brick preserved from Mohenjo-Daro.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Focusing on unanswered riddles (undeciphered script, theories of Aryan invasion vs. climate drought) rather than appreciating their unprecedented municipal engineering.',
      unmaskedTruth: 'While contemporary Egypt and Mesopotamia built towering monuments to god-kings using slave labor, the Harappans prioritized civic sanitation, uniform standardized weights, and flood engineering for ordinary citizens.'
    },
    ahaLadder: [
      { step: 1, title: 'The Standardized Brick Metric', intuition: 'Across thousands of square kilometers from Gujarat to Punjab, every city baked bricks in the exact mathematical thickness-to-width-to-length ratio of 1:2:4.' },
      { step: 2, title: 'Civic Sanitation Over Warfare', intuition: 'Excavations find almost no military armor, swords, or conqueror monuments, but uncover world-class public baths, granaries, and covered sewer inspection manholes.' },
      { step: 3, title: 'Climate and River Shifting', intuition: 'The civilization declined not from sudden war, but as the monsoon shifted and the Saraswati/Ghaggar river systems dried up, forcing citizens to migrate eastward.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming ancient civilizations must have had massive royal palaces to be advanced.',
      realityCheck: 'Harappan governance was likely decentralized and civic-focused—their greatest achievement was public sanitation and flood-resistant urban town planning.'
    }
  },

  'hist-vedic-period-empires': {
    visceralMetaphor: {
      headline: 'The Cattle-Herding Campfire Chants to Iron Plow Agriculture',
      analogy: 'Imagine pastoral nomads gathering around sacred evening fires chanting verses preserved through rhythmic song. Over centuries, they discover iron ore in the dense forests of Bihar, forge heavy iron axes and plows, clear river plains, and build settled agricultural kingdoms with fortified stone capital cities (Mahajanapadas).',
      physicalObject: 'A rusted iron sickle blade used to harvest rice along the fertile Ganga river basin.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Treating the Early Vedic and Later Vedic periods as identical, obscuring the dramatic social shift from egalitarian pastoral tribes to rigid social hierarchies.',
      unmaskedTruth: 'The shift was driven by technology! In the Early Vedic era, wealth was measured in cows (Gavishti = search for cows) and social roles were flexible. Iron plows produced agricultural surpluses, enabling taxation, standing armies, and rigid hereditary caste structures.'
    },
    ahaLadder: [
      { step: 1, title: 'Oral Rigorous Mnemonics', intuition: 'The Vedas were not written on paper; they were preserved for thousands of years through acoustic tonal meters and back-and-forth recitation patterns.' },
      { step: 2, title: 'Iron Sparks Urbanization', intuition: 'Heavy iron tools allowed clearing of dense Gangetic jungle, producing the food surplus needed to feed craftsmen, traders, and administrative armies.' },
      { step: 3, title: 'Rise of Magadha', intuition: 'Magadha became the supreme empire because it held natural iron mines, fertile river plains for two rice harvests a year, and wild war elephants in nearby forests.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing the caste system was always fixed and hereditary from the earliest times.',
      realityCheck: 'In the Early Vedic period (Rigveda), Varna was fluid and based on profession and aptitude; only in the Later Vedic period did it harden into rigid hereditary castes.'
    }
  },

  'hist-mughal-empire-administration': {
    visceralMetaphor: {
      headline: 'The Clockwork Revenue Ledger & The Royal Steed Branding',
      analogy: 'Imagine governing an empire of 100 million people speaking dozens of languages without phones or internet. The Mughal system worked like a precise corporate franchise: the Mansabdari system assigned every noble a military rank, an exact count of armored cavalry to maintain, and a branded horse inspection system, funded by Todar Mal’s meticulously surveyed agricultural tax tables.',
      physicalObject: 'A Mughal copper dam coin and a brass astrolabe used for cartography and architectural alignment.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Reducing the Mughal era to romantic tales of emperors (Akbar, Jahangir, Shah Jahan, Aurangzeb) and marble monuments, ignoring the administrative machinery.',
      unmaskedTruth: 'Akbar’s true genius was institutional! By marrying local Rajput rulers, abolishing the pilgrim tax, and using standardized land revenue surveys (Zabt system), he gave diverse regional elites a financial stake in maintaining the empire.'
    },
    ahaLadder: [
      { step: 1, title: 'Mansabdari Dual Rank (Zat and Sawar)', intuition: 'Zat determined the officer’s personal status and salary; Sawar determined the exact number of mounted cavalrymen he was legally required to bring to battle.' },
      { step: 2, title: 'Todar Mal’s Land Survey', intuition: 'Land was measured with standardized bamboo rods with iron rings, and taxes were based on a rolling 10-year average of actual crop yield, preventing arbitrary extortion.' },
      { step: 3, title: 'Sulh-i-Kul (Universal Peace)', intuition: 'Governance over a diverse population requires religious tolerance and cultural synthesis, as reflected in art, architecture, and administrative alliances.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a Jagir was hereditary private property owned by the noble.',
      realityCheck: 'A Jagir was only the right to collect tax revenue from an area to pay troops; emperors regularly transferred nobles to prevent any regional warlord from building a local rebel power base.'
    }
  },

  'hist-indian-national-movement': {
    visceralMetaphor: {
      headline: 'The Handful of Common Sea Salt & The Spinning Wheel',
      analogy: 'How do an unarmed, impoverished people defeat the world’s most powerful military empire? Not by matching their machine guns, but by withholding consent. By marching 240 miles to the beach and picking up a free pinch of natural sea salt, Gandhi made British salt monopoly laws morally unviable and broke the illusion of imperial authority.',
      physicalObject: 'A wooden handheld charkha (spinning wheel) with coarse khadi cotton thread.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Presenting the freedom struggle as an effortless sequence of peaceful speeches without showing the intense tactical debates between Moderates, Extremists, Revolutionaries, and Mass Agitation.',
      unmaskedTruth: 'Satyagraha was not passive weakness; it was active psychological and economic warfare! Boycotting imported Lancashire cotton textiles hit British industrialists directly in their wallets, turning British public opinion against colonial rule.'
    },
    ahaLadder: [
      { step: 1, title: 'The Drain of Wealth Theory', intuition: 'Dadabhai Naoroji proved Britain was systematically siphoning agricultural revenue and raw materials out of India to finance British industrialization.' },
      { step: 2, title: 'Mass Mobilization (1920, 1930, 1942)', intuition: 'From elite petitions in drawing rooms, the struggle expanded to millions of peasants, students, mill workers, and women across the entire subcontinent.' },
      { step: 3, title: 'Multiple Streams to Freedom', intuition: 'The pressure from the INA trials, the Royal Indian Navy mutiny, and mass civil disobedience convinced the war-exhausted British that India was impossible to hold by force.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking Non-Cooperation and Civil Disobedience were identical movements.',
      realityCheck: 'Non-Cooperation (1920) meant refusing to cooperate with British institutions (schools, courts, titles); Civil Disobedience (1930) went a step further to deliberately and openly BREAK unjust colonial laws (like the Salt Act).'
    }
  },

  'hist-first-world-war': {
    visceralMetaphor: {
      headline: 'The Interlocked Domino Chain Reaction',
      analogy: 'Imagine six heavily armed soldiers standing in a circle, holding hair-trigger rifles tied together with strings. Soldier A is allied with B; C is allied with D. When an assassination sparks a localized fight between two small neighbors, the secret treaty tripwires snap, dragging every major empire into mutual industrial slaughter within 72 hours.',
      physicalObject: 'A rusted steel trench helmet with a dent from shrapnel.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Blaming the entire world war solely on the assassination of Archduke Franz Ferdinand in Sarajevo.',
      unmaskedTruth: 'The assassination was only the lit match; the warehouse was already packed with gunpowder! The real underlying causes were M-A-I-N: Militarism, Alliances, Imperialism, and Nationalism building tension for decades.'
    },
    ahaLadder: [
      { step: 1, title: 'Secret Alliance Web', intuition: 'The Triple Entente and Triple Alliance turned a Balkan local crisis into an unstoppable continental domino collapse.' },
      { step: 2, title: 'Industrial Warfare vs. 19th Century Tactics', intuition: 'Generals ordered cavalry charges against rapid-fire machine guns, poison gas, and barbed wire, leading to years of muddy trench stalemate.' },
      { step: 3, title: 'The Flawed Treaty of Versailles', intuition: 'Crushing Germany with guilt and crippling reparations did not secure peace; it planted the economic desperation that gave rise to World War II.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking World War I ended with an unconditional military surrender on the battlefield.',
      realityCheck: 'It ended with an Armistice (a ceasefire agreement at 11:00 AM on 11/11/1918) when the home front collapsed from revolution and starvation, not from the complete capture of Berlin.'
    }
  },

  'hist-united-nations-charter': {
    visceralMetaphor: {
      headline: 'The Global Round Table & The Fire Extinguisher Veto',
      analogy: 'Imagine a neighborhood council where all 193 families gather in the general hall to discuss clean water, education, and health. But for high-stakes emergencies involving house fires or fistfights, there is a specialized Security Council where the five biggest founding families each hold a master red veto button that can freeze any action.',
      physicalObject: 'A miniature UN emblem lapel pin showing olive branches cradling the globe.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing the six principal organs (General Assembly, Security Council, ICJ, ECOSOC, Trusteeship, Secretariat) without understanding why the League of Nations failed before it.',
      unmaskedTruth: 'The UN was engineered with realism: Dag Hammarskjöld famously observed that "the UN was not created to take humanity to heaven, but to save humanity from hell." The veto power keeps superpowers talking instead of launching nuclear missiles.'
    },
    ahaLadder: [
      { step: 1, title: 'Collective Security', intuition: 'An attack on one is the concern of all: countries band together to impose economic sanctions or deploy blue-helmet peacekeepers.' },
      { step: 2, title: 'The P5 Veto Power', intuition: 'The five permanent members (USA, UK, France, Russia, China) each have absolute veto over substantive resolutions, preventing war between superpowers.' },
      { step: 3, title: 'Specialized Agencies Save Lives Daily', intuition: 'Beyond geopolitical disputes, UN agencies like WHO, UNICEF, and UNESCO eradicate polio, feed starving refugees, and protect cultural heritage.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking the UN has its own permanent standing army that it can order into battle.',
      realityCheck: 'The UN has zero soldiers of its own! Every single peacekeeper is a volunteer soldier contributed by member states (with India, Bangladesh, and Nepal consistently among top troop contributors).'
    }
  },

  'civ-indian-constitution-fundamental-rights': {
    visceralMetaphor: {
      headline: 'The Citizen’s Titanium Shield Against the State',
      analogy: 'Imagine giving a government immense power: a massive police force, tax authority, and courts. Fundamental Rights are a titanium shield given to every single individual citizen. Even if 99% of politicians or neighbors vote to take away your speech, religion, or freedom without fair trial, your constitutional shield makes their decree legally void.',
      physicalObject: 'The original illuminated Preamble page of the Indian Constitution hand-calligraphed by Prem Behari Narain Raizada.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach Articles 14 to 32 as a dry legal list to memorize for exams rather than the living core of personal human dignity.',
      unmaskedTruth: 'Fundamental Rights are JUSTICIABLE! This means if the government infringes on your rights, you can bypass lower courts and march straight into the Supreme Court of India under Article 32 (which Dr. Ambedkar called the "Heart and Soul" of the Constitution).'
    },
    ahaLadder: [
      { step: 1, title: 'The Preamble is the Guiding Spirit', intuition: 'Sovereign, Socialist, Secular, Democratic, Republic: it declares that ultimate authority belongs to "We, the People of India", not to kings or colonizers.' },
      { step: 2, title: 'Six Core Right Clusters', intuition: 'Equality (Art 14-18), Freedom (Art 19-22), Against Exploitation (Art 23-24), Freedom of Religion (Art 25-28), Cultural & Educational (Art 29-30), Constitutional Remedies (Art 32).' },
      { step: 3, title: 'Writs are Judicial Superpowers', intuition: 'Habeas Corpus (produce the body against illegal police detention), Mandamus (we command officials to do their duty), Certiorari, and Quo Warranto.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Assuming Fundamental Rights are absolute with zero limits or duties.',
      realityCheck: 'Rights are subject to "reasonable restrictions" (public order, national security, decency). Your right to swing your fist ends where another person’s nose begins.'
    }
  },

  'civ-parliamentary-democracy': {
    visceralMetaphor: {
      headline: 'The Company Boardroom & The Accountable CEO',
      analogy: 'In a Presidential system (like the USA), voters pick the President and Congress separately, like choosing a captain and a coach who might hate each other. In a Parliamentary system (like India and UK), voters elect Members of Parliament. The majority party in Parliament then selects the Prime Minister from among themselves, who must answer daily questions from the floor or face a vote of no-confidence.',
      physicalObject: 'A wooden gavel on an MP desk alongside the green carpet of the Lok Sabha.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Confusing the Head of State (President) with the Head of Government (Prime Minister).',
      unmaskedTruth: 'The President of India is the ceremonial constitutional head (like the King in a constitutional monarchy), but acts strictly on the aid and advice of the Council of Ministers headed by the Prime Minister, who holds real executive power.'
    },
    ahaLadder: [
      { step: 1, title: 'Bicameral Parliament (Two Houses)', intuition: 'Lok Sabha (House of the People) represents voters directly; Rajya Sabha (Council of States) represents regional state interests and acts as a sober revisory chamber.' },
      { step: 2, title: 'Collective Responsibility', intuition: 'The Prime Minister and Cabinet swim or sink together. If the Lok Sabha passes a No-Confidence Motion, the entire government falls immediately.' },
      { step: 3, title: 'Question Hour Checks Power', intuition: 'Ministers are held directly accountable during daily Question Hour, forced to answer public inquiries under oath.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a Prime Minister can stay in power for a full 5-year term automatically without parliamentary majority.',
      realityCheck: 'The moment a ruling coalition loses its 50%+1 majority on the floor of the Lok Sabha, the government must resign immediately!'
    }
  },

  'civ-judiciary-rule-of-law': {
    visceralMetaphor: {
      headline: 'The Impartial Referee with the Whistle',
      analogy: 'Imagine a high-stakes football match where one team is the Government and the other team is an ordinary citizen. The Judiciary is an independent referee who does not work for either team, cannot be fired by the captain, and holds the power to red-card any law that violates the Constitution’s rulebook.',
      physicalObject: 'The bronze Lady Justice statue holding balanced scales in one hand and a sword in the other, wearing a blindfold.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Treating the court hierarchy (District Courts → High Courts → Supreme Court) as a bureaucratic ladder rather than an integrated single constitutional spine.',
      unmaskedTruth: 'India has an INTEGRATED judiciary, unlike federal courts in the US. A judgment from the Supreme Court is the absolute law of the land binding on every single court, police station, and citizen across all states.'
    },
    ahaLadder: [
      { step: 1, title: 'Independence Guaranteed by Constitution', intuition: 'Judges’ salaries are charged on the Consolidated Fund (cannot be reduced by vote), and their removal requires an arduous impeachment process in Parliament.' },
      { step: 2, title: 'Judicial Review & Basic Structure', intuition: 'In the landmark Kesavananda Bharati case (1973), the Supreme Court ruled that Parliament CANNOT alter the "Basic Structure" of the Constitution (democracy, secularism, rule of law).' },
      { step: 3, title: 'Public Interest Litigation (PIL)', intuition: 'Any concerned citizen can write a simple letter or postcard to the court on behalf of disadvantaged citizens who cannot afford lawyers.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing the police judge guilt and issue punishment.',
      realityCheck: 'The police only investigate and present evidence. Under the Rule of Law, only a judicial magistrate or judge has the constitutional authority to determine guilt and assign punishment.'
    }
  },

  'geo-plate-tectonics': {
    visceralMetaphor: {
      headline: 'The Cracked Eggshell on a Boiling Soup Pot',
      analogy: 'Earth’s crust is not a solid shell; it is cracked into a dozen jigsaw puzzle pieces (tectonic plates) floating on hot, churning semi-molten rock mantle. Convection currents in the hot mantle drag the plates around at the exact speed your fingernails grow (~2 to 5 cm per year).',
      physicalObject: 'A broken ceramic plate with pieces pushed together on a tray of thick caramel.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing convergent, divergent, and transform boundaries with dry textbook arrows without connecting them to actual earthquakes, tsunamis, and volcanoes.',
      unmaskedTruth: 'The boundaries explain the geography of Earth! Where plates smash together (converge), land crumbles upward into the Himalayas. Where they pull apart (diverge), ocean basins open up. Where they grind sideways (transform), friction snags and snaps into earthquakes.'
    },
    ahaLadder: [
      { step: 1, title: 'Mantle Convection is the Motor', intuition: 'Hot magma rises at mid-ocean ridges, cools, moves sideways, and sinks at deep trenches, acting like a giant underground conveyor belt.' },
      { step: 2, title: 'Oceanic vs. Continental Crust', intuition: 'Dense, thin oceanic crust always dives (subducts) under buoyant continental crust, melting into magma that bursts out as volcanic arcs.' },
      { step: 3, title: 'The Indian Plate Collision', intuition: '50 million years ago, the island plate of India slammed into Asia. Neither could sink because both are buoyant continent—so the collision zone buckled into the 8,000-meter-high Himalayas, which are still growing today!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking tectonic plates move on a liquid sea of magma.',
      realityCheck: 'The mantle is almost entirely SOLID rock! It behaves like silly putty or asphalt under extreme heat and pressure: rock that can flow over millions of years (plastic deformation).'
    }
  },

  'geo-climate-monsoon-mechanisms': {
    visceralMetaphor: {
      headline: 'The Giant Continental Breathing Lung',
      analogy: 'Imagine the Indian subcontinent taking a massive annual breath. In scorching summer, the vast landmass heats up much faster than the Indian Ocean, creating a giant low-pressure vacuum. The ocean "breathes in", sending moisture-heavy winds rushing thousands of kilometers north to dump torrential monsoon rains across the fields.',
      physicalObject: 'A mercury barometer and an anemometer measuring atmospheric pressure drop before a storm.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Explaining the monsoon using heavy terminology (ITCZ shift, Coriolis force, Somali jet stream, El Niño) before the student grasps basic thermal pressure differences.',
      unmaskedTruth: 'Land heats up fast and cools down fast; water heats up slow and cools down slow! That simple physics fact drives the entire weather engine of South Asia.'
    },
    ahaLadder: [
      { step: 1, title: 'Differential Heating Creates Wind', intuition: 'Warm air over land expands and rises, creating a low-pressure void. Cool, heavy, moist air over the ocean rushes in to fill that void.' },
      { step: 2, title: 'The Coriolis Curve (Ferrel’s Law)', intuition: 'Because Earth spins, winds crossing the equator curve right toward India as the Southwest Monsoon.' },
      { step: 3, title: 'The Himalayan Wall Trap', intuition: 'The towering Himalayas block these rain clouds from escaping north into Tibet, forcing them to drop their precious rain across the Indo-Gangetic plains.' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Believing the monsoon is simply "the rainy season".',
      realityCheck: 'The monsoon is technically the seasonal REVERSAL of wind direction! The Southwest Monsoon brings summer rains, and the Northeast Monsoon brings dry winter winds from the land back to the ocean.'
    }
  },

  'eng-understanding-metaphors': {
    visceralMetaphor: {
      headline: 'The X-Ray Projector of Human Thoughts',
      analogy: 'A metaphor is taking a pair of sunglasses made of one experience and looking at an entirely different concept through them. When you say "Time is money", you suddenly spend it, waste it, borrow it, and budget it, borrowing the physical rules of cash to make an invisible concept visible.',
      physicalObject: 'A dual-lens 3D stereoscope merging two flat photos into one deep image.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Schools teach: "A simile uses like or as; a metaphor does not", turning a profound linguistic revelation into a dumb punctuation scan for the word "like".',
      unmaskedTruth: 'Metaphors aren’t decorative poetry flair; they are the fundamental operating system of human thought! We understand abstract things (love, time, arguments) by mapping them onto physical bodily experiences (warmth, journeys, warfare).'
    },
    ahaLadder: [
      { step: 1, title: 'Target and Source Domains', intuition: 'Target: the abstract concept you want to understand (Mind). Source: the tangible physical thing you already know (Computer).' },
      { step: 2, title: 'Highlighting and Suppressing', intuition: 'Calling a classroom a "zoo" highlights rowdiness and animal energy, while deliberately suppressing the fact that students are humans studying math.' },
      { step: 3, title: 'Conceptual Metaphors Govern Daily Speech', intuition: '"Arguments are war" makes us defend positions, attack weak points, and shoot down ideas—if we viewed argument as a dance, debate would look completely different!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking a metaphor is just a fancy synonym or a lie.',
      realityCheck: 'A metaphor asserts a deep structural correspondence. It helps our brains grasp complex, unseeable ideas using concrete, physical sensory memories.'
    }
  },

  'eng-active-passive-voice': {
    visceralMetaphor: {
      headline: 'The Movie Director’s Spotlight & The Police Report',
      analogy: 'Active voice puts the spotlight on the DOER of the action ("The dog bit the mailman"). Passive voice shifts the spotlight onto the RECEIVER of the action ("The mailman was bitten by the dog"). If you want to hide who broke the antique vase, you say passively: "Mistakes were made; the vase was broken."',
      physicalObject: 'A stage lighting spotlight switching focus from an actor to a shattered prop.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Teaching passive voice as a mechanical grammar exercise: "Subject + verb to be + past participle + by + object", without explaining WHY writers choose passive voice.',
      unmaskedTruth: 'Passive voice exists to control narrative focus! Use active when the doer is important; use passive when the victim is the headline, or when the doer is unknown or purposely obscured.'
    },
    ahaLadder: [
      { step: 1, title: 'The Actor vs The Receiver', intuition: 'Active voice is dynamic and punchy: Actor does Action to Target. Passive voice reverses the camera angle.' },
      { step: 2, title: 'Scientific & Legal Objectivity', intuition: 'In lab reports, we write "The solution was heated to 100°C", because anyone heating it gets the same result—the experimenter’s identity is irrelevant.' },
      { step: 3, title: 'Accountability Manipulation', intuition: 'Politicians love passive voice to evade blame: "Taxes were increased" hides who actually signed the bill!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Thinking passive voice is "bad grammar" that must always be avoided.',
      realityCheck: 'Passive voice is a powerful stylistic tool. In news headlines ("Bank robbed in broad daylight"), passive voice is correct because we don’t yet know who the robber was!'
    }
  },

  'eng-direct-indirect-speech': {
    visceralMetaphor: {
      headline: 'The Verbatim Tape Recorder vs. The Trusted Messenger',
      analogy: 'Direct speech is holding up a portable audio recorder and playing the exact spoken sound bite inside speech quote marks: She said, "I am hungry." Indirect (reported) speech is walking into the other room and conveying the message in your own words: She said that she was hungry.',
      physicalObject: 'A retro cassette tape player playing a recording inside speech bubble marks.'
    },
    whySchoolConfusesYou: {
      textbookTrap: 'Memorizing tense shift charts (Simple Present becomes Simple Past, Will becomes Would, Here becomes There) like arbitrary spelling rules.',
      unmaskedTruth: 'Tense shifts are common sense! If Alice said on Monday "I am eating cake", and you report it on Friday, she is no longer eating cake right now! The event is in the past, so your verbs naturally shift backward in time.'
    },
    ahaLadder: [
      { step: 1, title: 'The Time Shift (Backshifting)', intuition: 'Because the reporting verb is in the past (He said...), all referenced statements must slide one step back into the past to preserve temporal logic.' },
      { step: 2, title: 'Pronoun Perspective Adjustment', intuition: 'When Bob says "My head hurts", you cannot report "He said my head hurts" (unless your head hurts!). "My" shifts to "his".' },
      { step: 3, title: 'Universal Truth Exception', intuition: 'If the statement is a permanent scientific fact ("The teacher said the Earth revolves around the sun"), you DO NOT shift tenses, because Earth is still revolving today!' }
    ],
    misconceptionAlert: {
      commonBlunder: 'Blindly backshifting universal scientific truths into the past tense.',
      realityCheck: 'Writing "He said that water boiled at 100°C" falsely implies water no longer boils at 100°C! Universal scientific truths stay in simple present.'
    }
  }
};
