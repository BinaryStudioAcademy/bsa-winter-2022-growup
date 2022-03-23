import { IProfileSettingStep } from './common/interfaces';
import { TextField } from 'components/common/common';
import Experience from './experience';
import Education from './education';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm, useAppSelector, useDispatch } from 'hooks/hooks';
import { someFunc } from './common/constants';
import { finishRegistration } from 'store/auth/actions';
import { FirstStepFormType } from './common/types';
import { IUser } from 'common/interfaces/user';

const FirstStep: React.FC<IProfileSettingStep> = ({
  isDisablePrevious,
  onNext,
}) => {
  const user = useAppSelector((store) => store.profile.user) as IUser;

  const { control, errors, isValid, handleSubmit } =
    useAppForm<FirstStepFormType>({
      defaultValues: someFunc(user),
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
        initialValue="ABC"
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
