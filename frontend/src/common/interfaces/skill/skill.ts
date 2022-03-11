export interface ISkill {
  id: string;
  name: string;
  type?: string;
  company?: string;
  rating?: any;
  isStarred?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
