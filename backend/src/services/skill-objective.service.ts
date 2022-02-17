import { getCustomRepository } from 'typeorm';
import SkillObjectiveRepository from '~/data/repositories/skill-objective.repository';

import { SkillObjective } from '~/data/entities/skill-objective';

type SkillObjectiveProps = Pick<SkillObjective, 'category' | 'name'>;

export const createSkillObjective = async ({
  name,
  category,
}: SkillObjectiveProps): Promise<SkillObjective> => {
  const skillObjectiveRepository = getCustomRepository(
    SkillObjectiveRepository,
  );
  const target = await skillObjectiveRepository.findOne({ category, name });
  if (target) return target;

  const skillObjective = await skillObjectiveRepository
    .create({
      name,
      category,
    })
    .save();

  return skillObjective;
};
