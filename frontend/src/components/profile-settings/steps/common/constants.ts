import { FirstStepPayloadKey, UserPayloadKey } from 'common/enums/enums';

const DEFAULT_FIRST_STEP_PAYLOAD = {
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [FirstStepPayloadKey.POSITION]: '',
  [UserPayloadKey.PASSWORD]: '',
};

export { DEFAULT_FIRST_STEP_PAYLOAD };
