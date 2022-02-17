import { CareerPath } from '~/common/models/career/career';
import { Company } from '~/data/entities/company';

import { createDomain, getDomain } from '~/services/domain.service';
import {
  createDomainLevel,
  getDomainLevels,
} from '~/services/domain-level.service';
import { createSkill } from '~/services/skill.service';
import { createSkillCategory } from '~/services/skill-category.service';
import { createSkillObjective } from '~/services/skill-objective.service';

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
  const domainLevels = Object.entries(data.level);

  const domainLevelInstances: DomainLevel[] = [];

  await asyncForEach(async ([name, value]) => {
    const level = await createDomainLevel({
      name,
      domain,
      prev: domainLevelInstances.length ? domainLevelInstances.at(-1) : null,
    });

    const categories = Object.entries(value);

    asyncForEach(async ([name, value]) => {
      const skills = value;

      asyncForEach(async (skill) => {
        const skillInstance = await createSkill({
          company,
          name: skill.name,
          type: skill.type,
        });

        const categoryInstance = await createSkillCategory({
          level,
          skill: skillInstance,
        });

        await createSkillObjective({
          name,
          category: categoryInstance,
        });
      }, skills);
    }, categories);

    domainLevelInstances.push(level);
  }, domainLevels);

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
