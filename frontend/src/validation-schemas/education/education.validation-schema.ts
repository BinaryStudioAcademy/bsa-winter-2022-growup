import * as Joi from 'joi';
import { EducationPayloadKey } from 'common/enums/user/education-payload-key.enum';
import {
  MAX_DATE,
  MIN_DATE,
} from 'components/profile/components/profile-edit/common/constants';
import {
  EducationValidationMessage,
  EducationValidationRule,
} from 'common/enums/validation/validation';

const education = Joi.object({
  id: Joi.optional(),
  createdAt: Joi.optional(),
  deletedAt: Joi.optional(),
  updatedAt: Joi.optional(),
  [EducationPayloadKey.SPECIALIZATION]: Joi.string()
    .trim()
    .min(EducationValidationRule.SPECIALIZATION_MIN_LENGTH)
    .max(EducationValidationRule.SPECIALIZATION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EducationValidationMessage.SPECIALIZATION_REQUIRE,
      'string.min': EducationValidationMessage.SPECIALIZATION_MIN_LENGTH,
      'string.max': EducationValidationMessage.SPECIALIZATION_MAX_LENGTH,
    }),
  [EducationPayloadKey.UNIVERSITY]: Joi.string()
    .trim()
    .min(EducationValidationRule.UNIVERSITY_MIN_LENGTH)
    .max(EducationValidationRule.UNIVERSITY_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EducationValidationMessage.UNIVERSITY_REQUIRE,
      'string.min': EducationValidationMessage.UNIVERSITY_MIN_LENGTH,
      'string.max': EducationValidationMessage.UNIVERSITY_MAX_LENGTH,
    }),
  [EducationPayloadKey.DEGREE]: Joi.string()
    .trim()
    .min(EducationValidationRule.DEGREE_MIN_LENGTH)
    .max(EducationValidationRule.DEGREE_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': EducationValidationMessage.DEGREE_REQUIRE,
      'string.min': EducationValidationMessage.DEGREE_MIN_LENGTH,
      'string.max': EducationValidationMessage.DEGREE_MAX_LENGTH,
    }),
  [EducationPayloadKey.START_DATE]: Joi.date()
    .required()
    .min(MIN_DATE)
    .max(MAX_DATE)
    .messages({
      'date.base': EducationValidationMessage.START_DATE_REQUIRE,
      'date.min': EducationValidationMessage.MIN_START_DATE,
      'date.max': EducationValidationMessage.MAX_START_DATE,
    }),
  [EducationPayloadKey.END_DATE]: Joi.date()
    .allow(null)
    .min(Joi.ref(EducationPayloadKey.START_DATE))
    .max(MAX_DATE)
    .messages({
      'date.base': EducationValidationMessage.END_DATE_REQUIRE,
      'date.min': EducationValidationMessage.MIN_END_DATE,
      'date.max': EducationValidationMessage.MAX_END_DATE,
    }),
});

export { education };
