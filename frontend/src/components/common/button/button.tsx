import { FormEvent } from 'react';
import { Button as BSButton } from 'react-bootstrap';

enum ButtonTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

interface Props {
  className?: string;
  text?: string;
  onSubmit?: (a: FormEvent) => void;
  type?: string;
  disabled?: boolean;
  variant?: string;
}

const Button: React.FC<Props> = ({
  className = '',
  children,
  disabled = false,
  variant = '',
  type = 'button',
  onSubmit,
}) => (
  <BSButton
    className={className}
    onClick={onSubmit}
    disabled={disabled}
    variant={variant}
    type={type as ButtonTypes}
  >
    {children}
  </BSButton>
);

export default Button;
