export default interface Review {
  id: number;
  title: string;
  grade: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  Reviewer: { id: number; username: string; avatar: string };
}
