import { getCustomRepository } from 'typeorm';
import { OKR } from '~/data/entities/okr';
import OkrRepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';
import { badRequestError } from '~/common/errors';
import { SuccessResponse } from '~/common/models/responses/success';
import { HttpCode, HttpError } from 'growup-shared';

export const getAllOkr = async (userId: string): Promise<OKR[]> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const okrs = okrRepository.getAllByUserId(userId);
  return okrs;
};

export const getOkrById = async (okrId: string): Promise<OKR> => {
  const okrRepository = getCustomRepository(OkrRepository);

  const okr = await okrRepository.getOneById(okrId);

  if (okr) {
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
  const okrRepository = getCustomRepository(OkrRepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });
  const isOkrExist = await okrRepository.findOne({ name: body.name });

  if (isOkrExist) {
    throw badRequestError(`Okr with name ${body.name} is exist!!!`);
  }

  const okr = okrRepository.create();
  Object.assign(okr, body);
  okr.user = user;

  await okr.save();
  return okr;
};

export const updateOkrById = async ({
  okrId,
  data,
}: {
  okrId: string;
  data: OKR;
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const okr = await okrRepository.findOne({ id: okrId });

  if (okr) {
    Object.assign(okr, data);
    okr.updatedAt = new Date();
    await okr.save();

    return okr;
  }

  throw badRequestError('Okr isn`t exist!!!');
};

export const deleteOKR = async (id: string): Promise<SuccessResponse> => {
  const okrsRepository = getCustomRepository(OkrRepository);
  const okrInstance = await okrsRepository.findOne(id);

  if (!okrInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Okr with this id does not exist',
    });

  await okrInstance.remove();

  return { success: true, message: 'Okr deleted successfully' };
};
