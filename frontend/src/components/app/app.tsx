import { useAppSelector } from 'hooks/hooks';
import { AppRoute, ProfileSettingsRoute, RoleType } from 'common/enums/enums';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Navigate, Route, Routes } from 'components/common/common';
import Ork from 'components/okr/okr';
import Profile from 'components/profile/profile';
import { NotFound } from 'components/not-found';
import Admin from 'components/admin/admin';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import Main_Page from 'components/main-page/main-page';
import ProfileSettings from '../profile-settings/profile-settings';
import AdminRouting from './admin-routing';
import UserRouting from './user-routing';
import './app.scss';

const App: React.FC = () => {
  const isAdmin = useAppSelector(
    (state) => state.auth.user?.role === RoleType.ADMIN,
  );
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      {isAdmin ? (
        <AdminRouting isAuthenticated={isAuthenticated} />
      ) : (
        <UserRouting isAuthenticated={isAuthenticated} />
      )}
    </>
  );
};

export default App;
