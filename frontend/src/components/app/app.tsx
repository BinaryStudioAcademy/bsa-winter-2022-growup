import { useLocation } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Link, Route, Routes } from 'components/common/common';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';

const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="App">
        <Sidebar />
        <Header />
        <div>
          <ul className="App-navigation-list">
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
        <header className="App-header">
          <Routes>
            <Route path={AppRoute.ROOT} element={Counter} />
            <Route path={AppRoute.LOGIN} element={Login} />
            <Route path={AppRoute.SIGN_UP} element={SignUp} />
            <Route path={AppRoute.ORKS} element={Ork} />
            <Route path={AppRoute.SETTINGS_PROFILE} element={Profile} />
            <Route path={AppRoute.HOME} element={<div>Home</div>} />
            <Route path={AppRoute.PROFILE} element={<div>Profile</div>} />
            <Route path={AppRoute.CAREER_PATH} element={<div>Career Path</div>} />
            <Route path={AppRoute.OKR} element={<div>OKR</div>} />
            <Route path={AppRoute.OPPORTUNITIES} element={<div>Opportunities</div>} />
            <Route path={AppRoute.MENTEE_PROFILES} element={<div>Mentee Profiles</div>} />
          </Routes>
        </header>
      </div>
    </>
  );
};

export default App;
