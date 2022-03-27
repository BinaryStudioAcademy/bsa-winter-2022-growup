import * as Joi from 'joi';
import { OkrPayloadKey } from 'common/enums/enums';
import { SkillValidationRule } from 'common/enums/validation/skill-validation-rule.enum';
import { OkrValidationMessage } from 'common/enums/validation/okr-validation.enum';
import {
  MAX_DATE,
  MIN_CREATE_DATE,
  MIN_EDIT_DATE,
} from 'components/okr/common/constants';
import { IOkr } from 'common/interfaces/okr';
import { ObjectiveValues } from 'components/okr/common/interfaces';

const okrValidationSchema = (isEdit: boolean): Joi.ObjectSchema<IOkr> => {
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

const objectiveValidationSchema = (): Joi.ObjectSchema<ObjectiveValues> => {
  //Messages for the objective schema
  // const message = {
  //   OBJECTIVE_NAME_REQUIRE : 'The Name of Objective is required',
  //   OBJECTIVE_NAME_MIN : 'The Name of Objective must be at least 3 symbols',
  //   OBJECTIVE_NAME_MAX : 'The Name of Objective must be not biger than 30 symbols',

  //   KEY_RESULT_NAME_REQUIRE : 'The Name of Key Result is required' ,
  //   KEY_RESULT_NAME_MIN : 'The Name of Key Result must be at least 3 symbols',
  //   KEY_RESULT_NAME_MAX : 'The Name of Key Result must be not biger than 30 symbols',

  //   SCORE_REQUIRE : 'The value of scroe is required',
  //   SCORE_MIN : 'The minimum value is 0',
  //   SCORE_MAX : 'The maximum value is 1',
  // };
  return Joi.object({});
};

export { okrValidationSchema, objectiveValidationSchema };
