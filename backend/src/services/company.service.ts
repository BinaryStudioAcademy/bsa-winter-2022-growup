import { getCustomRepository } from 'typeorm';
import { Company } from '~/data/entities/company';

import CompanyRepository from '~/data/repositories/company.repository';
import WorkQuizRepository from '~/data/repositories/work-quiz.repository';
import QuizCategoryRepository from '~/data/repositories/quiz-category.repository';
import QuizAnswerRepository from '~/data/repositories/quiz-answer.repository';

import { asyncForEach } from '~/common/helpers/array.helper';

interface IAnswer {
  id: number;
  answer: string;
}

interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
}

interface ICategory {
  name: string;
  questions: IQuestion[];
}

import styleQuizJSON from '~/data/local/style-quiz.json';
import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';

export const createCompany = async(data: Company): Promise<Company> => {
  const companyRepository = await getCustomRepository(CompanyRepository);

  // Create company
  const companyInstance = await companyRepository.create({ name: data.name });
  const company = await companyInstance.save();

  // Create Work Quiz
  const workQuizRepository = await getCustomRepository(WorkQuizRepository);
  const workQuizInstance = await workQuizRepository.create({ company });
  const workQuiz = await workQuizInstance.save();

  // Get json of Q/A
  const styleCategory: ICategory  =  styleQuizJSON;

  // Create and set Category
  const quizCategoryRepository = await getCustomRepository(QuizCategoryRepository);
  const quizCategoryInstance = await quizCategoryRepository.create({
    name: styleCategory.name,
    quiz: workQuiz,
  });
  const quizCategory = await quizCategoryInstance.save();

  // Create and set Questions
  const quizQuestions = styleCategory.questions;
  const quizQuestionRepository = await getCustomRepository(QuizQuestionRepository);
  const quizAnswerRepository = await getCustomRepository(QuizAnswerRepository);

  await asyncForEach(async (question) => {
    const quizQuestionInstance = await quizQuestionRepository.create({
      question: question.question,
      category: quizCategory,
    });

    await quizQuestionInstance.save();
  }, quizQuestions);

  // Find created Questions and set Answers for each one / Would be better do it inside of prev loop
  const questions = await quizQuestionRepository.find({ category: quizCategory });

  questions.forEach( async (question) => {
    const quizCurrentQuestion: IQuestion = styleCategory.questions.find(q => q.question === question.question);
    const quizCurrentAnswer: IAnswer[] = quizCurrentQuestion.answers;

    await asyncForEach( async (answer) => {
      const quizAnswerInstance = await quizAnswerRepository.create({
        answer: answer.answer,
        score: '0',
        question,
      });
      await quizAnswerInstance.save();
    }, quizCurrentAnswer);
  });

  return company;
};
