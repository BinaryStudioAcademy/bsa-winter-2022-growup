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

export const updateObjectiveById = async (
  id: SkillObjective['id'],
  name: SkillObjective['name'],
): Promise<SkillObjective> => {
  const skillObjectiveRepository = getCustomRepository(
    SkillObjectiveRepository,
  );

  await skillObjectiveRepository.update({ id }, { name });

  const objective = skillObjectiveRepository.findOne({ id });
  return objective;
};

export const deleteObjectiveById = async (
  id: SkillObjective['id'],
): Promise<SkillObjective> => {
  const skillObjectiveRepository = getCustomRepository(
    SkillObjectiveRepository,
  );
  const objective = await skillObjectiveRepository.findOne({ id });

  await skillObjectiveRepository.delete({ id });

  return objective;
};
