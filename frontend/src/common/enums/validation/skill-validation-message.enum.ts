import { SkillValidationRule } from './skill-validation-rule.enum';

const SkillValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${SkillValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Name must be at most ${SkillValidationRule.NAME_MAX_LENGTH} characters long`,
};

export { SkillValidationMessage };
