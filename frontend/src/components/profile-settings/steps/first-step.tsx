import { IProfileSettingStep } from './common/interfaces';
import { TextField } from 'components/common/common';
import Experience from './experience';
import Education from './education';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useDispatch } from 'hooks/hooks';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';
import { insertPIB } from 'store/profile/actions';
import { FirstStepFormType } from './common/types';

const FirstStep: React.FC<IProfileSettingStep> = ({
  isDisablePrevious,
  onNext,
}) => {
  const { control, errors, isValid, handleSubmit } =
    useAppForm<FirstStepFormType>({
      defaultValues: DEFAULT_FIRST_STEP_PAYLOAD,
      validationSchema: profileFirstStepValidationSchema,
    });
  const dispatch = useDispatch();
  const onSaveSettings = (values: FirstStepFormType): void => {
    dispatch(insertPIB(values));
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
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FirstStep;
// function useAppForm<T>(arg0: { defaultValues: { [x: string]: string; }; validationSchema: import("joi").ObjectSchema<any>; }): { control: any; errors: any; isValid: any; handleSubmit: any; } {
//   throw new Error('Function not implemented.');
// }
