import { FirstStepPayloadKey, UserPayloadKey } from 'common/enums/enums';
import { IUser } from 'common/interfaces/user';

const someFunc = (user: IUser) => {
  return {
    [UserPayloadKey.FIRST_NAME]: user && user.firstName ? user.firstName : '',
    [UserPayloadKey.LAST_NAME]: user && user.lastName ? user.lastName : '',
    [FirstStepPayloadKey.POSITION]: user && user.position ? user.position : '',
    [UserPayloadKey.PASSWORD]: '',
  };
};
const DEFAULT_FIRST_STEP_PAYLOAD = {
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [FirstStepPayloadKey.POSITION]: '',
  [UserPayloadKey.PASSWORD]: '',
};

export { someFunc };
