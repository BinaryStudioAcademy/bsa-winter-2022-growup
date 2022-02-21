import avatar from 'assets/img/profile-avatar.png';
import '../profile/header/styles.scss';

const ProfileHeader: React.FC = () => (
  <div className="header d-flex">
    <div className="profile">
      <img className="profile__avatar" src={avatar} alt="Avatar" />
    </div>
    <div className="profile-description d-flex justify-content-center mx-3">
      <p className="profile-description__name fs-2 text-gu-black fw-bold">
        Cristofer Westervelt
      </p>
      <p className="profile-description__position fs-4">
        Fullstack JS Engineer
      </p>
    </div>
  </div>
);

export default ProfileHeader;
