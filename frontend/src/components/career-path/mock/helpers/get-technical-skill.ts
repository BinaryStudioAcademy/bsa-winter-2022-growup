import { ILevelSkill } from '../common/interfaces';
import { ITechnicalSkill } from '../../common/interfaces';

export const getTechnicalSkill = (skill: ILevelSkill): ITechnicalSkill => {
  return {
    skill: skill.name,
    topics: skill.objectives.map(({ name }) => name),
  };
};
