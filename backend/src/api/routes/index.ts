import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import tagsRoute from './tags-route';
import opportunitiesRoute from './opportunities-route';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/company/opportunities', opportunitiesRoute);
  app.use(errorHandlerMiddleware);
};

export default routes;
