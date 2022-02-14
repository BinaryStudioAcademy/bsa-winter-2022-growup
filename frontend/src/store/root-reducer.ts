import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { profileReducer as profile } from './profile';
import { adminReducer as admin } from './admin';

const rootReducer = {
  counter,
  admin,
  auth,
  profile,
};

export { rootReducer };
