import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';
//import { RoleType } from '~/common/enums/role-type';

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
}

export default UserRepository;
