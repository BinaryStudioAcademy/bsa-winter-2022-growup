import * as dotenv from 'dotenv';
import { getOsEnv } from '../common/helpers/path.helper';
import { isStringTrue } from '../common/helpers/boolean.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    secretKey: getOsEnv('APP_SECRET'),
    nodeEnv: getOsEnv('NODE_ENV'),
  },
  db: {
    url: getOsEnv('DATABASE_URL'),
    connection: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnv('TYPEORM_HOST'),
    port: Number(getOsEnv('TYPEORM_PORT')),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    name: getOsEnv('TYPEORM_DATABASE'),
    synchronize: isStringTrue(getOsEnv('TYPEORM_SYNCHRONIZE')),
    migrationsRun: isStringTrue(getOsEnv('TYPEORM_MIGRATIONS_RUN')),
    migrationsDir: getOsEnv('TYPEORM_MIGRATIONS'),
    enititiesDir: getOsEnv('TYPEORM_ENTITIES'),
    logging: isStringTrue(getOsEnv('TYPEORM_LOGGING')),
  },
  aws: {
    access: getOsEnv('AWS_ACCESS_KEY'),
    secret: getOsEnv('AWS_SECRET_KEY'),
    bucket: getOsEnv('AWS_BUCKET_NAME'),
  },
  email: {
    name: getOsEnv('EMAIL_NAME'),
    password: getOsEnv('EMAIL_PASSWORD'),
  },
} as const;
