export interface ISkill {
  id: string;
  name: string;
  type?: string;
  company?: string | undefined;
  rating?: (string | number)[];
  isStarred?: boolean;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IResult {
  skills: ISkill[];
}
