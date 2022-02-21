import { HttpCode, HttpError } from 'growup-shared';
import { getCustomRepository, getManager } from 'typeorm';
import DomainLevelRepository from '~/data/repositories/domain-level.repository';

import { DomainLevel } from '~/data/entities/domain-level';

type DomainLevelCreation = {
  prev: DomainLevel | null;
  name: string;
  domain: DomainLevel['domain'];
};

export const createDomainLevel = async ({
  name,
  domain,
  prev,
}: DomainLevelCreation): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);

  const props = { name, domain, prevLevel: prev };

  await domainLevelRepository.createUnique(props);
  const level = domainLevelRepository.findOne(props);

  return level;
};

export const getDomainLevels = async (
  domain: DomainLevel['domain'],
): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);
  const lowestLevel = await domainLevelRepository.findOne({ domain });

  if (!lowestLevel)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'No levels found',
    });

  const manager = getManager().getTreeRepository(DomainLevel);
  const tree = manager.findDescendantsTree(lowestLevel);

  return tree;
};
