import { getCustomRepository } from 'typeorm';

import { QuizAnswer } from '~/data/entities/quiz-answer';

import QuizAnswerRepository from '~/data/repositories/quiz-answer.repository';

export const getAnswers = async (): Promise<QuizAnswer[]> => {
  const quizAnswerRepository = await getCustomRepository(QuizAnswerRepository);
  const answers = await quizAnswerRepository.find();

  return answers;
};
