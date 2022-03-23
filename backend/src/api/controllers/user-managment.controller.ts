import { getCustomRepository } from 'typeorm';
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

import { User } from '~/data/entities/user';

import { createDefaultUser } from '~/common/utils/default-user.util';
import { RoleType } from '~/common/enums/role-type';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { convertForUserList } from '~/common/utils/user.util';
import { IListUser, ShortUser } from '~/common/models/user/user';
import { toShortUser } from '~/common/mappers/user.mapper';
import { badRequestError } from '~/common/errors';
import UserRepository from '~/data/repositories/user.repository';

type RegistrationUserProps = {
  host: string;
  origin: string;
  email: string;
  roleType: RoleType;
  userId: string;
};

const registerUserController = async ({
  host,
  origin,
  email,
  roleType,
  userId,
}: RegistrationUserProps): Promise<IListUser> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.geUserById(userId);

  if (!user.company) {
    throw badRequestError('User doesn`t create company!!!');
  }

  const newUser = await registerUser(
    createDefaultUser(email),
    roleType,
    user.company.id,
  );

  const token = await createRegistrationToken(newUser);
  await sendMail(host, origin, newUser.email, token.value);
  return convertForUserList(newUser, newUser.role[0]);
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
