import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { combineReducers } from '@reduxjs/toolkit';
import { adminReducer as admin } from './admin';

const rootReducer = {
  counter,
  admin,
  auth,
  okr,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
