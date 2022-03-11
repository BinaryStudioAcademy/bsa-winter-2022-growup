import { CareerPath } from '~/common/models/career/career';
import { Company } from '~/data/entities/company';

import { createDomain, getDomain } from '~/services/domain.service';
import {
  createDomainLevel,
  getDomainLevels,
} from '~/services/domain-level.service';
import { upsertSkills } from '~/services/skill.service';
import {
  getObjectives,
  upsertObjectives,
} from '~/services/skill-objective.service';
import {
  createSkillCategories,
  getCategories,
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

type CareeerPathResponse = {
  domain: Domain;
  level: DomainLevelResponse;
};

const getLevelsAndSkills = async (domain: Domain): Promise<DomainLevel> => {
  const rootLevel = await getDomainLevels(domain);

  let currentLevel: DomainLevelResponse = rootLevel as DomainLevelResponse;
  while (currentLevel.nextLevel) {
    const categories = await getCategories(currentLevel);

    const skillObjectives: SkillObjective[] = [];
    await asyncForEach(async (category) => {
      const objectives = await getObjectives(category);
      skillObjectives.push(...objectives);
    }, categories);

    const categorySkills = convertToSkillCategory(categories, skillObjectives);

    currentLevel.skills = categorySkills.map((category) => category.skill);
    if (!currentLevel.nextLevel.length) break;
    currentLevel = currentLevel.nextLevel[0] as DomainLevelResponse;
  }

  return rootLevel;
};

export const createCareerPath = async (
  data: CareerPath,
  company: Company,
): Promise<CareeerPathResponse> => {
  const domain = await createDomain(data.domain, company);

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

  const rootLevel = await getLevelsAndSkills(domain);

  return {
    domain,
    level: rootLevel,
  } as unknown as CareeerPathResponse;
};

export const getCareerPath = async (
  id: Domain['id'],
): Promise<CareeerPathResponse> => {
  const domain = await getDomain(id);
  const rootLevel = await getLevelsAndSkills(domain);

  return { domain, level: rootLevel } as unknown as CareeerPathResponse;
};
