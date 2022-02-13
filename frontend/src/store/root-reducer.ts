import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { profileReducer as profile } from './profile';

const rootReducer = {
  counter,
  auth,
  profile,
};

export { rootReducer };
