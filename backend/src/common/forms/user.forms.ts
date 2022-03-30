import { User } from '../../data/entities/user';

type UserLoginForm = Pick<User, 'email' | 'password'>;
type UserRegisterForm = UserLoginForm &
  Pick<User, 'firstName' | 'lastName'> & {
    position?: User['position'];
    level: User['level'];
  };
type UserMissingDataForm = Pick<
  User,
  'password' | 'firstName' | 'lastName' | 'position'
>;

export { UserLoginForm, UserRegisterForm, UserMissingDataForm };
