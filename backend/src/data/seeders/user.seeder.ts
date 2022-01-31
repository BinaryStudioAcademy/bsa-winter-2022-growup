import { users } from '../seed-data/user.data';
import { User } from '../entities/user';
import { asyncForEach } from '../../common/helpers/array.helper';

export default class UserSeeder {
  public static async execute(): Promise<void> {
    await asyncForEach(async user => {
      await Object.assign(new User(), { ...user }).save();
    }, users);
  }
}
