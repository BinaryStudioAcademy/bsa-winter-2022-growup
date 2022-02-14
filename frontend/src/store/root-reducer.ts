import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  auth,
  okr,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
