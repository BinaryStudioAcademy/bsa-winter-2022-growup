import { useLocation } from 'hooks/hooks';
import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Link, Route, Routes } from 'components/common/common';
import logo from 'assets/img/logo.svg';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import { NotFound } from 'components/notFound';

const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="App">
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
          <img src={logo} className="App-logo" alt="logo" />
          <Routes>
            <Route path={AppRoute.ROOT} element={Counter} />
            <Route path={AppRoute.LOGIN} element={Login} />
            <Route path={AppRoute.SIGN_UP} element={SignUp} />
            <Route path={AppRoute.ORKS} element={Ork} />
            <Route path={AppRoute.SETTINGS_PROFILE} element={Profile} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
        <input type="button" value="Click" className="btn-gu-purple"/>
        <div className="bg-gu-black text-gu-white fs-2">LAlmost before we knew it, we had left the ground.</div>
        <div className="bg-gu-black text-gu-white fs-3">LAlmost before we knew it, we had left the ground.</div>
        <div className="bg-gu-black text-gu-white fs-4">LAlmost before we knew it, we had left the ground.</div>
      </div>
    </>
  );
};

export default App;
