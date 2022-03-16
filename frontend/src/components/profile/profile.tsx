import {
  useEffect,
  useAppDispatch,
  useAppSelector,
  useNavigate,
  useState,
} from 'hooks/hooks';
import { profileActions } from 'store/actions';

import Tabs from './tabs/tabs';
import Header from './header/header';
import './styles.scss';
import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { tabsElements } from './tabs/tabsElements';

const ProfileInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.profile);
  const [activeComponentId, setActiveComponentId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.firstName) {
      navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/1`);
      return;
    }
    if (!user?.isCompleteTest) {
      navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/2`);
      return;
    }
  }, [user]);

  useEffect(() => {
    dispatch(profileActions.fetchProfile());
  }, [dispatch]);

  const changeComponent = (id: number): void => {
    setActiveComponentId(id);
  };

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
            <Tabs
              changeComponent={changeComponent}
              activeId={activeComponentId}
            />
          </div>
          <div className="profile-container profile-container_main">
            {tabsElements[activeComponentId].component}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
