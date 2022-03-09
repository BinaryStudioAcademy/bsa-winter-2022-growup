import { EducationPayloadKey } from 'common/enums/user/education-payload-key.enum';

const DEFAULT_EDUCATION_PAYLOAD = {
  [EducationPayloadKey.SPECIALIZATION]: '',
  [EducationPayloadKey.UNIVERSITY]: '',
  [EducationPayloadKey.DEGREE]: '',
  [EducationPayloadKey.START_DATE]: null,
  [EducationPayloadKey.END_DATE]: null,
};

export { DEFAULT_EDUCATION_PAYLOAD };
