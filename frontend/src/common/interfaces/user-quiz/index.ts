export interface IAnswer {
  id: string;
  answer: string;
  score: number;
  isSelected: boolean;
}

export interface IQuestion {
  id: string;
  question: string;
  answers: IAnswer[];
}

export interface ICategory {
  id: string;
  name: string;
  questions: IQuestion[];
}

export interface IUserQuizCategory {
  userId: string;
  quizCategoryId: string;
  score: number;
}
