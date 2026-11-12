export type SubjectId =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'geography'
  | 'english'
  | 'computer-science';

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  iconName: string;
  color: {
    bg: string;
    text: string;
    border: string;
    badgeBg: string;
    accent: string;
  };
  featuredTopicCount: number;
}
