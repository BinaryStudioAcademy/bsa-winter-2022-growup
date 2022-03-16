import { Form, FloatingLabel } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';

import './styles.scss';

interface IOptions {
  value: string;
  label: string;
}

interface Props {
  name: string;
  errors: object;
  options: IOptions[];
}

const FormSelect: React.FC<Props> = ({ name, errors, options }) => {
  return (
    <>
      <Form.Group controlId="formBasicSelect">
        <FloatingLabel
          controlId="education-university"
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          className="mb-3"
        >
          <Form.Select>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <span className="fs-6 text-gu-pink error mt-2">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default FormSelect;
