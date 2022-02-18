import { EntityRepository, Repository } from 'typeorm';
import { QuizCategory } from '../entities/quiz-category';

@EntityRepository(QuizCategory)
class QuizCategoryRepository extends Repository<QuizCategory> {}

export default QuizCategoryRepository;
