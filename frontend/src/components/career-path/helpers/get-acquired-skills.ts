import { ILevelSkill } from '../common/interfaces';

export const getAcquiredSkills = (skills: ILevelSkill[]): number => {
  let acquiredSkills = 0;
  skills.forEach((skill) => {
    if (skill.reviewRating > 0) {
      acquiredSkills++;
    }
  });

  return acquiredSkills;
};
