import { useEffect, useAppDispatch, useAppSelector } from 'hooks/hooks';
import { profileActions } from 'store/actions';

import Tabs from './tabs/tabs';
import Header from './header/header';
import ProfileMain from './profile-main/profile-main';
import './profile-info.scss';

const ProfileInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  return (
    <div className="profile-info gu-white">
      {!isLoading && user && (
        <>
          <div className="profile-container profile-container_header bg-gu-white">
            {user && (
              <Header
                avatar={user.avatar!}
                firstName={user.firstName}
                lastName={user.lastName}
              />
            )}
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
