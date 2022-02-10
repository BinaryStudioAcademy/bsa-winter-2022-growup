import Tabs from './tabs/tabs';
import Header from './header/header';
import ProfileMain from './profile-main/profile-main';
import './profile-info.scss';

const ProfileInfo: React.FC = () =>(
  <div className="profile-info">
    <div className="profile-container profile-container_header">
      <Header />
    </div>
    <div className="profile-container profile-container_tabs">
      <Tabs />
    </div>
    <div className="profile-container profile-container_main">
      <ProfileMain />
    </div>
  </div>
);

export default ProfileInfo;
