import { FormEvent } from 'react';

interface Props {
  className?: string;
  text?: string;
  onSubmit?: (a: FormEvent) => void;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ className = '', onSubmit, children }) => (
  <button className={`${className}`} onClick={onSubmit}>
    {children}
  </button>
);

export default Button;
