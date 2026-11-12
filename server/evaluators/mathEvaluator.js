/**
 * Deterministic Mathematics Evaluator
 * Verifies linear equations, arithmetic steps, and final roots without relying exclusively on LLMs.
 */

export function parseLinearEquation(rawEq) {
  if (!rawEq || typeof rawEq !== 'string') return null;
  const eq = rawEq.replace(/\s+/g, '').replace('−', '-');
  const sides = eq.split('=');
  if (sides.length !== 2) return null;

  try {
    // Parse left side ax + b
    const left = parseLinearSide(sides[0]);
    // Parse right side cx + d
    const right = parseLinearSide(sides[1]);

    if (!left || !right) return null;

    // Combine: ax + b = cx + d  =>  (a - c)x = (d - b)
    const combinedA = left.a - right.a;
    const combinedB = right.b - left.b;
    const variable = left.variable || right.variable || 'x';

    if (Math.abs(combinedA) < 1e-9) {
      return {
        hasInfiniteSolutions: Math.abs(combinedB) < 1e-9,
        hasNoSolution: Math.abs(combinedB) >= 1e-9,
      };
    }

    const exactRoot = combinedB / combinedA;
    return {
      variable,
      leftA: left.a,
      leftB: left.b,
      rightA: right.a,
      rightB: right.b,
      combinedA,
      combinedB,
      exactRoot,
      roundedRoot: Math.round(exactRoot * 1000) / 1000,
    };
  } catch {
    return null;
  }
}

function parseLinearSide(sideStr) {
  // Matches terms like 3x, -2.5x, x, -x, +7, -4
  const termRegex = /([+-]?[0-9.]*)([a-zA-Z]?)/g;
  let a = 0;
  let b = 0;
  let variable = null;

  let match;
  while ((match = termRegex.exec(sideStr)) !== null) {
    if (match.index === termRegex.lastIndex) termRegex.lastIndex++;
    const [full, coeffStr, varChar] = match;
    if (!full) continue;

    if (varChar) {
      variable = varChar;
      let coeff = 1;
      if (coeffStr === '-' || coeffStr === '-1') coeff = -1;
      else if (coeffStr === '+' || coeffStr === '' || coeffStr === '+1') coeff = 1;
      else coeff = parseFloat(coeffStr);
      a += coeff;
    } else if (coeffStr && coeffStr !== '+' && coeffStr !== '-') {
      b += parseFloat(coeffStr);
    }
  }

  return { a, b, variable };
}

/**
 * Deterministically check student input against the equation context
 */
export function evaluateMathResponse(equationStr, studentText) {
  const parsed = parseLinearEquation(equationStr);
  if (!parsed || parsed.exactRoot === undefined) {
    return { isDeterministic: false };
  }

  const clean = studentText.toLowerCase().replace(/−/g, '-');
  
  // 1. Check if student provided a numeric answer for the variable (e.g., "x = 5", "5", "it is 5")
  const numMatch = clean.match(/(?:[a-zA-Z]\s*=\s*)?([+-]?\d+(?:\.\d+)?)/);
  if (numMatch) {
    const studentNum = parseFloat(numMatch[1]);
    const isExact = Math.abs(studentNum - parsed.exactRoot) < 1e-6;

    // Check common mistakes:
    // Mistake 1: Sign error (e.g. student added instead of subtracted)
    const signErrorRoot = (parsed.leftB !== 0) ? (parsed.rightB + parsed.leftB) / parsed.leftA : null;
    const isSignError = signErrorRoot !== null && Math.abs(studentNum - signErrorRoot) < 1e-6;

    return {
      isDeterministic: true,
      exactSolution: parsed.roundedRoot,
      studentValue: studentNum,
      isCorrect: isExact,
      isPartiallyCorrect: isSignError,
      evaluation: isExact ? 'correct' : isSignError ? 'partially-correct' : 'incorrect',
      feedbackTip: isExact
        ? `Mathematically verified: ${parsed.variable} = ${parsed.roundedRoot} satisfies the equality perfectly.`
        : isSignError
        ? `Sign error detected: It looks like you added when you needed to subtract (or vice-versa). Check your inverse operation.`
        : `Arithmetic mismatch: The value ${studentNum} does not balance the equation. Try substituting ${studentNum} back in to check.`
    };
  }

  // 2. Check if student describes an intermediate step (e.g. "subtract 7", "divide by 3", "add 4")
  const mentionsSubtract = /subtract|minus|take away/.test(clean);
  const mentionsDivide = /divide|over/.test(clean);
  const mentionsAdd = /add|plus/.test(clean);

  if (mentionsSubtract && parsed.leftB > 0) {
    return {
      isDeterministic: true,
      exactSolution: parsed.roundedRoot,
      evaluation: 'partially-correct',
      feedbackTip: `Correct strategy: Subtracting ${parsed.leftB} from both sides unbinds the constant term.`
    };
  }

  if (mentionsAdd && parsed.leftB < 0) {
    return {
      isDeterministic: true,
      exactSolution: parsed.roundedRoot,
      evaluation: 'partially-correct',
      feedbackTip: `Correct strategy: Adding ${Math.abs(parsed.leftB)} to both sides neutralizes the negative constant.`
    };
  }

  if (mentionsDivide && Math.abs(parsed.leftA) > 1) {
    return {
      isDeterministic: true,
      exactSolution: parsed.roundedRoot,
      evaluation: 'partially-correct',
      feedbackTip: `Correct strategy: Dividing by the coefficient ${parsed.leftA} will isolate the unit variable.`
    };
  }

  return {
    isDeterministic: true,
    exactSolution: parsed.roundedRoot,
    evaluation: 'insufficient-info',
    feedbackTip: `Remember: The goal is to isolate ${parsed.variable}. What operation is currently attached to it?`
  };
}
