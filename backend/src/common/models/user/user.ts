import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';

interface IListUser extends Omit<User, 'password' | 'company'> {
  company: User['company']['id'];
  roleType: UserRole['role'];
}

type ShortUser = Pick<User, 'firstName' | 'lastName' | 'position'>;

export { IListUser, ShortUser };
