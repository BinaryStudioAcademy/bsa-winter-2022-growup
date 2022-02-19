import { IQuestion, IUserQuizResult } from 'common/interfaces/user-quiz';

type State = {
  questions: IQuestion[] | null;
  isLoading: boolean;
  result: IUserQuizResult[] | null;
};

enum ActionType {
  FETCH = 'FETCH',
  UPDATE_QUESTION = 'UPDATE_QUESTION',
  SEND = 'SEND',
}

export type { State };
export { ActionType };
