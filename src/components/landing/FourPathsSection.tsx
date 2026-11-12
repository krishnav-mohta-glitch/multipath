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
      accentColor: '#111714',
      badge: 'First Principles',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#111714] text-[#F3F4EC] border border-[#19211C] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#8DA391] text-[10px] uppercase">
            <span>Axiom Derivation</span>
            <span>Step 2 of 3</span>
          </div>
          <div className="p-3 rounded-xl bg-[#19211C] border border-[#2C3B32]">
            <p className="text-[#C8F36B] font-bold">3x + 7 = 22</p>
            <p className="text-[#8DA391] text-[11px] mt-1">Subtract 7 symmetrically: 3x = 15</p>
          </div>
          <div className="p-3 rounded-xl bg-[#19211C]/60 border border-white/05">
            <p className="text-white font-bold">Divide by 3: x = 5</p>
            <p className="text-[#8DA391] text-[11px] mt-1">Isolates unit unknown while preserving equality.</p>
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
      accentColor: '#C8F36B',
      badge: 'Spatial Intuition',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#19211C] text-[#F3F4EC] border border-[#2C3B32] space-y-3 flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-between text-[#8DA391] text-[10px] font-mono uppercase">
            <span>Mechanical Equilibrium</span>
            <span>Pan Balance</span>
          </div>
          <svg viewBox="0 0 320 130" className="w-full max-w-[280px]">
            <polygon points="160,70 145,115 175,115" fill="#2C3B32" />
            <line x1="50" y1="70" x2="270" y2="70" stroke="#8DA391" strokeWidth="3" />
            <circle cx="160" cy="70" r="5" fill="#C8F36B" />
            {/* Left Pan */}
            <line x1="70" y1="70" x2="60" y2="95" stroke="#8DA391" strokeWidth="1.5" />
            <line x1="70" y1="70" x2="80" y2="95" stroke="#8DA391" strokeWidth="1.5" />
            <ellipse cx="70" cy="95" rx="25" ry="6" fill="#111714" stroke="#8DA391" />
            <rect x="58" y="78" width="24" height="15" rx="3" fill="#C8F36B" />
            <text x="70" y="89" fill="#111714" fontSize="8" fontWeight="bold" textAnchor="middle">3x+7</text>
            {/* Right Pan */}
            <line x1="250" y1="70" x2="240" y2="95" stroke="#8DA391" strokeWidth="1.5" />
            <line x1="250" y1="70" x2="260" y2="95" stroke="#8DA391" strokeWidth="1.5" />
            <ellipse cx="250" cy="95" rx="25" ry="6" fill="#111714" stroke="#8DA391" />
            <rect x="238" y="78" width="24" height="15" rx="3" fill="#8DA391" />
            <text x="250" y="89" fill="#111714" fontSize="8" fontWeight="bold" textAnchor="middle">22</text>
          </svg>
          <span className="text-[11px] font-mono text-[#C8F36B]">Equilibrium angle: θ = 0.0°</span>
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
      accentColor: '#8DA391',
      badge: 'Empirical Context',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#E8EAE1] border border-[#19211C]/15 space-y-2.5 text-xs text-[#171C18]">
          <div className="flex items-center justify-between font-mono text-[10px] text-[#5E7A65] uppercase">
            <span>Cloud Infrastructure Case</span>
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#19211C]/10 space-y-1">
            <div className="font-semibold text-xs text-[#111714]">Cost Model: C = 150 + 0.25h</div>
            <p className="text-[11px] text-[#5F6B62]">Target Budget: $1,000 max monthly spend.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#C8F36B]/25 border border-[#C8F36B] font-mono text-[11px] text-[#111714]">
            Threshold Limit: h = 3,400 Compute Hours
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
      accentColor: '#5E7A65',
      badge: 'Interactive Sandbox',
      visualPreview: (
        <div className="p-5 rounded-2xl bg-[#111714] text-[#F3F4EC] border border-[#19211C] space-y-3">
          <div className="flex items-center justify-between text-[#8DA391] font-mono text-[10px] uppercase">
            <span>Dynamic Sandbox</span>
            <Sliders className="w-3.5 h-3.5 text-[#C8F36B]" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-[#8DA391]">Slope (m)</span>
              <span className="text-[#C8F36B] font-bold">3.00</span>
            </div>
            <div className="w-full bg-[#19211C] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#C8F36B] h-full w-[70%]" />
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-[#8DA391]">Y-Intercept (b)</span>
              <span className="text-[#C8F36B] font-bold">7.00</span>
            </div>
            <div className="w-full bg-[#19211C] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#8DA391] h-full w-[50%]" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentPath = pathProfiles.find((p) => p.id === activeTab) || pathProfiles[0];

  return (
    <section id="four-paths-section" className="py-20 lg:py-32 bg-[#F1F1E9] border-b border-[#19211C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8F36B]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
              COGNITIVE ARCHITECTURE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight">
            Four Convergent Learning Paths
          </h2>

          <p className="text-base sm:text-lg text-[#171C18]/80 leading-relaxed max-w-2xl">
            When a student encounters a barrier in understanding, switching to an alternative perspective unblocks comprehension. Every topic is built across all four paradigms simultaneously.
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
                  className={`p-5 rounded-2xl cursor-pointer transition-all border text-left flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#111714] text-[#F3F4EC] border-[#111714] shadow-lg translate-x-1'
                      : 'bg-[#E8EAE1]/80 hover:bg-[#E8EAE1] text-[#171C18] border-[#19211C]/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-[#19211C] border-[#2C3B32] text-[#C8F36B]'
                      : 'bg-white border-[#19211C]/10 text-[#111714]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${
                        isSelected ? 'text-[#8DA391]' : 'text-[#19211C]/60'
                      }`}>
                        Path {path.number} • {path.badge}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C8F36B]" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base leading-tight">
                      {path.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${
                      isSelected ? 'text-[#D0D4C7]' : 'text-[#19211C]/70'
                    }`}>
                      {path.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Path Showcase Stage (Right) */}
          <div className="lg:col-span-7 bg-[#E8EAE1] border border-[#19211C]/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left">
            
            <div className="flex items-center justify-between border-b border-[#19211C]/10 pb-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5E7A65]">
                  Active Mental Model
                </span>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#111714]">
                  {currentPath.title}
                </h4>
              </div>

              <button
                onClick={() => openTopic('math-linear-equations', currentPath.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#111714] bg-[#C8F36B] hover:bg-[#BCEB58] rounded-full transition-all shadow-xs"
              >
                <span>Open in Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm text-[#171C18]/90 font-medium leading-relaxed">
              {currentPath.tagline} — {currentPath.description}
            </p>

            {/* Path Visual Component Preview */}
            <div className="pt-2">
              {currentPath.visualPreview}
            </div>

            <div className="p-4 rounded-xl bg-white/70 border border-[#19211C]/10 flex items-center justify-between text-xs text-[#171C18]">
              <span className="font-medium">Curated exemplar: Linear Equations (Conservation of Equality)</span>
              <button
                onClick={() => openTopic('math-linear-equations', currentPath.id)}
                className="font-bold text-[#111714] hover:underline flex items-center gap-1 text-xs"
              >
                <span>Launch Experience</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
