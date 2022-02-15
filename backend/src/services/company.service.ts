import { getCustomRepository } from 'typeorm';
import { Company } from '../data/entities/company';
import { HttpCode, HttpError } from 'growup-shared';
import { signToken } from '~/common/utils/token.util';

import CompanyRepository from '~/data/repositories/company.repository';

interface IReturnData {
  token: string;
  company: Company;
}

export const createCompany = async (body: Company): Promise<IReturnData> => {
  const { name } = body;

  const companyRepository = getCustomRepository(CompanyRepository);

  if (name) {
    const isCompanyExist = await companyRepository.findOne({ name });

    if (!isCompanyExist) {
      const company = new Company();
      const newCompany = Object.assign(company, body);

      await newCompany.save();

      const token = signToken(newCompany);

      return { token, company: newCompany };
    }
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Company name is exist!!!',
    });
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Company name is udefined!!!',
  });
};

export const editCompany = async (data: {
  id: string;
  body: Company;
}): Promise<IReturnData> => {
  const { id, body } = data;

  const companyRepository = getCustomRepository(CompanyRepository);

  if (id) {
    const company = await companyRepository.findOne({ id });

    if (company) {
      const newCompany = Object.assign(company, body);

      await newCompany.save();

      const token = signToken(newCompany);

      return { token, company: newCompany };
    }

    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Company not found!!!',
    });
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Company id is udefined!!!',
  });
};
