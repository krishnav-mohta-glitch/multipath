/**
 * Subject-Aware Literature and Language Evaluator
 * Evaluates figurative analysis (Tenor, Vehicle, Ground), textual reasoning,
 * and accepts multiple valid interpretive nuances without forcing a single reading.
 */

export function evaluateLiteratureResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  const isMetaphorTopic =
    topicId === 'eng-understanding-metaphors' ||
    topicId === 'eng-metaphors' ||
    (typeof topicId === 'string' && topicId.startsWith('eng-'));

  if (isMetaphorTopic) {
    // Check for Tenor / Vehicle / Ground recognition
    const mentionsTenor = /tenor|subject|target|thing being described|real subject/.test(clean);
    const mentionsVehicle = /vehicle|image|comparison|symbol|figure/.test(clean);
    const mentionsGround = /ground|common|shared|connection|similarity|trait|overlap/.test(clean);

    // Common misconception: Confusing metaphor with simile
    const mentionsSimile = /uses? (like|as)|simile|comparison using like/.test(clean);
    if (mentionsSimile && !clean.includes('not a simile') && !clean.includes('unlike a simile')) {
      return {
        conceptRecognized: 'metaphor_vs_simile_distinction',
        evaluation: 'partially-correct',
        guidanceTip: 'Key distinction: Remember that similes make an explicit comparison using "like" or "as", whereas metaphors make a direct conceptual assertion (saying X *is* Y) without comparative connectives.'
      };
    }

    // Checking Tenor/Vehicle structural breakdown
    if ((mentionsTenor && mentionsVehicle) || (mentionsVehicle && mentionsGround) || (mentionsTenor && mentionsGround)) {
      return {
        conceptRecognized: 'rhetorical_triad_mapping',
        evaluation: 'correct',
        guidanceTip: 'Superb analytical rigor: You are systematically breaking down the figurative architecture (the tenor being illuminated, the vehicle providing imagery, and the ground establishing the resonance).'
      };
    }

    // Checking figurative vs literal interpretation
    const mentionsStealingOrFleeting = /steal|slip|escape|disappear|silent|precious|unnoticed|take away/.test(clean);
    const mentionsTimeOrThief = /time|thief|opportunity|years/.test(clean);

    if (mentionsStealingOrFleeting && mentionsTimeOrThief) {
      return {
        conceptRecognized: 'connotative_ground_analysis',
        evaluation: 'correct',
        guidanceTip: 'Nuanced literary interpretation: You identified the implied ground—the way time, like an undetected thief, silently and irrecoverably deprives us of precious moments without warning.'
      };
    }

    // General qualitative interpretation
    const mentionsSymbolOrMeaning = /meaning|feel|emotion|imagery|poetic|effect|suggests|implies/.test(clean);
    if (mentionsSymbolOrMeaning) {
      return {
        conceptRecognized: 'affective_literary_interpretation',
        evaluation: 'correct',
        guidanceTip: 'Perceptive textual reading: In literature, multiple interpretations of metaphor are valid as long as they are grounded in textual connotations and emotional resonance.'
      };
    }

    if (clean.length > 5) {
      return {
        conceptRecognized: 'emerging_interpretive_reading',
        evaluation: 'insufficient-info',
        guidanceTip: 'In literary analysis, focus closely on the comparison: what is the literal concept (the tenor), and what concrete image (the vehicle) is used to describe it?'
      };
    }
  }

  return { evaluation: null };
}
