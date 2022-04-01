import { useParams, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import { useEffect, useAppDispatch } from 'hooks/hooks';
import { verifyRegistrationToken } from 'store/auth/actions';

import { MentorMenteeRoute } from 'common/enums/enums';

const Verification: React.FC = () => {
  const { token } = useParams();
  const location = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyRegistrationToken(token || ''))
      .unwrap()
      .then(() => {
        location(MentorMenteeRoute.SETTINGS_PROFILE);
      })
      .catch(() => {
        location('/login');
        NotificationManager.error('Wrong token');
      });
  }, []);

  return <></>;
};

export default Verification;
