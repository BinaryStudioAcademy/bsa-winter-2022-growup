import { EntityRepository, Repository } from 'typeorm';
import { Opportunity } from '../entities/opportunity';

@EntityRepository(Opportunity)
class OpportunitiesRepository extends Repository<Opportunity> {}

export default OpportunitiesRepository;
