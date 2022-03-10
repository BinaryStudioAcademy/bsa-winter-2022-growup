import * as Joi from 'joi';
import { CareerJourneyPayloadKey } from 'common/enums/user/career-journey-payload-key.enum';
import {
  MAX_DATE,
  MIN_DATE,
} from 'components/profile/components/profile-edit/common/constants';
import {
  CareerJourneyValidationMessage,
  CareerJourneyValidationRule,
} from 'common/enums/validation/validation';

const careerJourney = Joi.object({
  id: Joi.optional(),
  [CareerJourneyPayloadKey.POSITION]: Joi.string()
    .trim()
    .min(CareerJourneyValidationRule.POSITION_MIN_LENGTH)
    .max(CareerJourneyValidationRule.POSITION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': CareerJourneyValidationMessage.POSITION_REQUIRE,
      'string.min': CareerJourneyValidationMessage.POSITION_MIN_LENGTH,
      'string.max': CareerJourneyValidationMessage.POSITION_MAX_LENGTH,
    }),
  [CareerJourneyPayloadKey.COMPANY]: Joi.string()
    .trim()
    .min(CareerJourneyValidationRule.COMPANY_MIN_LENGTH)
    .max(CareerJourneyValidationRule.COMPANY_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': CareerJourneyValidationMessage.COMPANY_REQUIRE,
      'string.min': CareerJourneyValidationMessage.COMPANY_MIN_LENGTH,
      'string.max': CareerJourneyValidationMessage.COMPANY_MAX_LENGTH,
    }),
  [CareerJourneyPayloadKey.START_DATE]: Joi.date()
    .required()
    .min(MIN_DATE)
    .max(MAX_DATE)
    .messages({
      'date.base': CareerJourneyValidationMessage.START_DATE_REQUIRE,
      'date.min': CareerJourneyValidationMessage.MIN_START_DATE,
      'date.max': CareerJourneyValidationMessage.MAX_START_DATE,
    }),
  [CareerJourneyPayloadKey.END_DATE]: Joi.date()
    .required()
    .min(Joi.ref(CareerJourneyPayloadKey.START_DATE))
    .max(MAX_DATE)
    .messages({
      'date.base': CareerJourneyValidationMessage.END_DATE_REQUIRE,
      'date.min': CareerJourneyValidationMessage.MIN_END_DATE,
      'date.max': CareerJourneyValidationMessage.MAX_END_DATE,
    }),
});

export { careerJourney };
