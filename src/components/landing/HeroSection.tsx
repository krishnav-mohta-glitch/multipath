import React, { useEffect, useRef, Suspense } from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const LearningCoreScene = React.lazy(() => import('../three/LearningCoreScene'));

export const HeroSection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Performant procedural 2D convergence animation (fallback & reduced motion)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 540);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 460);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let time = 0;
    const paths = [
      { name: 'Structured', color: '#60A5FA', angle: -Math.PI * 0.75, offset: 0 },
      { name: 'Visual', color: '#B8FF00', angle: -Math.PI * 0.25, offset: 1.5 },
      { name: 'Applied', color: '#34D399', angle: Math.PI * 0.75, offset: 3 },
      { name: 'Experimental', color: '#A78BFA', angle: Math.PI * 0.25, offset: 4.5 },
    ];

    const render = () => {
      if (!prefersReducedMotion) time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Draw subtle orbital guide tracks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.58, 0, Math.PI * 2);
      ctx.stroke();

      // Central core (Single Concept)
      const pulse = Math.sin(time * 2) * 2;
      const coreRadius = 24 + pulse;

      // Core glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 60);
      glowGrad.addColorStop(0, 'rgba(184, 255, 0, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(184, 255, 0, 0.08)');
      glowGrad.addColorStop(1, 'rgba(184, 255, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Core disk
      ctx.fillStyle = '#080A0E';
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#B8FF00';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw converging paths into the central concept
      paths.forEach((path, i) => {
        const startX = centerX + Math.cos(path.angle + Math.sin(time + path.offset) * 0.1) * radius;
        const startY = centerY + Math.sin(path.angle + Math.sin(time + path.offset) * 0.1) * radius;

        const cpX = centerX + Math.cos(path.angle + 0.5) * (radius * 0.4);
        const cpY = centerY + Math.sin(path.angle + 0.5) * (radius * 0.4);

        ctx.strokeStyle = path.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, centerX, centerY);
        ctx.stroke();

        // Traveling impulse pulse along the curve
        const progress = ((time + i * 0.25) % 1);
        const t = progress;
        const pulseX = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * centerX;
        const pulseY = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * centerY;

        ctx.fillStyle = path.color;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer source node disk
        ctx.fillStyle = '#141A22';
        ctx.beginPath();
        ctx.arc(startX, startY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Core label
      ctx.fillStyle = '#B8FF00';
      ctx.font = '700 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CORE', centerX, centerY);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-28 border-b border-white/10 bg-[#080A0E] text-[#F3F4EC]">
      
      {/* Precision coordinate grid backdrop */}
      <div className="absolute inset-0 cosmic-grid opacity-35 pointer-events-none" />

      {/* Subtle atmospheric ambient glow */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-[#B8FF00]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#38BDF8]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Scientific Editorial Copy & Telemetry */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Scientific Telemetry Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141A22] border border-white/15 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8FF00] font-bold">
                SCIENTIFIC OBSERVATORY V3 • 4 PATHS
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.06]">
                One concept. <br />
                <span className="text-[#8B9DAE]">Multiple ways to</span> <br />
                <span className="relative inline-block text-white">
                  understand it.
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#B8FF00] -z-0" />
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#D0D4C7] max-w-xl font-normal leading-relaxed pt-1">
                An interactive learning observatory engineered for deep mastery. Deconstruct any concept through first-principles derivations, spatial geometry, real-world engineering cases, and active Feynman inquiry.
              </p>
            </div>

            {/* Sovereign Guest-First Guarantee */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#141A22]/80 border border-white/08 max-w-md">
              <ShieldCheck className="w-4 h-4 text-[#B8FF00] shrink-0" />
              <span className="font-mono text-xs text-[#E5E7EB]">
                <strong className="text-white font-semibold">100% Guest-First:</strong> Immediate access without mandatory registration. Progress persists locally.
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={() => navigateTo('library')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] active:scale-[0.98] rounded-full shadow-lg shadow-[#B8FF00]/10 transition-all cursor-pointer"
              >
                <span>Launch Knowledge Library</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('four-paths-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#141A22] hover:bg-[#1C2430] border border-white/15 rounded-full transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#8B9DAE]" />
                <span>Explore the 4 Paths</span>
              </button>
            </div>

            {/* Architecture Telemetry Metrics Grid */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#141A22]/70 border border-white/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B9DAE] block mb-0.5">Perspectives</span>
                <span className="font-display font-bold text-sm text-white">4 Convergent Paths</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141A22]/70 border border-white/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B9DAE] block mb-0.5">Coverage</span>
                <span className="font-display font-bold text-sm text-white">64 Verified Topics</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141A22]/70 border border-white/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B9DAE] block mb-0.5">Curriculum</span>
                <span className="font-display font-bold text-sm text-white">CBSE &amp; ICSE 6–10</span>
              </div>
              <div className="p-3 rounded-xl bg-[#141A22]/70 border border-white/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#8B9DAE] block mb-0.5">Diagnostic</span>
                <span className="font-display font-bold text-sm text-white">Feynman Engine</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Epistemic Core with Precision Scientific Framing */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container with Reticle Corner Accents */}
            <div 
              id="threejs-hero-container"
              className="corner-reticle relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl bg-[#0D1117] border border-white/15 shadow-2xl overflow-hidden p-4 flex flex-col justify-between"
            >
              {(() => {
                const fallbackElement = (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between z-10 px-2 pt-1 text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8B9DAE]">
                          Convergent Cognitive Core
                        </span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#141A22] text-[#B8FF00] border border-white/10 font-bold">
                        4 Paths &rarr; 1 Model
                      </span>
                    </div>

                    <canvas
                      ref={canvasRef}
                      className="w-full h-full absolute inset-0 block select-none pointer-events-none"
                    />

                    <div className="relative z-10 bg-[#141A22]/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 mt-auto">
                      <div className="space-y-0.5 text-left">
                        <span className="text-white text-xs font-semibold block">
                          Flagship Model Sandbox
                        </span>
                        <span className="text-[10px] text-[#8B9DAE] block font-mono">
                          Linear Equations: Conservation of Equality
                        </span>
                      </div>
                      <button
                        onClick={() => openTopic('math-linear-equations', 'structured-explanation')}
                        className="px-3 py-1.5 rounded-xl bg-[#B8FF00] hover:bg-[#A3E635] text-[#080A0E] font-bold text-xs flex items-center gap-1 transition-all shrink-0 cursor-pointer"
                      >
                        <span>Launch</span>
                        <ArrowRight className="w-3 h-3 stroke-[2.4]" />
                      </button>
                    </div>
                  </div>
                );

                return (
                  <Suspense fallback={fallbackElement}>
                    <LearningCoreScene
                      fallback={fallbackElement}
                      onSelectPath={(pathId) => openTopic('math-linear-equations', pathId)}
                    />
                  </Suspense>
                );
              })()}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
