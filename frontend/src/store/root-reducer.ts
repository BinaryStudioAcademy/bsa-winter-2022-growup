import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { profileReducer as profile } from './profile';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  admin,
  auth,
  okr,
  profile,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;

