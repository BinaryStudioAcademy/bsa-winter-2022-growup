import { asyncForEach } from '../../common/helpers/array.helper';
import { getCustomRepository } from 'typeorm';
import CompanyRepository from '../repositories/company.repository';
import { companies } from '../seed-data/company.data';
import { Tags } from '../entities/tags';
import { tagsData } from '../seed-data/tags.data';

export default class TagsSeeder {
  public static async execute(): Promise<void> {
    const companyRepository = getCustomRepository(CompanyRepository);
    const company = await companyRepository.findOne({
      name: companies[0].name,
    });
    await asyncForEach(async (tag: Tags) => {
      await Object.assign(new Tags(), {
        ...tag,
        company: company,
      }).save();
    }, tagsData as Tags[]);
  }
}
