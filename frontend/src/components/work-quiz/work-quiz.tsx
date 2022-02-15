import { Form } from 'react-bootstrap';
import { RootState } from 'common/types/types';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import {  userQuizActions } from 'store/actions';

const StyleTest: React.FC  = () => {
  const { questions, isLoading } = useAppSelector((state: RootState) => state.userQuiz);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userQuizActions.fetchWorkStyleQuiz());
  }, []);

  return (
    <>
      { !isLoading && questions ?
        questions.map(question =>
          <div key={question.id} className="test mb-3">
            <p>{question.question}</p>
            {question.answers.map(answer =>
              <Form.Check key={answer.id} className="test-item">
                  <Form.Check.Input className="test-item__checkbox" type="checkbox" isValid />
                  <Form.Check.Label className="test-item__label">
                    {answer.answer}
                  </Form.Check.Label>
              </Form.Check> )}
          </div>)
        : <div> No questions </div>
      }
    </>
  );
};

export default StyleTest;
