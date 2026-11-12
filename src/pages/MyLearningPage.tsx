import React from 'react';
import { LearningDashboard } from '../components/mylearning/LearningDashboard';

export const MyLearningPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F1F1E9] text-[#171C18] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
        
        {/* Page Title & Mission */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111714]" />
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#5E7A65]">
              SOVEREIGN LEARNING TELEMETRY
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#171C18] tracking-tight">
            Personal Knowledge Observatory
          </h1>
          <p className="text-sm sm:text-base text-[#171C18]/80 max-w-3xl leading-relaxed">
            Review empirical comprehension metrics, explore your generated multi-modal media artifacts, inspect longitudinal Feynman reassessment matrices, and control your private client-side knowledge vault.
          </p>
        </div>

        {/* Main Dashboard Component with Subsections */}
        <LearningDashboard />

      </div>
    </div>
  );
};
