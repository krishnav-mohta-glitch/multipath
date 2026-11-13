import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/useAuth';
import { TOPICS } from '../data/topics';
import { isTopicInCurriculum, getMappingsForTopic } from '../data/curriculumMappings';
import type { DifficultyLevel } from '../types/topic';
import type { CurriculumBoardCode, ClassLevel } from '../types/curriculum';
import { LibraryHeader } from '../components/library/LibraryHeader';
import { CurriculumFilterBar } from '../components/library/CurriculumFilterBar';
import { SubjectFilterPills } from '../components/library/SubjectFilterPills';
import { TopicGrid } from '../components/library/TopicGrid';

export const LibraryPage: React.FC = () => {
  const { selectedSubjectId, setSelectedSubjectId, searchQuery, setSearchQuery } = useApp();
  const { profile } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  // Curriculum board and class filters
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
      // Curriculum filter (Board and Class Level)
      if (!isTopicInCurriculum(topic.id, selectedBoard, selectedClass)) {
        return false;
      }

      // Subject filter
      if (selectedSubjectId !== 'all' && topic.subjectId !== selectedSubjectId) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && topic.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query (matches topic metadata + curriculum mapping citations)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = topic.title.toLowerCase().includes(q);
        const subMatch = topic.subtitle.toLowerCase().includes(q);
        const overviewMatch = topic.overview.toLowerCase().includes(q);
        const termMatch = topic.keyTerms.some((t) => t.term.toLowerCase().includes(q));
        const questionMatch = topic.coreQuestions.some((qu) => qu.toLowerCase().includes(q));

        // Also match against official syllabus units or chapters
        const mappings = getMappingsForTopic(topic.id);
        const mappingMatch = mappings.some(
          (m) =>
            m.unitName.toLowerCase().includes(q) ||
            m.chapterOrTopic.toLowerCase().includes(q) ||
            m.subjectName.toLowerCase().includes(q) ||
            (m.pageOrSection && m.pageOrSection.toLowerCase().includes(q))
        );

        if (!titleMatch && !subMatch && !overviewMatch && !termMatch && !questionMatch && !mappingMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedBoard, selectedClass, selectedSubjectId, selectedDifficulty, searchQuery]);

  const handleResetFilters = () => {
    setSelectedBoard('all');
    setSelectedClass('all');
    setSelectedSubjectId('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const handleResetCurriculum = () => {
    setSelectedBoard('all');
    setSelectedClass('all');
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

      {/* Curriculum Filter Bar (ICSE/CISCE & CBSE for Classes 6-10) */}
      <CurriculumFilterBar
        selectedBoard={selectedBoard}
        onSelectBoard={setSelectedBoard}
        selectedClass={selectedClass}
        onSelectClass={setSelectedClass}
        filteredCount={filteredTopics.length}
        totalCount={TOPICS.length}
        onReset={handleResetCurriculum}
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
      <TopicGrid
        topics={filteredTopics}
        selectedBoard={selectedBoard}
        selectedClass={selectedClass}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};
