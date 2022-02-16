import { StepProps } from './common/step-props';

interface Props extends StepProps {
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
    <div className="stepper__actions w-100 mt-4">
      <button
        className="btn btn-gu-pink text-gu-white"
        onClick={(): void => onPrevious?.()}
        disabled={isDisablePrevious}
      >
        Previous
      </button>

      <button
        className="btn btn-gu-blue text-gu-white"
        onClick={async (): Promise<void> => {
          await onSubmit?.();
          if (isValid) {
            onNext?.();
          }
        }}
      >
        Go to Questionnaire for determining my level
      </button>
    </div>
  );
};

export default StepControl;
