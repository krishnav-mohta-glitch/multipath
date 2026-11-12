import React from 'react';
import { Bookmark } from 'lucide-react';
import { LearningDashboard } from '../components/mylearning/LearningDashboard';

export const MyLearningPage: React.FC = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Page Title */}
      <div>
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-brand-600" />
          <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
            Personal Learning Hub
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          My Learning & Resource Library
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Review evidence-based progress, browse and launch generated multimedia resources, inspect reassessment comparisons across teaching sessions, and manage your private local history.
        </p>
      </div>

      {/* Main Dashboard Component with Subsections */}
      <LearningDashboard />

    </div>
  );
};
