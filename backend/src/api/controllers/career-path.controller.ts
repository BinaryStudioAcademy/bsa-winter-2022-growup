import { CareerPath } from '~/common/models/career/career';
import { Company } from '~/data/entities/company';

import { createDomain, getDomain } from '~/services/domain.service';
import {
  createDomainLevel,
  getDomainLevels,
} from '~/services/domain-level.service';
import { upsertSkills } from '~/services/skill.service';
import { upsertObjectives } from '~/services/skill-objective.service';
import { createSkillCategories } from '~/services/skill-category.service';

import { asyncForEach } from '~/common/helpers/array.helper';

import { DomainLevel } from '~/data/entities/domain-level';
import { Domain } from '~/data/entities/domain';

type CareeerPathType = {
  domain: Domain;
  level: DomainLevel;
};

export const createCareerPath = async (
  data: CareerPath,
  company: Company,
): Promise<CareeerPathType> => {
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

  const levels = await getDomainLevels(domain);

  return {
    domain,
    level: levels,
  };
};

export const getDomainAndLevels = async (
  id: Domain['id'],
): Promise<CareeerPathType> => {
  const domain = await getDomain(id);
  const levels = await getDomainLevels(domain);

  return { domain, level: levels };
};