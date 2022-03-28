import { getCustomRepository } from 'typeorm';
import OkrRepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import KeyResultRepository from '~/data/repositories/key-result.repository';
import { badRequestError } from '~/common/errors';
import { KeyResult } from '~/data/entities/key-result';
import { SuccessResponse } from '~/common/models/responses/success';
import { HttpCode, HttpError } from 'growup-shared';
import { asyncForEach } from '~/common/helpers/array.helper';

export const addNewKeyresultToObjective = async (
  okrId: string,
  objectiveId: string,
  data: KeyResult[],
): Promise<KeyResult[]> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);
  const keyResultRepository = getCustomRepository(KeyResultRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const objective = await objectiveRepository.findOne({ id: objectiveId });

  if (!okr) {
    throw badRequestError('Okr isn`t exist!!!');
  }
  if (!objective) {
    throw badRequestError('Objective isn`t exist!!!');
  }

  const keyResults: KeyResult[] = [];
  await asyncForEach(async ({ name, result }: KeyResult) => {
    const keyResult = keyResultRepository.create({
      name,
      result,
      objective,
    });
    await keyResult.save();

    keyResults.push(keyResult);
  }, data);

  return keyResults;
};

export const deleteKeyResult = async (id: string): Promise<SuccessResponse> => {
  const keyResultsRepository = getCustomRepository(KeyResultRepository);
  const KeyResultInstance = await keyResultsRepository.findOne(id);

  if (!KeyResultInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'KeyResult with this id does not exist',
    });

  await KeyResultInstance.remove();

  return { success: true, message: 'KeyResult deleted successfully' };
};
