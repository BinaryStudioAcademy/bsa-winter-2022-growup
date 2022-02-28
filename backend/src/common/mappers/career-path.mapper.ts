import { SkillCategory } from '~/data/entities/skill-category';
import { SkillObjective } from '~/data/entities/skill-objective';

export const convertToSkillCategory = (
  categories: SkillCategory[],
  objectives: SkillObjective[],
): SkillCategory[] => {
  const skillCategories: SkillCategory[] = categories.map((category) => ({
    ...category,
    skill: {
      ...category.skill,
      objectives: objectives.filter(
        (objective) => objective.category.id === category.id,
      ),
    },
  })) as unknown as SkillCategory[];

  return skillCategories;
};
