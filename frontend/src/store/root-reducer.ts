import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';
import { okrReducer as okr } from './okr';
import { skillReducer as skill } from './skill';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import opportunityReducer from './opportunities/opportunities-reducer';
import recomededOpportunitiesReducer from './recomended-opportunities/recomended-opportunities-reducer';
import { workStyleQuizReducer as workStyleQuiz } from './work-style-quiz';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  admin,
  auth,
  companies,
  okr,
  skill,
  profile,
  opportunityReducer,
  recomededOpportunitiesReducer,
  workStyleQuiz,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
