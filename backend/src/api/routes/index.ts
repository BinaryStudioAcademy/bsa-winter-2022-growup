import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';
import userRoute from './user-route';
import companyRoute from './company-route';

const routes = (app: Express): void => {
  app.use('/api/auth', userRoute);
  app.use('/company', companyRoute);
  app.use(errorHandlerMiddleware);
};

export default routes;
