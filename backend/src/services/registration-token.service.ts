import { getCustomRepository } from 'typeorm';

import RegistrationTokenRepository from '~/data/repositories/registration-token.repository';
import { RegistrationToken } from '~/data/entities/registration-token';

import { generateToken } from '~/common/utils/registration-token.util';
import { User } from '~/data/entities/user';
import { HttpCode, HttpError } from 'growup-shared';

const createRegistrationToken = async (
  user: User,
): Promise<RegistrationToken> => {
  const tokenRepository = getCustomRepository(RegistrationTokenRepository);

  const target = await tokenRepository.findOne({ user });
  if (target) return target;

  const token = generateToken();
  const registrationToken = await tokenRepository
    .create({ value: token, user })
    .save();

  return registrationToken;
};

const getRegistrationToken = async (
  id: User['id'],
): Promise<RegistrationToken> => {
  const tokenRepository = getCustomRepository(RegistrationTokenRepository);

  const token = await tokenRepository.findOne({
    relations: ['user'],
    where: { user: { id } },
  });

  if (!token)
    throw new HttpError({ status: HttpCode.NOT_FOUND, message: 'Not found' });

  return token;
};

const verifyRegistrationToken = async (token: string): Promise<User> => {
  const tokenRepository = getCustomRepository(RegistrationTokenRepository);

  const tokenInstance = await tokenRepository.findOne({
    relations: ['user', 'user.company'],
    where: { value: token },
  });

  if (!tokenInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Invalid registration token',
    });
  return tokenInstance.user;
};

const deleteRegistrationToken = async (id: User['id']): Promise<void> => {
  const tokenRepository = getCustomRepository(RegistrationTokenRepository);
  const tokenInstance = await tokenRepository.findOne({
    relations: ['user'],
    where: { user: { id } },
  });

  if (!tokenInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Invalid registration token',
    });

  await tokenInstance.remove();
};

export {
  getRegistrationToken,
  createRegistrationToken,
  verifyRegistrationToken,
  deleteRegistrationToken,
};
