import { Form } from 'react-bootstrap';
import './styles.scss';

interface Props {
  type?: 'checkbox' | 'radio';
  name: string;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const ListItem: React.FC<Props> = ({
  type = 'checkbox',
  name,
  value,
  onClick,
}) => {
  return (
    <Form.Check className="level-item align-self-center">
      <Form.Check.Input
        className="level-item__button"
        type={type}
        name={name}
        onChange={onClick}
        value={value}
      />
      <Form.Check.Label className="test-item__label">{value}</Form.Check.Label>
    </Form.Check>
  );
};

export default ListItem;
