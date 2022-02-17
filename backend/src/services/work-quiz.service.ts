import { getCustomRepository } from 'typeorm';
import { QuizQuestion } from '~/data/entities/quiz-question';
// import { User_QuizCategory } from '~/data/entities/user-quiz-category';
import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';
// import UserQuizCategoryRepository  from '~/data/repositories/user-quiz-category.repository';
import QuizCategoryRepository  from '~/data/repositories/quiz-category.repository';
import { asyncForEach } from '~/common/helpers/array.helper';

interface IAnswer {
  id: string;
  answer: string;
  score: number;
  isSelected: boolean;
}

interface IQuestion {
  id: string;
  question: string;
  answers: IAnswer[];
}

interface ITestSummary {
  category: string;
  score: number
}

export const getQuestions = async(): Promise<QuizQuestion[]>  => {
  const quizQuestionRepository = await getCustomRepository(QuizQuestionRepository);

  const questions = await quizQuestionRepository
                              .createQueryBuilder('root')
                              .innerJoinAndSelect('root.answers','quizAnswers')
                              .where('category.name = :name', { name: 'driver' })
                              .innerJoin('root.category','category')
                              .getMany();

  return questions;
};

export const sendResults = async(questions: IQuestion[]): Promise<void> => {

  // const userQuizCategoryRepository = await getCustomRepository(UserQuizCategoryRepository);
  const quizCategoryRepository = await getCustomRepository(QuizCategoryRepository);
  const quizQuestionRepository = await getCustomRepository(QuizQuestionRepository);

  const categories = await quizCategoryRepository.find();

  const summary: ITestSummary[] = [];

  await asyncForEach((async (category) => {
    const categorySummary: ITestSummary = { category: category.name, score: 0 };

    const categoryQuestions = await quizQuestionRepository
                                    .createQueryBuilder('root')
                                    .where('category.id = :id', { id: category.id })
                                    .innerJoinAndSelect('root.answers','quizAnswers')
                                    .innerJoin('root.category','category')
                                    .getMany();

    await asyncForEach(( async(resultQuestion) => {
      const resultAnswers = resultQuestion.answers;
      const categoryQuestion = categoryQuestions.find(q => q.question === resultQuestion.question);

      if (categoryQuestion) {
        resultAnswers.forEach(resultAnswer => {
          const categoryAnswer = categoryQuestion.answers.find(a => a.answer === resultAnswer.answer);

          if (categoryAnswer && resultAnswer.isSelected && categoryAnswer.score) {
            categorySummary.score++;
          }
        });
      }

    }), questions);

    summary.push(categorySummary);
  }), categories);

  // ADD INSERTING RESULTS INTO QuizCategory TABLE

  // const userQuizCategoryInstance = await userQuizCategoryRepository.create();
  // return userQuizCategoryInstance;
};
