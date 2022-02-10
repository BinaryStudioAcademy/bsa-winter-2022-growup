import { Express } from 'express';
import userRoute from './user-route';
import companyRoute from './company-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/company', companyRoute);
};

export default routes;
