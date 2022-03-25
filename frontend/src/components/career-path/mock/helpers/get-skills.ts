import { ISkills, ITechnicalSkill } from '../../common/interfaces';
import { getTechnicalSkill } from './get-technical-skill';
import { ILevelSkill } from '../common/interfaces';

export const getSkill = (index: number, data: any): ISkills[] => {
  const technicalSkills: ISkills[] = [];
  const activeLevelSkills = data[0].levels[index].skills;

  if (activeLevelSkills.length) {
    const technicalSkillItem: ITechnicalSkill[] = activeLevelSkills.map(
      (skill: ILevelSkill) => getTechnicalSkill(skill),
    );
    const skill: ISkills = {
      name: data[0].domain.name,
      skills: technicalSkillItem,
    };
    technicalSkills.push(skill);
  }

  return technicalSkills;
};
