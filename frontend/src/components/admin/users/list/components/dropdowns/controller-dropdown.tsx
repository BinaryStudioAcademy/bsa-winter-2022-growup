import { Dispatch, SetStateAction, memo } from 'react';
import { Dropdown } from 'react-bootstrap';

import { IUser } from 'common/interfaces/user';

import UserControls from '../user-controller/controller-buttons';

type Props = Pick<IUser, 'id'> & {
  as?: React.FC;

  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const ControllerDropdown: React.FC<Props> = memo((data) => (
  <Dropdown align="end">
    <Dropdown.Toggle className="bg-transparent btn-gu-white border-0 user-control-btn">
      Actions
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <UserControls {...data} />
    </Dropdown.Menu>
  </Dropdown>
));

export default ControllerDropdown;
