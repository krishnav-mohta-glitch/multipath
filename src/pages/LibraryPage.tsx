import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/useAuth';
import { TOPICS } from '../data/topics';
import type { DifficultyLevel } from '../types/topic';
import type { CurriculumBoardCode, ClassLevel } from '../types/curriculum';
import {
  filterCurriculumTopics,
  calculateDynamicSubjectCounts,
  getCurriculumStats,
  type CuratedCollectionId,
  type TopicSortOption,
} from '../utils/curriculumDiscovery';
import { LibraryHeader } from '../components/library/LibraryHeader';
import { CurriculumFilterBar } from '../components/library/CurriculumFilterBar';
import { SubjectFilterPills } from '../components/library/SubjectFilterPills';
import { TopicGrid } from '../components/library/TopicGrid';

export const LibraryPage: React.FC = () => {
  const { selectedSubjectId, setSelectedSubjectId, searchQuery, setSearchQuery } = useApp();
  const { profile } = useAuth();

  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<CuratedCollectionId>('all');
  const [selectedSort, setSelectedSort] = useState<TopicSortOption>('default');

  // Curriculum board and class filters initialized from student profile if set
  const [selectedBoard, setSelectedBoard] = useState<CurriculumBoardCode | 'all'>(() => {
    if (profile?.preferred_board === 'CBSE') return 'CBSE';
    if (profile?.preferred_board === 'ICSE/CISCE') return 'CISCE';
    return 'all';
  });

  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>(() => {
    if (profile?.grade_level) {
      const match = profile.grade_level.match(/Class\s*(\d+)/i);
      if (match) {
        const val = parseInt(match[1], 10);
        if (val >= 6 && val <= 10) return val as ClassLevel;
      }
    }
    return 'all';
  });

  // Dynamic subject topic counts based on active board & class
  const dynamicSubjectCounts = useMemo(() => {
    return calculateDynamicSubjectCounts(selectedBoard, selectedClass, TOPICS);
  }, [selectedBoard, selectedClass]);

  // Multi-dimensional filtered & sorted topic set
  const filteredTopics = useMemo(() => {
    return filterCurriculumTopics(TOPICS, {
      board: selectedBoard,
      classLevel: selectedClass,
      subjectId: selectedSubjectId,
      difficulty: selectedDifficulty,
      searchQuery,
      collectionId: selectedCollection,
      sortBy: selectedSort,
    });
  }, [
    selectedBoard,
    selectedClass,
    selectedSubjectId,
    selectedDifficulty,
    searchQuery,
    selectedCollection,
    selectedSort,
  ]);

  // Telemetry metrics
  const stats = useMemo(() => {
    return getCurriculumStats(filteredTopics, selectedBoard, selectedClass);
  }, [filteredTopics, selectedBoard, selectedClass]);

  const handleResetFilters = () => {
    setSelectedBoard('all');
    setSelectedClass('all');
    setSelectedSubjectId('all');
    setSelectedDifficulty('all');
    setSelectedCollection('all');
    setSelectedSort('default');
    setSearchQuery('');
  };

  const handleResetCurriculum = () => {
    setSelectedBoard('all');
    setSelectedClass('all');
  };

  return (
    <div className="min-h-screen bg-[#080A0E] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
        {/* Header with Title, Telemetry HUD, Search, Difficulty, Collection & Sort */}
        <LibraryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedCollection={selectedCollection}
          onCollectionChange={setSelectedCollection}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          totalFilteredCount={filteredTopics.length}
          totalTopicsCount={TOPICS.length}
          interactiveCount={stats.interactiveCount}
          verifiedCount={stats.officialVerifiedCount}
        />

        {/* Curriculum Filter Bar (CBSE & CISCE for Classes 6–10) */}
        <CurriculumFilterBar
          selectedBoard={selectedBoard}
          onSelectBoard={setSelectedBoard}
          selectedClass={selectedClass}
          onSelectClass={setSelectedClass}
          filteredCount={filteredTopics.length}
          totalCount={TOPICS.length}
          onReset={handleResetCurriculum}
        />

        {/* Subject Filter Pills (Dynamic Counts matching Board/Class) */}
        <div className="pt-1">
          <SubjectFilterPills
            selectedSubjectId={selectedSubjectId}
            onSelectSubject={setSelectedSubjectId}
            totalTopicCount={filteredTopics.length}
            subjectCounts={dynamicSubjectCounts}
          />
        </div>

        {/* Results Grid */}
        <TopicGrid
          topics={filteredTopics}
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          onResetFilters={handleResetFilters}
        />
      </div>
    </div>
  );
};
