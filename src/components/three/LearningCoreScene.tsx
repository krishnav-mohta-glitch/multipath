import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import type { LearningPathId } from '../../types/learningPath';
import { LEARNING_PATHS } from '../../data/learningPaths';
import { BookOpen, Eye, Wrench, FlaskConical, ArrowRight } from 'lucide-react';

interface LearningCoreSceneProps {
  onSelectPath?: (pathId: LearningPathId) => void;
  fallback: React.ReactNode;
}

interface SatelliteData {
  id: LearningPathId;
  name: string;
  tagline: string;
  color: string;
  radius: number;
  speed: number;
  inclination: [number, number, number];
  size: number;
}

const SATELLITES: SatelliteData[] = [
  {
    id: 'structured-explanation',
    name: 'Structured Explanation',
    tagline: 'Deductive first-principles & mathematical proofs',
    color: '#60A5FA', // Azure / Deductive
    radius: 1.6,
    speed: 0.45,
    inclination: [0.2, 0, 0.1],
    size: 0.12,
  },
  {
    id: 'visual-learning',
    name: 'Visual Learning',
    tagline: 'Topological concept graphs & spatial intuition',
    color: '#A78BFA', // Violet / Spatial
    radius: 2.1,
    speed: 0.35,
    inclination: [-0.3, 0.4, 0.2],
    size: 0.13,
  },
  {
    id: 'examples-applications',
    name: 'Real-World Systems',
    tagline: 'Annotated worked solutions & high-stakes engineering',
    color: '#34D399', // Emerald / Applied
    radius: 2.6,
    speed: 0.28,
    inclination: [0.4, -0.2, -0.3],
    size: 0.13,
  },
  {
    id: 'explore-experiment',
    name: 'Interactive Lab',
    tagline: 'Parametric simulation & empirical discovery',
    color: '#C8F36B', // Electric Lime / Empirical
    radius: 3.1,
    speed: 0.22,
    inclination: [-0.1, -0.3, 0.4],
    size: 0.14,
  },
];

// Pure deterministic pseudo-random generator for render purity
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Inner 3D Content Component
const LearningCore3D: React.FC<{
  activePath: LearningPathId | null;
  onHoverSatellite: (path: LearningPathId | null) => void;
  onClickSatellite: (path: LearningPathId) => void;
}> = ({ activePath, onHoverSatellite, onClickSatellite }) => {
  const coreRef = useRef<THREE.Group>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);
  const particleGroupRef = useRef<THREE.Points>(null);

  // Satellite Mesh Refs for continuous orbital motion
  const satelliteRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Subtle background star/data particle field (deterministic, pure)
  const { particlePositions, particleColors } = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const limeColor = new THREE.Color('#C8F36B');
    const sageColor = new THREE.Color('#8DA391');

    for (let i = 0; i < count; i++) {
      const theta = pseudoRandom(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(pseudoRandom(i * 3 + 2) * 2 - 1);
      const dist = 2.0 + pseudoRandom(i * 3 + 3) * 2.5;

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = dist * Math.cos(phi);

      const color = pseudoRandom(i * 5 + 7) > 0.4 ? limeColor : sageColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { particlePositions: positions, particleColors: colors };
  }, []);

  // Frame-by-frame delta animation without React state updates
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotate core slowly
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;
    }

    // Pulse outer wireframe
    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.y -= delta * 0.15;
      outerCoreRef.current.rotation.z += delta * 0.1;
      const scale = 1.0 + Math.sin(time * 1.5) * 0.04;
      outerCoreRef.current.scale.set(scale, scale, scale);
    }

    // Parallax response to pointer
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y +=
        (state.pointer.x * 0.4 - satellitesGroupRef.current.rotation.y) * 0.05;
      satellitesGroupRef.current.rotation.x +=
        (-state.pointer.y * 0.4 - satellitesGroupRef.current.rotation.x) * 0.05;
    }

    // Update satellite positions along their inclined orbital paths
    SATELLITES.forEach((sat, index) => {
      const mesh = satelliteRefs.current[index];
      if (mesh) {
        const angle = time * sat.speed + index * (Math.PI / 2);
        const x = Math.cos(angle) * sat.radius;
        const z = Math.sin(angle) * sat.radius;
        mesh.position.set(x, 0, z);
        mesh.rotation.y += delta * 1.2;
      }
    });

    // Slow drift of ambient particles
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <>
      {/* Lighting: ambient + rim + key point light */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#C8F36B" distance={5} />

      {/* Background Particles */}
      <points ref={particleGroupRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>

      {/* Main Interactive Group with Parallax */}
      <group ref={satellitesGroupRef}>
        {/* Central Learning Core */}
        <group ref={coreRef}>
          {/* Inner Solid Core */}
          <mesh>
            <octahedronGeometry args={[0.55, 1]} />
            <meshStandardMaterial
              color="#111714"
              emissive="#19211C"
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

          {/* Inner Glowing Crystal */}
          <mesh>
            <icosahedronGeometry args={[0.38, 0]} />
            <meshStandardMaterial
              color="#C8F36B"
              emissive="#C8F36B"
              emissiveIntensity={0.6}
              wireframe={false}
              roughness={0.1}
            />
          </mesh>

          {/* Outer Layered Wireframe Cage */}
          <mesh ref={outerCoreRef}>
            <dodecahedronGeometry args={[0.72, 0]} />
            <meshStandardMaterial
              color="#8DA391"
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </group>

        {/* 4 Orbital Paths and Satellites */}
        {SATELLITES.map((sat, idx) => {
          const isSelected = activePath === sat.id;

          return (
            <group key={sat.id} rotation={sat.inclination}>
              {/* Orbital Track Ring */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[sat.radius, 0.008, 8, 64]} />
                <meshBasicMaterial
                  color={isSelected ? '#C8F36B' : sat.color}
                  transparent
                  opacity={isSelected ? 0.7 : 0.25}
                />
              </mesh>

              {/* Satellite Node Mesh */}
              <mesh
                ref={(el) => {
                  satelliteRefs.current[idx] = el;
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  onHoverSatellite(sat.id);
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  onHoverSatellite(null);
                  document.body.style.cursor = 'auto';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickSatellite(sat.id);
                }}
              >
                <sphereGeometry args={[sat.size, 16, 16]} />
                <meshStandardMaterial
                  color={sat.color}
                  emissive={sat.color}
                  emissiveIntensity={isSelected ? 0.8 : 0.3}
                  roughness={0.3}
                  metalness={0.5}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
};

// Exported Container Component
export const LearningCoreScene: React.FC<LearningCoreSceneProps> = ({
  onSelectPath,
  fallback,
}) => {
  const [selectedPath, setSelectedPath] = useState<LearningPathId>('structured-explanation');
  const [hoveredPath, setHoveredPath] = useState<LearningPathId | null>(null);

  const activeDisplayPath = hoveredPath || selectedPath;
  const activeMeta = LEARNING_PATHS[activeDisplayPath];

  const iconMap: Record<LearningPathId, React.FC<{ className?: string }>> = {
    'structured-explanation': BookOpen,
    'visual-learning': Eye,
    'examples-applications': Wrench,
    'explore-experiment': FlaskConical,
  };
  const ActiveIcon = iconMap[activeDisplayPath];

  const handleSatelliteClick = (pathId: LearningPathId) => {
    setSelectedPath(pathId);
    if (onSelectPath) {
      onSelectPath(pathId);
    }
  };

  return (
    <ThreeSceneBoundary fallback={fallback} sceneName="Homepage Learning Core">
      <div className="relative w-full h-full flex flex-col justify-between">
        
        {/* Top Telemetry Overlay */}
        <div className="relative z-10 flex items-center justify-between px-2 pt-1 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
              Epistemic Core &bull; 4 Coordinate Strata
            </span>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#19211C] text-[#C8F36B] border border-white/10">
            WebGL Active
          </span>
        </div>

        {/* 3D Canvas Frame */}
        <div className="absolute inset-0 w-full h-full">
          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0, 4.6], fov: 46 }}
            frameloop="always"
          >
            <LearningCore3D
              activePath={activeDisplayPath}
              onHoverSatellite={setHoveredPath}
              onClickSatellite={handleSatelliteClick}
            />
          </SceneCanvas>
        </div>

        {/* Accessible Interactive Footer & Path Details */}
        <div className="relative z-10 bg-[#19211C]/92 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111714] border border-[#DFE2D7]/20 flex items-center justify-center text-[#C8F36B] shrink-0">
              <ActiveIcon className="w-4 h-4" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-xs font-bold truncate">
                  {activeMeta.title}
                </span>
                <span className="font-mono text-[9px] text-[#C8F36B] px-1.5 py-0.2 rounded bg-white/5 uppercase">
                  {activeMeta.bestFor}
                </span>
              </div>
              <p className="text-[10px] text-[#8DA391] line-clamp-1">
                {activeMeta.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            {/* Quick Path Switcher Pills for non-pointer / keyboard users */}
            <div className="hidden md:flex items-center gap-1 mr-1">
              {SATELLITES.map((sat) => (
                <button
                  key={sat.id}
                  onClick={() => handleSatelliteClick(sat.id)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeDisplayPath === sat.id ? 'bg-[#C8F36B] scale-125' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  title={sat.name}
                  aria-label={sat.name}
                />
              ))}
            </div>

            <button
              onClick={() => handleSatelliteClick(activeDisplayPath)}
              className="px-3 py-1.5 rounded-xl bg-[#C8F36B] hover:bg-[#BCEB58] text-[#111714] font-mono font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
            >
              <span>Explore Mode</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </ThreeSceneBoundary>
  );
};

export default LearningCoreScene;
