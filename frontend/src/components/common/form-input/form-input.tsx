import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './styles.module.scss';

interface IFormInput {
  name: string,
  control: Control<object, object>,
  errors: object,
  type: string,
  placeholder: string
}

const FormInput = ({ name, control, errors, type, placeholder }: IFormInput): JSX.Element => {
  const { field } = useController<any>({ name, control });

  return (
    <>
      <Form.Control
        {...field}
        type={type}
        placeholder={placeholder}
        required
      />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
};

export default FormInput;
