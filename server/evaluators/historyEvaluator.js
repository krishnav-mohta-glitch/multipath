/**
 * Subject-Aware History Evaluator
 * Evaluates causal argumentation, evidence weighting, and accepts valid historiographical interpretations.
 */

export function evaluateHistoryResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  const isHistoryTopic =
    topicId === 'hist-french-revolution' ||
    (typeof topicId === 'string' && topicId.startsWith('hist-'));

  if (isHistoryTopic) {
    // Recognize multiple valid historical frameworks
    const mentionsDebt = /debt|bankruptcy|american war|deficit|necker|calonne/.test(clean);
    const mentionsTaxInequality = /estates|privilege|nobility|clergy|tax.*exempt|taille/.test(clean);
    const mentionsFamine = /bread|famine|harvest|hail|1788|starv/.test(clean);
    const mentionsEnlightenment = /enlightenment|rousseau|voltaire|sovereignty|rights|sieyes/.test(clean);
    const mentionsDeadlockOrRepresentation = /voting by (order|head)|national assembly|tennis court|deadlock|representation|third estate/.test(clean);

    const factorCount = [mentionsDebt, mentionsTaxInequality, mentionsFamine, mentionsEnlightenment, mentionsDeadlockOrRepresentation].filter(Boolean).length;

    if (factorCount >= 2) {
      return {
        historiographicalPerspective: 'multi_causal_synthesis',
        evaluation: 'correct',
        guidanceTip: 'Excellent historical reasoning: You recognize that the revolution resulted from intersecting structural pressures (fiscal insolvency, social caste privilege, institutional voting paralysis, and subsistence crisis) rather than a single trigger.'
      };
    }

    if (mentionsDebt || mentionsTaxInequality) {
      return {
        historiographicalPerspective: 'fiscal_structural_thesis',
        evaluation: 'partially-correct',
        guidanceTip: 'Strong institutional focus. In addition to fiscal debt and tax privilege, consider what immediate environmental crisis in 1788-1789 brought the Parisian working classes into armed revolt.'
      };
    }

    if (mentionsFamine) {
      return {
        historiographicalPerspective: 'subsistence_crisis_thesis',
        evaluation: 'partially-correct',
        guidanceTip: 'Accurate observation of the physical catalyst. Now connect bread prices to the political paralysis: why was the Crown unable to provide financial famine relief?'
      };
    }

    if (mentionsEnlightenment) {
      return {
        historiographicalPerspective: 'ideological_catalyst_thesis',
        evaluation: 'partially-correct',
        guidanceTip: 'Insightful philosophical dimension. How did Enlightenment ideas about popular sovereignty challenge the traditional Divine Right of the absolute Bourbon monarchy?'
      };
    }

    if (clean.length > 5) {
      return {
        historiographicalPerspective: 'initial_historical_inquiry',
        evaluation: 'insufficient-info',
        guidanceTip: 'In historical causality, examine both long-term structural tensions (debt, caste privileges) and immediate triggers (famine, riots). What specific factors connect to your observation?'
      };
    }
  }

  return { evaluation: null };
}
