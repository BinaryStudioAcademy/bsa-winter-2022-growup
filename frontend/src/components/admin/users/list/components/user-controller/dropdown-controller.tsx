import { memo } from 'react';
import { Dropdown } from 'react-bootstrap';

type Props = {
  popup?: string;
  className?: string;
};

const UserDropdownController: React.FC<Props> = memo(
  ({ popup = 'Action', className = '', children, ...data }) => (
    <Dropdown.Item
      {...data}
      className={`d-flex text-hover-gu-pink align-items-center gap-2 ${className}`}
    >
      {children}
      {popup}
    </Dropdown.Item>
  ),
);

export default UserDropdownController;
