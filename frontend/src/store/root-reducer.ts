import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';

const rootReducer = {
  counter,
  auth,
  companies,
};

export { rootReducer };
