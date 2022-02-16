import { getCustomRepository } from 'typeorm';
import SkillCategoryRepository from '~/data/repositories/skill-category.repository';

import { DomainLevel } from '~/data/entities/domain-level';
import { SkillCategory } from '~/data/entities/skill-category';

type SkillCategoryCreation = {
  // name: string;
  level: DomainLevel;
};

export const createDomainLevel = async ({
  // name,
  level,
}: SkillCategoryCreation): Promise<SkillCategory> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);

  const skillCategoryInstance = skillCategoryRepository.create({
    level,
  });

  const skillCategory = await skillCategoryInstance.save();
  return skillCategory;
};
