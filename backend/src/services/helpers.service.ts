import { OKR } from '~/data/entities/okr';
import Okrepository from '~/data/repositories/okr.repository';

export const getOkrWithAllItems = (
  okrRepository: Okrepository,
): Promise<OKR> => {
  const responceOkr = okrRepository
    .createQueryBuilder('okr')
    .leftJoinAndSelect('okr.objectives', 'objective', 'okr.id = objective.okr')
    .leftJoinAndSelect(
      'objective.keyResults',
      'keyresult',
      'objective.id = keyresult.objective',
    )
    .getOne();
  return responceOkr;
};
