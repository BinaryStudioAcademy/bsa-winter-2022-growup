import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { adminReducer as admin } from './admin';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  admin,
  auth,
  okr,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
