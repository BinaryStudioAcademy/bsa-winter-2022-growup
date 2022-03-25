import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';

import { badRequestError } from '~/common/errors';
import UserRepository from '~/data/repositories/user.repository';
import CompanyRepository from '~/data/repositories/company.repository';
import RefreshTokenRepository from '~/data/repositories/refresh-token.repository';
import { refreshTokenSchema } from '~/common/models/tokens/refresh-token.model';
import { IListUser } from '~/common/models/user/user';
import { RoleType } from '~/common/enums/role-type';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { User } from '~/data/entities/user';
import { Tags } from '~/data/entities/tags';
import { Education } from '~/data/entities/education';
import { CareerJourney } from '~/data/entities/career-journey';

import {
  comparePasswords,
  hashPassword,
} from '~/common/utils/password-hasher.util';
import {
  uploadImage,
  deleteImage,
  changeFileName,
} from '~/common/utils/upload-image.util';
import { getCurrentTimeMS } from '~/common/utils/time.util';
import { signToken, generateRefreshToken } from '~/common/utils/token.util';

import type {
  UserLoginForm,
  UserRegisterForm,
} from '~/common/forms/user.forms';
import { env } from '~/config/env';

import { SuccessResponse } from '~/common/models/responses/success';

type TokenResponse = {
  token: string;
};

type RefreshTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

interface IProfile {
  firstName: string;
  lastName: string;
  position: string;
  educations: Education[];
  careerJourneys: CareerJourney[];
  interests: Tags[];
}

export const getUserJWT = async (user: User): Promise<TokenResponse> => {
  const token = signToken({
    userId: user.id,
    role: user.role,
    companyId: user.company ? user.company.id : null,
  });

  return { token };
};

export const registerUser = async (
  data: UserRegisterForm,
  role: RoleType,
  companyId?: User['company']['id'],
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const companyRepository = getCustomRepository(CompanyRepository);

  // Check if user with this email already exists
  // If it does, return null
  const targetUser = await userRepository.findOne({
    email: data.email,
  });

  if (targetUser)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'User with this email already exists',
    });

  const hashedPassword = data.password
    ? await hashPassword(data.password)
    : null;

  let newData = {
    ...data,
    password: hashedPassword,
  };

  if (companyId) {
    const company = await companyRepository.findOne(companyId);
    newData = { ...newData, ...{ company } };
  }

  const user = await userRepository.create({ ...newData, role }).save();

  return user;
};

export const refreshToken = async (
  data: refreshTokenSchema,
): Promise<RefreshTokenResponse> => {
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const tokenData = await refreshTokenRepository.findOne({
    token: data.refreshToken,
  });

  if (!tokenData) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'refresh token is not valid',
    });
  }

  await refreshTokenRepository.delete({ token: tokenData.token });
  const refreshToken = generateRefreshToken({});
  const accessToken = signToken({
    userId: tokenData.user.id,
    role: tokenData.user.role,
    companyId: tokenData.user.company ? tokenData.user.company.id : null,
  });

  const storedRefreshToken = refreshTokenRepository.create({
    token: refreshToken,
    user: tokenData.user,
  });
  await storedRefreshToken.save();

  return { refreshToken, accessToken };
};

export const authenticateUser = async (data: UserLoginForm): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserWithPassword({
    email: data.email,
  });

  if (!user)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'User with this email does not exist',
    });

  // Copmares hashed password and entered by user
  // If they do not match, return null
  const isPasswordMatch = await comparePasswords(data.password, user.password);
  if (!isPasswordMatch)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Wrong password',
    });

  return user;
};

export const getCommonUserList = async (id: string): Promise<IListUser[]> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserById(id);

  if (!user.company) {
    throw badRequestError('Can not fetch users since you have no company');
  }

  const userInstances = await userRepository.getUsersByCompanyId(
    user.company.id,
  );
  const users = userInstances.map((user) => ({
    ...user,
    company: user.company.id,
  }));
  return users;
};

export const fetchUser = async (id: User['id']): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne({
    relations: ['company', 'careerJourneys', 'educations'],
    where: { id },
  });
  return user;
};

export const updateUserMissingData = async (
  id: User['id'],
  { password, firstName, lastName, position }: UserMissingDataForm,
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.getUserWithPassword({ id });

  user.password = await hashPassword(password);
  user.firstName = firstName;
  user.lastName = lastName;
  user.position = position;

  return user.save();
};

export const updateUserAvatar = async (
  id: User['id'],
  file: Express.Multer.File,
): Promise<Omit<User, 'password'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const userInstance = await userRepository.findOne(id);
  const props = {
    secret: env.aws.secret,
    access: env.aws.access,
    bucketName: env.aws.bucket,
  };

  if (userInstance.avatar)
    await deleteImage({
      ...props,
      fileName: userInstance.avatar.split('/').at(-1),
    });

  const userFile = changeFileName(
    file,
    `${getCurrentTimeMS()}-${userInstance.id}`,
  );

  const avatar = await uploadImage({ ...props, file: userFile });

  userInstance.avatar = avatar.Location;

  const { password: _password, ...user } = await userInstance.save();

  return user as User;
};

export const addProfile = async (
  data: IProfile,
  userId: string,
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const userInstance = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: ['tags'],
  });

  userInstance.tags.push(...data.interests);

  const user = Object.assign(userInstance, data);
  await user.save();

  return user;
};

export const deleteUser = async (id: User['id']): Promise<SuccessResponse> => {
  const userRepository = getCustomRepository(UserRepository);
  const userInstance = await userRepository.findOne(id);

  if (!userInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'User with this id does not exist',
    });
  await userInstance.remove();
  return { success: true, message: 'User deleted successfully' };
};

export const changeUserRole = async (
  id: User['id'],
  role: User['role'],
): Promise<Pick<User, 'id' | 'role'>> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(id);

  user.role = role;
  const userInstance = await user.save();

  return { id: userInstance.id, role: userInstance.role };
};
