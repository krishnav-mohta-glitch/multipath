import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  Wrench,
  FlaskConical,
  ArrowRight,
  Sliders,
  Code2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { LearningPathId } from '../../types/learningPath';

export const FourPathsSection: React.FC = () => {
  const { openTopic } = useApp();
  const [activeTab, setActiveTab] = useState<LearningPathId>('structured-explanation');

  const pathProfiles = [
    {
      id: 'structured-explanation' as const,
      number: '01',
      title: 'Structured Explanation',
      tagline: 'Axiomatic Rigor & Deductive Steps',
      description: 'Deconstructs ideas from fundamental truths. Every formula is derived step-by-step using reversible operations without hand-waving.',
      icon: BookOpen,
      accentColor: '#60A5FA',
      badge: 'First Principles',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#8B9DAE] text-[10px] uppercase">
            <span>Axiom Derivation Protocol</span>
            <span className="text-[#B8FF00] font-bold">Step 2 of 3</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#141A22] border border-white/10">
            <p className="text-[#B8FF00] font-bold text-sm tracking-wide">3x + 7 = 22</p>
            <p className="text-[#8B9DAE] text-xs mt-1">Subtract 7 symmetrically: 3x = 15</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#141A22]/70 border border-white/05">
            <p className="text-white font-bold text-sm tracking-wide">Divide by 3: x = 5</p>
            <p className="text-[#8B9DAE] text-xs mt-1">Isolates unit unknown while preserving invariant equality.</p>
          </div>
        </div>
      )
    },
    {
      id: 'visual-learning' as const,
      number: '02',
      title: 'Visual Learning',
      tagline: 'Spatial Geometry & Balance Equilibrium',
      description: 'Translates abstract algebraic symbols into geometric vectors, coordinates, and physical balance models that your visual cortex can intuitively grasp.',
      icon: Eye,
      accentColor: '#B8FF00',
      badge: 'Spatial Intuition',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 space-y-3 flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-between text-[#8B9DAE] text-[10px] font-mono uppercase">
            <span>Mechanical Equilibrium Model</span>
            <span className="text-[#B8FF00]">Pan Balance</span>
          </div>
          <svg viewBox="0 0 320 130" className="w-full max-w-[280px]">
            <polygon points="160,70 145,115 175,115" fill="#1C2430" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="50" y1="70" x2="270" y2="70" stroke="#8B9DAE" strokeWidth="3" />
            <circle cx="160" cy="70" r="5" fill="#B8FF00" />
            {/* Left Pan */}
            <line x1="70" y1="70" x2="60" y2="95" stroke="#8B9DAE" strokeWidth="1.5" />
            <line x1="70" y1="70" x2="80" y2="95" stroke="#8B9DAE" strokeWidth="1.5" />
            <ellipse cx="70" cy="95" rx="25" ry="6" fill="#141A22" stroke="#8B9DAE" />
            <rect x="58" y="78" width="24" height="15" rx="3" fill="#B8FF00" />
            <text x="70" y="89" fill="#080A0E" fontSize="8" fontWeight="bold" textAnchor="middle">3x+7</text>
            {/* Right Pan */}
            <line x1="250" y1="70" x2="240" y2="95" stroke="#8B9DAE" strokeWidth="1.5" />
            <line x1="250" y1="70" x2="260" y2="95" stroke="#8DA391" strokeWidth="1.5" />
            <ellipse cx="250" cy="95" rx="25" ry="6" fill="#141A22" stroke="#8DA391" />
            <rect x="238" y="78" width="24" height="15" rx="3" fill="#60A5FA" />
            <text x="250" y="89" fill="#080A0E" fontSize="8" fontWeight="bold" textAnchor="middle">22</text>
          </svg>
          <span className="text-[11px] font-mono text-[#B8FF00] font-bold">Equilibrium State: θ = 0.0° (Balanced)</span>
        </div>
      )
    },
    {
      id: 'examples-applications' as const,
      number: '03',
      title: 'Examples & Applications',
      tagline: 'High-Stakes Engineering & Real Context',
      description: 'Reveals where and why the mathematics exists in the physical world—from cloud computing infrastructure billing bounds to aerodynamic load limits.',
      icon: Wrench,
      accentColor: '#34D399',
      badge: 'Empirical Context',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#080A0E] border border-white/10 space-y-2.5 text-xs text-white">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#8B9DAE] uppercase">
            <span>Cloud Infrastructure Capacity Case</span>
            <Code2 className="w-3.5 h-3.5 text-[#34D399]" />
          </div>
          <div className="p-3.5 rounded-xl bg-[#141A22] border border-white/08 space-y-1">
            <div className="font-semibold text-xs text-white">Cost Governing Model: C = 150 + 0.25h</div>
            <p className="text-[11px] text-[#8B9DAE]">Target Budget Constraint: $1,000 max monthly spend.</p>
          </div>
          <div className="p-3 rounded-xl bg-[#1C2430] border border-[#34D399]/40 font-mono text-xs text-[#34D399] font-bold">
            Threshold Boundary: h = 3,400 Compute Hours
          </div>
        </div>
      )
    },
    {
      id: 'explore-experiment' as const,
      number: '04',
      title: 'Explore & Experiment',
      tagline: 'Active Parameter Sandbox & Simulations',
      description: 'Manipulate independent variables with live reactive controls. Discover governing thresholds by actively stressing the mathematical model.',
      icon: FlaskConical,
      accentColor: '#A78BFA',
      badge: 'Interactive Sandbox',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#080A0E] text-[#F3F4EC] border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-[#8B9DAE] font-mono text-[10px] uppercase">
            <span>Dynamic Equation Sandbox</span>
            <Sliders className="w-3.5 h-3.5 text-[#B8FF00]" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-[#8B9DAE]">Slope (m)</span>
              <span className="text-[#B8FF00] font-bold">3.00</span>
            </div>
            <div className="w-full bg-[#141A22] h-2 rounded-full overflow-hidden border border-white/05">
              <div className="bg-[#B8FF00] h-full w-[70%]" />
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-[#8B9DAE]">Y-Intercept (b)</span>
              <span className="text-[#38BDF8] font-bold">7.00</span>
            </div>
            <div className="w-full bg-[#141A22] h-2 rounded-full overflow-hidden border border-white/05">
              <div className="bg-[#38BDF8] h-full w-[50%]" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentPath = pathProfiles.find((p) => p.id === activeTab) || pathProfiles[0];

  return (
    <section id="four-paths-section" className="py-16 lg:py-28 bg-[#0D1117] text-[#F3F4EC] border-b border-white/10 relative overflow-hidden">
      
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 cosmic-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141A22] border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#B8FF00]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8FF00] font-bold">
              COGNITIVE ARCHITECTURE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Four Convergent Learning Paths
          </h2>

          <p className="text-base sm:text-lg text-[#D0D4C7] leading-relaxed max-w-2xl font-normal">
            When a student encounters a barrier in understanding, switching to an alternative perspective unblocks comprehension. Every topic in MULTIPATH is constructed across all four paradigms simultaneously.
          </p>
        </div>

        {/* Interactive Path Grid & Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Path Navigation Cards (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {pathProfiles.map((path) => {
              const Icon = path.icon;
              const isSelected = activeTab === path.id;

              return (
                <div
                  key={path.id}
                  onClick={() => setActiveTab(path.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-150 border text-left flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#1C2430] text-white border-[#B8FF00]/40 shadow-xl translate-x-1'
                      : 'bg-[#141A22]/80 hover:bg-[#141A22] text-[#D0D4C7] hover:text-white border-white/08'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                    isSelected
                      ? 'bg-[#080A0E] border-[#B8FF00]/40 text-[#B8FF00]'
                      : 'bg-[#080A0E] border-white/10 text-[#8B9DAE]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${
                        isSelected ? 'text-[#B8FF00] font-bold' : 'text-[#8B9DAE]'
                      }`}>
                        Path {path.number} • {path.badge}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#B8FF00] animate-pulse" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base leading-tight text-white">
                      {path.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-[#D0D4C7]' : 'text-[#8B9DAE]'
                    }`}>
                      {path.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Path Showcase Stage (Right) */}
          <div className="corner-reticle lg:col-span-7 bg-[#141A22] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-left">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8FF00] font-bold">
                  ACTIVE EPISTEMIC PERSPECTIVE
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {currentPath.title}
                </h4>
              </div>

              <button
                onClick={() => openTopic('math-linear-equations', currentPath.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#080A0E] bg-[#B8FF00] hover:bg-[#A3E635] rounded-full transition-all shadow-sm cursor-pointer"
              >
                <span>Launch in Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.4]" />
              </button>
            </div>

            <p className="text-sm text-[#D0D4C7] font-medium leading-relaxed">
              <strong className="text-white">{currentPath.tagline}</strong> — {currentPath.description}
            </p>

            {/* Path Visual Component Preview */}
            <div className="pt-2">
              {currentPath.visualPreview}
            </div>

            {/* Exemplar Topic Launch Bar */}
            <div className="p-3.5 rounded-xl bg-[#080A0E]/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#E5E7EB]">
              <span className="font-mono text-xs">Exemplar Topic: <strong className="text-white font-semibold">Linear Equations (Conservation of Equality)</strong></span>
              <button
                onClick={() => openTopic('math-linear-equations', currentPath.id)}
                className="font-bold text-[#B8FF00] hover:underline flex items-center gap-1 text-xs cursor-pointer self-start sm:self-auto"
              >
                <span>Launch Experience</span>
                <ArrowRight className="w-3 h-3 stroke-[2.4]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
