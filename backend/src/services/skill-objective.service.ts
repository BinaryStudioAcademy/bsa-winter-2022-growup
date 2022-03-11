import { getCustomRepository, In } from 'typeorm';
import SkillObjectiveRepository from '~/data/repositories/skill-objective.repository';

import { SkillObjective } from '~/data/entities/skill-objective';

type SkillObjectiveProps = Pick<SkillObjective, 'category' | 'name'>;

export const upsertObjectives = async (
  category: SkillObjective['category'],
  data: SkillObjectiveProps[],
): Promise<SkillObjective[]> => {
  const skillObjectiveRepository = getCustomRepository(
    SkillObjectiveRepository,
  );
  await skillObjectiveRepository.bulkCreate(data);

  const objectives = await skillObjectiveRepository.find({
    category,
    name: In(data.map((objective) => objective.name)),
  });
  return objectives;
};

export const getObjectives = async (
  category: SkillObjective['category'],
): Promise<SkillObjective[]> => {
  const skillObjectiveRepository = getCustomRepository(
    SkillObjectiveRepository,
  );
  const objectives = await skillObjectiveRepository.find({
    relations: ['category'],
    where: { category },
  });
  return objectives;
};
