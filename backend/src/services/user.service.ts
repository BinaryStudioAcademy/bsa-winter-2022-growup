import { getCustomRepository } from 'typeorm';

import { HttpCode, HttpError } from 'growup-shared';

import UserRepository from '~/data/repositories/user.repository';
import UserRoleRepository from '~/data/repositories/role.repository';
import CompanyRepository from '~/data/repositories/company.repository';
import RefreshTokenRepository from '~/data/repositories/refresh-token.repository';

import { refreshTokenSchema } from '~/common/models/tokens/refresh-token.model';
import { IListUser } from '~/common/models/user/user';
import { RoleType } from '~/common/enums/role-type';

import { UserMissingDataForm } from '~/common/forms/user.forms';

import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';

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

type TokenResponse = {
  token: string;
};

type RefreshTokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export const getUserJWT = async (
  user: User,
  role?: UserRole,
): Promise<TokenResponse> => {
  let roleInstance: UserRole = role;

  if (!role) {
    const roleRepository = getCustomRepository(UserRoleRepository);
    roleInstance = await roleRepository.findOne({ user });
  }

  const token = signToken({
    userId: user.id,
    role: roleInstance.role,
    companyId: user.company ? user.company.id : null,
  });

  return { token };
};

export const registerUser = async (
  data: UserRegisterForm,
  role: RoleType,
  companyId: User['company']['id'],
): Promise<User> => {
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

  const hashedPassword = data.password
    ? await hashPassword(data.password)
    : null;
  const company = await companyRepository.findOne(companyId);

  const user = await userRepository
    .create({
      ...data,
      password: hashedPassword,
      company,
      careerJourneys: [],
      educations: [],
    })
    .save();

  const roleInstance = await roleRepository.create({ user, role }).save();
  user.role = [roleInstance];

  return user;
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

export const getCommonUserList = async (
  companyId: User['company']['id'],
): Promise<IListUser[]> => {
  const userRepository = getCustomRepository(UserRepository);

  const usersList = await userRepository.getUsersByCompamyId(companyId);

  const list = usersList.map((user) => {
    const roles = user.role.reduce((roles, role) => {
      roles.push(role.role);
      return roles;
    }, []);

    delete user.role;

    return {
      ...user,
      roleType: roles,
    };
  });
  return list as unknown as IListUser[];
};

export const registerUserAdmin = async (
  data: UserRegisterForm,
  companyId: User['company']['id'],
): Promise<TokenResponse> => {
  const user = await registerUser(data, RoleType.ADMIN, companyId);
  return getUserJWT(user);
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
