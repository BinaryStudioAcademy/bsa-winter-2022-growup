import { SkillType } from '~/common/enums/skill-type';

type SkillObjective = {
  name: string;
};

type Skill = {
  name: string;
  type: SkillType;
  objectives: SkillObjective[];
};

type Level = {
  name: string;
  skills: Skill[];
};

export type CareerDomain = {
  name: string;
  levels: Level[];
};
