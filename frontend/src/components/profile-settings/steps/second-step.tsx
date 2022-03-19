import { IProfileSettingStep } from './common/interfaces';
import WorkQuiz from 'components/work-quiz/work-quiz';
interface Props extends IProfileSettingStep {}

const SecondStep: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="stepper__form">
      <WorkQuiz onNext={onNext} />
    </div>
  );
};
export default SecondStep;
