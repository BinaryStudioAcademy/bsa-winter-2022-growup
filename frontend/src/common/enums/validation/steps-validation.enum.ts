import { StepsValidationRule } from './steps-validation-rule.enum';

const StepsValidationMessage = {
  POSITION_REQUIRE: 'Position is required',
  POSITION_MIN_LENGTH: `Position must be at least ${StepsValidationRule.POSITION_MIN_LENGTH} characters long`,
  POSITION_MAX_LENGTH: `Position must be at most ${StepsValidationRule.POSITION_MAX_LENGTH} characters long`,
  EXPERIENCE_REQUIRE: 'Experience is required',
  EXPERIENCE_MIN_LENGTH: `Experience must be at least ${StepsValidationRule.EXPERIENCE_MIN_LENGTH} characters long`,
  EXPERIENCE_MAX_LENGTH: `Experience must be at most ${StepsValidationRule.EXPERIENCE_MAX_LENGTH} characters long`,
  EDUCATION_REQUIRE: 'Education is required',
  EDUCATION_MIN_LENGTH: `Education must be at least ${StepsValidationRule.EDUCATION_MIN_LENGTH} characters long`,
  EDUCATION_MAX_LENGTH: `Education must be at most ${StepsValidationRule.EDUCATION_MAX_LENGTH} characters long`,
  INTERESTING_TAGS_REQUIRE: 'Interesting tags are required',
  INTERESTING_TAGS_MIN_LENGTH: `Interesting tags must be at least ${StepsValidationRule.INTERESTING_TAGS_MIN_LENGTH} characters long`,
  INTERESTING_TAGS_MAX_LENGTH: `Interesting tags must be at most ${StepsValidationRule.INTERESTING_TAGS_MAX_LENGTH} characters long`,
};

export { StepsValidationMessage };
