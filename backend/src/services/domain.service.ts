import { getCustomRepository } from 'typeorm';
import DomainRepository from '~/data/repositories/domain.repository';

import { Domain } from '~/data/entities/domain';
import { Company } from '~/data/entities/company';

export const createDomain = async (
  name: string,
  company: Company,
): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);

  const target = await domainRepository.findOne({ name, company });
  if (target) return target;

  const domain = await domainRepository
    .create({
      name,
      company,
    })
    .save();

  return domain;
};

export const getDomain = async (id: Domain['id']): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);

  const domain = domainRepository.findOne(id);
  return domain;
};
