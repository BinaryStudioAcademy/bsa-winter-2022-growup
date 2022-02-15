interface IStep {
  component: JSX.Element,
}

interface Props {
  steps: IStep[];
  activeStep: number;
}

const Stepper: React.FC<Props> = ({ steps, activeStep }) => {
  return (
    <div className="stepper__panel w-100">
      {
        steps.map((step, i) =>
          <div key={i} className={`stepper__step ${activeStep === i && 'is-active'} ${activeStep > i && 'is-complete'}`}>
            <div className="stepper__indicator">
              <span className="stepper__info">{i + 1}</span>
            </div>
          </div>)
      }
    </div>
  );
};

export default Stepper;
