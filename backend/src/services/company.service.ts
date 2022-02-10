import { Request } from 'express';
import { Company } from '../data/entities/company';

export const createCompany = async (data: Request): Promise<Company> => {
  const company = new Company();
  const newCompany = Object.assign(company, data.body);

  await Company.save(newCompany);

  return Promise.resolve(newCompany);
};

export const editCompany = async (data: Request): Promise<Company | null> => {
  const { id } = data.params;

  const company = await Company.findByIds([id]);

  if (company) {
    const newCompany = Object.assign(company[0], data.body);

    await Company.save(newCompany);

    return Promise.resolve(newCompany);
  }
  return Promise.resolve(null);
};
