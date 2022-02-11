import { createConnection } from 'typeorm';

import CompanySeeder from './company.seeder';

createConnection().then(() => {
  CompanySeeder.execute();
});
