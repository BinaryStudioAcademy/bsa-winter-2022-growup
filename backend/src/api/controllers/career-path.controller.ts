import { CareerPath } from '~/common/models/career/career';
import { Company } from '~/data/entities/company';

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
} from '~/services/skill-category.service';

import { asyncForEach } from '~/common/helpers/array.helper';
import { convertToSkillCategory } from '~/common/mappers/career-path.mapper';

import { SkillObjective } from '~/data/entities/skill-objective';
import { DomainLevel } from '~/data/entities/domain-level';
import { Domain } from '~/data/entities/domain';
import { Skill } from '~/data/entities/skill';

type DomainLevelResponse = DomainLevel & {
  skills: Skill[];
};

type CareerPathResponse = {
  domain: Domain;
  levels: DomainLevelResponse[];
};

const getLevelsAndSkills = async (domain: Domain): Promise<DomainLevel[]> => {
  const levels = await getLevels(domain);
  const currentLevels: DomainLevelResponse[] = levels as DomainLevelResponse[];

  await asyncForEach(async (currentLevel) => {
    const categories = await getCategoriesByLevel(currentLevel);

    const skillObjectives: SkillObjective[] = [];
    await asyncForEach(async (category) => {
      const objectives = await getObjectives(category);
      skillObjectives.push(...objectives);
    }, categories);

    const categorySkills = convertToSkillCategory(categories, skillObjectives);
    currentLevel.skills = categorySkills.map((category) => category.skill);
  }, currentLevels);

  return currentLevels;
};

export const createDomainTree = async (
  data: CareerPath,
  company: Company,
): Promise<CareerPathResponse> => {
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

  const levels = await getLevelsAndSkills(domain);

  return {
    domain,
    levels: levels,
  } as unknown as CareerPathResponse;
};

export const getDomainTrees = async (
  company: Company,
): Promise<CareerPathResponse[]> => {
  const careeerPathResponse: CareerPathResponse[] = [];
  const domains = await getDomains(company);

  await asyncForEach(async (domain) => {
    const levels = await getLevelsAndSkills(domain);
    careeerPathResponse.push({
      domain,
      levels,
    } as unknown as CareerPathResponse);
  }, domains);

  return careeerPathResponse;
};

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

export const updateLevel = async (
  id: string,
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
