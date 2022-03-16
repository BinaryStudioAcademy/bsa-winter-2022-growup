import { getCustomRepository } from 'typeorm';
import { OKR } from '~/data/entities/okr';
import Okrepository from '~/data/repositories/okr.repository';
import ObjectiveRepository from '~/data/repositories/objective.repository';
import KeyResultRepository from '~/data/repositories/key-result.repository';
import { badRequestError } from '~/common/errors';

export const addNewKeyresultToObjective = async ({
  okrId,
  objectiveId,
  body,
}: {
  okrId: string;
  objectiveId: string;
  body: { name: string };
}): Promise<OKR> => {
  if (!body.name) throw badRequestError('Keyresult name is undefined!!!');

  const okrRepository = getCustomRepository(Okrepository);
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

  const keyResult = keyResultRepository.create();
  Object.assign(keyResult, body);
  keyResult.objective = objective;

  await keyResult.save();

  const responceOkr = okrRepository.getOneById(okrId);
  return responceOkr;
};
