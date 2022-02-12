import { counterReducer as counter } from './counter';
import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { skillReducer as skill } from './skill';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  counter,
  auth,
  okr,
  skill,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
