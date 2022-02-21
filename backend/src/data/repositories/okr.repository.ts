import { EntityRepository, Repository } from 'typeorm';
import { OKR } from '../entities/okr';

@EntityRepository(OKR)
class OkrRepository extends Repository<OKR> {
  getAllByUserId(): Promise<OKR[]> {
    return this.createQueryBuilder('okr')
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
      .getMany();
  }

  getOneByUserId(): Promise<OKR> {
    return this.createQueryBuilder('okr')
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
  }
}

export default OkrRepository;
