import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import companyRoute from './company-route';
import tagsRoute from './tags-route';
import careerPathRoute from './career-path';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/api/career-path', careerPathRoute);

  app.use('/company', companyRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
