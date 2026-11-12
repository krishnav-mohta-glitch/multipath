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
    <section className="py-20 lg:py-32 bg-[#F1F1E9] border-b border-[#19211C]/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19211C]/05 border border-[#19211C]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8F36B]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#19211C] font-semibold">
                CURRICULUM ARCHITECTURE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111714] tracking-tight">
              Eight Verified Disciplines
            </h2>

            <p className="text-base text-[#171C18]/80 leading-relaxed">
              Every subject features curated exemplar topics with domain-aware pedagogical evaluation, first principles derivations, and interactive sandboxes.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedSubjectId('all');
              navigateTo('library');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#111714] bg-[#E8EAE1] hover:bg-[#DFE2D7] border border-[#19211C]/10 rounded-full transition-all self-start md:self-auto shadow-xs"
          >
            <span>View Complete Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 8 Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SUBJECTS.map((subject) => {
            const Icon = iconMap[subject.iconName] || BookOpen;
            return (
              <div
                key={subject.id}
                onClick={() => handleSelectSubject(subject.id)}
                className="group relative p-6 rounded-3xl bg-[#E8EAE1]/70 hover:bg-[#E8EAE1] border border-[#19211C]/12 hover:border-[#111714] transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#111714] text-[#C8F36B] border border-[#19211C] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/80 text-[#19211C] border border-[#19211C]/10">
                      {subject.featuredTopicCount} {subject.featuredTopicCount === 1 ? 'Topic' : 'Topics'}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-[#111714] group-hover:text-black transition-colors">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-[#5F6B62] leading-relaxed line-clamp-3">
                      {subject.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#19211C]/10 flex items-center justify-between text-xs font-bold text-[#111714]">
                  <span>Browse Topics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#19211C]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
