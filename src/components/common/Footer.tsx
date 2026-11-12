import React from 'react';
import { ShieldCheck, ArrowUpRight, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/subjects';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedSubjectId, openFeatureModal, openTopic } = useApp();

  return (
    <footer className="bg-[#111714] text-[#F3F4EC] border-t border-[#19211C] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#19211C] border border-[#2C3B32] flex items-center justify-center text-[#C8F36B]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h6m6 0h6" />
                  <path d="M12 3v6m0 6v6" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">MULTIPATH</span>
            </div>
            
            <p className="text-sm font-medium text-[#C8F36B] tracking-tight">
              One concept. Multiple ways to understand it.
            </p>

            <p className="text-xs text-[#8DA391] max-w-sm leading-relaxed">
              Engineered for cognitive flexibility and independent inquiry. Discover principles through structured reasoning, spatial intuition, empirical applications, and active Feynman teaching.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#19211C] border border-[#2C3B32] text-[11px] text-[#C8F36B] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8F36B]" />
                <span>Stateless Serverless Core • 8 Domains Active</span>
              </div>
            </div>
          </div>

          {/* Subjects Directory */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
              Knowledge Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {SUBJECTS.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      setSelectedSubjectId(s.id);
                      navigateTo('library');
                    }}
                    className="text-[#D0D4C7] hover:text-[#C8F36B] transition-colors text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedSubjectId('all');
                    navigateTo('library');
                  }}
                  className="text-[#C8F36B] hover:text-white font-medium inline-flex items-center gap-1 text-[11px] pt-1"
                >
                  <span>Explore all 8 disciplines</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Core Learning Engines */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
              Learning Engines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openFeatureModal('multiple-paths')}
                  className="text-[#D0D4C7] hover:text-[#C8F36B] transition-colors text-left"
                >
                  Four Convergent Paths
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('guided-discovery')}
                  className="text-[#D0D4C7] hover:text-[#C8F36B] transition-colors text-left"
                >
                  Guided Discovery (Socratic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('feynman-mode')}
                  className="text-[#D0D4C7] hover:text-[#C8F36B] transition-colors text-left"
                >
                  Feynman Mode Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => openTopic('math-linear-equations')}
                  className="text-[#D0D4C7] hover:text-[#C8F36B] transition-colors text-left"
                >
                  Adaptive Media Remediator
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Reliability */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
              System Architecture
            </h4>
            <div className="p-3.5 rounded-xl bg-[#19211C] border border-[#2C3B32] text-xs text-[#8DA391] space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 text-white font-medium">
                <Cpu className="w-3.5 h-3.5 text-[#C8F36B]" />
                <span>Reliability Hardened</span>
              </div>
              <p className="text-[11px]">
                Stateless client-owned sessions, transparent Gemini telemetry, and local-first browser persistence.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#19211C] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8DA391]">
          <p>© 2026 MULTIPATH. One concept. Multiple ways to understand it.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              Overview
            </button>
            <button onClick={() => navigateTo('library')} className="hover:text-white transition-colors">
              Explore
            </button>
            <button onClick={() => navigateTo('mylearning')} className="hover:text-white transition-colors">
              My Trajectory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
