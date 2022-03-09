import { formatDate } from 'helpers/format-date';
import { EducationValidationRule } from './education-validation-rule.enum';
import {
  MAX_DATE,
  MIN_DATE,
} from 'components/profile/components/profile-edit/common/constants';

const EducationValidationMessage = {
  SPECIALIZATION_REQUIRE: 'Specialization is required',
  SPECIALIZATION_MIN_LENGTH: `Specialization must be at least ${EducationValidationRule.SPECIALIZATION_MIN_LENGTH} characters long`,
  SPECIALIZATION_MAX_LENGTH: `Specialization must be at most ${EducationValidationRule.SPECIALIZATION_MAX_LENGTH} characters long`,
  UNIVERSITY_REQUIRE: 'University is required',
  UNIVERSITY_MIN_LENGTH: `University must be at least ${EducationValidationRule.UNIVERSITY_MIN_LENGTH} characters long`,
  UNIVERSITY_MAX_LENGTH: `University must be at most ${EducationValidationRule.UNIVERSITY_MAX_LENGTH} characters long`,
  DEGREE_REQUIRE: 'Degree is required',
  DEGREE_MIN_LENGTH: `Degree must be at least ${EducationValidationRule.DEGREE_MIN_LENGTH} characters long`,
  DEGREE_MAX_LENGTH: `Degree must be at most ${EducationValidationRule.DEGREE_MAX_LENGTH} characters long`,
  START_DATE_REQUIRE: 'Start date is required',
  MIN_START_DATE: `Start date must be at least ${formatDate(MIN_DATE)}`,
  MAX_START_DATE: 'Start date must be less than or equal to end date',
  END_DATE_REQUIRE: 'End date is required',
  MIN_END_DATE: 'End date must be greater than or equal to start date',
  MAX_END_DATE: `End date must be at most ${formatDate(MAX_DATE)}`,
};

export { EducationValidationMessage };
