import { IUser } from 'common/interfaces/user';

type State = {
  user: IUser | null;
  isLoading: boolean;
};

enum ActionType {
  FETCH = 'fetch-profile/',
  UPDATE_AVATAR = 'update-avatar/',
  COMPLETE_TEST = 'complete-test/',
}

export type { State };
export { ActionType };
