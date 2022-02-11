import { getCustomRepository } from 'typeorm';
import UserRepository from '~/data/repositories/user.repository';

import { User } from '~/data/entities/user';

export const updateUserAvatar = async (
  id: User['id'],
  url: string,
): Promise<User> => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);
  user.avatar = url;
  await user.save();

  return user;
};
