import { IProfileSettingStep } from './common/interfaces';
import StepControl from './step-control';
import WorkQuiz from 'components/work-quiz/work-quiz';

interface Props extends IProfileSettingStep {}

const SecondStep: React.FC<Props> = ({
  isDisablePrevious,
  onPrevious,
  onNext,
}) => {
  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log('onSubmit second step');
  };

  return (
    <div className="stepper__form">
      <WorkQuiz />
      <StepControl
        isValid={true}
        isDisablePrevious={isDisablePrevious}
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SecondStep;
