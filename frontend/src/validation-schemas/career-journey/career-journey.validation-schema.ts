import * as Joi from 'joi';
import { CareerJourneyPayloadKey } from '../../common/enums/user/career-journey-payload-key.enum';
import { CareerJourneyValidationRule } from '../../common/enums/validation/career-journey-validation-rule.enum';
import { CareerJourneyValidationMessage } from '../../common/enums/validation/career-journey-validation.enum';

const careerJourney = Joi.object({
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
});

export { careerJourney };
