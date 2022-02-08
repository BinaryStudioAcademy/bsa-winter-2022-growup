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

import type {
  UserLoginForm,
  UserRegisterForm,
} from '~/common/forms/user.forms';

export const authenticateUser = async (data: UserLoginForm): Promise<User> => {
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

  return user;
};

export const registerUser = async (data: UserRegisterForm): Promise<User> => {
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

  return user;
};

export const getUserJWT = async (user: User): Promise<string> => {
  const roleRepository = getCustomRepository(UserRoleRepository);
  const role = await roleRepository.findOne({ user });

  const token = signToken({
    userId: user.id,
    role: role.role,
  });

  return token;
};
