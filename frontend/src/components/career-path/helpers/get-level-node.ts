import { v4 as uuidv4 } from 'uuid';
import { INode } from '../common/interfaces';

export const getLevelNode = (
  level: string,
  y: number,
  acquiredSkills: number,
  totalSkills: number,
  onClick: () => void,
): INode => {
  return {
    id: uuidv4(),
    type: 'levelNode',
    data: {
      acquiredSkills,
      totalSkills,
      level,
      onClick,
    },
    position: {
      x: 500,
      y,
    },
  };
};
