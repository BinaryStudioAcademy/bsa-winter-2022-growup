import { ITokenPayload } from '~/common/models/middlewares/token-payload';
import { Company } from '~/data/entities/company';

import { createCompany } from '~/services/company.service';
import { updateUserCompany } from '~/services/user.service';

type CreateCompanyProps = {
  companyBody: Pick<Company, 'name' | 'description'>;
  tokenPayload: ITokenPayload;
};

export const createCompanyController = async ({
  companyBody,
  tokenPayload,
}: CreateCompanyProps): ReturnType<typeof createCompany> => {
  const response = await createCompany({ body: companyBody, tokenPayload });
  await updateUserCompany(tokenPayload.userId, response.company);

  return response;
};
