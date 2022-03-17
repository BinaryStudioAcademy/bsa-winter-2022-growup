import { IProfileSettingStep } from './common/interfaces';

interface Props extends IProfileSettingStep {
  isValid: boolean;
  onSubmit?: () => void;
}

const StepControl: React.FC<Props> = ({ isValid, onSubmit, onNext }) => {
  return (
    <div className="stepper__actions d-flex justify-content-center w-100 mt-4 align-items-center">
      <button
        className="btn btn-gu-blue text-gu-white"
        onClick={async (): Promise<void> => {
          await onSubmit?.();
          if (isValid) {
            onNext?.();
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default StepControl;
