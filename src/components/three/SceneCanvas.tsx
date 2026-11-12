import React, { useState, useRef, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import { detectWebGLSupport } from './utils/webglDetection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { usePageVisibility } from './hooks/usePageVisibility';

interface SceneCanvasProps {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  frameloop?: 'always' | 'demand' | 'never';
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
}

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  children,
  fallback,
  className = 'w-full h-full',
  frameloop = 'always',
  camera = { position: [0, 0, 5], fov: 45 }
}) => {
  const [isSupported] = useState<boolean>(() => detectWebGLSupport().supported);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();
  const isVisible = usePageVisibility();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Determine active frame loop state
  let effectiveFrameloop: 'always' | 'demand' | 'never' = frameloop;
  if (!isVisible) {
    effectiveFrameloop = 'never';
  } else if (prefersReducedMotion) {
    effectiveFrameloop = 'demand';
  }

  // Handle WebGL context loss listener
  const handleCreated = (state: RootState) => {
    const glDomElement = state.gl.domElement;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('[SceneCanvas] WebGL context lost. Rendering 2D fallback.');
      setContextLost(true);
    };

    const onContextRestored = () => {
      console.info('[SceneCanvas] WebGL context restored.');
      setContextLost(false);
    };

    glDomElement.addEventListener('webglcontextlost', onContextLost, false);
    glDomElement.addEventListener('webglcontextrestored', onContextRestored, false);
  };

  // If WebGL is unsupported or context was lost, display fallback
  if (isSupported === false || contextLost) {
    return <>{fallback}</>;
  }

  // While checking support or rendering
  return (
    <div ref={canvasContainerRef} className={`relative overflow-hidden ${className}`}>
      {isSupported === true && (
        <Canvas
          frameloop={effectiveFrameloop}
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
          camera={camera}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: false,
          }}
          onCreated={handleCreated}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
};
