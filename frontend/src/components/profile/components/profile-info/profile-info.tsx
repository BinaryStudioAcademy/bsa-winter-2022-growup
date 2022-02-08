import Tabs from './tabs/tabs';
import Header from './header/header';
import ProfileMain from './profile-main/profile-main';
import './profile-info.scss';

const ProfileInfo: React.FC = () =>(
  <div className="profile-info">
    <div className="header-wrapper">
      <Header />
    </div>
    <div className="main-wrapper">
      <Tabs />
      <ProfileMain />
    </div>
  </div>
);

export default ProfileInfo;
