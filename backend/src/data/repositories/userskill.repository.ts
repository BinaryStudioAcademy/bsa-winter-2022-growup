import { EntityRepository, Repository } from 'typeorm';
import { UserSkill } from '../entities/user-skill';

@EntityRepository(UserSkill)
class UserSkillRepository extends Repository<UserSkill> {}

export default UserSkillRepository;
