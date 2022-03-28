import { Dispatch, SetStateAction, memo } from 'react';
import {
  Pencil,
  Trash,
  XLg,
  ArrowClockwise,
  Clipboard,
} from 'react-bootstrap-icons';

import { useUsers, useCallback, useMemo } from 'hooks/hooks';
import { ControlButton } from 'components/common/common';
import { IUser } from 'common/interfaces/user';

type Props = {
  id: IUser['id'];
  as?: React.FC;

  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const UserControls: React.FC<Props> = memo(
  ({ as: Component = ControlButton, id, show, setShow }) => {
    const toggle = useCallback(() => setShow((state) => !state), []);
    const { deleteUser, copyPathToClipboard, resendMail } = useUsers();

    const data = useMemo(
      () => [
        {
          text: 'Copy activation link',
          onClick: (): void => copyPathToClipboard(id),
          children: <Clipboard />,
        },
        {
          text: 'Resend activation link',
          onClick: (): void => resendMail(id),
          children: <ArrowClockwise />,
        },
        {
          text: 'Edit user role',
          onClick: toggle,
          children: show ? <XLg /> : <Pencil />,
        },
        {
          text: 'Delete user',
          onClick: (): void => deleteUser(id),
          children: <Trash />,
        },
      ],
      [id, show],
    );

    return (
      <>
        {data.map((button) => (
          <Component
            popup={button.text}
            className="bg-transparent"
            {...button}
          />
        ))}
      </>
    );
  },
);

export default UserControls;
