import * as Joi from 'joi';
import { OkrPayloadKey } from 'common/enums/enums';
import { SkillValidationRule } from 'common/enums/validation/skill-validation-rule.enum';
import { OkrValidationMessage } from 'common/enums/validation/okr-validation.enum';
import {
  MAX_DATE,
  MIN_CREATE_DATE,
  MIN_EDIT_DATE,
} from 'components/okr/common/constants';

const okrValidationSchema = (isEdit: boolean): Joi.Schema => {
  const minDate = isEdit ? MIN_EDIT_DATE : MIN_CREATE_DATE;
  const message = OkrValidationMessage(isEdit);

  return Joi.object({
    [OkrPayloadKey.NAME]: Joi.string()
      .trim()
      .min(SkillValidationRule.NAME_MIN_LENGTH)
      .max(SkillValidationRule.NAME_MAX_LENGTH)
      .required()
      .messages({
        'string.empty': message.NAME_REQUIRE,
        'string.min': message.NAME_MIN_LENGTH,
        'string.max': message.NAME_MAX_LENGTH,
      }),
    [OkrPayloadKey.TYPE]: Joi.string().required().messages({
      'string.empty': message.TYPE_REQUIRE,
    }),
    [OkrPayloadKey.START_DATE]: Joi.date()
      .required()
      .min(minDate)
      .max(MAX_DATE)
      .messages({
        'date.base': message.START_DATE_REQUIRE,
        'date.min': message.MIN_START_DATE,
        'date.max': message.MAX_START_DATE,
      }),
    [OkrPayloadKey.END_DATE]: Joi.date()
      .required()
      .min(Joi.ref(OkrPayloadKey.START_DATE))
      .max(MAX_DATE)
      .messages({
        'date.base': message.END_DATE_REQUIRE,
        'date.min': message.MIN_END_DATE,
        'date.max': message.MAX_END_DATE,
      }),
  });
};

export { okrValidationSchema };
