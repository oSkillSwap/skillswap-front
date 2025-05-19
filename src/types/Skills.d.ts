export interface ISkills {
  id: number;
  name: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  Category: {
    id: number;
    name: string;
  };
}
