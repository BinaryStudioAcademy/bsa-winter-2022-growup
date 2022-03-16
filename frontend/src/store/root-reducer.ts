import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';
import { okrReducer as okr } from './okr';
import { skillReducer as skill } from './skill';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { workStyleQuizReducer as workStyleQuiz } from './work-style-quiz';
import { opportunityReducer as opportunities } from './opportunities';
import { homePageReducer as homePage } from './home-page';
import { careerPathReducer as careerPath } from './career-path';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  admin,
  auth,
  companies,
  okr,
  skill,
  profile,
  opportunities,
  homePage,
  workStyleQuiz,
  careerPath,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
