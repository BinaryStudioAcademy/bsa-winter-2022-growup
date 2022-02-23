import { EntityRepository, Repository } from 'typeorm';

import { DomainLevel } from '../entities/domain-level';

@EntityRepository(DomainLevel)
class DomainLevelRepository extends Repository<DomainLevel> {}

export default DomainLevelRepository;
