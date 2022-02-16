import { FindManyOptions, getCustomRepository } from 'typeorm';
import { companies } from '~/data/seed-data/company.data';

import OpportunitiesRepository from '~/data/repositories/opportunity.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Company } from '~/data/entities/company';
import { Opportunity } from '~/data/entities/opportunity';

import { opportunityMapper } from '~/common/mappers/opportunities.mapper';
import UserRepository from '~/data/repositories/user.repository';
import { User } from '~/data/entities/user';
import { users } from '~/data/seed-data/user.data';

export const getOpportunities = async (): Promise<Opportunity[]> => {
  const opportunityRepository = getCustomRepository(OpportunitiesRepository);
  const companyRepository = getCustomRepository(CompanyRepository);
  const userRepository = getCustomRepository(UserRepository);
  const companyInstance: Company = await companyRepository.findOne({
    name: companies[0].name,
  });
  const userInstance: User = await userRepository.findOne({
    firstName: users[0].firstName,
  });
  const opportunities = await opportunityRepository.find({
    company: companyInstance,
    user: userInstance,
    relations: ['company', 'user'],
  } as FindManyOptions);

  return opportunities.map((opportunitie) => opportunityMapper(opportunitie));
};
