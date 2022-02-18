interface IStep {
  component: JSX.Element;
}

interface Props {
  steps: IStep[];
  activeStep: number;
}

const Stepper: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <div className="stepper__panel position-relative d-table w-100">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`stepper__step position-relative d-table-cell ${
            activeStep === i && 'is-active'
          } ${activeStep > i && 'is-complete'}`}
        >
          <div className="position-relative d-block">
            <span className="stepper__info position-relative d-inline-block fs-2">
              {i + 1}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
