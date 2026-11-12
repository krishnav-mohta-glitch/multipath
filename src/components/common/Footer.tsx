import React from 'react';
import { Layers, ShieldCheck, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/subjects';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedSubjectId, openFeatureModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">MULTIPATH</span>
            </div>
            
            <p className="text-sm font-medium text-brand-300">
              “Learn differently. Think independently.”
            </p>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An educational platform built on cognitive flexibility. By breaking down concepts across First Principles, Visual intuition, Real-World applications, and Historical breakthroughs, we help students master ideas and expose hidden gaps in their knowledge.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Phase 1 Verified: Structural UI & Multi-Path Engine</span>
              </div>
            </div>
          </div>

          {/* Subjects Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Subjects
            </h4>
            <ul className="space-y-2 text-sm">
              {SUBJECTS.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      setSelectedSubjectId(s.id);
                      navigateTo('library');
                    }}
                    className="text-slate-400 hover:text-white transition-colors text-left"
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
                  className="text-brand-400 hover:text-brand-300 font-medium inline-flex items-center gap-1 text-xs"
                >
                  <span>View all 8 subjects</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Core Feature Modals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => openFeatureModal('multiple-paths')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Multiple Learning Paths
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('guided-discovery')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Guided Discovery (Socratic)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openFeatureModal('feynman-mode')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Feynman Mode
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mylearning')}
                  className="text-slate-400 hover:text-white transition-colors text-left"
                >
                  Personalized Style Affinity
                </button>
              </li>
            </ul>
          </div>

          {/* Phase Notice & Principles */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Architecture Scope
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-400 space-y-2 leading-relaxed">
              <p className="font-semibold text-slate-200">
                Phase 1 Product Foundation
              </p>
              <p>
                Strictly UI and architectural scaffolding. No synthetic chatbots or premature AI mockups. Ready for Phase 2 API integrations.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 MULTIPATH. All rights reserved. Designed for cognitive depth.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('home')} className="hover:text-slate-300">
              Home
            </button>
            <button onClick={() => navigateTo('library')} className="hover:text-slate-300">
              Explore Library
            </button>
            <button onClick={() => navigateTo('mylearning')} className="hover:text-slate-300">
              My Learning
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
