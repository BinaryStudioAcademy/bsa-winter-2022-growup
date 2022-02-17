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
  score: number;
}

interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
}

interface ICategory {
  id: number;
  category: string;
  questions: IQuestion[];
}

interface IQuiz {
  categories: ICategory[];
}

import styleQuizJSON from '~/data/local/style-quiz.json';
import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';
import { QuizQuestion } from '~/data/entities/quiz-question';
// import { QuizCategory } from '~/data/entities/quiz-category';

export const createCompany = async(data: Company): Promise<Company> => {
  const companyRepository = await getCustomRepository(CompanyRepository);

  // Create company
  const companyInstance = await companyRepository.create({ name: data.name });
  const company = await companyInstance.save();

  // Create Work Quiz
  const workQuizRepository = await getCustomRepository(WorkQuizRepository);
  const workQuizInstance = await workQuizRepository.create({ company });
  const workQuiz = await workQuizInstance.save();

  // Get json
  const quiz: IQuiz  =  styleQuizJSON;

  // Create and set Categories
  const quizCategoryRepository = await getCustomRepository(QuizCategoryRepository);
  await asyncForEach(async (category) => {
    const quizCategoryInstance = await quizCategoryRepository.create({
      name: category.category,
      quiz: workQuiz,
    });

    await quizCategoryInstance.save();
  }, quiz.categories);

  // Create and set Questions
  const createdQuesitons: QuizQuestion[] = [];
  const quizQuestionRepository = await getCustomRepository(QuizQuestionRepository);
  const categories = await quizCategoryRepository.find({ quiz: workQuiz });

  await asyncForEach((async (category) => {
    const quizCurrentCategory: ICategory = quiz.categories.find(c => c.category === category.name);
    const quizCurrentQuestions: IQuestion[] = quizCurrentCategory.questions;

    await asyncForEach( async (question) => {
      const quizQuestionInstance = await quizQuestionRepository.create({
        question: question.question,
        category,
      });
      const created = await quizQuestionInstance.save();
      createdQuesitons.push(created);
    }, quizCurrentQuestions);
  }), categories);

  //  Create and set Answers
  const quizAnswerRepository = await getCustomRepository(QuizAnswerRepository);

  await asyncForEach((async (category) => {
    const questions = await quizQuestionRepository.find({ category } );
    const quizCurrentCategory = quiz.categories.find(c => c.category === category.name);

    await asyncForEach((async (question) => {
        const quizCurrentQuestion: IQuestion = quizCurrentCategory.questions.find(q => q.question === question.question);
        const quizCurrentAnswer: IAnswer[] = quizCurrentQuestion.answers;

        await asyncForEach( async (answer) => {
          const quizAnswerInstance = await quizAnswerRepository.create({
            answer: answer.answer,
            score: answer.score.toString(),
            question,
          });

          await quizAnswerInstance.save();
        }, quizCurrentAnswer);
      }), questions);
  }), categories);

  return company;
};
