import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';
import { OKR } from '~/data/entities/okr';
import Okrepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';

export const createOkr = async (userId: string): Promise<{ okr: OKR }> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });

  if (user) {
    const okr = okrRepository.create();
    okr.user = user;

    await okr.save();

    return { okr };
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'User isn`t exist!!!',
  });
};
