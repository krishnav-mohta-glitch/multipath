import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import type { SubjectId } from '../../types/subject';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

export interface ScientificDisciplineData {
  id: SubjectId;
  name: string;
  category: string;
  color: string;
  glowColor: string;
  basePosition: [number, number, number];
  size: number;
  rotationSpeed: number;
  coreInvariant: string;
  representativeModel: string;
  formula: string;
  sampleTopics: string;
}

const SCIENTIFIC_DISCIPLINES: ScientificDisciplineData[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Formal Systems & Proofs',
    color: '#00F0FF', // Electric Cyan
    glowColor: '#38BDF8',
    basePosition: [-1.65, 0.65, -0.15],
    size: 0.38,
    rotationSpeed: 0.55,
    coreInvariant: 'Axiomatic symmetry & invariant equality across all reversible algebraic transformations',
    representativeModel: 'Coordinate Orthogonality & Fibonacci Proof Geometry',
    formula: 'e^{i\\pi} + 1 = 0 \\quad \\& \\quad y = mx + c',
    sampleTopics: 'Linear Equations, Quadratic Proofs, Coordinate Geometry',
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'Mechanics & Field Invariants',
    color: '#10B981', // Emerald
    glowColor: '#34D399',
    basePosition: [1.65, 0.65, 0.1],
    size: 0.36,
    rotationSpeed: 0.5,
    coreInvariant: 'Universal conservation of momentum, energy & force distribution across fluid manifolds',
    representativeModel: 'Quantized Bohr Shells & Pascal Fluid Hydrostatics',
    formula: 'P = \\frac{F}{A} \\quad \\& \\quad F = ma',
    sampleTopics: 'Fluid Pressure, Laws of Motion, Work & Energy',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'Molecular Kinetics & Bonds',
    color: '#F59E0B', // Amber
    glowColor: '#FBBF24',
    basePosition: [-1.25, -0.22, 0.2],
    size: 0.34,
    rotationSpeed: 0.45,
    coreInvariant: 'Electron configuration stability, covalent orbital geometry & thermodynamic equilibrium',
    representativeModel: 'Tetrahedral sp³ Molecular Lattice Geometry',
    formula: 'PV = nRT \\quad \\& \\quad \\Delta G = \\Delta H - T\\Delta S',
    sampleTopics: 'Chemical Bonding, Stoichiometry, Periodic Table Dynamics',
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'Cellular Systems & Genetics',
    color: '#B8FF00', // Acid Lime
    glowColor: '#CCFF00',
    basePosition: [1.25, -0.22, -0.1],
    size: 0.35,
    rotationSpeed: 0.55,
    coreInvariant: 'Complementary base pairing, ATP energy transduction & homeostatic regulation',
    representativeModel: 'DNA Double Helix & Chloroplast Thylakoid Stacks',
    formula: '6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{h\\nu} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2',
    sampleTopics: 'Photosynthesis, Cell Structure, Genetics & Heredity',
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    category: 'Algorithms & Architecture',
    color: '#6366F1', // Indigo
    glowColor: '#818CF8',
    basePosition: [0, 0.95, -0.3],
    size: 0.32,
    rotationSpeed: 0.65,
    coreInvariant: 'Computational state transitions, deterministic logic networks & algorithmic complexity',
    representativeModel: 'Binary Logic Search Tree & State Transition Nodes',
    formula: 'T(n) = 2T(n/2) + O(n) \\implies O(n \\log n)',
    sampleTopics: 'Control Structures, Binary Search, Object Architecture',
  },
  {
    id: 'history',
    name: 'History',
    category: 'Causality & Civilization',
    color: '#FB7185', // Rose
    glowColor: '#FDA4AF',
    basePosition: [-2.15, 0.15, -0.35],
    size: 0.3,
    rotationSpeed: 0.4,
    coreInvariant: 'Chronological causality, institutional dynamics & empirical primary source triangulation',
    representativeModel: 'Concentric Stratified Historical Eras & Causal Nodes',
    formula: '\\text{Causality: Economic Preconditions} \\to \\text{Institutional Transformation}',
    sampleTopics: 'Industrial Revolution, Constitutional Reform, World Civilizations',
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'Geomorphology & Climate',
    color: '#14B8A6', // Teal
    glowColor: '#2DD4BF',
    basePosition: [2.15, 0.15, -0.3],
    size: 0.3,
    rotationSpeed: 0.42,
    coreInvariant: 'Tectonic convection, thermal equilibrium & atmospheric pressure differential circulation',
    representativeModel: 'Stratified Geoid & Coriolis Atmospheric Circulation',
    formula: '\\nabla P + \\rho g + 2\\rho (\\mathbf{\\Omega} \\times \\mathbf{v}) = 0',
    sampleTopics: 'Plate Tectonics, Climate Zones, Drainage Systems',
  },
  {
    id: 'english',
    name: 'Literature',
    category: 'Semiotics & Rhetoric',
    color: '#C084FC', // Amethyst
    glowColor: '#E879F9',
    basePosition: [0, -0.32, 0.15],
    size: 0.31,
    rotationSpeed: 0.48,
    coreInvariant: 'Dialectical synthesis, narrative architecture & structural semiotic resonance',
    representativeModel: 'Dialectical Rhetoric Balance (Thesis, Antithesis, Synthesis)',
    formula: '\\text{Thesis} \\oplus \\text{Antithesis} \\implies \\text{Dialectical Synthesis}',
    sampleTopics: 'Analytical Composition, Narrative Structure, Poetic Metrics',
  }
];

// Bespoke scientific structure for each academic discipline
const ScientificModelGroup: React.FC<{
  discipline: ScientificDisciplineData;
  index: number;
  isHovered: boolean;
  onHover: (id: SubjectId | null) => void;
  onSelect: (id: SubjectId) => void;
}> = ({ discipline, index, isHovered, onHover, onSelect }) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime ? state.clock.getElapsedTime() : 0;
    // Controlled float that strictly avoids intersecting bottom HUD
    const floatOffset = Math.sin(t * 1.3 + index * 0.9) * 0.05;
    const swayOffset = Math.cos(t * 1.1 + index * 0.7) * 0.04;

    const mouseX = state.pointer.x * 0.8;
    const mouseY = state.pointer.y * 0.6;

    groupRef.current.position.x = discipline.basePosition[0] + swayOffset + (mouseX * 0.1);
    groupRef.current.position.y = discipline.basePosition[1] + floatOffset + (mouseY * 0.08);
    groupRef.current.position.z = discipline.basePosition[2];

    groupRef.current.rotation.x += delta * discipline.rotationSpeed * (isHovered ? 1.6 : 0.6);
    groupRef.current.rotation.y += delta * discipline.rotationSpeed * (isHovered ? 2.0 : 0.8);

    const targetScale = isHovered ? discipline.size * 1.25 : discipline.size;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (discipline.rotationSpeed * 0.7);
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(discipline.id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(discipline.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Central Solid Educational Core */}
      <mesh>
        <sphereGeometry args={[1, 28, 28]} />
        <meshPhysicalMaterial
          color={isHovered ? '#FFFFFF' : discipline.color}
          emissive={discipline.glowColor}
          emissiveIntensity={isHovered ? 0.85 : 0.3}
          roughness={0.2}
          metalness={0.7}
          transmission={0.5}
          thickness={1.1}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Orbiting Scientific Model Shells */}
      <group ref={ringRef}>
        {/* Equatorial Quantized Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.35, 0.02, 16, 48]} />
          <meshBasicMaterial
            color={discipline.color}
            transparent
            opacity={isHovered ? 0.75 : 0.3}
            wireframe
          />
        </mesh>

        {/* Orthogonal Symmetry Ring */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.2, 0.015, 16, 48]} />
          <meshBasicMaterial
            color={discipline.color}
            transparent
            opacity={isHovered ? 0.65 : 0.25}
            wireframe
          />
        </mesh>

        {/* Small Orbital Energy Satellite Particle */}
        <mesh position={[1.4, 0, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color={isHovered ? '#FFFFFF' : discipline.glowColor} />
        </mesh>
      </group>
    </group>
  );
};

// Scene Content with Controlled Camera and High-Contrast Lighting
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

    // Smooth page-scroll orbit rotation, clamped so orbs never dip into the bottom HUD
    const scrollRotY = scrollProgress * Math.PI * 1.2;
    // Bounded tilt prevents any low camera angle that pushes orbs behind HUD
    const scrollTiltX = Math.max(-0.12, Math.min(0.12, (scrollProgress - 0.5) * 0.22));

    const targetRotY = state.pointer.x * 0.14 + scrollRotY;
    const targetRotX = -state.pointer.y * 0.08 + scrollTiltX;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 3, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 3, delta);

    // Camera targeting on focused discipline
    const focused = SCIENTIFIC_DISCIPLINES.find((d) => d.id === selectedOrbId);
    if (focused) {
      const targetCamX = focused.basePosition[0] * 0.55;
      const targetCamY = focused.basePosition[1] * 0.55 + 0.22; // raised for complete HUD clearance
      const targetCamZ = 3.2;
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 4, delta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 4, delta);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 4, delta);
    } else {
      state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, 0, 4, delta);
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 0.22, 4, delta);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 4.4, 4, delta);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} color="#FFFFFF" />
      <pointLight position={[-4, 3, 2]} intensity={0.65} color="#00F0FF" />
      <pointLight position={[4, 3, 2]} intensity={0.65} color="#10B981" />

      {/* Central Observatory Axis Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.65, 0.012, 16, 64]} />
        <meshBasicMaterial color="#B8FF00" transparent opacity={0.2} wireframe />
      </mesh>

      {/* 8 Scientific Discipline Models */}
      {SCIENTIFIC_DISCIPLINES.map((discipline, idx) => (
        <ScientificModelGroup
          key={discipline.id}
          discipline={discipline}
          index={idx}
          isHovered={hoveredOrbId === discipline.id || selectedOrbId === discipline.id}
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

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(window.scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeDiscipline = useMemo(() => {
    return SCIENTIFIC_DISCIPLINES.find((d) => d.id === (selectedOrbId || hoveredOrbId)) || null;
  }, [selectedOrbId, hoveredOrbId]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-radial from-[#0C121D] via-[#06080D] to-[#030407] border border-white/10 shadow-2xl select-none group">
      
      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[540px]">
        <ThreeSceneBoundary fallback={fallback}>
          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0.22, 4.4], fov: 45 }}
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

        {/* Futuristic Floating Header Telemetry Overlay (Opaque Glass, Zero 3D bleed) */}
        <div className="absolute top-4 left-4 right-4 sm:top-5 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 pointer-events-none z-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080A0E]/95 backdrop-blur-xl border border-white/15 text-white font-mono text-[10px] tracking-wider uppercase shrink-0 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
            <span className="break-words font-bold">SCIENTIFIC OBSERVATORY • 8 DISCIPLINE MODELS</span>
          </div>
          <div className="flex items-center gap-2 text-white/80 font-mono text-[10px] bg-[#080A0E]/95 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xl shrink-0 shadow-lg">
            <Sparkles className="w-3 h-3 text-[#B8FF00]" />
            <span>Scroll Page to Orbit &bull; Click to Inspect Principles</span>
          </div>
        </div>

        {/* High-Definition Focus & Educational Principle HUD Card (Solid Obsidian Glass, Zero Glare) */}
        {activeDiscipline ? (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-4 rounded-2xl bg-[#080A0E]/95 backdrop-blur-2xl border border-white/20 shadow-2xl pointer-events-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-[92%] max-w-2xl animate-in fade-in zoom-in-95 duration-150 z-30">
            <div className="flex items-start gap-3.5 min-w-0">
              <div
                className="w-4 h-4 rounded-full mt-1 shrink-0 shadow-[0_0_14px]"
                style={{ backgroundColor: activeDiscipline.color, boxShadow: `0 0 14px ${activeDiscipline.color}` }}
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-display font-black text-base text-white tracking-tight">
                    {activeDiscipline.name}
                  </h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-[#B8FF00] uppercase font-bold">
                    {activeDiscipline.category}
                  </span>
                </div>
                <p className="text-xs text-[#D0D4C7] leading-relaxed line-clamp-2">
                  <strong className="text-white">Core Invariant:</strong> {activeDiscipline.coreInvariant}
                </p>
                <div className="text-[10px] font-mono text-[#8B9DAE] flex items-center gap-2">
                  <span>Model: <span className="text-[#38BDF8]">{activeDiscipline.representativeModel}</span></span>
                  <span className="text-white/30">&bull;</span>
                  <span>Scope: <span className="text-white">{activeDiscipline.sampleTopics}</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {selectedOrbId && (
                <button
                  type="button"
                  onClick={() => setSelectedOrbId(null)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-[#8DA391] hover:text-white border border-white/15 bg-white/5 cursor-pointer transition-colors"
                >
                  Unfocus
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectSubject(activeDiscipline.id)}
                className="px-4 py-2 rounded-xl bg-[#B8FF00] text-[#080A0E] font-mono text-xs font-bold hover:bg-[#CCFF00] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Launch Portal</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ) : (
          /* Subtle, Solid Interaction Prompt Banner (Zero Glare, Opaque Solid Backdrop) */
          <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none px-4 z-20">
            <div className="px-4 py-2 rounded-full bg-[#080A0E]/95 border border-white/15 backdrop-blur-xl text-[#C8D6C9] font-mono text-xs flex items-center gap-2 text-center shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#B8FF00] shrink-0" />
              <span>Scroll page to rotate observatory &bull; Click any discipline to inspect core laws</span>
            </div>
          </div>
        )}
      </div>

      {/* Accessible, 100% Visible 8-Discipline Interactive HTML Rail (No Cut-Offs) */}
      <div className="px-4 sm:px-6 py-3 bg-[#080A0E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 font-mono text-xs text-[#8DA391] uppercase tracking-wider shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#B8FF00]" />
          <span className="font-bold">Discipline Portals:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {SCIENTIFIC_DISCIPLINES.map((discipline) => {
            const isCurrent = (selectedOrbId || hoveredOrbId) === discipline.id;
            return (
              <button
                key={discipline.id}
                type="button"
                onClick={() => {
                  setSelectedOrbId(discipline.id);
                  setHoveredOrbId(discipline.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isCurrent
                    ? 'bg-[#B8FF00] text-[#080A0E] font-bold shadow-md'
                    : 'bg-[#141A22] text-[#CBD5E1] hover:text-white hover:bg-[#1E2633] border border-white/10'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isCurrent ? '#080A0E' : discipline.color }}
                />
                <span>{discipline.name}</span>
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
              className="px-3 py-1.5 rounded-xl font-mono text-xs font-semibold text-amber-400 hover:text-amber-300 border border-amber-400/30 bg-amber-400/10 cursor-pointer shrink-0 transition-colors"
            >
              Reset View
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default FluidCrystallineOrbsScene;
