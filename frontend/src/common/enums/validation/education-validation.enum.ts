import { EducationValidationRule } from './education-validation-rule.enum';

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
  END_DATE_REQUIRE: 'End date is required',
};

export { EducationValidationMessage };
