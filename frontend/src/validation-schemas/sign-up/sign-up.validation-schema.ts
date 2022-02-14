import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule,
} from 'common/enums/enums';
import * as Joi from 'joi';

const signUp = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
  [UserPayloadKey.FIRST_NAME]: Joi.string()
    .trim()
    .min(UserValidationRule.FIRST_NAME_MIN_LENGTH)
    .max(UserValidationRule.FIRST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
      'string.min': UserValidationMessage.FIRST_NAME_MIN_LENGTH,
      'string.max': UserValidationMessage.FIRST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.LAST_NAME]: Joi.string()
    .trim()
    .min(UserValidationRule.LAST_NAME_MIN_LENGTH)
    .max(UserValidationRule.LAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
      'string.min': UserValidationMessage.LAST_NAME_MIN_LENGTH,
      'string.max': UserValidationMessage.LAST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { signUp };
