import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TOPICS } from '../data/topics';
import type { DifficultyLevel } from '../types/topic';
import { LibraryHeader } from '../components/library/LibraryHeader';
import { SubjectFilterPills } from '../components/library/SubjectFilterPills';
import { TopicGrid } from '../components/library/TopicGrid';

export const LibraryPage: React.FC = () => {
  const { selectedSubjectId, setSelectedSubjectId, searchQuery, setSearchQuery } = useApp();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  // Compute subject topic counts
  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const topic of TOPICS) {
      counts[topic.subjectId] = (counts[topic.subjectId] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((topic) => {
      // Subject filter
      if (selectedSubjectId !== 'all' && topic.subjectId !== selectedSubjectId) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && topic.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = topic.title.toLowerCase().includes(q);
        const subMatch = topic.subtitle.toLowerCase().includes(q);
        const overviewMatch = topic.overview.toLowerCase().includes(q);
        const termMatch = topic.keyTerms.some((t) => t.term.toLowerCase().includes(q));
        const questionMatch = topic.coreQuestions.some((qu) => qu.toLowerCase().includes(q));

        if (!titleMatch && !subMatch && !overviewMatch && !termMatch && !questionMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSubjectId, selectedDifficulty, searchQuery]);

  const handleResetFilters = () => {
    setSelectedSubjectId('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header with Title and Search/Difficulty */}
      <LibraryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        totalFilteredCount={filteredTopics.length}
      />

      {/* Subject Filter Pills */}
      <div className="pt-2">
        <SubjectFilterPills
          selectedSubjectId={selectedSubjectId}
          onSelectSubject={setSelectedSubjectId}
          totalTopicCount={TOPICS.length}
          subjectCounts={subjectCounts}
        />
      </div>

      {/* Results Grid */}
      <TopicGrid topics={filteredTopics} onResetFilters={handleResetFilters} />

    </div>
  );
};
