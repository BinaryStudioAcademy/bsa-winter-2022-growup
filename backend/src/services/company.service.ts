import { Request } from 'express';
import { Company } from '../data/entities/company';
import { HttpCode, HttpError } from 'growup-shared';

export const createCompany = async (data: Request): Promise<Company> => {
  const { name } = data.body;

  if (name) {
    const isCompanyExist = await Company.find({ name });

    if (isCompanyExist.length === 0) {
      const company = new Company();
      const newCompany = Object.assign(company, data.body);

      await Company.save(newCompany);
      return Promise.resolve(newCompany);
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

export const editCompany = async (data: Request): Promise<Company> => {
  const { id } = data.params;

  if (id) {
    const company = await Company.findByIds([id]);

    if (company) {
      const newCompany = Object.assign(company[0], data.body);

      await Company.save(newCompany);

      return Promise.resolve(newCompany);
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
