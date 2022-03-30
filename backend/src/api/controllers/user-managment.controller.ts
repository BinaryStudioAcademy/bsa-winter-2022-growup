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
import { getCategoriesByLevel } from '~/services/skill-category.service';
import { getUrl, sendMail } from '~/services/mail.service';

import { User } from '~/data/entities/user';

import { createDefaultUser } from '~/common/utils/default-user.util';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { convertForUserList } from '~/common/utils/user.util';
import { IListUser, ShortUser } from '~/common/models/user/user';
import { toShortUser } from '~/common/mappers/user.mapper';
import { SuccessResponse } from '~/common/models/responses/success';
import { env } from '~/config/env';
import { getLevelById } from '~/services/domain-level.service';
import { createUserSkillCategories } from '~/services/user-skill-category.service';
import { getCustomRepository } from 'typeorm';
import UserRepository from '~/data/repositories/user.repository';

type RegistrationUserProps = Pick<User, 'email' | 'role' | 'position'> & {
  levelId: User['level']['id'];
  company: User['company']['id'];
};

type ResendingProps = Pick<User, 'id'>;

const registerUserController = async ({
  email,
  role,
  company,
  levelId,
  position,
}: RegistrationUserProps): Promise<IListUser> => {
  let level = null;

  if (levelId) {
    level = await getLevelById(levelId);
  }
  const newUser = await registerUser(
    createDefaultUser(email, level, position || null),
    role,
    company,
  );
  const token = await createRegistrationToken(newUser);
  await sendMail(env.app.url, newUser.email, token.value);
  return convertForUserList(newUser);
};

const resendActivationMailController = async ({
  id,
}: ResendingProps): Promise<SuccessResponse> => {
  const user = await fetchUser(id);
  const token = await createRegistrationToken(user);
  await sendMail(env.app.url, user.email, token.value);

  return { success: true, message: 'Email was resent successfully' };
};

const getActionMailUrl = async ({
  id,
}: ResendingProps): Promise<{ url: string }> => {
  const token = await getRegistrationToken(id);
  const url = getUrl(env.app.url, token.value);
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
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(id);

  if (user.level) {
    const skillsCategories = await getCategoriesByLevel(user.level);
    await createUserSkillCategories(user, skillsCategories);
  }

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
