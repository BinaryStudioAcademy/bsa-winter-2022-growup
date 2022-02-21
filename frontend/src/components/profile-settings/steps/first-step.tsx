import { StepProps as Props } from './common/interfaces';
import TextField from '../../common/text-field/text-field';
import Experience from './experience';
import Education from './education';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { useAppForm } from '../../../hooks/app-form/app-form.hook';
import { profileFirstStep as profileFirstStepValidationSchema } from '../../../validation-schemas/validation-schemas';
import {
  FirstStepPayloadKey,
  UserPayloadKey,
} from '../../../common/enums/enums';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';

const FirstStep: React.FC<Props> = ({
  isDisablePrevious,
  onPrevious,
  onNext,
}) => {
  const { control, errors, isValid, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_FIRST_STEP_PAYLOAD,
    validationSchema: profileFirstStepValidationSchema,
  });

  const onSaveSettings = (values: object): void => {
    // eslint-disable-next-line no-console
    console.log('save settings:', values);
  };

  const onSubmit = handleSubmit(onSaveSettings);

  return (
    <div className="stepper__form">
      <TextField
        label="First name"
        name={UserPayloadKey.FIRST_NAME}
        control={control}
        errors={errors}
      />
      <TextField
        name={UserPayloadKey.LAST_NAME}
        label="Last name"
        control={control}
        errors={errors}
      />
      <TextField
        name={FirstStepPayloadKey.POSITION}
        label="Position"
        control={control}
        errors={errors}
      />
      <Experience />
      <Education />
      <InterestingTags />
      <StepControl
        isValid={isValid}
        isDisablePrevious={isDisablePrevious}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FirstStep;
