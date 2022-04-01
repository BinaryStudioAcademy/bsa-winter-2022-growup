import { Button } from 'react-bootstrap';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { workStyleQuizActions } from 'store/actions';
import { IQuestion, IAnswer } from 'common/interfaces/user-quiz';
import TestItem from './work-quiz-item/work-quiz-item';
import './styles.scss';
import * as profileActions from '../../store/profile/actions';
import * as authActions from '../../store/auth/actions';
import { IProfileSettingStep } from 'components/profile-settings/steps/common/interfaces';

interface Props extends IProfileSettingStep {}

const StyleTest: React.FC<Props> = ({ onNext }) => {
  const { questions, isLoading } = useAppSelector(
    (state: RootState) => state.workStyleQuiz,
  );
  const [answersCount, setAnswersCount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(workStyleQuizActions.fetchWorkStyleQuiz());
  }, []);

  useEffect(() => {
    let countAnswered = 0;
    if (questions) {
      for (let i = 0; i < questions.length; i++) {
        const currentAnswers = questions[i].answers;

        for (let y = 0; y < currentAnswers.length; y++) {
          if (currentAnswers[y].isSelected) {
            countAnswered++;
            break;
          }
        }
      }
    }

    setAnswersCount(countAnswered);
  }, [questions]);

  const handleCheckboxClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    question: IQuestion,
    answer: IAnswer,
  ): void => {
    const { answers } = question;
    const isSelected = e.target.checked;
    const newAnswers = answers.map((item) =>
      item.id === answer.id ? { ...item, isSelected } : item,
    );
    dispatch(
      workStyleQuizActions.updateWorkStyleQuizQuestion({
        ...question,
        answers: newAnswers,
      }),
    );
  };

  const handleSubmit = (): void => {
    if (questions) {
      dispatch(workStyleQuizActions.sendWorkStyleQuizResults(questions));
    }
    dispatch(profileActions.completeTest());
    dispatch(authActions.completeTest());
    onNext?.();
  };
  return (
    <>
      {!isLoading && questions && questions.length ? (
        <div className="d-flex flex-column">
          {questions.map((question, i) => (
            <div key={question.id} className="test mb-3">
              <p>
                <span>{++i}.</span> <b>{question.question}</b>
              </p>
              {question.answers.map((answer) => (
                <TestItem
                  key={answer.id}
                  question={question}
                  answer={answer}
                  onCheckboxClick={handleCheckboxClick}
                  name={i}
                />
              ))}
            </div>
          ))}
          <Button
            className={`align-self-center test-submit ${
              answersCount !== questions.length ? 'test-submit_disabled' : ''
            }`}
            variant="primary"
            disabled={answersCount !== questions.length}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      ) : (
        <div> No questions </div>
      )}
    </>
  );
};

export default StyleTest;
