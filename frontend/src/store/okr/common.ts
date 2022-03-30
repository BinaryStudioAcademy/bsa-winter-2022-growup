import { IObjective } from 'common/interfaces/objective';
import { IOkr } from 'common/interfaces/okr';

enum ActionType {
  GET_ALL_OKRS = 'get_all_by_user',
  UPDATE_OKR_BY_ID = 'update_okr_by_id',
  UPDATE_OBJECTIVE = 'UPDATE_OBJECTIVE',
  CREATE_OBJECTIVES = 'create_objectives',
  CLOSE_OKR = 'close_okr',
  CREATE_OKR = 'create_okr',
  DELETE_OKR = 'delete_okr',
  DELETE_OBJECTIVES = 'delete_objectives',
}
export interface ICloseOkr {
  okrId: string;
}
export interface IDeleteObjective {
  objectiveId: string;
  okrId?: string;
}

export type State = {
  okrs: IOkr[];
};

export interface ICreateNewObjective {
  okrId: string;
  objectiveBody: IKeyResultObject;
  keyResults: IKeyResultObject[];
}

export interface IUpdateNewObjective extends ICreateNewObjective {
  objectiveId: string;
}

export interface IUpdateObjective {
  okrId: string;
  objective: IObjective;
}
export enum StatusType {
  open = 'open',
  close = 'close',
}

export interface ICreateKeyResult {
  okrId: string;
  objectiveId: string;
  keyResultBody: IKeyResultObject;
}

export interface IKeyResultObject {
  name: string;
  result: number;
}

export { ActionType };
