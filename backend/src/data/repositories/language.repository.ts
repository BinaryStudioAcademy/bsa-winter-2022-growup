import { EntityRepository, InsertResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Language } from '../entities/language';

@EntityRepository(Language)
class LanguageRepository extends Repository<Language> {
  public async bulkCreate(
    data: QueryDeepPartialEntity<Language>[],
  ): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(Language)
      .values(data)
      .orIgnore()
      .execute();
  }
}

export default LanguageRepository;
