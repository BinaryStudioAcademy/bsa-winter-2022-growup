import { FloatingLabel, Form } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import { forwardRef } from 'react';
import { RefCallBack } from 'react-hook-form';

interface Props {
  dateRef: RefCallBack;
  errors: object;
  name?: string;
  value?: string;
  placeholder?: string;
}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ dateRef, errors, name = '', value, placeholder, ...props }, ref) => (
    <FloatingLabel controlId={`custom-input-${name}`} label={placeholder}>
      <Form.Control
        {...props}
        value={value}
        placeholder={placeholder}
        ref={(e: HTMLInputElement): void => {
          typeof ref === 'function' && ref(e);
          dateRef && dateRef?.(e);
        }}
      />
      <span className="fs-6 text-gu-pink error">
        <ErrorMessage errors={errors} name={name} />
      </span>
    </FloatingLabel>
  ),
);

export default CustomInput;
