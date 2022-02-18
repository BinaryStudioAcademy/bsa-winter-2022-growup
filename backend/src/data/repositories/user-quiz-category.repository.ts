import { EntityRepository, Repository } from 'typeorm';
import { User_QuizCategory } from '../entities/user-quiz-category';

@EntityRepository(User_QuizCategory)
class User_QuizCategoryRepository extends Repository<User_QuizCategory> {}

export default User_QuizCategoryRepository;
