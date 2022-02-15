import { getCustomRepository } from 'typeorm';
import DomainLevelRepository from '~/data/repositories/domain-level.repository';

import { Domain } from '~/data/entities/domain';
import { DomainLevel } from '~/data/entities/domain-level';

type DomainLevelCreation = {
  prev: DomainLevel | null;
  name: string;
  domain: Domain;
};

export const createDomainLevel = async ({
  name,
  domain,
  prev,
}: DomainLevelCreation): Promise<DomainLevel> => {
  const domainLevelRepository = getCustomRepository(DomainLevelRepository);

  const levelInstance = domainLevelRepository.create({
    name,
    domain,
    prevLevel: prev,
  });

  const level = await levelInstance.save();
  prev.nextLevel = level;
  await prev.save();

  return level;
};
