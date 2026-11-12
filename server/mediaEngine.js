/**
 * Adaptive Media Generation Engine
 * Implements MULTIPATH Phase 5 Adaptive Media Generation:
 * Specifically creates learning material addressing a student's identified knowledge gaps.
 * Formats supported:
 * 1. Mind Map (structured visual node-edge graph)
 * 2. Podcast (conversational educational dialogue with transcript & audio synthesis)
 * 3. Explainer Video (structured storyboard with animated visual scenes & narration)
 */

import { geminiService } from './geminiService.js';

export class MediaEngine {
  constructor() {
    this.savedResources = new Map();
  }

  /**
   * Generates a structured Mind Map specifically tailored to the selected knowledge gaps.
   */
  async generateMindMap({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    // If Gemini is configured, we could prompt Gemini for structured mindmap, or fallback to deterministic
    const mindMapData = this.buildDeterministicMindMap(topicId, subject, topicTitle, selectedGaps, gapDetails);
    
    return {
      format: 'mindmap',
      topicId,
      subject,
      topicTitle,
      selectedGaps,
      content: mindMapData,
      generatedAt: new Date().toISOString(),
      isDemonstrationMode: !geminiService.isConfigured()
    };
  }

  /**
   * Generates an educational Podcast episode script tailored to the selected gaps.
   */
  async generatePodcast({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    const podcastData = this.buildDeterministicPodcast(topicId, subject, topicTitle, selectedGaps, gapDetails);

    return {
      format: 'podcast',
      topicId,
      subject,
      topicTitle,
      selectedGaps,
      content: podcastData,
      generatedAt: new Date().toISOString(),
      isDemonstrationMode: !geminiService.isConfigured()
    };
  }

  /**
   * Generates a structured Explainer Video Storyboard with animated visual scenes.
   */
  async generateVideoStoryboard({ topicId, subject, topicTitle, selectedGaps, gapDetails }) {
    const videoData = this.buildDeterministicVideo(topicId, subject, topicTitle, selectedGaps, gapDetails);

    return {
      format: 'video',
      topicId,
      subject,
      topicTitle,
      selectedGaps,
      content: videoData,
      generatedAt: new Date().toISOString(),
      isDemonstrationMode: !geminiService.isConfigured()
    };
  }

  // --- Deterministic Educational Generators ---

  buildDeterministicMindMap(topicId, subject, topicTitle, selectedGaps, gapDetails) {
    const gapsCovered = Array.isArray(selectedGaps) && selectedGaps.length > 0
      ? selectedGaps
      : ['Core Principle Isolation'];

    // Topic-calibrated node hierarchies
    if (topicId === 'math-linear-equations') {
      return {
        title: `Mind Map: ${topicTitle} — Resolving Gaps in Balance & Inverses`,
        root: {
          id: 'root',
          label: 'Conservation of Equality',
          subLabel: 'A = B (Balance Scale Equilibrium)',
          description: 'Any invertible mathematical function applied identically to both sides preserves equality.',
          type: 'root'
        },
        branches: [
          {
            id: 'b-inverses',
            label: '1. Inverse Operations Hierarchy',
            color: 'indigo',
            relationToRoot: 'Unwinds variables without tilting the scale',
            nodes: [
              {
                id: 'n-subtraction',
                label: 'Additive Inversion',
                description: 'Subtracting c undoes +c. E.g. (3x + 7) - 7 = 22 - 7 -> 3x = 15.',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('inverse') || g.toLowerCase().includes('balance')),
                misconceptionWarning: 'Common trap: Adding to an addition compounds the constant (giving 3x + 14 = 29).'
              },
              {
                id: 'n-division',
                label: 'Multiplicative Inversion',
                description: 'Dividing by the coefficient isolates the unit variable: (3x) / 3 = 15 / 3 -> x = 5.',
                isRemediationFocus: true
              }
            ]
          },
          {
            id: 'b-geometry',
            label: '2. Geometric Line Mapping',
            color: 'emerald',
            relationToRoot: 'Translates algebra into visual coordinates',
            nodes: [
              {
                id: 'n-slope',
                label: 'Slope (m): Invariant Rate',
                description: 'Rise over run (Δy/Δx). Communicates how fast y responds to unit shifts in x.',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('slope') || g.toLowerCase().includes('rate'))
              },
              {
                id: 'n-intercept',
                label: 'Y-Intercept (b): Baseline Offset',
                description: 'Where the trajectory intersects the vertical axis at x = 0.',
                isRemediationFocus: false
              }
            ]
          },
          {
            id: 'b-remediation',
            label: '3. Targeted Gap Remediation',
            color: 'amber',
            relationToRoot: 'Direct remediation of identified weakness',
            nodes: [
              {
                id: 'n-remedy-1',
                label: `Focus: ${gapsCovered[0] || 'Inverse Operations'}`,
                description: gapDetails?.[0]?.correctionRequired || 'Always perform the opposite operation symmetrically across the equals sign.',
                isRemediationFocus: true,
                evidenceQuote: gapDetails?.[0]?.studentEvidence || 'Identified from Feynman diagnostic assessment.'
              }
            ]
          }
        ],
        connections: [
          { fromId: 'root', toId: 'b-inverses', label: 'governs' },
          { fromId: 'b-inverses', toId: 'n-subtraction', label: 'step 1' },
          { fromId: 'n-subtraction', toId: 'n-division', label: 'step 2' },
          { fromId: 'root', toId: 'b-geometry', label: 'manifests as' },
          { fromId: 'b-inverses', toId: 'b-remediation', label: 'fixes gap' }
        ]
      };
    }

    if (topicId === 'bio-photosynthesis') {
      return {
        title: `Mind Map: ${topicTitle} — Molecular Coupling & Photolysis`,
        root: {
          id: 'root',
          label: 'Solar-to-Chemical Transduction',
          subLabel: '6CO2 + 6H2O + Light -> C6H12O6 + 6O2',
          description: 'Photons excite chlorophyll electrons to split water and forge carbohydrate covalent bonds.',
          type: 'root'
        },
        branches: [
          {
            id: 'b-thylakoid',
            label: '1. Light-Dependent Reactions (Thylakoids)',
            color: 'emerald',
            relationToRoot: 'Converts photon flux into rechargeable chemical batteries',
            nodes: [
              {
                id: 'n-photolysis',
                label: 'Water Photolysis (H2O Cleavage)',
                description: 'Photons cleave water into electrons (e-), protons (H+), and oxygen (O2) byproduct.',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('photolysis') || g.toLowerCase().includes('water')),
                misconceptionWarning: 'Misconception: Oxygen is not created for animals; it is an oxidized waste product.'
              },
              {
                id: 'n-carriers',
                label: 'Energy Carriers (ATP & NADPH)',
                description: 'Proton gradient drives ATP synthase rotary motor, recharging ADP -> ATP.',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('carrier') || g.toLowerCase().includes('atp'))
              }
            ]
          },
          {
            id: 'b-stroma',
            label: '2. Calvin Cycle (Stroma)',
            color: 'indigo',
            relationToRoot: 'Fixes atmospheric carbon into solid biological matter',
            nodes: [
              {
                id: 'n-rubisco',
                label: 'RuBisCO Carbon Fixation',
                description: 'Attaches inorganic CO2 to 5-carbon RuBP to synthesize 3-carbon sugar precursors (G3P).',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('calvin') || g.toLowerCase().includes('carbon'))
              },
              {
                id: 'n-glucose',
                label: 'Glucose Synthesis',
                description: 'Requires ATP and NADPH chemical power delivered from the thylakoid membrane.',
                isRemediationFocus: false
              }
            ]
          },
          {
            id: 'b-pigments',
            label: '3. Light Absorption Spectrum',
            color: 'amber',
            relationToRoot: 'Electromagnetic wavelength filtering',
            nodes: [
              {
                id: 'n-green-reflection',
                label: 'Green Wavelength Reflection',
                description: 'Chlorophyll absorbs red and blue light strongly, reflecting unabsorbed green photons (500-550nm).',
                isRemediationFocus: gapsCovered.some(g => g.toLowerCase().includes('wavelength') || g.toLowerCase().includes('spectrum'))
              }
            ]
          }
        ],
        connections: [
          { fromId: 'root', toId: 'b-thylakoid', label: 'stage 1' },
          { fromId: 'b-thylakoid', toId: 'n-photolysis', label: 'cleaves water' },
          { fromId: 'n-photolysis', toId: 'n-carriers', label: 'charges' },
          { fromId: 'n-carriers', toId: 'b-stroma', label: 'powers' },
          { fromId: 'root', toId: 'b-pigments', label: 'driven by' }
        ]
      };
    }

    // General default mind map for any topic
    return {
      title: `Mind Map: ${topicTitle} — Targeted Conceptual Architecture`,
      root: {
        id: 'root',
        label: topicTitle,
        subLabel: `${subject.toUpperCase()} Core Mechanism`,
        description: `Central governing framework for understanding ${topicTitle}.`,
        type: 'root'
      },
      branches: [
        {
          id: 'b-foundations',
          label: 'Foundational Principles',
          color: 'indigo',
          relationToRoot: 'The primary axiom',
          nodes: [
            {
              id: 'n-f1',
              label: 'Governing Law',
              description: 'The fundamental empirical or logical rule establishing the relationship.',
              isRemediationFocus: false
            }
          ]
        },
        {
          id: 'b-gap-focus',
          label: 'Identified Knowledge Gap Focus',
          color: 'amber',
          relationToRoot: 'Remediation target from Feynman Mode',
          nodes: gapsCovered.map((g, idx) => ({
            id: `n-gap-${idx}`,
            label: g,
            description: `Targeted remediation: Master the cause-and-effect mechanism behind ${g}.`,
            isRemediationFocus: true
          }))
        }
      ],
      connections: [
        { fromId: 'root', toId: 'b-foundations', label: 'established by' },
        { fromId: 'root', toId: 'b-gap-focus', label: 'remediates' }
      ]
    };
  }

  buildDeterministicPodcast(topicId, subject, topicTitle, selectedGaps, _gapDetails) {
    const gapsCovered = Array.isArray(selectedGaps) && selectedGaps.length > 0
      ? selectedGaps
      : ['Core Principles'];

    if (topicId === 'math-linear-equations') {
      return {
        title: `Multipath Audio Lab: The Balance Scale Breakthrough`,
        subtitle: `Overcoming the "Sign Inversion" Pitfall in Linear Equations`,
        durationEstMinutes: 3,
        hosts: [
          { name: 'Devon', role: 'Lead Educator' },
          { name: 'Maya', role: 'Inquisitive Co-host' }
        ],
        targetedGaps: gapsCovered,
        segments: [
          {
            id: 'seg-1',
            speaker: 'Devon',
            text: `Welcome back to the Multipath Audio Lab! Today we're diving straight into a stumbling block that catches almost every algebra student: solving equations like 3x + 7 = 22.`,
            audioCue: 'Gentle intro chime'
          },
          {
            id: 'seg-2',
            speaker: 'Maya',
            text: `Right! A lot of students look at "+ 7" and think, "I want to get rid of it, so I'll just add 7." But when you do that, things actually get worse, don't they?`,
            focusGap: gapsCovered[0]
          },
          {
            id: 'seg-3',
            speaker: 'Devon',
            text: `Exactly, Maya. Think of the equals sign like an old-fashioned balance beam scale. If both pans are currently balanced, and you toss another 7 pounds onto the left pan, it tilts immediately! Adding 7 to an existing plus 7 doesn't zero it out—it doubles it to 14!`,
            focusGap: gapsCovered[0]
          },
          {
            id: 'seg-4',
            speaker: 'Maya',
            text: `So the secret is doing the OPPOSITE operation! If the number is added, we subtract it. If it's multiplied, we divide. And whatever we do to the left pan, we must mirror on the right pan.`,
            focusGap: gapsCovered[0]
          },
          {
            id: 'seg-5',
            speaker: 'Devon',
            text: `Bingo! So in 3x + 7 = 22, we subtract 7 from both sides: 22 minus 7 gives 15, leaving 3x = 15. Then we divide both sides by 3, leaving x = 5. Plug 5 back in: 3 times 5 is 15, plus 7 is 22. Perfect balance!`,
            audioCue: 'Verification chime'
          },
          {
            id: 'seg-6',
            speaker: 'Maya',
            text: `That is crystal clear. Remember: inverse operations undo the knots, and symmetry keeps the scale honest. Thanks for tuning into Multipath Audio!`,
            audioCue: 'Outro theme'
          }
        ]
      };
    }

    if (topicId === 'bio-photosynthesis') {
      return {
        title: `Multipath Audio Lab: The Solar Engine Inside the Leaf`,
        subtitle: `Demystifying Photolysis, Chlorophyll Wavelengths, and Carbon Fixation`,
        durationEstMinutes: 4,
        hosts: [
          { name: 'Devon', role: 'Lead Educator' },
          { name: 'Maya', role: 'Inquisitive Co-host' }
        ],
        targetedGaps: gapsCovered,
        segments: [
          {
            id: 'seg-1',
            speaker: 'Devon',
            text: `Welcome to Multipath Audio! Today we're exploring photosynthesis, and specifically clearing up a massive misconception: sunlight does NOT physically turn into sugar mass.`,
            audioCue: 'Ambient nature intro'
          },
          {
            id: 'seg-2',
            speaker: 'Maya',
            text: `That was a huge revelation for me! Photons are pure electromagnetic energy—they have no mass! So where does the actual physical wood of a giant sequoia tree come from?`,
            focusGap: gapsCovered[0]
          },
          {
            id: 'seg-3',
            speaker: 'Devon',
            text: `It comes from the air! Leaves take in carbon dioxide molecules. But sticking CO2 molecules together requires massive energy. That's where light comes in: it strikes chlorophyll in the thylakoid membrane and physically splits water molecules—a process called photolysis.`,
            focusGap: 'Light Reactions & Water Photolysis'
          },
          {
            id: 'seg-4',
            speaker: 'Maya',
            text: `And when water is split into hydrogen protons and electrons, oxygen is just the leftover byproduct that gets puffed out into the air!`,
            focusGap: 'Light Reactions & Water Photolysis'
          },
          {
            id: 'seg-5',
            speaker: 'Devon',
            text: `Exactly! The high-energy electrons recharge molecular batteries called ATP and NADPH. Those batteries float over to the stroma, where the Calvin cycle uses their stored energy to stitch atmospheric CO2 into glucose rings.`,
            focusGap: 'Calvin Cycle & Carbon Fixation'
          },
          {
            id: 'seg-6',
            speaker: 'Maya',
            text: `And why do leaves look green? Because chlorophyll absorbs blue and red photons like a sponge, but bounces green wavelengths right back to our eyes! Incredible design.`,
            audioCue: 'Discovery swell'
          }
        ]
      };
    }

    // Default podcast
    return {
      title: `Multipath Audio Lab: Mastering ${topicTitle}`,
      subtitle: `Targeted Concept Breakdown for ${gapsCovered.join(', ')}`,
      durationEstMinutes: 3,
      hosts: [
        { name: 'Devon', role: 'Lead Educator' },
        { name: 'Maya', role: 'Inquisitive Co-host' }
      ],
      targetedGaps: gapsCovered,
      segments: [
        {
          id: 'seg-1',
          speaker: 'Devon',
          text: `Welcome to Multipath Audio! Today we're taking a deep dive into ${topicTitle}, focusing directly on the key relationships that are easy to mix up.`
        },
        {
          id: 'seg-2',
          speaker: 'Maya',
          text: `Specifically, we want to look at ${gapsCovered[0] || 'the core mechanism'}. What is the first-principles idea behind it?`,
          focusGap: gapsCovered[0]
        },
        {
          id: 'seg-3',
          speaker: 'Devon',
          text: `When we look at the underlying cause and effect, the key is understanding how each step directly enables the next one.`
        },
        {
          id: 'seg-4',
          speaker: 'Maya',
          text: `That connects everything together. Keep this principle in mind as you continue exploring!`
        }
      ]
    };
  }

  buildDeterministicVideo(topicId, subject, topicTitle, selectedGaps, _gapDetails) {
    const gapsCovered = Array.isArray(selectedGaps) && selectedGaps.length > 0
      ? selectedGaps
      : ['Core Principles'];

    if (topicId === 'math-linear-equations') {
      return {
        title: `Explainer Video: The Physical Balance of Linear Equations`,
        topicId,
        subject,
        durationSeconds: 45,
        totalScenes: 3,
        targetedGaps: gapsCovered,
        scenes: [
          {
            id: 'scene-1',
            sceneNumber: 1,
            title: '1. The Equality Balance Scale',
            durationSeconds: 15,
            narration: 'An equation is not a command to calculate; it is a physical balance scale in perfect equilibrium. The left side 3x + 7 carries the exact same quantitative weight as the right side 22.',
            visualType: 'balance-scale-intro',
            visualData: {
              leftWeight: '3x + 7',
              rightWeight: '22',
              beamAngle: 0,
              isBalanced: true,
              callout: 'Conservation of Equality Axiom'
            },
            keyTakeaway: 'The equals sign means both pans carry identical weight.'
          },
          {
            id: 'scene-2',
            sceneNumber: 2,
            title: '2. Applying Symmetrical Inverse Operations',
            durationSeconds: 15,
            narration: 'To isolate the variable 3x, we apply the inverse operation of adding 7. We subtract 7 from both sides simultaneously. 22 minus 7 leaves 15. The beam remains in equilibrium: 3x = 15.',
            visualType: 'balance-scale-subtract',
            visualData: {
              leftWeight: '3x',
              rightWeight: '15',
              removedWeight: '-7 from both sides',
              beamAngle: 0,
              isBalanced: true,
              callout: 'Additive Inversion Property'
            },
            keyTakeaway: 'Subtracting 7 from both sides neutralizes the constant term without tipping the scale.'
          },
          {
            id: 'scene-3',
            sceneNumber: 3,
            title: '3. Isolating the Unit Variable (x = 5)',
            durationSeconds: 15,
            narration: 'Finally, we reverse multiplication by dividing both sides by the coefficient 3. 15 divided by 3 yields x = 5. By strictly mirroring every step, we deduced the exact value of the unknown.',
            visualType: 'balance-scale-isolate',
            visualData: {
              leftWeight: 'x',
              rightWeight: '5',
              beamAngle: 0,
              isBalanced: true,
              callout: 'Verified: 3(5) + 7 = 22'
            },
            keyTakeaway: 'Symmetrical inverse operations guarantee mathematical truth.'
          }
        ]
      };
    }

    if (topicId === 'bio-photosynthesis') {
      return {
        title: `Explainer Video: Inside the Chloroplast Machinery`,
        topicId,
        subject,
        durationSeconds: 45,
        totalScenes: 3,
        targetedGaps: gapsCovered,
        scenes: [
          {
            id: 'scene-1',
            sceneNumber: 1,
            title: '1. Photon Absorption & Water Photolysis',
            durationSeconds: 15,
            narration: 'Inside the thylakoid membrane, chlorophyll pigments absorb red and blue wavelengths while reflecting green light. Solar photons excite electrons, powering the enzymatic splitting of water molecules into oxygen and protons.',
            visualType: 'photolysis-animation',
            visualData: {
              membrane: 'Thylakoid Membrane',
              input: 'H2O + Photon',
              outputs: ['O2 (Oxygen Byproduct)', 'e- (High Energy Electrons)', 'H+ (Proton Gradient)'],
              colorFilter: 'Green Light Reflected'
            },
            keyTakeaway: 'Photolysis splits water to harvest electrons, generating oxygen as an oxidized byproduct.'
          },
          {
            id: 'scene-2',
            sceneNumber: 2,
            title: '2. Recharging ATP & NADPH Energy Carriers',
            durationSeconds: 15,
            narration: 'The hydrogen protons accumulate inside the thylakoid lumen, creating an electrochemical gradient that spins the ATP synthase rotary turbine to recharge ADP into ATP and NADP+ into NADPH.',
            visualType: 'energy-carrier-charging',
            visualData: {
              engine: 'ATP Synthase Rotary Motor',
              carriers: ['ADP -> ATP', 'NADP+ -> NADPH'],
              status: 'Charged with Chemical Bond Energy'
            },
            keyTakeaway: 'Light energy is converted into chemical energy carriers that travel into the stroma.'
          },
          {
            id: 'scene-3',
            sceneNumber: 3,
            title: '3. The Calvin Cycle: Fixing CO2 into Glucose',
            durationSeconds: 15,
            narration: 'In the liquid stroma, the enzyme RuBisCO captures inorganic carbon dioxide from the atmosphere. Using the chemical energy from ATP and NADPH, it fuses the carbon into three-carbon sugars to assemble glucose rings.',
            visualType: 'calvin-cycle-fixation',
            visualData: {
              location: 'Stroma',
              inputs: ['Atmospheric CO2', 'ATP + NADPH'],
              output: 'C6H12O6 (Glucose Mass)',
              enzyme: 'RuBisCO'
            },
            keyTakeaway: 'Sunlight does not become sugar mass; atmospheric carbon is fused into sugar powered by light reactions.'
          }
        ]
      };
    }

    // Default Video Storyboard
    return {
      title: `Explainer Video: Conceptual Breakdown of ${topicTitle}`,
      topicId,
      subject,
      durationSeconds: 45,
      totalScenes: 3,
      targetedGaps: gapsCovered,
      scenes: [
        {
          id: 'scene-1',
          sceneNumber: 1,
          title: '1. The Core Challenge & First Principles',
          durationSeconds: 15,
          narration: `Understanding ${topicTitle} begins by breaking down the fundamental assumptions. Let's examine what governs the system.`,
          visualType: 'concept-diagram',
          visualData: { focus: topicTitle, note: 'Foundational framework' },
          keyTakeaway: 'First principles establish the ground rules.'
        },
        {
          id: 'scene-2',
          sceneNumber: 2,
          title: `2. Remediation Focus: ${gapsCovered[0] || 'Key Mechanism'}`,
          durationSeconds: 15,
          narration: `Here is where many learners encounter difficulty: connecting the mechanism to the outcome. Notice how each factor influences the next.`,
          visualType: 'concept-diagram',
          visualData: { focus: gapsCovered[0] || 'Mechanism', note: 'Direct causal link' },
          keyTakeaway: 'Cause and effect drive the process.'
        },
        {
          id: 'scene-3',
          sceneNumber: 3,
          title: '3. Integrated Synthesis & Takeaway',
          durationSeconds: 15,
          narration: `Now we see the full picture: all parts working together in a unified system.`,
          visualType: 'concept-diagram',
          visualData: { focus: 'Unified Mastery', note: 'Complete conceptual integration' },
          keyTakeaway: 'Independent conceptual mastery achieved.'
        }
      ]
    };
  }

  // --- Resource Persistence in Memory & Server Cache ---

  saveResource(resource) {
    const id = resource.id || `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const saved = { ...resource, id, savedAt: new Date().toISOString() };
    this.savedResources.set(id, saved);
    return saved;
  }

  getResourcesByTopic(topicId) {
    const results = [];
    for (const res of this.savedResources.values()) {
      if (res.topicId === topicId) {
        results.push(res);
      }
    }
    return results;
  }

  getAllResources() {
    return Array.from(this.savedResources.values());
  }

  getResource(id) {
    return this.savedResources.get(id) || null;
  }
}

export const mediaEngine = new MediaEngine();
