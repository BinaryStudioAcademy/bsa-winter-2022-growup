import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';
import { OKR } from '~/data/entities/okr';
import { Objective } from '~/data/entities/objective';
import Okrepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';

export const getAllOkr = async (userId: string): Promise<OKR[]> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });

  if (user) {
    const okrs = okrRepository.find({ where: { user: user.id } });
    return okrs;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'User isn`t exist!!!',
  });
};

export const getOkrById = async (okrId: string): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);

  const okr = await okrRepository.findOne({ id: okrId });

  if (okr) {
    const okr = okrRepository
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
      .getOne();
    return okr;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Okr isn`t exist!!!',
  });
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

  const user = await userRepository.findOne({ id: userId });
  const isOkrExist = await okrRepository.findOne({ name: body.name });

  if (isOkrExist) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: `Okr with name ${body.name} is exist!!!`,
    });
  }

  if (user) {
    const okr = okrRepository.create();
    Object.assign(okr, body);
    okr.user = user;

    await okr.save();
    return okr;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'User isn`t exist!!!',
  });
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
    if (data.createdAt) delete data.createdAt;
    if (data.deletedAt) delete data.deletedAt;
    if (data.objectives) delete data.objectives;
    if (data.user) delete data.user;

    Object.assign(okr, data);
    okr.updatedAt = new Date();
    okr.save();
    return okr;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Okr isn`t exist!!!',
  });
};

export const addNewObjectiveToOkr = async ({
  okrId,
  body,
}: {
  okrId: string;
  body: {
    name: string;
    skillObjective?: string;
  };
}): Promise<Objective> => {
  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const isObjectiveExist = await objectiveRepository.findOne({
    name: body.name,
  });

  if (isObjectiveExist) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: `Objective with name ${body.name} is exist!!!`,
    });
  }

  if (okr) {
    const objective = objectiveRepository.create();
    Object.assign(objective, body);
    objective.okr = okr;
    objective.result = 0;

    await objective.save();

    return objective;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Okr isn`t exist!!!',
  });
};

export const updateObjectiveById = async ({
  okrId,
  objectiveId,
  data,
}: {
  okrId: string;
  objectiveId: string;
  data: Objective;
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const objective = await objectiveRepository.findOne({
    id: objectiveId,
  });

  if (!okr) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Okr isn`t exist!!!',
    });
  }

  if (!objective) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Objective isn`t exist!!!',
    });
  }

  if (data.id) delete data.id;
  if (data.okr) delete data.okr;
  if (data.createdAt) delete data.createdAt;
  if (data.deletedAt) delete data.deletedAt;
  if (data.keyResults) delete data.keyResults;

  Object.assign(objective, data);
  objective.updatedAt = new Date();
  objective.save();
  return okr;
};
