import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useNavigate,
} from 'hooks/hooks';
import { profileActions } from 'store/actions';

import Tabs from './tabs/tabs';
import Header from './header/header';
import ProfileMain from './profile-main/profile-main';
import './styles.scss';

const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      user.firstName
        ? user.isCompleteTest
          ? null
          : navigate('/profile/settings/2')
        : navigate('/profile/settings/1');
    }
  }, [user]);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  return (
    <div className="profile-info gu-white">
      {!isLoading && user && (
        <>
          <div className="profile-container profile-container_header bg-gu-white">
            <Header
              avatar={user.avatar}
              firstName={user.firstName}
              lastName={user.lastName}
              position={user.position}
            />
          </div>
          <div className="profile-container profile-container_tabs">
            <Tabs />
          </div>
          <div className="profile-container profile-container_main">
            <ProfileMain />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
