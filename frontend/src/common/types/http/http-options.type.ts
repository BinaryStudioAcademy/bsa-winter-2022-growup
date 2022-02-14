import { ContentType, HttpMethod } from 'common/enums/enums';

type HttpOptions = {
  method: keyof typeof HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
  hasAuth?: boolean;
  query?: object;
};

export type { HttpOptions };
