import { memo } from 'react';
import { NotificationManager } from 'react-notifications';
import { IUser } from 'common/interfaces/user';
import { Trash } from 'react-bootstrap-icons';
import { useAppDispatch } from 'hooks/store/store.hooks';
import * as adminActions from '../../../../store/admin/actions';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  const dispatch = useAppDispatch();
  return (
    <tr>
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>{user.roleType}</td>
      <td
        onClick={(): void => {
          dispatch(adminActions.deleteUser(user.id))
            .unwrap()
            .then(() => {
              NotificationManager.success('User was successfully deleted');
            })
            .catch((err: Error) => {
              NotificationManager.error(err.message);
            });
        }}
      >
        {<Trash className="cursor-pointer" />}
      </td>
    </tr>
  );
});

export default UserItem;
