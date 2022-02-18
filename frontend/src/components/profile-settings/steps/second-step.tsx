import { StepProps } from './common/step-props';
import StepControl from './step-control';
import WorkQuiz from 'components/work-quiz/work-quiz';
const SecondStep: React.FC<StepProps> = ({
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
