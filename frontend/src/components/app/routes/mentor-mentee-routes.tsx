import { Navigate } from '../../../hooks/hooks';
import { AppRoute, MentorMenteeRoute, ProfileSettingsRoute } from '../../../common/enums/enums';
import Okr from '../../okr/okr';
import Profile from '../../profile/profile';
import MainPage from '../../main-page/main-page';
import { NotFound } from '../../not-found';
import ProfileSettings from '../../profile-settings/profile-settings';

export const mentorMenteeRoutes = [
  {
    path: MentorMenteeRoute.OKR,
    element: <Okr />,
  },
  {
    path: MentorMenteeRoute.SETTINGS_PROFILE,
    element: <Navigate to={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE} />,
  },
  {
    path: MentorMenteeRoute.SETTINGS_PROFILE_STEP,
    element: <ProfileSettings />,
  },
  {
    path: MentorMenteeRoute.HOME,
    element: <MainPage />,
  },
  {
    path: MentorMenteeRoute.PROFILE,
    element: <Profile />,
  },
  {
    path: MentorMenteeRoute.CAREER_PATH,
    element: <div>Career Path</div>,
  },
  {
    path: MentorMenteeRoute.OPPORTUNITIES,
    element: <div>Opportunities</div>,
  },
  {
    path: MentorMenteeRoute.MENTEE_PROFILES,
    element: <div>Mentee Profiles</div>,
  },
  {
    path: MentorMenteeRoute.ANY,
    element: <NotFound />,
  },
  {
    path: AppRoute.LOGIN,
    element: <Navigate to={MentorMenteeRoute.HOME} />,
  },
  {
    path: AppRoute.SIGN_UP,
    element: <Navigate to={MentorMenteeRoute.HOME} />,
  },
];