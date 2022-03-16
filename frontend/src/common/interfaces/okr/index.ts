import { IBaseObject } from '../base-object';
import { IObjective } from '../objective';

export interface IOkr extends IBaseObject {
  name: string;
  endDate: Date | string;
  startDate: Date | string;
  objectives: Array<IObjective> | null;
}
