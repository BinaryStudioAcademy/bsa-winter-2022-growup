import {
  CompanyValidationRule,
  CompanyValidationMessage,
} from 'common/enums/enums';
import * as Joi from 'joi';

const company = Joi.object({
  'name': Joi.string()
    .trim()
    .min(CompanyValidationRule.NAME_MIN)
    .required()
    .messages({
      'string.min': CompanyValidationMessage.NAME_MIN,
      'string.empty': CompanyValidationMessage.NAME_EMPTY,
    }),
  'description': Joi.string()
    .trim()
    .allow('')
    .min(CompanyValidationRule.DESCRIPTION_MIN)
    .messages({
      'string.min': CompanyValidationMessage.DESCRIPTION_MIN,
    }),
});

export { company };
