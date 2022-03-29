import { User } from '~/data/entities/user';
import { UserRegisterForm } from '../forms/user.forms';

interface IDefaultProps {
  password: null;
  firstName: null;
  lastName: null;
  position: null;
}
const DEFAULT_USER_DATA: IDefaultProps = {
  'password': null,
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
