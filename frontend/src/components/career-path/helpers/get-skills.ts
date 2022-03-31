import { IAllTechnicalSkills, ICareerPathLevel } from '../common/interfaces';
import { getTechnicalSkill } from './get-technical-skill';

export const getSkills = (level: ICareerPathLevel): IAllTechnicalSkills[] => {
  const technicalSkillItem: IAllTechnicalSkills = {
    name: level.domainName,
    skills: [],
  };

  for (const skillItem of level.skills) {
    technicalSkillItem.skills.push(getTechnicalSkill(skillItem));
  }

  return [technicalSkillItem];
};
