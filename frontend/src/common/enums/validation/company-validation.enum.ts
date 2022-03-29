import { CompanyValidationRule } from './company-validation-rule.enum';

const CompanyValidationMessage = {
  NAME_MIN: `Company name must be at least ${CompanyValidationRule.NAME_MIN}`,
  NAME_MAX: `Company name must be less than ${CompanyValidationRule.NAME_MAX}`,
  NAME_EMPTY: 'Company name can not be empty',

  DESCRIPTION_MIN: `Company description must be at least ${CompanyValidationRule.DESCRIPTION_MIN}`,
  DESCRIPTION_MAX: `Company description must be less than ${CompanyValidationRule.DESCRIPTION_MAX}`,
};

export { CompanyValidationMessage };
