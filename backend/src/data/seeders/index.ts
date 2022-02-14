import { createConnection } from 'typeorm';

import CompanySeeder from './company.seeder';
import UserSeeder from './user.seeder';

createConnection().then(() => {
  CompanySeeder.execute().then(() => {
    UserSeeder.execute();
  });
});
