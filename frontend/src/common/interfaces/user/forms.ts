export interface IUserLoginForm {
  email: string;
  password: string;
}

export interface IUserSignUpForm extends IUserLoginForm {
  firstName: string;
  lastName: string;
}
