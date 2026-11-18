import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle
} from 'lucide-react';
import type { Topic } from '../../../types/topic';

export interface InteractivePassionSandboxProps {
  topic: Topic;
  passionId: string;
}

interface PassionTheme {
  primary: string;
  accent: string;
  bgGradient: string;
  border: string;
  pillBg: string;
  pillText: string;
  icon: string;
  domainName: string;
}

const PASSION_THEMES: Record<string, PassionTheme> = {
  football: {
    primary: '#B8FF00',
    accent: '#10B981',
    bgGradient: 'from-[#0A1A12] via-[#08120C] to-[#080A0E]',
    border: 'border-[#10B981]/30',
    pillBg: 'bg-[#10B981]/15',
    pillText: 'text-[#34D399]',
    icon: '⚽',
    domainName: 'Football Pitch Dynamics',
  },
  cricket: {
    primary: '#FBBF24',
    accent: '#D97706',
    bgGradient: 'from-[#1A1408] via-[#120E06] to-[#080A0E]',
    border: 'border-[#F59E0B]/30',
    pillBg: 'bg-[#F59E0B]/15',
    pillText: 'text-[#FCD34D]',
    icon: '🏏',
    domainName: 'Cricket Turf & Seam Laboratory',
  },
  gaming: {
    primary: '#06B6D4',
    accent: '#8B5CF6',
    bgGradient: 'from-[#081520] via-[#0D0B1C] to-[#080A0E]',
    border: 'border-[#06B6D4]/30',
    pillBg: 'bg-[#06B6D4]/15',
    pillText: 'text-[#67E8F9]',
    icon: '🎮',
    domainName: 'Game Physics & Hitbox Sandbox',
  },
  space: {
    primary: '#818CF8',
    accent: '#C084FC',
    bgGradient: 'from-[#0B0D20] via-[#080A18] to-[#080A0E]',
    border: 'border-[#818CF8]/30',
    pillBg: 'bg-[#818CF8]/15',
    pillText: 'text-[#A5B4FC]',
    icon: '🚀',
    domainName: 'Orbital & Trajectory Simulator',
  },
  music: {
    primary: '#F472B6',
    accent: '#38BDF8',
    bgGradient: 'from-[#1A0A16] via-[#100712] to-[#080A0E]',
    border: 'border-[#F472B6]/30',
    pillBg: 'bg-[#F472B6]/15',
    pillText: 'text-[#F472B6]',
    icon: '🎵',
    domainName: 'Acoustic Resonance & Wave Lab',
  },
  robotics: {
    primary: '#2DD4BF',
    accent: '#F59E0B',
    bgGradient: 'from-[#071717] via-[#081012] to-[#080A0E]',
    border: 'border-[#2DD4BF]/30',
    pillBg: 'bg-[#2DD4BF]/15',
    pillText: 'text-[#5EEAD4]',
    icon: '🤖',
    domainName: 'Robotics Actuator & Sensor Sandbox',
  },
};

export const InteractivePassionSandbox: React.FC<InteractivePassionSandboxProps> = ({
  topic,
  passionId,
}) => {
  const theme = PASSION_THEMES[passionId] || PASSION_THEMES.football;

  // Determine scenario archetype based on topic
  const isMechanicsOrPressure = topic.id.includes('force') || topic.id.includes('pressure') || topic.subjectId === 'physics';
  const isMathOrLinear = topic.id.includes('linear') || topic.id.includes('equation') || topic.subjectId === 'mathematics';

  // ---------------------------------------------------------------------------
  // ARCHETYPE 1: FORCE & PRESSURE SCENARIO (e.g. Football Studs / Gaming Hitbox)
  // ---------------------------------------------------------------------------
  const [athleteMassKg, setAthleteMassKg] = useState<number>(75);
  const [footwearMode, setFootwearMode] = useState<'sneaker' | 'molded' | 'pro_studs'>('pro_studs');

  const contactAreaSqM = useMemo(() => {
    switch (footwearMode) {
      case 'sneaker': return 0.02; // 200 cm²
      case 'molded': return 0.0012; // 12 cm²
      case 'pro_studs': return 0.0003; // 3 cm²
    }
  }, [footwearMode]);

  const forceN = athleteMassKg * 9.8; // F = m * g
  const pressurePa = forceN / contactAreaSqM;
  const pressureAtm = pressurePa / 101325;
  const turfBitePercent = Math.min(100, Math.round((pressureAtm / 25) * 100));

  // ---------------------------------------------------------------------------
  // ARCHETYPE 2: LINEAR EQUATIONS SCENARIO (e.g. Points per Match / Budget Ladder)
  // ---------------------------------------------------------------------------
  const [baselinePoints, setBaselinePoints] = useState<number>(18);
  const [pointsPerUnit, setPointsPerUnit] = useState<number>(3);
  const [targetGoal, setTargetGoal] = useState<number>(45);

  const neededUnits = useMemo(() => {
    if (pointsPerUnit <= 0) return 0;
    const diff = Math.max(0, targetGoal - baselinePoints);
    return Math.ceil(diff / pointsPerUnit);
  }, [baselinePoints, pointsPerUnit, targetGoal]);

  // ---------------------------------------------------------------------------
  // ARCHETYPE 3: UNIVERSAL SCALING SCENARIO
  // ---------------------------------------------------------------------------
  const [inputVal, setInputVal] = useState<number>(50);
  const [efficiencyVal, setEfficiencyVal] = useState<number>(80);
  const calculatedOutput = Math.round((inputVal * (efficiencyVal / 100)) * 1.5);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${theme.bgGradient} border ${theme.border} text-white space-y-6 shadow-2xl transition-all`}>
      
      {/* Sandbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-xl shrink-0">
            {theme.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs font-bold uppercase tracking-wider ${theme.pillText}`}>
                {theme.domainName}
              </span>
              <span className="font-mono text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                Live Interactive Sandbox
              </span>
            </div>
            <h4 className="font-display font-bold text-base sm:text-lg text-white">
              {isMechanicsOrPressure && `Test Grip, Stud Pressure & Turf Bite`}
              {isMathOrLinear && `Simulate Trajectory & Target Milestones (y = mx + c)`}
              {!isMechanicsOrPressure && !isMathOrLinear && `Interactive ${topic.title} Balance Experiment`}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="font-mono text-xs text-white/60">Real-time Model</span>
          <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
        </div>
      </div>

      {/* =================================================================== */}
      {/* SCENARIO 1: MECHANICS / FORCE & PRESSURE                            */}
      {/* =================================================================== */}
      {isMechanicsOrPressure && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Controls Deck */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">
                    {passionId === 'football' ? 'Player Mass (kg)' : passionId === 'gaming' ? 'Projectile Force (kg mass equiv)' : 'Athlete Mass (kg)'}
                  </span>
                  <span className="font-bold text-white">{athleteMassKg} kg ({Math.round(forceN)} N)</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="110"
                  step="1"
                  value={athleteMassKg}
                  onChange={(e) => setAthleteMassKg(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-mono text-[#8DA391] uppercase font-bold block mb-2">
                  {passionId === 'football' ? 'Footwear / Stud Configuration' : passionId === 'gaming' ? 'Weapon Impact Tip' : 'Crease Spike Type'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFootwearMode('sneaker')}
                    className={`p-2.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                      footwearMode === 'sneaker'
                        ? 'bg-white/20 text-white border-white/40 shadow-sm'
                        : 'bg-white/5 text-[#8DA391] hover:text-white border-white/08'
                    }`}
                  >
                    <span className="block text-sm">👟</span>
                    <span>Flat Sneaker</span>
                    <span className="block text-[10px] text-white/50">200 cm²</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFootwearMode('molded')}
                    className={`p-2.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                      footwearMode === 'molded'
                        ? 'bg-white/20 text-white border-white/40 shadow-sm'
                        : 'bg-white/5 text-[#8DA391] hover:text-white border-white/08'
                    }`}
                  >
                    <span className="block text-sm">🥾</span>
                    <span>Molded (12)</span>
                    <span className="block text-[10px] text-white/50">12 cm²</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFootwearMode('pro_studs')}
                    className={`p-2.5 rounded-xl font-mono text-xs font-bold transition-all border cursor-pointer ${
                      footwearMode === 'pro_studs'
                        ? 'bg-[#B8FF00] text-[#080A0E] border-[#B8FF00] shadow-md font-extrabold'
                        : 'bg-white/5 text-[#8DA391] hover:text-white border-white/08'
                    }`}
                  >
                    <span className="block text-sm">⚡</span>
                    <span>Pro Studs (6)</span>
                    <span className="block text-[10px] opacity-70">3 cm²</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Telemetry Display */}
            <div className="p-5 rounded-2xl bg-[#080A0E]/90 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#8DA391] tracking-wider block">
                  Calculated Contact Pressure (P = F / A)
                </span>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#B8FF00] tracking-tight mt-1">
                  {Math.round(pressurePa).toLocaleString()} <span className="text-sm font-mono text-[#8DA391]">Pascals</span>
                </div>
                <div className="text-xs font-mono text-white/70 mt-0.5">
                  &asymp; {pressureAtm.toFixed(1)} atmospheres of instantaneous punch
                </div>
              </div>

              {/* Live Turf Bite Gauge */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8DA391]">
                    {passionId === 'football' ? 'Turf Bite & Traction' : passionId === 'gaming' ? 'Armor Penetration Stress' : 'Pitch Clay Grip'}
                  </span>
                  <span className={`font-bold ${turfBitePercent > 70 ? 'text-[#B8FF00]' : turfBitePercent > 35 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {turfBitePercent}%
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      turfBitePercent > 70
                        ? 'bg-gradient-to-r from-emerald-500 to-[#B8FF00]'
                        : turfBitePercent > 35
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                        : 'bg-gradient-to-r from-rose-600 to-orange-500'
                    }`}
                    style={{ width: `${turfBitePercent}%` }}
                  />
                </div>
              </div>

              {/* Status Outcome */}
              <div className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                turfBitePercent > 70
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : turfBitePercent > 35
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                {turfBitePercent > 70 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#B8FF00]" />
                    <span><strong>100% Locked-In Grip:</strong> Studs penetrate past wet surface slime into firm ground.</span>
                  </>
                ) : turfBitePercent > 35 ? (
                  <>
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span><strong>Moderate Traction:</strong> Adequate for dry conditions; high slide risk if turf is wet.</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span><strong>Severe Slip Warning:</strong> Wide sole glides across mud layer like hydroplaning.</span>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENARIO 2: MATHEMATICS / LINEAR EQUATIONS                          */}
      {/* =================================================================== */}
      {isMathOrLinear && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">Starting Baseline Points (c)</span>
                  <span className="font-bold text-white">{baselinePoints} points</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={baselinePoints}
                  onChange={(e) => setBaselinePoints(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">Rate of Change / Points per Win (m)</span>
                  <span className="font-bold text-white">+{pointsPerUnit} per win</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={pointsPerUnit}
                  onChange={(e) => setPointsPerUnit(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">Target League Milestone (y)</span>
                  <span className="font-bold text-[#B8FF00]">{targetGoal} points</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Live Model Output */}
            <div className="p-5 rounded-2xl bg-[#080A0E]/90 border border-white/10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#8DA391] tracking-wider block">
                  Required Wins (x = [y - c] / m)
                </span>
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#B8FF00] tracking-tight mt-1">
                  {neededUnits} <span className="text-sm font-mono text-[#8DA391]">Matches Needed</span>
                </div>
                <div className="text-xs font-mono text-white/70 mt-1">
                  Equation: {targetGoal} = ({pointsPerUnit} &times; {neededUnits}) + {baselinePoints}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1">
                <div className="text-[#8DA391]">Algebraic Invariant in Action:</div>
                <div className="text-white font-semibold">
                  To isolate x, subtract {baselinePoints} from both sides: {targetGoal - baselinePoints} = {pointsPerUnit}x &rarr; divide by {pointsPerUnit}: x = {neededUnits}.
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCENARIO 3: UNIVERSAL INPUT / CONSERVATION SCENARIO                 */}
      {/* =================================================================== */}
      {!isMechanicsOrPressure && !isMathOrLinear && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">Input Driver (Magnitude)</span>
                  <span className="font-bold text-white">{inputVal} units</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={inputVal}
                  onChange={(e) => setInputVal(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#8DA391] uppercase font-bold">Conversion Efficiency</span>
                  <span className="font-bold text-white">{efficiencyVal}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={efficiencyVal}
                  onChange={(e) => setEfficiencyVal(Number(e.target.value))}
                  className="w-full accent-[#B8FF00] h-2 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080A0E]/90 border border-white/10 space-y-3 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase font-bold text-[#8DA391] tracking-wider block">
                  Observed Output Yield
                </span>
                <div className="text-3xl font-display font-extrabold text-[#B8FF00] tracking-tight mt-1">
                  {calculatedOutput} <span className="text-sm font-mono text-[#8DA391]">Effective Yield</span>
                </div>
              </div>
              <p className="text-xs text-[#8DA391] leading-relaxed">
                As you scale the input parameter, observe how the system balances energy and conservation according to the fundamental principle.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
