import { formatDate } from 'helpers/format-date';
import { OkrValidationRule } from './okr-validation-rule.enum';
import { MAX_DATE, MIN_DATE } from 'components/okr/common/constants';

const OkrValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${OkrValidationRule.OKR_NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Name must be at most ${OkrValidationRule.OKR_NAME_MAX_LENGTH} characters long`,
  TYPE_REQUIRE: 'Type is required',
  START_DATE_REQUIRE: 'Start date is required',
  MIN_START_DATE: `Start date must be at most ${formatDate(MIN_DATE)}`,
  MAX_START_DATE: 'Start date must be less than or equal to end date',
  END_DATE_REQUIRE: 'End date is required',
  MIN_END_DATE: 'End date must be greater than or equal to start date',
  MAX_END_DATE: `End date must be at least ${formatDate(MAX_DATE)}`,
};

export { OkrValidationMessage };
