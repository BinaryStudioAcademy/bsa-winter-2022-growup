import { useAppSelector } from 'hooks/hooks';
import { AppRoute, ProfileSettingsRoute } from 'common/enums/enums';
import Login from 'components/login/login';
import SignUp from 'components/sign-up/sign-up';
import { Route, Routes, Navigate } from 'components/common/common';
import Ork from 'components/okr/okr';
import Profile from 'components/profile/profile';
import { NotFound } from 'components/not-found';
import Admin from 'components/admin/admin';
import Header from 'components/header/header';
import Sidebar from 'components/sidebar/sidebar';
import Main_Page from 'components/main-page/main-page';
import SkillOverview from 'components/skills/skill-overview';
import ProfileSettings from '../profile-settings/profile-settings';
import ControlledTabs from 'components/okr/tabs/two-tabs';
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
          </div>
        ) : (
          <main className="main-container w-100 px-5 pt-3 pb-5">
            <Routes>
              <Route path={AppRoute.LOGIN} element={<Login />} />
              <Route path={AppRoute.SIGN_UP} element={<SignUp />} />
              <Route path={AppRoute.ORKS} element={Ork} />
              <Route
                path={AppRoute.PROFILE_SETTINGS}
                element={
                  <Navigate
                    to={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE}
                  />
                }
              />
              <Route
                path={AppRoute.PROFILE_SETTINGS_STEP}
                element={<ProfileSettings />}
              />
              <Route path="*" element={<NotFound />} />
              <Route path={AppRoute.HOME} element={<Main_Page />} />
              <Route path={AppRoute.PROFILE} element={<Profile />} />
              <Route
                path={AppRoute.CAREER_PATH}
                element={<div>Career Path</div>}
              />
              <Route path={AppRoute.OKR} element={<ControlledTabs />} />
              <Route
                path={AppRoute.OPPORTUNITIES}
                element={<div>Opportunities</div>}
              />
              <Route
                path={AppRoute.MENTEE_PROFILES}
                element={<div>Mentee Profiles</div>}
              />
              <Route path={AppRoute.SKILLS} element={<SkillOverview />} />
            </Routes>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;
