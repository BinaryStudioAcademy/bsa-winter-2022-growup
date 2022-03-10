import { authReducer as auth } from './auth';
import { companyReducer as companies } from './company';
import { okrReducer as okr } from './okr';
import { skillReducer as skill } from './skill';
import { adminReducer as admin } from './admin';
import { profileReducer as profile } from './profile';
import { tagsReducer as tags } from './tags';
import { workStyleQuizReducer as workStyleQuiz } from './work-style-quiz';
import { opportunityReducer as opportunities } from './opportunities';
import { homePageReducer as homePage } from './home-page';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  admin,
  auth,
  companies,
  okr,
  skill,
  tags,
  profile,
  opportunities,
  homePage,
  workStyleQuiz,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
