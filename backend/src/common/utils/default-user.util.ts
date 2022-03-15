import { User } from '~/data/entities/user';
import { UserRegisterForm } from '../forms/user.forms';

type DefaultUserType = Pick<User, 'password' | 'firstName' | 'lastName'>;

const DEFAULT_USER_DATA: DefaultUserType = {
  'password': null,
  'firstName': null,
  'lastName': null,
};

const createDefaultUser = (email: User['email']): UserRegisterForm => {
  return {
    email,
    ...DEFAULT_USER_DATA,
  };
};

export { createDefaultUser };
