import { companies } from '../seed-data/company.data';
import { Company } from '../entities/company';
import { asyncForEach } from '../../common/helpers/array.helper';
export default class CompanySeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async (company) => {
      await Object.assign(new Company(), { ...company }).save();
    }, companies);
  }
}
