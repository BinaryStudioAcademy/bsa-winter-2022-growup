import { StepsValidationRule } from './steps-validation-rule.enum';

const StepsValidationMessage = {
  POSITION_REQUIRE: 'Position is required',
  POSITION_MIN_LENGTH: `Position must be at least ${StepsValidationRule.POSITION_MIN_LENGTH} characters long`,
  POSITION_MAX_LENGTH: `Position must be at most ${StepsValidationRule.POSITION_MAX_LENGTH} characters long`,
};

export { StepsValidationMessage };
