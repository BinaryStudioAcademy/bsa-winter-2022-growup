import { FormEvent } from 'react';

interface Props {
  props?: string;
  className?: string;
  text?: string;
  onSubmit?: (a: FormEvent) => void;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  props = '',
  className = '',
  onSubmit,
  children,
}) => (
  <button
    className={props ? `btn ${props}` : `${className}`}
    onClick={onSubmit}
  >
    {children}
  </button>
);

export default Button;
