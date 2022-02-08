import { AppRoute } from 'common/enums/enums';
import { Link, Route, Routes } from 'components/common/common';
import HomePage from 'components/home-page/home-page';
import Login from 'components/login/login';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import SignUp from 'components/sign-up/sign-up';
import { useLocation } from 'hooks/hooks';

const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <div>
        <ul className="app__navigation-list">
          <li>
            <Link to={AppRoute.ROOT}>Root</Link>
          </li>
          <li>
            <Link to={AppRoute.LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={AppRoute.SIGN_UP}>Sign up</Link>
          </li>
          <li>
            <Link to={AppRoute.ORKS}>Ork</Link>
          </li>
          <li>
            <Link to={AppRoute.PAGES}>Pages</Link>
          </li>
          <li>
            <Link to={AppRoute.SETTINGS_PROFILE}>Profile Settings</Link>
          </li>
        </ul>
        <p>Current path: {pathname}</p>
      </div>
      <Routes>
        <Route path={AppRoute.ROOT} element={<HomePage />} />
        <Route path={AppRoute.LOGIN} element={<Login />} />
        <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
        <Route path={AppRoute.ORKS} element={<Ork />} />
        <Route path={AppRoute.SETTINGS_PROFILE} element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
