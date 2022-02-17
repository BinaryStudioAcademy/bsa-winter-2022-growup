import { FloatingLabel } from 'react-bootstrap';
import FormInput from '../form-input/form-input';
import { Control } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  control: Control;
  errors: object;
  type?: string;
}

const TextField = ({ label, name, control, errors, type = 'text' }: Props): JSX.Element => {
  return (
    <FloatingLabel label={label} className="mb-3">
      <FormInput
        name={name}
        control={control}
        errors={errors}
        type={type}
        placeholder={label}
      />
    </FloatingLabel>
  );
};

export default TextField;
