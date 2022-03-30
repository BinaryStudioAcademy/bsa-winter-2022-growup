import * as Joi from 'joi';

import {
  UserPayloadKey,
  UserValidationMessage,
  UserValidationRule,
} from 'common/enums/enums';

const profileFirstStep = Joi.object({
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
});

export { profileFirstStep };
