import { IOkr } from 'components/okr/common/interfaces';
import { IBaseObject } from '../base-object';
import { IKeyResult } from '../key-result';

export interface IObjective extends IBaseObject {
  name: string;
  result: number;
  keyResults: Array<IKeyResult> | null;
  okr?: IOkr;
}
