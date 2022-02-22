import { createConnection } from 'typeorm';

import ormconfig from '~/config/ormconfig';

import CompanySeeder from './company.seeder';
import UserSeeder from './user.seeder';
import SkillSeeder from './skills.seeder';
import UserSkillSeeder from './user-skill.seeder';

async function Connection(): Promise<void> {
  await createConnection(ormconfig);
  await CompanySeeder.execute();
  await UserSeeder.execute();
  await SkillSeeder.execute();
  await UserSkillSeeder.execute();
}
Connection();
