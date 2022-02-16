import { NavLink as AppLink } from 'react-router-dom';
import { AdminRoute, AppRoute, MentorMenteeRoute } from 'common/enums/enums';

type Props = {
  to: AppRoute | AdminRoute | MentorMenteeRoute;
  className?: string;
};

const Link: React.FC<Props> = ({ children, to, className }) => (
  <AppLink to={to} className={className}>
    {children}
  </AppLink>
);

export default Link;
