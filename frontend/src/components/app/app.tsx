import { useAppSelector } from 'hooks/hooks';

import { AppRoute } from 'common/enums/enums';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Routes } from 'components/common/common';
import Ork from 'components/okrs/okrs';
import Profile from 'components/profile/profile';
import { NotFound } from 'components/not-found';
import Admin from 'components/admin/admin';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import Main_Page from 'components/main-page/main-page';
import SkillOverview from 'components/skills/skill-overview';
import './app.scss';

const App: React.FC = () => {
  const isAdmin = false;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <div>
      {isAdmin || !isAuthenticated ? null : (
        <>
          <Sidebar />
          <Header />
        </>
      )}
      <div className="d-flex">
        {isAdmin ? (
          <Routes>
            <Route
              path={AppRoute.ADMIN}
              element={<Admin variant="company" />}
            />
            <Route
              path={AppRoute.ADMIN_USERS}
              element={<Admin variant="users" />}
            />
            <Route
              path={AppRoute.ADMIN_CAREER_PATH}
              element={<Admin variant="career" />}
            />
          </Routes>
        ) : (
          <main className="main-container w-100 px-5 pt-3 pb-5">
            <Routes>
              <Route path={AppRoute.LOGIN} element={<Login />} />
              <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
              <Route path={AppRoute.ORKS} element={Ork} />
              <Route path={AppRoute.SETTINGS_PROFILE} element={Profile} />
              <Route path="*" element={<NotFound />} />
              <Route path={AppRoute.HOME} element={<Main_Page />} />
              <Route path={AppRoute.PROFILE} element={<div>Profile</div>} />
              <Route
                path={AppRoute.CAREER_PATH}
                element={<div>Career Path</div>}
              />
              <Route path={AppRoute.OKR} element={<div>OKR</div>} />
              <Route
                path={AppRoute.OPPORTUNITIES}
                element={<div>Opportunities</div>}
              />
              <Route
                path={AppRoute.MENTEE_PROFILES}
                element={<div>Mentee Profiles</div>}
              />
            </Routes>
          </main>
        )}
      </div>
      <SkillOverview/>
    </div>
  );
};

export default App;
