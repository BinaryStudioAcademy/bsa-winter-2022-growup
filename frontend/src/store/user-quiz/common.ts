import { IQuestion } from 'common/interfaces/user-quiz';

type State = {
  questions: IQuestion[] | null;
  isLoading: boolean;
};

enum ActionType {
  FETCH = 'fetch',
  CREATE = 'create',
}

export type { State };
export { ActionType };
