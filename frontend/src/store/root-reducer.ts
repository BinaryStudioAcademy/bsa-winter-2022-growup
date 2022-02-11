import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  counter,
  auth,
  okr,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
