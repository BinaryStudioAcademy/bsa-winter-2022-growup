// import { UploadedFile } from 'express-fileupload';
import { getCustomRepository } from 'typeorm';

import { RoleType, HttpCode, HttpError } from 'growup-shared';

import UserRepository from '../data/repositories/user.repository';
import UserRoleRepository from '~/data/repositories/role.repository';

import { User } from '../data/entities/user';

import {
  comparePasswords,
  hashPassword,
} from '~/common/utils/password-hasher.util';
import { signToken } from '~/common/utils/token.util';
import { uploadImage, deleteImage } from '~/common/utils/upload-image.util';
import { getCurrentTimeMS } from '~/common/utils/time.util';

import type {
  UserLoginForm,
  UserRegisterForm,
} from '~/common/forms/user.forms';
import { env } from '~/config/env';

type TokenResponse = {
  token: string;
};

const getUserJWT = async (user: User): Promise<TokenResponse> => {
  const roleRepository = getCustomRepository(UserRoleRepository);
  const role = await roleRepository.findOne({ user });

  const token = signToken({
    userId: user.id,
    role: role.role,
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
): Promise<TokenResponse> => {
  const userRepository = getCustomRepository(UserRepository);
  const roleRepository = getCustomRepository(UserRoleRepository);

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

  const userInstance = userRepository.create({
    ...data,
    password: hashedPassword,
  });

  const user = await userInstance.save();

  const roleInstance = roleRepository.create({ user, role: RoleType.Admin });
  await roleInstance.save();

  return getUserJWT(user);
};

export const fetchUser = async (id: User['id']): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);
  const user = await userRepository.findOne(id);
  return user;
};

export const updateUserAvatar = async (
  id: User['id'],
  file: Express.Multer.File,
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);
  const props = {
    secret: env.aws.secret,
    access: env.aws.access,
    bucketName: env.aws.bucket,
  };

  if (user.avatar)
    await deleteImage({ ...props, fileName: user.avatar.split('/').at(-1) });

  const avatar = await uploadImage({
    ...props,
    file: {
      ...file,
      filename: `${getCurrentTimeMS()}-${file.filename}`,
    },
  });

  user.avatar = avatar.Location;

  await user.save();

  return user;
};
