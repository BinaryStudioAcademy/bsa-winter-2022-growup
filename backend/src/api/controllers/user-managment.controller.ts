import {
  createRegistrationToken,
  deleteRegistrationToken,
  verifyRegistrationToken,
} from '~/services/registration-token.service';
import {
  getUserJWT,
  registerUser,
  updateUserMissingData,
} from '~/services/user.service';
import { sendMail } from '~/services/mail.service';

import { Company } from '~/data/entities/company';
import { User } from '~/data/entities/user';

import { createDefaultUser } from '~/common/utils/default-user.util';
import { RoleType } from '~/common/enums/role-type';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { convertForUserList } from '~/common/utils/user.util';
import { IListUser, ShortUser } from '~/common/models/user/user';
import { toShortUser } from '~/common/mappers/user.mapper';

type RegistrationUserProps = {
  host: string;
  email: string;
  roleType: RoleType;
  companyId: Company['id'];
};

const registerUserController = async ({
  host,
  email,
  roleType,
  companyId,
}: RegistrationUserProps): Promise<IListUser> => {
  const data = await registerUser(
    createDefaultUser(email),
    roleType,
    companyId,
  );

  const token = await createRegistrationToken(data.user);
  await sendMail(host, data.user.email, token.value);
  return convertForUserList(data.user, data.role);
};

const verifyRegistrationTokenController = async (
  token: string,
): ReturnType<typeof getUserJWT> => {
  const user = await verifyRegistrationToken(token);
  return getUserJWT(user);
};

const updateUserMissingDataController = async (
  id: User['id'],
  data: UserMissingDataForm,
): Promise<ShortUser> => {
  const updatedUser = await updateUserMissingData(id, data);
  await deleteRegistrationToken(updatedUser.id);

  return toShortUser(updatedUser);
};

export {
  registerUserController,
  updateUserMissingDataController,
  verifyRegistrationTokenController,
};
