import { FindManyOptions, getCustomRepository } from 'typeorm';

import SkillRepository from '~/data/repositories/skill.repository';

import { Skill } from '~/data/entities/skill';
import CompanyRepository from '~/data/repositories/company.repository';
import { Company } from '~/data/entities/company';

import { skillsMapper } from '~/common/mappers/skills.mapper';
import { SkillsCreationResponse } from '~/common/models/skills/skills';
import { asyncForEach } from '~/common/helpers/array.helper';

import { companies } from '~/data/seed-data/company.data';

export const getSkills = async (id: string): Promise<Skill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    id: id,
  });
  console.log(companyInstance);
  const skills: Skill[] = await skillRepository.find({
    company: companyInstance,
  } as FindManyOptions);
  console.log(skills);
  return skills.map((skill) => skillsMapper(skill));
};

export const createSkills = async (
  data: any,
): Promise<SkillsCreationResponse> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    name: companies[0].name,
  });

  const skills: any = [];
  await asyncForEach(async ({ name, type }: any) => {
    const skillInstance = skillRepository.create({
      name: name,
      type: type,
      company: companyInstance,
    });
    await skillInstance.save();
    skills.push(skillInstance);
  }, data);

  return skills.map((skill: Skill) => skillsMapper(skill));
};
