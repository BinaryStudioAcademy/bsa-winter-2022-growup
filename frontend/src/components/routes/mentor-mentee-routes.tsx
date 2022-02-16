import { Route, Routes } from '../common/common';
import { MentorMenteeRoute } from '../../common/enums/enums';
import Ork from '../okr/okr';
import Profile from '../profile/profile';
import Main_Page from '../main-page/main-page';

const MentorMenteeRoutes: React.FC = () => (
  <Routes>
    <Route path={MentorMenteeRoute.ORKS} element={Ork} />
    <Route path={MentorMenteeRoute.SETTINGS_PROFILE} element={<Profile />} />
    <Route path={MentorMenteeRoute.HOME} element={<Main_Page />} />
    <Route path={MentorMenteeRoute.PROFILE} element={<Profile />} />
    <Route path={MentorMenteeRoute.CAREER_PATH} element={<div>Career Path</div>} />
    <Route path={MentorMenteeRoute.OKR} element={<div>OKR</div>} />
    <Route path={MentorMenteeRoute.OPPORTUNITIES} element={<div>Opportunities</div>} />
    <Route path={MentorMenteeRoute.MENTEE_PROFILES} element={<div>Mentee Profiles</div>} />
  </Routes>
);

export default MentorMenteeRoutes;
