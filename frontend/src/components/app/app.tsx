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
      <Route path={AppRoute.ADMIN} element={<Admin />} />
      <Route path={AppRoute.ROOT} element={Counter} />
      <Route path={AppRoute.LOGIN} element={Login} />
      <Route path={AppRoute.SIGN_UP} element={SignUp} />
      <Route path={AppRoute.ORKS} element={Ork} />
      <Route path={AppRoute.SETTINGS_PROFILE} element={Profile} />
    </Routes>
  );
};

export default App;
