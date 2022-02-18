import { EntityRepository, Repository } from 'typeorm';
import { WorkQuiz } from '../entities/work-quiz';

@EntityRepository(WorkQuiz)
class WorkQuizRepository extends Repository<WorkQuiz> {}

export default WorkQuizRepository;
