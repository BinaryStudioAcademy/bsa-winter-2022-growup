import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import tagsRoute from './tags-route';
import companyRoute from './company-route';
import workQuizRoute from './work-quiz';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/api/company', companyRoute);
  app.use('/api/work-quiz', workQuizRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
