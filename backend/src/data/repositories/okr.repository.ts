import { EntityRepository, Repository } from 'typeorm';
import { OKR } from '../entities/okr';

@EntityRepository(OKR)
class OkrRepository extends Repository<OKR> {
  getAllByUserId(userId: string): Promise<OKR[]> {
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
      .where({ user: userId })
      .getMany();
  }

  getOneById(okrId: string): Promise<OKR> {
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
      .where('okr.id = :id', { id: okrId })
      .getOne();
  }
}

export default OkrRepository;
