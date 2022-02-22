import { createConnection } from 'typeorm';

import ormconfig from '~/config/ormconfig';

import CompanySeeder from './company.seeder';
import UserSeeder from './user.seeder';
import SkillSeeder from './skills.seeder';

createConnection(ormconfig).then(() => {
  CompanySeeder.execute().then(() => {
    UserSeeder.execute();
    SkillSeeder.execute();
  });
});
