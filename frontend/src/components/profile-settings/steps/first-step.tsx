import { IProfileSettingStep } from './common/interfaces';
import { TextField } from 'components/common/common';
import EducationSection from 'components/profile/profile-main/education-section';
import CareerJourneySection from 'components/profile/profile-main/career-journey-section';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useDispatch } from 'hooks/hooks';
import { finishRegistration } from 'store/auth/actions';
import { FirstStepFormType } from './common/types';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';

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
    dispatch(finishRegistration(values));
  };

  const onSubmit = handleSubmit(onSaveSettings);

  return (
    <div className="stepper__form">
      <TextField
        label="Password"
        type="password"
        name="password"
        control={control}
        errors={errors}
      />
      <TextField
        label="First name"
        name="firstName"
        control={control}
        errors={errors}
      />
      <TextField
        name="lastName"
        label="Last name"
        control={control}
        errors={errors}
      />
      <TextField
        name="position"
        label="Position"
        control={control}
        errors={errors}
      />
      <CareerJourneySection />
      <EducationSection />
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
