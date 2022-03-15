import { ISkill } from './interfaces';

export type SkillFormType = Omit<ISkill, 'id' | 'userId' | 'rating'>;
