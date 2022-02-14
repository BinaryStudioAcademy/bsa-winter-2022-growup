import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';
import './styles.scss';

interface Props {
  name: string;
  errors: object;
  control: Control;
  type: string;
  placeholder: string;
}

const FormInput = ({
  name,
  errors,
  control,
  type,
  placeholder,
}: Props): JSX.Element => {
  const { field } = useController({ name, control });

  return (
    <>
      <Form.Control {...field} type={type} placeholder={placeholder} />
      <span className="fs-6 text-gu-pink error">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default FormInput;
