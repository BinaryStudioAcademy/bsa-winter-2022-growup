import { getCustomRepository } from 'typeorm';

import { users } from '../seed-data/user.data';
import { companies } from '../seed-data/company.data';

import { User } from '../entities/user';

import { asyncForEach } from '../../common/helpers/array.helper';

import CompanyRepository from '../repositories/company.repository';

import { hashPassword } from '~/common/utils/password-hasher.util';

type UserWithRole = typeof users;
type UserType = UserWithRole[number];

export default class UserSeeder {
  public static async execute(): Promise<void> {
    const companyRespoitory = getCustomRepository(CompanyRepository);

    const company = await companyRespoitory.findOne({
      name: companies[0].name,
    });

    await asyncForEach(async (user: UserType) => {
      const userProps: Partial<User> = {
        ...user,
        password: await hashPassword(user.password),
        company: company,
      };
      await Object.assign(new User(), userProps).save();
    }, users);
  }
}
