import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import { Sliders, RotateCcw, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';
import {
  calculateLinearEquations,
  LINEAR_EQUATIONS_MODEL,
  calculatePhotosynthesis,
  PHOTOSYNTHESIS_MODEL,
} from '../../utils/scientificEngines';
import type {
  LinearEquationsState,
  PhotosynthesisState,
  WavelengthType,
} from '../../types/scientificModel';

interface InteractiveModelSceneProps {
  experimentType: 'linear-equations' | 'photosynthesis' | 'french-revolution' | 'metaphors' | 'generic';
  fallback: React.ReactNode;
}

// ============================================================================
// 1. 3D LINEAR EQUATIONS: CONSERVATION OF EQUALITY PHYSICAL BALANCE
// ============================================================================
const BalanceScale3D: React.FC<{
  slope: number;
  intercept: number;
  xVal: number;
  targetY: number;
}> = ({ slope, intercept, xVal, targetY }) => {
  const beamGroupRef = useRef<THREE.Group>(null);
  const leftPanRef = useRef<THREE.Group>(null);
  const rightPanRef = useRef<THREE.Group>(null);

  const leftWeight = slope * xVal + intercept;
  const rightWeight = targetY;
  const imbalance = leftWeight - rightWeight;

  // Max tilt angle ~ 24 degrees
  const targetTiltAngle = Math.max(-0.4, Math.min(0.4, -imbalance * 0.08));

  useFrame((_, delta) => {
    if (beamGroupRef.current) {
      // Smooth dampening towards target equilibrium angle
      beamGroupRef.current.rotation.z +=
        (targetTiltAngle - beamGroupRef.current.rotation.z) * delta * 5;

      // Keep pans hanging vertically under gravity
      const currentZ = beamGroupRef.current.rotation.z;
      if (leftPanRef.current) leftPanRef.current.rotation.z = -currentZ;
      if (rightPanRef.current) rightPanRef.current.rotation.z = -currentZ;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <pointLight position={[0, 2, 2]} intensity={1.0} color="#C8F36B" distance={6} />

      {/* Static Base & Fulcrum */}
      <group position={[0, -1.2, 0]}>
        {/* Base Plate */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.2, 32]} />
          <meshStandardMaterial color="#111714" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Central Stand Pillar */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 1.8, 16]} />
          <meshStandardMaterial color="#8DA391" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Fulcrum Pivot Cone */}
        <mesh position={[0, 1.9, 0]}>
          <coneGeometry args={[0.22, 0.35, 16]} />
          <meshStandardMaterial color="#C8F36B" roughness={0.2} metalness={0.6} />
        </mesh>
      </group>

      {/* Pivoting Balance Beam Group */}
      <group ref={beamGroupRef} position={[0, 0.85, 0]}>
        {/* Main Crossbeam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.8, 0.1, 0.15]} />
          <meshStandardMaterial color="#C8F36B" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Pivot Center Ring */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
          <meshStandardMaterial color="#111714" roughness={0.3} />
        </mesh>

        {/* Left Pan Assembly */}
        <group position={[-1.7, 0, 0]}>
          {/* Suspension Struts */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            <meshStandardMaterial color="#8DA391" />
          </mesh>

          {/* Pan Dish */}
          <group ref={leftPanRef} position={[0, -0.8, 0]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.6, 0.5, 0.08, 24]} />
              <meshStandardMaterial color="#19211C" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Left Weight Tokens (slope*x + intercept) */}
            <mesh position={[0, 0.18, 0]}>
              <boxGeometry args={[0.35, 0.28, 0.35]} />
              <meshStandardMaterial color="#F59E0B" roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* Right Pan Assembly */}
        <group position={[1.7, 0, 0]}>
          {/* Suspension Struts */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            <meshStandardMaterial color="#8DA391" />
          </mesh>

          {/* Pan Dish */}
          <group ref={rightPanRef} position={[0, -0.8, 0]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.6, 0.5, 0.08, 24]} />
              <meshStandardMaterial color="#19211C" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Right Weight Token (target y) */}
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.28, 16]} />
              <meshStandardMaterial color="#34D399" roughness={0.3} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
};

// ============================================================================
// 2. 3D PHOTOSYNTHESIS: PHOTOCHEMICAL REACTION MEMBRANE & PHOTON CHAMBER
// ============================================================================
const PhotosynthesisChamber3D: React.FC<{
  wavelength: 'red' | 'blue' | 'green' | 'white';
  lightIntensity: number;
  bubbleRate: number;
}> = ({ wavelength, lightIntensity, bubbleRate }) => {
  const bubblesGroupRef = useRef<THREE.Points>(null);
  const photonsGroupRef = useRef<THREE.Points>(null);
  const membraneRef = useRef<THREE.Group>(null);

  // Wavelength photon color mapping
  const photonColorHex = useMemo(() => {
    switch (wavelength) {
      case 'red':
        return '#EF4444';
      case 'blue':
        return '#3B82F6';
      case 'green':
        return '#10B981';
      case 'white':
      default:
        return '#F3F4EC';
    }
  }, [wavelength]);

// Pure deterministic pseudo-random generator for render purity
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Generate Oxygen Bubble particles that rise upward (deterministic)
  const bubbleCount = 70;
  const { bubblePositions, bubbleSpeeds } = useMemo(() => {
    const pos = new Float32Array(bubbleCount * 3);
    const speeds = new Float32Array(bubbleCount);
    for (let i = 0; i < bubbleCount; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 2.8;
      pos[i * 3 + 1] = -1.0 + pseudoRandom(i * 3 + 2) * 3.0;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 1.5;
      speeds[i] = 0.5 + pseudoRandom(i * 7 + 5) * 1.2;
    }
    return { bubblePositions: pos, bubbleSpeeds: speeds };
  }, []);

  // Photon Stream particles that beam downward toward the thylakoid membrane
  const photonCount = 60;
  const { photonPositions } = useMemo(() => {
    const pos = new Float32Array(photonCount * 3);
    for (let i = 0; i < photonCount; i++) {
      pos[i * 3] = (pseudoRandom(i * 4 + 11) - 0.5) * 3.2;
      pos[i * 3 + 1] = 0.5 + pseudoRandom(i * 4 + 12) * 2.0;
      pos[i * 3 + 2] = (pseudoRandom(i * 4 + 13) - 0.5) * 1.8;
    }
    return { photonPositions: pos };
  }, []);

  useFrame((_, delta) => {
    // Bubble rise animation scaled by active biological bubble rate
    if (bubblesGroupRef.current) {
      const positions = bubblesGroupRef.current.geometry.attributes.position.array as Float32Array;
      const rateMultiplier = (bubbleRate / 50) * delta;

      for (let i = 0; i < bubbleCount; i++) {
        if (bubbleRate > 0) {
          positions[i * 3 + 1] += bubbleSpeeds[i] * rateMultiplier;
          // Loop bubbles back to the membrane
          if (positions[i * 3 + 1] > 2.2) {
            positions[i * 3 + 1] = -0.8;
          }
        }
      }
      bubblesGroupRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Photons rain down
    if (photonsGroupRef.current) {
      const pPositions = photonsGroupRef.current.geometry.attributes.position.array as Float32Array;
      const photonSpeed = (lightIntensity / 50) * delta * 2.5;

      for (let i = 0; i < photonCount; i++) {
        pPositions[i * 3 + 1] -= photonSpeed;
        if (pPositions[i * 3 + 1] < -0.7) {
          pPositions[i * 3 + 1] = 2.4;
        }
      }
      photonsGroupRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Membrane gentle undulation
    if (membraneRef.current) {
      membraneRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 4, 2]} intensity={1.5} color={photonColorHex} />
      <pointLight position={[0, -0.6, 0]} intensity={1.2} color="#10B981" distance={4} />

      {/* Thylakoid Bilayer Membrane */}
      <group ref={membraneRef} position={[0, -0.8, 0]}>
        {/* Membrane Base Plate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.25, 1.8]} />
          <meshStandardMaterial
            color="#064E3B"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Photosystem II Embedded Complex */}
        <mesh position={[-0.8, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.32, 0.35, 16]} />
          <meshStandardMaterial color="#10B981" roughness={0.3} metalness={0.4} />
        </mesh>

        {/* ATP Synthase Rotor Complex */}
        <mesh position={[0.8, 0.28, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.45, 16]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Photon Stream Beaming Down */}
      <points ref={photonsGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[photonPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={photonColorHex}
          transparent
          opacity={lightIntensity > 0 ? 0.85 : 0}
          sizeAttenuation
        />
      </points>

      {/* Rising Oxygen Bubbles (O2) */}
      <points ref={bubblesGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bubblePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#38BDF8"
          transparent
          opacity={bubbleRate > 0 ? 0.75 : 0}
          sizeAttenuation
        />
      </points>
    </>
  );
};

// ============================================================================
// MAIN WRAPPER COMPONENT WITH MODE TOGGLE & CONTROLS
// ============================================================================
export const InteractiveModelScene: React.FC<InteractiveModelSceneProps> = ({
  experimentType,
  fallback,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Linear Equations interactive state
  const [linearState, setLinearState] = useState<LinearEquationsState>(
    LINEAR_EQUATIONS_MODEL.initialState
  );

  // Photosynthesis interactive state
  const [photoState, setPhotoState] = useState<PhotosynthesisState>(
    PHOTOSYNTHESIS_MODEL.initialState
  );

  // Computed deterministic outputs
  const linearOutputs = calculateLinearEquations(linearState);
  const photoOutputs = calculatePhotosynthesis(photoState);

  // Check if this topic has a dedicated 3D educational model
  const has3DModel = experimentType === 'linear-equations' || experimentType === 'photosynthesis';

  if (!has3DModel || viewMode === '2d') {
    return (
      <div className="space-y-4">
        {has3DModel && (
          <div className="flex justify-end">
            <button
              onClick={() => setViewMode('3d')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold bg-[#0D1117] text-[#B8FF00] hover:bg-[#161B22] border border-[#B8FF00]/30 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>SWITCH TO 3D PHYSICAL LAB</span>
            </button>
          </div>
        )}
        {fallback}
      </div>
    );
  }

  return (
    <ThreeSceneBoundary fallback={fallback} sceneName="Interactive Educational Model">
      <div className="bg-[#080A0E] text-[#F3F4EC] rounded-2xl border border-white/10 p-5 sm:p-7 space-y-5 relative overflow-hidden shadow-2xl corner-reticle">
        
        {/* Top Header & Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
                {experimentType === 'linear-equations'
                  ? '3D PHYSICAL BALANCE & EQUALITY CONSERVATION'
                  : '3D PHOTOCHEMICAL CHLOROPLAST & PHOTON CHAMBER'}
              </span>
            </div>
            <p className="text-xs text-[#8DA391]">
              {experimentType === 'linear-equations'
                ? 'Equilibrium balance physically tilts when the left expression (mx + c) does not equal target y'
                : 'Photon wavelength stream & photosynthetic oxygen bubble emission governed by Blackman’s Law'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('2d')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-medium bg-white/5 hover:bg-white/10 text-[#8DA391] hover:text-white border border-white/10 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>2D SCHEMATIC MODE</span>
            </button>

            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#B8FF00]/10 text-[#B8FF00] border border-[#B8FF00]/30">
              3D ACTIVE
            </span>
          </div>
        </div>

        {/* 3D Canvas Stage */}
        <div className="relative w-full h-80 sm:h-96 bg-[#05070A] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            frameloop="always"
          >
            {experimentType === 'linear-equations' && (
              <BalanceScale3D
                slope={linearState.slope}
                intercept={linearState.intercept}
                xVal={linearState.xVal}
                targetY={linearState.targetY}
              />
            )}
            {experimentType === 'photosynthesis' && (
              <PhotosynthesisChamber3D
                wavelength={photoState.wavelength}
                lightIntensity={photoState.lightIntensity}
                bubbleRate={photoOutputs.bubbleRate}
              />
            )}
          </SceneCanvas>

          {/* Real-Time Mathematical / Biological HUD Readout */}
          <div className="absolute top-3 left-3 z-10 font-mono text-xs p-3.5 rounded-xl bg-[#080A0E]/90 backdrop-blur-md border border-white/10 space-y-1.5 shadow-lg max-w-xs">
            {experimentType === 'linear-equations' ? (
              <>
                <div className="text-[#8DA391] text-[10px] uppercase font-bold tracking-wider">Equation Equilibrium HUD:</div>
                <div className="font-bold text-white text-xs">
                  Left Pan: <span className="text-[#B8FF00]">{linearState.slope}x + ({linearState.intercept})</span> = <span className="text-[#B8FF00]">{linearOutputs.leftLoad} kg</span>
                </div>
                <div className="font-bold text-white text-xs">
                  Right Pan: <span className="text-[#38BDF8]">Target y</span> = <span className="text-[#38BDF8]">{linearOutputs.rightLoad} kg</span>
                </div>
                <div className={`text-[10px] pt-1 flex items-center gap-1 font-bold ${
                  linearOutputs.isBalanced ? 'text-[#B8FF00]' : 'text-[#EF4444]'
                }`}>
                  {linearOutputs.isBalanced ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>EQUILIBRIUM CONSERVED (0° TILT)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>TORQUE IMBALANCE (Δ = {linearOutputs.imbalance} kg)</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-[#8DA391] text-[10px] uppercase font-bold tracking-wider">Photochemical Kinetics HUD:</div>
                <div className="font-bold text-white text-xs">
                  Photon Flux: <span className="text-[#B8FF00]">{photoState.lightIntensity}%</span> ({photoState.wavelength.toUpperCase()} &bull; {(photoOutputs.quantumEfficiency * 100).toFixed(0)}% eff)
                </div>
                <div className="font-bold text-white text-xs">
                  Oxygen Bubble Rate: <span className="text-[#38BDF8]">{photoOutputs.bubbleRate} bubbles/min</span>
                </div>
                <div className="text-[10px] text-[#8DA391] pt-0.5">
                  CO₂ Saturation: <span className="text-white font-bold">{photoState.co2Concentration} ppm</span> &bull; Temp: <span className="text-white font-bold">{photoState.temperature}°C</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 3D Model Interactive Parameter Sliders & Presets */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8FF00]">
              MANIPULATE PARAMETRIC INVARIANTS
            </span>
            <button
              onClick={() => {
                if (experimentType === 'linear-equations') {
                  setLinearState(LINEAR_EQUATIONS_MODEL.initialState);
                } else {
                  setPhotoState(PHOTOSYNTHESIS_MODEL.initialState);
                }
              }}
              className="font-mono text-[10px] text-[#8DA391] hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET DEFAULTS</span>
            </button>
          </div>

          {experimentType === 'linear-equations' ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Slope (m):</span>
                  <span className="text-[#B8FF00] font-bold">{linearState.slope}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={linearState.slope}
                  onChange={(e) =>
                    setLinearState((prev) => ({
                      ...prev,
                      slope: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="w-full accent-[#B8FF00] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Y-Intercept (c):</span>
                  <span className="text-[#F59E0B] font-bold">{linearState.intercept}</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="8"
                  step="1"
                  value={linearState.intercept}
                  onChange={(e) =>
                    setLinearState((prev) => ({
                      ...prev,
                      intercept: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full accent-[#F59E0B] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Input Load (x):</span>
                  <span className="text-white font-bold">{linearState.xVal}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="8"
                  step="1"
                  value={linearState.xVal}
                  onChange={(e) =>
                    setLinearState((prev) => ({
                      ...prev,
                      xVal: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Target Load (y):</span>
                  <span className="text-[#38BDF8] font-bold">{linearState.targetY}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="20"
                  step="1"
                  value={linearState.targetY}
                  onChange={(e) =>
                    setLinearState((prev) => ({
                      ...prev,
                      targetY: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-[#8DA391]">Wavelength (λ):</div>
                <div className="flex gap-1">
                  {(['red', 'blue', 'green', 'white'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() =>
                        setPhotoState((prev) => ({ ...prev, wavelength: w as WavelengthType }))
                      }
                      className={`flex-1 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                        photoState.wavelength === w
                          ? 'bg-[#B8FF00] text-[#080A0E]'
                          : 'bg-white/10 text-[#8DA391] hover:bg-white/20'
                      }`}
                    >
                      {w === 'red' ? '660' : w === 'blue' ? '430' : w === 'green' ? '520' : 'Wht'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Light (I):</span>
                  <span className="text-amber-400 font-bold">{photoState.lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={photoState.lightIntensity}
                  onChange={(e) =>
                    setPhotoState((prev) => ({
                      ...prev,
                      lightIntensity: parseInt(e.target.value, 10) || 0,
                    }))
                  }
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>CO₂ Conc:</span>
                  <span className="text-[#38BDF8] font-bold">{photoState.co2Concentration} ppm</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="50"
                  value={photoState.co2Concentration}
                  onChange={(e) =>
                    setPhotoState((prev) => ({
                      ...prev,
                      co2Concentration: parseInt(e.target.value, 10) || 200,
                    }))
                  }
                  className="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Temp (T):</span>
                  <span className="text-rose-400 font-bold">{photoState.temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="1"
                  value={photoState.temperature}
                  onChange={(e) =>
                    setPhotoState((prev) => ({
                      ...prev,
                      temperature: parseInt(e.target.value, 10) || 10,
                    }))
                  }
                  className="w-full accent-rose-400 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </ThreeSceneBoundary>
  );
};

export default InteractiveModelScene;
