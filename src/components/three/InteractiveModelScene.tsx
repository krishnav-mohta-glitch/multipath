import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import { Sliders, RotateCcw, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';

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
  const [slope, setSlope] = useState<number>(2);
  const [intercept, setIntercept] = useState<number>(1);
  const [xVal, setXVal] = useState<number>(3);
  const computedY = slope * xVal + intercept;
  const [targetY, setTargetY] = useState<number>(computedY);

  // Photosynthesis interactive state
  const [wavelength, setWavelength] = useState<'red' | 'blue' | 'green' | 'white'>('white');
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [co2, setCo2] = useState<number>(450);

  // Photosynthesis biological calculation
  const absorptionMap = { red: 0.95, blue: 0.9, green: 0.05, white: 0.8 };
  const effectiveLight = (lightIntensity / 100) * absorptionMap[wavelength];
  const co2Factor = co2 / (co2 + 250);
  const bubbleRate = Math.round(Math.min(effectiveLight * 1.2, co2Factor * 1.1) * 80);

  // Check if this topic has a dedicated 3D educational model
  const has3DModel = experimentType === 'linear-equations' || experimentType === 'photosynthesis';

  if (!has3DModel || viewMode === '2d') {
    return (
      <div className="space-y-3">
        {has3DModel && (
          <div className="flex justify-end">
            <button
              onClick={() => setViewMode('3d')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold bg-[#111714] text-[#C8F36B] hover:bg-[#19211C] transition-all"
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
      <div className="bg-[#111714] text-[#F3F4EC] rounded-2xl border border-white/10 p-5 sm:p-7 space-y-5 relative overflow-hidden shadow-xl">
        
        {/* Top Header & Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8F36B]">
                {experimentType === 'linear-equations'
                  ? '3D PHYSICAL BALANCE & EQUALITY CONSERVATION'
                  : '3D PHOTOCHEMICAL CHLOROPLAST & PHOTON CHAMBER'}
              </span>
            </div>
            <p className="text-xs text-[#8DA391]">
              {experimentType === 'linear-equations'
                ? 'Equilibrium balance physically tilts when the left expression (mx + b) does not equal target y'
                : 'Photon wavelength stream & photosynthetic oxygen bubble emission governed by Liebig’s Law'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('2d')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-medium bg-white/5 hover:bg-white/10 text-[#8DA391] border border-white/10 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>2D SCHEMATIC MODE</span>
            </button>

            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#19211C] text-[#C8F36B] border border-white/10">
              3D ACTIVE
            </span>
          </div>
        </div>

        {/* 3D Canvas Stage */}
        <div className="relative w-full h-80 sm:h-96 bg-[#19211C] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0, 4.8], fov: 45 }}
            frameloop="always"
          >
            {experimentType === 'linear-equations' && (
              <BalanceScale3D
                slope={slope}
                intercept={intercept}
                xVal={xVal}
                targetY={targetY}
              />
            )}
            {experimentType === 'photosynthesis' && (
              <PhotosynthesisChamber3D
                wavelength={wavelength}
                lightIntensity={lightIntensity}
                bubbleRate={bubbleRate}
              />
            )}
          </SceneCanvas>

          {/* Real-Time Mathematical / Biological HUD Readout */}
          <div className="absolute top-3 left-3 z-10 font-mono text-xs p-3 rounded-xl bg-[#111714]/85 backdrop-blur-md border border-white/10 space-y-1">
            {experimentType === 'linear-equations' ? (
              <>
                <div className="text-[#8DA391] text-[10px] uppercase">Equation Equilibrium:</div>
                <div className="font-bold text-white">
                  Left Pan: <span className="text-[#F59E0B]">{slope}x + {intercept}</span> = <span className="text-[#F59E0B]">{computedY} kg</span>
                </div>
                <div className="font-bold text-white">
                  Right Pan: <span className="text-[#34D399]">Target y</span> = <span className="text-[#34D399]">{targetY} kg</span>
                </div>
                <div className={`text-[10px] pt-1 flex items-center gap-1 ${
                  computedY === targetY ? 'text-[#C8F36B]' : 'text-[#EF4444]'
                }`}>
                  {computedY === targetY ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>EQUILIBRIUM CONSERVED (0&deg; TILT)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3" />
                      <span>TORQUE IMBALANCE ({Math.abs(computedY - targetY)} kg delta)</span>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-[#8DA391] text-[10px] uppercase">Photochemical Kinetics:</div>
                <div className="font-bold text-white">
                  Photon Flux: <span className="text-[#C8F36B]">{lightIntensity}%</span> ({wavelength.toUpperCase()} &bull; {wavelength === 'green' ? '5% absorbed' : '80-95% absorbed'})
                </div>
                <div className="font-bold text-white">
                  Oxygen Bubble Rate: <span className="text-[#38BDF8]">{bubbleRate} bubbles/min</span>
                </div>
                <div className="text-[10px] text-[#8DA391] pt-1">
                  CO2 Saturation: {co2} ppm
                </div>
              </>
            )}
          </div>
        </div>

        {/* 3D Model Interactive Parameter Sliders */}
        <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5E7A65]">
              MANIPULATE PARAMETRIC INVARIANTS
            </span>
            <button
              onClick={() => {
                if (experimentType === 'linear-equations') {
                  setSlope(2);
                  setIntercept(1);
                  setXVal(3);
                  setTargetY(7);
                } else {
                  setWavelength('white');
                  setLightIntensity(75);
                  setCo2(450);
                }
              }}
              className="font-mono text-[10px] text-[#8DA391] hover:text-[#F3F4EC] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>

          {experimentType === 'linear-equations' ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Slope (m):</span>
                  <span className="text-white font-bold">{slope}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="5"
                  step="1"
                  value={slope}
                  onChange={(e) => {
                    const newSlope = parseInt(e.target.value, 10);
                    setSlope(newSlope);
                    setTargetY(newSlope * xVal + intercept);
                  }}
                  className="w-full accent-[#C8F36B]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Y-Intercept (b):</span>
                  <span className="text-white font-bold">{intercept}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="8"
                  step="1"
                  value={intercept}
                  onChange={(e) => {
                    const newB = parseInt(e.target.value, 10);
                    setIntercept(newB);
                    setTargetY(slope * xVal + newB);
                  }}
                  className="w-full accent-[#C8F36B]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Test Input (x):</span>
                  <span className="text-white font-bold">{xVal}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="6"
                  step="1"
                  value={xVal}
                  onChange={(e) => {
                    const newX = parseInt(e.target.value, 10);
                    setXVal(newX);
                    setTargetY(slope * newX + intercept);
                  }}
                  className="w-full accent-[#C8F36B]"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-[#8DA391]">Light Spectrum:</div>
                <div className="flex gap-1.5">
                  {(['white', 'blue', 'red', 'green'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWavelength(w)}
                      className={`flex-1 py-1 rounded text-[10px] uppercase font-bold transition-all ${
                        wavelength === w
                          ? 'bg-[#C8F36B] text-[#111714]'
                          : 'bg-white/10 text-[#8DA391] hover:bg-white/20'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>Light Intensity:</span>
                  <span className="text-white font-bold">{lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseInt(e.target.value, 10))}
                  className="w-full accent-[#C8F36B]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[#8DA391]">
                  <span>CO2 Concentration:</span>
                  <span className="text-white font-bold">{co2} ppm</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={co2}
                  onChange={(e) => setCo2(parseInt(e.target.value, 10))}
                  className="w-full accent-[#C8F36B]"
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
