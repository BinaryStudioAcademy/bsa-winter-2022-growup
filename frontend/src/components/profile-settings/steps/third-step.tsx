import { StepProps as Props } from './common/interfaces';
import StepControl from './step-control';

const ThirdStep: React.FC<Props> = ({
  children,
  isDisablePrevious,
  onPrevious,
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
        onPrevious={onPrevious}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ThirdStep;
