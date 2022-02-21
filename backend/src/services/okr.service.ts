import { getCustomRepository } from 'typeorm';
import { OKR } from '~/data/entities/okr';
import Okrepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import { getOkrWithAllItems } from './helpers.service';

export const getAllOkr = async (userId: string): Promise<OKR[]> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });

  if (user) {
    const okrs = okrRepository
      .createQueryBuilder('okr')
      .leftJoinAndSelect(
        'okr.objectives',
        'objective',
        'okr.id = objective.okr',
      )
      .leftJoinAndSelect(
        'objective.keyResults',
        'keyresult',
        'objective.id = keyresult.objective',
      )
      .getMany();
    return okrs;
  }

  throw badRequestError('User isn`t exist!!!');
};

export const getOkrById = async (okrId: string): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);

  const okr = await okrRepository.findOne({ id: okrId });

  if (okr) {
    const okr = getOkrWithAllItems(okrRepository);
    return okr;
  }

  throw badRequestError('Okr isn`t exist!!!');
};

export const createOkr = async ({
  userId,
  body,
}: {
  userId: string;
  body: {
    name: string;
    endDate: string;
    startDate: string;
  };
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  if (!body.name) throw badRequestError('Okr name is undefined!!!');
  if (!body.startDate) throw badRequestError('Okr startDate is undefined!!!');
  if (!body.endDate) badRequestError('Okr endDate is undefined!!!');

  const user = await userRepository.findOne({ id: userId });
  const isOkrExist = await okrRepository.findOne({ name: body.name });

  if (isOkrExist) badRequestError(`Okr with name ${body.name} is exist!!!`);

  if (user) {
    const okr = okrRepository.create();
    Object.assign(okr, body);
    okr.user = user;

    await okr.save();
    return okr;
  }

  throw badRequestError('User isn`t exist!!!');
};

export const updateOkrById = async ({
  okrId,
  data,
}: {
  okrId: string;
  data: OKR;
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);
  const okr = await okrRepository.findOne({ id: okrId });

  if (okr) {
    if (data.id) delete data.id;
    if (data.user) delete data.user;
    if (data.createdAt) delete data.createdAt;
    if (data.deletedAt) delete data.deletedAt;

    Object.assign(okr, data);
    okr.updatedAt = new Date();
    await okr.save();

    const responceOkr = getOkrWithAllItems(okrRepository);
    return responceOkr;
  }

  throw badRequestError('Okr isn`t exist!!!');
};
