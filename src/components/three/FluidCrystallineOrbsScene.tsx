import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import type { SubjectId } from '../../types/subject';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OrbData {
  id: SubjectId;
  name: string;
  category: string;
  color: string;
  glowColor: string;
  basePosition: [number, number, number];
  size: number;
  rotationSpeed: number;
  geometryType: 'icosahedron' | 'octahedron' | 'dodecahedron' | 'sphere';
}

const ORB_CONFIGS: OrbData[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Formal Systems & Proofs',
    color: '#00F0FF', // Electric Cyan
    glowColor: '#38BDF8',
    basePosition: [-1.8, 0.8, -0.2],
    size: 0.38,
    rotationSpeed: 0.6,
    geometryType: 'icosahedron'
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'Mechanics & Field Theories',
    color: '#10B981', // Emerald
    glowColor: '#34D399',
    basePosition: [1.8, 0.9, 0.1],
    size: 0.36,
    rotationSpeed: 0.5,
    geometryType: 'octahedron'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'Molecular Kinetics & Bonds',
    color: '#F59E0B', // Amber
    glowColor: '#FBBF24',
    basePosition: [-1.4, -0.9, 0.2],
    size: 0.34,
    rotationSpeed: 0.45,
    geometryType: 'dodecahedron'
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'Cellular Systems & Genetics',
    color: '#B8FF00', // Acid Lime
    glowColor: '#CCFF00',
    basePosition: [1.5, -0.8, -0.1],
    size: 0.35,
    rotationSpeed: 0.55,
    geometryType: 'sphere'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    category: 'Algorithms & Architecture',
    color: '#6366F1', // Indigo
    glowColor: '#818CF8',
    basePosition: [0, 1.4, -0.4],
    size: 0.32,
    rotationSpeed: 0.7,
    geometryType: 'octahedron'
  },
  {
    id: 'history',
    name: 'History',
    category: 'Causality & Civilization',
    color: '#FB7185', // Rose
    glowColor: '#FDA4AF',
    basePosition: [-2.4, 0.1, -0.5],
    size: 0.3,
    rotationSpeed: 0.4,
    geometryType: 'icosahedron'
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'Geomorphology & Climate',
    color: '#14B8A6', // Teal
    glowColor: '#2DD4BF',
    basePosition: [2.3, 0.1, -0.4],
    size: 0.3,
    rotationSpeed: 0.42,
    geometryType: 'dodecahedron'
  },
  {
    id: 'english',
    name: 'Literature',
    category: 'Semiotics & Rhetoric',
    color: '#C084FC', // Amethyst
    glowColor: '#E879F9',
    basePosition: [0, -1.3, -0.3],
    size: 0.32,
    rotationSpeed: 0.48,
    geometryType: 'sphere'
  }
];

// Single animated crystalline orb mesh
const CrystallineOrb: React.FC<{
  orb: OrbData;
  index: number;
  isHovered: boolean;
  onHover: (id: SubjectId | null) => void;
  onSelect: (id: SubjectId) => void;
}> = ({ orb, index, isHovered, onHover, onSelect }) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireRef = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Organic physics bobbing & deformation
    const t = state.clock.getElapsedTime ? state.clock.getElapsedTime() : 0;
    const floatOffset = Math.sin(t * 1.5 + index * 0.8) * 0.08;
    const swayOffset = Math.cos(t * 1.2 + index * 0.9) * 0.06;

    // Proximity to mouse cursor
    const mouseX = state.pointer.x * 1.5;
    const mouseY = state.pointer.y * 1.2;

    meshRef.current.position.x = orb.basePosition[0] + swayOffset + (mouseX * 0.15);
    meshRef.current.position.y = orb.basePosition[1] + floatOffset + (mouseY * 0.15);
    meshRef.current.position.z = orb.basePosition[2];

    // Rotation
    meshRef.current.rotation.x += delta * orb.rotationSpeed * (isHovered ? 2.0 : 0.8);
    meshRef.current.rotation.y += delta * orb.rotationSpeed * (isHovered ? 2.5 : 1.0);

    // Scale on hover
    const targetScale = isHovered ? orb.size * 1.28 : orb.size;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * (orb.rotationSpeed * 0.5);
      wireRef.current.rotation.y -= delta * (orb.rotationSpeed * 0.7);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={orb.basePosition}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(orb.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(orb.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        {orb.geometryType === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
        {orb.geometryType === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {orb.geometryType === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
        {orb.geometryType === 'sphere' && <sphereGeometry args={[1, 24, 24]} />}

        <meshPhysicalMaterial
          color={isHovered ? '#FFFFFF' : orb.color}
          emissive={orb.glowColor}
          emissiveIntensity={isHovered ? 0.9 : 0.35}
          roughness={0.15}
          metalness={0.8}
          transmission={0.6}
          thickness={1.2}
          transparent
          opacity={0.88}
        />

        {/* Outer Crystalline Facet Wireframe */}
        <mesh ref={wireRef} scale={[1.15, 1.15, 1.15]}>
          {orb.geometryType === 'icosahedron' && <icosahedronGeometry args={[1, 1]} />}
          {orb.geometryType === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {orb.geometryType === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
          {orb.geometryType === 'sphere' && <icosahedronGeometry args={[1, 2]} />}
          <meshBasicMaterial
            color={orb.color}
            wireframe
            transparent
            opacity={isHovered ? 0.7 : 0.25}
          />
        </mesh>
      </mesh>
    </group>
  );
};

// Precomputed static particle dust buffer for purity and high performance
function createCosmicDustData() {
  const count = 350;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const palette = [
    new THREE.Color('#00F0FF'),
    new THREE.Color('#10B981'),
    new THREE.Color('#B8FF00'),
    new THREE.Color('#6366F1'),
    new THREE.Color('#FFFFFF')
  ];

  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    pos[i * 3] = (pseudoRandom() - 0.5) * 12;
    pos[i * 3 + 1] = (pseudoRandom() - 0.5) * 8;
    pos[i * 3 + 2] = (pseudoRandom() - 0.5) * 8 - 1;

    const c = palette[Math.floor(pseudoRandom() * palette.length)];
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
  }
  return { pos, col };
}

const COSMIC_DUST_DATA = createCosmicDustData();

// Particle Starfield Backdrop
const CosmicParticleDust: React.FC = () => {
  const pointsRef = useRef<THREE.Points | null>(null);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[COSMIC_DUST_DATA.pos, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[COSMIC_DUST_DATA.col, 3]}
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
  );
};

// Scene Content with Lighting and Camera Orbit
const SceneContent: React.FC<{
  onSelectSubject: (id: SubjectId) => void;
  hoveredOrbId: SubjectId | null;
  setHoveredOrbId: (id: SubjectId | null) => void;
  selectedOrbId: SubjectId | null;
  setSelectedOrbId: (id: SubjectId | null) => void;
  scrollProgress: number;
}> = ({
  hoveredOrbId,
  setHoveredOrbId,
  selectedOrbId,
  setSelectedOrbId,
  scrollProgress,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Fluid subtle parallax camera follow + responsive page scroll rotation
    const scrollRotY = scrollProgress * Math.PI * 1.5;
    const scrollTiltX = (scrollProgress - 0.5) * 0.35;
    const targetRotY = state.pointer.x * 0.18 + scrollRotY;
    const targetRotX = -state.pointer.y * 0.12 + scrollTiltX;
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta);

    // Smooth camera zoom towards focused orb on click
    const focused = ORB_CONFIGS.find((o) => o.id === selectedOrbId);
    if (focused) {
      const targetCamX = focused.basePosition[0] * 0.65;
      const targetCamY = focused.basePosition[1] * 0.65;
      const targetCamZ = 2.9;
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 4, delta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 4, delta);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 4, delta);
    } else {
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 0, 4, delta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0, 4, delta);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 4.6, 4, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} color="#FFFFFF" />
      <pointLight position={[-4, -3, 2]} intensity={0.8} color="#00F0FF" />
      <pointLight position={[4, -3, 2]} intensity={0.8} color="#10B981" />

      {/* Cosmic dust */}
      <CosmicParticleDust />

      {/* Central Holographic Gyroscope Core */}
      <mesh>
        <torusGeometry args={[0.7, 0.015, 16, 64]} />
        <meshBasicMaterial color="#B8FF00" transparent opacity={0.3} wireframe />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 16, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} wireframe />
      </mesh>

      {/* 8 Crystalline Orbs */}
      {ORB_CONFIGS.map((orb, idx) => (
        <CrystallineOrb
          key={orb.id}
          orb={orb}
          index={idx}
          isHovered={hoveredOrbId === orb.id || selectedOrbId === orb.id}
          onHover={setHoveredOrbId}
          onSelect={(id) => {
            setSelectedOrbId(id);
            setHoveredOrbId(id);
          }}
        />
      ))}
    </group>
  );
};

export const FluidCrystallineOrbsScene: React.FC<{
  onSelectSubject: (id: SubjectId) => void;
  fallback: React.ReactNode;
}> = ({ onSelectSubject, fallback }) => {
  const [hoveredOrbId, setHoveredOrbId] = useState<SubjectId | null>(null);
  const [selectedOrbId, setSelectedOrbId] = useState<SubjectId | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Window scroll listener for responsive rotational physics
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(window.scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeOrb = useMemo(() => {
    return ORB_CONFIGS.find((o) => o.id === (selectedOrbId || hoveredOrbId)) || null;
  }, [selectedOrbId, hoveredOrbId]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-radial from-[#0C121D] via-[#06080D] to-[#030407] border border-white/10 shadow-2xl select-none group">
      
      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px]">
        <ThreeSceneBoundary fallback={fallback}>
          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0, 4.6], fov: 48 }}
            className="w-full h-full"
          >
            <SceneContent
              onSelectSubject={onSelectSubject}
              hoveredOrbId={hoveredOrbId}
              setHoveredOrbId={setHoveredOrbId}
              selectedOrbId={selectedOrbId}
              setSelectedOrbId={setSelectedOrbId}
              scrollProgress={scrollProgress}
            />
          </SceneCanvas>
        </ThreeSceneBoundary>

        {/* Futuristic Floating Header Telemetry Overlay */}
        <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] tracking-wider uppercase shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="break-words">FLUID OBSERVATORY • 8 DISCIPLINE ORBS</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 font-mono text-[10px] bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shrink-0">
            <Sparkles className="w-3 h-3 text-[#B8FF00]" />
            <span>Scroll to Orbit &bull; Click to Inspect &bull; {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Dynamic Focus / Hover Card HUD */}
        {activeOrb && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 sm:px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl pointer-events-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 max-w-[92%] sm:max-w-md animate-in fade-in zoom-in-95 duration-150 z-20">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-3.5 h-3.5 rounded-full shadow-[0_0_12px] shrink-0"
                style={{ backgroundColor: activeOrb.color, boxShadow: `0 0 12px ${activeOrb.color}` }}
              />
              <div className="min-w-0">
                <div className="font-display font-bold text-sm text-white tracking-tight flex items-center gap-2">
                  <span className="truncate">{activeOrb.name}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-white/10 text-white/70 uppercase shrink-0">
                    {activeOrb.category}
                  </span>
                </div>
                <div className="text-[11px] text-[#8DA391] font-mono truncate">
                  {selectedOrbId === activeOrb.id ? 'Camera locked on crystalline orb' : 'Click orb or launch portal'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              {selectedOrbId && (
                <button
                  type="button"
                  onClick={() => setSelectedOrbId(null)}
                  className="px-2 py-1 rounded-lg text-[10px] font-mono text-[#8DA391] hover:text-white border border-white/10 cursor-pointer"
                >
                  Unfocus
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectSubject(activeOrb.id)}
                className="px-3 py-1.5 rounded-xl bg-[#B8FF00] text-[#080A0E] font-mono text-xs font-bold hover:bg-[#CCFF00] transition-colors flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
              >
                <span>Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accessible 8-Discipline Interactive HTML Rail */}
      <div className="px-4 py-3 bg-[#080A0E]/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#8DA391] uppercase tracking-wider shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00]" />
          <span>Discipline Portals:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {ORB_CONFIGS.map((orb) => {
            const isCurrent = (selectedOrbId || hoveredOrbId) === orb.id;
            return (
              <button
                key={orb.id}
                type="button"
                onClick={() => {
                  setSelectedOrbId(orb.id);
                  setHoveredOrbId(orb.id);
                }}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isCurrent
                    ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-sm'
                    : 'bg-white/5 text-[#8DA391] hover:text-white hover:bg-white/10 border border-white/05'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: isCurrent ? '#080A0E' : orb.color }} />
                <span>{orb.name}</span>
              </button>
            );
          })}
          {selectedOrbId && (
            <button
              type="button"
              onClick={() => {
                setSelectedOrbId(null);
                setHoveredOrbId(null);
              }}
              className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold text-amber-400 hover:text-amber-300 border border-amber-400/30 bg-amber-400/10 cursor-pointer shrink-0"
            >
              Reset View
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
