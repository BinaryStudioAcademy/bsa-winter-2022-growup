import { getCustomRepository, In } from 'typeorm';
import SkillCategoryRepository from '~/data/repositories/skill-category.repository';

import { SkillCategory } from '~/data/entities/skill-category';

type SkillCategoryProps = Pick<SkillCategory, 'level' | 'skill'>;

export const createSkillCategories = async (
  data: SkillCategoryProps[],
): Promise<SkillCategory[]> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  await skillCategoryRepository.bulkCreate(data);

  const levels = data.map((s) => s.level.id);
  const skills = data.map((s) => s.skill.id);
  const result = await skillCategoryRepository.find({
    where: { level: In(levels), skill: In(skills) },
    relations: ['level', 'skill'],
  });
  return result.filter((r) =>
    data.find((d) => d.skill.id === r.skill.id && d.level.id === r.level.id),
  );
};

export const getCategories = async (
  level: SkillCategory['level'],
): Promise<SkillCategory[]> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  const categories = await skillCategoryRepository.find({
    where: { level },
    relations: ['skill'],
  });
  return categories;
};
