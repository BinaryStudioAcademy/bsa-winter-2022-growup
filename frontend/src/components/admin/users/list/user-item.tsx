import { memo, useState } from 'react';
import { NotificationManager } from 'react-notifications';

import { useAppDispatch, useCallback } from 'hooks/hooks';

import { IUser } from 'common/interfaces/user';
import { RoleType } from 'common/enums/enums';
import * as adminActions from 'store/admin/actions';

import { Modal } from 'components/common/common';
import PositionForm from './components/position-form';
import RoleDropdown from './components/dropdowns/roles-dropdown';
import ControllerDropdown from './components/dropdowns/controller-dropdown';

import UserControls from './components/user-controller/controller-buttons';
import DropdownControlls from './components/user-controller/dropdown-controller';

type Props = {
  user: IUser;
};

const UserItem: React.FC<Props> = memo(({ user }) => {
  const dispatch = useAppDispatch();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [isShowPositionModal, setIsShowPositionModal] = useState(false);

  const closePositionModal = (): void => setIsShowPositionModal(false);
  const openPositionModal = (): void => setIsShowPositionModal(true);

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
    [user.id, dispatch, closePositionModal],
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
        {isShowDropDown ? (
          <button
            className="btn bg-gu-blue border-0 text-white"
            onClick={openPositionModal}
          >
            {user?.position || 'Set position'}
          </button>
        ) : (
          user?.position || ''
        )}
      </td>
      <td style={{ width: '1%', whiteSpace: 'nowrap' }}>
        <div className="d-xs-block d-md-none">
          <ControllerDropdown
            id={user.id}
            show={isShowDropDown}
            setShow={setIsShowDropDown}
            as={DropdownControlls}
          />
        </div>
        <div className="d-none d-md-block">
          <UserControls
            id={user.id}
            show={isShowDropDown}
            setShow={setIsShowDropDown}
          />
        </div>
      </td>
      <td>
        <UserControls
          id={user.id}
          show={isShowDropDown}
          setShow={setIsShowDropDown}
        />
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
