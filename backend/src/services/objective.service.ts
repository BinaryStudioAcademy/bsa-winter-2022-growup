import { getCustomRepository } from 'typeorm';
import { Objective } from '~/data/entities/objective';
import OkrRepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import { badRequestError } from '~/common/errors';
import { SuccessResponse } from '~/common/models/responses/success';
import { HttpCode, HttpError } from 'growup-shared';
import { KeyResult } from '~/data/entities/key-result';
import KeyResultRepository from '~/data/repositories/key-result.repository';
import { asyncForEach } from '~/common/helpers/array.helper';

interface IObjectiveKeyResults {
  objective: { name: string; result: number };
  keyResults: KeyResult[];
}

interface IObjective extends Objective {
  keyResults: KeyResult[];
}

export const createObjectiveToOkr = async (
  okrId: string,
  body: IObjectiveKeyResults,
): Promise<IObjective> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);
  const keyResultRepository = getCustomRepository(KeyResultRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const isObjectiveExist = await objectiveRepository.findOne({
    name: body.objective.name,
  });

  if (isObjectiveExist) {
    badRequestError(`Objective with name ${body.objective.name} is exist!!!`);
  }

  if (okr) {
    const objective = objectiveRepository.create({
      name: body.objective.name,
      result: body.objective.result,
      okr,
    });

    await objective.save();

    const keyResults: KeyResult[] = [];
    await asyncForEach(async ({ name, result }: KeyResult) => {
      const keyResult = keyResultRepository.create({
        name,
        result,
        objective,
      });
      await keyResult.save();

      keyResults.push(keyResult);
    }, body.keyResults);

    objective.keyResults = keyResults;

    return objective;
  }

  throw badRequestError('Okr isn`t exist!!!');
};

export const updateObjectiveById = async (
  okrId: string,
  objectiveId: string,
  body: IObjectiveKeyResults,
): Promise<IObjective> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);
  const keyResultRepository = getCustomRepository(KeyResultRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const objective = await objectiveRepository.findOne({ id: objectiveId });

  const keyResultInstance = await keyResultRepository.find({
    where: {
      objective: objectiveId,
    },
    relations: ['objective'],
  });
  for (const key of keyResultInstance) {
    await key.remove();
  }
  if (okr) {
    objective.name = body.objective.name;
    objective.result = body.objective.result;
    objective.okr = okr;

    await objective.save();

    const keyResults: KeyResult[] = [];
    await asyncForEach(async ({ name, result }: KeyResult) => {
      const keyResult = keyResultRepository.create({
        name,
        result,
        objective,
      });
      await keyResult.save();

      keyResults.push(keyResult);
    }, body.keyResults);

    objective.keyResults = keyResults;

    return objective;
  }

  throw badRequestError('Okr isn`t exist!!!');
};

export const deleteObjective = async (id: string): Promise<SuccessResponse> => {
  const objectivesRepository = getCustomRepository(ObjectiveRepository);
  const objectiveInstance = await objectivesRepository.findOne(id);

  if (!objectiveInstance)
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Objective with this id does not exist',
    });

  await objectiveInstance.remove();

  return { success: true, message: 'Objective deleted successfully' };
};
