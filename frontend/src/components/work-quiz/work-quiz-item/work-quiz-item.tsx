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
  name: number;
};

const TestItem: React.FC<Props> = ({
  answer,
  question,
  onCheckboxClick,
  name,
}) => {
  return (
    <Form.Check className="test-item">
      <Form.Check.Input
        className="test-item__checkbox"
        type="radio"
        onChange={(e): void => onCheckboxClick(e, question, answer)}
        name={String(name)}
      />
      <Form.Check.Label className="test-item__label">
        {answer.answer}
      </Form.Check.Label>
    </Form.Check>
  );
};

export default TestItem;
