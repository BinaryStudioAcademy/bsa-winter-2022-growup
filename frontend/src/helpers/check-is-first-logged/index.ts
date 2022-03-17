import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { IUser } from 'common/interfaces/user/user';
const isFirstLogged = (user: IUser | null, navigate: any): void => {
  if (user && !user.firstName) {
    navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/1`);
    return;
  }
  if (user && !user.isCompleteTest) {
    navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/2`);
    return;
  }
};

export default isFirstLogged;
