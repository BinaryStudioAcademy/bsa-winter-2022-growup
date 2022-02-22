import { FindManyOptions, getCustomRepository } from 'typeorm';
import { QuizQuestion } from '~/data/entities/quiz-question';
import { QuizCategory } from '~/data/entities/quiz-category';
import { User_QuizCategory } from '~/data/entities/user-quiz-category';

import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';
import UserQuizCategoryRepository from '~/data/repositories/user-quiz-category.repository';
import QuizCategoryRepository from '~/data/repositories/quiz-category.repository';
import UserRepository from '~/data/repositories/user.repository';

import { asyncForEach } from '~/common/helpers/array.helper';
import { ITokenPayload } from '~/common/models/middlewares/token-payload';

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
  category: QuizCategory;
  score: number;
}

interface WorkQuizProps {
  body: IQuestion[];
  tokenPayload: ITokenPayload;
}

export const getQuestions = async (): Promise<QuizQuestion[]> => {
  const quizQuestionRepository = await getCustomRepository(
    QuizQuestionRepository,
  );

  const questions = await quizQuestionRepository
    .createQueryBuilder('root')
    .innerJoinAndSelect('root.answers', 'quizAnswers')
    .where('category.name = :name', { name: 'driver' })
    .innerJoin('root.category', 'category')
    .getMany();

  return questions;
};

export const sendResults = async ({
  body,
  tokenPayload,
}: WorkQuizProps): Promise<User_QuizCategory[]> => {
  const { userId } = tokenPayload;
  const questions = body;

  const userQuizCategoryRepository = await getCustomRepository(
    UserQuizCategoryRepository,
  );
  const quizCategoryRepository = await getCustomRepository(
    QuizCategoryRepository,
  );
  const quizQuestionRepository = await getCustomRepository(
    QuizQuestionRepository,
  );

  const categories = await quizCategoryRepository.find();

  const summary: ITestSummary[] = [];

  await asyncForEach(async (category) => {
    const categorySummary: ITestSummary = { category: category, score: 0 };

    const categoryQuestions = await quizQuestionRepository
      .createQueryBuilder('root')
      .where('category.id = :id', { id: category.id })
      .innerJoinAndSelect('root.answers', 'quizAnswers')
      .innerJoin('root.category', 'category')
      .getMany();

    await asyncForEach(async (resultQuestion) => {
      const resultAnswers = resultQuestion.answers;
      const categoryQuestion = await categoryQuestions.find(
        (q) => q.question === resultQuestion.question,
      );

      if (categoryQuestion) {
        resultAnswers.forEach((resultAnswer) => {
          const categoryAnswer = categoryQuestion.answers.find(
            (a) => a.answer === resultAnswer.answer,
          );

          if (
            categoryAnswer &&
            resultAnswer.isSelected &&
            categoryAnswer.score
          ) {
            categorySummary.score++;
          }
        });
      }
    }, questions);

    summary.push(categorySummary);
  }, categories);

  const userRepository = await getCustomRepository(UserRepository);

  const userInstance = await userRepository.findOne({ id: userId });

  await asyncForEach(async (summ) => {
    const userQuizCategoryInstance = await userQuizCategoryRepository.create({
      user: userInstance,
      quizCategory: summ.category,
      score: summ.score.toString(),
    });

    await userQuizCategoryInstance.save();
  }, summary);

  const userResults: User_QuizCategory[] =
    await userQuizCategoryRepository.find({
      user: userInstance,
      relations: ['quizCategory'],
    } as FindManyOptions);

  return userResults;
};
