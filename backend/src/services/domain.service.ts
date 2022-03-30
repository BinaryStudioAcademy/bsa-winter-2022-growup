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

export const getDomainById = async (id: Domain['id']): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);

  const domain = domainRepository.findOne(id);
  return domain;
};

export const getDomains = async (company: Company): Promise<Domain[]> => {
  const domainRepository = getCustomRepository(DomainRepository);

  const domain = await domainRepository
    .createQueryBuilder('domain')
    .innerJoin('domain.company', 'company')
    .where('company.id = :id', { id: company.id })
    .getMany();

  return domain;
};

export const updateDomainById = async (
  id: string,
  domain: Domain,
): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);
  await domainRepository.update({ id }, domain);
  const updatedDomain = await domainRepository.findOne(id);

  return updatedDomain;
};

export const deleteDomainById = async (id: Domain['id']): Promise<Domain> => {
  const domainRepository = getCustomRepository(DomainRepository);

  const domain = await domainRepository.findOne({ id });
  await domainRepository.delete({ id });

  return domain;
};
