import { EntityRepository, ObjectLiteral, Repository } from 'typeorm';
import { User } from '../entities/user';
import { RoleType } from '~/common/enums/role-type';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  geUserById(userId: string): Promise<User> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect(
        'user.careerJourneys',
        'career_journey',
        'user.id = career_journey.user',
      )
      .leftJoinAndSelect(
        'user.educations',
        'education',
        'user.id = education.user',
      )
      .where({ id: userId })
      .getOne();
  }

  getUsersByCompamyId(companyId: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company', 'user.company = company.id')
      .leftJoinAndSelect(
        'user.careerJourneys',
        'career_journey',
        'user.id = career_journey.user',
      )
      .leftJoinAndSelect(
        'user.educations',
        'education',
        'user.id = education.user',
      )
      .leftJoinAndSelect('user.role', 'user_role', 'user.id = user_role.user')
      .where({ company: companyId })
      .andWhere('NOT user_role.role = :role', { role: RoleType.ADMIN })
      .getMany();
  }

  getUserWithPassword(where: ObjectLiteral): Promise<User> {
    return this.createQueryBuilder('user')
      .select()
      .leftJoinAndSelect(
        'user.company',
        'company',
        'user.companyId = company.id',
      )
      .addSelect('user.password')
      .where(where)
      .getOne();
  }
}

export default UserRepository;
