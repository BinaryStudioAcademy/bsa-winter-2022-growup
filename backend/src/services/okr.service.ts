import { getCustomRepository } from 'typeorm';
import { OKR } from '~/data/entities/okr';
import { Objective } from '~/data/entities/objective';
import Okrepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import { badRequestError } from '~/common/errors';

export const getAllOkr = async (userId: string): Promise<OKR[]> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });

  if (user) {
    const okrs = okrRepository.find({ where: { user: user.id } });
    return okrs;
  }

  throw badRequestError('User isn`t exist!!!');
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
    if (data.createdAt) delete data.createdAt;
    if (data.deletedAt) delete data.deletedAt;
    if (data.objectives) delete data.objectives;
    if (data.user) delete data.user;

    Object.assign(okr, data);
    okr.updatedAt = new Date();
    okr.save();
    return okr;
  }

  throw badRequestError('Okr isn`t exist!!!');
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
  if (!body.name) throw badRequestError('Objective name is undefined!!!');

  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const isObjectiveExist = await objectiveRepository.findOne({
    name: body.name,
  });

  if (isObjectiveExist)
    badRequestError(`Objective with name ${body.name} is exist!!!`);

  if (okr) {
    const objective = objectiveRepository.create();
    Object.assign(objective, body);
    objective.okr = okr;
    objective.result = 0;

    await objective.save();

    return objective;
  }

  throw badRequestError('Okr isn`t exist!!!');
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

  if (!okr) badRequestError('Okr isn`t exist!!!');
  if (!objective) badRequestError('Objective isn`t exist!!!');

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
