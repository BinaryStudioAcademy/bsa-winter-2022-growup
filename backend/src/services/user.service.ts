import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getCustomRepository } from 'typeorm';

import UserRepository from '../data/repositories/user.repository';
import { User } from '../data/entities/user';

import type {
  UserLoginForm,
  UserRegisterForm,
} from '~/common/forms/user.forms';

export const authenticateUser = async (data: UserLoginForm): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({
    email: data.email,
  });

  if (!user) return null;

  // Copmares hashed password and entered by user
  // If they do not match, return null
  const isPasswordMatch = await bcrypt.compare(data.password, user.password);
  if (!isPasswordMatch) return null;

  return user;
};

export const registerUser = async (data: UserRegisterForm): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  // Check if user with this email already exists
  // If it does, return null
  const targetUser = await userRepository.findOne({
    email: data.email,
  });

  if (targetUser) return null;

  const salt = 10;
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const userInstance = userRepository.create({
    ...data,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });

  const user = await userInstance.save();
  // await createRole(user, RoleType.Admin);

  return user;
};

export const getUserJWT = (user: User): string => {
  const token = jwt.sign(
    {
      userId: user.id,
      // companyId: user.companyId,
      // role: user.role,
    },
    process.env.APP_SECRET,
    {
      expiresIn: '1d',
    },
  );

  return token;
};
