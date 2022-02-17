import { User } from '~/data/entities/user';
import { UserRegisterForm } from '../forms/user.forms';

const DEFAULT_USER_DATA = {
  'password': 'password123',
  'firstName': 'New',
  'lastName': 'User',
};

const createDefaultUser = (email: User['email']): UserRegisterForm => {
  return {
    email,
    ...DEFAULT_USER_DATA,
  };
};

export { createDefaultUser };
