import avatar from 'assets/img/profile-avatar.png';
import { PencilFill, ShieldFillCheck } from 'react-bootstrap-icons';
import './header.scss';

const Header: React.FC = () => (
  <div className="profile-header d-flex">
    <div className="profile">
      <img className="profile__avatar" src={avatar} alt="Avatar" />
      <div className="profile__edit d-flex align-items-center justify-content-center position-absolute">
        <PencilFill className="edit-button" />
      </div>
    </div>
    <div className="profile-description d-flex justify-content-center">
      <p className="profile-description__name fs-2 text-gu-black fw-bold">Cristofer Westervelt</p>
      <p className="profile-description__position fs-4">Fullstack JS Engineer</p>
      <div className="level d-flex align-items-center">
        <ShieldFillCheck className="level__icon"/>
        <p className="level__text fs-6">Level 2</p>
      </div>
    </div>
  </div>
);

export default Header;
