import { FindManyOptions, getCustomRepository, In } from 'typeorm';
import SkillRepository from '~/data/repositories/skill.repository';

import { Skill } from '~/data/entities/skill';
import CompanyRepository from '~/data/repositories/company.repository';
import { Company } from '~/data/entities/company';

import { skillsMapper } from '~/common/mappers/skills.mapper';
import { SkillsCreationResponse } from '~/common/models/skills/skills';
import { asyncForEach } from '~/common/helpers/array.helper';
import { SuccessResponse } from '~/common/models/responses/success';
import { HttpCode, HttpError } from 'growup-shared';
// import UserSkillRepository from '~/data/repositories/userskill.repository';
import UserRepository from '~/data/repositories/user.repository';
import UserSkillRepository from '~/data/repositories/userskill.repository';
// import { User } from '~/data/entities/user';

export const getSkills = async (id: string): Promise<Skill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    id: id,
  });

  const skills: Skill[] = await skillRepository.find({
    company: companyInstance,
  } as FindManyOptions);

  // const userSkillRepository = getCustomRepository(UserSkillRepository);
  // const userSkills = await userSkillRepository.find({
  //   where: {
  //     skill: In(skills),
  //   },
  // });
  // userSkills[0].mentorRating

  return skills.map((skill) => skillsMapper(skill));
};

export const createSkills = async (
  data: any,
  userId: string,
  companyId: string,
): Promise<SkillsCreationResponse> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const companyRepository = getCustomRepository(CompanyRepository);
  const userRepository = getCustomRepository(UserRepository);
  const userSkillRepository = getCustomRepository(UserSkillRepository);

  const companyInstance: Company = await companyRepository.findOne({
    id: companyId,
  });
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  const skills: any = [];
  await asyncForEach(async ({ name, type }: any) => {
    const skill = skillRepository.create({
      name: name,
      type: type,
      company: companyInstance,
    });
    await skill.save();
    const userSkill = userSkillRepository.create({
      skill,
      user,
    });
    await userSkill.save();
    skills.push(skill);
  }, data);
  await user.save();

  return skills.map((skill: Skill) => skillsMapper(skill));
};

export const deleteSkill = async (
  id: Skill['id'],
): Promise<SuccessResponse> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skillInstance = await skillRepository.findOne(id);
  console.log(skillInstance);
  if (!skillInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Skill with this id does not exist',
    });

  await skillInstance.remove();

  return { success: true, message: 'Skill deleted successfully' };
};

export const updateSkill = async (
  id: Skill['id'],
  body: any,
): Promise<Skill> => {
  if (id) {
    const skillRepository = getCustomRepository(SkillRepository);
    // console.log(skillRepository);
    const skillInstance = await skillRepository.findOne(id);
    if (skillInstance) {
      const newSkill = Object.assign(skillInstance, body);

      await newSkill.save();

      return newSkill;
    }

    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Skill not found',
    });
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Skill id is undefined',
  });
};

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
