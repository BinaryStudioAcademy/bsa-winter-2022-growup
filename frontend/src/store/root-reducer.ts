import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';
import { okrReducer as okr } from './okr';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import opportunityReducer from './opportunities/opportunities-reducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  admin,
  auth,
  companies,
  okr,
  profile,
  opportunityReducer,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
