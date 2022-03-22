interface IStep {
  component: JSX.Element;
}

interface Props {
  steps: IStep[];
  activeStep: number;
  changeStepClicker: (num: number) => void;
  lastActiveStep: number;
}

const Stepper: React.FC<Props> = ({
  steps,
  activeStep,
  changeStepClicker,
  lastActiveStep,
}) => {
  return (
    <div className="stepper__panel position-relative d-table w-100">
      {steps.map((step, i) => {
        const isComplete = i < lastActiveStep;
        return (
          <div
            key={i}
            className={`stepper__step position-relative d-table-cell 
            ${activeStep === i && 'is-active '} ${
              isComplete ? 'is-complete ' : ''
            }`}
          >
            <div className="position-relative d-block">
              <span
                className={`stepper__info position-relative d-inline-block fs-2
                ${isComplete ? 'stepper__step--cursor-active' : ''}`}
                onClick={(): void => {
                  isComplete ? changeStepClicker(i) : null;
                }}
              >
                {i + 1}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
