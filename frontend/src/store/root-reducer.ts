import { authReducer as auth } from './auth';
import { okrReducer as okr } from './okr';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { userQuizReducer  as userQuiz } from './user-quiz';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers ({
  admin,
  auth,
  okr,
  profile,
  userQuiz,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;

