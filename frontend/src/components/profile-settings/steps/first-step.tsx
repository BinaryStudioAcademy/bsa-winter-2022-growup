import { EyeSlash, Eye } from 'react-bootstrap-icons';

import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';

import { useState, useAppForm, useDispatch } from 'hooks/hooks';
import { finishRegistration } from 'store/auth/actions';

import { IProfileSettingStep } from './common/interfaces';
import { FirstStepFormType } from './common/types';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';

import { TextField } from 'components/common/common';
import EducationSection from 'components/profile/profile-main/education-section';
import CareerJourneySection from 'components/profile/profile-main/career-journey-section';

import InterestingTags from './interesting-tags';
import StepControl from './step-control';

const FirstStep: React.FC<IProfileSettingStep> = ({
  isDisablePrevious,
  onNext,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="stepper__form  w-100">
      <p className="text-gu-pink fw-bold fs-5 text-center mb-3">
        You have to fill the required steps for get access to functional of
        website
      </p>
      <div className="d-flex   flex-column ">
        <div className="stepper__form--first-block flex-grow-0 flex-shrink-1 mb-2">
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            control={control}
            errors={errors}
            floatingLabelStyles={'d-flex flex-wrap'}
            children={
              <button
                className="auth-form__icon input-group-text position-absolute"
                onClick={(): void => setShowPassword((state) => !state)}
                type="button"
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </button>
            }
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
        </div>
        <div className="flex-grow-1 flex-shrink-1 w-100">
          <CareerJourneySection />
          <EducationSection />
          <InterestingTags />
        </div>
      </div>
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
