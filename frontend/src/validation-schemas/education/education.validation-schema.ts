import * as Joi from 'joi';
import { EducationPayloadKey } from '../../common/enums/user/education-payload-key.enum';
import {
  EducationValidationMessage,
  EducationValidationRule,
} from '../../common/enums/validation/validation';

const education = Joi.object({
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
});

export { education };
