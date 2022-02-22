import { Button } from 'react-bootstrap';
import { RootState } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { workStyleQuizActions } from 'store/actions';
import { IQuestion, IAnswer } from 'common/interfaces/user-quiz';
import TestItem from './work-quiz-item/work-quiz-item';
import './styles.scss';

const StyleTest: React.FC = () => {
  const { questions, isLoading, result } = useAppSelector(
    (state: RootState) => state.workStyleQuiz,
  );

  const [answersCount, setAnswersCount] = useState(0);
  const [isPassedTest, setIsPassedTest] = useState(false);

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

    setIsPassedTest(true);
  };

  if (isPassedTest && result) {
    const sortedByScore = [...result];
    sortedByScore.sort((res1, res2) => res2.score - res1.score);
    const maxCategories = sortedByScore.filter(
      (res) => res.score === sortedByScore[0].score,
    );

    return (
      <div className="test-result">
        <h3 className="test-result__title fs-2"> Work style test result: </h3>
        <ul className="test-result-items fs-5">
          {result.map((res, i) => (
            <li className="test-result__item p-1 m-0" key={i}>
              <span className="pb-1">
                {res.quizCategory.name}: {res.score}
              </span>
            </li>
          ))}
        </ul>
        <p className="test-conclusion fs-4">
          {maxCategories.length > 1 ? (
            <span className="test-conclusion__title fw-bolder">
              You have a few dominant styles:{' '}
            </span>
          ) : (
            <span className="test-conclusion__title fw-bolder">
              Your dominant style is{' '}
            </span>
          )}
          {maxCategories.map((res, i) => {
            if (i === maxCategories.length - 1) {
              return <i key={i}>{`${res.quizCategory.name}.`}</i>;
            }

            return <i key={i}>{`${res.quizCategory.name}, `}</i>;
          })}
        </p>
      </div>
    );
  }

  return (
    <>
      {!isLoading && questions && questions.length ? (
        <div>
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
                />
              ))}
            </div>
          ))}
          <Button
            className={`test-submit ${
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
