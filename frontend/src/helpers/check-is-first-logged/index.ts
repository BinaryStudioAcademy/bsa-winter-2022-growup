// import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { IUser } from 'common/interfaces/user/user';
import { NavigateFunction } from 'react-router-dom';

interface Props {
  user: IUser | null;
  navigate: NavigateFunction;
}
const isFirstLogged = (_props: Props): void => {
  return;
  // if (user && !user.firstName) {
  //   navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/1`);
  //   return;
  // }
  // if (user && !user.isCompleteTest) {
  //   navigate(`${MentorMenteeRoute.SETTINGS_PROFILE}/2`);
  //   return;
  // }
};

export default isFirstLogged;
