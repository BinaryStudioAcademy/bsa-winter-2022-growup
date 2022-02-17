import { getCustomRepository } from 'typeorm';
import { HttpCode, HttpError } from 'growup-shared';
import { KeyResult } from '~/data/entities/key-result';
import Okrepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import KeyResultRepository from '~/data/repositories/key-result.repository';

export const addNewKeyresultToObjective = async ({
  okrId,
  objectiveId,
  body,
}: {
  okrId: string;
  objectiveId: string;
  body: { name: string };
}): Promise<KeyResult> => {
  const okrRepository = getCustomRepository(Okrepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);
  const keyResultRepository = getCustomRepository(KeyResultRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const objective = await objectiveRepository.findOne({ id: objectiveId });

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

  const keyResult = keyResultRepository.create();
  Object.assign(keyResult, body);
  keyResult.objective = objective;

  await keyResult.save();

  return keyResult;
};
