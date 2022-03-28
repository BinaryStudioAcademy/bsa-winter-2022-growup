import { IAllTechnicalSkills, ITechnicalSkill } from '../../common/interfaces';
import { getTechnicalSkill } from './get-technical-skill';
import { ILevel } from '../common/interfaces';

export const getTechnicalSkills = (level: ILevel): IAllTechnicalSkills[] => {
  const technicalSkills: IAllTechnicalSkills[] = [];

  for (const skillItem of level.skills) {
    const technicalSkillItem: ITechnicalSkill = getTechnicalSkill(skillItem);
    const skill: IAllTechnicalSkills = {
      name: level.domainName,
      skills: [technicalSkillItem],
    };
    technicalSkills.push(skill);
  }

  return technicalSkills;
};
