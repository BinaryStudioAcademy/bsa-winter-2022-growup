import { ILevelSkill } from '../common/interfaces';

export const getAcquiredSkills = (skills: ILevelSkill[]): number => {
  let acquiredSkills = 0;
  skills.forEach((skill) =>
    skill.reviewRating > 0 ? acquiredSkills++ : acquiredSkills,
  );

  return acquiredSkills;
};
