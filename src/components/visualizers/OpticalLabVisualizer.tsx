import React, { useState, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VisualizerContainer } from './VisualizerContainer';
import { SceneCanvas } from '../three/SceneCanvas';
import { ThreeSceneBoundary } from '../three/ThreeSceneBoundary';
import { calculateOpticsLab, OPTICS_LAB_MODEL } from '../../utils/scientificEngines';
import type { OpticsLabState } from '../../types/scientificModel';
import type { BaseVisualizerProps } from './types';

// 3D Scene for Optics Laboratory
const Optics3DScene: React.FC<{
  state: OpticsLabState;
}> = ({ state }) => {
  const outputs = useMemo(() => calculateOpticsLab(state), [state]);
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  const rad = (state.incidentAngleDeg * Math.PI) / 180;
  const rayLen = 2.4;
  const inStartX = -Math.sin(rad) * rayLen;
  const inStartY = Math.cos(rad) * rayLen;

  const outEndX = Math.sin(rad) * rayLen;
  const outEndY = Math.cos(rad) * rayLen;

  // Normalized positions for shadow projection
  const normObsZ = (state.obstacleDistanceCm / 100) * 2 - 1;
  const normScreenZ = (state.screenDistanceCm / 100) * 2.2 - 0.5;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />

      {/* Optical Bench Rail Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[4.2, 0.08, 0.6]} />
        <meshStandardMaterial color="#1A2332" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* When Mirror is Active: Show Specular Reflection */}
      {state.mirrorPresent ? (
        <group>
          {/* Plane Mirror */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[2.0, 1.4, 0.04]} />
            <meshPhysicalMaterial
              color="#A5F3FC"
              metalness={0.95}
              roughness={0.05}
              reflectivity={1.0}
              clearcoat={1.0}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Normal Dashed Vector */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0.4, 0, 0, 0.4, 2.0]), 3]}
              />
            </bufferGeometry>
            <lineDashedMaterial color="#8DA391" dashSize={0.1} gapSize={0.05} />
          </line>

          {/* Incident Ray (Green) */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([inStartX, inStartY + 0.4, 1.2, 0, 0.4, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#B8FF00" linewidth={3} />
          </line>

          {/* Reflected Ray (Cyan) */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0.4, 0, outEndX, outEndY + 0.4, 1.2]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00F0FF" linewidth={3} />
          </line>

          {/* Virtual Image Node (Behind Mirror) */}
          <mesh position={[0, 0.4, -state.obstacleDistanceCm * 0.02]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#B8FF00" wireframe transparent opacity={0.6} />
          </mesh>
        </group>
      ) : (
        /* Shadow Formation Mode */
        <group>
          {/* Light Source Aperture */}
          <mesh position={[0, 0.3, -1.8]}>
            <sphereGeometry args={[state.lightSourceSizeMm * 0.015, 24, 24]} />
            <meshBasicMaterial color="#FFF" />
          </mesh>
          <pointLight position={[0, 0.3, -1.8]} intensity={2.5} color="#FFFFFF" />

          {/* Opaque Obstacle Disk */}
          <mesh position={[0, 0.3, normObsZ]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[state.obstacleDiameterCm * 0.03, state.obstacleDiameterCm * 0.03, 0.04, 32]} />
            <meshStandardMaterial color="#374151" roughness={0.8} />
          </mesh>

          {/* Projection Screen */}
          <mesh position={[0, 0.3, normScreenZ]}>
            <boxGeometry args={[2.4, 2.0, 0.02]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.9} />
          </mesh>

          {/* Umbra Shadow Patch on Screen */}
          <mesh position={[0, 0.3, normScreenZ + 0.015]}>
            <circleGeometry args={[outputs.umbraDiameterCm * 0.028, 32]} />
            <meshBasicMaterial color="#05080E" />
          </mesh>

          {/* Penumbra Ring on Screen (if extended source) */}
          {outputs.hasPenumbra && (
            <mesh position={[0, 0.3, normScreenZ + 0.012]}>
              <circleGeometry args={[outputs.penumbraDiameterCm * 0.028, 32]} />
              <meshBasicMaterial color="#475569" transparent opacity={0.6} />
            </mesh>
          )}
        </group>
      )}
    </group>
  );
};

// 2D Schematic Fallback
const Optics2DSchematic: React.FC<{ state: OpticsLabState }> = ({ state }) => {
  const outputs = calculateOpticsLab(state);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
      <svg className="w-full max-w-md h-56" viewBox="0 0 400 240">
        <line x1="50" y1="180" x2="350" y2="180" stroke="#334155" strokeWidth="2" />
        
        {state.mirrorPresent ? (
          <>
            {/* Mirror line */}
            <line x1="200" y1="60" x2="200" y2="180" stroke="#00F0FF" strokeWidth="4" />
            <line x1="100" y1="100" x2="200" y2="140" stroke="#B8FF00" strokeWidth="2.5" />
            <line x1="200" y1="140" x2="300" y2="100" stroke="#00F0FF" strokeWidth="2.5" />
            {/* Normal line */}
            <line x1="120" y1="140" x2="280" y2="140" stroke="#64748B" strokeDasharray="4 4" />
            <text x="140" y="130" fill="#B8FF00" fontSize="11" fontFamily="monospace">θ_i = {state.incidentAngleDeg}°</text>
            <text x="240" y="130" fill="#00F0FF" fontSize="11" fontFamily="monospace">θ_r = {outputs.reflectedAngleDeg}°</text>
          </>
        ) : (
          <>
            {/* Light source */}
            <circle cx="80" cy="120" r={state.lightSourceSizeMm > 5 ? 10 : 5} fill="#FFF" />
            {/* Obstacle */}
            <rect x="180" y="90" width="8" height="60" fill="#475569" rx="2" />
            {/* Screen */}
            <rect x="310" y="50" width="8" height="140" fill="#94A3B8" rx="2" />
            {/* Umbra and Penumbra */}
            <rect x="312" y="85" width="5" height="70" fill="#090D14" />
            <text x="80" y="145" fill="#FFF" fontSize="10" textAnchor="middle" fontFamily="monospace">Source ({state.lightSourceSizeMm}mm)</text>
            <text x="180" y="170" fill="#8DA391" fontSize="10" textAnchor="middle" fontFamily="monospace">Obstacle ({state.obstacleDistanceCm}cm)</text>
            <text x="310" y="205" fill="#8DA391" fontSize="10" textAnchor="middle" fontFamily="monospace">Screen ({state.screenDistanceCm}cm)</text>
          </>
        )}
      </svg>
      <div className="font-mono text-xs text-[#8DA391]">
        {state.mirrorPresent ? 'Specular Reflection: Angle of incidence = Angle of reflection' : `Rectilinear Shadows: Umbra = ${outputs.umbraDiameterCm}cm, Magnification = ${outputs.magnification}×`}
      </div>
    </div>
  );
};

export const OpticalLabVisualizer: React.FC<BaseVisualizerProps> = ({ topic }) => {
  const [mode, setMode] = useState<'3d' | '2d'>('3d');
  const [state, setState] = useState<OpticsLabState>(OPTICS_LAB_MODEL.initialState);

  const outputs = useMemo(() => calculateOpticsLab(state), [state]);
  const telemetry = useMemo(() => OPTICS_LAB_MODEL.getTelemetry(state, outputs), [state, outputs]);
  const explanation = useMemo(() => OPTICS_LAB_MODEL.getExplanation(state, outputs, null), [state, outputs]);

  const handleReset = () => setState(OPTICS_LAB_MODEL.initialState);

  return (
    <VisualizerContainer<OpticsLabState>
      title={OPTICS_LAB_MODEL.name}
      discipline={OPTICS_LAB_MODEL.discipline}
      curriculumTopicId={topic.id}
      mode={mode}
      onToggleMode={setMode}
      onReset={handleReset}
      formulaDisplay={{
        latex: state.mirrorPresent ? '\\theta_r = \\theta_i \\quad (d_i = d_o)' : 'M = \\frac{d_{\\text{screen}}}{d_{\\text{obstacle}}} = \\frac{D_{\\text{shadow}}}{D_{\\text{obstacle}}}',
        description: state.mirrorPresent ? 'Law of Specular Reflection' : 'Rectilinear Shadow Magnification',
      }}
      stageContent={
        mode === '3d' ? (
          <ThreeSceneBoundary fallback={<Optics2DSchematic state={state} />}>
            <SceneCanvas fallback={<Optics2DSchematic state={state} />} camera={{ position: [0, 1.8, 3.8], fov: 46 }}>
              <Optics3DScene state={state} />
            </SceneCanvas>
          </ThreeSceneBoundary>
        ) : (
          <Optics2DSchematic state={state} />
        )
      }
      controlsContent={
        <div className="space-y-4 text-xs font-mono">
          {/* Mirror Present Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/08">
            <span className="text-white font-semibold">Optical Mode</span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, mirrorPresent: true }))}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  state.mirrorPresent ? 'bg-[#B8FF00] text-[#080A0E]' : 'text-[#8DA391]'
                }`}
              >
                Plane Mirror
              </button>
              <button
                type="button"
                onClick={() => setState((s) => ({ ...s, mirrorPresent: false }))}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  !state.mirrorPresent ? 'bg-[#B8FF00] text-[#080A0E]' : 'text-[#8DA391]'
                }`}
              >
                Shadow Formation
              </button>
            </div>
          </div>

          {state.mirrorPresent ? (
            /* Incident Angle Slider */
            <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
              <div className="flex justify-between text-white">
                <span>Angle of Incidence (θ_i)</span>
                <span className="text-[#B8FF00] font-bold">{state.incidentAngleDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={state.incidentAngleDeg}
                onChange={(e) => setState((s) => ({ ...s, incidentAngleDeg: Number(e.target.value) }))}
                className="w-full accent-[#B8FF00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8DA391]">
                <span>0° (Normal)</span>
                <span>80° (Grazing)</span>
              </div>
            </div>
          ) : (
            <>
              {/* Light Source Size Slider */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
                <div className="flex justify-between text-white">
                  <span>Light Source Aperture (S)</span>
                  <span className="text-[#B8FF00] font-bold">{state.lightSourceSizeMm} mm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={state.lightSourceSizeMm}
                  onChange={(e) => setState((s) => ({ ...s, lightSourceSizeMm: Number(e.target.value) }))}
                  className="w-full accent-[#B8FF00] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8DA391]">
                  <span>1mm (Point / Sharp Umbra)</span>
                  <span>20mm (Extended / Penumbra)</span>
                </div>
              </div>

              {/* Obstacle Distance Slider */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
                <div className="flex justify-between text-white">
                  <span>Obstacle Distance (d_o)</span>
                  <span className="text-[#B8FF00] font-bold">{state.obstacleDistanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="70"
                  step="5"
                  value={state.obstacleDistanceCm}
                  onChange={(e) => setState((s) => ({ ...s, obstacleDistanceCm: Number(e.target.value) }))}
                  className="w-full accent-[#B8FF00] cursor-pointer"
                />
              </div>

              {/* Screen Distance Slider */}
              <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/08">
                <div className="flex justify-between text-white">
                  <span>Screen Distance (d_s)</span>
                  <span className="text-[#B8FF00] font-bold">{state.screenDistanceCm} cm</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="120"
                  step="5"
                  value={state.screenDistanceCm}
                  onChange={(e) => setState((s) => ({ ...s, screenDistanceCm: Number(e.target.value) }))}
                  className="w-full accent-[#B8FF00] cursor-pointer"
                />
              </div>
            </>
          )}
        </div>
      }
      telemetry={telemetry}
      explanation={explanation}
      presets={OPTICS_LAB_MODEL.presets}
      onSelectPreset={(p) => setState(p.state)}
    />
  );
};
