import { Dispatch, SetStateAction, memo } from 'react';
import {
  Pencil,
  Trash,
  XLg,
  ArrowClockwise,
  Clipboard,
} from 'react-bootstrap-icons';

import { useUsers, useCallback } from 'hooks/hooks';
import { ControlButton } from 'components/common/common';
import { IUser } from 'common/interfaces/user';

type Props = {
  id: IUser['id'];

  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const UserControls: React.FC<Props> = memo(({ id, show, setShow }) => {
  const toggle = useCallback(() => setShow((state) => !state), []);
  const { deleteUser, copyPathToClipboard, resendMail } = useUsers();
  return (
    <>
      <ControlButton
        className="bg-transparent"
        onClick={(): void => {
          copyPathToClipboard(id);
        }}
      >
        <Clipboard />
      </ControlButton>
      <ControlButton
        className="bg-transparent"
        onClick={(): void => resendMail(id)}
      >
        <ArrowClockwise />
      </ControlButton>
      <ControlButton className=" bg-transparent" onClick={toggle}>
        {show ? <XLg /> : <Pencil />}
      </ControlButton>

      <ControlButton
        className="bg-transparent"
        onClick={(): void => deleteUser(id)}
      >
        <Trash />
      </ControlButton>
    </>
  );
});

export default UserControls;
