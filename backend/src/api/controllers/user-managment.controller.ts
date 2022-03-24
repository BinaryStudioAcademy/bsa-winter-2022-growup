import {
  createRegistrationToken,
  deleteRegistrationToken,
  getRegistrationToken,
  verifyRegistrationToken,
} from '~/services/registration-token.service';
import {
  fetchUser,
  getUserJWT,
  registerUser,
  updateUserMissingData,
} from '~/services/user.service';
import { getUrl, sendMail } from '~/services/mail.service';

import { User } from '~/data/entities/user';

import { createDefaultUser } from '~/common/utils/default-user.util';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { convertForUserList } from '~/common/utils/user.util';
import { IListUser, ShortUser } from '~/common/models/user/user';
import { toShortUser } from '~/common/mappers/user.mapper';
import { SuccessResponse } from '~/common/models/responses/success';

type MailProps = {
  host: string;
  origin: string;
};

type RegistrationUserProps = Pick<User, 'email' | 'role'> &
  MailProps & {
    company: User['company']['id'];
  };

type ResendingProps = Pick<User, 'id'> & MailProps;

const registerUserController = async ({
  host,
  origin,
  email,
  role,
  company,
}: RegistrationUserProps): Promise<IListUser> => {
  const newUser = await registerUser(createDefaultUser(email), role, company);

  const token = await createRegistrationToken(newUser);
  await sendMail(host, origin, newUser.email, token.value);
  return convertForUserList(newUser);
};

const resendActivationMailController = async ({
  id,
  host,
  origin,
}: ResendingProps): Promise<SuccessResponse> => {
  const user = await fetchUser(id);
  const token = await createRegistrationToken(user);
  await sendMail(host, origin, user.email, token.value);

  return { success: true, message: 'Email was resent successfully' };
};

const getActionMailUrl = async ({
  id,
  host,
  origin,
}: ResendingProps): Promise<{ url: string }> => {
  const token = await getRegistrationToken(id);
  const url = getUrl(host, origin, token.value);
  return { url };
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
  getActionMailUrl,
  registerUserController,
  resendActivationMailController,
  updateUserMissingDataController,
  verifyRegistrationTokenController,
};
