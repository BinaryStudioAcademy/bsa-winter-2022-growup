import { IBaseObject } from '../base-object';
import { IObjective } from '../objective';

export interface IOkr extends IBaseObject {
  name: string;
  endDate: string;
  startDate: string;
  objectives: Array<IObjective> | null;
}
