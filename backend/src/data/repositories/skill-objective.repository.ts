import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { SkillObjective } from '../entities/skill-objective';

@EntityRepository(SkillObjective)
class SkillObjectiveRepository extends Repository<SkillObjective> {
  public async bulkCreate(
    data: QueryDeepPartialEntity<SkillObjective>[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(SkillObjective)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default SkillObjectiveRepository;
