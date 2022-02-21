import { EntityRepository, Repository } from 'typeorm';
import { QuizQuestion } from '~/data/entities/quiz-question';

@EntityRepository(QuizQuestion)
class QuizQuestionRepository extends Repository<QuizQuestion> {}

export default QuizQuestionRepository;
