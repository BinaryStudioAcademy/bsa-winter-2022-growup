import { UserPayloadKey } from 'common/enums/enums';

const DEFAULT_SIGN_UP_PAYLOAD = {
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [UserPayloadKey.PASSWORD]: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
