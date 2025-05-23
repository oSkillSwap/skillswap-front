import type { ISkills } from './Skills';
import type Review from './Review';

export interface IUsers {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  role: string;
  isBanned: boolean;
  isAvailable: boolean;
  description: string;
  avatar: string;
  averageGrade?: number;
  nbOfReviews?: number;
  createdAt: string;
  updatedAt: string;
  Skills: ISkills[];
  WantedSkills: ISkills[];
  ReviewsReceived?: Review[];
}
