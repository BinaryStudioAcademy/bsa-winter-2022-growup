import { CareerJourneyValidationRuleEnum } from './career-journey-validation-rule.enum';

const CareerJourneyValidationEnum = {
  POSITION_REQUIRE: 'Position is required',
  POSITION_MIN_LENGTH: `Position must be at least ${CareerJourneyValidationRuleEnum.POSITION_MIN_LENGTH} characters long`,
  POSITION_MAX_LENGTH: `Position must be at most ${CareerJourneyValidationRuleEnum.POSITION_MAX_LENGTH} characters long`,
  COMPANY_REQUIRE: 'Company is required',
  COMPANY_MIN_LENGTH: `Company must be at least ${CareerJourneyValidationRuleEnum.COMPANY_MIN_LENGTH} characters long`,
  COMPANY_MAX_LENGTH: `Company must be at most ${CareerJourneyValidationRuleEnum.COMPANY_MAX_LENGTH} characters long`,
  START_DATE_REQUIRE: 'Start date is required',
  START_DATE: `Start date must be at least ${CareerJourneyValidationRuleEnum.START_DATE}`,
  END_DATE_REQUIRE: 'End date is required',
  END_DATE: `End date must be at most ${CareerJourneyValidationRuleEnum.END_DATE}`,
};

export { CareerJourneyValidationEnum };
