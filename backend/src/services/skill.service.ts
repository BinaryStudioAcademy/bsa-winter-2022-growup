import { getCustomRepository, In } from 'typeorm';

import SkillRepository from '~/data/repositories/skill.repository';

import { Skill } from '~/data/entities/skill';
import { Company } from '~/data/entities/company';

type SkillProps = Pick<Skill, 'company' | 'name' | 'type'>;

export const createSkill = async ({
  company,
  name,
  type,
}: SkillProps): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);

  const target = await skillRepository.findOne({ company, name, type });
  if (target) return target;

  const skill = await skillRepository
    .create({
      company,
      name,
      type,
    })
    .save();

  return skill;
};

export const upsertSkills = async (company: Company, data: SkillProps[]): Promise<Skill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  await skillRepository.bulkCreate(data);

  const names = data.map(s => s.name);
  const skills = await skillRepository.find({ company, name: In(names) });
  return skills.filter(s => data.find(d => d.name === s.name && d.type === s.type));
};

