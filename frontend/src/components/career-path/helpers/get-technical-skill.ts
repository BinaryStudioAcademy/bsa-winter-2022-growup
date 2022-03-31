import { ILevelSkill, ITechnicalSkill } from '../common/interfaces';

export const getTechnicalSkill = (skill: ILevelSkill): ITechnicalSkill => {
  return {
    skill: skill.name,
    topics: skill.objectives.map(({ name }) => name),
  };
};
