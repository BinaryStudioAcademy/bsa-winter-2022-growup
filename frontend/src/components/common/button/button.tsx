import { ButtonHTMLAttributes, FormEvent } from 'react';

interface Props {
  className?: string;
  text?: string;
  onClick?: (a: FormEvent) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  className = '',
  onClick,
  type,
  children,
}) => (
  <button type={type} className={`${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
