import { StepProps } from './common/step-props';
import StepControl from './step-control';

const SecondStep: React.FC<StepProps> = ({ children, isDisablePrevious, onPrevious, onNext }) => {
  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log('onSubmit second step');
  };

  return (
    <div className="stepper__form">
      second step {children}

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
