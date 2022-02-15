export { HttpHeader } from 'growup-shared/common/enums';
import { HttpMethod as HM } from 'growup-shared/common/enums';

const HttpMethod = {
  ...HM,
  POST: 'POST',
  DELETE: 'DELETE',
} as const;
export { HttpMethod };
