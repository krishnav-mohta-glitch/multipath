import React from 'react';
import { Sparkles } from 'lucide-react';
import { LearningDashboard } from '../components/mylearning/LearningDashboard';

export const MyLearningPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0E] text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
        {/* Page Title, Protocol Badge & Mission */}
        <div className="space-y-3 text-left border-b border-slate-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#B8FF00]" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-300">
              SOVEREIGN KNOWLEDGE OBSERVATORY // TRAJECTORY PROTOCOL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF9F5] tracking-tight">
            Personal Knowledge Observatory
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Review empirical comprehension metrics, explore your generated multi-modal media artifacts, inspect longitudinal Feynman reassessment matrices, and control your private sovereign knowledge vault.
          </p>
        </div>

        {/* Main Dashboard Component with Subsections */}
        <LearningDashboard />
      </div>
    </div>
  );
};
