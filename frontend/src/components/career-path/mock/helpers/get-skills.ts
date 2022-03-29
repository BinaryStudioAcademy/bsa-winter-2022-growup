import { IAllTechnicalSkills } from '../../common/interfaces';
import { getTechnicalSkill } from './get-technical-skill';
import { ILevel } from '../common/interfaces';

export const getSkills = (level: ILevel): IAllTechnicalSkills[] => {
  const technicalSkillItem: IAllTechnicalSkills = {
    name: level.domainName,
    skills: [],
  };

  for (const skillItem of level.skills) {
    technicalSkillItem.skills.push(getTechnicalSkill(skillItem));
  }

  return [technicalSkillItem];
};
