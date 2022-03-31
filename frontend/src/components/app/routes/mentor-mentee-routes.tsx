import { Navigate } from 'hooks/hooks';
// import { RoleType } from 'growup-shared';
import {
  AppRoute,
  MentorMenteeRoute,
  ProfileSettingsRoute,
} from 'common/enums/enums';
import Profile from '../../profile/profile';
import MainPage from '../../main-page/main-page';
import { NotFound } from '../../not-found';
import ProfileSettings from '../../profile-settings/profile-settings';
import Okr from 'components/okr/okr';
import CareerPath from '../../career-path/career-path';
import SkillOverview from 'components/skills/skill-overview';
import Opportunities from 'components/opportunities/opportunities';
import { IRoute } from '../common/interfaces';

export const mentorMenteeRoutes: IRoute[] = [
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
    element: <CareerPath />,
  },
  {
    path: MentorMenteeRoute.OPPORTUNITIES,
    element: <Opportunities />,
  },
  // {
  //   path: MentorMenteeRoute.MENTEE_PROFILES,
  //   element: <div>Mentee Profiles</div>,
  //   role: RoleType.MENTOR,
  // },
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
  {
    path: AppRoute.SKILLS,
    element: <SkillOverview />,
  },
];
