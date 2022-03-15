import { createRegistrationToken } from '~/services/registration-token.service';
import { registerUser } from '~/services/user.service';
import { sendMail } from '~/services/mail.service';

import { Company } from '~/data/entities/company';

import { createDefaultUser } from '~/common/utils/default-user.util';
import { RoleType } from '~/common/enums/role-type';

import { SuccessResponse } from '~/common/models/responses/success';

type RegistrationUserProps = {
  email: string;
  roleType: RoleType;
  companyId: Company['id'];
};

const registerUserController = async ({
  email,
  roleType,
  companyId,
}: RegistrationUserProps): Promise<SuccessResponse> => {
  const data = await registerUser(
    createDefaultUser(email),
    roleType,
    companyId,
  );

  const token = await createRegistrationToken(data.user);
  return await sendMail(data.user.email, token.value);
};

export { registerUserController };
