import { User } from '~/data/entities/user';
import { UserRegisterForm } from '../forms/user.forms';

interface IDefaultProps {
  password: null;
  firstName: null;
  lastName: null;
}
const DEFAULT_USER_DATA: IDefaultProps = {
  'password': null,
  'firstName': null,
  'lastName': null,
};

const createDefaultUser = (
  email: User['email'],
  level: User['level'],
  position: User['position'],
): UserRegisterForm => {
  return {
    email,
    level,
    position,
    ...DEFAULT_USER_DATA,
  };
};

export { createDefaultUser };
