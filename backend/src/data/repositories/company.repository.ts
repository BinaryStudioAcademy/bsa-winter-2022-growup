import { EntityRepository, Repository } from 'typeorm';
import { Company } from '../entities/company';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {}

export default CompanyRepository;
