import type { ISkills } from "./Skills";

export interface IUsersHomePage {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  role: string;
  isBanned: boolean;
  isAvailable: boolean;
  description: string;
  avatar: string;
  averageGrade: number;
  nbOfReviews: number;
  createdAt: string;
  updatedAt: string;
  Skills: ISkills[];
  WantedSkills: ISkills[];
}
