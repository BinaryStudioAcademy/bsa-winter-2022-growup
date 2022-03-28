import { MentorMenteeRoute } from 'common/enums/mentor-mentee-route/mentor-mentee-route.enum';
import { IUser } from 'common/interfaces/user/user';
import { NavigateFunction } from 'react-router-dom';

interface Props {
  user: IUser | null;
  navigate: NavigateFunction;
}

const isLoginLogged = ({ user, navigate }: Props): void => {
  if (!user) {
    navigate(`${MentorMenteeRoute.LOGIN}`);
    return;
  }
};

export default isLoginLogged;
