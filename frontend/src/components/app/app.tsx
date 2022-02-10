import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Routes } from 'components/common/common';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import Admin from 'components/admin/admin';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ADMIN} element={<Admin variant="company" />} />
      <Route path={AppRoute.ADMIN_USERS} element={<Admin variant="users" />} />
      <Route
        path={AppRoute.ADMIN_CAREER_PATH}
        element={<Admin variant="career" />}
      />
      <Route path={AppRoute.ROOT} element={Counter} />
      <Route path={AppRoute.LOGIN} element={Login} />
      <Route path={AppRoute.SIGN_UP} element={SignUp} />
      <Route path={AppRoute.ORKS} element={Ork} />
      <Route path={AppRoute.SETTINGS_PROFILE} element={Profile} />
    </Routes>
  );
};

export default App;
