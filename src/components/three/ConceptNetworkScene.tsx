import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SceneCanvas } from './SceneCanvas';
import { ThreeSceneBoundary } from './ThreeSceneBoundary';
import type { DiagramComponent, VisualLayer } from '../../types/learningPath';

interface ConceptNetworkSceneProps {
  components: DiagramComponent[];
  interactiveLayers?: VisualLayer[];
  selectedComponentId: string | null;
  activeLayerId: string | null;
  onSelectComponent: (id: string) => void;
  visualType?: string;
  fallback: React.ReactNode;
}

// Inner 3D Graph Nodes and Edges
const ConceptGraph3D: React.FC<{
  components: DiagramComponent[];
  activeLayer: VisualLayer | undefined;
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
}> = ({
  components,
  activeLayer,
  selectedComponentId,
  onSelectComponent,
}) => {
  const graphGroupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Compute 3D node positions around a central hub
  const { nodePositions, edgePairs } = useMemo(() => {
    const positions: [number, number, number][] = [];
    const count = components.length;

    components.forEach((_, idx) => {
      // Cylindrical/spherical distribution for aesthetic spatial separation
      const angle = (idx / count) * Math.PI * 2;
      const radius = 2.2;
      const y = Math.sin(angle * 2) * 0.45;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push([x, y, z]);
    });

    // Build edge connections: connect each node to center and adjacent neighbors
    const edges: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      // Connect to adjacent node
      edges.push([i, (i + 1) % count]);
      // Connect every second node across for rich topological network
      if (count > 3 && i % 2 === 0) {
        edges.push([i, (i + 2) % count]);
      }
    }

    return { nodePositions: positions, edgePairs: edges };
  }, [components]);

  // Gentle autonomous slow rotation and mouse interaction
  useFrame((state, delta) => {
    if (graphGroupRef.current) {
      graphGroupRef.current.rotation.y += delta * 0.12;
      // Damped pointer influence
      graphGroupRef.current.rotation.x +=
        (-state.pointer.y * 0.3 - graphGroupRef.current.rotation.x) * 0.05;
      graphGroupRef.current.rotation.z +=
        (state.pointer.x * 0.2 - graphGroupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={1.0} />
      <pointLight position={[0, 0, 0]} intensity={1.8} color="#C8F36B" distance={6} />

      <group ref={graphGroupRef}>
        {/* Central Concept Hub */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#111714"
            emissive="#19211C"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#C8F36B"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* 3D Connecting Edges */}
        {edgePairs.map(([fromIdx, toIdx], eIdx) => {
          const p1 = nodePositions[fromIdx];
          const p2 = nodePositions[toIdx];
          if (!p1 || !p2) return null;

          const points = [
            new THREE.Vector3(...p1),
            new THREE.Vector3(...p2),
          ];
          const lineGeom = new THREE.BufferGeometry().setFromPoints(points);

          const fromId = components[fromIdx]?.id;
          const toId = components[toIdx]?.id;
          const isEdgeActive =
            selectedComponentId === fromId || selectedComponentId === toId;

          return (
            <primitive
              key={`edge-${eIdx}`}
              object={
                new THREE.Line(
                  lineGeom,
                  new THREE.LineBasicMaterial({
                    color: isEdgeActive ? 0xc8f36b : 0x5e7a65,
                    transparent: true,
                    opacity: isEdgeActive ? 0.8 : 0.25,
                  })
                )
              }
            />
          );
        })}

        {/* Radial Spokes to Hub */}
        {nodePositions.map((p, idx) => {
          const points = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(...p),
          ];
          const spokeGeom = new THREE.BufferGeometry().setFromPoints(points);

          const isSelected = components[idx]?.id === selectedComponentId;
          return (
            <primitive
              key={`spoke-${idx}`}
              object={
                new THREE.Line(
                  spokeGeom,
                  new THREE.LineBasicMaterial({
                    color: isSelected ? 0xc8f36b : 0x334155,
                    transparent: true,
                    opacity: isSelected ? 0.6 : 0.15,
                  })
                )
              }
            />
          );
        })}

        {/* Component Nodes */}
        {components.map((comp, idx) => {
          const pos = nodePositions[idx] || [0, 0, 0];
          const isSelected = selectedComponentId === comp.id;
          const isHighlighted =
            activeLayer?.highlightedComponentIds.includes(comp.id) ?? true;

          return (
            <group key={comp.id} position={pos}>
              {/* Outer selection ring if selected */}
              {isSelected && (
                <mesh>
                  <ringGeometry args={[0.26, 0.3, 32]} />
                  <meshBasicMaterial
                    color="#C8F36B"
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              )}

              {/* Node Geometry */}
              <mesh
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto';
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent(comp.id);
                }}
              >
                <sphereGeometry args={[isSelected ? 0.22 : 0.16, 16, 16]} />
                <meshStandardMaterial
                  color={
                    isSelected
                      ? '#C8F36B'
                      : isHighlighted
                      ? '#8DA391'
                      : '#2C3B32'
                  }
                  emissive={
                    isSelected
                      ? '#C8F36B'
                      : isHighlighted
                      ? '#5E7A65'
                      : '#111714'
                  }
                  emissiveIntensity={isSelected ? 0.7 : isHighlighted ? 0.3 : 0.1}
                  roughness={0.2}
                  metalness={0.6}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
};

export const ConceptNetworkScene: React.FC<ConceptNetworkSceneProps> = ({
  components,
  interactiveLayers,
  selectedComponentId,
  activeLayerId,
  onSelectComponent,
  visualType,
  fallback,
}) => {
  const activeLayer = interactiveLayers?.find((l) => l.layerId === activeLayerId);
  const selectedComponent = components.find((c) => c.id === selectedComponentId);

  return (
    <ThreeSceneBoundary fallback={fallback} sceneName="Interactive Concept Network">
      <div className="bg-[#111714] text-[#F3F4EC] rounded-2xl border border-white/10 p-5 sm:p-7 space-y-5 relative overflow-hidden shadow-xl">
        
        {/* Header Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C8F36B]">
                3D Topological Invariant Network
              </span>
            </div>
            <p className="text-xs text-[#8DA391]">
              Spatial graph of concept dependencies &bull; Click nodes or orbit to inspect relationships
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#8DA391]">
              NODES: {components.length}
            </span>
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#19211C] text-[#C8F36B] border border-white/10 uppercase">
              {visualType ? `${visualType} • 3D` : '3D Interactive'}
            </span>
          </div>
        </div>

        {/* 3D Scene Container */}
        <div className="relative w-full h-72 sm:h-96 bg-[#19211C] rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C8F36B 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <SceneCanvas
            fallback={fallback}
            camera={{ position: [0, 0, 5.0], fov: 45 }}
            frameloop="always"
          >
            <ConceptGraph3D
              components={components}
              activeLayer={activeLayer}
              selectedComponentId={selectedComponentId}
              onSelectComponent={onSelectComponent}
            />
          </SceneCanvas>

          {/* Floating Orbit Help Pill */}
          <div className="absolute bottom-3 right-3 z-10 font-mono text-[9px] px-2.5 py-1 rounded-md bg-[#111714]/80 backdrop-blur-md text-[#8DA391] border border-white/10 pointer-events-none hidden sm:block">
            DRAG TO ORBIT &bull; CLICK NODE TO INSPECT
          </div>
        </div>

        {/* Selected Component Micro-Inspector & Accessible List */}
        <div className="space-y-3">
          {selectedComponent ? (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C8F36B]" />
                  <span className="font-mono text-xs font-bold text-[#C8F36B]">
                    SELECTED: {selectedComponent.name} &bull; {selectedComponent.role}
                  </span>
                </div>
                {selectedComponent.badge && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/10 text-[#8DA391]">
                    {selectedComponent.badge}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8DA391] leading-relaxed">
                {selectedComponent.description}
              </p>
            </div>
          ) : (
            <div className="p-3 text-center text-xs text-[#8DA391] font-mono">
              Select any node in the 3D network to inspect its conceptual invariant.
            </div>
          )}

          {/* Accessible HTML Node Selector Bar (Keyboard Accessible) */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="font-mono text-[10px] text-[#8DA391] uppercase mr-1 shrink-0">
              Select Node:
            </span>
            {components.map((c) => {
              const isSelected = selectedComponentId === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectComponent(c.id)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#C8F36B] text-[#111714]'
                      : 'bg-white/5 text-[#8DA391] hover:text-[#F3F4EC] hover:bg-white/10'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </ThreeSceneBoundary>
  );
};

export default ConceptNetworkScene;
