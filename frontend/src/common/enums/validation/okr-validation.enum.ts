import { formatDate } from 'helpers/format-date';
import { OkrValidationRule } from './okr-validation-rule.enum';
import {
  MAX_DATE,
  MIN_CREATE_DATE,
  MIN_EDIT_DATE,
} from 'components/okr/common/constants';

interface IOkrValidationMessage {
  NAME_REQUIRE: string;
  NAME_MIN_LENGTH: string;
  NAME_MAX_LENGTH: string;
  TYPE_REQUIRE: string;
  START_DATE_REQUIRE: string;
  MIN_START_DATE: string;
  MAX_START_DATE: string;
  END_DATE_REQUIRE: string;
  MIN_END_DATE: string;
  MAX_END_DATE: string;
}

const OkrValidationMessage = (isEdit: boolean): IOkrValidationMessage => {
  const minDate = isEdit ? MIN_EDIT_DATE : MIN_CREATE_DATE;

  return {
    NAME_REQUIRE: 'Name is required',
    NAME_MIN_LENGTH: `Name must be at least ${OkrValidationRule.OKR_NAME_MIN_LENGTH} characters long`,
    NAME_MAX_LENGTH: `Name must be at most ${OkrValidationRule.OKR_NAME_MAX_LENGTH} characters long`,
    TYPE_REQUIRE: 'Type is required',
    START_DATE_REQUIRE: 'Start date is required',
    MIN_START_DATE: `Start date must be at most ${formatDate(minDate)}`,
    MAX_START_DATE: 'Start date must be less than or equal to end date',
    END_DATE_REQUIRE: 'End date is required',
    MIN_END_DATE: 'End date must be greater than or equal to start date',
    MAX_END_DATE: `End date must be at least ${formatDate(MAX_DATE)}`,
  };
};
export { OkrValidationMessage };
