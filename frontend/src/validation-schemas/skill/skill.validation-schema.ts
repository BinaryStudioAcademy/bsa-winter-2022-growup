import * as Joi from 'joi';
import { SkillPayloadKey } from 'common/enums/enums';
import { SkillValidationRule } from 'common/enums/validation/skill-validation-rule.enum';
import { SkillValidationMessage } from 'common/enums/validation/skill-validation-message.enum';

const skill = Joi.object({
  [SkillPayloadKey.NAME]: Joi.string()
    .trim()
    .min(SkillValidationRule.NAME_MIN_LENGTH)
    .max(SkillValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SkillValidationMessage.NAME_REQUIRE,
      'string.min': SkillValidationMessage.NAME_MIN_LENGTH,
      'string.max': SkillValidationMessage.NAME_MAX_LENGTH,
    }),
});

export { skill };
