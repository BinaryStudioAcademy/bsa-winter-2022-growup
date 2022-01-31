import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';

const rootReducer = {
  counter,
  auth,
};

export { rootReducer };
