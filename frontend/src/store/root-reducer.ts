import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';
import { adminReducer as admin } from './admin';

const rootReducer = {
  counter,
  admin,
  auth,
  companies,
};

export { rootReducer };
