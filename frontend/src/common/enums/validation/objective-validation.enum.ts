import { OkrValidationRule } from './okr-validation-rule.enum';

interface IObjectiveValidationMessage {
  NAME_REQUIRE: string;
  NAME_MIN_LENGTH: string;
  NAME_MAX_LENGTH: string;
}

const ObjectiveValidationMessage = (): IObjectiveValidationMessage => {
  return {
    NAME_REQUIRE: 'Name is required',
    NAME_MIN_LENGTH: `Name must be at least ${OkrValidationRule.OKR_NAME_MIN_LENGTH} characters long`,
    NAME_MAX_LENGTH: `Name must be at most ${OkrValidationRule.OKR_NAME_MAX_LENGTH} characters long`,
  };
};

export { ObjectiveValidationMessage };
