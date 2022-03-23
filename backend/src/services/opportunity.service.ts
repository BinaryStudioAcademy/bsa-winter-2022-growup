import { FindManyOptions, getCustomRepository } from 'typeorm';
import OpportunitiesRepository from '~/data/repositories/opportunity.repository';
import CompanyRepository from '~/data/repositories/company.repository';

import { Company } from '~/data/entities/company';
import { Opportunity } from '~/data/entities/opportunity';

import { opportunityMapper } from '~/common/mappers/opportunities.mapper';
import UserRepository from '~/data/repositories/user.repository';
import { User } from '~/data/entities/user';
import { asyncForEach } from '~/common/helpers/array.helper';
import TagsRepository from '~/data/repositories/tags.repository';
import { Tags } from '~/data/entities/tags';

interface Props {
  name: string;
  organization: string;
  type: string;
  startDate: Date;
}

export const getOpportunities = async (
  companyId: string,
): Promise<Opportunity[]> => {
  const opportunityRepository = getCustomRepository(OpportunitiesRepository);
  const companyRepository = getCustomRepository(CompanyRepository);
  const companyInstance: Company = await companyRepository.findOne({
    id: companyId,
  });
  const opportunities = await opportunityRepository.find({
    company: companyInstance,
    relations: ['company', 'user', 'tags'],
  } as FindManyOptions);

  return opportunities.map((opportunity) => opportunityMapper(opportunity));
};

export const getOpportunitiesById = async (
  id: string,
): Promise<Opportunity> => {
  const opportunityRepository = getCustomRepository(OpportunitiesRepository);

  const opportunity = await opportunityRepository.findOne({
    relations: ['company', 'user', 'tags'],
    where: { id },
  });

  return opportunityMapper(opportunity);
};

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

  return opportunities.map((opportunity) => opportunityMapper(opportunity));
};

export const connectTagsOpportunity = async (
  tagsName: string[],
  id: string,
  companyId: string,
): Promise<Tags[]> => {
  const opportunitiesRepository = getCustomRepository(OpportunitiesRepository);
  const tagsRepository = getCustomRepository(TagsRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  const opportunityInstance = await opportunitiesRepository.findOne({
    where: {
      id,
    },
    relations: ['tags'],
  });

  const companyInstance: Company = await companyRepository.findOne({
    id: companyId,
  });

  const tags = await tagsRepository.find({
    company: companyInstance,
    relations: ['company'],
  } as FindManyOptions);

  const opportunityTags = tags.filter(
    (tag) => tagsName.indexOf(tag.name) !== -1,
  );
  await opportunityInstance.tags.push(...opportunityTags);
  await opportunityInstance.save();

  return opportunityTags;
};
