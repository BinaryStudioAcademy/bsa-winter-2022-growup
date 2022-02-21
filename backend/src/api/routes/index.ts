import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import companyRoute from './company-route';
import tagsRoute from './admin-route';
import opportunitiesRoute from './opportunities-route';
import adminRoute from './admin-route';
import workQuizRoute from './work-quiz';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/company/opportunities', opportunitiesRoute);
  app.use('/api/company', companyRoute);
  app.use('/api/company', adminRoute);
  app.use('/api/work-quiz', workQuizRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
