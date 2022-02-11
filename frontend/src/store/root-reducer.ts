import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { adminReducer as admin } from './admin';

const rootReducer = {
  counter,
  admin,
  auth,
};

export { rootReducer };
