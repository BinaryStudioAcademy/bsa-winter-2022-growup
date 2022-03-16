import { formatDate } from 'helpers/format-date';
import { CareerJourneyValidationRule } from './career-journey-validation-rule.enum';
import { MAX_DATE, MIN_DATE } from 'components/okr/common/constants';

const CareerJourneyValidationMessage = {
  POSITION_REQUIRE: 'Position is required',
  POSITION_MIN_LENGTH: `Position must be at least ${CareerJourneyValidationRule.POSITION_MIN_LENGTH} characters long`,
  POSITION_MAX_LENGTH: `Position must be at most ${CareerJourneyValidationRule.POSITION_MAX_LENGTH} characters long`,
  COMPANY_REQUIRE: 'Company is required',
  COMPANY_MIN_LENGTH: `Company must be at least ${CareerJourneyValidationRule.COMPANY_MIN_LENGTH} characters long`,
  COMPANY_MAX_LENGTH: `Company must be at most ${CareerJourneyValidationRule.COMPANY_MAX_LENGTH} characters long`,
  START_DATE_REQUIRE: 'Start date is required',
  MIN_START_DATE: `Start date must be at most ${formatDate(MIN_DATE)}`,
  MAX_START_DATE: `Start date must be at least ${formatDate(MAX_DATE)}`,
  END_DATE_REQUIRE: 'End date is required',
  MIN_END_DATE: `End date must be at most ${formatDate(MIN_DATE)}`,
  MAX_END_DATE: `End date must be at least ${formatDate(MAX_DATE)}`,
};

export { CareerJourneyValidationMessage };
