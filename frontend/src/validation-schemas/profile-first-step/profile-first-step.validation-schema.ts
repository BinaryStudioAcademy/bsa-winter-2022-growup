import { FirstStepPayloadKey, UserPayloadKey, UserValidationMessage, UserValidationRule } from 'common/enums/enums';
import { StepsValidationRule } from '../../common/enums/validation/steps-validation-rule.enum';
import { StepsValidationMessage } from '../../common/enums/validation/steps-validation.enum';
import * as Joi from 'joi';

const profileFirstStep = Joi.object({
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
  [FirstStepPayloadKey.POSITION]: Joi.string()
    .trim()
    .min(StepsValidationRule.POSITION_MIN_LENGTH)
    .max(StepsValidationRule.POSITION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': StepsValidationMessage.POSITION_REQUIRE,
      'string.min': StepsValidationMessage.POSITION_MIN_LENGTH,
      'string.max': StepsValidationMessage.POSITION_MAX_LENGTH,
    }),
});

export { profileFirstStep };
