import { CareerDomain } from '~/common/models/career/career';
import { Company } from '~/data/entities/company';
// import { CareerParh } from '~/data/entities/career-parh';

import { getCustomRepository } from 'typeorm';
import { getCompany } from '~/services/company.service';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import {
  createDomain,
  getDomains,
  getDomainById,
  deleteDomainById,
  updateDomainById,
} from '~/services/domain.service';
import {
  createDomainLevel,
  getLevels,
  updateLevelById,
  getLevelById,
  deleteLevelById,
  connectDomainLevels,
  disconnectDomainLevels,
  getLevelsNextId,
} from '~/services/domain-level.service';
import {
  createSkill as createDomainSkill,
  upsertSkills,
  updateSkillById,
  getSkillById,
  deleteSkillById,
} from '~/services/skill.service';
import {
  getObjectives,
  upsertObjectives,
  updateObjectiveById,
  deleteObjectiveById,
} from '~/services/skill-objective.service';
import {
  createSkillCategories,
  getCategoriesByLevel,
  getCategoriesBySkill,
  getCategory,
  deleteSkillCategoryById,
  getUserCategoriesByLevel,
} from '~/services/skill-category.service';

// import { createCareerPath, deleteCareerPath, getPath, getPathByDomain } from '~/services/career-path.service';

import { asyncForEach } from '~/common/helpers/array.helper';
import { convertToSkillCategory } from '~/common/mappers/career-path.mapper';

import { SkillObjective } from '~/data/entities/skill-objective';
import { DomainLevel } from '~/data/entities/domain-level';
import { Domain } from '~/data/entities/domain';
import { Skill } from '~/data/entities/skill';
// import { HttpCode, HttpError } from 'growup-shared';

type DomainLevelResponse = DomainLevel & {
  skills: Skill[];
};

type CareerDomainResponse = {
  domain: Domain;
  levels: DomainLevelResponse[];
  nextDomain: Domain | null;
};

type ConnectLevelResponse = {
  level: DomainLevel;
  nextLevel: DomainLevel[];
};

type NextLevelIdResponse = {
  nextLevels: DomainLevel['id'][];
};

type LevelResponse = {
  id: DomainLevel['id'];
  name: DomainLevel['name'];
  domainName: DomainLevel['domain']['name'];
  skills: Skill[];
};

type DomainLevelNextIdResponse = LevelResponse & NextLevelIdResponse;

type DomainNextLevelIdResponse = {
  domain: Domain['name'];
  levels: DomainLevelNextIdResponse[];
  nextDomain: Domain | null;
};

// type CareerParhResponse = {
//   domain: Domain;
//   levels: DomainLevelResponse[];
//   nextDomain: CareerParhResponse | null
// };

const getLevelAndSkills = async (
  level: DomainLevel,
): Promise<DomainLevelResponse> => {
  const currentLevel: DomainLevelResponse = level as DomainLevelResponse;

  const categories = await getCategoriesByLevel(currentLevel);

  const skillObjectives: SkillObjective[] = [];
  await asyncForEach(async (category) => {
    const objectives = await getObjectives(category);
    skillObjectives.push(...objectives);
  }, categories);

  const categorySkills = convertToSkillCategory(categories, skillObjectives);
  currentLevel.skills = categorySkills.map((category) => category.skill);

  return currentLevel;
};

export const getUserLevelAndSkills = async (
  userId: string,
  level: DomainLevel,
): Promise<DomainLevelResponse> => {
  const currentLevel: DomainLevelResponse = level as DomainLevelResponse;

  const categories = await getUserCategoriesByLevel(userId, currentLevel);

  const skillObjectives: SkillObjective[] = [];
  await asyncForEach(async (category) => {
    const objectives = await getObjectives(category);
    skillObjectives.push(...objectives);
  }, categories);

  const categorySkills = convertToSkillCategory(categories, skillObjectives);

  currentLevel.skills = categorySkills.map((category) => category.skill);

  return currentLevel;
};

export const createDomainTree = async (
  data: CareerDomain,
  userId: string,
): Promise<CareerDomainResponse> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }

  const company = await getCompany(user.company.id);
  const domain = await createDomain(data.name, company);

  const domainLevels = data.levels;
  const domainLevelInstances: DomainLevel[] = [];

  await asyncForEach(async ({ name }) => {
    const level = await createDomainLevel({
      name,
      domain,
      prev: domainLevelInstances.length ? domainLevelInstances.at(-1) : null,
    });
    domainLevelInstances.push(level);
  }, domainLevels);

  const skillsWithLevel = data.levels
    .map((l, index) =>
      l.skills.map((s) => ({ ...s, level: domainLevelInstances[index] })),
    )
    .flat();

  const upsertedSkills = await upsertSkills(
    company,
    skillsWithLevel.map((s) => ({ name: s.name, type: s.type, company })),
  );

  const categoryInstances = await createSkillCategories(
    skillsWithLevel.map((s) => ({
      level: s.level,
      skill: upsertedSkills.find(
        (upsertedSkill) =>
          s.name === upsertedSkill.name && s.type === upsertedSkill.type,
      ),
    })),
  );

  await asyncForEach(async (category) => {
    const objectives = skillsWithLevel.find(
      (skill) =>
        skill.name === category.skill.name &&
        skill.type === category.skill.type &&
        category.level.name === skill.level.name,
    ).objectives;

    await upsertObjectives(
      category,
      objectives.map((objective) => ({ name: objective.name, category })),
    );
  }, categoryInstances);

  const levels = await getLevels(domain);
  const levelsAndSkills: DomainLevel[] = [];

  await asyncForEach(async (level) => {
    const levelAndSkills = await getLevelAndSkills(level);
    levelsAndSkills.push(levelAndSkills);
  }, levels);

  return {
    domain,
    levels: levelsAndSkills,
    nextDomain: null,
  } as unknown as CareerDomainResponse;
};

export const getDomainTrees = async (
  userId: string,
): Promise<CareerDomainResponse[]> => {
  const careerPathResponse: CareerDomainResponse[] = [];
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }

  const company = await getCompany(user.company.id);
  const domains = await getDomains(company);

  await asyncForEach(async (domain) => {
    // const connectedDomain = await getPathByDomain(domain);
    const levels = await getLevels(domain);
    const levelsAndSkills: DomainLevel[] = [];

    await asyncForEach(async (level) => {
      const levelAndSkills = await getLevelAndSkills(level);
      levelsAndSkills.push(levelAndSkills);
    }, levels);

    careerPathResponse.push({
      domain,
      levels: levelsAndSkills,
      nextDomain: null,
      // nextDomain: connectedDomain?.nextDomain || null,
    } as unknown as CareerDomainResponse);
  }, domains);

  return careerPathResponse;
};

export const getDomainTree = async (
  domain: Domain,
): Promise<DomainNextLevelIdResponse> => {
  let careerPathResponse: DomainNextLevelIdResponse = null;

  const levels = await getLevels(domain);
  const levelsAndSkills: LevelResponse[] = [];

  await asyncForEach(async (level) => {
    const levelAndSkills = await getLevelAndNextId(level.id);
    levelsAndSkills.push(levelAndSkills);
  }, levels);

  careerPathResponse = {
    domain: domain.name,
    levels: levelsAndSkills,
    nextDomain: null,
  } as DomainNextLevelIdResponse;

  return careerPathResponse;
};
// export const getDomainTree = async (
//   domain: Domain,
// ): Promise<CareerDomainResponse> => {
//   let careerPathResponse: CareerDomainResponse = null;

//   const levels = await getLevels(domain);
//   const levelsAndSkills: DomainLevel[] = [];

//   await asyncForEach(async (level) => {
//     const levelAndSkills = await getLevelAndSkills(level);
//     levelsAndSkills.push(levelAndSkills);
//   }, levels);

//   careerPathResponse = {
//     domain,
//     levels: levelsAndSkills,
//     nextDomain: null,
//   } as CareerDomainResponse;

//   return careerPathResponse;
// };

export const updateDomain = async (
  id: string,
  data: Domain,
): Promise<Domain> => {
  const domain = await updateDomainById(id, data);

  return domain;
};

export const deleteDomain = async (id: string): Promise<Domain> => {
  const domain = await getDomainById(id);
  const levels = await getLevels(domain);

  await asyncForEach(async (level) => {
    const categories = await getCategoriesByLevel(level);

    await asyncForEach(async (category) => {
      await deleteSkillCategoryById(category.id);
      await deleteSkillById(category.skill.id);
    }, categories);
  }, levels);

  await deleteDomainById(id);

  return domain;
};

export const createLevel = async (
  domainId: string,
  data: DomainLevel,
): Promise<DomainLevel> => {
  const domain = await getDomainById(domainId);
  const level = await createDomainLevel({ ...data, domain, prev: null });

  return level;
};

export const getLevel = async (id: DomainLevel['id']): Promise<DomainLevel> => {
  const level = await getLevelById(id);
  const levelAndSkills = await getLevelAndSkills(level);
  return levelAndSkills;
};

export const getLevelAndNextId = async (
  id: DomainLevel['id'],
): Promise<DomainLevelNextIdResponse> => {
  const level = await getLevelById(id);
  const levelAndSkills = await getLevelAndSkills(level);
  const levelNextIds: NextLevelIdResponse = await getLevelsNextId(level);

  const levelAndNextIds = {
    id: level.id,
    name: level.name,
    domainName: level.domain.name,
    nextLevels: levelNextIds.nextLevels,
    skills: levelAndSkills.skills,
  } as DomainLevelNextIdResponse;

  return levelAndNextIds;
};

export const getUserLevelAndNextId = async (
  userId: string,
  id: DomainLevel['id'],
): Promise<DomainLevelNextIdResponse> => {
  const level = await getLevelById(id);
  const levelAndSkills = await getUserLevelAndSkills(userId, level);
  const levelNextIds: NextLevelIdResponse = await getLevelsNextId(level);

  const levelAndNextIds = {
    id: level.id,
    name: level.name,
    domainName: level.domain.name,
    nextLevels: levelNextIds.nextLevels,
    skills: levelAndSkills.skills,
  } as DomainLevelNextIdResponse;

  return levelAndNextIds;
};

export const getLevelsAndNextId = async (
  domain: Domain,
): Promise<DomainLevelNextIdResponse[]> => {
  const levels = await getLevels(domain);
  const levelsAndNextIds: DomainLevelNextIdResponse[] = [];

  await asyncForEach(async (level) => {
    const currentLevelAndNextIds = await getLevelAndNextId(level.id);
    levelsAndNextIds.push(currentLevelAndNextIds);
  }, levels);

  return levelsAndNextIds;
};

export const updateLevel = async (
  id: DomainLevel['id'],
  data: DomainLevel,
): Promise<DomainLevel> => {
  const level = await updateLevelById(id, data);

  return level;
};

export const deleteLevel = async (id: string): Promise<DomainLevel> => {
  const level = await getLevelById(id);
  const categories = await getCategoriesByLevel(level);

  await asyncForEach(async (category) => {
    await deleteSkillCategoryById(category.id);
    await deleteSkillById(category.skill.id);
  }, categories);

  await deleteLevelById(id);

  return level;
};

export const createSkill = async (
  company: Company,
  levelId: string,
  data: Skill,
): Promise<Skill> => {
  const skill = await createDomainSkill(company, data);
  const level = await getLevelById(levelId);

  await createSkillCategories([{ level, skill }]);

  return skill;
};

export const updateSkill = async (id: string, data: Skill): Promise<Skill> => {
  const skill = await updateSkillById(id, data);

  return skill;
};

export const deleteSkill = async (id: string): Promise<Skill> => {
  const skill = await getSkillById(id);

  const categories = await getCategoriesBySkill(skill);

  await asyncForEach(async (category) => {
    await deleteSkillCategoryById(category.id);
  }, categories);

  await deleteSkillById(id);

  return skill;
};

export const createObjective = async (
  levelId: string,
  skillId: string,
  data: SkillObjective,
): Promise<SkillObjective> => {
  const level = await getLevelById(levelId);
  const skill = await getSkillById(skillId);
  const category = await getCategory(level, skill);

  const objectives = await upsertObjectives(category, [
    { name: data.name, category },
  ]);

  const objective = objectives[0];

  return objective;
};

export const updateObjective = async (
  id: string,
  data: SkillObjective,
): Promise<SkillObjective> => {
  const skill = await updateObjectiveById(id, data.name);

  return skill;
};

export const deleteObjective = async (id: string): Promise<SkillObjective> => {
  const objective = await deleteObjectiveById(id);

  return objective;
};

export const connectLevels = async (
  levelId: DomainLevel['id'],
  nextLevelId: DomainLevel['id'][],
): Promise<ConnectLevelResponse> => {
  const levelInstance = await getLevelById(levelId);
  const nextLevelInstances: DomainLevel[] = [];

  await asyncForEach(async (nextId) => {
    const nextLevelInstance = await getLevelById(nextId);
    nextLevelInstances.push(nextLevelInstance);
  }, nextLevelId);

  const connectedLevels = await connectDomainLevels(
    levelInstance,
    nextLevelInstances,
  );

  return connectedLevels;
};

export const disconnectLevels = async (
  levelId: DomainLevel['id'],
  nextLevelId: DomainLevel['id'],
): Promise<DomainLevel> => {
  const level = await getLevelById(levelId);
  const nextLevel = await getLevelById(nextLevelId);

  await disconnectDomainLevels(level, nextLevel);

  return level;
};

// export const createPath = async(domainId: Domain['id'], nextDomainId: Domain['id']): Promise<CareerParh> => {
//   const domain = await getDomainById(domainId);
//   const nextDomain = await getDomainById(nextDomainId);

//   const path = createCareerPath(domain, nextDomain);
//   return path;
// };

// const deleteConnectedPath = async (domain: Domain, nextDomain: Domain): Promise<CareerParh> => {
//   const currentPath = await getPath(domain, nextDomain);

//   if(currentPath) {
//     await deleteCareerPath(domain, nextDomain);

//     const nextPath = await getPathByDomain(nextDomain);
//     if (nextPath) await deleteConnectedPath(nextPath.domain, nextPath.nextDomain);
//     else await deleteCareerPath(nextDomain, null);
//   }

//   return currentPath;

// };

// export const deletePath = async(domainId: Domain['id']): Promise<CareerParh> => {
//   const domain = await getDomainById(domainId);
//   const path = await deleteConnectedPath(null, domain);
//   return path;
// };

// const getConnectedPath = async (root: CareerParhResponse): Promise<CareerParhResponse> => {
//   const currentPath = await getPathByDomain(root.domain);

//   let careerPath: CareerParhResponse = null;

//   if(currentPath && currentPath.nextDomain) {
//     const domainTree = await getDomainTree(currentPath.nextDomain);
//     careerPath = { domain: currentPath.nextDomain, levels: domainTree.levels, nextDomain: null };
//     careerPath.nextDomain = await getConnectedPath(careerPath);
//   }

//   return careerPath;

// };

// export const getCareerPath = async (company: Company): Promise<CareerParhResponse> => {
//   const domains = await getDomains(company);

//   let careerPath: CareerParhResponse = null;

//   let root: CareerParhResponse = null;

//   await asyncForEach(async(domain) => {
//     const currentPath = await getPath(null, domain);

//     if (currentPath && currentPath.nextDomain && !currentPath.domain ) {
//       const rootNode = new CareerParh();
//       rootNode.domain = currentPath.nextDomain;
//       rootNode.nextDomain = null;
//       const domainTree = await getDomainTree(currentPath.nextDomain);

//       root = { domain: rootNode.domain , levels: domainTree.levels, nextDomain: null  };
//     }
//   }, domains);

//   if (!root) {
//     throw new HttpError({
//       status: HttpCode.NOT_FOUND,
//       message: 'Career path not found',
//     });
//   }

//   careerPath = { domain: root.domain, levels: root.levels, nextDomain: null };
//   const recRes = await getConnectedPath(careerPath);
//   careerPath.nextDomain = recRes;
//   return careerPath;
// };
