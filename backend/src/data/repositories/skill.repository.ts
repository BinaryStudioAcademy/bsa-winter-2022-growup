import { EntityRepository, Repository } from 'typeorm';
import { Skill } from '../entities/skill';

@EntityRepository(Skill)
class SkillRepository extends Repository<Skill> {}

export default SkillRepository;
