import { EntityRepository, Repository } from 'typeorm';
import { Domain } from '../entities/domain';

@EntityRepository(Domain)
class DomainRepository extends Repository<Domain> {}

export default DomainRepository;
