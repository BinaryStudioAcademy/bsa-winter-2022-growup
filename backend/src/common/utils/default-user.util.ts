import { User } from '~/data/entities/user';
import { UserRegisterForm } from '../forms/user.forms';

interface IDefaultProps {
  password: string;
  firstName: null;
  lastName: null;
  position: null;
}
const DEFAULT_USER_DATA: IDefaultProps = {
  'password': 'password123',
  'firstName': null,
  'lastName': null,
  'position': null,
};

const createDefaultUser = (email: User['email']): UserRegisterForm => {
  return {
    email,
    ...DEFAULT_USER_DATA,
  };
};

export { createDefaultUser };
