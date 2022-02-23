import { getCustomRepository } from 'typeorm';
import CompanyRepositry from '../data/repositories/company.repository';

import { Company } from '../data/entities/company';

import { HttpCode, HttpError } from 'growup-shared';
import { signToken } from '~/common/utils/token.util';
import {
  CompanyResponse,
  CompaniesResponse,
} from '~/common/models/responses/company';

import { ITokenPayload } from '~/common/models/middlewares/token-payload';
import { RoleType } from 'growup-shared';
import CompanyRepository from '~/data/repositories/company.repository';
import WorkQuizRepository from '~/data/repositories/work-quiz.repository';
import QuizCategoryRepository from '~/data/repositories/quiz-category.repository';
import QuizAnswerRepository from '~/data/repositories/quiz-answer.repository';

import { asyncForEach } from '~/common/helpers/array.helper';
import styleQuizJSON from '~/data/local/style-quiz.json';
import QuizQuestionRepository from '~/data/repositories/quiz-question.repository';
import { QuizQuestion } from '~/data/entities/quiz-question';

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

interface CompanyProps {
  id?: string;
  body: Company;
  tokenPayload: ITokenPayload;
}

const createQuiz = async (companyInstance: Company): Promise<void> => {
  // Create Work Quiz
  const workQuizRepository = await getCustomRepository(WorkQuizRepository);
  const workQuizInstance = await workQuizRepository.create({
    company: companyInstance,
  });
  const workQuiz = await workQuizInstance.save();

  // Get json
  const quiz: IQuiz = styleQuizJSON;

  // Create and set Categories
  const quizCategoryRepository = await getCustomRepository(
    QuizCategoryRepository,
  );
  await asyncForEach(async (category) => {
    const quizCategoryInstance = await quizCategoryRepository.create({
      name: category.category,
      quiz: workQuiz,
    });

    await quizCategoryInstance.save();
  }, quiz.categories);

  // Create and set Questions
  const createdQuesitons: QuizQuestion[] = [];
  const quizQuestionRepository = await getCustomRepository(
    QuizQuestionRepository,
  );
  const categories = await quizCategoryRepository.find({ quiz: workQuiz });

  await asyncForEach(async (category) => {
    const quizCurrentCategory: ICategory = quiz.categories.find(
      (c) => c.category === category.name,
    );
    const quizCurrentQuestions: IQuestion[] = quizCurrentCategory.questions;

    await asyncForEach(async (question) => {
      const quizQuestionInstance = await quizQuestionRepository.create({
        question: question.question,
        category,
      });
      const created = await quizQuestionInstance.save();
      createdQuesitons.push(created);
    }, quizCurrentQuestions);
  }, categories);

  //  Create and set Answers
  const quizAnswerRepository = await getCustomRepository(QuizAnswerRepository);

  await asyncForEach(async (category) => {
    const questions = await quizQuestionRepository.find({ category });
    const quizCurrentCategory = quiz.categories.find(
      (c) => c.category === category.name,
    );

    await asyncForEach(async (question) => {
      const quizCurrentQuestion: IQuestion = quizCurrentCategory.questions.find(
        (q) => q.question === question.question,
      );

      const quizCurrentAnswer: IAnswer[] = quizCurrentQuestion.answers;

      await asyncForEach(async (answer) => {
        const quizAnswerInstance = await quizAnswerRepository.create({
          answer: answer.answer,
          score: answer.score.toString(),
          question,
        });

        await quizAnswerInstance.save();
      }, quizCurrentAnswer);
    }, questions);
  }, categories);
};

export const getCompany = async (id: Company['id']): Promise<Company> => {
  const companyRepository = getCustomRepository(CompanyRepositry);
  const company = await companyRepository.findOne(id);

  return company;
};

export const getAllCompanies = async ({
  userId,
  userRole,
}: {
  userId: string;
  userRole: RoleType;
}): Promise<CompaniesResponse> => {
  const companyRepository = getCustomRepository(CompanyRepository);

  const companies = await companyRepository.getAllCompaniesByUserId(userId);

  const companyId = companies[0] ? companies[0].id : null;
  const token = signToken({
    userId,
    role: userRole,
    companyId,
  });

  return { token, companies };
};

export const createCompany = async ({
  body,
  tokenPayload,
}: CompanyProps): Promise<CompanyResponse> => {
  const { name } = body;
  const { userId, role } = tokenPayload;

  const companyRepository = getCustomRepository(CompanyRepository);

  if (name) {
    const isCompanyExist = await companyRepository.findOne({ name });

    if (!isCompanyExist) {
      const company = new Company();
      const newCompany = Object.assign(company, body);

      const companyInstance = await newCompany.save();

      await createQuiz(companyInstance);

      const token = signToken({
        userId,
        role,
        companyId: newCompany.id,
      });

      return { token, company: newCompany };
    }
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: 'Company name is exist!!!',
    });
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Company name is udefined!!!',
  });
};

export const editCompany = async ({
  id,
  body,
  tokenPayload,
}: CompanyProps): Promise<CompanyResponse> => {
  const companyRepository = getCustomRepository(CompanyRepository);
  const { userId, role } = tokenPayload;

  if (id) {
    const company = await companyRepository.findOne({ id });

    if (company) {
      const newCompany = Object.assign(company, body);

      await newCompany.save();

      const token = signToken({
        userId,
        role,
        companyId: newCompany.id,
      });

      return { token, company: newCompany };
    }

    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: 'Company not found!!!',
    });
  }

  throw new HttpError({
    status: HttpCode.BAD_REQUEST,
    message: 'Company id is udefined!!!',
  });
};
