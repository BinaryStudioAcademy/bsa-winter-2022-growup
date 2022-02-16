import { EntityRepository, Repository } from 'typeorm';
import { SkillCategory } from '../entities/skill-category';

@EntityRepository(SkillCategory)
class SkillCategoryRepository extends Repository<SkillCategory> {}

export default SkillCategoryRepository;
