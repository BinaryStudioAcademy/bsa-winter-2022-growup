import { FloatingLabel } from 'react-bootstrap';
import {
  Control,
  DeepMap,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { FormInput } from '../common';

interface Props<T> {
  name: FieldPath<T>;
  errors: DeepMap<FieldValues, FieldError>;
  control: Control<T>;
  label: string;
  type?: string;
  floatingLabelStyles?: string;
  children?: JSX.Element;
  textarea?: boolean;
}

function TextField<T>({
  label,
  name,
  control,
  errors,
  type = 'text',
  floatingLabelStyles = '',
  children,
  textarea,
}: Props<T>): JSX.Element {
  return (
    <FloatingLabel label={label} className={`mb-3 ${floatingLabelStyles}`}>
      <FormInput
        name={name}
        control={control}
        errors={errors}
        type={type}
        placeholder={label}
        textarea={textarea}
      />
      {children}
    </FloatingLabel>
  );
}

export default TextField;
