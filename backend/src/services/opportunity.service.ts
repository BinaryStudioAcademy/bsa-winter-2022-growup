import { FindManyOptions, getCustomRepository } from 'typeorm';
import OpportunitiesRepository from '~/data/repositories/opportunity.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Company } from '~/data/entities/company';
import { Opportunity } from '~/data/entities/opportunity';

import { opportunityMapper } from '~/common/mappers/opportunities.mapper';
import UserRepository from '~/data/repositories/user.repository';
import { User } from '~/data/entities/user';
import { users } from '~/data/seed-data/user.data';
import { asyncForEach } from '~/common/helpers/array.helper';

export const getOpportunities = async (
  companyId: string,
): Promise<Opportunity[]> => {
  const opportunityRepository = getCustomRepository(OpportunitiesRepository);
  const companyRepository = getCustomRepository(CompanyRepository);
  const userRepository = getCustomRepository(UserRepository);
  const companyInstance: Company = await companyRepository.findOne({
    id: companyId,
  });
  const userInstance: User = await userRepository.findOne({
    firstName: users[0].firstName,
  });
  console.log();
  const opportunities = await opportunityRepository.find({
    company: companyInstance,
    user: userInstance,
    relations: ['company', 'user', 'tags'],
  } as FindManyOptions);

  return opportunities.map((opportunitie) => opportunityMapper(opportunitie));
};
interface Props {
  name: string;
  organization: string;
  type: string;
  startDate: string;
}
export const createOpportunities = async (
  data: Opportunity[],
  userId: string,
  companyId: string,
): Promise<Opportunity[]> => {
  const companyRepository = getCustomRepository(CompanyRepository);
  const userRepository = getCustomRepository(UserRepository);
  const opportunitiesRepository = getCustomRepository(OpportunitiesRepository);
  const companyInstance: Company = await companyRepository.findOne({
    id: companyId,
  });
  const userInstance: User = await userRepository.findOne({
    id: userId,
  });

  const opportunities: Opportunity[] = [];

  await asyncForEach(async ({ name, organization, type, startDate }: Props) => {
    const opportunitiesInstance = opportunitiesRepository.create({
      name: name,
      organization: organization,
      startDate: startDate,
      type: type,
      user: userInstance,
      company: companyInstance,
    });
    await opportunitiesInstance.save();
    opportunities.push(opportunitiesInstance);
  }, data);

  return opportunities.map((opportunitie) => opportunityMapper(opportunitie));
};
