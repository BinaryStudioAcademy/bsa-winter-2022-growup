import { User } from '~/data/entities/user';

interface IListUser
  extends Pick<
    User,
    'firstName' | 'lastName' | 'email' | 'role' | 'id' | 'position'
  > {
  company: User['company']['id'];
  level: User['level']['id'];
}

type ShortUser = Pick<User, 'firstName' | 'lastName' | 'position'>;

export { IListUser, ShortUser };
