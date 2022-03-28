import { ButtonHTMLAttributes, memo } from 'react';
import { ButtonProps } from 'react-bootstrap';

import Button from './button';

type Props = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const ControlButton: React.FC<Props> = memo(
  ({ className = '', children, ...props }) => (
    <Button
      variant="gu-white"
      className={`user-control-btn border-0  ${className}`}
      {...props}
    >
      {children}
    </Button>
  ),
);

export default ControlButton;
