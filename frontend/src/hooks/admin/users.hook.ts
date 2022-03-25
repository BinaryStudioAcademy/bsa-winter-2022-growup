import { useCallback, useAppDispatch } from 'hooks/hooks';
import { adminActions } from 'store/actions';

import { IUser } from 'common/interfaces/user';

import { NotificationManager } from 'react-notifications';

type Return = {
  deleteUser: (id: IUser['id']) => void;
  resendMail: (id: IUser['id']) => void;
  copyPathToClipboard: (id: IUser['id']) => void;
};

const useUsers = (): Return => {
  const dispatch = useAppDispatch();

  const deleteUser = useCallback((id: IUser['id']) => {
    dispatch(adminActions.deleteUser(id))
      .unwrap()
      .then(() => NotificationManager.success('User was successfully deleted'))
      .catch((err) => NotificationManager.error(err.message));
  }, []);

  const resendMail = useCallback((id: IUser['id']) => {
    dispatch(adminActions.resendMail(id))
      .unwrap()
      .then(() => NotificationManager.success('Mail was successfully resent'))
      .catch((err) => NotificationManager.error(err.message));
  }, []);

  const copyPathToClipboard = useCallback((id: IUser['id']) => {
    dispatch(adminActions.getToken(id))
      .unwrap()
      .then((result) => {
        navigator.clipboard.writeText(result.url);
        NotificationManager.success(`${result.url} successfully copied`);
      })
      .catch((err) => NotificationManager.error(err.message));
  }, []);

  return { deleteUser, resendMail, copyPathToClipboard };
};

export { useUsers };
