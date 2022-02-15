import { Express } from 'express';
import { errorHandlerMiddleware } from '../middlewares/error-handler-middleware';

import authenticationRoute from './authentication-route';
import userRoute from './user-route';
import tagsRoute from './tags-route';
import companyRoute from './company-route';
import questionRoute from './question-route';
import answerRoute from './answer-route';

const routes = (app: Express): void => {
  app.use('/api/auth', authenticationRoute);
  app.use('/api/user', userRoute);
  app.use('/api/company/tags', tagsRoute);
  app.use('/api/company', companyRoute);
  app.use('/api/question', questionRoute);
  app.use('/api/answer', answerRoute);

  app.use(errorHandlerMiddleware);
};

export default routes;
