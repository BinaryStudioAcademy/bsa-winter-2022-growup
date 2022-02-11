import { HttpOptions } from 'common/types/types';

export interface IHttp {
  load<T = unknown>(url: string, option: Partial<HttpOptions>): Promise<T>;
}
