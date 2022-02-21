import { SkillType } from '~/common/enums/skill-type';

// export type Skill = {
//   name: string;
//   type: SkillType;
// };

// export type CareerPath = {
//   domain: string;
//   level: {
//     [k: string]: {
//       [n: string]: Skill[];
//     };
//   };
// };

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

export type CareerPath = {
  domain: string;
  levels: Level[];
};

