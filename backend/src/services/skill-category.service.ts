import { getCustomRepository, In } from 'typeorm';
import SkillCategoryRepository from '~/data/repositories/skill-category.repository';

import { SkillCategory } from '~/data/entities/skill-category';
import { Skill } from '~/data/entities/skill';

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

export const getCategoriesByLevel = async (
  level: SkillCategory['level'],
): Promise<SkillCategory[]> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  const categories = await skillCategoryRepository.find({
    where: { level },
    relations: ['skill'],
  });

  return categories;
};

export const getCategoryById = async (
  id: SkillCategory['id'],
): Promise<SkillCategory> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  const category = await skillCategoryRepository.findOne({
    where: { id },
    relations: ['skill', 'level'],
  });

  return category;
};

export const getUserCategoriesByLevel = async (
  userId: string,
  level: SkillCategory['level'],
): Promise<SkillCategory[]> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);

  const categories = await skillCategoryRepository
    .createQueryBuilder('skillCategory')
    .innerJoinAndSelect('skillCategory.skill', 'skill')
    .innerJoinAndSelect(
      'skillCategory.userSkillCategories',
      'userSkillCategories',
    )
    .where('skillCategory.levelId = :levelId', { levelId: level.id })
    .andWhere('userSkillCategories.userId = :userId', { userId })
    .getMany();

  categories.forEach((category) => {
    category.skill = {
      ...category.skill,
      isStarred: category?.userSkillCategories[0]?.isStarred || false,
      selfRating: category?.userSkillCategories[0]?.selfRating || null,
      mentorRating: category?.userSkillCategories[0]?.mentorRating || null,
      reviewRating: category?.userSkillCategories[0]?.reviewRating || null,
    } as unknown as Skill;
  });

  return categories;
};

export const getCategoriesBySkill = async (
  skill: SkillCategory['skill'],
): Promise<SkillCategory[]> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  const categories = await skillCategoryRepository.find({
    where: { skill },
    relations: ['skill'],
  });
  return categories;
};

export const getCategory = async (
  level: SkillCategory['level'],
  skill: SkillCategory['skill'],
): Promise<SkillCategory> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);
  const categories = await skillCategoryRepository.findOne({
    where: { level, skill },
    relations: ['skill'],
  });
  return categories;
};

export const deleteSkillCategoryById = async (
  id: SkillCategory['id'],
): Promise<SkillCategory> => {
  const skillCategoryRepository = getCustomRepository(SkillCategoryRepository);

  const skillCategory = await skillCategoryRepository.findOne({ id });
  await skillCategoryRepository.delete({ id });

  return skillCategory;
};
