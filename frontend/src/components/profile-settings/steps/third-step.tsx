import { IProfileSettingStep } from './common/interfaces';
import StepControl from './step-control';

interface Props extends IProfileSettingStep {}

const ThirdStep: React.FC<Props> = ({
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
