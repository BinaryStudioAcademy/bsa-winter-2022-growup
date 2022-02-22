import { getCustomRepository } from 'typeorm';
import { Objective } from '~/data/entities/objective';
import { OKR } from '~/data/entities/okr';
import Okrepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import { badRequestError } from '~/common/errors';

export const createObjectiveToOkr = async ({
  okrId,
  body,
}: {
  okrId: string;
  body: Objective;
}): Promise<OKR> => {
  const okrRepository = getCustomRepository(Okrepository);
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
    objective.result = 0;

    await objective.save();

    const responceOkr = okrRepository.getOneByUserId();
    return responceOkr;
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
  const okrRepository = getCustomRepository(Okrepository);
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

  if (body.id) delete body.id;
  if (body.okr) delete body.okr;
  if (body.createdAt) delete body.createdAt;
  if (body.deletedAt) delete body.deletedAt;

  Object.assign(objective, body);
  objective.updatedAt = new Date();
  await objective.save();

  const responceOkr = okrRepository.getOneByUserId();
  return responceOkr;
};
