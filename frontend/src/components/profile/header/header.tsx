import { PencilFill, ShieldFillCheck } from 'react-bootstrap-icons';
import { useState, useCallback } from 'hooks/hooks';

import { IUser } from 'common/interfaces/user';
import { UserAvatar } from 'components/common/common';

import EditAvatar from './edit-avatar';

import './styles.scss';

type Props = Pick<IUser, 'avatar' | 'firstName' | 'lastName'>;

const Header: React.FC<Props> = ({ avatar, firstName, lastName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = useCallback(() => setIsModalVisible(false), []);
  const showModal = useCallback(() => setIsModalVisible(true), []);

  return (
    <>
      <div className="profile-header d-flex">
        <div className="profile">
          <UserAvatar
            avatar={avatar}
            firstName={firstName}
            lastName={lastName}
            size="148"
          />
          <div className="profile__edit d-flex align-items-center justify-content-center position-absolute">
            <PencilFill className="edit-button" onClick={showModal} />
          </div>
        </div>
        <div className="profile-description d-flex justify-content-center">
          <p className="profile-description__name fs-2 text-gu-black fw-bold">
            {firstName} {lastName}
          </p>
          <p className="profile-description__position fs-4">
            Fullstack JS Engineer
          </p>
          <div className="level d-flex align-items-center">
            <ShieldFillCheck className="level__icon" />
            <p className="level__text fs-6">Level 2</p>
          </div>
          <EditAvatar
            show={isModalVisible}
            onClose={closeModal}
            title="Update avatar"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
