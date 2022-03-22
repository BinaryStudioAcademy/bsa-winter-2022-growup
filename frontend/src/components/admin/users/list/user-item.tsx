import { memo, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { IUser } from 'common/interfaces/user';
import { Trash, Pencil, XLg } from 'react-bootstrap-icons';
import { useAppDispatch } from 'hooks/store/store.hooks';
import * as adminActions from '../../../../store/admin/actions';
import { Button, Dropdown } from 'react-bootstrap';
import { RoleType } from 'common/enums/enums';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  const changeUserRole = (userId: string, roleType: RoleType): void => {
    setIsShowDropDown(false);
    dispatch(adminActions.changeUserRole({ userId, roleType }))
      .unwrap()
      .then(() => {
        NotificationManager.success('Changed role successfully');
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  const deleteUser = (id: string): void => {
    dispatch(adminActions.deleteUser(id))
      .unwrap()
      .then(() => {
        NotificationManager.success('User was successfully deleted');
      })
      .catch((err: Error) => {
        NotificationManager.error(err.message);
      });
  };

  return (
    <tr className="align-middle users__row cursor-pointer">
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>
        {isShowDropDown ? (
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="bg-gu-blue border-0"
            >
              {user.roleType}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.roleType == RoleType.MENTOR ? (
                <Dropdown.Item
                  onClick={(): void => changeUserRole(user.id, RoleType.MENTEE)}
                >
                  {RoleType.MENTEE}
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  onClick={(): void => changeUserRole(user.id, RoleType.MENTOR)}
                >
                  {RoleType.MENTOR}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          user.roleType
        )}
      </td>
      <td className="text-end">
        {isShowDropDown ? (
          <Button
            className="btn btn-gu-white btn-outline-gu-black  user-control-btn  invisible"
            onClick={(): void => {
              setIsShowDropDown(false);
            }}
          >
            <XLg />
          </Button>
        ) : (
          <Button
            className="btn btn-gu-white btn-outline-gu-black  user-control-btn  invisible"
            onClick={(): void => {
              setIsShowDropDown(true);
            }}
          >
            <Pencil />
          </Button>
        )}

        <Button
          className="btn btn-gu-white btn-outline-gu-black  invisible"
          onClick={(): void => deleteUser(user.id)}
        >
          <Trash className="delete-user-btn" />
        </Button>
      </td>
    </tr>
  );
});

export default UserItem;
