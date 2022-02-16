import { getCustomRepository } from 'typeorm';

import SkillRepository from '~/data/repositories/skill.repository';

import { Skill } from '~/data/entities/skill';

type SkillProps = Pick<Skill, 'company' | 'name' | 'type'>;

export const createSkill = async ({
  company,
  name,
  type,
}: SkillProps): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skill = await skillRepository
    .create({
      company,
      name,
      type,
    })
    .save();

  return skill;
};
