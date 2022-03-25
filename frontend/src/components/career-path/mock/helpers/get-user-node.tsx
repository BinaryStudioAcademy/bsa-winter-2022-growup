import { v4 as uuidv4 } from 'uuid';
import { Position } from 'react-flow-renderer';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { INode } from '../common/interfaces';
import avatar from 'assets/img/icons/header-icons/avatar-icon.svg';

export const getUserNode = (title: string): INode => {
  return {
    id: uuidv4(),
    type: 'userNode',
    data: {
      icon: <img src={avatar} alt="Avatar" />,
      title,
      subtitle: (
        <>
          <ShieldFillCheck className="text-gu-blue me-2 fs-5" />
          <span>level 2</span>
        </>
      ),
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  };
};
