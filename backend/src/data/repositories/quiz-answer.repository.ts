import { EntityRepository, Repository } from 'typeorm';
import { QuizAnswer } from '../entities/quiz-answer';

@EntityRepository(QuizAnswer)
class QuizAnswerRepository extends Repository<QuizAnswer> {}

export default QuizAnswerRepository;
