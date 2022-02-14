import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';
import userRoute from './user-route';
import tagsRoute from './tags-route';

const routes = (app: Express): void => {
  app.use('/api/company/tags', tagsRoute);
  app.use('/api/auth', userRoute);
  app.use(errorHandlerMiddleware);
};

export default routes;
