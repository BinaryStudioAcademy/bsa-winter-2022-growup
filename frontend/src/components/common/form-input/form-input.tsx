import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';

interface IFormInput {
  name: string,
  control: Control<object, object>,
  type: string,
  placeholder: string
}

const FormInput = ({ name, control, type, placeholder }: IFormInput): JSX.Element => {
  const { field } = useController<any>({ name, control });

  return (
    <Form.Control
      {...field}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default FormInput;
