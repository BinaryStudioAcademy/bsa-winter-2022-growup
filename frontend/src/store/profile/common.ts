import { IUser } from 'common/interfaces/user';

type State = {
  user: IUser | null;
  isLoading: boolean;
};

export interface NameAndPosition {
  firstName: string;
  lastName: string;
  position: string;
}

enum ActionType {
  FETCH = 'fetch-profile/',
  UPDATE_AVATAR = 'update-avatar/',
  INSERT_PIB = 'insertPIB/',
  COMPLETE_TEST = 'complete-test/',
}

export type { State };
export { ActionType };
