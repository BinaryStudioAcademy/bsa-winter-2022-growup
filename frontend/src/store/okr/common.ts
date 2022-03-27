import { IKeyResult } from 'common/interfaces/key-result';
import { IObjective } from 'common/interfaces/objective';
import { IOkr } from 'common/interfaces/okr';

enum ActionType {
  GET_ALL_OKRS = 'get_all_by_user',
  UPDATE_OKR_BY_ID = 'update_okr_by_id',
  CREATE_OBJECTIVES = 'create_objectives',
}

export type State = {
  okrs: IOkr[];
};

export interface ICreateNewObjective {
  okrId: string;
  objectiveBody: IObjective;
}

export interface IUpdateObjective {
  okrId: string;
  objective: IObjective;
}

export interface ICreateKeyResult {
  okrId: string;
  objectiveId: string;
  keyResultBody: IKeyResult;
}

export { ActionType };
