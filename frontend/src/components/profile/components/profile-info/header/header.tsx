import avatar from 'assets/img/profile-avatar.png';
import { PencilFill, ShieldFillCheck } from 'react-bootstrap-icons';
import './header.scss';

const Header: React.FC = () => (
  <div className="header d-flex">
    <div className="profile">
      <img className="profile__avatar" src={avatar} alt="Avatar" />
      <div className="profile__edit d-flex align-items-center justify-content-center position-absolute">
        <PencilFill className="edit-button" />
      </div>
    </div>
    <div className="profile-description d-flex justify-content-center">
      <p className="profile-description__name">Cristofer Westervelt</p>
      <p className="profile-description__position">Fullstack JS Engineer</p>
      <div className="level d-flex align-items-center">
        <ShieldFillCheck className="level__icon"/>
        <p className="level__text">Level 2</p>
      </div>
    </div>
  </div>
);

export default Header;
