import { ShieldFillCheck } from 'react-bootstrap-icons';

import { IUser } from 'common/interfaces/user';
import { UserAvatar } from 'components/common/common';

import './styles.scss';

type Props = Pick<
  IUser,
  'avatar' | 'firstName' | 'lastName' | 'domainName' | 'name'
>;

const ProfileHeader: React.FC<Props> = ({
  avatar,
  firstName,
  lastName,
  domainName,
  name,
}) => {
  return (
    <>
      <div className="profile-header d-flex">
        <div className="profile">
          <UserAvatar
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            size="148"
          />
        </div>
        <div className="profile-description d-flex justify-content-center">
          <p className="profile-description__name fs-2 text-gu-black fw-bold">
            {firstName} {lastName}
          </p>
          <p className="profile-description__position fs-4">{domainName}</p>
          <div className="level d-flex align-items-center">
            <ShieldFillCheck className="level__icon" />
            <p className="level__text fs-6">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
