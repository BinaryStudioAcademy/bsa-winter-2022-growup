import * as Joi from 'joi';
import { OpportunityPayloadKey } from 'common/enums/enums';
import {
  MAX_DATE,
  MIN_DATE,
} from 'components/profile/components/profile-edit/common/constants';
import {
  OpportunityValidationMessage,
  OpportunityValidationRule,
} from 'common/enums/validation/validation';

const opportunity = Joi.object({
  [OpportunityPayloadKey.NAME]: Joi.string()
    .trim()
    .min(OpportunityValidationRule.NAME_MIN_LENGTH)
    .max(OpportunityValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': OpportunityValidationMessage.NAME_REQUIRE,
      'string.min': OpportunityValidationMessage.NAME_MIN_LENGTH,
      'string.max': OpportunityValidationMessage.NAME_MAX_LENGTH,
    }),
  [OpportunityPayloadKey.ORGANIZATION]: Joi.string()
    .trim()
    .min(OpportunityValidationRule.ORGANIZATION_MIN_LENGTH)
    .max(OpportunityValidationRule.ORGANIZATION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': OpportunityValidationMessage.ORGANIZATION_REQUIRE,
      'string.min': OpportunityValidationMessage.ORGANIZATION_MIN_LENGTH,
      'string.max': OpportunityValidationMessage.ORGANIZATION_MAX_LENGTH,
    }),
  [OpportunityPayloadKey.TYPE]: Joi.string()
    .trim()
    .min(OpportunityValidationRule.TYPE_MIN_LENGTH)
    .max(OpportunityValidationRule.TYPE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': OpportunityValidationMessage.TYPE_REQUIRE,
      'string.min': OpportunityValidationMessage.TYPE_MIN_LENGTH,
      'string.max': OpportunityValidationMessage.TYPE_MAX_LENGTH,
    }),
  [OpportunityPayloadKey.START_DATE]: Joi.date()
    .required()
    .min(MIN_DATE)
    .max(MAX_DATE)
    .messages({
      'date.base': OpportunityValidationMessage.START_DATE_REQUIRE,
      'date.min': OpportunityValidationMessage.MIN_START_DATE,
      'date.max': OpportunityValidationMessage.MAX_START_DATE,
    }),
});

export { opportunity };
