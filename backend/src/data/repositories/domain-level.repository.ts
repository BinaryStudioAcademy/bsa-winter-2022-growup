import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { DomainLevel } from '../entities/domain-level';

@EntityRepository(DomainLevel)
class DomainLevelRepository extends Repository<DomainLevel> {
  public async createUnique(
    data: QueryDeepPartialEntity<DomainLevel>,
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(DomainLevel)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default DomainLevelRepository;
