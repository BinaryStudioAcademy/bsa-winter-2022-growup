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
import { getUserSkillCategories } from './user-skill-category.service';
import { getCategoryById } from './skill-category.service';
// import { getCategoryById } from './skill-category.service';

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

export const getUserCareerPathSkills = async (
  id: string,
): Promise<ISkill[]> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id });

  const userSkillCategories = await getUserSkillCategories(user);
  const userSkills: UserSkill[] = [];
  await asyncForEach(async (userSkillCategory) => {
    const skillCategory = await getCategoryById(
      userSkillCategory.skillCategory.id,
    );
    const { isStarred, selfRating, reviewRating, mentorRating } =
      userSkillCategory;
    const { skill } = skillCategory;

    const userSkill: UserSkill = {
      skill,
      isStarred,
      selfRating,
      reviewRating,
      mentorRating,
      user,
    } as unknown as UserSkill;

    userSkills.push(userSkill);
  }, userSkillCategories);

  const newSkills: Skill[] = userSkills.map((userSkill) =>
    skillsMapper(userSkill.skill),
  );
  const skillsWithRating = newSkills.map((el: Skill, index: number) => {
    const { selfRating, mentorRating, reviewRating, isStarred } =
      userSkills[index];
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

export const updateCareerPathSkill = async (
  id: Skill['id'],
  data: ISkill[],
  userId: string,
): Promise<ISkill> => {
  if (id) {
    const skillRepository = getCustomRepository(SkillRepository);
    const skillInstance = await skillRepository.findOne(id);
    const userRepository = getCustomRepository(UserRepository);
    const ratings = [...data[1].rating];

    const user = await userRepository.findOne({ id: userId });
    const userSkillCategories = await getUserSkillCategories(user);
    await asyncForEach(async (userSkillCategory) => {
      if (userSkillCategory.skillCategory.id) {
        const skillCategory = await getCategoryById(
          userSkillCategory.skillCategory.id,
        );

        if (skillCategory.skill.id === id) {
          const allRating = {
            selfRating: ratings[0] ? ratings[0] : null,
            mentorRating: ratings[1] ? ratings[1] : null,
            reviewRating: ratings[2] ? ratings[2] : null,
            isStarred: data[1].isStarred,
          };

          userSkillCategory = Object.assign(userSkillCategory, allRating);
          await userSkillCategory.save();
        }
      }
    }, userSkillCategories);
    console.warn(userSkillCategories);

    if (skillInstance) {
      const newSkill = Object.assign(skillInstance, data[0]);
      await newSkill.save();

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

export const createSkill = async (
  company: Company,
  data: SkillProps,
): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skill = await skillRepository.findOne({
    name: data.name,
    type: data.type,
    company,
  });
  if (skill)
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Skill with this name already exists',
    });
  const skillInstance = await skillRepository
    .create({ name: data.name, type: data.type, company })
    .save();

  return skillInstance;
};

export const getSkillById = async (id: string): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);
  const skill = await skillRepository.findOne({ id });

  return skill;
};
export const updateSkillById = async (
  id: Skill['id'],
  skill: Partial<Skill>,
): Promise<Skill> => {
  const skillRepository = getCustomRepository(SkillRepository);

  if (skill.name) {
    const target = await skillRepository.findOne({ name: skill.name });
    if (target)
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: 'Skill with this name already exists',
      });
  }
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
