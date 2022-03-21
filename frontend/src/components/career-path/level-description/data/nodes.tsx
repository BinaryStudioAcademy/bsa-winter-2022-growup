import avatar from 'assets/img/icons/header-icons/avatar-icon.svg';
import { ShieldFillCheck } from 'react-bootstrap-icons';
import { Position } from 'react-flow-renderer';

export const nodes = [
  {
    id: '1u',
    type: 'userNode',
    data: {
      icon: <img src={avatar} alt="Avatar" />,
      title: 'Fullstack JS Developer',
      subtitle: (
        <>
          <ShieldFillCheck className="text-gu-blue me-2 fs-5" />
          <span>level 2</span>
        </>
      ),
    },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
  },
  {
    id: '1',
    type: 'levelNode',
    data: {
      acquiredSkills: 33,
      totalSkills: 35,
      level: 1,
      progressColor: 'green',
    },
    position: { x: 500, y: 0 },
  },
  {
    id: '2',
    type: 'levelNode',
    data: {
      acquiredSkills: 25,
      totalSkills: 35,
      level: 1,
      progressColor: 'blue',
    },
    position: { x: 500, y: 120 },
  },
  {
    id: '3',
    type: 'levelNode',
    data: {
      acquiredSkills: 17,
      totalSkills: 35,
      level: 1,
      progressColor: 'red',
    },
    position: { x: 500, y: 240 },
    targetPosition: Position.Left,
  },
  {
    id: '4',
    type: 'levelNode',
    data: {
      acquiredSkills: 3,
      totalSkills: 35,
      level: 1,
      progressColor: 'grey',
    },
    position: { x: 500, y: 360 },
  },
  {
    id: '5',
    type: 'levelNode',
    data: {
      acquiredSkills: 3,
      totalSkills: 35,
      level: 1,
      progressColor: 'grey',
    },
    position: { x: 500, y: 480 },
  },
  {
    id: '6',
    type: 'levelNode',
    data: {
      acquiredSkills: 3,
      totalSkills: 35,
      level: 1,
      progressColor: 'grey',
    },
    position: { x: 500, y: 600 },
  },
];
