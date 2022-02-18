import { Form } from 'react-bootstrap';
import { IAnswer, IQuestion } from 'common/interfaces/user-quiz';
import './styles.scss';

type Props = {
  answer: IAnswer;
  question: IQuestion;
  onCheckboxClick: (
    e: React.ChangeEvent<HTMLInputElement>,
    question: IQuestion,
    answer: IAnswer,
  ) => void;
};

const TestItem: React.FC<Props> = ({ answer, question, onCheckboxClick }) => {
  return (
    <Form.Check className="test-item">
      <Form.Check.Input
        className="test-item__checkbox"
        type="checkbox"
        onChange={(e): void => onCheckboxClick(e, question, answer)}
      />
      <Form.Check.Label className="test-item__label">
        {answer.answer}
      </Form.Check.Label>
    </Form.Check>
  );
};

export default TestItem;
