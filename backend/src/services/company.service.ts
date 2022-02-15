import { getCustomRepository } from 'typeorm';
import CompanyRepositry from '../data/repositories/company.repository';

import { Company } from '../data/entities/company';

import { companies } from '../data/seed-data/company.data';

export const getCompany = async (): Promise<Company> => {
  const companyRepository = getCustomRepository(CompanyRepositry);
  const company = await companyRepository.findOne({ name: companies[0].name });

  return company;
};
