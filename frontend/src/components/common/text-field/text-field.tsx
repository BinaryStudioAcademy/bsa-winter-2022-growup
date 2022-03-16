import { FloatingLabel } from 'react-bootstrap';
import { Control } from 'react-hook-form';
import { FormInput } from '../common';

interface Props {
  label: string;
  name: string;
  control: Control;
  errors: object;
  type?: string;
  floatingLabelStyles?: string;
  children?: JSX.Element;
}

const TextField = ({
  label,
  name,
  control,
  errors,
  type = 'text',
  floatingLabelStyles = '',
  children,
}: Props): JSX.Element => {
  return (
    <FloatingLabel label={label} className={`mb-3 ${floatingLabelStyles}`}>
      <FormInput
        name={name}
        control={control}
        errors={errors}
        type={type}
        placeholder={label}
      />
      {children}
    </FloatingLabel>
  );
};

export default TextField;
