import { EntityRepository, Repository } from 'typeorm';
import { KeyResult } from '../entities/key-result';

@EntityRepository(KeyResult)
class KeyResultRepository extends Repository<KeyResult> {}

export default KeyResultRepository;
