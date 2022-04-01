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
import { tabsElements } from './tabs/tabsElements';
import isFirstLogged from 'helpers/check-is-first-logged';
import { authActions } from 'store/auth';
import { fetchAllLevels } from 'store/career-path/actions';

const ProfileInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.profile);
  const { levels } = useAppSelector((state) => state.careerPath);
  const level = levels.find((el) => el.id === user?.level?.id);
  const currentLevel = useAppSelector((state) => state.auth.user?.level);
  const [activeComponentId, setActiveComponentId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    isFirstLogged({ user, navigate });
  }, [user]);

  useEffect(() => {
    dispatch(fetchAllLevels(currentLevel?.id || ''));
    dispatch(profileActions.fetchProfile());
    dispatch(authActions.getCurrentUser());
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
              domainName={level ? level.domainName : ''}
              name={level ? level.name : ''}
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
