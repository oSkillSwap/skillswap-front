export interface IReviewsHomePage {
  id: number;
  title: string;
  grade: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  Reviewer: {
    id: number;
    username: string;
    lastName: string;
    firstName: string;
    email: string;
    role: string;
    isBanned: boolean;
    isAvailable: boolean;
    description: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
  };
}
