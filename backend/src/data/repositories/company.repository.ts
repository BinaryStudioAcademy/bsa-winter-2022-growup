import { EntityRepository, Repository } from 'typeorm';
import { Company } from '../entities/company';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {
  getAllCompaniesByUserId(userId: string): Promise<Company[]> {
    return this.createQueryBuilder('company')
      .select()
      .leftJoin('company.users', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }
}

export default CompanyRepository;
