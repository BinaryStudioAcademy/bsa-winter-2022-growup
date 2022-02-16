import { getCustomRepository } from 'typeorm';
import SkillCategoryRepository from '~/data/repositories/skill-category.repository';

import { SkillCategory } from '~/data/entities/skill-category';

type SkillCategoryProps = Pick<SkillCategory, 'level' | 'skill'>;

export const createDomainLevel = async ({
  level,
  skill,
}: SkillCategoryProps): Promise<SkillCategory> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);

  const skillCategory = await skillCategoryRepository
    .create({
      level,
      skill,
    })
    .save();

  return skillCategory;
};
