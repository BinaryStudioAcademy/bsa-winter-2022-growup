import {
  CompanyValidationRule,
  CompanyValidationMessage,
} from 'common/enums/enums';
import * as Joi from 'joi';

const company = Joi.object({
  'name': Joi.string()
    .trim()
    .min(CompanyValidationRule.NAME_MIN)
    .max(CompanyValidationRule.NAME_MAX)
    .required()
    .messages({
      'string.min': CompanyValidationMessage.NAME_MIN,
      'string.max': CompanyValidationMessage.NAME_MAX,
      'string.empty': CompanyValidationMessage.NAME_EMPTY,
    }),
  'description': Joi.string()
    .trim()
    .allow('')
    .min(CompanyValidationRule.DESCRIPTION_MIN)
    .max(CompanyValidationRule.DESCRIPTION_MAX)
    .messages({
      'string.min': CompanyValidationMessage.DESCRIPTION_MIN,
      'string.max': CompanyValidationMessage.DESCRIPTION_MAX,
    }),
});

export { company };
