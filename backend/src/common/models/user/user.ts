import { User } from '~/data/entities/user';

interface IListUser
  extends Pick<User, 'firstName' | 'lastName' | 'email' | 'role'> {
  company: User['company']['id'];
}

type ShortUser = Pick<User, 'firstName' | 'lastName' | 'position'>;

export { IListUser, ShortUser };
