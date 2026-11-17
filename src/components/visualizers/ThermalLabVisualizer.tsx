import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VisualizerContainer } from './VisualizerContainer';
import { SceneCanvas } from '../three/SceneCanvas';
import { ThreeSceneBoundary } from '../three/ThreeSceneBoundary';
import { calculateThermalLab, THERMAL_LAB_MODEL } from '../../utils/scientificEngines';
import type { ThermalLabState, ThermalMaterialId } from '../../types/scientificModel';
import type { BaseVisualizerProps } from './types';

// Precomputed lattice nodes for purity
const LATTICE_OFFSETS: [number, number, number][] = [];
for (let i = 0; i < 24; i++) {
  const normX = (i / 23) * 3.2 - 1.6;
  const angle = (i * 137.5 * Math.PI) / 180;
  const radius = 0.22;
  LATTICE_OFFSETS.push([normX, Math.cos(angle) * radius, Math.sin(angle) * radius]);
}

// 3D Scene for Thermal Laboratory
const Thermal3DScene: React.FC<{ state: ThermalLabState }> = ({ state }) => {
  const outputs = useMemo(() => calculateThermalLab(state), [state]);
  const latticeGroupRef = useRef<THREE.Group | null>(null);

  useFrame((stateContext) => {
    if (!latticeGroupRef.current) return;
    const time = stateContext.clock.getElapsedTime ? stateContext.clock.getElapsedTime() : 0;
    
    // Animate molecular lattice vibration amplitude based on local thermal kinetic energy
    latticeGroupRef.current.children.forEach((child, idx) => {
      const orig = LATTICE_OFFSETS[idx];
      if (orig) {
        const frac = idx / (LATTICE_OFFSETS.length - 1);
        const localTemp = state.hotEndTempC - (state.hotEndTempC - state.coldEndTempC) * frac;
        const amp = (localTemp / 150) * 0.05 * outputs.atomVibrationAmplitude;
        child.position.x = orig[0] + Math.sin(time * 20 + idx) * amp;
        child.position.y = orig[1] + Math.cos(time * 24 + idx) * amp;
        child.position.z = orig[2] + Math.sin(time * 28 + idx) * amp;
      }
    });
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />

      {/* Bench Platform Base */}
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[4.4, 0.08, 1.0]} />
        <meshStandardMaterial color="#161F2E" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Heat Source (Bunsen Flame at Left: x = -1.9) */}
      <mesh position={[-1.9, 0, 0]}>
        <coneGeometry args={[0.22, 0.6, 24]} />
        <meshBasicMaterial color="#FF4500" />
      </mesh>
      <pointLight position={[-1.9, 0.2, 0]} intensity={2.0} color="#FF6A00" distance={2.5} />

      {/* Heat Sink (Chilled Reservoir at Right: x = 1.9) */}
      <mesh position={[1.9, 0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.4]} />
        <meshStandardMaterial color="#0284C7" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Cylindrical Conduction Rod with 5 Gradient Segments */}
      <group position={[0, 0, 0]}>
        {[-1.28, -0.64, 0, 0.64, 1.28].map((segX, idx) => {
          const temp = outputs.tempProfile[idx] || 50;
          // Interpolate color from fiery red to cool cyan
          const t = Math.max(0, Math.min(1, (temp - state.coldEndTempC) / Math.max(1, state.hotEndTempC - state.coldEndTempC)));
          const r = t;
          const g = 0.2 + (1 - t) * 0.4;
          const b = 1 - t;

          return (
            <mesh key={idx} position={[segX, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.25, 0.25, 0.62, 32]} />
              <meshStandardMaterial
                color={new THREE.Color(r, g, b)}
                metalness={state.materialId === 'glass' ? 0.1 : 0.85}
                roughness={state.materialId === 'glass' ? 0.05 : 0.3}
                transparent={state.materialId === 'glass'}
                opacity={state.materialId === 'glass' ? 0.6 : 1.0}
              />
            </mesh>
          );
        })}
      </group>

      {/* Vibrating Molecular Lattice Atoms */}
      <group ref={latticeGroupRef}>
        {LATTICE_OFFSETS.map((pos, idx) => {
          const frac = idx / (LATTICE_OFFSETS.length - 1);
          const temp = state.hotEndTempC - (state.hotEndTempC - state.coldEndTempC) * frac;
          const isHot = temp > 60;
          return (
            <mesh key={idx} position={pos}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshBasicMaterial color={isHot ? '#FF5500' : '#38BDF8'} />
            </mesh>
          );
        })}
      </group>

      {/* 5 Wax Indicator Pins attached along bottom of rod */}
      <group position={[0, -0.28, 0]}>
        {[-1.28, -0.64, 0, 0.64, 1.28].map((pinX, idx) => {
          const temp = outputs.tempProfile[idx] || 0;
          const hasFallen = temp >= 55; // Paraffin wax melting point is 55°C

          return (
            <group key={idx} position={[pinX, hasFallen ? -0.32 : 0, 0]}>
              {/* Wax Blob */}
              <mesh position={[0, hasFallen ? -0.04 : 0.05, 0]}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color={hasFallen ? '#94A3B8' : '#FDE047'} roughness={0.9} />
              </mesh>
              {/* Metal Pin */}
              <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.2, 12]} />
                <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
};

// 2D Schematic Fallback
const Thermal2DSchematic: React.FC<{ state: ThermalLabState }> = ({ state }) => {
  const outputs = calculateThermalLab(state);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
      <svg className="w-full max-w-md h-56" viewBox="0 0 400 240">
        {/* Conduction bar */}
        <defs>
          <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="60" y="80" width="280" height="40" fill="url(#heatGradient)" rx="4" />
        {/* Heat source */}
        <circle cx="40" cy="100" r="16" fill="#DC2626" />
        <text x="40" y="104" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">T_h</text>
        {/* Cold sink */}
        <rect x="345" y="85" width="25" height="30" fill="#0284C7" rx="2" />
        <text x="357" y="104" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">T_c</text>
        {/* 5 Probes */}
        {[60, 130, 200, 270, 340].map((px, idx) => (
          <g key={idx}>
            <line x1={px} y1="120" x2={px} y2="150" stroke="#94A3B8" strokeWidth="2" />
            <circle cx={px} cy="155" r="4" fill={outputs.tempProfile[idx] >= 55 ? '#EF4444' : '#FDE047'} />
            <text x={px} y="175" fill="#8DA391" fontSize="10" textAnchor="middle" fontFamily="monospace">
              {outputs.tempProfile[idx]}°C
            </text>
          </g>
        ))}
        {/* Temperature Gradient curve */}
        <line x1="60" y1="50" x2="340" y2="70" stroke="#B8FF00" strokeWidth="2.5" />
        <text x="200" y="42" fill="#B8FF00" fontSize="11" textAnchor="middle" fontFamily="monospace">
          dT/dx = {outputs.temperatureGradient} K/m &bull; Q/t = {outputs.heatTransferRateWatts} W
        </text>
      </svg>
      <div className="font-mono text-xs text-[#8DA391]">
        Fourier Conduction: Q/t = k · A · (ΔT / L) &bull; Wax Melting Threshold: 55°C
      </div>
    </div>
  );
};

export const ThermalLabVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [mode, setMode] = useState<'3d' | '2d'>('3d');
  const [state, setState] = useState<ThermalLabState>(THERMAL_LAB_MODEL.initialState);

  const outputs = useMemo(() => calculateThermalLab(state), [state]);
  const telemetry = useMemo(() => THERMAL_LAB_MODEL.getTelemetry(state, outputs), [state, outputs]);
  const explanation = useMemo(() => THERMAL_LAB_MODEL.getExplanation(state, outputs, null), [state, outputs]);

  const handleReset = () => setState(THERMAL_LAB_MODEL.initialState);

  return (
    <VisualizerContainer<ThermalLabState>
      title={THERMAL_LAB_MODEL.name}
      discipline={THERMAL_LAB_MODEL.discipline}
      curriculumTopicId={topic.id}
      mode={mode}
      onToggleMode={setMode}
      onReset={handleReset}
      formulaDisplay={{
        latex: '\\frac{Q}{t} = k \\cdot A \\cdot \\frac{T_{\\text{hot}} - T_{\\text{cold}}}{L}',
        description: "Fourier's Law of One-Dimensional Thermal Conduction",
      }}
      stageContent={
        mode === '3d' ? (
          <ThreeSceneBoundary fallback={<Thermal2DSchematic state={state} />}>
            <SceneCanvas fallback={<Thermal2DSchematic state={state} />} camera={{ position: [0, 1.2, 4.0], fov: 46 }}>
              <Thermal3DScene state={state} />
            </SceneCanvas>
          </ThreeSceneBoundary>
        ) : (
          <Thermal2DSchematic state={state} />
        )
      }
      controlsContent={
        <div className="space-y-4 text-xs font-mono">
          {/* Material Selector */}
          <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
            <span className="text-white font-semibold block">Conduction Material (k)</span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'copper' as ThermalMaterialId, label: 'Copper (385 W/mK)' },
                { id: 'aluminum' as ThermalMaterialId, label: 'Aluminum (205 W/mK)' },
                { id: 'iron' as ThermalMaterialId, label: 'Iron (80 W/mK)' },
                { id: 'glass' as ThermalMaterialId, label: 'Glass (0.8 W/mK)' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setState((s) => ({ ...s, materialId: m.id }))}
                  className={`p-2 rounded-lg text-left transition-all cursor-pointer ${
                    state.materialId === m.id
                      ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-[#8DA391] border border-white/05'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hot End Temperature */}
          <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
            <div className="flex justify-between text-white">
              <span>Hot End Temp (T_hot)</span>
              <span className="text-red-400 font-bold">{state.hotEndTempC} °C</span>
            </div>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={state.hotEndTempC}
              onChange={(e) => setState((s) => ({ ...s, hotEndTempC: Number(e.target.value) }))}
              className="w-full accent-red-500 cursor-pointer"
            />
          </div>

          {/* Cold End Temperature */}
          <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
            <div className="flex justify-between text-white">
              <span>Cold End Temp (T_cold)</span>
              <span className="text-cyan-400 font-bold">{state.coldEndTempC} °C</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="2"
              value={state.coldEndTempC}
              onChange={(e) => setState((s) => ({ ...s, coldEndTempC: Number(e.target.value) }))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Rod Length */}
          <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
            <div className="flex justify-between text-white">
              <span>Rod Length (L)</span>
              <span className="text-[#B8FF00] font-bold">{state.rodLengthCm} cm</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={state.rodLengthCm}
              onChange={(e) => setState((s) => ({ ...s, rodLengthCm: Number(e.target.value) }))}
              className="w-full accent-[#B8FF00] cursor-pointer"
            />
          </div>
        </div>
      }
      telemetry={telemetry}
      explanation={explanation}
      presets={THERMAL_LAB_MODEL.presets}
      onSelectPreset={(p) => setState(p.state)}
    />
  );
};
