import React, { useEffect, useRef, Suspense } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const LearningCoreScene = React.lazy(() => import('../three/LearningCoreScene'));

export const HeroSection: React.FC = () => {
  const { navigateTo, openTopic } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Performant procedural 2D convergence animation (prepared for future Three.js replacement)
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

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let time = 0;
    const paths = [
      { name: 'Structured', color: '#8DA391', angle: -Math.PI * 0.75, offset: 0 },
      { name: 'Visual', color: '#C8F36B', angle: -Math.PI * 0.25, offset: 1.5 },
      { name: 'Applied', color: '#E8EAE1', angle: Math.PI * 0.75, offset: 3 },
      { name: 'Experimental', color: '#5E7A65', angle: Math.PI * 0.25, offset: 4.5 },
    ];

    const render = () => {
      if (!prefersReducedMotion) time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      // Draw subtle orbital guide tracks
      ctx.strokeStyle = 'rgba(25, 33, 28, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.55, 0, Math.PI * 2);
      ctx.stroke();

      // Central core (Single Concept)
      const pulse = Math.sin(time * 2) * 2;
      const coreRadius = 24 + pulse;

      // Core glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, 60);
      glowGrad.addColorStop(0, 'rgba(200, 243, 107, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(200, 243, 107, 0.08)');
      glowGrad.addColorStop(1, 'rgba(200, 243, 107, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Core disk
      ctx.fillStyle = '#111714';
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#C8F36B';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw converging paths into the central concept
      paths.forEach((path, i) => {
        const startX = centerX + Math.cos(path.angle + Math.sin(time + path.offset) * 0.1) * radius;
        const startY = centerY + Math.sin(path.angle + Math.sin(time + path.offset) * 0.1) * radius;

        // Curved convergence bezier line
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
        // Bezier formula B(t) = (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2
        const pulseX = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * cpX + Math.pow(t, 2) * centerX;
        const pulseY = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * cpY + Math.pow(t, 2) * centerY;

        ctx.fillStyle = path.color;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer source node disk
        ctx.fillStyle = '#19211C';
        ctx.beginPath();
        ctx.arc(startX, startY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Core icon / center label
      ctx.fillStyle = '#C8F36B';
      ctx.font = '600 10px "JetBrains Mono", monospace';
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
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#19211C]/10 bg-[#F1F1E9]">
      
      {/* Precision grid backdrop */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#111714 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Asymmetrical Editorial Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Small introductory label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111714]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
                A DIFFERENT WAY TO LEARN
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111714] tracking-tight leading-[1.08]">
                One concept. <br />
                <span className="text-[#19211C]/60">Multiple ways to</span> <br />
                <span className="relative inline-block">
                  understand it.
                  <span className="absolute bottom-1.5 left-0 w-full h-[3px] bg-[#C8F36B] -z-0" />
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#171C18]/80 max-w-xl font-normal leading-relaxed pt-2">
                Learn through different perspectives. Explore ideas, question assumptions and build your own understanding.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => navigateTo('library')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] active:scale-[0.98] rounded-full shadow-xs transition-all"
              >
                <span>Start exploring</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('four-paths-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#111714] bg-[#E8EAE1] hover:bg-[#DFE2D7] border border-[#19211C]/10 rounded-full transition-all"
              >
                <Compass className="w-4 h-4 text-[#19211C]/70" />
                <span>Discover how it works</span>
              </button>
            </div>

            {/* Architecture Invariants Telemetry Pills */}
            <div className="pt-6 border-t border-[#19211C]/08 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#E8EAE1]/60 border border-[#19211C]/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#19211C]/60 block mb-0.5">Perspectives</span>
                <span className="font-display font-bold text-sm text-[#111714]">4 Convergent Paths</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1]/60 border border-[#19211C]/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#19211C]/60 block mb-0.5">Coverage</span>
                <span className="font-display font-bold text-sm text-[#111714]">8 Core Disciplines</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1]/60 border border-[#19211C]/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#19211C]/60 block mb-0.5">Inquiry</span>
                <span className="font-display font-bold text-sm text-[#111714]">Guided Discovery</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E8EAE1]/60 border border-[#19211C]/08">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#19211C]/60 block mb-0.5">Diagnostic</span>
                <span className="font-display font-bold text-sm text-[#111714]">Feynman Rubric</span>
              </div>
            </div>

          </div>

          {/* Right Column: Distinctive 2D Convergence Canvas (Future Three.js Hook) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container (Phase 10 Three.js Host) */}
            <div 
              id="threejs-hero-container"
              className="relative w-full max-w-md sm:max-w-lg aspect-square rounded-3xl bg-[#111714] border border-[#19211C] shadow-2xl overflow-hidden p-4 flex flex-col justify-between"
            >
              {/* 2D Fallback Component */}
              {(() => {
                const fallbackElement = (
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between z-10 px-2 pt-1 text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C8F36B] animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
                          Convergent Cognitive Core
                        </span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-[#19211C] text-[#C8F36B] border border-[#2C3B32]">
                        4 Paths &rarr; 1 Model
                      </span>
                    </div>

                    <canvas
                      ref={canvasRef}
                      className="w-full h-full absolute inset-0 block select-none pointer-events-none"
                    />

                    <div className="relative z-10 bg-[#19211C]/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between gap-3 mt-auto">
                      <div className="space-y-0.5">
                        <span className="text-white text-xs font-semibold block">
                          Interactive Demonstration
                        </span>
                        <span className="text-[10px] text-[#8DA391] block">
                          Linear Equations: Conservation of Equality
                        </span>
                      </div>
                      <button
                        onClick={() => openTopic('math-linear-equations', 'structured-explanation')}
                        className="px-3 py-1.5 rounded-xl bg-[#C8F36B] hover:bg-[#BCEB58] text-[#111714] font-bold text-xs flex items-center gap-1 transition-all shrink-0"
                      >
                        <span>Launch</span>
                        <ArrowRight className="w-3 h-3" />
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
