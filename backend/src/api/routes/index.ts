import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import companyRoute from './company-route';
import tagsRoute from './admin-route';
import opportunitiesRoute from './opportunities-route';
import careerPathRoute from './career-path';
import adminRoute from './admin-route';
import skillRoute from './skill-route';
import workQuizRoute from './work-quiz';
import languageRoute from './language-route';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/api/company/opportunities', opportunitiesRoute);
  app.use('/api/company', companyRoute);
  app.use('/api/company', adminRoute);
  app.use('/api/work-quiz', workQuizRoute);
  app.use('/api/skills', skillRoute);
  app.use('/api/career-path', careerPathRoute);
  app.use('/api/user/languages', languageRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
