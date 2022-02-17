import { getCustomRepository } from 'typeorm';
import { Company } from '../data/entities/company';
import { HttpCode, HttpError } from 'growup-shared';
import { signToken } from '~/common/utils/token.util';
import { CompanyResponse } from '~/common/models/responses/company';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';
import CompanyRepository from '~/data/repositories/company.repository';

interface CompanyProps {
  id?: string;
  body: Company;
  tokenPayload: ITokenPayload;
}

export const createCompany = async ({
  body,
  tokenPayload,
}: CompanyProps): Promise<CompanyResponse> => {
  const { name } = body;
  const { userId, role } = tokenPayload;

  const companyRepository = getCustomRepository(CompanyRepository);

  if (name) {
    const isCompanyExist = await companyRepository.findOne({ name });

    if (!isCompanyExist) {
      const company = new Company();
      const newCompany = Object.assign(company, body);

      await newCompany.save();

      const token = signToken({
        userId,
        role,
        companyId: newCompany.id,
      });

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

export const editCompany = async ({
  id,
  body,
  tokenPayload,
}: CompanyProps): Promise<CompanyResponse> => {
  const companyRepository = getCustomRepository(CompanyRepository);
  const { userId, role } = tokenPayload;

  if (id) {
    const company = await companyRepository.findOne({ id });

    if (company) {
      const newCompany = Object.assign(company, body);

      await newCompany.save();

      const token = signToken({
        userId,
        role,
        companyId: newCompany.id,
      });

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
