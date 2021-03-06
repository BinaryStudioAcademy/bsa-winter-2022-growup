import { IProfileSettingStep } from './common/interfaces';
import { Button } from 'components/common/common';

interface Props extends IProfileSettingStep {
  isValid: boolean;
  onSubmit?: () => void;
}

const StepControl: React.FC<Props> = ({ isValid, onSubmit, onNext }) => {
  return (
    <div className="stepper__actions d-flex justify-content-center w-100 mt-4 align-items-center">
      <Button
        variant="gu-blue"
        className="text-gu-white"
        onClick={async (): Promise<void> => {
          await onSubmit?.();
          if (isValid) {
            onNext?.();
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default StepControl;
