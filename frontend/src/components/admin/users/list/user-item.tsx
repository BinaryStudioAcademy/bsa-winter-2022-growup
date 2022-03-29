import { memo, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import { useAppDispatch, useCallback } from 'hooks/hooks';

import { IUser } from 'common/interfaces/user';
import { RoleType } from 'common/enums/enums';
import * as adminActions from 'store/admin/actions';

import RoleDropdown from './components/roles-dropdown';
import UserControls from './components/user-controllers';
import { Modal } from 'components/common/common';
import PositionForm from './components/position-form';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [isShowPositionModal, setIsShowPositionModal] = useState(false);

  const closePositionModal = (): void => setIsShowPositionModal(false);
  const openPositionModal = (): void => setIsShowPositionModal(true);

  const changeUserRole = useCallback(
    (role: RoleType) => {
      setIsEdit(false);
      dispatch(adminActions.changeUserRole({ id: user.id, role }))
        .unwrap()
        .then(() => {
          NotificationManager.success('Changed role successfully');
        })
        .catch((err: Error) => {
          NotificationManager.error(err.message);
        });
    },
    [user.id, dispatch, closePositionModal],
  );

  return (
    <tr className="align-middle">
      <td>{user.lastName}</td>
      <td>{user.firstName}</td>
      <td>{user.email}</td>
      <td>
        {isEdit ? (
          <RoleDropdown currentRole={user.role} onChange={changeUserRole} />
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEdit ? (
          <button
            className="btn bg-gu-blue border-0 text-white"
            onClick={openPositionModal}
          >
            {user.position || 'Set position'} {user.level?.name || ''}
          </button>
        ) : (
          `${user.position || ''} ${user.level?.name || ''}`
        )}
      </td>
      <td>
        <UserControls id={user.id} show={isEdit} setShow={setIsEdit} />
      </td>
      <Modal
        show={isShowPositionModal}
        onClose={closePositionModal}
        title="Change position"
        className="d-flex flex-column gap-4"
      >
        <PositionForm onSubmit={closePositionModal} user={user}></PositionForm>
      </Modal>
    </tr>
  );
});

export default UserItem;
