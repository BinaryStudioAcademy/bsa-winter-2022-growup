import Tabs from './tabs/tabs';
import Header from './header/header';
import ProfileMain from './profile-main/profile-main';
import './profile-info.scss';

const ProfileInfo: React.FC = () =>(
  <div className="profile-info">
    <Header />
    <Tabs />
    <ProfileMain />
  </div>
);

export default ProfileInfo;
