import { getCustomRepository, In } from 'typeorm';

import SkillRepository from '~/data/repositories/skill.repository';

import { Skill } from '~/data/entities/skill';
import { Company } from '~/data/entities/company';

type SkillProps = Pick<Skill, 'company' | 'name' | 'type'>;

export const upsertSkills = async (
  company: Company,
  data: SkillProps[],
): Promise<Skill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  await skillRepository.bulkCreate(data);

  const names = data.map((s) => s.name);
  const skills = await skillRepository.find({ company, name: In(names) });
  return skills.filter((s) =>
    data.find((d) => d.name === s.name && d.type === s.type),
  );
};

export const createSkill = async (
  company: Company,
  data: SkillProps,
): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skillInstance = await skillRepository
    .create({ name: data.name, type: data.type, company })
    .save();

  return skillInstance;
};

export const getSkillById = async (id: string): Promise<Skill> => {
  const skillRepository = await getCustomRepository(SkillRepository);
  const skill = await skillRepository.findOne({ id });

  return skill;
};
export const updateSkillById = async (
  id: string,
  skill: Skill,
): Promise<Skill> => {
  const skillRepository = await getCustomRepository(SkillRepository);

  await skillRepository.update({ id }, skill);
  const updatedSkill = skillRepository.findOne({ id });

  return updatedSkill;
};

export const deleteSkillById = async (id: Skill['id']): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skill = await skillRepository.findOne({ id });

  await skillRepository.delete({ id });

  return skill;
};
