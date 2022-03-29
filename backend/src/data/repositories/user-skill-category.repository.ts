import { EntityRepository, Repository } from 'typeorm';
import { UserSkillCategory } from '../entities/user-skill-category';

@EntityRepository(UserSkillCategory)
class UserSkillCategoryRepository extends Repository<UserSkillCategory> {}

export default UserSkillCategoryRepository;
