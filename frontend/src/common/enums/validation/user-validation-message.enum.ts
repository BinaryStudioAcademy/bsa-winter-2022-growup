import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  FIRST_NAME_REQUIRE: 'First name is required',
  FIRST_NAME_MIN_LENGTH: `First name must be at least ${UserValidationRule.FIRST_NAME_MIN_LENGTH} characters long`,
  FIRST_NAME_MAX_LENGTH: `First name must be at most ${UserValidationRule.FIRST_NAME_MAX_LENGTH} characters long`,
  LAST_NAME_REQUIRE: 'Last name is required',
  LAST_NAME_MIN_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME_MIN_LENGTH} characters long`,
  LAST_NAME_MAX_LENGTH: `Last name must be at most ${UserValidationRule.LAST_NAME_MAX_LENGTH} characters long`,
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
};

export { UserValidationMessage };
