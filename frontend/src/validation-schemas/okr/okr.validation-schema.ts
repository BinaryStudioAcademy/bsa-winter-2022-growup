import * as Joi from 'joi';
import { OkrPayloadKey } from 'common/enums/enums';
import { SkillValidationRule } from 'common/enums/validation/skill-validation-rule.enum';
import { OkrValidationMessage } from 'common/enums/validation/okr-validation.enum';
import { MAX_DATE, MIN_DATE } from 'components/okr/common/constants';

const okrValidationSchema = Joi.object({
  [OkrPayloadKey.NAME]: Joi.string()
    .trim()
    .min(SkillValidationRule.NAME_MIN_LENGTH)
    .max(SkillValidationRule.NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': OkrValidationMessage.NAME_REQUIRE,
      'string.min': OkrValidationMessage.NAME_MIN_LENGTH,
      'string.max': OkrValidationMessage.NAME_MAX_LENGTH,
    }),
  [OkrPayloadKey.TYPE]: Joi.string().required().messages({
    'string.empty': OkrValidationMessage.TYPE_REQUIRE,
  }),
  [OkrPayloadKey.START_DATE]: Joi.date()
    .required()
    .min(MIN_DATE)
    .max(MAX_DATE)
    .messages({
      'date.base': OkrValidationMessage.START_DATE_REQUIRE,
      'date.min': OkrValidationMessage.MIN_START_DATE,
      'date.max': OkrValidationMessage.MAX_START_DATE,
    }),
  [OkrPayloadKey.END_DATE]: Joi.date()
    .required()
    .min(Joi.ref(OkrPayloadKey.START_DATE))
    .max(MAX_DATE)
    .messages({
      'date.base': OkrValidationMessage.END_DATE_REQUIRE,
      'date.min': OkrValidationMessage.MIN_END_DATE,
      'date.max': OkrValidationMessage.MAX_END_DATE,
    }),
});

export { okrValidationSchema };
