import { IDomain } from 'common/interfaces/career-path';

type State = {
  domains: IDomain[] | null;
  isLoading: boolean;
};

enum ActionType {
  FETCH_DOMAINS = 'FETCH_DOMAINS',
  ADD_DOMAIN = 'ADD_DOMAIN',
  UPDATE_DOMAIN = 'UPDATE_DOMAIN',
  DELETE_DOMAIN = 'DELETE_DOMAIN',
  ADD_LEVEL = 'ADD_LEVEL',
  UPDATE_LEVEL = 'UPDATE_LEVEL',
  ADD_SKILL = 'ADD_SKILL',
  UPDATE_SKILL = 'UPDATE_SKILL',
  ADD_OBJECTIVE = 'ADD_OBJECTIVE',
  UPDATE_OBJECTIVE = 'UPDATE_OBJECTIVE',
}

export type { State };
export { ActionType };
