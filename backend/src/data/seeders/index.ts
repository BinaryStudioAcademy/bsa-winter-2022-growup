import { createConnection } from 'typeorm';

import ormconfig from '~/config/ormconfig';

import CompanySeeder from './company.seeder';
import UserSeeder from './user.seeder';
import OpportunitySeeder from './opportunity.seeder';
import TagsSeeder from './tags.seeder';
import OpportunityTagSeeder from './opportunity-tags.seeder';
import SkillSeeder from './skills.seeder';
import UserSkillSeeder from './user-skill.seeder';

async function Connection(): Promise<void> {
  await createConnection(ormconfig);
  await CompanySeeder.execute();
  await UserSeeder.execute();
  await SkillSeeder.execute();
  await UserSkillSeeder.execute();
  await OpportunitySeeder.execute();
  await TagsSeeder.execute();
  await OpportunityTagSeeder.execute();
}
Connection();
