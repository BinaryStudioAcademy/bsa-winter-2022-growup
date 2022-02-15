import { StepProps } from './common/step-props';
import TextField from '../../common/text-field/text-field';
import StepControl from './step-control';
import { useAppForm } from '../../../hooks/app-form/app-form.hook';
import { profileFirstStep as profileFirstStepValidationSchema } from '../../../validation-schemas/validation-schemas';
import { FirstStepPayloadKey, UserPayloadKey } from '../../../common/enums/enums';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';

const FirstStep: React.FC<StepProps> = ({ isDisablePrevious, isSubmit, onPrevious, onNext }) => {
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
      <TextField
        name={FirstStepPayloadKey.EXPERIENCE}
        label="Experience"
        control={control}
        errors={errors}
      />
      <TextField
        name={FirstStepPayloadKey.EDUCATION}
        label="Education"
        control={control}
        errors={errors}
      />
      <TextField
        name={FirstStepPayloadKey.INTERESTING_TAGS}
        label="Interesting tags"
        control={control}
        errors={errors}
      />
      <StepControl
        isValid={isValid}
        isSubmit={isSubmit}
        isDisablePrevious={isDisablePrevious}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FirstStep;
