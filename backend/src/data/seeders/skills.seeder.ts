import { getCustomRepository } from 'typeorm';

import { skills } from '../seed-data/skills.data';
import { companies } from '../seed-data/company.data';

import { Skill } from '../entities/skill';
import { asyncForEach } from '../../common/helpers/array.helper';

import CompanyRepository from '../repositories/company.repository';
// import { PermissionType } from 'growup-shared';

export default class UserSeeder {
  public static async execute(): Promise<void> {
    const companyRespoitory = getCustomRepository(CompanyRepository);

    const company = await companyRespoitory.findOne({
      name: companies[0].name,
    });

    await asyncForEach(async (skill: Skill) => {
      await Object.assign(new Skill(), {
        ...skill,
        company: company,
      }).save();
    }, skills as Skill[]);
  }
}
