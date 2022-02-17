import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { workStyleQuizReducer  as workStyleQuiz } from './work-style-quiz';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  admin,
  auth,
  okr,
  profile,
  workStyleQuiz,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;

