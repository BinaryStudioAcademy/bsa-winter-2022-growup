import { EntityRepository, Repository, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Tags } from '../entities/tags';

@EntityRepository(Tags)
class TagsRepository extends Repository<Tags> {
  public async bulkCreate(
    data: QueryDeepPartialEntity<Tags>[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Tags)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default TagsRepository;
