import { User } from '../../data/entities/user';

type UserLoginForm = Pick<User, 'email' | 'password'>;
type UserRegisterForm = UserLoginForm & Pick<User, 'firstName' | 'lastName'>;
type UserMissingDataForm = Pick<
  User,
  'password' | 'firstName' | 'lastName' | 'position'
>;

export { UserLoginForm, UserRegisterForm, UserMissingDataForm };
