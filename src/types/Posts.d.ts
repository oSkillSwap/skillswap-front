export interface IPosts {
  id: number;
  content: string;
  title: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
  user_id: number;
  skill_id: number;
  SkillWanted: {
    id: number;
    name: string;
    category_id: number;
    Category: {
      id: number;
      name: string;
    };
  };
  Author: {
    id: number;
    username: string;
    avatar: string;
    averageGrade: number;
    nbOfReviews: number;
  };
}
