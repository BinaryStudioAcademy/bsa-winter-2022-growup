import { Express } from 'express';
import userRoute from './user-route';
import tagsRoute from './tags-route';

const routes = (app: Express): void => {
  app.use('/api/users', userRoute);
  app.use('/api/company/tags', tagsRoute);
};

export default routes;
