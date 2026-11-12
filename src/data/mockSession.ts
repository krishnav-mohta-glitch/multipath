import type { UserSessionState } from '../types/session';

export const INITIAL_SESSION_STATE: UserSessionState = {
  savedTopicIds: ['math-linear-equations', 'bio-photosynthesis', 'cs-binary-search'],
  recentVisits: [
    {
      topicId: 'math-linear-equations',
      lastVisited: '2 hours ago',
      lastPathUsed: 'explore-experiment',
    },
    {
      topicId: 'bio-photosynthesis',
      lastVisited: 'Yesterday',
      lastPathUsed: 'visual-learning',
    },
    {
      topicId: 'hist-french-revolution',
      lastVisited: '3 days ago',
      lastPathUsed: 'structured-explanation',
    },
  ],
  preferences: {
    primaryStyle: 'explore-experiment',
    exploreAffinity: 84,
    visualAffinity: 78,
    examplesAffinity: 65,
    structuredAffinity: 60,
  },
  notes: {
    'math-linear-equations': 'The interactive slope slider showed that negative slope tilts the line downward from left to right. Balancing both pans preserves truth.',
    'bio-photosynthesis': 'Green light produced 0 oxygen bubbles in the chamber because chlorophyll reflects green light. Red and blue light yielded peak photosynthesis.',
  },
};
