/**
 * Subject-Aware Computer Science Evaluator
 * Evaluates algorithmic reasoning, precondition invariants (sorted data),
 * time complexity (O(log n)), and divide-and-conquer mechanics with honest 4-tier evaluation:
 * "correct" | "partially-correct" | "incorrect" | "insufficient-info".
 */

export function evaluateCsResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  const isBinarySearchTopic =
    topicId === 'cs-binary-search' ||
    (typeof topicId === 'string' && topicId.startsWith('cs-'));

  if (isBinarySearchTopic) {
    // 1. Common algorithmic misconceptions
    const unsortedTrap = /(works on any array|doesn't need to be sorted|unsorted array|random order)/i.test(clean);
    if (unsortedTrap) {
      return {
        conceptRecognized: 'precondition_sorted_invariant_misconception',
        evaluation: 'partially-correct',
        guidanceTip: 'Critical algorithmic precondition: Binary search strictly requires the collection to be sorted. If elements are unsorted, discarding one half can inadvertently discard the target element, leading to false negatives.'
      };
    }

    const constantTimeTrap = /o\(1\)|constant time|instant lookup like a hash/i.test(clean);
    if (constantTimeTrap) {
      return {
        conceptRecognized: 'time_complexity_constant_trap',
        evaluation: 'incorrect',
        guidanceTip: 'Complexity correction: Binary search operates in O(log n) logarithmic time, not O(1) constant time. Only hash tables achieve average O(1) lookup. Binary search repeatedly halves the search space until 1 element remains.'
      };
    }

    // 2. Key concepts
    const mentionsSorted = /sorted|ordered|ascending|descending|in order/i.test(clean);
    const mentionsHalving = /half|halv|divide|discard|eliminate half|middle|midpoint|\/ 2/i.test(clean);
    const mentionsLogN = /o\(log n\)|logarithmic|log n|powers? of 2/i.test(clean);
    const mentionsPointers = /pointers?|low.*high|left.*right|indices|index/i.test(clean);

    // Multi-factor algorithmic synthesis
    if (mentionsSorted && (mentionsHalving || mentionsLogN)) {
      return {
        conceptRecognized: 'divide_and_conquer_invariant',
        evaluation: 'correct',
        guidanceTip: 'Precise algorithmic reasoning: You identified both the essential precondition (sorted array) and the divide-and-conquer halving mechanism that gives binary search its O(log n) efficiency.'
      };
    }

    if (mentionsHalving && mentionsPointers) {
      return {
        conceptRecognized: 'pointer_manipulation_halving',
        evaluation: 'correct',
        guidanceTip: 'Accurate mechanical execution: Calculating the midpoint and adjusting low/high pointer boundaries halves the search space in each iteration.'
      };
    }

    if (mentionsSorted) {
      return {
        conceptRecognized: 'sorted_precondition',
        evaluation: 'partially-correct',
        guidanceTip: 'Foundational prerequisite recognized: The array must be sorted. Now explain the step: once you examine the element at the midpoint, how do you decide which half to discard?'
      };
    }

    if (mentionsHalving) {
      return {
        conceptRecognized: 'halving_reduction',
        evaluation: 'partially-correct',
        guidanceTip: 'Key operational strategy identified: Repeated halving reduces the problem exponentially. What invariant must the input array satisfy for this halving decision to be reliable?'
      };
    }

    if (mentionsLogN) {
      return {
        conceptRecognized: 'logarithmic_complexity',
        evaluation: 'partially-correct',
        guidanceTip: 'Accurate complexity metric: Logarithmic scaling O(log n) means searching a billion items takes at most ~30 comparisons. Why does halving the search space yield a logarithmic curve?'
      };
    }

    if (clean.length > 5) {
      return {
        conceptRecognized: 'preliminary_computational_thought',
        evaluation: 'insufficient-info',
        guidanceTip: 'In computer science, break the algorithm down: what must be true about the data beforehand, and how does checking the middle element narrow down where the target could be?'
      };
    }
  }

  return { evaluation: null };
}
