import { IProfileSettingStep } from './common/interfaces';
import StepControl from './step-control';
import WorkQuiz from 'components/work-quiz/work-quiz';
import { useAppSelector } from 'hooks/hooks';

interface Props extends IProfileSettingStep {}

const SecondStep: React.FC<Props> = ({ isDisablePrevious, onNext }) => {
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
      {isCompleteTest ? ( //it`s a interim solution.Need to get variable result of the test from the DB
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
