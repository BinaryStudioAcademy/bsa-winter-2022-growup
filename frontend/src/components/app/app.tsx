import { AppRoute } from 'common/enums/enums';
import { Route, Routes } from 'components/common/common';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import SignUp from 'components/sign-up/sign-up';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Counter />} />
      <Route path={AppRoute.LOGIN} element={<Login />} />
      <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
      <Route path={AppRoute.ORKS} element={<Ork />} />
      <Route path={AppRoute.SETTINGS_PROFILE} element={<Profile />} />
    </Routes>
  );
};

export default App;
