import { StepProps } from './common/step-props';
import StepControl from './step-control';
import WorkQuiz from 'components/work-quiz/work-quiz';
import { useAppSelector } from 'hooks/hooks';

const SecondStep: React.FC<StepProps> = ({ isDisablePrevious, onNext }) => {
  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log('onSubmit second step');
  };
  const isCompleteTest = useAppSelector(
    (store) => store.profile.user?.isCompleteTest,
  );
  const { result } = useAppSelector((state) => state.workStyleQuiz);

  return (
    <div className="stepper__form">
      <WorkQuiz />
      {isCompleteTest ? (
        result ? (
          <StepControl
            isValid={true}
            isDisablePrevious={isDisablePrevious}
            onNext={onNext}
            onSubmit={onSubmit}
          />
        ) : null
      ) : null}
    </div>
  );
};
export default SecondStep;
