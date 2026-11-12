/**
 * Subject-Aware Geography and Earth Systems Evaluator
 * Evaluates dynamic Earth mechanisms (plate tectonics, mantle convection, boundary interactions)
 * and addresses common geological misconceptions with honest 4-tier evaluation:
 * "correct" | "partially-correct" | "incorrect" | "insufficient-info".
 */

export function evaluateGeographyResponse(topicId, studentText) {
  const clean = studentText.toLowerCase();

  const isTectonicsTopic =
    topicId === 'geo-plate-tectonics' ||
    (typeof topicId === 'string' && topicId.startsWith('geo-'));

  if (isTectonicsTopic) {
    // 1. Check for common geological misconceptions
    const magmaOceanTrap = /float.*(liquid|molten|lake|ocean).*lava|plates? float.*on liquid magma|liquid sea under/i.test(clean);
    if (magmaOceanTrap) {
      return {
        conceptRecognized: 'asthenosphere_rheology_misconception',
        evaluation: 'partially-correct',
        guidanceTip: 'Important geophysical clarification: Earth\'s mantle is not an open sea of liquid molten magma. The asthenosphere is solid rock that behaves plastically (like warm silicone or silly putty) over millions of years under intense heat and pressure.'
      };
    }

    const staticEarthTrap = /plates don't move|continents.*static|earthquakes.*random.*unconnected/i.test(clean);
    if (staticEarthTrap) {
      return {
        conceptRecognized: 'static_crust_misconception',
        evaluation: 'incorrect',
        guidanceTip: 'Geophysical evidence refutes a static crust: GPS satellite geodesy, seafloor magnetic stripe reversals, and fossil distributions prove lithospheric plates continuously move at rates of 2 to 10 cm per year.'
      };
    }

    // 2. Key causal concepts
    const mentionsConvection = /convection|heat.*core|thermal|radiogenic|mantle currents?|rising heat/i.test(clean);
    const mentionsSubduction = /subduct|slab pull|trench|denser plate|sink|volcanic arc/i.test(clean);
    const mentionsBoundaries = /convergent|divergent|transform|fault|ridge|spreading center/i.test(clean);
    const mentionsLithosphere = /lithosphere|crust|tectonic plates?|continental|oceanic/i.test(clean);

    // Multi-factor geophysical synthesis
    const factors = [mentionsConvection, mentionsSubduction, mentionsBoundaries, mentionsLithosphere].filter(Boolean).length;

    if (factors >= 2) {
      return {
        conceptRecognized: 'coupled_geodynamic_system',
        evaluation: 'correct',
        guidanceTip: 'Accurate geophysical synthesis: You correctly linked mantle thermal convection/slab pull forces with lithospheric plate motion and boundary deformation.'
      };
    }

    if (mentionsConvection) {
      return {
        conceptRecognized: 'mantle_convection_engine',
        evaluation: 'partially-correct',
        guidanceTip: 'Strong foundational insight: Convection currents driven by Earth\'s internal primordial and radioactive heat circulate in the mantle. How do these circular currents physically drag or pull the brittle lithosphere above them?'
      };
    }

    if (mentionsSubduction || mentionsBoundaries) {
      return {
        conceptRecognized: 'plate_boundary_mechanics',
        evaluation: 'partially-correct',
        guidanceTip: 'Accurate boundary identification: Where plates converge, colder and denser oceanic lithosphere sinks into the mantle (slab pull). What driving mechanism continuously supplies new lithosphere at divergent spreading centers?'
      };
    }

    if (mentionsLithosphere) {
      return {
        conceptRecognized: 'lithospheric_structure',
        evaluation: 'partially-correct',
        guidanceTip: 'Correct structural observation: The rigid lithosphere is broken into interlocking tectonic plates. What is the fundamental thermal engine in Earth\'s interior that keeps these plates in motion?'
      };
    }

    if (clean.length > 5) {
      return {
        conceptRecognized: 'initial_geographical_observation',
        evaluation: 'insufficient-info',
        guidanceTip: 'Focus on the physical mechanism: What drives the movement of Earth\'s tectonic plates, and what happens where two plates collide or pull apart?'
      };
    }
  }

  return { evaluation: null };
}
