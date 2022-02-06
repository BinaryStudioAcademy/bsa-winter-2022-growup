import { parse } from 'pg-connection-string';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { env } from './env';

const getDbConfig = (): PostgresConnectionOptions => {
  const ssl =
    env.app.nodeEnv === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false;

  const baseConfig: PostgresConnectionOptions = {
    type: 'postgres',
    migrationsRun: env.db.migrationsRun,
    migrations: [env.db.migrationsDir],
    entities: [env.db.enititiesDir],
    synchronize: env.db.synchronize,
    logging: env.db.logging,
    ssl,
  };

  if (env.db.url) {
    const {
      port,
      host,
      user: username,
      password,
      database,
    } = parse(env.db.url);
    return {
      ...baseConfig,
      port: Number(port),
      host,
      username,
      password,
      database,
    };
  }

  return {
    ...baseConfig,
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    database: env.db.name,
    password: env.db.password,
  };
};

export default getDbConfig();
