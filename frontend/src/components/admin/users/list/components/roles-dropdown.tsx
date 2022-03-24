import { memo } from 'react';
import { Dropdown } from 'react-bootstrap';

import { IUser } from 'common/interfaces/user';
import { RoleType } from 'common/enums/enums';

type Props = {
  currentRole: IUser['role'];
  onChange: (roleType: IUser['role']) => void;
};

const RoleDropdown: React.FC<Props> = memo(({ currentRole, onChange }) => (
  <Dropdown>
    <Dropdown.Toggle id="dropdown-basic" className="bg-gu-blue border-0">
      {currentRole}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {Object.values(Object.assign({}, RoleType))
        .filter((value) => ![RoleType.ADMIN, currentRole].includes(value))
        .map((value: RoleType, index) => (
          <Dropdown.Item key={index} onClick={(): void => onChange(value)}>
            {value}
          </Dropdown.Item>
        ))}
    </Dropdown.Menu>
  </Dropdown>
));

export default RoleDropdown;
