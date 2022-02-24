import { ISkill } from 'common/interfaces/skill/skill';

enum ActionType {
  ADD_SKILL = 'ADD_SKILL',
  REMOVE_SKILL = 'REMOVE_SKILL',
  EDIT_SKILL = 'EDIT_SKILL',
  SORT_NAME = 'SORT_NAME',
  FETCH_SKILL = 'FETCH_SKILL',
  GET_SKILLS = 'GET_SKILLS',
  CREATE_SKILLS = 'CREATE_SKILLS',
  DELETE_SKILL = 'DELETE_SKILL',
  UPDATE_SKILL = 'UPDATE_SKILL',
}

export type State = {
  skills: ISkill[];
};

export { ActionType };
