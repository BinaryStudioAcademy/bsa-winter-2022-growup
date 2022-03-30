import { UserPayloadKey } from 'common/enums/enums';

const DEFAULT_FIRST_STEP_PAYLOAD = {
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [UserPayloadKey.PASSWORD]: '',
};

export { DEFAULT_FIRST_STEP_PAYLOAD };
