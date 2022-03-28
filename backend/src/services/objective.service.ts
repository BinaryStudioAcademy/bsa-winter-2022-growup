import { getCustomRepository } from 'typeorm';
import { Objective } from '~/data/entities/objective';
import { OKR } from '~/data/entities/okr';
import OkrRepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import { badRequestError } from '~/common/errors';
import { SuccessResponse } from '~/common/models/responses/success';
import { HttpCode, HttpError } from 'growup-shared';

export const createObjectiveToOkr = async ({
  okrId,
  body,
}: {
  okrId: string;
  body: Objective;
}): Promise<Objective> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const isObjectiveExist = await objectiveRepository.findOne({
    name: body.name,
  });

  if (isObjectiveExist) {
    badRequestError(`Objective with name ${body.name} is exist!!!`);
  }

  if (okr) {
    const objective = objectiveRepository.create();
    Object.assign(objective, body);
    objective.okr = okr;
    objective.result = body.result;

    await objective.save();

    return objective;
  }

  throw badRequestError('Okr isn`t exist!!!');
};

export const updateObjectiveById = async ({
  okrId,
  objectiveId,
  body,
}: {
  okrId: string;
  objectiveId: string;
  body: Objective;
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(OkrRepository);
  const objectiveRepository = getCustomRepository(ObjectiveRepository);

  const okr = await okrRepository.findOne({ id: okrId });
  const objective = await objectiveRepository.findOne({
    id: objectiveId,
  });

  if (!okr) {
    badRequestError('Okr isn`t exist!!!');
  }
  if (!objective) {
    badRequestError('Objective isn`t exist!!!');
  }

  Object.assign(objective, body);
  objective.updatedAt = new Date();
  await objective.save();

  const responceOkr = okrRepository.getOneById(okrId);
  return responceOkr;
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
