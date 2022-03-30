import { ErrorMessage } from '@hookform/error-message';
import { Form } from 'react-bootstrap';
import {
  Control,
  DeepMap,
  FieldError,
  FieldPath,
  FieldValues,
  Path,
  useController,
  UseControllerReturn,
} from 'react-hook-form';
import './styles.scss';

interface Props<T> {
  name: FieldPath<T>;
  errors: DeepMap<FieldValues, FieldError>;
  control: Control<T>;
  type: string;
  placeholder: string;
  textarea?: boolean;
  disabled?: boolean;
}

function FormInput<T>({
  name,
  errors,
  control,
  type,
  placeholder,
  textarea,
  disabled,
}: Props<T>): JSX.Element {
  const {
    field: { value, ...field },
  }: UseControllerReturn<T, Path<T>> = useController<T>({ name, control });
  const fieldValue = value as string;
  console.warn(errors);
  console.warn(name);
  return (
    <>
      <Form.Control
        {...field}
        value={fieldValue}
        type={type}
        placeholder={placeholder}
        as={textarea ? 'textarea' : 'input'}
        disabled={disabled}
      />

      <span className="fs-6 text-gu-pink error mt-2">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </>
  );
}

export default FormInput;
