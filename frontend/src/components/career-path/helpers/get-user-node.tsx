import { v4 as uuidv4 } from 'uuid';
import Avatar from 'react-avatar';
import { Position } from 'react-flow-renderer';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { INode } from '../common/interfaces';
import { IUser } from 'common/interfaces/user';

export const getUserNode = (
  position: string,
  level: string,
  currentUser: IUser | null,
): INode => {
  const userAvatar = currentUser?.avatar ? (
    <img
      className="profile__avatar"
      src={currentUser.avatar}
      alt="Avatar"
      style={{ width: 65, height: 65 }}
    />
  ) : (
    <Avatar
      name={`${currentUser?.firstName} ${currentUser?.lastName}`}
      size={'65'}
      className="rounded-circle"
    />
  );

  return {
    id: uuidv4(),
    type: 'userNode',
    data: {
      icon: userAvatar,
      title: position,
      subtitle: (
        <>
          <ShieldFillCheck className="text-gu-blue me-2 fs-5" />
          <span>{level}</span>
        </>
      ),
    },
    position: { x: 50, y: 0 },
    sourcePosition: Position.Right,
  };
};
