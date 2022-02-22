import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Skill } from '../entities/skill';

@EntityRepository(Skill)
class SkillRepository extends Repository<Skill> {
  public async bulkCreate(
    data: QueryDeepPartialEntity<Skill>[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Skill)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default SkillRepository;
