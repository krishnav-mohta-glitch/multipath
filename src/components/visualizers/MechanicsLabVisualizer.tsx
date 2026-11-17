import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VisualizerContainer } from './VisualizerContainer';
import { SceneCanvas } from '../three/SceneCanvas';
import { ThreeSceneBoundary } from '../three/ThreeSceneBoundary';
import { calculateMechanicsLab, MECHANICS_LAB_MODEL } from '../../utils/scientificEngines';
import type { MechanicsLabState, SurfaceMaterialId } from '../../types/scientificModel';
import type { BaseVisualizerProps } from './types';

// 3D Scene for Mechanics Laboratory
const Mechanics3DScene: React.FC<{ state: MechanicsLabState }> = ({ state }) => {
  const outputs = useMemo(() => calculateMechanicsLab(state), [state]);
  const blockRef = useRef<THREE.Mesh | null>(null);

  useFrame((_, delta) => {
    if (!blockRef.current) return;
    if (state.mode === 'dynamics') {
      // Animate block displacement if net force is positive
      if (outputs.accelerationMs2 > 0) {
        blockRef.current.position.x += delta * (outputs.velocityAfter2sMs * 0.25);
        if (blockRef.current.position.x > 1.6) {
          blockRef.current.position.x = -1.6;
        }
      }
    }
  });

  // Normalized contact area radius
  const areaRadius = Math.max(0.08, Math.min(0.7, Math.sqrt(state.contactAreaCm2) * 0.09));
  // Normalized penetration depth
  const penDepthNorm = (outputs.penetrationDepthMm / 25) * 0.25;

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />

      {/* Substrate Track Platform Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[4.2, 0.12, 1.2]} />
        <meshStandardMaterial
          color={
            state.surfaceType === 'ice'
              ? '#A5F3FC'
              : state.surfaceType === 'concrete'
              ? '#4B5563'
              : '#92400E'
          }
          roughness={state.surfaceType === 'ice' ? 0.05 : 0.8}
          metalness={state.surfaceType === 'ice' ? 0.6 : 0.1}
        />
      </mesh>

      {state.mode === 'pressure' ? (
        /* Pressure Mode: Hydraulic Piston & Malleable Substrate */
        <group>
          {/* Malleable Foam / Clay Bed */}
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[2.4, 0.28, 1.0]} />
            <meshStandardMaterial color="#D97706" roughness={0.9} />
          </mesh>

          {/* Substrate Indentation depression */}
          <mesh position={[0, -0.26 - penDepthNorm / 2, 0]}>
            <cylinderGeometry args={[areaRadius, areaRadius, penDepthNorm + 0.01, 32]} />
            <meshStandardMaterial color="#B45309" roughness={0.95} />
          </mesh>

          {/* Press Piston Cylinder Head */}
          <mesh position={[0, -0.26 + 0.5 - penDepthNorm, 0]}>
            <cylinderGeometry args={[areaRadius, areaRadius, 1.0, 32]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Applied Force Downward Vector Arrow */}
          <mesh position={[0, 0.7 - penDepthNorm, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.12, 0.3, 16]} />
            <meshBasicMaterial color="#B8FF00" />
          </mesh>
        </group>
      ) : (
        /* Dynamics Mode: Block on Friction Track with Forces */
        <group>
          {/* Moving Mass Block */}
          <mesh ref={blockRef} position={[-1.2, -0.3, 0]}>
            <boxGeometry args={[0.7, 0.45, 0.5]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.4} roughness={0.4} />
          </mesh>

          {/* Applied Force Vector (Green Arrow pointing right) */}
          {state.appliedForceN > 0 && (
            <mesh position={[-0.4, -0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.08, 0.25, 16]} />
              <meshBasicMaterial color="#B8FF00" />
            </mesh>
          )}

          {/* Opposing Friction Vector (Red Arrow pointing left) */}
          {outputs.maxFrictionForceN > 0 && (
            <mesh position={[-1.6, -0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.06, 0.2, 16]} />
              <meshBasicMaterial color="#EF4444" />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
};

// 2D Schematic Fallback
const Mechanics2DSchematic: React.FC<{ state: MechanicsLabState }> = ({ state }) => {
  const outputs = calculateMechanicsLab(state);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
      <svg className="w-full max-w-md h-56" viewBox="0 0 400 240">
        <line x1="40" y1="180" x2="360" y2="180" stroke="#334155" strokeWidth="3" />
        
        {state.mode === 'pressure' ? (
          <>
            {/* Substrate block */}
            <rect x="100" y="140" width="200" height="40" fill="#D97706" rx="2" />
            {/* Piston head */}
            <rect
              x={200 - (state.contactAreaCm2 * 1.5)}
              y={90}
              width={state.contactAreaCm2 * 3}
              height="50"
              fill="#38BDF8"
              rx="2"
            />
            {/* Downward force arrow */}
            <line x1="200" y1="40" x2="200" y2="85" stroke="#B8FF00" strokeWidth="4" />
            <polygon points="194,80 206,80 200,90" fill="#B8FF00" />
            <text x="200" y="32" fill="#B8FF00" fontSize="11" textAnchor="middle" fontFamily="monospace">
              F = {state.appliedForceN} N
            </text>
            <text x="200" y="210" fill="#8DA391" fontSize="11" textAnchor="middle" fontFamily="monospace">
              P = {outputs.pressurePascals.toLocaleString()} Pa &bull; Area = {state.contactAreaCm2} cm²
            </text>
          </>
        ) : (
          <>
            {/* Test block */}
            <rect x="150" y="110" width="100" height="70" fill="#F59E0B" rx="4" />
            <text x="200" y="150" fill="#FFF" fontSize="12" textAnchor="middle" fontWeight="bold">
              {state.blockMassKg} kg
            </text>
            {/* Force vector right */}
            <line x1="250" y1="145" x2="330" y2="145" stroke="#B8FF00" strokeWidth="3" />
            <polygon points="325,140 325,150 335,145" fill="#B8FF00" />
            <text x="290" y="135" fill="#B8FF00" fontSize="10" fontFamily="monospace">F_app = {state.appliedForceN} N</text>
            {/* Friction vector left */}
            <line x1="150" y1="175" x2="90" y2="175" stroke="#EF4444" strokeWidth="2.5" />
            <polygon points="95,170 95,180 85,175" fill="#EF4444" />
            <text x="115" y="168" fill="#EF4444" fontSize="10" fontFamily="monospace">f = {outputs.maxFrictionForceN} N</text>
            <text x="200" y="210" fill="#8DA391" fontSize="11" textAnchor="middle" fontFamily="monospace">
              F_net = {outputs.netForceN} N &bull; a = {outputs.accelerationMs2} m/s²
            </text>
          </>
        )}
      </svg>
      <div className="font-mono text-xs text-[#8DA391]">
        {state.mode === 'pressure' ? 'P = F / A &bull; Inversely proportional to area' : "Newton's 2nd Law: F_net = m · a &bull; f = μ · m · g"}
      </div>
    </div>
  );
};

export const MechanicsLabVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [mode, setMode] = useState<'3d' | '2d'>('3d');
  const [state, setState] = useState<MechanicsLabState>(MECHANICS_LAB_MODEL.initialState);

  const outputs = useMemo(() => calculateMechanicsLab(state), [state]);
  const telemetry = useMemo(() => MECHANICS_LAB_MODEL.getTelemetry(state, outputs), [state, outputs]);
  const explanation = useMemo(() => MECHANICS_LAB_MODEL.getExplanation(state, outputs, null), [state, outputs]);

  const handleReset = () => setState(MECHANICS_LAB_MODEL.initialState);

  return (
    <VisualizerContainer<MechanicsLabState>
      title={MECHANICS_LAB_MODEL.name}
      discipline={MECHANICS_LAB_MODEL.discipline}
      curriculumTopicId={topic.id}
      mode={mode}
      onToggleMode={setMode}
      onReset={handleReset}
      formulaDisplay={{
        latex: state.mode === 'pressure' ? 'P = \\frac{F}{A} \\quad [\\text{Pa} = \\text{N/m}^2]' : 'F_{\\text{net}} = F_{\\text{app}} - \\mu m g = m a',
        description: state.mode === 'pressure' ? 'Definition of Hydrostatic / Contact Pressure' : "Newton's Second Law with Kinetic Friction",
      }}
      stageContent={
        mode === '3d' ? (
          <ThreeSceneBoundary fallback={<Mechanics2DSchematic state={state} />}>
            <SceneCanvas fallback={<Mechanics2DSchematic state={state} />} camera={{ position: [0, 1.4, 4.0], fov: 46 }}>
              <Mechanics3DScene state={state} />
            </SceneCanvas>
          </ThreeSceneBoundary>
        ) : (
          <Mechanics2DSchematic state={state} />
        )
      }
      controlsContent={
        <div className="space-y-4 text-xs font-mono">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/08">
            <span className="text-white font-semibold">Investigation Mode</span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, mode: 'pressure' }))}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  state.mode === 'pressure' ? 'bg-[#B8FF00] text-[#080A0E]' : 'text-[#8DA391]'
                }`}
              >
                P = F / A
              </button>
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, mode: 'dynamics' }))}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  state.mode === 'dynamics' ? 'bg-[#B8FF00] text-[#080A0E]' : 'text-[#8DA391]'
                }`}
              >
                F = m · a
              </button>
            </div>
          </div>

          {/* Applied Force Slider */}
          <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
            <div className="flex justify-between text-white">
              <span>Applied Force (F)</span>
              <span className="text-[#B8FF00] font-bold">{state.appliedForceN} N</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={state.appliedForceN}
              onChange={(e) => setState((s) => ({ ...s, appliedForceN: Number(e.target.value) }))}
              className="w-full accent-[#B8FF00] cursor-pointer"
            />
          </div>

          {state.mode === 'pressure' ? (
            /* Contact Area Slider */
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
              <div className="flex justify-between text-white">
                <span>Contact Area (A)</span>
                <span className="text-[#38BDF8] font-bold">{state.contactAreaCm2} cm²</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={state.contactAreaCm2}
                onChange={(e) => setState((s) => ({ ...s, contactAreaCm2: Number(e.target.value) }))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391]">
                <span>1 cm² (Sharp Pin / Needle)</span>
                <span>50 cm² (Broad Flat Plate)</span>
              </div>
            </div>
          ) : (
            <>
              {/* Block Mass Slider */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
                <div className="flex justify-between text-white">
                  <span>Block Inertial Mass (m)</span>
                  <span className="text-amber-400 font-bold">{state.blockMassKg} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={state.blockMassKg}
                  onChange={(e) => setState((s) => ({ ...s, blockMassKg: Number(e.target.value) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Surface Friction Selector */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
                <span className="text-white font-semibold block">Track Surface (Friction μ)</span>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {[
                    { id: 'ice' as SurfaceMaterialId, label: 'Ice (μ=0.05)' },
                    { id: 'wood' as SurfaceMaterialId, label: 'Wood (μ=0.35)' },
                    { id: 'concrete' as SurfaceMaterialId, label: 'Concrete (0.65)' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setState((prev) => ({ ...prev, surfaceType: s.id }))}
                      className={`p-2 rounded-lg text-center transition-all cursor-pointer ${
                        state.surfaceType === s.id
                          ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-xs'
                          : 'bg-white/5 hover:bg-white/10 text-[#8DA391] border border-white/05'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      }
      telemetry={telemetry}
      explanation={explanation}
      presets={MECHANICS_LAB_MODEL.presets}
      onSelectPreset={(p) => setState(p.state)}
    />
  );
};
