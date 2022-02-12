import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
