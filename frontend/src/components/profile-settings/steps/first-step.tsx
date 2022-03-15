import { IProfileSettingStep } from './common/interfaces';
import { TextField } from 'components/common/common';
import Experience from './experience';
import Education from './education';
import InterestingTags from './interesting-tags';
import StepControl from './step-control';
import { profileFirstStep as profileFirstStepValidationSchema } from 'validation-schemas/validation-schemas';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_FIRST_STEP_PAYLOAD } from './common/constants';
import { FirstStepPayloadKey, UserPayloadKey } from 'common/enums/enums';
import * as userAction from '../../../store/profile/actions';
import { useAppDispatch } from 'hooks/store/store.hooks';

interface Props extends IProfileSettingStep {}

const FirstStep: React.FC<Props> = ({ isDisablePrevious, onNext }) => {
  const { control, errors, isValid, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_FIRST_STEP_PAYLOAD,
    validationSchema: profileFirstStepValidationSchema,
  });
  const dispatch = useAppDispatch();
  const onSaveSettings = (values: object): void => {
    dispatch(userAction.insertPIB(values));
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
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default FirstStep;
