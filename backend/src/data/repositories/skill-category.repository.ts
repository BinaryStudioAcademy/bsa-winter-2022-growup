import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { SkillCategory } from '../entities/skill-category';

@EntityRepository(SkillCategory)
class SkillCategoryRepository extends Repository<SkillCategory> {
  public async bulkCreate(
    data: QueryDeepPartialEntity<SkillCategory>[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(SkillCategory)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default SkillCategoryRepository;
