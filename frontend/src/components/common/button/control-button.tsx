import { ButtonHTMLAttributes, memo } from 'react';
import { OverlayTrigger, ButtonProps, Tooltip } from 'react-bootstrap';

import Button from './button';

type Props = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    popup?: string;
  };

const ControlButton: React.FC<Props> = memo(
  ({ popup = 'Action', className = '', children, ...props }) => {
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip>{popup}</Tooltip>}>
        {({ ref, ...triggerHandler }): JSX.Element => (
          <Button
            variant="gu-white"
            className={`user-control-btn border-0  ${className}`}
            {...triggerHandler}
            {...props}
          >
            <span ref={ref}>{children}</span>
          </Button>
        )}
      </OverlayTrigger>
    );
  },
);

export default ControlButton;
