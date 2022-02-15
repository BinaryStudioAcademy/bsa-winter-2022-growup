import { getCustomRepository } from 'typeorm';
import DomainRepository from '~/data/repositories/domain.repository';

import { Domain } from '~/data/entities/domain';
import { Company } from '~/data/entities/company';

export const createDomain = async (
  name: string,
  company: Company,
): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);
  const domainInstance = domainRepository.create({
    name,
    company,
  });

  const domain = await domainInstance.save();
  return domain;
};
