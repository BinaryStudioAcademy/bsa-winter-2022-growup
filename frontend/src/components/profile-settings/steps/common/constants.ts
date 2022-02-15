import { FirstStepPayloadKey, UserPayloadKey } from 'common/enums/enums';

const DEFAULT_FIRST_STEP_PAYLOAD = {
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [FirstStepPayloadKey.POSITION]: '',
  [FirstStepPayloadKey.EXPERIENCE]: '',
  [FirstStepPayloadKey.EDUCATION]: '',
  [FirstStepPayloadKey.INTERESTING_TAGS]: '',
};

export { DEFAULT_FIRST_STEP_PAYLOAD };
