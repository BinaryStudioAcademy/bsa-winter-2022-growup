import { opporunities } from '../seed-data/opportunity.data';
import { Opportunity } from '../entities/opportunity';
import { asyncForEach } from '../../common/helpers/array.helper';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../repositories/company.repository';
import { companies } from '../seed-data/company.data';
import UserRepository from '../repositories/user.repository';
import { users } from '../seed-data/user.data';

export default class OpportunitySeeder {
  public static async execute(): Promise<void> {
    const companyRepository = getCustomRepository(CompanyRepository);
    const userRepository = getCustomRepository(UserRepository);
    const company = await companyRepository.findOne({
      name: companies[0].name,
    });

    const user = await userRepository.findOne({
      firstName: users[0].firstName,
    });
    await asyncForEach(async (opportunitie: Opportunity) => {
      await Object.assign(new Opportunity(), {
        ...opportunitie,
        company: company,
        user:user,
      }).save();
    },opporunities as Opportunity[]);
    }
}
