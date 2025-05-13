import type { ICategories } from './Categories';

export interface IPosts {
  id?: number;
  isClosed?: boolean;
  title: string;
  content: string;
  skill_id: number;
  user_id?: number;
  createdAt?: string;
  updatedAt?: string;

  SkillWanted?: {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    category_id?: number;
    Category?: ICategories;
  };
  Author?: {
    id: number;
    username: string;
    avatar?: string;
    averageGrade?: number;
    nbOfReviews?: number;
  };
}
