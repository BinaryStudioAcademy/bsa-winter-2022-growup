import { getCustomRepository } from 'typeorm';

import { HttpCode, HttpError } from 'growup-shared';
import UserRepository from '../data/repositories/user.repository';
import UserRoleRepository from '~/data/repositories/role.repository';
import RefreshTokenRepository from '~/data/repositories/refresh-token.repository';
import { refreshTokenSchema } from '~/common/models/tokens/refresh-token.model';

import { User } from '../data/entities/user';

import {
  comparePasswords,
  hashPassword,
} from '~/common/utils/password-hasher.util';
import { uploadImage, deleteImage } from '~/common/utils/upload-image.util';
import { getCurrentTimeMS } from '~/common/utils/time.util';
import { signToken, generateRefreshToken } from '~/common/utils/token.util';

import { RoleType } from '~/common/enums/role-type';

import type {
  UserLoginForm,
  UserRegisterForm,
} from '~/common/forms/user.forms';
import { env } from '~/config/env';
import CompanyRepository from '~/data/repositories/company.repository';

type TokenResponse = {
  token: string;
};

type RefreshTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export const refreshToken = async (
  data: refreshTokenSchema,
): Promise<RefreshTokenResponse> => {
  const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
  const tokenData = await refreshTokenRepository.findOne({
    token: data.refreshToken,
  });
  const roleRepository = getCustomRepository(UserRoleRepository);
  const role = await roleRepository.findOne({ user: tokenData.user });

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
    role: role.role,
    companyId: tokenData.user.company ? tokenData.user.company.id : null,
  });

  const storedRefreshToken = refreshTokenRepository.create({
    token: refreshToken,
    user: tokenData.user,
  });
  await storedRefreshToken.save();

  return { refreshToken, accessToken };
};

const getUserJWT = async (user: User): Promise<TokenResponse> => {
  const roleRepository = getCustomRepository(UserRoleRepository);
  const role = await roleRepository.findOne({ user });

  const token = signToken({
    userId: user.id,
    role: role.role,
    companyId: user.company ? user.company.id : null,
  });

  return { token };
};

export const authenticateUser = async (
  data: UserLoginForm,
): Promise<TokenResponse> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({
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

  return getUserJWT(user);
};

export const registerUser = async (
  data: UserRegisterForm,
  role: typeof RoleType[keyof typeof RoleType],
  companyId: User['company']['id'],
): Promise<TokenResponse> => {
  const userRepository = getCustomRepository(UserRepository);
  const roleRepository = getCustomRepository(UserRoleRepository);
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

  const hashedPassword = await hashPassword(data.password);
  const company = await companyRepository.findOne(companyId);

  const userInstance = userRepository.create({
    ...data,
    password: hashedPassword,
    company,
  });

  const user = await userInstance.save();

  console.log(role);
  const roleInstance = roleRepository.create({ user, role });
  await roleInstance.save();

  return getUserJWT(user);
};

export const fetchUser = async (
  id: User['id'],
): Promise<Omit<User, 'password'>> => {
  const userRepository = getCustomRepository(UserRepository);

  const { password: _password, ...user } = await userRepository.findOne(id);
  return user as User;
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

  const avatar = await uploadImage({
    ...props,
    file: {
      ...file,
      originalname: `${getCurrentTimeMS()}-${file.originalname}`,
    },
  });

  userInstance.avatar = avatar.Location;

  const { password: _password, ...user } = await userInstance.save();

  return user as User;
};
