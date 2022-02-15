import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { skillReducer as skill } from './skill';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  admin,
  auth,
  okr,
  skill,
  profile,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;

