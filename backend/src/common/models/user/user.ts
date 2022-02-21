import { User } from '~/data/entities/user';
import { UserRole } from '~/data/entities/user-role';

interface IListUser extends Omit<User, 'password' | 'company'> {
  company: User['company']['id'];
  roleType: UserRole['role'];
}

export { IListUser };
