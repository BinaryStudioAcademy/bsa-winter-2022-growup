import { formatDate } from 'helpers/format-date';
import { OpportunityValidationRule } from './opportunity-validation-rule.enum';
import {
  MAX_DATE,
  MIN_DATE,
} from 'components/profile/components/profile-edit/common/constants';

const OpportunityValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${OpportunityValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Name must be at most ${OpportunityValidationRule.NAME_MAX_LENGTH} characters long`,
  ORGANIZATION_REQUIRE: 'Organization is required',
  ORGANIZATION_MIN_LENGTH: `Organization must be at least ${OpportunityValidationRule.ORGANIZATION_MIN_LENGTH} characters long`,
  ORGANIZATION_MAX_LENGTH: `Organization must be at most ${OpportunityValidationRule.ORGANIZATION_MAX_LENGTH} characters long`,
  TYPE_REQUIRE: 'Type is required',
  TYPE_MIN_LENGTH: `Type must be at least ${OpportunityValidationRule.TYPE_MIN_LENGTH} characters long`,
  TYPE_MAX_LENGTH: `Type must be at most ${OpportunityValidationRule.TYPE_MAX_LENGTH} characters long`,
  START_DATE_REQUIRE: 'Start date is required',
  MIN_START_DATE: `Start date must be at least ${formatDate(MIN_DATE)}`,
  MAX_START_DATE: `Start date must be at most ${formatDate(MAX_DATE)}`,
};

export { OpportunityValidationMessage };
