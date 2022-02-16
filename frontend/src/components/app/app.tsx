import { useAppSelector } from 'hooks/hooks';

import { AppRoute, AdminRoute, MentorMenteeRoute } from 'common/enums/enums';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Routes } from 'components/common/common';
import Ork from 'components/okr/okr';
import Profile from 'components/profile/profile';
import { NotFound } from 'components/not-found';
import Admin from 'components/admin/admin';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import Main_Page from 'components/main-page/main-page';
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
          <div className="w-100">
            <Routes>
              <Route
                path={AdminRoute.ADMIN}
                element={<Admin variant="company" />}
              />
              <Route
                path={AdminRoute.ADMIN_USERS}
                element={<Admin variant="users" />}
              />
              <Route
                path={AdminRoute.ADMIN_CAREER_PATH}
                element={<Admin variant="career" />}
              />
            </Routes>
          </div>
        ) : (
          <main className="main-container w-100 px-5 pt-3 pb-5">
            <Routes>
              <Route path={AppRoute.LOGIN} element={<Login />} />
              <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
              <Route path={MentorMenteeRoute.ORKS} element={Ork} />
              <Route path={MentorMenteeRoute.SETTINGS_PROFILE} element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              <Route path={MentorMenteeRoute.HOME} element={<Main_Page />} />
              <Route path={MentorMenteeRoute.PROFILE} element={<Profile />} />
              <Route
                path={MentorMenteeRoute.CAREER_PATH}
                element={<div>Career Path</div>}
              />
              <Route path={MentorMenteeRoute.OKR} element={<div>OKR</div>} />
              <Route
                path={MentorMenteeRoute.OPPORTUNITIES}
                element={<div>Opportunities</div>}
              />
              <Route
                path={MentorMenteeRoute.MENTEE_PROFILES}
                element={<div>Mentee Profiles</div>}
              />
            </Routes>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
