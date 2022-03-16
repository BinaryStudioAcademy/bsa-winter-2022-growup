import { Button } from 'components/common/common';
import { IProfileSettingStep } from './common/interfaces';

interface Props extends IProfileSettingStep {
  isValid: boolean;
  onSubmit?: () => void;
}

const StepControl: React.FC<Props> = ({
  isValid,
  isDisablePrevious = false,
  onPrevious,
  onSubmit,
  onNext,
}) => {
  return (
    <div className="stepper__actions d-flex justify-content-between w-100 mt-4">
      <Button
        themeType={'btn-gu-pink text-gu-white'}
        onSubmit={(): void => onPrevious?.()}
        disabled={isDisablePrevious}
      >
        Previous
      </Button>

      <Button
        themeType={'btn-gu-blue text-gu-white'}
        onSubmit={async (): Promise<void> => {
          await onSubmit?.();
          if (isValid) {
            onNext?.();
          }
        }}
      >
        Go to Questionnaire
      </Button>
    </div>
  );
};

export default StepControl;
