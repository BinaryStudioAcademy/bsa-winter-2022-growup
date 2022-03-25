import { memo, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import { useAppDispatch, useCallback } from 'hooks/hooks';

import { IUser } from 'common/interfaces/user';
import { RoleType } from 'common/enums/enums';
import * as adminActions from 'store/admin/actions';

import RoleDropdown from './components/roles-dropdown';
import UserControls from './components/user-controllers';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  const changeUserRole = useCallback(
    (role: RoleType) => {
      setIsShowDropDown(false);
      dispatch(adminActions.changeUserRole({ id: user.id, role }))
        .unwrap()
        .then(() => {
          NotificationManager.success('Changed role successfully');
        })
        .catch((err: Error) => {
          NotificationManager.error(err.message);
        });
    },
    [user.id, dispatch],
  );

  return (
    <tr className="align-middle">
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>
        {isShowDropDown ? (
          <RoleDropdown currentRole={user.role} onChange={changeUserRole} />
        ) : (
          user.role
        )}
      </td>
      <td>
        <UserControls
          id={user.id}
          show={isShowDropDown}
          setShow={setIsShowDropDown}
        />
      </td>
    </tr>
  );
});

export default UserItem;
