import { getCustomRepository } from 'typeorm';
import { asyncForEach } from '~/common/helpers/array.helper';
import { SkillCategory } from '~/data/entities/skill-category';
import { User } from '~/data/entities/user';
import { UserSkillCategory } from '~/data/entities/user-skill-category';
import UserSkillCategoryRepository from '~/data/repositories/user-skill-category.repository';

export const createUserSkillCategories = async (
  user: User,
  skillCategories: SkillCategory[],
): Promise<UserSkillCategory[]> => {
  const userSkillCategoryRepository = getCustomRepository(
    UserSkillCategoryRepository,
  );
  const userSkillCategories: UserSkillCategory[] = [];

  await asyncForEach(async (category) => {
    const userSkillCategory = await userSkillCategoryRepository.create({
      user,
      skillCategory: category,
    });
    userSkillCategory.save();
    userSkillCategories.push(userSkillCategory);
  }, skillCategories);

  return userSkillCategories;
};

export const deleteUserSkillCategories = async (
  user: User,
): Promise<UserSkillCategory[]> => {
  const userSkillCategoryRepository = getCustomRepository(
    UserSkillCategoryRepository,
  );

  const userSkillCategories = await userSkillCategoryRepository.find({ user });
  await userSkillCategoryRepository.remove(userSkillCategories);

  return userSkillCategories;
};
