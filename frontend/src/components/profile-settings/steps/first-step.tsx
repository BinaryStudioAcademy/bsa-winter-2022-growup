import { IProfileSettingStep } from './common/interfaces';
import { TextField } from 'components/common/common';
import Experience from './experience';
import Education from './education';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';
import { FirstStepForm } from './common/types';

const FirstStep: React.FC<IProfileSettingStep> = ({
  isDisablePrevious,
  onPrevious,
  onNext,
}) => {
  const { control, errors, isValid, handleSubmit } = useAppForm<FirstStepForm>({
    defaultValues: DEFAULT_FIRST_STEP_PAYLOAD,
    validationSchema: profileFirstStepValidationSchema,
  });

  const onSaveSettings = (values: FirstStepForm): void => {
    // eslint-disable-next-line no-console
    console.log('save settings:', values);
  };

  const onSubmit = handleSubmit(onSaveSettings);

  return (
    <div className="stepper__form">
      <TextField
        label="First name"
        name={'firstName'}
        control={control}
        errors={errors}
      />
      <TextField
        name={'lastName'}
        label="Last name"
        control={control}
        errors={errors}
      />
      <TextField
        name={'position'}
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
