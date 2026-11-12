import React from 'react';
import {
  Binary,
  Atom,
  FlaskConical,
  Dna,
  Hourglass,
  Globe2,
  BookOpen,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUBJECTS } from '../../data/subjects';
import type { SubjectId } from '../../types/subject';

export const SubjectGridPreview: React.FC = () => {
  const { navigateTo, setSelectedSubjectId } = useApp();

  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Binary,
    Atom,
    FlaskConical,
    Dna,
    Hourglass,
    Globe2,
    BookOpen,
    Terminal,
  };

  const handleSelectSubject = (subjectId: SubjectId) => {
    setSelectedSubjectId(subjectId);
    navigateTo('library');
  };

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-600">
              Curriculum Foundation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore 8 Core Disciplines
            </h2>
            <p className="text-base text-slate-600">
              Every subject is structured with demonstration topics built to expose principles through our multi-path learning model.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedSubjectId('all');
              navigateTo('library');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors self-start md:self-auto"
          >
            <span>View Complete Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBJECTS.map((subject) => {
            const Icon = iconMap[subject.iconName] || BookOpen;
            return (
              <div
                key={subject.id}
                onClick={() => handleSelectSubject(subject.id)}
                className="group relative p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${subject.color.bg} ${subject.color.text} border ${subject.color.border} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {subject.featuredTopicCount} {subject.featuredTopicCount === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {subject.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span>Browse Topics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
