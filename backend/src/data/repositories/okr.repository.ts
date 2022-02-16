import { EntityRepository, Repository } from 'typeorm';
import { OKR } from '../entities/okr';

@EntityRepository(OKR)
class OkrRepository extends Repository<OKR> {}

export default OkrRepository;
