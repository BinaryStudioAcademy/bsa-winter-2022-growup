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
import UserRepository from '~/data/repositories/user.repository';
import UserSkillRepository from '~/data/repositories/userskill.repository';
import { SkillType } from '~/common/enums/skill-type';
import { UserSkill } from '~/data/entities/user-skill';

interface ISkill {
  rating: (string | number)[];
  isStarred: boolean;
  company: Company;
  type: SkillType;
  name: string;
  userSkills: UserSkill[];
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export const getSkills = async (id: Company['id']): Promise<Skill[]> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const companyInstance: Company = await companyRepository.findOne({
    id,
  });

  const skills: Skill[] = await skillRepository.find({
    company: companyInstance,
  } as FindManyOptions);

  const newSkills: Skill[] = skills.map((skill) => skillsMapper(skill));
  return newSkills;
};

export const getUserSkills = async (id: string): Promise<ISkill[]> => {
  const userSkillRepository = getCustomRepository(UserSkillRepository);

  const userSkillInstance = await userSkillRepository.find({
    where: {
      user: id,
    },
    relations: ['skill'],
  });

  const newSkills: Skill[] = userSkillInstance.map((userSkill) =>
    skillsMapper(userSkill.skill),
  );
  const skillsWithRating = newSkills.map((el: Skill, index: number) => {
    const { selfRating, mentorRating, reviewRating, isStarred } =
      userSkillInstance[index];
    return {
      ...el,
      rating: [
        selfRating ? selfRating : '',
        mentorRating ? mentorRating : '',
        reviewRating ? reviewRating : '',
      ],
      isStarred: isStarred,
    };
  });
  return skillsWithRating;
};

export const createSkills = async (
  data: Skill[],
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

  const skills: Skill[] = [];
  await asyncForEach(async ({ name, type }: Skill) => {
    const skill = skillRepository.create({
      name,
      type,
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

  return { skills: skills.map((skill: Skill) => skillsMapper(skill)) };
};

export const connectSkills = async (
  data: Skill[],
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
  const allSkills: Skill[] = await skillRepository.find({
    company: companyInstance,
  } as FindManyOptions);

  const skills: Skill[] = [];
  await asyncForEach(async ({ name }: Skill) => {
    const importantSkill = allSkills.find((skill) => skill.name === name);
    const userSkill = userSkillRepository.create({
      skill: importantSkill,
      user,
    });
    await userSkill.save();
    skills.push(importantSkill);
  }, data);
  await user.save();

  return { skills: skills.map((skill: Skill) => skillsMapper(skill)) };
};

export const deleteSkill = async (
  id: Skill['id'],
): Promise<SuccessResponse> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const userSkillRepository = getCustomRepository(UserSkillRepository);
  const skillInstance = await skillRepository.findOne(id);
  const userSkillInstance = await userSkillRepository.findOne({
    where: {
      skill: id,
    },
    relations: ['user', 'skill'],
  });

  if (!skillInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Skill with this id does not exist',
    });

  await userSkillInstance.remove();

  return { success: true, message: 'Skill deleted successfully' };
};

export const updateSkill = async (
  id: Skill['id'],
  data: ISkill[],
): Promise<ISkill> => {
  if (id) {
    const skillRepository = getCustomRepository(SkillRepository);
    const skillInstance = await skillRepository.findOne(id);
    const userSkillRepository = getCustomRepository(UserSkillRepository);
    const userSkillInstance = await userSkillRepository.findOne({
      where: {
        skill: id,
      },
      relations: ['user', 'skill'],
    });
    const ratings = [...data[1].rating];
    const allRating = {
      selfRating: ratings[0] ? ratings[0] : null,
      mentorRating: ratings[1] ? ratings[1] : null,
      reviewRating: ratings[2] ? ratings[2] : null,
      isStarred: data[1].isStarred,
    };
    if (skillInstance) {
      const newSkill = Object.assign(skillInstance, data[0]);
      const newRating = Object.assign(userSkillInstance, allRating);
      await newSkill.save();
      await newRating.save();

      return { ...newSkill, rating: ratings, isStarred: data[1].isStarred };
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
