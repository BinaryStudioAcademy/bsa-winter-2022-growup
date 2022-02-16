import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';
import { OKR } from '~/data/entities/okr';
import { Objective } from '~/data/entities/objective';
import Okrepository from '~/data/repositories/okr.repository';
import UserRepository from '~/data/repositories/user.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';

export const createOkr = async (userId: string): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne({ id: userId });

  if (user) {
    const okr = okrRepository.create();
    okr.user = user;

    await okr.save();

    return okr;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'User isn`t exist!!!',
  });
};

export const addNewObjectiveToOkr = async (
  okrId: string,
): Promise<Objective> => {
  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });

  if (okr) {
    const objective = objectiveRepository.create();
    objective.okr = okr;
    objective.result = '';

    objective.save();

    const newObjectives = [...okr.objectives];
    newObjectives.push(objective);
    okr.objectives = newObjectives;

    await okr.save();

    return objective;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Okr isn`t exist!!!',
  });
};
