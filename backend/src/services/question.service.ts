import { getCustomRepository } from 'typeorm';
import { QuizQuestion } from '~/data/entities/quiz-question';
import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';

export const getQuestions = async(): Promise<QuizQuestion[]>  => {
  const quizQuestionRepository = await getCustomRepository(QuizQuestionRepository);

  const questions = await quizQuestionRepository
                              .createQueryBuilder('root')
                              .innerJoinAndSelect('root.answers','quizAnswers')
                              .getMany();

  return questions;
};
