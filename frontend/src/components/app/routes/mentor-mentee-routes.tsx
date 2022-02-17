import { MentorMenteeRoute, ProfileSettingsRoute } from '../../../common/enums/enums';
import { Navigate } from '../../../hooks/hooks';
import Ork from '../../okr/okr';
import Profile from '../../profile/profile';
import Main_Page from '../../main-page/main-page';
import { NotFound } from '../../not-found';
import ProfileSettings from '../../profile-settings/profile-settings';

export const mentorMenteeRoutes = [
  {
    path: MentorMenteeRoute.ORKS,
    element: <Ork />,
  },
  {
    path: MentorMenteeRoute.SETTINGS_PROFILE,
    element: <Navigate to={ProfileSettingsRoute.PROFILE_SETTINGS_STEP_ONE}/>,
  },
  {
    path: MentorMenteeRoute.SETTINGS_PROFILE_STEP,
    element: <ProfileSettings />,
  },
  {
    path: MentorMenteeRoute.HOME,
    element: <Main_Page />,
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
    path: MentorMenteeRoute.OKR,
    element: <div>OKR</div>,
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
];
