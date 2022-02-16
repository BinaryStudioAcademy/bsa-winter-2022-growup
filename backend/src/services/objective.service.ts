import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';
import { Objective } from '~/data/entities/objective';
import Okrepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';

export const addNewKeyresultToObjective = async ({
  okrId,
  objectiveId,
  result,
}: {
  okrId: string;
  objectiveId: string;
  result: string;
}): Promise<Objective> => {
  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });

  if (!okr) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Okr isn`t exist!!!',
    });
  }

  const objective = await objectiveRepository.findOne({ id: objectiveId });

  if (objective) {
    objective.result = result;

    await objective.save();

    return objective;
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Objective isn`t exist!!!',
  });
};
