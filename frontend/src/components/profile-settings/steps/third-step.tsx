import { StepProps } from './common/step-props';
import StepControl from './step-control';

const ThirdStep: React.FC<StepProps> = ({
  children,
  isDisablePrevious,
  onNext,
}) => {
  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log('onSubmit third step');
  };

  return (
    <div className="stepper__form">
      third step {children}
      <StepControl
        isValid={true}
        isDisablePrevious={isDisablePrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ThirdStep;
