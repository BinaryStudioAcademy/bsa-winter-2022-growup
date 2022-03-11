import { EntityRepository, Repository } from 'typeorm';
import { Education } from '../entities/education';

@EntityRepository(Education)
class EducationRepository extends Repository<Education> {
  getAllEducationsByUserId(userId: string): Promise<Education[]> {
    return this.createQueryBuilder('education')
      .select()
      .where({ user: userId })
      .getMany();
  }
}

export default EducationRepository;
