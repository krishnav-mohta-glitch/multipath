/**
 * Subject-Aware History Evaluator
 * Evaluates causal argumentation, evidence weighting, and accepts valid historiographical interpretations.
 */

export function evaluateHistoryResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  if (topicId === 'hist-french-revolution') {
    // Recognize multiple valid historical frameworks
    const mentionsDebt = /debt|bankruptcy|american war|deficit|necker|calonne/.test(clean);
    const mentionsTaxInequality = /estates|privilege|nobility|clergy|tax.*exempt|taille/.test(clean);
    const mentionsFamine = /bread|famine|harvest|hail|1788|starv/.test(clean);
    const mentionsEnlightenment = /enlightenment|rousseau|voltaire|sovereignty|rights|sieyes/.test(clean);

    const factorCount = [mentionsDebt, mentionsTaxInequality, mentionsFamine, mentionsEnlightenment].filter(Boolean).length;

    if (factorCount >= 2) {
      return {
        historiographicalPerspective: 'multi_causal_synthesis',
        evaluation: 'correct',
        guidanceTip: 'Excellent historical reasoning: You recognize that the revolution resulted from intersecting structural pressures (fiscal insolvency, social caste privilege, and subsistence crisis) rather than a single trigger.'
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
  }

  return { evaluation: null };
}
