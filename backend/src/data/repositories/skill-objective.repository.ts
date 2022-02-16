import { EntityRepository, Repository } from 'typeorm';
import { SkillObjective } from '../entities/skill-objective';

@EntityRepository(SkillObjective)
class SkillObjectiveRepository extends Repository<SkillObjective> {}

export default SkillObjectiveRepository;
