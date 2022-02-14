import { User } from '../../data/entities/user';

type UserLoginForm = Pick<User, 'email' | 'password'>;
type UserRegisterForm = UserLoginForm & Pick<User, 'firstName' | 'lastName'>;

export { UserLoginForm, UserRegisterForm };
