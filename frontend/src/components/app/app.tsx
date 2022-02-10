import { AppRoute } from 'common/enums/enums';
import Counter from 'components/counter/counter';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Routes } from 'components/common/common';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';

const App: React.FC = () => {

  return (
      <>
        <Sidebar />
        <Header />
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
      </>
  );
};

export default App;
