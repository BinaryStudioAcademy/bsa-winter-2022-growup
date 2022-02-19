import { getCustomRepository } from 'typeorm';
import { RoleType } from '~/common/enums/role-type';

import { users } from '../seed-data/user.data';
import { companies } from '../seed-data/company.data';

import { User } from '../entities/user';
import { UserRole } from '../entities/user-role';

import { asyncForEach } from '../../common/helpers/array.helper';

import CompanyRepository from '../repositories/company.repository';

import { hashPassword } from '~/common/utils/password-hasher.util';

export default class UserSeeder {
  public static async execute(): Promise<void> {
    const companyRespoitory = getCustomRepository(CompanyRepository);

    const company = await companyRespoitory.findOne({
      name: companies[0].name,
    });

    await asyncForEach(async (user: User) => {
      const userInstance = await Object.assign(new User(), {
        ...user,
        password: await hashPassword(user.password),
        company: company,
      }).save();

      await Object.assign(new UserRole(), {
        role: RoleType.ADMIN,
        user: userInstance,
      }).save();
    }, users as User[]);
  }
}
