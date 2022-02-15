import { ContentType as DefaultContentType } from 'growup-shared/common/enums';

const ContentType = {
  ...DefaultContentType,
  MULTIPART_FORM_DATA: '',
} as const;

export { ContentType };
