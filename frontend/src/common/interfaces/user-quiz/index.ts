export interface IQuizAnswer {
  id: string;
  answer: string;
}

export interface IQuestion {
  id: string;
  question: string;
  answers: IQuizAnswer[];
}

export interface IQuizCategory {
  id: string;
  name: string;
  questions: IQuestion[];
}

export interface IUserQuizCategory {
  userId: string;
  quizCategoryId: string;
  score: number;
}
