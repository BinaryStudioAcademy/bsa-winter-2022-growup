import { CompanyValidationRule } from './company-validation-rule.enum';

const CompanyValidationMessage = {
  NAME_MIN: `Company name must be at least ${CompanyValidationRule.NAME_MIN}`,
  NAME_EMPTY: 'Company name can not be empty',

  DESCRIPTION_MIN: `Company description must be at least ${CompanyValidationRule.DESCRIPTION_MIN}`,
};

export { CompanyValidationMessage };
