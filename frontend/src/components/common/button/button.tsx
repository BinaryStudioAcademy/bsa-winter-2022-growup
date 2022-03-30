import { memo, ButtonHTMLAttributes } from 'react';
import { Button as BSButton, ButtonProps } from 'react-bootstrap';

type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = memo(
  ({ className = '', children, ...props }) => (
    <BSButton className={`fs-5 fw-bold border-2 ${className}`} {...props}>
      {children}
    </BSButton>
  ),
);

export default Button;
