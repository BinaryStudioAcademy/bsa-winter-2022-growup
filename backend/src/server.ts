import cors from 'cors';
import path from 'path';
import express, { Express } from 'express';
import { createConnection } from 'typeorm';

import routes from './api/routes';
import ormconfig from './config/ormconfig';
import { env } from './config/env';
import { logger } from './common/utils/logger.util';

const { port } = env.app;

const app: Express = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(port, async () => {
  try {
    await createConnection(ormconfig);
  } catch (error) {
    logger.info(`'App started with error: ${error}`);
  }
  logger.info(`Server is running at ${port}.`);
});

export default app;
