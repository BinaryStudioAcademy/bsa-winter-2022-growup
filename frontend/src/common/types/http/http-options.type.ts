import { ContentType, HttpMethod } from 'common/enums/enums';

type HttpOptions = {
  contentType: typeof ContentType[keyof typeof ContentType];
  method: keyof typeof HttpMethod;
  payload?: BodyInit | null;
  hasAuth?: boolean;
  query?: object;
};

export type { HttpOptions };
