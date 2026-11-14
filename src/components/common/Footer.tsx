import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/subjects';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedSubjectId, openFeatureModal, openTopic } = useApp();

  return (
    <footer className="bg-[#080A0E] text-[#F3F4EC] border-t border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 text-left">
          
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141A22] border border-white/15 flex items-center justify-center text-[#B8FF00]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 12h6m6 0h6" />
                  <path d="M12 3v6m0 6v6" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">MULTIPATH</span>
            </div>
            
            <p className="text-sm font-medium text-[#B8FF00] tracking-tight">
              One concept. Multiple ways to understand it.
            </p>

            <p className="text-xs text-[#8B9DAE] max-w-sm leading-relaxed">
              An interactive scientific observatory engineered for cognitive flexibility and sovereign inquiry. Discover principles through structured derivations, spatial intuition, empirical engineering, and active Feynman teaching.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141A22] border border-white/10 text-[11px] text-[#B8FF00] font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8FF00]" />
                <span>Observatory V3 • 64 Verified Topics • 8 Domains</span>
              </div>
            </div>
          </div>

          {/* Subjects Directory */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8B9DAE]">
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
                    className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors text-left cursor-pointer"
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
                  className="text-[#B8FF00] hover:text-white font-medium inline-flex items-center gap-1 text-[11px] pt-1 cursor-pointer"
                >
                  <span>Explore all 8 disciplines</span>
                  <ArrowUpRight className="w-3 h-3 stroke-[2.4]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Core Learning Engines */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8B9DAE]">
              Learning Engines
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openFeatureModal('multiple-paths')}
                  className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors text-left cursor-pointer"
                >
                  Four Convergent Paths
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('guided-discovery')}
                  className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors text-left cursor-pointer"
                >
                  Guided Discovery (Socratic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('feynman-mode')}
                  className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors text-left cursor-pointer"
                >
                  Feynman Mode Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => openTopic('math-linear-equations')}
                  className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors text-left cursor-pointer"
                >
                  Adaptive Media Remediator
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation & Telemetry */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#8B9DAE]">
              System Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors cursor-pointer">
                  Home (Observatory)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('library')} className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors cursor-pointer">
                  Explore / Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('workspace')} className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors cursor-pointer">
                  Learning Workspace
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mylearning', undefined, undefined, 'progress')} className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors cursor-pointer">
                  My Trajectory
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mylearning', undefined, undefined, 'resources')} className="text-[#D0D4C7] hover:text-[#B8FF00] transition-colors cursor-pointer">
                  Saved Resources
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8B9DAE] font-mono">
          <p>© 2026 MULTIPATH. One concept. Multiple ways to understand it.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => navigateTo('library')} className="hover:text-white transition-colors cursor-pointer">
              Curriculum
            </button>
            <button onClick={() => navigateTo('mylearning')} className="hover:text-white transition-colors cursor-pointer">
              Trajectory
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
