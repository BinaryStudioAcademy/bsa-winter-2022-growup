import { Company } from '~/data/entities/company';

export type CompanyResponse = {
  token: string;
  company: Company;
};

export type CompaniesResponse = {
  token: string;
  companies: Company[];
};
