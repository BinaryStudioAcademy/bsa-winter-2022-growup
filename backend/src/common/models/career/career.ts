import { SkillType } from '~/common/enums/skill-type';

export type Skill = {
  name: string;
  type: SkillType;
};

export type CareerPath = {
  domain: string;
  level: {
    [k: string]: {
      [n: string]: Skill[];
    };
  };
};
