import { StatusType } from 'store/okr/common';
import { IBaseObject } from '../base-object';
import { IObjective } from '../objective';

export enum OkrTypes {
  MY_OKR = 'my_okr',
  TEAM_OKR = 'team_okr',
}

export interface IOkr extends IBaseObject {
  name: string;
  type: OkrTypes;
  endDate: Date | string;
  startDate: Date | string;
  objectives: Array<IObjective>;
  status: StatusType | null;
}
