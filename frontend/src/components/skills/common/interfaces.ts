export interface ISkill {
  id: string;
  name: string;
  userId: string;
  rating: Array<string>;
  isFromCareerPath?: boolean;
}
